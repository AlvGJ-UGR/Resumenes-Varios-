# Relación de Problemas 2 — Procesos aleatorios (resuelta paso a paso)

Soluciones detalladas, con el razonamiento completo que se espera en un examen. Todos los resultados numéricos y las integrales se han comprobado con cálculo simbólico/numérico.

> **Figuras.** Algunos problemas usan figuras de la carpeta `Relacion2_img/`. Sube el `.md` y la carpeta al mismo directorio para que se vean en GitHub.

## Índice

| Bloque | Problemas |
|---|---|
| Media, autocorrelación y estacionariedad de procesos construidos con v.a. | [1](#problema-1), [2](#problema-2), [3](#problema-3), [4](#problema-4), [8](#problema-8), [12](#problema-12), [13](#problema-13) |
| Combinación de procesos y procesos gaussianos | [5](#problema-5), [6](#problema-6), [7](#problema-7), [10](#problema-10), [18](#problema-18) |
| Pmf y covarianza de un proceso sencillo | [9](#problema-9), [11](#problema-11) |
| Densidad espectral de potencia | [14](#problema-14), [15](#problema-15), [16](#problema-16), [17](#problema-17), [19](#problema-19) |
| Sistemas lineales con entrada aleatoria | [20](#problema-20), [21](#problema-21), [22](#problema-22), [23](#problema-23), [24](#problema-24) |

[Resumen de herramientas y errores típicos](#resumen-de-herramientas-y-errores-típicos)

## Herramientas que se usan en toda la relación

| Concepto | Fórmula |
|---|---|
| Media | $m_X(t)=E[X(t)]$ |
| Autocorrelación | $R_X(t_1,t_2)=E[X(t_1)X(t_2)]$ |
| Autocovarianza | $C_X(t_1,t_2)=R_X(t_1,t_2)-m_X(t_1)m_X(t_2)$ |
| **WSS** | $m_X(t)=m$ **constante** y $R_X(t_1,t_2)=R_X(\tau)$ con $\tau=t_2-t_1$ (**las dos** condiciones) |
| Potencia media | $P_X=A\{E[X^2]\}$; si es WSS, $P_X=R_X(0)$ |
| PSD (WSS) | $S_X(\omega)=\displaystyle\int R_X(\tau)e^{-j\omega\tau}d\tau$; $P_X=\frac1{2\pi}\int S_X\,d\omega$ |
| Salida de un SLIT | $m_Y=H(0)m_X$, $\;S_Y=\lvert H\rvert^2S_X$, $\;R_{Y,X}(\tau)=h*R_X$ |
| Gaussiano | pdf determinada por media y covarianza; transformaciones lineales de gaussianos son gaussianas |

---

## Problema 1

**Enunciado.** $X(t)=U\cos t+V\sin t$, $-\infty<t<\infty$, con $U,V$ discretas, idénticas e independientes, que toman los valores $-2$ y $1$ con probabilidades $\tfrac13$ y $\tfrac23$. ¿Es $X(t)$ WSS?

**Idea.** Hay que comprobar las **dos** condiciones de WSS: media constante y autocorrelación que depende solo de $t_2-t_1$.

**Paso 1: momentos de $U$ y $V$.**

$$E[U]=-2\cdot\tfrac13+1\cdot\tfrac23=0,\qquad E[U^2]=4\cdot\tfrac13+1\cdot\tfrac23=2$$

Lo mismo para $V$ (son idénticas). Por independencia, $E[UV]=E[U]E[V]=0$.

**Paso 2: media.**

$$m_X(t)=E[U]\cos t+E[V]\sin t=0\quad\text{(constante)}$$

**Paso 3: autocorrelación.**

$$R_X(t_1,t_2)=E[U^2]\cos t_1\cos t_2+E[UV](\cos t_1\sin t_2+\sin t_1\cos t_2)+E[V^2]\sin t_1\sin t_2$$

$$=2\big(\cos t_1\cos t_2+\sin t_1\sin t_2\big)=2\cos(t_2-t_1)$$

Solo depende de $\tau=t_2-t_1$.

**Resultado.** **Sí es WSS**, con $m_X=0$ y $R_X(\tau)=2\cos\tau$.

**Observación (WSS no implica estacionario estricto).** Con $t=0$, $X=U$ (valores $-2$, $1$). Con $t=\pi/4$, $X=\frac{U+V}{\sqrt2}$, que toma los valores $\frac{-4}{\sqrt2},\frac{-1}{\sqrt2},\frac{2}{\sqrt2}$ con probabilidades $\frac19,\frac49,\frac49$. Las distribuciones de primer orden son distintas, así que el proceso **no es estacionario en sentido estricto**. Sí lo sería si $U$ y $V$ fuesen gaussianas.

---

## Problema 2

**Enunciado.** $X(t)=Y+(1-t)$ con $Y\sim U(0,1)$. a) $P[X(3)>-4/3]$. b) $m_X(t)$ y $C_X(t_1,t_2)$.

**a)** En $t=3$: $X(3)=Y-2$. La condición es

$$Y-2>-\tfrac43\iff Y>\tfrac23\;\Rightarrow\;P=1-\tfrac23=\boxed{\tfrac13}$$

(para una uniforme en $(0,1)$, $P[Y>y]=1-y$).

**b) Media.** $E[Y]=\tfrac12$ y $(1-t)$ es determinista:

$$m_X(t)=\tfrac12+1-t=\boxed{\tfrac32-t}$$

**Covarianza.** Sumar una función determinista no cambia las covarianzas: $X(t)-m_X(t)=Y-\tfrac12$. Entonces

$$C_X(t_1,t_2)=E\big[(Y-\tfrac12)^2\big]=\text{Var}(Y)=\frac{(1-0)^2}{12}=\boxed{\tfrac1{12}}$$

(constante, independiente de $t_1,t_2$).

**Comentario.** El proceso **no es WSS** porque la media depende de $t$, aunque la covarianza sí sea constante.

---

## Problema 3

**Enunciado.** $Y(t)=At+B$ con $(A,B)$ discretas y pmf conjunta $P(A=a,B=b)=\dfrac a{20}$, $a\in\{1,2,3\}$, $b\in\{1,\dots,a+1\}$. a) Media. b) Autocorrelación y autocovarianza. c) ¿WSS?

**Paso 0: comprobar la pmf y obtener las marginales.**

$$\sum_{a}(a+1)\frac a{20}=\frac{2+6+12}{20}=1\ \checkmark$$

$$P(A=a)=\frac{a(a+1)}{20}:\quad P(A=1)=\tfrac{2}{20},\;P(A=2)=\tfrac6{20},\;P(A=3)=\tfrac{12}{20}$$

