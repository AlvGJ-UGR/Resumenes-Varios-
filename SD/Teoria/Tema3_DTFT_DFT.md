# Transformada de Fourier de señal discreta (DTFT) y Transformada Discreta de Fourier (DFT)

> **Señales Digitales · Tema 3** — Resumen esquemático con teoría, demostraciones, propiedades y ejercicios resueltos.
>
> Fórmulas en LaTeX (GitHub las renderiza). Los apartados marcados con 📝 son ampliaciones o matices que no aparecen literalmente en las diapositivas.

## Índice

1. [Mapa del tema](#1-mapa-del-tema)
2. [Repaso: transformada de Fourier analógica](#2-repaso-transformada-de-fourier-analógica)
3. [DTFT: Fourier sobre una señal discreta](#3-dtft-fourier-sobre-una-señal-discreta)
4. [Relación entre TF y DTFT (Ejercicio T3.1)](#4-relación-entre-tf-y-dtft-ejercicio-t31)
5. [DTFT inversa](#5-dtft-inversa)
6. [Energía: relación de Parseval](#6-energía-relación-de-parseval)
7. [Propiedades de la DTFT](#7-propiedades-de-la-dtft)
8. [Relación entre la transformada Z y la DTFT](#8-relación-entre-la-transformada-z-y-la-dtft)
9. [Ejercicios T3.3 y T3.4 (muestreo y sistemas)](#9-ejercicios-t33-y-t34-muestreo-y-sistemas)
10. [DFT: Transformada Discreta de Fourier](#10-dft-transformada-discreta-de-fourier)
11. [¿Por qué la DFT no es exactamente la TF? (historia paso a paso)](#11-por-qué-la-dft-no-es-exactamente-la-tf-historia-paso-a-paso)
12. [Propiedades de la DFT](#12-propiedades-de-la-dft)
13. [Notas finales: zero padding y convolución](#13-notas-finales-zero-padding-y-convolución)
14. [Ejercicios T3.5, T3.6 y examen Sep 2017](#14-ejercicios-t35-t36-y-examen-sep-2017)

---

## 1. Mapa del tema

| Transformada | Tiempo | Frecuencia | Variable de frecuencia |
|---|---|---|---|
| **TF** (analógica) | Continuo, aperiódico | Continua, aperiódica | $F$ (Hz) o $\Omega$ (rad/s) |
| **DTFT** | Discreto, aperiódico | **Continua y periódica** (periodo $2\pi$) | $\omega$ (rad/muestra, **normalizada**) |
| **DFT** | Discreto, **finito / periódico** ($N$) | **Discreta y periódica** ($N$) | $k=0,\dots,N-1$ |

Conceptos clave que se usan en todo el tema:

- **Frecuencia normalizada:** $\omega=\Omega T=\Omega/F_s$ y $f=FT=F/F_s$ (con $\omega=2\pi f$).
- **Muestreo en un dominio ⇒ periodicidad en el otro.**
- **Multiplicación en un dominio ⇔ convolución en el otro.**

---

## 2. Repaso: transformada de Fourier analógica

| | En $F$ (Hz) | En $\Omega$ (rad/s) |
|---|---|---|
| **Ecuación de análisis** | $X(F)=\displaystyle\int_{-\infty}^{+\infty}x(t)\,e^{-j2\pi Ft}\,dt$ | $X(\Omega)=\displaystyle\int_{-\infty}^{+\infty}x(t)\,e^{-j\Omega t}\,dt$ |
| **Ecuación de síntesis** | $x(t)=\displaystyle\int_{-\infty}^{+\infty}X(F)\,e^{j2\pi Ft}\,dF$ | $x(t)=\dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{+\infty}X(\Omega)\,e^{j\Omega t}\,d\Omega$ |

---

## 3. DTFT: Fourier sobre una señal discreta

### 3.1 Definición

¿Qué ocurre si aplicamos la TF sobre una señal **discreta** (muestreada)?

$$x(n)\equiv x_d(t)=x_a(t)\Big|_{t=nT}=x_a(t)\cdot p(t)=x_a(t)\sum_{n=-\infty}^{+\infty}\delta(t-nT)$$

Es decir, $x_d(t)=\sum_n x(n)\,\delta(t-nT)$. Aplicando la TF y usando $\Omega=\omega/T$:

$$X(\omega)=X_d(\Omega)\Big|_{\Omega=\omega/T}=\int_{-\infty}^{+\infty}x_d(t)\,e^{-j\Omega t}\,dt=\sum_{n=-\infty}^{+\infty}x(n)\,e^{-j\omega n}$$

$$\boxed{X(\omega)=\sum_{n=-\infty}^{+\infty}x(n)\,e^{-j\omega n}}$$

> 📝 Paso intermedio: $\int\delta(t-nT)e^{-j\Omega t}dt=e^{-j\Omega nT}$, y $\Omega nT=\omega n$.

### 3.2 Dos diferencias respecto a la TF analógica

| | DTFT $X(\omega)=\sum x(n)e^{-j\omega n}$ | TF $X(\Omega)=\int x_d(t)e^{-j\Omega t}dt$ |
|---|---|---|
| **Menos importante** | En vez de una integral tenemos una **sumatoria** (si la señal discreta es finita, calcular su TF es trivial) | Integral |
| **Más importante** | La TF se refiere a **frecuencias normalizadas** $\omega$ | Frecuencias analógicas $\Omega$ |

### 3.3 Implicaciones de cambiar $\Omega$ por $\omega$

1. **Hace falta $F_s$ para recuperar la frecuencia física.** La DTFT da el espectro por frecuencia normalizada; para saber a qué frecuencia física corresponde necesitamos la frecuencia de muestreo:
   $$\omega=\Omega T=\Omega/F_s\qquad\left(f=FT=F/F_s\right)$$
2. **El espectro es periódico** (periodo $2\pi$, es decir, $1$ en $f$):
   $$X(\omega+2\pi k)=\sum_{n}x(n)\,e^{-j(\omega+2\pi k)n}=\sum_{n}x(n)\,e^{-j\omega n}\underbrace{e^{-j2\pi kn}}_{=1}=X(\omega)$$

**Visualización (esto ya lo sabíamos, es el aliasing):** el eje $\omega$ se divide en periodos de longitud $2\pi$:

| $\omega$ | $-2\pi$ | $0$ | $2\pi$ | $4\pi$ | $6\pi$ |
|---|:-:|:-:|:-:|:-:|:-:|
| $f$ | $-1$ | $0$ | $1$ | $2$ | $3$ |

Cualquier frecuencia fuera del **periodo principal** equivale a una del periodo principal. Ejemplo: las sinusoides discretas con $f=1/14$ y $f=15/14$ producen **exactamente las mismas muestras** (difieren en un entero: $15/14=1/14+1$).

---

## 4. Relación entre TF y DTFT (Ejercicio T3.1)

### 4.1 En el espectro

Muestrear equivale a multiplicar por un tren de impulsos $p(t)$, luego en frecuencia se **convoluciona** con el espectro del tren:

$$X_d(\Omega)=\frac{1}{2\pi}X_a(\Omega)*P(\Omega)=\frac{1}{2\pi}\left(X_a(\Omega)*\frac{2\pi}{T}\sum_{k=-\infty}^{+\infty}\delta(\Omega-k\Omega_s)\right)$$

$$\boxed{X_d(\Omega)=\frac{1}{T}\sum_{k=-\infty}^{+\infty}X_a(\Omega-k\Omega_s)}\qquad\Longrightarrow\qquad X(\omega)=\frac{1}{T}\sum_{k=-\infty}^{+\infty}X_a\!\left(\frac{\omega}{T}-\frac{2\pi}{T}k\right)$$

(equivalentemente, $X(\omega)=\frac{1}{T}\sum_k X(\Omega+k\Omega_s)$, ya que la suma recorre todos los $k$). Es decir: **réplicas del espectro analógico, escaladas por $1/T$ y repetidas cada $\Omega_s$** (cada $2\pi$ en $\omega$).

> 📝 El espectro del tren de impulsos sale de su serie de Fourier: $p(t)=\frac{1}{T}\sum_k e^{jk\Omega_s t}\;\Rightarrow\;P(\Omega)=\frac{2\pi}{T}\sum_k\delta(\Omega-k\Omega_s)$.

### 4.2 Visualización

$$\Omega=\omega\cdot F_s=\omega\cdot\frac{\Omega_s}{2\pi}$$

El eje $\omega\in[-\pi,\pi]$ se corresponde con $\Omega\in[-\Omega_s/2,\Omega_s/2]$ (periodo principal). Puntos de ejemplo del esquema:

| $\omega$ | $-\pi$ | $-\pi/2$ | $\pi/4$ | $\pi$ | $\pi+\pi/2$ |
|---|:-:|:-:|:-:|:-:|:-:|
| $\Omega$ | $-\Omega_s/2$ | $-\Omega_s/4$ | $\Omega_s/8$ | $\Omega_s/2$ | $\Omega_s/2+\Omega_s/4$ |

(el último punto cae fuera del periodo principal y es una réplica de uno de dentro).

### 4.3 Respetando el teorema del muestreo

**Respetando el teorema del muestreo, en el periodo principal**, el espectro de la señal discreta es idéntico al de la analógica salvo un factor de escala ($F_s$):

$$\boxed{X(\omega)=\frac{1}{T}X_a\!\left(\frac{\omega}{T}\right)=F_s\cdot X_a(\omega F_s)}\qquad(\lvert\omega\rvert\le\pi)$$

> 📝 Si no se cumple Nyquist (la señal no está limitada a $\lvert\Omega\rvert<\Omega_s/2$), las réplicas se solapan (**aliasing**) y esta relación deja de ser válida.

---

## 5. DTFT inversa

### 5.1 Demostración (Ejercicio T3.1)

Se parte de la TF inversa evaluada en los instantes de muestreo:

$$x(n)\equiv x_d(t)=x_a(t)\Big|_{t=nT}=\frac{1}{2\pi}\int_{-\infty}^{+\infty}X_a(\Omega)\,e^{j\Omega nT}\,d\Omega$$

**1) Plegado del eje.** Como $e^{j\Omega nT}$ es periódica en $\Omega$ con periodo $\Omega_s$ ($\Omega_sT=2\pi$), se trocea la integral en periodos de longitud $\Omega_s$ y se suman las réplicas:

$$x(n)=\frac{1}{2\pi}\int_{-\Omega_s/2}^{\Omega_s/2}\sum_{k=-\infty}^{+\infty}X_a(\Omega-k\Omega_s)\,e^{j\Omega nT}\,d\Omega$$

**2) Cambio de variable** $\Omega\to\omega$, con $\Omega=\omega/T$ y $T\Omega_s=\omega_s=2\pi$:

$$x(n)=\frac{1}{2\pi}\int_{-T\Omega_s/2}^{T\Omega_s/2}\frac{1}{T}\sum_{k}X_a\!\left(\frac{\omega}{T}-k\frac{\omega_s}{T}\right)e^{j\omega n}\,d\omega$$

**3) Identificación.** La suma con el factor $\frac{1}{T}$ es justo $X_d(\Omega)\big|_{\Omega=\omega/T}=X(\omega)$ (apartado 4.1), y los límites son $\pm\pi$:

$$\boxed{x(n)=\frac{1}{2\pi}\int_{-\pi}^{\pi}X(\omega)\,e^{j\omega n}\,d\omega}$$

Con lo que se cumple $\mathcal{F}^{-1}\left[\mathcal{F}[x(n)]\right]=x(n)$.

### 5.2 Diferencias respecto a la TF inversa analógica

| | DTFT$^{-1}$ | TF$^{-1}$ |
|---|---|---|
| Fórmula | $x(n)=\dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi}X(\omega)e^{j\omega n}d\omega$ | $x(t)=\dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{+\infty}X(\Omega)e^{j\Omega t}d\Omega$ |
| Variable | No aparece $\Omega$, sino $\omega$ | $\Omega$ |
| Límites | Solo se integra **en un periodo** $[-\pi,\pi]$ | Todo el eje |

---

## 6. Energía: relación de Parseval

$$E(x(n))=\sum_{n=-\infty}^{+\infty}\lvert x(n)\rvert^{2}=\frac{1}{2\pi}\int_{2\pi}\lvert X(\omega)\rvert^{2}\,d\omega$$

**Interpretación:** la energía total de la señal $x(n)$ es igual a la energía total de su TF en el periodo principal.

### Ejercicio T3.2 — Relación entre la energía de $x(t)$ y la de $x(n)$

Se supone señal limitada en banda y muestreada respetando Nyquist. La energía analógica es $E_a=\int\lvert x_a(t)\rvert^2dt=\frac{1}{2\pi}\int\lvert X_a(\Omega)\rvert^2d\Omega$. Con $X(\omega)=\frac{1}{T}X_a(\omega/T)$ en $[-\pi,\pi]$ y $\Omega=\omega/T$:

$$E_d=\frac{1}{2\pi}\int_{-\pi}^{\pi}\frac{1}{T^{2}}\left\lvert X_a\!\left(\frac{\omega}{T}\right)\right\rvert^{2}d\omega=\frac{1}{T}\cdot\frac{1}{2\pi}\int_{-\Omega_s/2}^{\Omega_s/2}\lvert X_a(\Omega)\rvert^{2}d\Omega=\frac{E_a}{T}$$

$$\boxed{E_d=\frac{E_a}{T}=F_s\,E_a\qquad\Longleftrightarrow\qquad E_a=T\,E_d}$$

(coherente con aproximar $\int\lvert x\rvert^2dt$ por la suma de Riemann $T\sum\lvert x(nT)\rvert^2$).

---

## 7. Propiedades de la DTFT

| Propiedad | Dominio temporal ↔ frecuencia |
|---|---|
| **Linealidad** | $a\,x(n)+b\,y(n)\;\leftrightarrow\;a\,X(\omega)+b\,Y(\omega)$ |
| **Desplazamiento temporal** | $x(n-n_0)\;\leftrightarrow\;X(\omega)\,e^{-j\omega n_0}$ |
| **Desplazamiento en frecuencia** | $e^{j\omega_0 n}\,x(n)\;\leftrightarrow\;X(\omega-\omega_0)$ |
| **Derivación** | $n\,x(n)\;\leftrightarrow\;j\,\dfrac{dX(\omega)}{d\omega}$ |
| **Convolución** | $x(n)*y(n)\;\leftrightarrow\;X(\omega)\,Y(\omega)$ |
| **Multiplicación** | $x(n)\,y(n)\;\leftrightarrow\;\dfrac{1}{2\pi}\displaystyle\int_{2\pi}X(\theta)\,Y(\omega-\theta)\,d\theta$ |

> 📝 La convolución en frecuencia de la multiplicación es **periódica** (integral sobre un periodo $2\pi$), porque ambos espectros son periódicos. La derivación sale de derivar $X(\omega)=\sum x(n)e^{-j\omega n}$ respecto a $\omega$, que introduce el factor $-jn$.

---

## 8. Relación entre la transformada Z y la DTFT

Se comparan ambas transformadas de una señal discreta:

$$X(\omega)=\sum_{n=-\infty}^{+\infty}x(n)\,e^{-j\omega n}\qquad\qquad X(z)=\sum_{n=-\infty}^{+\infty}x(n)\,z^{-n}$$

En vez de evaluar todo el plano complejo ($z$ arbitrario), se evalúan solo los puntos que cumplen $z=e^{j\omega}$:

$$\boxed{X(z)\Big|_{z=e^{j\omega}}=X(\omega)}$$

- Se obtiene la TF de una señal a partir de su TZ evaluando los puntos de la **circunferencia unitaria** del plano $Z$.
- **La TF de una señal discreta es un subconjunto de su TZ.**

> 📝 Condición: la evaluación solo es válida si la **ROC contiene la circunferencia unidad** (ver Tema 2). Al recorrer $\omega\in[0,2\pi)$ se da una vuelta completa a la circunferencia, lo que explica la periodicidad $2\pi$ de la DTFT.

---

## 9. Ejercicios T3.3 y T3.4 (muestreo y sistemas)

### T3.3 — Sistema A/D → $H(f)$ → D/A

$$x_a(t)=\cos(3000\pi t)+\sin(1200\pi t)\quad\Longrightarrow\quad F_A=1500\text{ Hz},\;F_B=600\text{ Hz}$$

**a) $F_{s1}=F_{s2}=3$ kHz y $H(f)$ paso bajo ideal con corte $f_c=1/4$.**

Frecuencias normalizadas: $f_A=1500/3000=1/2$ y $f_B=600/3000=1/5$.

$$x(n)=\cos(\pi n)+\sin\!\left(\tfrac{2\pi}{5}n\right)$$

El filtro deja pasar $\lvert f\rvert<1/4$ (equivale a $750$ Hz): se elimina $f=1/2$ y se conserva $f=1/5$.

$$y(n)=\sin\!\left(\tfrac{2\pi}{5}n\right)\qquad\Longrightarrow\qquad\boxed{y(t)=\sin(1200\pi t)}$$

| Etapa | Líneas espectrales |
|---|---|
| $x_a(t)$ | $\pm600$ Hz y $\pm1500$ Hz |
| Tras A/D ($F_s=3$ kHz) | Réplicas cada 3000 Hz. En $\omega$: $\pm2\pi/5$ y $\pm\pi$ (las líneas $+1500$ y $-1500$ coinciden en $\omega=\pm\pi$) |
| Tras $H$ (paso bajo, $f_c=1/4$) | Solo $\pm2\pi/5$ ($f=\pm0.2$) |
| Tras D/A ($F_{s2}=3$ kHz) | $\pm600$ Hz |

**b) $F_{s1}=F_{s2}=2$ kHz y $H(f)$ paso todo ideal.**

Ahora $F_s/2=1000$ Hz. La componente de $1500$ Hz **supera Nyquist** ⇒ **aliasing**: $f_A=1500/2000=3/4\equiv-1/4$.

$$x(n)=\cos\!\left(\tfrac{3\pi}{2}n\right)+\sin\!\left(\tfrac{3\pi}{5}n\right)=\cos\!\left(\tfrac{\pi}{2}n\right)+\sin\!\left(\tfrac{3\pi}{5}n\right)$$

Como $H$ es paso todo, $y(n)=x(n)$. El D/A ideal reconstruye en $[-1000,1000]$ Hz: $\cos(\pi n/2)$ ($f=1/4$) $\to500$ Hz y $\sin(3\pi n/5)$ ($f=0.3$) $\to600$ Hz.

$$\boxed{y(t)=\cos(1000\pi t)+\sin(1200\pi t)}$$

| Etapa | Líneas espectrales |
|---|---|
| $x_a(t)$ | $\pm600$ Hz y $\pm1500$ Hz |
| Tras A/D ($F_s=2$ kHz) | Réplicas cada 2000 Hz: $1500-2000=-500$ Hz ⇒ en el periodo principal aparecen $\pm500$ Hz (alias) y $\pm600$ Hz; en $\omega$: $\pm\pi/2$ y $\pm3\pi/5$ |
| Tras $H$ (paso todo) | Igual |
| Tras D/A | $\pm500$ Hz y $\pm600$ Hz |

---

### T3.4 — $x_a(t)=\cos(2\pi F_0t)+\sin(2\pi F_1t)$, $F_0=10$ Hz, $F_1=100$ Hz, $F_s=150$ Hz

**a) $x(n)$ y $\lvert X(\omega)\rvert$.**

$f_0=10/150=1/15$ (correcto) y $f_1=100/150=2/3>1/2$ (**aliasing**): $2/3\equiv-1/3$.

$$x(n)=\cos\!\left(\tfrac{2\pi}{15}n\right)+\sin\!\left(\tfrac{4\pi}{3}n\right)=\cos\!\left(\tfrac{2\pi}{15}n\right)-\sin\!\left(\tfrac{2\pi}{3}n\right)$$

$\lvert X(\omega)\rvert$ (periodo principal $[-\pi,\pi]$, repetido cada $2\pi$): **cuatro deltas** de área $\pi$ en

$$\omega=\pm\tfrac{2\pi}{15}\;(f=\pm\tfrac{1}{15},\;\pm10\text{ Hz})\qquad\text{y}\qquad\omega=\pm\tfrac{2\pi}{3}\;(f=\pm\tfrac{1}{3},\;\pm50\text{ Hz}\text{, alias de }100\text{ Hz})$$

**b) $h(0)=h(4)=1$, $h(n)=0$ en el resto.** Se tiene $h(n)=\delta(n)+\delta(n-4)$, luego:

$$y(n)=x(n)+x(n-4)\qquad H(\omega)=1+e^{-j4\omega}=2\cos(2\omega)\,e^{-j2\omega}$$

Para cada componente (sistema LTI: sinusoide a la entrada ⇒ sinusoide a la salida con ganancia $\lvert H\rvert$ y fase $\arg H$):

| Componente | $H(\omega_i)$ | Salida |
|---|---|---|
| $\cos(\omega_0n)$, $\omega_0=2\pi/15$ | $2\cos\!\left(\tfrac{4\pi}{15}\right)e^{-j4\pi/15}\approx1.338\,e^{-j4\pi/15}$ | $2\cos\!\left(\tfrac{4\pi}{15}\right)\cos\!\left(\tfrac{2\pi}{15}n-\tfrac{4\pi}{15}\right)$ |
| $-\sin(\omega_1n)$, $\omega_1=2\pi/3$ | $2\cos\!\left(\tfrac{4\pi}{3}\right)e^{-j4\pi/3}=e^{-j\pi/3}$ (ganancia 1) | $-\sin\!\left(\tfrac{2\pi}{3}n-\tfrac{\pi}{3}\right)$ |

$$\boxed{y(n)=2\cos\!\left(\tfrac{4\pi}{15}\right)\cos\!\left(\tfrac{2\pi(n-2)}{15}\right)-\sin\!\left(\tfrac{2\pi}{3}n-\tfrac{\pi}{3}\right)}$$

Con el D/A ideal a $F_s=150$ Hz ($f=1/15\to10$ Hz y $f=1/3\to50$ Hz; un retardo de 2 muestras equivale a $2T=1/75$ s):

$$\boxed{y(t)=2\cos\!\left(\tfrac{4\pi}{15}\right)\cos\!\left(20\pi t-\tfrac{4\pi}{15}\right)-\sin\!\left(100\pi t-\tfrac{\pi}{3}\right)}$$

> 📝 La componente original de 100 Hz sale como una de **50 Hz** (efecto del aliasing en el A/D).

---

## 10. DFT: Transformada Discreta de Fourier

### 10.1 Idea

La DFT no es más que una **versión muestreada (en frecuencia) de la DTFT**:

$$X(k)\equiv X(\omega)\Big|_{\omega=\omega_0k}$$

### 10.2 Lo que NO podemos elegir

| Parámetro | Valor | Motivo |
|---|---|---|
| **Paso de muestreo en frecuencia** | $\omega_0=\dfrac{2\pi}{N}$ | Nos viene dado: se muestrea el periodo $[0,2\pi)$ en $N$ puntos |
| **Índices** | $k=0,1,2,\dots,N-1$ | Limitados a un periodo |
| **Número de cortes $N$ (resolución)** | $N$ = nº de muestras de la señal | No lo elegimos: es el número de muestras de la señal a la que se hace la DFT |
| **Tipo de señal** | **Finita** (o limitada a $N$ muestras) | Se justifica en el apartado 11 |

### 10.3 Definición

Dada una señal de $N$ muestras:

$$\boxed{X(k)=\sum_{n=0}^{N-1}x(n)\,e^{-j\frac{2\pi k}{N}n}\qquad k=0,1,\dots,N-1}$$

Y su inversa (IDFT):

$$\boxed{x(n)=\frac{1}{N}\sum_{k=0}^{N-1}X(k)\,e^{j\frac{2\pi k}{N}n}\qquad n=0,1,\dots,N-1}$$

(los límites de la suma, $n=0..N-1$, y el factor $\frac{2\pi k}{N}$ son lo que la diferencia de la DTFT).

> 📝 **Interpretación física** (con $F_s$): el índice $k$ corresponde a $\omega_k=\frac{2\pi k}{N}$ y a $F_k=k\frac{F_s}{N}$ Hz, y la separación entre muestras en frecuencia es $\frac{F_s}{N}$ (apartado 11). Los índices $k>N/2$ representan frecuencias **negativas** ($k\to k-N$). Para señales reales, $X(N-k)=X^*(k)$.

### 10.4 Ventaja

Tanto la transformación directa como la inversa se **calculan numéricamente**: un programa puede calcular automáticamente el espectro discreto de una señal discreta.

> 📝 En la práctica se calcula con la **FFT** (algoritmo rápido para la DFT).

### 10.5 Ejercicio T3.5 — Identificar un filtro a partir de su DFT

DFT de $N=10$ puntos con $F_s=100$ Hz. En el gráfico (índices $1\ldots10$, tipo MATLAB), $H=1$ en los puntos $1,2,3,9,10$ y $H=0$ en $4,\dots,8$. Con $k=\text{índice}-1$:

| $k$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $F_k=10k$ Hz | 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | $-20$ | $-10$ |
| $H(k)$ | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |

Pasa $0,\pm10,\pm20$ Hz y bloquea $\pm30,\dots,50$ Hz. Resultado:

- **Tipo:** filtro **paso bajo**.
- **Frecuencia de corte:** entre $20$ y $30$ Hz (la resolución es $F_s/N=10$ Hz); tomando $20$ Hz como la última frecuencia que pasa, $f_c=0.2$ ($\omega_c=0.4\pi$).

---

## 11. ¿Por qué la DFT no es exactamente la TF? (historia paso a paso)

La DFT **no es exactamente igual** a la TF: como ocurre en el tiempo, **muestrear tiene implicaciones**.

**Antes recordemos** (dualidad entre multiplicación y convolución):

| Operación en un dominio | Operación en el otro |
|---|---|
| $x_1(t)\cdot x_2(t)$ | $X_1(F)*X_2(F)=\int X_1(\Gamma)X_2(F-\Gamma)\,d\Gamma$ (en $\Omega$: $\frac{1}{2\pi}X_1(\Omega)*X_2(\Omega)$) |
| $x_1(t)*x_2(t)=\int x_1(\tau)x_2(t-\tau)\,d\tau$ | $X_1(F)\cdot X_2(F)$ |

```mermaid
flowchart LR
    A["Señal analógica h(t) y su espectro H(f)"] --> B["1. Muestreo en el tiempo<br/>(× tren de pulsos Δ0)"]
    B --> C["2. Enventanado<br/>(× ventana de NT segundos)"]
    C --> D["3. Muestreo en frecuencia<br/>(× tren de pulsos Δ1)"]
    D --> E["DFT: señal y espectro<br/>discretos y periódicos"]
```

| Paso | En el tiempo | En frecuencia | Consecuencia |
|---|---|---|---|
| **1. Muestreo en el tiempo** | Multiplicación por un **tren de pulsos** (periodo $T$) | $H(f)$ se convoluciona con el tren de pulsos en frecuencia (pulsos de peso $1/T$ en múltiplos de $F_s$) | Espectro **periódico** (réplicas cada $F_s$) |
| **2. Enventanado** | Multiplicación por una **ventana temporal** (de $NT$ segundos) | Convolución con una señal tipo **sinc()** | El espectro se **deforma** |
| **3. Muestreo en frecuencia** | Convolución con un tren de pulsos temporal (señal y tren se convolucionan) | Multiplicación por un **tren de pulsos en el espectro** (separados $F_s/N$) | Señal **periódica** en el tiempo |

**Conclusiones:**

- En frecuencia (analógica) hay un **tren de pulsos separados $F_s/N$ Hz**.
- Por tanto en el tiempo hay otro tren, separado **$N/F_s=NT$ segundos**.
- Si se toman muestras cada $T$ segundos, solo caben **$N$ muestras** sin que haya *aliasing* temporal.

**Por tanto:**

- La DFT **necesita** que la señal sea **finita** para que no haya aliasing en el dominio del tiempo.
- ¿Y si no lo es? → Se aplica el concepto de **ventana**:
  - Aunque la señal sea infinita, solo se puede almacenar un número finito de muestras.
  - La ventana **deforma el espectro original** (por convolución).
- **A más muestras** (ventana más larga): **más resolución y menos deformación**.

---

## 12. Propiedades de la DFT

Notación: $(n)_N$ = $n$ módulo $N$; $\overset{DFT}{\underset{N}{\longleftrightarrow}}$ indica el par DFT de $N$ puntos.

| Propiedad | Expresión |
|---|---|
| **Linealidad** | $a\,x_1(n)+b\,x_2(n)\;\leftrightarrow\;a\,X_1(k)+b\,X_2(k)$ |
| **Convolución circular** | $X_1(k)X_2(k)\;\leftrightarrow\;x_1(n)\odot_N x_2(n)$, con $x_1(n)\odot_N x_2(n)=\displaystyle\sum_{k=0}^{N-1}x_1(k)\,x_2\big((n-k)_N\big)$ |
| **Multiplicación de secuencias** | $x_1(n)\,x_2(n)\;\leftrightarrow\;\dfrac{1}{N}\,X_1(k)\odot_N X_2(k)$ |
| **Reflexión temporal** | $x\big((-n)_N\big)=x(N-n)\;\leftrightarrow\;X\big((-k)_N\big)=X(N-k)$ |
| **Desplazamiento circular en el tiempo** | $x\big((n-l)_N\big)\;\leftrightarrow\;X(k)\,e^{-j2\pi kl/N}$ |
| **Desplazamiento circular en frecuencia** | $x(n)\,e^{j2\pi nl/N}\;\leftrightarrow\;X\big((k-l)_N\big)$ |

> 📝 Al ser la DFT un muestreo de la DTFT, la señal se considera implícitamente **periódica de periodo $N$**. Por eso aparecen desplazamientos y convoluciones **circulares** (módulo $N$): lo que sale por un extremo entra por el otro.

---

## 13. Notas finales: zero padding y convolución

**Extendiendo las señales con ceros (*zero padding*)** se puede:

1. **Incrementar la resolución de la DFT** (más puntos $k$ en el mismo espectro). La deformación debida a la ventana original **se mantiene**.
2. **Realizar una convolución lineal mediante una convolución circular** (más rápida), tomando

$$\boxed{N'\ge N_{x_1}+N_{x_2}-1}$$

> 📝 Con $N'$ menor, la convolución circular produce **aliasing temporal**: las muestras que exceden $N'$ se pliegan sobre las primeras. Con $N'\ge N_{x_1}+N_{x_2}-1$ no hay solapamiento y la circular coincide con la lineal.

---

## 14. Ejercicios T3.5, T3.6 y examen Sep 2017

(El ejercicio T3.5 está resuelto en [10.5](#105-ejercicio-t35--identificar-un-filtro-a-partir-de-su-dft).)

### Ej. examen 2 Sep 2017

Señales causales: $x_1=\{0.5,\,1,\,1,\,0.5\}$ ($n=0..3$) y $x_2=\{0.5,\,1,\,0.2\}$ ($n=0..2$).

**a) Convolución lineal** (longitud $4+3-1=6$, **6 muestras distintas de cero**):

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $y(n)$ | 0.25 | 1 | 1.6 | 1.45 | 0.7 | 0.1 |

(comprobación: $\sum y=5.1=\sum x_1\cdot\sum x_2=3\cdot1.7$).

**b) Convolución circular con $N=4$** (se rellena $x_2$ con un cero): $y_c(n)=y(n)+y(n+4)$ → $y_c=\{0.95,\,1.1,\,1.6,\,1.45\}$. **No** se puede recuperar la convolución lineal: $N=4<6$ y las muestras $y(4),y(5)$ se han sumado sobre $y(0),y(1)$ (aliasing temporal).

**c) Convolución circular con $N=6$:** $y_c=\{0.25,\,1,\,1.6,\,1.45,\,0.7,\,0.1\}$, idéntica a la lineal. **Sí** se puede obtener.

**d) Condición:** $N\ge N_{x_1}+N_{x_2}-1=6$ (longitud de la convolución lineal).

---

### T3.6 — $x(n)=1$ para $0\le n\le99$ y $y(n)=1$ para $0\le n\le9$

**a) Convolución lineal** $z(n)=x(n)*y(n)$, longitud $100+10-1=109$ (un **trapecio**):

$$z(n)=\begin{cases}n+1&0\le n\le9\\10&9\le n\le99\\109-n&99\le n\le108\\0&\text{resto}\end{cases}$$

**b) Convolución circular con $N=100$:** $z_c(n)=z(n)+z(n+100)$ para $n=0..99$. Las muestras $z(100),\dots,z(108)=9,8,\dots,1$ se pliegan sobre $n=0..8$, que valían $1,\dots,9$: suman $10$ en todos los puntos.

$$z_c(n)=10\qquad0\le n\le99$$

**c) Convolución circular con $N=110$:** como $110\ge109$, **no hay aliasing** y $z_c(n)=z(n)$ para $0\le n\le108$, con $z_c(109)=0$ (coincide con la convolución lineal).
