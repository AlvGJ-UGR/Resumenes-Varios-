# Sistemas Telemáticos — Práctica 4: Configuración básica de PABX

**Universidad de Granada · 2º Grado en Ingeniería de Tecnologías de Telecomunicación · Dpto. de Teoría de la Señal, Telemática y Comunicaciones**
Guion original © G. Maciá, J. Camacho, P. Padilla y R. Rodríguez · PABX **BP-Compact de Ericsson**

> **Qué es este documento:** esquema y análisis completo de la práctica. Recoge **toda** la información del guion (5 páginas) y la explica.
> **Marcas:**
> - Lo que no lleva marca es contenido **del guion**.
> - > **Ampliación:** explicación o contexto **añadido** (no figura en el guion).
> - **(Respuesta razonada)** = respuesta a una pregunta que el guion plantea pero no responde; está deducida del funcionamiento habitual de una PABX. **Contrástala con lo que veas en el laboratorio**: el comportamiento real de la centralita manda.

---

## Índice

1. [Objetivo](#1-objetivo)
2. [Toma de contacto con la PABX](#2-toma-de-contacto-con-la-pabx)
3. [Plan de numeración](#3-plan-de-numeración-de-la-pabx)
4. [Configuración básica de extensiones (Tareas 3.1–3.5)](#4-configuración-básica-de-extensiones-tareas-3135)
5. [Funciones básicas de llamada (Tareas 4.1–4.9)](#5-funciones-básicas-de-llamada-tareas-4149)
6. [Resumen de códigos, menús y teclas](#6-resumen-de-códigos-menús-y-teclas)
7. [Comparativa de teléfonos 4222 y 4223](#7-comparativa-de-teléfonos-4222-y-4223)
8. [Mapa de configuración (qué se toca y dónde)](#8-mapa-de-configuración-qué-se-toca-y-dónde)
9. [Plantilla para anotar resultados](#9-plantilla-para-anotar-resultados)
10. [Preguntas tipo examen](#10-preguntas-tipo-examen)

---

## 1. Objetivo

Aprender los **fundamentos de funcionamiento de una PABX**, trabajando con la **PABX BP-Compact de Ericsson**.

El alumno debe aprender:

| # | Bloque |
|---|--------|
| 1 | **Fundamentos de hardware e instalación** de la PABX |
| 2 | **Funcionalidades de telefonía** |
| 3 | **Gestión y configuración básica** de la PABX |

> **Ampliación:** una **PABX** (*Private Automatic Branch eXchange*, "centralita") es la central telefónica privada de una organización: conecta los teléfonos internos (extensiones) entre sí y con la red pública, y ofrece servicios como transferencia, desvío, conferencia o captura. En el guion se la llama también **"centralita"**.

---

## 2. Toma de contacto con la PABX

Esta parte la hace **el profesor en clase**. Se describe de forma básica:

| Tema | Contenido |
|------|-----------|
| **Hardware** de la PABX | Componentes físicos de la centralita |
| **Conexionado** interno y de extensiones | Cómo se conectan las tarjetas y los teléfonos |
| **Tipos de teléfono** y manejo básico | Modelos de teléfono (en la práctica aparecen el **4222** y el **4223**) |
| **Método de gestión** de la PABX | Ver sub-elementos abajo |

**Método de gestión de la PABX (qué se explica):**

1. **Elementos de la gestión**
2. **Carga de la imagen de configuración**
3. **Navegación por menús**
4. **Ayuda *on-line*** de la PABX
5. **Carga de la imagen de *backup*** para la centralita

> ### ⚠ NOTA IMPORTANTE (recuadro del guion)
> **Antes de comenzar a trabajar con la PABX es muy importante importar el *backup* original de configuración desde el disco duro** (ver **Anexo de Conexión a PABX**).
>
> *(El anexo no está incluido en el PDF de la práctica; hay que consultarlo aparte.)*

> **Ampliación (por qué importa el backup):** al ir modificando extensiones, números, clases de servicio y desvíos, la configuración de la PABX cambia. Partir del **backup original** garantiza que todos los grupos empiezan desde el mismo estado y permite **volver al estado inicial** tras los experimentos.

---

## 3. Plan de numeración de la PABX

La centralita dispone de tres tipos de extensiones. **`x` = número de la isla** (cada isla del laboratorio tiene su PABX y su numeración).

| Tipo de extensión | Numeración (isla `x`) | Cantidad | Estado en el laboratorio |
|-------------------|----------------------|----------|--------------------------|
| **Digitales** | `x01` a `x08` | **8** | **Solo las 4 primeras** (`x01`–`x04`) están **cableadas a teléfono** |
| **Analógicas** | `x11` a `x14` | **4** | **Ninguna cableada** |
| **RDSI** (rutas/conexiones) | `x21` a `x24` | **4 conexiones RDSI**, **cada una con 2 líneas** | Cableadas a las **tarjetas RDSI de los puestos de trabajo** que forman la isla |

```
 Isla 1 (x = 1)                 Isla 2 (x = 2)
 ┌──────────────────────┐       ┌──────────────────────┐
 │ Digitales  101 … 108 │       │ Digitales  201 … 208 │
 │ Analógicas 111 … 114 │       │ Analógicas 211 … 214 │
 │ RDSI       121 … 124 │       │ RDSI       221 … 224 │
 └──────────────────────┘       └──────────────────────┘
   (ejemplos de numeración)
```

> **NOTA del guion:** **no se presta atención a las extensiones RDSI**, porque este tipo de accesos **se estudian en otras asignaturas**.

**Detalles a no perder:**
- Las digitales **x05–x08 existen en la PABX** pero **no tienen teléfono** conectado.
- Las analógicas **x11–x14 existen** pero **no hay ninguna cableada**.
- En la tabla resumen del guion la fila RDSI se llama **"Rutas RDSI"**; en el texto, **"Extensiones RDSI"** (ambas se refieren a `x21`–`x24`).
- Cada acceso RDSI tiene **2 líneas**; **las extensiones de los teléfonos de la práctica también tienen 2 líneas** (se usa en las Tareas 4.2, 4.4, 4.5 y 4.6).

> **Ampliación:** **RDSI** = *Red Digital de Servicios Integrados* (ISDN). El acceso básico ofrece **2 canales B de 64 kbit/s** (las "dos líneas") **+ 1 canal D de señalización**. **Digital** vs **analógica** se refiere al tipo de puerto/teléfono: las digitales usan teléfonos propietarios de la PABX (con display y teclas de función, como los 4222/4223); las analógicas son teléfonos convencionales.

---

## 4. Configuración básica de extensiones (Tareas 3.1–3.5)

La PABX permite configurar las extensiones en dos sentidos:

1. **La numeración** asignada a cada una.
2. **Las funcionalidades** que puede hacer cada extensión. Ejemplos del guion: configurar **los tipos de llamada que una extensión puede hacer**, **las extensiones a las que podría llamar**, **qué funcionalidades tiene activas**, etc.

Se aprende mediante **cinco ejercicios**.

### Tarea 3.1 — Llamada extensión a extensión

- **Qué se hace:** realizar la llamada **desde una extensión a otra** de la PABX.
- **Qué se observa:** **observar y anotar los datos que aparecen en el *display*** del teléfono, **comprobando las diferencias entre los distintos tipos de teléfono** (4222 y 4223).

> **Qué anotar (Ampliación):** en el teléfono **llamante** (número marcado, nombre de la extensión, estado "llamando/sonando") y en el **llamado** (número/nombre del llamante, tipo de llamada). Compara cómo lo muestra cada modelo.

### Tarea 3.2 — Llamada extensión a extensión que no existe

- **Ejemplo del guion:** llamar a la extensión **`x09`** (donde `x` es el número de la isla).
- Es una extensión **inexistente**: las digitales llegan solo hasta `x08`.

> **(Respuesta razonada)** La PABX no encuentra destino para ese número, por lo que **no hay timbre en ningún teléfono** y el llamante recibe un **tono/mensaje de número no válido u ocupado** (lo que muestre el display y el tono hay que anotarlo). Sirve para ver cómo trata la centralita un número fuera del plan de numeración.

### Tarea 3.3 — Llamada extensión a número saliente de la PABX

- **Qué se hace:** **llamar a una extensión de otra isla** y **comprobar si sale la llamada**.
- La llamada **debería encaminarse de una isla a otra**.
- **El guion indica que en la siguiente práctica se explicará cómo se configura este tipo de encaminamiento.**

> **(Respuesta razonada)** Con la configuración básica de esta práctica **no hay rutas entre islas**, así que la llamada **probablemente no progresará** (tono de error/ocupado). La práctica sirve para **constatar** que, sin configurar el encaminamiento, un número que no pertenece a la PABX **no sale**. Anota lo que ocurra de verdad.

### Tarea 3.4 — Visualización de las extensiones

1. Ir al **menú de BMS: `extensiones / Listar extensiones`**.
2. **Comprobar** que aparecen **todas las extensiones con las numeraciones que les corresponden**.
3. **Seleccionar una extensión** y comprobar en el menú que aparece **si la extensión está conectada** (y **qué tipo de teléfono tiene**) **o no lo está**.

- En este menú **se pueden modificar muchas funcionalidades** de cada extensión; **a lo largo de los ejercicios se irán modificando algunas**.

> **Qué deberías ver (Ampliación):** las 16 extensiones (8 digitales + 4 analógicas + 4 RDSI) con su número; las **digitales `x01`–`x04` conectadas** (con tipo de teléfono) y el resto **sin conectar**.
> **BMS** es la herramienta/interfaz de gestión de la PABX con la que se navega por los menús. El guion **no desarrolla la sigla**; se describe en clase y en el Anexo de conexión.

### Tarea 3.5 — Modificación básica de las extensiones

- Entrar en el **menú `extensiones`** y seleccionar el comando **`asignar extensiones`**.
- En ese menú se pueden **seleccionar las extensiones y modificar sus numeraciones y nombres asociados**.

| Apartado | Qué hacer | Qué comprobar |
|----------|-----------|---------------|
| **a)** | Modificar el **nombre de una extensión (*nombre de directorio*)** | **¿Qué modificación aparece en el *display* del teléfono** de dicha extensión? |
| **b)** | Modificar el **número de la extensión (*directorio número*)** | Con **una llamada a esa extensión**, comprobar que **el número correspondiente ha cambiado** |
| **c)** | Dar a una extensión **una numeración correspondiente a otra isla** | **¿Progresará la llamada? Discutir el porqué** |

> **(Respuesta razonada a a)** El **nombre de directorio** es el texto asociado a la extensión; debería aparecer **en el display del propio teléfono** (y en el de quien llame, según el modelo).
>
> **(Respuesta razonada a c)** La numeración la resuelve **la propia PABX con su plan de numeración**: si una extensión **local** recibe el número de otra isla, **las llamadas a ese número se resolverán internamente hacia esa extensión local** y **no saldrán hacia la otra isla**; además, la extensión real de la otra isla **quedaría "tapada"/inalcanzable** desde esta PABX y se generaría un **conflicto de numeración**. Para llegar a otra isla haría falta **encaminamiento** (siguiente práctica). Anota qué ocurre en el laboratorio.

---

## 5. Funciones básicas de llamada (Tareas 4.1–4.9)

**Instrucciones generales del guion:**
- El alumno, **con ayuda de la documentación**, realiza las tareas solicitadas.
- Para cada una hay que **anotar y discutir el resultado de la ejecución**, **incluyendo los datos relevantes que aparezcan en los *displays*** de los **diferentes teléfonos involucrados**.

### Tarea 4.1 — Uso del botón de consulta

- **Para qué sirve:** hacer **una llamada de consulta mientras estás hablando**.
- **Cómo funciona:** sirve **como línea de llamada saliente pero no entrante**.
- **Qué hacer:** **comprobar su funcionamiento**.

```
 A ◄══ conversación ══► B
 B pulsa "consulta" ─► (llamada 1 queda retenida) ─► B marca a C ─► B ◄═► C
```

> **Ampliación:** la consulta pone la conversación actual **en retención** y libera **la segunda línea** para marcar a un tercero. Es el **paso previo** de la **transferencia** (Tarea 4.7) y de la **multiconferencia** (Tarea 4.5). "Saliente pero no entrante" = esa línea sirve para **marcar** hacia fuera pero **no recibe llamadas entrantes**.

### Tarea 4.2 — Puesta de llamada en espera

**a) Espera con llamada activa**
- Mientras hay una **llamada activa**, se puede **poner en espera pulsando la tecla de línea**.
- El **otro extremo percibe la puesta en espera con la música de espera**.
- **Comprobar** que **al pulsar otra vez el botón de línea se recupera la llamada**.

**b) Dos llamadas a una extensión (desde teléfonos distintos)**
- Se hacen **dos llamadas a una misma extensión** desde **teléfonos diferentes**.
- La extensión **que no tiene la llamada activa (extensión en espera) escucha la música en espera**.
- **Probar a alternar entre las líneas disponibles.**

```
   A ──► ┐
         ├──► [ Extensión X: línea 1 (activa) / línea 2 (en espera) ]
   B ──► ┘                      ▲ alternar con la tecla de línea
```

### Tarea 4.3 — Captura de llamada

- **Procedimiento:**
  1. **Hacer una llamada a una extensión y no descolgar** el teléfono (queda sonando).
  2. Con **otro teléfono**, **llamar a la extensión que está sonando** y **pulsar `6` o la tecla de captura**.
- **Restricción:** la **tecla de captura solo estará disponible en teléfonos del modelo 4223**.
- **Configuración:** el **dígito para la captura (aquí `6`)** se configura en el menú **`sistema / servicios del sistema / dígitos de servicio`**.

> **Ampliación:** la **captura** (*call pick-up*) permite **contestar desde otro teléfono una llamada que está sonando en una extensión ajena**. En el 4222 se hace marcando el dígito de servicio; en el 4223 también hay tecla dedicada.

### Tarea 4.4 — Rellamada

| Paso | Acción |
|------|--------|
| **1** | Hacer que **una extensión esté ocupada**: **como las extensiones tienen dos líneas**, hay que lograr que la extensión tenga **dos llamadas establecidas** |
| **2** | Realizar **una tercera llamada** a esa extensión: se recibe **tono de ocupado**. **Observar dicho tono** |
| **3** | En el teléfono que origina la tercera llamada, pulsar **la tecla de rellamada (teléfonos 4223)** o **la tecla `5` (teléfonos 4222)** |
| **4** | **Colgar** |

- **Observar y discutir qué sucede cuando el teléfono que estaba ocupado cuelga las llamadas.**
- **NOTA del guion:** después de colgar **hay que esperar un poco**.

> **(Respuesta razonada)** La **rellamada** (*callback on busy*) es una **solicitud de aviso**: el llamante deja registrado en la PABX que quiere hablar con la extensión ocupada. **Cuando el ocupado cuelga y queda libre**, la **PABX avisa al llamante** (su teléfono suena/indica que el destino está libre) y, **al descolgar**, **establece la llamada** hacia la extensión que ya está libre. Por eso hay que esperar tras colgar: la PABX tarda un momento en detectar que la extensión está libre. Verifícalo y anota lo que muestran los displays.

### Tarea 4.5 — Multiconferencia

- **Qué es:** permite **una conversación entre varias extensiones al mismo tiempo** → una **reunión telefónica**.

| Paso | Acción |
|------|--------|
| **1** | Llamar a una extensión |
| **2** | Llamar **con la otra línea** a otra extensión |
| **3** | Pulsar el **botón de conferencia** |

**Qué comprobar (preguntas del guion):**
1. **¿Qué sucede en este punto? ¿Qué interlocutores están presentes** en la llamada?
2. **¿Qué sucede cuando cuelgan los llamados** una vez establecida la multiconferencia?
3. **¿Qué sucede cuando cuelga el llamante** una vez establecida la multiconferencia?

```
 Antes de pulsar "conferencia":      Tras pulsar "conferencia":
   A ◄══► B   (línea 1)                 A ◄═══╗
   A ◄══► C   (línea 2, en espera)             ╠═══ conferencia a 3 ═══ B, C
                                        ╚═══►
```

> **(Respuesta razonada)** Tras pulsar conferencia, **A, B y C quedan conectados entre sí** (los tres se oyen). Lo que ocurre cuando alguien cuelga **depende de la PABX** (típicamente, si cuelgan los llamados, A queda en llamada con el que queda; si cuelga el **llamante/organizador**, la conferencia puede **terminar o quedar B y C conectados**). **El guion pide observarlo**: anota exactamente cada caso.

### Tarea 4.6 — Intrusión

**Qué es:** funcionalidad que permite a **una extensión entrometerse en una conversación que mantienen otras dos extensiones cualesquiera**.
- **No está normalmente permitida.**
- **Objetivo:** permitir **al operador comprobar**, **después de un cambio de configuración**, que **las conversaciones se pueden establecer con normalidad**.

**Paso 1 — Habilitar la intrusión para la extensión**

| Acción | Menú |
|--------|------|
| Poner a **1** la intrusión **en la clase 1** | **`Sistema / Servicios del sistema / clase de servicio`** |
| Indicar que **la extensión pertenece a la clase 1** | **`menú extensión / COS del servicio`** |

**Paso 2 — Hacer la intrusión**

1. **Ocupar las dos líneas de un teléfono digital**: hacer **dos llamadas al mismo teléfono**.
2. Hacer **una tercera llamada** a ese teléfono (para que dé **tono de ocupado**).
3. **Marcar el número de intrusión: `8`**.
   - En ese momento **se hace la intrusión en la conversación** y **se escucha un pitido de aviso**.

**Apartados del guion:**

| | Qué hacer |
|--|-----------|
| **a)** | **Realizar la ejecución de una intrusión** a una llamada según el procedimiento anterior |
| **b)** | **Intentar clarificar qué es una clase de servicio y para qué sirve** |
| **c)** | **Cambiar la clase de servicio (COS) de la extensión** para **no permitirle hacer la intrusión** |
| **c')** *(el guion repite la letra "c")* | **Hacer que a una extensión no se le pueda "espiar"** (hacerle una intrusión): **deshabilitar, para esa extensión, la opción "¿intrusión permitida?" (en estado ocupado)** |

> **Ampliación — Clase de servicio (COS, *Class of Service*):** es **un conjunto de permisos/restricciones** que se define **una vez** y se **asigna a varias extensiones** (por ejemplo: qué servicios pueden usar, si pueden hacer intrusión, qué tipos de llamada pueden realizar). **Ventaja:** en vez de configurar cada extensión una a una, **se cambia la clase** y **afecta a todas las extensiones que pertenecen a ella**. En esta tarea la clase **1** tiene la **intrusión = 1 (permitida)**, y la extensión se **vincula a la clase 1**.
>
> **Dos "llaves" distintas en la intrusión:** (1) **la extensión que intruye** necesita **permiso por su clase de servicio** (apartados a y c); (2) **la extensión intruida** puede **protegerse** deshabilitando **"¿intrusión permitida?" en estado ocupado** (apartado c').

### Tarea 4.7 — Transferencia de llamada

**Escenario de utilidad:** una **operadora** recibe las llamadas de una empresa; **pregunta al llamante con qué empleado quiere hablar** y **transfiere la llamada a la extensión de ese empleado**.

| Paso | Acción |
|------|--------|
| **1** | Establecer la llamada hacia una extensión que hará de **operadora**: **A llama a B** |
| **2** | **B pulsa el botón de consulta** y **marca la extensión a la que quiere transferir la llamada (C)** |
| **3** | **C descuelga** y entonces **B pulsa el botón de transferir (*transfer*)** |

```
 1) A ───► B                       (B = operadora)
 2) A (en espera) ── B ───► C      (B hace consulta a C)
 3) C descuelga; B pulsa TRANSFER
 4)          A ◄═══════════► C     (B queda fuera)
```

**Preguntas del guion:**
1. **¿Entre qué abonados está finalmente establecida la llamada?**
2. **¿Qué sucedería si en el paso 3 el abonado B cuelga antes de que C descuelgue?**

> **(Respuesta razonada 1)** **Entre A y C.** **B sale de la comunicación** (era solo el intermediario).
>
> **(Respuesta razonada 2)** Es una **transferencia sin confirmar** (*blind/unscreened*): B cuelga **mientras C aún suena**. El comportamiento depende de la PABX: lo habitual es que **la llamada de A se transfiera igualmente** y siga sonando en C (si C contesta, A y C hablan); en otros casos **la llamada vuelve a B (rellamada)**. **Hay que probarlo y anotar el resultado.**

### Tarea 4.8 — Realización de desvíos

Una extensión **se puede desviar hacia otra**: cuando un abonado llama a la primera, **la llamada se dirige a la extensión del desvío**.

| Acción | Código a marcar **en la extensión que se desvía** |
|--------|--------------------------------------------------|
| **Activar desvío a un número** | **`*21*nº de desvío#`** |
| **Eliminar el desvío** | **`#21#`** |
| **Activar desvío al número por defecto** (si está programado en el menú de configuración de la extensión) | **`*21#`** |

- También se puede **especificar, en el menú de configuración de la extensión, el número de desvío por defecto**; entonces **basta marcar `*21#`**.

**Apartados:**

| | Qué hacer |
|--|-----------|
| **a)** | **Configurar un desvío en la extensión A a un número determinado** |
| **b)** | **Probar** el desvío **llamando a la extensión A** |
| **c)** | **Eliminar** el desvío |
| **d)** | **Repetir el desvío y la prueba, pero con un desvío fijo programado con BMS** para la extensión |