Condicionada: $P(B=b|A=a)=\dfrac{a/20}{a(a+1)/20}=\dfrac1{a+1}$, es decir, **$B|A=a$ es uniforme en $\{1,\dots,a+1\}$**. Esto simplifica los cálculos: $E[B|A=a]=\dfrac{a+2}2$.

**Paso 1: momentos.**

$$E[A]=\frac{1\cdot2+2\cdot6+3\cdot12}{20}=\frac{50}{20}=\frac52,\qquad E[A^2]=\frac{2+24+108}{20}=\frac{134}{20}=\frac{67}{10}$$

$$E[B]=E\!\left[\frac{A+2}2\right]=\frac{5/2+2}{2}=\frac94$$

$$E[AB]=E\!\left[A\frac{A+2}2\right]=\frac{E[A^2]+2E[A]}2=\frac{6.7+5}{2}=\frac{117}{20}$$

Para $E[B^2]$ se usa que, para una uniforme en $\{1,\dots,n\}$, $E[B^2]=\frac{(n+1)(2n+1)}6$ con $n=a+1$: valores $\frac{15}{6},\frac{28}{6},\frac{45}6$ para $a=1,2,3$:

$$E[B^2]=0.1\cdot2.5+0.3\cdot4.667+0.6\cdot7.5=\frac{123}{20}$$

Varianzas y covarianza:

$$\text{Var}(A)=\tfrac{67}{10}-\tfrac{25}{4}=\tfrac{9}{20},\quad\text{Var}(B)=\tfrac{123}{20}-\tfrac{81}{16}=\tfrac{87}{80},\quad\text{Cov}(A,B)=\tfrac{117}{20}-\tfrac52\cdot\tfrac94=\tfrac{9}{40}$$

**a) Media del proceso.**

$$m_Y(t)=E[A]\,t+E[B]=\boxed{\tfrac52\,t+\tfrac94}$$

**b) Autocorrelación.**

$$R_Y(t_1,t_2)=E[(At_1+B)(At_2+B)]=E[A^2]t_1t_2+E[AB](t_1+t_2)+E[B^2]$$

$$\boxed{R_Y(t_1,t_2)=\tfrac{67}{10}\,t_1t_2+\tfrac{117}{20}(t_1+t_2)+\tfrac{123}{20}}$$

**Autocovarianza** (misma estructura con varianzas y covarianza):

$$\boxed{C_Y(t_1,t_2)=\tfrac9{20}\,t_1t_2+\tfrac9{40}(t_1+t_2)+\tfrac{87}{80}}$$

Comprobación: $C_Y=R_Y-m_Y(t_1)m_Y(t_2)$; en $t_1=t_2=0$: $\frac{123}{20}-\frac{81}{16}=\frac{87}{80}$ ✔.

**c) ¿WSS?** **No.** La media $m_Y(t)=\frac52t+\frac94$ **depende de $t$** (basta con esto), y además $R_Y$ contiene el término $\frac{67}{10}t_1t_2$, que no es función de $t_2-t_1$.

---

## Problema 4

**Enunciado.** $(A,B)$ gaussiano de medias $(1,1)$ y covarianzas $K=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. $X(t)=A\cos t+B$. a) Media y varianza. b) Autocorrelación.

**Datos derivados.** $\text{Var}(A)=\text{Var}(B)=2$, $\text{Cov}(A,B)=1$, luego

$$E[A^2]=2+1=3,\quad E[B^2]=3,\quad E[AB]=1+1\cdot1=2$$

**a) Media.**

$$m_X(t)=E[A]\cos t+E[B]=\boxed{\cos t+1}$$

**Varianza** (propiedad $\text{Var}(aA+B)=a^2\text{Var}(A)+\text{Var}(B)+2a\text{Cov}(A,B)$ con $a=\cos t$):

$$\text{Var}[X(t)]=2\cos^2t+2+2\cos t\cdot1=\boxed{2\cos^2t+2\cos t+2}$$

**b) Autocorrelación.**

$$R_X(t_1,t_2)=E[A^2]\cos t_1\cos t_2+E[AB](\cos t_1+\cos t_2)+E[B^2]$$

$$\boxed{R_X(t_1,t_2)=3\cos t_1\cos t_2+2(\cos t_1+\cos t_2)+3}$$

**Comprobación:** $R_X(t,t)-m_X(t)^2=3c^2+4c+3-(c+1)^2=2c^2+2c+2$ con $c=\cos t$ ✔ (coincide con la varianza del apartado a).

**Comentario.** $X(t)$ es una combinación lineal de gaussianas, así que **cada $X(t)$ es gaussiano** con la media y la varianza anteriores. No es WSS (la media depende de $t$).

---

## Problema 5

**Enunciado.** $X(n)$ e $Y(n)$ independientes, de tiempo discreto y media constante. $m_X=1/\sqrt2$, $m_Y=2$, $R_X(k)=(1/2)^{\lvert k\rvert}$, $R_Y(k)=(1/3)^{\lvert k\rvert}$, $Z(n)=X(n)+Y(n)$. a) Media y autocovarianza de $Z$. b) Potencia media de $Z$. c) Si la muestra de orden uno de $X(n)$ es exponencial $\lambda e^{-\lambda x}$, halla $\lambda$.

**a) Media.** $m_Z=m_X+m_Y=\dfrac1{\sqrt2}+2=\boxed{\dfrac{\sqrt2}{2}+2\approx2.707}$.

**Autocovarianza.** Como $X$ e $Y$ son independientes, las covarianzas cruzadas son nulas y $C_Z=C_X+C_Y$:

$$C_X(k)=R_X(k)-m_X^2=\left(\tfrac12\right)^{\lvert k\rvert}-\tfrac12,\qquad C_Y(k)=\left(\tfrac13\right)^{\lvert k\rvert}-4$$

$$\boxed{C_Z(k)=\left(\tfrac12\right)^{\lvert k\rvert}+\left(\tfrac13\right)^{\lvert k\rvert}-\tfrac92}$$

> **Aviso: los datos del enunciado son incoherentes para $Y$.** $C_Y(0)=\text{Var}(Y)=R_Y(0)-m_Y^2=1-4=-3<0$, imposible (siempre debe cumplirse $\lvert m\rvert^2\le R(0)$). Probablemente hay una errata (por ejemplo en $m_Y$ o en $R_Y$). Se resuelve formalmente con las fórmulas, que es lo que pide el ejercicio, pero en un examen conviene **mencionarlo**.

**b) Potencia media.** $Z$ es WSS, así que $P_Z=R_Z(0)=E[Z^2]$. Con independencia:

$$R_Z(k)=R_X(k)+R_Y(k)+2m_Xm_Y$$

