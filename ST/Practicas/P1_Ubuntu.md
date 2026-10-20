# Sistemas Telemáticos — Práctica 1: Esquema completo de Ubuntu básico

> **Qué es esto:** esquema de **todo** lo que contiene la P1 (manual básico de Ubuntu): conceptos, comandos, atajos, rutas, redes, SSH y retos, organizado para estudiar y para detectar lo que puede caer en el examen.
> **Marcas:** lo que no lleva marca es contenido del guion. **(Ampliación)** = añadido mío, no está en el guion.

---

## Índice

0. [Mapa general](#0-mapa-general)
1. [Conceptos de Ubuntu y del sistema](#1-conceptos-de-ubuntu-y-del-sistema)
2. [Terminal](#2-terminal)
3. [Ayuda: `man` y compañía](#3-ayuda-man-y-compañía)
4. [Árbol de directorios](#4-árbol-de-directorios)
5. [Navegación y rutas](#5-navegación-y-rutas)
6. [Archivos: crear, ver, copiar, mover, borrar](#6-archivos-crear-ver-copiar-mover-borrar)
7. [Usuarios y permisos](#7-usuarios-y-permisos)
8. [Procesos](#8-procesos)
9. [Servicios](#9-servicios)
10. [Redes](#10-redes)
11. [SSH](#11-ssh)
12. [Paquetes](#12-paquetes)
13. [Pipes, redirecciones y otros](#13-pipes-redirecciones-y-otros)
14. [Los 6 retos resueltos](#14-los-6-retos-resueltos)
15. [Índice alfabético de comandos](#15-índice-alfabético-de-comandos)
16. [Confusiones típicas](#16-confusiones-típicas)
17. [Preguntas tipo examen](#17-preguntas-tipo-examen)
18. [Ampliación (no está en el guion)](#18-ampliación-no-está-en-el-guion)

---

## 0. Mapa general

```
UBUNTU (GNU/Linux, libre y open source)
│
├── Componentes ........ kernel · shell · sistema de archivos · utilidades
├── Terminal ........... prompt · atajos · man
├── Sistema de archivos  / → bin boot dev etc home lib media opt proc sbin srv tmp usr var
│     └── Rutas ........ absolutas (/…) · relativas · . .. ~
├── Archivos ........... nano · cat/head/tail · cp · mv · rm/rmdir · grep · tar/gzip · diff
├── Usuarios ........... root · normales · de sistema · sudo · su · passwd · adduser · chmod
├── Procesos ........... ps · pstree · top/htop · kill/killall · & (background)
├── Servicios .......... service · systemctl (status/start/stop/restart…)
├── Red ................ NAT · red interna · puente · solo anfitrión · IP · lo · ping · netstat/ss · nc · dhclient
├── SSH ................ ssh usuario@IP · yes · Ctrl+D
├── Paquetes ........... apt install/update/upgrade · dpkg -i
└── Varios ............. | · > · echo/printf · shutdown/poweroff · hostname · exit · ./script.sh · /dev/null · sendmail
```

---

## 1. Conceptos de Ubuntu y del sistema

- **Ubuntu** = distribución de **GNU/Linux**, basada en **software libre y de código abierto**.

| Componente | Qué hace |
|-----------|----------|
| **Kernel** | Núcleo del SO: **asigna tareas** y **maneja el almacenamiento de datos** |
| **Shell** (intérprete de comandos) | **Procesa las órdenes** de los usuarios |
| **Sistema de archivos** | **Organización jerárquica** para almacenar archivos |
| **Utilidades** | Programas para **tareas específicas** |

---

## 2. Terminal

- **Terminal**: aplicación para interactuar con el sistema mediante **órdenes escritas**; permite realizar todo tipo de operaciones. Se abre con **`Ctrl + Alt + T`**.
- **Prompt**: carácter(es) que el shell usa para **avisar de que espera comandos**. Ej.: `usuario@maquina: /directorio$`.
- El símbolo **`$`** de los ejemplos es el prompt: **no se escribe**.

| Acción | Atajo |
|--------|-------|
| Abrir terminal | `Ctrl + Alt + T` |
| Nueva pestaña | `Ctrl + Shift + T` |
| Moverse entre pestañas | `Ctrl + Av. Pág` / `Ctrl + Re. Pág` |
| Cerrar pestaña | `Ctrl + Shift + W` |
| Salir de nano | `Ctrl + X` |
| Guardar en nano | `Ctrl + O` |
| Salir de SSH | `Ctrl + D` |
| Parar un `ping` (y otros procesos en primer plano) | `Ctrl + C` |

---

## 3. Ayuda: `man` y compañía

| Comando | Función |
|---------|---------|
| `man <comando>` | **Manual completo** (el "comando más importante") |
| `<comando> --help` | **Ayuda básica** |
| `<comando> --usage` | **Sintaxis básica** |
| `whatis` | Información **muy reducida** |

**Teclas dentro de `man`:**

| Tecla | Acción |
|-------|--------|
| `/` | Buscar |
| `n` | Siguiente coincidencia |
| `p` | Coincidencia anterior |
| `q` | Salir |

---

## 4. Árbol de directorios

Organización **jerárquica** desde el **directorio raíz `/`**.

| Directorio | Qué contiene | Palabra clave para recordarlo |
|-----------|--------------|------------------------------|
| `/bin` | Programas ejecutables **básicos** del sistema | **b**inarios |
| `/boot` | Ficheros para el **arranque** | **boot** |
| `/dev` | Ficheros de **dispositivos** (sonido, impresora, disco duro, CD/DVD, vídeo…) | **dev**ices |
| `/etc` | **Configuración** (ficheros y directorios) | **config** |
| `/home` | Directorios de trabajo de **cada usuario** (`/home/<usuario>`) | **usuarios** |
| `/lib` | **Librerías compartidas** y **módulos del kernel** | **lib**rerías |
| `/media` | **Montaje** de dispositivos: CD-ROM, USB, discos portátiles | **medios** |
| `/opt` | Reservado para **instalar aplicaciones** | **opt**ional apps |
| `/proc` | Datos del **kernel** e información de **procesos** | **proc**esos |
| `/sbin` | **Binarios ejecutables del sistema operativo** | **s**ystem bin |
| `/srv` | Datos de los **servicios** que ofrece el sistema | **s**e**rv**icios |
| `/tmp` | Archivos **temporales** | **tmp** |
| `/usr` | **Mayoría de archivos del sistema**, aplicaciones de todos los usuarios, librerías, manuales, juegos… (**espacio compartido**) | **u**ser **s**ha**r**ed |
| `/var` | Archivos **administrativos** y datos que **cambian con frecuencia**: **logs**, bases de datos, colas de impresión | **var**iable |

**Parejas fáciles de confundir:**

| | | |
|--|--|--|
| `/bin` vs `/sbin` | programas básicos vs binarios del sistema operativo | |
| `/etc` vs `/var` | configuración (estática) vs datos que cambian (logs) | |
| `/dev` vs `/media` | ficheros que representan dispositivos vs punto donde se **montan** USB/CD | |
| `/home` vs `/usr` | datos de cada usuario vs software compartido por todos | |
| `/proc` | información en vivo del kernel y procesos (de ahí que `ps` lea `/proc/`) | |

---

## 5. Navegación y rutas

### 5.1 Comandos

| Comando | Función | Ejemplo |
|---------|---------|---------|
| `pwd` | Muestra la **ruta absoluta** actual | |
| `ls` | Lista archivos y carpetas | |
| `ls -a` | Incluye **ocultos** (empiezan por `.`) | |
| `ls -l` | **Formato largo** (info adicional) | |
| `ls -alh` | Todo + largo + tamaños legibles | |
| `dir` | Lista ficheros y carpetas | |
| `cd <ruta>` | Cambia de directorio | `cd /home` |
| `cd ..` | **Sube un nivel** | |
| `cd` (solo) | **Vuelve al home** | |
| `mkdir <ruta>` | **Crea** un directorio | `mkdir Practicas` |
| `rmdir <ruta>` | Elimina un directorio **vacío** | |

### 5.2 Rutas (paths)

- Un archivo está **siempre** en una posición **relativa al raíz `/`** → esa es su **ruta o path**.
- El path **es necesario** para acceder al archivo **si no estás en su mismo directorio**.
- Se puede especificar de **tres formas**:
  1. **Ruta exacta** respecto al raíz `/`.
  2. Ruta **respecto a la carpeta actual**.
  3. Con **abreviaturas**:

| Abreviatura | Nombre | Significado |
|-------------|--------|-------------|
| `.` | el punto | directorio **actual** |
| `..` | dos puntos seguidos | directorio **superior** al actual |
| `~` | la virgulilla | **carpeta personal** del usuario que ejecuta el comando |

| Tipo de ruta | Se da respecto a… | Regla de oro |
|--------------|-------------------|--------------|
| **Absoluta** | el directorio **raíz** | **siempre empieza por `/`** |
| **Relativa** | una carpeta concreta (p. ej. el home) | **nunca empieza por `/`** |

**Ejemplos (Ampliación):**
`/etc/bind` → absoluta · `bind` (estando en `/etc`) → relativa · `../etc` → relativa · `~/Practicas` → relativa al home.
**Ir a `/etc/bind` con un solo comando:** `cd /etc/bind`.

---

## 6. Archivos: crear, ver, copiar, mover, borrar

### 6.1 Crear y editar

| Comando | Función |
|---------|---------|
| `nano archivo.txt` | Editor **en la terminal** |
| `nano "Mis notas.txt"` | Nombre **con espacios → entre comillas** |
| `gedit <ruta>` | Editor **gráfico** |
| `geany <ruta>` | Editor **gráfico** |

Atajos de nano: **`Ctrl+O`** guardar · **`Ctrl+X`** salir.

### 6.2 Ver contenido

| Comando | Función | Detalle |
|---------|---------|---------|
| `cat <ruta>` | Muestra **todo** el contenido | |
| `head <fichero>` | **Primeras** líneas | **10 por defecto** |
| `tail <fichero>` | **Últimas** líneas | **10 por defecto** |
| `tail -n 20 <fichero>` | Últimas **20** líneas | `-n` fija el número (vale para `head` también) |
| `grep <texto> <fichero>` | **Busca líneas** con un texto | |
| `diff <ruta1> <ruta2>` | **Compara** dos archivos y busca diferencias | |

### 6.3 Copiar, mover, renombrar, borrar

| Comando | Función | Sintaxis |
|---------|---------|----------|
| `cp` | **Copia** fichero o directorio | `cp <origen> <destino>` |
| `mv` | **Mueve o renombra** (el original **no se queda** en el origen); **misma sintaxis que `cp`** | `mv <origen> <destino>` |
| `rm` | Borra **archivos** | `rm [-i] [-r] <ruta>` |
| `rm -i` | Pide **confirmación** antes de borrar | |
| `rm -r` | Borra **directorios y su contenido** | |
| `rmdir` | Borra **solo directorios vacíos** | |

### 6.4 Comprimir y agrupar

| Comando | Función |
|---------|---------|
| `tar {opciones} <rutas>` | **Agrupa varios ficheros en uno** |
| `-x` | extraer |
| `-c` | crear |
| `-v` | mostrar progreso |
| `-f` | indicar el archivo |
| `-z` | comprimir |
| `gzip <ruta>` | **Comprime** un archivo |
| `gzip -d <ruta>` | **Descomprime** |

---

## 7. Usuarios y permisos

### 7.1 Tipos de usuario

| Tipo | Descripción |
|------|-------------|
| **Root** | **Superusuario**: administra el sistema, **control total** |
| **Normales** | Usuarios habituales: configuran y manipulan **solo lo que les pertenece**; tienen **espacio en disco (su home)** y **un shell** |
| **De sistema** | Gestionan **servicios y demonios** |

### 7.2 Comandos

| Comando | Función |
|---------|---------|
| `sudo <comando>` | Ejecuta con **privilegios de superusuario/administrador** |
| `su [usuario]` | **Cambia de usuario** (pide la contraseña **de ese usuario**) |
| `sudo su` | Pasa a **usuario con permisos de administrador** (root) |
| `passwd [usuario]` | **Cambia la contraseña** |
| `adduser <usuario>` | **Añade** un usuario |
| `groups` | **Grupos** a los que pertenece tu usuario |
| `chmod <permisos> <ruta>` | **Cambia permisos** de un archivo |

### 7.3 `chmod` (según el guion)

| Símbolo | Significado |
|---------|-------------|
| `u` | usuario (propietario) |
| `g` | grupo |
| `o` | otros |
| `a` | todos |
| `+` | **añade** permiso |
| `-` | **retira** permiso |
| `r` | lectura |
| `w` | escritura |
| `x` | ejecución |

Ejemplos (Ampliación): `chmod u+x script.sh` (da ejecución al propietario) · `chmod a-w fichero` (quita escritura a todos) · `chmod go+r fichero`.

---

## 8. Procesos

| Comando | Función |
|---------|---------|
| `ps` | **Lee la información de `/proc/`** |
| `ps aux` | **Todos** los procesos, **incluido él mismo** |
| `pstree` | Relación **padre-hijo** entre procesos |
| `top` | Procesos y uso de recursos **en tiempo real** |
| `htop` | Igual que `top` (versión mejorada) |
| `kill <PID>` | **Termina** el proceso con ese **PID** |
| `killall` | Termina procesos; **los mata a todos** |
| `<comando> &` | Lanza el proceso **en segundo plano (background)** |
| `xkill` | Cierra una **ventana gráfica** haciendo clic en ella |

- **PID** = identificador del proceso.
- Si la terminal se queda ocupada: se puede **lanzar el programa con `&`**.

---

## 9. Servicios

- **`service`**: gestiona los **demonios** del sistema.

| Comando | Función |
|---------|---------|
| `service --status-all` | **Ver todos** los servicios |
| `sudo service ssh status` | Estado del servicio SSH (ejemplo) |
| `service <demonio> status` | **Estado** + información de la ejecución |
| `service <demonio> start` | **Inicia** el demonio si está detenido |
| `service <demonio> stop` | **Detiene** el demonio si está en ejecución |
| `reload`, `force-reload`, `restart`, `try-restart` | Órdenes **más complejas** que implementan otros servicios |
| `systemctl start <serv>` | Inicia el servicio **con `systemctl`** |

> **Ampliación:** equivalencias `service X status` ↔ `systemctl status X.service`; ídem `start`, `stop`, `restart`. (El guion de P2/P3 las usa así.)

---

## 10. Redes

### 10.1 Conceptos

- Las máquinas se conectan mediante **interfaces de red** (cableadas o inalámbricas: **wifi, bluetooth**), que requieren una **dirección IP**.
- **Dirección IP** = **identificador único de una interfaz de red**.
- **`lo` (loopback)**: interfaz **especial**, conecta **internamente con la propia máquina**, IP **`127.0.0.1`**.

### 10.2 Tipos de conexión en máquinas virtuales (VirtualBox)

| Tipo | Qué hace | ¿IP automática? | Palabra clave |
|------|----------|-----------------|---------------|
| **NAT** | La VM sale a **Internet por la conexión del host** | **Sí, por DHCP** | salida a Internet |
| **Red interna** | Conecta a un **"cable virtual" con nombre**; las máquinas con el **mismo nombre** se comunican | **No** | cable virtual con nombre |
| **Adaptador puente** | Se conecta a la **misma subred que la interfaz real del host** (en casa: IP del rango del router doméstico) | Del router | misma subred que el host |
| **Solo anfitrión** | A un **DHCP gestionado por VirtualBox**; host y VM en la **misma subred virtual** | **Sí** (VirtualBox) | `192.168.56.X` |

### 10.3 Comandos de red

| Comando | Función |
|---------|---------|
| `ifconfig` | Muestra las interfaces de red |
| `ip -c a` / `ip -c address` | Interfaces de red **con colores** (**preferible**) |
| `ip link show` | Interfaces **incluidas las virtuales** (útil para ver **MAC**) |
| `ping <host>` | **Conectividad** con otro equipo |
| `hostname` | **Nombre de la máquina** |
| `dhclient` | Configura interfaces **por DHCP** |
| `nc -l <puerto>` | **Servidor netcat** escuchando en un puerto |
| `nc <host> <puerto>` | **Cliente netcat** que conecta a una máquina remota |
| `sendmail <cuenta>` | Envía un **correo** |

### 10.4 `netstat`

`netstat -opciones` → **estadísticas de red** (conexiones establecidas y en escucha).

| Opción | Significado |
|--------|-------------|
| `-t` | conexiones **TCP** |
| `-l` | conexiones **en escucha** |
| `-p` | muestra el **nombre del proceso** (**requiere administrador**) |
| `-n` | formato **numérico** para direcciones y puertos |

> **Ampliación:** `ss -tlnp` (que se usa en P2) hace lo mismo que `netstat -tlnp`: sockets TCP en escucha, con puertos numéricos y proceso.

---

## 11. SSH

- **SSH** = conexión **remota** **segura** a otra máquina.

```bash
$ ssh usuario@IP_remota
```

- Requisitos: **IP de la máquina remota** y **credenciales (usuario y contraseña)**.
- Tras el comando, el sistema **pide la contraseña** del usuario.
- Ejemplo: `$ ssh alumno@10.23.1.3`.
- **Primera conexión**: pide **aceptar el certificado** de la máquina remota → responder **`YES`**.
- **Salir**: **`Ctrl + D`** (o `exit`).
- En la tabla resumen: `ssh <usuario@hostname>` = "conecta de manera **segura** con una máquina remota".

---

## 12. Paquetes

| Comando | Función |
|---------|---------|
| `apt install <prog>` | Instala un programa **si está en el repositorio de Ubuntu** |
| `apt update` | **Actualiza los repositorios** (la lista de paquetes) |
| `apt upgrade` | **Actualiza el software** a las últimas versiones disponibles |
| `dpkg -i <paquete>` | Instala un **`.deb` descargado de Internet** |

---

## 13. Pipes, redirecciones y otros

| Elemento | Función |
|----------|---------|
| `cmd1 \| cmd2` | **Tubería (pipe)**: la **salida de `cmd1`** pasa como **entrada de `cmd2`** |
| `cmd > fichero` | **Redirección**: sustituye la **salida estándar** (pantalla) por un **archivo** |
| `echo <cadena>` | Muestra la cadena en pantalla |
| `printf <cadena>` | Muestra la cadena **formateada** |
| `shutdown now` / `poweroff` | **Apaga inmediatamente** |
| `exit` | **Cierra la sesión actual o la terminal** |
| `./<script>.sh` | Ejecuta un **script `.sh`** para **automatizar tareas** |
| `/dev/null` | **"Papelera" siempre vacía** |
| `&` | Lanza en **segundo plano** |

---

## 14. Los 6 retos resueltos

| Reto | Solución |
|------|----------|
| **14.1** Argumentos de `ls -alh` | **`-a`** todos, **incluidos ocultos** (empiezan por `.`) · **`-l`** **formato largo**: permisos, nº de enlaces, propietario, grupo, tamaño y fecha de modificación · **`-h`** tamaños **legibles** (KB, MB) en vez de bytes |
| **14.2** Grupo del usuario | `groups` |
| **14.3** `xkill` con `gedit` | `gedit &` → `xkill` → el puntero cambia → clic sobre la ventana de gedit → se cierra |
| **14.4** MAC de las interfaces | `ifconfig` (o `ip`): **6 pares hexadecimales** separados por `:` (ej. `00:1A:2B:3C:4D:5E`) |
| **14.5** Relacionar interfaces con las de VirtualBox | `ip link show` y **comparar las MAC** con las del adaptador en VirtualBox |
| **14.6** Archivos de `/etc` que empiezan por `hos` | `ls /etc \| grep 'hos'` (matiz en §18) |

---

## 15. Índice alfabético de comandos

| Comando | Sección | Una línea |
|---------|---------|-----------|
| `adduser` | 7 | añade usuario |
| `apt install/update/upgrade` | 12 | instalar / actualizar repos / actualizar software |
| `cat` | 6 | muestra contenido |
| `cd` | 5 | cambia de directorio |
| `chmod` | 7 | cambia permisos |
| `cp` | 6 | copia |
| `dhclient` | 10 | configura red por DHCP |
| `diff` | 6 | compara archivos |
| `dir` | 5 | lista ficheros |
| `dpkg -i` | 12 | instala `.deb` |
| `echo` / `printf` | 13 | muestra texto / formateado |
| `exit` | 13 | cierra sesión/terminal |
| `geany` / `gedit` | 6 | editores gráficos |
| `grep` | 6 | busca líneas con un texto |
| `groups` | 7 | grupos del usuario |
| `gzip [-d]` | 6 | comprime / descomprime |
| `head` / `tail` | 6 | primeras / últimas líneas |
| `hostname` | 10 | nombre de la máquina |
| `htop` / `top` | 8 | procesos en tiempo real |
| `ifconfig` | 10 | interfaces de red |
| `ip -c a` / `ip link show` | 10 | interfaces con colores / enlaces y MAC |
| `kill` / `killall` | 8 | termina proceso / todos |
| `ls [-a] [-l] [-h]` | 5 | lista |
| `man` | 3 | manual |
| `mkdir` | 5 | crea directorio |
| `mv` | 6 | mueve / renombra |
| `nano` | 6 | editor de terminal |
| `nc` | 10 | netcat (`-l` servidor, sin `-l` cliente) |
| `netstat` | 10 | estadísticas de red |
| `passwd` | 7 | cambia contraseña |
| `ping` | 10 | conectividad |
| `poweroff` / `shutdown now` | 13 | apaga |
| `ps [aux]` | 8 | procesos |
| `pstree` | 8 | árbol de procesos |
| `pwd` | 5 | ruta actual |
| `rm [-i] [-r]` | 6 | borra |
| `rmdir` | 5/6 | borra directorio vacío |
| `sendmail` | 10 | envía correo |
| `service` | 9 | gestiona demonios |
| `ssh` | 11 | conexión remota segura |
| `su` / `sudo` / `sudo su` | 7 | cambiar usuario / privilegios / root |
| `systemctl start` | 9 | inicia servicio |
| `tar` | 6 | agrupa ficheros |
| `whatis` | 3 | info reducida |
| `xkill` | 8 | cierra ventana gráfica |

---

## 16. Confusiones típicas

| Par | Diferencia |
|-----|------------|
| `cd` vs `cd ..` | `cd` → **home**; `cd ..` → **sube un nivel** |
| `cp` vs `mv` | `cp` **mantiene** el original; `mv` **no** (mueve/renombra) |
| `rm` vs `rmdir` vs `rm -r` | archivos / **solo directorios vacíos** / directorios **con contenido** |
| `su` vs `sudo` vs `sudo su` | cambia de usuario / ejecuta **un comando** como admin / **pasa a root** |
| `apt update` vs `apt upgrade` | actualiza la **lista de repositorios** / actualiza el **software** |
| `apt install` vs `dpkg -i` | desde **repositorio** / desde un **`.deb` descargado** |
| `kill` vs `killall` | un **PID** / **todos** los procesos de ese nombre |
| `ps` vs `top`/`htop` | **instantánea** (lee `/proc/`) / **tiempo real** |
| `ifconfig` vs `ip -c a` | clásico / **preferible**, con **colores** |
| `head` vs `tail` | **primeras** / **últimas** líneas (10 por defecto) |
| `\|` vs `>` | pasa la salida a **otro comando** / a un **archivo** |
| `nc -l` vs `nc host puerto` | **servidor** / **cliente** |
| `-a` vs `-l` vs `-h` (en `ls`) | **ocultos** / **formato largo** / **tamaños legibles** |
| `netstat -t` / `-l` / `-p` / `-n` | **TCP** / **escucha** / **proceso** (admin) / **numérico** |
| NAT vs red interna | Internet + DHCP / cable virtual sin IP automática |
| Puente vs solo anfitrión | misma subred que el **host real** / subred **virtual** de VirtualBox (`192.168.56.X`) |
| `/bin` vs `/sbin` | programas básicos / binarios del sistema operativo |
| `/etc` vs `/var` | configuración / datos que cambian (logs) |
| `/dev` vs `/media` | dispositivos / punto de **montaje** de USB y CD |
| Ruta absoluta vs relativa | empieza por `/` / nunca |
| `.` vs `..` vs `~` | actual / superior / home |
| `service` vs `systemctl` | dos formas de **gestionar servicios** (`service X start` ≈ `systemctl start X`) |
| `Ctrl+C` vs `Ctrl+D` | interrumpe un proceso (p. ej. `ping`) / sale de SSH |

---

## 17. Preguntas tipo examen

### 17.1 Conceptos
1. Enumera los componentes de Ubuntu y qué hace cada uno.
2. ¿Qué es el prompt? ¿Qué significa el `$` en los ejemplos?
3. ¿Qué es un usuario *root*? ¿Y uno *de sistema*?
4. ¿Qué diferencia hay entre una ruta absoluta y una relativa?
5. ¿Qué significan `.`, `..` y `~`?
6. ¿Qué guarda cada directorio clave (`/etc`, `/var`, `/dev`, `/proc`, `/home`, `/usr`, `/media`, `/opt`, `/srv`, `/tmp`, `/boot`, `/lib`, `/bin`, `/sbin`)?
7. Explica los cuatro tipos de adaptador de red de VirtualBox.
8. ¿Qué es la interfaz `lo` y qué IP tiene?
9. ¿Qué es un pipe? ¿Y una redirección?
10. ¿Qué es `/dev/null`?

### 17.2 Comandos "¿cómo harías…?"

| Pregunta | Respuesta |
|----------|-----------|
| Ir a `/etc/bind` con un solo comando | `cd /etc/bind` |
| Volver al home | `cd` |
| Subir un nivel | `cd ..` |
| Ver la ruta actual | `pwd` |
| Crear el directorio `Practicas` | `mkdir Practicas` |
| Crear un archivo con espacios en el nombre | `nano "Mis notas.txt"` |
| Ver las últimas 20 líneas de un fichero | `tail -n 20 <fichero>` |
| Listar con ocultos y detalle | `ls -al` (con tamaños legibles: `ls -alh`) |
| Copiar un archivo a otra ruta | `cp <origen> <destino>` |
| Mover o renombrar | `mv <origen> <destino>` |
| Borrar un directorio con contenido | `rm -r <ruta>` |
| Borrar un directorio vacío | `rmdir <ruta>` |
| Pedir confirmación antes de borrar | `rm -i <ruta>` |
| Buscar líneas con un texto en un fichero | `grep <texto> <fichero>` |
| Comparar dos archivos | `diff <ruta1> <ruta2>` |
| Comprimir / descomprimir | `gzip <ruta>` / `gzip -d <ruta>` |
| Agrupar ficheros en uno (y comprimir) | `tar -c… -z -f` (opciones del guion: `-c` crear, `-z` comprimir, `-f` archivo, `-v` progreso, `-x` extraer) |
| Ejecutar como administrador | `sudo <comando>` |
| Cambiar la contraseña | `passwd [usuario]` |
| Añadir un usuario | `adduser <usuario>` |
| Dar permiso de ejecución | `chmod +x <ruta>` / `chmod u+x <ruta>` |
| Ver los grupos de mi usuario | `groups` |
| Ver todos los procesos | `ps aux` |
| Ver la jerarquía de procesos | `pstree` |
| Ver procesos en tiempo real | `top` / `htop` |
| Matar un proceso por PID | `kill <PID>` |
| Lanzar un programa en segundo plano | `<comando> &` |
| Cerrar una ventana gráfica con el ratón | `xkill` |
| Ver todos los servicios | `service --status-all` |
| Ver el estado de SSH | `sudo service ssh status` |
| Iniciar un servicio | `service <serv> start` / `systemctl start <serv>` |
| Ver las IPs con colores | `ip -c a` |
| Ver la MAC de las interfaces | `ifconfig` / `ip link show` |
| Probar conectividad con otra máquina | `ping <host>` |
| Ver qué puertos TCP escuchan (numérico, con proceso) | `sudo netstat -tlnp` |
| Montar un servidor y un cliente netcat | `nc -l <puerto>` / `nc <host> <puerto>` |
| Conectar por SSH | `ssh usuario@IP_remota` |
| Instalar un programa | `sudo apt install <prog>` |
| Actualizar repositorios / software | `apt update` / `apt upgrade` |
| Instalar un `.deb` | `dpkg -i <paquete>` |
| Mandar la salida de un comando a un fichero | `<comando> > <ruta>` |
| Encadenar comandos | `<cmd1> \| <cmd2>` |
| Listar archivos de `/etc` con "hos" | `ls /etc \| grep 'hos'` |
| Apagar ya | `shutdown now` / `poweroff` |
| Cerrar la sesión/terminal | `exit` |
| Ejecutar un script `.sh` | `./<script>.sh` |

### 17.3 Preguntas de "dato literal"

| Pregunta | Respuesta |
|----------|-----------|
| Atajo para abrir la terminal | `Ctrl + Alt + T` |
| Atajos de pestañas | `Ctrl+Shift+T` · `Ctrl+Av.Pág/Re.Pág` · `Ctrl+Shift+W` |
| Teclas de `man` | `/`, `n`, `p`, `q` |
| Líneas por defecto de `head`/`tail` | 10 |
| Atajos de nano | `Ctrl+O`, `Ctrl+X` |
| IP del loopback | `127.0.0.1` |
| IP típica de solo anfitrión | `192.168.56.X` |
| Ejemplo SSH del guion | `ssh alumno@10.23.1.3` |
| Respuesta al certificado SSH | `YES` |
| Salida de SSH | `Ctrl + D` |
| MAC de ejemplo | `00:1A:2B:3C:4D:5E` |

---

## 18. Ampliación (no está en el guion)

> Material de apoyo propio; no lo des por "dicho por el profesor".

- **`grep 'hos'` frente a "empieza por":** `ls /etc | grep 'hos'` filtra nombres que **contienen** "hos" en cualquier posición. Para los que **empiezan** por `hos`: `ls /etc | grep '^hos'` o `ls /etc/hos*`.
- **Leer `ls -l`:** `-rwxr-xr-- 1 usuario grupo 4096 oct 20 10:00 fichero` → primer carácter = tipo (`-` fichero, `d` directorio); luego permisos de **usuario (rwx)**, **grupo (r-x)**, **otros (r--)**; enlaces; propietario; grupo; tamaño; fecha; nombre.
- **`chmod` numérico:** `r=4`, `w=2`, `x=1` → `chmod 755 fichero` = `rwxr-xr-x`; `644` = `rw-r--r--`.
- **`sudo` vs `su`:** `sudo` usa **tu** contraseña y solo para **ese comando**; `su` pide la contraseña **del usuario destino**.
- **Redirección que añade:** `>>` **añade al final**; `>` **sobrescribe** el fichero.
- **Salida de errores:** `2> /dev/null` descarta los mensajes de error (uso típico de `/dev/null`).
- **`Ctrl+C`:** interrumpe el proceso en primer plano (el guion lo usa para parar `ping` en P3).
- **Nota de erratas de los apuntes:** en la tabla aparece `nc {l <puerto>` (debe ser `nc -l <puerto>`) y `cd ...` (debe ser `cd ..`); el guion dice "estar **denenido**" (leer *detenido*).
