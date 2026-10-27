# Sistemas Telemáticos — Tema 3: Servicios transversales

**Prof. Óscar Adamuz Hinojosa · Grado en Ingeniería de Tecnologías de Telecomunicación · Universidad de Granada · Curso 2026–2027**

> **Qué es este documento:** esquema completo del Tema 3 (50 diapositivas "lógicas", 77 páginas con las animaciones), ordenado como el tema: **concepto → directorios → DNS → seguridad**. Cada concepto se explica una sola vez y al final hay cuadros comparativos, un glosario y un test.
>
> **Marcas:**
> - **BÁSICO / COMPL.** — es la etiqueta que el profesor pone a cada diapositiva. **BÁSICO** = núcleo del tema; **COMPL.** = complementario (menos prioritario, pero forma parte del temario y puede caer en preguntas de comprensión).
> - Lo que no lleva marca es contenido **de las diapositivas**.
> - > **Ampliación:** explicación **añadida** por mí (no está en las diapositivas).
> - **(n/50)** = número de diapositiva.

---

## Índice

0. [Qué vamos a aprender](#0-qué-vamos-a-aprender)
1. [Concepto de servicio transversal](#1-concepto-de-servicio-transversal)
2. [Servicios de directorio (X.500 y LDAP)](#2-servicios-de-directorio-x500-y-ldap)
3. [El servicio DNS](#3-el-servicio-dns)
4. [Servicios de seguridad](#4-servicios-de-seguridad)
5. [Qué debe quedar claro (resumen oficial)](#5-qué-debe-quedar-claro-resumen-oficial)
6. [Cuadros comparativos](#6-cuadros-comparativos)
7. [Glosario de siglas](#7-glosario-de-siglas)
8. [Referencias normativas citadas](#8-referencias-normativas-citadas)
9. [Test de repaso](#9-test-de-repaso)

---

## 0. Qué vamos a aprender

El tema responde a **tres preguntas guía**:

| # | Pregunta | Bloque |
|---|----------|--------|
| 1 | **¿Dónde está la información que necesito?** | **Directorios** — organizar y consultar información sobre usuarios, equipos y otros recursos |
| 2 | **¿Cómo localizo un servicio a partir de su nombre?** | **DNS** — organización de los nombres de dominio y obtención de la información para localizar servicios en Internet |
| 3 | **¿Cómo protejo la comunicación?** | **Seguridad** — qué problemas pueden aparecer y qué servicios y mecanismos se usan |

**Índice del tema:** 1 Concepto de servicio transversal · 2 Servicios de directorio · 3 El servicio DNS · 4 Servicios de seguridad.

---

## 1. Concepto de servicio transversal

### 1.1 Antes de usar un servicio… (3/50)

Para acceder a una web, enviar un correo o iniciar una llamada IP, hacen falta **otras funciones antes o durante el servicio**:

```
                    ┌──────────────────────────────┐
                    │        SERVICIO DE RED       │
                    │   web · correo · telefonía   │
                    └───────┬──────────┬───────────┘
                            │          │          │
              ┌─────────────▼─┐ ┌──────▼────────┐ ┌▼──────────────────┐
              │ Resolver un   │ │  Localizar    │ │ Proteger la       │
              │ nombre        │ │  información  │ │ comunicación      │
              │     DNS       │ │  directorio   │ │   seguridad       │
              └───────────────┘ └───────────────┘ └───────────────────┘
```

> **Idea clave:** muchos servicios de red **necesitan apoyarse en otros servicios** que **resuelven nombres, localizan información o aportan seguridad**.

### 1.2 ¿Qué es un servicio transversal? (4/50)

> **Definición.** Un **servicio transversal** es un **servicio de apoyo** que puede ser utilizado **por múltiples servicios de red** para proporcionarles determinadas funcionalidades.
> **No constituye, en general, un servicio final** ofrecido directamente al usuario, **aunque sus protocolos y funciones se sitúan en la capa de aplicación**.

| Servicio transversal | Qué hace |
|----------------------|----------|
| **Directorios** | **Organizan y permiten consultar información** sobre usuarios, sistemas y recursos de una red o sistema de comunicaciones |
| **Resolución de nombres (DNS)** | Su utilidad principal es **traducir un nombre de dominio a una dirección IP**; también puede proporcionar **información sobre servidores y servicios** |
| **Seguridad** | Proporciona **servicios y mecanismos de seguridad** para proteger **las comunicaciones, los sistemas y los recursos** |

---

---

## 2. Servicios de directorio (X.500 y LDAP)

> Todo este bloque está marcado **COMPL.** en las diapositivas.

### 2.1 ¿Qué problema resuelve un directorio? (5/50)

Una red puede tener **muchos usuarios, terminales, servidores y otros recursos**. ¿Cómo se **organiza, localiza y consulta** esa información **de forma uniforme**?

| Necesidad | |
|-----------|---|
| **Estructurar** la información | |
| **Consultarla mediante un protocolo común** | |
| **Permitir el acceso desde distintas aplicaciones** | |

> **Servicio de directorio:** servicio que mantiene **información estructurada** sobre **usuarios, terminales, servidores y otros recursos** de una red, **optimizada principalmente para su consulta** y **susceptible de distribuirse entre distintos servidores**.

### 2.2 De una lista local a un servicio de directorio (6/50)

| Si toda la información estuviera en una única lista… | Cuando la red crece, hace falta un servicio que permita… |
|------------------------------------------------------|----------------------------------------------------------|
| Funcionaría **para pocos usuarios y recursos** | **Organizar la información de forma común** |
| **Una sola aplicación** podría consultarla directamente | **Consultarla mediante un protocolo** |
| **Todos dependerían del mismo punto** donde se almacena | Permitir que **distintas aplicaciones** la utilicen |
| | **Repartirla entre varios servidores** |

> **X.500** es un **modelo de referencia** para construir este tipo de **servicio de directorio distribuido**, organizando además la información **de forma jerárquica**. Está **estandarizado por la ITU-T** (Recomendación **ITU-T X.500**).

### 2.3 X.500: arquitectura básica (7/50)

```
              Usuario
                 │
                DUA                         DUA = Directory User Agent
                 │ DAP                      DSA = Directory System Agent
                DSA ─── DSP ───► DSA        DAP = Directory Access Protocol
                 │ DSP           │ DSP      DSP = Directory System Protocol
                DSA ◄── DSP ───  DSA
                     (directorio distribuido entre varios DSA)
```

| Elemento | Qué es |
|----------|--------|
| **DUA** (*Directory User Agent*) | Componente **mediante el que el usuario o una aplicación accede al directorio** |
| **DSA** (*Directory System Agent*) | **Servidor** que **almacena y gestiona una parte** de la información del directorio |

| Protocolo | Entre quién |
|-----------|-------------|
| **DAP** (*Directory Access Protocol*) | **Un DUA y un DSA** (acceso del cliente) |
| **DSP** (*Directory System Protocol*) | **Distintos DSA** entre sí (comunicación entre servidores) |

- El directorio **puede estar distribuido entre varios DSA** y **el usuario accede a él a través de un DUA**.
- Especificación de los protocolos del directorio: **ITU-T X.519**.

### 2.4 Cómo se organiza la información: el DIT (8/50)

- Los DSA almacenan y gestionan la información; **X.500 la organiza lógicamente** mediante una **estructura jerárquica** llamada **DIT**.

> **DIT** (*Directory Information Tree*): **estructura jerárquica** en la que se organiza la información del directorio.
> **Entradas:** **cada nodo del árbol es una entrada** que representa **un objeto** (organización, unidad, persona, equipo…). **Cada entrada se describe mediante atributos.**

**Ejemplo (red universitaria como la UGR):**

```
                      c=ES                     (country)
                        │
                      o=UGR                    (organization)
                        │
                    ou=ETSIIT                  (organizational unit)
                   /          \
         ou=Personas          ou=Equipos
              │                    │
      cn=Profesor ST        cn=Servidor Web    (entradas hoja)
```

> **El DIT proporciona una visión lógica única del directorio**, aunque **sus distintas partes pueden estar almacenadas y gestionadas por DSA diferentes**.

### 2.5 RDN y DN: cómo identificamos una entrada (9/50)

| Concepto | Definición | Ejemplo |
|----------|-----------|---------|
| **RDN** (*Relative Distinguished Name*) | Nombre que **distingue una entrada de las demás que dependen del mismo nodo padre**. Es una expresión **`atributo=valor`** | `cn=Profesor ST` |
| **DN** (*Distinguished Name*) | **Nombre completo** que **identifica de forma única** esa entrada **dentro del DIT**. Se obtiene **combinando los RDN de todo su camino jerárquico** | `cn=Profesor ST, ou=Personas, ou=ETSIIT, o=UGR, c=ES` |

> **Notación textual habitual:** el DN se escribe **desde la entrada más específica hacia los niveles superiores** del directorio (de la hoja a la raíz).

```
Camino:    c=ES → o=UGR → ou=ETSIIT → ou=Personas → cn=Profesor ST
DN:        cn=Profesor ST, ou=Personas, ou=ETSIIT, o=UGR, c=ES
           └── RDN ──┘
```

### 2.6 Tipos de entrada (10/50)

| Tipo | Qué es | Ejemplo |
|------|--------|---------|
| **Objeto** | **Representa una entidad** del directorio (persona, organización, equipo, recurso). **Se describe mediante atributos** | `cn=Profesor ST` |
| **Alias** | Proporciona **un nombre alternativo** para acceder a **otra entrada**. **Referencia el DN de un objeto o de otro alias** | `cn=Profesor Redes` → apunta al DN de `cn=Profesor ST` |
| **Subentrada** | Contiene **información administrativa** utilizada para **gestionar una parte del directorio**. **No representa directamente una entidad final** | Subentrada asociada a `ou=Personas`, con información administrativa aplicable a ese subárbol |

### 2.7 Atributos habituales (11/50)

Cada entrada se describe mediante **atributos**. Algunos sirven para construir **RDN y DN**; otros describen información adicional.

**Atributos frecuentes en el nombrado:**

| Atributo | Nombre | Significado |
|----------|--------|-------------|
| **`c`** | countryName | País |
| **`o`** | organizationName | Organización |
| **`ou`** | organizationalUnitName | Unidad organizativa |
| **`cn`** | commonName | Nombre común |
| **`dc`** | domainComponent | Componente de un nombre de dominio |
| **`l`** | localityName | Localidad |

**Otros atributos descriptivos:**

| Atributo | Significado |
|----------|-------------|
| **`sn`** | surname — apellido |
| **`givenName`** | nombre de pila |
| **`uid`** | identificador de usuario |
| **`mail`** | dirección de correo electrónico |
| **`telephoneNumber`** | número de teléfono |
| **`postalCode`** | código postal |

> Los tipos de atributo de los directorios X.500 los especifica la Recomendación **ITU-T X.520**.

### 2.8 Tipos de atributos en X.500 (12/50)

Además de por **la información que contienen**, X.500 clasifica los atributos **según cómo se utilizan y gestionan**:

| Tipo | Qué son | Ejemplos |
|------|---------|----------|
| **Atributos de usuario** | Información asociada a los **objetos**; **pueden ser proporcionados o modificados por los usuarios con los permisos adecuados** | `cn=Profesor ST`, `mail=profesor@ugr.es` |
| **Atributos operacionales** | **Mantenidos por el propio sistema de directorio** para **controlar y gestionar su funcionamiento** | `createTimestamp` (fecha y hora de creación), `modifyTimestamp` (fecha y hora de la última modificación) |
| **Atributos colectivos** | Permiten **asociar una misma información a varias entradas de un subárbol sin repetirla en cada una** | `collectivePostalAddress`: una dirección postal común puede aplicarse a un conjunto de entradas mediante una **subentrada** |

> **Los operacionales describen el funcionamiento del directorio; los colectivos permiten compartir información entre varias entradas.**

> **Conexión con la P2 (Ampliación):** en `ldapsearch`, pedir el atributo **`+`** devuelve los **atributos operacionales**.

### 2.9 Operaciones sobre el directorio X.500 (13/50)

| Consulta | Modificación |
|----------|--------------|
| **Leer** una entrada a partir de su DN | **Añadir** una nueva entrada |
| **Comparar** el valor de un atributo con un valor dado | **Borrar** una entrada existente |
| **Listar** las entradas **subordinadas directamente** a una entrada | **Modificar los atributos** de una entrada |
| **Buscar** entradas que cumplan un criterio **dentro de una parte del DIT** | **Modificar su RDN** (cambia su nombre relativo en el directorio) |

*Ejemplo del tema:* una aplicación podría **buscar todas las entradas bajo `ou=Personas`** cuyo atributo `ou` o `cn` cumpla un criterio, o **modificar un atributo** de una entrada concreta.

### 2.10 Distribución de la información del directorio (14/50)

```
        DSA 1 ┄┄┄┄ [ c=ES ─ o=UGR ─ ou=ETSIIT ]
                           /                \
   DSA 2 ┄ [ ou=Personas ]              [ ou=Equipos ] ┄ DSA 3
                │                              │
         cn=Profesor ST                  cn=Servidor Web
   (las líneas discontinuas delimitan contextos de nombramiento)
```

| Concepto | Definición |
|----------|-----------|
| **Contexto de nombramiento** | **Parte del DIT** formada por un **subárbol** cuya información **se administra conjuntamente por un DSA**. En el ejemplo, el subárbol que empieza en `ou=Personas` es un contexto |
| **Prefijo de contexto** | **El DN de la entrada raíz de ese contexto**. Para Personas: `ou=Personas, ou=ETSIIT, o=UGR, c=ES` |
| **DSA subordinado** | Si **un contexto comienza por debajo de una entrada gestionada por otro DSA**, el DSA que gestiona ese nuevo contexto es **subordinado** respecto al que gestiona el contexto superior. Aquí **DSA 2 y DSA 3 son subordinados de DSA 1** |

- En el dibujo hay **un contexto por DSA** para simplificar, **pero un mismo DSA puede administrar varios contextos**.

### 2.11 Dominios de gestión y referencias entre DSA (15/50)

| Concepto | Definición |
|----------|-----------|
| **ADMD** (*Administrative Management Domain*) | Agrupa **los contextos de nombramiento administrados dentro de un mismo ámbito de gestión**. Un mismo DSA puede administrar **uno o varios** contextos de ese dominio (ej.: DSA 1 administra el Contexto A y el B, ambos del mismo ADMD) |
| **Referencias entre DSA** | Para localizar información distribuida, **un DSA puede remitir una consulta a otro DSA** |

| Tipo de referencia | Qué indica | Ejemplo del tema |
|--------------------|-----------|------------------|
| **Referencia subordinada inmediata** | **Qué DSA gestiona un contexto subordinado** | Si DSA 1 recibe una consulta sobre `ou=Personas` → hacia **DSA 2**; si afecta a `ou=Equipos` → hacia **DSA 3** |
| **Referencia superior** | Permite **dirigir la consulta hacia un DSA situado por encima en la jerarquía** | Si **DSA 2** necesita continuar **fuera de su contexto** → hacia **DSA 1** |

> **Conexión con la P2 (apartado opcional):** esas son las "referencias subordinadas inmediatas" y la "referencia superior" que había que configurar en OpenLDAP para una BD distribuida.

### 2.12 Proceso de una consulta en un directorio distribuido (16/50)

**Objetivo:** localizar `cn=Profesor ST, ou=Personas, ou=ETSIIT, o=UGR, c=ES`.
**Reparto:** **DSA 1** gestiona `ou=ETSIIT`; **DSA 2** gestiona `ou=Personas`; **DSA 3** gestiona `ou=Equipos`.

```
 DUA            DSA 1              DSA 2              DSA 3
  │──DAP consulta─►│                  │                  │
  │         (analiza el DN,           │                  │
  │          reconoce el prefijo      │                  │
  │          ou=Personas)             │                  │
  │                │──DSP petición───►│                  │
  │                │  (ref. subordinada)                 │
  │                │           (localiza                  │
  │                │          cn=Profesor ST)            │
  │                │◄─DSP resultado───│                  │
  │◄──DAP respuesta│                  │                  │
```

| Paso | Qué ocurre |
|------|-----------|
| **1. El DUA inicia la consulta** | Envía a **DSA 1** una petición para localizar el DN. **DUA↔DSA usa DAP** |
| **2. DSA 1 analiza el DN** | **No almacena directamente la entrada**; al analizar el DN **identifica el prefijo `ou=Personas`** y sabe que corresponde a **un contexto subordinado** |
| **3. La petición continúa** | Por su **referencia subordinada inmediata**, DSA 1 sabe que ese contexto lo gestiona **DSA 2**; **transfiere la petición mediante DSP** |
| **4. El DSA responsable responde** | **DSA 2 gestiona `ou=Personas`**, así que puede **localizar dentro de él** la entrada `cn=Profesor ST` |
| **5. Se devuelve el resultado** | **DSA 2 devuelve a DSA 1** el resultado de la operación (**DSP**) |
| **6. El DUA recibe la respuesta** | **DSA 1 devuelve el resultado al DUA mediante DAP**. **El usuario no necesita saber qué DSA almacenaba realmente la entrada** |

> **Ampliación:** en este ejemplo DSA 1 **reenvía por sí mismo** la petición (así lo muestra el tema). En directorios reales también es posible que el servidor devuelva al cliente una *referencia* y sea el cliente quien contacte con el otro servidor; las diapositivas solo desarrollan el primer caso.

### 2.13 De X.500 a LDAP (17/50)

> **LDAP** (*Lightweight Directory Access Protocol*): mecanismo **más ligero** para acceder a servicios de directorio **basados en los modelos de información y servicio de X.500**.

| X.500 | LDAP |
|-------|------|
| Define **el modelo completo** del directorio: estructura jerárquica, **DUA, DSA**, distribución y protocolos **DAP y DSP** | **Adopta muchos de esos conceptos** pero usa **un protocolo de acceso más sencillo**, orientado a entornos **TCP/IP** |

| Transporte de LDAP | |
|--------------------|--|
| Modelo | **Cliente–servidor** |
| Mensajes | Se transportan habitualmente **sobre TCP** |
| Puerto habitual | **TCP 389** |
| Especificación | **RFC 4511** — *Lightweight Directory Access Protocol (LDAP): The Protocol* |

**Aplicaciones habituales:** directorios de organizaciones · gestión de usuarios e identidades · **autenticación centralizada** · soluciones como **OpenLDAP** y **Microsoft Active Directory**.
**En la asignatura:** LDAP se estudia y se usa **de forma práctica en la Práctica 2**.

### 2.14 Operaciones básicas en LDAP (18/50)

| Grupo | Operación | Qué hace |
|-------|-----------|----------|
| **Acceso y consulta** | **`bind`** | **Establece la sesión** y **permite autenticar al cliente** |
| | **`search`** | **Busca entradas** que cumplan un criterio |
| | **`compare`** | Comprueba si **un atributo de una entrada contiene un valor** |
| **Modificación** | **`add`** | **Añade** una nueva entrada |
| | **`modify`** | **Modifica los atributos** de una entrada existente |
| | **`delete`** | **Elimina** una entrada |
| | **`modifyDN`** | **Modifica el nombre** de una entrada |

**Ejemplo de `search` con `ldapsearch`** (buscar en `ou=Personas` la entrada cuyo `cn` sea Profesor ST):

```bash
ldapsearch -x -H ldap://servidor:389 -b ou=Personas,ou=ETSIIT,o=UGR,c=ES '(cn=Profesor ST)'
```

| Parte | Significado |
|-------|-------------|
| **`-x`** | **Autenticación simple** en lugar de SASL |
| **`-H`** | **URI del servidor LDAP** (`ldap://servidor:389`) |
| **`-b`** | **DN base** desde el que comienza la búsqueda |
| **`(cn=Profesor ST)`** | **Filtro LDAP**: solo se devuelven las entradas cuyo atributo `cn` tenga ese valor |

**Correspondencia X.500 ↔ LDAP (Ampliación, a partir de las dos listas del tema):**

| X.500 | LDAP |
|-------|------|
| Leer / Buscar / Listar | `search` |
| Comparar | `compare` |
| Añadir / Borrar / Modificar atributos | `add` / `delete` / `modify` |
| Modificar el RDN | `modifyDN` |
| *(sesión y autenticación)* | `bind` |

---

---

## 3. El servicio DNS

> Todo este bloque está marcado **BÁSICO**.

### 3.1 El problema: usamos nombres, la red usa direcciones (19/50)

Para acceder a `www.ugr.es`, ¿cómo sabe nuestro equipo **a qué IP enviar los paquetes**?

```
   www.ugr.es  ──(DNS: resolución de nombres)──►  dirección IP
```

> **DNS** (*Domain Name System*): **sistema distribuido de resolución de nombres** que permite obtener **información asociada a un nombre de dominio**, como **la dirección IP** necesaria para localizar un equipo o servicio.

### 3.2 ¿Por qué no un DNS centralizado? (20/50)

| Problema de una base de datos central | Explicación |
|---------------------------------------|-------------|
| **Cuello de botella** | Un único sistema tendría que **atender las consultas de todos los usuarios y servicios de Internet** |
| **Punto único de fallo** | **Una avería o ataque** sobre el sistema central podría **impedir la resolución de nombres a escala global** |
| **Gestión y escalabilidad** | **Un único responsable** tendría que mantener y actualizar **todos los nombres y asociaciones**, **dificultando enormemente su administración** |

> **Solución de DNS:** **distribuir la información y su administración** mediante **un espacio de nombres jerárquico** y **un mecanismo de delegación de autoridad**.

### 3.3 Espacio de nombres: jerarquía y FQDN (21/50)

```
                    .                    ← Raíz
          ┌─────────┼─────────┐
         es        com       org         ← TLD
          │
         ugr                              ← 2.º nivel
          │
         tstc                             ← Subdominio
          │
         www                              ← Host
```

| Concepto | Definición | Ejemplo |
|----------|-----------|---------|
| **Dominio** | **Parte del espacio de nombres situada bajo un nodo determinado** del árbol | `ugr.es` |
| **Subdominio** | **Dominio contenido jerárquicamente dentro de otro dominio** | `tstc.ugr.es` |
| **FQDN** (*Fully Qualified Domain Name*) | **Identifica completamente la posición de un nombre desde el nodo correspondiente hasta la raíz `.`** | `www.tstc.ugr.es.` |

> **Ampliación:** el **punto final** del FQDN representa la **raíz**; es el mismo "punto final" que obligaba a escribir los nombres completos en los ficheros de zona de la Práctica 3.

### 3.4 Delegación, dominio y zona (22/50)

| Concepto | Definición |
|----------|-----------|
| **Dominio** | **Nodo** del espacio de nombres **y todos los nombres que dependen de él** |
| **Delegación** | El responsable de un dominio **confía un subdominio a otros servidores autoritativos** |
| **Zona** | **Conjunto de nombres administrados como una unidad** y **servidos por los mismos servidores autoritativos** |

```
        Zona autoritativa de ugr.es
   ┌┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐
   ┆               ugr.es                 ┆
   ┆             /        \               ┆
   ┆   etsiit.ugr.es    ╔═══════════════╗ ┆
   ┆         │          ║ tstc.ugr.es   ║◄┼── subdominio delegado
   ┆ www.etsiit.ugr.es  ║ www.tstc...   ║ ┆   = ZONA DELEGADA: tstc.ugr.es
   └┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╚═══════════════╝┄┘
```

> **Idea clave:** `tstc.ugr.es` **sigue perteneciendo al dominio `ugr.es`**, pero **al delegarse pasa a formar una zona distinta**.
> **Dominio ≠ zona:** el dominio incluye **todo lo que cuelga** de un nodo; la zona **solo lo administrado como una unidad** (sin lo delegado).

### 3.5 Servidores autoritativos de una zona (23/50)

| Concepto | Definición |
|----------|-----------|
| **Servidor autoritativo** | Servidor que **dispone de los datos de una zona para la que tiene autoridad** y **responde autoritativamente** a las consultas sobre esa información |
| **Primario** | **Actúa como fuente de los datos de la zona** |
| **Secundario** | **Obtiene una copia de los datos del primario y la mantiene sincronizada** |
| **Transferencia de zona** | **Proceso de copia y actualización** del secundario |

> **Importante:** **primario y secundario son ambos servidores autoritativos.** **La diferencia no está en la autoridad, sino en cómo obtienen los datos** de la zona.

> **Conexión con la P3 (Ampliación):** en BIND9 el primario es `type master` (datos en un fichero local). Cuando los dos equipos de la práctica actuaban como primario de zona y de subzona, ambos eran autoritativos de **su** zona.

### 3.6 Consulta recursiva vs. resolución iterativa (24/50)

| | **Consulta recursiva** | **Resolución iterativa** |
|--|------------------------|--------------------------|
| **El cliente pide…** | *"Obtén tú la respuesta final y devuélvemela."* | *"Dame la mejor información que tengas."* |
| **Qué hace el servidor** | Si **ofrece recursión**, **resuelve por el cliente** y devuelve **una respuesta final o un error, no una referencia** | Si **no conoce la respuesta final**, **puede devolver una referencia a otro servidor** |
| **Quién sigue la cadena** | **El servidor** | **El cliente sigue esa referencia** y hace **una nueva consulta** |

> **Caso habitual en Internet:** el **PC** usa un **stub resolver** para hacer una **consulta recursiva** a un **resolver recursivo**; este obtiene la respuesta **siguiendo la jerarquía DNS mediante resolución iterativa**.
> Referencia: **RFC 9499** (*DNS Terminology*).

### 3.7 Resolución iterativa paso a paso (25/50)

**Actores:** PC usuario con **resolver iterativo local** · **Raíz** (`.`) · **TLD** (`.es`) · **Autoritativo** de `ugr.es`.

```
 resolver                Raíz            TLD .es          Autoritativo ugr.es
    │──www.ugr.es?──────►│                  │                      │
    │◄─referencia a .es──│                  │                      │
    │──www.ugr.es?──────────────────────────►│                      │
    │◄─────────────referencia a ugr.es───────│                      │
    │──www.ugr.es?─────────────────────────────────────────────────►│
    │◄─────────────────────────────registros DNS────────────────────│
```

| Paso | Qué ocurre |
|------|-----------|
| **1** | El resolver **consulta a un servidor raíz** |
| **2** | La raíz **no conoce la respuesta final** y devuelve **una referencia a `.es`** |
| **3** | **El mismo resolver** consulta ahora **a un servidor del TLD `.es`** |
| **4** | `.es` devuelve **una referencia a los servidores autoritativos de `ugr.es`** |
| **5** | El resolver **consulta a un servidor autoritativo de `ugr.es`** |
| **6** | El autoritativo **devuelve los registros DNS solicitados** (p. ej. la IP) |

> **Idea clave:** **el resolver recibe una referencia, la sigue y realiza una nueva consulta por sí mismo.**
> **Raíz DNS:** existen **13 autoridades identificadas A–M**, servidas mediante **cientos de servidores distribuidos** (IANA: *Root Name Servers*).

### 3.8 Resolución recursiva paso a paso (26/50)

**Actores:** **PC usuario (stub)** · **Resolver recursivo** · Raíz · TLD · Autoritativo.

```
 PC (stub)     Resolver recursivo        Raíz       TLD .es     Autoritativo
    │──www.ugr.es?──►│                    │            │            │
    │                │──www.ugr.es?──────►│            │            │
    │                │◄─ref. a .es────────│            │            │
    │                │──www.ugr.es?───────────────────►│            │
    │                │◄─ref. a ugr.es──────────────────│            │
    │                │──www.ugr.es?──────────────────────────────────►│
    │                │◄─registros DNS─────────────────────────────────│
    │◄─respuesta final│
```

| Paso | Qué ocurre |
|------|-----------|
| **1** | El **PC pregunta al resolver** por `www.ugr.es` y **solicita resolución recursiva** |
| **2** | El resolver **consulta a la raíz**, que le devuelve **una referencia a `.es`** |
| **3** | Consulta a `.es` y recibe **una referencia a los autoritativos de `ugr.es`** |
| **4** | Consulta al **autoritativo de `ugr.es`** y **obtiene los registros** |
| **5** | **Devuelve al PC la respuesta final.** **El PC no ha tenido que seguir ninguna referencia** |

> **Idea clave:** **la consulta PC → resolver es recursiva; el resolver obtiene la respuesta siguiendo internamente las referencias de la jerarquía.**

| | Iterativa (3.7) | Recursiva (3.8) |
|--|-----------------|-----------------|
| Quién habla con raíz, TLD y autoritativo | **El propio resolver** (local) | **El resolver recursivo** |
| Qué recibe el PC | — (el resolver es local) | **La respuesta final** |
| Referencias | Las sigue **el resolver** | Las sigue **el resolver recursivo**, no el PC |

### 3.9 Caché DNS (27/50, 28/50, 29/50)

En los ejemplos anteriores se suponía **que no había información válida en caché**. En la práctica **los resultados de resoluciones anteriores se almacenan temporalmente y se reutilizan**.

| Dónde hay caché | |
|-----------------|--|
| **PC / aplicación / sistema** | Puede mantener caché |
| **Resolver DNS** | Mantiene normalmente **una caché compartida** |
| **Servidores autoritativos (raíz, TLD, zonas)** | Tienen los **datos bajo su autoridad** |

| ¿Qué puede almacenarse? | ¿Durante cuánto tiempo? |
|-------------------------|------------------------|
| **La respuesta final** y **la información que permita acortar resoluciones posteriores** | **No indefinidamente**: su validez la determina un **TTL** (*Time To Live*) |

**Caso A — respuesta final en caché (28/50):**
- El resolver **ya obtuvo antes la respuesta** de `www.ugr.es` y **sigue siendo válida** → **responde directamente al PC**.
- **No consulta a la raíz, ni al TLD `.es`, ni al autoritativo de `ugr.es`.**
- **Idea clave:** si la respuesta final sigue válida en caché, **se evita por completo una nueva resolución** a través de la jerarquía.

**Caso B — información intermedia en caché (29/50):**
- El resolver **no conoce todavía la respuesta** de `www.ugr.es`, **pero conserva información válida para localizar los autoritativos de `ugr.es`**.
- **Puede saltarse la raíz y el TLD `.es`** y **consultar directamente al autoritativo**.
- **Idea clave:** la información intermedia **no evita necesariamente toda la resolución, pero puede eliminar parte del recorrido**.

> **Conexión con la P3 / Tarea 4 (Ampliación):** por eso, al **reiniciar el servidor primario** (se vacía la caché) la consulta al contenido del delegado volvía a hacer **el mismo recorrido**.

### 3.10 De la caché a los Resource Records (30/50)

DNS representa la información mediante **Resource Records (RR)** o **registros de recursos**.

```
        NAME             TTL   CLASS  TYPE   RDATA
 web.aula.ugr.es.        3600   IN     A     192.0.2.20
```

| Campo | Significado |
|-------|-------------|
| **NAME** | **Nombre al que pertenece** el registro |
| **TTL** | **Tiempo, en segundos, durante el cual el registro puede mantenerse en caché** |
| **CLASS** | **Familia de protocolos**; en Internet normalmente **`IN`** |
| **TYPE** | **Qué tipo de información** contiene |
| **RDATA** | **Valor asociado**; **su formato depende del TYPE** |

- **Conexión con la caché:** el resolver usa el **TTL** para saber **hasta cuándo** puede reutilizar un registro.
- En el mensaje DNS binario aparece además **RDLENGTH**: campo de **16 bits** que indica la **longitud, en bytes, de RDATA**.

### 3.11 Tipos de Resource Records

**(I) Nombres y direcciones (31/50)** — el campo **TYPE** determina cómo interpretar **RDATA**.

| Tipo | Qué hace | Ejemplo |
|------|----------|---------|
| **A** | Asocia un nombre con una **dirección IPv4** | `web.aula.ugr.es. 3600 IN A 192.0.2.20` |
| **AAAA** | Asocia un nombre con una **dirección IPv6** | `web.aula.ugr.es. 3600 IN AAAA 2001:db8::20` |
| **CNAME** | Define un **alias** cuyo valor es **otro nombre DNS** | `www.aula.ugr.es. 600 IN CNAME web.aula.ugr.es.` |
| **PTR** | Asocia una **dirección con un nombre**; se usa habitualmente en la **resolución inversa** | `20.2.0.192.in-addr.arpa. IN PTR web.aula.ugr.es.` |

> **Un nombre puede tener varias direcciones:** pueden existir **varios registros A o AAAA para el mismo nombre**, por ejemplo para **varios servidores** y contribuir a **la redundancia o al reparto de carga**.

> **Ampliación (PTR):** la IP `192.0.2.20` se escribe **al revés** (`20.2.0.192`) y se le añade **`in-addr.arpa.`**; así la resolución inversa también aprovecha la jerarquía de delegación.

**(II) Autoridad y servicios (32/50)**

| Tipo | Qué hace | Ejemplo |
|------|----------|---------|
| **NS** | Identifica **un servidor autoritativo para una zona** | `aula.ugr.es. 3600 IN NS ns1.aula.ugr.es.` |
| **MX** | Indica **qué servidor recibe el correo** | `3600 IN MX 10 mail1.aula.ugr.es.` · `3600 IN MX 20 mail2.aula.ugr.es.` |
| **SRV** | Permite **localizar un servicio, su servidor y puerto** | `300 IN SRV 10 70 5060 voip1.aula.ugr.es.` · `300 IN SRV 10 30 5060 voip2.aula.ugr.es.` · `300 IN SRV 20 0 5060 voip3.aula.ugr.es.` |
| **SOA** | Contiene **información de control de la zona**: **servidor principal, versión y temporizadores** | (ver 3.12) |

**MX — preferencia:** **menor valor ⇒ se intenta primero**. `mail1` (10) **antes** que `mail2` (20).

**SRV — prioridad, peso y puerto** (RFC 2782):

| Campo | Significado |
|-------|-------------|
| **Prioridad** | **Decide qué grupo se usa primero.** **Menor valor ⇒ mayor prioridad** |
| **Peso** | **Reparte las peticiones dentro del mismo grupo de prioridad** |
| **Puerto** | **Dónde se ofrece el servicio** (aquí **5060**) |

En el ejemplo: **`voip1` y `voip2`** (prioridad **10**, el grupo preferido) se reparten **≈ 70 / 30**; **`voip3`** (prioridad **20**) solo entra **después**.

```
 _sip._udp.aula.ugr.es.   SRV   prioridad  peso  puerto  destino
                                   10       70    5060   voip1.aula.ugr.es.   ─┐ grupo 10
                                   10       30    5060   voip2.aula.ugr.es.   ─┘ (70/30)
                                   20        0    5060   voip3.aula.ugr.es.      grupo 20 (respaldo)
```

### 3.12 Zona DNS y registro SOA (33/50)

**Zona didáctica `aula.ugr.es`:**

```dns
aula.ugr.es. 3600 IN SOA ns1.aula.ugr.es. admin.aula.ugr.es. (
                      2026091801 ; Serial
                      7200       ; Refresh
                      1800       ; Retry
                      1209600    ; Expire
                      300 )      ; Negative cache TTL
aula.ugr.es.           3600 IN NS    ns1.aula.ugr.es.
aula.ugr.es.           3600 IN NS    ns2.aula.ugr.es.
aula.ugr.es.           3600 IN MX    10 mail.aula.ugr.es.
_sip._udp.aula.ugr.es.  300 IN SRV   10 5 5060 voip.aula.ugr.es.
www.aula.ugr.es.        600 IN CNAME web.aula.ugr.es.
ns1.aula.ugr.es.       3600 IN A     192.0.2.53
ns2.aula.ugr.es.       3600 IN A     192.0.2.54
web.aula.ugr.es.       3600 IN A     192.0.2.20
web.aula.ugr.es.       3600 IN AAAA  2001:db8::20
mail.aula.ugr.es.      3600 IN A     192.0.2.30
voip.aula.ugr.es.      3600 IN A     192.0.2.40
```

| Campo del SOA | Valor | Significado |
|---------------|-------|-------------|
| **MNAME** | `ns1.aula.ugr.es.` | **Servidor principal** de la zona |
| **RNAME** | `admin.aula.ugr.es.` | **Contacto administrativo** |
| **SERIAL** | `2026091801` | **Número de versión de la zona**. Convención habitual **`YYYYMMDDnn`**: `2026091801` ⇒ **18/09/2026, versión 01** |
| **REFRESH** | `7200` s | Cada cuánto **comprueba el secundario** si hay una nueva versión (compara **su SERIAL con el de la zona fuente**) |
| **RETRY** | `1800` s | Si la comprobación **falla**, cuánto **espera antes de reintentar** |
| **EXPIRE** | `1209600` s | **Tiempo máximo** que el secundario puede **seguir usando su copia sin conseguir actualizarla** |
| **MINIMUM** (*Negative cache TTL*) | `300` s | Interviene en **cuánto tiempo se guarda una respuesta negativa** (ver 3.13) |

> Referencia sobre la convención del serial: **RFC 1912**.
> **Ampliación (unidades):** `7200 s` = 2 h · `1800 s` = 30 min · `1209600 s` = 14 días · `300 s` = 5 min. En la zona de ejemplo se ve que **cada RR puede tener un TTL distinto** (3600, 600, 300).

### 3.13 SOA: sincronización, TTL y caché negativa (34/50)

**Sincronización de secundarios:** `REFRESH`, `RETRY` y `EXPIRE` (ver tabla anterior).

**TTL de cada Resource Record:** indica **cuánto puede permanecer en caché**. *Ej. 1:* `web... 3600 IN A ...` ⇒ TTL = **3600 s**. *Ej. 2:* `www... 600 IN CNAME ...` ⇒ TTL = **600 s**. **Cada RR puede tener un TTL diferente.**

**Caché negativa: recordar que algo no existe**
- Se consulta `noexiste.aula.ugr.es` y el autoritativo responde que **no existe (`NXDOMAIN`)**.
- El resolver **puede guardar temporalmente esa respuesta**; si otro cliente vuelve a preguntar, **no repite toda la resolución**.
- **El campo `MINIMUM = 300 s` del SOA** interviene en **cuánto tiempo puede mantenerse** esa información en caché → **300 s** en el ejemplo.
- También existe **`NODATA`**: **el nombre existe, pero no dispone del tipo de registro solicitado**.
- Referencia: **RFC 2308**.

| Respuesta negativa | Significa |
|--------------------|-----------|
| **`NXDOMAIN`** | **El nombre no existe** |
| **`NODATA`** | **El nombre existe, pero no tiene registros del tipo pedido** |

### 3.14 Estructura de un mensaje DNS (35/50)

**Una consulta y una respuesta** usan **la misma estructura general**: **cabecera + hasta cuatro secciones**.

```
 ┌───────────────┐
 │    Header     │  control de consulta/respuesta
 ├───────────────┤
 │   Question    │  qué se está preguntando
 ├───────────────┤
 │    Answer     │  RR que responden a la consulta
 ├───────────────┤
 │   Authority   │  RR que apuntan hacia una autoridad
 ├───────────────┤
 │  Additional   │  RR con información adicional útil
 └───────────────┘
```

**Campos principales de la cabecera:**

| Campo | Significado |
|-------|-------------|
| **ID** | **Identifica la transacción** y **relaciona respuesta y consulta** |
| **QR** | **Consulta (0)** o **respuesta (1)** |
| **AA** | **Respuesta autoritativa** |
| **TC** | **Mensaje truncado** |
| **RD** | **El cliente solicita recursión** |
| **RA** | **El servidor ofrece recursión** |
| **RCODE** | **Resultado de la operación** (**0 = sin error**) |

**Contadores de las secciones:**

| Contador | Cuenta |
|----------|--------|
| **QDCOUNT** | Entradas en **Question** |
| **ANCOUNT** | RR en **Answer** |
| **NSCOUNT** | RR en **Authority** |
| **ARCOUNT** | RR en **Additional** |

Referencia: **RFC 1035, sec. 4.1** (*DNS Message Format*).

### 3.15 Ejemplo: consulta y respuesta DNS (36/50)

El PC pregunta a su resolver por la **IPv4 de `www.aula.ugr.es`**.

| **1. Consulta: PC → resolver** | **2. Respuesta: resolver → PC** |
|-------------------------------|---------------------------------|
| **Header:** `ID = 0x1234` | **Header:** `ID = 0x1234` |
| `QR = 0` (consulta) | `QR = 1` (respuesta) |
| `RD = 1` (solicita recursión) | `AA = 0` (no autoritativa) |
| `QDCOUNT = 1` | `RD = 1`, `RA = 1` |
| `ANCOUNT = 0, NSCOUNT = 0, ARCOUNT = 0` | `RCODE = 0` (sin error) |
| | `QDCOUNT = 1`, `ANCOUNT = 2` |
| | `NSCOUNT = 0`, `ARCOUNT = 0` |
| **Question:** `QNAME = www.aula.ugr.es.` · `QTYPE = A` · `QCLASS = IN` | **Question:** `www.aula.ugr.es. A IN` |
| **Answer / Authority / Additional:** vacías | **Answer:** `www.aula.ugr.es. 600 IN CNAME web.aula.ugr.es.` y `web.aula.ugr.es. 3600 IN A 192.0.2.20` |

**Lectura:** la respuesta **mantiene la Question**, incluye **dos RR en Answer** (el CNAME y el A al que apunta) y, en este ejemplo, **Authority y Additional están vacías** (`NSCOUNT = ARCOUNT = 0`). **El mismo `ID` relaciona la respuesta con la consulta.**

> **Ampliación (por qué `AA = 0`):** la responde el **resolver** (desde su caché o tras resolver), **no un servidor autoritativo**; por eso no lleva el flag de autoridad. Es el mismo flag **`aa`** que se miraba con `dig` en la P3.

### 3.16 Cómo viaja un mensaje DNS: UDP y TCP (37/50)

| | **UDP — puerto 53** | **TCP — puerto 53** |
|--|---------------------|---------------------|
| **Uso** | **Transporte habitual** de muchas consultas y respuestas | Transporte **orientado a conexión** |
| **Conexión** | **No necesita establecer conexión previa** | Con conexión |
| **Cuándo** | Siempre que la respuesta **quepa** | Si el cliente recibe **una respuesta UDP con `TC = 1`**, **repite la consulta por TCP**; el servidor devuelve **la respuesta completa**. **También se usa en las transferencias de zona** |

```
 Cliente                                   Servidor
   │──1. Consulta DNS  (UDP/53)───────────►│
   │◄─2. Respuesta UDP truncada  (TC = 1)──│
   │──3. Nueva consulta  (TCP/53)─────────►│
   │◄─4. Respuesta completa────────────────│
```

> **Idea clave:** si una respuesta a una consulta UDP llega **truncada (`TC = 1`)**, el cliente **repite la consulta mediante TCP** para obtener la respuesta completa.
> Referencia: **RFC 7766** (*DNS Transport over TCP*).

### 3.17 Aplicación: localizar un proxy SIP con DNS (Ampliación)

> Ejercicio tipo que enlaza los registros **NS, A y SRV** de este tema con el servicio de telefonía IP.

*Enunciado:* dominio SIP `st.com`, proxy `sip.st.com` (1.2.3.4); `dns.st.com` = 1.1.1.1; `dns.ugr.es` = 2.2.2.2; un usuario de `ugr.es` llama a `destino@st.com`.

| Servidor | Registros imprescindibles | Para qué |
|----------|---------------------------|----------|
| **`dnsraiz`** | `st.com. IN NS dns.st.com.` · `dns.st.com. IN A 1.1.1.1` | **Delegar** `st.com` (NS) y dar la IP del servidor al que se delega (**glue**) |
| **`dns.st.com`** | `_sip._udp.st.com. IN SRV 0 0 5060 sip.st.com.` · `sip.st.com. IN A 1.2.3.4` | **Localizar el servicio SIP** de `st.com` (SRV) y su IP (A) |
| **`dns.ugr.es`** | ninguno nuevo (solo debe conocer la raíz) | Actúa de **resolutor recursivo** |

Flujo: el resolver de `ugr.es` pregunta a la raíz → recibe la **referencia** a `dns.st.com` → pregunta a `dns.st.com` → obtiene **SRV + A** → el origen envía el `INVITE` a `1.2.3.4:5060`.

---

---

## 4. Servicios de seguridad

> Todo este bloque está marcado **COMPL.**

### 4.1 ¿Qué puede salir mal en una comunicación? (38/50)

| Amenaza | Qué es | Ejemplo | Propiedad amenazada |
|---------|--------|---------|---------------------|
| **Intercepción** | Un tercero **obtiene información que no debería conocer** | *Sniffing* | **Confidencialidad** |
| **Modificación** | Un atacante **altera información durante el intercambio** | ***Man-in-the-Middle* (MITM) activo** | **Integridad / autenticidad** |
| **Fabricación** | Se **inyectan, falsifican o reutilizan mensajes aparentando ser legítimos** | ***Spoofing*, *replay*** | **Autenticidad / frescura** |
| **Interrupción** | Un recurso **deja de estar disponible** para usuarios legítimos | ***Denial of Service* (DoS)** | **Disponibilidad** |

> **Los servicios o propiedades de seguridad indican *qué* queremos proteger; los mecanismos y controles indican *cómo* intentamos conseguirlo.**

### 4.2 ¿Qué queremos proteger? Servicios de seguridad (39/50)

| Servicio | Qué garantiza |
|----------|---------------|
| **Confidencialidad** | Evitar que la información sea conocida por **entidades no autorizadas** |
| **Integridad** | **Detectar modificaciones no autorizadas** de la información |
| **Disponibilidad** | Mantener **recursos y servicios accesibles cuando se necesitan** |
| **Autenticación** | Comprobar **la identidad de una entidad** o **el origen de la información** |
| **No repudio** | Proporcionar **evidencias** que permitan **atribuir posteriormente una acción a una entidad** |
| **Privacidad** | **Proteger información personal** y **limitar su recogida, uso y exposición** |

> **Autenticación ≠ autorización:** **autenticar** = *"¿quién eres?"* · **autorizar** = *"¿qué tienes permitido hacer?"*

### 4.3 Servicio de seguridad ≠ mecanismo (40/50)

```
 Propiedad deseada        Mecanismos                  Protocolos / sistemas
 ─────────────────        ──────────────────────      ─────────────────────────────
 Confidencialidad         Cifrado                     Transport Layer Security (TLS)
 Integridad               Message Authentication Code Internet Protocol Security (IPsec)
 Autenticación            Firma digital               Secure Shell (SSH)
                          Certificados                Virtual Private Network (VPN)
```

> **Idea clave:** **un mismo mecanismo puede contribuir a varias propiedades**, y **un protocolo de seguridad normalmente combina varios mecanismos**.
> Ejemplo: **TLS no es simplemente "cifrado"**: combina **autenticación, establecimiento de claves, protección de integridad y cifrado del tráfico**.

### 4.4 Mecanismos y controles de seguridad (41/50)

| Grupo | Ejemplos |
|-------|----------|
| **Identidad y control de acceso** | Contraseñas y **PIN** (*Personal Identification Number*) · **MFA** (*Multi-Factor Authentication*) · **certificados** · **ACL** (*Access Control Lists*), roles y políticas de autorización |
| **Protección y filtrado** | **Firewalls** · **segmentación de red** · **filtrado y control de tráfico** · **limitación y mitigación de ataques** |
| **Detección y respuesta** | **IDS** (*Intrusion Detection System*) · **IPS** (*Intrusion Prevention System*) · **antivirus y EDR** (*Endpoint Detection and Response*) · registros, monitorización y detección de anomalías |
| **Mecanismos criptográficos** | **Cifrado** · **funciones hash y MAC** · **firmas digitales** · **certificados y gestión de claves** |

### 4.5 Criptografía simétrica: una clave compartida (42/50)

Alice y Bob **comparten previamente la misma clave secreta K**; **sirve para cifrar y para descifrar**.

```
 Alice                                                  Bob
 mensaje M ─►[ Cifrado con K ]─► C = E_K(M) ─►[ Descifrado con la misma K ]─► M
```

| | |
|--|--|
| **Ejemplo** | **AES** (*Advanced Encryption Standard*): uno de los algoritmos simétricos **más utilizados**. Con `M = "Hola Bob"` y una clave `K` se obtiene un texto cifrado ininteligible; con la misma `K`, Bob recupera el mensaje |
| **Ventaja** | **Muy eficiente** → adecuada para **proteger grandes cantidades de datos** |
| **Problema principal** | **Alice y Bob necesitan tener ya la misma clave secreta.** ¿Cómo la comparten **sin que un atacante la obtenga**? → **distribución segura de la clave** |

### 4.6 Criptografía asimétrica: clave pública y privada (43/50)

Cada entidad tiene **un par de claves relacionadas matemáticamente**:

| Clave | Característica |
|-------|----------------|
| **Pública** (`K_pub`) | **Puede distribuirse / entregarse a otras entidades** |
| **Privada** (`K_priv`) | **Debe permanecer secreta**, bajo el **control exclusivo** de su dueño |

**Ejemplo (cifrar un mensaje a Bob):**

| Paso | |
|------|--|
| 1 | Alice tiene el mensaje `M` |
| 2 | Alice **cifra** con **la clave pública de Bob** `K_pub` |
| 3 | Alice envía los datos cifrados `C` (un atacante puede interceptar `C`, **pero no debería recuperar `M`**) |
| 4 | Bob **descifra con su clave privada** `K_priv` |
| 5 | Bob recupera `M` |

### 4.7 Criptografía asimétrica: ejemplo y usos (44/50)

- **Ejemplo clásico: RSA** (*Rivest–Shamir–Adleman*): par de **clave pública + clave privada**; sirve para construir mecanismos de **cifrado** y de **firma digital**.
- **¿Por qué no ciframos todo así?** Las operaciones asimétricas son **mucho más costosas computacionalmente** que las simétricas.
- En protocolos reales se usa sobre todo para: **autenticación · firmas digitales · establecimiento o protección de claves**.

```
 Criptografía asimétrica ──►  Clave de sesión  ──►  Criptografía simétrica
 (autenticación, firma,      (secreto compartido)   (protección eficiente del tráfico)
  establecimiento de claves)
```

> **Idea clave:** **simétrica y asimétrica no compiten entre sí; se usan de forma complementaria.**

### 4.8 Hash, MAC y firma digital: no son lo mismo (45/50)

| | **Función hash** | **MAC** (*Message Authentication Code*) | **Firma digital** |
|--|------------------|------------------------------------------|-------------------|
| **¿Usa clave?** | **No** | **Sí: clave secreta compartida `K`** (es **simétrico**) | **Par de claves: privada / pública** |
| **Entrada → salida** | `M → H(M)`: **huella de longitud fija** | `(M, K) → T`: **etiqueta de autenticación** pequeña | El **firmante usa su clave privada**; el **receptor verifica con la pública** |
| **Si cambia el mensaje** | **Cambia su hash** | — | — |
| **Limitación** | **Un atacante que modifique `M` también puede calcular un nuevo hash** | **No oculta `M`** (no cifra) | **No cifra el mensaje** |
| **Permite comprobar** | (huella del contenido) | **Integridad** y **autenticidad entre quienes conocen `K`** | **Integridad**, **autenticidad** y **aportar evidencia sobre el firmante** |

> **Importante:** un **MAC** usa una clave secreta compartida (mecanismo **simétrico**) pero **no cifra el mensaje**: su objetivo es **comprobar integridad y autenticidad**.
> **Comparación rápida:** **Hash → sin clave · MAC → clave secreta compartida · Firma → privada / pública.**

### 4.9 Firma digital paso a paso (46/50)

```
 Alice                                                      Bob
 1. H(M)                                                     
 2. S = Sign_{K_priv^A}( H(M) )
 3. envía  M + S  ──────────────────────────────────────────►
                                           4. calcula H(M) del mensaje recibido
                                           5. verifica S con K_pub^A
```

| Paso | Qué ocurre |
|------|-----------|
| **1. Calcular el hash** | Alice parte de `M` y calcula `H(M)`: **huella de longitud fija** asociada al contenido; **si el mensaje cambia, también debería cambiar su hash** |
| **2. Generar la firma** | Con **su clave privada** `K_priv^A`: `S = Sign_{K_priv^A}( H(M) )`. **Solo Alice debería disponer de esa clave privada** |
| **3. Enviar mensaje y firma** | Alice envía **`M + S`**. **`M` no tiene por qué estar cifrado**: **la firma no da confidencialidad** |
| **4. Bob calcula el hash** | Bob calcula por su cuenta `H(M)` del mensaje recibido; **si alguien lo hubiese modificado, su hash cambiaría** |
| **5. Verificar la firma** | Bob usa **la clave pública de Alice** `K_pub^A`. Si es correcta: **(a)** el mensaje **no se ha modificado desde que se firmó**; **(b)** la firma **se generó con la clave privada correspondiente** |

> **Firma digital:** proporciona **integridad y autenticidad** y **puede aportar evidencia sobre el firmante**, pero **no cifra el mensaje**.
> **Pregunta que queda abierta:** **¿cómo sabe Bob que esa clave pública pertenece realmente a Alice?** ⇒ **Certificados X.509**.

### 4.10 Certificados X.509 (47/50)

> **Certificado X.509:** **vincula una identidad con una clave pública**.

**Incluye, entre otros datos:** **sujeto / nombres · clave pública · emisor · periodo de validez · extensiones y usos · firma del emisor.**

> **Importante:** un certificado **contiene la clave pública, NO la privada**. **La clave privada debe permanecer protegida y almacenada por separado.**

**Autoridades y cadena de confianza:**
- Una **Autoridad de Certificación (CA)** **emite y firma** certificados.
- **El sistema valida la cadena hasta alcanzar una CA raíz que ya considera de confianza.**

```
 Certificado del servidor
          ▲  firmado por
   CA intermedia
          ▲  firmada por
 CA raíz de confianza   ← ya está en el sistema
```

Estándar: **ITU-T X.509**.

### 4.11 TLS: un canal seguro (48/50)

> **TLS** (*Transport Layer Security*): protocolo que permite **establecer un canal seguro entre dos aplicaciones** que se comunican.

| Sin protección | Con TLS |
|----------------|---------|
| Un atacante en el camino podría **leer** la información, **modificarla** o **suplantar al servidor** | **Canal protegido** entre cliente y servidor |

**TLS combina mecanismos criptográficos para proporcionar:**
1. **Autenticación del servidor**
2. **Confidencialidad** de los datos
3. **Integridad** de la comunicación

**Conexión con lo anterior:** TLS usa **criptografía asimétrica, certificados, firmas, establecimiento de claves y criptografía simétrica**.
Referencia: **TLS 1.3 — RFC 9846**.

### 4.12 HTTPS (49/50)

- **HTTP** (*Hypertext Transfer Protocol*): protocolo de aplicación para intercambiar información entre **cliente web y servidor web** (se estudia con detalle en el **Tema 5**).

```
 HTTPS = HTTP protegido mediante TLS
 Navegador ──[ HTTP (información de la aplicación web) ]──► Servidor web
                 └────── protegido por TLS ──────┘
```

- Al acceder a `https://www.ejemplo.es`, **el intercambio HTTP se realiza mediante una comunicación protegida**.
- **Para una conexión HTTPS, TLS permite que el cliente autentique al servidor y que la información intercambiada disponga de confidencialidad e integridad.**

---

---

## 5. Qué debe quedar claro (resumen oficial)

**1. Servicios transversales.** Un servicio transversal proporciona **funciones de apoyo** que pueden ser utilizadas por **múltiples servicios de red**. En el tema: **directorios, DNS y seguridad**.

**2. Servicios de directorio.** Permiten **organizar, localizar y consultar** información sobre usuarios, equipos y otros recursos. Hay que **relacionar**: **DIT, entradas y atributos, RDN/DN, DUA/DSA, DAP/DSP** y **la distribución de la información**. **LDAP** proporciona un mecanismo **más ligero** de acceso a directorios basados en **X.500**.

**3. DNS.** Sistema de nombres **jerárquico y distribuido**. Hay que comprender: **dominios, zonas, delegación y servidores autoritativos**; **resolución recursiva e iterativa**; **caché y TTL**; **principales Resource Records**; **mensajes DNS y transporte mediante UDP/TCP**.

**4. Seguridad de las comunicaciones.** **Primero** identificar **qué queremos proteger** (confidencialidad, integridad, autenticación, disponibilidad…). **Después** seleccionar **mecanismos**: **cifrado simétrico/asimétrico, hash, MAC, firma digital y certificados X.509**. **TLS combina varios de ellos** para crear un canal seguro; **HTTPS usa TLS** para proteger HTTP.

---

## 6. Cuadros comparativos

### 6.1 Directorios: X.500 frente a LDAP
| | **X.500** | **LDAP** |
|--|-----------|----------|
| Qué es | **Modelo de referencia completo** de directorio distribuido (ITU-T X.500) | Mecanismo **más ligero** de acceso a directorios basados en X.500 |
| Organización | **DIT** jerárquico | La misma idea |
| Actores | **DUA** y **DSA** | Cliente–servidor |
| Protocolos | **DAP** (DUA–DSA) y **DSP** (DSA–DSA) | **LDAP** sobre **TCP**, puerto **389** |
| Operaciones | Leer, comparar, listar, buscar, añadir, borrar, modificar, modificar RDN | `bind`, `search`, `compare`, `add`, `modify`, `delete`, `modifyDN` |

### 6.2 DIT: RDN, DN y contextos
| Concepto | Una línea |
|----------|-----------|
| **Entrada** | Nodo del DIT que representa un objeto, descrito por atributos |
| **RDN** | `atributo=valor` que distingue la entrada entre las hijas del mismo padre |
| **DN** | Todos los RDN del camino, de la hoja a la raíz |
| **Contexto de nombramiento** | Subárbol administrado conjuntamente por un DSA |
| **Prefijo de contexto** | DN de la raíz del contexto |
| **DSA subordinado** | Gestiona un contexto que cuelga de otro DSA |
| **ADMD** | Conjunto de contextos de un mismo ámbito de gestión |
| **Ref. subordinada inmediata** | Dice qué DSA lleva un contexto **inferior** |
| **Ref. superior** | Dirige hacia un DSA **superior** |

### 6.3 Tipos de entrada y de atributo (X.500)
| Entradas | Atributos |
|----------|-----------|
| **Objeto** (entidad) | **De usuario** (los pueden modificar los usuarios) |
| **Alias** (nombre alternativo, referencia un DN) | **Operacionales** (los mantiene el sistema: `createTimestamp`, `modifyTimestamp`) |
| **Subentrada** (información administrativa) | **Colectivos** (una información para varias entradas: `collectivePostalAddress`) |

### 6.4 DNS: dominio, subdominio, zona
| | Definición |
|--|-----------|
| **Dominio** | Nodo y **todo lo que depende de él** |
| **Subdominio** | Dominio dentro de otro dominio |
| **Zona** | Nombres administrados **como una unidad** por los mismos servidores autoritativos |
| **Delegación** | Confiar un subdominio a otros servidores autoritativos |
| **FQDN** | Nombre completo hasta la raíz `.` |

### 6.5 DNS: iterativa frente a recursiva
| | Iterativa | Recursiva |
|--|-----------|-----------|
| Petición | "Dame la mejor información que tengas" | "Obtén tú la respuesta final" |
| Respuesta del servidor | **Referencia** a otro servidor | **Respuesta final o error** |
| Quien recorre la jerarquía | El que pregunta | El servidor consultado |
| Caso típico | resolver → raíz/TLD/autoritativo | PC (stub) → resolver recursivo |

### 6.6 Registros DNS
| TYPE | Contiene | Ejemplo de RDATA |
|------|----------|------------------|
| **A** | IPv4 | `192.0.2.20` |
| **AAAA** | IPv6 | `2001:db8::20` |
| **CNAME** | Alias → otro nombre | `web.aula.ugr.es.` |
| **PTR** | IP → nombre (inversa, `in-addr.arpa.`) | `web.aula.ugr.es.` |
| **NS** | Servidor autoritativo de la zona | `ns1.aula.ugr.es.` |
| **MX** | Servidor de correo + **preferencia** (menor primero) | `10 mail1.aula.ugr.es.` |
| **SRV** | Servicio: **prioridad, peso, puerto, destino** | `10 70 5060 voip1.aula.ugr.es.` |
| **SOA** | Control de zona: MNAME, RNAME, SERIAL, REFRESH, RETRY, EXPIRE, MINIMUM | ver 3.12 |

### 6.7 Campos de la cabecera DNS
| Campo | 0 / 1 o significado |
|-------|---------------------|
| **QR** | 0 consulta · 1 respuesta |
| **AA** | Respuesta **autoritativa** |
| **TC** | Mensaje **truncado** (→ repetir por TCP) |
| **RD** | Cliente **solicita** recursión |
| **RA** | Servidor **ofrece** recursión |
| **RCODE** | Resultado (0 = sin error) |
| **ID** | Relaciona consulta y respuesta |
| **QDCOUNT / ANCOUNT / NSCOUNT / ARCOUNT** | Nº de entradas en Question / RR en Answer / Authority / Additional |

### 6.7b Transporte DNS
| | UDP/53 | TCP/53 |
|--|--------|--------|
| Habitual | **Sí** (consultas y respuestas normales) | Respuesta truncada (`TC=1`) y **transferencias de zona** |
| Conexión | No | Sí |

### 6.8 Seguridad: amenaza → propiedad → ejemplo
| Amenaza | Propiedad | Ejemplo |
|---------|-----------|---------|
| Intercepción | Confidencialidad | Sniffing |
| Modificación | Integridad / autenticidad | MITM activo |
| Fabricación | Autenticidad / frescura | Spoofing, replay |
| Interrupción | Disponibilidad | DoS |

### 6.9 Simétrica frente a asimétrica
| | **Simétrica** | **Asimétrica** |
|--|---------------|----------------|
| Claves | **Una** clave secreta compartida | **Par**: pública + privada |
| Ejemplo | **AES** | **RSA** |
| Coste | **Eficiente** | **Mucho más costosa** |
| Problema | **Distribuir la clave** | Coste; hay que saber **de quién es** la clave pública (→ certificados) |
| Uso típico | **Proteger el tráfico** (clave de sesión) | **Autenticación, firma, establecimiento de claves** |

### 6.10 Hash, MAC y firma
| | Hash | MAC | Firma digital |
|--|------|-----|---------------|
| Clave | Ninguna | Secreta **compartida** | **Privada** (firma) / **pública** (verifica) |
| Integridad | (huella) | Sí | Sí |
| Autenticidad | No | Sí, entre quienes conocen `K` | Sí |
| Evidencia sobre el firmante | No | No | **Sí** |
| Cifra el mensaje | No | **No** | **No** |

### 6.11 Servicio frente a mecanismo frente a protocolo
| Nivel | Ejemplos |
|-------|----------|
| **Propiedad / servicio** | Confidencialidad, integridad, autenticación, disponibilidad, no repudio, privacidad |
| **Mecanismo** | Cifrado, MAC, firma digital, certificados |
| **Protocolo / sistema** | **TLS, IPsec, SSH, VPN** |

---

## 7. Glosario de siglas

| Sigla | Significado |
|-------|-------------|
| **AA** | *Authoritative Answer* (flag DNS) |
| **ACL** | *Access Control List* |
| **ADMD** | *Administrative Management Domain* |
| **AES** | *Advanced Encryption Standard* |
| **CA** | *Certification Authority* |
| **DAP** | *Directory Access Protocol* |
| **DIT** | *Directory Information Tree* |
| **DN** | *Distinguished Name* |
| **DNS** | *Domain Name System* |
| **DoS** | *Denial of Service* |
| **DSA** | *Directory System Agent* |
| **DSP** | *Directory System Protocol* |
| **DUA** | *Directory User Agent* |
| **EDR** | *Endpoint Detection and Response* |
| **FQDN** | *Fully Qualified Domain Name* |
| **HTTP / HTTPS** | *Hypertext Transfer Protocol* / HTTP protegido con TLS |
| **IDS / IPS** | *Intrusion Detection / Prevention System* |
| **IPsec** | *Internet Protocol Security* |
| **LDAP** | *Lightweight Directory Access Protocol* |
| **MAC** | *Message Authentication Code* |
| **MFA** | *Multi-Factor Authentication* |
| **MITM** | *Man-in-the-Middle* |
| **MX** | *Mail Exchanger* (registro de correo) |
| **PIN** | *Personal Identification Number* |
| **RA** | *Recursion Available* (flag DNS) |
| **RCODE** | *Response Code* |
| **RD** | *Recursion Desired* (flag DNS) |
| **RDN** | *Relative Distinguished Name* |
| **RR** | *Resource Record* |
| **RSA** | *Rivest–Shamir–Adleman* |
| **SOA** | *Start of Authority* |
| **SRV** | Registro de localización de servicios |
| **SSH** | *Secure Shell* |
| **TC** | *Truncated* (flag DNS) |
| **TLD** | *Top Level Domain* |
| **TLS** | *Transport Layer Security* |
| **TTL** | *Time To Live* |
| **VPN** | *Virtual Private Network* |

---

## 8. Referencias normativas citadas

| Referencia | Tema |
|------------|------|
| **ITU-T X.500** | Modelo de directorio distribuido |
| **ITU-T X.519** | Protocolos del directorio (DAP, DSP) |
| **ITU-T X.520** | Tipos de atributo |
| **ITU-T X.509** | Certificados |
| **RFC 4511** | LDAP: el protocolo |
| **RFC 9499** | Terminología DNS |
| **RFC 2782** | Registro SRV |
| **RFC 1912** | Convención del serial (y errores comunes) |
| **RFC 2308** | Caché negativa |
| **RFC 1035 (sec. 4.1)** | Formato de mensaje DNS |
| **RFC 7766** | DNS sobre TCP |
| **RFC 9846** | TLS 1.3 (según las diapositivas) |

---

## 9. Test de repaso

> Tapa la columna derecha y responde.

### Concepto de servicio transversal
| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es un servicio transversal? | Servicio de **apoyo** usable por **múltiples servicios de red**; en general **no es un servicio final** para el usuario, aunque sus protocolos están en la **capa de aplicación** |
| ¿Tres ejemplos del tema? | **Directorios, DNS y seguridad** |
| ¿Qué función aporta cada uno? | Localizar información / resolver nombres / proteger la comunicación |

### Directorios
| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es un servicio de directorio? | Información **estructurada** sobre usuarios, terminales, servidores y recursos, **optimizada para consulta** y **distribuible** |
| ¿Qué es X.500 y quién lo estandariza? | **Modelo de referencia** de directorio distribuido y jerárquico; **ITU-T** |
| ¿Qué es un DUA? ¿Y un DSA? | **Acceso** del usuario/aplicación al directorio · **servidor** que almacena y gestiona **una parte** |
| ¿Qué protocolo une DUA–DSA? ¿Y DSA–DSA? | **DAP** · **DSP** |
| ¿Qué es el DIT? | **Árbol jerárquico** en el que se organiza el directorio; cada nodo es una **entrada** |
| ¿Qué es un RDN? | `atributo=valor` que distingue la entrada de las demás **del mismo padre** |
| ¿Qué es un DN y cómo se escribe? | **Nombre único completo**: los RDN del camino, **de la entrada a la raíz** |
| ¿DN de `Profesor ST`? | `cn=Profesor ST, ou=Personas, ou=ETSIIT, o=UGR, c=ES` |
| ¿Tipos de entrada? | **Objeto, alias, subentrada** |
| ¿Qué es un alias? | Nombre alternativo que **referencia el DN** de un objeto o de otro alias |
| ¿Qué guarda una subentrada? | **Información administrativa** de una parte del directorio |
| Significado de `c`, `o`, `ou`, `cn`, `dc`, `l` | País, organización, unidad organizativa, nombre común, componente de dominio, localidad |
| Significado de `sn`, `givenName`, `uid`, `mail`, `telephoneNumber`, `postalCode` | Apellido, nombre de pila, id de usuario, correo, teléfono, código postal |
| ¿Tipos de atributos? | **De usuario, operacionales, colectivos** |
| ¿Ejemplos de operacionales? | `createTimestamp`, `modifyTimestamp` |
| ¿Qué es un atributo colectivo? | Una misma información **compartida por varias entradas** de un subárbol (vía subentrada) |
| ¿Operaciones de consulta X.500? | **Leer, comparar, listar, buscar** |
| ¿Operaciones de modificación X.500? | **Añadir, borrar, modificar atributos, modificar RDN** |
| ¿Qué es un contexto de nombramiento? | **Subárbol** administrado conjuntamente por **un DSA** |
| ¿Prefijo de contexto? | **DN de la entrada raíz** del contexto |
| ¿DSA subordinado? | El que gestiona un contexto que **cuelga** de otro DSA |
| ¿Qué es un ADMD? | Conjunto de contextos bajo **un mismo ámbito de gestión** |
| ¿Referencia subordinada inmediata? ¿Y superior? | Indica qué DSA lleva un contexto **inferior** · dirige hacia un DSA **superior** |
| ¿Pasos de una consulta distribuida? | DUA→DSA1 (DAP) → DSA1 analiza el DN y ve el prefijo → DSP a DSA2 por la ref. subordinada → DSA2 localiza → devuelve a DSA1 (DSP) → DSA1 responde al DUA (DAP) |
| ¿El usuario sabe qué DSA tenía la entrada? | **No** |
| ¿Qué es LDAP? | Acceso **más ligero** a directorios basados en X.500, orientado a **TCP/IP** |
| ¿Transporte y puerto de LDAP? | **TCP**, puerto **389** |
| ¿RFC de LDAP? | **RFC 4511** |
| ¿Operaciones LDAP? | `bind`, `search`, `compare`, `add`, `modify`, `delete`, `modifyDN` |
| ¿Qué hace `bind`? | **Establece la sesión** y **autentica** al cliente |
| `-x`, `-H`, `-b` en `ldapsearch` | **Autenticación simple** (no SASL) · **URI** del servidor · **DN base** |
| ¿Qué es `(cn=Profesor ST)`? | El **filtro** LDAP |
| ¿Aplicaciones de LDAP? | Directorios de organizaciones, identidades, **autenticación centralizada**, OpenLDAP, **Active Directory** |

### DNS
| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es DNS? | Sistema **distribuido** de resolución de nombres (nombre → IP y más información) |
| ¿Por qué no centralizado? | **Cuello de botella, punto único de fallo, gestión y escalabilidad** |
| ¿Cómo lo soluciona DNS? | **Espacio de nombres jerárquico + delegación** de autoridad |
| Niveles del ejemplo del tema | Raíz `.` → TLD (`es`, `com`, `org`) → 2.º nivel (`ugr`) → subdominio (`tstc`) → host (`www`) |
| ¿Qué es un FQDN? | Nombre completo desde el nodo hasta la **raíz `.`** (`www.tstc.ugr.es.`) |
| Dominio frente a zona | Dominio = nodo **y todo lo que cuelga**; zona = nombres administrados **como una unidad** |
| ¿Qué es delegar? | Confiar un subdominio a **otros servidores autoritativos** |
| ¿Sigue `tstc.ugr.es` en el dominio `ugr.es` si se delega? | **Sí**, pero forma **otra zona** |
| ¿Qué es un servidor autoritativo? | El que **tiene los datos de la zona** y responde **autoritativamente** |
| Primario frente a secundario | Ambos autoritativos; el primario es la **fuente**, el secundario **copia** (transferencia de zona) |
| ¿Qué es la transferencia de zona? | Copia y actualización de los datos del primario en el secundario |
| ¿Qué pide una consulta recursiva? | **La respuesta final** (o error), no referencias |
| ¿Qué pide una resolución iterativa? | **La mejor información** que tenga el servidor (puede ser una **referencia**) |
| ¿Caso típico en Internet? | PC (**stub**) → **resolver recursivo** (recursiva) → resolver recorre la jerarquía (**iterativa**) |
| ¿Cuántas autoridades raíz hay? | **13** (A–M), servidas por **cientos de servidores** |
| Pasos iterativos para `www.ugr.es` | Raíz → ref. `.es` → TLD → ref. `ugr.es` → autoritativo → registros |
| ¿Qué se guarda en caché? | **Respuestas finales** e **información intermedia** |
| ¿Cuánto tiempo? | El **TTL** |
| ¿Qué evita una respuesta final en caché? | **Toda** la resolución |
| ¿Y la información intermedia? | **Parte** del recorrido (p. ej. saltarse raíz y TLD) |
| Campos de un RR | **NAME, TTL, CLASS, TYPE, RDATA** |
| ¿Qué es RDLENGTH? | Campo de **16 bits**: longitud en bytes de **RDATA** |
| ¿Qué clase se usa en Internet? | **`IN`** |
| A / AAAA / CNAME / PTR | IPv4 / IPv6 / alias / inversa (IP→nombre) |
| NS / MX / SRV / SOA | Autoritativo de zona / correo / servicio (prioridad, peso, puerto) / control de zona |
| ¿Cómo se ordena MX? | **Menor preferencia primero** |
| ¿Cómo se ordena SRV? | **Menor prioridad primero**; **peso** reparte dentro del grupo |
| ¿Reparto del ejemplo SRV? | `voip1/voip2 ≈ 70/30`; `voip3` (prioridad 20) después |
| ¿Qué convención tiene el serial? | **`YYYYMMDDnn`** (`2026091801` = 18/09/2026, versión 01) |
| REFRESH / RETRY / EXPIRE (ejemplo) | `7200` s / `1800` s / `1209600` s |
| ¿Qué es REFRESH? | Cada cuánto el secundario **comprueba** si hay nueva versión (compara SERIAL) |
| ¿Qué es EXPIRE? | Tiempo máximo con la copia **sin poder actualizarla** |
| ¿Qué es la caché negativa? | Recordar que **algo no existe** (`NXDOMAIN`) |
| ¿Qué campo del SOA la regula? | **MINIMUM** (300 s en el ejemplo) |
| `NXDOMAIN` frente a `NODATA` | **No existe el nombre** / **existe pero sin ese tipo de registro** |
| Estructura de un mensaje DNS | **Header + Question + Answer + Authority + Additional** |
| Valor de `QR` | **0** consulta · **1** respuesta |
| ¿Qué indica `AA`? | Respuesta **autoritativa** |
| ¿Qué indica `TC`? | Mensaje **truncado** |
| `RD` frente a `RA` | Cliente **pide** recursión / servidor **ofrece** recursión |
| ¿Qué indica `RCODE = 0`? | **Sin error** |
| ¿Para qué sirve el `ID`? | **Relacionar** respuesta y consulta |
| En el ejemplo, ¿cuántos RR trae Answer? | **2** (CNAME + A) |
| ¿`AA` en la respuesta del ejemplo? | **0** (no autoritativa: responde el resolver) |
| ¿Puerto y transporte habitual de DNS? | **UDP 53** |
| ¿Qué hace el cliente si `TC = 1`? | **Repite la consulta por TCP/53** |
| ¿Otro uso de TCP en DNS? | **Transferencias de zona** |
| RFC de DNS sobre TCP | **RFC 7766** |

### Seguridad
| Pregunta | Respuesta |
|----------|-----------|
| ¿Cuatro amenazas? | **Intercepción, modificación, fabricación, interrupción** |
| Propiedad amenazada por intercepción / modificación / fabricación / interrupción | Confidencialidad / integridad (autenticidad) / autenticidad (frescura) / disponibilidad |
| Ejemplos de cada una | Sniffing / MITM activo / spoofing y replay / DoS |
| ¿Seis servicios de seguridad? | Confidencialidad, integridad, disponibilidad, autenticación, **no repudio**, privacidad |
| Autenticación frente a autorización | "¿Quién eres?" / "¿Qué tienes permitido hacer?" |
| Servicio frente a mecanismo | **Qué** se protege / **cómo** se consigue |
| Ejemplos de mecanismos | Cifrado, MAC, firma digital, certificados |
| Ejemplos de protocolos | **TLS, IPsec, SSH, VPN** |
| ¿Por qué TLS no es solo "cifrado"? | Combina **autenticación, establecimiento de claves, integridad y cifrado** |
| Grupos de controles | Identidad y acceso · protección y filtrado · detección y respuesta · criptográficos |
| ¿Qué son IDS e IPS? | Detección / prevención de intrusiones |
| ¿Qué es MFA? | Autenticación **multifactor** |
| Criptografía simétrica | **Una** clave compartida `K`; ej. **AES**; eficiente; problema: **distribuir la clave** |
| Criptografía asimétrica | **Par** pública/privada; ej. **RSA** |
| ¿Cómo cifra Alice para Bob? | Con la **clave pública de Bob**; Bob descifra con **su privada** |
| ¿Por qué no se cifra todo con asimétrica? | **Coste computacional** mucho mayor |
| ¿Qué se hace en la práctica? | Asimétrica para **autenticar/firmar/establecer claves**; **clave de sesión** + simétrica para el tráfico |
| Hash | **Sin clave**; huella de longitud fija; un atacante puede **recalcularlo** |
| MAC | **Clave secreta compartida**; integridad y autenticidad; **no cifra** |
| Firma digital | Privada firma / pública verifica; integridad, autenticidad, **evidencia del firmante**; **no cifra** |
| Pasos de la firma | H(M) → firmar con **privada** → enviar M+S → Bob calcula H(M) → verifica con **pública** |
| ¿Qué problema deja abierto la firma? | **¿De quién es esa clave pública?** → **certificados X.509** |
| ¿Qué contiene un certificado? | Sujeto, **clave pública**, emisor, validez, extensiones, **firma del emisor** |
| ¿Incluye la clave privada? | **No** |
| ¿Qué es una CA? | Entidad que **emite y firma** certificados |
| ¿Cadena de confianza? | Servidor ← CA intermedia ← **CA raíz de confianza** |
| ¿Qué proporciona TLS? | **Autenticación del servidor, confidencialidad e integridad** |
| ¿Qué es HTTPS? | **HTTP protegido mediante TLS** |

### Verdadero o falso
| Afirmación | V/F |
|------------|-----|
| Un servicio transversal es normalmente un servicio final para el usuario | **F** |
| En X.500, DAP comunica los DSA entre sí | **F** (DAP: DUA–DSA; DSP: DSA–DSA) |
| El DN se escribe de la raíz a la hoja | **F** (de la entrada hacia los niveles superiores) |
| LDAP usa por defecto el puerto TCP 389 | **V** |
| Los atributos operacionales los modifican libremente los usuarios | **F** (los mantiene el sistema) |
| Un secundario DNS no es autoritativo | **F** (lo es; solo cambia cómo obtiene los datos) |
| Una consulta recursiva puede devolver una referencia al cliente | **F** (respuesta final o error) |
| La caché con información intermedia puede saltarse la raíz | **V** |
| Cada RR tiene el mismo TTL en una zona | **F** (puede ser distinto) |
| En MX, el valor más alto se intenta primero | **F** (el **menor**) |
| `NXDOMAIN` indica que existe el nombre pero no el tipo | **F** (eso es **NODATA**) |
| Si `TC = 1`, el cliente repite la consulta por TCP | **V** |
| DNS solo usa UDP | **F** (también TCP) |
| Un MAC cifra el mensaje | **F** |
| Una firma digital proporciona confidencialidad | **F** |
| Un certificado X.509 contiene la clave privada | **F** |
| TLS y HTTPS son lo mismo | **F** (HTTPS = HTTP **sobre** TLS) |
| Autenticar y autorizar significan lo mismo | **F** |

---

*Esquema elaborado a partir de las diapositivas del **Tema 3 · Servicios transversales** de Sistemas Telemáticos (Prof. Óscar Adamuz Hinojosa, Dpto. de Teoría de la Señal, Telemática y Comunicaciones, UGR, curso 2026–2027). Las secciones marcadas como "Ampliación" son material de apoyo propio. Material de estudio personal.*
