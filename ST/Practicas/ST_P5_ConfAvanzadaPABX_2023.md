# Práctica 5 · Configuración Avanzada de PABX

**Sistemas Telemáticos** · 2º Grado en Ingeniería de Tecnologías de Telecomunicación
Universidad de Granada · Dpto. Teoría de la Señal, Telemática y Comunicaciones
© G. Maciá, J. Camacho, P. Padilla y R. Rodríguez (2023)

> Documento de estudio: esquema, análisis y guía de resolución de la práctica `ST_P5_ConfAvanzadaPABX_2023.pdf`.
> Las secciones marcadas con 📘 resumen fielmente el enunciado; las marcadas con 🔎 son ampliaciones y análisis añadidos.

---

## Índice

1. [Visión general](#1-visión-general)
2. [Mapa conceptual](#2-mapa-conceptual)
3. [Glosario rápido](#3-glosario-rápido)
4. [Tarea 1 · Llamadas entre extensiones de una isla](#4-tarea-1--llamadas-entre-extensiones-de-una-misma-isla)
5. [Enlaces y rutas de enlace (teoría)](#5-configuración-de-enlaces-teoría)
6. [Tarea 2 · Enlaces, rutas y parámetros](#6-tarea-2--comprobación-de-enlaces-rutas-de-enlace-y-parámetros)
7. [Tarea 3 · Encaminamiento de llamadas](#7-tarea-3--encaminamiento-de-las-llamadas-en-los-enlaces)
8. [Grupos (teoría)](#8-configuración-de-grupos-teoría)
9. [Tarea 4 · Grupo de captura](#9-tarea-4--grupo-de-captura)
10. [Tarea 5 · Grupo PBX](#10-tarea-5--grupo-pbx)
11. [Tarea 6 · Grupos ACD](#11-tarea-6--grupos-acd)
12. [Tabla resumen de menús](#12-tabla-resumen-de-menús-de-la-pabx)
13. [Comparativa de grupos](#13-comparativa-de-tipos-de-grupo)
14. [Errores típicos y consejos](#14-errores-típicos-y-consejos)
15. [Checklist final](#15-checklist-final)

---

## 1. Visión general

### 📘 Objetivo

Profundizar en la configuración de la centralita (**PABX**) y comprender todos los mecanismos necesarios para montar un **centro de atención al cliente**.

### 📘 Estructura de la práctica

| Bloque | Contenido | Tareas |
|---|---|---|
| **A. Conmutación** | Permisos de llamada entre extensiones y conexión de la PABX con otros equipos de conmutación (enlaces, rutas, encaminamiento) | 1, 2, 3 |
| **B. Gestión de grupos** | Captura, grupo PBX y grupo ACD para implementar el centro de atención | 4, 5, 6 |

### ⚠️ Aviso previo importante

> **Antes de empezar a trabajar con la PABX hay que importar el backup original de configuración desde el disco duro** (ver *Anexo de Conexión a PABX*).
>
> 🔎 Esto garantiza un estado de partida conocido (sin restos de configuraciones de otras sesiones) y evita resultados inesperados en las pruebas.

---

## 2. Mapa conceptual

```text
                         PRÁCTICA 5
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
  A. CONMUTACIÓN                              B. GRUPOS
        │                                           │
 ┌──────┼───────────────┐                ┌──────────┼──────────────┐
 │      │               │                │          │              │
T1     T2              T3               T4         T5             T6
Grupos  Enlaces,       Encaminamiento   Grupo de   Grupo PBX      Grupo ACD
de      rutas y        (IPU, router     captura    (serie/        (cola
tráfico parámetros     red privada,     (código    cíclico/       inteligente,
+ matriz               nodos)           888)       paralelo)      agentes)
```

Flujo lógico de una llamada **saliente de la isla**:

```text
Extensión ──► Matriz de tráfico (¿permitido?) ──► Router de red privada
                                                      │ (numeración → nodo)
                                                      ▼
                                          Ruta de enlace IP (4 enlaces)
                                                      │
                                                      ▼
                                       Tarjeta IPU ──► Red de gestión ──► Router C ──► Otra PABX
```

---

## 3. Glosario rápido

| Término | Definición |
|---|---|
| **PABX** | *Private Automatic Branch Exchange*: centralita telefónica privada. |
| **Isla** | Cada centralita del laboratorio con sus extensiones. |
| **Grupo de tráfico** | Agrupación de extensiones; cada extensión pertenece a uno. |
| **Matriz de tráfico** | Tabla que define qué grupos de tráfico pueden llamar a cuáles. |
| **COS** | *Class of Service*: clase de servicio (ver P4, Tarea 6). |
| **Enlace (troncal)** | Interfaz de línea que conecta la PABX con la RTB o con otra PABX (*tie-line*). |
| **Ruta de enlace** | Conjunto de enlaces con una única numeración y parámetros comunes. |
| **RTB** | Red Telefónica Básica. |
| **RDSI** | Red Digital de Servicios Integrados. |
| **IPU** | Tarjeta IP de la centralita. |
| **MFU** | Tarjeta hardware (en el ejemplo, tarjeta 01). |
| **Grupo de captura** | Extensiones que pueden capturarse llamadas entre sí. |
| **Grupo PBX** | Grupo de búsqueda: varios miembros atienden llamadas entrantes. |
| **ACD** | *Automatic Call Distribution*: distribución automática con cola inteligente. |
| **Agente** | Persona que atiende llamadas ACD desde un terminal. |
| **Posición de salida** | Destino al que se desvía la llamada de un grupo PBX en ciertas condiciones. |
| **Tiempo administrativo** | Pausa tras colgar para que el agente anote datos o termine tareas. |

---

## 4. Tarea 1 · Llamadas entre extensiones de una misma isla

### 📘 Concepto

Los destinos a los que puede llamar una extensión dentro de su isla se controlan agrupando las extensiones en **grupos de tráfico**. Cada extensión pertenece a un grupo; la **matriz de tráfico** especifica las llamadas permitidas **entre grupos**.

### 📘 Enunciado (pasos)

| Paso | Acción | Ruta de menú |
|---|---|---|
| a | Hacer una llamada de la extensión **A** a la extensión **B** | — |
| b | Poner A en un grupo de tráfico **distinto al de B** y **distinto del 0** (el grupo 0 habilita todas las llamadas por defecto) | Menú de extensión → *Grupo de tráfico* (**cód. 0102**) |
| c | Modificar la matriz para **no permitir** llamadas de A a B | *Sistema → Servicios del sistema → Matriz de grupo de tráfico* |
| d | Explicar qué es una matriz de tráfico, para qué sirve, sus usos y si es lo mismo que las **COS** (Tarea 6 de P4) | — |

### 🔎 Procedimiento recomendado

1. Con la configuración inicial, llamar de A a B → **debe cursarse** (ambas en grupo 0).
2. Asignar a A el grupo, p. ej., **1**; a B dejarla en el grupo **2** (ninguno es el 0).
3. En la matriz, localizar la celda *origen = 1 / destino = 2* y **desmarcarla**.
4. Repetir la llamada A → B → **debe fallar** (normalmente tono de ocupado/congestión o mensaje de no permitido).
5. Comprobar el sentido inverso B → A: la matriz es **direccional**, así que puede seguir permitida si no se ha bloqueado.
6. Restaurar la configuración tras la prueba.

### 🔎 Matriz de tráfico (ejemplo ilustrativo)

|  Origen ↓ / Destino → | Grupo 1 | Grupo 2 | Grupo 3 |
|---|:---:|:---:|:---:|
| **Grupo 1** | ✅ | ❌ | ✅ |
| **Grupo 2** | ✅ | ✅ | ✅ |
| **Grupo 3** | ✅ | ✅ | ✅ |

Aquí A (grupo 1) **no puede llamar** a B (grupo 2), pero B sí puede llamar a A.

### 🔎 Apartado d) Matriz de tráfico vs. COS

**¿Qué es y para qué sirve la matriz de tráfico?**
Es una tabla de permisos entre pares de grupos que decide si una llamada entre dos extensiones de la misma isla puede establecerse. Usos habituales:

- Aislar departamentos (p. ej., que Producción no pueda llamar a Dirección).
- Impedir llamadas internas entre extensiones públicas (recepción, sala de espera) y áreas privadas.
- Segmentar la centralita por entornos (hoteles, hospitales, call centers).
- Crear rutas de comunicación asimétricas (A llama a B pero no al revés).

**¿Es lo mismo que las COS? No.**

| Aspecto | Matriz de grupos de tráfico | Clase de servicio (COS) |
|---|---|---|
| Pregunta que responde | *¿Con **quién** puede comunicarse esta extensión?* | *¿**Qué tipo de llamadas/servicios** puede usar esta extensión?* |
| Ámbito | Llamadas **interiores** entre extensiones de la misma isla | Principalmente acceso a **servicios y tipos de tráfico** (exterior, larga distancia, desvíos, etc.) |
| Granularidad | Pares **grupo origen → grupo destino** | Nivel de **privilegios** por extensión |
| Dirección | Direccional (A→B ≠ B→A) | No depende de un destino concreto |
| Configuración | Matriz en *Sistema / Servicios del sistema* | Asignada en la extensión (ver P4) |

> En resumen: la matriz restringe **a quién** se llama; la COS restringe **qué privilegios** tiene el usuario. Son mecanismos **complementarios**.

---

## 5. Configuración de enlaces (teoría)

### 📘 Qué es un enlace

Un **enlace** es una interfaz de línea (**troncal**) que conecta la PABX con:

- la **RTB**, o
- **otra PABX** (*tie-line*).

El enlace se identifica por su **código de enlace**, un valor numérico que depende de:

- la **tarjeta hardware** donde está, y
- el **puerto físico**.

> **Ejemplo:** código `01002` → tarjeta **01 (MFU)** + puerto **002**.
> La numeración de puertos depende del hardware; hay que consultar la documentación de la PABX.

```text
 01002
 ├─ 01  → tarjeta (MFU)
 └─ 002 → puerto físico
```

### 📘 Enlaces disponibles en el laboratorio

| Tipo | Estado | Uso en la asignatura |
|---|---|---|
| **RDSI** | Configurados como **extensiones**, no como troncales | **Se ignoran** |
| **IP** | Troncales entre centralitas | ✅ Se usan |

- Cada centralita tiene **4 enlaces IP** definidos.
- Se comunican a través de la **red de datos** que conecta las centralitas mediante el **Router C (red de gestión)**.
- **Consecuencia directa:** solo se pueden mantener **4 llamadas simultáneas** entre una centralita y el exterior.

### 📘 Parámetros por enlace

Como en las extensiones, cada enlace tiene parámetros configurables. Para verlos: *Enlaces → IP → Listar enlaces*. Desde ahí hay dos pantallas:

| Pantalla | Cómo acceder |
|---|---|
| **Enlace IP** | Seleccionando el **código del enlace** |
| **Enlace genérico** | Seleccionando el **número de la guía telefónica** asociado al enlace |

### 📘 Rutas de enlace

Una **ruta de enlace** es un conjunto de enlaces agrupados con **una única numeración telefónica**.

**Para qué sirve:**

1. Definir **parámetros comunes** para todos sus enlaces.
2. Al encaminar una llamada, basta indicar **la ruta**, no un enlace concreto.
3. Es **más eficiente**: cualquier llamada puede potencialmente capturar **cualquier** enlace de la ruta.

### 🔎 Analogía

```text
SIN RUTA (enlace a enlace)                 CON RUTA
 Llamada 1 ──► Enlace 1 (ocupado ✗)         Llamada 1 ─┐
 Llamada 2 ──► Enlace 1 (ocupado ✗)         Llamada 2 ─┼─► [ RUTA IP ] ─► E1 | E2 | E3 | E4
 → fallos aunque E2..E4 estén libres        Llamada 3 ─┘    (busca el primero libre)
```

Es el mismo principio que un *trunk group*: se **comparte** la capacidad y se reduce el bloqueo.

---

## 6. Tarea 2 · Comprobación de enlaces, rutas de enlace y parámetros

### 📘 Enunciado

| Apdo. | Qué hay que hacer |
|---|---|
| **a** | Visualizar los enlaces definidos en la PABX; fijarse en los **códigos de los enlaces IP** |
| **b** | Observar los parámetros del **enlace IP** (clic en el código) y del **enlace genérico** (clic en el número de la guía telefónica) |
| **c** | Identificar los **miembros de la ruta IP**. ¿Se corresponden con los enlaces IP definidos? |
| **d** | ¿Qué **numeración** tiene asignada la ruta IP? |
| **e** | Localizar el parámetro **«Supervisión del tiempo de respuesta en tráfico entrante automático»**. ¿Qué significa? |
| **f** | Cambiarlo a **5 segundos**. ¿Cómo comprobar los efectos? ¿Hay que cambiarlo en todos los enlaces? ¿Por qué? |
| **g** | A partir de ese parámetro, averiguar **en qué orden se capturan los enlaces** en llamadas simultáneas |

> 📝 **Nota del enunciado (apdo. f):** para cambiar un campo en varios enlaces a la vez → modificar el valor, **remitir**, **seleccionarlo con el tick de la izquierda** y usar la opción **copiar**.

### 🔎 Guía de resolución

**a) Listar enlaces.** *Enlaces → IP → Listar enlaces*. Deben aparecer 4 enlaces IP; anotar sus códigos (formato `tarjeta + puerto`, como `01002`).

**b) Parámetros.** Comparar las dos pantallas:

- *Enlace IP*: datos propios de la interfaz (parámetros técnicos de la línea).
- *Enlace genérico*: datos asociados a la entrada de la guía telefónica (comportamiento de llamada, supervisiones, etc.).

**c) Miembros de la ruta IP.** Abrir la ruta de enlace IP y comprobar que sus miembros son los **mismos 4 enlaces IP** listados en (a). Se espera que **sí coincidan**, pues la ruta se construye con los enlaces del mismo tipo.

**d) Numeración.** Consultar el número de guía asignado a la ruta IP (es el que se marca para «salir» por esa ruta). Anotarlo para la Tarea 3.

**e) Significado del parámetro.**
*Supervisión del tiempo de respuesta en tráfico entrante automático* = tiempo máximo que la PABX espera a que la **llamada entrante por el enlace** sea contestada/progresada por el destino antes de **considerarla fallida y liberar el enlace**, intentando otra opción.

- Entrante: llega desde el otro lado del troncal.
- Automático: sin intervención de operadora (llamada directa a una extensión).
- Evita que un enlace quede **colgado/ocupado** indefinidamente.

**f) Poner 5 s y comprobar.**

1. Cambiar el valor a **5**.
2. Probar: realizar una llamada entrante hacia un destino que **no conteste** durante más de 5 s y **cronometrar** cuándo se libera/rechaza.
3. **¿Hay que cambiarlo en todos los enlaces? Sí, si se quiere un comportamiento homogéneo**: los parámetros son **por enlace**, y la llamada puede capturar cualquiera de los 4. Si solo se cambia uno, el efecto aparecerá **únicamente** cuando la llamada use ese enlace, dando resultados aparentemente aleatorios.
4. Para no repetirlo 4 veces: modificar, *remitir*, marcar el *tick* y **copiar** al resto.

**g) Orden de captura de los enlaces.**
Truco de la práctica: **dejar valores distintos en cada enlace** (p. ej., solo en uno a 5 s y el resto con otro valor) y hacer **llamadas simultáneas**. Observando cuál expira primero se identifica **qué enlace se ocupó en primer lugar, en segundo…** y se deduce el **orden de captura** (secuencial por código de enlace, ascendente/descendente, o cíclico).

> 🔎 *Idea clave:* el parámetro funciona como **marcador** para «etiquetar» cada enlace y descubrir el algoritmo de selección de la ruta.

---

## 7. Tarea 3 · Encaminamiento de las llamadas en los enlaces

### 📘 Enunciado

| Apdo. | Qué hay que hacer |
|---|---|
| **a** | Revisar *Sistema → Parámetros del sistema → Datos IP generales* (dirección IP de la red) y **datos de la tarjeta IPU** |
| | • ¿Cuál es la **IP de la tarjeta IPU**? |
| | • Ver dónde están configuradas las **IP de las otras PABX** (cada IP asociada a un **nodo** con una **referencia**) |
| **b** | En *Servicios → Interconexión de red → Router de red privada*: ver la configuración de numeraciones. ¿Cómo se encamina una numeración hacia una isla concreta? ¿Para qué sirve la **referencia del nodo**? |
| **c** | **Cambiar** el encaminamiento de la numeración hacia **otra isla**, verificar si la llamada sale y **explicar** el resultado. Observar el **tono** del teléfono. **Revertir** y comprobar |

> ⚠️ **No cambiar la dirección IP de la IPU:** se perdería el acceso a la centralita por la red de gestión.

### 🔎 Cómo interpretar la configuración

```text
          ROUTER DE RED PRIVADA
 ┌───────────────────────────────────────────┐
 │ Numeración (prefijo)  →  Referencia nodo  │
 │      2xx              →      Nodo 2       │
 │      3xx              →      Nodo 3       │
 └──────────────────────┬────────────────────┘
                        │
        ┌───────────────┴────────────────┐
        │ Tabla de nodos (Datos IP)      │
        │ Referencia nodo → Dirección IP │
        │   Nodo 2      → 10.x.x.2       │
        │   Nodo 3      → 10.x.x.3       │
        └────────────────────────────────┘
```

(*Las direcciones y prefijos son ilustrativos; hay que leer los reales en la PABX.*)

**b) Respuestas:**

- **Encaminar una numeración a una isla:** en el router de red privada se asocia el **prefijo/numeración** a un **nodo** (mediante su referencia).
- **Referencia del nodo:** es el **identificador lógico** que enlaza dos tablas: el router de numeraciones (*«este número va al nodo N»*) y la tabla de direcciones IP (*«el nodo N tiene esta IP»*). Gracias a ella, cambiar una IP no obliga a reeditar todas las numeraciones.

**c) Experimento y explicación esperada:**

| Acción | Resultado esperable | Explicación |
|---|---|---|
| Redirigir la numeración de la isla X hacia la isla Y | La llamada **no llega** a la extensión esperada (o llega a una isla equivocada, o no se cursa) | La PABX envía la señalización a la **IP del nodo Y**, que **no tiene** esa numeración (o no tiene destino válido) y **rechaza/no resuelve** la llamada |
| Tono del teléfono | Normalmente **ocupado/congestión** (no el tono de llamada) | Es la señal de fallo de encaminamiento devuelta al llamante |
| Revertir | La llamada **vuelve a funcionar** | Se restablece la asociación numeración → nodo correcto |

> 🔎 La práctica demuestra que el **plan de numeración** y el **encaminamiento** deben ser **coherentes en todas las centralitas** de la red privada.

---

## 8. Configuración de grupos (teoría)

### 📘 Definición

En una PABX se puede asignar **un único número de la guía telefónica a un conjunto de extensiones**: eso es un **grupo**.
Las llamadas al grupo se dirigen a **uno o más números de la guía libres y sin desvíos** dentro del grupo, siguiendo un **orden de búsqueda** definido.

### 📘 Tipos tratados

| Tipo | Apartado | Tarea |
|---|---|---|
| **Captura** | 4.1 | Tarea 4 |
| **PBX (búsqueda)** | 4.2 | Tarea 5 |
| **ACD** | 4.3 | Tarea 6 |

---

## 9. Tarea 4 · Grupo de captura

### 📘 Concepto (apartado 4.1)

**Capturar** una llamada consiste en:

1. Una extensión **recibe** una llamada y está sonando.
2. Desde **otra** extensión, **sin que la primera descuelgue**, se marca un **código predefinido**.
3. La llamada **pasa a sonar/atenderse** en la extensión que marcó el código.

Un **grupo de captura** es un conjunto de extensiones que **pueden capturarse las llamadas entre sí**. El **código de captura es único** en toda la PABX.

```text
   Llamante ───► Ext. 201 (suena) ──┐
                                    │  Ext. 202 marca 888
                                    ▼
                          La llamada se atiende en 202
```

### 📘 Enunciado

| Apdo. | Acción |
|---|---|
| **a** | Definir un **código de captura** en *Grupos → Captura de Llamadas*. **Usar la numeración `888`**. |
| **b** | Definir un grupo de captura y probar. Probar **más de un grupo**. ¿Qué pasa al capturar una llamada a una extensión **dentro** de tu grupo? ¿Y si es de una extensión **fuera** del grupo? |

### 🔎 Procedimiento y resultados esperados

1. Crear el código **888** (único en la PABX).
2. Crear el **grupo de captura 1** con las extensiones A, B y C.
3. Crear, opcionalmente, el **grupo de captura 2** con D y E.
4. Pruebas:

| Prueba | Resultado esperado |
|---|---|
| Alguien llama a A; B (mismo grupo) marca **888** | ✅ La llamada **se captura** en B |
| Alguien llama a A; D (grupo 2) marca **888** | ❌ **No se captura**: D no pertenece al grupo de A |
| Alguien llama a una extensión sin grupo; cualquiera marca 888 | ❌ No se captura |

> 🔎 **Conclusión:** el código es **global** pero el alcance de la captura está **limitado a los miembros del mismo grupo**. Sirve para que compañeros cubran la llamada de otro sin tener que desviar.

---

## 10. Tarea 5 · Grupo PBX

### 📘 Concepto (apartado 4.2)

El **grupo PBX** (o **grupo de búsqueda PBX**) se usa cuando **varias personas con tareas comunes atienden el tráfico entrante**.

La **búsqueda de un miembro libre** puede hacerse con distribución:

- **En serie:** *cíclica* o *secuencial*.
- **En paralelo.**

**Mensaje de cola:** cada grupo PBX tiene el suyo propio. Si una llamada entra en cola porque el grupo está ocupado, el llamante oye el mensaje del grupo y después **silencio** o **música en espera** (si la música en espera múltiple está programada).

### 📘 Enunciado

| Apdo. | Qué hay que hacer |
|---|---|
| **a** | Crear un grupo PBX con numeración **`x09`**, con **3 extensiones**. Las llamadas se harán desde una **cuarta** extensión |
| **b** | ¿Cómo funciona la distribución **secuencial**? |
| **c** | ¿Y la **cíclica**? |
| **d** | ¿Y la **paralela**? |
| **e** | ¿Qué es la **posición de salida**? ¿Cuándo se encaminan las llamadas a ella? Comprobarlo configurando una extensión como posición de salida |

> `x` = dígito de la isla/centralita (p. ej. `x09` → 109, 209…).

### 🔎 Comparativa de distribuciones (b, c, d)

Supongamos el grupo con miembros **[M1, M2, M3]**, todos libres, y tres llamadas sucesivas que se van terminando.

| Distribución | Cómo busca | Con M1, M2, M3 libres, llamadas sucesivas | Cuándo conviene |
|---|---|---|---|
| **Secuencial** | **Siempre empieza por el primero** de la lista y baja hasta hallar uno libre | M1, M1, M1… (M2 solo si M1 está ocupado) | Cuando hay **jerarquía/prioridad** (el primero es el titular, los demás respaldo) |
| **Cíclica** | **Continúa desde el siguiente** al último que atendió (rotación) | M1, M2, M3, M1… | **Reparto equitativo** de carga entre miembros |
| **Paralela** | **Suenan todos** los miembros libres a la vez; contesta el primero que descuelga | Suenan M1+M2+M3 simultáneamente | **Respuesta rápida**; pequeños equipos (ruido/estrés mayor) |

**Cómo comprobarlo:** llamar al `x09` varias veces desde la 4ª extensión, **contestar y colgar** en cada intento, y anotar **quién suena** en cada caso.

### 🔎 Apartado e) Posición de salida

- **Definición:** extensión (o destino) **designada como salida del grupo**, a la que se **desvía la llamada** cuando **no puede ser atendida por el grupo** de la manera normal.
- **Cuándo se usa (casos típicos):** cuando ninguno de los miembros está disponible/atiende (todos ocupados, sin respuesta, o fuera de servicio), según cómo esté configurado el grupo.
- **Cómo verificarlo:**
  1. Configurar una extensión libre (p. ej., la de recepción o un buzón) como **posición de salida**.
  2. Dejar los 3 miembros **ocupados o sin contestar**.
  3. Llamar al `x09` desde la 4ª extensión → la llamada debe **acabar en la posición de salida**.
  4. Quitar la posición de salida y repetir: ahora la llamada entra en **cola** (mensaje + silencio/música) o da ocupado.

> ⚠️ El enunciado **no detalla** las condiciones exactas; hay que verificarlas empíricamente en la PABX del laboratorio.

---

## 11. Tarea 6 · Grupos ACD

### 📘 Concepto (apartado 4.3)

**ACD** (*Automatic Call Distribution*) implementa un **sistema de espera con gestión de cola inteligente**:

- Los **agentes** se incorporan o marchan del sistema desde el **terminal de operadora**.
- El sistema, según el **número de operadores activos**, puede **determinar el tamaño de cola** necesario para cumplir los requisitos de **calidad de servicio**.
- Cada agente tiene un terminal con **un botón por cada grupo ACD** de la PABX, para elegir a qué grupos está disponible.
- Existe el botón **ACD ready**: el agente indica que **está disponible**, y se le encaminan las llamadas de los grupos a los que pertenece.

### 🔎 ¿Qué aporta ACD frente al grupo PBX?

| Característica | Grupo PBX | Grupo ACD |
|---|---|---|
| Alta/baja de miembros | Fija (configuración) | **Dinámica** (el agente entra/sale desde su terminal) |
| Gestión de cola | Mensaje de cola + silencio/música | **Cola inteligente**, tamaño ajustable por calidad de servicio |
| Disponibilidad | Por estado de la extensión | Por botón **ACD ready** |
| Información al agente | Limitada | **Display con nº de llamadas en cola** |
| Tiempo post-llamada | No | **Tiempo administrativo** |
| Escenario típico | Pequeño equipo/departamento | **Centro de atención al cliente** |

### 📘 Enunciado

| Apdo. | Acción |
|---|---|
| **a** | **Borrar** el grupo PBX `x09` y crear el **grupo ACD-0** con numeración **`x090`**. Menú: *Servicios → Centro de Llamadas → Grupos ACD* |
| **b** | Dar un **nombre de directorio** al grupo ACD y comprobar que **aparece en los terminales** al llamar al grupo |
| **c** | Programar **teclas libres** del teléfono (extensión → menú superior → **Teclas programables**) |
| **d** | Activar **ACD ready** en **un solo terminal** del ACD-0 y hacer **varias llamadas**; ver en el display **cuántas llamadas hay en cola** |
| **e** | Con llamadas en cola, hacer que el agente **cuelgue**; comprobar que la nueva llamada solo entra **pasado un tiempo** (**tiempo administrativo**) |
| **f** | Con llamadas en cola, **activar otra extensión** y comprobar que las llamadas en cola se **encaminan al nuevo agente** |
| **g** | Crear el **grupo ACD-1** con numeración **`x091`** |
| **h** | Probar llamadas a un grupo y a otro; verificar en los agentes los **elementos de las dos colas** |
| **i** | **Modificar los tamaños de cola** y comprobar qué ocurre **cuando no caben más llamadas** |

### 📘 Teclas programables (apdo. c)

| Tecla | Función |
|---|---|
| **A** | **ACD Ready** |
| **B** | **Grupo ACD-0** |
| **C** | **Grupo ACD-1** |

**Comportamiento de los LED (📘):**

| Situación | Indicador |
|---|---|
| Teclas B y C recién creadas | 🔴 **Rojo fijo** = terminal **registrado** en ACD0 y ACD1 |
| Pulsar B o C | Se **apaga** el LED → el terminal se **desregistra** de ese grupo |
| Pulsar **ACD ready** | El agente declara que **está preparado** para recibir llamadas en los grupos donde está apuntado |
| Llega una llamada | **Parpadea** el LED de la tecla del grupo destino; hay que **pulsar esa tecla** para contestar |

### 🔎 Diagrama de estados del agente

```text
                   pulsar tecla grupo                 pulsar ACD ready
 [No registrado] ◄──────────────────► [Registrado, no listo] ───────────► [LISTO]
                     (LED apagado/rojo)                                       │
                                                                  llega llamada│
                                                                              ▼
                                                                        [Sonando]
                                                                              │ pulsar tecla del grupo
                                                                              ▼
                                                                       [En llamada]
                                                                              │ cuelga
                                                                              ▼
                                                                   [Tiempo administrativo]
                                                                              │ vence el tiempo
                                                                              ▼
                                                                        [LISTO] ──► siguiente llamada
```

### 🔎 Guía de resolución por apartados

**a–b) Crear ACD-0.** Borrar el grupo PBX `x09`; crear ACD-0 con `x090`; asignar un **nombre** (p. ej., *Soporte*). Al llamar a `x090`, el teléfono llamante/agente debe mostrar ese nombre.

**c) Teclas.** Seleccionar la extensión del agente → **Teclas programables** → asignar A, B y C (para C hace falta que **ACD-1 exista**; se crea en el apdo. g, así que puede completarse después).

**d) Cola visible.** Con un único agente en *ready* y atendiendo una llamada, el resto de llamadas (hechas desde otras extensiones) **esperan en cola**; el display del agente muestra **cuántas hay en espera**.

**e) Tiempo administrativo.**

- Observación: el agente cuelga, y la llamada siguiente **no suena inmediatamente**.
- Explicación: la PABX da un **margen** para que el agente **anote datos o cierre gestiones** sobre la llamada que acaba de terminar antes de asignarle otra.
- Mejora de calidad de servicio: evita que el agente reciba llamadas encadenadas sin pausa. Pero **aumenta el tiempo de espera** de los llamantes.

**f) Incorporación de un segundo agente.** Al activar *ACD ready* en otra extensión, las **llamadas ya en cola** se reparten al **nuevo agente** (no hay que volver a llamar): demuestra que la cola es **del grupo**, no de un agente concreto.

**g–h) Segundo grupo.** Crear ACD-1 (`x091`). Cada grupo mantiene **su propia cola**. En un agente adscrito a ambos, el LED parpadeante indica **a qué grupo** corresponde cada llamada.

