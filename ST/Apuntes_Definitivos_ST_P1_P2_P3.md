# Sistemas Telemáticos — Apuntes definitivos de prácticas (P1, P2 y P3)

**Universidad de Granada · 2º Grado en Ingeniería de Tecnologías de Telecomunicación · Dpto. de Teoría de la Señal, Telemática y Comunicaciones**

> **Objetivo de este documento:** recoger **toda** la información de los guiones de las tres prácticas, hasta el mínimo detalle (comandos, opciones, valores literales, contraseñas, IPs, nombres de fichero, salidas esperadas, avisos del guion, preguntas planteadas…), de forma esquematizada para poder estudiarla para el examen.

---

## Fuentes y convenciones

| Práctica | Título | Fuente |
|----------|--------|--------|
| **P1** | Manual básico de Ubuntu | Apuntes de estudiante (PDF "PracticasST1", Wuolah) — secciones 1 a 14 |
| **P2** | Aplicación cliente/servidor: servicio de directorio (LDAP) | Guion oficial *ST_P2_LDAP_v2023* (© G. Maciá, J. Camacho, L. Sánchez, P. Padilla y R. Rodríguez) **+** resumen de la misma práctica en el PDF de apuntes (secciones 15 a 21) |
| **P3** | Configuración del servicio DNS en el laboratorio | Guion oficial *ST_P3_DNS_v2024* (mismos autores) |

**Convenciones usadas:**

- Todo lo que aparece sin marca es contenido **tal cual del guion/apuntes** (reordenado y esquematizado).
- > **Aclaración:** bloques así son explicaciones **añadidas** para entender mejor el porqué. **No** figuran en los guiones; no las confundas con "lo que dice el profesor".
- **(Respuesta razonada)** = respuesta a una pregunta que el guion plantea pero **no responde**; está deducida del funcionamiento de DNS/LDAP.
- `$` indica el prompt de la terminal: **no** forma parte del comando.
- Los guiones advierten de que al **copiar y pegar** desde el PDF los guiones (`-`) y las comillas (`"`) **no se copian con el carácter correcto** (aparecen como `–` y `“ ”`): **hay que escribirlos a mano**.

---

## Índice

