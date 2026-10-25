# Seminario 1 — Relación de Problemas 1

> **Señales Digitales** (Grado en Ingeniería de Tecnologías de Telecomunicación, ETSIIT · Dpto. Teoría de la Señal, Telemática y Comunicaciones).
>
> Resolución **completa y comprobada numéricamente** de todos los ejercicios de la relación: *ejercicios de clase* (T1.x, T2.x, T3.x) y *ejercicios para resolver en casa* (CT1.x, CT2.x, CT3.x). Cada ejercicio incluye enunciado, método, solución y comprobación.
>
> Convención: **📝** = matiz, ampliación o aclaración. Las fórmulas están en LaTeX (GitHub las renderiza).

## Notas sobre los enunciados (interpretaciones)

El PDF original tiene algunos símbolos poco legibles; estas son las lecturas adoptadas:

| Ejercicio | Lectura adoptada |
|---|---|
| **T1.3a** | $x(n)=\cos(0.125\pi n)$ (con $\pi$) |
| **T1.4a** | $x(n)=\sin(\pi+2n)$ |
| **CT1.4a** | $x(n)=\cos(0.125\,n)$ (**sin** $\pi$): contraste deliberado con T1.3a |
| **CT1.9b** | $x(n)=\cos(0.125\,n)+\sin(0.125\pi n)$ (primer término **sin** $\pi$) |
| **T1.6 / CT1.8** | "Frecuencia de Nyquist" = **tasa de Nyquist** $=2\times$ frecuencia máxima (denotada $\Omega_s$) |
| **CT3.1** | El valor de pico $X_a(0)$ no figura en el dibujo: se llama $A$ |
| **CT3.3** | El módulo de $Y(k)$ se supone normalizado (altura 1 ↔ coseno de amplitud 1) y fase 0 |

## Índice

