# Caracterización Espectral de los Procesos Aleatorios — Teoría de la Comunicación

Resumen completo y explicado del tema (en el PDF figura como «Tema 3»): densidad espectral de potencia (PSD), sus propiedades, PSD cruzada, tipos de ruido y respuesta de un multiplicador.

## Índice

0. [Mapa del tema y notación](#0-mapa-del-tema-y-notación)
1. [Motivación: por qué no basta la transformada de Fourier](#1-motivación-por-qué-no-basta-la-transformada-de-fourier)
2. [Construcción de la PSD paso a paso](#2-construcción-de-la-psd-paso-a-paso)
3. [Definición y potencia media (consecuencias C1–C3)](#3-definición-y-potencia-media-consecuencias-c1c3)
4. [Propiedades de la PSD](#4-propiedades-de-la-psd)
5. [Teorema de Wiener-Khinchin](#5-teorema-de-wiener-khinchin)
6. [Ancho de banda eficaz](#6-ancho-de-banda-eficaz)
7. [Densidad de potencia espectral cruzada](#7-densidad-de-potencia-espectral-cruzada)
8. [Tipos de ruido](#8-tipos-de-ruido)
9. [Respuesta de un multiplicador a una señal aleatoria](#9-respuesta-de-un-multiplicador-a-una-señal-aleatoria)
10. [Tabla de pares de transformadas útiles](#10-tabla-de-pares-de-transformadas-útiles)
11. [Ejercicios resueltos](#11-ejercicios-resueltos)
12. [Banco de preguntas con respuesta modelo](#12-banco-de-preguntas-con-respuesta-modelo)
13. [Errores típicos y erratas de las diapositivas](#13-errores-típicos-y-erratas-de-las-diapositivas)
14. [Formulario resumen](#14-formulario-resumen)

> Los apartados marcados como **(complemento)** no están literalmente en las diapositivas, pero se deducen de ellas y ayudan a entender o a resolver ejercicios.

---

## 0. Mapa del tema y notación

**Dos bloques:**

| Bloque | Contenido |
|---|---|
| T3.1 Análisis espectral | PSD, propiedades, Wiener-Khinchin, ancho de banda eficaz, PSD cruzada |
| T3.2 Tipos de ruido | Ruido blanco, blanco de banda limitada (paso bajo y paso banda), coloreado, y salida de un multiplicador |

**Hilo conductor.** Hasta ahora has descrito procesos en el **tiempo** (media, autocorrelación, covarianza). Este tema los describe en la **frecuencia**: cómo se reparte la **potencia** del proceso entre las frecuencias.

**Notación:**

| Símbolo | Significado |
|---|---|
| $x(t)$ | Proceso aleatorio (o una realización, según contexto) |
| $x_T(t)$ | Proceso truncado a $(-T,T)$ (vale $0$ fuera) |
| $X_T(\omega)$ | Transformada de Fourier de $x_T(t)$ |
| $A\{\cdot\}$ | **Promedio temporal**: $A\{g(t)\}=\displaystyle\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}g(t)\,dt$ |
| $E[\cdot]$ | **Esperanza estadística** (promedio sobre realizaciones) |
| $S_X(\omega)$ | PSD de $X$ (en rad/s) |
| $P_X$ | Potencia media del proceso |
| $R_X(t,t+\tau)$ | Autocorrelación $E[x(t)\,x(t+\tau)]$ |

> **Convenio de frecuencia.** El tema usa $\omega$ (rad/s) y la potencia es $P_X=\frac1{2\pi}\int S_X(\omega)\,d\omega$. Si prefieres hercios, $S_X(f)\equiv S_X(\omega=2\pi f)$ y $P_X=\int S_X(f)\,df$. En la práctica de MATLAB se usó $f$ en Hz y tiempo discreto.

---

## 1. Motivación: por qué no basta la transformada de Fourier

**Señal determinista $x(t)$.** Su espectro es la transformada de Fourier:

$$X(\omega)=\int_{-\infty}^{\infty}x(t)\,e^{-j\omega t}\,dt,\qquad x(t)=\frac1{2\pi}\int_{-\infty}^{\infty}X(\omega)\,e^{j\omega t}\,d\omega$$

- $X(\omega)$ es el **espectro de densidad de tensión**: contiene **amplitudes y fases** de las componentes frecuenciales (unidades: voltios/hercio si $x$ es tensión).
- $x(t)$ y $X(\omega)$ se **describen mutuamente por completo**.

**Proceso aleatorio $x(t)$.** Aquí esto **no es viable**:

1. La transformada $X(\omega)$ **puede no existir** para la mayoría de las funciones muestra (un proceso estacionario dura «para siempre», tiene energía infinita y no es absolutamente integrable).
2. Aunque existiera, cada realización daría un espectro distinto: ¿cuál representa al proceso?

**Solución.** Describir la **potencia** del proceso en función de la frecuencia. Esa **sí existe siempre**. Se llama:

- **Densidad espectral de potencia (PSD)**, también *espectro de densidad de potencia* o *espectro de potencia*.

> Intuición: la fase se pierde (la PSD no distingue fases), pero se conserva «cuánta potencia hay en cada frecuencia», que es lo relevante para el ruido y para calcular qué pasa al filtrar.

---

## 2. Construcción de la PSD paso a paso

### Paso 1: truncar la señal

Se toma la porción de $x(t)$ entre $-T$ y $T$:

$$x_T(t)=\begin{cases}x(t),&-T<t<T\\0,&\text{resto}\end{cases}$$

Con $T$ **finito** y variación limitada ($\int_{-T}^{T}\lvert x(t)\rvert dt<\infty$), **su transformada de Fourier existe**:

$$X_T(\omega)=\int_{-T}^{T}x(t)\,e^{-j\omega t}\,dt$$

### Paso 2: energía en $(-T,T)$

$$E(T)=\int_{-\infty}^{\infty}x_T(t)^2\,dt=\int_{-T}^{T}x(t)^2\,dt$$

### Paso 3: teorema de Parseval

La energía en el tiempo es la energía en frecuencia:

$$E(T)=\int_{-T}^{T}x(t)^2\,dt=\frac1{2\pi}\int_{-\infty}^{\infty}\lvert X_T(\omega)\rvert^2\,d\omega$$

### Paso 4: pasar a potencia

Potencia = energía / duración. Dividiendo entre $2T$:

$$P(T)=\frac1{2T}\int_{-T}^{T}x_T(t)^2\,dt=\frac1{2\pi}\int_{-\infty}^{\infty}\frac{\lvert X_T(\omega)\rvert^2}{2T}\,d\omega$$

El integrando $\lvert X_T(\omega)\rvert^2/2T$ ya es una densidad de potencia por frecuencia, **pero todavía no es la buscada**:

| Problema | Arreglo |
|---|---|
| Describe la potencia solo del tramo $(-T,T)$, no de la función muestra completa | Hacer $T\to\infty$ |
| $P(T)$ es la potencia **de una función muestra**, no del proceso: es una **variable aleatoria** | Tomar el **valor esperado** $E[P(T)]$ |

### Paso 5: potencia media del proceso

$$P_X=\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}E[x_T(t)^2]\,dt=\frac1{2\pi}\int_{-\infty}^{\infty}\lim_{T\to\infty}\frac{E[\lvert X_T(\omega)\rvert^2]}{2T}\,d\omega$$

(se supone que se pueden intercambiar límite, integral y esperanza).

---

## 3. Definición y potencia media (consecuencias C1–C3)

### Definición de PSD

$$\boxed{S_X(\omega)=\lim_{T\to\infty}\frac{E\big[\lvert X_T(\omega)\rvert^2\big]}{2T}}$$

Es la **potencia media por unidad de frecuencia** a la frecuencia $\omega$.

### Consecuencias

**C1. La potencia media es el promedio temporal del momento de segundo orden:**

$$P_X=\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}E[x(t)^2]\,dt=A\{E[x(t)^2]\}$$

**C2. Si el proceso es WSS**, $E[x(t)^2]$ es constante (no depende de $t$), luego el promedio temporal no cambia nada:

$$P_X=E[x^2]=R_X(0)=\sigma_X^2+m_X^2$$

(potencia total = potencia de la parte aleatoria + potencia de la componente continua).

**C3. Fórmula de la potencia en frecuencia:**

$$\boxed{P_X=\frac1{2\pi}\int_{-\infty}^{\infty}S_X(\omega)\,d\omega}$$

### Interpretación física (complemento)

La potencia contenida en una banda de frecuencias positivas $[\omega_1,\omega_2]$ (con $0<\omega_1<\omega_2$) es

$$P_{[\omega_1,\omega_2]}=\frac1{2\pi}\int_{\omega_1}^{\omega_2}S_X(\omega)\,d\omega+\frac1{2\pi}\int_{-\omega_2}^{-\omega_1}S_X(\omega)\,d\omega=\frac1\pi\int_{\omega_1}^{\omega_2}S_X(\omega)\,d\omega$$

(se duplica porque el proceso real tiene la misma potencia en $\pm\omega$). Por eso es una **densidad**: la potencia sale al **integrar** sobre un intervalo de frecuencias, y a una frecuencia puntual le corresponde potencia nula salvo que haya una delta.

---

## 4. Propiedades de la PSD

Sea $S_X(\omega)=\lim\limits_{T\to\infty}\dfrac{E[\lvert X_T(\omega)\rvert^2]}{2T}$.

| # | Propiedad | Por qué |
|---|---|---|
| 1 | $S_X(\omega)\ge0$ | Es el límite de una esperanza de un módulo al cuadrado, que nunca es negativo |
| 2 | $S_X(-\omega)=S_X(\omega)$ **si $x(t)$ es real** | Si $x$ es real, $X_T(-\omega)=X_T^*(\omega)$, así que $\lvert X_T(-\omega)\rvert=\lvert X_T(\omega)\rvert$ (**par**) |
| 3 | $S_X(\omega)$ es **real** | Es el cuadrado de un módulo |
| 4 | $\dfrac1{2\pi}\displaystyle\int_{-\infty}^{\infty}S_X(\omega)\,d\omega=A\{E[x^2(t)]\}$ | Es C1+C3: el área bajo la PSD es la potencia media |
| 5 | $S_{\dot X}(\omega)=\omega^2S_X(\omega)$, con $\dot X=\dfrac{\partial x(t)}{\partial t}$ | Derivar en el tiempo multiplica la transformada por $j\omega$; al tomar módulo al cuadrado queda $\omega^2$ |
| 6 | $S_X(\omega)\;\longleftrightarrow\;A[R_X(t,t+\tau)]$ forman un **par de Fourier** | Teorema de Wiener-Khinchin (§5) |

**Detalle de la propiedad 5.** Si $x(t)\leftrightarrow X(\omega)$, entonces $\dot x(t)\leftrightarrow j\omega X(\omega)$, y $\lvert j\omega X\rvert^2=\omega^2\lvert X\rvert^2$. Consecuencia: derivar **realza las altas frecuencias** (factor $\omega^2$).

---

## 5. Teorema de Wiener-Khinchin

### 5.1 Caso general (propiedad 6)

$$\frac1{2\pi}\int_{-\infty}^{\infty}S_X(\omega)\,e^{j\omega\tau}d\omega=A\big[R_X(t,t+\tau)\big],\qquad S_X(\omega)=\int_{-\infty}^{\infty}A\big[R_X(t,t+\tau)\big]\,e^{-j\omega\tau}\,d\tau$$

con $A[R_X(t,t+\tau)]=\displaystyle\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}R_X(t,t+\tau)\,dt$.

- La **transformada inversa de la PSD** es el **promedio temporal de la autocorrelación**.
- La **transformada de Fourier del promedio temporal de la autocorrelación** es la **PSD**.
- Forman un **par de transformadas de Fourier**.

**Idea de la demostración (complemento).**

$$\lvert X_T(\omega)\rvert^2=\int_{-T}^{T}\!\!\int_{-T}^{T}x(s)\,x(t)\,e^{-j\omega(t-s)}\,ds\,dt$$

Con el cambio $\tau=t-s$ y tomando esperanza, el integrando es $R_X(s,s+\tau)\,e^{-j\omega\tau}$. Al dividir entre $2T$ y hacer $T\to\infty$, la integral en $s$ se convierte en el promedio temporal $A[R_X(s,s+\tau)]$ (la ventana triangular $1-\lvert\tau\rvert/2T$ que aparece tiende a 1), y queda la transformada de Fourier en $\tau$.

### 5.2 Caso WSS (el que más se usa)

Si $x(t)$ es **al menos WSS**, $A[R_X(t,t+\tau)]=R_X(\tau)$ (no depende de $t$), y

$$\boxed{S_X(\omega)=\int_{-\infty}^{\infty}R_X(\tau)\,e^{-j\omega\tau}\,d\tau,\qquad R_X(\tau)=\frac1{2\pi}\int_{-\infty}^{\infty}S_X(\omega)\,e^{j\omega\tau}\,d\omega}$$

**Conexiones inmediatas:**

- $R_X(0)=\dfrac1{2\pi}\displaystyle\int S_X(\omega)\,d\omega=P_X$ (potencia).
- $S_X(0)=\displaystyle\int R_X(\tau)\,d\tau$ (área bajo la autocorrelación).
- $R_X(\tau)$ real y par ⇔ $S_X(\omega)$ real y par.
- Una $R_X(\tau)$ **ancha** (correlación lenta, señal «lenta») ⇔ una $S_X$ **estrecha**; una $R_X$ **estrecha** ⇔ una $S_X$ **ancha** (dualidad tiempo-frecuencia).
- Un valor medio $m_X\neq0$ aporta a $R_X$ una constante $m_X^2$, que en la PSD es una **delta en $\omega=0$**: $2\pi m_X^2\,\delta(\omega)$.
- Un término periódico en $R_X$ (como $\cos\omega_0\tau$) aporta **deltas** en $\pm\omega_0$ (componentes sinusoidales).

**Versión discreta (la usada en la práctica de MATLAB):**

$$S_X(f)=\sum_{k=-\infty}^{\infty}R_X(k)\,e^{-j2\pi fk/f_s}=R_X(0)+2\sum_{k=1}^{\infty}R_X(k)\cos\!\left(2\pi\frac{f}{f_s}k\right)$$

---

## 6. Ancho de banda eficaz

Para un proceso **paso bajo (banda base)**: sus componentes espectrales se agrupan en torno a $\omega=0$ y el módulo decrece al aumentar la frecuencia.

$$\boxed{W_{rms}^2=\frac{\displaystyle\int_{-\infty}^{\infty}\omega^2\,S_X(\omega)\,d\omega}{\displaystyle\int_{-\infty}^{\infty}S_X(\omega)\,d\omega}}\qquad(\text{rad/s})$$

**Interpretación.** Es la **desviación típica de la frecuencia** si se ve la PSD normalizada $S_X/\int S_X$ como una pdf de la frecuencia: $W_{rms}$ mide cuánto «se extiende» el espectro alrededor de $\omega=0$ (el numerador ponderado por $\omega^2$ penaliza las frecuencias altas). La media de esa «pdf» es $0$ por ser $S_X$ par, así que $W_{rms}^2$ es su varianza.

**Relación con el tiempo (complemento).** Usando la propiedad 5 y la propiedad 4, el numerador es $2\pi E[\dot x^2]$ y el denominador $2\pi E[x^2]$, luego

$$W_{rms}^2=\frac{E[\dot x(t)^2]}{E[x(t)^2]}=-\frac{R_X''(0)}{R_X(0)}\quad(\text{WSS})$$

Cuanto más rápido varía la señal (mayor potencia de su derivada), mayor es el ancho de banda eficaz.

**Ejemplo (complemento).** Ruido blanco de banda limitada $S_X=\dfrac{P\pi}{W}$ en $\lvert\omega\rvert<W$:

$$W_{rms}^2=\frac{\int_{-W}^{W}\omega^2\,d\omega}{\int_{-W}^{W}d\omega}=\frac{2W^3/3}{2W}=\frac{W^2}{3}\;\Rightarrow\;W_{rms}=\frac{W}{\sqrt3}$$

Para ruido blanco ideal no existe ($\int\omega^2S=\infty$).

---

## 7. Densidad de potencia espectral cruzada

### 7.1 Por qué hace falta

Sea $W(t)=X(t)+Y(t)$. Su autocorrelación es

$$R_W(t,t+\tau)=R_X+R_Y+R_{XY}(t,t+\tau)+R_{YX}(t,t+\tau)$$

Aplicando $A[\cdot]$ y la transformada de Fourier:

$$S_W(\omega)=S_X(\omega)+S_Y(\omega)+\mathcal F\{A[R_{XY}]\}+\mathcal F\{A[R_{YX}]\}$$

Los dos últimos términos son las **PSD cruzadas**: lo que se añade (o resta) a la suma de potencias cuando los procesos **no son ortogonales**.

### 7.2 Definición

Sean $x_T,y_T$ las realizaciones truncadas a $(-T,T)$ de $X(t)$ e $Y(t)$, con transformadas $X_T(\omega),Y_T(\omega)$.

**Potencia cruzada de una realización:**

$$P_{XY}(T)=\frac1{2T}\int_{-T}^{T}x(t)\,y(t)\,dt=\frac1{2\pi}\int_{-\infty}^{\infty}\frac{X_T^*(\omega)\,Y_T(\omega)}{2T}\,d\omega$$

(Parseval generalizado). Tomando esperanza y $T\to\infty$:

$$P_{XY}=\lim_{T\to\infty}\frac1{2T}\int_{-T}^{T}R_{XY}(t,t)\,dt=\frac1{2\pi}\int_{-\infty}^{\infty}S_{XY}(\omega)\,d\omega$$

**PSD cruzada:**

$$\boxed{S_{XY}(\omega)=\lim_{T\to\infty}\frac{E\big[X_T^*(\omega)\,Y_T(\omega)\big]}{2T}},\qquad S_{YX}(\omega)=\lim_{T\to\infty}\frac{E\big[Y_T^*(\omega)\,X_T(\omega)\big]}{2T}$$

con potencias cruzadas $P_{XY}=\frac1{2\pi}\int S_{XY}\,d\omega$ y $P_{YX}=\frac1{2\pi}\int S_{YX}\,d\omega$.

**Interpretación.** $P_{XY}+P_{YX}$ es la **potencia adicional** que dos procesos pueden generar sobre sus potencias individuales **porque no son ortogonales**. Sin interacción, $P_W=P_X+P_Y$.

### 7.3 Propiedades

| # | Propiedad |
|---|---|
| 1 | $S_{XY}(\omega)=S_{XY}^*(-\omega)=S_{YX}^*(\omega)$ (para procesos reales). Por tanto $S_{YX}(\omega)=S_{XY}(-\omega)$ |
| 2 | $S_{XY}(\omega)=0$ y $S_{YX}(\omega)=0$ si $X(t)$ e $Y(t)$ son **ortogonales** |
| 3 | Si son **no correlados** con medias constantes $m_X,m_Y$: $S_{XY}(\omega)=S_{YX}(\omega)=2\pi\,m_Xm_Y\,\delta(\omega)$ |
| 4 | $A[R_{XY}(t,t+\tau)]$ y $A[R_{YX}(t,t+\tau)]$ forman un par de Fourier con $S_{XY}$ y $S_{YX}$ respectivamente |
| 5 | Si son **conjuntamente WSS**, $R_{XY}(\tau)$ y $R_{YX}(\tau)$ forman un par de Fourier con $S_{XY}(\omega)$ y $S_{YX}(\omega)$ |

**Por qué la propiedad 3.** No correlados implica $R_{XY}(t,t+\tau)=E[X(t)]\,E[Y(t+\tau)]=m_Xm_Y$ (constante). La transformada de una constante es una delta: $\mathcal F\{m_Xm_Y\}=2\pi m_Xm_Y\,\delta(\omega)$. Solo existe cruce en continua.

**Caso práctico (suma de procesos).** Si $X,Y$ son no correlados:

$$S_W(\omega)=S_X(\omega)+S_Y(\omega)+4\pi\,m_Xm_Y\,\delta(\omega),\qquad P_W=P_X+P_Y+2m_Xm_Y$$

- Si además tienen **media cero**: $S_W=S_X+S_Y$ (las potencias se suman).
- Más en general, **ortogonales** ⇒ $S_W=S_X+S_Y$.
- Ojo: *no correlados con media cero* ⇒ ortogonales, pero *no correlados con media no nula* **no** son ortogonales ($R_{XY}=m_Xm_Y\neq0$).

---

## 8. Tipos de ruido

**Objetivos:** (1) definir dos tipos de ruido según su PSD (blanco y coloreado), y (2) analizar el multiplicador con una entrada aleatoria (§9).

### 8.1 Ruido blanco

Un proceso WSS $N(t)$ es **ruido blanco** si su PSD es **constante a todas las frecuencias**:

$$S_N(\omega)=\frac{N_0}{2}\quad(N_0>0\text{ constante real})\qquad\Longrightarrow\qquad R_N(\tau)=\frac{N_0}{2}\,\delta(\tau)$$

**Qué significa:**

- Nombre por analogía con la **luz blanca** (contiene todas las frecuencias visibles por igual).
- $R_N(\tau)=0$ para todo $\tau\neq0$: **muestras incorreladas por muy próximas que estén**. Si además es gaussiano, son **independientes** (ruido blanco gaussiano, AWGN).
- Potencia media **infinita**:

$$P_N=\frac1{2\pi}\int_{-\infty}^{\infty}\frac{N_0}2\,d\omega=\infty$$

  Por eso **no existe físicamente**; es un **modelo** válido cuando el ancho de banda del ruido es mucho mayor que el del sistema que lo observa.
- Al pasar por un sistema de ancho de banda finito la potencia es finita. Ejemplo (complemento): tras un filtro ideal paso banda de ancho $B$ Hz (una sola banda positiva), la potencia es $\frac{N_0}2\cdot2B=N_0B$.

**Ejemplo real: ruido térmico** (agitación de electrones en un conductor). Su PSD es

$$S_N(\omega)=\frac{N_0}{2}\cdot\frac{\alpha\lvert\omega\rvert/T}{e^{\alpha\lvert\omega\rvert/T}-1}$$

donde $\alpha$ es una constante y $T$ la **temperatura** (¡no confundir con la $T$ de la ventana!).

- Para $\omega$ pequeña el cociente $\to1$ y $S_N\approx N_0/2$: **constante**.
- A $T=290$ K permanece constante en todo el rango de **radio, microondas y ondas milimétricas**, y solo decae a frecuencias altísimas. Por eso se modela como blanco.
- (Complemento) $\alpha=\hbar/k_B$ y la frecuencia de decaimiento es $\omega\sim k_BT/\hbar$, del orden de los THz a 290 K.

### 8.2 Ruido blanco de banda limitada (paso bajo)

PSD constante y no nula solo en una banda finita, cero fuera:

$$S_N(\omega)=\begin{cases}\dfrac{P\pi}{W},&-W<\omega<W\\[4pt]0,&\text{resto}\end{cases}\qquad\Longrightarrow\qquad R_N(\tau)=P\,\frac{\sin(W\tau)}{W\tau}$$

- $P$ es la **potencia** del ruido: $P=\frac1{2\pi}\cdot\frac{P\pi}{W}\cdot2W=P$ ✔, y $R_N(0)=P$ ✔.
- Ancho de banda $W$ rad/s ($B=W/2\pi$ Hz).
- (Complemento) $R_N(\tau)$ se anula en $\tau=k\pi/W$, $k=\pm1,\pm2,\dots$ Es decir, **las muestras separadas $\pi/W=1/(2B)$ son incorreladas** (y, si el ruido es gaussiano, independientes). Es el intervalo de Nyquist.
- Cuando $W\to\infty$ con $P/W$ fijo se recupera el ruido blanco ideal.

### 8.3 Ruido blanco de banda limitada paso banda

Mismo nivel de PSD, pero la banda está centrada en $\pm\omega_0$ con ancho $W$:

$$S_N(\omega)=\begin{cases}\dfrac{P\pi}{W},&\omega_0-\dfrac W2<\lvert\omega\rvert<\omega_0+\dfrac W2\\[4pt]0,&\text{resto}\end{cases}\qquad\Longrightarrow\qquad R_N(\tau)=P\,\frac{\sin(W\tau/2)}{W\tau/2}\,\cos(\omega_0\tau)$$

- Potencia total $P$ (dos bandas de ancho $W$: $\frac1{2\pi}\cdot\frac{P\pi}{W}\cdot2W=P$ ✔).
- La autocorrelación es la del caso paso bajo (con $W/2$) **modulada por un coseno de frecuencia $\omega_0$**: la envolvente $\text{sinc}$ da el ancho de banda y el coseno da la frecuencia central.

### 8.4 Ruido coloreado

Es **cualquier ruido que no sea blanco**: su PSD **no es constante**. Por analogía con la luz coloreada, que solo contiene parte de las frecuencias visibles.

- Su autocorrelación **no es una delta**: las muestras están **correladas**.
- Se obtiene típicamente **filtrando ruido blanco**: $S_{out}(\omega)=\lvert H(\omega)\rvert^2\,\dfrac{N_0}2$.
- Ejemplos: los de banda limitada (§8.2 y §8.3) y el AR(1) de la práctica de MATLAB, $S(\omega)=\sigma_w^2/(1.49-1.4\cos\omega)$ (paso bajo).
- (Complemento) Ruido rosa o $1/f$: PSD $\propto1/\lvert\omega\rvert$.

### 8.5 Resumen comparativo

| Tipo | $S_N(\omega)$ | $R_N(\tau)$ | Potencia |
|---|---|---|---|
| Blanco | $N_0/2$ (constante) | $\frac{N_0}2\delta(\tau)$ | $\infty$ |
| Blanco banda limitada (paso bajo) | $P\pi/W$ en $\lvert\omega\rvert<W$ | $P\,\text{sinc}$: $P\frac{\sin W\tau}{W\tau}$ | $P$ |
| Blanco banda limitada (paso banda) | $P\pi/W$ en $\lvert\lvert\omega\rvert-\omega_0\rvert<W/2$ | $P\frac{\sin(W\tau/2)}{W\tau/2}\cos\omega_0\tau$ | $P$ |
| Coloreado | no constante | no es delta | finita |

---

## 9. Respuesta de un multiplicador a una señal aleatoria

Los multiplicadores aparecen constantemente (modulación, mezcladores). Multiplican una forma de onda $X(t)$ (señal, ruido o suma) por una **portadora** coseno:

$$Y(t)=X(t)\,A_0\cos(\omega_0t)\qquad(A_0,\omega_0\text{ constantes})$$

**Pregunta:** ¿qué PSD tiene $Y(t)$ en función de la de $X(t)$?

### 9.1 Autocorrelación de $Y$

$$R_Y(t,t+\tau)=E[Y(t)\,Y(t+\tau)]=A_0^2\,R_X(t,t+\tau)\,\cos(\omega_0t)\cos(\omega_0t+\omega_0\tau)$$

Con $\cos a\cos b=\tfrac12[\cos(a-b)+\cos(a+b)]$:

$$R_Y(t,t+\tau)=\frac{A_0^2}{2}\,R_X(t,t+\tau)\,\Big[\cos(\omega_0\tau)+\cos(2\omega_0t+\omega_0\tau)\Big]$$

**Aunque $X(t)$ sea WSS, $Y(t)$ NO lo es**: $R_Y$ depende de $t$ por el segundo coseno. (Es **cicloestacionario**: $R_Y$ y la media $m_Y(t)=A_0m_X\cos\omega_0t$ son periódicas en $t$.) La PSD sigue definiéndose porque se usa el **promedio temporal** de la autocorrelación.

### 9.2 Promedio temporal

El término $\cos(2\omega_0t+\omega_0\tau)$ oscila con $t$ y su promedio es $0$. Con $X$ WSS ($R_X(t,t+\tau)=R_X(\tau)$):

$$A[R_Y(t,t+\tau)]=\frac{A_0^2}{2}\,R_X(\tau)\cos(\omega_0\tau)$$

### 9.3 PSD de la salida

Una multiplicación por $\cos(\omega_0\tau)=\frac12(e^{j\omega_0\tau}+e^{-j\omega_0\tau})$ en el tiempo desplaza la transformada $\pm\omega_0$:

$$\boxed{S_Y(\omega)=\frac{A_0^2}{4}\Big[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)\Big]}$$

**Interpretación:**

- El espectro de $X$ se **traslada** a $+\omega_0$ y a $-\omega_0$ (**dos réplicas**), cada una **escalada por $A_0^2/4$**.
- Es la base de la **modulación en amplitud**: lleva una señal de banda base a banda de paso.
- **Potencia de salida:** cada réplica tiene área $\frac{A_0^2}{4}\cdot2\pi P_X/\ldots$; en total

$$P_Y=\frac1{2\pi}\int S_Y\,d\omega=\frac{A_0^2}{4}\cdot2P_X=\frac{A_0^2}{2}\,P_X$$

  (la mitad de $A_0^2$ porque el valor cuadrático medio de $\cos\omega_0t$ es $\tfrac12$). Coincide con $E[Y^2]$ promediado: $A_0^2\,P_X\,A\{\cos^2\omega_0t\}=A_0^2P_X/2$ ✔.
- **Si $X$ es paso bajo de ancho $W$**, $Y$ es **paso banda** centrada en $\omega_0$ y de ancho $2W$ (cada réplica ocupa $\omega_0-W<\omega<\omega_0+W$). Las réplicas no se solapan si $\omega_0>W$.

**Ejemplo con ruido de banda limitada** (§11, ejercicio 5): al multiplicar ruido blanco paso bajo por una portadora se obtiene ruido paso banda.

**(Complemento) Fase aleatoria.** Si la portadora fuese $A_0\cos(\omega_0t+\Theta)$ con $\Theta\sim U(0,2\pi)$ independiente de $X$, entonces $R_Y(t,t+\tau)=\frac{A_0^2}{2}R_X(\tau)\cos(\omega_0\tau)$ **sin** término dependiente de $t$, y $Y$ sí sería WSS con la misma $S_Y$. Es la razón de que en teoría de la comunicación se asuma fase aleatoria uniforme.

---

## 10. Tabla de pares de transformadas útiles

Con $S(\omega)=\int R(\tau)e^{-j\omega\tau}d\tau$:

| $R_X(\tau)$ | $S_X(\omega)$ | Observación |
|---|---|---|
| $\delta(\tau)$ | $1$ | Blanco |
| $\dfrac{N_0}{2}\delta(\tau)$ | $\dfrac{N_0}{2}$ | Ruido blanco |
| $c$ (constante) | $2\pi c\,\delta(\omega)$ | Continua: $c=m_X^2$ |
| $\cos(\omega_0\tau)$ | $\pi[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$ | Sinusoide |
| $P\,\dfrac{\sin W\tau}{W\tau}$ | $\dfrac{P\pi}{W}$ en $\lvert\omega\rvert<W$ | Banda limitada paso bajo |
| $\sigma^2e^{-\alpha\lvert\tau\rvert}$ | $\dfrac{2\alpha\sigma^2}{\alpha^2+\omega^2}$ | Exponencial (lorentziana) |
| $R(\tau)\cos(\omega_0\tau)$ | $\tfrac12[S(\omega-\omega_0)+S(\omega+\omega_0)]$ | Modulación |

---

## 11. Ejercicios resueltos

### Ejercicio 1: PSD de un proceso con autocorrelación exponencial

$X(t)$ WSS con $R_X(\tau)=\sigma^2e^{-\alpha\lvert\tau\rvert}$, $\alpha>0$. Calcula $S_X(\omega)$ y la potencia.

$$S_X(\omega)=\sigma^2\int_{-\infty}^{\infty}e^{-\alpha\lvert\tau\rvert}e^{-j\omega\tau}d\tau=\sigma^2\left[\frac{1}{\alpha-j\omega}+\frac1{\alpha+j\omega}\right]=\frac{2\alpha\sigma^2}{\alpha^2+\omega^2}$$

Es paso bajo (máximo en $\omega=0$, valor $2\sigma^2/\alpha$). Potencia: $P_X=R_X(0)=\sigma^2$. Comprobación: $\frac1{2\pi}\int\frac{2\alpha\sigma^2}{\alpha^2+\omega^2}d\omega=\frac{1}{2\pi}\cdot2\alpha\sigma^2\cdot\frac\pi\alpha=\sigma^2$ ✔. Cuanto mayor es $\alpha$ (correlación que decae antes), **más ancha** es la PSD.

### Ejercicio 2: sinusoide de fase aleatoria

$X(t)=A\cos(\omega_0t+\Theta)$, $\Theta\sim U(0,2\pi)$. Calcula $R_X$, $S_X$ y $P_X$.

$$R_X(\tau)=\frac{A^2}{2}\cos(\omega_0\tau)\;\Rightarrow\;S_X(\omega)=\frac{\pi A^2}{2}\big[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)\big]$$

$$P_X=R_X(0)=\frac{A^2}2=\frac1{2\pi}\cdot\frac{\pi A^2}{2}\cdot2$$

La PSD son dos **deltas**: toda la potencia está en una única frecuencia.

### Ejercicio 3: proceso con media no nula

$X(t)=m+N(t)$, $N$ de media cero, PSD $S_N(\omega)$. Halla $S_X$.

$R_X(\tau)=m^2+R_N(\tau)$ ⇒ $S_X(\omega)=2\pi m^2\delta(\omega)+S_N(\omega)$. La media produce una **delta en continua** de área $2\pi m^2$ (potencia $m^2$) y el resto es la PSD del ruido.

### Ejercicio 4: suma de procesos con media

$X,Y$ no correlados, $m_X=2$, $m_Y=-1$, $S_X,S_Y$ conocidas. Halla $S_W$ y $P_W$ para $W=X+Y$.

$$S_W=S_X+S_Y+4\pi\,m_Xm_Y\,\delta(\omega)=S_X+S_Y-8\pi\,\delta(\omega),\qquad P_W=P_X+P_Y+2m_Xm_Y=P_X+P_Y-4$$

(las medias son de signo opuesto, así que la potencia total **disminuye**). Si fueran de media cero no habría término cruzado.

### Ejercicio 5: multiplicador con ruido de banda limitada

$X(t)$ es ruido blanco paso bajo con $S_X=\dfrac{P\pi}{W}$ en $\lvert\omega\rvert<W$. Se multiplica por $2\cos(\omega_0t)$ con $\omega_0=10W$. Halla $S_Y$ y $P_Y$.

$A_0=2$, así que $A_0^2/4=1$:

$$S_Y(\omega)=S_X(\omega-\omega_0)+S_X(\omega+\omega_0)$$

Resultado: nivel $\dfrac{P\pi}{W}$ en las bandas $9W<\lvert\omega\rvert<11W$ (cada una de ancho $2W$) y cero fuera. Potencia:

$$P_Y=\frac{A_0^2}{2}P_X=2P\quad\Big(=\tfrac1{2\pi}\cdot\tfrac{P\pi}{W}\cdot4W=2P\ \checkmark\Big)$$

### Ejercicio 6: ancho de banda eficaz

Con $S_X=\dfrac{2\alpha\sigma^2}{\alpha^2+\omega^2}$ (ejercicio 1), ¿cuánto vale $W_{rms}$?

$\int\omega^2S_X\,d\omega$ **diverge** (el integrando tiende a una constante para $\omega\to\infty$), luego $W_{rms}=\infty$. Concuerda con $W_{rms}^2=-R_X''(0)/R_X(0)$: $R_X(\tau)=\sigma^2e^{-\alpha\lvert\tau\rvert}$ tiene un vértice en $\tau=0$ y no es derivable (el proceso no es derivable: potencia de $\dot X$ infinita).

### Ejercicio 7: potencia en una banda

Para el ejercicio 1, ¿qué fracción de la potencia está en $\lvert\omega\rvert<\alpha$?

$$\frac{\frac1{2\pi}\int_{-\alpha}^{\alpha}\frac{2\alpha\sigma^2}{\alpha^2+\omega^2}d\omega}{\sigma^2}=\frac{1}{\pi}\cdot2\arctan(1)=\frac12$$

La mitad de la potencia está en $\lvert\omega\rvert<\alpha$.

---

## 12. Banco de preguntas con respuesta modelo

**1. ¿Por qué no se usa la transformada de Fourier para describir un proceso aleatorio?**
Porque puede no existir para la mayoría de las funciones muestra y, aunque existiese, cada realización tendría un espectro distinto. Se usa la PSD, que describe la potencia y sí existe siempre.

**2. Define la PSD.**
$S_X(\omega)=\lim_{T\to\infty}E[\lvert X_T(\omega)\rvert^2]/(2T)$: potencia media por unidad de frecuencia, con $X_T$ la transformada de la señal truncada a $(-T,T)$.

**3. ¿Por qué se toma esperanza y límite en la definición?**
El límite $T\to\infty$ abarca la función muestra completa; la esperanza se necesita porque la potencia de una realización es una variable aleatoria y se quiere la del proceso.

**4. ¿Qué es la potencia media de un proceso y cómo se calcula?**
$P_X=A\{E[x^2]\}$; si es WSS, $P_X=R_X(0)$. En frecuencia, $P_X=\frac1{2\pi}\int S_X\,d\omega$.

**5. Enumera las propiedades de la PSD.**
No negativa, par si $x$ es real, real, su área da la potencia, $S_{\dot X}=\omega^2S_X$ y par de Fourier con el promedio temporal de la autocorrelación.

**6. ¿Qué dice Wiener-Khinchin?**
La PSD es la transformada de Fourier de la autocorrelación (promediada en el tiempo; igual a $R_X(\tau)$ si WSS).

**7. ¿Qué ocurre con un proceso de media no nula?**
Su PSD tiene una delta en $\omega=0$ de área $2\pi m_X^2$.

**8. ¿Qué relación hay entre el ancho de la autocorrelación y el de la PSD?**
Son inversos: una autocorrelación estrecha da una PSD ancha y viceversa.

**9. ¿Qué mide $W_{rms}$ y para qué procesos se define?**
Mide la dispersión de la PSD en torno a $\omega=0$ (desviación típica de la frecuencia); se define para procesos paso bajo.

**10. ¿Qué es la PSD cruzada y cuándo es nula?**
$S_{XY}=\lim E[X_T^*Y_T]/2T$; es nula si los procesos son ortogonales.

**11. ¿Cuánto vale la PSD cruzada de dos procesos no correlados con medias constantes?**
$2\pi\,m_Xm_Y\,\delta(\omega)$.

**12. ¿Qué significa $P_{XY}+P_{YX}$?**
La potencia extra que aparece al sumar los procesos por no ser ortogonales.

**13. ¿Qué es el ruido blanco, y por qué no existe físicamente?**
Un proceso WSS con PSD constante $N_0/2$ y autocorrelación $\frac{N_0}2\delta(\tau)$. Tendría potencia infinita; es un modelo válido cuando su ancho de banda supera mucho al del sistema.

**14. ¿Qué es el ruido coloreado?**
Cualquier ruido con PSD no constante; sus muestras están correladas.

**15. ¿Qué espectro tiene la salida de un multiplicador por una portadora?**
$S_Y(\omega)=\frac{A_0^2}{4}[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)]$: dos réplicas desplazadas $\pm\omega_0$. Aunque $X$ sea WSS, $Y$ no lo es, pero su PSD existe usando el promedio temporal de $R_Y$.

---

## 13. Errores típicos y erratas de las diapositivas

**Errores típicos de examen**

1. Escribir $P_X=\frac1{2\pi}\int S\,d\omega$ sin el $\frac1{2\pi}$ (con $\omega$ en rad/s). Si se integra en $f$ no lleva factor.
2. Confundir $A\{\cdot\}$ (promedio **temporal**) con $E[\cdot]$ (promedio **estadístico**).
3. Decir que $Y=X\cdot A_0\cos\omega_0t$ es WSS si $X$ lo es. No lo es; solo su PSD se define por el promedio temporal.
4. Olvidar el factor $\frac{A_0^2}{4}$ (y no $\frac{A_0^2}{2}$ ni $A_0$) en $S_Y$.
5. Pensar que el ruido blanco tiene potencia finita, o que sus muestras próximas son «casi iguales» (son incorreladas).
6. Confundir «no correlados» con «ortogonales»: coinciden solo si alguna media es cero.
7. Olvidar la delta en $\omega=0$ cuando hay media no nula.
8. Dar $S_X(\omega)$ con valores negativos o complejos (siempre es real y $\ge0$).

**Erratas en las diapositivas** (conviene saberlas para no copiarlas)

| Diapositiva | Aparece | Correcto |
|---|---|---|
| 15 (PSD cruzada) | $S_{XY}(\omega)=\lim\ldots\,d\omega$ | La definición **no** lleva $d\omega$ |
| 30 (multiplicador) | $A[R_Y]=\frac{A_0}{2}R_X(\tau)\cos(\omega_0\tau)$ | $\frac{A_0^2}{2}$ (cuadrado) |
| 30 (multiplicador) | $R_Y=\frac{A_0^2}2R_X[\cos(\omega_0t)+\cos(2\omega_0t+\omega_0\tau)]$ | El primer coseno es $\cos(\omega_0\tau)$, no de $t$ |
| 22 (ruido térmico) | $T$ en la fórmula | Es la **temperatura**, distinta de la $T$ de la ventana |
| Portada | «Tema 3» | Es el mismo tema que tu archivo llama T2 |

---

## 14. Formulario resumen

$$S_X(\omega)=\lim_{T\to\infty}\frac{E[\lvert X_T(\omega)\rvert^2]}{2T}\qquad P_X=\frac1{2\pi}\int S_X\,d\omega=A\{E[x^2]\}\;\stackrel{\text{WSS}}{=}\;R_X(0)$$

$$S_X(\omega)=\int R_X(\tau)e^{-j\omega\tau}d\tau\quad(\text{WSS})\qquad S_{\dot X}=\omega^2S_X\qquad W_{rms}^2=\frac{\int\omega^2S_X}{\int S_X}$$

$$S_{XY}=\lim\frac{E[X_T^*Y_T]}{2T}\qquad S_W=S_X+S_Y+S_{XY}+S_{YX}\qquad \text{no correlados: }S_{XY}=2\pi m_Xm_Y\delta(\omega)$$

| Ruido | $S_N$ | $R_N$ |
|---|---|---|
| Blanco | $\dfrac{N_0}{2}$ | $\dfrac{N_0}{2}\delta(\tau)$ |
| Banda limitada paso bajo | $\dfrac{P\pi}{W}$, $\lvert\omega\rvert<W$ | $P\dfrac{\sin W\tau}{W\tau}$ |
| Banda limitada paso banda | $\dfrac{P\pi}{W}$, $\omega_0-\frac W2<\lvert\omega\rvert<\omega_0+\frac W2$ | $P\dfrac{\sin(W\tau/2)}{W\tau/2}\cos\omega_0\tau$ |

$$Y(t)=X(t)A_0\cos\omega_0t\;\Rightarrow\;A[R_Y]=\frac{A_0^2}2R_X(\tau)\cos\omega_0\tau,\qquad S_Y(\omega)=\frac{A_0^2}4\big[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)\big],\qquad P_Y=\frac{A_0^2}{2}P_X$$

**Salida de un filtro LTI (enlace con la práctica):** $S_Y(\omega)=\lvert H(\omega)\rvert^2S_X(\omega)$.
