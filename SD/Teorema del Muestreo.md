# Teorema del muestreo de Nyquist-Shannon

El teorema del muestreo es una de las piezas fundamentales de Señales Digitales porque explica exactamente cuándo podemos convertir una señal continua en una señal discreta sin perder información.

La idea central es muy sencilla:

> Una señal continua limitada en banda puede reconstruirse perfectamente a partir de sus muestras si la frecuencia de muestreo es suficientemente alta: debe ser, como mínimo, el doble de su frecuencia máxima.

Pero esta frase, aunque correcta, esconde bastante teoría. Vamos a construirla desde cero y después veremos por qué aparece el famoso $2f_\mathrm{max}$, qué ocurre en frecuencia, qué es el aliasing, cómo se reconstruye la señal y cuáles son las trampas típicas de examen.

---

## 1. ¿Qué problema intenta resolver el teorema?

En el mundo físico, muchas señales son continuas en el tiempo:

* tensión de un micrófono,
* señal de una antena,
* temperatura,
* señal de un sensor,
* voz,
* señal recibida por una antena,
* señal de un osciloscopio, etc.

Matemáticamente podemos representar una señal continua como:

$$
x(t), \qquad t\in\mathbb{R}
$$

donde $t$ puede tomar cualquier valor real.

Por ejemplo:

$$
x(t)=\cos(2\pi f_0t)
$$

es una señal continua.

Pero un ordenador, DSP, microcontrolador, etc. no puede trabajar directamente con infinitos valores de $x(t)$.

Necesitamos convertir:

$$
x(t)\longrightarrow x[n]
$$

Es decir:

$$
\boxed{\text{señal continua}\rightarrow\text{señal discreta}}
$$

El proceso mediante el cual hacemos esto es el **muestreo**.

---

## 2. ¿Qué significa muestrear?

Muestrear consiste en medir el valor de una señal en determinados instantes.

Supongamos que tenemos:

$$
x(t)
$$

y decidimos tomar una muestra cada $T_s$ segundos.

Entonces obtenemos:

$$
x(0),\quad x(T_s),\quad x(2T_s),\quad x(3T_s),\ldots
$$

Definimos entonces la señal discreta:

$$
\boxed{x[n]=x(nT_s)}
$$

donde:

* $x(t)$ → señal continua.
* $x[n]$ → señal discreta.
* $T_s$ → período de muestreo.
* $n$ → índice entero de la muestra.

La frecuencia de muestreo es:

$$
\boxed{f_s=\frac{1}{T_s}}
$$

y se mide en Hz.

Por ejemplo, si:

$$
f_s=1000\ \mathrm{Hz}
$$

entonces:

$$
T_s=\frac{1}{1000}=1\ \mathrm{ms}
$$

y estamos tomando:

$$
1000
$$

muestras por segundo.

---

## 3. La pregunta fundamental

Ahora viene la cuestión realmente importante:

Supongamos que tenemos una señal continua $x(t)$ y hacemos:

$$
x[n]=x(nT_s)
$$

¿Podemos recuperar exactamente $x(t)$ a partir de $x[n]$?

En principio podrías pensar:

> "Si tomo suficientes muestras, sí."

Pero hay un problema.

No basta con tomar muchas muestras arbitrariamente.

La frecuencia de muestreo tiene que cumplir una condición determinada por el contenido frecuencial de la señal.

Y ahí aparece el teorema de Nyquist-Shannon.

---

## 4. Antes del teorema: mirar la señal en frecuencia

Para entender realmente el teorema hay que pensar en el dominio frecuencial.

Una señal puede tener una representación temporal:

$$
x(t)
$$

y una representación frecuencial:

$$
X(f)
$$

relacionadas mediante la transformada de Fourier:

$$
X(f)=\int_{-\infty}^{\infty}x(t)e^{-j2\pi ft}\,dt
$$

La transformada de Fourier nos dice qué frecuencias contiene la señal.

Por ejemplo:

$$
x(t)=\cos(2\pi100t)
$$

contiene una frecuencia de $100$ Hz.

Su espectro es:

$$
X(f)=\frac{1}{2}\delta(f-100)+\frac{1}{2}\delta(f+100)
$$

Es decir, aparecen dos impulsos:

$$
f=+100\ \mathrm{Hz}
$$

y

$$
f=-100\ \mathrm{Hz}
$$

Esto es importante porque cuando hablamos de "frecuencia máxima" debemos tener claro que el espectro de una señal real normalmente aparece en las frecuencias positivas y negativas.

---

## 5. ¿Qué significa que una señal esté limitada en banda?

Supongamos que una señal tiene espectro:

$$
X(f)
$$

y que existe una frecuencia $B$ tal que:

$$
X(f)=0\qquad \text{para } |f|>B
$$

Entonces decimos que la señal está **limitada en banda**.

Gráficamente:

```text
              X(f)
               │
        █████████████
───────────────┼───────────────→ f
              -B      B
```

Podemos imaginar:

$$
\boxed{X(f)=0\quad\text{si}\quad |f|>B}
$$

donde $B$ es la frecuencia máxima presente en la señal.

Por ejemplo, si:

$$
B=5\ \mathrm{kHz}
$$

entonces la señal no contiene componentes por encima de:

$$
5\ \mathrm{kHz}
$$

---

## 6. El teorema del muestreo

Ahora sí.

### Teorema de Nyquist-Shannon

Si una señal continua $x(t)$ está limitada en banda a una frecuencia máxima $B$, es decir:

$$
X(f)=0\qquad\text{para}\qquad |f|>B
$$

entonces puede reconstruirse exactamente a partir de sus muestras:

$$
x[n]=x(nT_s)
$$

si la frecuencia de muestreo cumple:

$$
\boxed{f_s>2B}
$$

En términos del período de muestreo:

$$
\boxed{T_s<\frac{1}{2B}}
$$

La frecuencia:

$$
\boxed{2B}
$$

se denomina frecuencia de Nyquist asociada a esa señal, mientras que $f_s/2$ suele llamarse frecuencia de Nyquist del muestreo.

Esta distinción terminológica es importante porque a veces se mezclan ambas expresiones.

---

## 7. La condición fundamental

Si la frecuencia máxima de la señal es:

$$
f_\mathrm{max}
$$

entonces:

$$
\boxed{f_s>2f_\mathrm{max}}
$$

Esta es la condición que debes tener grabada.

Por ejemplo, si:

$$
f_\mathrm{max}=10\ \mathrm{kHz}
$$

necesitamos:

$$
f_s>20\ \mathrm{kHz}
$$

Por ejemplo:

$$
f_s=25\ \mathrm{kHz}
$$

funcionaría.

Pero:

$$
f_s=15\ \mathrm{kHz}
$$

no.

---

## 8. ¿Por qué exactamente aparece el 2?

Esta es probablemente la parte más importante de entender.

No quiero que memorices:

$$
f_s>2f_\mathrm{max}
$$

sin saber de dónde sale.

La razón está en lo que ocurre con el espectro cuando muestreamos.

---

## 9. Representación matemática del muestreo

Podemos modelar el muestreo ideal mediante un tren de impulsos.

Definimos:

$$
p(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT_s)
$$

Esto es un tren periódico de deltas.

Visualmente:

```text
       ↑       ↑       ↑       ↑       ↑
       │       │       │       │       │
───────┼───────┼───────┼───────┼───────┼───→ t
       0      Ts      2Ts     3Ts     4Ts
```

Ahora multiplicamos la señal por ese tren:

$$
x_s(t)=x(t)p(t)
$$

Por tanto:

$$
x_s(t)
=
x(t)\sum_{n=-\infty}^{\infty}\delta(t-nT_s)
$$

Utilizando la propiedad:

$$
x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0)
$$

obtenemos:

$$
x_s(t)
=
\sum_{n=-\infty}^{\infty}
x(nT_s)\delta(t-nT_s)
$$

Es decir:

$$
\boxed{
x_s(t)=
\sum_{n=-\infty}^{\infty}
x[n]\delta(t-nT_s)
}
$$

Aquí están nuestras muestras.

---

## 10. ¿Qué sucede en frecuencia?

Esta es la verdadera explicación del teorema.

Tenemos:

$$
x_s(t)=x(t)p(t)
$$

Multiplicar en el tiempo corresponde a convolucionar en frecuencia.

Por tanto:

$$
X_s(f)=X(f)*P(f)
$$

Ahora necesitamos saber cuál es la transformada de Fourier del tren de impulsos.

Resulta que:

$$
p(t)=\sum_{n=-\infty}^{\infty}\delta(t-nT_s)
$$

tiene como transformada:

$$
P(f)=\frac{1}{T_s}
\sum_{k=-\infty}^{\infty}
\delta(f-kf_s)
$$

donde:

$$
f_s=\frac{1}{T_s}
$$

Por tanto:

$$
X_s(f)
=
X(f)*
\frac{1}{T_s}
\sum_{k=-\infty}^{\infty}
\delta(f-kf_s)
$$

Y obtenemos:

$$
\boxed{
X_s(f)=
\frac{1}{T_s}
\sum_{k=-\infty}^{\infty}
X(f-kf_s)
}
$$

Esta ecuación es el corazón matemático del teorema del muestreo.

---

## 11. ¿Qué significa esa ecuación?

Significa que cuando muestreamos una señal, su espectro original:

$$
X(f)
$$

se replica periódicamente cada:

$$
f_s
$$

Hz.

Tenemos:

```text
        copia       copia       original       copia       copia
          ↓           ↓             ↓             ↓           ↓

       X(f+2fs)     X(f+fs)        X(f)       X(f-fs)     X(f-2fs)

──────────┬───────────┬─────────────┬───────────┬───────────→ f
        -2fs        -fs             0          fs         2fs
```

Por tanto, muestrear en el tiempo produce periodicidad en frecuencia.

Esta dualidad es fundamental:

$$
\boxed{
\text{muestreo en tiempo}
\Longleftrightarrow
\text{réplicas periódicas en frecuencia}
}
$$

---

## 12. Ejemplo visual

Supongamos una señal cuyo espectro está limitado a:

$$
|f|\leq 5\ \mathrm{kHz}
$$

Entonces:

```text
              X(f)
               │
               │████████████████
───────────────┴────────────────────→ f
             -5k                 5k
```

Supongamos ahora:

$$
f_s=20\ \mathrm{kHz}
$$