1. [Herramientas teóricas](#1-herramientas-teóricas)
2. [Ejercicios de clase — Tema 1](#2-ejercicios-de-clase--tema-1)
3. [Ejercicios de clase — Tema 2](#3-ejercicios-de-clase--tema-2)
4. [Ejercicios de clase — Tema 3](#4-ejercicios-de-clase--tema-3)
5. [Ejercicios para casa — CT1](#5-ejercicios-para-casa--ct1)
6. [Ejercicios para casa — CT2](#6-ejercicios-para-casa--ct2)
7. [Ejercicios para casa — CT3](#7-ejercicios-para-casa--ct3)
8. [Tabla resumen de resultados](#8-tabla-resumen-de-resultados)
9. [Errores típicos](#9-errores-típicos)

---

## 1. Herramientas teóricas

| Tema | Regla |
|---|---|
| **Impulsos** | $x(n)=\sum_{k}x(k)\,\delta(n-k)$ |
| **Transformación de la variable** | $y(n)=x(g(n))$: se evalúa $x$ en $g(n)$ para cada $n$ (si $g(n)$ no es entero o cae fuera del soporte, $y(n)=0$) |
| **Periodicidad** | $e^{j\omega n}$ es periódica $\iff\omega/2\pi=k/N$ racional (fracción irreducible); periodo fundamental $=N$ |
| **Suma / producto** | Periódica si **todas** las componentes lo son; periodo $=\operatorname{mcm}$ de los periodos. Periódica + no periódica = **no periódica** |
| **Producto de sinusoides** | Se convierte en suma: $\cos A\cos B=\tfrac12[\cos(A+B)+\cos(A-B)]$ |
| **Muestreo y alias** | $f=F/F_s$; alias: $F_a=\lvert F-\operatorname{round}(F/F_s)\,F_s\rvert$ |
| **Nyquist** | Tasa de Nyquist $=2F_m$ (la señal se reconstruye si $F_s>2F_m$) |
| **Convolución** | $y=x*h$: suma de copias de $h$ desplazadas y escaladas por $x$; longitud $N+M-1$ |
| **Transformada Z** | $X(z)=\sum x(n)z^{-n}$; $a^nu(n)\leftrightarrow\frac{1}{1-az^{-1}}$ ($\lvert z\rvert>\lvert a\rvert$); $-a^nu(-n-1)\leftrightarrow\frac{1}{1-az^{-1}}$ ($\lvert z\rvert<\lvert a\rvert$); convolución $\leftrightarrow$ producto |
| **DFT** | $F_k=k\,F_s/N$ (resolución $F_s/N$); $k$ y $N-k$ son frecuencias $\pm$ |

---

## 2. Ejercicios de clase — Tema 1

### T1.1 — $x(n)=(6-n)\,[u(n)-u(n-6)]$

La señal es no nula para $0\le n\le5$:

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $x(n)$ | 6 | 5 | 4 | 3 | 2 | 1 |

**a) $y(n)=x(4-n)$** (reflexión y desplazamiento). Es no nula cuando $0\le4-n\le5$, es decir $-1\le n\le4$:

$$y(n)=6-(4-n)=n+2,\qquad-1\le n\le4$$

| $n$ | −1 | 0 | 1 | 2 | 3 | 4 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $y(n)$ | 1 | 2 | 3 | 4 | 5 | 6 |

Es la señal original **invertida en el tiempo** (rampa creciente) y desplazada.

**b) $y(n)=x(n^{2}-2n+1)=x\big((n-1)^{2}\big)$.** Hay que evaluar $x$ en $(n-1)^2\in\{0,1,4,9,\dots\}$; solo contribuyen los valores dentro de $0\le m\le5$, es decir $(n-1)^2\in\{0,1,4\}$ ($n-1=0,\pm1,\pm2$):

| $n$ | −1 | 0 | 1 | 2 | 3 |
|:-:|:-:|:-:|:-:|:-:|:-:|
| $(n-1)^2$ | 4 | 1 | 0 | 1 | 4 |
| $y(n)$ | $x(4)=2$ | $x(1)=5$ | $x(0)=6$ | $x(1)=5$ | $x(4)=2$ |

$$y(n)=\{2,\,5,\,\underset{\uparrow}{6},\,5,\,2\}\quad(n=-1,\dots,3;\;\uparrow\text{ en }n=1),\qquad0\text{ en el resto}$$

> 📝 Es una señal **simétrica** respecto a $n=1$. Como $g(n)=(n-1)^2$ no es inyectiva, se pierden las muestras $x(2),x(3),x(5)$ (nunca se evalúan).

---

### T1.2 — $x(n)=(-1)^n$ para $-1\le n\le2$ (y 0 en el resto), como suma de impulsos

Valores: $x(-1)=-1$, $x(0)=1$, $x(1)=-1$, $x(2)=1$.

$$\boxed{x(n)=-\delta(n+1)+\delta(n)-\delta(n-1)+\delta(n-2)}$$

---

### T1.3 — ¿Son periódicas? Periodo fundamental

**a) $x(n)=\cos(0.125\pi n)$.** $\omega=\pi/8\Rightarrow f=\dfrac{1}{16}$ (racional) $\Rightarrow$ **periódica, $N=16$**.

**b) $x(n)=\operatorname{Re}\!\left(e^{j\pi n/12}\right)+\operatorname{Im}\!\left(e^{j\pi n/18}\right)=\cos\dfrac{\pi n}{12}+\sin\dfrac{\pi n}{18}$.**

| Componente | $\omega$ | $f$ | Periodo |
|---|:-:|:-:|:-:|
| $\cos(\pi n/12)$ | $\pi/12$ | $1/24$ | 24 |
| $\sin(\pi n/18)$ | $\pi/18$ | $1/36$ | 36 |

Suma de dos periódicas ⇒ **periódica**, con $N=\operatorname{mcm}(24,36)=\mathbf{72}$.

---

### T1.4 — ¿Son periódicas? Periodo fundamental

**a) $x(n)=\sin(\pi+2n)=-\sin(2n)$.** $\omega=2$ rad/muestra $\Rightarrow f=\dfrac{2}{2\pi}=\dfrac1\pi$ (**irracional**) $\Rightarrow$ **no es periódica**.

**b) $x(n)=e^{j\pi n/16}\cos(\pi n/17)$.** Se expresa el producto como suma de exponenciales:

$$x(n)=\tfrac12e^{j\pi n\left(\frac1{16}+\frac1{17}\right)}+\tfrac12e^{j\pi n\left(\frac1{16}-\frac1{17}\right)}=\tfrac12e^{j\frac{33\pi}{272}n}+\tfrac12e^{j\frac{\pi}{272}n}$$

Las frecuencias son $f=\dfrac{33}{544}$ y $f=\dfrac{1}{544}$ (fracciones irreducibles: $544=2^5\cdot17$) $\Rightarrow$ **periódica, $N=544$** (coincide con $\operatorname{mcm}(32,34)=544$).

---

### T1.5 — Dos señales continuas que generen $x(n)=\cos(0.15\pi n)$ con $F_s=8$ kHz

Se necesita $\dfrac{2\pi F}{F_s}\equiv\pm0.15\pi\pmod{2\pi}$, es decir $F=\pm600+k\cdot8000$ Hz.

| Señal | $F$ | Expresión |
|---|:-:|---|
| **$x_{a1}(t)$** | 600 Hz | $\cos(1200\pi t)$ |
| **$x_{a2}(t)$** | 7400 Hz ($8000-600$) | $\cos(14800\pi t)$ |
| (otra) $x_{a3}(t)$ | 8600 Hz ($8000+600$) | $\cos(17200\pi t)$ |

Comprobación: $\cos\!\left(2\pi\cdot\tfrac{7400}{8000}n\right)=\cos(1.85\pi n)=\cos(0.15\pi n)$ ✓ (verificado numéricamente para las tres).

> 📝 La segunda es un **alias** (frecuencia fuera de $F_s/2=4$ kHz que se "pliega" sobre 600 Hz).

---

### T1.6 — Nyquist de $x^{2}(2t)$ si el de $x_a(t)$ es $\Omega_s$

Sea $\Omega_m$ la frecuencia máxima de $x_a$, de modo que $\Omega_s=2\Omega_m$.

| Operación | Efecto en el ancho de banda |
|---|---|
| $x^2(t)=x(t)\cdot x(t)$ | Producto en tiempo ⇒ **convolución** de espectros ⇒ ancho de banda $\times2$ ($2\Omega_m$) |
| $x(2t)$ (compresión temporal) | El espectro se **expande** $\times2$ |
| Total para $x^2(2t)$ | $4\Omega_m$ |

La tasa de Nyquist pasa a ser $2\cdot4\Omega_m=8\Omega_m$:

$$\boxed{\Omega_{s}'=4\,\Omega_s}$$

> 📝 El resultado ($\times4$) es el mismo si se entiende "frecuencia de Nyquist" como la frecuencia máxima representable ($F_s/2$): ambas son proporcionales al ancho de banda.

---

### T1.7 — Convolución de $x(n)=\delta(n-2)-2\delta(n-4)+3\delta(n-6)$ con $h(n)=2\delta(n+3)+\delta(n)+2\delta(n-2)+\delta(n-3)$

Cada impulso de $x$ de amplitud $c$ en $n=k$ genera una copia de $h$ **escalada por $c$ y desplazada $k$**:

| Impulso de $x$ | Copia de $h$ (impulsos: posición → amplitud) |
|---|---|
| $+1$ en $n=2$ | $-1\to2,\;2\to1,\;4\to2,\;5\to1$ |
| $-2$ en $n=4$ | $1\to-4,\;4\to-2,\;6\to-4,\;7\to-2$ |
| $+3$ en $n=6$ | $3\to6,\;6\to3,\;8\to6,\;9\to3$ |

Sumando por posición:

| $n$ | −1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $y(n)$ | 2 | 0 | −4 | 1 | 6 | 0 | 1 | −1 | −2 | 6 | 3 |

$$y(n)=2\delta(n+1)-4\delta(n-1)+\delta(n-2)+6\delta(n-3)+\delta(n-5)-\delta(n-6)-2\delta(n-7)+6\delta(n-8)+3\delta(n-9)$$

(en $n=0$ y $n=4$ hay cancelaciones: $0$ y $2-2=0$).

---

## 3. Ejercicios de clase — Tema 2

### T2.1 — $x(n)=a^{n}u(n)$, $0<a<1$

$$X(z)=\sum_{n=0}^{\infty}\left(az^{-1}\right)^{n}=\frac{1}{1-az^{-1}}=\frac{z}{z-a},\qquad ROC:\ \lvert z\rvert>a$$

### T2.2 — $x(n)=(-b)^{n}$ para $n\le-1$, $b>1$

Anticausal: con $m=-n$,

$$X(z)=\sum_{m=1}^{\infty}\left(-\frac{z}{b}\right)^{m}=\frac{-z/b}{1+z/b}=-\frac{z}{z+b}=-\frac{1}{1+bz^{-1}},\qquad ROC:\ \lvert z\rvert<b$$

### T2.3 — Teoremas del valor inicial y final (señal causal)

- **Inicial:** $X(z)=x(0)+x(1)z^{-1}+\dots\;\Rightarrow\;\lim_{z\to\infty}X(z)=x(0)$.
- **Final:** $(1-z^{-1})X(z)=\sum_{n}[x(n)-x(n-1)]z^{-n}$; con $z\to1$ la suma es telescópica y vale $\lim_{N\to\infty}x(N)$. Luego $\displaystyle\lim_{n\to\infty}x(n)=\lim_{z\to1}\frac{z-1}{z}X(z)$ (si el límite existe).

### T2.4 — $x(n)=\cos(\omega_0n)u(n)$

$$\cos(\omega_0n)=\tfrac12\left(e^{j\omega_0n}+e^{-j\omega_0n}\right)\;\Rightarrow\;X(z)=\frac{1-\cos\omega_0\,z^{-1}}{1-2\cos\omega_0\,z^{-1}+z^{-2}},\quad ROC:\ \lvert z\rvert>1$$

Polos $e^{\pm j\omega_0}$ (sobre la circunferencia unidad); ceros en $z=0$ y $z=\cos\omega_0$.

### T2.5 — $x(n)=a^{n}$ para $0\le n\le M-1$, $a>0$

$$X(z)=\sum_{n=0}^{M-1}(az^{-1})^{n}=\frac{1-a^{M}z^{-M}}{1-az^{-1}}=\frac{z^{M}-a^{M}}{z^{M-1}(z-a)},\qquad ROC:\ \lvert z\rvert>0$$

Ceros: $z_k=a\,e^{j2\pi k/M}$, $k=1,\dots,M-1$ (el $k=0$, $z=a$, **cancela** el polo $z=a$); polo de multiplicidad $M-1$ en $z=0$.

**$M=8$:** 7 ceros en $z_k=a\,e^{j\pi k/4}$ ($k=1..7$, equiespaciados 45° sobre la circunferencia de radio $a$, faltando el ángulo 0°) y un polo de multiplicidad 7 en el origen.

### T2.6 — Inversa de $X(z)=\dfrac{z}{z-a}$, $\lvert z\rvert>a$, $0<a<1$

ROC exterior ⇒ causal: $X(z)=\dfrac{1}{1-az^{-1}}=1+az^{-1}+a^{2}z^{-2}+\dots\;\Rightarrow\;x(n)=a^{n}u(n)$.

### T2.7 — $X(z)=\dfrac{-2-z^{-1}-2z^{-2}}{1-3z^{-1}+2z^{-2}}$, causal

Denominador $=(1-z^{-1})(1-2z^{-1})$: polos $1$ y $2$ ⇒ **ROC $\lvert z\rvert>2$** (no contiene la circunferencia unidad: inestable). Como $M=N$, se divide primero:

$$X(z)=-1+\frac{5}{1-z^{-1}}-\frac{6}{1-2z^{-1}}\quad\Rightarrow\quad\boxed{x(n)=-\delta(n)+\left(5-6\cdot2^{n}\right)u(n)}$$

($x(0)=-2=X(\infty)$ ✓, $x(1)=-7$ ✓).

### T2.8 — $X(z)=\dfrac{z^{-2}}{1-5z^{-1}+8z^{-2}-4z^{-3}}$, causal

Denominador $=(1-z^{-1})(1-2z^{-1})^{2}$: polo simple en 1 y **doble** en 2 ⇒ **ROC $\lvert z\rvert>2$** (inestable).

$$X(z)=\frac{1}{1-z^{-1}}-\frac{3/2}{1-2z^{-1}}+\frac{1/2}{(1-2z^{-1})^{2}}\quad\Rightarrow\quad\boxed{x(n)=\left[1+(n-2)\,2^{\,n-1}\right]u(n)}$$

($x(0)=x(1)=0$, $x(2)=1$, $x(3)=5$, $x(4)=17$ ✓).

> 📝 Desarrollo detallado de T2.3–T2.8 en `Transformada_Z.md` (sección 9).

---

## 4. Ejercicios de clase — Tema 3

### T3.1 — Relación entre $X(\omega)$ y $X_a(\Omega)$

Muestrear es multiplicar por el tren $p(t)=\sum_k\delta(t-kT)$, cuyo espectro es $P(\Omega)=\frac{2\pi}{T}\sum_k\delta(\Omega-k\Omega_s)$ (serie de Fourier de $p$). Multiplicación en el tiempo ⇒ convolución $\frac1{2\pi}$ en frecuencia:

$$X_d(\Omega)=\frac{1}{2\pi}X_a(\Omega)*P(\Omega)=\frac1T\sum_{k}X_a(\Omega-k\Omega_s)\;\Rightarrow\;\boxed{X(\omega)=X_d\!\left(\tfrac{\omega}{T}\right)=\frac1T\sum_{k=-\infty}^{\infty}X_a\!\left(\frac{\omega-2\pi k}{T}\right)}$$

Réplicas del espectro analógico, escaladas por $1/T=F_s$ y repetidas cada $2\pi$. Si se cumple Nyquist, en $\lvert\omega\rvert<\pi$: $X(\omega)=F_s\,X_a(\omega F_s)$.

### T3.2 — Energía de $x(n)$ si $F_s\ge2F_m$

Por Parseval y con $X(\omega)=\frac1TX_a(\omega/T)$ en $[-\pi,\pi]$:

$$E_x=\frac{1}{2\pi}\int_{-\pi}^{\pi}\frac{1}{T^{2}}\left\lvert X_a\!\left(\tfrac{\omega}{T}\right)\right\rvert^{2}d\omega=\frac1T\cdot\frac{1}{2\pi}\int\lvert X_a(\Omega)\rvert^{2}d\Omega=\boxed{\frac{E_a}{T}=F_s\,E_a}$$

### T3.3 — $x_a(t)=\cos(3000\pi t)+\sin(1200\pi t)$ (componentes de 1500 Hz y 600 Hz)

**a) $F_{s1}=F_{s2}=3$ kHz, paso bajo ideal con $f_c=1/4$ (750 Hz):** $x(n)=\cos(\pi n)+\sin\!\left(\tfrac{2\pi}{5}n\right)$. El filtro elimina $f=1/2$ y deja $f=1/5$:

$$y(n)=\sin\!\left(\tfrac{2\pi}{5}n\right)\;\Rightarrow\;\boxed{y(t)=\sin(1200\pi t)}$$

**b) $F_{s}=2$ kHz, paso todo:** $1500$ Hz $>F_s/2=1$ kHz ⇒ aliasing ($1500\to500$ Hz): $x(n)=\cos\!\left(\tfrac{\pi}{2}n\right)+\sin\!\left(\tfrac{3\pi}{5}n\right)$, $y(n)=x(n)$:

$$\boxed{y(t)=\cos(1000\pi t)+\sin(1200\pi t)}$$

| Etapa | (a) $F_s=3$ kHz | (b) $F_s=2$ kHz |
|---|---|---|
| $x_a(t)$ | líneas en ±600, ±1500 Hz | igual |
| Tras A/D (en $\omega$) | ±$2\pi/5$, ±$\pi$ | ±$3\pi/5$ y ±$\pi/2$ (alias de 1500) |
| Tras $H$ | solo ±$2\pi/5$ | igual (paso todo) |
| Tras D/A | ±600 Hz | ±500 y ±600 Hz |

### T3.4 — $F_0=10$ Hz, $F_1=100$ Hz, $F_s=150$ Hz

**a)** $f_0=1/15$; $f_1=2/3>1/2$ ⇒ alias $-1/3$:

$$x(n)=\cos\!\left(\tfrac{2\pi}{15}n\right)-\sin\!\left(\tfrac{2\pi}{3}n\right)$$

$\lvert X(\omega)\rvert$: **4 deltas** de área $\pi$ en $\omega=\pm\frac{2\pi}{15}$ y $\pm\frac{2\pi}{3}$ (en Hz: ±10 y ±50 Hz), repetidas cada $2\pi$.

**b)** $h(n)=\delta(n)+\delta(n-4)$ ⇒ $y(n)=x(n)+x(n-4)$, $H(\omega)=2\cos(2\omega)e^{-j2\omega}$:

$$\boxed{y(n)=2\cos\tfrac{4\pi}{15}\cos\!\left(\tfrac{2\pi(n-2)}{15}\right)-\sin\!\left(\tfrac{2\pi}{3}n-\tfrac{\pi}{3}\right)}$$

$$\boxed{y(t)=2\cos\tfrac{4\pi}{15}\cos\!\left(20\pi t-\tfrac{4\pi}{15}\right)-\sin\!\left(100\pi t-\tfrac{\pi}{3}\right)}\qquad(2\cos\tfrac{4\pi}{15}\approx1.338)$$

### T3.5 — DFT de $N=10$ puntos con $F_s=100$ Hz

Con $k=\text{índice}-1$: $H=1$ en $k=0,1,2,8,9$ y $0$ en $k=3..7$; $F_k=10k$ Hz ⇒ pasa $0,\pm10,\pm20$ Hz y bloquea el resto. **Filtro paso bajo**, con corte entre 20 y 30 Hz (se toma $f_c\approx20$ Hz, $\omega_c=0.4\pi$).

### T3.6 — $x(n)=1$ ($0\le n\le99$), $y(n)=1$ ($0\le n\le9$)

- **a)** Convolución lineal (109 muestras, trapecio): $z(n)=n+1$ ($0\le n\le9$); $10$ ($9\le n\le99$); $109-n$ ($99\le n\le108$).
- **b)** Circular $N=100$: $z_c(n)=z(n)+z(n+100)=10$ para todo $0\le n\le99$ (las colas 9,…,1 se pliegan sobre los valores 1,…,9).
- **c)** Circular $N=110\ge109$: sin aliasing, $z_c(n)=z(n)$, con $z_c(109)=0$.