**i) Tamaño de las colas.**

| Situación | Resultado esperable |
|---|---|
| Cola con huecos | La llamada **espera** (mensaje + silencio/música) |
| Cola **llena** | La llamada **se rechaza** (tono de ocupado) o se **desvía** según la configuración del grupo |
| Aumentar el tamaño | Se admiten **más llamadas** simultáneas en espera |

> 🔎 Dimensionar la cola es un **compromiso**: colas largas → menos llamadas perdidas pero **más espera**; colas cortas → menos espera pero **más rechazos**.

---

## 12. Tabla resumen de menús de la PABX

| Objetivo | Ruta de menú |
|---|---|
| Asignar grupo de tráfico a extensión | Menú de extensión → **Grupo de tráfico** (*cód. 0102*) |
| Matriz de tráfico | **Sistema → Servicios del sistema → Matriz de grupo de tráfico** |
| Listar enlaces IP | **Enlaces → IP → Listar enlaces** |
| Parámetros IP generales e IPU | **Sistema → Parámetros del sistema → Datos IP generales** |
| Router de red privada (numeraciones → nodos) | **Servicios → Interconexión de red → Router de red privada** |
| Código y grupos de captura | **Grupos → Captura de Llamadas** |
| Grupos ACD | **Servicios → Centro de Llamadas → Grupos ACD** |
| Teclas de agente | Seleccionar extensión → **Teclas programables** |