Las réplicas aparecen separadas $20$ kHz:

```text
                    copia central
                         │
      copia              │              copia
        │                │                │
   █████████        █████████        █████████
──────────┬────────────┬────────────┬──────────────→ f
        -20k           0           20k
```

La copia central ocupa:

$$
[-5,5]\ \mathrm{kHz}
$$

La copia de la derecha ocupa:

$$
[15,25]\ \mathrm{kHz}
$$

No se solapan.

Por tanto podemos recuperar perfectamente el espectro original mediante un filtro paso bajo.

---

## 13. ¿Qué pasa si muestreamos demasiado despacio?

Supongamos ahora:

$$
f_s=8\ \mathrm{kHz}
$$

pero:

$$
f_\mathrm{max}=5\ \mathrm{kHz}
$$

La condición exige:

$$
f_s>10\ \mathrm{kHz}
$$

y tenemos:

$$
8<10
$$

Por tanto estamos muestreando demasiado lentamente.

Las réplicas estarán separadas solamente:

$$
8\ \mathrm{kHz}
$$

La copia central ocupa:

$$
[-5,5]\ \mathrm{kHz}
$$

y la siguiente copia empieza en:

$$
8-5=3\ \mathrm{kHz}
$$

Por tanto se produce solapamiento:

```text
                  solapamiento
                       ↓
       copia           █████████
          █████████████████████
──────────────┬───────┬──────────────→ f
             -8       0       8
```

Una vez que las réplicas se solapan, hemos perdido información.

Y aquí aparece el **aliasing**.

---

## 14. Aliasing

El aliasing es uno de los conceptos fundamentales de Señales Digitales.

Podemos definirlo intuitivamente como:

> Fenómeno por el cual diferentes frecuencias continuas producen exactamente las mismas muestras después del muestreo.

Esto significa que después de muestrear no podemos saber cuál era realmente la frecuencia original.

---

## 15. Ejemplo brutalmente sencillo de aliasing

Consideremos:

$$
x(t)=\cos(2\pi f_0t)
$$

y muestreamos a:

$$
f_s
$$

Tenemos:

$$
x[n]=\cos(2\pi f_0nT_s)
$$

Como:

$$
T_s=\frac{1}{f_s}
$$

entonces:

$$
x[n]
=
\cos\left(2\pi\frac{f_0}{f_s}n\right)
$$

Ahora observa algo muy importante.

Consideremos otra frecuencia:

$$
f_1=f_0+f_s
$$

Entonces:

$$
\cos\left(2\pi\frac{f_1}{f_s}n\right)
$$

es:

$$
\cos\left[
2\pi
\left(
\frac{f_0}{f_s}+1
\right)n
\right]
$$

$$
=
\cos\left(
2\pi\frac{f_0}{f_s}n+2\pi n
\right)
$$

Como $n$ es entero:

$$
2\pi n
$$

es un múltiplo entero de $2\pi$.

Por tanto:

$$
\cos(\theta+2\pi n)=\cos(\theta)
$$

y obtenemos:

$$
\boxed{x_1[n]=x_0[n]}
$$

Es decir:

> Una frecuencia $f_0$ y una frecuencia $f_0+f_s$ generan exactamente las mismas muestras.

El sistema digital no puede distinguirlas.

Eso es aliasing.

---

## 16. Ejemplo numérico de aliasing

Supongamos:

$$
f_s=1000\ \mathrm{Hz}
$$

y tenemos:

$$
f_0=100\ \mathrm{Hz}
$$

La señal es:

$$
x(t)=\cos(2\pi100t)
$$

Las muestras son:

$$
x[n]
=
\cos\left(
2\pi\frac{100}{1000}n
\right)
$$

Ahora considera:

$$
f_1=1100\ \mathrm{Hz}
$$

Entonces:

$$
x_1[n]
=
\cos\left(
2\pi\frac{1100}{1000}n
\right)
$$

$$
=
\cos(2\pi1.1n)
$$

Pero:

$$
1.1=0.1+1
$$

por lo que:

$$
x_1[n]
=
\cos(2\pi0.1n+2\pi n)
$$

y por tanto:

$$
\boxed{x_1[n]=x[n]}
$$

Para el sistema digital:

$$
100\ \mathrm{Hz}
$$

y

$$
1100\ \mathrm{Hz}
$$

son indistinguibles.

---

## 17. Un ejemplo todavía más intuitivo

Imagina una rueda de coche grabada por una cámara.

Si la cámara toma suficientes imágenes, ves la rueda girando correctamente.

Pero si la frecuencia de imágenes es demasiado baja, puedes ver que:

* la rueda parece girar lentamente,
* parece detenerse,
* incluso parece girar hacia atrás.

La rueda no está haciendo eso realmente.

Es un alias temporal.

Exactamente el mismo fenómeno aparece en señales eléctricas.

---

## 18. La frecuencia de Nyquist

Si muestreamos a:

$$
f_s
$$

la máxima frecuencia que podemos representar sin aliasing es, idealmente:

$$
\boxed{f_N=\frac{f_s}{2}}
$$

Esta frecuencia se denomina **frecuencia de Nyquist del muestreo**.

Por ejemplo:

$$
f_s=44.1\ \mathrm{kHz}
$$

entonces:

$$
f_N=22.05\ \mathrm{kHz}
$$

Por eso una frecuencia de muestreo de $44.1$ kHz puede representar señales de audio hasta aproximadamente $22.05$ kHz.

---

## 19. Pero cuidado: dos conceptos llamados "Nyquist"

Aquí hay una fuente clásica de confusión.

Podemos hablar de:

### Frecuencia de Nyquist del muestreo

$$
\boxed{f_s/2}
$$

Es la mitad de la frecuencia de muestreo.

### Frecuencia de muestreo de Nyquist

Para una señal limitada a $B$:

$$
\boxed{f_s=2B}
$$

es la frecuencia mínima teórica.

Por contexto normalmente se entiende cuál es cuál, pero en un examen conviene ser preciso.

---

## 20. ¿Por qué el teorema dice $>$ y no $\geq$?

Aquí hay un matiz interesante.

La formulación habitual es:

$$
\boxed{f_s>2B}
$$

¿Por qué no simplemente:

$$
f_s\geq2B?
$$

Porque en el caso límite:

$$
f_s=2B
$$

las réplicas espectrales se tocan exactamente.

Por ejemplo:

$$
B=5\ \mathrm{kHz}
$$

y:

$$
f_s=10\ \mathrm{kHz}
$$

Tenemos:

```text
       réplica       original       réplica
          █████████████████
                         █████████████████
──────────────┬──────────┬──────────────→ f
            -10          0             10
```

En el caso ideal puede existir una reconstrucción bajo condiciones apropiadas, pero cualquier componente exactamente en el borde de banda hace que el sistema de reconstrucción sea un caso límite.

En la práctica se utiliza:

$$
\boxed{f_s>2B}
$$

con margen.

---

## 21. ¿Cómo recuperamos la señal original?

Aquí aparece otra parte fundamental.

Hemos muestreado:

$$
x(t)
$$

y obtenido:

$$
x[n]
$$

¿Cómo volvemos a obtener $x(t)$?

Si:

$$
f_s>2B
$$

las réplicas del espectro no se solapan.

Por tanto podemos colocar un filtro paso bajo ideal que seleccione únicamente la copia central.

Esquemáticamente:

```text
Después del muestreo:

      réplica          original          réplica
        ███            ███████             ███
───────────────┬───────────────┬───────────────→ f
             -fs              0              fs


                    ↓ FILTRO LP


                      ███████
───────────────────────┴──────────────────────→ f
                     original
```

Y así recuperamos $X(f)$.

Después, mediante la transformada inversa de Fourier:

$$
x(t)=\int_{-\infty}^{\infty}X(f)e^{j2\pi ft}\,df
$$

recuperamos la señal continua.

---

## 22. El filtro de reconstrucción

El filtro ideal tiene que dejar pasar la banda:

$$
|f|\leq B
$$

y eliminar las réplicas.

Por ejemplo, si:

$$
B=5\ \mathrm{kHz}
$$

y:

$$
f_s=20\ \mathrm{kHz}
$$

podemos utilizar idealmente:

$$
H(f)=
\begin{cases}
T_s, & |f|\leq B\\
0, & |f|>B
\end{cases}
$$

El factor $T_s$ aparece debido a la escala $1/T_s$ introducida durante el muestreo.

---

## 23. Fórmula de reconstrucción de Shannon

El teorema no solamente dice que la reconstrucción es posible.

También nos proporciona una fórmula explícita.

La señal original puede reconstruirse mediante:

$$
\boxed{
x(t)=
\sum_{n=-\infty}^{\infty}
x[n]\,
\operatorname{sinc}
\left(
\frac{t-nT_s}{T_s}
\right)
}
$$

donde:

$$
\operatorname{sinc}(u)=\frac{\sin(\pi u)}{\pi u}
$$

Esta fórmula es importantísima.

Cada muestra $x[n]$ genera una función sinc desplazada.

---

## 24. ¿Qué está haciendo la sinc?

Para cada muestra:

$$
x[n]
$$

construimos:

$$
x[n]\operatorname{sinc}
\left(
\frac{t-nT_s}{T_s}
\right)
$$

Y sumamos todas:

$$
x(t)=
\sum_n
x[n]\operatorname{sinc}
\left(
\frac{t-nT_s}{T_s}
\right)
$$

La reconstrucción es literalmente una suma de infinitas sincs.

---

## 25. Propiedad maravillosa de la sinc

Observa qué ocurre en los instantes de muestreo.

Para $t=mT_s$:

$$
x(mT_s)
=
\sum_n
x[n]\operatorname{sinc}(m-n)
$$

Como $m-n$ es entero:

$$
\operatorname{sinc}(m-n)=0
\qquad\text{si }m\neq n
$$

y:

$$
\operatorname{sinc}(0)=1
$$

Por tanto únicamente sobrevive:

$$
x[m]
$$

Es decir:

$$
\boxed{x(mT_s)=x[m]}
$$

La reconstrucción pasa exactamente por todas las muestras.

---

## 26. Interpretación geométrica

Imagina que tienes:

```text
x
│          ●
│      ●       ●
│
│   ●             ●
│
│ ●                 ●
└────────────────────── t
```

Esos puntos son las muestras.