> 📝 Desarrollo detallado de T3.1–T3.6 en `Tema3_DTFT_DFT.md`.

---

## 5. Ejercicios para casa — CT1

### CT1.1 — Muestreo a 200 Hz de $v_a(t)=6\cos(60\pi t)+3\sin(300\pi t)+2\cos(340\pi t)+4\cos(500\pi t)+10\sin(660\pi t)$

Frecuencias (Hz): $30,\,150,\,170,\,250,\,330$. Con $F_s=200$ Hz ($F_s/2=100$), solo la primera cumple Nyquist. Se calcula cada alias:

| Componente | $F$ | $f=F/F_s$ | $f_a=f-\operatorname{round}(f)$ | Alias | Término discreto |
|---|:-:|:-:|:-:|:-:|---|
| $6\cos(60\pi t)$ | 30 | 0.15 | 0.15 | 30 Hz | $6\cos(0.3\pi n)$ |
| $3\sin(300\pi t)$ | 150 | 0.75 | −0.25 | 50 Hz | $3\sin(1.5\pi n)=-3\sin(0.5\pi n)$ |
| $2\cos(340\pi t)$ | 170 | 0.85 | −0.15 | 30 Hz | $2\cos(1.7\pi n)=2\cos(0.3\pi n)$ |
| $4\cos(500\pi t)$ | 250 | 1.25 | 0.25 | 50 Hz | $4\cos(2.5\pi n)=4\cos(0.5\pi n)$ |
| $10\sin(660\pi t)$ | 330 | 1.65 | −0.35 | 70 Hz | $10\sin(3.3\pi n)=-10\sin(0.7\pi n)$ |

$$\boxed{v(n)=8\cos(0.3\pi n)+4\cos(0.5\pi n)-3\sin(0.5\pi n)-10\sin(0.7\pi n)}$$

Agrupando los dos de $\omega=0.5\pi$: $4\cos-3\sin=5\cos(0.5\pi n+0.6435)$ (con $0.6435=\arctan\frac34$):

$$v(n)=8\cos(0.3\pi n)+5\cos(0.5\pi n+0.6435)-10\sin(0.7\pi n)$$

> 📝 Comprobado numéricamente (error $<10^{-12}$). Resulta periódica con $N=20$. Hay **solo 3 frecuencias** (30, 50, 70 Hz) porque 170→30 y 250→50 se superponen a otras componentes.

---

### CT1.2 — $x(n)=\cos(n\pi/8)$ con $F_s=10$ Hz: dos señales continuas

$\dfrac{2\pi F}{10}=\dfrac{\pi}{8}\Rightarrow F=0.625$ Hz.

| Señal | $F$ | Expresión |
|---|:-:|---|
| $x_{a1}(t)$ | 0.625 Hz | $\cos(1.25\pi t)$ |
| $x_{a2}(t)$ | 9.375 Hz ($10-0.625$) | $\cos(18.75\pi t)$ |
| (otra) | 10.625 Hz | $\cos(21.25\pi t)$ |

