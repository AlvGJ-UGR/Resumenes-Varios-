# Práctica 3 — Configuración del servicio DNS con BIND9

**Asignatura:** Sistemas Telemáticos · 2º Grado en Ingeniería de Tecnologías de Telecomunicación · Universidad de Granada

> Guía de estudio y resumen explicado de la práctica. Incluye teoría mínima, configuración paso a paso, comandos, ficheros de ejemplo y respuestas razonadas a las preguntas del guion.

---

## Índice

1. [Objetivo](#1-objetivo)
2. [Resumen teórico de DNS](#2-resumen-teórico-de-dns)
3. [BIND9 y sus ficheros](#3-bind9-y-sus-ficheros)
4. [Anatomía de un fichero de zona](#4-anatomía-de-un-fichero-de-zona)
5. [Preparación del entorno](#5-preparación-del-entorno)
6. [Tarea 0 — Deshabilitar systemd-resolved](#6-tarea-0--deshabilitar-systemd-resolved)
7. [Tarea 1 — Servidor primario](#7-tarea-1--servidor-primario)
8. [Tarea 2 — Comprobación del funcionamiento](#8-tarea-2--comprobación-del-funcionamiento)
9. [Tarea 3 — Servidor delegado](#9-tarea-3--servidor-delegado)
10. [Tarea 4 — Inspección con Wireshark](#10-tarea-4--inspección-con-wireshark)
11. [Errores típicos y troubleshooting](#11-errores-típicos-y-troubleshooting)
12. [Chuleta de comandos](#12-chuleta-de-comandos)

---

## 1. Objetivo

Familiarizarse con el **Domain Name System (DNS)** y aprender a configurar un servicio DNS para un subdominio concreto, usando **BIND9**. Al terminar se habrá montado:

- Un **servidor primario** con autoridad sobre la zona `islaX.ugr.es`.
- Un **servidor delegado** con autoridad sobre la subzona `equipos.islaX.ugr.es`.
- Un **cliente** que resuelve nombres de ambas zonas, y cuyo tráfico se analiza con Wireshark.

```
                  Servidor primario                    Servidor delegado
               zona: isla1.ugr.es                zona: equipos.isla1.ugr.es
                  192.168.1.1        ─ delega →        192.168.1.2
                       ▲
                       │ consultas DNS
                    Cliente
```

---

## 2. Resumen teórico de DNS

### 2.1 ¿Qué es DNS?

Un servicio **distribuido, jerárquico (árbol) y escalable** que traduce:

| Tipo | Sentido | Nombre en inglés |
|------|---------|------------------|
| Resolución directa | nombre → IP | *forward mapping* |
| Resolución inversa | IP → nombre | *reverse mapping* |

### 2.2 Jerarquía

```
                 .  (raíz, 13 servidores raíz A–M)
               /   \
            .com   .es   (TLD)
                     \
                    ugr.es   (subzona delegada a la UGR)
                       \
                   isla1.ugr.es → equipos.isla1.ugr.es
```

- **Servidores raíz (`.`)**: responsables últimos del sistema. Hay 13 identidades (A–M) con múltiples réplicas (p. ej. la F tiene una en Madrid, en Espanix).
- **TLD** (*Top Level Domain*): `.es`, `.com`…
- Cada servidor es responsable de una **zona** = conjunto de nombres de dominio contiguos.
- **Delegar** = traspasar la responsabilidad de una subzona a otro servidor (ej.: `.es` delega `ugr.es` en los servidores de la UGR).

### 2.3 Tipos de servidor dentro de una zona

| Tipo | Qué hace |
|------|----------|
| **Primario (master)** | Tiene la copia maestra de la zona, leída de ficheros locales. |
| **Secundario (esclavo)** | Copia la zona del primario por transferencia de red (backup). |
| **Delegado** | Tiene la información de una **subzona**; el servidor de la zona superior le deriva las consultas. |

### 2.4 Caché

Los servidores guardan temporalmente (según el TTL) todo lo que aprenden de consultas previas, aunque no sean autoridad sobre ello. Reduce tráfico y latencia.

### 2.5 Consultas iterativas vs. recursivas

| | Iterativa | Recursiva |
|---|-----------|-----------|
| Quién hace el trabajo | El **cliente** va preguntando servidor a servidor | El **servidor** consultado resuelve por su cuenta y devuelve la respuesta final |
| Respuesta del servidor | La mejor que tenga (puede ser una *referencia* a otro servidor) | Respuesta definitiva (o error) |
| Ejemplo | Consultas a los servidores raíz (para no sobrecargarlos) | Un cliente a su resolutor |

---

## 3. BIND9 y sus ficheros

Se usa **BIND9** (antes llamado `named`). Fichero principal: `/etc/bind/named.conf`, que incluye:

| Fichero | Función |
|---------|---------|
| `named.conf.options` | Opciones generales del servidor (DNSSEC, recursión…). |
| `named.conf.default-zones` | Zonas por defecto (`localhost`, la raíz `.`, inversas locales…). |
| `named.conf.local` | **Aquí se declaran las zonas con autoridad** (el fichero que se edita en la práctica). |

Además, **por cada zona** hay un **fichero de zona** (`db.…`) con los registros (SOA, NS, A, MX…). Su nombre es libre, pero debe indicarse en `named.conf.local`.

---

## 4. Anatomía de un fichero de zona

### 4.1 Registros principales

| Registro | Significado |
|----------|-------------|
| **SOA** | *Start Of Authority*: parámetros de la zona (servidor principal, contacto, serial y temporizadores). |
| **NS** | Servidor(es) de nombres de la zona (o de una subzona delegada). |
| **A** | Traducción nombre → dirección IPv4. |
| **MX** | Servidor de correo del dominio. |

### 4.2 Sintaxis completa (recomendada para empezar)

```dns
isla1.ugr.es.      3600 IN SOA ns.isla1.ugr.es. admin.isla1.ugr.es. (
                        20091126 ; serial number
                        3600     ; refresh
                        1800     ; retry
                        1W       ; expiry
                        3600)    ; negative TTL

isla1.ugr.es.      3600 IN NS  ns.isla1.ugr.es.
ns.isla1.ugr.es.   3600 IN A   172.16.1.100

host5.isla1.ugr.es. 3600 IN A  192.168.1.5
```

Campos de cada línea: `nombre  TTL  clase  tipo  datos`.

| Campo | Significado |
|-------|-------------|
| Nombre | Dominio al que se refiere el registro. |
| TTL | Tiempo (s) que un registro puede permanecer en caché. |
| Clase | `IN` = Internet. |
| Tipo | SOA, NS, A, MX… |
| Datos | Dependen del tipo (en SOA: servidor, correo del admin y tiempos). |

### 4.3 Parámetros del SOA

| Parámetro | Para qué sirve |
|-----------|----------------|
| `serial` | Nº de versión. **Debe incrementarse en cada cambio** (los secundarios lo usan para saber si hay que actualizar). Formato típico `AAAAMMDDnn`. |
| `refresh` | Cada cuánto consulta un secundario si hay cambios. |
| `retry` | Cada cuánto reintenta si el refresh falló. |
| `expiry` | Tras cuánto sin contactar el secundario deja de responder por esa zona. |
| `negative TTL` | Tiempo que se cachea una respuesta negativa (NXDOMAIN). |

### 4.4 ⚠️ El punto final importa

En un fichero de zona, un nombre **terminado en punto** (`host5.isla1.ugr.es.`) es **absoluto (FQDN)**. Uno **sin punto** (`host5`) se considera relativo y BIND le añade el `$ORIGIN` de la zona. Olvidar el punto final es el error más común (acaba dando nombres como `ns.isla1.ugr.es.isla1.ugr.es.`).

---

## 5. Preparación del entorno

Hay dos escenarios: máquinas virtuales (en casa) o laboratorio.

### 5.1 Entorno de máquinas virtuales (VirtualBox)

**1. Instalar bind9** en la máquina de seminarios:

```bash
sudo apt install bind9
```

**2. Apagar la VM y clonarla dos veces** (clonación enlazada):

1. Clic derecho sobre la máquina → **Clonar…**
2. Nombre: `Servidor Primario`. Política MAC: **Generar nuevas direcciones MAC para todas las interfaces**.
3. Seleccionar **Clonación enlazada** → Finalizar.
4. Repetir **sobre la máquina original** (no sobre la recién creada) con nombre `Servidor Delegado`.

**3. Desconectar el cable de la interfaz NAT** (Configuración → Red → Adaptador 1 → desmarcar *Cable conectado*). Así se evita salir a Internet y consultar servidores DNS reales.

**4. Arrancar y configurar las IPs** (clic derecho en el icono de red → *Edit connections…* → *Wired connection 2* → pestaña *IPv4 Settings* → Method: *Manual*):

| Máquina | IP | Máscara |
|---------|----|---------|
| Servidor Primario | `192.168.1.1` | `24` |
| Servidor Delegado | `192.168.1.2` | `24` |

Guardar y reiniciar la red:

```bash
sudo nmcli networking off
sudo nmcli networking on
```

**5. Verificar:**

```bash
ip -c a                # comprobar la IP asignada
ping 192.168.1.2       # desde el primario; parar con Ctrl+C
```

### 5.2 Entorno de laboratorio

- Ya está preparado. Cada una de las **6 islas** es una zona distinta: `islaX.ugr.es`.
- Arrancar los equipos con la opción **“red aislada” / Ubuntu18**.
- Se usa la **red de gestión `172.16.X.Y/24`** (X = nº de isla, Y = nº de equipo).

> En VMs usa **X = 1**. En el laboratorio, X = tu número de isla.

---

## 6. Tarea 0 — Deshabilitar `systemd-resolved`

Linux suele traer un resolutor local ligero (`systemd-resolved`) que hace caché de peticiones. Ocupa el puerto 53 y **entra en conflicto con BIND**, así que hay que pararlo **en todas las máquinas**:

```bash
sudo systemctl stop systemd-resolved.service
```

Después hay que decirle al sistema a qué servidor DNS preguntar. Editar `/etc/resolv.conf`:

```
nameserver <direccion_ip_servidor_nombres>
```

- En la **misma máquina** que ejecuta el servidor → `nameserver 127.0.0.1`.
- En un **cliente** → la IP del servidor primario (p. ej. `192.168.1.1`).

> 💡 **Tip:** en Ubuntu `/etc/resolv.conf` suele ser un enlace simbólico al stub de systemd-resolved. Si no se deja editar o se regenera solo, sustitúyelo por un fichero normal (`sudo rm /etc/resolv.conf` y créalo de nuevo). El `stop` no es permanente tras reiniciar; para evitarlo: `sudo systemctl disable --now systemd-resolved`.

---

## 7. Tarea 1 — Servidor primario

### 7.1 Desactivar DNSSEC

Al no haber conexión a Internet, la validación DNSSEC haría fallar las resoluciones. En `/etc/bind/named.conf.options` dejar:

```
dnssec-validation no;
```

### 7.2 Declarar la zona en `named.conf.local`

```
zone "isla1.ugr.es" IN {
        type master;
        file "/etc/bind/db.isla1.ugr.es";
        // El nombre del fichero es un ejemplo, se puede cambiar
};
```

- `type master` → este servidor guarda los registros originales y **tiene autoridad** sobre la zona.
- `file` → fichero con los registros (en `/etc/bind/` o con ruta completa).

### 7.3 Crear el fichero de zona `/etc/bind/db.isla1.ugr.es`

```dns
isla1.ugr.es.       3600 IN SOA ns.isla1.ugr.es. admin.isla1.ugr.es. (
                            20091126 ; serial number
                            3600     ; refresh
                            1800     ; retry
                            1W       ; expiry
                            3600)    ; negative TTL

isla1.ugr.es.       3600 IN NS  ns.isla1.ugr.es.
ns.isla1.ugr.es.    3600 IN A   192.168.1.1   ; IP REAL del servidor (lab: 172.16.X.Y)

host5.isla1.ugr.es. 3600 IN A   192.168.1.5
host6.isla1.ugr.es. 3600 IN A   192.168.1.6
host7.isla1.ugr.es. 3600 IN A   192.168.1.7
host8.isla1.ugr.es. 3600 IN A   192.168.1.8
```

> El ejemplo del guion trae `172.16.2.1` en el registro de `ns` con la nota “cambiar por la IP real del servidor”. En el entorno de VMs la IP real es `192.168.1.1`; en el laboratorio, la `172.16.X.Y` del equipo servidor.

### 7.4 Comprobar y aplicar

```bash
# Sintaxis de la configuración (sin salida = todo correcto)
sudo named-checkconf

# Sintaxis y coherencia de la zona
sudo named-checkzone isla1.ugr.es /etc/bind/db.isla1.ugr.es

# Aplicar los cambios
sudo systemctl restart bind9.service
```

### 7.5 Pregunta del guion: la zona raíz `.`

> *Fíjese en la definición de la zona root (“.”) en `/etc/bind/named.conf.default-zones`. ¿Está definida como master? ¿Qué quiere decir? ¿En qué fichero están sus registros?*

- **No**, no es `master`: está declarada como **`type hint`** (en la práctica, según versión de Ubuntu/Debian, apunta a un fichero tipo `/usr/share/dns/root.hints` o `/etc/bind/db.root`).
- Significa que este servidor **no es autoridad de la raíz**; simplemente conoce una **lista de pistas** (*root hints*) con los nombres y direcciones IP de los 13 servidores raíz (A–M) para **arrancar la resolución** de cualquier nombre que no conozca: primero pregunta a un raíz, que le remite al TLD, y así sucesivamente.
- Los registros de ese fichero son principalmente **NS** (los servidores raíz `a.root-servers.net`… `m.root-servers.net`) y **A/AAAA** (sus direcciones IP).

---

## 8. Tarea 2 — Comprobación del funcionamiento

### 8.1 Consultar nombres

Desde el cliente (o el propio primario, con `nameserver 127.0.0.1`):

```bash
nslookup host5.isla1.ugr.es
host host5.isla1.ugr.es
dig host5.isla1.ugr.es
```

**¿Qué respuesta se recibe y qué diferencias hay?**

| Comando | Salida | Cuándo usarlo |
|---------|--------|---------------|
| `nslookup` | Muestra el servidor consultado (`Server`/`Address`) y la respuesta (`Name`/`Address`). Indica si es *non-authoritative*. | Consulta rápida. |
| `host` | Una sola línea: `host5.isla1.ugr.es has address 192.168.1.5`. | Lo más compacto. |
| `dig` | Salida completa tipo “formato de zona”: cabecera con **flags** (`qr aa rd ra`), sección *QUESTION*, *ANSWER*, *AUTHORITY*, *ADDITIONAL*, tiempo de consulta, servidor y tamaño del mensaje. | Diagnóstico detallado (la más útil). |

En `dig`, la respuesta de un servidor con autoridad lleva el flag **`aa`** (*Authoritative Answer*) y `status: NOERROR`.

### 8.2 Nombre inexistente

```bash
dig noexiste.isla1.ugr.es
```

Respuesta: **`status: NXDOMAIN`** (el nombre no existe). Con `aa` activo, porque el servidor tiene autoridad sobre la zona y puede afirmar con certeza que el nombre no existe. En la sección *AUTHORITY* aparece el SOA (de ahí sale el *negative TTL* que se cachea).

### 8.3 Parar el servicio

```bash
sudo systemctl stop bind9.service
dig host5.isla1.ugr.es
```

Resultado: **no hay respuesta**. `dig` muestra `connection timed out; no servers could be reached` (y `nslookup` algo similar), porque no hay nadie escuchando en el puerto 53 del servidor configurado en `resolv.conf`. Para continuar: `sudo systemctl start bind9.service`.

### 8.4 Varios nombres para una misma IP

**Sí se puede.** Basta con añadir varios registros `A` con nombres distintos apuntando a la misma IP:

```dns
host5.isla1.ugr.es.  3600 IN A 192.168.1.5
web.isla1.ugr.es.    3600 IN A 192.168.1.5
ftp.isla1.ugr.es.    3600 IN A 192.168.1.5
```

(También se pueden crear alias con registros `CNAME`.) Tras editar: **subir el serial**, `named-checkzone`, `restart` y comprobar con `dig`.

---

## 9. Tarea 3 — Servidor delegado

Se configura la máquina **Servidor Delegado** para gestionar la subzona `equipos.isla1.ugr.es` y se hace que el primario le delegue las consultas.

### 9.1 Opciones del servidor delegado (`named.conf.options`)

```
dnssec-validation no;
recursion yes;
```

`recursion yes` permite que este servidor atienda peticiones **recursivas**.

### 9.2 Declarar la subzona (`named.conf.local` del delegado)

```
zone "equipos.isla1.ugr.es" IN {
        type master;
        file "/etc/bind/db.equipos.isla1.ugr.es";
};
```

### 9.3 Fichero de la subzona `/etc/bind/db.equipos.isla1.ugr.es`

```dns
equipos.isla1.ugr.es.        3600 IN SOA delegado.isla1.ugr.es. admin.isla1.ugr.es. (
                                     20091126 ; serial number
                                     3600     ; refresh
                                     1800     ; retry
                                     1W       ; expiry
                                     3600)    ; negative TTL

equipos.isla1.ugr.es.        3600 IN NS  delegado.isla1.ugr.es.
delegado.isla1.ugr.es.       3600 IN A   192.168.1.2

host1.equipos.isla1.ugr.es.  3600 IN A   192.168.1.11
host2.equipos.isla1.ugr.es.  3600 IN A   192.168.1.12
```

> Las IPs de `host1`, `host2`… son inventadas. En el lab, el servidor delegado usaría su IP `172.16.X.Y`.

### 9.4 Comprobar y reiniciar

```bash
sudo named-checkconf
sudo named-checkzone equipos.isla1.ugr.es /etc/bind/db.equipos.isla1.ugr.es
sudo systemctl restart bind9.service
```

### 9.5 Probar en local desde el delegado

Con `nameserver 127.0.0.1` en su `/etc/resolv.conf`:

```bash
dig host1.equipos.isla1.ugr.es
```

### 9.6 Configurar la delegación en el **primario**

Añadir al final de `/etc/bind/db.isla1.ugr.es` **dos registros**:

```dns
; Delegación de la subzona equipos.isla1.ugr.es
equipos.isla1.ugr.es.   3600 IN NS  delegado.isla1.ugr.es.
delegado.isla1.ugr.es.  3600 IN A   192.168.1.2
```

| Registro | Para qué |
|----------|----------|
| **NS** | Dice “la subzona `equipos.isla1.ugr.es` la gestiona el servidor `delegado.isla1.ugr.es`”. |
| **A** (*glue record*) | Da la IP de ese servidor. Sin él habría una dependencia circular: para resolver `delegado.isla1.ugr.es` habría que preguntarle precisamente a él. |

Recordar: **incrementar el serial**, `named-checkzone` y `sudo systemctl restart bind9.service`.

### 9.7 Prueba de la delegación y flag `aa`

Desde el cliente, preguntar **al primario** por un nombre de la subzona:

```bash
dig @192.168.1.1 host1.equipos.isla1.ugr.es
```

**¿Se sirve el contenido?** Sí: el primario no tiene ese registro, pero sabe (por el NS + A) que debe preguntar al delegado y devuelve el resultado.

**¿Es una respuesta con autoridad?** **No** desde el punto de vista del primario: en la cabecera de `dig` **no aparece el flag `aa`** (la respuesta viene de otro servidor y llega a través de él). El flag `aa` sí aparecería si se le preguntara **directamente al delegado** (`dig @192.168.1.2 host1.equipos.isla1.ugr.es`), porque él es quien tiene autoridad sobre esa subzona. Con `aa` se distingue una respuesta autoritativa de una procedente de caché o de resolución recursiva.

> 💡 Si el primario no resolviera por su cuenta, devolvería una **referencia** (sección *AUTHORITY* con el NS y *ADDITIONAL* con el glue) y el cliente tendría que preguntar al delegado (resolución iterativa). Revisa también `recursion` en el primario si te devuelve `REFUSED`.

---

## 10. Tarea 4 — Inspección con Wireshark

### 10.1 Preparación

1. Abrir **Wireshark** en el servidor primario.
2. Elegir la **interfaz de la red de gestión** (en VM, la ethernet con `192.168.1.x`; en el lab, la `172.16.X.Y`).
3. Filtro útil: `dns` (o `udp.port == 53`).

### 10.2 Consulta sobre contenido del propio primario

```bash
dig host5.isla1.ugr.es
```

**Qué se observa:** un par **pregunta/respuesta DNS** (cliente → primario, primario → cliente). Sin tráfico adicional: el primario responde él mismo, y la respuesta lleva el flag **`aa`**.

### 10.3 Consulta sobre contenido del delegado

```bash
dig host1.equipos.isla1.ugr.es
```

**Qué se observa** (esquema típico, 4 paquetes):

```
Cliente ──(1) consulta──────────►  Primario
                                   Primario ──(2) consulta──────► Delegado
                                   Primario ◄─(3) respuesta (aa)─ Delegado
Cliente ◄─(4) respuesta────────── Primario   (sin aa)
```

El primario reenvía la consulta al delegado, recibe la respuesta (con `aa`, porque el delegado es autoridad), la guarda en **caché** y se la devuelve al cliente (sin `aa`).

### 10.4 Reiniciar el primario y repetir

```bash
sudo systemctl restart bind9.service
# iniciar captura y repetir
dig host1.equipos.isla1.ugr.es
```

**¿Mismo esquema?** **Sí**: al reiniciar BIND se **vacía la caché**, así que el primario vuelve a tener que consultar al delegado (los mismos 4 paquetes).

Contraste con la caché: si **sin reiniciar** repites la consulta de nuevo, el primario ya conoce la respuesta (mientras no expire su TTL) y contesta **directamente** (solo 2 paquetes: consulta y respuesta cliente↔primario), sin generar tráfico hacia el delegado.

---

## 11. Errores típicos y troubleshooting

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| `bind9` no arranca / puerto 53 ocupado | `systemd-resolved` activo | `sudo systemctl stop systemd-resolved.service` |
| `dig` → *connection timed out* | `bind9` parado, o `resolv.conf` apunta a otra IP | Arrancar bind9; revisar `nameserver` |
| `SERVFAIL` | Error en el fichero de zona o DNSSEC activo | `named-checkzone`, `dnssec-validation no;` |
| Cambios en la zona que no se reflejan | No se subió el `serial` o no se reinició | Incrementar serial + `restart bind9` |
| Nombres con dominio duplicado (`x.isla1.ugr.es.isla1.ugr.es`) | Falta el **punto final** en un FQDN | Terminar los FQDN con `.` |
| `NXDOMAIN` en un nombre que sí existe | Errata en el nombre o falta el punto final | Revisar con `named-checkzone` |
| `REFUSED` | El servidor no permite recursión a ese cliente | Revisar `recursion`/ACLs en `named.conf.options` |
| `named-checkconf` da error | Falta un `;` o `}` | Corregir la sintaxis (cada declaración acaba en `;`) |
| No hay ping entre VMs | IPs mal asignadas o cable desconectado | `ip -c a`, comprobar red de VirtualBox |
| El log no dice nada claro | — | `sudo journalctl -u bind9 -e` o `sudo systemctl status bind9` |

---

## 12. Chuleta de comandos

```bash
# Instalación y servicio
sudo apt install bind9
sudo systemctl restart bind9.service
sudo systemctl stop bind9.service
sudo systemctl status bind9.service

# Desactivar el resolutor local
sudo systemctl stop systemd-resolved.service

# Red
sudo nmcli networking off && sudo nmcli networking on
ip -c a
ping <ip>

# Verificación de configuración
sudo named-checkconf
sudo named-checkzone <zona> <fichero_db>

# Consultas DNS
nslookup <nombre>
host <nombre>
dig <nombre>
dig @<ip_servidor> <nombre>      # preguntar a un servidor concreto
dig <nombre> NS                  # pedir un tipo de registro concreto
```

### Ficheros importantes

| Ruta | Contenido |
|------|-----------|
| `/etc/resolv.conf` | Servidor DNS al que pregunta la máquina |
| `/etc/bind/named.conf` | Configuración principal (incluye los tres siguientes) |
| `/etc/bind/named.conf.options` | Opciones: `dnssec-validation no;`, `recursion yes;` |
| `/etc/bind/named.conf.default-zones` | Zonas por defecto (incluye la raíz `.` como `hint`) |
| `/etc/bind/named.conf.local` | Zonas con autoridad de este servidor |
| `/etc/bind/db.<zona>` | Registros de cada zona |

---

*Resumen elaborado a partir del guion “Práctica 3: Configuración del servicio DNS en el laboratorio” (Sistemas Telemáticos, Dpto. Teoría de la Señal, Telemática y Comunicaciones, UGR). Autoría original del guion: G. Maciá, J. Camacho, L. Sánchez, P. Padilla y R. Rodríguez. Esta guía es material de estudio personal.*