La reconstrucción de Shannon coloca una sinc alrededor de cada punto:

```text
             sinc
              /\
             /  \
      ______/    \______
```

y suma todas las sincs.

El resultado es la señal continua original.

---

## 27. ¿Por qué la señal debe estar limitada en banda?

Esto es extremadamente importante.

El teorema no dice:

> "Cualquier señal puede reconstruirse si muestreamos suficientemente rápido."

Dice:

> Una señal limitada en banda puede reconstruirse perfectamente si la frecuencia de muestreo supera el doble de su ancho de banda máximo.

Una señal idealmente ilimitada en banda contiene frecuencias arbitrariamente altas.

Si:

$$
X(f)\neq0
$$

para valores arbitrariamente grandes de $|f|$, entonces no existe una frecuencia de muestreo finita que satisfaga:

$$
f_s>2f_\mathrm{max}
$$

porque no existe un $f_\mathrm{max}$ finito.

---

## 28. ¿Y qué ocurre con las señales reales?

Aquí aparece el papel fundamental del **filtro antialiasing**.

Supongamos que queremos digitalizar audio.

Nuestro ADC funciona a:

$$
f_s=44.1\ \mathrm{kHz}
$$

La frecuencia de Nyquist es:

$$
22.05\ \mathrm{kHz}
$$

Pero una señal analógica real puede contener componentes por encima de $22.05$ kHz.

Si esas componentes llegan al ADC, pueden producir aliasing.

Por tanto colocamos antes del ADC:

$$
\boxed{\text{filtro antialiasing}}
$$

que elimina las componentes que podrían producir aliasing.

---

## 29. Cadena completa de digitalización

Un sistema real típico sería:

```text
Señal analógica
      │
      ▼
┌─────────────────┐
│ Filtro          │
│ antialiasing    │
└─────────────────┘
      │
      ▼
┌─────────────────┐
│ ADC             │
│ muestreo        │
└─────────────────┘
      │
      ▼
   x[n]
      │
      ▼
Procesamiento
digital
      │
      ▼
┌─────────────────┐
│ DAC             │
└─────────────────┘
      │
      ▼
┌─────────────────┐
│ Filtro          │
│ reconstrucción  │
└─────────────────┘
      │
      ▼
Señal analógica
```

En telecomunicaciones esto es absolutamente fundamental.

---

## 30. Diferencia entre muestreo y cuantificación

Otro concepto que suele confundirse.

El **muestreo** discretiza el tiempo.

La **cuantificación** discretiza la amplitud.

Por ejemplo:

### Señal continua

$$
x(t)
$$

Tiempo continuo + amplitud continua.

### Después del muestreo

$$
x[n]=x(nT_s)
$$

Tiempo discreto + amplitud continua.

### Después de cuantificar

$$
x_q[n]
$$

Tiempo discreto + amplitud discreta.

Por tanto:

| Etapa                                 | Tiempo   | Amplitud |
| ------------------------------------- | -------- | -------- |
| $x(t)$                                | Continuo | Continua |
| Después del muestreo $x[n]$           | Discreto | Continua |
| Después de la cuantificación $x_q[n]$ | Discreto | Discreta |

El teorema del muestreo trata principalmente del primer paso.

---

## 31. El teorema visto desde una sinusoide

Vamos a verlo de una manera que te será muy útil en ejercicios.

Tenemos:

$$
x(t)=A\cos(2\pi f_0t+\phi)
$$

Muestreamos:

$$
t=nT_s
$$

Entonces:

$$
x[n]
=
A\cos(2\pi f_0nT_s+\phi)
$$

Como:

$$
T_s=\frac{1}{f_s}
$$

tenemos:

$$
\boxed{
x[n]
=
A\cos
\left(
2\pi\frac{f_0}{f_s}n+\phi
\right)
}
$$

Por tanto, la frecuencia analógica $f_0$ se transforma en una frecuencia digital normalizada:

$$
\boxed{\frac{f_0}{f_s}}
$$

ciclos/muestra.

O, en frecuencia angular digital:

$$
\boxed{
\omega_0=2\pi\frac{f_0}{f_s}
}
$$

rad/muestra.

---

## 32. Las frecuencias digitales son periódicas

Aquí aparece una diferencia importantísima respecto al mundo continuo.

En tiempo continuo:

$$
f
$$

puede ser cualquier número real.

Pero después del muestreo:

$$
e^{j2\pi(f/f_s)n}
$$

cumple:

$$
e^{j2\pi(f/f_s)n}
=
e^{j2\pi(f/f_s+k)n}
$$

para cualquier entero $k$.

Por tanto:

$$
\boxed{f\equiv f+kf_s}
$$

desde el punto de vista de las muestras.

Esta periodicidad es exactamente la razón matemática del aliasing.

---

## 33. Frecuencia digital equivalente

Una frecuencia analógica $f_0$ puede mapearse al intervalo:

$$
-\frac{f_s}{2}\leq f<\frac{f_s}{2}
$$

Este intervalo se denomina a menudo **intervalo principal de Nyquist**.

Si una frecuencia cae fuera de él, podemos desplazarla mediante múltiplos de $f_s$.

Por ejemplo:

$$
f_s=1000\ \mathrm{Hz}
$$

