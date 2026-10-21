# Sistemas Telemáticos — Anexo 1 de la Práctica 4: Restauración de backup y conexión a la PABX

**Universidad de Granada · Dpto. de Teoría de la Señal, Telemática y Comunicaciones**
Guion original © G. Maciá, J. Camacho y P. Padilla

> **Para qué sirve:** es el procedimiento que hay que hacer **antes** de empezar la Práctica 4 (el guion de la práctica lo marca como *NOTA muy importante*: importar el backup original de configuración).
> **Marcas:** lo que no lleva marca es del guion. > **Ampliación** = añadido mío (no está en el guion).

---

## Índice

1. [Introducción: qué es un backup y por qué se restaura](#1-introducción-qué-es-un-backup-y-por-qué-se-restaura)
2. [Datos que necesitas (resumen)](#2-datos-que-necesitas-resumen)
3. [Procedimiento paso a paso](#3-procedimiento-paso-a-paso)
4. [Diagrama del proceso](#4-diagrama-del-proceso)
5. [Posibles problemas (Ampliación)](#5-posibles-problemas-ampliación)
6. [Checklist](#6-checklist)
7. [Preguntas tipo examen](#7-preguntas-tipo-examen)

---

## 1. Introducción: qué es un backup y por qué se restaura

| Concepto | Descripción |
|----------|-------------|
| **Backup o volcado** de una configuración | **Fichero que contiene una configuración específica para un equipo** |
| **Motivo** | En el laboratorio hacen prácticas **muchos grupos de trabajo de diferentes asignaturas**, así que para las prácticas **hay que partir de una configuración estándar que sea siempre la misma** |
| **BMS-server** | **Software de gestión de la PABX**. Tiene un **gestor de bases de datos MySQL** en el que **se pueden importar ciertas configuraciones** de los equipos |
| ***restore*** (restauración) | Nombre de la operación de **cargar en la centralita la configuración de partida** |

**El procedimiento de carga de un backup tiene dos fases:**

1. **Cargar en la base de datos** (la del PC) **la configuración deseada** → *importar*.
2. **Cargar esa configuración desde la base de datos (residente en el PC) hasta la PABX** → *transferir a centralita*.

```
 fichero ISLA-x.bms ──(1) importar──► BD MySQL de BMS (PC) ──(2) transferir──► PABX
```

---

## 2. Datos que necesitas (resumen)

`x` = **número de la isla**.

| Dato | Valor |
|------|-------|
| **Puesto de trabajo** desde el que se hace | El etiquetado como **`Px/1`** |
| **Dirección de la consola web** | **`http://172.16.x.1`** (con *Internet Explorer*) |
| **Usuario / contraseña de la consola** | **`admin`** / **`default`** |
| **Fichero de backup** | **`c:\laboratorio\configuracion\PABX\backupIsla\ISLA-x.bms`** |
| **Tipo de acceso al sistema importado** | Cambiar **"Cable serie Directo"** por **"IPU"** |
| **IP de la centralita (PABX)** | **`172.16.x.140`** |
| **Señal de éxito** | El sistema importado aparece en el *frame* izquierdo **con una lucecita en verde (online)** |

> **Ampliación (sobre las dos IPs):** por la convención de red de la asignatura (`172.16.X.Y`, con `Y` = equipo de la isla), **`172.16.x.1` parece corresponder al puesto `Px/1`** (el PC con BMS-server), mientras que **`172.16.x.140` es la propia PABX**. El guion no lo explica expresamente; es una deducción.

---

## 3. Procedimiento paso a paso

> Se realiza **para cada isla** desde el puesto de trabajo **`Px/1`**.

| # | Paso | Detalle del guion |
|---|------|-------------------|
| **1** | **Encender la PABX** | |
| **2** | **Esperar a que se apaguen todas las luces amarillas** de la **CPU y la MFU** | Hay que esperar a que la centralita termine de arrancar |
| **3** | **Arrancar en el PC el BMS server** y **comprobar que hace la conexión correctamente al sistema** | |
| **4** | **Arrancar Internet Explorer** y conectarlo a **`http://172.16.x.1`** | **NOTA:** si no funciona, modificar la configuración del explorador: **Herramientas → Opciones de Internet → pestaña Conexiones → Configuración de LAN** → **asegurarse de que NO está seleccionada la opción de usar un servidor proxy** |
| **5** | **Entrar en la consola** con **user: `admin`**, **pass: `default`** | |
| **6** | **En la pantalla de selección de sistema**, hacer los apartados **a) a g)** (abajo) | |

### Paso 6 detallado

| Apartado | Acción | Qué ocurre / qué comprobar |
|----------|--------|----------------------------|
| **a)** | **Importar sistema.** Elegir el fichero **`c:\laboratorio\configuracion\PABX\backupIsla\ISLA-x.bms`** | Se **carga la configuración de backup en la base de datos de BMS**. **Comprobar con qué nombre de sistema se ha importado** el fichero: a partir de ahora ese nombre se llama ***sistema importado*** |
| **b)** | **Conectar con el sistema importado.** Elegir ***ajustes*** del sistema importado y **cambiar el acceso de "Cable serie Directo" por "IPU"**. **Poner la dirección IP de la centralita (`172.16.x.140`).** **Remitir** y **volver atrás**. **Finalmente conectar** | Comprobar que **en el frame de la izquierda aparece el sistema importado con una lucecita en verde** (indica **conexión online**) |
| **c)** | **Pinchar en el nombre del sistema importado** y elegir la opción **`admin`** | **Esperar a que terminen de cargar los datos de la PABX en el gestor BMS** |
| **d)** | Elegir la opción **`transferir a centralita`** | Sale **una ventana con el progreso de la transferencia**. **Esperar a que termine.** En este punto **se están enviando los datos desde la base de datos hasta la PABX** |
| **e)** | **Pinchar en el nombre del sistema importado** y elegir **`desconectar`** | |
| **f)** | **Pinchar de nuevo** en el nombre del sistema importado y elegir **`conectar`** | |
| **g)** | **Asegurarse de que el sistema está conectado en verde (online)** | Comprobación final |

