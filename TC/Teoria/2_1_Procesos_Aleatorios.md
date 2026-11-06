# Procesos Aleatorios — Teoría de la Comunicación

Resumen del Tema 2: caracterización, estacionariedad y ergodicidad, procesos gaussianos y procesos de Markov.

## Índice

1. [Concepto y caracterización de un proceso aleatorio](#1-concepto-y-caracterización-de-un-proceso-aleatorio)
2. [Estacionariedad y ergodicidad](#2-estacionariedad-y-ergodicidad)
3. [Procesos gaussianos](#3-procesos-gaussianos)
4. [Procesos de Markov](#4-procesos-de-markov)
5. [Mapa conceptual](#5-mapa-conceptual)

---

## 1. Concepto y caracterización de un proceso aleatorio

### 1.1 Definición

Un **proceso aleatorio** (o estocástico) extiende la variable aleatoria incorporando **dependencia temporal**: a cada salida $\xi$ del experimento se le asigna una **función del tiempo**, no solo un número.

$$X(t,\xi),\qquad t\in I$$

- Variable aleatoria: $\omega\to X(\omega)$
- Proceso aleatorio: $\omega\to X(t,\omega)$

Es una **familia indexada de variables aleatorias** $\{X(t,\xi),\,t\in I\}$:

- **Discreto en el tiempo:** $I$ contable (se escribe $X_n$).
- **Continuo en el tiempo:** $I$ continuo (p. ej. $\mathbb{R}^+$).

### 1.2 Las cuatro lecturas de $X(t,\xi)$

| Notación | Qué está fijo | Qué resulta |
|---|---|---|
| $X(t,\xi)$ | nada | el proceso completo |
| $X(t_i,\xi_j)$ | $t$ y $\xi$ | un **número** |
| $X(t,\xi_i)$ | el resultado $\xi_i$ | una **función muestra** (realización) $x_i(t)$ |
| $X(t_i,\xi)$ | el instante $t_i$ | una **variable aleatoria** |

*Ejemplo:* $X(t)=\xi\cos(2\pi t)$ con $\xi$ aleatoria. Cada valor de $\xi$ ($0.6$, $-0.2$, $0.9,\dots$) da una función muestra distinta: misma forma, distinta amplitud.

### 1.3 Especificación completa

Muestreando en $t_1,\dots,t_k$ se obtiene el vector aleatorio $(X_1,\dots,X_k)$. Un proceso queda **completamente especificado** por la colección de CDFs conjuntas de orden $k$ para **todo** $k$ y **toda** elección de instantes:

$$F_{X_1,\dots,X_k}(x_1,\dots,x_k)=P[X_1\le x_1,\dots,X_k\le x_k]$$

(pmf conjunta en procesos discretos, pdf conjunta en continuos). Las CDFs de orden inferior deben obtenerse como marginales de las de orden superior (**consistencia**).

> Esta especificación es muy restrictiva y casi nunca se dispone de ella; por eso se usa una caracterización **parcial** mediante momentos.

### 1.4 Momentos de las muestras

| Magnitud | Definición |
|---|---|
| Media | $m_X(t)=E[X(t)]$ |
| Autocorrelación | $R_X(t_1,t_2)=E[X(t_1)\,X(t_2)]$ |
| Autocovarianza | $C_X(t_1,t_2)=E\big[\{X(t_1)-m_X(t_1)\}\{X(t_2)-m_X(t_2)\}\big]=R_X(t_1,t_2)-m_X(t_1)\,m_X(t_2)$ |
| Varianza | $\text{var}[X(t)]=C_X(t,t)$ |
| Coef. de correlación | $\rho_X(t_1,t_2)=\dfrac{C_X(t_1,t_2)}{\sqrt{C_X(t_1,t_1)}\,\sqrt{C_X(t_2,t_2)}}$, con $\lvert\rho_X\rvert\le1$ |

$\rho_X$ mide hasta qué punto una muestra se puede predecir con una función **lineal** de la otra.

> Media, autocorrelación y autocovarianza son solo descripciones **parciales**: dos procesos muy distintos pueden compartirlas.

### 1.5 Procesos i.i.d.

$X_n$ con v.a. independientes e idénticamente distribuidas (CDF común $F_X$, media $m$, varianza $\sigma^2$):

$$F_{X_1,\dots,X_k}(x_1,\dots,x_k)=F_X(x_1)\cdots F_X(x_k)$$

- $m_X(n)=m\;\;\forall n$
- $C_X(n_1,n_2)=\sigma^2\,\delta_{n_1,n_2}$ (vale $\sigma^2$ si $n_1=n_2$ y $0$ en otro caso, por independencia)
- $R_X(n_1,n_2)=C_X(n_1,n_2)+m^2$

### 1.6 Procesos múltiples

El comportamiento conjunto de $X(t)$ e $Y(t)$ exige especificar las distribuciones conjuntas de $X(t_1),\dots,X(t_k)$ e $Y(t_1'),\dots,Y(t_j')$ para todo $k,j$ y cualesquiera instantes.

- **Independientes:** esos vectores son independientes para toda elección.
- **Correlación cruzada:** $R_{X,Y}(t_1,t_2)=E[X(t_1)\,Y(t_2)]$. Si $R_{X,Y}\equiv0$: **ortogonales**.
- **Covarianza cruzada:** $C_{X,Y}(t_1,t_2)=R_{X,Y}(t_1,t_2)-m_X(t_1)\,m_Y(t_2)$. Si $C_{X,Y}\equiv0$: **incorrelados**.

---

## 2. Estacionariedad y ergodicidad

### 2.1 Proceso estacionario (estricto)

La naturaleza aleatoria del proceso no cambia con el tiempo. $X(t)$ es **estacionario** si para todo $T$ y todo $k$:

$$F_{X(t_1),\dots,X(t_k)}(x_1,\dots,x_k)=F_{X(t_1+T),\dots,X(t_k+T)}(x_1,\dots,x_k)$$

La CDF conjunta solo depende de las posiciones **relativas** de los instantes, no del origen de tiempos.

Dos procesos son **conjuntamente estacionarios** si lo anterior se cumple para la CDF conjunta de ambos.

Consecuencias:

- **Orden 1:** $F_{X(t)}(x)=F_X(x)\;\forall t$ ⇒ media $m$ y varianza $\sigma^2$ **constantes**.
- **Orden 2:** la CDF solo depende de $t_2-t_1$: $F_{X(t_1),X(t_2)}=F_{X(0),X(t_2-t_1)}$ ⇒

$$R_X(t_1,t_2)=R_X(t_2-t_1),\qquad C_X(t_1,t_2)=C_X(t_2-t_1)$$

### 2.2 Estacionariedad en sentido amplio (WSS)

Más débil y más manejable: basta que la media sea constante y la autocovarianza (o autocorrelación) dependa solo de $\tau=t_1-t_2$.

$$m_X(t)=m\;\;\forall t,\qquad C_X(t_1,t_2)=C_X(\tau),\qquad R_X(t_1,t_2)=R_X(\tau)$$

Dos procesos son **conjuntamente WSS** si cada uno es WSS y su covarianza cruzada depende solo de $t_1-t_2$.

> Todo proceso estacionario es WSS, pero **no** al revés (en general).

### 2.3 Propiedades de $R_X(\tau)$ en un WSS

**(1) Potencia media en $\tau=0$.**

$$R_X(0)=E[X(t)^2]\quad\forall t$$

**(2) Función par.**

$$R_X(\tau)=E[X(t+\tau)X(t)]=E[X(t)X(t+\tau)]=R_X(-\tau)$$

**(3) Mide la velocidad de cambio del proceso.** Aplicando la desigualdad de Markov $P[X\ge a]\le E[X]/a$:

$$P\big[|X(t+\tau)-X(t)|>\varepsilon\big]=P\big[(X(t+\tau)-X(t))^2>\varepsilon^2\big]\le\frac{E\big[(X(t+\tau)-X(t))^2\big]}{\varepsilon^2}=\frac{2\{R_X(0)-R_X(\tau)\}}{\varepsilon^2}$$

Si $R_X(\tau)$ varía lentamente (permanece cerca de $R_X(0)$), es improbable un cambio grande de $X(t)$ en $\tau$ segundos.

**(4) Máximo en $\tau=0$.** Por Cauchy-Schwarz, $E[XY]^2\le E[X^2]\,E[Y^2]$:

$$R_X(\tau)^2=E[X(t+\tau)X(t)]^2\le E[X(t+\tau)^2]\,E[X(t)^2]=R_X(0)^2\;\Rightarrow\;|R_X(\tau)|\le R_X(0)$$

**(5) Periodicidad.** Si $R_X(0)=R_X(d)$, entonces $R_X(\tau)$ es **periódica de periodo $d$** y $X(t)$ es periódica en sentido cuadrático medio. Por Cauchy-Schwarz:

$$\{R_X(\tau+d)-R_X(\tau)\}^2\le 2\{R_X(0)-R_X(d)\}\,R_X(0)$$

Si $R_X(0)=R_X(d)$ el lado derecho es $0$, luego $R_X(\tau+d)=R_X(\tau)\;\forall\tau$. Además

$$E\big[(X(t+d)-X(t))^2\big]=2\{R_X(0)-R_X(d)\}=0$$

**(6) Comportamiento asintótico.** Sea $X(t)=m+N(t)$, con $N(t)$ de media cero y $R_N(\tau)\to0$ cuando $\tau\to\infty$:

$$R_X(\tau)=E[(m+N(t+\tau))(m+N(t))]=m^2+R_N(\tau)\;\xrightarrow[\tau\to\infty]{}\;m^2$$

La autocorrelación puede contener tres tipos de componentes: (i) que tienden a $0$ cuando $\tau\to\infty$, (ii) periódicas, (iii) una constante $m^2$ debida a una media no nula.

### 2.4 WSS gaussiano ⇒ estacionario

Un proceso gaussiano queda completamente determinado por $m_X(t)$ y $C_X(t_1,t_2)$. Si es WSS, ambas dependen solo de diferencias temporales, luego la pdf conjunta es invariante ante desplazamientos del tiempo: **el proceso es estacionario en sentido estricto**.

### 2.5 Procesos cicloestacionarios

Procesos generados por la repetición de un procedimiento cada $T$ segundos (p. ej. un módem que emite una forma de onda cada $T$ s según los datos de entrada). La invariancia solo se exige ante desplazamientos **múltiplos enteros de $T$**:

$$F_{X(t_1),\dots,X(t_k)}(x_1,\dots,x_k)=F_{X(t_1+mT),\dots,X(t_k+mT)}(x_1,\dots,x_k)\quad\forall m\in\mathbb{Z}$$

**Cicloestacionario en sentido amplio:**

$$m_X(t+mT)=m_X(t),\qquad C_X(t_1+mT,\,t_2+mT)=C_X(t_1,t_2)$$

Todo proceso cicloestacionario es también cicloestacionario en sentido amplio.

### 2.6 Medias temporales y ergodicidad

Hasta ahora los promedios eran **estadísticos** (sobre el conjunto de realizaciones, a $t$ fijo). Los **promedios temporales** se calculan sobre una sola función muestra:

$$\bar{x}=A[X(t)]=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}x(t)\,dt$$

$$\Re_{XX}(\tau)=A[X(t)\,X(t+\tau)]=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}X(t)\,X(t+\tau)\,dt$$

Para una función muestra concreta son números; sobre el proceso completo, $\bar{x}$ y $\Re_{XX}(\tau)$ son **variables aleatorias**. Su valor esperado es

$$E[\bar{x}]=\overline{X}\;\;(\text{si }m_X\text{ no depende de }t),\qquad E[\Re_{XX}(\tau)]=R_{XX}(\tau)\;\;(\text{si }R_{XX}\text{ solo depende de }\tau)$$

**Proceso ergódico:** si además la **varianza** de $\bar{x}$ y de $\Re_{XX}(\tau)$ tiende a $0$ cuando $T\to\infty$, entonces

$$\bar{x}=\overline{X},\qquad \Re_{XX}(\tau)=R_{XX}(\tau)$$

es decir, **los promedios temporales coinciden con los estadísticos**.

- Los **teoremas ergódicos** fijan las condiciones bajo las que esto ocurre.
- Es una forma **muy restrictiva** de estacionariedad y puede ser difícil justificarla en un caso físico real.
- En la práctica solo se dispone de **una** función muestra; suponiendo ergodicidad se estiman media y correlaciones a partir de esa única forma de onda.

---

## 3. Procesos gaussianos

$X(t)$ es **gaussiano** si, para todo $k$ y todos los instantes $t_1,\dots,t_k$, las muestras $X(t_1),\dots,X(t_k)$ son conjuntamente gaussianas:

$$f_{X_1,\dots,X_k}(x_1,\dots,x_k)=\frac{e^{-\frac12(\mathbf{x}-\mathbf{m})^TK^{-1}(\mathbf{x}-\mathbf{m})}}{(2\pi)^{k/2}\,|K|^{1/2}}$$

con vector de medias $\mathbf{m}=[m_X(t_1),\dots,m_X(t_k)]^T$ y matriz de covarianzas $K_{ij}=C_X(t_i,t_j)$.

Propiedades que lo hacen el modelo más útil en procesado de señal:

1. La pdf conjunta queda **completamente determinada** por $m_X(t)$ y $C_X(t_1,t_2)$.
2. Una **operación lineal** (suma, derivada, integral) sobre un proceso gaussiano origina otro proceso gaussiano.

Además, muchos procesos de señal y de ruido se modelan adecuadamente con una gaussiana.

---

## 4. Procesos de Markov

### 4.1 Definición

$X(t)$ es de **Markov** si el futuro, dado el presente, es independiente del pasado. Para $t_1<\dots<t_k<t_{k+1}$:

**Valores discretos:**

$$P[X(t_{k+1})=x_{k+1}\mid X(t_k)=x_k,\dots,X(t_1)=x_1]=P[X(t_{k+1})=x_{k+1}\mid X(t_k)=x_k]$$

**Valores continuos:**

$$P[a\le X(t_{k+1})\le b\mid X(t_k)=x_k,\dots,X(t_1)=x_1]=P[a\le X(t_{k+1})\le b\mid X(t_k)=x_k]$$

equivalente a $f_{X(t_{k+1})}(x_{k+1}\mid X(t_k)=x_k,\dots,X(t_1)=x_1)=f_{X(t_{k+1})}(x_{k+1}\mid X(t_k)=x_k)$.

Aquí $t_k$ es el «presente», $t_{k+1}$ el «futuro» y $t_1,\dots,t_{k-1}$ el «pasado». Toda pmf/pdf condicionada a varios instantes se reduce a la condicionada al **instante más reciente**.

Ejemplos: el proceso suma y el **proceso de Poisson**. Si el proceso toma valores enteros se denomina **cadena de Markov**.

### 4.2 Cadenas de Markov discretas en el tiempo

La pmf conjunta se factoriza como producto de probabilidades de transición:

$$P[X_n=i_n,\dots,X_0=i_0]=P[X_n=i_n|X_{n-1}=i_{n-1}]\cdots P[X_1=i_1|X_0=i_0]\;P[X_0=i_0]$$

Con **probabilidades de transición homogéneas** (no dependen del instante): $P[X_{n+1}=j\mid X_n=i]=p_{ij}\;\forall n$, y la pmf conjunta es $p_{i_{n-1},i_n}\cdots p_{i_0,i_1}\,p_{i_0}(0)$.

Por tanto $X_n$ queda especificado por la **pmf inicial** $p_j(0)=P[X_0=j]$ y la **matriz de transición de un paso**

$$P=\begin{pmatrix}p_{00}&p_{01}&p_{02}&\cdots\\p_{10}&p_{11}&p_{12}&\cdots\\\vdots&\vdots&\vdots&\ddots\end{pmatrix},\qquad \sum_j p_{ij}=1\;\;(\text{cada fila suma }1)$$

**Transición de $n$ pasos.** Sea $p_{ij}(n)=P[X_{n+k}=j\mid X_k=i]=P[X_n=j\mid X_0=i]$ (homogeneidad). Para dos pasos, sumando sobre el estado intermedio $k$:

$$p_{ij}(2)=\sum_k p_{ik}(1)\,p_{kj}(1)\;\;\Rightarrow\;\;P(2)=P(1)\,P(1)$$

En general $P(n)=P(n-1)\,P$, y por tanto

$$\boxed{P(n)=P^n}$$

### 4.3 Cadenas de Markov continuas en el tiempo

Se necesitan las probabilidades de transición entre un instante $s$ y $s+t$. Con homogeneidad temporal:

$$P[X(s+t)=j\mid X(s)=i]=P[X(t)=j\mid X(0)=i]=p_{ij}(t),\quad t\ge0,\;\forall s$$

La matriz $P(t)=\{p_{ij}(t)\}$ cumple $P(0)=I$. La pmf conjunta en $k+1$ instantes tiene la misma expresión factorizada que en el caso discreto.

### 4.4 Ejemplo: proceso de Poisson

$N(t)$ = número de ocurrencias de un suceso en $[0,t]$, con tasa media $\lambda$ sucesos/s. Es no decreciente, de valores enteros y continuo en el tiempo.

Se divide $[0,t]$ en $n$ subintervalos de duración $\delta=t/n$ muy corta, suponiendo:

- **(c1)** la probabilidad de más de un suceso por subintervalo es despreciable (ensayos de Bernoulli);
- **(c2)** que ocurra o no un suceso es independiente entre subintervalos.

Entonces $N(t)$ es un **proceso binomial de cuenteo**; con probabilidad $p$ por subintervalo, el nº medio de sucesos es $np=\lambda t$. Si $n\to\infty$, $\delta\to0$, $p\to0$ con $np=\lambda t$ fijo, la binomial converge a una **Poisson** de parámetro $\lambda t$:

$$P[N(t)=k]=\frac{(\lambda t)^k}{k!}\,e^{-\lambda t},\qquad k=0,1,2,\dots$$

**Es un proceso de Markov**, pues el número de eventos en $(t_{k+1}-t_k)$ s no depende de lo ocurrido antes de $t_k$:

$$P[N(t_{k+1})=j\mid N(t_k)=i,\dots]=P[j-i\text{ eventos en }(t_{k+1}-t_k)\text{ s}]=P[N(t_{k+1})=j\mid N(t_k)=i]$$

**Probabilidades de transición:**

$$p_{ij}(t)=p_{0,\,j-i}(t)=\frac{(\lambda t)^{j-i}}{(j-i)!}\,e^{-\lambda t},\qquad j\ge i$$

$$P(t)=\begin{pmatrix}e^{-\lambda t}&\lambda t\,e^{-\lambda t}&\frac{(\lambda t)^2}{2!}e^{-\lambda t}&\cdots\\0&e^{-\lambda t}&\lambda t\,e^{-\lambda t}&\cdots\\0&0&e^{-\lambda t}&\cdots\\\vdots&\vdots&\vdots&\ddots\end{pmatrix}$$

Es triangular superior porque $N(t)$ no puede decrecer.

**Intervalo muy corto.** Para $t\to0$, $e^{-\lambda t}\approx1-\lambda t$. Ignorando términos en $\delta^2$:

$$P(\delta)\approx\begin{pmatrix}1-\lambda\delta&\lambda\delta&0&\cdots\\0&1-\lambda\delta&\lambda\delta&\cdots\\0&0&1-\lambda\delta&\cdots\\\vdots&\vdots&\vdots&\ddots\end{pmatrix}$$

La probabilidad de más de una transición en un tiempo muy corto es despreciable, de forma consistente con la condición (c1).

---

## 5. Mapa conceptual

| Concepto | Relación |
|---|---|
| Estacionario estricto | ⇒ WSS (siempre); el recíproco no es cierto en general |
| WSS + gaussiano | ⇒ estacionario estricto |
| Ergodicidad | Forma muy restrictiva de estacionariedad: promedios temporales = estadísticos |
| Cicloestacionario | Invariancia solo ante desplazamientos múltiplos de $T$ |
| Gaussiano | Totalmente determinado por $m_X(t)$ y $C_X(t_1,t_2)$; cerrado bajo operaciones lineales |
| Markov | El presente basta para predecir el futuro; $P(n)=P^n$; ejemplo: Poisson |