y:

$$
f=700\ \mathrm{Hz}
$$

Podemos restar $1000$:

$$
700-1000=-300\ \mathrm{Hz}
$$

Por tanto el alias aparece a:

$$
\boxed{-300\ \mathrm{Hz}}
$$

Para una señal cosenoidal, las frecuencias $+300$ y $-300$ son equivalentes en el sentido de que producen la misma señal real.

Así que normalmente decimos que:

$$
700\ \mathrm{Hz}
$$

aliasa a:

$$
\boxed{300\ \mathrm{Hz}}
$$

---

## 34. Fórmula práctica del alias

Una forma de calcular el alias es buscar un entero $k$ tal que:

$$
f_\mathrm{alias}=|f-kf_s|
$$

quede dentro de:

$$
0\leq f_\mathrm{alias}\leq\frac{f_s}{2}
$$

Por ejemplo:

$$
f_s=1000
$$

$$
f=1300
$$

Elegimos:

$$
k=1
$$

Entonces:

$$
f_\mathrm{alias}
=
|1300-1000|
=
300\ \mathrm{Hz}
$$

Por tanto:

$$
\boxed{1300\ \mathrm{Hz}\rightarrow300\ \mathrm{Hz}}
$$

---

## 35. Ejemplo más interesante

Supongamos:

$$
f_s=10\ \mathrm{kHz}
$$

y tenemos una señal de:

$$
f=7\ \mathrm{kHz}
$$

La frecuencia de Nyquist es:

$$
f_N=5\ \mathrm{kHz}
$$

Como:

$$
7>5
$$

hay aliasing.

Restamos $f_s$:

$$
7-10=-3\ \mathrm{kHz}
$$

En magnitud:

$$
\boxed{f_\mathrm{alias}=3\ \mathrm{kHz}}
$$

Así que el ADC interpreta una señal de $7$ kHz como una señal de $3$ kHz.

---

## 36. Ejemplo con 13 kHz

Supongamos:

$$
f_s=10\ \mathrm{kHz}
$$

y:

$$
f=13\ \mathrm{kHz}
$$

Tenemos:

$$
13-10=3
$$

Por tanto:

$$
\boxed{13\ \mathrm{kHz}\rightarrow3\ \mathrm{kHz}}
$$

Aunque también podemos verlo:

$$
13-20=-7
$$

y posteriormente:

$$
|-7|=7
$$

pero $7$ todavía está fuera de Nyquist, así que continuamos hasta obtener la representación equivalente dentro de:

$$
[0,5]\ \mathrm{kHz}
$$

que es:

$$
3\ \mathrm{kHz}
$$

---

## 37. El caso límite: una señal a $f_s/2$

Supongamos:

$$
x(t)=\cos(2\pi f_Nt)
$$

donde:

$$
f_N=\frac{f_s}{2}
$$

Entonces:

$$
x[n]
=
\cos
\left(
2\pi
\frac{f_s/2}{f_s}n
\right)
$$

$$
=
\cos(\pi n)
$$

y como:

$$
\cos(\pi n)=(-1)^n
$$

obtenemos:

$$
\boxed{x[n]=(-1)^n}
$$

Es decir:

```text
n:    0   1   2   3   4   5
x[n]: +1  -1  +1  -1  +1  -1
```

Estamos justo en el límite de Nyquist.

---

## 38. ¿Qué ocurre con una frecuencia superior a Nyquist?

Supongamos:

$$
f_s=10\ \mathrm{kHz}
$$

y:

$$
f=6\ \mathrm{kHz}
$$

Como:

$$
f_N=5\ \mathrm{kHz}
$$

tenemos aliasing.

Calculamos:

$$
6-10=-4
$$

por tanto:

$$
\boxed{6\ \mathrm{kHz}\rightarrow4\ \mathrm{kHz}}
$$

Observa algo interesante:

$$
5.5\ \mathrm{kHz}\rightarrow4.5\ \mathrm{kHz}
$$

$$
6\ \mathrm{kHz}\rightarrow4\ \mathrm{kHz}
$$

$$
7\ \mathrm{kHz}\rightarrow3\ \mathrm{kHz}
$$

$$
8\ \mathrm{kHz}\rightarrow2\ \mathrm{kHz}
$$

$$
9\ \mathrm{kHz}\rightarrow1\ \mathrm{kHz}
$$

La frecuencia "rebota" alrededor de:

$$
\frac{f_s}{2}
$$

Esto produce la forma de dientes de sierra que suele aparecer en diagramas de aliasing.

---

## 39. Un punto extremadamente importante: aliasing NO se puede arreglar digitalmente

Supongamos que una señal contiene:

$$
f=7\ \mathrm{kHz}
$$

y:

$$
f_s=10\ \mathrm{kHz}
$$

Después del muestreo aparece como:

$$
3\ \mathrm{kHz}
$$

Una vez que tenemos:

$$
x[n]
$$

no podemos mirar las muestras y decir:

> "Ah, realmente era 7 kHz."

Porque una señal de 3 kHz y una señal de 7 kHz producen exactamente las mismas muestras.

La información se ha perdido.

Por eso:

$$
\boxed{
\text{El antialiasing debe hacerse antes del ADC}
}
$$

No después.

---

