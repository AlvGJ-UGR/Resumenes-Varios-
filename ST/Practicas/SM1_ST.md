# Sistemas Telemáticos — Seminario 1 (primer y segundo vídeo)

**Universidad de Granada · 2º Grado en Ingeniería de Tecnologías de Telecomunicación**

| Vídeo | Título |
|-------|--------|
| **Primer vídeo** | **VirtualBox, IP estática y servicios en Linux** |
| **Segundo vídeo** | **Programa un cliente-servidor para TCP y UDP usando Python** |

> **Para qué sirve este documento:** esquema **completo** de los dos vídeos (texto **y** figuras: salidas de comandos, capturas de Wireshark y código Python), pensado para preparar un **test**.
> **Marcas:**
> - Lo que no lleva marca es contenido **del documento**.
> - > **Ampliación:** explicación **añadida** (no está en el documento).
> - **Ojo (errata/matiz)** = el documento dice algo impreciso o inconsistente; te indico cómo interpretarlo.
> - Las **figuras** (capturas) las he leído de las imágenes del PDF; lo que no se leía con claridad lo indico.

**Fuente:** apuntes de estudiante (PDF de Wuolah) de los dos vídeos del Seminario 1, fechados el **21 de octubre de 2024**.

---

## Índice

**Parte A — Primer vídeo: VirtualBox, IP estática y servicios en Linux**
[A1 Presentación](#a1-presentación) · [A2 Esquema de conectividad](#a2-esquema-de-la-conectividad-entre-máquinas) · [A3 Clonación enlazada](#a3-clonación-enlazada-de-máquinas-en-virtualbox) · [A4 Gestión de interfaces](#a4-gestión-de-interfaces-de-red-ifconfig-ip-netmanager-y-ping) · [A5 `/etc/hosts`](#a5-resolución-de-dns-local-etchosts) · [A6 Puertos](#a6-esquema-de-comunicaciones-con-puertos-específicos) · [A7 Netcat](#a7-netcat-para-testear-conectividad-a-nivel-de-transporte) · [A8 netstat y ss](#a8-netstat-o-ss-conexiones-en-escucha-o-establecidas) · [A9 Servicios](#a9-gestión-de-servicios-en-linux-service-y-systemctl)

**Parte B — Segundo vídeo: cliente-servidor TCP y UDP en Python**
[B1 Presentación](#b1-presentación) · [B2 Teoría TCP y UDP](#b2-teoría-básica-de-tcp-y-udp) · [B3 Configuración de VirtualBox](#b3-configuración-de-virtualbox) · [B4 Revisión de IPs y netcat](#b4-revisión-de-las-direcciones-ip-y-netcat) · [B5 Wireshark](#b5-inspección-con-wireshark-de-las-comunicaciones-con-netcat) · [B6 UDP: esquema](#b6-esquema-de-un-cliente-servidor-udp-en-python) · [B7 UDP: programación](#b7-programación-de-un-clienteservidor-udp-en-la-terminal-de-python) · [B8 TCP: esquema](#b8-esquema-de-un-cliente-servidor-tcp-en-python) · [B9 TCP: programación](#b9-programación-de-un-clienteservidor-tcp-en-python) · [B10 Pruebas](#b10-pruebas-y-verificación)

**Parte C — Repaso**
[C1 Datos literales](#c1-datos-literales-para-memorizar) · [C2 Comparativas](#c2-comparativas-clave) · [C3 Erratas y matices](#c3-erratas-y-matices-del-documento) · [C4 Test de repaso](#c4-test-de-repaso)

---

---

# PARTE A — Primer vídeo: VirtualBox, IP estática y servicios en Linux

## A1. Presentación

En este vídeo se:

1. **Configuran direcciones IP** de varias máquinas conectadas en red mediante **VirtualBox**.
2. **Ven las conexiones existentes** con el comando **`ss`** (**antiguo `netstat`**).
3. **Prueban la conectividad a puertos específicos** usando **`ping`** y **`netcat`**.
4. **Gestionan demonios y servicios de Linux** con **`service`** y **`systemctl`**.
5. Al final **se plantean retos adicionales** (el documento **no los detalla**).

---

## A2. Esquema de la conectividad entre máquinas

- Se **conectan dos máquinas virtuales** mediante una **red virtual interna**.
- Las máquinas están **virtualizadas en VirtualBox** sobre un **sistema anfitrión** que puede ser **Linux, Windows o Mac**.
- **Ambas** usan el sistema operativo **Ubuntu**, que es **ligero y permite una ejecución fluida**. *(En la figura aparece el logotipo de **Lubuntu**, la variante ligera de Ubuntu.)*
- **Direcciones IP estáticas:**

| Máquina | IP estática |
|---------|-------------|
| **Cliente** | **`192.168.1.1`** |
| **Servidor** | **`192.168.1.2`** |

- Las máquinas se conectan mediante una **red interna llamada `Red Seminarios`** (en la figura: **`redseminarios`**).
- Además se configura **una red NAT** para que **ambas puedan acceder a Internet**.

```
                          ┌──────────┐
                          │ Internet │
                          └────┬─────┘
                  NAT ─────────┴──────── NAT
                   │                      │
          ┌────────┴────────┐    ┌────────┴────────┐
          │    CLIENTE      │    │    SERVIDOR     │
          │  192.168.1.1    │    │  192.168.1.2    │
          │  (Lubuntu)      │    │  (Lubuntu)      │
          └────────┬────────┘    └────────┬────────┘
                   └───────  redseminarios  ────────┘
                        (red interna)
```

> **Ampliación:** cada máquina tiene **dos adaptadores**: el **1** (NAT, sale a Internet, IP por DHCP) y el **2** (red interna, IP estática para hablarse entre ellas).

---

## A3. Clonación enlazada de máquinas en VirtualBox

- Ya se tiene **la máquina base importada** en VirtualBox.
- Se usa como base para **clonar dos máquinas virtuales** mediante **clonación enlazada**.
- **Qué significa "enlazada":** **ambas comparten la base** y **solo almacenan los cambios** → **ahorra espacio en disco**.

### Pasos de la clonación

| # | Paso |
|---|------|
| **1** | **Seleccionar la máquina base** y **clic derecho → "Clonar"** |
| **2** | **Asignar un nombre** a cada máquina: **"Cliente"** y **"Servidor"** |
| **3** | Seleccionar **"Clonación enlazada"** y **generar nuevas direcciones MAC** para **evitar conflictos de red** |

### Configuración de los adaptadores de red

| Adaptador | Conectado a |
|-----------|-------------|
| **Adaptador 1** | **Internet mediante NAT** |
| **Adaptador 2** | **Red interna `Red Seminarios`** |

> **Importante:** **ambas máquinas deben usar el mismo nombre de red interna**; **si no, no podrán comunicarse**.

---

## A4. Gestión de interfaces de red: `ifconfig`, `ip`, NetManager y `ping`

Una vez iniciadas las máquinas se usan comandos para **gestionar y verificar** las interfaces de red.

### A4.1 `ifconfig`

- Es el **comando clásico de Linux** para ver **interfaces de red, direcciones IP y direcciones MAC**.
- **Resultado:** **dos interfaces de tipo ethernet** y **una adicional de loopback** (para hacer una conexión con nosotros mismos).
- **Cómo saber cuál es NAT y cuál es la red interna:** en VirtualBox → **configuración → red**; ahí se ve **qué tiene asignado cada adaptador**. **La primera es NAT y la segunda es la de red interna.**

**Salida de la figura (antes de configurar la IP estática):**

| Interfaz | Estado/flags | IP | Máscara | Broadcast | MAC (`ether`) | Papel |
|----------|--------------|----|---------|-----------|---------------|-------|
| **`enp0s3`** | `UP,BROADCAST,RUNNING,MULTICAST` · mtu 1500 | `10.0.2.15` | `255.255.255.0` | `10.0.2.255` | `08:00:27:08:a6:61` | **NAT** (1.ª) |
| **`enp0s8`** | `UP,BROADCAST,RUNNING,MULTICAST` · mtu 1500 | `192.168.33.10` | `255.255.255.0` | `192.168.33.255` | `08:00:27:37:96:cc` | **Red interna** (2.ª) |
| **`lo`** | `UP,LOOPBACK,RUNNING` · mtu 65536 | `127.0.0.1` | `255.0.0.0` | — | — | **Loopback** |

- Cada interfaz también muestra `inet6` (IPv6, p. ej. `::1` en `lo`) y contadores **RX/TX** (paquetes, bytes, errores…).
- **Detalle:** la IP **`192.168.33.10`** de `enp0s8` es la que traía por defecto; se **cambiará a `192.168.1.x`** en NetManager.

### A4.2 `ip address`

- **Comando más moderno que reemplaza a `ifconfig`**; ofrece **información detallada** de las interfaces.
- La opción **`-c`** muestra los resultados **en colores**:

```bash
ip -c address        # equivalente abreviado:  ip -c a
```

**Salida de la figura (`ip -c a`):**

| Interfaz | Detalle |
|----------|---------|
| **`1: lo`** | `LOOPBACK,UP,LOWER_UP` · mtu 65536 · `link/loopback 00:00:00:00:00:00` · `inet 127.0.0.1/8 scope host lo` · `inet6 ::1/128` · `valid_lft forever` |
| **`2: enp0s3`** | `BROADCAST,MULTICAST,UP,LOWER_UP` · mtu 1500 · state **UP** · `link/ether 08:00:27:43:a6:69` · **`inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic noprefixroute`** · `valid_lft 85592sec` (**dinámica, DHCP, caduca**) |
| **`3: enp0s8`** | ídem · `link/ether 08:00:27:a8:9e:b4` · **`inet 192.168.33.10/24 brd 192.168.33.255 scope global noprefixroute`** · `valid_lft forever` (**estática, no caduca**) |

> **Ampliación:** en `ip a`, **`dynamic`** indica IP obtenida por **DHCP** (con tiempo de validez) y su ausencia, IP **estática** (`valid_lft forever`). La notación **`/24`** equivale a la máscara **255.255.255.0**.

### A4.3 NetManager (interfaz gráfica)

- Se usa para **gestionar las interfaces de red desde la interfaz gráfica**.
- Permite **editar las conexiones**, **asignar direcciones IP estáticas** y **reiniciar las interfaces**.
- **Para que NetworkManager "se dé cuenta" del cambio** hay varias opciones; **la más sencilla**: **clic con el botón izquierdo y "desconectar" esta conexión** (después se vuelve a conectar).

**Ventana de la figura (*Editing Wired connection 2* → pestaña *IPv4 Settings*):**

| Campo | Máquina **Cliente** | Máquina **Servidor** |
|-------|---------------------|----------------------|
| **Method** | `Manual` | `Manual` |
| **Address** | `192.168.1.1` | `192.168.1.2` |
| **Netmask** | `24` | `24` |
| **Gateway** | *(vacío)* | *(vacío)* |
| DNS servers / Search domains | *(vacíos)* | *(vacíos)* |

Botones: **Add**, **Delete**, **Routes…**, **Cancel**, **Save**. Pestañas: General, Ethernet, 802.1X Security, DCB, Proxy, **IPv4 Settings**, IPv6 Settings.

> **Ojo (errata):** el documento escribe **"NetManager"**; la herramienta real se llama **NetworkManager**.

### A4.4 `ping`

- Se usa **para probar la conectividad entre las dos máquinas**.
- Desde el **cliente** se prueba la conexión con el servidor:

```bash
ping 192.168.1.2
```

- Envía **paquetes ICMP** a la IP del servidor y **verifica si hay respuesta**.

**Salida de la figura (cliente → servidor):**

```
PING 192.168.1.2 (192.168.1.2) 56(84) bytes of data.
64 bytes from 192.168.1.2: icmp_seq=1 ttl=64 time=0.994 ms
64 bytes from 192.168.1.2: icmp_seq=2 ttl=64 time=0.598 ms
64 bytes from 192.168.1.2: icmp_seq=3 ttl=64 time=0.570 ms
^C
--- 192.168.1.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2027ms
rtt min/avg/max/mdev = 0.570/0.720/0.994/0.193 ms
```

Y desde el **servidor → cliente** (`ping 192.168.1.1`): 3 paquetes, **0 % de pérdida**, `rtt min/avg/max/mdev = 0.654/0.730/0.825/0.070 ms`.

> **Ampliación:** `56(84) bytes` = 56 de datos + 28 de cabeceras (ICMP + IP); `ttl=64` es el valor inicial típico de Linux; `^C` = `Ctrl+C` para parar; `0% packet loss` = conectividad correcta.

---

## A5. Resolución de DNS local: `/etc/hosts`

- **Recordar IPs es complicado**, así que se pueden **configurar nombres locales editando `/etc/hosts`**.
- Esto **asigna un nombre a una IP**.

```bash
sudo nano /etc/hosts
# o también
sudo geany /etc/hosts
```

Dentro del archivo se agrega:

```
192.168.1.2 servidor
192.168.1.1 cliente
```

- Esto permite usar **`ping servidor`** en lugar de **`ping 192.168.1.2`**.
- **En el cliente se añade el servidor, y en el servidor se añade el cliente** (cada máquina conoce a la otra).

**Figura (Geany abriendo `/etc/hosts`):**

```
1  # Standard host addresses
2  127.0.0.1  localhost
3  192.168.1.2 servidor
4  ::1        localhost ip6-localhost ip6-loopback
5  ff02::1    ip6-allnodes
6  ff02::2    ip6-allrouters
```

> **Ampliación:** el archivo se edita con **`sudo`** porque pertenece a root. `/etc/hosts` es una **resolución local** que el sistema consulta **antes** de preguntar a un servidor DNS (conecta con la Práctica 3).

---

## A6. Esquema de comunicaciones con puertos específicos

- En un **servidor** pueden ejecutarse **varias aplicaciones a la vez**, y **cada una escucha en un puerto específico**.
- **Puertos efímeros** = **puertos temporales generados por el cliente** para conectarse con **el puerto conocido del servidor**.

### A6.1 Ejemplo de comunicación con puertos

- Un cliente puede conectarse a un puerto específico del servidor:

| Puerto | Servicio |
|--------|----------|
| **80** | **Servidor web** |
| **53** | **DNS** |
| **22** | **SSH** |

- Los **puertos efímeros se asignan aleatoriamente para cada conexión.**

```
 CLIENTE                         SERVIDOR
 IP 192.168.1.1                  IP 192.168.1.2
 puerto efímero (aleatorio) ───► puerto conocido (80, 53, 22, 12345…)
```

---

## A7. Netcat para testear conectividad a nivel de transporte

- **Netcat (`nc`)** es una herramienta potente para **probar la conectividad a través de puertos específicos**.
- Para **simular una conexión cliente-servidor**:

| Lado | Comando | Qué hace |
|------|---------|----------|
| **Servidor** | **`nc -l 12345`** | **Escucha** en un puerto específico (`-l` = *listen*) |
| **Cliente** | **`nc 192.168.1.2 12345`** | **Se conecta** al servidor en ese puerto |

- **Una vez establecida la conexión**, **ambas máquinas pueden intercambiar mensajes**.

---

## A8. `netstat` o `ss`: conexiones en escucha o establecidas

Para **verificar conexiones activas y puertos en escucha**: `netstat` o `ss`.

### A8.1 `netstat`

- Muestra **estadísticas de red y conexiones activas**.
- Con **`-tln`** se ven **las conexiones TCP en estado de escucha**:

| Opción | Significado |
|--------|-------------|
| **`-t`** | estadísticas del protocolo **TCP** |
| **`-n`** | mostrar el **número de los puertos** (en vez de nombres) |
| **`-l`** | ***listening***: conexiones **en escucha** |

```bash
netstat -tln
```

**Salida de la figura (`Active Internet connections (only servers)`):**

| Proto | Recv-Q | Send-Q | Local Address | Foreign Address | State |
|-------|--------|--------|---------------|-----------------|-------|
| tcp | 0 | 0 | `127.0.0.1:631` | `0.0.0.0:*` | LISTEN |
| tcp | 0 | 0 | `0.0.0.0:22` | `0.0.0.0:*` | LISTEN |
| tcp | 0 | 0 | `127.0.0.53:53` | `0.0.0.0:*` | LISTEN |
| tcp6 | 0 | 0 | `:::993` · `:::995` · `:::143` · `:::22` · `:::80` · `:::110` · `::1:631` | `:::*` | LISTEN |

> **Ampliación (qué es cada puerto):** 631 = impresión (CUPS), 22 = SSH, 53 = DNS (resolutor local `127.0.0.53`), 993/143 = IMAP(S), 995/110 = POP3(S), 80 = web. `0.0.0.0` = **escucha en todas las interfaces**; `127.0.0.1` = **solo local**; `:::` = equivalente IPv6.

### A8.2 `ss`

- Es la **versión moderna de `netstat`** y **funciona de manera similar**:

```bash
ss -tln
```

- **Ambos muestran direcciones IP, puertos y estado** de las conexiones.
- El documento explica que con **`sudo ss -tln`** se puede **saber la aplicación** que se usa: en el ejemplo **`nc` (netcat) en el puerto 12345**.

**Salida de la figura (`sudo ss -tlnp`):**

| State | Recv-Q | Send-Q | Local Address:Port | Peer Address:Port | Process |
|-------|--------|--------|--------------------|-------------------|---------|
| LISTEN | 0 | 128 | `127.0.0.1:631` | `0.0.0.0:*` | `cupsd` (pid=634, fd=7) |
| LISTEN | 0 | 1 | **`0.0.0.0:12345`** | `0.0.0.0:*` | **`nc`** (pid=2598, fd=3) |
| LISTEN | 0 | 4096 | `127.0.0.53%lo:53` | `0.0.0.0:*` | (systemd-resolve) |

> **Ojo (errata):** el texto dice `sudo ss -tln`, pero **para ver el nombre del proceso hace falta la opción `-p`** (la captura usa `sudo ss -tlnp`). `-p` necesita **privilegios de administrador** (`sudo`).

---

## A9. Gestión de servicios en Linux: `service` y `systemctl`

- **Servicios o demonios** = **procesos que se ejecutan en segundo plano** para **proporcionar servicios de red**, como **servidores web** o **servicios SSH**.

### A9.1 `service`

- Permite **iniciar, detener o reiniciar (`restart`)** servicios.
- Ejemplo con **`apache2`**:

```bash
sudo service apache2 start
sudo service apache2 stop
```

- **Orden:** hay que poner **`start`, `stop` o `restart` DESPUÉS del nombre del servicio.**

### A9.2 `systemctl`

- **Versión moderna** para gestionar servicios en sistemas que utilizan **`systemd`**.
- **Orden:** hay que poner **`start`, `stop` o `restart` ANTES del nombre del servicio.**

```bash
sudo systemctl start apache2.service
sudo systemctl stop apache2.service
```

| | `service` | `systemctl` |
|--|-----------|-------------|
| **Orden** | `service` **servicio** `acción` | `systemctl` `acción` **servicio** |
| Ejemplo | `sudo service apache2 start` | `sudo systemctl start apache2.service` |
| Antigüedad | clásico | **moderno** (sistemas con **systemd**) |
| Acciones citadas | start, stop, restart | start, stop, restart |

> **Regla mnemotécnica:** **`service`** → la acción va **después** · **`systemctl`** → la acción va **antes**.

---

---

# PARTE B — Segundo vídeo: cliente-servidor TCP y UDP en Python

## B1. Presentación

Se tratan las **comunicaciones cliente-servidor** con los protocolos de transporte **TCP y UDP**:

1. **Repaso de la teoría** de ambos protocolos.
2. **Captura de tráfico TCP con Wireshark.**
3. **Dos programas cliente-servidor en Python:** **uno para UDP y otro para TCP.**

---

## B2. Teoría básica de TCP y UDP

- Son protocolos de la **capa de transporte**.
- **Toman los datos de la capa de aplicación** y **añaden la información necesaria** para transmitirlos por la red.

| | **UDP** | **TCP** |
|--|---------|---------|
| **Complejidad** | **Más sencillo** | **Más complejo** |
| **Control de errores** | **Sin mecanismos de control de errores** | Con mecanismos de control |
| **Conexión** | **No orientado a conexión** | **Orientado a conexión** |
| **Entrega** | Sin garantías | **Garantiza la entrega de los paquetes en el orden correcto** |
| **Inicio** | Sin inicio de conexión | **Three-way handshake: `SYN`, `SYN-ACK`, `ACK`** |

```
 UDP (sin conexión)                  TCP (con three-way handshake)
 Cliente        Servidor              Cliente             Servidor
   │── Solicitud ──►│                    │──── SYN ────────►│
   │◄── Respuesta ──│                    │◄─── SYN + ACK ───│
   │      ...       │                    │──── ACK ────────►│
   │◄── Respuesta ──│
```

(La figura del vídeo sitúa ambos en la capa **Transporte** de la pila: Aplicación / **Transporte** / Red / Red subyacente.)

> **Ampliación:** el **handshake** *establece* la conexión; el **orden** de los datos lo garantizan después los **números de secuencia**. El documento lo resume diciendo que "gracias al three-way handshake" se garantiza el orden.

---

## B3. Configuración de VirtualBox

- Para probar TCP y UDP se usan **máquinas virtuales en VirtualBox**.
- **Pueden hacerse en una sola máquina**, pero **es recomendable usar dos**: **una para el cliente y otra para el servidor.**
- **Antes de empezar, se recomienda crear una instantánea (snapshot)** de las máquinas **por si hay que restaurarlas más tarde**.

---

## B4. Revisión de las direcciones IP y netcat

- Se usa **`ip -c a`** para **verificar las direcciones IP**.
- **Cliente:** **`192.168.1.1`** · **Servidor:** **`192.168.1.2`**.
- Con **netcat** se **prueban las conexiones** entre ambas: **se abre un puerto para escuchar en el servidor** y **se conecta desde el cliente** con **`nc 192.168.1.2 12345`** *(ver primer vídeo del seminario 1)*.

---

## B5. Inspección con Wireshark de las comunicaciones con netcat

- Se usa **`sudo wireshark`** para **capturar y analizar el tráfico** entre cliente y servidor.
- Se **filtran los mensajes TCP** (filtro **`tcp`**) para estudiar **el three-way handshake** y **los datos transmitidos**.
- Wireshark permite ver los mensajes **SYN, SYN-ACK, ACK**, y **los paquetes con los datos reales**.

**Qué se ve en la captura:**
- Protocolo: **TCP (Transmission Control Protocol)**.
- **Puerto origen `59842`** → **puerto destino `12345`**.
- **Entre corchetes (columna *Info*) se ve el tipo de mensaje:** `SYN`, `SYN, ACK`, `ACK`.
- **`PSH`** indica que es un **mensaje *Push*** (se entregan datos).
- **`FIN`** indica **fin de comunicación**.

**Captura de la figura (filtro `tcp`, interfaz `enp0s8`):**

| Nº | Origen → Destino | Longitud | Info (resumen) | Qué es |
|----|------------------|----------|----------------|--------|
| 1 | `192.168.1.1` → `192.168.1.2` | 74 | `59842 → 12345 [SYN] Seq=0 Win=64240 Len=0 MSS=1460…` | **1.er paso**: el cliente pide la conexión |
| 2 | `192.168.1.2` → `192.168.1.1` | 74 | `12345 → 59842 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0…` | **2.º paso**: el servidor acepta |
| 3 | `192.168.1.1` → `192.168.1.2` | 66 | `59842 → 12345 [ACK] Seq=1 Ack=1 Win=64256 Len=0…` | **3.er paso**: el cliente confirma → **conexión establecida** |
| 8 | `192.168.1.1` → `192.168.1.2` | 71 | `[PSH, ACK] Seq=1 Ack=1 … Len=5` | El cliente **envía 5 bytes de datos** |
| 9 | `192.168.1.2` → `192.168.1.1` | 66 | `[ACK] Seq=1 Ack=6 … Len=0` | El servidor **confirma** esos 5 bytes |
| 10 | `192.168.1.2` → `192.168.1.1` | 76 | `12345 → 59842 [PSH, ACK] Seq=1 Ack=6 … Len=10` | El servidor **envía 10 bytes** |
| 11 | `192.168.1.1` → `192.168.1.2` | 66 | `[ACK] Seq=6 Ack=11 … Len=0` | El cliente **confirma** |
| 12 | `192.168.1.1` → `192.168.1.2` | 66 | `[FIN, ACK] Seq=6 Ack=11 … Len=0` | El cliente **cierra** |
| 13 | `192.168.1.2` → `192.168.1.1` | 66 | `[FIN, ACK] Seq=11 Ack=7 … Len=0` | El servidor **cierra** |
| 14 | `192.168.1.1` → `192.168.1.2` | 66 | `[ACK] Seq=7 Ack=12 … Len=0` | **Último ACK** → conexión terminada |

Detalle del paquete 1 (panel inferior): **`Frame 1: 74 bytes on wire (592 bits)`** en la interfaz **`enp0s8`**; **Ethernet II** `Src: PcsCompu_1b:76:ab (08:00:27:1b:76:ab)` → `Dst: PcsCompu_d8:a6:bd (08:00:27:d8:a6:bd)`; **IPv4** `Src: 192.168.1.1, Dst: 192.168.1.2`; **TCP** `Src Port: 59842, Dst Port: 12345, Seq: 0, Len: 0`.

> **Nota sobre la figura:** en el filtro `tcp` la columna **Nº** salta del 3 al 8 (los números 4–7 no se ven en la vista). Los **tiempos** de la columna *Time* de algunos paquetes aparecen casi simultáneos o con signo negativo en la captura: es un artefacto de la captura, no hay que interpretarlo.
> **Ampliación:** el **cierre** usa **FIN/ACK en cada sentido** (aquí cada lado envía su `FIN, ACK` y el último `ACK` confirma). El `Ack` es siempre el **siguiente byte esperado** (p. ej. tras enviar 5 bytes con `Seq=1`, se responde `Ack=6`). Los **5 bytes** del cliente y los **10 bytes** del servidor son los mensajes de texto escritos en `nc` (probablemente con salto de línea).

---

## B6. Esquema de un cliente-servidor UDP en Python

- **Primero se programa el servidor UDP** en Python, usando el **módulo `socket`**.
- **Socket** = abstracción que **permite al lenguaje de programación comunicarse con (o solicitar lo que necesita al) kernel del sistema operativo**.
- El servidor **escucha en el puerto `12345`**.
- **El cliente envía mensajes con `sendto`** y **el servidor los recibe con `recvfrom`**.
- **Una vez intercambiados los mensajes, se cierran los sockets.**

**Esquema de llamadas (figura):**

```
        CLIENTE                         SERVIDOR
        socket                          socket
          │                               │
        sendto  ┄┄┄┄┄(datagrama)┄┄┄┄┄►  bind(socket)
          │                               │
        recvfrom ◄┄┄┄(respuesta)┄┄┄┄┄┄  recvfrom
          │                               │
        close                           sendto
                                          │
                                        close
```

| Cliente UDP | Servidor UDP |
|-------------|--------------|
| `socket` | `socket` |
| `sendto` | `bind(socket)` |
| `recvfrom` | `recvfrom` |
| `close` | `sendto` |
| | `close` |

---

## B7. Programación de un cliente/servidor UDP en la terminal de Python

- **Cliente y servidor deben crear un socket** en Python.
- **El servidor usa `bind`** para escuchar en un puerto específico y **recibe datos con `recvfrom`**.
- **El cliente usa `sendto`** para enviar datos al servidor.
- Se arranca el **intérprete de Python** con el comando **`python`** (en la captura: **Python 2.7.18**, GCC 11.2.0 en `linux2`).

### B7.1 Servidor UDP (máquina `192.168.1.2`)

```python
>>> import socket
>>> server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
>>> server_socket.bind(('192.168.1.2', 12345))
>>> data = server_socket.recvfrom(1024)       # se queda bloqueado esperando
```

| Elemento | Explicación del documento |
|----------|---------------------------|
| **`import socket`** | Importa la librería **socket**, **la abstracción que permite comunicarse con el kernel de Linux** |
| **`server_socket = socket.socket(...)`** | Crea una variable socket llamada `server_socket` |
| **`socket.AF_INET`** | Tipo **INET**: **socket de Internet** |
| **`socket.SOCK_DGRAM`** | Socket **datagrama** = **socket UDP** |
| **`bind(('192.168.1.2', 12345))`** | Define que **en este socket se escuchará desde esa IP** (**la nuestra, desde el punto de vista del servidor**) **y ese puerto** |
| **`data = ...recvfrom(1024)`** | Guarda lo recibido en la variable **`data`**. **`recvfrom` toma como argumento el nº máximo de bytes que esperará: 1024** |

### B7.2 Cliente UDP (máquina `192.168.1.1`)

```python
>>> import socket
>>> client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
>>> client_socket.sendto('Hola clase', ('192.168.1.2', 12345))
10
```

- **Lo mismo que el servidor, pero con otro nombre de variable** (`client_socket`).
- **`sendto(mensaje, (IP_destino, puerto_destino))`**: **el cliente indica a quién envía**.
- Devuelve **`10`**: **10 bytes enviados** = **4 de "Hola" + 1 espacio + 5 de "clase"**.

### B7.3 Ver las conexiones UDP: `sudo ss -unlp`

```bash
sudo ss -unlp
```

| Opción | Significado |
|--------|-------------|
| **`u`** | protocolo **UDP** |
| **`n`** | mostrar **directamente el número de puerto** (sin intentar resolverlo) |
| **`l`** | **escuchando** (en este caso el puerto 12345) |
| **`p`** | ver **qué proceso** lo usa (aquí **`python2.7`**) |

**Línea relevante de la figura:** `UNCONN  0  0  192.168.1.2:12345  0.0.0.0:*  users:(("python2.7",pid=94452,fd=3))`.

> **Ampliación:** el estado es **`UNCONN`** (*unconnected*) porque **UDP no tiene conexión**; con TCP se vería `LISTEN`/`ESTAB`.

### B7.4 Resultado del intercambio

- **La terminal del servidor sigue bloqueada** esperando en `recvfrom`.
- Al ejecutar el **`sendto` del cliente**, el servidor **recibe en el puerto en el que esperaba** y **se desbloquea**: **se recupera el control**.
- El cliente indica que **envió 10 bytes**.
- En el servidor, `data` contiene **una tupla con el mensaje y la dirección del remitente**:

```python
>>> data
('Hola clase', ('192.168.1.1', 45707))
```

| Parte | Significado |
|-------|-------------|
| **`'Hola clase'`** | El **mensaje** |
| **`('192.168.1.1', 45707)`** | **La tupla de quién ha enviado** el mensaje: **IP del cliente** y su **puerto, elegido de forma aleatoria por el cliente (puerto efímero)** |

- **Si se ejecutara otra vez, ese puerto sería otro cualquiera.** *(El número exacto de la captura, `45707`, se lee con cierta dificultad.)*

### B7.5 Cierre

```python
>>> client_socket.close()
>>> server_socket.close()
```

- **Para salir del intérprete de Python:** **`quit()`** o **`Ctrl + D`**.

---

## B8. Esquema de un cliente-servidor TCP en Python

- La aplicación es igual (cliente + servidor) pero con **TCP**, que es **orientado a conexión** (**UDP no lo es**).
- **Qué implica "orientado a conexión":** hace falta **un inicio de conexión**, es decir, **establecer parámetros comunes** que permitan, por ejemplo, **ordenar los paquetes dentro de un flujo**.

### Diferencia fundamental: el servidor TCP usa **dos sockets**

| Socket | Nombre | Función |
|--------|--------|---------|
| **Primero** | **`s1`** | **Recibe las solicitudes de conexión** y **gestiona el three-way handshake** (el inicio de conexión) |
| **Segundo** | **`s2`** | **Se crea una vez hecho el inicio de conexión**; **gestiona el flujo**: **enviar y recibir datos**. **Ya no hace falta especificar a quién se envía o de quién se recibe**, porque la conexión ya está establecida |

> Con la "tubería" **`s2`** el servidor se comunica con **el cliente que inició la conexión**.

```
  Servidor
  ┌──────────────────────────────┐
  │  S1  recibe solicitudes      │◄── SYN del cliente
  │       │  accept()            │
  │       ▼                      │
  │  S2  recibe/envía datos      │◄──► datos del cliente
  └──────────────────────────────┘
```

### Llamadas nuevas respecto a UDP

| Llamada | Qué hace |
|---------|----------|
| **`listen`** | Pone **el primer socket en modo escucha**; **establece parámetros relativos al nº de conexiones** que se van a escuchar |
| **`accept`** | **Llamada bloqueante**: **espera hasta que el cliente haga un `connect`** |
| **`connect`** (cliente) | **Se comunica con el `accept`**, estableciendo el **three-way handshake (SYN, SYN-ACK, ACK)**; **como resultado se genera en el servidor un segundo socket (`s2`)**, **ya orientado a conexión** |

- **Toda la primera parte (socket, bind, listen) sucede hasta que se hace el `accept`.**
- Con `s2` se usa **directamente `recv`/`send`**: **no hay que especificar de dónde se recibe ni a quién se envía**, porque **el socket ya tiene la información del flujo**.

### Esquema de llamadas (figura)

| Cliente TCP | Servidor TCP |
|-------------|--------------|
| `socket` | `s1 = socket` |
| `s.connect` | `s1.bind()` |
| `s.send()` | `s1.listen()` |
| `s.recv()` | `s2 = s1.accept()` |
| `close` | `s2.recv()` |
| | `s2.send()` |
| | `close (s1 y s2)` |

```
   CLIENTE                         SERVIDOR
   socket                          s1 = socket
     │                               │
   s.connect ┄┄┄(three-way)┄┄┄►    s1.bind()
     │                               │
   ┌─ s.send()  ┄┄┄┄┄┄┄┄┄┄┄┄►     s1.listen()
   │  s.recv()  ◄┄┄┄┄┄┄┄┄┄┄┄      s2 = s1.accept()
   └──┐                          ┌─ s2.recv()
      │                          │  s2.send()
    close                        └──
                                 close (s1 y s2)
```

- El **cliente** tiene **lo mismo** (`send`, `receive`) **más `connect`**, que **gestiona el inicio de la conexión**.

### Finalización de la conexión

- **De forma análoga a UDP**, hay que **finalizar la conexión**.
- **Cliente:** cierra su socket.
- **Servidor:** tiene **dos sockets** (**el que está en escucha** y **el de la conexión**) → **hay que cerrar ambos**.
- **Cuando se envía un `close`, este se recibe en un `receive`**, **que realiza la operación de finalización**.

---

## B9. Programación de un cliente/servidor TCP en Python

- Dentro de **la carpeta `seminario`** (en la captura, `~/Desktop/Seminario2`) se abre la aplicación del servidor: **`edit servidor`**, **`geany servidor`** (o, en el seminario, **`nano`** para verlo directo en la terminal).
- **Python tiene en cuenta la indentación:**
  - Se usan **cuatro espacios**; **en cada línea nueva dentro de un bucle hay que conservarlos**.
  - **Si no**, Python entiende que **no estamos dentro del `while`** y **da error** al ejecutar.
  - **Igual con `if`**: **los dos puntos `:` abren una nueva indentación** (otros 4 espacios).
  - **Cualquier editor autocompleta los espacios con Enter.**

### B9.1 Código del servidor (`servidor.py`)

*(Reconstruido de la captura; los comentarios del original están en español sin tildes y algunos aparecen cortados.)*

```python
#!/usr/bin/env python

#importamos el modulo socket
import socket

#instanciamos un objeto para trabajar con el socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

#Con el metodo bind le indicamos que puerto debe escuchar...
#Es mejor dejarlo en blanco para recibir conexiones de cualquier IP
s.bind(("", 9999))

#Aceptamos conexiones entrantes con el metodo listen.
#El numero de conexiones entrantes que vamos a aceptar...
s.listen(1)

#Instanciamos un objeto sc (socket cliente) para recibir datos...
#devolvera tambien un objeto que representa una tupla...
sc, addr = s.accept()

while True:

    #Recibimos el mensaje, con el metodo recv recibimos datos y como parametro
    #la cantidad de bytes para recibir
    recibido = sc.recv(1024)

    #Si el mensaje recibido es la palabra close se cierra la aplicacion
    if recibido == "close":
        break

    #Si se reciben datos nos muestra la IP y el mensaje recibido
    print str(addr[0]) + " dice: ", recibido

    #Devolvemos el mensaje al cliente
    sc.send(recibido)

print "Adios."

#Cerramos la instancia del socket cliente y servidor
sc.close()
s.close()
```

**Explicación línea a línea (del documento):**

| Código | Explicación |
|--------|-------------|
| `import socket` | **Igual que en UDP** |
| `socket.socket(socket.AF_INET, socket.SOCK_STREAM)` | **Socket de tipo Internet**, de tipo **Stream** → **protocolo TCP** |
| `s.bind(("", 9999))` | **Enlaza el socket a una dirección IP** y al puerto **9999**. **Si no se especifica IP, puede recibir desde cualquier dirección IP** |
| *(sobre el bind)* | Si la máquina tuviera **cinco interfaces**, podría **recibir desde cualquiera** en el puerto 9999. **Si se especifica una IP (p. ej. `192.168.1.2`), solo recibe desde esa dirección, pero no desde `127.0.0.1`** (la IP local) |
| `s.listen(1)` | Pone el socket **en modo escucha**, indicando que **puede aceptar una conexión** |
| `sc, addr = s.accept()` | **Llamada bloqueante**: **espera hasta que el cliente haga un `connect`**. Devuelve **un nuevo socket de conexión (`sc`)**, **el que se usará para recibir datos**, y **una tupla `addr`** con **la IP y el puerto desde el que se ha recibido la conexión** |
| `sc.recv(1024)` | **No es `recvfrom`, sino `recv` directamente**, **porque la conexión ya está establecida**. Máximo 1024 bytes |
| `print ...` | **Imprime la IP (`addr[0]`)** y el mensaje (se puede añadir un `print` debajo) |
| `while True:` | **Bucle infinito** que **recibe datos mientras esté activo**. **Se bloquea en `recv` hasta que el cliente hace un `send`** |
| `if recibido == "close": break` | Si el mensaje es **`close`**, **`break`** para **salir del bucle** |
| `sc.send(recibido)` | Si es otro mensaje: **lo imprime** y **devuelve al cliente el mismo mensaje (eco)** |
| `print "Adios."` | Al salir del bucle imprime **"Adiós"** |
| `sc.close()` / `s.close()` | **Cierra el socket de conexión** y **el que estaba en escucha** |

### B9.2 Código del cliente (`cliente.py`)

```python
#!/usr/bin/env python

#importamos el modulo para trabajar con sockets
import socket

#Creamos un objeto socket para el servidor. Podemos dejarlo sin parametros pero si
#quieren pueden pasarlos de la manera server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s = socket.socket()

#Nos conectamos al servidor con el metodo connect. Tiene dos parametros
#El primero es la IP del servidor y el segundo el puerto de conexion
s.connect(("192.168.1.x", 9999))

#Creamos un bucle para retener la conexion
while True:
    #Instanciamos una entrada de datos para que el cliente pueda enviar mensajes
    mensaje = raw_input("Mensaje a enviar >> ")

    #Con la instancia del objeto servidor (s) y el metodo send, enviamos el mensaje introducido
    s.send(mensaje)

    #Si por alguna razon el mensaje es close cerramos la conexion
    if mensaje == "close":
        break

#Imprimimos la palabra Adios para cuando se cierre la conexion
print "Adios."

#Cerramos la instancia del objeto servidor
s.close()
```

| Código | Explicación |
|--------|-------------|
| `import socket` | Importa el módulo |
| `socket.socket()` | Crea el socket (**puede ir sin parámetros** o con `AF_INET`, `SOCK_STREAM`) |
| `s.connect(("192.168.1.x", 9999))` | **Se conecta al servidor**: **IP del servidor y puerto**. **El documento usa `127.0.0.1` cuando cliente y servidor están en la misma máquina** |
| `raw_input(...)` | **`input`** para que **el usuario escriba el mensaje a enviar** |
| `s.send(mensaje)` | **Envía** el mensaje |
| `if mensaje == "close": break` | Si el mensaje es **`close`**, **sale del bucle** |
| `print "Adios."` / `s.close()` | Al terminar, **"Adiós"** y **cierra el socket** |

> **Ojo (matiz):** el cliente que se ve en la captura **solo hace `send`** (no llama a `recv`), aunque el servidor **devuelva el eco**. El esquema teórico incluye `s.recv()`, pero ese código concreto no lo muestra.

---

## B10. Pruebas y verificación

### Orden de arranque
1. **Primero se ejecuta el servidor:** **`python servidor`**.
2. **El servidor debe estar en escucha antes de que el cliente intente conectarse.**
3. **Si el cliente intenta conectarse antes**, **la conexión será rechazada**.
   - Si se captura con **Wireshark**, se verá **que no hay nadie al otro lado**.
4. Se ejecuta el cliente (`python cliente`) y se escriben mensajes.

### Verificar la conexión establecida: `ss -tn`

```bash
ss -tn
```

- Muestra **una conexión entre un puerto efímero del cliente y el puerto 9999 del servidor.**
- **Figura:** `ESTAB  0  0  192.168.1.1:52766  192.168.1.2:9999`.
  - **Local = `192.168.1.1:52766`** (cliente, **puerto efímero**) · **Peer = `192.168.1.2:9999`** (servidor).
- En el servidor aparece, p. ej.: **`192.168.1.1 dice:  Hola clase`**.
- **Al cerrar la conexión**, **ambos programas imprimen "Adiós" y finalizan**.

### Pruebas en local
- **Se puede modificar el código** para hacerlo más complejo o **hacer pruebas en local**.
- Si **cliente y servidor están en la misma máquina**, se puede usar **`127.0.0.1`** como IP del servidor.

---

---

# PARTE C — Repaso

## C1. Datos literales para memorizar

### Direcciones y redes
| Dato | Valor |
|------|-------|
| IP del **Cliente** / **Servidor** | `192.168.1.1` / `192.168.1.2` |
| Nombre de la **red interna** | **`Red Seminarios`** (figura: `redseminarios`) |
| Adaptador 1 / Adaptador 2 | **NAT** / **Red interna** |
| IP por defecto de la interfaz interna (antes de configurarla) | `192.168.33.10` |
| IP de la interfaz NAT (DHCP) | `10.0.2.15/24` |
| Interfaces | `enp0s3` (**NAT**, la 1.ª) · `enp0s8` (**red interna**, la 2.ª) · `lo` (**loopback**) |
| IP de loopback | `127.0.0.1` |
| Método en NetworkManager | **Manual**, netmask **24**, gateway **vacío** |

### Puertos
| Puerto | Uso en el documento |
|--------|---------------------|
| **12345** | **netcat** (`nc -l 12345`) **y servidor UDP** en Python |
| **9999** | **Servidor TCP** en Python (`s.bind(("", 9999))`) |
| **80** | Servidor web |
| **53** | DNS |
| **22** | SSH |
| **1024** | Bytes máximos de `recvfrom(1024)` / `recv(1024)` |
| **59842** | Puerto **efímero** del cliente en la captura de Wireshark (netcat) |

### Comandos y su opción clave
| Comando | Opciones |
|---------|----------|
| `ip -c a` / `ip -c address` | `-c` = **colores** |
| `ping <IP>` | Paquetes **ICMP** |
| `nc -l 12345` / `nc 192.168.1.2 12345` | Servidor (escucha) / cliente |
| `netstat -tln` | `-t` TCP · `-l` listening · `-n` numérico |
| `ss -tln` | igual que netstat |
| `sudo ss -tlnp` | `+ p` = **proceso** |
| `sudo ss -unlp` | `u` = **UDP** · `n` · `l` · `p` |
| `ss -tn` | conexiones **TCP establecidas** |
| `sudo service apache2 start|stop|restart` | acción **después** |
| `sudo systemctl start|stop|restart apache2.service` | acción **antes** |
| `sudo nano /etc/hosts` / `sudo geany /etc/hosts` | editar hosts |
| `sudo wireshark` | capturar tráfico (filtro `tcp`) |
| `python` | intérprete (salir: `quit()` o `Ctrl+D`) |
| `python servidor` | ejecutar el servidor TCP |

### Python (sockets)
| Concepto | UDP | TCP |
|----------|-----|-----|
| Tipo de socket | `socket.AF_INET, socket.SOCK_DGRAM` | `socket.AF_INET, socket.SOCK_STREAM` |
| Servidor | `bind` → `recvfrom` → `sendto` → `close` | `socket` → `bind` → `listen` → `accept` → `recv`/`send` → `close` |
| Cliente | `sendto` → `recvfrom` → `close` | `connect` → `send`/`recv` → `close` |
| Sockets del servidor | **1** | **2** (`s1` escucha, `s2` datos) |

---

## C2. Comparativas clave

### `netstat` vs `ss`
| | `netstat` | `ss` |
|--|-----------|------|
| Antigüedad | **Antiguo** | **Moderno (sustituye a netstat)** |
| `-tln` | TCP en escucha, puertos numéricos | **Igual** |
| Ver proceso | `-p` (admin) | `-p` (admin) |

### `ifconfig` vs `ip`
| | `ifconfig` | `ip address` |
|--|------------|--------------|
| Antigüedad | **Clásico** | **Moderno, lo reemplaza** |
| Colores | No | **Sí con `-c`** |
| Muestra | interfaces, **IPs y MACs** | **información detallada** |

### `service` vs `systemctl`
| | `service` | `systemctl` |
|--|-----------|-------------|
| Posición de la acción | **Después** del servicio | **Antes** del servicio |
| Sistema | clásico | **systemd** (moderno) |

### UDP vs TCP (resumen del documento)
| | UDP | TCP |
|--|-----|-----|
| Conexión | **No orientado a conexión** | **Orientado a conexión** |
| Handshake | No | **Sí (SYN, SYN-ACK, ACK)** |
| Control de errores | **Ninguno** | Sí; **orden garantizado** |
| Sockets en el servidor | 1 | 2 |
| Recibir | **`recvfrom`** (hay que saber de quién) | **`recv`** (la conexión ya lo sabe) |
| Enviar | **`sendto`** (hay que decir a quién) | **`send`** |
| `bind` en servidor | Sí | Sí |
| `listen`/`accept`/`connect` | **No** | **Sí** |
| Estado en `ss` | `UNCONN` | `LISTEN` / `ESTAB` |

### Interfaces de VirtualBox
| Tipo | Papel en el seminario |
|------|----------------------|
| **NAT** (adaptador 1, `enp0s3`) | Salida a **Internet** |
| **Red interna `Red Seminarios`** (adaptador 2, `enp0s8`) | Comunicación **cliente ↔ servidor** |

### Cliente vs servidor (puertos)
| | Puerto |
|--|--------|
| **Servidor** | **Puerto conocido/fijo** (80, 53, 22, 12345, 9999) |
| **Cliente** | **Puerto efímero**, **aleatorio por conexión** |

---

## C3. Erratas y matices del documento

| Detalle | Cómo interpretarlo |
|---------|-------------------|
| "**NetManager**" | Se refiere a **NetworkManager** |
| **Ubuntu** en el texto, **Lubuntu** en la figura | Es la variante ligera de Ubuntu |
| "`sudo ss -tln` puede saber la aplicación" | Hace falta **`-p`** (`sudo ss -tlnp`) |
| En la VM de la figura la IP interna de partida es **`192.168.33.10`** | Es la **IP por defecto**; luego se configura **`192.168.1.x`** |
| El texto dice que en VirtualBox se ve "la IP asignada" a cada adaptador | En la práctica lo que se compara son **las MAC** (ya vistas en el reto de la P1) |
| El servidor TCP compara con **`"close"`** (minúscula) mientras el texto escribe **"Close"** | En el código es **`close`** en minúsculas |
| UDP usa **12345**; TCP del código usa **9999** | Son **puertos distintos**: no mezclarlos |
| El texto dice que los **ejemplos de Python** se hacen con `python` | Es **Python 2.7** (`print` sin paréntesis, `raw_input`) |
| El documento atribuye el **orden de los paquetes** al three-way handshake | El handshake **establece** la conexión (parámetros comunes); el orden lo mantienen los números de secuencia |
| La captura de Wireshark tiene números de paquete saltados (3 → 8) | Es por el **filtro `tcp`** de la vista |
| "Al final se plantearán **retos adicionales**" (vídeo 1) | **No aparecen** en el documento |
| "El **cliente** usa 127.0.0.1" | Solo para **pruebas en una única máquina** |

---

## C4. Test de repaso

> Tapa la columna de respuestas y responde.

### Parte A — Vídeo 1

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué comando sustituye al antiguo `netstat`? | **`ss`** |
| ¿Qué dos máquinas se conectan y con qué IPs? | **Cliente `192.168.1.1`** y **Servidor `192.168.1.2`** |
| ¿Cómo se llama la red interna? | **`Red Seminarios`** |
| ¿Para qué sirve la red NAT adicional? | Que **ambas máquinas accedan a Internet** |
| ¿Qué es una clonación enlazada? | Las máquinas **comparten la base** y **solo guardan los cambios** → ahorra disco |
| ¿Por qué se generan nuevas MAC al clonar? | Para **evitar conflictos de red** |
| ¿Cómo se llaman los dos clones? | **"Cliente"** y **"Servidor"** |
| ¿A qué se conecta el adaptador 1? ¿Y el 2? | **NAT** / **red interna `Red Seminarios`** |
| ¿Qué pasa si las máquinas usan distinto nombre de red interna? | **No podrán comunicarse** |
| ¿Qué muestra `ifconfig`? | **Interfaces, IPs y MACs** |
| ¿Cuántas interfaces salen en `ifconfig` y cuáles? | **Dos ethernet + loopback** |
| ¿Cómo distinguir NAT de red interna? | En VirtualBox → configuración → red. **La primera es NAT, la segunda la interna** |
| ¿Qué IP tiene la interfaz NAT en la captura? | **`10.0.2.15/24`** |
| ¿Qué opción de `ip` da colores? | **`-c`** |
| ¿Qué es NetManager? | Gestor **gráfico** de interfaces: edita conexiones, asigna **IP estáticas**, reinicia interfaces |
| ¿Cómo se fuerza a NetworkManager a notar el cambio? | **Desconectar** la conexión (clic izquierdo → desconectar) |
| ¿Qué método se elige en IPv4 Settings para IP fija? | **Manual** |
| ¿Qué netmask se usa? | **24** |
| ¿Qué paquetes envía `ping`? | **ICMP** |
| ¿Qué archivo permite nombres locales? | **`/etc/hosts`** |
| ¿Qué líneas se añaden? | `192.168.1.2 servidor` y `192.168.1.1 cliente` |
| ¿Se añade en una sola máquina? | **No: servidor en el cliente y cliente en el servidor** |
| ¿Qué es un puerto efímero? | Puerto **temporal aleatorio generado por el cliente** para cada conexión |
| ¿Qué puertos cita el documento como ejemplo? | **80 web, 53 DNS, 22 SSH** |
| ¿Cómo se pone netcat a escuchar en 12345? | **`nc -l 12345`** |
| ¿Cómo se conecta el cliente? | **`nc 192.168.1.2 12345`** |
| ¿Qué significan `-t`, `-l`, `-n`? | **TCP**, ***listening***, **puertos numéricos** |
| ¿Qué comando ve las conexiones TCP en escucha? | **`netstat -tln`** / **`ss -tln`** |
| ¿Qué aplicación aparece en el puerto 12345 con `ss`? | **`nc`** (netcat) |
| ¿Qué es un demonio/servicio? | **Proceso en segundo plano** que da un servicio de red (web, SSH…) |
| ¿Cómo se inicia apache2 con `service`? | **`sudo service apache2 start`** |
| ¿Y con `systemctl`? | **`sudo systemctl start apache2.service`** |
| ¿Dónde va `start/stop/restart` en `service`? ¿Y en `systemctl`? | **Después** / **antes** del nombre del servicio |

### Parte B — Vídeo 2

| Pregunta | Respuesta |
|----------|-----------|
| ¿En qué capa están TCP y UDP? | **Transporte** |
| ¿Qué hacen con los datos de la capa de aplicación? | **Añaden la información necesaria para transmitirlos** |
| ¿Cuál es más sencillo y sin control de errores? | **UDP** |
| ¿Qué proceso usa TCP al inicio? | **Three-way handshake (SYN, SYN-ACK, ACK)** |
| ¿Qué recomienda hacer antes de empezar las pruebas? | **Crear una instantánea (snapshot)** |
| ¿Cuántas máquinas se recomiendan? | **Dos** (cliente y servidor) |
| ¿Qué filtro se usa en Wireshark? | **`tcp`** |
| ¿Qué puertos aparecen en la captura de netcat? | **Origen 59842 → destino 12345** |
| ¿Qué indica `PSH`? ¿Y `FIN`? | **Mensaje Push (datos)** / **fin de comunicación** |
| ¿Qué es un socket (según el documento)? | Abstracción que permite al programa **comunicarse con el kernel** del sistema |
| ¿Qué módulo de Python se usa? | **`socket`** |
| ¿Qué es `AF_INET`? ¿Y `SOCK_DGRAM`? ¿Y `SOCK_STREAM`? | **Socket de Internet** / **UDP** / **TCP** |
| ¿Qué método usa el servidor UDP para escuchar? | **`bind`** |
| ¿Cómo envía el cliente UDP? ¿Y recibe el servidor? | **`sendto`** / **`recvfrom`** |
| ¿Qué argumento tiene `recvfrom(1024)`? | **Máximo de bytes** que esperará |
| ¿Qué devolvió `sendto('Hola clase', …)`? ¿Por qué? | **10** bytes: **4 + espacio + 5** |
| ¿Qué contiene `data` en el servidor UDP? | **Tupla:** mensaje **y** `(IP, puerto)` del remitente |
| ¿De dónde viene el puerto del remitente? | **Puerto efímero elegido aleatoriamente** por el cliente |
| ¿Qué comando muestra los sockets UDP con proceso? | **`sudo ss -unlp`** |
| ¿Cómo se sale del intérprete de Python? | **`quit()`** o **`Ctrl + D`** |
| ¿Cuántos sockets usa un servidor TCP? | **Dos (`s1` y `s2`)** |
| ¿Qué hace `s1`? ¿Y `s2`? | **Recibe solicitudes y gestiona el handshake** / **envía y recibe datos** |
| ¿Qué es `listen`? | Pone el socket en **modo escucha** (parámetros sobre nº de conexiones) |
| ¿Qué es `accept`? | **Llamada bloqueante** que **espera al `connect` del cliente** y **devuelve el socket `s2`** |
| ¿Qué es `connect`? | El cliente **inicia la conexión** (**three-way handshake**) |
| ¿Por qué en TCP se usa `recv` y no `recvfrom`? | Porque **la conexión ya está establecida** |
| ¿Qué socket se usa para recibir en el servidor? | **`sc` (el devuelto por `accept`)** |
| ¿Qué puerto usa el servidor TCP del ejemplo? | **9999** |
| ¿Qué significa `bind(("", 9999))`? | Escucha en el puerto 9999 **en cualquier IP** |
| ¿Y si se hace `bind` con `192.168.1.2`? | Solo recibe en esa dirección, **no en `127.0.0.1`** |
| ¿Qué pasa con `listen(1)`? | Indica que **puede aceptar una conexión** |
| ¿Cómo sale el servidor del bucle? | Al recibir **`close`** (**`break`**) |
| ¿Qué hace el servidor con un mensaje que no es `close`? | **Lo imprime y lo devuelve (eco)** |
| ¿Qué imprime el servidor al salir? ¿Y el cliente? | **"Adiós"** (ambos) |
| ¿Cuántos espacios de indentación usa Python aquí? | **Cuatro** |
| ¿Qué ocurre si no se mantienen? | **Error**: Python cree que no estamos dentro del `while`/`if` |
| ¿Qué pasa si el cliente se conecta antes que el servidor? | **Conexión rechazada** |
| ¿Qué se ve en Wireshark en ese caso? | **No hay nadie al otro lado** |
| ¿Qué comando verifica la conexión establecida? | **`ss -tn`** |
| ¿Qué muestra `ss -tn` en la prueba? | Conexión **puerto efímero del cliente ↔ puerto 9999 del servidor** |
| ¿Qué IP usar si cliente y servidor están en la misma máquina? | **`127.0.0.1`** |
| ¿Cuántos sockets cierra el servidor TCP? | **Los dos** (escucha y conexión) |

### Verdadero o falso

| Afirmación | V/F |
|------------|-----|
| `service` y `systemctl` ponen la acción en la misma posición | **F** (después / antes) |
| `ss` es más antiguo que `netstat` | **F** (`ss` es el moderno) |
| `nc -l 12345` se ejecuta en el cliente | **F** (en el **servidor**) |
| UDP usa `listen` y `accept` | **F** (solo **TCP**) |
| En TCP el `recv` necesita indicar el origen | **F** (la conexión ya lo sabe) |
| En UDP el servidor tiene dos sockets | **F** (**uno**) |
| El puerto del cliente es fijo y conocido | **F** (**efímero**, aleatorio) |
| Si dos VMs tienen distinto nombre de red interna no se ven | **V** |
| La clonación enlazada duplica el espacio en disco | **F** (**ahorra** espacio) |
| La primera interfaz ethernet de las VMs es la NAT | **V** |
| `ping` usa paquetes ICMP | **V** |
| El `accept` es no bloqueante | **F** (**bloqueante**) |
| `ss -unlp` muestra sockets UDP con su proceso | **V** |
| El servidor TCP se debe arrancar antes que el cliente | **V** |
| `0.0.0.0` / `""` en `bind` significa "cualquier IP" | **V** |

---

*Esquema elaborado a partir de los apuntes en PDF de los dos vídeos del **Seminario 1** de Sistemas Telemáticos (UGR, 21/10/2024). Las secciones marcadas como "Ampliación" y "Ojo" son material de apoyo propio. Material de estudio personal.*
