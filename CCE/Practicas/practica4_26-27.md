# Práctica 4 — Transistor MOSFET: medida de la característica estática

> **Asignatura:** Componentes y Circuitos Electrónicos · **Grado:** Ingeniería de Tecnologías de Telecomunicación
> **Universidad de Granada** · Dpto. de Electrónica y Tecnología de Computadores · Curso 26-27
> **Fuente:** `practica4_26-27.pdf` (guion de 4 páginas)

---

## Índice

1. [Resumen ejecutivo (esquema de la práctica)](#1-resumen-ejecutivo-esquema-de-la-práctica)
2. [Objetivos](#2-objetivos)
3. [Material e integrado CMOS 4007](#3-material-e-integrado-cmos-4007)
4. [**Teoría del MOSFET (para el test previo)**](#4-teoría-del-mosfet-para-el-test-previo)
5. [Procedimiento experimental, paso a paso y con análisis](#5-procedimiento-experimental-paso-a-paso-y-con-análisis)
   - [5.1 Modelo DC en saturación (Fig. 2)](#51-modelo-dc-de-un-mosfet-en-saturación-fig-2)
   - [5.2 Curva de salida IDS–VDS (Fig. 3)](#52-curva-de-salida-ids–vds-fig-3)
   - [5.3 Curva de transferencia IDS–VGS (Fig. 4)](#53-curva-de-transferencia-ids–vgs-fig-4)
   - [5.4 (Opcional) Osciloscopio en modo XY (Fig. 5)](#54-opcional-osciloscopio-en-modo-xy-como-trazador-de-curvas-fig-5)
6. [Simulación con SPICE](#6-simulación-circuital-spice-posterior-al-laboratorio)
7. [Tratamiento de datos (código de apoyo)](#7-tratamiento-de-datos-código-de-apoyo)
8. [Errores típicos y consejos](#8-errores-típicos-y-consejos)
9. [Chuleta de fórmulas](#9-chuleta-de-fórmulas)
10. [Batería de preguntas tipo test (teoría)](#10-batería-de-preguntas-tipo-test-teoría)
11. [Checklist de entrega](#11-checklist-de-entrega)

---

## 1. Resumen ejecutivo (esquema de la práctica)

| Bloque | Circuito | Qué se hace | Qué se obtiene |
|---|---|---|---|
| **A. Saturación** | Fig. 2 (puerta unida a drenador, $R=10\,\text{k}\Omega$) | Barrido $V_i$: 0 → 15 V, **≥ 30 puntos**. Medir $V_R$ y $V_{DS}$ | Tabla $V_i,\;V_{GS}=V_{DS},\;I_{DS}$; gráfica $\sqrt{I_{DS}}$ vs $V_{GS}$; ajuste por mínimos cuadrados → **$\beta_n$ y $V_T$** |
| **B. Curva de salida** | Fig. 3 ($V_{GG}=3\,\text{V}$, $R=1\,\text{k}\Omega$) | Barrido $V_i$: 0 → 7,5 V, **paso máx. 0,5 V**. Medir $V_{DS}$ e $I_{DS}$ | Curva $I_{DS}$–$V_{DS}$ con zonas lineal/saturación; recta en saturación → **tensión Early** |
| **C. Curva de transferencia** | Fig. 4 ($R_1=10\,\Omega$, $V_{DD}=1{,}5\,\text{V}$) | Barrido $V_i$ (puerta): 0 → 7,5 V, **paso máx. 0,25 V**. Medir $V_{GS}$ e $I_{DS}$ | Curva $I_{DS}$–$V_{GS}$ e interpretación de regiones |
| **D. Opcional (nota extra)** | Fig. 5 (= Fig. 4 con generador y osciloscopio XY) | Puerta: onda triangular/senoidal 0–5 V, 100 Hz; $V_{DD}$ = 0,2 / 1,5 / 3 V | Curva $I_{DS}$–$V_{GS}$ directamente en pantalla |
| **E. Simulación** | Todos los anteriores | Simular con SPICE y comparar | Comparativa simulación vs. medida |

**Parámetros a determinar en toda la práctica:** tensión umbral $V_T$, parámetro $\beta_n$ y tensión Early $V_A$.

---

## 2. Objetivos

Textualmente, el guion plantea:

1. Obtener **experimentalmente** las curvas $I_{DS}$–$V_{DS}$ (salida) e $I_{DS}$–$V_{GS}$ (transferencia) de un MOSFET.
2. Emplear el **osciloscopio en modo XY como trazador de curvas**.
3. Determinar parámetros que definen el comportamiento del transistor:
   - **Tensión umbral** $V_T$
   - **Parámetro** $\beta_n$
   - **Tensión Early** $V_A$

---

## 3. Material e integrado CMOS 4007

### 3.1 El circuito integrado

El **CMOS 4007** contiene **6 transistores MOSFET: 3 NMOS y 3 PMOS**, conectados según el esquema de la Figura 1 del guion. En la práctica se usa **un único NMOS** (el marcado con un círculo rojo en la figura):

| Terminal del transistor | Patilla del CI |
|---|---|
| **Puerta (G)** | **6** |
| **Fuente (S)** | **7** (que es también $V_{SS}$) |
| **Drenador (D)** | **8** |

### 3.2 Patillaje completo (según la Figura 1)

```
              CMOS 4007 (vista superior)
            ┌───────────∪───────────┐
   D-PB   1 │●                      │ 14  VDD
   S-PB   2 │                       │ 13  D-PA
  GATE-B  3 │                       │ 12  OUT-C
   S-NB   4 │                       │ 11  S-PC
   D-NB   5 │                       │ 10  GATE-C
  GATE-A  6 │ ◄── PUERTA (NMOS usado)│ 9   S-NC
   VSS    7 │ ◄── FUENTE            │ 8   D-NA  ◄── DRENADOR
            └───────────────────────┘
        D = Drain (drenador)   S = Source (fuente)
        VDD = pin 14           VSS = pin 7
```

> **Observación de análisis:** la fuente del NMOS usado (pin 7) coincide con $V_{SS}$. Como el sustrato de los NMOS del CI está a $V_{SS}$, **fuente y sustrato están unidos** → no hay efecto cuerpo y el modelo de 3 terminales (G, D, S) es válido. En todos los montajes la fuente va a **tierra** (en las Figs. 2 y 3 directamente; en las Figs. 4 y 5 a través de $R_1$).

> **Recomendación práctica (no aparece en el guion, confírmalo con el profesor/datasheet):** en los CI CMOS conviene **no dejar el pin 14 ($V_{DD}$) al aire**; se suele conectar a la tensión positiva más alta del montaje, para que los diodos de protección de las puertas no conduzcan hacia un nodo flotante.

### 3.3 Instrumentación necesaria (deducida del guion)

- Fuente de alimentación **regulable** (para $V_i$), y fuentes adicionales para $V_{GG}$ y $V_{DD}$.
- Resistencias comerciales: **10 kΩ**, **1 kΩ**, **10 Ω**.
- Polímetro (medir el valor **real** de las resistencias y las tensiones $V_R$, $V_{DS}$, $V_{GS}$).
- Osciloscopio (con modo XY) y generador de funciones (apartado opcional).
- Protoboard y cables.

---

## 4. Teoría del MOSFET (para el test previo)

> Esta es la parte que más importa para el test. Se explica desde cero hasta llegar a lo que se usa en cada montaje.

### 4.1 Qué es un MOSFET de canal n de acumulación (enriquecimiento)

Un **NMOS** tiene 4 terminales físicos (D, G, S, B), aunque aquí se trabaja con **3** porque el sustrato (B) está unido a la fuente.

```
        G (puerta, metal/polisilicio)
        │
   S ───┤  ══ óxido de puerta (aislante, SiO₂) ══
   │    │      canal n inducido
  n+ ───┴──── n+  ← D
     sustrato p  (B = S)
```

- **Estructura:** sustrato tipo p con dos islas n⁺ (fuente y drenador). La puerta está **aislada** del canal por una fina capa de óxido → forma un condensador MOS.
- **Idea física:** la tensión $V_{GS}$ crea un campo eléctrico que atrae electrones a la superficie del sustrato. Cuando $V_{GS}$ supera un valor umbral **$V_T$**, se forma una **capa de inversión (canal n)** que conecta fuente y drenador, y entonces puede circular corriente.
- **Corriente de puerta nula:** como la puerta está aislada, $I_G \approx 0$ en continua. Por eso se puede afirmar que $I_{DS}$ es **la misma corriente que circula por la resistencia** en serie con el drenador (esto es lo que permite medir $I_{DS}$ con $V_R/R$).
- **Enriquecimiento (enhancement):** sin tensión de puerta **no hay canal**; el dispositivo está "apagado" por defecto. El 4007 es de este tipo, con $V_T>0$ en los NMOS.
- **Convenio de signos (NMOS):** $V_{GS}>0$, $V_{DS}\ge 0$, $I_{DS}$ entra por el drenador y sale por la fuente.

### 4.2 Parámetros fundamentales

| Símbolo | Nombre | Significado | Unidades |
|---|---|---|---|
| $V_T$ | **Tensión umbral** | $V_{GS}$ mínima para que exista canal (inversión) | V |
| $\beta_n$ | **Parámetro de transconductancia** | Mide "lo bien que conduce" el transistor: $\beta_n=\mu_n C_{ox}\dfrac{W}{L}$ | A/V² |
| $\mu_n$ | Movilidad de electrones | — | cm²/(V·s) |
| $C_{ox}$ | Capacidad de óxido por unidad de área | — | F/cm² |
| $W/L$ | Relación de aspecto (anchura/longitud del canal) | Mayor $W/L$ → mayor $\beta_n$ | adimensional |
| $V_A$ | **Tensión Early** | Mide el efecto de modulación de la longitud del canal | V |
| $\lambda$ | Parámetro de modulación de canal | $\lambda = 1/V_A$ | V⁻¹ |

> ⚠️ **Convenio del guion:** la corriente de saturación se escribe con un **½ explícito**: $I_{DS}=\dfrac{\beta_n}{2}(V_{GS}-V_T)^2$. Algunos libros definen $K=\beta_n/2$ y escriben $I_{DS}=K(V_{GS}-V_T)^2$. **Aquí $\beta_n$ lleva el ½ fuera**; si el test te pregunta, usa este convenio.

### 4.3 Las tres regiones de operación

Se definen por dos comparaciones: $V_{GS}$ frente a $V_T$ (¿hay canal?) y $V_{DS}$ frente a $V_{GS}-V_T$ (¿está estrangulado el canal en el drenador?).

#### a) Corte
**Condición:** $V_{GS} < V_T$

$$I_{DS}\approx 0$$

No hay canal. (En la realidad hay una corriente muy pequeña de *subumbral*/fugas, que además hace que la transición en $V_T$ sea **redondeada** y no un codo perfecto.)

#### b) Región lineal (triodo / óhmica)
**Condición:** $V_{GS} > V_T$ **y** $V_{DS} < V_{GS}-V_T$

$$I_{DS}=\beta_n\left[(V_{GS}-V_T)V_{DS}-\frac{V_{DS}^2}{2}\right]$$

- El canal recorre toda la distancia fuente–drenador.
- Para $V_{DS}$ pequeña el término cuadrático es despreciable y el transistor se comporta como una **resistencia controlada por tensión**:

$$I_{DS}\approx\beta_n (V_{GS}-V_T)V_{DS}\quad\Rightarrow\quad R_{on}=\frac{V_{DS}}{I_{DS}}=\frac{1}{\beta_n(V_{GS}-V_T)}$$

- **A $V_{DS}$ fija**, $I_{DS}$ es una **función lineal de $V_{GS}$** (cuando $V_{DS}\ll V_{GS}-V_T$), con pendiente $\beta_n V_{DS}$. *(Clave para interpretar la Fig. 4 / modo XY.)*

#### c) Saturación
**Condición:** $V_{GS} > V_T$ **y** $V_{DS} \ge V_{GS}-V_T$

$$\boxed{I_{DS}=\frac{\beta_n}{2}(V_{GS}-V_T)^2}\qquad\text{(ecuación (1) del guion)}$$

- Al llegar $V_{DS}=V_{GS}-V_T$ el canal se **estrangula (pinch-off)** junto al drenador (la tensión puerta–drenador cae a $V_{GD}=V_T$).
- A partir de ahí, aumentar $V_{DS}$ **no aumenta** (idealmente) la corriente: el transistor se comporta como una **fuente de corriente controlada por $V_{GS}$**.
- La corriente depende **cuadráticamente** de $V_{GS}-V_T$ (por eso se linealiza con la raíz cuadrada, ver §4.5).

> **Condiciones equivalentes de saturación:** $V_{DS}\ge V_{GS}-V_T \;\Longleftrightarrow\; V_{GD}\le V_T$.

#### Resumen de regiones

| Región | $V_{GS}$ | $V_{DS}$ | $I_{DS}$ | Comportamiento |
|---|---|---|---|---|
| **Corte** | $<V_T$ | cualquiera | $\approx 0$ | Interruptor abierto |
| **Lineal (triodo)** | $>V_T$ | $<V_{GS}-V_T$ | $\beta_n[(V_{GS}-V_T)V_{DS}-V_{DS}^2/2]$ | Resistencia variable |
| **Saturación** | $>V_T$ | $\ge V_{GS}-V_T$ | $\frac{\beta_n}{2}(V_{GS}-V_T)^2$ | Fuente de corriente |

La **frontera lineal/saturación** es la parábola $V_{DS}=V_{GS}-V_T$; sustituida en la ecuación de triodo da $I_{DS}=\frac{\beta_n}{2}V_{DS}^2$, que es el lugar geométrico donde terminan las curvas lineales y empiezan las de saturación en el plano $I_{DS}$–$V_{DS}$.

```
 I_DS                      Curvas de salida (varias VGS)
  ▲                        ········· frontera: I = (β/2)·VDS²
  │                  ┌────────────────  VGS3 (mayor)
  │              ·──┘
  │          ·──┘  ───────────────────  VGS2
  │       ·─┘  ──┘
  │     ·┘ ─┘  ─────────────────────── VGS1 (>VT)
  │   ·┘─┘
  │  ·┘                 ─────────────── VGS < VT (corte, I≈0)
  └──┴───────────────────────────────────▶ V_DS
    LINEAL   │        SATURACIÓN
          (VDS = VGS − VT)
```

### 4.4 Modulación de la longitud del canal y tensión Early

En saturación real la corriente **no es perfectamente plana**: al aumentar $V_{DS}$, el punto de estrangulamiento se desplaza hacia la fuente y la longitud efectiva del canal **disminuye**, lo que hace crecer ligeramente $I_{DS}$:

$$I_{DS}=\frac{\beta_n}{2}(V_{GS}-V_T)^2\,(1+\lambda V_{DS})=\frac{\beta_n}{2}(V_{GS}-V_T)^2\left(1+\frac{V_{DS}}{V_A}\right),\qquad V_A=\frac{1}{\lambda}$$

- En el plano $I_{DS}$–$V_{DS}$, el tramo de saturación es una **recta con pendiente positiva** (pequeña).
- **Interpretación geométrica de la tensión Early:** si se prolonga esa recta hacia atrás, **corta al eje de abscisas ($V_{DS}$) en $V_{DS}=-V_A$**. (Además, las rectas de saturación de *todas* las $V_{GS}$ convergen en ese mismo punto.)
- **Resistencia de salida:** $r_o=\left(\dfrac{\partial I_{DS}}{\partial V_{DS}}\right)^{-1}\approx \dfrac{V_A}{I_{DS}}=\dfrac{1}{\lambda I_{DS}}$. Una $V_A$ grande significa un transistor más "ideal" como fuente de corriente.
- **Cómo se calcula en la práctica (apartado 3.2, paso 5):** ajustar una recta $I_{DS}=a+s\cdot V_{DS}$ al tramo de saturación; el corte con el eje de abscisas es $V_{DS}=-a/s$, y **$V_A=a/s=\lvert -a/s\rvert$** (la tensión Early se da como valor positivo). Entonces $\lambda=1/V_A$.

> **Nota:** el guion dice "la tensión correspondiente a ese punto se conoce como tensión Early". El punto de corte sale **negativo**; lo habitual es dar $V_A$ como su valor absoluto. Indica en tu informe qué convenio usas.

### 4.5 Linealización: ¿por qué $\sqrt{I_{DS}}$ frente a $V_{GS}$?

De la ecuación (1), tomando la raíz cuadrada:

$$\sqrt{I_{DS}}=\sqrt{\frac{\beta_n}{2}}\,(V_{GS}-V_T)\quad\Longrightarrow\quad \sqrt{I_{DS}}=m\,V_{GS}+b$$

con

$$m=\sqrt{\frac{\beta_n}{2}},\qquad b=-m\,V_T$$

Es una **recta** que corta el eje $V_{GS}$ (donde $\sqrt{I_{DS}}=0$) justo en $V_T$. Por tanto, tras el ajuste por mínimos cuadrados:

$$\boxed{\beta_n=2m^2}\qquad\qquad\boxed{V_T=-\frac{b}{m}}$$

**Fórmulas del ajuste lineal por mínimos cuadrados** ($y=\sqrt{I_{DS}}$, $x=V_{GS}$, $N$ puntos):

$$m=\frac{N\sum x_i y_i-\sum x_i\sum y_i}{N\sum x_i^2-\left(\sum x_i\right)^2},\qquad b=\bar y-m\,\bar x$$

- **Solo se ajustan los puntos de saturación** que estén en la parte recta, **excluyendo** la zona de corte (y la zona redondeada cercana a $V_T$).
- Comprueba la calidad con el coeficiente $R^2$ (debe ser ≈ 1).
- Unidades: $m$ en $\sqrt{\text{A}}/\text{V}$, $\beta_n$ en A/V² (típicamente mA/V²).

### 4.6 Transconductancia (útil para interpretar las curvas de transferencia)

$$g_m=\frac{\partial I_{DS}}{\partial V_{GS}}$$

| Región | $g_m$ |
|---|---|
| Saturación | $\beta_n(V_{GS}-V_T)=\sqrt{2\beta_n I_{DS}}=\dfrac{2I_{DS}}{V_{GS}-V_T}$ |
| Lineal | $\beta_n V_{DS}$ (constante a $V_{DS}$ fija) |

Es decir: la curva de transferencia es una **parábola** en saturación (pendiente creciente) y una **recta** en lineal (pendiente $\beta_n V_{DS}$).

### 4.7 El MOSFET "conectado como diodo" (Figura 2)

Si se une **puerta y drenador** ($V_{GD}=0$):

$$V_{DS}=V_{GS}\;\Rightarrow\;V_{DS}-(V_{GS}-V_T)=V_T>0$$

Por tanto, **siempre que el transistor conduce ($V_{GS}>V_T$) está forzado a saturación**. No puede entrar en triodo ni hace falta comprobar la condición. Esto es lo que dice el guion: *"si conduce está forzado a operar en saturación"*. Es además un dispositivo de dos terminales con característica $I=\frac{\beta_n}{2}(V-V_T)^2$ (parecida a un diodo pero cuadrática).

### 4.8 Análisis del circuito de la Figura 2 (punto de operación)

Ley de mallas: $V_i = I_{DS}R + V_{GS}$, con $V_{GS}=V_{DS}$.

- **Corte** ($V_i<V_T$): $I_{DS}=0$ ⇒ no hay caída en $R$ ⇒ $V_{GS}=V_{DS}=V_i$ (la gráfica $V_{GS}$ vs $V_i$ es la bisectriz).
- **Saturación** ($V_i>V_T$): $V_i=V_{GS}+R\,\frac{\beta_n}{2}(V_{GS}-V_T)^2$. Ahora $V_{GS}<V_i$ porque parte de $V_i$ cae en $R$, y $V_{GS}$ crece **más despacio** que $V_i$ (realimentación negativa de la resistencia).
- **Error típico:** usar $V_i$ como $V_{GS}$. **No lo es** una vez que el transistor conduce. Por eso el guion pide medir **$V_{DS}$** (= $V_{GS}$) además de $V_R$.
- Corriente: $I_{DS}=V_R/R$. Con $R=10\,\text{k}\Omega$ y $V_i\le15\,\text{V}$, $I_{DS}<1{,}5\,\text{mA}$ (la resistencia limita la corriente).

### 4.9 Análisis del circuito de la Figura 3 (curva de salida)

- La fuente está a tierra ⇒ $V_{GS}=V_{GG}=3\,\text{V}$ **constante** durante todo el barrido.
- $V_i = V_{DS} + I_{DS}\cdot 1\,\text{k}\Omega$ ⇒ **recta de carga:** $I_{DS}=\dfrac{V_i-V_{DS}}{1\,\text{k}\Omega}$. Al barrer $V_i$ el punto de operación se desplaza a lo largo de la curva de salida a $V_{GS}=3$ V.
- $V_{DS}\neq V_i$: hay que **medir $V_{DS}$** directamente.
- **Frontera:** el transistor pasa de lineal a saturación en $V_{DS}=V_{GS}-V_T=3-V_T$ (con el $V_T$ que obtuviste en el apartado A).
  - $V_{DS}<3-V_T$ → **lineal**; $V_{DS}>3-V_T$ → **saturación**.
- Necesariamente $V_T<3$ V para que el transistor conduzca con $V_{GG}=3$ V.

### 4.10 Análisis del circuito de la Figura 4 (curva de transferencia)

- La tensión de entrada $V_i$ va a la **puerta**; el drenador está **directamente a $V_{DD}$** (fija); la fuente va a tierra **a través de $R_1=10\,\Omega$**.
- $R_1$ es una **resistencia de medida (shunt)**: muy pequeña para perturbar poco el circuito, pero suficiente para convertir $I_{DS}$ en una tensión medible ($I_{DS}=V_{R1}/R_1$).
- Aproximaciones (el guion lo indica en una nota): $V_{GS}=V_i-V_{R1}\approx V_i$ y $V_{DS}=V_{DD}-V_{R1}\approx V_{DD}$, porque $V_{R1}$ es muy pequeña.
- Con $V_{DS}\approx V_{DD}$ **constante**:

| Rango de $V_{GS}$ ($V_{DD}=1{,}5$ V) | Región | Forma de la curva |
|---|---|---|
| $V_{GS}<V_T$ | **Corte** | $I_{DS}\approx0$ |
| $V_T<V_{GS}<V_T+V_{DD}$ | **Saturación** | **Parábola** (pendiente creciente) |
| $V_{GS}>V_T+V_{DD}$ | **Lineal** | Tiende a **recta** de pendiente $\beta_nV_{DD}$ |

- **Frontera saturación/lineal:** $V_{GS}=V_T+V_{DS}=V_T+V_{DD}$. Con $V_{DD}=1{,}5$ V la zona de saturación es corta y, al barrer hasta 7,5 V, **la mayor parte de la curva está en la región lineal**.

### 4.11 Trazador de curvas con osciloscopio en modo XY

- **Modo XY:** el osciloscopio deja de representar tensión frente a tiempo y pasa a representar **CH2 (Y) frente a CH1 (X)**. El tiempo desaparece del dibujo y queda la relación directa entre ambas magnitudes → una **característica I–V**.
- **Conversión corriente → tensión:** el osciloscopio solo mide tensiones, así que se usa $R_1$:
  $$I_{DS}=\frac{V_{CH2}}{R_1}\qquad\text{(ej.: 10 mV / 10 Ω = 1 mA)}$$
  Es decir, el eje Y es $I_{DS}\cdot R_1$: la escala vertical se interpreta dividiendo entre 10 Ω.
- **Por qué $R_1$ entre fuente y tierra:** las masas de las sondas del osciloscopio van **unidas entre sí a tierra**; con $R_1$ en el lado de tierra, tanto $V_{GS}$ (CH1) como $V_{R1}$ (CH2) se pueden medir con la **misma referencia**.
- **Señal de puerta con offset (0–5 V):** el NMOS solo conduce con $V_{GS}>V_T>0$, por lo que la señal debe ser **siempre positiva** para recorrer corte → conducción. Una onda triangular recorre $V_{GS}$ de forma lineal en el tiempo; la senoidal también vale (en XY el tiempo no importa).
- **Frecuencia de 100 Hz:** suficientemente baja para que el transistor se comporte de forma **cuasi-estática** (los efectos capacitivos son despreciables y la curva de subida y bajada coinciden) y suficientemente alta para que la imagen sea estable y sin parpadeo.
- **Acoplo CC (DC):** obligatorio para conservar el **nivel continuo y el offset**; con acoplo AC el condensador de entrada eliminaría la componente continua y la curva aparecería desplazada/deformada.
- **Referencia (0,0):** conviene poner antes el selector en **GND**, y situar el punto en una posición conocida de la pantalla; así se puede leer el valor de $V_T$ (donde la curva despega del eje) y los valores de corriente.
- **Efecto de $V_{DD}$:** como $V_{DS}\approx V_{DD}$, la forma de la curva cambia:

| $V_{DD}$ | Resultado esperado |
|---|---|
| **0,2 V** | $V_{DS}$ muy pequeña ⇒ casi todo es **lineal**: tras $V_T$ la curva es **prácticamente una recta** (pendiente $\approx\beta_n\cdot0{,}2$). La zona de saturación ($V_T<V_{GS}<V_T+0{,}2$) es mínima |
| **1,5 V** | Se distingue la **parábola** de saturación seguida de un tramo casi recto (lineal) a partir de $V_T+1{,}5$ |
| **3 V** | La zona de saturación (parabólica) **se alarga** (hasta $V_T+3$) y las corrientes son **mayores**; la pendiente del tramo lineal $\beta_nV_{DD}$ es mayor |

  Resumen: **al aumentar $V_{DD}$ el punto de transición saturación→lineal se desplaza a la derecha ($V_T+V_{DD}$) y la corriente aumenta.**

---

## 5. Procedimiento experimental, paso a paso y con análisis

### 5.1 Modelo DC de un MOSFET en saturación (Fig. 2)

**Circuito (Figura 2):**

```
                 ┌──────[ R = 10 kΩ ]──────┐
                 │                          │
          Vi  (+)│                          ├──── D (pin 8)
 (fuente     (−)─┤                          ├──── G (pin 6)   ← G unida a D
 regulable)      │                          │
                 └──────────┬───────────────┴──── S (pin 7)
                           GND
```

**Pasos del guion:**

1. Con el NMOS indicado, montar el circuito de la Fig. 2. **Medir y anotar el valor real de la resistencia de 10 kΩ** (tolerancia comercial). Usar la fuente regulable para $V_i$.
2. Como el drenador (pin 8) está **cortocircuitado con la puerta** (pin 6), si conduce ($V_{GS}>V_T$) está **forzado a saturación** ($V_{DS}>V_{GS}-V_T$), y
   $$I_{DS}=\frac{\beta_n}{2}(V_{GS}-V_T)^2\qquad(1)$$
3. **Medir y anotar** la caída de tensión en la resistencia de 10 kΩ y la tensión drenador–fuente, variando $V_i$ **entre 0 V y 15 V con al menos 30 valores** distintos.
4. A partir de la tensión en la resistencia, **determinar $I_{DS}$ en función de $V_i$** (se asume corriente de puerta nula). **Completar una tabla** con $V_i$, $V_{GS}=V_{DS}$ e $I_{DS}$.
5. **Representar $\sqrt{I_{DS}}$ en función de $V_{GS}$** e **identificar en la gráfica las regiones de corte y de saturación**.
6. Para la región de saturación, **deducir $\beta_n$ y $V_T$ por ajuste de mínimos cuadrados** usando la expresión (1).

**Análisis y consejos:**

- $I_{DS}=V_R/R_{\text{medida}}$ (usa el valor **medido** de R, no el nominal).
- Reparte los 30 puntos de forma **no uniforme**: pocos puntos en la zona claramente en corte y **muchos alrededor de $V_T$** (típicamente entre 0 y ~4 V), donde la corriente despega; a $V_i$ altas, la curva varía poco.
- **Cómo identificar las regiones en la gráfica $\sqrt{I_{DS}}$–$V_{GS}$:**
  - *Corte:* tramo con $\sqrt{I_{DS}}\approx0$ ($V_{GS}<V_T$).
  - *Saturación:* tramo recto con pendiente $m=\sqrt{\beta_n/2}$ tras el codo.
  - Cerca de $V_T$ la transición es redondeada (corriente subumbral); no uses esos puntos para el ajuste.
- **Tabla a rellenar:**

| nº | $V_i$ (V) | $V_R$ (V) | $V_{DS}=V_{GS}$ (V) | $I_{DS}=V_R/R$ (mA) | $\sqrt{I_{DS}}$ ($\sqrt{\text{A}}$) |
|---|---|---|---|---|---|
| 1 | 0 | | | | |
| … | … | | | | |
| ≥30 | 15 | | | | |

- **Comprobación de coherencia:** $V_i \approx V_R+V_{DS}$ en todos los puntos.
- **Resultados a reportar:** $\beta_n$ (A/V²), $V_T$ (V), $R^2$ del ajuste.

---

### 5.2 Curva de salida $I_{DS}$–$V_{DS}$ (Fig. 3)

**Circuito (Figura 3):**

```
 VGG (+) ───────────────────────────── G (pin 6)
 Vi  (+) ───[ R = 1 kΩ ]────────────── D (pin 8)
 VGG (−) ─┬─ Vi (−) ─┬─ S (pin 7)
         GND        GND
```
(Fuentes $V_{GG}$ y $V_i$ con sus negativos a tierra; la fuente del NMOS a tierra.)

**Pasos del guion:**

1. Montar el circuito de la Fig. 3. **Medir el valor real de la resistencia de 1 kΩ**.
2. Manteniendo **$V_{GG}=3$ V**, hacer un barrido de $V_i$ **de 0 a 7,5 V con paso máximo de 0,5 V** (≥ 16 puntos).
3. **Anotar $V_{DS}$ e $I_{DS}$** (esta última a través de la caída de tensión en la resistencia de 1 kΩ).
4. **Representar la curva $I_{DS}$–$V_{DS}$ identificando las regiones lineal y de saturación.**
5. **Aproximar el tramo de saturación con una recta.** Estimar el punto donde esa recta **corta al eje de abscisas**; la tensión correspondiente es la **tensión Early**. **Calcular su valor.**

**Análisis y consejos:**

- $I_{DS}=V_{R}/R_{\text{medida}}=(V_i-V_{DS})/R_{\text{medida}}$.
- **Frontera** entre regiones: $V_{DS}=V_{GG}-V_T=3-V_T$ (usa el $V_T$ de 5.1). Márcala en la gráfica.
- **Forma esperada:** en $V_{DS}$ pequeña, $I_{DS}$ crece rápido (lineal, curvándose); luego se "dobla" y sigue **casi horizontal con ligera pendiente positiva** (saturación + efecto Early).
- **Tensión Early:**
  1. Elegir solo puntos con $V_{DS}>3-V_T$ (saturación).
  2. Ajuste de recta $I_{DS}=a+s\,V_{DS}$.
  3. Corte con el eje X: $V_{DS}=-a/s$ ⇒ $V_A=a/s$ ( $\lambda=1/V_A$ ).
- Como la pendiente es muy pequeña, $V_A$ es **sensible a errores de medida** (tendrá una incertidumbre grande). Usa el mayor número de puntos de saturación posible y da una estimación de la incertidumbre.
- Con paso de 0,5 V habrá pocos puntos en la zona lineal; añade puntos más juntos en la zona de $V_i$ baja para definir bien el codo.

---

### 5.3 Curva de transferencia $I_{DS}$–$V_{GS}$ (Fig. 4)

**Circuito (Figura 4):**

```
 VDD (+) ──────────────────────────── D (pin 8)
 Vi  (+) ──────────────────────────── G (pin 6)
                  S (pin 7) ──[ R1 = 10 Ω ]── GND
 (VDD(−) y Vi(−) a GND)
```

**Pasos del guion:**

1. Montar el circuito de la Fig. 4 con **$R_1=10\,\Omega$**.
2. Manteniendo **$V_{DD}=1{,}5$ V**, hacer un barrido de $V_i$ **de 0 a 7,5 V con paso máximo de 0,25 V** (≥ 31 puntos).
3. **Anotar $V_{GS}$ e $I_{DS}$** (a través de la caída de tensión en $R_1$).
4. **Representar la curva $I_{DS}$–$V_{GS}$.** **Interpretar** la curva indicando **en qué regiones está el transistor para distintos valores de $V_{GS}$.**

**Análisis y consejos:**

- $I_{DS}=V_{R1}/R_1$; $V_{GS}=V_i-V_{R1}$ (≈ $V_i$).
- **Interpretación que debe aparecer en el informe:**
  - $V_{GS}<V_T$ → **corte** ($I_{DS}\approx0$).
  - $V_T<V_{GS}<V_T+1{,}5$ V → **saturación** (parábola).
  - $V_{GS}>V_T+1{,}5$ V → **lineal/triodo** (la curva pasa a ser casi recta con pendiente $\beta_nV_{DS}$, $V_{DS}\approx V_{DD}-V_{R1}$).
- Marca en la gráfica $V_T$ y $V_T+V_{DD}$.
- Con una resistencia de 10 Ω la tensión medida es pequeña (1 mA → 10 mV): usa una escala sensible del polímetro y anota con suficientes cifras.
- Puedes contrastar el $V_T$ de este apartado con el de 5.1.

---

### 5.4 (Opcional) Osciloscopio en modo XY como trazador de curvas (Fig. 5)

> **Nota del guion (en rojo):** completar este apartado **solo si se han finalizado los anteriores**. Su realización se valora como **puntuación adicional**.

**Circuito (Figura 5):** el mismo de la Fig. 4 con la fuente $V_i$ sustituida por un **generador de funciones**, con $R_1=10\,\Omega$.

```
 Generador (onda, 0–5 V, 100 Hz) ──┬─────────────── G (pin 6)
                                   └──► CH1 (X)  = V_GS
 VDD (+) ──────────────────────────────────────── D (pin 8)
              S (pin 7) ──┬──[ R1 = 10 Ω ]── GND
                          └──► CH2 (Y) = V_R1 = I_DS·R1
```

**Pasos del guion:**

1. Montar el circuito de la Fig. 4 con $R_1=10\,\Omega$. Tensión de puerta **senoidal o triangular, entre 0 V y 5 V (con offset), frecuencia 100 Hz**. Usar **$V_{DD}=0{,}2$ V**.
2. **CH1 (X)** del osciloscopio → $V_{GS}$ ¹. **CH2 (Y)** → tensión en $R_1$, es decir, $I_{DS}\cdot R_1$. Ej.: 10 mV en CH2 ⇒ $I_{DS}=10\,\text{mV}/10\,\Omega=1\,\text{mA}$.
3. **Comprobar que ambos canales tienen acoplo CC** y poner el osciloscopio en **modo XY**. **Ubicar el punto (0,0)** en una posición de referencia conocida.
4. **Observar** la característica $I_{DS}$–$V_{GS}$. **Interpretar** las curvas indicando en qué regiones está el transistor según $V_{GS}$.
5. **Repetir** el análisis para **$V_{DD}=1{,}5$ V y $V_{DD}=3$ V**. Comprobar cómo evoluciona la característica $I_{DS}$–$V_{GS}$.

¹ *Nota del guion:* en realidad la tensión medida en CH1 no es exactamente $V_{GS}$, porque la fuente del NMOS no está a tierra, pero la caída de tensión en $R_1$ se puede asumir muy pequeña.

**Qué observar / documentar:** ver tabla de §4.11 (efecto de $V_{DD}$). Haz una captura o foto de la pantalla para cada $V_{DD}$, anotando la escala V/div de cada canal para poder convertir a corriente.

---

## 6. Simulación circuital (SPICE, posterior al laboratorio)

**Enunciado del guion:** *simular con SPICE los diferentes circuitos estudiados en el laboratorio y comparar las gráficas I-V simuladas con las obtenidas en el laboratorio.*

**Ejemplos de netlists (ngspice/LTspice, modelo nivel 1).** Ajusta `VTO` con tu $V_T$ medida, `KP`/`W`/`L` para que $KP\cdot W/L=\beta_n$ medida, y `LAMBDA`$=1/V_A$:

```spice
* Modelo NMOS genérico (ajustar a tus medidas)
.model NMOD NMOS (LEVEL=1 VTO=1.5 KP=100u LAMBDA=0.02)

* --- Fig. 2: MOSFET en saturación (G unida a D) ---
Vi  n1 0 0
R   n1 d 10k
M1  d d 0 0 NMOD W=100u L=1u
.dc Vi 0 15 0.1

* --- Fig. 3: curva de salida (VGG = 3 V) ---
* VGG g 0 3 ;  Vi n1 0 0 ;  R n1 d 1k ;  M1 d g 0 0 NMOD W=100u L=1u
* .dc Vi 0 7.5 0.05
* (graficar I(R) frente a V(d))

* --- Fig. 4: curva de transferencia ---
* Vi g 0 0 ;  VDD d 0 1.5 ;  R1 s 0 10 ;  M1 d g s 0 NMOD W=100u L=1u
* .dc Vi 0 7.5 0.05      (graficar I(R1) frente a V(g,s))
```

**Qué comparar:** $V_T$, $\beta_n$ y $V_A$ (simulado vs. medido), forma de las curvas, posición de las fronteras de región. Explica las discrepancias (tolerancia de resistencias, dispersión de parámetros del CI, resolución del polímetro, calentamiento, modelo ideal vs. real).

---

## 7. Tratamiento de datos (código de apoyo)

```python
import numpy as np

# --- A. Saturación (Fig. 2) ---
Vi, VR, VDS = np.loadtxt("saturacion.csv", delimiter=",", skiprows=1, unpack=True)
R   = 9.87e3                      # valor REAL medido de la resistencia de 10 kΩ
IDS = VR / R
VGS = VDS                         # puerta unida a drenador
y   = np.sqrt(IDS)

sat = VGS > 2.5                   # ← ajusta: solo tramo recto, fuera de corte y codo
m, b = np.polyfit(VGS[sat], y[sat], 1)
beta = 2 * m**2                   # A/V²
VT   = -b / m                     # V
R2   = np.corrcoef(VGS[sat], y[sat])[0, 1]**2
print(f"beta_n = {beta*1e3:.3f} mA/V²   VT = {VT:.3f} V   R² = {R2:.4f}")

# --- B. Tensión Early (Fig. 3) ---
VDS3, VR3 = np.loadtxt("salida.csv", delimiter=",", skiprows=1, unpack=True)
I3  = VR3 / 1.0e3                 # usar el valor REAL de la resistencia de 1 kΩ
sat3 = VDS3 > (3 - VT)            # frontera de saturación
s, a = np.polyfit(VDS3[sat3], I3[sat3], 1)   # I = a + s·VDS
VA = a / s                        # corte con el eje X en  -VA
print(f"V_A = {VA:.1f} V   lambda = {1/VA:.4f} 1/V")
```

---

## 8. Errores típicos y consejos

- ❌ Usar el valor **nominal** de las resistencias. ✅ Mide su valor real (10 kΩ y 1 kΩ).
- ❌ Confundir $V_i$ con $V_{GS}$ en la Fig. 2. ✅ $V_{GS}=V_{DS}=V_i-V_R$.
- ❌ Incluir puntos de corte o del codo en el ajuste de $\sqrt{I_{DS}}$. ✅ Ajusta solo el tramo recto.
- ❌ Olvidar que $V_T$ es el **corte con el eje X** de la recta ajustada ($V_T=-b/m$), no el punto donde "se ve" que empieza la corriente.
- ❌ Dar $\beta_n=m^2$. ✅ $\beta_n=2m^2$ (por el ½ del convenio).
- ❌ Ajustar la recta Early con puntos del tramo lineal. ✅ Solo $V_{DS}>V_{GS}-V_T$.
- ❌ Dejar el osciloscopio en acoplo AC en modo XY. ✅ Acoplo CC en ambos canales.
- ❌ Olvidar dividir entre $R_1$ al leer la corriente en el osciloscopio.
- ❌ Superar el barrido indicado o saltarse el paso máximo (0,5 V / 0,25 V) pedido.
- ✅ Etiqueta ejes con **magnitud y unidades**, marca regiones y fronteras, e incluye barras de error si puedes.

---

## 9. Chuleta de fórmulas

| Concepto | Expresión |
|---|---|
| Corte | $V_{GS}<V_T\Rightarrow I_{DS}\approx0$ |
| Lineal | $I_{DS}=\beta_n\left[(V_{GS}-V_T)V_{DS}-\tfrac{V_{DS}^2}{2}\right]$, con $V_{DS}<V_{GS}-V_T$ |
| Lineal ($V_{DS}$ pequeña) | $I_{DS}\approx\beta_n(V_{GS}-V_T)V_{DS}$ ; $R_{on}=\dfrac{1}{\beta_n(V_{GS}-V_T)}$ |
| Saturación (ideal) | $I_{DS}=\tfrac{\beta_n}{2}(V_{GS}-V_T)^2$, con $V_{DS}\ge V_{GS}-V_T$ |
| Saturación (con Early) | $I_{DS}=\tfrac{\beta_n}{2}(V_{GS}-V_T)^2(1+V_{DS}/V_A)$ |
| $\beta_n$ | $\mu_nC_{ox}\,W/L$ |
| Linealización | $\sqrt{I_{DS}}=\sqrt{\beta_n/2}\,(V_{GS}-V_T)$ |
| Resultado del ajuste | $\beta_n=2m^2$ ; $V_T=-b/m$ |
| Early | corte de la recta de saturación en $V_{DS}=-V_A$ ; $\lambda=1/V_A$ ; $r_o\approx V_A/I_{DS}$ |
| Diodo MOS (Fig. 2) | $V_{DS}=V_{GS}$ ⇒ siempre saturación si conduce ; $I_{DS}=V_R/R$ |
| Curva de salida (Fig. 3) | $V_{GS}=V_{GG}$ ; $I_{DS}=(V_i-V_{DS})/R$ |
| Transferencia (Fig. 4) | $I_{DS}=V_{R1}/R_1$ ; $V_{GS}\approx V_i$ ; $V_{DS}\approx V_{DD}$ ; saturación hasta $V_{GS}=V_T+V_{DD}$ |
| Osciloscopio XY | $I_{DS}=V_{CH2}/R_1$ |
| $g_m$ (sat.) | $\beta_n(V_{GS}-V_T)=\sqrt{2\beta_nI_{DS}}$ |
| $g_m$ (lineal) | $\beta_nV_{DS}$ |

---

## 10. Batería de preguntas tipo test (teoría)

Despliega cada una para ver la respuesta.

**1. ¿Cuántos transistores contiene el CMOS 4007 y de qué tipo?**
<details><summary>Respuesta</summary>6 MOSFET: 3 NMOS y 3 PMOS.</details>

**2. ¿A qué patillas corresponden puerta, fuente y drenador del NMOS usado?**
<details><summary>Respuesta</summary>Puerta = 6, fuente = 7, drenador = 8.</details>

**3. ¿Por qué un MOSFET con puerta y drenador unidos siempre está en saturación cuando conduce?**
<details><summary>Respuesta</summary>Porque $V_{DS}=V_{GS}$, luego $V_{DS}-(V_{GS}-V_T)=V_T>0$, cumpliéndose siempre la condición $V_{DS}>V_{GS}-V_T$.</details>

**4. ¿Cuál es la condición de corte en un NMOS?**
<details><summary>Respuesta</summary>$V_{GS}<V_T$ ($I_{DS}\approx0$).</details>

**5. ¿Cuál es la condición de saturación?**
<details><summary>Respuesta</summary>$V_{GS}>V_T$ y $V_{DS}\ge V_{GS}-V_T$.</details>

**6. Escribe la corriente en saturación (convenio del guion).**
<details><summary>Respuesta</summary>$I_{DS}=\dfrac{\beta_n}{2}(V_{GS}-V_T)^2$.</details>

**7. ¿Qué magnitud se representa para linealizar la característica de saturación y qué se obtiene?**
<details><summary>Respuesta</summary>$\sqrt{I_{DS}}$ frente a $V_{GS}$: una recta de pendiente $m=\sqrt{\beta_n/2}$ que corta el eje $V_{GS}$ en $V_T$.</details>

**8. ¿Cómo se obtienen $\beta_n$ y $V_T$ del ajuste $y=mx+b$?**
<details><summary>Respuesta</summary>$\beta_n=2m^2$ y $V_T=-b/m$.</details>

**9. En la Fig. 2, ¿por qué no se puede tomar $V_{GS}=V_i$?**
<details><summary>Respuesta</summary>Porque parte de $V_i$ cae en la resistencia de 10 kΩ: $V_{GS}=V_i-I_{DS}R$. Solo coinciden en corte ($I_{DS}=0$).</details>

**10. ¿Cómo se calcula $I_{DS}$ en la Fig. 2 y qué hipótesis se usa?**
<details><summary>Respuesta</summary>$I_{DS}=V_R/R$ (R medida), suponiendo corriente de puerta nula.</details>

**11. En la Fig. 3 ¿cuánto vale $V_{GS}$ y por qué?**
<details><summary>Respuesta</summary>3 V constantes: la fuente está a tierra y la puerta a $V_{GG}=3$ V.</details>

**12. ¿En qué valor de $V_{DS}$ pasa de lineal a saturación en la Fig. 3?**
<details><summary>Respuesta</summary>$V_{DS}=V_{GS}-V_T=3\,\text{V}-V_T$.</details>

**13. ¿Qué es la tensión Early y cómo se obtiene gráficamente?**
<details><summary>Respuesta</summary>Parámetro de la modulación de la longitud del canal; se prolonga la recta del tramo de saturación hasta cortar el eje de abscisas ($V_{DS}=-V_A$). $\lambda=1/V_A$.</details>

**14. ¿Es la corriente de saturación realmente constante con $V_{DS}$?**
<details><summary>Respuesta</summary>No: crece ligeramente (modulación de la longitud del canal), $I_{DS}\propto(1+V_{DS}/V_A)$. Una $V_A$ grande indica un comportamiento más cercano al ideal.</details>

**15. En la Fig. 4, ¿qué valores toman aproximadamente $V_{GS}$ y $V_{DS}$?**
<details><summary>Respuesta</summary>$V_{GS}\approx V_i$ y $V_{DS}\approx V_{DD}$ (la caída en $R_1=10\,\Omega$ es muy pequeña).</details>

**16. Con $V_{DD}=1{,}5$ V, ¿para qué valores de $V_{GS}$ está el transistor en saturación?**
<details><summary>Respuesta</summary>$V_T<V_{GS}<V_T+1{,}5\,\text{V}$. Por encima, lineal; por debajo de $V_T$, corte.</details>

**17. ¿Por qué se usa una resistencia tan pequeña ($R_1=10\,\Omega$) en la Fig. 4?**
<details><summary>Respuesta</summary>Para actuar como resistencia de medida de corriente sin alterar apreciablemente $V_{GS}$ ni $V_{DS}$.</details>

**18. En modo XY, ¿qué se conecta a CH1 y a CH2, y cómo se obtiene $I_{DS}$?**
<details><summary>Respuesta</summary>CH1 (X) = $V_{GS}$; CH2 (Y) = tensión en $R_1$. $I_{DS}=V_{CH2}/R_1$ (10 mV → 1 mA con 10 Ω).</details>

**19. ¿Por qué acoplo CC y qué señal de puerta se usa en el modo XY?**
<details><summary>Respuesta</summary>El acoplo CC conserva la componente continua (offset); la señal es triangular o senoidal entre 0 y 5 V a 100 Hz, siempre positiva para pasar de corte a conducción.</details>

**20. ¿Qué forma tiene la curva $I_{DS}$–$V_{GS}$ con $V_{DD}=0{,}2$ V?**
<details><summary>Respuesta</summary>Cero hasta $V_T$ y luego prácticamente una recta (región lineal, pendiente ≈ $\beta_n\cdot V_{DS}$), pues $V_{DS}$ es muy pequeña.</details>

**21. Al aumentar $V_{DD}$ de 0,2 a 1,5 y 3 V, ¿qué cambia en la curva de transferencia?**
<details><summary>Respuesta</summary>Aumenta la corriente y la zona parabólica (saturación) se alarga: la transición a lineal se desplaza a $V_{GS}=V_T+V_{DD}$; la pendiente del tramo lineal ($\beta_nV_{DD}$) crece.</details>

**22. ¿De qué depende $\beta_n$ y qué unidades tiene?**
<details><summary>Respuesta</summary>$\beta_n=\mu_nC_{ox}W/L$; unidades A/V² (típicamente mA/V²).</details>

**23. ¿Cómo se comporta el MOSFET en región lineal con $V_{DS}$ pequeña?**
<details><summary>Respuesta</summary>Como una resistencia controlada por $V_{GS}$: $R_{on}=1/[\beta_n(V_{GS}-V_T)]$.</details>

**24. ¿Qué tipo de MOSFET es el usado (acumulación/deplexión) y qué signo tiene $V_T$?**
<details><summary>Respuesta</summary>NMOS de acumulación (enriquecimiento), $V_T>0$: sin tensión de puerta no hay canal.</details>

**25. ¿Cuál es la transconductancia en saturación?**
<details><summary>Respuesta</summary>$g_m=\beta_n(V_{GS}-V_T)=\sqrt{2\beta_nI_{DS}}$.</details>

---

## 11. Checklist de entrega

- [ ] Valores **reales** medidos de las resistencias (10 kΩ, 1 kΩ).
- [ ] **Tabla** Fig. 2: $V_i$, $V_{GS}=V_{DS}$, $I_{DS}$ (**≥ 30 puntos**, $V_i$ de 0 a 15 V).
- [ ] Gráfica $\sqrt{I_{DS}}$–$V_{GS}$ con **corte y saturación identificados** + recta de ajuste.
- [ ] Valores de **$\beta_n$ y $V_T$** (mínimos cuadrados).
- [ ] Tabla y curva **$I_{DS}$–$V_{DS}$** ($V_{GG}=3$ V, $V_i$ 0–7,5 V, paso ≤ 0,5 V) con **regiones lineal y saturación**.
- [ ] Recta de saturación y **tensión Early** calculada.
- [ ] Tabla y curva **$I_{DS}$–$V_{GS}$** ($V_{DD}=1{,}5$ V, $V_i$ 0–7,5 V, paso ≤ 0,25 V) con **interpretación de regiones**.
- [ ] *(Opcional, puntúa extra)* Capturas XY para $V_{DD}=0{,}2$; $1{,}5$; $3$ V e interpretación.
- [ ] **Simulación SPICE** de todos los circuitos y **comparación** con las medidas.