---

## 4. Diagrama del proceso

```
 ┌───────────────────────────────────────────────────────────────┐
 │ PC Px/1  (BMS-server + base de datos MySQL)                   │
 │                                                               │
 │  ISLA-x.bms ──a) importar──► BD de BMS ("sistema importado")  │
 │                                  │                            │
 │                  b) ajustes: acceso "IPU", IP 172.16.x.140    │
 │                     conectar  →  luz verde (online)           │
 │                                  │                            │
 │                  c) admin (cargar datos de la PABX en BMS)    │
 │                                  ▼                            │
 │                  d) transferir a centralita ─────────────────────┐
 └───────────────────────────────────────────────────────────────┘  │
                                                                     ▼
                              e) desconectar  →  f) conectar  →  g) verde   PABX (172.16.x.140)
```

---

## 5. Posibles problemas (Ampliación)

| Síntoma | Causa probable | Qué hacer |
|---------|---------------|-----------|
| `http://172.16.x.1` **no abre** | El navegador usa un **proxy** (lo avisa el propio guion) | Herramientas → Opciones de Internet → Conexiones → Configuración de LAN → **desmarcar proxy** |
| Fallan las pantallas de la consola | BMS-server **no ha arrancado/conectado** (paso 3) | Revisar que el BMS server está iniciado y conectado antes de abrir el navegador |
| No se conecta al sistema importado | La PABX **no ha terminado de arrancar** (luces amarillas aún encendidas) o acceso mal configurado | Esperar a que se apaguen las luces; revisar que el acceso es **IPU** y la IP **`172.16.x.140`** |
| No aparece la luz verde | El acceso sigue en **"Cable serie Directo"** | Cambiar a **IPU**, **remitir**, volver atrás y **conectar** |
| Datos incorrectos tras restaurar | Se importó **el fichero de otra isla** | Usar **`ISLA-x.bms`** con **tu** `x` |
| Antes de transferir no hay datos | No se esperó a que **termine la carga de datos de la PABX** (paso c) | Esperar al final de la carga antes de `transferir a centralita` |

---

## 6. Checklist

- ☐ PABX **encendida** y **luces amarillas de CPU y MFU apagadas**
- ☐ **BMS server** arrancado y conectado
- ☐ Navegador en **`http://172.16.x.1`** (sin proxy)
- ☐ Login **`admin` / `default`**
- ☐ **Importar** `ISLA-x.bms` y anotar el **nombre del sistema importado**
- ☐ **Ajustes**: acceso **IPU**, IP **`172.16.x.140`**, remitir, volver, **conectar** → luz verde
- ☐ **admin** → esperar a que carguen los datos
- ☐ **Transferir a centralita** → esperar a que termine
- ☐ **Desconectar → conectar** → **verde (online)**

---

## 7. Preguntas tipo examen

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es un backup de una configuración? | Fichero con una configuración específica para un equipo |
| ¿Por qué se restaura un backup antes de la práctica? | Muchos grupos y asignaturas usan la PABX: hay que **partir siempre de una configuración estándar** |
| ¿Cómo se llama el software de gestión de la PABX? ¿Qué base de datos usa? | **BMS-server**; **MySQL** |
| ¿Cómo se llama la operación de cargar la configuración en la centralita? | ***restore*** (restauración) |
| ¿Fases del procedimiento? | 1) Cargar la configuración en la **base de datos** (importar); 2) Cargarla **desde la BD hasta la PABX** (transferir) |
| ¿Desde qué puesto se hace? | **`Px/1`** |
| ¿Qué es la `x`? | El **número de la isla** |
| ¿Qué hay que esperar tras encender la PABX? | Que se **apaguen las luces amarillas** de la **CPU y MFU** |
| ¿Dirección que se abre en el navegador? | **`http://172.16.x.1`** |
| ¿Qué comprobar si no funciona? | Que **no esté activado el servidor proxy** (Opciones de Internet → Conexiones → Configuración de LAN) |
| Credenciales de la consola | **`admin` / `default`** |
| Ruta y nombre del fichero de backup | **`c:\laboratorio\configuracion\PABX\backupIsla\ISLA-x.bms`** |
| ¿Qué hace "Importar sistema"? | Carga el backup en la **BD de BMS** |
| ¿Qué es el "sistema importado"? | El nombre con el que queda importado el fichero |
| ¿Qué acceso hay que poner y a qué IP? | **IPU** (en lugar de "Cable serie Directo") y **`172.16.x.140`** |
| ¿Cómo se sabe que hay conexión online? | **Lucecita verde** junto al sistema importado en el frame izquierdo |
| ¿Qué opción envía los datos a la PABX? | **`transferir a centralita`** |
| ¿Qué se hace tras la transferencia? | **Desconectar**, **conectar** y comprobar el **verde** |

---

*Guía elaborada a partir del "Anexo 1: Restauración de backup y conexión a la PABX" (Sistemas Telemáticos, UGR; © G. Maciá, J. Camacho y P. Padilla). Las secciones marcadas como "Ampliación" son material de apoyo propio. Material de estudio personal.*
