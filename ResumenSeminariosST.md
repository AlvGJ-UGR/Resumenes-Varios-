# 📡 Sistemas Telemáticos — Guía rápida de seminarios

> [!summary] IDEA GENERAL
> Los seminarios trabajan progresivamente la **comunicación en red**:
>
> **Máquinas → aplicaciones → servicios → monitorización**
>
> La herramienta fundamental para observar qué ocurre realmente en la red es **Wireshark**.

---

## 🟦 SEMINARIO 1 — Conectividad de máquinas y servicios

### 🎯 Objetivo

Conectar dos máquinas y entender la comunicación **cliente-servidor** entre aplicaciones.

### 🌐 Configuración de red

| Comando         | Función                                      |
| --------------- | -------------------------------------------- |
| `hostname`      | Cambiar/consultar nombre de la máquina       |
| `ifconfig`      | Consultar/configurar interfaces de red       |
| `ip -c address` | Consultar interfaces e IP de forma más clara |
| `ping IP`       | Comprobar conectividad entre máquinas        |
| `/etc/hosts`    | Asociar nombres de máquina con IP            |

**Interfaz utilizada:** `enp0s8`

### 🔌 IP + Puerto

Para identificar una aplicación dentro de una máquina no basta con conocer la **IP**.

**Conexión = IP + Puerto**

* **IP** → identifica la máquina.
* **Puerto** → identifica la aplicación/servicio.

### 💻 Netcat (`nc`)

Se utiliza para crear una comunicación bidireccional entre cliente y servidor.

**Servidor:**

```bash
nc -l 12345
```

**Cliente:**

```bash
nc 192.168.1.2 12345
```

Una vez conectados, se pueden enviar mensajes entre ambas terminales.

### 👀 Monitorización — `netstat`

```bash
netstat -tnlp
```

| Opción | Significado                 |
| ------ | --------------------------- |
| `-t`   | TCP                         |
| `-n`   | No traducir IP → nombres    |
| `-l`   | Conexiones en escucha       |
| `-p`   | Proceso/aplicación asociado |

> **⭐ CLAVE:** Una aplicación servidor escucha en un **puerto** y el cliente se conecta a **IP + puerto**.

---

# 🟩 SEMINARIO 2 — Aplicaciones cliente-servidor

### 🎯 Objetivo

Crear una comunicación TCP entre aplicaciones y observarla con **Wireshark**.

### 🔁 Loopback

Se comunican dos aplicaciones dentro de la misma máquina:

```text
127.0.0.1
```

Ejemplo:

**Servidor:**

```bash
nc -l 12345
```

**Cliente:**

```bash
nc 127.0.0.1 12345
```

### 🦈 Wireshark

Permite capturar y analizar los paquetes intercambiados.

Para esta comunicación se selecciona la interfaz:

```text
loopback
```

Para analizar una comunicación TCP completa:

```text
Follow → TCP Stream
```

### 🐍 TCP con Python

Se implementan dos programas:

```text
servidor.py
cliente.py
```

El servidor queda esperando conexiones y el cliente se conecta a él.

**Idea:**

```text
CLIENTE
   │
   │  conexión TCP
   ▼
SERVIDOR
```

> **⭐ CLAVE:** Netcat permite experimentar rápidamente con TCP; Python permite implementar la lógica cliente-servidor.

---

# 🟨 SEMINARIO 3 — XMPP

### 🎯 Objetivo

Configurar y monitorizar un sistema de mensajería **XMPP**.

### 🖥️ Servidor

Se utiliza:

```text
Ejabberd
```

### 🔌 Puertos importantes

|   Puerto | Función                   |
| -------: | ------------------------- |
| **5222** | Cliente → servidor        |
| **5269** | Servidor → servidor       |
| **5280** | Gestión HTTP del servidor |

### 👥 Clientes

Se utilizan dos clientes XMPP:

```text
Pidgin
Empathy
```

Se crean dos usuarios y se establece comunicación entre ellos.

### 📨 Estanzas XMPP

Las acciones de los clientes generan **estanzas** que pasan por el servidor.

Ejemplo:

```text
PIDGIN
  │
  │ "is typing..."
  ▼
SERVIDOR
  │
  ▼
EMPATHY
```

El servidor recibe la estanza, la procesa y la envía al otro cliente.

> **⭐ CLAVE:** XMPP utiliza un **servidor intermedio** que gestiona y distribuye las comunicaciones entre clientes.

---

# 🟥 SEMINARIO 4 — Servicio web / HTTP

### 🎯 Objetivo

Configurar un servidor web y estudiar cómo funciona **HTTP**.

### 🌐 Apache2

El servidor utilizado es:

```text
Apache2
```

Puerto habitual estudiado:

```text
80
```

Se comprueba con `netstat` que Apache está escuchando.

### 📄 Página web

Se crea:

```text
index.html
```

Apache sirve este fichero cuando el cliente realiza una petición.