## 40. Aliasing y filtro antialiasing

Supongamos que queremos digitalizar una señal hasta:

$$
B=20\ \mathrm{kHz}
$$

Podemos elegir:

$$
f_s=48\ \mathrm{kHz}
$$

La frecuencia de Nyquist es:

$$
24\ \mathrm{kHz}
$$

Tenemos una zona entre:

$$
20\ \mathrm{kHz}
$$

y:

$$
24\ \mathrm{kHz}
$$

donde el filtro antialiasing debe pasar de aproximadamente:

$$
1
$$

a:

$$
0
$$

Esta zona se denomina **banda de transición**.

Por eso en sistemas reales no solemos diseñar simplemente:

$$
f_s=2B
$$

porque no existe un filtro analógico ideal con transición instantánea.

---

## 41. ¿Por qué se utilizan frecuencias de muestreo mucho mayores?

Porque los filtros reales no son ideales.

Supongamos que queremos conservar:

$$
0-20\ \mathrm{kHz}
$$

Si utilizamos:

$$
f_s=40\ \mathrm{kHz}
$$

tenemos:

$$
f_N=20\ \mathrm{kHz}
$$

No queda prácticamente ninguna banda de transición.

Sería necesario un filtro casi perfecto.

En cambio, si utilizamos:

$$
f_s=48\ \mathrm{kHz}
$$

tenemos:

$$
f_N=24\ \mathrm{kHz}
$$

y aparecen $4$ kHz de margen.

---

## 42. Aplicación en audio

El oído humano joven puede percibir aproximadamente hasta:

$$
20\ \mathrm{kHz}
$$

Por eso históricamente se eligió:

$$
f_s=44.1\ \mathrm{kHz}
$$

porque:

$$
\frac{44.1}{2}=22.05\ \mathrm{kHz}
$$

Esto deja una banda de transición entre aproximadamente:

$$
20\ \mathrm{kHz}
$$

y:

$$
22.05\ \mathrm{kHz}
$$

para el filtro.

Otros sistemas utilizan:

$$
48\ \mathrm{kHz}
$$

por razones relacionadas con vídeo, telecomunicaciones y diseño de filtros.

---

## 43. ¿Y por qué 96 kHz?

Con:

$$
f_s=96\ \mathrm{kHz}
$$

tenemos:

$$
f_N=48\ \mathrm{kHz}
$$

Por tanto hay mucho más margen para el filtro antialiasing.

No significa necesariamente que una persona vaya a escuchar directamente frecuencias de $48$ kHz.

El beneficio principal está, entre otras cosas, en disponer de una banda de transición más cómoda para los filtros.

---

## 44. Muestreo de señales paso banda

Aquí aparece una extensión importante del teorema.

Hasta ahora hemos supuesto que la señal ocupa:

$$
0\leq f\leq B
$$

pero una señal puede estar situada en una banda alrededor de una frecuencia elevada.

Por ejemplo:

$$
f\in[90,110]\ \mathrm{MHz}
$$

Su ancho de banda es:

$$
B=20\ \mathrm{MHz}
$$

En ciertos sistemas es posible muestrear una señal de este tipo con una frecuencia menor que:

$$
2(110\ \mathrm{MHz})
$$

si se cumplen cuidadosamente las condiciones de muestreo paso banda y las réplicas espectrales no se solapan.

Esto se utiliza en telecomunicaciones y receptores SDR.

Es una de las razones por las que el teorema de Nyquist-Shannon es más profundo que la simple regla:

> "Hay que muestrear al doble de la frecuencia más alta."

Esa regla es correcta para el caso habitual de señales banda base, pero no es toda la historia.

---

## 45. Ancho de banda frente a frecuencia máxima

Esto es muy importante en Telecomunicaciones.

No siempre:

$$
B=f_\mathrm{max}
$$

Por ejemplo, imagina una señal modulada alrededor de:

$$
f_c=100\ \mathrm{MHz}
$$

con ancho de banda:

$$
B=10\ \mathrm{MHz}
$$

Su espectro podría ocupar:

$$
95-105\ \mathrm{MHz}
$$

La frecuencia máxima es:

$$
105\ \mathrm{MHz}
$$

pero el ancho de banda es:

$$
10\ \mathrm{MHz}
$$

Son conceptos diferentes.

Para una señal banda base que ocupa desde DC hasta $B$, sí tenemos:

$$
f_\mathrm{max}=B
$$

pero para una señal paso banda no necesariamente.

---

## 46. Relación con el ancho de banda de un canal

Supongamos un canal de telecomunicaciones con:

$$
B=4\ \mathrm{kHz}
$$

Si vamos a digitalizar una señal banda base limitada a esa banda, necesitamos como mínimo:

$$
f_s>8\ \mathrm{kHz}
$$

Por ejemplo:

$$
f_s=16\ \mathrm{kHz}
$$

sería suficiente desde el punto de vista del teorema ideal.

Esto conecta directamente el mundo analógico y digital.

---

## 47. El teorema desde el dominio temporal

Hasta ahora lo hemos explicado principalmente mediante Fourier.

También podemos entenderlo desde la frecuencia de una sinusoide.

Supongamos:

$$
x(t)=\cos(2\pi f_0t)
$$

