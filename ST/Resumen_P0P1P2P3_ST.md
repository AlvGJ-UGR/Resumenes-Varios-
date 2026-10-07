# Sistemas Telemáticos — Resumen de prácticas (P0–P3)

**Universidad de Granada · 2º Grado en Ingeniería de Tecnologías de Telecomunicación**

> Resumen esquemático para preparar el examen. Cubre:
> - **Bloque 1 — Ubuntu / Linux básico** (manual de la práctica inicial)
> - **Bloque 2 — P2: LDAP** (servicio de directorio con OpenLDAP)
> - **Bloque 3 — P3: DNS** (BIND9, primario y delegado)
>
> Al final hay un **test de repaso** con preguntas tipo examen.

---

## Índice

1. [Bloque 1 — Ubuntu / Linux básico](#bloque-1--ubuntu--linux-básico)
2. [Bloque 2 — P2: LDAP](#bloque-2--p2-ldap-servicio-de-directorio)
3. [Bloque 3 — P3: DNS](#bloque-3--p3-dns-con-bind9)
4. [Test de repaso tipo examen](#test-de-repaso-tipo-examen)
5. [Chuleta final: puertos, ficheros y comandos clave](#chuleta-final)

---

# Bloque 1 — Ubuntu / Linux básico

## 1.1 Componentes de Ubuntu

Ubuntu = distribución **GNU/Linux**, basada en software **libre y de código abierto**.

| Componente | Función |
|-----------|---------|
| **Kernel** | Núcleo del sistema operativo: asigna tareas y gestiona el almacenamiento de datos |
| **Shell** | Intérprete de comandos: procesa las órdenes del usuario |
| **Sistema de archivos** | Organización jerárquica para almacenar archivos |
| **Utilidades** | Programas para tareas específicas |

## 1.2 Terminal

- **Terminal**: herramienta para interactuar con el sistema mediante comandos. Se abre con `Ctrl + Alt + T`.
- **Prompt**: carácter(es) con los que el shell indica que espera órdenes. Ej.: `usuario@maquina:/directorio$`.
- Atajos de pestañas:

| Acción | Atajo |
|--------|-------|
| Nueva pestaña | `Ctrl + Shift + T` |
| Moverse entre pestañas | `Ctrl + Av. Pág` / `Ctrl + Re. Pág` |
| Cerrar pestaña | `Ctrl + Shift + W` |

## 1.3 `man` — el comando más importante

Muestra el **manual** de otro comando: `man ls`.

| Tecla | Acción |
|-------|--------|
| `/` | Buscar en el manual |
| `n` | Siguiente coincidencia |
| `p` | Coincidencia anterior |
| `q` | Salir |

Otras ayudas: `<comando> --help` (ayuda básica), `<comando> --usage` (sintaxis básica), `whatis` (info muy reducida).

## 1.4 Estructura de directorios

Organización **jerárquica** desde el directorio raíz **`/`**.

| Directorio | Contenido |
|-----------|-----------|
| `/bin` | Programas ejecutables básicos del sistema |
| `/boot` | Ficheros necesarios para el arranque |
| `/dev` | Ficheros de **dispositivos** (sonido, impresora, disco, CD/DVD, vídeo…) |
| `/etc` | Ficheros y directorios de **configuración** |
| `/home` | Directorios de trabajo de los usuarios (uno por usuario) |
| `/lib` | Librerías compartidas y módulos del kernel |
| `/media` | Punto de montaje de dispositivos (CD-ROM, USB, discos portátiles) |
| `/opt` | Reservado para instalar aplicaciones |
| `/proc` | Datos del kernel e información sobre **procesos** |
| `/sbin` | Binarios ejecutables del sistema operativo |
| `/srv` | Datos de los servicios proporcionados por el sistema |
| `/tmp` | Archivos temporales |
| `/usr` | La mayoría de archivos del sistema, aplicaciones, librerías, manuales, juegos… (espacio compartido) |
| `/var` | Archivos administrativos y datos que **cambian con frecuencia**: logs, bases de datos, colas de impresión |

## 1.5 Moverse por el árbol de directorios

| Comando | Función |
|---------|---------|
| `cd <ruta>` | Cambiar de directorio. Ej.: `cd /home` |
| `cd ..` | Subir un nivel |
| `cd` (solo) | Volver al `home` del usuario |
| `pwd` | Mostrar la **ruta absoluta** del directorio actual |
| `ls` | Listar archivos y carpetas |
| `mkdir <ruta>` | Crear un directorio. Ej.: `mkdir Practicas` |

### Rutas (paths)

- **Ruta absoluta**: se da respecto al directorio raíz → **siempre empieza por `/`**.
- **Ruta relativa**: se da respecto a una carpeta concreta (p. ej. la actual o el home) → **nunca empieza por `/`**.

| Abreviatura | Significado |
|------------|-------------|
| `.` | Directorio **actual** |
| `..` | Directorio **superior** al actual |
| `~` (virgulilla) | Carpeta **personal** del usuario que ejecuta el comando |

> **Ir a un directorio con un solo comando** (ej.: `/etc/bind`): `cd /etc/bind` (ruta absoluta; funciona desde cualquier sitio).

## 1.6 Manipulación de archivos

| Comando | Función |
|---------|---------|
| `nano archivo.txt` | Editor de texto en terminal. Nombre con espacios → `nano "Mis notas.txt"` |
| `cat <ruta>` | Muestra el contenido de un fichero |
| `head` | Primeras líneas (por defecto 10) |
| `tail` | Últimas líneas (por defecto 10). `tail -n 20 fichero` → 20 líneas |
| `grep <texto> <fichero>` | Busca líneas con un texto |
| `gedit`, `geany` | Editores con interfaz gráfica |

Atajos de **nano**: guardar `Ctrl + O`, salir `Ctrl + X`.

## 1.7 Copiar, mover y eliminar

| Comando | Función |
|---------|---------|
| `cp <origen> <destino>` | Copiar fichero o directorio |
| `mv <origen> <destino>` | **Mover o renombrar** (misma sintaxis que `cp`; no deja copia en el origen) |
| `rm <ruta>` | Borra ficheros (`-i` pide confirmación, `-r` borra directorios y su contenido) |
| `rmdir <ruta>` | Borra **solo directorios vacíos** |
| `dir` | Lista ficheros y carpetas |

## 1.8 Usuarios y permisos

| Tipo de usuario | Descripción |
|----------------|-------------|
| **root** | Superusuario: control total del sistema |
| **Usuarios normales** | Gestionan solo lo que les pertenece; tienen su `home` y un shell |
| **Usuarios de sistema** | Gestionan servicios y demonios |

| Comando | Función |
|---------|---------|
| `sudo <comando>` | Ejecuta con privilegios de superusuario |
| `su [usuario]` | Cambia de usuario (pide contraseña) |
| `sudo su` | Pasa a root |
| `passwd [usuario]` | Cambia la contraseña |
| `adduser <usuario>` | Añade un usuario |
| `chmod <permisos> <ruta>` | Cambia permisos. `u/g/o/a` = usuario/grupo/otros/todos; `+` añade, `-` quita; `r` lectura, `w` escritura, `x` ejecución |
| `groups` | Muestra los grupos del usuario |

## 1.9 Procesos

| Comando | Función |
|---------|---------|
| `ps` | Lee la información de `/proc/`. `ps aux` → todos los procesos |
| `pstree` | Relación **padre-hijo** de procesos |
| `kill <PID>` | Termina el proceso con ese PID |
| `killall` | Termina todos los procesos con ese nombre |
| `top`, `htop` | Procesos y uso de recursos **en tiempo real** |
| `<comando> &` | Lanza en **segundo plano** (*background*) |
| `xkill` | Cierra una ventana gráfica haciendo clic en ella |

## 1.10 Servicios (demonios)

```bash
service --status-all          # ver todos los servicios
sudo service ssh status       # estado de un servicio
sudo systemctl start  <serv>  # iniciar (con systemctl)
sudo systemctl stop   <serv>
sudo systemctl restart <serv>
sudo systemctl status <serv>
```

Órdenes de `service <demonio> ...`: `status`, `start`, `stop`, y según el servicio `reload`, `force-reload`, `restart`, `try-restart`.

## 1.11 Interfaces de red y tipos de conexión en VirtualBox

| Tipo | Qué hace |
|------|----------|
| **NAT** | La VM sale a Internet usando la conexión del host. IP **automática por DHCP** |
| **Red interna** | "Cable virtual" con un **nombre**; las máquinas conectadas al mismo nombre se comunican entre sí. **No asigna IP** automáticamente |
| **Adaptador puente** | Se conecta a la **misma subred** que la interfaz real del host (obtiene IP del router doméstico) |
| **Solo anfitrión** | DHCP gestionado por VirtualBox; host y VM en la misma subred virtual (por defecto `192.168.56.X`) |

## 1.12 Red y SSH

- **Dirección IP**: identificador único de una interfaz. Ver con `ifconfig` o, mejor, **`ip -c a`** (salida coloreada).
- Interfaz **`lo`** (loopback): conecta con la propia máquina, IP **`127.0.0.1`**.
- **SSH**: conexión remota segura → `ssh usuario@IP_remota` (ej.: `ssh alumno@10.23.1.3`).
  - Primera vez: pide aceptar el certificado → responder `yes`.
  - Salir: `Ctrl + D` (o `exit`).

## 1.13 Resumen de comandos por categoría

### Instalación de paquetes
| Comando | Función |
|---------|---------|
| `apt install <prog>` | Instala un programa del repositorio de Ubuntu |
| `apt update` | Actualiza la **lista** de repositorios |
| `apt upgrade` | Actualiza el software a las últimas versiones |
| `dpkg -i <paquete>` | Instala un `.deb` descargado |

### Red y diagnóstico
| Comando | Función |
|---------|---------|
| `netstat -opciones` | Estadísticas de red. `-t` TCP, `-l` en escucha, `-p` nombre del proceso (requiere admin), `-n` formato numérico |
| `ss -tlnp` | Sockets TCP en escucha con proceso y puertos numéricos |
| `ip -c a` | Interfaces de red |
| `ping <host>` | Conectividad con otro equipo |
| `nc -l <puerto>` | Servidor **netcat** escuchando en un puerto |
| `nc <host> <puerto>` | Cliente netcat |
| `dhclient` | Configura interfaces por DHCP |

### Otros
| Comando | Función |
|---------|---------|
| `cmd1 \| cmd2` | **Tubería (pipe)**: la salida del primero es la entrada del segundo |
| `cmd > fichero` | **Redirección**: la salida estándar va a un fichero |
| `echo`, `printf` | Muestran texto en pantalla (`printf` con formato) |
| `shutdown now` / `poweroff` | Apagar |
| `hostname` | Nombre de la máquina |
| `exit` | Cierra sesión/terminal |
| `./script.sh` | Ejecuta un script |
| `/dev/null` | "Papelera" siempre vacía |
| `diff <r1> <r2>` | Compara dos archivos |
| `tar` | Agrupa ficheros: `-x` extraer, `-c` crear, `-v` progreso, `-f` archivo, `-z` comprimir |
| `gzip [-d]` | Comprime (`-d` descomprime) |
| `sendmail <cuenta>` | Envía correo |

## 1.14 Retos del manual (con respuesta)

| Reto | Respuesta |
|------|-----------|
| `ls -alh` | `-a` muestra **todo** incluidos ocultos (los que empiezan por `.`); `-l` formato **largo** (permisos, enlaces, propietario, grupo, tamaño, fecha); `-h` tamaños **legibles** (KB, MB) |
| Grupo del usuario | `groups` |
| ¿Para qué sirve `xkill`? | Cierra una ventana gráfica: se ejecuta y se hace clic en la ventana (ej.: `gedit &` y luego `xkill`) |
| MAC de las interfaces | `ifconfig` (o `ip link show`): 6 pares hexadecimales separados por `:` (ej.: `00:1A:2B:3C:4D:5E`) |
| Relacionar interfaces de VirtualBox con las del sistema | `ip link show` y **comparar las MAC** con las del adaptador en VirtualBox |
| Archivos de `/etc` que empiezan por `hos` | El guion usa `ls /etc \| grep 'hos'`. Más preciso: `ls /etc \| grep '^hos'` o `ls /etc/hos*` (`grep 'hos'` busca "hos" en cualquier posición) |

---

# Bloque 2 — P2: LDAP (servicio de directorio)

**Objetivo:** entender el paradigma **cliente/servidor** configurando un servicio de directorio con **LDAP** (*Lightweight Directory Access Protocol*) usando **OpenLDAP**.

## 2.1 Conceptos

### Modelo cliente/servidor
- **Servidor**: proceso que ofrece el servicio de forma continua, **escuchando en un puerto**.
- **Cliente**: necesita conocer la **IP o nombre de dominio** del servidor y el **puerto**, y hace una solicitud a la que el servidor responde.
- Ejemplos: HTTP, FTP, DNS, LDAP.

### Servicio de directorio
Sirve para **almacenar y consultar información de usuarios y recursos de una red**. Protocolo habitual: **LDAP**.

### Pasos de una solicitud LDAP

| Paso | Qué ocurre |
|------|-----------|
| i | El cliente conecta al servidor en el **puerto 389** |
| ii | **Autenticación** (usuario/contraseña) — también es posible la conexión **anónima** |
| iii | **Búsqueda / lectura / modificación** de datos |
| iv | **Desconexión** |

### Base de datos LDAP y formato LDIF
- Los recursos se codifican como **entradas (nodos)** en una BD usando el formato **LDIF** (*LDAP Data Interchange Format*).
- Cada entrada tiene un nombre único: el **DN** (*Distinguished Name*), y atributos con forma `<atributo>: <valor>`.
- **objectClass**: indica el tipo de nodo y qué atributos (obligatorios y opcionales) tiene. Se definen en los **esquemas** (ficheros en **`/etc/ldap/schema/`**).
- Estructura en **árbol**, con un nodo raíz del que cuelgan los demás. La jerarquía se establece a partir de los DN.
- El orden jerárquico del DN se lee de **derecha a izquierda** (hijo → padre).

Ejemplo del guion:

```ldif
dn: cn=Rector,o=ugr,c=es
cn: Rector
objectClass: organizationalRole
objectClass: top
userPassword: {SSHA}someSSHAdata
```

- `cn=Rector,o=ugr,c=es` es hijo de `o=ugr,c=es`, que es hijo de `c=es`.
- `cn` = *Common Name*; `userPassword` guarda el **hash** de la contraseña (`{SSHA}`).

```
                 c=es
                  |
                o=ugr
               /     \
        cn=Rector   ou=Profesores
                    /    |     \
          cn=Gabriel cn=Rafael cn=Pablo
```

| Abreviatura DN | Significado |
|---------------|-------------|
| `dn` | *Distinguished Name* |
| `cn` | *Common Name* |
| `sn` | *Surname* (apellido) |
| `dc` | *Domain Component* |
| `o` | *Organization* |
| `ou` | *Organizational Unit* |
| `c` | *Country* |

## 2.2 Entorno de la práctica
- Máquina virtual de la asignatura (usuario `administrador`, contraseña `admin1`) o laboratorio (red aislada / Ubuntu 18.04, contraseña `finisterre`).
- **Una sola máquina**: servidor y cliente en ella → la comunicación va por la interfaz **`lo`** (loopback).
- Siempre **revisar la salida** de cada comando (un error implica que no se ejecutó bien).
- Al copiar/pegar, **guiones y comillas** pueden copiarse con carácter incorrecto → mejor escribirlos a mano.

## 2.3 Tareas

### Tarea 0 — Instalación (solo en VM)
```bash
sudo apt update
sudo apt install slapd ldap-utils
```
- `slapd` = **servidor** LDAP (demonio). `ldap-utils` = **clientes** (`ldapsearch`, `ldapadd`, `ldapmodify`…).

### Tarea 1 — Inicio del servidor y comprobación
```bash
sudo systemctl status slapd.service     # ver estado
sudo systemctl start slapd.service      # arrancar si está parado
sudo ss -tlnp                           # comprobar que escucha en el puerto 389
ldapsearch -x                           # probar conexión con el cliente
```
- Equivalente con service: `sudo service slapd status`.
- El servidor debe ejecutarse **antes** que el cliente.
- Salida si está activo y aún sin configurar: `result: 32 No such object`.

### Tarea 2 — Parar el servidor
```bash
sudo systemctl stop slapd.service
```
- Una búsqueda ahora devuelve: `ldap_sasl_bind(SIMPLE): Can't contact LDAP server (-1)`.

### Tarea 3 — Configuración del servicio
```bash
sudo dpkg-reconfigure slapd
```

| Pregunta | Respuesta |
|----------|-----------|
| Omitir configuración | **No** |
| DNS domain name | `aula34.ugr.es` (será la entrada inicial del árbol) |
| Organization | `aula34.ugr.es` |
| Tipo de base de datos (solo laboratorio) | **MDB** |
| Password | `admin1` (`finisterre` en laboratorio) |
| Borrar BD cuando se purgue slapd | **No** |
| Move old database | **Yes** |

Comprobar la entrada base:
```bash
ldapsearch -x -b dc=aula34,dc=ugr,dc=es
```
- Si la base (`-b`) no corresponde a un nodo existente → `result: 32 No such object`.
- El dominio `aula34.ugr.es` se convierte en el DN: **`dc=aula34,dc=ugr,dc=es`** (cada componente del dominio es un `dc`).

### Tarea 4 — Añadir entradas (`ldapadd`)

Fichero `ejemplo.ldif` (3 nodos):

```ldif
dn: dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
objectClass: dcObject
objectClass: organization
dc: <nombre_PC>
o: Servicios Telematicos S. L.
description: Empresa de Telecomunicaciones

dn: cn=<alumno1>,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
objectClass: organizationalRole
cn: <alumno1>
description: Director

dn: cn=<alumno2>,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
objectClass: person
cn: <alumno2>
sn: <apellido>
description: Tecnico
```

| objectClass | Uso |
|------------|-----|
| `dcObject` | **Contenedor** para otros nodos |
| `organization` | Organización (atributo `o`) |
| `organizationalRole` | Entrada con nombre (`cn`) y descripción (rol) |
| `person` | Persona: `cn`, `sn` (apellidos) y descripción |

Reglas importantes:
- **No se puede insertar un nodo bajo otro que no exista** → hay que respetar el **orden** (primero el contenedor, después los hijos).
- **Línea en blanco** entre entradas.
- Sin acentos.

```bash
ldapadd -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemplo.ldif
```

| Opción | Significado |
|--------|-------------|
| `-x` | Autenticación **simple** (DN + contraseña en **texto plano**, sin proteger) |
| `-D <DN>` | DN del **usuario administrador** que realiza la operación (debe tener permisos de escritura) |
| `-W` | **Pide la contraseña** por teclado |
| `-f <PATH>` | **Fichero** LDIF con las entradas |

### Tarea 5 — Consultas (`ldapsearch`)
```bash
ldapsearch -x -b "<dn_base>" "(<filtro>)" <atributos>
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(dc=aula34)" dn cn
```

| Parte | Significado |
|-------|-------------|
| `-b "..."` | **Base DN**: nodo desde el que empieza la búsqueda |
| `"(dc=aula34)"` | **Filtro**: entradas cuyo atributo `dc` vale `aula34` |
| `dn cn` | **Atributos a mostrar** |
| `+` (como atributo) | Muestra los **atributos operacionales** |

Búsquedas propuestas:
- Nodos con un nombre específico mostrando solo `objectClass`, p. ej.: `ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=alumno1)" objectClass`
- Nodos que tengan `cn` con cualquier valor y todos sus atributos, p. ej.: `ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=*)"`

### Tarea 6 — Modificar y eliminar (`ldapmodify`)

Fichero `ejemploModify.ldif`:

```ldif
dn: dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
changetype: modify
replace: o
o: Donuts S. L.
-
replace: description
description: Empresa de Donuts

dn: cn=Paco,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
changetype: add
objectClass: person
cn: Paco
sn: paquito
description: Secretario

dn: cn=<alumno2>,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
changetype: delete
```

```bash
ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemploModify.ldif
```

Estructura de un LDIF de modificación:

| Elemento | Descripción |
|----------|-------------|
| 1. **DN** | Primera línea: entrada a modificar/añadir/eliminar |
| 2. **`changetype`** | `add` (agrega entrada), `modify` (modifica existente), `delete` (elimina) |
| 3. **Cambios** | `add`: lista todos los atributos y valores. `delete`: **sin líneas adicionales**. `modify`: operaciones `add` (añade atributo), `delete` (elimina atributo), `replace` (cambia valor) |
| Separador `-` | Separa varias operaciones de un `modify` → varias modificaciones en **una sola transacción** |
| 4. **Línea en blanco** | Antes del siguiente DN |

Ejercicio autónomo: crear un fichero que añada un usuario; añada `telephoneNumber` a un empleado y `userPassword` a Paco; cambie la descripción de un integrante; elimine `description` de Paco. Verificar con `ldapsearch`.

### Tarea 7 — Herramienta gráfica JXplorer
```bash
sudo apt update
sudo apt install jxplorer
jxplorer
```
`File -> Connect`:

| Campo | Valor |
|-------|-------|
| Host | `localhost` |
| Port | `389` |
| Protocol | LDAP v3 |
| Base DN | `dc=aula34,dc=ugr,dc=es` |
| Security Level | User + Password |
| User DN | `cn=admin,dc=aula34,dc=ugr,dc=es` |
| Password | la del admin |

### Tarea 8 — Wireshark (comunicación cliente/servidor)
```bash
sudo wireshark        # (o  sudo wireshark &  para dejarlo en segundo plano)
```
- Interfaz: **Loopback** (`lo`), porque cliente y servidor están en la misma máquina.
- Filtro: **`ldap`**.
- Lanzar `ldapadd`, `ldapmodify` o `ldapsearch` e identificar los pasos: **autenticación (bind) → operación → desconexión (unbind)**.
- **Seguridad**: con `-x` (autenticación simple), la **contraseña viaja en texto plano** y puede verse en la captura → cualquiera que capture el tráfico la obtiene. Implica que conviene proteger el canal (cifrado, p. ej. LDAPS/StartTLS).

### Tarea opcional — BD distribuida
- El árbol LDAP se distribuye en varios **subárboles / contextos de nombramiento**.
- Para encaminar consultas se configuran:
  - **Referencias subordinadas inmediatas**: indican qué servidor corresponde a cada parte del subárbol.
  - **Referencia superior**: a qué servidor redirigir una consulta cuando no se conoce el sufijo preguntado.

## 2.4 Resumen rápido LDAP

| Cliente | Para qué |
|--------|----------|
| `ldapsearch` | **Buscar/consultar** |
| `ldapadd` | **Añadir** entradas desde un LDIF |
| `ldapmodify` | **Modificar / añadir / eliminar** con `changetype` |

| Dato | Valor |
|------|-------|
| Puerto | **389** |
| Servidor | `slapd` |
| Formato de datos | **LDIF** |
| Esquemas | `/etc/ldap/schema/` |
| Reconfigurar | `sudo dpkg-reconfigure slapd` |
| Error "no existe la base" | `result: 32 No such object` |
| Error "servidor parado" | `Can't contact LDAP server (-1)` |

---

# Bloque 3 — P3: DNS con BIND9

**Objetivo:** familiarizarse con **DNS** (*Domain Name System*) y configurar un servicio DNS para un subdominio.

## 3.1 Teoría de DNS

### ¿Qué es?
Servicio **distribuido, jerárquico (árbol) y escalable** de traducción entre nombres de dominio e IPs:

| Tipo | Sentido |
|------|---------|
| **Forward mapping** | nombre → IP |
| **Reverse mapping** | IP → nombre |

### Jerarquía
```
                  .   (raíz: 13 servidores, A–M)
                /   \
            .com    .es    (TLD — Top Level Domain)
                      \
                     ugr.es   (zona delegada a la UGR)
```
- **Servidores raíz** (`.`): responsables últimos del sistema. **13 servidores/réplicas** (A a la M). Ej.: el root-server **F** tiene un servidor en Madrid (punto neutro **Espanix**).
- **TLD**: servidores de dominios como `.es`, `.com`.
- **Zona**: conjunto de nombres de dominio **contiguos** del que es responsable un servidor.
- **Delegar** autoridad: la información de la zona delegada pasa a ser responsabilidad de los servidores delegados (ej.: `.es` delega `ugr.es`).

### Tipos de servidores en una zona

| Tipo | Función |
|------|---------|
| **Primarios (master)** | Copia **maestra** de la BD de la zona, obtenida de **archivos locales** |
| **Secundarios (esclavos)** | Obtienen los registros del primario por **transferencia por la red** → **backup** |
| **Delegados** | Contienen la información de una **subzona**; el servidor de zona les deriva las consultas de esa subzona |

### Caché
Los servidores guardan **temporalmente** (durante un tiempo configurado) la información conocida por consultas previas, aunque no sean su autoridad.

### Consultas iterativas vs recursivas

| | Iterativa | Recursiva |
|--|-----------|-----------|
| Funcionamiento | El servidor va consultando **sucesivamente** a distintos servidores, que dan la **mejor respuesta posible** con sus datos | Los servidores consultados **realizan a su vez nuevas consultas** hasta lograr una respuesta válida |
| Ejemplo | **Consultas a un servidor raíz** (para evitar sobrecargarlos) | Cliente → resolutor |

## 3.2 BIND9

Implementación de DNS usada en la práctica: **BIND9** (antes `named`). Dos tipos de ficheros de configuración:

| Fichero | Contenido |
|---------|-----------|
| `named.conf.local` | Define las **zonas con autoridad** de este servidor (y el fichero de cada una) |
| Fichero de zona (nombre libre, p. ej. `db.isla1.ugr.es`) | **Registros** de la zona: SOA, NS, A, MX… |

`/etc/bind/named.conf` incluye:

| Fichero | Función |
|---------|---------|
| `named.conf.options` | **Opciones generales** del servidor |
| `named.conf.default-zones` | Zonas por defecto (ej.: `localhost`, la raíz `.`) |
| `named.conf.local` | **Zona sobre la que este servidor tiene autoridad** (el que se configura en la práctica) |

## 3.3 Registros DNS

| Registro | Significado |
|----------|-------------|
| **SOA** | *Start Of Authority* — **autoridad de zona** (parámetros de la zona) |
| **NS** | *Name Server* — **servidor de nombres** de la zona |
| **A** | **Dirección IP** asociada a un nombre |
| **MX** | **Servidor de correo** |

> Los **tres registros** que se repasan en la práctica: **SOA, A y NS** (el cuarto, **MX**, es el de correo).

### Formato de un registro (sintaxis completa)
```
nombre   TTL   clase   tipo   datos
```

| Campo | Significado |
|-------|-------------|
| Nombre | Dominio al que se refiere |
| TTL | Tiempo de validez del registro en **caché** |
| Clase | `IN` = Internet |
| Tipo | SOA, NS, A, MX |
| Datos | Dependen del tipo |

### Parámetros del SOA

```dns
isla1.ugr.es.  3600 IN SOA ns.isla1.ugr.es. admin.isla1.ugr.es. (
                    20091126 ; serial number
                    3600     ; refresh
                    1800     ; retry
                    1W       ; expiry
                    3600)    ; negative TTL
```

| Parámetro | Significado |
|-----------|-------------|
| Servidor (`ns.isla1.ugr.es.`) | Nombre del servidor |
| Contacto (`admin.isla1.ugr.es.`) | Correo del administrador (el primer `.` equivale a `@`) |
| **serial number** | Nº de versión de la zona; **hay que subirlo en cada cambio** (los secundarios lo comparan) |
| **refresh** | Cada cuánto el secundario consulta si hay cambios |
| **retry** | Cada cuánto reintenta si el refresh falló |
| **expiry** | Tras cuánto sin contactar con el primario deja de responder por esa zona |
| **negative TTL** | Tiempo que se cachea una respuesta negativa (`NXDOMAIN`) |

### Sintaxis abreviada (`$TTL`, `$ORIGIN`, `@`)
```dns
$TTL 7200            ; ttl por defecto
$ORIGIN islaX.       ; nombre de dominio
@  SOA server admin ( ... )
   NS server
server  A 172.16.1.100
```
- `$TTL` → TTL por defecto. `$ORIGIN` → dominio que se añade a los nombres sin punto final. `@` → el propio origen.
- **Nombre terminado en punto** (`host.isla1.ugr.es.`) = nombre **absoluto (FQDN)**. Sin punto → se le añade el `$ORIGIN`.

## 3.4 Preparación del entorno

### Máquinas virtuales
1. Instalar bind9: `sudo apt install bind9`
2. Apagar la VM y **clonar** (clonación **enlazada**, **nuevas MAC** para todas las interfaces) dos veces: **Servidor Primario** y **Servidor Delegado**.
3. **Desconectar el cable de la interfaz NAT** (para que no haya Internet y no se acceda a servidores DNS reales).
4. Configurar IPs de la ethernet (Edit connections → *Wired connection 2* → IPv4 Settings, método *Manual*):

| Máquina | IP |
|---------|----|
| Servidor Primario | `192.168.1.1/24` |
| Servidor Delegado | `192.168.1.2/24` |

5. Reiniciar red y comprobar:
```bash
sudo nmcli networking off
sudo nmcli networking on
ip -c a
ping 192.168.1.2      # Ctrl+C para parar
```

### Laboratorio
- 6 islas; cada isla = una zona distinta **`islaX.ugr.es`**.
- Equipos con la opción "red aislada / Ubuntu18".
- Red de gestión **`172.16.X.Y/24`** (X = nº de isla, Y = equipo).
- En VMs se usa X = 1.

## 3.5 Tareas

### Tarea 0 — Deshabilitar `systemd-resolved`
- Es un servidor DNS **ligero con caché** (resolutor local). Hay que pararlo **en todas las máquinas** para que no entre en conflicto con bind.
```bash
sudo systemctl stop systemd-resolved.service
```
- Indicar el servidor DNS por defecto en **`/etc/resolv.conf`**:
```
nameserver <direccion_ip_servidor_nombres>
```
  - En la **misma máquina** del servidor → **`127.0.0.1`**.

### Tarea 1 — Servidor primario
1. En `named.conf.options` desactivar DNSSEC (sin Internet fallaría la validación):
```
dnssec-validation no;
```
2. En `named.conf.local` declarar la zona:
```
zone "isla1.ugr.es" IN {
        type master;
        file "/etc/bind/db.isla1.ugr.es";
};
```
   - `type master` → este servidor tiene los registros y **autoridad** sobre la zona.
   - `file` → fichero de registros (en `/etc/bind/` o con ruta completa).
3. Crear `/etc/bind/db.isla1.ugr.es`:
```dns
isla1.ugr.es.       3600 IN SOA ns.isla1.ugr.es. admin.isla1.ugr.es. (
                            20091126 3600 1800 1W 3600 )
isla1.ugr.es.       3600 IN NS  ns.isla1.ugr.es.
ns.isla1.ugr.es.    3600 IN A   <IP real del servidor>
host5.isla1.ugr.es. 3600 IN A   192.168.1.5
host6.isla1.ugr.es. 3600 IN A   192.168.1.6
host7.isla1.ugr.es. 3600 IN A   192.168.1.7
host8.isla1.ugr.es. 3600 IN A   192.168.1.8
```
4. Comprobar y reiniciar:
```bash
sudo named-checkconf                                   # sin salida = correcto
sudo named-checkzone isla1.ugr.es /etc/bind/db.isla1.ugr.es
sudo systemctl restart bind9.service                   # para que los cambios surtan efecto
```

**Zona raíz `.` en `named.conf.default-zones`:**
- **No** está definida como `master`: es de tipo **`hint`** → el servidor **no tiene autoridad** sobre la raíz; solo conoce una **lista de pistas (root hints)** con los servidores raíz (A–M) para poder arrancar la resolución.
- Sus registros son **NS** (servidores raíz) y **A** (sus IPs), en un fichero de *hints* (la ruta exacta depende de la versión).

### Tarea 2 — Comprobación
```bash
nslookup <nombre>
host <nombre>
dig <nombre>
```

| Comando | Salida |
|---------|--------|
| `nslookup` | Servidor consultado + respuesta |
| `host` | Una línea: `<nombre> has address <IP>` |
| `dig` | Salida detallada: **flags** (`qr aa rd ra`), secciones QUESTION / ANSWER / AUTHORITY / ADDITIONAL, tiempo, servidor |

- **Nombre inexistente** → `NXDOMAIN`.
- **Servicio parado** (`sudo systemctl stop bind9.service`) → no hay respuesta: `connection timed out; no servers could be reached`.
- **Varios nombres a una IP**: **sí**, con varios registros `A` con la misma IP (o con `CNAME`).

### Tarea 3 — Servidor delegado
1. En `named.conf.options` del **delegado**:
```
dnssec-validation no;
recursion yes;        // permite solicitudes recursivas
```
2. Declarar la subzona `equipos.islaX.ugr.es` (`type master`) y crear su fichero de registros (como en el primario, pero para la subzona).
3. Reiniciar y comprobar con `named-checkconf` y `named-checkzone`.
4. Comprobar en el delegado que resuelve, p. ej., `host1.equipos.isla1.ugr.es`.
5. **Configurar la delegación en el primario** con **dos registros**:
```dns
equipos.isla1.ugr.es.   3600 IN NS  delegado.isla1.ugr.es.
delegado.isla1.ugr.es.  3600 IN A   <IP del delegado>
```

| Registro | Función |
|----------|---------|
| **NS** | Dice que el servidor de la subzona `equipos.islaX.ugr.es` se llama `delegado.islaX.ugr.es` |
| **A** (*glue record*) | Da la IP de `delegado.islaX.ugr.es` (evita dependencia circular) |

6. **Prueba desde el cliente**: pedir al primario un nombre de la subzona → **se sirve el contenido**, pero la respuesta del primario **no lleva el flag `aa`** (*Authoritative Answer*) porque proviene del delegado. El flag `aa` solo aparece si se pregunta **directamente al delegado**.

### Tarea 4 — Wireshark
- Capturar en el primario, interfaz de la **red de gestión**.
- **Consulta de contenido del primario**: **un par consulta/respuesta** cliente ↔ primario (respuesta con `aa`).
- **Consulta de contenido del delegado**: el primario **reenvía** la consulta al delegado y devuelve la respuesta al cliente → **4 paquetes** (cliente→primario, primario→delegado, delegado→primario, primario→cliente).
- **Tras reiniciar el primario**: se vacía la **caché**, así que se repite el **mismo esquema** (vuelve a consultar al delegado). Sin reiniciar, la segunda consulta se respondería **desde la caché** (solo cliente ↔ primario).

## 3.6 Resumen rápido DNS

| Dato | Valor |
|------|-------|
| Software | **BIND9** (`bind9.service`) |
| Puerto DNS | **53** (UDP, y TCP para transferencias) |
| Ficheros | `/etc/bind/named.conf`, `.options`, `.default-zones`, `.local` |
| Resolutor del cliente | `/etc/resolv.conf` → `nameserver <IP>` |
| Comprobar configuración | `named-checkconf` |
| Comprobar zona | `named-checkzone <zona> <fichero>` |
| Aplicar cambios | `sudo systemctl restart bind9.service` |
| Consultas | `nslookup`, `host`, `dig` |
| Opción DNSSEC | `dnssec-validation no;` |
| Recursión (delegado) | `recursion yes;` |
| Tipo de zona primaria | `type master;` |
| Zona raíz en BIND | `type hint` |

---

# Test de repaso tipo examen

Intenta responder **sin mirar** y luego comprueba.

### Linux

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cómo acceder con un solo comando a `/etc/bind`? | `cd /etc/bind` |
| ¿Cómo volver al home desde cualquier sitio? | `cd` (o `cd ~`) |
| ¿Cómo subir un nivel en el árbol? | `cd ..` |
| ¿Diferencia entre ruta absoluta y relativa? | La absoluta empieza por `/` (raíz); la relativa no |
| ¿Qué significan `.`, `..` y `~`? | Directorio actual, directorio superior, carpeta personal del usuario |
| ¿Qué directorio contiene los ficheros de configuración? | `/etc` |
| ¿Dónde están los ficheros de dispositivos? | `/dev` |
| ¿Dónde se montan USB y CD-ROM? | `/media` |
| ¿Dónde están los logs y datos que cambian con frecuencia? | `/var` |
| ¿Dónde está la información de procesos y kernel? | `/proc` |
| ¿Diferencia entre `rmdir` y `rm -r`? | `rmdir` solo borra directorios vacíos; `rm -r` borra directorios con su contenido |
| ¿Cómo mover/renombrar un fichero? | `mv origen destino` |
| ¿Cómo ver las últimas 20 líneas de un fichero? | `tail -n 20 fichero` |
| ¿Qué hace `sudo`? | Ejecuta un comando con privilegios de superusuario |
| ¿Qué hace `ls -alh`? | Lista todo (incl. ocultos) en formato largo con tamaños legibles |
| ¿Para qué sirve `ps`/`pstree`/`top`? | Ver procesos / relación padre-hijo / uso de recursos en tiempo real |
| ¿Cómo lanzar un proceso en segundo plano? | Añadiendo `&` al final |
| ¿Qué hace `\|` y qué hace `>`? | Tubería (salida de uno = entrada del siguiente); redirección de salida a un fichero |
| ¿Cómo ver el estado de un servicio? | `sudo systemctl status <serv>` o `sudo service <serv> status` |
| ¿Cómo ver las IPs del equipo? | `ip -c a` (o `ifconfig`) |
| ¿Qué IP tiene la interfaz `lo`? | `127.0.0.1` |
| ¿Cómo conectar por SSH? | `ssh usuario@IP_remota` |
| ¿Tipo de red de VirtualBox con salida a Internet y DHCP automático? | **NAT** |
| ¿Tipo en el que las VMs se comunican por un "cable virtual" con nombre y sin IP automática? | **Red interna** |
| ¿Tipo que da una IP del rango del router doméstico? | **Adaptador puente** |
| ¿Tipo con DHCP de VirtualBox en `192.168.56.X`? | **Solo anfitrión** |

### LDAP

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es LDAP? | *Lightweight Directory Access Protocol*: protocolo para acceder a un servicio de directorio |
| ¿Puerto de LDAP? | **389** |
| ¿Pasos de una solicitud LDAP? | Conexión al puerto 389 → autenticación (o anónima) → búsqueda/lectura/modificación → desconexión |
| ¿Qué es un DN? | *Distinguished Name*: nombre único de cada entrada |
| ¿Qué es LDIF? | *LDAP Data Interchange Format*: formato de texto para describir las entradas |
| ¿Qué define el `objectClass`? | El tipo de nodo y sus atributos obligatorios y opcionales (definidos en los esquemas) |
| ¿Dónde están los esquemas? | `/etc/ldap/schema/` |
| ¿Cómo se lee la jerarquía de un DN? | De derecha a izquierda |
| ¿Servidor y cliente de OpenLDAP? | `slapd` (servidor), `ldap-utils` (clientes) |
| ¿Cómo comprobar si el servidor escucha en el 389? | `sudo ss -tlnp` |
| ¿Cómo configurar la estructura del árbol? | `sudo dpkg-reconfigure slapd` |
| ¿Cliente para añadir/consultar/modificar? | `ldapadd` / `ldapsearch` / `ldapmodify` |
| ¿Qué significan `-x`, `-D`, `-W`, `-f`? | Autenticación simple (texto plano); DN del admin; pedir contraseña; fichero LDIF |
| ¿Qué significa `-b` en `ldapsearch`? | Base DN desde la que se busca |
| ¿Qué error da buscar con una base inexistente? | `result: 32 No such object` |
| ¿Qué error da con el servidor parado? | `Can't contact LDAP server (-1)` |
| ¿Qué tres valores de `changetype` hay? | `add`, `modify`, `delete` |
| ¿Para qué sirve `-` en un LDIF de `modify`? | Separa varias operaciones en una sola transacción |
| ¿Qué operaciones admite `modify`? | `add`, `delete`, `replace` (de atributos) |
| ¿Por qué no se puede insertar un nodo bajo uno inexistente? | Porque la jerarquía exige que el padre exista: hay que respetar el orden de creación |
| ¿Qué herramienta gráfica se usa? | **JXplorer** |
| ¿Interfaz y filtro de Wireshark en la práctica LDAP? | Interfaz **Loopback (`lo`)**, filtro **`ldap`** |
| ¿Problema de seguridad con `-x`? | La contraseña viaja en **texto plano** |
| ¿Qué referencias se configuran en una BD LDAP distribuida? | Subordinadas inmediatas y superior |

### DNS

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es DNS? | Servicio distribuido, jerárquico y escalable de traducción nombre ↔ IP |
| ¿Forward vs reverse mapping? | nombre → IP / IP → nombre |
| ¿Cuántos servidores raíz hay? | 13 (A–M) |
| ¿Qué es una zona? | Conjunto de nombres de dominio contiguos |
| ¿Qué es delegar? | Traspasar a otros servidores la responsabilidad de una (sub)zona |
| ¿Tipos de servidores de una zona? | Primarios (master), secundarios (esclavos) y delegados |
| ¿Diferencia primario/secundario? | El primario tiene la copia maestra (de ficheros locales); el secundario la obtiene por transferencia de red (backup) |
| ¿Consulta iterativa vs recursiva? | Iterativa: el servidor va preguntando a otros y recibe la mejor respuesta posible de cada uno; recursiva: los servidores consultados hacen a su vez las consultas necesarias hasta dar una respuesta válida |
| ¿Qué consultas son iterativas por no sobrecargar? | Las dirigidas a los servidores **raíz** |
| **Indica los tres registros DNS vistos** | **SOA** (autoridad de zona), **NS** (servidor de nombres), **A** (IP); además **MX** (correo) |
| ¿Qué es el serial del SOA? | Nº de versión de la zona; se incrementa en cada cambio para que los secundarios sepan que deben actualizar |
| ¿Refresh/retry/expiry/negative TTL? | Frecuencia de consulta del secundario / reintento / caducidad sin contacto / tiempo de caché de respuestas negativas |
| ¿Qué es el TTL de un registro? | Tiempo de validez del registro en caché |
| ¿Software DNS de la práctica? | BIND9 |
| ¿Fichero donde se declaran las zonas con autoridad? | `named.conf.local` |
| ¿Fichero de opciones generales? | `named.conf.options` |
| ¿Fichero de zonas por defecto? | `named.conf.default-zones` |
| ¿Qué significa `type master`? | Este servidor contiene los registros de la zona y tiene autoridad sobre ella |
| ¿Cómo está definida la zona raíz `.`? | `type hint` (no master): lista de servidores raíz para arrancar la resolución |
| ¿Por qué `dnssec-validation no;`? | Sin Internet, las comprobaciones DNSSEC harían fallar las resoluciones |
| ¿Por qué parar `systemd-resolved`? | Es un DNS ligero con caché que entra en conflicto con bind |
| ¿Qué IP se pone en `resolv.conf` si el servidor es la propia máquina? | `127.0.0.1` |
| ¿Cómo comprobar la sintaxis de la configuración? | `sudo named-checkconf` (sin salida = correcto) |
| ¿Cómo comprobar un fichero de zona? | `sudo named-checkzone <zona> <fichero>` |
| ¿Cómo aplicar cambios? | `sudo systemctl restart bind9.service` |
| ¿Cómo parar el servicio? | `sudo systemctl stop bind9.service` |
| ¿Qué ocurre al consultar con bind parado? | Timeout: no se alcanza ningún servidor |
| ¿Qué ocurre al consultar un nombre inexistente? | `NXDOMAIN` |
| ¿Se pueden tener varios nombres para una IP? | Sí (varios registros A o CNAME) |
| ¿Qué opción activa la recursión? | `recursion yes;` |
| ¿Qué registros configurar en el primario para delegar? | **NS** (`equipos.islaX.ugr.es` → `delegado.islaX.ugr.es`) y **A** (IP de `delegado.islaX.ugr.es`) |
| ¿Qué indica el flag `aa`? | *Authoritative Answer*: la respuesta viene de un servidor con autoridad |
| ¿Tiene `aa` la respuesta del primario sobre un nombre del delegado? | No (la tiene solo la del propio delegado) |
| ¿Qué se ve en Wireshark al consultar contenido del delegado vía primario? | 4 paquetes: cliente→primario, primario→delegado, delegado→primario, primario→cliente |
| ¿Y tras reiniciar el primario? | Mismo esquema, porque se vacía la caché |
| ¿IPs de las VMs de la práctica? | Primario `192.168.1.1`, Delegado `192.168.1.2` |
| ¿Por qué desconectar el cable NAT? | Para evitar Internet y que se consulten servidores DNS reales |
| ¿Cómo se clonan las VMs? | Clonación enlazada, generando nuevas MAC |

---

# Chuleta final

### Puertos
| Servicio | Puerto |
|----------|--------|
| LDAP | **389** |
| DNS | **53** |
| SSH | 22 (por defecto) |

### Ficheros clave
| Ruta | Contenido |
|------|-----------|
| `/etc/resolv.conf` | Servidor DNS del sistema |
| `/etc/bind/named.conf` | Configuración principal de BIND |
| `/etc/bind/named.conf.options` | Opciones (DNSSEC, recursión) |
| `/etc/bind/named.conf.default-zones` | Zonas por defecto (incluye `.` como hint) |
| `/etc/bind/named.conf.local` | Zonas con autoridad |
| `/etc/bind/db.<zona>` | Registros de una zona |
| `/etc/ldap/schema/` | Esquemas de OpenLDAP |

### Comandos por servicio
```bash
# --- Servicios (genérico) ---
sudo systemctl start|stop|restart|status <servicio>

# --- LDAP ---
sudo apt install slapd ldap-utils
sudo dpkg-reconfigure slapd
sudo ss -tlnp
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=*)"
ldapadd    -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemplo.ldif
ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemploModify.ldif

# --- DNS ---
sudo apt install bind9
sudo systemctl stop systemd-resolved.service
sudo named-checkconf
sudo named-checkzone isla1.ugr.es /etc/bind/db.isla1.ugr.es
sudo systemctl restart bind9.service
nslookup host5.isla1.ugr.es
host host5.isla1.ugr.es
dig host5.isla1.ugr.es

# --- Red ---
ip -c a
ping 192.168.1.2
sudo nmcli networking off && sudo nmcli networking on
```

---

*Resumen elaborado a partir de los guiones de prácticas de Sistemas Telemáticos (Dpto. Teoría de la Señal, Telemática y Comunicaciones, UGR) y de apuntes de la práctica de Ubuntu. Material de estudio personal; el contenido original pertenece a sus autores.*