```text
NAVEGADOR
    │
    │ HTTP Request
    ▼
 APACHE
    │
    │ HTTP Response
    ▼
NAVEGADOR
```

### 🦈 Wireshark

Permite observar:

* Peticiones HTTP.
* Respuestas HTTP.
* Cabeceras.
* Contenido intercambiado.

Una respuesta correcta puede ser:

```text
200 OK
```

### 📡 Peticiones con Netcat

También se pueden crear peticiones HTTP manualmente utilizando:

```bash
printf ...
```

y enviándolas mediante:

```bash
nc
```

Esto permite modificar directamente las **cabeceras HTTP** y observar cómo responde el servidor.

---

### 🔄 Conexiones persistentes

Una conexión persistente permite realizar varias peticiones utilizando la misma conexión TCP.

```text
Cliente ──────── conexión TCP ────────> Servidor
          GET
          GET
          GET
```

Con:

```text
Keep-Alive
```

se mantiene abierta la conexión durante un tiempo.

Con:

```text
Keep-Alive: off
```

se desactivan las conexiones persistentes.

> **Importante:** En el seminario se observa que el servidor puede cerrar la conexión después de un determinado tiempo de espera.

---

### 🍪 Cookies

Las cookies permiten mantener información entre diferentes peticiones.

El servidor puede establecer una cookie y el cliente la enviará posteriormente.

También se estudia:

```text
Path
```

que permite controlar para qué rutas se envía una cookie.

---

### 🔐 Autenticación

Se configura autenticación mediante:

```text
.htaccess
htpasswd
```

El objetivo es que el servidor solicite:

```text
Usuario + Contraseña
```

antes de permitir el acceso.

### ⭐ Lo fundamental del seminario 4

```text
HTTP
│
├── Peticiones
├── Respuestas
├── Cabeceras
├── 200 OK
├── Keep-Alive
├── Cookies
└── Autenticación
```

---

# 🟪 SEMINARIO 5 — Correo electrónico

### 🎯 Objetivo

Configurar y monitorizar un sistema de correo electrónico.

Se utiliza:

```text
Postfix
```

### 📮 Protocolos

| Protocolo | Función         |  Puerto |
| --------- | --------------- | ------: |
| **SMTP**  | Envío de correo |  **25** |
| **POP3**  | Recepción       | **110** |
| **IMAP4** | Recepción       | **143** |

### 📤 Envío

Se puede establecer una conexión directamente con el servidor:

```bash
nc localhost 25
```

También se utiliza:

```text
sendmail
```

para facilitar el envío.

---

### 📁 Almacenamiento

Existen dos sistemas:

#### Mbox

Todos los correos se almacenan en:

```text
UN ÚNICO FICHERO
```

#### Maildir

Cada correo se almacena individualmente.

Estructura:

```text
Maildir
├── cur → correos existentes
├── new → correos nuevos
└── tmp → almacenamiento temporal
```

Maildir permite gestionar los correos individualmente y sus estados.

---

### 📥 Lectura del correo

**POP3:**

```bash
nc localhost 110
```

**IMAP4:**

```bash
nc localhost 143
```

### 📧 Thunderbird + Wireshark

Se utiliza **Thunderbird** como cliente de correo.

Wireshark permite observar:

```text
Thunderbird
     │
     │ comunicación
     ▼
Servidor de correo
```

y analizar el envío y la recepción de mensajes.

---

# 🧠 CHULETA FINAL

## 🔌 Puertos que hay que memorizar

```text
80    → HTTP / Web
25    → SMTP
110   → POP3
143   → IMAP4
5222  → XMPP cliente-servidor
5269  → XMPP servidor-servidor
5280  → Gestión HTTP de Ejabberd
```

## 🛠️ Herramientas principales

```text
ping       → comprobar conectividad
ifconfig   → configurar/consultar red
netstat    → ver conexiones
nc         → comunicación cliente-servidor
Wireshark  → capturar y analizar tráfico
```

## 📚 Conceptos que relacionan todos los seminarios

```text
                 RED
                  │
          ┌───────┴───────┐
          │               │
       CLIENTE          SERVIDOR
          │               │
          └──── TCP/IP ───┘
                  │
               PUERTO
                  │
              SERVICIO
                  │
              WIRESHARK
                  │
        Analizar qué ocurre
        realmente en la red
```

### 🔑 Si solo tienes 5 minutos antes del examen

**Seminario 1:** IP + puerto + Netcat + `netstat`
**Seminario 2:** TCP + loopback + Python + Wireshark
**Seminario 3:** XMPP + Ejabberd + estanzas + puertos 5222/5269/5280
**Seminario 4:** HTTP + Apache + Keep-Alive + cookies + autenticación
**Seminario 5:** SMTP/POP3/IMAP + Postfix + Maildir/Mbox

> **Idea global:** todos los seminarios enseñan a **configurar un servicio, establecer una comunicación entre cliente y servidor y observar esa comunicación mediante herramientas de red/Wireshark**.