- [PARTE I — P1: Manual básico de Ubuntu](#parte-i--p1-manual-básico-de-ubuntu)
- [PARTE II — P2: LDAP](#parte-ii--p2-aplicación-clienteservidor-servicio-de-directorio-ldap)
- [PARTE III — P3: DNS con BIND9](#parte-iii--p3-configuración-del-servicio-dns-en-el-laboratorio)
- [PARTE IV — Material de repaso](#parte-iv--material-de-repaso)
  - [IV.1 Datos literales para memorizar](#iv1-datos-literales-para-memorizar)
  - [IV.2 Erratas y detalles curiosos de los guiones](#iv2-erratas-y-detalles-curiosos-de-los-guiones)
  - [IV.3 Preguntas de detalle tipo examen](#iv3-preguntas-de-detalle-tipo-examen)

---

---

# PARTE I — P1: Manual básico de Ubuntu

## P1.1 Introducción a Ubuntu y sus componentes

Ubuntu es una distribución de **GNU/Linux**, basada en **software libre y de código abierto**.

| Componente | Descripción |
|-----------|-------------|
| **Kernel** | Núcleo del sistema operativo; se encarga de **asignar tareas** y **manejar el almacenamiento de datos** |
| **Shell (intérprete de comandos)** | **Procesa las órdenes** de los usuarios |
| **Sistema de archivos** | **Organización jerárquica** para almacenar archivos |
| **Utilidades** | **Programas** que permiten realizar tareas específicas |

## P1.2 Terminal en Ubuntu

Aplicación que permite, mediante **órdenes escritas**, realizar todo tipo de operaciones.

- **Terminal**: herramienta para interactuar con el sistema a través de comandos. Se abre con **`Ctrl + Alt + T`**.
- **Prompt**: carácter o conjunto de caracteres que utiliza el shell para **avisar de que está a la espera de comandos**. Ejemplo: `usuario@maquina: /directorio$`.
- **Atajos útiles:**

| Acción | Atajo |
|--------|-------|
| Abrir nueva pestaña | `Ctrl + Shift + T` |
| Moverse entre pestañas | `Ctrl + Av. Pág` o `Ctrl + Re. Pág` |
| Cerrar pestaña | `Ctrl + Shift + W` |

## P1.3 El comando más importante: `man`

Muestra el **manual de otros comandos**. Ejemplo: `$ man ls` (manual de `ls`).

| Tecla dentro del manual | Acción |
|------------------------|--------|
| `/` | Buscar en el manual |
| `n` | Siguiente coincidencia |
| `p` | Coincidencia anterior |
| `q` | Salir del manual |

## P1.4 Estructura de directorios

Organización **jerárquica** que parte del **directorio raíz `/`**.

| Directorio | Contenido |
|-----------|-----------|
| `/bin` | Programas **ejecutables básicos** para el sistema |
| `/boot` | Ficheros necesarios para el **arranque** del sistema |
| `/dev` | Ficheros correspondientes a los **dispositivos**: sonido, impresora, disco duro, lector de CD/DVD, vídeo, etc. |
| `/etc` | Ficheros y directorios de **configuración** |
| `/home` | **Directorios de trabajo de los usuarios**. Cada usuario tiene su propio directorio dentro de `/home/` |
| `/lib` | **Librerías compartidas** y **módulos del kernel** |
| `/media` | Aquí se **montan los dispositivos** como el CD-ROM, memorias USB, discos duros portátiles, etc. |
| `/opt` | Directorio **reservado para instalar aplicaciones** |
| `/proc` | Datos del **kernel** e información sobre **procesos** |
| `/sbin` | Ficheros **binarios ejecutables del sistema operativo** |
| `/srv` | Datos de los **servicios** proporcionados por el sistema |
| `/tmp` | Archivos **temporales** |
| `/usr` | La **mayoría de los archivos del sistema**, aplicaciones usadas por todos los usuarios, librerías, manuales, juegos… Es un **espacio compartido** |
| `/var` | Archivos **administrativos** y datos que **cambian con frecuencia**: registro de errores (logs), bases de datos, colas de impresión, etc. |

## P1.5 Moviéndose por el árbol de directorios

| Comando | Función | Ejemplo |
|---------|---------|---------|
| `cd` | Cambiar de directorio | `cd /home` |
| `cd ..` | **Subir un nivel** en el árbol | `cd ..` |
| `cd` (sin argumentos) | **Volver a tu directorio home** | `cd` |
| `pwd` | Mostrar la **ruta absoluta** del directorio actual | |
| `ls` | **Listar** archivos y carpetas en un directorio | |
| `mkdir` | **Crear** un directorio | `mkdir Practicas` |

### Rutas (paths)

- Un archivo **siempre** se encuentra en una posición **relativa al directorio raíz `/`**. Esa es su **ruta o path**.
- El **nombre del path es necesario** para acceder a él **si no estamos en el mismo directorio** donde se encuentra el archivo.
- Un path se puede especificar:
  1. **Explicitando la ruta exacta**, en referencia al directorio raíz `/`.
  2. Indicando la ruta **en referencia a la carpeta actual**.
  3. En referencia a una de estas **abreviaturas**:

| Abreviatura | Nombre | Significado |
|-------------|--------|-------------|
| `.` | el punto | Directorio **actual** |
| `..` | dos puntos seguidos | Directorio **superior** al directorio actual |
| `~` | la virgulilla | **Carpeta personal** del usuario que ejecuta el comando |

- En Unix hablamos de:
  - **Rutas relativas**: se dan **respecto a una carpeta concreta** (por ejemplo, nuestro home).
  - **Rutas absolutas**: se dan **respecto al directorio raíz**.
- **Truco para distinguirlas:** las **absolutas siempre comienzan con `/`** (el directorio raíz) y las **relativas nunca comienzan con `/`**.

> **Aclaración (aplicación directa):** para ir a `/etc/bind` con **un solo comando**: `cd /etc/bind` (ruta absoluta; funciona desde cualquier directorio).

## P1.6 Manipulación de archivos

- **Crear archivos con editores de texto como `nano`:** `$ nano archivo.txt`
- **Atajos en nano:**
  - Guardar: **`Ctrl + O`**
  - Salir: **`Ctrl + X`**
- **Archivo con espacios en el nombre** → entre comillas: `$ nano "Mis notas.txt"`
- **Ver archivos:**

| Comando | Función |
|---------|---------|
| `cat` | **Visualiza el contenido** de un archivo |
| `head` | Muestra las **primeras** líneas |
| `tail` | Muestra las **últimas** líneas |

  - Por defecto `head` y `tail` muestran **solo 10 líneas**, pero se puede pedir cualquier número con el parámetro **`-n`**. Ejemplo: `$ tail -n 20 <nombre fichero>`.

## P1.7 Copia, movimiento y eliminación de archivos

| Comando | Función | Sintaxis / ejemplo |
|---------|---------|--------------------|
| `cp` | **Copiar** archivos | `$ cp <archivo origen> <ruta destino>` |
| `mv` | **Mover** archivos (el archivo **no se mantiene en el origen**); **misma sintaxis que `cp`** | `$ mv <origen destino>` |
| `rm` | **Borra archivos** | |
| `rmdir` | Borra **directorios vacíos** | |
| `rm -r` | Borra **directorios y su contenido** | |

(En la tabla resumen: `mv` = "Mueve **o renombra** el fichero"; `cp` = "Copia el fichero **o directorio**"; `rm [-i] [-r]`: `-i` pide confirmación antes de borrar, `-r` borra todo.)

## P1.8 Gestión de usuarios y permisos

### Tipos de usuarios en Linux

| Tipo | Descripción |
|------|-------------|
| **Root** | El **superusuario** del sistema. Puede **administrar el sistema**, es decir, tiene el **control total** sobre el sistema operativo |
| **Usuarios normales** | Usuarios habituales. Pueden **configurar y manipular únicamente los elementos que les pertenezcan**. Tienen **espacio en disco (en su propio directorio home)** así como **un shell** |
| **Usuarios de sistema** | Se encargan de **gestionar los servicios y demonios** del sistema |

- **`sudo`**: permite **ejecutar comandos con privilegios de superusuario**. Ejemplo: `$ sudo <comando>`.

## P1.9 Comandos relacionados con procesos

| Comando | Función |
|---------|---------|
| `ps` | **Lee la información de los archivos `/proc/`** |
| `pstree` | Visualiza la **relación padre-hijo** de los procesos |
| `kill` | Termina procesos en ejecución |
| `killall` | Termina procesos en ejecución; **los mata a todos** |
| `top` y `htop` | Muestran información **en tiempo real** sobre los procesos y su **uso de recursos** |

## P1.10 Servicios del sistema

- **`service`**: gestiona los **demonios** del sistema.
- Ver todos los servicios: `$ service --status-all`
- Ejemplo: `$ sudo service ssh status` → muestra el estado del servicio SSH.
- El comando `service <demonio>` admite varias órdenes principales:

| Orden | Función |
|-------|---------|
| `status` | Indica el **estado** del demonio, con información relevante sobre la ejecución |
| `start` | **Inicia** el demonio si está detenido |
| `stop` | **Detiene** el demonio si está en ejecución |

- Otros servicios implementan órdenes más complejas: **`reload`, `force-reload`, `restart`, `try-restart`**.

## P1.11 Interfaces o adaptadores de red

Las máquinas se conectan mediante **interfaces de red** (cableadas o inalámbricas, como wifi o bluetooth), que requieren una **dirección IP** para su configuración. En máquinas virtuales se pueden crear **varias interfaces** y elegir su **tipo de conexión**:

| Tipo | Descripción |
|------|-------------|
| **NAT** | La VM accede a **Internet usando la conexión de la máquina host**. Toma una dirección IP **de forma automática mediante DHCP** |
| **Red interna** | Conecta la interfaz a un **cable virtual** que tiene un **nombre** que le proporcionamos como valor. Cuando dos máquinas se conectan al **mismo "cable virtual"** pueden comunicarse entre sí. **No asigna IP automáticamente** |
| **Adaptador puente** | Conecta la interfaz a la **misma subred a la que está conectada la interfaz de red real del host**. Si la VM está en casa conectada al router doméstico, obtendrá una IP **en el mismo rango** que la de nuestra interfaz física |
| **Adaptador sólo anfitrión** | Conecta la interfaz virtual a un **DHCP gestionado por VirtualBox**, que da una IP dinámica; **host y VM quedan en la misma subred virtual** (suele ser, salvo cambio, una IP **`192.168.56.X`**) |

## P1.12 Conexiones de red y SSH

- **Dirección IP**: **identificador único de una interfaz de red**. Se visualiza con `ifconfig` o, **preferiblemente**, con **`ip -c a`** (salida **coloreada** que facilita la lectura).
- Hay interfaces **especiales**, como **`lo` (loopback)**: conecta **internamente con la propia máquina** y tiene la IP **`127.0.0.1`**.
- **SSH**: permite **conectar de forma remota** a otra máquina. Formato:

```bash
$ ssh usuario@IP_remota
```

  - Hace falta la **IP de la máquina remota** y las **credenciales (usuario y contraseña)**. Tras introducir el comando, el sistema **pide la contraseña** del usuario para establecer la **conexión segura**.
  - Ejemplo: máquina con IP `10.23.1.3` y usuario `alumno` → `$ ssh alumno@10.23.1.3`
  - **Primera conexión**: puede pedir **aceptar el certificado** de la máquina remota → responder **`YES`**.
  - **Para salir** de la conexión: **`Ctrl + D`** (también `exit`, según la tabla resumen).

## P1.13 Resumen de comandos básicos

### 13.1 Ayuda

| Comando | Descripción |
|---------|-------------|
| `man <comando>` | **Manual completo** sobre un comando |
| `<comando> --help` | **Ayuda básica** sobre un comando |
| `<comando> --usage` | **Sintaxis básica** sobre un comando |
| `whatis` | Información **muy reducida** sobre un comando |

### 13.2 Administración de carpetas y archivos

| Comando | Descripción |
|---------|-------------|
| `dir` | Lista los ficheros y carpetas |
| `ls [-a] [-l]` | Visualiza ficheros y carpetas (`-a` ver archivos **ocultos**, `-l` **información adicional**) |
| `mkdir <ruta>` | Crea un directorio |
| `rmdir <ruta>` | Elimina un directorio **vacío** |
| `cd <ruta>` | Cambia el directorio actual |
| `cp <origen> <destino>` | Copia el fichero o directorio |
| `mv <origen> <destino>` | Mueve o **renombra** el fichero |
| `rm [-i] [-r] <ruta>` | Elimina ficheros o carpetas (`-i` confirmación antes de borrar, `-r` borra todo) |
| `cat <ruta>` | Visualiza el contenido de un fichero |
| `grep <texto> <fichero>` | **Busca líneas** con un texto específico |
| `pwd` | Muestra la ruta actual |
| `nano <ruta>` | Edita un archivo **desde la propia terminal** |
| `gedit <ruta>` | Edita un archivo mediante **interfaz gráfica** |
| `geany <ruta>` | Edita un archivo mediante **interfaz gráfica** |
| `tar {opciones} <rutas>` | **Agrupa varios ficheros en uno solo** (`-x` extraer, `-c` crear, `-v` progreso, `-f` archivo, `-z` comprimir) |
| `gzip [-d] <ruta>` | **Comprime** (`-d` descomprime) un archivo |

### 13.3 Permisos y usuarios

| Comando | Descripción |
|---------|-------------|
| `chmod <permisos> <ruta>` | Cambia permisos de acceso a un archivo. **`u/g/o/a`** = usuario / grupo / otros / todos; **`+`** añade, **`-`** retira; **`r`** lectura, **`w`** escritura, **`x`** ejecución |
| `sudo <comando>` | Ejecuta un comando con privilegios de administrador |
| `su [<usuario>]` | **Cambia de usuario**, solicitando la contraseña |
| `sudo su` | Cambia a usuario **con permisos de administrador** |
| `passwd [<usuario>]` | **Cambia la contraseña** de un usuario |
| `adduser <usuario>` | **Añade** un nuevo usuario al sistema |

### 13.4 Gestión de programas y paquetes

| Comando | Descripción |
|---------|-------------|
| `apt install <prog>` | Instala el programa siempre que esté **en el repositorio de Ubuntu** |
| `apt update` | **Actualiza los repositorios** de Ubuntu en el sistema |
| `apt upgrade` | **Actualiza el software** con las últimas versiones disponibles en los repositorios |
| `dpkg -i <paquete>` | Instala un paquete **`.deb` descargado de Internet** |

### 13.5 Monitorización y diagnóstico

| Comando | Descripción |
|---------|-------------|
| `netstat -opciones` | **Estadísticas de red** (conexiones establecidas y en escucha) |
| `-t` | Conexiones **TCP** |
| `-l` | Conexiones **en escucha** |
| `-p` | Muestra el **nombre del proceso** (requiere privilegios de administrador) |
| `-n` | **Formato numérico** para direcciones y puertos |
| `ifconfig` | Información de las interfaces de red |
| `ip -c address` o `ip -c a` | Información de las interfaces de red, **con colores** |
| `ping <host>` | Información sobre la **conectividad** con otro equipo |
| `nc -l <puerto>` | Lanza un **servidor netcat escuchando** en un puerto |
| `nc <host> <puerto>` | Conecta con un **cliente netcat** a una máquina remota |

### 13.6 Manejo de procesos

| Comando | Descripción |
|---------|-------------|
| `kill <PID>` | Mata el proceso con identificador `<PID>` |
| `ps aux` | Muestra **todos los procesos** del sistema, **incluido él mismo** |
| `<comando> &` | Lanza el proceso **en segundo plano** (*background*) |
| `service <serv> start` | Inicia el servicio |
| `systemctl start <serv>` | Inicia el servicio **usando `systemctl`** |

### 13.7 Otros comandos

| Comando | Descripción |
|---------|-------------|
| `<cmd1> \| <cmd2>` | **Tubería (pipe)**: la salida del comando anterior pasa como **entrada** del siguiente |
| `<comando> > <ruta>` | **Redirección**: sustituye la **salida estándar** (ej. la pantalla) por un archivo |
| `echo <cadena>` | Muestra en pantalla la cadena de texto |
| `printf <cadena>` | Muestra en pantalla la cadena de texto **formateada** |
| `shutdown now` o `poweroff` | **Apaga el equipo inmediatamente** |
| `hostname` | Devuelve el **nombre de la máquina** a la que estamos conectados |
| `ssh <usuario@hostname>` | Conecta de manera **segura** con una máquina remota |
| `exit` | **Cierra la sesión actual o la terminal** |
| `./<script>.sh` | Ejecuta un **script con extensión `.sh`** bajo el shell para **automatizar tareas** |
| `/dev/null` | Archivo que actúa como una especie de **papelera siempre vacía** |
| `diff <ruta1> <ruta2>` | **Compara dos archivos** y busca diferencias entre ellos |
| `dhclient` | Configura las interfaces de red mediante el protocolo **DHCP** |
| `sendmail <cuenta>` | **Envía un correo electrónico** a una cuenta específica |

## P1.14 Retos (con sus respuestas del documento)

| Reto | Respuesta |
|------|-----------|
| **14.1** Qué hace cada argumento de `ls -alh` | **`-a`**: muestra **todos** los archivos, incluidos los **ocultos** (los que empiezan con un punto `.`). **`-l`**: **formato largo**, con detalles como **permisos, número de enlaces, propietario, grupo, tamaño y fecha de modificación**. **`-h`**: muestra los **tamaños en formato legible para humanos** (KB, MB…) en lugar de solo bytes. En conjunto: lista **todos** los archivos (incluidos ocultos) del directorio actual con **información detallada** y tamaños fáciles de leer |
| **14.2** Grupo al que pertenece tu usuario (en la VM, el usuario *administrador*) | `$ groups` |
| **14.3** ¿Para qué sirve `xkill`? Úsalo con `gedit` | `xkill` permite **cerrar cualquier ventana de aplicación** del entorno gráfico. Al ejecutarlo, **el puntero del ratón cambia** y se hace **clic en la ventana** que se quiere cerrar. Ejemplo: `$ gedit &` (abre gedit en segundo plano), luego `$ xkill` y clic en la ventana de gedit |
| **14.4** MAC de tus interfaces | `$ ifconfig` (también `ip`). La MAC se muestra como **seis pares de caracteres hexadecimales separados por dos puntos**, p. ej. `00:1A:2B:3C:4D:5E` |
| **14.5** Cómo saber qué interfaz de red corresponde a cada interfaz virtual de VirtualBox | `$ ip link show` muestra todas las interfaces (incluidas las virtuales). Después, **revisar en VirtualBox las MAC de cada adaptador y compararlas** con las de `ip link show` |
| **14.6** Listar los archivos que empiecen por `hos` en `/etc` | `$ ls /etc \| grep 'hos'` (combinación de `ls` y `grep` con expresión regular) |

> **Aclaración:** `grep 'hos'` filtra líneas que **contienen** "hos" en cualquier posición (p. ej. `ghostscript`…). Para que **empiecen** por `hos`: `ls /etc | grep '^hos'` o `ls /etc/hos*`. Es el matiz que el guion no hace.

---

---

# PARTE II — P2: Aplicación cliente/servidor: servicio de directorio (LDAP)

## P2.1 Objetivo

Familiarizarse con los conceptos del **paradigma cliente/servidor**. En concreto, revisar la **configuración y uso de un servicio de directorio** basado en el protocolo **LDAP** (*Lightweight Directory Access Protocol*) usando la herramienta de libre distribución **openLDAP**.

## P2.2 Teoría: servicio de directorio, protocolo LDAP y formato LDIF

### Modelo cliente/servidor
- Lo siguen muchísimos protocolos: **HTTP, FTP, DNS**, etc.
- Existe un proceso **servidor**, ejecutándose en un ordenador, que **ofrece el servicio de forma continua** y **espera solicitudes en un determinado puerto**.
- Un proceso **cliente** que quiere acceder necesita conocer:
  1. Cómo llegar al ordenador del servicio (**dirección IP o nombre de dominio**).
  2. El **puerto** donde "escucha" el servidor.
- Con esa información, el cliente hace una **solicitud** y el servidor **responde**. Ejemplo: la **navegación web**.

### Servicio de directorio
- Sigue el mismo modelo cliente/servidor.
- Sirve para **almacenar y consultar información sobre usuarios y recursos de una red**.
- Requiere un **protocolo de comunicación**; uno de los más utilizados es **LDAP**.

### Pasos de una solicitud LDAP (búsqueda, lectura, escritura)

| Paso | Descripción |
|------|-------------|
| **i** | El cliente **conecta al servidor al puerto 389** |
| **ii** | **Autenticación**: el servidor comprueba si la información de **usuario/contraseña** es correcta. También es posible la **conexión anónima** |
| **iii** | Se realiza la **búsqueda / lectura / modificación** de los datos |
| **iv** | Se realiza la **desconexión** |

> **Aclaración (para Wireshark, Tarea 8):** en el protocolo LDAP estos pasos se corresponden con las operaciones *bind* (autenticación), la operación (*search / add / modify*) y *unbind* (desconexión). Los nombres *bind/unbind* no vienen en el guion.

### Base de datos LDAP y LDIF
- El servidor accede a los recursos de la red, **codificados como entradas** en una **base de datos (BD)** usando el formato **LDIF** (*LDAP Data Interchange Format*).
- Una BD LDAP es un **conjunto de entradas o nodos** con un **nombre**: el **DN** (*Distinguished Name*).
- Internamente cada entrada contiene **atributos** de la forma `<atributo>:<valor>`.

### Ejemplo de entrada del guion

```ldif
dn: cn=Rector,o=ugr,c=es
cn: Rector
objectClass: organizationalRole
objectClass: top
userPassword: {SSHA}someSSHAdata
```

| Atributo | Significado |
|----------|-------------|
| **`dn`** | *Distinguished Name*: **el primero y más importante**; especifica de **forma única cada entrada** de la BD |
| **`cn`** | *Common Name* (nombre común) |
| **`objectClass`** | **Clase de objeto**: especifica los atributos (**requeridos y opcionales**) de cada entrada. Está definida en los **esquemas** |
| **`userPassword`** | Contraseña del usuario. Aquí aparece **el resumen (hash)** de la contraseña (`{SSHA}…`) |

- **Esquemas** = definiciones de los **tipos de nodo** que se pueden incluir en la BD.
- En el ejemplo se considera **un usuario del sistema con el hash de su contraseña**. El usuario representado por la entrada **usará esa contraseña para hacer solicitudes** de acceso o modificación en la BD. Por tanto, **la BD podría contener información de acceso a sus propios contenidos**.

### Estructura en árbol

- La BD LDAP es una **estructura en forma de árbol**: hay un **nodo raíz** del que **cuelga el resto** de entradas.
- La **jerarquía se establece a partir de los DN**. En el ejemplo, `cn=Rector,o=ugr,c=es` es **hijo** de `o=ugr,c=es`.

```
                 c=es                      (raíz)
                  │
                o=ugr
               /     \
        cn=Rector   ou=Profesores
                    /    │     \
          cn=Gabriel cn=Rafael cn=Pablo
```

- Alternativamente, la jerarquía se expresa **en función del dominio o subdominio** al que pertenece el usuario. En `cn=Rector,o=ugr,c=es` **el orden de jerarquía se dicta de derecha a izquierda**: **Rector pertenece a ugr, y esta a es**.
- **Esta es la nomenclatura más difundida y la que se utiliza en la práctica.**

## P2.3 Entornos de trabajo

| Entorno | Datos |
|---------|-------|
| **a) Máquina virtual de la asignatura ST** | Usuario **`administrador`**, contraseña **`admin1`** |
| **b) Máquina en el laboratorio de la ETSIIT** | Arrancar los equipos en **"red aislada / Ubuntu 18.04"**. Una vez cargada la imagen, se accede con la contraseña **`finisterre`** |

- Se utiliza **una sola máquina**: **servidor y cliente se arrancan en ella**. Las comunicaciones se realizan entre ambos **a través de la interfaz virtual `lo`** (loopback).
- **Aviso del guion:** tras ejecutar **cada comando** hay que **revisar con atención la salida**. En muchas ocasiones mostrará un **error**, lo que implica que **no se ejecutó con éxito** y habrá que **analizar por qué**.

## P2.4 Tareas

### Tarea 0 — Instalación del servidor y del cliente

- **Solo en máquina virtual** (en el laboratorio **no es necesario**):

```bash
$ sudo apt update
$ sudo apt install slapd ldap-utils
```

- `slapd` = **servidor**; `ldap-utils` = **clientes** (`ldapsearch`, `ldapadd`, `ldapmodify`…).
- El símbolo `$` indica el inicio de la entrada en la terminal: **no es parte del comando** y no hay que escribirlo.
- Cuando la terminal pregunte la contraseña de administrador → **`admin1`**.

### Tarea 1 — Inicio del servidor y comprobación con el cliente

- El servicio LDAP se configura mediante el servidor **`slapd`**.
- **El servidor debe ejecutarse antes que el cliente** (para que quede **a la espera de sus conexiones**).

```bash
$ sudo systemctl status slapd.service     # comprobar si está arrancado
```

> **Recordatorio del guion:** también se puede con `service`: `sudo service slapd status`.

```bash
$ sudo systemctl start slapd.service      # si está parado, arrancarlo
```

- Volver a comprobar con `systemctl` que el servicio está activo. **Alternativa**: usar **`ss`** para comprobar si `slapd` **escucha en el puerto 389**:

```bash
$ sudo ss -tlnp
```

- Comprobar que es posible conectarse con un cliente:

```bash
$ ldapsearch -x
```

  `ldapsearch` es un **cliente LDAP que permite realizar búsquedas en la BD**. Si el servidor está activo, la salida (aún sin configurar la BD) es:

```
# extended LDIF
#
# LDAPv3
# base <> (default) with scope subtree
# filter: (objectclass=*)
# requesting: ALL
#

# search result
search: 2
result: 32 No such object

# numResponses: 1
```

| Línea de la salida | Significado |
|-------------------|-------------|
| `LDAPv3` | Versión del protocolo |
| `base <> (default) with scope subtree` | Base de búsqueda **vacía por defecto**, alcance **subárbol** |
| `filter: (objectclass=*)` | Filtro por defecto: **todas las entradas** |
| `requesting: ALL` | Pide **todos** los atributos |
| `result: 32 No such object` | El objeto/base **no existe** (BD sin configurar o base incorrecta) |

### Tarea 2 — Cese de funcionamiento del servidor

```bash
$ sudo systemctl stop slapd.service
```

- Volver a ejecutar una búsqueda con `ldapsearch`. La salida debería ser:

```
# ldap_sasl_bind(SIMPLE): Can't contact LDAP server (-1)
```

→ **No hay servidor escuchando**, el cliente **no puede contactar**.

### Tarea 3 — Configuración del servicio

- Hay que **definir la estructura del árbol** e indicar **a partir de qué entrada del árbol nuestro servidor contiene información**:

```bash
$ sudo dpkg-reconfigure slapd
```

| Pregunta | Respuesta |
|----------|-----------|
| **Omitir configuración** | **No** |
| **DNS domain name** | **`aula34.ugr.es`** (será la **entrada inicial del árbol** para nuestro servidor) |
| **Organization** | **`aula34.ugr.es`** |
| **Tipo de base de datos** (*solo lo pregunta en el laboratorio*) | **MDB** |
| **Password** | **`admin1`** (**`finisterre`** en el laboratorio) |
| **Borrar base de datos cuando se purgue slapd** | **NO** |
| **Move old database** | **YES** |

- Comprobar que existe la entrada `dc=aula34,dc=ugr,dc=es`. **La opción `-b` indica la entrada base de la búsqueda en el árbol**. Si no se corresponde con un nodo que exista en el servidor, **la búsqueda resultará vacía**:

```bash
$ ldapsearch -x -b dc=aula34,dc=ugr,dc=es
```

- Con la base mal puesta se obtiene:

```
# result: 32 No such object
```

> **Aviso del guion:** al copiar y pegar comandos desde el PDF **los guiones y las comillas no se copian con el carácter correcto**; se recomienda **escribirlos** o fijarse mucho en los caracteres a cambiar.

> **Aclaración:** el dominio `aula34.ugr.es` se descompone en componentes: **`dc=aula34,dc=ugr,dc=es`**. El administrador por defecto es `cn=admin,dc=aula34,dc=ugr,dc=es`.

### Tarea 4 — Añadir un nodo/entrada a la base de datos

**Formato LDIF:** cada nodo es una serie de líneas de texto `atributo:valor`. Los atributos permitidos **dependen del esquema** con el que se haya definido la BD; los esquemas se pueden consultar en los ficheros del directorio **`/etc/ldap/schema/`**.

Crear un fichero **`ejemplo.ldif`** (con `gedit` o `nano`) y modificarlo para incluir los nodos. Ejemplo con **3 nodos**:

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

**Avisos del guion sobre este fichero:**
- **Cambiar los campos entre `<` y `>`** por nombres coherentes inventados.
- **No usar acentos** en ningún campo.
- **Respetar las líneas en blanco** (separan entradas).

**Explicación de los tres objetos:**

| Nodo | `objectClass` | Descripción |
|------|--------------|-------------|
| 1.º `dc=<nombre_PC>,…` | **`dcObject`** (+ `organization`) | Se utiliza **como contenedor** para otros nodos/entradas |
| 2.º `cn=<alumno1>,…` | **`organizationalRole`** | Definido en el esquema como una **entrada con un nombre (`cn`) y con una descripción** |
| 3.º `cn=<alumno2>,…` | **`person`** | Permite los atributos **nombre (`cn`), apellidos (`sn`) y descripción** |

- **Fíjate bien en el valor de `dn`** en el que se insertan los nodos. **No se puede insertar un nodo bajo otro que no exista**: la secuencia de creación **debe ser coherente y seguir el orden correcto**.
- Este fichero añade **una entrada con la información del nodo raíz** y **dos usuarios**: el **director** de la empresa ficticia creada en la isla y **un técnico** de la misma.

**Comando para añadir** (cliente `ldapadd`):

```bash
$ ldapadd -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemplo.ldif
```

| Opción | Significado |
|--------|-------------|
| **`-x`** | **Autenticación simple**: se autentica con **un DN y una contraseña en texto plano (sin proteger)** |
| **`-D <DN>`** | DN del **usuario administrador** que realiza la inserción; **debe tener permisos de escritura** |
| **`-W`** | Hace que **se solicite la contraseña** (del usuario indicado en `-D`) |
| **`-f <PATH>`** | **Fichero** con las entradas en formato LDIF (aquí `ejemplo.ldif`; depende del nombre que el alumno le haya dado) |

### Tarea 5 — Consulta de datos (`ldapsearch`)

Sirve también para **comprobar que se han añadido correctamente** las entradas de la Tarea 4.

```bash
$ ldapsearch -x -b "<dn_base>" "(<filtros de búsqueda>)" <atributos>
```

Ejemplo:

```bash
$ ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(dc=aula34)" dn cn
```

| Parte | Significado |
|-------|-------------|
| **`-b "dc=aula34,dc=ugr,dc=es"`** | **Base DN** (*Distinguished Name*) desde donde **comenzará la búsqueda** en el directorio LDAP; el nodo **raíz** desde el que empieza |
| **`"(dc=aula34)"`** | **Criterio o filtro de búsqueda**: recupera **todas las entradas que tengan un atributo `dc` con el valor `aula34`** |
| **`dn` y `cn`** | **Atributos que se desea mostrar** de las entradas que coinciden. Si se usa el símbolo **`+`** se muestran los **atributos operacionales** de las entradas |

**Búsquedas propuestas por el guion** (realizar según la estructura de BD generada):

1. Encontrar los **nodos con un nombre específico** y mostrar **solo su atributo `objectClass`**.
2. Encontrar los **nodos que tienen el atributo `cn` (con cualquier valor)** y mostrar **todos sus atributos**.

> **Aclaración (ejemplos de comando, no están en el guion):**
> 1. `ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=alumno1)" objectClass`
> 2. `ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=*)"` (sin lista de atributos = todos)

### Tarea 6 — Modificación y eliminación (`ldapmodify`)

Para modificar registros previamente introducidos se usa el **formato LDIF con consideraciones adicionales**. Ejemplo del guion (`ejemploModify.ldif`): **modificar el nombre y la descripción de la empresa, eliminar el técnico y añadir un secretario llamado Paco**:

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
objectClass:person
cn: Paco
sn: paquito
description: Secretario

dn: cn=<alumno2>,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
changetype: delete
```

**Estructura de un fichero LDIF para `ldapmodify`:**

| Elemento | Descripción |
|----------|-------------|
| **1. DN** | **Primera línea**: especifica el DN de la entrada que se va a **modificar, agregar o eliminar** |
| **2. Línea de acción** | Sigue a la del DN; indica la operación con **`changetype`** seguido de: **`add`** (agregar una nueva entrada), **`modify`** (modificar una entrada existente), **`delete`** (eliminar una entrada) |
| **3. Cambios** | Las líneas siguientes especifican los cambios según la operación (ver abajo) |
| **4. Línea en blanco** | **Obligatoria antes del siguiente DN** |

**Detalle de los cambios (punto 3):**

| Operación | Qué se escribe |
|-----------|----------------|
| **`add`** | Se listan **todos los atributos y sus valores** de la nueva entrada |
| **`delete`** | **No se necesitan líneas adicionales** tras indicar el `delete` |
| **`modify`** | Se especifica qué cambios hacer en un atributo: **`add`** (añadir un atributo nuevo), **`delete`** (eliminar el atributo) o **`replace`** (reemplazar el valor de un atributo) |
| **Guion `-`** | En el `modify`, los **guiones `-` separan las diferentes operaciones de modificación**; es una convención que permite **varias modificaciones en una sola transacción** |

**Comando:**

```bash
$ ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemploModify.ldif
```

- Hay que **particularizar los campos entre `<>`** del fichero de ejemplo.
- **Aviso del guion:** revisar con atención la salida del comando para comprobar que los cambios se han hecho bien; **verificarlo también con `ldapsearch`**. Recordar que los símbolos `"` y `-` al copiar y pegar **se copian mal** y hay que reescribirlos.
- Para más detalles: consultar el **manual de `ldapmodify` y de `ldif`** (`man ldapmodify`, `man ldif`).

**Ejercicios autónomos que pide el guion:**
1. Crear un nuevo fichero de modificación que:
   - **añada un nuevo usuario**;
   - **añada un campo teléfono (`telephoneNumber`)** a un empleado y **ponga una contraseña (`userPassword`)** al secretario Paco;
   - **cambie la descripción** de uno de los integrantes;
   - **elimine el campo `description`** del usuario Paco.
2. Realizar **una o varias búsquedas** que confirmen que todas las modificaciones se han realizado.

> **Aclaración (ejemplo de solución, no está en el guion):**
> ```ldif
> dn: cn=Paco,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
> changetype: modify
> add: userPassword
> userPassword: clave123
> -
> delete: description
>
> dn: cn=<alumno1>,dc=<nombre_PC>,dc=aula34,dc=ugr,dc=es
> changetype: modify
> add: telephoneNumber
> telephoneNumber: 958000000
> -
> replace: description
> description: Director general
> ```
> Para `person`, `telephoneNumber` y `userPassword` son atributos opcionales; para `organizationalRole` (alumno1) `telephoneNumber` también está permitido. Para añadir un usuario nuevo se usa otro bloque con `changetype: add`.

### Tarea 7 — Consulta con herramienta gráfica: JXplorer

Herramienta gráfica para **visualizar el árbol LDAP y su contenido**, con el objetivo de **simplificar las consultas y la comprensión del árbol** generado.

```bash
$ sudo apt update
$ sudo apt install jxplorer
$ jxplorer           # lanzar desde la línea de comandos
```

Menú **`File -> Connect`** e introducir (ventana *Open LDAP/DSML Connection*):

| Campo | Valor |
|-------|-------|
| **Host** | `localhost` |
| **Port** | `389` |
| **Protocol** | `LDAP v3` |
| **DSML Service** | (vacío) |
| **Base DN** (*Optional Values*) | `dc=aula34,dc=ugr,dc=es` |
| **Security → Level** | `User + Password` |
| **User DN** | `cn=admin,dc=aula34,dc=ugr,dc=es` |
| **Password** | la contraseña del administrador (`admin1`) |

- Pulsar **OK** y **explorar el árbol LDAP** y su contenido.
- **Probar a hacer alguna modificación** con la herramienta (por ejemplo, **añadir contraseña a alguno de los usuarios**) y **ver cómo cambia la información** comprobándolo **con la interfaz y con `ldapsearch`**.
- En la captura del guion: pestañas **Explore / Results / Schema** (izquierda) y **HTML View / Table Editor** (derecha); el árbol muestra **World → es → ugr → aula34 → (nombre_PC)**; en la vista HTML de la entrada *organization*: campos **Organization** (`Servicios Telematicos S. L.`), **Description** (`Empresa de Telecomunicaciones`), **User Password**, **Telephone Number**, con pestañas **Main / Address / Other**.

### Tarea 8 — Monitorización cliente/servidor con Wireshark

- **Motivo:** para establecer adecuadamente el funcionamiento cliente/servidor es importante **comprender el mecanismo de comunicación** entre los clientes (`ldapadd`, `ldapmodify`, `ldapsearch`…) y el servidor (`slapd`). Ese mecanismo (explicado en la introducción) consta de **autenticación, operación (búsqueda/lectura/modificación) y desconexión**.

```bash
$ sudo wireshark          # o  sudo wireshark &  (segundo plano)
```

1. Seleccionar la interfaz **`Loopback`** (cliente y servidor están en la misma máquina → los paquetes viajan por **`lo`**).
2. En **Capture / Interfaces** pulsar **`start`**.
3. **Desde una terminal**, lanzar **cualquiera de los clientes** (`ldapadd`, `ldapmodify`, `ldapsearch`) para que se realice la operación. **Identificar los pasos** de la comunicación en los paquetes capturados (se aconseja el **filtro `ldap`**).
4. **Analizar las trazas y extraer el diagrama de comunicación** cliente ↔ servidor.
5. **Comprobar, en los casos en que se use, cómo se envía la contraseña de usuario** y **discutir las implicaciones de seguridad**.

> **Recordatorio del guion:** si la terminal se queda bloqueada con un proceso (p. ej., Wireshark) se puede abrir **otra pestaña o ventana**; también sirve **lanzar Wireshark en segundo plano** con `sudo wireshark &`.

> **Aclaración (respuesta razonada a la discusión de seguridad):** con **`-x` la autenticación es simple y la contraseña viaja en texto plano** (el propio guion lo dice al explicar `-x`: "contraseña en texto plano, sin proteger"), por lo que **cualquiera que capture el tráfico puede leerla** en la captura (en el paquete de *bind*). Que en la BD se guarde un hash (`{SSHA}`) no protege la contraseña **durante el transporte**. La protección requiere cifrar el canal (p. ej. TLS/LDAPS/StartTLS: dato no incluido en el guion).

## P2.5 Apartado opcional 3.4 — BD distribuida con OpenLDAP

- En clase de teoría se ha visto que el **árbol de información LDAP se distribuye en varios subárboles o contextos de nombramiento**.
- Para **encaminar las consultas** entre los diferentes servidores hay que configurar:

| Referencia | Función |
|-----------|---------|
| **"Referencias subordinadas inmediatas"** | Indican **el servidor que corresponde a cada parte de subárbol** que deriva del contexto de un servidor |
| **Referencia "superior"** | Indica **a qué servidor se debe redirigir una consulta** en caso de **no conocer el sufijo** por el que se está preguntando |

- **Tarea opcional:** leer *"Constructing a Distributed Directory Service"* — `http://www.openldap.org/doc/admin24/referrals.html` — y buscar cómo configurar el servidor LDAP para introducir las referencias subordinadas y superior.

## P2.6 Resumen de P2 en una tabla

| Concepto | Valor |
|----------|-------|
| Servidor / paquete | `slapd` / `slapd ldap-utils` |
| Puerto | **389** |
| Formato de datos | **LDIF** |
| Esquemas | `/etc/ldap/schema/` |
| Dominio de la práctica | `aula34.ugr.es` → `dc=aula34,dc=ugr,dc=es` |
| DN del administrador | `cn=admin,dc=aula34,dc=ugr,dc=es` |
| Contraseña (VM / lab) | `admin1` / `finisterre` |
| Clientes | `ldapsearch` (buscar), `ldapadd` (añadir), `ldapmodify` (modificar/añadir/eliminar) |
| Opciones comunes | `-x`, `-D`, `-W`, `-f`, `-b` |
| Reconfiguración | `sudo dpkg-reconfigure slapd` |
| Base de datos (lab) | **MDB** |
| Herramienta gráfica | **JXplorer** |
| Captura | Wireshark, interfaz **Loopback**, filtro **`ldap`** |
| Errores típicos | `result: 32 No such object` · `Can't contact LDAP server (-1)` |

---

---

# PARTE III — P3: Configuración del servicio DNS en el laboratorio

## P3.1 Objetivo

Familiarizarse con los conceptos de **DNS** (*Domain Name System*) y aprender a **configurar un servicio DNS para un subdominio determinado**.

## P3.2 Teoría: el servicio DNS

### Qué ofrece
- Un servicio **distribuido, jerárquico (estructura de árbol) y escalable** de **traducción de nombres de dominio en direcciones IP** (*forward mapping*) **y viceversa** (*reverse mapping*).
- El espacio jerárquico de nombres de dominio constituye **una inmensa base de datos distribuida**; las entidades DNS ofrecen el servicio de **acceso y consulta** a esa información.

### Jerarquía de servidores
| Nivel | Descripción |
|-------|-------------|
| **Servidores raíz (`.`)** | Responsables **últimos del funcionamiento** del sistema |
| **TLD** (*Top Level Domain*) | Siguientes en la jerarquía; encargados de dominios como **`.es`** o **`.com`** |
| Servidores de dominios/subdominios | Poseen la información de traducción de un determinado dominio o subdominio |

### Zonas y autoridad
- Cada servidor es responsable de una **zona**. **Zona = conjunto de nombres de dominio contiguos.**
- Los servidores de nombres **con autoridad** sobre una zona **deben contener la información de esa zona**, aunque pueden **delegar jerárquicamente** en otros servidores.
- Ejemplo: el servidor con autoridad sobre **`.es`** **delega** la gestión de la subzona **`.ugr.es`** en los **servidores DNS delegados de la UGR**.
- **Delegar autoridad** = la información sobre la zona delegada pasa a ser **responsabilidad de los servidores delegados**.

### Tipos de servidores en cada zona

| # | Tipo | Descripción |
|---|------|-------------|
| 1 | **Primarios** | Mantienen una **copia maestra (*master*)** de la base de datos (db) de la zona, **obtenida de archivos locales** que contienen toda la información de traducción |
| 2 | **Secundarios o esclavos** | Obtienen los registros de la BD **de un servidor primario mediante su transferencia por la red**. Así se realiza un **respaldo (*backup*)** del/los primarios de la zona |
| 3 | **Delegados** | Pueden contener la información de **una subzona concreta**. Al recibir una consulta referida a esa subzona, **el servidor de zona delega el servicio** en estos servidores |

### Topología real
- Puede llegar a ser **complicada**: el espacio de nombres de dominio **no tiene por qué tener relación con la topología física** de las redes implicadas.
- Servidores raíz (`.`) garantes del sistema: existen **13 servidores o réplicas**, identificados **de la A a la M** (ver `http://www.root-servers.org`).
- Ejemplo: el **root-server F** tiene un servidor en **Madrid**, en el punto neutro **Espanix**.
- De ellos dependen jerárquicamente, de modo **jerárquico y distribuido**, el resto de servidores de zona.

### Figura 1 — Esquema de servidores DNS

```
                        Raíz  "."
                      /          \
        ┌────────────┴──┐      ┌──┴──────────────────────────────┐
        │ .com          │      │ .es                             │
        │ TLD primario  │      │ TLD primario ".es."             │
        │ ".com."       │      │ TLD secundario ".es."           │
        │ TLD secundario│      │ Zona ".es."                     │
        │ ".com."       │      │   ┌───────────────────────────┐ │
        │ Zona ".com."  │      │   │ Subzona "ugr.es."         │ │
        └───────────────┘      │   │ Zona "ugr.es."            │ │
                               │   └───────────────────────────┘ │
                               └─────────────────────────────────┘
```

### Caché
Existe un servicio de **caché** para **mejorar prestaciones**: los servidores de nombres **guardan temporalmente** (**durante un tiempo establecido en la configuración**) **toda la información conocida** (por consultas previas) **aunque no sean su autoridad** en la caché.

### Peticiones iterativas y recursivas

| Tipo | Definición del guion |
|------|---------------------|
| **Iterativa** | Un servidor DNS **va consultando sucesivamente a distintos servidores** (que dan **la mejor respuesta posible con sus datos en ese momento**) **hasta lograr una respuesta** |
| **Recursiva** | Los servidores consultados **a su vez realizan nuevas consultas** hasta lograr una **respuesta válida** |

- Ejemplo: las consultas a un **servidor raíz son iterativas**, **para evitar sobrecargar dichos servidores**.

## P3.3 El servidor BIND

- Existen diversas implementaciones de servidor DNS; en la práctica se usa **BIND**, concretamente la **versión 9 (BIND9)**.
- Dos tipos de ficheros de configuración:

| Fichero | Función |
|---------|---------|
| **`named.conf.local`** | Define **las zonas para las que el servidor tiene autoridad**, es decir, aquellas para las que **tiene definidos registros DNS** |
| **Fichero de zona** (uno por zona con autoridad) | Contiene los **registros de tipo SOA, A, NS, MX y demás** de esa zona. **El nombre es libre**, pero **hay que indicarlo en la configuración de la zona en `named.conf.local`** |

## P3.4 Sintaxis del fichero de zona (zona "islaX")

### Sintaxis abreviada (ejemplo del guion)

```dns
; Inicio de autoridad
$TTL    7200            ;ttl por defecto
$ORIGIN islaX.          ;nombre de dominio
@       SOA     server  admin (
                20080112      ;serial number
                3H            ;refresh time
                15M           ;retry time
                1W            ;expiry time
                1D)           ;negative cache

;servidores de la zona (primarios, delegados, etc.)
        NS      server
        NS      server.d1

;Base de datos con nombres y direcciones IP
server      A   172.16.1.100
server.d1   A   172.16.1.101
host1       A   172.16.1.1
host2       A   172.16.1.2
host3       A   172.16.1.3
host4       A   172.16.1.4
```

- Es una **sintaxis abreviada**, relativamente compleja de entender porque **omite la información que pudiera estar repetida** en otras partes del fichero.
- **Recomendación del guion:** para iniciarse en BIND9 conviene usar la **sintaxis completa**, en la que **cada registro aparece en una línea diferente** y los **datos del registro se separan por tabuladores**.
- El guion pide **repasar la teoría de la asignatura** (registros **SOA, A y NS** y para qué sirven) antes de leer el fichero completo.

> **Aclaración (cómo se lee la forma abreviada):** `$TTL` fija el TTL por defecto; `$ORIGIN` el dominio que se **añade a los nombres que no terminan en punto**; `@` = el propio `$ORIGIN`; una línea que empieza en blanco (`NS server`) **repite el nombre anterior** (`@`). Por eso `server` equivale a `server.islaX.` y `server.d1` a `server.d1.islaX.`. En la sintaxis completa cada nombre aparece completo, **con punto final**.

### Figura 2 — Sintaxis completa para la zona islaX

```dns
islaX.     7200  IN  SOA  server.islaX.  admin.islaX. (
                          20110909   ;serial number
                          3H         ;refresh time
                          15M        ;retry time
                          1W         ;expiry time
                          1D)        ;negative cache

;servidores de la zona (primarios, delegados, etc.)
islaX.      7200  IN  NS  server.islaX.
d1.islaX.   7200  IN  NS  server.d1.islaX.

;Base de datos con nombres y direcciones IP
server.islaX.     3600  IN  A  172.16.1.100
server.d1.islaX.  3600  IN  A  172.16.1.101
host1.islaX.      3600  IN  A  172.16.1.1
host2.islaX.      3600  IN  A  172.16.1.2
host3.islaX.      3600  IN  A  172.16.1.3
host4.islaX.      3600  IN  A  172.16.1.4
```

Las tres zonas del dibujo: **Propiedades del servidor** (SOA), **Servidores de zona** (NS), **Traducciones de nombres a IP** (A).

**Leyenda numerada de la Figura 2 (literal):**

| Nº | Dónde aparece | Significado |
|----|---------------|-------------|
| **1** | `islaX.` (primer campo del SOA) | **Nombre del dominio** al que se refiere el servidor |
| **2** | `7200` | **Tiempo de validez de un registro en caché** |
| **3** | `IN` | **Tipo de clase.** `IN` = **Internet** |
| **4** | `SOA` | **Tipo de registro**: **SOA** = *Autoridad de zona*; **NS** = *Servidor de nombres*; **A** = *dirección IP*; **MX** = *servidor de correo* |
| **5** | `server.islaX.` | **Nombre del servidor** |
| **6** | `admin.islaX.` | **Nombre del servidor de correo asociado** (según el guion) |
| **7** | bloque `serial … negative cache` | **Número de serie para actualización y parámetros de tiempo** |
| **8** | línea `islaX. … NS server.islaX.` | **Servidores de zona** |
| **9** | línea `server.islaX. … A 172.16.1.100` | **Traducción nombre → dirección IP** de servidores, nombres dentro del dominio, etc. |

> **Aclaración:** el campo 6 (`admin.islaX.`) es, en DNS estándar, la **dirección de correo del administrador** de la zona (con el primer `.` equivalente a `@`: `admin@islaX`). El guion lo describe como "nombre del servidor de correo asociado"; apunta ambas ideas.

**Parámetros del bloque 7 (SOA):**

| Parámetro | Etiqueta del guion | Significado (aclaración) |
|-----------|-------------------|--------------------------|
| `serial number` | número de serie | **Versión** de la zona; subirlo en cada cambio (los secundarios lo comparan) |
| `3H` | `refresh time` | Cada cuánto el secundario comprueba si hay cambios |
| `15M` | `retry time` | Cada cuánto reintenta si el refresh falló |
| `1W` | `expiry time` | Tras cuánto sin contactar con el primario deja de dar respuestas de esa zona |
| `1D` | `negative cache` | Tiempo de caché de respuestas negativas |

(Unidades: `H` = horas, `M` = minutos, `D` = días, `W` = semanas. Notar que en el fichero de la Tarea 1 los tiempos se dan en **segundos** (3600, 1800) y `1W`, y el último valor se rotula `negative TTL`.)

## P3.5 Preparación del entorno

### P3.5.1 Entorno de máquinas virtuales

**1. Instalar bind9** (antes de clonar, en la VM de seminarios):

```bash
$ sudo apt install bind9
```

**2. Apagar la VM y clonarla** para tener **dos máquinas idénticas llamadas *Servidor Primario* y *Servidor Delegado*:**

1. **Botón derecho** sobre la máquina → **Clonar…** (en la captura, la VM original se llama *"Cliente (Inicio P3 (DNS))"*, estado *Apagada*).
2. En el **nombre** indicar **`Servidor Primario`**; en la **política de dirección MAC**: **"Generar nuevas direcciones MAC para todas las interfaces"**. Clic en **Siguiente**.
3. Seleccionar **Clonación enlazada** y clic en **Finalizar**.
4. **Repetir** la misma operación **seleccionando la máquina anterior (no la que acaba de aparecer)** y eligiendo ahora el nombre **`Servidor Delegado`**.

**3. Desconectar la red NAT** (antes de arrancar las máquinas): en **Configuración → Red → Adaptador 1** (*Conectado a: NAT*), **desmarcar "Cable conectado"**. Motivo: **evitar que haya conexión a Internet** y que **se acceda a servidores DNS reales**. (En la captura: Adaptador 1 habilitado, *Conectado a: NAT*, tipo **Intel PRO/1000 MT Desktop (82540EM)**, modo promiscuo *Denegar*, casilla *Cable conectado* señalada con una flecha, botón *Reenvío de puertos*.)

**4. Arrancar las máquinas y configurar la interfaz ethernet:**

| Máquina | IP |
|---------|----|
| **Servidor Primario** | **`192.168.1.1`** |
| **Servidor Delegado** | **`192.168.1.2`** |

Procedimiento (gráfico):
1. **Botón derecho** sobre el **icono de la boca de ethernet** de la barra de tareas → **Edit connections…**
2. **Doble clic** sobre la conexión cableada **2** (**Wired Connection 2**).
3. Pestaña **IPv4 Settings** → **Method: Manual** → en **Addresses** añadir (**Add**) la IP con **Netmask `24`** (Gateway vacío): `192.168.1.1` para el Primario, `192.168.1.2` para el Delegado.
4. Clic en **Save**.

**5. Reiniciar la configuración de red** para que tome la nueva IP:

```bash
$ sudo nmcli networking off
$ sudo nmcli networking on
```

**6. Comprobar la IP:**

```bash
$ ip -c a
```

**7. Comprobar conectividad** con un ping **desde el Servidor Primario**:

```bash
$ ping 192.168.1.2
```

Salida de ejemplo del guion (usuario `administrador@seminarioST`):

```
PING 192.168.1.2 (192.168.1.2) 56(84) bytes of data.
64 bytes from 192.168.1.2: icmp_seq=1 ttl=64 time=1.90 ms
64 bytes from 192.168.1.2: icmp_seq=2 ttl=64 time=0.784 ms
^C
--- 192.168.1.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1022ms
rtt min/avg/max/mdev = 0.784/1.342/1.900/0.558 ms
```

El `ping` se para con **`Ctrl+C`**.

### P3.5.2 Entorno de laboratorio

- **Ya está preparado.** Cada una de las **6 islas** del laboratorio se convierte en **una zona diferente: `islaX.ugr.es`**.
- Se arrancan los equipos con la opción **"red aislada" / Ubuntu18**.
- Para toda la configuración se emplea la **red de gestión `172.16.X.Y/24`**, donde **X = número de isla** e **Y = equipo dentro de esa isla**.

## P3.6 Configuración del servicio DNS de una zona (4.2)

Inicialmente, **en cada isla**, **uno de los equipos (o máquina virtual) actuará como servidor primario de zona y también como cliente del servicio DNS**.

### Tarea 0 — Deshabilitar `systemd-resolved`

- Los sistemas Linux suelen venir con **un servidor DNS ligero que hace *caching*** de las peticiones para que la navegación web vaya más rápido (**resolutor local**): **`systemd-resolved`**.
- Para **no entrar en conflicto con el servidor `bind`** hay que **deshabilitarlo en todas las máquinas**:

```bash
$ sudo systemctl stop systemd-resolved.service
```

- Después hay que indicar **el servidor DNS por defecto** al que preguntar. **Modificar `/etc/resolv.conf`** añadiendo o modificando la línea:

```
nameserver <direccion_ip_servidor_nombres>
```

  - `<direccion_ip_servidor_nombres>` = IP del servidor que se va a configurar.
  - **Si el servidor está en la misma máquina → `127.0.0.1`**.

> **Aclaración (problema frecuente):** en Ubuntu `/etc/resolv.conf` suele ser un **enlace simbólico** al stub de systemd-resolved (`127.0.0.53`). Si tras parar el servicio sigue apuntando ahí, las consultas fallan con *connection refused*; hay que sustituir el enlace por un fichero normal (`sudo rm /etc/resolv.conf` y recrearlo con `nameserver 127.0.0.1`). El `stop` **no es permanente** tras reiniciar (para eso, `disable --now`).

### Tarea 1 — Configuración del servidor primario

Seleccionar el equipo que será **Servidor Primario** durante toda la práctica. El servicio se configura con **BIND9** (**`NAMED` en versiones antiguas**).

El fichero principal **`/etc/bind/named.conf`** incluye **tres ficheros de configuración**:

| # | Fichero | Función |
|---|---------|---------|
| 1 | **`named.conf.options`** | **Opciones generales** del servidor |
| 2 | **`named.conf.default-zones`** | Define los **registros de las zonas que aparecen por defecto en cualquier servidor DNS** (por ejemplo, la **zona `localhost`**) |
| 3 | **`named.conf.local`** | Define **la zona en la que este servidor tiene autoridad** (**será el que se configure en la práctica**) |

> **AVISO (recuadro del guion): antes de iniciar la configuración**, cambiar en **`named.conf.options`** la línea que activa **DNSSEC**, para que **no haya comprobaciones de seguridad que harían que los escenarios sin conexión a Internet dejen de funcionar**. Hay que dejar la línea así:
> ```
> dnssec-validation no;
> ```

**Declaración de la zona** en `named.conf.local` (ejemplo `isla1.ugr.es`):

```
zone "isla1.ugr.es" IN {
        type master;
        file "/etc/bind/db.isla1.ugr.es";
        // El nombre del fichero es un ejemplo, se puede cambiar
};
```

- **`type master`**: la zona es de tipo **master** → **este servidor contiene los registros de la zona y, por tanto, tiene autoridad** sobre ella.
- **`file`**: indica **el fichero en el que están definidos los registros**; debe estar en la ubicación **`/etc/bind/`** **o** poner la **ruta completa**.

**Pasos que pide el guion:**

**(a) Zona raíz `.` en `named.conf.default-zones`** — preguntas del guion:
1. ¿Está definida como `master`?
2. ¿Qué quiere decir esta configuración?
3. ¿En qué fichero están los registros de esta zona?
4. *(Investigar en la teoría de DNS a qué se refiere esta zona y qué significan los registros definidos.)*

> **Respuesta razonada (no figura en el guion):** **No**: está definida como **`type hint`**, no `master`. Significa que el servidor **no tiene autoridad sobre la raíz**; solo dispone de una **lista de pistas (*root hints*)** con los servidores raíz (A–M) para poder **arrancar la resolución** de nombres que no conoce. Los registros están en un fichero de *hints* (la ruta exacta depende de la versión de Ubuntu/Debian) y son principalmente **NS** (servidores raíz) y **A/AAAA** (sus IPs).

**(b) Modificar `named.conf.local`** para que el equipo sea **servidor primario de la zona `islaX.ugr.es`** (**X = nº de isla** en el laboratorio; **X = 1** en máquinas virtuales).

**(c) Crear el fichero de traducción de la zona** (`/etc/bind/db.isla1.ugr.es`). En particular, **añadir los nombres `host5.isla1.ugr.es` a `host8.islaX.ugr.es` y sus direcciones IP (inventadas)**. Configuración del guion (se puede copiar; se pueden cambiar nombres e IPs):

```dns
isla1.ugr.es.        3600 IN SOA ns.isla1.ugr.es. admin.isla1.ugr.es. (
                              20091126  ; serial number
                              3600      ; refresh
                              1800      ; retry
                              1W        ; expiry
                              3600)     ; negative TTL

isla1.ugr.es.        3600 IN NS  ns.isla1.ugr.es.
ns.isla1.ugr.es.     3600 IN A   172.16.2.1     ;cambiar por la IP real del servidor

host5.isla1.ugr.es.  3600 IN A   192.168.1.5
host6.isla1.ugr.es.  3600 IN A   192.168.1.6
host7.isla1.ugr.es.  3600 IN A   192.168.1.7
host8.isla1.ugr.es.  3600 IN A   192.168.1.8
```

- La IP de `ns.isla1.ugr.es.` (`172.16.2.1`) lleva el comentario **";cambiar por la IP real del servidor"** (en rojo en el guion): en VMs sería `192.168.1.1`; en el laboratorio, `172.16.X.Y`.

> **AVISO (recuadro del guion):** tras modificar el fichero de configuración, **para que los cambios entren en funcionamiento hay que reiniciar el servidor DNS**:
> ```bash
> $ sudo systemctl restart bind9.service
> ```

**(d) Comprobar la configuración:**

```bash
$ sudo named-checkconf
```
- **Si no hay ningún error, no sale ninguna salida.**

**(e) Comprobar los registros de una zona:**

```bash
$ sudo named-checkzone isla1.ugr.es <ruta_al_archivo db.isla1.ugr.es>
```
- Hay que **modificar el segundo parámetro** a la **ruta donde se encuentre** el archivo `db.isla1.ugr.es`.

### Tarea 2 — Comprobación del funcionamiento

Para comprobar el servidor configurado:

1. **Solicitar la traducción** de un nombre existente en el servidor con:
   - `nslookup <nombre_dominio>`
   - `host <nombre_dominio>`
   - `dig <nombre_dominio>`

   El nombre puede ser **cualquiera de los configurados en `db.isla1.ugr.es`**. Preguntas del guion: **¿Qué respuesta recibe? ¿Qué diferencias hay? ¿Qué sucede si solicita un nombre inexistente? Intente entender las respuestas del servidor.**

   > **Respuesta razonada:** `nslookup` muestra el servidor consultado y la respuesta (`Name`/`Address`); `host` da **una sola línea** (`<nombre> has address <IP>`); `dig` da la salida **completa**: cabecera con **flags** (`qr aa rd ra`), `status`, secciones **QUESTION / ANSWER / AUTHORITY / ADDITIONAL**, tiempo de consulta, servidor y tamaño. Un nombre **inexistente** devuelve **`NXDOMAIN`** (en `dig`, con flag `aa` porque el servidor tiene autoridad sobre la zona y puede afirmar que no existe; la sección AUTHORITY trae el SOA).

2. **Desactivar el servicio** en el servidor y repetir la petición. **¿Qué sucede?**

```bash
$ sudo systemctl stop bind9.service
```

   > **Respuesta razonada:** **no hay respuesta**: `dig` indica `connection timed out; no servers could be reached` (y `nslookup`, algo equivalente), porque **nadie escucha en el puerto 53** del servidor indicado en `resolv.conf`.

3. **¿Se podrían configurar varios nombres ligados a una misma IP?** *Comprobarlo.*

   > **Respuesta razonada:** **Sí**: basta con **varios registros `A` con nombres distintos y la misma IP** (o alias con `CNAME`). Tras editar: subir el **serial**, `named-checkzone`, `restart` y comprobar con `dig`. Ejemplo: `web.isla1.ugr.es. 3600 IN A 192.168.1.5` y `ftp.isla1.ugr.es. 3600 IN A 192.168.1.5`.

### Tarea 3 — Configuración de un servidor delegado de zona

Seleccionar **otro de los equipos libres de la isla** como servidor delegado. En máquinas virtuales: **la otra máquina (Servidor Delegado)**.

1. **`named.conf.options`** del delegado: **no usar dnssec** (igual que en la Tarea 1) y **añadir una línea nueva para permitir solicitudes de tipo recursivo**:

```
dnssec-validation no;
recursion yes;
```

2. **Modificar el fichero de configuración** para que el equipo sea **servidor de la subzona `equipos.islaX.ugr.es`**: **misma configuración que en el primario, pero para la subzona** correspondiente.
3. **Generar el fichero de registros** del servidor para esa subzona.
4. **Reiniciar el servicio** y comprobar la configuración y la zona con **`named-checkconf`** y **`named-checkzone`**.
5. **Comprobar desde el propio servidor delegado** que puede **resolver la IP de los registros** añadidos (p. ej. **`host1.equipos.isla1.ugr.es`**).
6. **Configurar el servidor primario para que delegue** las peticiones a la nueva subzona en el delegado, con **dos registros**:

| Registro | Contenido |
|----------|-----------|
| **NS** | Indica que **el servidor de la zona en cuestión (`equipos.islaX.ugr.es`) se llama `delegado.islaX.ugr.es`** |
| **A** | Indica **la IP correspondiente al servidor `delegado.islaX.ugr.es`** |

7. **Prueba:** desde el **cliente**, hacer una petición DNS **al servidor primario** solicitando un contenido **del servidor delegado**. Preguntas: **¿Se sirve el contenido? ¿Es una respuesta con autoridad la que ofrece el servidor primario?** **Pista:** observar la existencia del **flag `aa` (*Authoritative Answer*)** en la salida de `dig`.

> **Ejemplo completo (aclaración, no literal del guion):**
> `named.conf.local` del delegado:
> ```
> zone "equipos.isla1.ugr.es" IN {
>         type master;
>         file "/etc/bind/db.equipos.isla1.ugr.es";
> };
> ```
> `db.equipos.isla1.ugr.es`:
> ```dns
> equipos.isla1.ugr.es.       3600 IN SOA delegado.isla1.ugr.es. admin.isla1.ugr.es. (
>                                      20091126 3600 1800 1W 3600)
> equipos.isla1.ugr.es.       3600 IN NS  delegado.isla1.ugr.es.
> delegado.isla1.ugr.es.      3600 IN A   192.168.1.2
> host1.equipos.isla1.ugr.es. 3600 IN A   192.168.1.11
> ```
> Añadido al fichero de zona del **primario**:
> ```dns
> equipos.isla1.ugr.es.   3600 IN NS  delegado.isla1.ugr.es.
> delegado.isla1.ugr.es.  3600 IN A   192.168.1.2
> ```

> **Respuesta razonada a la prueba:** **Sí se sirve el contenido** (el primario sabe, por el NS + A, a quién preguntar). La respuesta **del primario NO es con autoridad**: **no aparece el flag `aa`** porque el contenido **viene del delegado**. El `aa` aparece si se pregunta **directamente al delegado** (`dig @<IP_delegado> host1.equipos.isla1.ugr.es`). El registro **A** del delegado es el *glue record*: evita la dependencia circular de resolver `delegado.islaX.ugr.es` preguntándole al propio delegado.

### Tarea 4 — Inspección de la comunicación con Wireshark

1. **Ejecutar Wireshark en el servidor primario** y activar la inspección de **la interfaz correspondiente a la red de gestión**.
2. Realizar una **consulta DNS al primario**, **primero sobre un contenido de este** y **luego sobre un contenido del servidor delegado**; **analizar las trazas** y **comentar qué sucede en ambos casos**.
3. **Reiniciar el servidor primario**, volver a activar la inspección con Wireshark y **repetir una consulta de contenido del servidor delegado**. **¿Es el mismo esquema de comunicación?** **Pista: considerar la existencia de memoria caché en el primario.**

> **Respuesta razonada:**
> - **Contenido del primario** → un par **consulta/respuesta** cliente ↔ primario (respuesta con `aa`); no hay tráfico extra.
> - **Contenido del delegado** → el primario **reenvía la consulta al delegado**: **4 paquetes** → (1) cliente→primario, (2) primario→delegado, (3) delegado→primario (con `aa`), (4) primario→cliente (sin `aa`). El primario **guarda el resultado en caché**.
> - **Tras reiniciar el primario** → **se vacía la caché**, así que se repite **el mismo esquema** de 4 paquetes. (Sin reiniciar, una segunda consulta se respondería **desde la caché** con solo 2 paquetes cliente↔primario, mientras no caduque el TTL.)

## P3.7 Resumen de P3 en una tabla

| Concepto | Valor |
|----------|-------|
| Software | **BIND9** (`bind9.service`; `NAMED` en versiones antiguas) |
| Ficheros | `/etc/bind/named.conf` (incluye `.options`, `.default-zones`, `.local`) |
| Zona de la práctica | `islaX.ugr.es` (X=1 en VMs); subzona `equipos.islaX.ugr.es` |
| Fichero de zona (ejemplo) | `/etc/bind/db.isla1.ugr.es` |
| IPs en VMs | Primario `192.168.1.1/24`, Delegado `192.168.1.2/24` |
| Red del laboratorio | `172.16.X.Y/24` (red de gestión) |
| Registros vistos | **SOA, NS, A** (y **MX** mencionado) |
| Opciones | `dnssec-validation no;` · `recursion yes;` (delegado) |
| Resolutor | `/etc/resolv.conf` → `nameserver 127.0.0.1` (misma máquina) |
| Comprobación | `named-checkconf`, `named-checkzone <zona> <fichero>` |
| Aplicar cambios | `sudo systemctl restart bind9.service` |
| Parar bind | `sudo systemctl stop bind9.service` |
| Consultas | `nslookup`, `host`, `dig` |
| Flag clave | **`aa`** (*Authoritative Answer*) |
| Deshabilitar | `sudo systemctl stop systemd-resolved.service` |

---

---

# PARTE IV — Material de repaso

## IV.1 Datos literales para memorizar

### Credenciales y entornos
| Dato | Valor |
|------|-------|
| Usuario de la VM de ST | `administrador` |
| Contraseña de la VM (y de sudo / LDAP) | `admin1` |
| Contraseña en el laboratorio | `finisterre` |
| Laboratorio | "red aislada / Ubuntu 18.04" (P2) · "red aislada / Ubuntu18" (P3) |
| Nº de islas del laboratorio | 6 |

### Red
| Dato | Valor |
|------|-------|
| IP Servidor Primario (VM) | `192.168.1.1` (máscara `/24`) |
| IP Servidor Delegado (VM) | `192.168.1.2` (máscara `/24`) |
| Conexión que se edita | *Wired connection 2* → IPv4 Settings → Manual |
| Red de gestión del lab | `172.16.X.Y/24` |
| Loopback | `lo` / `127.0.0.1` |
| Solo anfitrión (VirtualBox) | `192.168.56.X` |
| IP de ejemplo del SSH | `10.23.1.3` (usuario `alumno`) |
| Puerto LDAP | `389` |
| Resolutor local deshabilitado | `systemd-resolved` |

### Nombres y ficheros
| Dato | Valor |
|------|-------|
| Dominio LDAP | `aula34.ugr.es` → `dc=aula34,dc=ugr,dc=es` |
| Admin LDAP | `cn=admin,dc=aula34,dc=ugr,dc=es` |
| LDIF de alta | `ejemplo.ldif` |
| LDIF de modificación | `ejemploModify.ldif` |
| Secretario de ejemplo | `Paco` (`sn: paquito`, `description: Secretario`) |
| Empresa de ejemplo | `Servicios Telematicos S. L.` → `Donuts S. L.` |
| Esquemas LDAP | `/etc/ldap/schema/` |
| Zona DNS | `isla1.ugr.es` · subzona `equipos.isla1.ugr.es` |
| Fichero de zona | `/etc/bind/db.isla1.ugr.es` |
| Hosts de la zona | `host5`–`host8` (`192.168.1.5`–`.8`) |
| Servidor de nombres de ejemplo | `ns.isla1.ugr.es.` |
| Delegado | `delegado.islaX.ugr.es` |
| Serial de ejemplo | `20091126` (fichero Tarea 1) · `20080112` (abreviado) · `20110909` (Figura 2) |
| TTL / refresh / retry / expiry / negative TTL (Tarea 1) | `3600` / `3600` / `1800` / `1W` / `3600` |
| `$TTL` del ejemplo abreviado | `7200` |

## IV.2 Erratas y detalles curiosos de los guiones

| Detalle | Comentario |
|---------|------------|
| El PDF de apuntes llama **"Práctica 1"** al manual de Ubuntu y numera las secciones de P2 como 15–21 (continuando la numeración) | Es solo la numeración de ese documento |
| `nc {l <puerto>` en la tabla de P1 | Es `nc -l <puerto>` (el guion se ha estropeado al convertir) |
| `cd ...` en P1.5 | Es `cd ..` |
| "Inicia el demonio en caso de estar **denenido**" | Errata: *detenido* |
| `ls /etc \| grep 'hos'` (reto 14.6) | Filtra "hos" en **cualquier posición**; para "empiezan por" usar `'^hos'` |
| La zona del DNS del guion usa `host5.isla1.ugr.es a host8.islaX.ugr.es` | Mezcla `isla1` y `islaX`: en VMs X = 1 |
| IP de `ns.isla1.ugr.es.` = `172.16.2.1` con nota "cambiar por la IP real" | En VMs: `192.168.1.1` |
| P2: `description: Tecnico` (guion oficial) vs `Técnico` (apuntes) | El guion oficial **prohíbe acentos** en el LDIF |
| La tabla SOA de la figura 2 usa `3H/15M/1W/1D`; el fichero de la Tarea 1 usa segundos y `negative TTL` | Mismos parámetros, distinta notación |
| Los comandos del PDF usan `–` y `“ ”` tipográficos | Al copiar fallan: **escribir `-` y `"` a mano** (aviso explícito del guion P2) |
| En DNS el campo 6 del SOA se describe como "servidor de correo asociado" | En realidad es el email del administrador (con `.` en vez de `@`) |

## IV.3 Preguntas de detalle tipo examen

### P1 — Ubuntu

| Pregunta | Respuesta |
|----------|-----------|
| Componentes de Ubuntu citados | Kernel, shell, sistema de archivos, utilidades |
| ¿Qué hace el kernel? | Asigna tareas y maneja el almacenamiento de datos |
| ¿Atajo para abrir la terminal? | `Ctrl + Alt + T` |
| ¿Qué es el prompt? | Carácter(es) con los que el shell avisa de que espera comandos |
| Atajos de pestañas | Nueva `Ctrl+Shift+T` · moverse `Ctrl+Av.Pág / Re.Pág` · cerrar `Ctrl+Shift+W` |
| Teclas dentro de `man` | `/` buscar · `n` siguiente · `p` anterior · `q` salir |
| ¿Dónde están los dispositivos? | `/dev` |
| ¿Dónde se montan USB y CD? | `/media` |
| ¿Directorio de configuración? | `/etc` |
| ¿Dónde están logs, colas de impresión y datos cambiantes? | `/var` |
| ¿Datos del kernel y procesos? | `/proc` |
| ¿Ejecutables básicos? | `/bin` (y `/sbin` para binarios del sistema operativo) |
| ¿Ficheros de arranque? | `/boot` |
| ¿Directorios de usuarios? | `/home` |
| ¿Librerías compartidas y módulos del kernel? | `/lib` |
| ¿Aplicaciones "reservado"? | `/opt` |
| ¿Datos de servicios? | `/srv` |
| ¿Temporales? | `/tmp` |
| ¿Espacio compartido con aplicaciones, librerías, manuales, juegos…? | `/usr` |
| Volver al home | `cd` |
| Subir un nivel | `cd ..` |
| Ruta absoluta vs relativa | Absoluta: empieza por `/`; relativa: nunca |
| Significado de `.`, `..`, `~` | Directorio actual, superior, home del usuario |
| Guardar y salir en nano | `Ctrl+O`, `Ctrl+X` |
| ¿Cuántas líneas muestran `head`/`tail` por defecto? | 10 (cambia con `-n`) |
| Diferencia `cp` / `mv` | `mv` no deja el original; misma sintaxis |
| `rmdir` vs `rm -r` | Solo vacíos / directorios con contenido |
| Tipos de usuario | Root, normales, de sistema |
| ¿Qué hace `sudo`? | Ejecuta con privilegios de superusuario |
| ¿Qué lee `ps`? | Los archivos de `/proc/` |
| `kill` vs `killall` | `killall` los mata a todos |
| `top` vs `htop` | Procesos en tiempo real y uso de recursos |
| Órdenes de `service` | `status`, `start`, `stop` (+ `reload`, `force-reload`, `restart`, `try-restart`) |
| NAT | Internet por el host; IP por DHCP |
| Red interna | Cable virtual con nombre; sin IP automática |
| Puente | Misma subred que el host |
| Solo anfitrión | DHCP de VirtualBox; `192.168.56.X` |
| IP del `lo` | `127.0.0.1` |
| Comando SSH y cómo salir | `ssh usuario@IP_remota`; `Ctrl+D` |
| ¿Qué se responde al aceptar el certificado SSH? | `YES` |
| `ls -alh` | Todos (incl. ocultos) + largo + tamaños legibles |
| ¿Cómo saber los grupos del usuario? | `groups` |
| ¿Para qué sirve `xkill`? | Cerrar una ventana haciendo clic en ella |
| ¿Cómo asociar interfaces con adaptadores de VirtualBox? | `ip link show` y comparar MAC |

### P2 — LDAP

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es LDAP? | *Lightweight Directory Access Protocol* |
| Software de la práctica | openLDAP (`slapd`, `ldap-utils`) |
| Puerto | 389 |
| 4 pasos de una solicitud | Conexión (389) → autenticación (o anónima) → operación → desconexión |
| ¿Qué es un DN? | *Distinguished Name*: identifica de forma única cada entrada |
| ¿Qué es LDIF? | *LDAP Data Interchange Format* |
| ¿Qué es `objectClass`? | Clase de objeto: define los atributos requeridos/opcionales (esquemas) |
| ¿Cómo se lee la jerarquía de un DN? | De derecha a izquierda |
| ¿Qué guarda `userPassword`? | El hash de la contraseña (`{SSHA}…`) |
| ¿Dónde están los esquemas? | `/etc/ldap/schema/` |
| ¿Entorno de VM? / ¿lab? | `administrador`/`admin1` · red aislada Ubuntu 18.04 / `finisterre` |
| ¿Por qué se usa `lo`? | Cliente y servidor están en la misma máquina |
| ¿Qué va primero, servidor o cliente? | El servidor |
| Comando para ver si escucha en el 389 | `sudo ss -tlnp` |
| Salida de `ldapsearch -x` sin BD configurada | `result: 32 No such object` |
| Salida con el servidor parado | `ldap_sasl_bind(SIMPLE): Can't contact LDAP server (-1)` |
| Comando para configurar la estructura | `sudo dpkg-reconfigure slapd` |
| Respuestas del `dpkg-reconfigure` | No · aula34.ugr.es · aula34.ugr.es · MDB (lab) · admin1/finisterre · NO · YES |
| ¿Qué indica `-b`? | Base DN de la búsqueda |
| ¿Cómo se añade el LDIF? | `ldapadd -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemplo.ldif` |
| `-x`, `-D`, `-W`, `-f` | Autenticación simple en texto plano · DN del admin · pide contraseña · fichero LDIF |
| Reglas del LDIF de alta | Sin acentos, líneas en blanco entre entradas, no insertar bajo un nodo inexistente |
| `dcObject` / `organizationalRole` / `person` | Contenedor / nombre+descripción / `cn`, `sn`, descripción |
| ¿Qué muestra el símbolo `+` en `ldapsearch`? | Atributos operacionales |
| Filtro `(dc=aula34)` | Entradas con atributo `dc` igual a `aula34` |
| `changetype` posibles | `add`, `modify`, `delete` |
| Operaciones de un `modify` | `add`, `delete`, `replace` |
| ¿Para qué sirve `-` en el LDIF? | Separar operaciones de un `modify` (una sola transacción) |
| ¿Qué lleva un `delete`? | Nada más tras `changetype: delete` |
| ¿Línea en blanco antes de cada nuevo DN? | Sí, obligatoria |
| Herramienta gráfica y conexión | JXplorer: localhost, 389, LDAP v3, Base DN, User+Password, User DN admin |
| Wireshark: interfaz y filtro | Loopback · `ldap` |
| Implicación de seguridad de `-x` | Contraseña en texto plano |
| Referencias de BD distribuida | Subordinadas inmediatas y superior |

### P3 — DNS

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es DNS? | Servicio distribuido, jerárquico y escalable de traducción nombre ↔ IP |
| *Forward* / *reverse mapping* | Nombre→IP / IP→nombre |
| ¿Cuántos servidores raíz? ¿Dónde está el F? | 13 (A–M); Madrid, Espanix |
| ¿Qué es una zona? | Conjunto de nombres de dominio contiguos |
| ¿Qué es delegar? | Pasar la responsabilidad de una (sub)zona a otros servidores |
| Primario / secundario / delegado | Copia maestra desde ficheros locales / copia por transferencia de red (backup) / servidor de una subzona |
| Iterativa vs recursiva | Consulta sucesiva a servidores (mejor respuesta posible) / los servidores consultados hacen nuevas consultas |
| ¿Qué consultas son iterativas por no sobrecargar? | Las dirigidas a la raíz |
| Caché | Almacenamiento temporal de la información conocida, aunque no sean autoridad |
| Ficheros de configuración de BIND | `named.conf.local` (zonas con autoridad) y un fichero de registros por zona |
| Los tres ficheros incluidos en `named.conf` | `.options`, `.default-zones`, `.local` |
| Registros mencionados | SOA, A, NS (y MX) |
| ¿Qué es `$TTL` y `$ORIGIN`? | TTL por defecto / nombre de dominio de la zona |
| Campos del SOA | Nombre, TTL, clase, SOA, servidor, contacto, serial, refresh, retry, expiry, negative cache |
| Clase `IN` | Internet |
| Pasos para clonar las VMs | Clonar → nombre → nuevas MAC → clonación enlazada → repetir sobre la anterior |
| ¿Por qué desconectar el cable NAT? | Evitar Internet y servidores DNS reales |
| ¿Cómo se aplica la IP nueva? | `nmcli networking off/on` y `ip -c a` |
| ¿Por qué parar `systemd-resolved`? | Conflicto con bind (DNS ligero con caché) |
| IP en `resolv.conf` si el servidor es local | `127.0.0.1` |
| ¿Por qué `dnssec-validation no;`? | Sin Internet, DNSSEC haría fallar las resoluciones |
| ¿Qué es `type master`? | El servidor tiene los registros y autoridad |
| Zona raíz: ¿master? | No; es `hint` (respuesta razonada) |
| ¿Cómo comprobar sintaxis? | `named-checkconf` (sin salida = OK) |
| ¿Y una zona? | `named-checkzone <zona> <fichero>` |
| ¿Cómo aplicar cambios? | `sudo systemctl restart bind9.service` |
| ¿Qué ocurre si se para bind? | Timeout, sin servidores alcanzables |
| ¿Nombre inexistente? | `NXDOMAIN` |
| ¿Varios nombres, una IP? | Sí (varios A o CNAME) |
| ¿Opción para recursión? | `recursion yes;` (delegado) |
| ¿Registros de la delegación? | NS (`equipos.islaX.ugr.es` → `delegado.islaX.ugr.es`) y A (IP del delegado) |
| ¿Qué indica el flag `aa`? | Respuesta con autoridad |
| ¿Responde con `aa` el primario por contenido del delegado? | No |
| Wireshark: contenido del primario / del delegado | 2 paquetes / 4 paquetes |
| Tras reiniciar el primario | Mismo esquema (caché vacía) |

---

*Apuntes elaborados a partir de los guiones de prácticas de Sistemas Telemáticos (UGR, Dpto. de Teoría de la Señal, Telemática y Comunicaciones; guiones P2 y P3 © G. Maciá, J. Camacho, L. Sánchez, P. Padilla y R. Rodríguez) y de unos apuntes de estudiante de la práctica de Ubuntu. Las "Aclaraciones" y "Respuestas razonadas" son material de apoyo propio. Material de estudio personal.*