> **Ejemplo (Ampliación):** extensión A = `101`, desvío a `103`. En `101` se marca **`*21*103#`**. Cualquiera que llame al `101` **sonará en el `103`**. Para quitarlo: **`#21#`**.
> **Dos formas de desvío:** **dinámico** (lo activa el usuario marcando `*21*nº#`; se quita con `#21#`) y **fijo/por defecto** (programado desde BMS; se activa con `*21#`).

### Tarea 4.9 — Opcional: configuración de otras funcionalidades

**a) Menú de configuración de la extensión: *Funciones pasivas / en estado ocupado***
- **Quitar la opción de poder hacer rellamada** en una extensión.
- **Comprobar que no se puede efectuar** esa función **cuando la extensión ocupada no tiene activada** esta función.

**b) Lista de llamadas (para todas las extensiones internas) en una extensión**
- **Activar la lista de llamadas.**
- **Acceso a la lista:**
  - **Teléfonos 4222:** marcar **`*48#`** (la **tecla `1`** sirve para ver **la hora y fecha de la llamada**).
  - **Teléfonos 4223:** **se habilita automáticamente una tecla de lista de llamadas.**
- **Efectuar varias llamadas** y **comprobar cómo se comporta la lista de llamadas.**

> **Matiz (Ampliación):** en 4.9 a) **la restricción se pone en la extensión que está ocupada** (la que recibe la rellamada), no en la que la origina: si **el destino ocupado no tiene activada esa función**, **la rellamada no puede completarse**.