$$P_Z=R_X(0)+R_Y(0)+2m_Xm_Y=1+1+2\cdot\tfrac1{\sqrt2}\cdot2=\boxed{2+2\sqrt2\approx4.83}$$

**c)** Una exponencial de parámetro $\lambda$ tiene media $1/\lambda$. Como la media de $X(n)$ en cualquier instante es $m_X$:

$$\frac1\lambda=\frac1{\sqrt2}\;\Rightarrow\;\boxed{\lambda=\sqrt2}$$

**Comprobación (los datos de $X$ sí son coherentes):** la varianza de la exponencial es $1/\lambda^2=\tfrac12$, y $C_X(0)=R_X(0)-m_X^2=1-\tfrac12=\tfrac12$ ✔. Además $E[X^2]=2/\lambda^2=1=R_X(0)$ ✔.

---

## Problema 6

**Enunciado.** $X(t)$ WSS con $R_X(\tau)=e^{-a\lvert\tau\rvert}$. $Y(t)=X(t)\cos(\omega_0t+\phi)$ con $\phi\sim U(-\pi,\pi)$ independiente de $X$. Halla $R_Y$.

**Planteamiento.** La independencia permite factorizar la esperanza:

$$R_Y(t,t+\tau)=E[X(t)X(t+\tau)]\;E\big[\cos(\omega_0t+\phi)\cos(\omega_0t+\omega_0\tau+\phi)\big]$$

**Factor de la portadora.** Con $\cos a\cos b=\tfrac12[\cos(a-b)+\cos(a+b)]$:

$$E[\ldots]=\tfrac12\cos(\omega_0\tau)+\tfrac12E\big[\cos(2\omega_0t+\omega_0\tau+2\phi)\big]$$

Como $\phi$ es uniforme en $(-\pi,\pi)$, el ángulo $2\phi$ recorre **dos periodos completos** de $2\pi$, y la esperanza del coseno es $0$. Queda $\tfrac12\cos\omega_0\tau$.

**Resultado.**

$$\boxed{R_Y(\tau)=\tfrac12\,e^{-a\lvert\tau\rvert}\cos(\omega_0\tau)}$$

**Comentarios.**

- La **fase aleatoria uniforme** elimina la dependencia de $t$: $Y$ es **WSS** (media $m_X\cdot E[\cos(\ldots)]=0$). Con portadora determinista $\cos\omega_0t$, $Y$ **no** sería WSS (tema anterior).
- (Complemento) $S_Y(\omega)=\tfrac14\big[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)\big]$ con $S_X(\omega)=\frac{2a}{a^2+\omega^2}$.

---

## Problema 7

**Enunciado.** $X(t),Y(t)$ gaussianos independientes, media cero y misma covarianza $C(t_1,t_2)$. $Z(t)=X(t)\cos\omega t+Y(t)\sin\omega t$. Halla la media y la autocovarianza de $Z$.

**Media.** $m_Z(t)=m_X\cos\omega t+m_Y\sin\omega t=\boxed{0}$.

**Autocovarianza** (al ser de media cero, coincide con la autocorrelación):

$$C_Z(t_1,t_2)=E[X(t_1)X(t_2)]\cos\omega t_1\cos\omega t_2+E[Y(t_1)Y(t_2)]\sin\omega t_1\sin\omega t_2+\text{(cruzados)}$$

Los términos cruzados contienen $E[X(t_1)Y(t_2)]=E[X]E[Y]=0$ por independencia y media cero. Entonces

$$C_Z(t_1,t_2)=C(t_1,t_2)\big[\cos\omega t_1\cos\omega t_2+\sin\omega t_1\sin\omega t_2\big]=\boxed{C(t_1,t_2)\cos\big(\omega(t_1-t_2)\big)}$$

**Comentarios.** $Z$ es gaussiano (combinación lineal de gaussianas independientes). Si $C(t_1,t_2)=C(\tau)$ (procesos WSS), $C_Z(\tau)=C(\tau)\cos\omega\tau$ y $Z$ es WSS.

---

## Problema 8

**Enunciado.** $X(t)=X_0+Vt$. $E[X_0]=2$, $E[V]=3$, $\text{Var}(X_0)=25$, $\text{Var}(V)=16$, correlación $E[X_0V]=9$. Halla a) $E[X(t)]$, b) $R_X$, c) $C_X$, d) ¿WSS?

**Aclaración.** «Correlación» en este curso es $E[X_0V]=9$ (no el coeficiente de correlación, que no puede valer 9 porque $\lvert\rho\rvert\le1$). Por tanto $\text{Cov}(X_0,V)=9-2\cdot3=3$.

**Momentos de segundo orden:** $E[X_0^2]=25+2^2=29$, $E[V^2]=16+3^2=25$.

**a)** $m_X(t)=E[X_0]+E[V]t=\boxed{2+3t}$.

**b)** $R_X(t_1,t_2)=E[(X_0+Vt_1)(X_0+Vt_2)]=E[X_0^2]+E[X_0V](t_1+t_2)+E[V^2]t_1t_2$:

$$\boxed{R_X(t_1,t_2)=29+9(t_1+t_2)+25\,t_1t_2}$$

**c)** $C_X=R_X-m_X(t_1)m_X(t_2)$, o directamente con varianzas y covarianza:

$$\boxed{C_X(t_1,t_2)=25+3(t_1+t_2)+16\,t_1t_2}$$

Comprobación: $29+9(t_1+t_2)+25t_1t_2-(2+3t_1)(2+3t_2)=25+3(t_1+t_2)+16t_1t_2$ ✔.

**d)** **No es WSS**: la media $2+3t$ depende de $t$ (y $R_X$ contiene $t_1t_2$).

---

## Problema 9

**Enunciado.** $g(t)$ es el pulso rectangular de la figura (valor $1$ en $0<t<1$, $0$ fuera). $X(t)=A\,g(t)$ con $A=\pm1$ equiprobable. Halla a) la pmf conjunta de $X(t)$ y $X(t+d)$; b) $C_X(t,t+d)$, $d>0$.

![Pulso rectangular](Relacion2_img/p09_pulso_rectangular.png)

**Idea.** $X(t)=A\,g(t)$, y $g(t)$ solo vale 0 o 1. Hay que distinguir según estén $t$ y $t+d$ dentro o fuera del pulso. Para $0<d<1$:

| Región de $t$ | $g(t)$ | $g(t+d)$ | Par $(X(t),X(t+d))$ |
|---|---|---|---|
| **I:** $0<t<1-d$ | 1 | 1 | $(A,A)$ |
| **II:** $1-d\le t<1$ | 1 | 0 | $(A,0)$ |
| **III:** $-d<t<0$ | 0 | 1 | $(0,A)$ |
| **IV:** resto | 0 | 0 | $(0,0)$ |