---

## 13. Comparativa de tipos de grupo

| | **Captura** | **PBX** | **ACD** |
|---|---|---|---|
| Finalidad | Cubrir llamadas de compañeros | Atender llamadas entrantes en equipo | Centro de atención con colas |
| Número propio | No (usa código `888`) | Sí (`x09`) | Sí (`x090`, `x091`) |
| Se marca para… | Capturar una llamada que suena en otra | Llamar al grupo | Llamar al grupo |
| Distribución | — | Secuencial / cíclica / paralela | Por agente disponible (*ready*) |
| Cola | No | Sí (mensaje propio + silencio/MOH) | Sí (inteligente, dimensionable) |
| Alta/baja de miembros | Configuración | Configuración | **Dinámica** desde el terminal |
| Datos al agente | No | No | Nº de llamadas en cola, LED por grupo |

---

## 14. Errores típicos y consejos

1. **No importar el backup inicial** → configuraciones previas alteran los resultados.
2. **Dejar A en el grupo de tráfico 0** en la Tarea 1: el grupo 0 permite todo, el bloqueo nunca se aplicará.
3. **Cambiar la IP de la IPU** (Tarea 3): se pierde el acceso por la red de gestión.
4. **Olvidar revertir** el encaminamiento de la Tarea 3: rompe la comunicación entre islas en tareas posteriores.
5. **Modificar el parámetro de supervisión en un solo enlace** (Tarea 2): comportamiento intermitente según el enlace capturado.
6. **No remitir** antes de usar *copiar* con el tick de la izquierda.
7. **Crear la tecla C sin existir ACD-1**: crear antes el grupo o completar la tecla después.
8. **No pulsar ACD ready** en los agentes: no recibirán llamadas aunque estén registrados.
9. **Olvidar el límite de 4 enlaces IP**: más de 4 llamadas simultáneas hacia otra isla fallarán (es un comportamiento esperado, no un fallo).
10. Anotar **qué se cambió** en cada tarea para poder revertirlo.

---

## 15. Checklist final

- [ ] Backup original importado
- [ ] **T1** Llamada A→B OK; A y B en grupos distintos (≠0); matriz bloquea A→B; respondido apdo. d (matriz vs COS)
- [ ] **T2** Enlaces IP listados; parámetros observados; miembros y numeración de la ruta IP; parámetro de supervisión a 5 s en los 4 enlaces; orden de captura deducido
- [ ] **T3** IP de la IPU anotada; IP de otros nodos localizadas; encaminamiento alterado, explicado y **revertido**
- [ ] **T4** Código `888` creado; grupo(s) de captura probados dentro y fuera del grupo
- [ ] **T5** Grupo `x09` con 3 miembros; secuencial, cíclico y paralelo probados; posición de salida verificada
- [ ] **T6** `x09` borrado; ACD-0 (`x090`) con nombre; teclas A/B/C; cola visible; tiempo administrativo; segundo agente; ACD-1 (`x091`); tamaños de cola probados

---

*Documento generado a partir de `ST_P5_ConfAvanzadaPABX_2023.pdf`. Los resultados esperados de las secciones 🔎 son orientativos y deben contrastarse con el comportamiento real de la PABX del laboratorio.*