---

## 6. Resumen de códigos, menús y teclas

### 6.1 Códigos de marcación

| Función | Código | Dónde se marca / cuándo |
|---------|--------|-------------------------|
| **Captura de llamada** | **`6`** (dígito de servicio) o **tecla captura** | En el teléfono que captura, **mientras suena** la extensión |
| **Rellamada** | **`5`** (4222) / **tecla rellamada** (4223) | En el teléfono llamante tras recibir **tono de ocupado** |
| **Intrusión** | **`8`** | Tras **tono de ocupado**, en la extensión que intruye |
| **Activar desvío a nº** | **`*21*nº#`** | En la extensión que se desvía |
| **Eliminar desvío** | **`#21#`** | En la extensión desviada |
| **Activar desvío por defecto** | **`*21#`** | En la extensión (con número por defecto configurado) |
| **Lista de llamadas (4222)** | **`*48#`** (tecla **`1`** = hora y fecha) | En el 4222 |

### 6.2 Botones/teclas citados

| Tecla | Uso |
|-------|-----|
| **Consulta** | Llamada de consulta durante una conversación (línea saliente, no entrante) |
| **Línea** | Poner en espera / recuperar llamada |
| **Captura** | Capturar una llamada que suena en otra extensión (**solo 4223**) |
| **Rellamada** | Solicitar rellamada al ocupado (**4223**) |
| **Conferencia** | Crear la multiconferencia |
| **Transferir (*transfer*)** | Completar la transferencia |
| **Lista de llamadas** | Se habilita automáticamente en **4223** |