**a) pmf conjunta** (con $P[A=1]=P[A=-1]=\tfrac12$):

| Región | Valores y probabilidades |
|---|---|
| I | $P(1,1)=\tfrac12,\;P(-1,-1)=\tfrac12$; el resto, 0 |
| II | $P(1,0)=\tfrac12,\;P(-1,0)=\tfrac12$ |
| III | $P(0,1)=\tfrac12,\;P(0,-1)=\tfrac12$ |
| IV | $P(0,0)=1$ |

(Para $d\ge1$ la región I desaparece: nunca están los dos instantes dentro del pulso.)

**b) Autocovarianza.** La media es $E[X(t)]=E[A]\,g(t)=0$, así que $C_X=R_X$:

$$C_X(t,t+d)=E[A^2]\,g(t)\,g(t+d)=g(t)\,g(t+d)$$

$$\boxed{C_X(t,t+d)=\begin{cases}1,&0<t<1-d\;\;(0<d<1)\\0,&\text{en otro caso}\end{cases}}$$

**Comentario.** Depende de $t$ (no solo de $d$): **$X(t)$ no es WSS**, aunque tenga media cero.

---

## Problema 10

**Enunciado.** $X(t),Y(t)$ independientes, WSS, media cero y $C_X(\tau)=4e^{-\lvert\tau\rvert}$ (ambos). $Z(t)=3X(t)-5Y(t)$. a) ¿WSS? b) pdf de $Z(t)$ si son conjuntamente gaussianos. c) pdf conjunta de $Z(t_1),Z(t_2)$. d) Covarianza cruzada entre $Z$ y $X$.

**a) WSS.** Media: $m_Z=3\cdot0-5\cdot0=0$ (constante). Autocorrelación:

$$R_Z(\tau)=9R_X(\tau)+25R_Y(\tau)-15\big[R_{XY}(\tau)+R_{YX}(\tau)\big]$$

Los cruzados son $0$ (independientes y de media cero). Como $m=0$, $R=C$:

$$R_Z(\tau)=(9+25)\cdot4e^{-\lvert\tau\rvert}=\boxed{136\,e^{-\lvert\tau\rvert}}$$

Solo depende de $\tau$ ⇒ **$Z$ es WSS**.

**b) pdf de $Z(t)$.** Por la ayuda, $Z$ es gaussiano; con media $0$ y varianza $R_Z(0)=136$:

$$f_{Z(t)}(z)=\frac1{\sqrt{2\pi\cdot136}}e^{-z^2/(2\cdot136)}=\boxed{\frac{1}{\sqrt{272\pi}}\,e^{-z^2/272}}$$

**c) pdf conjunta.** $(Z(t_1),Z(t_2))$ es gaussiano bidimensional de media $(0,0)$ y

$$K=136\begin{pmatrix}1&e^{-\lvert\tau\rvert}\\e^{-\lvert\tau\rvert}&1\end{pmatrix},\quad\tau=t_2-t_1,\quad\det K=136^2\left(1-e^{-2\lvert\tau\rvert}\right)$$

Con $\rho=e^{-\lvert t_2-t_1\rvert}$:

$$\boxed{f(z_1,z_2)=\frac{1}{2\pi\cdot136\sqrt{1-\rho^2}}\exp\!\left\{-\frac{z_1^2-2\rho\,z_1z_2+z_2^2}{2\cdot136\,(1-\rho^2)}\right\}}$$

**d) Covarianza cruzada.**

$$C_{Z,X}(\tau)=E[Z(t)X(t+\tau)]=3\,C_X(\tau)-5\,\underbrace{E[Y(t)X(t+\tau)]}_{=0\text{ (indep., media 0)}}=\boxed{12\,e^{-\lvert\tau\rvert}}$$

(es par, así que no importa el orden de los instantes).

---

## Problema 11

**Enunciado.** $Z_1,Z_2,\dots$ iid con $P[Z_n=1]=p$ y $P[Z_n=-1]=q=1-p$. $X_n=\sum_{i=1}^nZ_i$, $X_0=0$ (paseo aleatorio simple). a) Tipo de proceso. b) Una realización. c) pmf de primer orden $p_n(k)=P[X_n=k]$.

**a) Tipo de proceso.** Proceso **discreto en el tiempo** y de **valores discretos (enteros)**. Es el **proceso suma** de variables iid: tiene **incrementos independientes**, es una **cadena de Markov** con transiciones $P[X_{n+1}=k+1|X_n=k]=p$ y $P[X_{n+1}=k-1|X_n=k]=q$. **No es estacionario**: $E[X_n]=n(p-q)=n(2p-1)$ y $\text{Var}[X_n]=4npq$ (porque $\text{Var}(Z)=1-(p-q)^2=4pq$) dependen de $n$.

**b) Una realización** ($p=\tfrac12$, lanzando una moneda; $+1$ cara, $-1$ cruz):

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| $Z_n$ | +1 | +1 | −1 | +1 | −1 | −1 | −1 | +1 | +1 | +1 |
| $X_n$ | 1 | 2 | 1 | 2 | 1 | 0 | −1 | 0 | 1 | 2 |

(con $X_0=0$). Cada nueva muestra es la anterior más $\pm1$.

![Paseo aleatorio](Relacion2_img/p11_paseo_aleatorio.png)

*Figura: tres realizaciones para $p=0.5$ (sin deriva, la dispersión crece como $\sqrt n$) y $p=0.7$ (deriva positiva $n(2p-1)$).*

**c) pmf de primer orden.** Sea $K$ el número de pasos $+1$ en $n$ pasos: $K\sim\text{Binomial}(n,p)$. Como $X_n=K-(n-K)=2K-n$:

$$\boxed{p_n(k)=P[X_n=k]=\binom{n}{\frac{n+k}2}\,p^{\frac{n+k}2}\,q^{\frac{n-k}2},\quad k=-n,-n+2,\dots,n}$$

y $p_n(k)=0$ si $k$ no tiene la misma paridad que $n$ o $\lvert k\rvert>n$.

*Ejemplo ($n=4$, $p=0.6$):* $p_4(-4)=0.0256$, $p_4(-2)=0.1536$, $p_4(0)=0.3456$, $p_4(2)=0.3456$, $p_4(4)=0.1296$ (suman 1).

**Extra:** como los incrementos son independientes, $C_X(n_1,n_2)=4pq\min(n_1,n_2)$.

---

## Problema 12

**Enunciado.** $Y(t)=A\sin(\omega t+\phi)$, $A\sim\text{Bernoulli}(p)$ (valores 0 y 1), $\phi\sim U(-\pi,\pi)$ independiente de $A$. a) Media. b) Autocorrelación. c) ¿WSS? d) ¿Ergódico en la media o en la autocorrelación?

