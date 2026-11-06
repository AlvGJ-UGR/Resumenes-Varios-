# Variable Aleatoria — Teoría de la Comunicación

Resumen de repaso: variable aleatoria unidimensional, multidimensional y transformación lineal de variables gaussianas.

## Índice

1. [Variable aleatoria unidimensional](#1-variable-aleatoria-unidimensional)
2. [Variable aleatoria multidimensional](#2-variable-aleatoria-multidimensional)
3. [Transformación lineal de variables gaussianas](#3-transformación-lineal-de-variables-gaussianas)
4. [Resumen de ideas clave](#4-resumen-de-ideas-clave)

---

## 1. Variable aleatoria unidimensional

### 1.1 Concepto

Una variable aleatoria (v.a.) $X$ es una **función determinista** que asigna un número real $X(\omega)$ a cada salida $\omega\in\Omega$ de un experimento aleatorio. La aleatoriedad procede únicamente de la aleatoriedad de las salidas.

- **Rango:** $\text{Rango}_X=\{x\in\mathbb{R}\;:\;\exists\,\omega\in\Omega,\ X(\omega)=x\}$
- Puede ser **discreta** o **continua**.
- Se describe mediante: CDF $F_X(x)$, pdf $f_X(x)$ (continuas) o pmf $p_X(x_i)$ (discretas).

### 1.2 Función de distribución acumulada (CDF)

$$F_X(x)=P(X\le x)$$

Propiedades:

1. $0\le F_X(x)\le 1$
2. No decreciente: $x_1<x_2\Rightarrow F_X(x_1)\le F_X(x_2)$
3. $F_X(-\infty)=0,\quad F_X(+\infty)=1$
4. Continua por la derecha: $F_X(x^+)=F_X(x)$
5. Probabilidades de intervalos:
   - $P(a<X\le b)=F_X(b)-F_X(a)$
   - $P(a\le X\le b)=F_X(b)-F_X(a^-)$
   - $P(a<X<b)=F_X(b^-)-F_X(a)$
   - $P(a\le X<b)=F_X(b^-)-F_X(a^-)$
6. $P(X=a)=F_X(a)-F_X(a^-)$ (salto de la CDF en $a$)
7. $P(X>x)=1-F_X(x)$

### 1.3 Función densidad de probabilidad (pdf) y masa (pmf)

$$f_X(x)=\frac{d}{dx}F_X(x)$$

En v.a. discretas se usa la pmf: $p_X(x_i)=p_i=P(X=x_i)$.

Propiedades de la pdf:

1. $f_X(x)\ge 0$
2. $\displaystyle\int_{-\infty}^{\infty}f_X(x)\,dx=1$
3. $\displaystyle\int_a^b f_X(x)\,dx=P(a\le X\le b)$
4. $\displaystyle P(X\in A)=\int_A f_X(x)\,dx$
5. $\displaystyle F_X(x)=\int_{-\infty}^{x}f_X(u)\,du$

### 1.4 CDF y pdf condicionales

Se obtienen sustituyendo la probabilidad por la probabilidad condicional (cumplen las propiedades de cualquier CDF/pdf):

$$F_{X|A}(x)=\frac{P[\{X\le x\}\cap A]}{P[A]},\qquad f_X(x|A)=\frac{d}{dx}F_{X|A}(x)$$

### 1.5 Variables aleatorias habituales

| Tipo | V.a. | Descripción | Aplicación en comunicaciones |
|---|---|---|---|
| Discreta | Bernoulli | $\text{Rango}=\{0,1\}$, $p=P(X=1)$ | Fuente binaria |
| Discreta | Binomial | Nº de «1» en $N$ ensayos de Bernoulli; parámetros $N,p$ | Nº de bits recibidos con error |
| Discreta | Geométrica, Poisson | — | — |
| Continua | Uniforme $(a,b)$ | $f_X(x)=\frac{1}{b-a}$ para $a<x<b$ | Fase aleatoria de una sinusoide ($0$ a $2\pi$) |
| Continua | Gaussiana $(\mu,\sigma^2)$ | $f_X(x)=\frac{1}{\sqrt{2\pi}\,\sigma}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | Ruido térmico |
| Continua | Exponencial, Gamma | — | — |

**Bernoulli:**

$$p_X(x)=\begin{cases}1-p, & x=0\\ p, & x=1\end{cases}$$

**Binomial:**

$$p_X(x)=\binom{N}{x}\,p^x\,(1-p)^{N-x},\qquad x=0,1,\dots,N$$

### 1.6 Función $Q(x)$

Función tabulada que permite evaluar la cola de la gaussiana. Para $X\sim\mathcal{N}(0,1)$:

$$Q(x)=P(X>x)=\int_x^{\infty}\frac{1}{\sqrt{2\pi}}\,e^{-z^2/2}\,dz$$

Propiedades:

- $Q(-x)=1-Q(x)$
- $Q(0)=\tfrac12$
- $Q(\infty)=0$
- $P(a<X<b)=Q(a)-Q(b)$
- Para una gaussiana cualquiera $\mathcal{N}(\mu,\sigma^2)$ (se **normaliza** restando la media y dividiendo por $\sigma$):

$$P(X>x)=Q\!\left(\frac{x-\mu}{\sigma}\right)$$

### 1.7 Momentos estadísticos

| Magnitud | Definición |
|---|---|
| Media | $m_X=E[X]=\int_{-\infty}^{\infty}x\,f_X(x)\,dx$ |
| Esperanza de $g(X)$ | $E[g(X)]=\int_{-\infty}^{\infty}g(x)\,f_X(x)\,dx$ |
| Momento de orden $n$ | $m_X^{\,n}=\int_{-\infty}^{\infty}x^n f_X(x)\,dx$ |
| Varianza | $\sigma_X^2=E[(X-m_X)^2]=\int_{-\infty}^{\infty}(x-m_X)^2 f_X(x)\,dx$ |

Propiedades:

- $E[X+Y]=E[X]+E[Y]$
- $E[c]=c,\quad E[cX]=c\,E[X],\quad E[X+c]=E[X]+c$
- $\text{Var}(c)=0,\quad \text{Var}(cX)=c^2\,\text{Var}(X),\quad \text{Var}(X+c)=\text{Var}(X)$

---

## 2. Variable aleatoria multidimensional

### 2.1 Modelo conjunto

Dos v.a. $X,Y$ definidas sobre el mismo espacio muestral $\Omega$ se describen conjuntamente con:

$$F_{X,Y}(x,y)=P(X\le x,\;Y\le y),\qquad f_{X,Y}(x,y)=\frac{\partial^2}{\partial x\,\partial y}F_{X,Y}(x,y)$$

### 2.2 Propiedades

- **CDF marginales:** $F_X(x)=F_{X,Y}(x,\infty)$, $\;F_Y(y)=F_{X,Y}(\infty,y)$
- **pdf marginales** (se «integra» la otra variable):

$$f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy,\qquad f_Y(y)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dx$$

- Normalización: $\displaystyle\iint_{-\infty}^{\infty}f_{X,Y}(x,y)\,dx\,dy=1$
- $\displaystyle P((X,Y)\in A)=\iint_{(x,y)\in A}f_{X,Y}(x,y)\,dx\,dy$
- $\displaystyle F_{X,Y}(x,y)=\int_{-\infty}^{x}\!\int_{-\infty}^{y}f_{X,Y}(u,v)\,du\,dv$

### 2.3 pdf condicionada

El conocimiento del valor de una variable modifica las probabilidades de la otra:

$$f_{Y|X}(y|x)=\frac{f_{X,Y}(x,y)}{f_X(x)}\;(f_X\neq0),\qquad f_{X|Y}(x|y)=\frac{f_{X,Y}(x,y)}{f_Y(y)}\;(f_Y\neq0)$$

Consecuencias:

- **Regla del producto:** $f_{X,Y}(x,y)=f_{Y|X}(y|x)\,f_X(x)=f_{X|Y}(x|y)\,f_Y(y)$
- **Probabilidad total:**

$$f_X(x)=\int_{-\infty}^{\infty}f_{X|Y}(x|y)\,f_Y(y)\,dy,\qquad f_Y(y)=\int_{-\infty}^{\infty}f_{Y|X}(y|x)\,f_X(x)\,dx$$

- **Bayes:**

$$f_{X|Y}(x|y)=\frac{f_{Y|X}(y|x)\,f_X(x)}{f_Y(y)},\qquad f_{Y|X}(y|x)=\frac{f_{X|Y}(x|y)\,f_Y(y)}{f_X(x)}$$

### 2.4 Independencia estadística

$X$ e $Y$ son independientes si

$$f_{X,Y}(x,y)=f_X(x)\,f_Y(y)$$

Implicación: $f_{Y|X}(y|x)=f_Y(y)$ y $f_{X|Y}(x|y)=f_X(x)$ (saber una no aporta información sobre la otra).

### 2.5 Momentos conjuntos

- **Momento $jk$-ésimo:** $E[X^jY^k]=\iint x^j y^k f_{X,Y}(x,y)\,dx\,dy$
- **Momento central $jk$-ésimo:** $E\big[(X-E[X])^j\,(Y-E[Y])^k\big]$

Casos particulares de interés:

| Magnitud | Definición | Condición especial |
|---|---|---|
| **Correlación** | $\text{CORR}(X,Y)=E[XY]$ | Si $=0$: $X,Y$ **ortogonales** |
| **Covarianza** | $\text{COV}(X,Y)=E[(X-E[X])(Y-E[Y])]=E[XY]-E[X]E[Y]$ | Si $=0$: $X,Y$ **incorreladas** |
| **Coef. de correlación** | $\rho_{X,Y}=\dfrac{\text{COV}(X,Y)}{\sigma_X\,\sigma_Y}$, con $\lvert\rho_{X,Y}\rvert\le 1$ | Mide el grado de dependencia **lineal** |

Si $X$ e $Y$ son **independientes**: $E[XY]=E[X]E[Y]$ y $\text{COV}(X,Y)=0$.

> **Independencia ⇒ incorrelación**, pero **incorrelación ⇏ independencia** (en general).

### 2.6 $n$ variables conjuntamente gaussianas

$\mathbf{X}=(X_1,\dots,X_n)^T$ son conjuntamente gaussianas si su pdf conjunta es

$$f_{\mathbf{X}}(\mathbf{x})=\frac{1}{\sqrt{(2\pi)^n\,\det(C)}}\;\exp\!\Big\{-\tfrac12\,(\mathbf{x}-\boldsymbol{\mu})^{T}\,C^{-1}\,(\mathbf{x}-\boldsymbol{\mu})\Big\}$$

- **Vector de medias:** $\boldsymbol{\mu}=[E[X_1],\dots,E[X_n]]^T$
- **Matriz de covarianzas:** $C_{i,j}=\text{COV}(X_i,X_j)$ (la diagonal contiene las varianzas; $C$ es simétrica)

Propiedades:

1. Quedan **completamente caracterizadas** por $\boldsymbol{\mu}$ y $C$.
2. Cualquier **subconjunto** (incluidas las v.a. individuales) es conjuntamente gaussiano.
3. Cualquier subconjunto **condicionado** a otro subconjunto del mismo vector es conjuntamente gaussiano.
4. Cualquier conjunto de **combinaciones lineales** de $(X_1,\dots,X_n)$ es conjuntamente gaussiano; en particular $\mathbf{Y}=A\mathbf{X}$ lo es.
5. Dos variables **conjuntamente gaussianas incorreladas** son **independientes** (en el caso gaussiano, incorrelación **sí** implica independencia).

---

## 3. Transformación lineal de variables gaussianas

### 3.1 Enunciado

> La transformación lineal de cualesquiera $n$ v.a. conjuntamente gaussianas origina $n$ nuevas v.a. que también son conjuntamente gaussianas.

Sea $\mathbf{X}=(X_1,\dots,X_n)^T$ conjuntamente gaussiano con vector de medias $\mathbf{m}$ y matriz de covarianzas $K$, y sea $A$ una matriz $n\times n$ **invertible**. Se define

$$\mathbf{Y}=A\,\mathbf{X}$$

### 3.2 Demostración

Al ser la transformación lineal e invertible, el cambio de variable da

$$f_{\mathbf{Y}}(\mathbf{y})=\frac{f_{\mathbf{X}}(A^{-1}\mathbf{y})}{|A|}=\frac{\exp\!\big\{-\tfrac12\,(A^{-1}\mathbf{y}-\mathbf{m})^{T}K^{-1}(A^{-1}\mathbf{y}-\mathbf{m})\big\}}{(2\pi)^{n/2}\,|A|\,|K|^{1/2}}$$

**Paso 1 — Argumento de la exponencial.** Sacando $A^{-1}$ factor común:

$$A^{-1}\mathbf{y}-\mathbf{m}=A^{-1}(\mathbf{y}-A\mathbf{m}),\qquad (A^{-1}\mathbf{y}-\mathbf{m})^T=(\mathbf{y}-A\mathbf{m})^T\,A^{-T}$$

Por tanto

$$(A^{-1}\mathbf{y}-\mathbf{m})^TK^{-1}(A^{-1}\mathbf{y}-\mathbf{m})=(\mathbf{y}-A\mathbf{m})^T\,\underbrace{A^{-T}K^{-1}A^{-1}}_{=\,(AKA^T)^{-1}}\,(\mathbf{y}-A\mathbf{m})$$

**Paso 2 — Determinante.** Con $C=AKA^T$:

$$\det(C)=\det(A)\det(K)\det(A^T)=\det(A)^2\det(K)\;\Rightarrow\;|C|^{1/2}=|A|\,|K|^{1/2}$$

que coincide con el denominador anterior.

**Paso 3 — Resultado.** Definiendo $\mathbf{m}_Y=A\mathbf{m}$ y $C=AKA^T$:

$$f_{\mathbf{Y}}(\mathbf{y})=\frac{\exp\!\big\{-\tfrac12\,(\mathbf{y}-\mathbf{m}_Y)^{T}C^{-1}(\mathbf{y}-\mathbf{m}_Y)\big\}}{(2\pi)^{n/2}\,|C|^{1/2}}$$

Es la forma de una pdf conjuntamente gaussiana, con

$$\boxed{\mathbf{m}_Y=A\,\mathbf{m},\qquad C=A\,K\,A^{T}}$$

### 3.3 Aplicación: decorrelación (diagonalización de $K$)

**Problema:** dado un vector gaussiano $\mathbf{X}$ cuyas componentes están correladas, ¿es posible transformarlo en v.a. gaussianas **independientes**?

**Solución:** $K$ es simétrica, por lo que siempre existe una matriz $A$ tal que

$$A\,K\,A^{T}=\Lambda\quad(\text{matriz diagonal})$$

Las filas de $A$ se construyen con los **autovectores** de $K$ (normalizados) y los elementos diagonales $\lambda_i$ de $\Lambda$ son los **autovalores** de $K$.

Con esa $A$, la pdf de $\mathbf{Y}=A\mathbf{X}$ es

$$f_{\mathbf{Y}}(\mathbf{y})=\frac{\exp\!\Big\{-\tfrac12\sum_{i=1}^{n}\dfrac{(y_i-m_{Y,i})^2}{\lambda_i}\Big\}}{\big[(2\pi\lambda_1)(2\pi\lambda_2)\cdots(2\pi\lambda_n)\big]^{1/2}}=\prod_{i=1}^{n}\frac{1}{\sqrt{2\pi\lambda_i}}\,e^{-\frac{(y_i-m_{Y,i})^2}{2\lambda_i}}$$

Al factorizar en un producto de gaussianas unidimensionales, **$Y_1,\dots,Y_n$ son v.a. gaussianas independientes**, con media $m_{Y,i}$ y varianza $\lambda_i$.

---

## 4. Resumen de ideas clave

| Concepto | Idea clave |
|---|---|
| CDF vs pdf | $f_X=\frac{d}{dx}F_X$; $P(a<X\le b)=F_X(b)-F_X(a)$ |
| $Q(x)$ | $P(X>x)=Q\big(\frac{x-\mu}{\sigma}\big)$; $Q(-x)=1-Q(x)$ |
| Independencia vs incorrelación | Independencia ⇒ incorrelación; el recíproco solo vale si son conjuntamente gaussianas |
| $\rho_{X,Y}$ | Mide únicamente dependencia **lineal** |
| Gaussianas conjuntas | Caracterizadas por $(\boldsymbol\mu,C)$; cerradas bajo transformaciones lineales |
| Transformación $\mathbf{Y}=A\mathbf{X}$ | $\mathbf{m}_Y=A\mathbf{m}$, $\;C=AKA^T$ |
| Diagonalización | Con autovectores de $K$ se obtienen gaussianas independientes de varianzas $\lambda_i$ |