y tomamos muestras cada:

$$
T_s
$$

Si durante un período de la señal tenemos muy pocas muestras, no podemos distinguir correctamente la evolución de la sinusoide.

Si:

$$
f_s\gg f_0
$$

tenemos muchas muestras por ciclo.

Pero el teorema nos dice algo más profundo:

No necesitamos "muchísimas" muestras.

Necesitamos, en condiciones ideales, más de:

$$
\boxed{2}
$$

muestras por ciclo de la frecuencia máxima.

---

## 48. ¿Significa "dos muestras por ciclo"?

En cierto sentido sí, pero hay que tener cuidado.

Para una sinusoide de frecuencia:

$$
f_0
$$

la condición:

$$
f_s>2f_0
$$

significa que tenemos más de dos muestras por período:

$$
T_0=\frac{1}{f_0}
$$

y:

$$
T_s<\frac{T_0}{2}
$$

Por tanto:

$$
\frac{T_0}{T_s}>2
$$

es decir:

$$
\boxed{\text{más de dos muestras por ciclo}}
$$

Pero no debes interpretar el teorema como que cualquier señal se puede reconstruir dibujando una curva que pase por dos puntos por ciclo.

La reconstrucción depende de toda la estructura espectral de la señal y matemáticamente se realiza mediante interpolación sinc ideal.

---

## 49. Error conceptual típico

Un estudiante podría pensar:

> "Si tengo dos puntos por ciclo, puedo dibujar la sinusoide."

No necesariamente.

Por ejemplo, si muestreamos exactamente a:

$$
f_s=2f_0
$$

y la fase es determinada, podemos obtener muestras:

$$
+1,-1,+1,-1,\ldots
$$

pero también existen otras situaciones problemáticas.

El teorema es una afirmación sobre información espectral y reconstrucción, no una regla geométrica para dibujar curvas.

---

## 50. Otra forma de entender el teorema: evitar que las réplicas se toquen

Esta es probablemente la mejor interpretación para tu asignatura.

Supongamos que:

$$
X(f)
$$

ocupa:

$$
[-B,B]
$$

Después del muestreo tenemos réplicas:

$$
X(f-kf_s)
$$

La réplica central termina en:

$$
+B
$$

La siguiente comienza en:

$$
f_s-B
$$

Para que no haya solapamiento necesitamos:

$$
B<f_s-B
$$

Sumamos $B$:

$$
2B<f_s
$$

Por tanto:

$$
\boxed{f_s>2B}
$$

¡Y de aquí sale el teorema!

Esta derivación deberías saber hacerla.

---

## 51. Derivación gráfica completa

Tenemos:

### Original

```text
                 X(f)
                  █
               ███████
             ███████████
───────────────┬───────────────
              -B      B
```

### Tras muestrear

```text
         réplica          original          réplica

            ███           ███████           ███
         ███████       ███████████       ███████
───────┬───────────┬───────────────┬───────────────→ f
     -fs           0               fs
```

La copia central ocupa:

$$
[-B,B]
$$

La copia derecha ocupa:

$$
[f_s-B,f_s+B]
$$

Para que no se toquen:

$$
B<f_s-B
$$

y entonces:

$$
\boxed{f_s>2B}
$$

---

## 52. ¿Qué ocurre cuando no se cumple?

Si:

$$
f_s<2B
$$

entonces:

$$
f_s-B<B
$$

por lo que:

$$
[f_s-B,f_s+B]
$$

invade:

$$
[-B,B]
$$

Tenemos:

$$
\boxed{\text{solapamiento espectral}}
$$

y:

$$
\boxed{\text{aliasing}}
$$

Una vez producido el solapamiento, no existe un filtro que pueda separar las dos contribuciones porque ocupan las mismas frecuencias.

---

## 53. Esto explica por qué un filtro no puede solucionar el aliasing después

Imagina:

```text
Antes:

       señal original
           █████
────────────────────────

       réplica
                 █████
```

Después de muestrear demasiado lento:

```text
             ███████████
             ███████████
             ███████████
             └─solapadas─┘
```

Una vez mezcladas:

$$
X(f)+X(f-f_s)
$$

no podemos saber cuánto pertenecía a cada señal.

La información original ha quedado mezclada irreversiblemente.

---

## 54. El filtro antialiasing evita el problema

Antes del muestreo hacemos:

$$
x(t)\rightarrow H_\mathrm{AA}(f)\rightarrow\text{ADC}
$$

donde:

$$
H_\mathrm{AA}(f)\approx0
$$

para:

$$
|f|>\frac{f_s}{2}
$$

Así garantizamos que la señal que entra al ADC está suficientemente limitada en banda.

---

## 55. Una cuestión práctica: ¿qué significa "frecuencia máxima"?

No necesariamente significa que tengas que mirar una fórmula y encontrar el número mayor que aparezca.

Debes mirar el espectro de la señal.

Por ejemplo:

$$
X(f)=0\qquad |f|>10\ \mathrm{kHz}
$$

Entonces:

$$
f_\mathrm{max}=10\ \mathrm{kHz}
$$

y:

$$
f_s>20\ \mathrm{kHz}
$$

Pero si:

$$
X(f)
$$

tiene pequeñas componentes de ruido hasta $1$ MHz