**Momentos:** $E[A]=p$, $E[A^2]=p$ (porque $A^2=A$).

**a) Media.** $E[Y(t)]=E[A]\,E[\sin(\omega t+\phi)]=p\cdot0=\boxed{0}$, ya que $\frac1{2\pi}\int_{-\pi}^{\pi}\sin(\omega t+\phi)\,d\phi=0$.

**b) Autocorrelación.** Con $\sin a\sin b=\tfrac12[\cos(a-b)-\cos(a+b)]$:

$$R_Y(t,t+\tau)=E[A^2]\,E[\sin(\omega t+\phi)\sin(\omega t+\omega\tau+\phi)]=p\cdot\tfrac12\cos\omega\tau$$

$$\boxed{R_Y(\tau)=\tfrac p2\cos(\omega\tau)}$$

(el término $\cos(2\omega t+\omega\tau+2\phi)$ promedia $0$ por la fase uniforme).

**c) WSS.** Media constante ($0$) y autocorrelación función solo de $\tau$ ⇒ **sí es WSS**.

**d) Ergodicidad.** Se comparan promedios temporales de **una realización** con los estadísticos. Cada realización depende de $A$ y $\phi$:

- Si $A=1$ (prob. $p$): $y(t)=\sin(\omega t+\phi)$.
- Si $A=0$ (prob. $1-p$): $y(t)\equiv0$.

*Media:* $\langle y\rangle=\lim\frac1{2T}\int_{-T}^{T}y\,dt=0$ en **ambos** casos, igual a $m_Y=0$ ⇒ **ergódico en la media** ✔.

*Autocorrelación:* $\Re(\tau)=\lim\frac1{2T}\int y(t)y(t+\tau)\,dt=A\cdot\tfrac12\cos\omega\tau$, que vale $\tfrac12\cos\omega\tau$ (prob. $p$) o $0$ (prob. $1-p$). Es una **variable aleatoria**:

$$E[\Re(\tau)]=\tfrac p2\cos\omega\tau=R_Y(\tau)\ \checkmark,\qquad\text{Var}[\Re(\tau)]=\tfrac14\cos^2(\omega\tau)\,p(1-p)\neq0$$

La varianza **no se anula**, y ninguna realización individual da $R_Y(\tau)$ (da $\tfrac12\cos\omega\tau$ o $0$). Por tanto **NO es ergódico en la autocorrelación** (salvo casos triviales $p=0,1$).

**Conclusión:** ergódico en la media, **no** ergódico en la autocorrelación. (Intuición: la potencia de cada realización es $\tfrac12$ o $0$, nunca $\tfrac p2$.)

---

## Problema 13

**Enunciado.** $Z(t)=X\cos(2\pi f_0t)+Y\sin(2\pi f_0t)$, $X\sim U(-1,1)$, $Y\sim U(0,1)$, independientes. a) $m_Z(t)$. b) $R_Z(t,t+\tau)$; ¿WSS? c) Potencia media $P_Z$.

**Momentos.** $E[X]=0$, $E[X^2]=\frac{2^2}{12}=\frac13$. $E[Y]=\tfrac12$, $E[Y^2]=\frac1{12}+\frac14=\frac13$. Independencia: $E[XY]=E[X]E[Y]=0$.

**a) Media.**

$$m_Z(t)=0\cdot\cos(2\pi f_0t)+\tfrac12\sin(2\pi f_0t)=\boxed{\tfrac12\sin(2\pi f_0t)}$$

**b) Autocorrelación.**

$$R_Z(t,t+\tau)=E[X^2]\cos\theta_1\cos\theta_2+E[XY](\ldots)+E[Y^2]\sin\theta_1\sin\theta_2,\quad\theta_1=2\pi f_0t,\ \theta_2=2\pi f_0(t+\tau)$$

$$=\tfrac13\big[\cos\theta_1\cos\theta_2+\sin\theta_1\sin\theta_2\big]=\boxed{\tfrac13\cos(2\pi f_0\tau)}$$

La autocorrelación **sí** depende solo de $\tau$, pero la media $\tfrac12\sin(2\pi f_0t)$ **no es constante** ⇒ **$Z(t)$ NO es WSS** (hay que cumplir las dos condiciones).

**c) Potencia media.** Como el proceso no es WSS, la potencia es el promedio temporal del valor cuadrático medio:

$$P_Z=A\{E[Z^2(t)]\}=A\{R_Z(t,t)\}=\tfrac13\cos(0)=\boxed{\tfrac13}$$

(en este caso $E[Z(t)^2]=\tfrac13[\cos^2+\sin^2]=\tfrac13$ es constante).

---

## Problema 14

**Enunciado.** $X(t)$ de media cero y $R_X(t,t+\tau)=e^{-2\lambda\lvert\tau\rvert}$, $\lambda>0$. Halla $S_X(\omega)$.

La autocorrelación solo depende de $\tau$ (Wiener-Khinchin). Se usa $\displaystyle\int_{-\infty}^{\infty}e^{-\alpha\lvert\tau\rvert}e^{-j\omega\tau}d\tau=\frac{2\alpha}{\alpha^2+\omega^2}$ con $\alpha=2\lambda$:

$$\boxed{S_X(\omega)=\frac{2\cdot2\lambda}{(2\lambda)^2+\omega^2}=\frac{4\lambda}{4\lambda^2+\omega^2}}$$

(en hercios: $S_X(f)=\dfrac{\lambda}{\lambda^2+\pi^2f^2}$).

*Derivación de la integral:* $\int_0^\infty e^{-(\alpha+j\omega)\tau}d\tau+\int_0^\infty e^{-(\alpha-j\omega)\tau}d\tau=\frac1{\alpha+j\omega}+\frac1{\alpha-j\omega}=\frac{2\alpha}{\alpha^2+\omega^2}$.

*Comprobación:* $P_X=\frac1{2\pi}\int S_X\,d\omega=\frac1{2\pi}\cdot4\lambda\cdot\frac{\pi}{2\lambda}=1=R_X(0)$ ✔.

---

## Problema 15

**Enunciado.** $X(t)=A\cos(\omega_0t+\phi)$, $A,\omega_0$ constantes, $\phi\sim U(-\pi,\pi)$. Halla $S_X(\omega)$.

**Paso 1: media.** $E[X]=A\,E[\cos(\omega_0t+\phi)]=0$.

**Paso 2: autocorrelación.**

$$R_X(t,t+\tau)=A^2E\big[\cos(\omega_0t+\phi)\cos(\omega_0t+\omega_0\tau+\phi)\big]=\frac{A^2}2\cos(\omega_0\tau)$$