---

### CT1.3 — Periodo de $x(n)=\cos\frac{n\pi}{8}\cos\frac{2n\pi}{8}\sin\frac{n\pi}{3}\sin\frac{n\pi}{4}$

| Factor | $f$ | Periodo |
|---|:-:|:-:|
| $\cos(\pi n/8)$ | $1/16$ | 16 |
| $\cos(\pi n/4)$ | $1/8$ | 8 |
| $\sin(\pi n/3)$ | $1/6$ | 6 |
| $\sin(\pi n/4)$ | $1/8$ | 8 |

El producto es periódico con $N\mid\operatorname{mcm}(16,8,6,8)=48$. La suma de las frecuencias $\frac1{16}+\frac18+\frac16+\frac18=\frac{23}{48}$ está en la descomposición y es irreducible, así que el periodo fundamental no es menor:

$$\boxed{N=48}$$

(verificado numéricamente buscando el menor $N$ con $x(n+N)=x(n)$).

---

### CT1.4 — ¿Son periódicas?

**a) $x(n)=\cos(0.125\,n)$** (sin $\pi$): $f=\dfrac{0.125}{2\pi}=\dfrac{1}{16\pi}$ **irracional** ⇒ **no periódica**.

**b) $x(n)=\left[\operatorname{Re}(e^{j\pi n/12})+\operatorname{Im}(e^{j\pi n/18})\right]\cos(0.25\pi n)=\left[\cos\tfrac{\pi n}{12}+\sin\tfrac{\pi n}{18}\right]\cos\tfrac{\pi n}{4}$.**

$$\cos\tfrac{\pi n}{12}\cos\tfrac{\pi n}{4}=\tfrac12\left[\cos\tfrac{\pi n}{3}+\cos\tfrac{\pi n}{6}\right]\;(N=\operatorname{mcm}(6,12)=12)$$

$$\sin\tfrac{\pi n}{18}\cos\tfrac{\pi n}{4}=\tfrac12\left[\sin\tfrac{11\pi n}{36}-\sin\tfrac{7\pi n}{36}\right]\;(f=\tfrac{11}{72},\tfrac{7}{72}\Rightarrow N=72)$$

Periódica, con $N=\operatorname{mcm}(12,72)=\mathbf{72}$.

---

### CT1.5 — $x(n)=2^{n}$ para $-10\le n\le10$

$$\boxed{x(n)=\sum_{k=-10}^{10}2^{k}\,\delta(n-k)}$$

(de $2^{-10}\approx0.001$ en $n=-10$ a $2^{10}=1024$ en $n=10$).

---

### CT1.6 — Máximo de $y=x*h$

$x(n)$: triángulo $\{0,0.2,0.4,0.6,0.8,1,0.8,0.6,0.4,0.2,0\}$ para $n=0..10$ (pico 1 en $n=5$); $h(n)=\delta(n-2)+\delta(n-3)+\delta(n-4)$.

$$y(n)=x(n-2)+x(n-3)+x(n-4)$$

Es la **suma de tres muestras consecutivas** de $x$; es máxima cuando la ventana $\{n-4,n-3,n-2\}$ está centrada en el pico ($n-3=5$):

$$y(8)=x(6)+x(5)+x(4)=0.8+1+0.8=\mathbf{2.6}\qquad\boxed{n=8,\;y_{max}=2.6}$$

(los vecinos valen $y(7)=y(9)=2.4$; verificado con `conv`).

---

### CT1.7 — Parte simétrica conjugada de $x(n)=\left(\tfrac12+j\tfrac12\right)^{n}u(n)$

$$x_e(n)=\tfrac12\left[x(n)+x^{*}(-n)\right]$$

Con $\alpha=\frac{1+j}{2}$ y $x^{*}(-n)=(\alpha^{*})^{-n}u(-n)=(1+j)^{n}u(-n)$ (pues $\frac{2}{1-j}=1+j$):

$$\boxed{x_e(n)=\begin{cases}\tfrac12\left(\tfrac{1+j}{2}\right)^{n}&n>0\\[1mm]1&n=0\\[1mm]\tfrac12\,(1+j)^{n}&n<0\end{cases}}$$

Comprobación: $x_e(-n)=x_e^{*}(n)$ ✓ (para $n>0$: $\frac12(1+j)^{-n}=\frac12\left(\frac{1-j}{2}\right)^{n}=\left[\frac12\alpha^{n}\right]^{*}$) y $x_e(0)$ real ✓.

---

### CT1.8 — Señal limitada a 10 Hz

La tasa (frecuencia) de Nyquist es $2F_m=\boxed{20\text{ Hz}}$ (la frecuencia máxima representable con ese muestreo sería $F_s/2=10$ Hz).

---

### CT1.9 — ¿Son periódicas?

**a) $x(n)=\left(e^{j\pi n/4}+e^{-j\pi n/4}\right)+\cos\tfrac{2\pi n}{3}=2\cos\tfrac{\pi n}{4}+\cos\tfrac{2\pi n}{3}$.** Periodos 8 y 3 ⇒ periódica con $N=\operatorname{mcm}(8,3)=\mathbf{24}$.

**b) $x(n)=\cos(0.125\,n)+\sin(0.125\pi n)$.** El primer término no es periódico ($f=\frac{1}{16\pi}$) y el segundo sí ($N=16$) ⇒ la suma **no es periódica**.

---

## 6. Ejercicios para casa — CT2

### CT2.1 — $x(n)=r^{n}\cos(\omega_0n)u(n)$

Por la propiedad de **escalado** ($a^nx(n)\leftrightarrow X(z/a)$) aplicada a T2.4:

$$\boxed{X(z)=\frac{1-r\cos\omega_0\,z^{-1}}{1-2r\cos\omega_0\,z^{-1}+r^{2}z^{-2}},\qquad ROC:\ \lvert z\rvert>r}$$

Polos en $re^{\pm j\omega_0}$; ceros en $z=0$ y $z=r\cos\omega_0$.

---

### CT2.2 — Transformada Z y ROC

**a) $x(n)=2\delta(n)+3\delta(n-2)-\delta(n-5)$** (finita):

$$X(z)=2+3z^{-2}-z^{-5}=\frac{2z^{5}+3z^{3}-1}{z^{5}},\qquad ROC:\ \lvert z\rvert>0$$

