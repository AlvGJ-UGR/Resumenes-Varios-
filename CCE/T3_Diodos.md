# Tema 3 — Diodos

**Asignatura:** Componentes y Circuitos Electrónicos
**Titulación:** Grado en Ingeniería de Tecnologías de Telecomunicación — Universidad de Granada (UGR)

> Resumen/esquema completo del Tema 3. Todo el contenido procede de las diapositivas del tema. Los apartados marcados con **➕ Ampliación** son aclaraciones o resultados complementarios que **no aparecen en las diapositivas** pero ayudan a entender o a resolver problemas.

---

## Índice

1. [Introducción al diodo ideal](#1-introducción-al-diodo-ideal)
2. [Característica I-V del diodo común](#2-característica-i-v-del-diodo-común)
3. [Dependencia con la temperatura](#3-dependencia-con-la-temperatura)
4. [Modelado de diodos (gran señal)](#4-modelado-de-diodos-gran-señal)
   - 4.1 Modelo exacto (exponencial) y recta de carga
   - 4.2 Modelos simplificados
   - 4.3 Método de resolución de circuitos con diodos
   - 4.4 Ejercicio resuelto: dos diodos en serie
5. [Modelo de pequeña señal](#5-modelo-de-pequeña-señal)
   - 5.1 Linealidad y superposición
   - 5.2 Linealización por Taylor
   - 5.3 Pequeña señal en el diodo: resistencia dinámica $r_d$
   - 5.4 Modelo de alta frecuencia
   - 5.5 Procedimiento general y ejercicio resuelto
6. [Tipos de diodos y aplicaciones](#6-tipos-de-diodos-y-aplicaciones)
   - 6.1 Símbolos
   - 6.2 Rectificadores y diodos de conmutación
   - 6.3 Diodo Zener y regulación de tensión
   - 6.4 Varactores (varicap)
   - 6.5 Circuitos de rectificación
   - 6.6 LED
   - 6.7 Fotodiodo
7. [Formulario resumen](#7-formulario-resumen)
8. [Tabla comparativa de modelos](#8-tabla-comparativa-de-modelos)
9. [Errores típicos y trucos](#9-errores-típicos-y-trucos)
10. [Preguntas de repaso](#10-preguntas-de-repaso)

---

## 1. Introducción al diodo ideal

**Definición:** el diodo es un **dispositivo no lineal que sólo permite el paso de corriente en un sentido**.

- Terminales: **ánodo (A)** y **cátodo (K)**. La corriente fluye de ánodo a cátodo (en el sentido de la flecha del símbolo).
- Ejemplos de encapsulados comerciales (axiales, con una banda que marca el cátodo): **1N4148, 1N914, 1N4007**.

### Comportamiento del diodo ideal

| Estado | Condición | Equivalente |
|---|---|---|
| **Polarización inversa (corte)** | $v < 0 \Rightarrow i = 0$ | Circuito abierto |
| **Polarización directa (conducción)** | $i > 0 \Rightarrow v = 0$ | Cortocircuito |

La característica I-V del diodo ideal es una "L": corriente nula para $v<0$ y una recta vertical (tensión 0, corriente cualquiera positiva) en $v=0$.

### Aplicaciones generales (diapositiva 2)

- **Rectificador** (rectifier): convierte AC en DC pulsante.
- **Recortador** (clipper): limita la amplitud de una señal por arriba y/o por abajo.
- **Fijador de nivel / circuito de anclaje** (clamping): desplaza el nivel DC de una señal sin cambiar su forma. Ejemplo de la diapositiva: una señal que oscila entre −10 V y +10 V pasa a oscilar entre 0 V y +20 V.
- **Protección de circuitos** (circuit protection), p. ej. el **diodo de bloqueo** (blocking diode) en serie con una batería y la carga para evitar corrientes inversas.
- **Multiplicador de tensión** (voltage multiplier): con dos diodos y dos condensadores se obtiene $V_o = 2V_m$ a partir de una señal alterna de amplitud $V_m$.
- **Supresión de picos** (spike suppression): elimina picos y transitorios de tensión.

---

## 2. Característica I-V del diodo común

### Ecuación de Shockley

$$
i_D = I_S\left(e^{\frac{q\,v_D}{n k_B T}} - 1\right) = I_S\left(e^{\frac{v_D}{n V_T}} - 1\right)
$$

| Símbolo | Significado |
|---|---|
| $n$ | **Factor de no idealidad**, $1 < n < 2$ |
| $V_T = k_B T / q$ | **Tensión térmica** |
| $I_S$ | **Corriente inversa de saturación** |
| $q$ | Carga del electrón |
| $k_B$ | Constante de Boltzmann |
| $T$ | Temperatura absoluta (K) |

### Constantes (tabla de la diapositiva)

| Constante | Símbolo | Valor |
|---|---|---|
| Carga del electrón | $q$ | $1.602\times10^{-19}$ C |
| Velocidad de la luz en vacío | $c$ | $2.998\times10^{10}$ cm·s⁻¹ |
| Constante dieléctrica del vacío | $\varepsilon_0$ | $8.854\times10^{-14}$ F·cm⁻¹ |
| Masa del electrón | $m_e$ | $9.11\times10^{-31}$ kg |
| Constante de Planck | $h$ | $6.625\times10^{-34}$ J·s |
| Constante de Boltzmann | $k_B$ | $1.38\times10^{-23}$ J·K⁻¹ |
| Número de Avogadro | $A_0$ | $6.022\times10^{23}$ mol⁻¹ |
| **Tensión térmica** | $V_T = kT/q$ | **0.025852 V** (a $T = 300$ K) |

> En los ejercicios también se usa $k_B = 8.6\times10^{-5}$ eV/K, con lo que $V_T = k_BT/q \approx 25.8$ mV a 300 K.

### Casos según la polarización

- **Inversa ($v_D < 0$):** el término exponencial es despreciable y $i_D = -I_S$ (corriente muy pequeña y casi constante).
- **Directa ($v_D > 0$):** cuando $v_D \gg nV_T$ se puede despreciar el "−1":

$$
i_D \approx I_S\, e^{\frac{q v_D}{n k_B T}} = I_S\, e^{\frac{v_D}{nV_T}}
$$

### Regiones de la curva I-V (diapositiva 3)

1. **Directa (forward):** corriente prácticamente nula hasta ≈ 0.5 V; a partir de ≈ 0.7 V (silicio) la corriente crece muy rápido (casi vertical).
2. **Inversa (reverse):** corriente $-I_S$, minúscula (escala expandida en la gráfica).
3. **Ruptura (breakdown):** al alcanzar $-V_{ZK}$ la corriente inversa aumenta bruscamente (escala comprimida).

### La "regla de los 59 mV por década"

Sean dos puntos A y B en la zona directa con $i_A = I_S e^{v_A/V_T}$ e $i_B = I_S e^{v_B/V_T}$ (con $n=1$). Dividiendo:

$$
\frac{i_B}{i_A} = e^{\frac{v_B - v_A}{V_T}}
\;\Rightarrow\;
v_B - v_A = V_T \ln\!\left(\frac{i_B}{i_A}\right) = 2.3\,V_T \log\!\left(\frac{i_B}{i_A}\right)
$$

Para una década de corriente ($i_B/i_A = 10$):

$$
v_B - v_A = 2.3\,V_T \log(10) \approx 59\ \text{mV}
$$

**Conclusión:** una variación de una década en la corriente sólo supone ≈ 59 mV de variación de tensión. Por eso, en los modelos simplificados, se utiliza una **tensión de codo fija $V_\gamma = V_{D0}$** por tecnología:

| Tecnología | $V_\gamma = V_{D0}$ (a temperatura ambiente) |
|---|---|
| **Silicio** | ≈ 0.65 V (en otros ejercicios 0.6–0.7 V) |
| **Germanio** | ≈ 0.3 V |

> ➕ **Ampliación:** el factor $2.3$ es $\ln 10 \approx 2.303$. Con $n \neq 1$ la variación por década es $n\cdot 59$ mV.

---

## 3. Dependencia con la temperatura

- Tanto **$V_T$ como $I_S$ dependen de la temperatura**.
- En un **diodo de silicio**, para una **corriente fija**, la tensión del diodo **disminuye ≈ 2 mV por cada °C** que aumenta la temperatura:

$$
\frac{\Delta v_D}{\Delta T} \approx -2\ \text{mV/°C}
$$

- Gráficamente (diapositiva 4): si $T_2 > T_1$, la curva I-V de $T_2$ está **desplazada hacia la izquierda** (a la misma corriente $I$ le corresponde menos tensión).

> ➕ **Ampliación:** $I_S$ crece muy rápido con $T$ (duplica aproximadamente cada 5 °C en silicio), lo que domina sobre el aumento de $V_T$ y provoca el coeficiente negativo de tensión. Esta propiedad se aprovecha para usar diodos como sensores de temperatura.

---

## 4. Modelado de diodos (gran señal)

### 4.1 Modelo exacto (exponencial) y recta de carga

Circuito de referencia: fuente $V_{DD}$ — resistencia $R$ — diodo, con corriente $I_D$ y tensión del diodo $V_D$.

- **Ecuación del circuito (recta de carga):**

$$
I_D = \frac{V_{DD} - V_D}{R}
$$

- **Ecuación del diodo (curva característica):**

$$
I_D = I_S\, e^{\frac{V_D}{nV_T}}
$$

- Igualando ambas: $I_D = I_R = I_S e^{\frac{V_D}{nV_T}} = \dfrac{V_{DD}-V_D}{R}$.

**Interpretación gráfica:** el diodo fija la curva característica y el circuito fija la **recta de carga** (pendiente $-1/R$, cortes en $V_{DD}/R$ sobre el eje de corriente y en $V_{DD}$ sobre el eje de tensión). **La solución es el punto de corte de las dos curvas: el punto de polarización $Q = (I_{DQ}, V_{DQ})$**.

Como la ecuación es **trascendente** (no tiene solución analítica), se resuelve por **iteración**:

$$
V_D = V_T \ln\!\left(\frac{V_{DD} - V_D}{I_S R}\right)
$$

**Ejemplo (diapositiva 5):** $V_{DD} = 5$ V, $R = 1$ kΩ, $I_S = 2$ fA, $n = 1$.

| Iteración | Valor de $V_D$ |
|---|---|
| $V_D^{(1)}$ (valor de partida) | 0.7 V |
| $V_D^{(2)} = V_T\ln\!\frac{V_{DD}-V_D^{(1)}}{I_S R}$ | 0.73 V |
| $V_D^{(3)} = V_T\ln\!\frac{V_{DD}-V_D^{(2)}}{I_S R}$ | 0.732 V |

La iteración converge muy rápido porque $V_D$ aparece dentro de un logaritmo (variaciones grandes de $I_D$ producen variaciones pequeñas de $V_D$). Con el resultado, $I_D = (5 - 0.732)/1\,\text{k}\Omega \approx 4.27$ mA.

> ➕ **Ampliación:** conviene empezar la iteración con $V_D \approx 0.6$–$0.7$ V (valor típico del silicio). El resultado es muy poco sensible al valor inicial.

### 4.2 Modelos simplificados

Se sustituye la curva exponencial por tramos rectos. Hay tres niveles, de menor a mayor precisión:

| Modelo | Característica | Circuito equivalente | Conducción ($V_D>V_0$) | Corte ($V_D<V_0$) |
|---|---|---|---|---|
| **Ideal** | "L" en $V=0$ | Cortocircuito | Interruptor cerrado | Interruptor abierto |
| **Ideal con desplazamiento** | Recta vertical en $V_0$ | Fuente $V_0$ (batería) | $V_D = V_0$ | Abierto |
| **Lineal a tramos** | Recta con pendiente $1/R_D$ desde $V_0$ | Fuente $V_0$ en serie con $R_D$ | $V_D = V_0 + I_D R_D$ | Abierto |

#### Ejercicio comparativo (diapositiva 6)

Datos: $V_{DD} = 5$ V, $R = 1$ kΩ, $V_{D0} = V_0 = 0.65$ V, $R_D = 20$ Ω.

**a) Modelo ideal** ($V_D = V_{D0} = 0$ V):

$$
I_D = \frac{5\ \text{V}}{1\ \text{k}\Omega} = 5\ \text{mA}
$$

**b) Modelo ideal con desplazamiento** ($V_D = V_{D0} = 0.65$ V):

$$
I_D = \frac{5\ \text{V} - V_D}{1\ \text{k}\Omega} = \frac{5 - 0.65}{1\,\text{k}\Omega} = 4.35\ \text{mA}
$$

**c) Modelo lineal a tramos** ($V_{D0} = 0.65$ V, $R_D = 20$ Ω):

$$
I_D = \frac{5\ \text{V} - V_{D0}}{R + R_D} = \frac{4.35}{1020} \approx 4.26\ \text{mA}
$$

$$
V_D = V_{D0} + I_D R_D = 0.65 + 4.26\,\text{mA}\cdot 20\,\Omega \approx 0.73\ \text{V}
$$

**Comparación con el modelo exacto** (≈ 4.27 mA, $V_D \approx 0.73$ V): el modelo **lineal a tramos casi coincide** con el exacto; el ideal con desplazamiento da un error pequeño; el ideal es el más burdo (5 mA).

### 4.3 Método de resolución de circuitos con diodos (diapositiva 7)

1. **Suponer** (de forma razonada) el estado de cada diodo (conducción o corte), ya que a priori es desconocido.
2. **Dibujar el circuito** sustituyendo cada diodo por su equivalente según el estado supuesto.
3. **Resolver el circuito:** calcular la **corriente** por cada diodo en conducción y la **caída de tensión** en cada diodo en corte.
4. **Comprobar** que las suposiciones son correctas, es decir, que **no hay contradicción**. Hay contradicción cuando:
   - la tensión en un diodo **supuesto en corte** es **mayor que la tensión umbral**, o
   - la corriente es **negativa** en un diodo **supuesto en directa**.
5. Si hay contradicciones, **volver al punto 1** y hacer una nueva suposición sobre los estados de los diodos.

> ➕ **Truco:** con $N$ diodos hay como máximo $2^N$ combinaciones de estados; pensar cuál es la más probable según el signo de las fuentes reduce el número de intentos.

### 4.4 Ejercicio resuelto: dos diodos en serie (diapositiva 8)

**Enunciado:** circuito con fuente $V_1 = 10$ V, diodos D1 y D2 en serie y resistencia $R_1 = 2$ kΩ.

**a)** Calcular la corriente con el modelo lineal a tramos: D1 con $V_{\gamma1} = 0.7$ V y $R_{D1} = 20$ Ω; D2 con $V_{\gamma2} = 0.6$ V y $R_{D2} = 20$ Ω. *(0.5 puntos)*

**b)** Calcular la corriente y las caídas de tensión en los diodos con la **expresión exacta**, con $I_{S1} = 10^{-12}$ A, $I_{S2} = 6\cdot10^{-12}$ A, $T = 300$ K, $V_T = k_BT/q$, $k_B = 8.6\cdot10^{-5}$ eV/K. *(1 punto)*

**Solución a):** suma de las tensiones umbral y de las resistencias en serie:

$$
I = \frac{V_1 - V_{\gamma1} - V_{\gamma2}}{R_1 + R_{D1} + R_{D2}} = \frac{10 - 0.7 - 0.6}{2000 + 20 + 20} \approx 4.26\ \text{mA}
$$

**Solución b):** misma corriente por ambos diodos (están en serie), $I_D$, y se cumple:

$$
I_D = \frac{V_1 - V_{D1} - V_{D2}}{R_1}, \qquad I_D = I_S\,e^{V_D/V_T} \;\Rightarrow\; V_D = V_T \ln\!\left(\frac{I_D}{I_S}\right)
$$

Sustituyendo ambas tensiones:

$$
I_D = \frac{V_1 - V_T\ln\!\left(\dfrac{I_D}{I_{S1}}\right) - V_T\ln\!\left(\dfrac{I_D}{I_{S2}}\right)}{R_1}
$$

Se resuelve por **iteración**, partiendo de $I_D^{(0)} = 4.26$ mA (la solución del apartado a):

| Iteración | $I_D$ |
|---|---|
| $I_D^{(1)}$ | 4.45 mA |
| $I_D^{(2)}$ | 4.45 mA (converge) |

**Resultado:** $I_D \approx 4.45$ mA.

> ➕ **Ampliación (caídas de tensión, que pide el enunciado):** con $V_T \approx 25.85$ mV y $I_D = 4.45$ mA:
> $V_{D1} = V_T\ln(I_D/I_{S1}) \approx 0.574$ V y $V_{D2} = V_T\ln(I_D/I_{S2}) \approx 0.528$ V.
> Comprobación: $(10 - 0.574 - 0.528)/2\,\text{k}\Omega \approx 4.45$ mA ✔.
> D2 tiene menor caída porque su $I_S$ es mayor (más corriente de saturación → menor tensión para la misma corriente).

---

## 5. Modelo de pequeña señal

### 5.1 Linealidad y superposición

- Hasta ahora el diodo se ha estudiado en **condiciones estacionarias**. Sin embargo, en la práctica se usa en **conmutación** o en **procesado de señales variables**, por lo que hay que estudiar el **comportamiento transitorio y de pequeña señal**.
- El comportamiento temporal viene determinado por el **tiempo necesario para eliminar o crear el exceso de carga en las zonas neutras** (hacen falta ecuaciones dependientes del tiempo: ecuación de continuidad en la unión PN).

**Sistema lineal:** si la salida es proporcional a la entrada,

$$
y(x) = A\,x \qquad (A \text{ constante})
$$

la curva de transferencia es una recta y se cumple el **principio de superposición**:

$$
y(x_0 + \Delta x) = A x_0 + A\,\Delta x = y(x_0) + y(\Delta x)
$$

En general, un **sistema lineal** es el que **verifica el principio de superposición**, sea cual sea la relación entrada-salida (proporcional, diferencial, integral o combinación lineal de ellas).

**Utilidad:** la superposición permite descomponer el problema en dos:
1. Respuesta con valores fijos de las entradas (**polarización**, DC).
2. Cambio de la respuesta al variar una de las entradas (**variaciones**).

### 5.2 Linealización por Taylor

Las curvas de transferencia de los dispositivos **no son lineales** en general (la I-V del diodo es exponencial). Para trabajar con sistemas lineales se **linealiza en torno a un punto de trabajo (o de polarización)** con el desarrollo en serie de Taylor (a primer orden):

$$
y(x_0 + \Delta x) \approx y(x_0) + \left(\frac{\partial y(x)}{\partial x}\right)_{x=x_0}\Delta x
$$

Esto permite seguir descomponiendo el problema en dos:

1. **Respuesta en el punto de polarización**, $y(x_0)$, **más** la respuesta a variaciones en torno a él, $\left(\frac{\partial y}{\partial x}\right)_{x_0}\Delta x$.
2. Obtener una **relación de proporcionalidad** entre las variaciones de salida y de entrada:

$$
\Delta y = \left(\frac{\partial y(x)}{\partial x}\right)_{x=x_0}\Delta x = y(x_0+\Delta x) - y(x_0)
$$

Desarrollos usados:

$$
e^x = \sum_{n=0}^{\infty}\frac{x^n}{n!} \qquad\qquad f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots
$$

**Definición de análisis de pequeña señal:** estudio de la respuesta del circuito ante **variaciones pequeñas ($\Delta x$) de tensión o corriente en torno a un punto de polarización DC** $(x_0, y(x_0))$. Se exige que sean **pequeñas** para que sea válida la aproximación lineal. Si además las variaciones son **sinusoidales**, se habla de **régimen de alterna o AC**.

### 5.3 Pequeña señal en el diodo

**Tensión aplicada:**

$$
v_D(t) = V_D + v_d(t)
$$

- $V_D$: tensión de polarización (**DC**).
- $v_d(t)$: variaciones de **pequeña señal**.

Se supone que $v_d$ es independiente del tiempo o **suficientemente lenta** como para que no influya el tiempo necesario para modificar la carga almacenada en las zonas neutras (aproximación de **baja frecuencia**).

**Corriente resultante:**

$$
i_D(t) = I_S\,e^{\frac{v_D(t)}{nV_T}} = I_S\,e^{\frac{V_D + v_d(t)}{nV_T}} = I_S\,e^{\frac{V_D}{nV_T}}\,e^{\frac{v_d(t)}{nV_T}} = I_D\,e^{\frac{v_d(t)}{nV_T}} \approx I_D\left(1 + \frac{v_d(t)}{nV_T}\right)
$$

(se ha desarrollado la exponencial a **primer orden** y se ha usado $I_D = I_S\,e^{V_D/(nV_T)}$).

> ⚠️ En la diapositiva el último término aparece escrito con $v_D(t)$ en lugar de $v_d(t)$; lo correcto es la tensión de **pequeña señal** $v_d(t)$.

Entonces:

$$
i_D(t) = I_D + \underbrace{\frac{I_D}{nV_T}\,v_d(t)}_{i_d(t)} = I_D + i_d(t)
$$

Por Taylor sobre la característica:

$$
i_D(t) = I_D + \left(\frac{\partial i_D}{\partial v_D}\right)_{v_D = V_D} v_d = I_D + i_d(t)
\;\Rightarrow\;
i_d(t) = \left(\frac{\partial i_D}{\partial v_D}\right)_{v_D = V_D} v_d(t) \equiv \frac{1}{r_d}\,v_d(t)
$$

Se obtiene una **relación lineal entre las pequeñas variaciones de corriente ($i_d$) y de tensión ($v_d$)**, y el coeficiente de proporcionalidad es una **resistencia**: la **resistencia dinámica (o de pequeña señal) del diodo**:

$$
\boxed{\,r_d \equiv \frac{n V_T}{I_D}\,}
$$

**Observaciones:**
- $r_d$ **depende del punto de polarización DC** (de $I_D$): a más corriente, menos resistencia.
- Su inversa $1/r_d$ es la **pendiente de la tangente a la curva I-V en el punto Q** (en la gráfica: "Tangent at Q, slope = $1/r_d$").
- **No coincide necesariamente** con la pendiente $1/R_D$ de la recta del modelo de gran señal lineal a tramos, salvo que esta se haya calculado precisamente a partir de la pendiente en el punto de polarización dado.

> ➕ **Ejemplo numérico:** con $n=1$, $V_T \approx 25.85$ mV: $I_D = 1$ mA → $r_d \approx 25.9\ \Omega$; $I_D = 10$ mA → $r_d \approx 2.6\ \Omega$. En la gráfica de la diapositiva 11, el punto Q está en $I_D = 1$ mA, $V_D \approx 0.70$ V, con $V_{D0} = 0.65$ V.

### 5.4 Modelo de pequeña señal

| Régimen | Modelo del diodo |
|---|---|
| **Baja frecuencia** | Sólo la resistencia $r_d$ |
| **Alta frecuencia** | $r_d$ **en paralelo con** $C_d$ (capacidad de difusión) **y** $C_j$ (capacidad de unión) |

En el modelo de alta frecuencia, las tres ramas ($C_d$, $r_d$, $C_j$) están en paralelo y se excitan con la fuente de pequeña señal $v_d$, que produce la corriente $i_d$.

> ➕ $C_d$ está asociada al almacenamiento de carga de minoritarios en las zonas neutras (importante en directa) y $C_j$ a la carga en la zona de deplexión (importante en inversa; es la capacidad que aprovecha el varactor).

### 5.5 Procedimiento general y ejercicio resuelto (diapositiva 13)

**Pasos para resolver un problema con pequeña señal:**

1. **Resolver el circuito en DC**: se hacen **cero las fuentes de pequeña señal**.
2. **Sustituir el dispositivo por su modelo de pequeña señal** y **anular las fuentes de continua** (las fuentes de tensión DC se cortocircuitan).
3. **Resolver el circuito con las fuentes de pequeña señal** para obtener las variaciones de pequeña señal en la salida.

(Después, el resultado total es la suma de la parte DC y la parte AC: **superposición**.)

**Ejercicio:** fuente $V^+$ de 10 V en continua con un rizado sinusoidal de 60 Hz y 0.5 V de amplitud, en serie con $R = 10\ \text{k}\Omega$ y un diodo. Calcular la tensión en el diodo en continua y la amplitud de la señal sinusoidal en la salida (superpuesta a la continua). Datos: caída del diodo 0.7 V; factor de idealidad $n = 2$.

$$
v_{source}(t) = V_{source} + v_{source}(t) = 10\ \text{V} + 0.5\ \text{V}\cdot\sin(2\pi\cdot 60\cdot t)
$$

**Paso 1 — DC:**

$$
I_D = \frac{V_{source} - V_D}{R} = \frac{10 - 0.7}{10\ \text{k}\Omega} = 0.93\ \text{mA}
\qquad (V_D = 0.7\ \text{V})
$$

**Paso 2 — Resistencia dinámica:**

$$
r_d = \frac{nV_T}{I_D} = \frac{2\cdot 25.8\ \text{mV}}{0.93\ \text{mA}} \approx 55.4\ \Omega
$$

**Paso 3 — Pequeña señal** (divisor de tensión entre $R$ y $r_d$):

$$
v_d(t) = 0.5\ \text{V}\cdot\frac{r_d}{r_d + R}\cdot\sin(2\pi\cdot60\cdot t) \approx 2.76\ \text{mV}\cdot\sin(2\pi\cdot 60\cdot t)
$$

**Resultado:** el diodo tiene **0.7 V en DC** y sobre él aparece un rizado de **≈ 2.76 mV de amplitud** (el rizado de 0.5 V queda atenuado ≈ 180 veces).

> **Idea clave:** el diodo polarizado en directa, visto en pequeña señal, es una resistencia muy pequeña ($r_d \ll R$), así que casi toda la variación cae en $R$ y muy poca en el diodo.

---

## 6. Tipos de diodos y aplicaciones

### 6.1 Símbolos

| Diodo | Idea del símbolo |
|---|---|
| **Diodo** (rectificador/señal) | Triángulo + barra |
| **Zener** | Barra con extremos doblados en "Z" |
| **Schottky** | Barra con extremos doblados en "S" |
| **Túnel** (tunnel) | Barra con extremos doblados hacia ambos lados (forma de "T") |
| **LED** (Light Emitting Diode) | Diodo con flechas **saliendo** (emite luz) |
| **Varactor / varicap** | Diodo con un condensador a su lado |
| **Fotodiodo** | Diodo con flechas **entrando** (recibe luz) |

### 6.2 Rectificadores y diodos de conmutación

**Rectificadores.** Aprovechan que el diodo sólo deja pasar corriente en un sentido. Deben acercarse lo máximo posible al diodo ideal:

- **Muy baja corriente en inversa.**
- **Tensión umbral próxima a 0 V.**
- **$R_S = 0\ \Omega$** (resistencia interna nula).
- **Tensión de ruptura elevada.**

Ejemplos comerciales: **1N4001, BYV95C**. Usos: componentes de **fuentes de alimentación DC**.

**Diodos de conmutación.** Para aplicaciones donde el **tiempo de conmutación** entre los estados de conducción y bloqueo debe ser **muy bajo**. Ejemplo: **UF4001**.

### 6.3 Diodo Zener y regulación de tensión

**Uso:** **circuitos de regulación de voltaje**; sirven para **estabilizar (o limitar) la tensión** en un punto del circuito. El Zener **fija la tensión de salida $V_O$** porque su resistencia dinámica $r_z$ es muy pequeña.

**Funcionamiento:**
- Se usa en **polarización inversa**, en la zona de ruptura (breakdown).
- Para corrientes mayores que la **corriente de codo $I_{ZK}$** ("knee current") la caída de tensión es **casi vertical**: la tensión apenas cambia aunque cambie mucho la corriente.
- **$r_z$ es muy pequeña**; $1/r_z$ es la pendiente de la curva I-V en esa zona. Una variación de corriente produce una variación de tensión:

$$
\Delta V = \Delta I \cdot r_z
$$

**Modelo del Zener (circuito equivalente):** fuente $V_{Z0}$ en serie con $r_z$.

- Estrictamente, en inversa: $-V_Z = -V_{Z0} - I_Z\,r_Z$.
- Como el Zener siempre se usa en inversa, para **simplificar** los cálculos se trabaja con módulos:

$$
\boxed{\,V_Z = V_{Z0} + I_Z\,r_Z\,}
$$

| Parámetro | Significado |
|---|---|
| $V_Z$ | Tensión Zener a la corriente de prueba $I_{ZT}$ (test current) |
| $V_{Z0}$ | Tensión de codo del modelo lineal (ordenada en el origen de la recta) |
| $r_Z$ | Resistencia dinámica del Zener |
| $I_{ZK}$ | Corriente mínima ("knee current") para seguir en la zona de regulación |
| $I_{ZT}$ | Corriente de prueba a la que se especifica $V_Z$ |

#### Ejercicio resuelto (diapositiva 16)

**Enunciado:** Zener de 6.8 V con $V_Z = 6.8$ V a $I_Z = 5$ mA, $r_z = 20\ \Omega$ e $I_{ZK} = 0.2$ mA. La alimentación $V^+$ vale nominalmente 10 V pero puede variar ±1 V. Resistencia en serie $R = 0.5\ \text{k}\Omega$.

**a) Hallar $V_O$ sin carga con $V^+$ nominal.**

Primero, $V_{Z0}$:

$$
V_Z = V_{Z0} + I_Z r_Z \;\Rightarrow\; V_{Z0} = 6.8 - 5\,\text{mA}\cdot 20\,\Omega = 6.7\ \text{V}
$$

Corriente por el Zener (sin carga, toda la corriente de $R$ pasa por el Zener):

$$
I = I_Z = \frac{V^+ - V_{Z0}}{R + r_Z} = \frac{10 - 6.7}{500 + 20} \approx 6.35\ \text{mA}
$$

Tensión de salida:

$$
V_O = V_{Z0} + I_Z r_Z = 6.7 + 6.35\,\text{mA}\cdot 20\,\Omega \approx 6.83\ \text{V}
$$

**b) Variación de $V_O$ para ±1 V en $V^+$ (sin carga):** divisor de tensión entre $R$ y $r_Z$:

$$
\Delta V_O = \Delta V^+\,\frac{r_Z}{R + r_Z} = \pm 1\cdot\frac{20}{520} \approx \pm 38.5\ \text{mV}
$$

Es decir, una variación de ±1 V en la entrada (±10 %) sólo produce ±38.5 mV (±0.6 %) en la salida: **regulación de línea de ≈ 38.5 mV/V**.

> ➕ **Con carga $R_L$** (figura de la diapositiva): $I = I_Z + I_L$, con $I_L = V_O/R_L$. Hay que comprobar siempre que **$I_Z \ge I_{ZK}$** (si no, el Zener sale de la zona de regulación y $V_O$ deja de estar fijada). El peor caso es $V^+$ mínima y $R_L$ mínima (máxima corriente de carga).

### 6.4 Varactores o diodos varicap

**Uso:** conseguir **capacidades controladas por tensión** (p. ej. **filtros sintonizados**), porque la **capacidad de unión depende de la tensión aplicada** entre sus extremos ($V_D$ o $V_A$). Se utilizan **en polarización inversa**.

$$
C_T = C_j = \frac{\varepsilon_S\,\text{Área}}{W} = \frac{C_{J0}}{\left(1 - \dfrac{V_D}{V_{bi}}\right)^{n}} \;\propto\; \lvert V_D\rvert^{-n}\quad\text{(en inversa)}
$$

- $W$: anchura de la zona de deplexión (aumenta con la tensión inversa, por lo que **la capacidad disminuye**).
- $C_{J0}$: capacidad con polarización nula; $V_{bi}$: potencial de contacto (built-in).

**Para una unión PN abrupta:**

$$
C_T = \frac{dQ}{dV_D} = \frac{A}{2}\sqrt{\frac{2q\varepsilon}{V_{bi} - V_D}\cdot\frac{N_D N_A}{N_D + N_A}} \;\propto\; \lvert V_D\rvert^{-1/2}\quad\text{(en inversa)}
$$

(es decir, $n = 1/2$ en el caso abrupto).

**Aplicaciones:** **osciladores controlados por tensión (VCO)**, **multiplicadores de frecuencia**, sintonizadores. En el ejemplo de la diapositiva 17, un oscilador con transistor donde el varactor D1 (con C1 y R1) sintoniza la frecuencia con una tensión de control.

### 6.5 Circuitos de rectificación

#### Fuente de alimentación (power supply): esquema de bloques

$$
\text{Red AC (120 V rms, 60 Hz)} \to \text{Transformador} \to \text{Rectificador (diodos)} \to \text{Filtro} \to \text{Regulador de tensión} \to \text{Carga}
$$

| Bloque | Señal a su salida |
|---|---|
| Transformador (power transformer) | Sinusoide con la amplitud adecuada ($v_S$) |
| Rectificador de diodos | Semiondas positivas (pulsante) |
| Filtro | DC con rizado (ripple) |
| Regulador de tensión | DC prácticamente constante ($V_O$) |

**Valores eficaces (RMS):**

| Magnitud | Fórmula general | Señal sinusoidal |
|---|---|---|
| Tensión | $V_{RMS} = \sqrt{\dfrac{1}{T}\displaystyle\int_0^T V(t)^2\,dt}$ | $V_{RMS} = \dfrac{V_{peak}}{\sqrt 2}$ |
| Corriente | $I_{RMS} = \sqrt{\dfrac{1}{T}\displaystyle\int_0^T I(t)^2\,dt}$ | $I_{RMS} = \dfrac{I_{peak}}{\sqrt 2}$ |

**Dos características importantes al elegir un diodo rectificador:**

1. **PIV (Peak Inverse Voltage):** **tensión máxima en inversa** que soporta el diodo. Buena elección: **$V_s < \text{PIV}\cdot 0.5$** (margen de seguridad del 50 %).
2. **Corriente máxima** que soporta el diodo.

#### Rectificador de media onda (half-wave rectifier)

Circuito: fuente $v_S$ — diodo D — resistencia $R$ (salida $v_O$ en $R$).

$$
v_O = \begin{cases}
0, & v_S < V_D \\
v_S - V_D, & v_S \ge V_D
\end{cases}
$$

- Función de transferencia $v_O$ vs. $v_S$: cero hasta $V_D$ y luego recta de **pendiente 1**.
- La salida es la **semionda positiva** desplazada hacia abajo $V_D$ (el pico de salida es $V_s - V_D$). Sólo aprovecha medio periodo de la señal.

#### Rectificador de onda completa (full-wave rectifier) con toma intermedia

- Usa un **transformador con toma central (center tap)** y **dos diodos D1 y D2**; cada diodo conduce en un semiperiodo distinto.
- Se aprovechan **ambas semiondas**: la semionda negativa se invierte ($-v_S$ pasa a ser positiva).
- Función de transferencia: pendiente ≈ **−1 para $v_S < -V_D$** y ≈ **+1 para $v_S > V_D$**, con **zona muerta** entre $-V_D$ y $V_D$.
- Pico de salida: $V_s - V_D$.

#### Puente de diodos (bridge rectifier)

- **Cuatro diodos (D1–D4)** en configuración de puente, sin necesidad de toma central.
- En cada semiperiodo **conducen dos diodos** en serie con la carga, por lo que la caída total es **$2V_D$**.
- Salida: pico $V_s - 2V_D$. Se comercializan como **puentes integrados** (encapsulados con 4 patillas: dos de AC "∼", una "+" y una "−").

> ➕ **Resumen comparativo (valores típicos, no incluidos en las diapositivas):**
>
> | Rectificador | Nº diodos | Transformador | Pico de salida | Frecuencia del rizado | PIV por diodo |
> |---|---|---|---|---|---|
> | Media onda | 1 | Normal | $V_s - V_D$ | $f$ | $\approx V_s$ |
> | Onda completa, toma central | 2 | Toma central | $V_s - V_D$ | $2f$ | $\approx 2V_s - V_D$ |
> | Puente | 4 | Normal | $V_s - 2V_D$ | $2f$ | $\approx V_s - V_D$ |
>
> Donde $V_s$ es la amplitud (pico) de la tensión del secundario (en el de toma central, la de **cada mitad** del secundario).

### 6.6 Diodos emisores de luz (LED)

**Principio físico:**
- En el **arseniuro de galio (GaAs)** y otros **semiconductores compuestos** (de **banda prohibida directa**), la **recombinación de los portadores minoritarios** da lugar a la **emisión de fotones**.
- Variando la composición (p. ej. **GaAs$_{1-x}$P$_x$**) se modifica la **anchura de la banda prohibida $E_g$** y, por tanto, la **longitud de onda** de los fotones emitidos.
- **La intensidad de la luz es proporcional a la intensidad de corriente** que circula por el diodo → se controla la intensidad luminosa **polarizando adecuadamente** el diodo (en directa, normalmente con una resistencia limitadora).

> ➕ **Relación energía–longitud de onda:** $\lambda\ (\text{nm}) \approx \dfrac{1240}{E_g\ (\text{eV})}$. Por ejemplo, GaAs ($E_g = 1.4$ eV) → ≈ 886 nm (infrarrojo); GaN ($E_g = 3.4$ eV) → ≈ 365 nm (ultravioleta).

**Estructura del LED:** chip semiconductor, lente en cúpula (dome lens), poste del cátodo y del ánodo. El **ánodo (positivo) tiene la patilla más larga** que el cátodo.

**Historia y materiales (diapositiva 21):**

| Hito | Material | Detalle |
|---|---|---|
| **1962** — primeros LED **infrarrojos** | **GaAs** | Banda prohibida directa de **1.4 eV** → infrarrojo |
| **Finales de los 60** — LED **rojos y verdes** | **GaP** | Fabricados en distintos países |
| **LED azules** | **Nitruro de galio (GaN)** | Estructura cristalina **wurtzita**, banda directa de **3.4 eV** (el valor corresponde al ultravioleta, según la diapositiva) |

**Eficiencia luminosa de las fuentes de luz** (figura):

| Fuente | Eficiencia (lm/W) |
|---|---|
| Lámpara de aceite (~15 000 a. C.) | 0.1 |
| Bombilla incandescente (s. XIX) | 16 |
| Lámpara fluorescente (s. XX) | 70 |
| **LED (s. XXI)** | **300** |

**Cómo se genera luz blanca con LED (tres métodos):**

1. **LED convertido por fósforos** (phosphor-converted): un LED azul o UV + fósforos que convierten la luz azul/UV en blanca.
2. **LED de color mezclado** (color-mixed): se mezclan las cantidades adecuadas de LED rojos, verdes y azules.
3. **Método híbrido**: combina fósforos y LED monocromáticos discretos.

### 6.7 Fotodiodo

- **Se polariza en inversa.** Los **fotones incidentes** generan **pares electrón-hueco en la zona de deplexión (o intrínseca)**; el campo eléctrico los separa y se produce una **corriente inversa** (fotocorriente).
- **La corriente inversa es proporcional a la intensidad luminosa** (iluminancia, en lux). En la gráfica: de ≈ 0 a ≈ 800 µA para iluminancias hasta ≈ 5000 lux (relación aproximadamente lineal).
- **Corriente de oscuridad (dark current):** la pequeña corriente inversa que circula sin iluminación (es la $I_S$ del diodo).
- Familia de curvas I-V: cada curva corresponde a una iluminancia distinta (0, 1000, 1500, 2000, 2500 lux…); al aumentar la luz, la curva **se desplaza hacia corrientes inversas mayores**, casi paralela, y es prácticamente independiente de la tensión inversa $V_R$.

> ➕ **Contraste LED ↔ fotodiodo:** el LED **convierte corriente en luz** (directa, recombinación); el fotodiodo **convierte luz en corriente** (inversa, generación de pares).

---

## 7. Formulario resumen

| Concepto | Fórmula |
|---|---|
| Ecuación del diodo | $i_D = I_S\left(e^{v_D/(nV_T)} - 1\right)$ |
| Directa (aprox.) | $i_D \approx I_S\,e^{v_D/(nV_T)}$ |
| Inversa | $i_D = -I_S$ |
| Tensión térmica | $V_T = k_BT/q \approx 25.85$ mV ($T=300$ K) |
| Tensión del diodo | $V_D = nV_T\ln(I_D/I_S)$ |
| Diferencia de tensión entre dos corrientes | $v_B - v_A = nV_T\ln(i_B/i_A) = 2.3\,nV_T\log(i_B/i_A)$ |
| Una década de corriente | $\approx 59$ mV ($n=1$) |
| Temperatura | $\approx -2$ mV/°C (a $I$ constante, Si) |
| Recta de carga | $I_D = (V_{DD} - V_D)/R$ |
| Iteración del modelo exacto | $V_D = V_T\ln\!\left(\dfrac{V_{DD}-V_D}{I_S R}\right)$ |
| Modelo ideal | $V_D = 0$ |
| Ideal con desplazamiento | $V_D = V_{D0}$ |
| Lineal a tramos | $V_D = V_{D0} + I_D R_D$ |
| Resistencia dinámica | $r_d = nV_T/I_D$ |
| Pequeña señal | $i_d = v_d/r_d$ |
| Zener | $V_Z = V_{Z0} + I_Z r_Z$; $\Delta V = \Delta I\,r_Z$ |
| Regulación de línea (Zener sin carga) | $\Delta V_O = \Delta V^+\,r_Z/(R+r_Z)$ |
| Capacidad del varactor | $C_j = C_{J0}/(1 - V_D/V_{bi})^n \propto \lvert V_D\rvert^{-n}$ |
| Unión PN abrupta | $C_T \propto \lvert V_D\rvert^{-1/2}$ |
| Valor eficaz (sinusoide) | $V_{RMS} = V_{peak}/\sqrt2$, $I_{RMS} = I_{peak}/\sqrt2$ |
| Media onda | $v_O = v_S - V_D$ si $v_S \ge V_D$; 0 en otro caso |
| Puente de diodos | Pico $= V_s - 2V_D$ |
| Criterio PIV | $V_s < 0.5\cdot\text{PIV}$ |

---

## 8. Tabla comparativa de modelos

| | **Exacto** | **Ideal** | **Ideal con desplazamiento** | **Lineal a tramos** | **Pequeña señal** |
|---|---|---|---|---|---|
| Descripción | Exponencial | Interruptor | Interruptor + batería $V_0$ | Batería $V_0$ + $R_D$ | Resistencia $r_d$ |
| Tipo | No lineal | Gran señal | Gran señal | Gran señal | Linealización en torno a Q |
| Precisión | Máxima | Baja | Media | Alta | Sólo para variaciones pequeñas |
| Resolución | Iterativa | Directa | Directa | Directa | Directa |
| Resultado del ejemplo ($V_{DD}=5$ V, $R=1$ kΩ) | ≈ 4.27 mA | 5 mA | 4.35 mA | 4.26 mA | — |
| Cuándo usarlo | Diseño preciso / sin aproximar | Primera estimación | Cálculos rápidos | Buena aproximación general | Señales AC pequeñas sobre una polarización DC |

---

## 9. Errores típicos y trucos

- **No confundir modelos de gran señal con el de pequeña señal.** $R_D$ (pendiente de la recta lineal a tramos) y $r_d$ (pendiente de la tangente en Q) **no son lo mismo** salvo que $R_D$ se haya calculado en ese punto.
- **En pequeña señal se anulan las fuentes DC** (se cortocircuitan) y **se hacen cero las de pequeña señal en el cálculo DC**. Se resuelven por separado y se suman.
- **Hay que comprobar siempre la suposición de estado** de cada diodo (conducción/corte). Corriente negativa en un diodo "en directa" o tensión mayor que $V_\gamma$ en uno "en corte" ⇒ suposición errónea.
- **En la iteración del modelo exacto**, el resultado converge muy rápido: bastan 2–3 pasos.
- **$V_T$ cambia con la temperatura**: $V_T = 25.85$ mV a 300 K, pero a 27 °C o 25 °C el valor difiere ligeramente. Usar el que dé el enunciado.
- **Zener:** se usa en **inversa**; la condición $I_Z \ge I_{ZK}$ es imprescindible para que regule. Recordar usar $V_{Z0}$ (no $V_Z$) cuando se aplique el modelo con $r_z$.
- **Rectificadores:** la caída de tensión del diodo reduce el pico (una vez $V_D$ en media onda y toma central; dos veces en el puente).
- **PIV:** elegir diodos con margen (regla de la diapositiva: $V_s < 0.5\,\text{PIV}$).
- **Varactor:** funciona en inversa; **más tensión inversa ⇒ menos capacidad**.
- **LED:** siempre con **resistencia limitadora**; la luz es proporcional a la corriente, no a la tensión.
- **Fotodiodo:** trabaja en inversa; la fotocorriente es proporcional a la iluminancia.

---

## 10. Preguntas de repaso

1. ¿Qué dice la ecuación de Shockley y qué representan $n$, $V_T$ e $I_S$?
2. ¿Por qué se usa una tensión de codo fija $V_\gamma$ en los modelos simplificados? (Pista: 59 mV por década.)
3. ¿Cómo cambia la curva I-V con la temperatura? ¿Cuánto varía $V_D$ por °C?
4. ¿Por qué el modelo exacto se resuelve de forma iterativa? ¿Qué representa el punto Q?
5. Resuelve con los tres modelos simplificados un circuito $V_{DD}=5$ V, $R=1$ kΩ, $V_{D0}=0.65$ V, $R_D=20$ Ω.
6. Enumera los 5 pasos para resolver un circuito con diodos y explica cuándo hay contradicción.
7. ¿Qué es un sistema lineal? ¿Qué papel juega el desarrollo de Taylor en el análisis de pequeña señal?
8. Deduce $r_d = nV_T/I_D$. ¿Qué pasa con $r_d$ al aumentar la corriente de polarización?
9. Dibuja el modelo de pequeña señal de un diodo en baja y en alta frecuencia.
10. Pasos del análisis de pequeña señal y resolución del ejercicio del rizado de 60 Hz (10 V + 0.5 V, $R=10$ kΩ, $n=2$).
11. ¿Cuáles son las características deseables de un rectificador? Da ejemplos de diodos de rectificación y de conmutación.
12. ¿Cómo regula un Zener? Escribe su modelo y calcula $V_O$ y $\Delta V_O$ con los datos del ejercicio de 6.8 V.
13. ¿Cómo depende la capacidad de un varactor de la tensión inversa? ¿Para qué se usa?
14. Dibuja el esquema de bloques de una fuente de alimentación y las formas de onda a la salida de cada bloque.
15. Compara media onda, onda completa con toma central y puente de diodos (nº de diodos, caída, aprovechamiento de la señal).
16. ¿Qué es el PIV y cuál es la regla de diseño?
17. ¿Cómo emite luz un LED y cómo se controla su intensidad? ¿Qué materiales se usan para IR, rojo/verde y azul?
18. Explica cómo se genera luz blanca con LED (tres métodos).
19. ¿Cómo funciona un fotodiodo y en qué polarización trabaja?

### Respuestas breves (autoevaluación)

- **P5:** 5 mA (ideal), 4.35 mA (con desplazamiento), 4.26 mA con $V_D\approx0.73$ V (lineal a tramos).
- **P10:** $I_D = 0.93$ mA; $r_d \approx 55.4\ \Omega$; $v_d \approx 2.76$ mV·sen$(2\pi\cdot60\,t)$; $V_D = 0.7$ V en DC.
- **P12:** $V_{Z0}=6.7$ V; $I_Z=6.35$ mA; $V_O=6.83$ V; $\Delta V_O=\pm38.5$ mV.

---

*Fin del resumen del Tema 3 — Diodos.*