(el término $\cos(2\omega_0t+\omega_0\tau+2\phi)$ promedia 0). Es WSS.

**Paso 3: transformada.** Con $\cos\omega_0\tau\leftrightarrow\pi[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$:

$$\boxed{S_X(\omega)=\frac{\pi A^2}2\big[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)\big]}$$

*Comprobación:* $P_X=\frac1{2\pi}\cdot\frac{\pi A^2}{2}\cdot2=\frac{A^2}2=R_X(0)$ ✔. Toda la potencia está concentrada en $\pm\omega_0$.

---

## Problema 16

**Enunciado.** $X(t)$ de media constante y $R_X(\tau)=B\,e^{-\tau^2/2a^2}$, $B,a>0$. Halla a) $S_X$, b) $P_X$.

**Observación.** Como $R_X(\tau)\to0$ cuando $\tau\to\infty$ y siempre $R_X(\infty)=m_X^2$, la media es **cero** (no hay delta en $\omega=0$).

**a)** La transformada de una gaussiana: $\displaystyle\int e^{-\tau^2/2a^2}e^{-j\omega\tau}d\tau=a\sqrt{2\pi}\,e^{-a^2\omega^2/2}$. Entonces

$$\boxed{S_X(\omega)=B\,a\sqrt{2\pi}\;e^{-a^2\omega^2/2}}$$

(otra gaussiana: autocorrelación ancha, $a$ grande, ⇒ PSD estrecha).

**b)** $P_X=R_X(0)=\boxed{B}$.

*Comprobación:* $\frac1{2\pi}\int B a\sqrt{2\pi}e^{-a^2\omega^2/2}d\omega=\frac{Ba\sqrt{2\pi}}{2\pi}\cdot\frac{\sqrt{2\pi}}{a}=B$ ✔.

---

## Problema 17

**Enunciado.** $D_n=X_n-X_{n-d}$, con $X_n$ WSS de media cero y $d$ constante (entero). a) $R_D(k)$ y $S_D(f)$ en función de $R_X$ y $S_X$. b) $E[D_n^2]$.

**a) Autocorrelación.**

$$R_D(k)=E\big[(X_n-X_{n-d})(X_{n+k}-X_{n+k-d})\big]$$

Cuatro términos:

- $E[X_nX_{n+k}]=R_X(k)$
- $-E[X_nX_{n+k-d}]=-R_X(k-d)$
- $-E[X_{n-d}X_{n+k}]=-R_X(k+d)$
- $+E[X_{n-d}X_{n+k-d}]=R_X(k)$

$$\boxed{R_D(k)=2R_X(k)-R_X(k-d)-R_X(k+d)}$$

**PSD.** Un desplazamiento $R_X(k\mp d)$ se transforma en $S_X(f)e^{\mp j2\pi fd}$:

$$S_D(f)=S_X(f)\big[2-e^{-j2\pi fd}-e^{j2\pi fd}\big]=\boxed{S_X(f)\,\big[2-2\cos(2\pi fd)\big]=4\sin^2(\pi fd)\,S_X(f)}$$

(es lo esperado para el filtro $H=1-z^{-d}$: $\lvert H\rvert^2=2-2\cos(2\pi fd)$. Es un filtro «derivador»: anula la continua, $f=0$.)

**b) Potencia.**

$$E[D_n^2]=R_D(0)=2R_X(0)-R_X(-d)-R_X(d)=\boxed{2\big[R_X(0)-R_X(d)\big]}$$

(porque $R_X$ es par). Si la señal varía lentamente ($R_X(d)\approx R_X(0)$), la diferencia es pequeña.

---

## Problema 18

**Enunciado.** $X(t)$ gaussiano WSS con $E[X(t)]=4$ y $R_X(\tau)=25e^{-3\lvert\tau\rvert}+16$. a) pdf conjunta de $X(t_1),X(t_2),X(t_3)$ con $t_i=t_0+\frac{i-1}2$. b) $S_X$. c) $P_X$.

**Paso 0: separar media y covarianza.** $m_X^2=16$ ✔ (coincide con la constante de $R_X$), luego

$$C_X(\tau)=R_X(\tau)-m_X^2=25e^{-3\lvert\tau\rvert}$$

**a) pdf conjunta.** Los instantes están separados $0.5$ s. Con $a=e^{-3\cdot0.5}=e^{-1.5}\approx0.2231$:

- Medias: $\mathbf m=(4,4,4)^T$.
- Varianzas: $C_X(0)=25$.
- Covarianzas: $C_X(0.5)=25e^{-1.5}=25a$ y $C_X(1)=25e^{-3}=25a^2$.

$$K=25\begin{pmatrix}1&a&a^2\\a&1&a\\a^2&a&1\end{pmatrix}\quad(\rho_{12}=\rho_{23}=0.2231,\ \rho_{13}=e^{-3}=0.0498)$$

Es una matriz de tipo AR(1) (Toeplitz con $\rho^{\lvert i-j\rvert}$), cuyo determinante e inversa son sencillos:

$$\det K=25^3(1-a^2)^2=25^3(1-e^{-3})^2\approx14\,108$$

$$K^{-1}=\frac{1}{25(1-a^2)}\begin{pmatrix}1&-a&0\\-a&1+a^2&-a\\0&-a&1\end{pmatrix}$$

La pdf es

$$\boxed{f(x_1,x_2,x_3)=\frac{1}{(2\pi)^{3/2}\sqrt{\det K}}\exp\!\left\{-\tfrac12(\mathbf x-\mathbf m)^TK^{-1}(\mathbf x-\mathbf m)\right\}}$$

con $(2\pi)^{3/2}\sqrt{\det K}\approx1870.7$ y, definiendo $u_i=x_i-4$,

$$(\mathbf x-\mathbf m)^TK^{-1}(\mathbf x-\mathbf m)=\frac{u_1^2-2a\,u_1u_2+(1+a^2)\,u_2^2-2a\,u_2u_3+u_3^2}{25\,(1-a^2)}\approx0.0421\left[u_1^2-0.446\,u_1u_2+1.050\,u_2^2-0.446\,u_2u_3+u_3^2\right]$$

(la inversa se ha comprobado numéricamente).

**b) PSD.** Transformando: $\mathcal F\{25e^{-3\lvert\tau\rvert}\}=\frac{25\cdot6}{9+\omega^2}$ y $\mathcal F\{16\}=2\pi\cdot16\,\delta(\omega)$:

$$\boxed{S_X(\omega)=32\pi\,\delta(\omega)+\frac{150}{9+\omega^2}}$$

La delta en $\omega=0$ es la componente continua (media $4$, potencia $16$).

**c) Potencia.**

$$P_X=R_X(0)=25+16=\boxed{41}$$

