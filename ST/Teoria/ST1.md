# Sistemas Telemáticos — Tema 1: Introducción a los servicios y redes de telecomunicación

**Prof. Óscar Adamuz Hinojosa · Grado en Ingeniería de Tecnologías de Telecomunicación · Universidad de Granada · Curso 2026–2027**

> **Qué es este documento:** esquema completo del Tema 1 (47 diapositivas lógicas, 76 páginas con animaciones), con el texto **y** las figuras. Cada concepto se explica **una sola vez**; al final hay cuadros comparativos, glosario y test.
>
> **Marcas:**
> - **BÁSICO / COMPL.** — etiqueta que el profesor pone a cada diapositiva. **BÁSICO** = núcleo del tema; **COMPL.** = complementario (menos prioritario, pero forma parte del temario).
> - Lo que no lleva marca es contenido **de las diapositivas**.
> - > **Ampliación:** explicación **añadida** por mí (no está en las diapositivas).
> - **(n/47)** = número de diapositiva.

---

## Índice

0. [Qué vamos a aprender](#0-qué-vamos-a-aprender)
1. [Introducción a las redes de comunicación](#1-introducción-a-las-redes-de-comunicación)
2. [Modelos de referencia y comunicación por capas](#2-modelos-de-referencia-y-comunicación-por-capas)
3. [Conexiones, modelos y servicios](#3-conexiones-modelos-y-servicios)
4. [Marco regulatorio para el desarrollo de servicios](#4-marco-regulatorio-para-el-desarrollo-de-servicios)
5. [Proceso de creación y explotación de servicios](#5-proceso-de-creación-y-explotación-de-servicios)
6. [Qué debe quedar claro (resumen oficial)](#6-qué-debe-quedar-claro-resumen-oficial)
7. [Cuadros comparativos](#7-cuadros-comparativos)
8. [Glosario de siglas y términos](#8-glosario-de-siglas-y-términos)
9. [Test de repaso](#9-test-de-repaso)

---

## 0. Qué vamos a aprender

### (1/47) y (2/47)

| Bloque | Qué se aprende |
|--------|----------------|
| **Cuando dos equipos intercambian información** | **Identificar qué elementos intervienen** entre un equipo que envía y otro que recibe |
| **La información cambia durante el camino** | Comprender **por qué se añaden datos de control** a la información y **qué ocurre cuando llega al destino** |
| **Un problema grande, muchas tareas** | Entender **por qué una comunicación compleja se divide en tareas más pequeñas y especializadas** |
| **Primero la idea; después el vocabulario** | Se pondrá nombre a los conceptos: **red, capa, protocolo, conexión, servicio…** |
| **Cómo se organizan quienes se comunican** | Distintas formas de relacionar los extremos: **un equipo central que atiende peticiones**, **participantes que cooperan entre sí**, etc. |
| **Qué recibe finalmente el usuario** | **Clasificar las funcionalidades** que las redes permiten ofrecer: **comunicación entre personas, acceso a información y servicios de apoyo** |
| **La tecnología no está sola** | Comprender, con ejemplos, por qué **operadores, regulación y competencia** condicionan cómo se ofrecen las telecomunicaciones |
| **De una idea a un servicio real** | Conocer, a nivel introductorio, **las fases y los responsables** que participan en su creación y explotación |

**Índice del tema (3/47):**

| # | Sección |
|---|---------|
| 1 | Introducción a las redes de comunicación |
| 2 | Modelos de referencia y comunicación por capas |
| 3 | Conexiones, modelos y servicios (3.1 Concepto de conexión · 3.2 Modelos de comunicación · 3.3 Servicios de red: definición y clasificación) |
| 4 | Marco regulatorio para el desarrollo de servicios |
| 5 | Proceso de creación y explotación de servicios |

---

---

# 1. Introducción a las redes de comunicación

## 1.1 Sistema de comunicación (4/47 · COMPL.)

*Dos terminales quieren intercambiar información. ¿Qué necesitamos entre ambos?*

```
 Terminal A ───────► Red de comunicación ───────► Terminal B
```

> **Terminología del tema:** **sistemas telemáticos = redes de comunicación** = **conjunto de terminales autónomos, interconectados y dotados de capacidades de comunicación.**

| Término | Significado |
|---------|-------------|
| **Autónomos** | **Funcionan como sistemas independientes** |
| **Interconectados** | **Pueden comunicarse entre sí** |

## 1.2 Estructura de una red (5/47 · COMPL.)

```
                 ┌────────── Subred de comunicación ──────────┐
                 │               N2                           │
   Host A ─────── N1 ─────────── (nodos de conmutación) ─ N4 ───── Host B
                 │               N3                           │
                 └────────────────────────────────────────────┘
        N = nodo de conmutación  ·  las líneas entre nodos = líneas de transmisión
```

- **Y en Internet…:** Internet **interconecta muchas redes diferentes**; por eso se describe como **una red de redes** (Red A, Red B y Red C interconectadas).

## 1.3 Cinco conceptos para interpretar una red (6/47 · COMPL.)

| Concepto | Definición |
|----------|-----------|
| **Red** | **Conjunto de terminales autónomos e interconectados, dotados de capacidades de comunicación** |
| **Subred** | **Parte de la red encargada de transportar la información entre los hosts** |
| **Host** | **Sistema final que genera o consume información** |
| **Nodo de conmutación** | **Elemento intermedio que hace avanzar la información** |
| **Línea de transmisión** | **Medio que permite transmitir información entre elementos de la red** |

> **Ampliación (relación entre ellos):** **red = hosts + subred**; **subred = nodos de conmutación + líneas de transmisión**.

## 1.4 ¿Qué problemas debe resolver una red? (7/47 – 10/47 · BÁSICO)

Supongamos que queremos **enviar un libro completo desde un host a otro**. **No basta con que ambos estén conectados**: aparecen **siete problemas**.

| # | Problema | Qué plantea | Ejemplo del tema |
|---|----------|-------------|------------------|
| **1** | **Errores en las transmisiones** | La información puede **sufrir alteraciones** antes de llegar al receptor | Un **bit cambia de 0 a 1**; el receptor **debe poder detectar que lo recibido no coincide con lo enviado** |
| **2** | **Delimitación de tramas** | **El receptor debe identificar dónde comienza y termina cada unidad transmitida** | El libro se divide en **fragmentos de 1000 bytes**; al recibir una secuencia de bits, hay que saber **qué bits forman el primer fragmento y dónde empieza el siguiente** |
| **3** | **Control de flujo** | **El emisor no debe enviar a un ritmo superior al que puede aceptar el receptor** | El host A envía **100 fragmentos/s**, pero B solo procesa **20**: si A sigue al máximo, **las memorias intermedias de B pueden llenarse** |
| **4** | **Encaminamiento** | Cuando **existen varios caminos** entre origen y destino, **debe decidirse por dónde enviar** | De A a B: **A → N1 → N2 → N4 → B** o **A → N1 → N3 → N4 → B** |
| **5** | **Identificación de diferentes flujos origen–destino** | Un mismo host puede mantener **simultáneamente diferentes comunicaciones** | Mientras descargamos el libro, el ordenador muestra una **página web** y hace una **videollamada**: **la información debe entregarse a la comunicación correcta** (**los puertos** permiten distinguir estos flujos) |
| **6** | **Identificación de las sesiones** | Una comunicación dura un tiempo y **mantiene un contexto propio que debe identificarse y conservarse** | Transferencia de un libro muy largo con **puntos de sincronización al terminar cada capítulo**: si se interrumpe **después del capítulo 8**, **la sesión conserva el contexto** para **reanudar desde ahí** |
| **7** | **Representación de los datos** | **Emisor y receptor deben usar una representación común** para interpretar la información | Un libro con **alfabetos latino, griego o cirílico**: se **codifican de forma diferente**, así que **ambos deben usar la misma codificación** |

> **Mensaje clave:** **una red no se limita a transportar bits de un punto a otro**. Para que la comunicación funcione hay que resolver **problemas diferentes, cada uno con una función concreta**.

### De los problemas a las funciones (11/47 · BÁSICO)

| Problema observado | Función necesaria |
|--------------------|-------------------|
| Un fragmento **llega alterado** | **Errores en las transmisiones** |
| **No reconocemos sus límites** | **Delimitación de tramas** |
| **El receptor no da abasto** | **Control de flujo** |
| **Existen varios caminos** | **Encaminamiento** |
| **Varias comunicaciones simultáneas** | **Identificación de flujos origen–destino** |
| **Debemos mantener el contexto del diálogo** | **Identificación de las sesiones** |
| **Los datos pueden interpretarse de forma diferente** | **Representación de los datos** |

> **Mensaje clave:** los problemas son diferentes y **requieren funciones específicas** para poder comunicar correctamente.

---

---

# 2. Modelos de referencia y comunicación por capas

## 2.1 De las funciones al concepto de protocolo (12/47 · BÁSICO)

**¿Cómo se realiza una función de comunicación?** Las entidades que se comunican **deben coordinar su comportamiento**: **qué información intercambiar, en qué formato, en qué orden y cómo actuar en cada situación**.

```
   Entidad A ── mensaje según unas reglas conocidas ──────────► Entidad B
              ◄── respuesta según esas mismas reglas ──────────
```

> **Protocolo:** **conjunto de reglas y convenciones a aplicar en una comunicación.**

## 2.2 ¿Un único protocolo podría resolverlo todo? (13/47 · BÁSICO)

Un único protocolo que englobara **errores + delimitación + flujo + encaminamiento + sesiones + representación + aplicaciones…** tendría **problemas**:

| Problema |
|----------|
| Sería **difícil de diseñar y modificar** |
| Tendría **poca reutilización** |
| **Un cambio podría afectar a todo el sistema** |
| **Complicaría la interoperabilidad** |

> **Solución: separar y organizar las responsabilidades** → **comunicación por capas**.

## 2.3 Comunicación por capas: capa usuaria y proveedora (14/47 · BÁSICO)

> **Principio:** **dividimos el problema en capas.** Cada capa **resuelve determinadas funciones** y **se relaciona con las capas adyacentes**.

```
   Capa N + 1   ← usuaria del servicio de N
       ↕
   Capa N       ← proveedora para N + 1  /  usuaria de N − 1
       ↕
   Capa N − 1   ← proveedora para N
```

- **Una capa es usuaria del servicio de la capa inferior.**
- **Esa capa es, a su vez, proveedora de un servicio a la capa superior.**

## 2.4 Protocolo, servicio e interfaz (15/47 · BÁSICO)

| Concepto | Definición |
|----------|-----------|
| **Protocolo** | **Reglas y convenciones utilizadas por entidades paritarias de una misma capa** |
| **Servicio** | **Funcionalidad que una capa ofrece a la capa superior** |
| **Interfaz** | **Mecanismo mediante el que una capa accede al servicio de la capa inferior** |

```
      Host A                                         Host B
 ┌─ Capa N+1 · Punto A ─┐                    ┌─ Capa N+1 · Punto B ─┐
        │  interfaz / servicio                         │  interfaz / servicio
 ┌─ Capa N   · Punto A ─┐ ◄┄ protocolo entre ┄► ┌─ Capa N   · Punto B ─┐
        └───────────────── entidades paritarias ───────────────┘
                              (Red)
```

> **Ampliación (regla para no confundirse):** **protocolo = comunicación horizontal** (entre iguales, A↔B de la misma capa); **servicio e interfaz = relación vertical** (entre capas adyacentes del mismo host).

## 2.5 Modelo de referencia OSI (16/47 · BÁSICO)

> **OSI:** modelo de referencia que **organiza las funciones de comunicación en siete capas**. **Desarrollado en el marco de ISO** (*International Organization for Standardization*).

| Para qué sirve | |
|----------------|--|
| Nos permite **asociar cada problema a un nivel concreto** | |
| **No implica que una red real tenga necesariamente siete protocolos independientes** | |
| Nos proporciona **el vocabulario que utilizaremos durante la asignatura** | |

### Las siete capas: función y ejemplo (17/47 · BÁSICO)

| Nº | Capa | Función | Ejemplo |
|----|------|---------|---------|
| **7** | **Aplicación** | Proporciona **a las aplicaciones las funciones necesarias para utilizar la red** | **Acceso web mediante HTTP, resolución de nombres mediante DNS y correo mediante SMTP** |
| **6** | **Presentación** | Se ocupa de **la representación de los datos**: cómo interpretar la información que intercambian los extremos | Acordar una **codificación de caracteres como UTF-8** para interpretar correctamente el texto |
| **5** | **Sesión** | **Organiza e identifica el diálogo o sesión entre las aplicaciones** que se comunican | **Mantener el contexto** de una comunicación y **establecer puntos de sincronización** que permitan reanudarla |
| **4** | **Transporte** | Comunicación **extremo a extremo**; **identifica diferentes flujos mediante puertos**; **puede incorporar control de flujo y congestión** | Un **navegador y una videollamada** pueden usar **la misma dirección IP mediante puertos diferentes** |
| **3** | **Red** | **Direccionamiento lógico y encaminamiento** de la información **entre redes** | Decidir **por qué nodos debe pasar un paquete IP** para alcanzar una red de destino |
| **2** | **Enlace** | **Organiza la entrega de información sobre un enlace**: **delimitación de tramas, control local y detección de determinados errores** | **Ethernet** organiza la información en **tramas** y utiliza **direcciones MAC** |
| **1** | **Física** | Define **cómo se transmiten bits a través del medio físico** | **Señales eléctricas sobre cobre, pulsos luminosos sobre fibra u ondas electromagnéticas en un enlace radio** |

> **Sistemas Telemáticos se centra especialmente en la capa de Aplicación: los Temas 3, 4 y 5 estudian servicios y protocolos de aplicación.**
> **Regla mnemotécnica (de arriba abajo):** **A**plicación · **P**resentación · **S**esión · **T**ransporte · **R**ed · **E**nlace · **F**ísica (*"A Pocos Se Teme Rendir Entre Fuertes"*… o la que prefieras).

### Relación entre los 7 problemas y las capas (Ampliación, deducida de las diapositivas 11 y 17)

| Problema | Capa que lo resuelve (según 17/47) |
|----------|------------------------------------|
| Errores en las transmisiones | **Enlace** (detección de determinados errores) |
| Delimitación de tramas | **Enlace** (tramas) |
| Control de flujo | **Transporte** (control de flujo y congestión) y **enlace** (control local) |
| Encaminamiento | **Red** |
| Identificación de flujos origen–destino | **Transporte** (**puertos**) |
| Identificación de las sesiones | **Sesión** |
| Representación de los datos | **Presentación** |

## 2.6 Del modelo OSI a la arquitectura TCP/IP (18/47 · COMPL.)

> **OSI es un modelo de referencia. TCP/IP es la arquitectura utilizada en Internet y agrupa algunas funciones de OSI.**

| OSI | TCP/IP | Ejemplos |
|-----|--------|----------|
| Aplicación · Presentación · Sesión | **Aplicación** | **HTTP · DNS · SMTP · SIP** |
| Transporte | **Transporte** | **TCP / UDP** |
| Red | **Internet** | **IP** |
| Enlace · Física | **Acceso a red** | **Ethernet / Wi-Fi / …** |

> **Sistemas Telemáticos se centra en la capa de aplicación; sus servicios se apoyan en las capas inferiores.**

## 2.7 Arquitectura de red y pila de protocolos (19/47 · BÁSICO)

| Concepto | Definición |
|----------|-----------|
| **Arquitectura de red** | **Modelo de referencia + protocolos** |
| **Pila de protocolos** | **Especificación de los protocolos que forman una arquitectura de red** |

**Ejemplo que se usará durante el curso:**

| Capa | Protocolo |
|------|-----------|
| Aplicación | **HTTP** |
| Transporte | **TCP** |
| Red / Internet | **IP** |
| Enlace / acceso | **Ethernet** |

*(Terminología coherente con el manual de la asignatura.)*

## 2.8 Dos direcciones de comunicación (20/47 · BÁSICO)

| | **Comunicación vertical** | **Comunicación horizontal (entidades paritarias)** |
|--|---------------------------|---------------------------------------------------|
| **Qué es** | **Paso de información entre capas adyacentes del mismo host** | **Comunicación lógica entre entidades paritarias de la misma capa mediante su protocolo** |
| **Ejemplo** | Los datos de una petición web **bajan desde aplicación hacia transporte, red y enlace** | **El TCP de un extremo interpreta la cabecera TCP generada por el TCP del otro extremo** |
| **Importante** | — | **La información viaja realmente por las capas inferiores** (solo en la capa de enlace hay comunicación física real) |

```
   Host A                          Host B
 Aplicación ◄┄┄┄ entidades paritarias ┄┄┄► Aplicación
 Transporte ◄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄► Transporte
 Red        ◄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄► Red
 Enlace     ◄━━━━━━ comunicación real ━━━━► Enlace
   ↓ vertical (en cada host)
```

## 2.9 SDU y PDU: qué recibe y qué genera una capa (21/47 · BÁSICO)

| Término | Significado |
|---------|-------------|
| **SDU** | ***Service Data Unit*** (unidad de datos de servicio): **lo que la capa superior entrega a la capa inferior para que lo transporte** |
| **PDU** | ***Protocol Data Unit*** (unidad de datos de protocolo): **SDU + información de control (por ejemplo, una cabecera)** de la capa |

| Paso | Qué ocurre |
|------|-----------|
| **1** | **La capa superior (N+1) entrega una SDU**: la información que desea que la capa inferior transporte |
| **2** | **La capa N añade información de control (por ejemplo, una cabecera)** y **genera su PDU** (`Cabecera N + SDU`) |
| **3** | **La PDU de N baja a la capa siguiente y pasa a formar parte de la SDU de la capa N−1.** **Repetir este proceso es el encapsulamiento**; **en recepción se realiza el proceso inverso** |

> **Fórmula:** `PDU(N) = Cabecera(N) + SDU(N)` y `SDU(N−1) = PDU(N)`.

### Encapsulamiento: HTTP / TCP / IP / Ethernet (22/47 · BÁSICO)

```
 Aplicación │ GET /index.html                          datos de aplicación HTTP
            ↓ TCP añade su cabecera
 Transporte │ H.TCP │ GET /index.html
            ↓ IP añade su cabecera
 Red        │ H.IP │ H.TCP │ Datos HTTP
            ↓ Ethernet añade cabecera y cola
 Enlace     │ H.Eth │ H.IP │ H.TCP │ Datos HTTP │ cola
```

| Capa | Qué ocurre |
|------|-----------|
| **Aplicación** | La capa en la que se centra la asignatura **genera los datos que queremos comunicar** |
| **Transporte** | Los datos de aplicación pasan a ser **la SDU de TCP**; **TCP añade su cabecera y genera su PDU** |
| **Red** | **La PDU de transporte pasa a ser datos para IP**, que **añade una nueva cabecera** |
| **Enlace** | **Ethernet vuelve a encapsular: añade cabecera y cola** |
| **Receptor** | **Cada capa interpreta y elimina su información de control** (desencapsulamiento) |

> **Detalle:** **Ethernet añade cabecera y cola**; TCP e IP solo cabecera.

---

---

# 3. Conexiones, modelos y servicios

## 3.1 Concepto de conexión (23/47: portada de sección)

### Conexión: IP y puertos (24/47 · BÁSICO)

*Un host puede mantener muchas comunicaciones simultáneas. ¿Cómo distinguimos a qué comunicación pertenece cada dato?*

```
      Host A                                               Host B
   192.0.2.10                                           198.51.100.20
   puerto 53001 ───────── HTTPS · Tema 5 ───────────►  puerto 443
   puerto 53002 ───────── DNS   · Tema 3 ───────────►  puerto 53
   puerto 53003 ───────── SIP   · Tema 4 ───────────►  puerto 5060
   (puertos locales)                                    (puertos de servicio)
```

> **Una dirección IP identifica al host; los puertos permiten distinguir las comunicaciones de diferentes procesos o servicios dentro del mismo host.**

| Servicio | Puerto | Tema |
|----------|--------|------|
| **HTTPS** | **443** | Tema 5 |
| **DNS** | **53** | Tema 3 |
| **SIP** | **5060** | Tema 4 |

### IP y puertos: TCP frente a UDP (25/47 · BÁSICO)

> **Extremo de una comunicación = dirección IP + puerto.**

| | **TCP** | **UDP** |
|--|---------|---------|
| **Orientación** | **Orientado a conexión** | **No orientado a conexión** |
| **Establecimiento** | **Los extremos establecen una conexión antes de intercambiar datos y mantienen información sobre ella** | **No se establece previamente una conexión**; **cada datagrama se envía de forma independiente** |
| **Direcciones y puertos** | Sí | **También usa direcciones IP y puertos** para identificar origen y destino, **pero no mantiene el estado de una conexión** |
| **Identificador** | **Conexión TCP = (IP origen, puerto origen, IP destino, puerto destino)** | — |
| **Ejemplo** | `(192.0.2.10, 53001, 198.51.100.20, 443)` | — |
| **Resumen** | **TCP: establece y mantiene una conexión** | **UDP: envía datagramas sin establecerla** |

> **Ampliación:** por eso un servidor puede atender a muchos clientes en el mismo puerto: **cada conexión se distingue por la cuádrupla completa**, no solo por el puerto de servicio.

---

## 3.2 Modelos de comunicación (26/47: portada de sección)

### Modelo cliente–servidor (27/47 · BÁSICO)

| Paso | |
|------|--|
| **1** | **Existe una entidad que ofrece una funcionalidad: el servidor** |
| **2** | **Los clientes conocen cómo localizar al servidor y solicitan el servicio** |

```
   Cliente 1 ──┐
   Cliente 2 ──┼──►  SERVIDOR (ofrece una funcionalidad)
   Cliente 3 ──┘
```

| Ventaja | Inconveniente |
|---------|---------------|
| **Simplicidad y separación de funcionalidades** | **Escalabilidad**: **el servidor debe soportar la demanda de muchos clientes** |

**Ejemplos:** **web, correo, directorio.**

### Modelo Peer-to-Peer, P2P (28/47 · BÁSICO)

- **Peer o *servent***: **un participante puede actuar como cliente y servidor, consumiendo y ofreciendo recursos.**
- **Organización:** **los participantes se comunican directamente con otros pares sin depender necesariamente de un único servidor central.**
- **Consecuencia:** **puede distribuir recursos y carga, pero aumenta la complejidad de coordinación, disponibilidad y seguridad.**
- **Un sistema real puede combinar componentes cliente–servidor y P2P.**

> **Ampliación:** *servent* = **serv**er + cli**ent**.

### Modelo de agentes móviles (29/47 · COMPL.)

| | |
|--|--|
| **Idea** | **Un agente móvil es código que puede desplazarse a otro sistema y ejecutar allí parte de la tarea** |
| **Por qué puede interesar** | **En lugar de intercambiar continuamente datos, se desplaza la lógica hacia donde están los recursos** |
| **Ventajas citadas** | **Puede funcionar aunque el cliente quede desconectado**, **reducir tráfico de red**, **simplificar algunos diseños** y **descargar proceso del cliente** |

```
 Cliente ──(el agente se desplaza)──► Sistema remoto ── ejecuta allí ──► resultado
```

### Modelo publicación–suscripción (30/47 · COMPL.)

> **Idea:** **publicadores y suscriptores no necesitan conocerse directamente.**

```
 Publicador 1 ──publica──►┌────────────┐──notifica──► Suscriptor 1
                          │ Middleware │──notifica──► Suscriptor 2
 Publicador 2 ──publica──►│  (tópicos) │──notifica──► Suscriptor 3
                          └────────────┘
```

| Fase | Qué ocurre |
|------|-----------|
| **Publicación** | **El productor envía información asociada a un tópico al middleware** |
| **Suscripción** | **El middleware distribuye la información a quienes estén suscritos al tópico** |
| **Ejemplo** | **Sensores publican alarmas** (tópico **"alarmas"**); **varias aplicaciones reciben automáticamente** las alarmas del tópico al que están suscritas |

---

## 3.3 Servicios de red: definición y clasificación (31/47: portada de sección)

### Qué entendemos por servicio de red (32/47 · BÁSICO)

> **Un servicio de red es todo aquel que, para ser prestado, precisa de una red de comunicaciones.**

| Elemento | |
|----------|--|
| **Servicio** | **Funcionalidad que queremos obtener** |
| **Protocolos y mecanismos de comunicación** | Cómo se consigue |
| **Red** | **Hosts, nodos, líneas de transmisión y recursos** |

### Tres familias de servicios que estructuran la asignatura (33/47 · BÁSICO)

| Familia | Qué permiten | Ejemplos | Dónde se estudia |
|---------|--------------|----------|------------------|
| **Conversacionales** | **Comunicación en tiempo real entre usuarios, mediante el intercambio bidireccional de información** | **Telefonía y videollamada** | **Tema 4** |
| **Acceso a la información** | **Acceder, consultar, publicar o intercambiar información sin requerir una interacción conversacional en tiempo real entre usuarios** | **Web, correo electrónico y *streaming*** | **Tema 5** |
| **Transversales** | **Proporcionan funciones de apoyo que son utilizadas por otros servicios para poder funcionar correctamente** | **DNS, directorio y seguridad** | **Tema 3** |

### Otras clasificaciones de los servicios (34/47 · COMPL.)

| Criterio | Categorías |
|----------|-----------|
| **Según su papel en la red** | **Servicios portadores, servicios finales o teleservicios, servicios suplementarios** |
| **Según el ancho de banda** | **Banda ancha, banda estrecha** |
| **Según el medio de cobertura** | **Terrestres, por satélite** |
| **Según el tipo de información** | **Datos, voz** |
| **Según la movilidad del usuario** | **Fijos, móviles** |
| **Según la funcionalidad del servicio** | **Conversacionales, acceso a la información, transversales** |

---

---

# 4. Marco regulatorio para el desarrollo de servicios

> Todo este bloque es **COMPL.**, salvo las diapositivas 38 y 39 (**BÁSICO**).

## 4.1 Antes de la liberalización: un único operador (35/47 · COMPL.)

- **Situación histórica:** **un mismo operador (el operador histórico) podía controlar los terminales, la infraestructura y los servicios.**

```
 Usuario ─ Terminal ─ Acceso ─ Red ─ Prestación de servicios      ← todo del operador histórico
```

> **Pregunta clave:** *¿cómo introducir competencia si los nuevos operadores no disponen inicialmente de toda esta infraestructura?*

## 4.2 Liberalización: abrir el mercado a la competencia

> **Liberalización:** **eliminar progresivamente restricciones para que distintos operadores puedan competir en el mercado de las telecomunicaciones.**

### Primera parte (36/47)

| Año | Qué se abre | Explicación |
|-----|-------------|-------------|
| **1988** | **Terminales** | Se abre la posibilidad de **utilizar terminales proporcionados por empresas distintas del operador histórico**. *Ej.:* el usuario **deja de depender exclusivamente del operador para disponer de su terminal** |
| **1991–1996** | **Servicios** | **La competencia se extiende progresivamente a distintos servicios de telecomunicación.** *Ej.:* **transmisión de datos entre terminales u ordenadores, comunicaciones por satélite y servicios móviles** |

> **Aclaración del propio tema:** aquí **"servicios de datos"** significa **transmisión de información digital**, **no el concepto actual de datos móviles**.
> **Idea clave:** **la liberalización fue progresiva**: primero se abrieron a la competencia **los terminales y después los servicios**.

### Segunda parte (37/47)

| Año | Qué se abre | Explicación |
|-----|-------------|-------------|
| **1998** | **Infraestructuras** | **Los nuevos operadores pueden desplegar y explotar sus propias redes.** *¿Qué es infraestructura?* **Centrales, enlaces, cables o fibra, antenas y demás elementos necesarios para construir una red** |
| **1998** | **Numeración** | **Los recursos de numeración también deben estar disponibles para los distintos operadores.** *Ej.:* **un nuevo operador necesita poder asignar números de teléfono a sus clientes** |
| **2000** | **Bucle de abonado** | **Quedaba un problema importante: el último tramo de acceso entre cada abonado y la red.** *Problema:* **instalar un nuevo cable hasta cada vivienda para cada operador supondría duplicar una infraestructura ya existente.** *Respuesta:* **permitir, bajo determinadas condiciones, que operadores alternativos puedan utilizar ese acceso existente** |

**Cronología resumen:**

```
 1988 ── terminales
 1991–1996 ── servicios (datos, satélite, móviles)
 1998 ── infraestructuras + numeración
 2000 ── bucle de abonado
```

## 4.3 Apertura del bucle de abonado: antes y después (38/47 · BÁSICO)

| **Antes de la apertura** | **Después de la apertura** |
|--------------------------|---------------------------|
| **El acceso físico hasta la vivienda pertenecía al operador histórico** (par de cobre desde la central local) | **El operador alternativo puede utilizar el bucle existente bajo condiciones reguladas** (**mismo bucle**, mismo par de cobre) |
| **Un operador alternativo tendría que instalar otro acceso hasta cada vivienda**, **duplicando una infraestructura ya existente** | **El operador alternativo puede llegar al abonado sin desplegar un nuevo par de cobre hasta la vivienda** |

> **Resultado:** **una misma infraestructura de acceso puede facilitar la prestación de servicios por distintos operadores.**

## 4.4 Dos formas de abrir el bucle de abonado (39/47 · BÁSICO)

La apertura se podía realizar **cediendo el par de cobre completo al operador alternativo** o **permitiendo que dos operadores compartieran el mismo par**.

| | **Desagregación total** | **Compartición de espectro** |
|--|-------------------------|------------------------------|
| **Idea** | **El operador alternativo utiliza el par de cobre completo** para prestar sus servicios al abonado | **El mismo par de cobre es utilizado por dos operadores, empleando bandas de frecuencia diferentes** |
| **Qué pasa con el histórico** | **Deja de utilizar ese par para ese abonado**: el acceso completo queda a disposición del alternativo | **Mantiene la telefonía** |
| **Qué hace el alternativo** | Presta todos sus servicios | **Utiliza el mismo par para prestar el servicio de datos** |
| **Elemento clave** | — | **Splitter**: **separa las bandas de frecuencia** |

```
 Desagregación total:   Usuario ── par de cobre ──► Operador alternativo
 Compartición espectro: Usuario ── Splitter ──┬─ telefonía ► Operador histórico
                                              └─ datos ───► Operador alternativo
```

> **Ampliación:** en la práctica, la compartición de espectro es la que permitía **ADSL** del operador alternativo sobre una línea con telefonía del histórico.

## 4.5 Del cobre a la fibra (40/47 · COMPL.)

| **Acceso tradicional: cobre** | **Acceso actual: fibra** |
|-------------------------------|--------------------------|
| El acceso hasta el abonado se realizaba mediante **un par de cobre** | **En España, el acceso fijo se apoya principalmente en redes de fibra óptica (FTTH)** |
| **El par podía cederse completamente** a un operador alternativo | **Los mecanismos técnicos de acceso y compartición ya no son los mismos** |
| **También podía compartirse** entre operadores mediante **bandas de frecuencia diferentes** | **Siguen existiendo mecanismos de acceso mayorista a redes e infraestructuras para favorecer la competencia** |

> **Ejemplo histórico:** la **desagregación del bucle de abonado**.
> **Idea clave:** **el cobre es el ejemplo histórico que permite entender el problema regulatorio; con la fibra cambia la tecnología y cambian los mecanismos de acceso.**

## 4.6 Liberalización: efectos que vemos hoy (41/47 · COMPL.)

> **La apertura del bucle de abonado es solo un ejemplo concreto**; la liberalización produjo **cambios mucho más amplios**.

| Efecto | Descripción |
|--------|-------------|
| **Más operadores** | **Distintas empresas pueden competir ofreciendo servicios sobre redes propias o utilizando determinados recursos de otras redes** |
| **Interconexión entre redes** | **Las redes de distintos operadores deben poder comunicarse entre sí.** *Ej.:* **un cliente de un operador puede llamar a un cliente de otro** |
| **Portabilidad numérica** | **El usuario puede cambiar de operador manteniendo su número**, **reduciendo una barrera importante para cambiar de compañía** |
| **Servicio universal** | **La competencia debe ser compatible con garantizar el acceso a determinados servicios básicos en las condiciones establecidas por la regulación** |

## 4.7 Marco actual: competencia y regulación (42/47 · COMPL.)

| Elemento | Qué es |
|----------|--------|
| **Ley 11/2022, General de Telecomunicaciones** | **Constituye el marco general actual** y establece que **las telecomunicaciones se prestan en régimen de libre competencia** |
| **CNMC** (Comisión Nacional de los Mercados y la Competencia) | **Supervisa los mercados de comunicaciones electrónicas**, **analiza la competencia** y **puede establecer obligaciones específicas cuando resulta necesario** |

> **Idea clave:** **liberalización NO significa ausencia de regulación.** La regulación **establece las reglas de competencia** y aborda **acceso, interconexión, numeración y derechos de los usuarios**.

---

---

# 5. Proceso de creación y explotación de servicios

> Todo este bloque es **COMPL.**

## 5.1 Diseño de servicios: principios y criterios (43/47)

| Criterio |
|----------|
| **Interoperación y compatibilidad** |
| **Público objetivo** al que se dirige |
| **Funcionalidad** de la solución |
| **Facilidad de uso** |
| **Fiabilidad del sistema y duración** |
| **Privacidad y seguridad de la información** |
| **Coste transparente** |
| **Calidad del servicio** |

> **Idea:** diseñar un servicio **no consiste únicamente en que "funcione técnicamente"**: debe **responder a las necesidades de sus usuarios objetivo** y poder ser **utilizado, operado, protegido y mantenido** adecuadamente.

## 5.2 De una idea al mercado: las 8 fases (44/47 y 45/47)

```
 1 Concepto → 2 Especificación → 3 Viabilidad → 4 Diseño
 → 5 Desarrollo → 6 Test → 7 Go-to-market → 8 Ciclo de vida
```

| # | Fase | Qué se hace |
|---|------|-------------|
| **1** | **Concepto** | **Identificar qué necesidad se quiere cubrir y qué servicio se propone** |
| **2** | **Especificación** | **Definir requisitos, funcionalidad y condiciones** que deberá cumplir el producto |
| **3** | **Viabilidad** | **Comprobar si la propuesta es técnica, económica y operativamente realizable** |
| **4** | **Diseño** | **Traducir los requisitos a una solución concreta: arquitectura, componentes y funcionamiento** |
| **5** | **Desarrollo** | **Implementar e integrar la solución diseñada** |
| **6** | **Test** | **Verificar que el producto cumple la especificación y se comporta correctamente** |
| **7** | **Go-to-market** | **Preparar y ejecutar el lanzamiento comercial y operativo del producto** |
| **8** | **Ciclo de vida** | **Operar, mantener, evolucionar y finalmente retirar o sustituir el producto** |

**Primera mitad (44/47):** fases 1–4 (**concepto → especificación → viabilidad → diseño**). **Segunda mitad (45/47):** fases 5–8 (**desarrollo → test → go-to-market → ciclo de vida**).

## 5.3 Roles en el desarrollo de productos (46/47)

| Rol | Foco | Qué hace | Mayor implicación |
|-----|------|----------|-------------------|
| **Jefe de proyecto** | **Gestión del proyecto** | **Coordina actividades, recursos y plazos** para llevar el proyecto **de principio a fin** | **A lo largo de todo el proceso** |
| **Jefe de producto** | **Producto y mercado** | **Identifica necesidades, contribuye a definir el producto y coordina su lanzamiento y evolución** | **Concepto, especificación, go-to-market y ciclo de vida** |
| **Ingeniero de producto** | **Tecnología** | **Traduce los requisitos a una solución técnica y coordina su implementación y validación** | **Diseño, desarrollo y test** |

> **Además** intervienen otras áreas: **finanzas, ventas y gestión de clientes** colaboran durante el proceso **para hacer viable el producto desde distintas perspectivas**.

---

---

# 6. Qué debe quedar claro (resumen oficial)

*(47/47 — "Qué debe quedar claro al terminar el Tema 1")*

1. **Entender por qué una comunicación se organiza en capas** y **reconocer la función principal de cada capa del modelo OSI**.
2. **Distinguir los conceptos de protocolo, servicio, interfaz, arquitectura y pila de protocolos** dentro de una comunicación organizada por capas.
3. **Explicar cómo se comunican las capas**: **comunicación vertical y horizontal, SDU, PDU y encapsulamiento**.
4. **Entender cómo se identifican los extremos de una comunicación mediante direcciones IP y puertos**, y **distinguir a nivel básico TCP y UDP**.
5. **Diferenciar los modelos de comunicación cliente–servidor y Peer-to-Peer (P2P)**.
6. **Definir qué es un servicio de red** y **distinguir servicios conversacionales, de acceso a la información y transversales**.
7. **Comprender, mediante la apertura del bucle de abonado, cómo regulación y acceso a las infraestructuras pueden facilitar la competencia entre operadores**.

---

# 7. Cuadros comparativos

### 7.1 Protocolo, servicio e interfaz
| | Qué es | Entre quién |
|--|--------|-------------|
| **Protocolo** | Reglas y convenciones | **Entidades paritarias** de la misma capa (horizontal) |
| **Servicio** | Funcionalidad que **ofrece** una capa | **Capa N → capa N+1** (vertical) |
| **Interfaz** | Mecanismo por el que una capa **accede** al servicio | **Capa N+1 → capa N** (vertical) |

### 7.2 Comunicación vertical frente a horizontal
| | Vertical | Horizontal |
|--|----------|-----------|
| **Entre** | Capas **adyacentes del mismo host** | **Entidades paritarias** de la misma capa en hosts distintos |
| **Es** | Paso real de información | **Comunicación lógica** mediante el protocolo |

### 7.3 SDU, PDU y encapsulamiento
| Término | Definición |
|---------|-----------|
| **SDU** | Lo que la capa superior entrega |
| **PDU** | SDU + información de control de la capa |
| **Encapsulamiento** | La PDU de N pasa a ser SDU de N−1 (baja); en recepción, proceso inverso |

### 7.4 OSI y TCP/IP
| OSI (7 capas) | TCP/IP (4 capas) |
|---------------|------------------|
| 7 Aplicación, 6 Presentación, 5 Sesión | **Aplicación** |
| 4 Transporte | **Transporte** |
| 3 Red | **Internet** |
| 2 Enlace, 1 Física | **Acceso a red** |

### 7.5 TCP frente a UDP
| | TCP | UDP |
|--|-----|-----|
| Conexión | **Sí** (orientado a conexión) | **No** |
| Estado | **Mantiene información de la conexión** | **No mantiene estado** |
| Identificador | **(IP origen, puerto origen, IP destino, puerto destino)** | IP y puertos de origen y destino de cada **datagrama** |
| Envío | Tras establecer la conexión | **Cada datagrama independiente** |

### 7.6 Cliente–servidor, P2P, agentes móviles y publicación–suscripción
| Modelo | Idea | Ventaja / característica | Inconveniente |
|--------|------|--------------------------|---------------|
| **Cliente–servidor** | Servidor ofrece funcionalidad; clientes la solicitan | **Simplicidad y separación de funcionalidades** | **Escalabilidad** |
| **P2P** | Cada par es cliente y servidor | **Distribuye recursos y carga** | **Complejidad de coordinación, disponibilidad y seguridad** |
| **Agentes móviles** | **Código** que se desplaza al sistema remoto | **Funciona con cliente desconectado**, reduce tráfico, descarga proceso del cliente | — |
| **Publicación–suscripción** | **Middleware con tópicos**; no se conocen directamente | **Desacopla** publicadores y suscriptores | — |

### 7.7 Familias de servicios
| Familia | Tema | Ejemplos |
|---------|------|----------|
| **Conversacionales** | **4** | **Telefonía, videollamada** |
| **Acceso a la información** | **5** | **Web, correo, *streaming*** |
| **Transversales** | **3** | **DNS, directorio, seguridad** |

### 7.8 Bucle de abonado
| | Desagregación total | Compartición de espectro |
|--|---------------------|--------------------------|
| Par de cobre | **Completo para el alternativo** | **Compartido por dos operadores** |
| Cómo | El histórico deja de usarlo | **Bandas de frecuencia diferentes + splitter** |
| Reparto | Todo al alternativo | **Telefonía: histórico · Datos: alternativo** |

### 7.9 Fases y roles
| Fase | Rol con mayor implicación |
|------|---------------------------|
| Concepto, especificación | **Jefe de producto** |
| Diseño, desarrollo, test | **Ingeniero de producto** |
| Go-to-market, ciclo de vida | **Jefe de producto** |
| Todo el proceso | **Jefe de proyecto** |

---

# 8. Glosario de siglas y términos

| Sigla / término | Significado |
|-----------------|-------------|
| **CNMC** | Comisión Nacional de los Mercados y la Competencia |
| **DNS** | *Domain Name System* |
| **ETH / Ethernet** | Tecnología de enlace; usa **tramas** y **direcciones MAC** |
| **FTTH** | *Fiber To The Home* (fibra hasta el hogar) |
| **HTTP / HTTPS** | *Hypertext Transfer Protocol* / HTTP protegido |
| **IP** | *Internet Protocol* |
| **ISO** | *International Organization for Standardization* |
| **MAC** | Dirección de la capa de enlace (Ethernet) |
| **OSI** | *Open Systems Interconnection* — modelo de referencia de 7 capas (ISO) |
| **P2P** | *Peer-to-Peer* |
| **PDU** | *Protocol Data Unit* |
| **SDU** | *Service Data Unit* |
| **SIP** | *Session Initiation Protocol* |
| **SMTP** | *Simple Mail Transfer Protocol* |
| **TCP** | *Transmission Control Protocol* |
| **TCP/IP** | Arquitectura utilizada en Internet |
| **UDP** | *User Datagram Protocol* |
| **UTF-8** | Codificación de caracteres (ejemplo de capa de presentación) |
| **Servent** | Peer que actúa como cliente y servidor |
| **Splitter** | Dispositivo que separa bandas de frecuencia en un par de cobre |
| **Tópico** | Categoría asociada a la información publicada (publicación–suscripción) |
| **Go-to-market** | Lanzamiento comercial y operativo del producto |

---

# 9. Test de repaso

> Tapa la columna derecha y responde.

### Redes y problemas

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué son los sistemas telemáticos? | **Redes de comunicación**: conjunto de **terminales autónomos, interconectados y con capacidades de comunicación** |
| ¿Qué significa autónomo? ¿Y interconectado? | **Funcionan como sistemas independientes** / **pueden comunicarse entre sí** |
| ¿Qué es un host? | **Sistema final que genera o consume información** |
| ¿Qué es un nodo de conmutación? | **Elemento intermedio que hace avanzar la información** |
| ¿Qué es una línea de transmisión? | **Medio que permite transmitir información entre elementos de la red** |
| ¿Qué es la subred? | **Parte de la red que transporta la información entre los hosts** |
| ¿Por qué Internet es una "red de redes"? | **Interconecta muchas redes diferentes** |
| ¿Cuántos problemas debe resolver una red y cuáles? | **7**: errores, delimitación de tramas, control de flujo, encaminamiento, identificación de flujos, identificación de sesiones, representación de datos |
| ¿Ejemplo del control de flujo? | **A envía 100 fragmentos/s y B solo procesa 20** → se llenan las memorias intermedias |
| ¿Ejemplo de encaminamiento? | **A→N1→N2→N4→B** frente a **A→N1→N3→N4→B** |
| ¿Qué permite distinguir los flujos de un mismo host? | **Los puertos** |
| ¿Ejemplo de identificación de sesiones? | **Reanudar tras el capítulo 8** gracias al contexto de la sesión |
| ¿Ejemplo de representación de datos? | **Latino, griego, cirílico**: misma codificación en emisor y receptor |

### Capas y protocolos

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es un protocolo? | **Conjunto de reglas y convenciones a aplicar en una comunicación** |
| ¿Por qué no un único protocolo? | **Difícil de diseñar y modificar, poca reutilización, un cambio afecta a todo, complica la interoperabilidad** |
| ¿Capa usuaria y capa proveedora? | **La capa N+1 es usuaria del servicio de N; N es proveedora para N+1** |
| Protocolo / servicio / interfaz | **Reglas entre entidades paritarias** / **funcionalidad que ofrece una capa a la superior** / **mecanismo para acceder al servicio de la inferior** |
| ¿Qué es OSI y quién lo desarrolló? | **Modelo de referencia de 7 capas**, desarrollado en el marco de **ISO** |
| ¿Implica OSI 7 protocolos reales? | **No** |
| Capas OSI de arriba abajo | **Aplicación, Presentación, Sesión, Transporte, Red, Enlace, Física** |
| ¿Qué capa trata la representación (UTF-8)? | **Presentación** |
| ¿Qué capa mantiene el diálogo y los puntos de sincronización? | **Sesión** |
| ¿Qué capa usa puertos y control de flujo/congestión? | **Transporte** |
| ¿Qué capa hace direccionamiento lógico y encaminamiento? | **Red** |
| ¿Qué capa delimita tramas y detecta errores? | **Enlace** (Ethernet: tramas y direcciones MAC) |
| ¿Qué capa define cómo se transmiten bits? | **Física** |
| ¿En qué capa se centra la asignatura? | **Aplicación** (Temas 3, 4 y 5) |
| Ejemplos de la capa de aplicación | **HTTP, DNS, SMTP** (y SIP) |
| ¿Capas de TCP/IP? | **Aplicación, Transporte, Internet, Acceso a red** |
| ¿Qué capas OSI agrupa "Aplicación" de TCP/IP? | **Aplicación, Presentación y Sesión** |
| ¿Y "Acceso a red"? | **Enlace y Física** |
| Arquitectura de red / pila de protocolos | **Modelo de referencia + protocolos** / **especificación de los protocolos de una arquitectura** |
| Ejemplo de pila | **HTTP / TCP / IP / Ethernet** |
| Comunicación vertical / horizontal | **Entre capas adyacentes del mismo host** / **lógica entre entidades paritarias** |
| ¿Dónde viaja realmente la información? | **Por las capas inferiores** |
| ¿Qué es una SDU? ¿Y una PDU? | **Lo que la capa superior entrega** / **SDU + información de control (cabecera)** |
| ¿Qué es el encapsulamiento? | **Repetir "PDU de N = SDU de N−1" al bajar**; en recepción, el inverso |
| ¿Qué añade Ethernet que no añaden TCP e IP? | **Cola** (cabecera y cola) |

### Conexiones y modelos

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué identifica una IP? ¿Y un puerto? | **Al host** / **la comunicación o servicio dentro del host** |
| Extremo de una comunicación | **Dirección IP + puerto** |
| Puertos del ejemplo (HTTPS, DNS, SIP) | **443, 53, 5060** |
| Identificador de una conexión TCP | **(IP origen, puerto origen, IP destino, puerto destino)** |
| TCP frente a UDP | **Con conexión y estado** / **sin conexión, datagramas independientes** |
| Modelo cliente–servidor: ventaja e inconveniente | **Simplicidad y separación de funcionalidades** / **escalabilidad** |
| Ejemplos de cliente–servidor | **Web, correo, directorio** |
| ¿Qué es un peer (servent)? | **Participante que actúa como cliente y servidor** |
| P2P: consecuencia | **Distribuye recursos y carga pero aumenta la complejidad de coordinación, disponibilidad y seguridad** |
| ¿Puede un sistema combinar ambos? | **Sí** |
| ¿Qué es un agente móvil? | **Código que se desplaza a otro sistema y ejecuta allí parte de la tarea** |
| Ventajas de los agentes móviles | **Funciona con cliente desconectado, reduce tráfico, simplifica diseños, descarga proceso del cliente** |
| Publicación–suscripción | **Publicadores y suscriptores no se conocen; el middleware distribuye por tópicos** |
| Ejemplo de pub–sub | **Sensores publican alarmas; las aplicaciones suscritas las reciben** |

### Servicios

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es un servicio de red? | **Todo aquel que, para ser prestado, precisa de una red de comunicaciones** |
| Tres familias | **Conversacionales (Tema 4), acceso a la información (Tema 5), transversales (Tema 3)** |
| Ejemplos de cada una | **Telefonía/videollamada** · **web/correo/streaming** · **DNS/directorio/seguridad** |
| Clasificaciones adicionales | **Papel en la red, ancho de banda, medio de cobertura, tipo de información, movilidad, funcionalidad** |
| ¿Servicios portadores, finales/teleservicios y suplementarios? | **Clasificación según su papel en la red** |

### Regulación

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es la liberalización? | **Eliminar progresivamente restricciones para que distintos operadores compitan** |
| Cronología | **1988 terminales · 1991–1996 servicios · 1998 infraestructuras y numeración · 2000 bucle de abonado** |
| ¿Qué problema planteaba el bucle de abonado? | **Duplicar una infraestructura ya existente** para llegar a cada vivienda |
| Soluciones | **Desagregación total** y **compartición de espectro** |
| ¿Qué es el splitter? | **Separa las bandas de frecuencia** (telefonía para el histórico, datos para el alternativo) |
| ¿Acceso fijo actual en España? | **Principalmente fibra óptica (FTTH)** |
| ¿Sigue habiendo acceso mayorista con la fibra? | **Sí**, aunque **los mecanismos técnicos son distintos** |
| Efectos de la liberalización hoy | **Más operadores, interconexión, portabilidad numérica, servicio universal** |
| Marco actual | **Ley 11/2022, General de Telecomunicaciones**: libre competencia |
| ¿Qué es la CNMC? | **Supervisa los mercados de comunicaciones electrónicas**, analiza la competencia y puede imponer obligaciones |
| ¿Liberalización = ausencia de regulación? | **No** |

### Creación de servicios

| Pregunta | Respuesta |
|----------|-----------|
| ¿Criterios de diseño? | **Interoperación, público objetivo, funcionalidad, facilidad de uso, fiabilidad y duración, privacidad y seguridad, coste transparente, calidad del servicio** |
| Las 8 fases | **Concepto → especificación → viabilidad → diseño → desarrollo → test → go-to-market → ciclo de vida** |
| ¿Qué comprueba la viabilidad? | Que sea **técnica, económica y operativamente realizable** |
| ¿Qué es go-to-market? | **Lanzamiento comercial y operativo** |
| ¿Qué abarca el ciclo de vida? | **Operar, mantener, evolucionar y retirar o sustituir** |
| Rol y foco: jefe de proyecto / de producto / ingeniero de producto | **Gestión** / **producto y mercado** / **tecnología** |
| ¿Quién interviene más en diseño, desarrollo y test? | **Ingeniero de producto** |
| ¿Y en concepto, especificación, go-to-market y ciclo de vida? | **Jefe de producto** |
| ¿Qué otras áreas intervienen? | **Finanzas, ventas y gestión de clientes** |

### Verdadero o falso

| Afirmación | V/F |
|------------|-----|
| Una red solo debe transportar bits de un punto a otro | **F** |
| El modelo OSI implica que toda red real tiene siete protocolos independientes | **F** |
| Una capa es usuaria del servicio de la capa inferior | **V** |
| El protocolo se define entre capas adyacentes del mismo host | **F** (entre **entidades paritarias**) |
| La PDU de la capa N pasa a ser la SDU de la capa N−1 | **V** |
| En TCP/IP la capa de Internet corresponde a IP | **V** |
| UDP mantiene el estado de una conexión | **F** |
| Un servidor TCP se identifica solo por su puerto | **F** (la conexión se identifica por la **cuádrupla**) |
| En P2P un nodo puede ser cliente y servidor a la vez | **V** |
| En pub–sub los publicadores conocen a los suscriptores | **F** |
| DNS es un servicio conversacional | **F** (es **transversal**) |
| La web es un servicio de acceso a la información | **V** |
| La liberalización de terminales fue en 1988 | **V** |
| Con la desagregación total el histórico mantiene la telefonía | **F** (eso es la **compartición de espectro**) |
| El jefe de proyecto se implica a lo largo de todo el proceso | **V** |

---

*Esquema elaborado a partir de las diapositivas del **Tema 1 · Introducción a los servicios y redes de telecomunicación** de Sistemas Telemáticos (Prof. Óscar Adamuz Hinojosa, Dpto. de Teoría de la Señal, Telemática y Comunicaciones, UGR, curso 2026–2027). Las secciones marcadas como "Ampliación" son material de apoyo propio. Material de estudio personal.*