### 6.3 Menús de gestión (BMS) citados

| Ruta | Para qué |
|------|----------|
| `extensiones / Listar extensiones` | Ver todas las extensiones, si están conectadas y qué teléfono tienen |
| `extensiones / asignar extensiones` | Cambiar **numeración** (*directorio número*) y **nombre** (*nombre de directorio*) |
| `Sistema / Servicios del sistema / dígitos de servicio` | Configurar el dígito de la **captura** (6) (y los demás dígitos de servicio) |
| `Sistema / Servicios del sistema / clase de servicio` | Poner la **intrusión a 1 en la clase 1** |
| `extensión / COS del servicio` | Indicar **a qué clase** pertenece la extensión (p. ej. clase 1) |
| Configuración de la extensión → **¿intrusión permitida?** (estado ocupado) | Impedir que **se espíe** a una extensión |
| Configuración de la extensión → **Funciones pasivas / en estado ocupado** | Quitar la **rellamada** |
| Configuración de la extensión → **número de desvío por defecto** / desvío fijo | Programar el desvío para `*21#` |
| Activar **lista de llamadas** (extensión) | Habilitar `*48#` / tecla de lista |

---

## 7. Comparativa de teléfonos 4222 y 4223

| Función | **Modelo 4222** | **Modelo 4223** |
|---------|-----------------|-----------------|
| **Captura de llamada** | Marcando el dígito de servicio **`6`** | Dígito **`6`** **o tecla de captura** (**la tecla solo existe en el 4223**) |
| **Rellamada** | Tecla **`5`** | **Tecla de rellamada** |
| **Lista de llamadas** | Marcar **`*48#`**; tecla **`1`** = hora y fecha | **Tecla de lista de llamadas habilitada automáticamente** |
| **Display** | Se anotan y comparan los datos que muestra en las Tareas 3.1 y siguientes | Ídem (el guion pide **comprobar las diferencias entre tipos de teléfono**) |