(= varianza $25$ + media al cuadrado $16$).

---

## Problema 19

**Enunciado.** $Y(t)=A\,X(t)$, con $X(t)$ WSS y $A$ independiente de $X$, $A=\pm1$ equiprobable. Halla $S_Y(\omega)$ en función de $S_X(\omega)$.

**Media.** $m_Y=E[A]\,m_X=0$ (constante).

**Autocorrelación.** Por independencia y porque $A^2=1$:

$$R_Y(t,t+\tau)=E[A^2]\,R_X(\tau)=R_X(\tau)$$

Es función solo de $\tau$ ⇒ $Y$ es WSS y, aplicando Wiener-Khinchin:

$$\boxed{S_Y(\omega)=S_X(\omega)}$$

**Comentario.** Multiplicar por un signo aleatorio no cambia la PSD (la potencia en cada frecuencia no cambia al invertir el signo de toda la señal). Si $X$ tuviera media $m_X\ne0$, $Y$ tiene media cero pero $R_Y=R_X$ sigue incluyendo $m_X^2$, así que $S_Y$ conserva la delta en $\omega=0$ (en cada realización hay una componente continua $\pm m_X$).

---

## Problema 20

**Enunciado.** SLIT con $h(t)=4e^{-2t}u(t)$, entrada WSS con media $m_X=2$. Halla la media de la salida.

**Planteamiento.** Para un SLIT con entrada WSS, $m_Y=H(0)\,m_X$, donde $H(0)=\int h(t)\,dt$ es la ganancia en continua.

**Cálculo.**

$$H(0)=\int_0^\infty4e^{-2t}dt=4\cdot\frac12=2$$

$$\boxed{m_Y=H(0)\,m_X=2\cdot2=4}$$

(No hace falta conocer la autocorrelación de la entrada.)

---

## Problema 21

**Enunciado.** Entrada: ruido blanco de media cero y PSD $N_0/2$. Filtro $H(f)=\dfrac{1}{1+j2\pi f}$. Halla a) $S_{Y,X}$ y $R_{Y,X}$; b) $S_Y$ y $R_Y$; c) la potencia de salida.

**Datos.** $h(t)=e^{-t}u(t)$ (transformada inversa de $H$) y $S_X(f)=\frac{N_0}2$, $R_X(\tau)=\frac{N_0}2\delta(\tau)$.

**a) Correlación y PSD cruzadas** (convención $R_{Y,X}(\tau)=E[Y(t+\tau)X(t)]$):

$$S_{Y,X}(f)=H(f)\,S_X(f)=\boxed{\frac{N_0/2}{1+j2\pi f}}$$

$$R_{Y,X}(\tau)=h(\tau)*R_X(\tau)=\boxed{\frac{N_0}2\,e^{-\tau}u(\tau)}$$

**b) PSD y autocorrelación de salida.**

$$S_Y(f)=\lvert H(f)\rvert^2S_X(f)=\boxed{\frac{N_0/2}{1+4\pi^2f^2}}$$

Para $R_Y$ se usa el par $\sigma^2e^{-\alpha\lvert\tau\rvert}\leftrightarrow\dfrac{2\alpha\sigma^2}{\alpha^2+(2\pi f)^2}$ con $\alpha=1$: $2\sigma^2=\frac{N_0}2\Rightarrow\sigma^2=\frac{N_0}4$:

$$R_Y(\tau)=\boxed{\frac{N_0}4\,e^{-\lvert\tau\rvert}}$$

*Comprobación en el tiempo:* $R_Y=\frac{N_0}2\,h(\tau)*h(-\tau)$ y, para $\tau\ge0$, $\int_0^\infty e^{-t}e^{-t-\tau}dt=\frac12e^{-\tau}$ ✔.

**c) Potencia promedio de la salida.**

$$P_Y=R_Y(0)=\boxed{\frac{N_0}4}$$

*Comprobación:* $\int_{-\infty}^{\infty}\frac{N_0/2}{1+4\pi^2f^2}df=\frac{N_0}2\cdot\frac12=\frac{N_0}4$ ✔.

---

## Problema 22

**Enunciado.** Entrada: ruido blanco de PSD $\sigma^2$ a un sistema que suma $X(t)$ y una copia retardada $T$ y multiplicada por $a$. Halla $S_Y$.

![Filtro con retardo](Relacion2_img/p22_filtro_retardo.png)

**Paso 1: ecuación del sistema.** $Y(t)=X(t)+a\,X(t-T)$.

**Paso 2: respuesta en frecuencia.** Con $h(t)=\delta(t)+a\,\delta(t-T)$:

$$H(f)=1+a\,e^{-j2\pi fT}$$

**Paso 3: ganancia en potencia.**

$$\lvert H(f)\rvert^2=(1+a\cos2\pi fT)^2+(a\sin2\pi fT)^2=1+a^2+2a\cos(2\pi fT)$$

**Paso 4: PSD de salida.**

$$\boxed{S_Y(f)=\sigma^2\big[1+a^2+2a\cos(2\pi fT)\big]}$$

(en $\omega$: $S_Y(\omega)=\sigma^2[1+a^2+2a\cos\omega T]$).

**Autocorrelación asociada:** $R_Y(\tau)=\sigma^2\big[(1+a^2)\delta(\tau)+a\,\delta(\tau-T)+a\,\delta(\tau+T)\big]$.

**Comentarios.** El filtro es de tipo «peine»: la PSD es periódica en $f$ de periodo $1/T$, con máximos $(1+a)^2\sigma^2$ en $f=k/T$ y mínimos $(1-a)^2\sigma^2$ en $f=(k+\tfrac12)/T$ (para $a>0$). La potencia total es infinita, porque la entrada es blanca ideal.

---

## Problema 23

**Enunciado.** El sistema de la figura recibe $x(t)$ WSS. a) $R_Y$ en función de $R_X$. b) $S_Y$ con $R_X(\tau)=4e^{-\lvert\tau\rvert/3}$. c) $\lvert H\rvert$ a partir de $S_Y$ y $S_X$. d) Si la muestra de orden uno de $x(t)$ es uniforme en $[-a,a]$, halla $a$.

![Sistema con retardos](Relacion2_img/p23_sistema_retardos.png)

**Ecuación del sistema.** De la figura, la rama superior (sin retardo) tiene ganancia $2$ y la que atraviesa los dos retardos de 1 s tiene ganancia $3$:

$$y(t)=2\,x(t)+3\,x(t-2)$$

**a) Autocorrelación de salida.**

$$R_Y(\tau)=E[y(t)y(t+\tau)]=4R_X(\tau)+9R_X(\tau)+6R_X(\tau-2)+6R_X(\tau+2)$$