5 polos en $z=0$ y 5 ceros (raíces de $2z^5+3z^3-1$).

**b) $x(n)=\left(\tfrac12\right)^{n}u(n)-\left(\tfrac13\right)^{n}u(-n-1)$.**

- Parte causal: $\frac{1}{1-\frac12z^{-1}}$, ROC $\lvert z\rvert>\frac12$.
- Parte anticausal (fila 6 de la tabla con $a=\frac13$): $-(1/3)^nu(-n-1)\leftrightarrow\frac{1}{1-\frac13z^{-1}}$, ROC $\lvert z\rvert<\frac13$.

Intersección: $\lvert z\rvert>\frac12$ y $\lvert z\rvert<\frac13$ ⇒ **ROC vacía** ⇒ **la transformada Z no existe** (la secuencia crece en ambos extremos).

Aun así, la expresión formal es

$$X(z)=\frac{1}{1-\frac12z^{-1}}+\frac{1}{1-\frac13z^{-1}}=\frac{z\left(2z-\frac56\right)}{\left(z-\frac12\right)\left(z-\frac13\right)}$$

**Diagrama de polos y ceros (formal):** polos en $z=\frac12$ y $z=\frac13$; ceros en $z=0$ y $z=\frac{5}{12}$. No existe ninguna ROC que lo acompañe.

> 📝 Es el caso de las diapositivas: "Si es bilateral, su ROC estará vacía" (cuando las condiciones de causal y anticausal son incompatibles).

---

### CT2.3 — $X(z)=\dfrac{z^{-1}}{-\frac12z^{-3}+2z^{-2}-\frac52z^{-1}+1}$, causal

Con $w=z^{-1}$: $1-\frac52w+2w^2-\frac12w^3=(1-w)^2\left(1-\frac w2\right)$. Polos: $z=1$ (**doble**) y $z=\frac12$. Causal ⇒ **ROC $\lvert z\rvert>1$** (no contiene la circunferencia unidad: no estable, con crecimiento lineal).

$$X=\frac{w}{(1-w)^2(1-\frac w2)}=\frac{-4}{1-w}+\frac{2}{(1-w)^2}+\frac{2}{1-\frac w2}$$

$$\boxed{x(n)=\left[2n-2+2\left(\tfrac12\right)^{n}\right]u(n)=2\left[n-1+\left(\tfrac12\right)^{n}\right]u(n)}$$

Valores: $x(0)=0$, $x(1)=1$, $x(2)=2.5$, $x(3)=4.25$ (coinciden con la serie, verificado).

---

### CT2.4 — $X(z)=\dfrac{1+z^{-1}}{1-z^{-1}+0.5z^{-2}}$, causal

Polos: $z^2-z+0.5=0\Rightarrow z=\frac{1\pm j}{2}=\frac{1}{\sqrt2}e^{\pm j\pi/4}$, $\lvert p\rvert=0.707$ ⇒ **ROC $\lvert z\rvert>\frac1{\sqrt2}$** (contiene la circunferencia unidad: **estable**).

Fracciones simples con polos complejos conjugados: $X=\dfrac{A}{1-\alpha z^{-1}}+\dfrac{A^{*}}{1-\alpha^{*}z^{-1}}$, $\alpha=\frac{1+j}{2}$, con $A=\dfrac{2-j}{1+j}=\dfrac{1-3j}{2}$ ($\lvert A\rvert=\frac{\sqrt{10}}{2}$, $\arg A=-\arctan3$).

$$x(n)=2\operatorname{Re}\{A\alpha^{n}\}u(n)\;\Rightarrow\;\boxed{x(n)=\left(\tfrac{1}{\sqrt2}\right)^{n}\left[\cos\tfrac{\pi n}{4}+3\sin\tfrac{\pi n}{4}\right]u(n)}$$

Valores: $1,\;2,\;1.5,\;0.5,\;-0.25,\dots$ (verificado). Oscilación amortiguada con envolvente $(0.707)^n$ y frecuencia dada por el ángulo del polo ($\pi/4$).

---

### CT2.5 — $X(z)=\dfrac{1}{1-z^{-1}-z^{-2}+z^{-3}}$

Con $w=z^{-1}$: $1-w-w^2+w^3=(1-w)(1-w^2)=(1-w)^2(1+w)$. Polos: $z=1$ (**doble**) y $z=-1$ (todos de módulo 1).

$$X=\frac{1/4}{1-w}+\frac{1/2}{(1-w)^2}+\frac{1/4}{1+w}$$

**Causal ($\lvert z\rvert>1$):**

$$\boxed{x(n)=\left[\tfrac14+\tfrac12(n+1)+\tfrac14(-1)^{n}\right]u(n)=\left[\tfrac34+\tfrac n2+\tfrac14(-1)^{n}\right]u(n)}$$

($1,1,2,2,3,3,\dots$, verificado). La ROC $\lvert z\rvert>1$ no incluye la circunferencia unidad: la señal crece linealmente.

**Anticausal ($\lvert z\rvert<1$):** se usan $-a^nu(-n-1)\leftrightarrow\frac{1}{1-az^{-1}}$ y $-(n+1)a^nu(-n-1)\leftrightarrow\frac{1}{(1-az^{-1})^2}$:

$$\boxed{x(n)=-\left[\tfrac34+\tfrac n2+\tfrac14(-1)^{n}\right]u(-n-1)}$$

Es no nula desde $n=-3$ en adelante hacia $-\infty$: $x(-3)=1$, $x(-4)=1$, $x(-5)=2,\dots$ (coincide con el desarrollo en potencias de $z$: $X=z^3(1+z+2z^2+\dots)$).

**¿Bilateral?** **No**: los tres polos están en la **misma** circunferencia $\lvert z\rvert=1$, así que no existe ningún anillo $R_1<\lvert z\rvert<R_2$ libre de polos (solo caben las ROC $\lvert z\rvert>1$ y $\lvert z\rvert<1$).

---

### CT2.6 — Demostrar $-z\dfrac{d}{dz}X(z)\leftrightarrow n\,x(n)$ y calcular $\sum_{n=0}^{\infty}n\,a^{n}$

$$\frac{dX}{dz}=\sum_n-n\,x(n)\,z^{-n-1}\;\Rightarrow\;-z\frac{dX}{dz}=\sum_n n\,x(n)\,z^{-n}\;\blacksquare$$

Aplicada a $x(n)=a^nu(n)$, $X(z)=\frac{z}{z-a}$ ($\lvert z\rvert>\lvert a\rvert$):