> **Ampliación:** el 4223 tiene más teclas de función programables, de ahí que varias funciones tengan **tecla dedicada** en él y **código de marcación** en el 4222.

---

## 8. Mapa de configuración (qué se toca y dónde)

```
BMS
├── extensiones
│   ├── Listar extensiones .......... Tarea 3.4 (conectada / tipo de teléfono)
│   ├── asignar extensiones ......... Tarea 3.5 (nombre, número)
│   ├── (config. de extensión)
│   │     ├── COS del servicio ...... Tarea 4.6 (pertenecer a la clase 1)
│   │     ├── ¿intrusión permitida? . Tarea 4.6 c') (en estado ocupado)
│   │     ├── Funciones pasivas /
│   │     │   en estado ocupado ..... Tarea 4.9 a) (rellamada)
│   │     ├── número de desvío ...... Tarea 4.8 d) (*21#)
│   │     └── lista de llamadas ..... Tarea 4.9 b) (*48#)
└── sistema
    └── servicios del sistema
          ├── dígitos de servicio ... Tarea 4.3 (captura = 6)
          └── clase de servicio ..... Tarea 4.6 (intrusión = 1 en clase 1)
```

---

## 9. Plantilla para anotar resultados

El guion exige **anotar y discutir** el resultado de cada tarea, **con los datos de los displays**. Plantilla:

| Tarea | Teléfonos implicados (ext. y modelo) | Qué se hizo | Display llamante | Display llamado | Resultado / discusión |
|-------|--------------------------------------|-------------|------------------|-----------------|----------------------|
| 3.1 | | | | | |
| 3.2 (x09) | | | | | |
| 3.3 | | | | | |
| 3.4 | | | | | |
| 3.5 a/b/c | | | | | |
| 4.1 | | | | | |
| 4.2 a/b | | | | | |
| 4.3 | | | | | |
| 4.4 | | | | | |
| 4.5 | | | | | |
| 4.6 a–c' | | | | | |
| 4.7 | | | | | |
| 4.8 a–d | | | | | |
| 4.9 a/b | | | | | |

**Checklist previa:** ☐ importar el **backup original** · ☐ identificar la **isla `x`** · ☐ confirmar qué extensiones tienen teléfono (`x01`–`x04`) · ☐ saber qué teléfono es 4222 y cuál 4223 · ☐ tener a mano el menú **BMS**.

---

## 10. Preguntas tipo examen

| Pregunta | Respuesta |
|----------|-----------|
| ¿Con qué PABX se trabaja? | **BP-Compact de Ericsson** |
| ¿Qué tres cosas debe aprender el alumno? | Hardware e instalación · funcionalidades de telefonía · gestión y configuración básica |
| ¿Qué hay que hacer **antes** de empezar? | **Importar el backup original** de configuración desde el disco duro |
| Numeración de las extensiones digitales / analógicas / RDSI | `x01`–`x08` / `x11`–`x14` / `x21`–`x24` |
| ¿Cuántas digitales hay y cuántas están cableadas? | **8**; **solo las 4 primeras** |
| ¿Cuántas analógicas están cableadas? | **Ninguna** (hay 4) |
| ¿Cuántas conexiones RDSI y cuántas líneas por conexión? | **4**, **2 líneas** cada una |
| ¿Por qué no se atienden las RDSI? | Se estudian en **otras asignaturas** |
| ¿Qué significa la `x` en `x01`? | **Número de isla** |
| ¿Qué extensión se usa para probar una llamada a número inexistente? | **`x09`** |
| ¿Qué menú lista las extensiones? | **BMS: extensiones / Listar extensiones** |
| ¿Qué comando permite cambiar numeración y nombre? | **`asignar extensiones`** (menú extensiones) |
| ¿Nombre de directorio vs directorio número? | Nombre asociado (aparece en el display) vs número de la extensión |
| Botón de consulta: ¿entrante o saliente? | **Saliente, no entrante** |
| ¿Cómo se pone una llamada en espera y qué oye el otro extremo? | **Tecla de línea**; **música de espera** |
| ¿Dónde se configura el dígito de captura y cuál es? | **sistema / servicios del sistema / dígitos de servicio**; **6** |
| ¿Qué teléfono tiene tecla de captura? | **4223** |
| ¿Cuántas llamadas hacen falta para dejar ocupada una extensión? ¿Por qué? | **2** (tiene **dos líneas**); la **tercera** recibe **tono de ocupado** |
| Rellamada: tecla en 4222 / en 4223 | **`5`** / **tecla de rellamada** |
| Pasos de una multiconferencia | Llamar a una extensión → llamar con la otra línea a otra → pulsar **conferencia** |
| ¿Qué es la intrusión y para qué se usa? | Entrometerse en la conversación de otras dos extensiones; permite al **operador comprobar** tras un cambio de configuración que **las conversaciones se establecen normalmente** |
| ¿Está permitida la intrusión por defecto? | **No** |
| Dígito de intrusión | **8** (se oye **pitido de aviso**) |
| Pasos para habilitar la intrusión | **Clase de servicio → intrusión = 1 en clase 1** + **COS de la extensión = clase 1** |
| ¿Cómo impedir que se "espíe" a una extensión? | Deshabilitar **"¿intrusión permitida?" (en estado ocupado)** |
| ¿Cómo impedir que una extensión pueda intruir? | Cambiar su **clase de servicio (COS)** |
| Pasos de la transferencia | A llama a B → B **consulta** y marca C → C descuelga → B pulsa **transferir** |
| ¿Entre quién queda la llamada tras transferir? | **A y C** |
| Código para activar / eliminar / activar por defecto un desvío | **`*21*nº#`** / **`#21#`** / **`*21#`** |
| Dos formas de programar un desvío | Marcando el código en la extensión · **desvío por defecto/fijo** en la configuración (BMS) |
| ¿Cómo acceder a la lista de llamadas en un 4222? | **`*48#`** (tecla `1` = hora y fecha) |
| ¿Y en un 4223? | **Tecla de lista de llamadas habilitada automáticamente** |
| ¿Dónde se quita la rellamada de una extensión? | Menú de configuración de la extensión → **Funciones pasivas / en estado ocupado** |

---

*Guía elaborada a partir del guion "Práctica 4: Configuración básica de PABX" (Sistemas Telemáticos, UGR; © G. Maciá, J. Camacho, P. Padilla y R. Rodríguez). Las secciones marcadas como "Ampliación" y "Respuesta razonada" son material de apoyo propio. Material de estudio personal.*