(términos: $E[2x(t)\,2x(t+\tau)]$, $E[3x(t-2)\,3x(t+\tau-2)]$, $E[2x(t)\,3x(t+\tau-2)]=6R_X(\tau-2)$ y $E[3x(t-2)\,2x(t+\tau)]=6R_X(\tau+2)$.)

$$\boxed{R_Y(\tau)=13\,R_X(\tau)+6\,R_X(\tau-2)+6\,R_X(\tau+2)}$$

**b) PSD de salida.** Primero $S_X$ con $\alpha=\tfrac13$:

$$S_X(\omega)=4\cdot\frac{2/3}{1/9+\omega^2}=\frac{24}{1+9\omega^2}$$

Los desplazamientos temporales se transforman en $e^{\mp j2\omega}$ (retardo de 2 s):

$$S_Y(\omega)=S_X(\omega)\big[13+6e^{-j2\omega}+6e^{j2\omega}\big]=\boxed{\frac{24\,\big(13+12\cos2\omega\big)}{1+9\omega^2}}$$

**c) Módulo de la respuesta en frecuencia.** Como $S_Y=\lvert H\rvert^2S_X$:

$$\lvert H\rvert^2=\frac{S_Y}{S_X}=13+12\cos2\omega\;\Rightarrow\;\boxed{\lvert H(\omega)\rvert=\sqrt{13+12\cos2\omega}}$$

(con $\omega=2\pi f$: $\sqrt{13+12\cos4\pi f}$). *Comprobación directa:* $H=2+3e^{-j2\omega}$ y $\lvert H\rvert^2=4+9+12\cos2\omega$ ✔.

**d) Valor de $a$.** La media de $x(t)$ es cero (porque $R_X(\tau)\to0$ para $\tau\to\infty$) y su varianza es $R_X(0)=4$. Una uniforme en $[-a,a]$ tiene media 0 y varianza $a^2/3$:

$$\frac{a^2}3=4\;\Rightarrow\;a^2=12\;\Rightarrow\;\boxed{a=2\sqrt3\approx3.46}$$

---

## Problema 24

**Enunciado.** $X(t)$ gaussiano WSS de media cero, $R_X(\tau)=8\,\text{sinc}(4\tau)$, entra a un filtro con $\lvert H(f)\rvert=2$ para $\lvert f\rvert\le2$ y $0$ fuera. a) $R_Y$. b) $P[Y(2)<1]$.

**Convención.** $\text{sinc}(x)=\dfrac{\sin\pi x}{\pi x}$, cuya transformada es $\mathcal F\{\text{sinc}(W\tau)\}=\frac1W\,\text{rect}(f/W)$.

**a) PSD de entrada.** Con $W=4$:

$$S_X(f)=8\cdot\frac14\,\text{rect}\!\left(\frac f4\right)=\begin{cases}2,&\lvert f\rvert\le2\\0,&\text{en otro caso}\end{cases}$$

(comprobación: $P_X=\int S_X\,df=2\cdot4=8=R_X(0)$ ✔). La señal ocupa **exactamente** $\lvert f\rvert\le2$ Hz, la banda de paso del filtro.

**PSD de salida.** $S_Y=\lvert H\rvert^2S_X=4\cdot2=8$ en $\lvert f\rvert\le2$ y $0$ fuera. Es decir $S_Y=4\,S_X$, y por tanto

$$\boxed{R_Y(\tau)=4\,R_X(\tau)=32\,\text{sinc}(4\tau)}$$

Potencia de salida: $P_Y=R_Y(0)=32=4\cdot8$.

**b) Probabilidad.** $Y(t)$ es una transformación lineal de un proceso gaussiano ⇒ **gaussiano**. Su media es $m_Y=H(0)\,m_X=2\cdot0=0$ y su varianza $R_Y(0)=32$, constante (WSS). Entonces $Y(2)\sim\mathcal N(0,32)$:

$$P[Y(2)<1]=\Phi\!\left(\frac{1}{\sqrt{32}}\right)=\Phi(0.1768)=1-Q(0.1768)\approx\boxed{0.570}$$

**Comentario sobre la convención.** Si se interpreta $\text{sinc}(x)=\sin x/x$ la señal ocupa una banda menor ($\lvert\omega\rvert<4$ rad/s $\approx0.64$ Hz), que sigue estando dentro de la banda de paso del filtro. Entonces también $S_Y=4S_X$, $R_Y=4R_X$ y la varianza vale $32$: **el resultado es el mismo con ambas convenciones**.

---

# Resumen de herramientas y errores típicos

**Cómo atacar cada tipo de problema**

| Tipo | Receta |
|---|---|
| ¿Es WSS? | Calcula $m_X(t)$ **y** $R_X(t_1,t_2)$. Si la media depende de $t$ ⇒ NO WSS (aunque $R$ solo dependa de $\tau$: problemas 3, 13) |
| Proceso $f(\text{v.a.},t)$ | Saca las v.a. por linealidad y usa sus momentos: $E[U^2],E[UV]$... (problemas 1, 4, 8) |
| Fase aleatoria uniforme | $E[\cos(\ldots+2\phi)]=0$, y deja solo el término en $\tau$ (problemas 6, 12, 15) |
| Suma de procesos independientes | $C_Z=C_X+C_Y$; $R_Z=R_X+R_Y+2m_Xm_Y$ (problemas 5, 10) |
| Gaussiano | Construye $\mathbf m$ y $K$ con $C_X$ (resta $m^2$ de $R_X$) (problemas 10, 18) |
| PSD | Wiener-Khinchin: tabla de pares (exponencial, gaussiana, coseno, constante) (problemas 14–16, 18) |
| Salida de un SLIT | $m_Y=H(0)m_X$, $S_Y=\lvert H\rvert^2S_X$; retardo $\leftrightarrow e^{-j\omega T}$ (problemas 20–24) |
| Ergodicidad | Compara promedio temporal de **una** realización con el estadístico y mira la varianza (problema 12) |

**Errores típicos**

1. Concluir «es WSS» mirando solo la autocorrelación (olvidar la media): problemas 3, 8, 13.
2. Usar $R_X$ en lugar de $C_X$ en la matriz de covarianzas de un gaussiano (problemas 10, 18).
3. Olvidar la **delta en $\omega=0$** cuando hay media no nula (problema 18).
4. Olvidar que $\lvert H\rvert$ va **al cuadrado** en $S_Y=\lvert H\rvert^2S_X$.
5. Confundir «correlación» ($E[XY]$) con «coeficiente de correlación» (problema 8).
6. No justificar: una respuesta de examen necesita **el cálculo y la conclusión explícita**.
7. No comprobar la coherencia de los datos (problema 5: $R_Y(0)<m_Y^2$ es imposible).