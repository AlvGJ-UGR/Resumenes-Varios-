# Práctica 3 — Circuitos con diodos: aplicaciones típicas

**Asignatura:** Componentes y Circuitos Electrónicos (Grado en Ingeniería de Tecnologías de Telecomunicación, UGR)
**Guion:** `practica3_26-27.pdf`

> Guía para preparar la práctica, hacerla sin olvidar nada (sobre todo las fotos) y tener ya resueltas las preguntas "Explique qué sucede y por qué".
> Los valores **esperados** están calculados con los parámetros de **tu** Práctica 2 y suponen una señal de **10 V de amplitud**. Son una referencia para saber si lo que ves en el osciloscopio tiene sentido, no datos medidos.
> 💡 = consejo mío, no viene en el guion.

---

## Índice

1. [Qué se pide](#1-qué-se-pide)
2. [Teoría mínima](#2-teoría-mínima)
3. [Antes del laboratorio](#3-antes-del-laboratorio)
4. [Procedimiento y qué deberías ver](#4-procedimiento-y-qué-deberías-ver)
   - 4.1 Rectificador de media onda (Fig. 1 y 2)
   - 4.2 Puente de diodos (Fig. 3)
   - 4.3 Limitador con Zéner (Fig. 4)
5. [Tabla de valores esperados](#5-tabla-de-valores-esperados)
6. [Preguntas "explique qué sucede y por qué"](#6-preguntas-explique-qué-sucede-y-por-qué)
7. [Simulación con SPICE](#7-simulación-con-spice)
8. [Fuentes de error y errores típicos](#8-fuentes-de-error-y-errores-típicos)
9. [Lista de comprobación](#9-lista-de-comprobación)
10. [Qué tendrás que pasarme después](#10-qué-tendrás-que-pasarme-después)

---

## 1. Qué se pide

**Objetivo:** estudiar aplicaciones típicas de los diodos: **rectificación** y **limitación de tensión**.

| Bloque | Circuito | Componentes | Fotos del osciloscopio |
|---|---|---|---|
| 3.1 | Rectificador de media onda (Fig. 1) | $R_1=47$ kΩ | Entrada y salida juntas; modo XY |
| 3.1 | Media onda con condensador (Fig. 2) | $C=10$ nF y luego $100$ nF en paralelo con $R_1$ | Entrada y salida juntas, una foto por condensador |
| 3.2 | Puente de diodos (Fig. 3) | 4 diodos rectificadores, $R=10$ kΩ | Salida con el canal matemático CH2−CH1; con $C=100$ nF |
| 3.3 | Limitador de tensión (Fig. 4) | Zéner de la Práctica 2, $R_1=1$ kΩ, $R_2=10$ kΩ | Entrada y salida juntas |
| 4 | Simulación con SPICE de las Figuras 1, 2, 3 y 4 | Seno de 10 V, 400 Hz, transitorio de ≥ 10 periodos | Capturas y comparación |

**Señal en todos los montajes:** sinusoidal de **400 Hz** (T = 2,5 ms) y sin offset. Amplitud: **la máxima del generador** en el de media onda y **10 V** en el puente y el limitador.

**Resumen de las 7 fotos obligatorias:**

1. Media onda: entrada (CH1) y salida (CH2) juntas.
2. Media onda: modo XY.
3. Media onda con $C=10$ nF.
4. Media onda con $C=100$ nF.
5. Puente: salida (CH2−CH1).
6. Puente con $C=100$ nF.
7. Limitador: entrada y salida juntas.

---

## 2. Teoría mínima

### 2.1 Modelo del diodo (lo de la Práctica 2)

- **OFF** ($V_D<V_\gamma$): $I_D\approx0$, circuito abierto.
- **ON** ($V_D>V_\gamma$): fuente $V_\gamma$ en serie con $r_d$.

Con lo medido en la Práctica 2 para el rectificador: $V_\gamma\approx0{,}52$ V y $r_d\approx67\ \Omega$ (a ≥ 0,3 mA). En estos circuitos las corrientes son pequeñas (≈ 0,2 mA en la media onda con 47 kΩ), así que el diodo trabaja con $V_D\approx0{,}5$ V (a 0,2 mA tenías $V_D\approx0{,}52$ V).

### 2.2 Rectificador de media onda

$$
v_o = \begin{cases}
0, & v_s < V_\gamma \\[2pt]
\dfrac{R}{R+r_d}\,(v_s - V_\gamma), & v_s \ge V_\gamma
\end{cases}
\qquad
V_{o,pico}\approx \frac{R}{R+r_d}\,(V_m - V_\gamma)
$$

Con $R=47$ kΩ y $r_d\approx67\ \Omega$, $R/(R+r_d)=0{,}9986$, así que $V_{o,pico}\approx V_m - 0{,}5$ V.

**Modo XY** ($v_o$ frente a $v_i$): es la **función de transferencia** del circuito. Es una recta horizontal en 0 hasta $v_i=V_\gamma$ y después una recta de pendiente ≈ 1 que corta el eje de $v_i$ en $V_\gamma$.

### 2.3 Filtro con condensador

El diodo carga $C$ hasta ≈ $V_p$ cerca del pico. Cuando $v_i$ baja por debajo de $v_C$, el diodo pasa a OFF y $C$ se descarga por $R$:

$$
v_C(t)=V_p\,e^{-t/(RC)}, \qquad \tau = RC
$$

Un $\tau$ mayor que el periodo da menos rizado (ripple). Si $\tau\gg T$:

$$
\Delta V \approx V_p\,\frac{T}{RC}
$$

(no es válido para $\tau\approx T$, como el caso de 100 nF aquí: esa fórmula daría 5,3 V y la simulación da 3,4 V).

| Caso | $\tau=RC$ | $\tau/T$ |
|---|---|---|
| Media onda, 10 nF | 47 kΩ · 10 nF = **0,47 ms** | 0,19 |
| Media onda, 100 nF | 47 kΩ · 100 nF = **4,7 ms** | 1,9 |
| Puente, 100 nF | 10 kΩ · 100 nF = **1 ms** | 0,8 (frente a $T_{sal}=1{,}25$ ms) |

### 2.4 Puente de diodos (onda completa)

En cada semiperiodo conducen **dos** diodos en serie con la carga:

$$
v_o\approx |v_s| - 2V_D \quad (|v_s|>2V_D), \qquad v_o\approx0 \text{ en el resto}
$$

- La salida tiene el doble de frecuencia: $f_o=800$ Hz ($T_o=1{,}25$ ms).
- Aparece una zona muerta de ≈ ±2$V_D$ alrededor de los cruces por cero.

### 2.5 Limitador con Zéner

$R_1$ en serie con la entrada; el Zéner $D_1$ en paralelo con la carga $R_2$.

- **Sin conducción del Zéner** (señal pequeña): divisor, $v_o=v_i\dfrac{R_2}{R_1+R_2}=0{,}909\,v_i$.
- **Semiciclo en que el Zéner está en directa:** $v_o\approx V_\gamma$ (≈ 0,7–0,8 V a ≈ 8 mA).
- **Semiciclo en que el Zéner está en ruptura:** $v_o\approx V_{Z0}+r_z I_Z$, con $I_Z=\dfrac{v_i-v_o}{R_1}-\dfrac{v_o}{R_2}$. Como $r_z$ no es cero, la salida **sigue subiendo ligeramente** con la entrada: no es un recorte perfecto.

---

## 3. Antes del laboratorio

### 3.1 Material
- Generador de funciones y osciloscopio (con modo XY y canal matemático).
- Diodos rectificadores (los de la Práctica 2) ×4 y el Zéner de la Práctica 2.
- Resistencias: 47 kΩ, 10 kΩ, 1 kΩ (×2: $R_1$ y $R_2$ del limitador son 1 kΩ y 10 kΩ).
- Condensadores: 10 nF y 100 nF.
- Placa de pruebas, cables y sondas.

### 3.2 Recomendaciones del guion (importantes)
- Usa **la misma escala vertical (V/div)** en CH1 y CH2 para comparar entrada y salida.
- Si usas **cursores**, comprueba que miden con la escala del canal correcto.
- Las **tierras** del generador y de las sondas deben ir **juntas en el nodo de tierra** del circuito.
- **Puente de diodos:** con el osciloscopio del laboratorio no se pueden ver a la vez entrada y salida. Revisa con cuidado la polaridad de los diodos y la posición de las sondas.

### 3.3 Consejos prácticos 💡
- **Mide la amplitud en el osciloscopio**, no te fíes del valor del generador (muchos asumen una carga de 50 Ω y muestran el doble). Ajusta hasta ver 10 V de pico (20 V pico a pico) en CH1.
- Pon el acoplamiento de los canales en **DC** (si usas AC se pierde el nivel de continua de la salida).
- Anota el factor de las sondas (×1 o ×10) y que los canales lo tengan configurado igual.
- Para los condensadores de 10 nF y 100 nF (cerámicos) no hay polaridad.
- Con el generador a la máxima amplitud, **anota ese valor** ($V_m$). Los valores esperados de la sección 5 se escalan con él.
- Para cada foto, que se vean la escala (V/div, ms/div) y los dos canales. Haz una foto extra por si sale movida.

---

## 4. Procedimiento y qué deberías ver

### 4.1 Rectificador de media onda (Fig. 1 y 2)

**Montaje (Fig. 1):** generador $V_{in}$ → diodo $D_1$ → $R_1$ = 47 kΩ a tierra. CH1 en la entrada y CH2 en la salida (extremo del diodo, sobre $R_1$). Ánodo hacia la entrada.

**Pasos y resultado esperado:**

1. **Montaje y señal:** seno de 400 Hz, máxima amplitud del generador, sin offset.
2. **Entrada y salida (foto 1):** ajusta la base de tiempos para ver 2–3 ciclos.
   - Esperado: la salida es **solo la parte positiva** de la senoidal, ≈ medio periodo con señal y medio periodo a 0.
   - El pico de salida es ≈ **$V_m - 0{,}5$ V** (con $V_m=10$ V: ≈ 9,5 V).
   - La frecuencia es 400 Hz.
3. **Modo XY (foto 2):** CH1 en el eje X (entrada) y CH2 en el Y (salida).
   - Esperado: una línea horizontal en 0 para $v_i<V_\gamma$ y una recta de pendiente ≈ 1 después. El codo está en $v_i\approx0{,}5$ V.
   - Puedes estimar $V_\gamma$ con el cursor en el punto donde la recta corta el eje X y comparar con la Práctica 2 (0,52 V).
4. **Reducir la amplitud de la entrada:** vuelve a la vista temporal y baja $V_m$ poco a poco.
   - Esperado (orientativo, con los parámetros de la P2):

   | $V_m$ de entrada | Pico de salida |
   |---|---|
   | 10 V | ≈ 9,5 V |
   | 1 V | ≈ 0,6 V |
   | 0,5 V | ≈ 0,15 V |
   | < ≈ 0,4 V | ≈ 0 (casi nada) |

   - La salida se distorsiona y se hace más pequeña que $V_m - V_\gamma$: el diodo trabaja en la zona del codo, donde su resistencia es grande. Por debajo de ≈ 0,4 V no conduce de forma apreciable.
5. **Condensador de 10 nF en paralelo con $R_1$ (Fig. 2; foto 3).**
   - $\tau = 0{,}47$ ms ≪ $T=2{,}5$ ms.
   - Esperado: el condensador se carga al pico (≈ 9,5 V) y se descarga rápido (apenas se alisa). La salida baja casi a 0 antes del siguiente pico (**rizado ≈ 9 V**, mínimo ≈ 0,2 V).
6. **Condensador de 100 nF (foto 4).**
   - $\tau=4{,}7$ ms ≈ 1,9 $T$.
   - Esperado: la salida se alisa bastante. Máximo ≈ 9,5 V y mínimo ≈ 6 V (**rizado ≈ 3,4 V**).
7. **Explicación:** ver [apartado 6](#6-preguntas-explique-qué-sucede-y-por-qué).

💡 En las fotos del condensador usa 2–3 ciclos y la misma escala vertical en CH1 y CH2. Mide con el cursor el pico y el mínimo de la salida para tener el rizado numérico.

### 4.2 Puente de diodos (Fig. 3)

**Montaje:** fuente 10 V de amplitud, 400 Hz, sin offset. 4 diodos en puente con $R=10$ kΩ como carga.

**Conexión de las sondas** 💡: conecta la tierra del osciloscopio al nodo de tierra del generador. La salida del puente no está referida a tierra, así que se mide de forma diferencial: **CH1 en el terminal − de la carga y CH2 en el terminal +**, y se muestra el canal matemático **CH2−CH1**. Los dos canales con la misma escala y el mismo factor de sonda.

**Pasos y resultado esperado:**

1. **Sin condensador (foto 5):**
   - Esperado: una señal **rectificada de onda completa**, con las dos semiondas en positivo.
   - Pico ≈ **$10 - 2V_D$ ≈ 8,8 V** ($V_D\approx0{,}58$ V por diodo a ≈ 0,9 mA, según la P2).
   - **Frecuencia 800 Hz** (periodo 1,25 ms), el doble que la entrada.
   - Pequeña **zona muerta** (≈ ±1,2 V, es decir ±2$V_D$) en los cruces por cero.
2. **Explicación sin condensador:** ver apartado 6.
3. **Condensador de 100 nF en paralelo con $R$ (foto 6):**
   - $\tau = 1$ ms, comparable al periodo de salida (1,25 ms).
   - Esperado: la señal se alisa: máximo ≈ 8,8 V, mínimo ≈ 4,2 V (**rizado ≈ 4,7 V**), a 800 Hz.
4. **Explicación con condensador:** ver apartado 6.

### 4.3 Limitador con Zéner (Fig. 4)

**Montaje:** $R_1=1$ kΩ en serie con la entrada. El Zéner $D_1$ y $R_2=10$ kΩ en paralelo, a tierra. CH1 en la entrada y CH2 en $V_{out}$ (sobre $R_2$).

**Pasos y resultado esperado:** la forma de la salida depende de **cómo conectes el Zéner** (comprueba en el esquema de la Figura 4):

| Orientación | Semiciclo positivo | Semiciclo negativo |
|---|---|---|
| **Cátodo hacia $V_{out}$** (ruptura con tensión positiva) | Se recorta en ≈ $+V_Z$ | Se recorta en ≈ −0,8 V (Zéner en directa) |
| **Ánodo hacia $V_{out}$** | Se recorta en ≈ +0,8 V | Se recorta en ≈ $-V_Z$ |

- **$V_Z$ del Zéner de tu práctica:** tus medidas de la Práctica 2 daban ruptura en torno a **2,1–2,5 V** (2,46 V a 1 mA), distinta de los ≈ 7 V del guion. Esperado con tu Zéner: recorte en ≈ **3 V** (simulación con tus parámetros). Como en esta práctica la corriente por el Zéner llega a ≈ 7 mA (más de lo medido en la Práctica 2, 1 mA), la tensión real puede ser algo mayor, hasta ≈ 5 V si $r_z\approx373\ \Omega$ se mantiene. El valor de laboratorio lo decide.
- **Zona sin recorte:** la salida es el divisor, $0{,}909\,v_i$.
- Con la amplitud de 10 V, el pico sin recorte sería 9,1 V; la salida queda muy por debajo.

💡 Mide con cursores el nivel de recorte positivo y negativo. Si el Zéner es de ≈ 7 V (como dice el guion), el recorte del lado de ruptura estará en ≈ 7–7,5 V.

---

## 5. Tabla de valores esperados

Con señal de **10 V de pico** y los parámetros de tu Práctica 2. Rellena la columna "medido" en el laboratorio.

| Circuito / caso | Magnitud | Esperado | Medido |
|---|---|---|---|
| Fig. 1 (media onda) | Pico de salida | ≈ 9,5 V | |
| Fig. 1 | Frecuencia de salida | 400 Hz | |
| Fig. 1 (XY) | $V_\gamma$ (corte con el eje X) | ≈ 0,5 V | |
| Fig. 2, 10 nF | Máx. / mín. de salida | ≈ 9,5 V / ≈ 0,2 V | |
| Fig. 2, 10 nF | Rizado | ≈ 9 V | |
| Fig. 2, 100 nF | Máx. / mín. de salida | ≈ 9,5 V / ≈ 6 V | |
| Fig. 2, 100 nF | Rizado | ≈ 3,4 V | |
| Fig. 3 (puente) | Pico de salida | ≈ 8,8 V | |
| Fig. 3 | Frecuencia de salida | 800 Hz | |
| Fig. 3, 100 nF | Máx. / mín. de salida | ≈ 8,8 V / ≈ 4,2 V | |
| Fig. 3, 100 nF | Rizado | ≈ 4,7 V | |
| Fig. 4 (limitador) | Salida sin recorte | $0{,}909\,v_i$ | |
| Fig. 4 | Nivel de recorte en directa | ≈ 0,8 V | |
| Fig. 4 | Nivel de recorte en ruptura | ≈ 3 V (hasta ≈ 5 V), o ≈ 7,4 V si es de 7 V | |

> Si el generador no llega a 10 V, o si cambias $V_m$, los picos cambian aproximadamente como $V_m - 0{,}5$ (media onda), $V_m - 1{,}2$ (puente) y $0{,}909\,V_m$ (limitador sin recorte).

---

## 6. Preguntas "explique qué sucede y por qué"

> Respuestas preparadas para pasar a la memoria; ajústalas con tus medidas cuando las tengas.

### 6.1 Media onda (Fig. 1, paso 7)
El diodo solo conduce cuando la tensión de entrada supera su tensión umbral ($v_i>V_\gamma\approx0{,}5$ V). En ese caso se comporta como una fuente $V_\gamma$ en serie con $r_d$ (≈ 67 Ω, mucho menor que $R_1=47$ kΩ), así que casi toda la tensión cae en $R_1$ y la salida es $v_o\approx v_i-V_\gamma$. Cuando $v_i<V_\gamma$ el diodo está en corte (circuito abierto) y no pasa corriente, por lo que $v_o=0$. Por eso aparece solo el semiciclo positivo, con un pico ≈ 0,5 V menor que el de entrada.

En el modo XY se ve esa característica de transferencia: tramo plano hasta $V_\gamma$ y tramo de pendiente ≈ 1 después.

Al **reducir la amplitud**, la salida se hace cada vez menor y se distorsiona (el diodo trabaja en la zona del codo, donde su resistencia es grande); para amplitudes por debajo de ≈ 0,4–0,5 V la salida es prácticamente nula porque el diodo no llega a conducir.

### 6.2 Media onda con condensador (Fig. 2, paso 7)
Con el condensador en paralelo con $R_1$, mientras el diodo conduce (cerca del pico) el condensador se carga hasta ≈ $V_p$. Cuando la entrada baja por debajo de la tensión del condensador, el diodo queda en corte y el condensador se descarga a través de $R_1$ con constante de tiempo $\tau=R_1C$:

$$v_C(t)=V_p\,e^{-t/(R_1C)}$$

- **10 nF:** $\tau=0{,}47$ ms es menor que el periodo (2,5 ms), así que el condensador se descarga casi del todo antes del siguiente pico: el rizado es grande y casi no hay alisado.
- **100 nF:** $\tau=4{,}7$ ms es mayor que el periodo, la descarga es más lenta y el rizado baja a ≈ 3,4 V. La salida se parece más a una tensión continua.

A mayor $C$ (o mayor $R$) hay menos rizado, porque la constante de tiempo es mayor frente a $T$. A cambio, el diodo conduce durante intervalos más cortos y con picos de corriente mayores.

### 6.3 Puente de diodos sin condensador (Fig. 3, paso 3)
En el semiciclo positivo conducen dos diodos (D1 y D3 en el esquema, según su numeración y orientación) y en el negativo los otros dos, de forma que la corriente por $R$ circula **siempre en el mismo sentido**. La salida es el valor absoluto de la entrada menos la caída de dos diodos en serie: $v_o\approx|v_s|-2V_D$, con un pico ≈ 8,8 V. La frecuencia de la señal de salida es **el doble** que la de entrada (800 Hz), porque se aprovechan los dos semiciclos. Alrededor de los cruces por cero ($|v_s|<2V_D\approx1{,}2$ V) no conduce ningún diodo y la salida es 0.

### 6.4 Puente de diodos con condensador de 100 nF (Fig. 3, paso 5)
El condensador se carga en cada pico (cada 1,25 ms) y se descarga por $R=10$ kΩ entre picos con $\tau=RC=1$ ms. Como el tiempo entre picos (1,25 ms) es más corto que en la media onda (2,5 ms), el condensador se descarga menos y se alisa mejor que en media onda con el mismo producto $RC$. La salida queda como una continua con rizado, a 800 Hz: máx. ≈ 8,8 V, mín. ≈ 4,2 V, rizado ≈ 4,7 V (≈ 10 V · $T_o$/τ). Para reducirlo habría que aumentar $C$.

### 6.5 Limitador con Zéner (Fig. 4, paso 3)
Para tensiones de entrada pequeñas el Zéner no conduce y el circuito es un divisor: $v_o=v_i\,R_2/(R_1+R_2)=0{,}909\,v_i$. Cuando la entrada crece:
- En el semiciclo en que el Zéner queda **en directa**, se comporta como un diodo normal y fija la salida en ≈ $V_\gamma$ (≈ 0,7–0,8 V). La corriente circula por $R_1$ y limita al diodo.
- En el semiciclo en que queda **en inversa**, al alcanzar la tensión de ruptura $V_Z$ el diodo conduce y fija la salida en ≈ $V_Z$. Como su resistencia $r_z$ no es cero, la salida aumenta ligeramente al crecer la entrada.

El resultado es una señal **recortada asimétricamente**: una parte en ≈ $+V_Z$ (o $-V_Z$) y la otra en ≈ ∓$V_\gamma$. La resistencia $R_1$ limita la corriente por el Zéner (≈ 7–9 mA con 10 V).

---

## 7. Simulación con SPICE

**Lo que pide el guion:** simular las Figuras 1, 2, 3 y 4 con un **seno de 10 V y 400 Hz**, y un **análisis transitorio** de **al menos 10 periodos**: como $T=2{,}5$ ms, **tiempo final ≥ 25 ms**.

### 7.1 Modelos (usa los de tu Práctica 2)

- **Diodo rectificador:** el modelo por defecto del guion es `Dbreak D Is=1e-14 Cjo=.1pF Rs=.0`. Para acercarlo a tu diodo, usa los parámetros ajustados:
  `.model DR D(Is=6.1e-10 N=1.575 Cjo=.1p Rs=0)`
- **Zéner:** el guion propone `BV=7`, pero tu Zéner dio ≈ 2,1–2,5 V. Usa el modelo ajustado y especifica siempre `IBV=1m`:
  `.model DZ D(Is=1.26e-14 N=1.13 Cjo=.1p Rs=.1 BV=2.46 IBV=1m NBV=11.5)`

  Si no pones `IBV`, LTspice (y PSpice) usan un valor por defecto mucho menor (10⁻¹⁰ A, según mi recuerdo; compruébalo) y la ruptura queda más a la izquierda.

### 7.2 Netlists (LTspice)

**Fig. 1: media onda**
```
V1 in 0 SINE(0 10 400)
D1 in out DR
R1 out 0 47k
.model DR D(Is=6.1e-10 N=1.575 Cjo=.1p Rs=0)
.tran 0 25m 0 5u
```

**Fig. 2: media onda con condensador** (añade `C1`; haz dos simulaciones: 10n y 100n)
```
V1 in 0 SINE(0 10 400)
D1 in out DR
R1 out 0 47k
C1 out 0 10n
.model DR D(Is=6.1e-10 N=1.575 Cjo=.1p Rs=0)
.tran 0 25m 0 5u
```

**Fig. 3: puente** (salida: `V(p)-V(n)`; sin `C1` y con `C1 p n 100n`)
```
V1 a 0 SINE(0 10 400)
D1 a p DR
D2 n a DR
D3 0 p DR
D4 n 0 DR
R1 p n 10k
C1 p n 100n
.model DR D(Is=6.1e-10 N=1.575 Cjo=.1p Rs=0)
.tran 0 25m 0 5u
```

**Fig. 4: limitador** (`D1 0 out` pone el cátodo en $V_{out}$; usa `D1 out 0` para la otra orientación)
```
V1 in 0 SINE(0 10 400)
R1 in out 1k
D1 0 out DZ
R2 out 0 10k
.model DZ D(Is=1.26e-14 N=1.13 Cjo=.1p Rs=.1 BV=2.46 IBV=1m NBV=11.5)
.tran 0 25m 0 5u
```

💡 Si el guion te exige el elemento **Dbreak/DbreakZ de la librería BREAKOUT** (es de PSpice), en LTspice usa un diodo normal y escribe el `.model` con ese nombre; en la memoria indica el modelo empleado. Pon la captura del circuito con el modelo visible.

### 7.3 Resultados de simulación (referencia)

Calculados con **ngspice** y los modelos de arriba (10 V, 400 Hz, últimos periodos); los tuyos en LTspice pueden diferir ligeramente:

| Circuito | Resultado |
|---|---|
| Fig. 1 | Pico 9,48 V (con el modelo por defecto de SPICE, 9,39 V) |
| Fig. 2, 10 nF | Máx. 9,48 V, mín. 0,23 V (rizado 9,25 V) |
| Fig. 2, 100 nF | Máx. 9,48 V, mín. 6,04 V (rizado 3,43 V) |
| Fig. 3, sin C | Pico 8,84 V |
| Fig. 3, 100 nF | Máx. 8,84 V, mín. 4,17 V (rizado 4,67 V) |
| Fig. 4, cátodo en $V_{out}$ | Máx. ≈ +3,0 V, mín. ≈ −0,8 V |
| Fig. 4, ánodo en $V_{out}$ | Máx. ≈ +0,8 V, mín. ≈ −3,0 V |
| Fig. 4 con `BV=7` (modelo del guion) | ≈ ±7,4 V del lado de ruptura y ≈ 0,7 V del otro |

### 7.4 Cómo comparar con el laboratorio
- Superpón (o coloca lado a lado) la salida simulada y la foto del osciloscopio, con la misma escala.
- Compara **valores concretos**: pico, mínimo, rizado, niveles de recorte y frecuencia.
- Justifica diferencias: $V_\gamma$ y $n$ del modelo frente a los del diodo real, $r_z$ y codo suave del Zéner, tolerancia de $R$ y $C$, impedancia de las sondas, no idealidad del generador.

---

## 8. Fuentes de error y errores típicos

**Fuentes de error (para la memoria):**
- Resolución y precisión del osciloscopio (cursores, escala vertical).
- Tolerancia de $R$ y $C$ (los condensadores cerámicos pueden desviarse ±10–20 %, lo que cambia el rizado).
- Impedancia del generador (50 Ω) y de las sondas (carga del circuito en las medidas, sobre todo con 47 kΩ).
- Diferencias entre diodos reales (tu $V_\gamma$ y $n$) y los parámetros del simulador.
- Amplitud real del generador distinta de la nominal.
- Calentamiento y variación de $V_D$ con la temperatura (≈ −2 mV/°C).

**Errores típicos:**
- Puente con **polaridad de algún diodo invertida**: la salida sale vacía o en media onda.
- Tierras de las sondas **no comunes**: cortocircuitas el puente sin querer.
- Canales con **escalas distintas**: parece que la salida es mayor o menor de lo que es.
- Acoplamiento **AC** en vez de DC al medir la salida con condensador.
- Medir el limitador con el Zéner mal orientado: el recorte aparece en el semiciclo contrario al esperado.
- No anotar el factor de la sonda (×1 o ×10).

---

## 9. Lista de comprobación

**En el laboratorio**
- [ ] Amplitud del generador comprobada en el osciloscopio ($V_m$ anotado)
- [ ] Foto 1: media onda, entrada y salida
- [ ] Foto 2: modo XY
- [ ] Paso 4: reduje la amplitud y anoté qué pasa (amplitud mínima con salida visible)
- [ ] Foto 3: media onda con 10 nF
- [ ] Foto 4: media onda con 100 nF
- [ ] Foto 5: puente (CH2−CH1)
- [ ] Foto 6: puente con 100 nF
- [ ] Foto 7: limitador, entrada y salida
- [ ] Orientación del Zéner anotada (qué terminal va a $V_{out}$)
- [ ] Valores medidos con cursores (pico, mínimo, rizado, niveles de recorte)
- [ ] Todas las fotos con escalas visibles

**Después**
- [ ] 4 simulaciones (Fig. 1, 2 con 10 y 100 nF, 3 con y sin condensador, 4), con 25 ms
- [ ] Capturas de los circuitos con el modelo visible
- [ ] Comparación simulado frente a medido (valores concretos)
- [ ] Respuestas a las preguntas del apartado 6, ajustadas con tus medidas

---

## 10. Qué tendrás que pasarme después

1. **La plantilla de la Práctica 3.**
2. **Las 7 fotos** del osciloscopio (o los valores medidos con cursores: pico, mínimo y rizado de cada caso).
3. $V_m$ del generador, orientación del Zéner y referencia del diodo.
4. Las **simulaciones** (capturas, o los valores numéricos de pico, mínimo y rizado).

Con eso relleno la plantilla con los números concretos y reviso la coherencia entre medidas y simulación.

---

*Fin de la guía de la Práctica 3.*