$$na^nu(n)\leftrightarrow-z\frac{(z-a)-z}{(z-a)^2}=\frac{az}{(z-a)^{2}}$$

Evaluando en $z=1$ (dentro de la ROC porque $\lvert a\rvert<1$) se obtiene $\sum n\,a^n$:

$$\boxed{\sum_{n=0}^{\infty}n\,a^{n}=\frac{a}{(1-a)^{2}},\qquad\lvert a\rvert<1}$$

---

### CT2.7 — ROC sin calcular $X(z)$

**a) $x(n)=\left[\left(\tfrac15\right)^n+\left(\tfrac14\right)^n\right]u(n-5)$.** Es causal (comienza en $n=5$) con exponenciales de bases $\frac15$ y $\frac14$ ⇒ ROC: **$\lvert z\rvert>\frac14$** (el desplazamiento solo añade $z^{-5}$, que no cambia la ROC salvo en el origen, ya excluido).

**b) $x(n)=2^{n}u(-n)$.** Anticausal ($n\le0$): $\sum_{n\le0}2^nz^{-n}=\sum_{m\ge0}(z/2)^m$ ⇒ ROC: **$\lvert z\rvert<2$** (incluye $z=0$).

---

### CT2.8 — Convolución de $h(n)=(0.75)^{n}u(-n)$ y $x(n)=u(-n)$ con Z

$$H(z)=\sum_{m\ge0}\left(\tfrac{z}{0.75}\right)^m=\frac{1}{1-\frac43z},\ \lvert z\rvert<\tfrac34\qquad X(z)=\sum_{m\ge0}z^m=\frac{1}{1-z},\ \lvert z\rvert<1$$

$$Y(z)=H(z)X(z)=\frac{1}{\left(1-\frac43z\right)(1-z)}=\frac{4}{1-\frac43z}-\frac{3}{1-z},\qquad ROC:\ \lvert z\rvert<\tfrac34$$

Como $\sum_{m\ge0}c^mz^m\leftrightarrow c^{-n}u(-n)$:

$$\boxed{y(n)=\left[4(0.75)^{n}-3\right]u(-n)}$$

Comprobación por suma directa: $y(0)=1$, $y(-1)=\frac43+1=2.333$, $y(-2)=4.111$, $y(-3)=6.481$ ✓ (coincide con la fórmula).

---

## 7. Ejercicios para casa — CT3

### CT3.1 — Sistema A/D → $H$ → D/A con $F_{s1}=F_{s2}=10$ kHz

$X_a(F)$ es un **triángulo** (pico $A=X_a(0)$ en $F=0$, nulo en $\pm5$ kHz): $X_a(F)=A\left(1-\dfrac{\lvert F\rvert}{5\text{ kHz}}\right)$ para $\lvert F\rvert\le5$ kHz.

1. **A/D:** $F_s=10$ kHz $=2F_m$ (cumple Nyquist, sin solape): $X(\omega)=F_s\,X_a(\omega F_s/2\pi)$ en $\lvert\omega\rvert<\pi$.
2. **Filtro:** paso bajo ideal con $\omega_c=\pi/2\iff F_c=\dfrac{\omega_c}{2\pi}F_s=\dfrac{F_s}{4}=2.5$ kHz.
3. **D/A** ideal con el mismo $F_s$: devuelve la parte filtrada del espectro (con ganancia 1).

$$\boxed{Y_a(F)=\begin{cases}A\left(1-\dfrac{\lvert F\rvert}{5\text{ kHz}}\right)&\lvert F\rvert\le2.5\text{ kHz}\\[2mm]0&\lvert F\rvert>2.5\text{ kHz}\end{cases}}$$

Es el triángulo **recortado** en $\lvert F\rvert=2.5$ kHz (un **trapecio**: altura $A$ en el centro y $A/2$ en los bordes, que se cortan abruptamente).

---

### CT3.2 — La DFT a partir de la TF de una señal analógica (desarrollo gráfico)

La DFT se obtiene de $X_a(F)$ en **tres pasos** (cada uno es una multiplicación en un dominio ⇒ convolución en el otro):

```text
           X_a(F)                          espectro analógico (ancho 2·Fm)
             /\
          __/  \__
   ───────────0───────────► F

 (1) MUESTREO en el tiempo (× tren de impulsos de periodo T)
     → espectro periódico: réplicas cada Fs, escaladas por 1/T
        /\        /\        /\        /\
     __/  \______/  \______/  \______/  \__
      -Fs         0         Fs        2Fs

 (2) ENVENTANADO (× ventana de N muestras, duración NT)
     → convolución con una sinc de anchura ≈ Fs/N: el espectro se "emborrona"
        ,-.       ,-.       ,-.
     __/   \_,_,_/   \_,_,_/   \__      (rizado y ensanchamiento)

 (3) MUESTREO en frecuencia (× tren de impulsos cada Fs/N)
     → en el tiempo se REPITE la ventana cada NT (señal periódica de N muestras)
        | | |           | | |           | | |
     ───┴─┴─┴───────────┴─┴─┴───────────┴─┴─┴──► F
        k=0 … N-1  (un periodo, 0 … Fs)   ← X(k): la DFT
```

| Paso | Dominio temporal | Dominio frecuencial | Consecuencia |
|---|---|---|---|
| **1. Muestreo** | × tren de pulsos (periodo $T$) | Réplicas cada $F_s$ | Aliasing si $F_s<2F_m$ |
| **2. Enventanado** | × ventana de $NT$ s | Convolución con sinc | Deformación del espectro (escape espectral) |
| **3. Muestreo en frecuencia** | Repetición cada $NT$ s | × tren de pulsos cada $F_s/N$ | La DFT son $N$ muestras: $F_k=kF_s/N$ |

**Resultado:** $X(k)=\sum_{n=0}^{N-1}x(n)e^{-j2\pi kn/N}=X_{\text{ventana}}(\omega)\big|_{\omega=2\pi k/N}\approx F_s\,X_a\!\left(\tfrac{kF_s}{N}\right)$ (si $x_a$ está limitada en banda y en tiempo).

Condiciones para que la DFT represente bien la TF: Nyquist ($F_s>2F_m$), señal de **duración $\le NT$** (si no, aliasing temporal) y ventana larga (más resolución $F_s/N$, menos deformación).

---

### CT3.3 — Reconstruir $y(t)$ a partir de la DFT ($F_s=30$ Hz, $N=30$)

