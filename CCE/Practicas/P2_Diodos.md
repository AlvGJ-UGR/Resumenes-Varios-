# Práctica 2 — Diodos: medida de la característica I–V

**Asignatura:** Componentes y Circuitos Electrónicos (Grado en Ingeniería de Tecnologías de Telecomunicación, UGR)
**Guion:** `practica2_26-27.pdf`

> Esta guía sirve para preparar la práctica, hacerla sin olvidar nada y tener ya resuelto todo lo que no depende de las medidas. Cuando tengas los datos de laboratorio y la plantilla, se completa con ellos.
> Los apartados marcados con 💡 son consejos míos; no vienen en el guion.

---

## Índice

1. [Qué se pide, en una página](#1-qué-se-pide-en-una-página)
2. [Teoría mínima que necesitas](#2-teoría-mínima-que-necesitas)
3. [Antes de ir al laboratorio](#3-antes-de-ir-al-laboratorio)
4. [Procedimiento paso a paso](#4-procedimiento-paso-a-paso)
   - 4.1 Montaje
   - 4.2 Diodo rectificador
   - 4.3 Diodo Zener
5. [Tratamiento de los datos](#5-tratamiento-de-los-datos)
   - 5.1 Tablas
   - 5.2 Ajuste exponencial (obtener $I_S$ y $n$)
   - 5.3 Ajuste lineal (obtener $V_\gamma$ y $r_d$)
   - 5.4 Zener: obtener $V_Z$ y $r_z$
   - 5.5 Incertidumbres
   - 5.6 Script de Python para los ajustes
6. [Simulación con SPICE](#6-simulación-con-spice)
7. [Cuestiones que se pueden responder ya (sin datos de laboratorio)](#7-cuestiones-que-se-pueden-responder-ya-sin-datos-de-laboratorio)
8. [Cuestiones que dependerán de los datos](#8-cuestiones-que-dependerán-de-los-datos)
9. [Lista de comprobación final](#9-lista-de-comprobación-final)
10. [Qué tendrás que pasarme después](#10-qué-tendrás-que-pasarme-después)

---

## 1. Qué se pide, en una página

**Objetivo del guion:** obtener las curvas $I$–$V$ de **dos diodos** (un **rectificador** y un **Zener**) y aproximarlas con:

- el **modelo exponencial** (ecuación de Shockley), de donde salen $I_S$ y $n$;
- el **modelo lineal a tramos**, de donde salen $V_\gamma$ y $r_d$ (y $V_Z$ en el Zener).

**Resumen de tareas:**

| Fase | Tarea | Resultado |
|---|---|---|
| Laboratorio | Montar el circuito de la Figura 2 (fuente variable $V_i$, resistencia $R$ y diodo $D$) | Circuito funcionando |
| Laboratorio | Barrido de $V_i$ desde 0 V (paso 0.1–0.2 V) midiendo $V_D$ y $V_R$ hasta ≈ 1 mA | Tabla del rectificador |
| Laboratorio | Cambiar el diodo por el Zener y repetir, **incluyendo tensiones negativas** | Tabla del Zener |
| Análisis | Gráfica $I_D$–$V_D$; ajuste de $\ln I_D$ vs. $V_D$ | $I_S$, $n$ |
| Análisis | Ajuste lineal por mínimos cuadrados de la zona de conducción directa | $r_d$, $V_\gamma$ |
| Análisis | Con los datos negativos del Zener | $V_Z$ |
| Después del laboratorio | Simular en SPICE (PSpice) ambos diodos y comparar con lo medido | Gráficas comparadas |

---

## 2. Teoría mínima que necesitas

### 2.1 Ecuación del diodo

$$
I_D = I_S\left(e^{\frac{V_D}{nV_T}} - 1\right), \qquad V_T = \frac{k_B T}{q} = 25.9\ \text{mV a } T = 300\ \text{K}
$$

- $I_S$: corriente inversa de saturación.
- $n$: factor de idealidad, entre 1 y 2 (recoge efectos de segundo orden que la fórmula ideal no considera).

En directa, cuando $V_D \gg nV_T$ (a partir de unas décimas de voltio), el "−1" es despreciable:

$$
I_D \approx I_S\, e^{\frac{V_D}{nV_T}}
$$

### 2.2 Cómo se linealiza para obtener $I_S$ y $n$

Tomando logaritmos neperianos:

$$
\ln I_D = \ln I_S + \frac{1}{nV_T}\,V_D
$$

Es una recta $y = a + m\,x$ con $y = \ln I_D$ y $x = V_D$:

| Parámetro de la recta | Qué te da |
|---|---|
| Pendiente $m = \dfrac{1}{nV_T}$ | $n = \dfrac{1}{m\,V_T}$ |
| Ordenada en el origen $a = \ln I_S$ | $I_S = e^{a}$ |

> ⚠️ **Posible errata del guion:** el paso 4 dice que "el corte con el eje de abscisas nos da $\ln(I_S)$". En realidad, $\ln I_S$ es el **corte con el eje de ordenadas** (el valor de $\ln I_D$ cuando $V_D = 0$). El corte con el eje de abscisas de esta recta sería otra cosa. Usa la ordenada en el origen para $I_S$.

### 2.3 Modelo lineal a tramos

Se divide la curva en dos estados:

- **OFF (corte):** $V_D < V_\gamma$ → $I_D \approx 0$ (circuito abierto).
- **ON (conducción):** $V_D > V_\gamma$ → recta de pendiente $1/r_d$:

$$
I_D = \frac{V_D - V_\gamma}{r_d}
\quad\Longleftrightarrow\quad
V_D = V_\gamma + r_d\,I_D
$$

Es decir, una **fuente $V_\gamma$ en serie con una resistencia $r_d$**.

**Definiciones del guion:**

- $V_\gamma$ (tensión umbral): el valor de $V_D$ para el que $I_D = I_\text{ref}$, donde $I_\text{ref}$ es una corriente de referencia a partir de la cual se considera que el diodo conduce. En la práctica se obtiene como el **corte con el eje X de la recta de ajuste**.
- $r_d = \Delta V/\Delta I$: la recta es una **secante** que corta la exponencial en el rango $[V_1, V_2]$ en el que va a trabajar el diodo; $I_1 = I_D(V_1)$, $I_2 = I_D(V_2)$.

> 💡 Ojo: aquí $r_d$ es la pendiente de la **secante** del modelo de gran señal, no la resistencia dinámica de pequeña señal $nV_T/I_D$ (que es la tangente en un punto). Dependen del rango elegido.

### 2.4 Diodo rectificador frente a Zener

| | **Rectificador** | **Zener** |
|---|---|---|
| Uso | Eliminar la componente negativa de una señal (rectificar) | Estabilizar una tensión en un punto |
| Zona de trabajo | Directa ($V_D > V_\gamma$) | Inversa, en ruptura ($V_D \le -V_Z$) |
| Ideal | $V_\gamma = 0$ y $r_d = 0$ (cortocircuito en ON, abierto en OFF) | $r_z$ muy pequeña: la tensión apenas cambia aunque cambie mucho la corriente |
| Parámetros a medir | $I_S$, $n$, $V_\gamma$, $r_d$ | Lo mismo en directa y además $V_Z$ (y $r_z$) |

---

## 3. Antes de ir al laboratorio

### 3.1 Material (según el guion)

- Fuente de tensión **variable** (que permita también polaridad negativa o poder invertir las conexiones).
- Resistencia nominal **entre 1 kΩ y 10 kΩ**.
- **Diodo rectificador** y **diodo Zener** (el guion indica que los Zener de las prácticas conducen aproximadamente a 7 V).
- **Polímetro(s)** o voltímetros para medir $V_D$ y $V_R$.
- Placa de pruebas y cables.

### 3.2 Montaje (Figura 2)

Fuente $V_i$ → resistencia $R$ → diodo $D$ → vuelta a la fuente. La salida $V_o$ del esquema se toma en el diodo.

```
   Vi  ──────[ R ]──────┬──────
    +                   │
                      ──┴──   D  (ánodo arriba, cátodo abajo)
    −                   │
   ─────────────────────┴──────
                 (Vo = tensión en D)
```

- **Diodo en directa:** el ánodo va al lado de la resistencia y el cátodo (el lado con la banda) al terminal negativo.
- La corriente se obtiene indirectamente: $I_D = V_R / R$, **usando el valor real de $R$ medido con el polímetro**, no el nominal.

### 3.3 Elección de la resistencia

💡 Cuánto mayor sea $R$, mejor resolución tendrás en corrientes pequeñas, pero necesitarás más tensión de fuente para llegar a ≈ 1 mA.

| $R$ | $V_i$ para $I_D = 1$ mA (con $V_D \approx 0.65$ V) | Resolución en corriente (si el polímetro aprecia 1 mV) |
|---|---|---|
| 1 kΩ | ≈ 1.65 V | 1 µA |
| 4.7 kΩ | ≈ 5.4 V | ≈ 0.2 µA |
| 10 kΩ | ≈ 10.7 V | 0.1 µA |

Con 10 kΩ las corrientes bajas se miden bastante mejor, así que verás un tramo exponencial más largo en la gráfica semilogarítmica. Si la fuente del laboratorio no llega a ≈ 11 V, usa una resistencia menor. Elige una y **no la cambies** durante el barrido (el guion pide anotar su valor real).

### 3.4 Plan del barrido

El guion da un paso orientativo de 0.1–0.2 V en $V_i$. En la práctica:

1. Empieza en 0 V.
2. Hasta que $V_D$ llegue a ≈ 0.4 V, la corriente es minúscula; con pasos de 0.2 V basta.
3. **Cerca del codo** ($V_D$ entre 0.5 y 0.7 V) la corriente cambia muy deprisa; usa pasos de 0.1 V.
4. Termina cuando $I_D \approx 1$ mA.
5. Procura reunir **al menos 15–20 puntos útiles** en la zona exponencial.

### 3.5 Precauciones

- No pases de **≈ 1 mA** en directa (lo pide el guion), ni excedas la potencia del Zener.
- Comprueba la **polaridad** del diodo antes de conectar la fuente.
- En el Zener, el barrido negativo debe hacerse **siempre con la resistencia en serie** (limita la corriente en ruptura).
- Deja que se estabilice cada lectura antes de anotarla (el diodo se calienta y $V_D$ baja unos mV/°C).

---

## 4. Procedimiento paso a paso

### 4.1 Preparación

1. Mide $R$ con el polímetro y anótala con sus decimales (**$R_\text{real}$ = _____ Ω**).
2. Anota el modelo de los diodos y de los polímetros, y la temperatura aproximada del laboratorio.
3. Monta el circuito de la Figura 2 con el **diodo rectificador**.

### 4.2 Diodo rectificador

1. Pon la fuente a 0 V y enciéndela.
2. Sube $V_i$ en pasos (apartado 3.4). En cada paso anota:
   - $V_i$ (el valor que marca la fuente, solo como referencia),
   - $V_D$ (tensión **en el diodo**),
   - $V_R$ (tensión **en la resistencia**).
3. Calcula la corriente: $I_D = V_R / R_\text{real}$.
4. Detente cuando $I_D$ ≈ 1 mA.
5. Haz un par de **comprobaciones**: $V_i \approx V_D + V_R$ (si no cuadra, hay un error de lectura o de conexión).

💡 Si el polímetro tiene **impedancia de entrada** de 10 MΩ, al medir $V_D$ en corrientes muy bajas (décimas de µA) se está desviando una corriente $V_D/10\,\text{M}\Omega \approx 50$ nA. Para corrientes de µA es despreciable, pero por debajo de 0.1 µA no te fíes de la lectura: ese tramo no lo uses en el ajuste exponencial.

### 4.3 Diodo Zener

1. Apaga la fuente y sustituye el rectificador por el **Zener**.
2. **Directa:** repite exactamente el mismo barrido positivo (será parecido al del rectificador, con $V_\gamma$ similar).
3. **Inversa:** invierte la polaridad (o invierte el diodo) y barre tensiones negativas desde 0 V:
   - al principio la corriente es prácticamente nula (de nA), y $V_D \approx V_i$,
   - al acercarte a ≈ −7 V (el guion dice que conducen aproximadamente a 7 V) la corriente se dispara; ahí **baja el paso a 0.1 V**,
   - continúa hasta alcanzar corrientes del orden de ≈ 1 mA (en valor absoluto) en la zona de ruptura.
4. Anota los mismos datos: $V_i$, $V_D$ (negativa), $V_R$. Ten cuidado con el **signo** de cada magnitud.
5. En la zona de ruptura reúne bastantes puntos (≥ 8–10): son los que te darán $V_Z$ y $r_z$.

💡 Antes de retirarte del laboratorio, mira si tu gráfica "cuadra": dibuja rápidamente $I_D$ vs. $V_D$ (aunque sea a mano). Es mejor repetir puntos ahora que descubrir un hueco después.

---

## 5. Tratamiento de los datos

### 5.1 Tablas

Plantilla para el **rectificador** (rellénala en el laboratorio):

| Nº | $V_i$ (V) | $V_D$ (V) | $V_R$ (V) | $I_D = V_R/R$ (mA) | $\ln(I_D\,[\text{A}])$ |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| … | | | | | |

Para el **Zener** usa la misma tabla con una sección de tensiones positivas y otra de negativas. En las negativas, $V_D < 0$ e $I_D < 0$; para el logaritmo y las gráficas semilogarítmicas se trabaja con el valor absoluto.

> ⚠️ **Unidades:** haz el $\ln$ con la corriente **en amperios**. Si la pones en mA, $\ln I_S$ saldrá desplazado ($\ln 10^{-3}$ de diferencia) y $I_S$ quedará mal por un factor de mil.

### 5.2 Ajuste exponencial: $I_S$ y $n$

**Procedimiento:**

1. Representa $I_D$ vs. $V_D$ (escala lineal). Debe verse la exponencial.
2. Representa $\ln I_D$ vs. $V_D$.
3. Elige el **tramo recto** (la zona exponencial pura). Descarta:
   - los puntos de corriente muy baja, dominados por el ruido, la resolución del polímetro y el efecto de su impedancia;
   - los puntos de corriente más alta, donde la curva se aplana por la **resistencia serie** del diodo.
4. Haz una regresión lineal $\ln I_D = a + m\,V_D$ y calcula:

$$
n = \frac{1}{m\,V_T}, \qquad I_S = e^{a}
$$

con $V_T = 25.9$ mV.

> 💡 **$I_S$ es muy sensible a $n$.** Se obtiene extrapolando hasta $V_D = 0$, bastante lejos de los datos. Un error del 5 % en la pendiente puede cambiar $I_S$ en un **factor ≈ 3** (porque $e^{0.05 \cdot V_D/(nV_T)}$ con $V_D/(nV_T) \approx 23$ da $e^{1.2} \approx 3.3$). Es normal que $I_S$ salga con mucha dispersión; lo importante es el **orden de magnitud**. Dalo con su incertidumbre y comenta esta sensibilidad en las conclusiones.

### 5.3 Ajuste lineal: $V_\gamma$ y $r_d$

1. Con **solo los puntos de conducción directa** (por encima del codo), dibuja $I_D$ vs. $V_D$ en escala lineal.
2. Ajusta por **mínimos cuadrados** una recta $I_D = m\,V_D + b$.
3. Obtén:

$$
\frac{1}{r_d} = m \;\Rightarrow\; r_d = \frac{1}{m}, \qquad
V_\gamma = -\frac{b}{m} \quad\text{(corte con el eje X: } I_D = 0\text{)}
$$

4. Dibuja la recta ajustada sobre los datos y comprueba visualmente que sigue bien la curva en el rango de trabajo.

> 💡 **Importante:** $V_\gamma$ y $r_d$ **dependen del rango** de corrientes que elijas para el ajuste (la recta es una secante de una exponencial). Indica en el informe qué intervalo has usado (p. ej. "de 0.1 mA a 1 mA") y justifica la elección. Si lo haces con otro rango, los números cambian, y eso es normal.

**Fórmulas de mínimos cuadrados** (por si las pide la plantilla):

$$
m = \frac{N\sum x_i y_i - \sum x_i \sum y_i}{N\sum x_i^2 - \left(\sum x_i\right)^2},
\qquad
b = \frac{\sum y_i - m\sum x_i}{N}
$$

En LibreOffice/Excel: `PENDIENTE(y; x)`, `INTERSECCION.EJE(y; x)` y `REGLINP(y; x; 1; 1)` (devuelve también las incertidumbres de $m$ y $b$).

### 5.4 Zener: $V_Z$ y $r_z$

1. Con los datos de **tensión negativa**, representa $I_D$ vs. $V_D$.
2. Identifica la **zona de ruptura** (corriente que crece mucho con muy poca variación de tensión).
3. Ajusta una recta en esa zona: $I_D = m_Z\,V_D + b_Z$.
4. El **corte con el eje X** da la tensión del codo (el valor de $V_D$ para el que $I_D = 0$):

$$
V_D\big|_{I_D=0} = -\frac{b_Z}{m_Z} \;\equiv\; -V_Z
$$

   y la **resistencia del Zener** es $r_z = 1/|m_Z|$.
5. Da $V_Z$ en valor positivo (el guion lo define como $V_D = -V_Z$) y compárala con el valor esperado (≈ 7 V según el guion).

> 💡 En un Zener real el codo es **redondeado** (sobre todo en los de ≈ 7 V, donde se mezclan los mecanismos Zener y de avalancha), así que el ajuste lineal debe hacerse **solo en la parte ya recta**, no en el codo.

### 5.5 Incertidumbres

Con lo que se mide en la práctica, estas son las fuentes habituales:

| Fuente de error | Efecto |
|---|---|
| Resolución del polímetro (± 1 dígito) | Afecta sobre todo a $V_R$ en corrientes bajas → error relativo grande en $I_D$ |
| Tolerancia de $R$ (por eso se mide) | Error sistemático en $I_D = V_R/R$ |
| Impedancia de entrada del polímetro | Desvía una corriente pequeña; solo importa para $I_D < 0.1\ \mu$A |
| Calentamiento del diodo | $V_D$ baja ≈ 2 mV por °C a corriente fija |
| Resistencia serie del diodo | La curva se aplana a corrientes altas respecto de la exponencial pura |
| Temperatura distinta de 300 K | $V_T = k_BT/q$ cambia (a 295 K, 25.4 mV) |
| Elección del rango de ajuste | Cambia $V_\gamma$, $r_d$, $n$ e $I_S$ |

Para la incertidumbre de los parámetros de los ajustes, usa la que devuelve la regresión (`REGLINP` o `scipy.stats.linregress`) y propágala:

$$
\frac{\Delta n}{n} = \frac{\Delta m}{m}, \qquad
\Delta I_S = I_S\,\Delta a, \qquad
\frac{\Delta r_d}{r_d} = \frac{\Delta m}{m}
$$

### 5.6 Script de Python para los ajustes

Opcional, pero ahorra tiempo y evita errores. Guarda tus datos en un `.csv` con columnas `VD,VR` (en voltios) y pon el valor real de `R`.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

VT = 25.9e-3          # V (guion)
R = 1000.0            # <-- sustituye por la R real medida (ohm)

data = np.loadtxt("rectificador.csv", delimiter=",", skiprows=1)
VD, VR = data[:, 0], data[:, 1]
ID = VR / R           # A

# --- Ajuste exponencial: ln(ID) = ln(IS) + VD/(n*VT) ---------------------
# Elige aqui el tramo recto de la grafica semilog
mask = (ID > 1e-6) & (ID < 5e-4)          # <-- ajusta los limites
res = stats.linregress(VD[mask], np.log(ID[mask]))
n = 1 / (res.slope * VT)
IS = np.exp(res.intercept)
print(f"n  = {n:.3f}  (+/- {n*res.stderr/res.slope:.3f})")
print(f"IS = {IS:.3e} A")

# --- Ajuste lineal en directa: ID = (VD - Vg)/rd --------------------------
mask2 = ID > 1e-4                           # <-- zona de conduccion
lin = stats.linregress(VD[mask2], ID[mask2])
rd = 1 / lin.slope
Vg = -lin.intercept / lin.slope
print(f"rd = {rd:.1f} ohm,  Vgamma = {Vg:.3f} V")

# --- Graficas ---------------------------------------------------------------
fig, ax = plt.subplots(1, 2, figsize=(11, 4))
ax[0].plot(VD, ID*1e3, "o", label="medidas")
vv = np.linspace(Vg, VD.max(), 50)
ax[0].plot(vv, (vv - Vg)/rd*1e3, "-", label="lineal a tramos")
ax[0].set_xlabel("$V_D$ (V)"); ax[0].set_ylabel("$I_D$ (mA)"); ax[0].legend()

ax[1].semilogy(VD, ID, "o", label="medidas")
ax[1].semilogy(VD, IS*np.exp(VD/(n*VT)), "-", label="exponencial")
ax[1].set_xlabel("$V_D$ (V)"); ax[1].set_ylabel("$I_D$ (A)"); ax[1].legend()
plt.tight_layout(); plt.savefig("rectificador.png", dpi=200)
```

Para el Zener, repite el análisis en directa igual y añade un ajuste lineal para $V_D < 0$ en la zona de ruptura: el corte con el eje X es $-V_Z$ y $r_z = 1/|\text{pendiente}|$.

---

## 6. Simulación con SPICE

**Cuándo:** después del laboratorio. **Qué se pide:** simular los dos diodos y comparar las gráficas $I$–$V$ simuladas con las medidas.

### 6.1 Diodo rectificador

1. En PSpice abre un esquema nuevo y coloca:
   - una fuente de tensión continua (`VDC`), una resistencia $R$ (con el valor real usado en el laboratorio) y el diodo **`Dbreak`** de la librería **BREAKOUT**.
2. Modelo por defecto de `Dbreak`:

```
.model Dbreak D Is=1e-14 Cjo=.1pF Rs=.0
```

   El parámetro **`Is`** es el que determina la tensión a la que el diodo conduce en directa.
3. Crea un perfil de simulación **DC Sweep** barriendo la fuente de 0 V al valor máximo usado en laboratorio, con paso pequeño (p. ej. 10 mV).
4. En Probe representa **`I(D)` vs. `V(D)`** (la corriente frente a la tensión del diodo, igual que en la medida).

### 6.2 Diodo Zener

1. Usa **`DbreakZ`** (misma librería).
2. Edita su modelo y añade el parámetro **`BV`** (tensión de ruptura ≈ 7 V):

```
.model Dbreak D Is=1e-14 Cjo=.1pF Rs=.1 BV=7
```

3. Haz el DC Sweep desde un valor negativo (p. ej. −10 V) hasta un valor positivo pequeño (p. ej. +2 V), con paso pequeño, y representa `I(D)` vs. `V(D)`.

### 6.3 Qué esperar y cómo comparar

**Antes de simular ya se puede estimar** el rectificador con $I_S = 10^{-14}$ A y $n = 1$ (valores por defecto):

$$
V_D = V_T\ln\!\left(\frac{I_D}{I_S}\right) = 25.9\ \text{mV}\cdot\ln\!\left(\frac{10^{-3}}{10^{-14}}\right) \approx 0.656\ \text{V a } 1\ \text{mA}
$$

Y a 0.1 mA saldría ≈ 0.597 V. Así que el codo simulado estará en ≈ 0.6–0.65 V.

**Para la comparación** (puntos que suelen pedirse):

- Superpón en una misma gráfica la curva medida y la simulada.
- Compara $V_\gamma$ y $V_D$ a la misma corriente (p. ej. a 1 mA).
- Diferencias esperables: el modelo SPICE usa $n = 1$ y un $I_S$ genérico (no el del componente real), por lo que lo normal es que **el diodo real conduzca a otra tensión**. Si tu $n$ medido es mayor que 1, la curva real será más "suave" que la simulada.
- En el Zener, el modelo con `BV=7` tiene un codo mucho más **abrupto** que el del componente real (con corriente de ruptura de referencia muy pequeña), así que la $r_z$ simulada será muy pequeña frente a la medida.
- 💡 Si quieres acercar la simulación a lo medido, puedes ajustar `Is` y `N` del modelo con los valores que obtengas del ajuste exponencial y volver a simular.

---

## 7. Cuestiones que se pueden responder ya (sin datos de laboratorio)

> Las respuestas están redactadas para poder pasarlas a la plantilla con pocos cambios. Cuando haya datos, se concretan con los valores medidos.

### 7.1 ¿Qué características interesan en un diodo rectificador? ¿Por qué?

Interesa que sea lo más parecido posible a un **diodo ideal**: una tensión umbral $V_\gamma$ lo más baja posible (idealmente 0) y una resistencia en conducción $r_d$ también baja, o sea, una pendiente alta en la zona de conducción. Con eso, en directa el diodo se comporta casi como un cortocircuito y en inversa como un circuito abierto, y la parte positiva de la señal pasa prácticamente sin alterarse.

Si $V_\gamma$ y $r_d$ son grandes, parte de la tensión de la señal se pierde en el propio diodo y la señal rectificada sale más pequeña y deformada.

### 7.2 ¿Para qué se utiliza un diodo Zener y cómo funciona?

Se utiliza para **estabilizar la tensión** en un punto del circuito. En polarización directa se comporta como un diodo normal, pero en **inversa** conduce a partir de una tensión negativa del orden de varios voltios ($-V_Z$). En esa zona de ruptura la curva es casi vertical: la corriente puede cambiar mucho y la tensión del diodo apenas varía. Por eso, si se pone en paralelo con la carga y una resistencia en serie, mantiene la tensión de salida casi constante en torno a $V_Z$ aunque cambie la entrada.

Su modelo lineal en ruptura es una fuente $V_{Z}$ (o $V_{Z0}$) en serie con una resistencia pequeña $r_z$.

### 7.3 ¿Cómo se obtiene la corriente por el diodo sin un amperímetro?

El diodo y la resistencia están en serie, así que por ambos circula la misma corriente. Se mide la caída de tensión en la resistencia, $V_R$, y se aplica la ley de Ohm:

$$
I_D = \frac{V_R}{R}
$$

Por eso es importante medir el valor real de $R$ (la tolerancia habitual de una resistencia comercial es del 5 % o menos). Como comprobación, $V_i = V_D + V_R$.

### 7.4 ¿Por qué representar $\ln I_D$ frente a $V_D$ y qué información se extrae?

Porque la ecuación del diodo en directa es exponencial, y su logaritmo es **lineal** en $V_D$:

$$
\ln I_D = \ln I_S + \frac{V_D}{nV_T}
$$

Al ajustar una recta, la **pendiente** vale $1/(nV_T)$, de donde se despeja $n$, y la **ordenada en el origen** vale $\ln I_S$, de donde sale $I_S$. Es mucho más fácil ajustar una recta que una exponencial, y además se ve claramente en qué rango de tensiones el diodo sigue la ley exponencial.

### 7.5 ¿Qué es la tensión umbral $V_\gamma$ y cómo se obtiene en la práctica?

Es la tensión en el diodo que marca el paso de **OFF a ON** en el modelo lineal a tramos: la tensión a la que la corriente alcanza un valor de referencia $I_\text{ref}$ por encima del cual se considera que el diodo conduce. Experimentalmente se obtiene como el **corte con el eje de tensión** de la recta que mejor ajusta (por mínimos cuadrados) los puntos de conducción en directa.

### 7.6 ¿Qué significa $r_d$ en el modelo lineal a tramos y de qué depende?

Es la inversa de la pendiente de la recta en ON: $r_d = \Delta V/\Delta I$ entre dos puntos $(V_1, I_1)$ y $(V_2, I_2)$. Gráficamente, la recta es la **secante** a la exponencial en el intervalo de tensiones en el que se espera que trabaje el diodo, así que **$r_d$ y $V_\gamma$ dependen del rango elegido**: un rango de corrientes más altas da una pendiente mayor (menor $r_d$) y un $V_\gamma$ mayor.

### 7.7 ¿Qué valores cabe esperar? (orientativos)

| Parámetro | Valor esperado | Comentario |
|---|---|---|
| $V_\gamma$ (silicio) | ≈ 0.6–0.7 V | Depende del $I_\text{ref}$ y del rango del ajuste |
| $V_D$ a 1 mA (silicio) | ≈ 0.6–0.75 V | Según $I_S$ del diodo concreto |
| $n$ | Entre 1 y 2 | Lo normal en diodos de unión PN de silicio es ≈ 1–1.5 |
| $I_S$ | Muy pequeña (típicamente del orden de pA a decenas de nA, según el diodo) | Muy sensible a $n$ y al rango de ajuste |
| $r_d$ | De decenas de ohmios a unos pocos ohmios, según el rango | A 1 mA, la resistencia dinámica $nV_T/I_D$ es ≈ 26–50 Ω |
| $V_Z$ del Zener | ≈ 7 V | Valor que indica el propio guion para los Zener de la práctica |
| Zener en directa | Parecido a un diodo normal ($V_\gamma \approx 0.6$–$0.7$ V) | |

> Estos valores son referencias generales para ver si tus resultados tienen sentido. Los que cuentan son los medidos.

### 7.8 ¿Por qué la curva $\ln I_D$ vs. $V_D$ no es recta en todo el rango?

- **A corrientes muy bajas** dominan efectos como la recombinación en la zona de carga espacial (que corresponde a $n \approx 2$), las fugas y la resolución limitada del polímetro.
- **A corrientes más altas** la curva se desvía de la recta por la **resistencia serie** del diodo (caída $I_D R_S$ que se suma a $V_D$) y por efectos de alta inyección.

Por eso se elige solo la parte recta para obtener $I_S$ y $n$.

### 7.9 Comparación entre el modelo exponencial y el lineal a tramos

| Modelo | Ventajas | Inconvenientes |
|---|---|---|
| **Exponencial** | Describe bien la curva en todo el rango directo | Ecuación no lineal; los circuitos se resuelven iterando |
| **Lineal a tramos** | Cálculos rápidos y directos con circuitos lineales | Solo es válido en el rango donde se ha ajustado; $V_\gamma$ y $r_d$ cambian al cambiar el rango |

### 7.10 ¿Por qué se pone una resistencia en serie en el montaje?

Para **limitar la corriente**: sin ella, una pequeña subida de la tensión de la fuente dispararía la corriente del diodo (por la forma exponencial) y podría dañarlo. Además, la resistencia permite **medir la corriente** a partir de su tensión, y en el Zener protege al componente en la zona de ruptura.

### 7.11 ¿Qué tensión esperarías en el diodo si $I_D$ se multiplica por 10?

Si $n = 1$, $V_D$ aumenta en $V_T\ln 10 \approx 59.6$ mV (≈ 60 mV por década). Con $n \ne 1$, sube $n\cdot 59.6$ mV. Puedes usarlo de comprobación: en tu gráfica $\ln I_D$ vs. $V_D$, cada década de corriente debe corresponder a ≈ $n\cdot 60$ mV de aumento de $V_D$.

---

## 8. Cuestiones que dependerán de los datos

Estas se podrán contestar cuando tengas las medidas; ya sabes qué hay que preparar:

| Cuestión | Qué hace falta |
|---|---|
| Gráfica $I_D$–$V_D$ del rectificador | Tabla del rectificador |
| Ajuste exponencial: $I_S$ y $n$ | Zona recta de $\ln I_D$ vs. $V_D$ + regresión |
| Ajuste lineal: $V_\gamma$ y $r_d$ | Puntos de conducción + regresión (indica el rango) |
| Mismo análisis para el Zener en directa | Tabla del Zener (tensiones positivas) |
| $V_Z$ y $r_z$ | Tabla del Zener (tensiones negativas), zona de ruptura |
| Comparación con las simulaciones de SPICE | Curvas simuladas y medidas en la misma gráfica |
| ¿Los valores son coherentes con lo esperado? | Tabla del apartado 7.7 |
| Fuentes de error y conclusiones | Tus resultados + incertidumbres |

---

## 9. Lista de comprobación final

**En el laboratorio**

- [ ] $R$ medida y anotada con su valor real
- [ ] Modelos de diodos y polímetros anotados
- [ ] Barrido del rectificador hasta ≈ 1 mA, con puntos finos cerca del codo
- [ ] Barrido del Zener en directa
- [ ] Barrido del Zener en inversa, con muchos puntos en la ruptura
- [ ] Comprobación de $V_i \approx V_D + V_R$ en varios puntos
- [ ] Signos de $V_D$ e $I_D$ correctos en el Zener
- [ ] Fotos o copia de las tablas antes de irte

**Análisis**

- [ ] Tabla con columna de $I_D$ (en mA) y $\ln I_D$ (con $I_D$ en A)
- [ ] Gráfica $I_D$ vs. $V_D$
- [ ] Gráfica $\ln I_D$ vs. $V_D$ con ajuste → $I_S$ y $n$
- [ ] Ajuste lineal de la conducción directa → $V_\gamma$ y $r_d$ (rango indicado)
- [ ] Zener: $V_Z$ y $r_z$
- [ ] Incertidumbres
- [ ] Simulaciones de SPICE y comparación
- [ ] Conclusiones: coherencia con lo esperado, fuentes de error, limitaciones de cada modelo

---

## 10. Qué tendrás que pasarme después

Para completar la plantilla necesito:

1. **La plantilla** (PDF o documento que entregarás al profesor).
2. **Datos del laboratorio:**
   - valor real de $R$ y modelos de los componentes,
   - tabla del rectificador ($V_i$, $V_D$, $V_R$),
   - tabla del Zener en directa y en inversa (con signos),
   - cualquier observación que anotases (temperatura, puntos dudosos, etc.).
3. **Las gráficas de SPICE** (o los resultados numéricos) si la plantilla las pide.

Con eso calculo los ajustes, relleno cada apartado con los números concretos y reviso la coherencia de los resultados.

---

*Fin de la guía de la Práctica 2.*