De la figura, $\lvert Y(k)\rvert=1$ en $k=\mathbf{5,\,10,\,12,\,18,\,20,\,25}$. Son tres **pares simétricos** ($k$ y $N-k$): $(5,25)$, $(10,20)$, $(12,18)$ ⇒ tres sinusoides reales.

Resolución en frecuencia $F_s/N=30/30=1$ Hz, así que $F_k=k$ Hz:

| Par $(k,\,N-k)$ | Frecuencia |
|:-:|:-:|
| (5, 25) | **5 Hz** |
| (10, 20) | **10 Hz** |
| (12, 18) | **12 Hz** |

Todas por debajo de $F_s/2=15$ Hz (sin ambigüedad de alias, tomando el rango principal).

$$\boxed{y(t)=\cos(10\pi t)+\cos(20\pi t)+\cos(24\pi t)}$$

> 📝 **Hipótesis:** módulo normalizado ($\lvert Y(k)\rvert=1\leftrightarrow$ amplitud 1) y fase nula. Con la DFT sin normalizar, un coseno de amplitud $A$ da $\lvert Y(k)\rvert=AN/2=15A$ en $k$ y $N-k$; para altura 1 sería $A=1/15$. Comprobado: la DFT de $\cos(10\pi t)+\cos(20\pi t)+\cos(24\pi t)$ muestreada a 30 Hz tiene exactamente seis deltas en $k=5,10,12,18,20,25$.

---

## 8. Tabla resumen de resultados

| Ejercicio | Resultado |
|---|---|
| **T1.1a** | $y(n)=n+2$, $-1\le n\le4$ |
| **T1.1b** | $\{2,5,6,5,2\}$, $n=-1..3$ |
| **T1.2** | $-\delta(n+1)+\delta(n)-\delta(n-1)+\delta(n-2)$ |
| **T1.3** | a) $N=16$; b) $N=72$ |
| **T1.4** | a) no periódica; b) $N=544$ |
| **T1.5** | $\cos(1200\pi t)$ y $\cos(14800\pi t)$ |
| **T1.6** | $4\Omega_s$ |
| **T1.7** | $\{2,0,-4,1,6,0,1,-1,-2,6,3\}$, $n=-1..9$ |
| **T2.1** | $\frac{1}{1-az^{-1}}$, $\lvert z\rvert>a$ |
| **T2.2** | $-\frac{z}{z+b}$, $\lvert z\rvert<b$ |
| **T2.4** | $\frac{1-\cos\omega_0z^{-1}}{1-2\cos\omega_0z^{-1}+z^{-2}}$, $\lvert z\rvert>1$ |
| **T2.7** | $-\delta(n)+(5-6\cdot2^n)u(n)$; ROC $\lvert z\rvert>2$ |
| **T2.8** | $[1+(n-2)2^{n-1}]u(n)$; ROC $\lvert z\rvert>2$ |
| **T3.2** | $E_x=E_a/T=F_sE_a$ |
| **T3.3** | a) $\sin(1200\pi t)$; b) $\cos(1000\pi t)+\sin(1200\pi t)$ |
| **T3.4** | $x(n)=\cos\frac{2\pi n}{15}-\sin\frac{2\pi n}{3}$; $y(t)$ con ganancia 1.338 a 10 Hz y alias de 50 Hz |
| **T3.5** | Paso bajo, $f_c\approx20$ Hz |
| **T3.6** | trapecio (109); $10$ (circular 100); lineal con $z_c(109)=0$ (circular 110) |
| **CT1.1** | $8\cos0.3\pi n+4\cos0.5\pi n-3\sin0.5\pi n-10\sin0.7\pi n$ |
| **CT1.2** | $\cos(1.25\pi t)$ y $\cos(18.75\pi t)$ |
| **CT1.3** | $N=48$ |
| **CT1.4** | a) no periódica; b) $N=72$ |
| **CT1.6** | Máximo $2.6$ en $n=8$ |
| **CT1.8** | $20$ Hz |
| **CT1.9** | a) $N=24$; b) no periódica |
| **CT2.1** | $\frac{1-r\cos\omega_0z^{-1}}{1-2r\cos\omega_0z^{-1}+r^2z^{-2}}$, $\lvert z\rvert>r$ |
| **CT2.2b** | ROC vacía (no existe) |
| **CT2.3** | $2[n-1+(\frac12)^n]u(n)$; $\lvert z\rvert>1$ |
| **CT2.4** | $(\frac1{\sqrt2})^n[\cos\frac{\pi n}4+3\sin\frac{\pi n}4]u(n)$; $\lvert z\rvert>\frac1{\sqrt2}$ |
| **CT2.5** | $[\frac34+\frac n2+\frac14(-1)^n]u(n)$; $\lvert z\rvert>1$; no bilateral |
| **CT2.6** | $\sum na^n=\frac{a}{(1-a)^2}$ |
| **CT2.7** | a) $\lvert z\rvert>\frac14$; b) $\lvert z\rvert<2$ |
| **CT2.8** | $[4(0.75)^n-3]u(-n)$ |
| **CT3.1** | Triángulo recortado en $\lvert F\rvert=2.5$ kHz |
| **CT3.3** | $\cos10\pi t+\cos20\pi t+\cos24\pi t$ |

---

## 9. Errores típicos

- **Periodicidad:** olvidar que hay que reducir la fracción $f=k/N$ antes de tomar $N$; y creer que *toda* suma de sinusoides discretas es periódica (si alguna es irracional, no lo es).
- **$x(n^2-2n+1)$:** tratarlo como un desplazamiento; es una transformación **no inyectiva** (se evalúa $x$ en $(n-1)^2$).
- **Alias:** calcular $f=F/F_s$ y no reducirlo al intervalo $(-\tfrac12,\tfrac12)$.
- **ROC:** dar la transformada sin ROC, o intersecar mal ($|z|>\tfrac12$ con $|z|<\tfrac13$ es **vacío**).
- **Fracciones simples:** no dividir cuando $M\ge N$ (T2.7), o no usar el término $(n+1)a^n$ para el polo doble.
- **CT2.5:** concluir que puede ser bilateral: con polos de igual módulo no hay anillo.
- **DFT:** mezclar el índice $k$ con la frecuencia: $F_k=kF_s/N$, y $k>N/2$ son frecuencias **negativas**.
- **Convolución circular:** usar $N<N_x+N_y-1$ y esperar el resultado lineal (aliasing temporal).
