# Respuesta de un sistema lineal a una señal aleatoria — Teoría de la Comunicación

Resumen completo y explicado del Tema 4: cálculo en sentido cuadrático promedio (continuidad, derivada, integral) y respuesta de un sistema lineal e invariante (SLIT) a un proceso aleatorio WSS.

## Índice

0. [Mapa del tema y notación](#0-mapa-del-tema-y-notación)
1. [Introducción: para qué sirve](#1-introducción-para-qué-sirve)
2. [Continuidad de un proceso aleatorio](#2-continuidad-de-un-proceso-aleatorio)
3. [Derivación de un proceso aleatorio](#3-derivación-de-un-proceso-aleatorio)
4. [Integración de un proceso aleatorio](#4-integración-de-un-proceso-aleatorio)
5. [Sistemas lineales e invariantes (SLIT): repaso](#5-sistemas-lineales-e-invariantes-slit-repaso)
6. [Respuesta de un SLIT a un proceso WSS](#6-respuesta-de-un-slit-a-un-proceso-wss)
7. [Densidad espectral y correlación cruzada entrada-salida](#7-densidad-espectral-y-correlación-cruzada-entrada-salida)
8. [Entrada gaussiana, ruido blanco y versión discreta](#8-entrada-gaussiana-ruido-blanco-y-versión-discreta)
9. [Ejercicios resueltos](#9-ejercicios-resueltos)
10. [Banco de preguntas con respuesta modelo](#10-banco-de-preguntas-con-respuesta-modelo)
11. [Errores típicos y erratas de las diapositivas](#11-errores-típicos-y-erratas-de-las-diapositivas)
12. [Formulario resumen](#12-formulario-resumen)

> Los apartados marcados como **(complemento)** no están literalmente en las diapositivas, pero se deducen de ellas y ayudan a entender o a resolver ejercicios.

---

## 0. Mapa del tema y notación

**Hilo conductor.** Un sistema transforma una señal de entrada en otra de salida. Si la entrada es un **proceso aleatorio**, la salida también lo es. La pregunta del tema es: **¿qué propiedades estadísticas tiene la salida (media, autocorrelación, PSD, pdf) conociendo las de la entrada y el sistema?**

```
Proceso X(t) ──►[ Sistema lineal e invariante h(t) ]──► Proceso Y(t)
 (WSS: m_X, R_X, S_X)                H(f)                (m_Y, R_Y, S_Y = ?)
```

**Estructura:**

| Bloque | Operaciones |
|---|---|
| Cálculo en sentido cuadrático promedio | Continuidad, derivada, integral de un proceso |
| SLIT con entrada aleatoria | Convolución, función de transferencia, $S_Y=\lvert H\rvert^2S_X$ |

**Idea unificadora (complemento).** Derivar e integrar son **casos particulares de SLIT**:

| Operación | $h(t)$ | $H(f)$ |
|---|---|---|
| Derivador | $\delta'(t)$ | $j2\pi f$ |
| Integrador | $u(t)$ | $\dfrac1{j2\pi f}$ (+ término en $f=0$) |
| Retardo $t_0$ | $\delta(t-t_0)$ | $e^{-j2\pi ft_0}$ |

**Notación:**

| Símbolo | Significado |
|---|---|
| $X(t)$ | Proceso de entrada; $Y(t)$ proceso de salida |
| $m_X,\;R_X(\tau),\;S_X(f)$ | Media, autocorrelación y PSD de $X$ (si es WSS) |
| $h(t)$ | Respuesta al impulso del sistema |
| $H(f)=\mathcal F[h(t)]=\displaystyle\int h(t)e^{-j2\pi ft}dt$ | Función de transferencia |
| $\text{l.i.m.}$ | *Limit in the mean*: límite en media cuadrática |
| $\tau=t_1-t_2$ | Diferencia de instantes (en procesos WSS) |

> **Convenio de frecuencia.** Este tema usa **$f$ en hercios**, y la potencia es $P=\int S(f)\,df$. En el tema anterior se usaba $\omega$ (rad/s) con $P=\frac1{2\pi}\int S(\omega)d\omega$. El módulo $\lvert H\rvert^2$ es el mismo; solo cambia el factor $2\pi$.

---

## 1. Introducción: para qué sirve

Muchas aplicaciones de comunicaciones implican **procesar procesos aleatorios**:

- **Predicción:** estimar valores futuros de la señal a partir de valores pasados.
- **Filtrado o suavizado:** recuperar la señal original cuando se ha corrompido con ruido.
- **Modulación:** trasladar señales de baja frecuencia a señales de alta frecuencia que se propagan mejor por el medio.

**Procesado** de un proceso aleatorio = **mapeo** de una función temporal en otra función temporal.

**Objetivo:** conocer las propiedades estadísticas del proceso de salida cuando la entrada es un proceso **WSS**.

Antes de llegar a los SLIT hace falta definir con rigor operaciones como derivar o integrar un proceso aleatorio, porque los límites habituales del cálculo no tienen por qué existir para todas las realizaciones.

---

## 2. Continuidad de un proceso aleatorio

### 2.1 Continuidad de una realización

Una realización $X(\xi_j,t)$ es continua en $t_0$ si

$$\lim_{t\to t_0}X(\xi_j,t)=X(\xi_j,t_0)$$

En algunos casos todas las realizaciones son continuas en $t_0$ y se concluye que el proceso es continuo. Pero **en general esto no ocurre**, y hace falta una definición **probabilística**.

### 2.2 Continuidad en sentido cuadrático promedio

$X(t)$ es **continuo en $t_0$ en sentido cuadrático promedio** (m.s.) si

$$\boxed{E\big[(X(t)-X(t_0))^2\big]\longrightarrow0\quad\text{cuando }t\to t_0}$$

Se escribe $\text{l.i.m.}_{t\to t_0}X(t)=X(t_0)$.

- Es **continuo en sentido cuadrático promedio** (a secas) si lo es para **todo** $t_0$.
- **Importante:** la continuidad en m.s. **no implica** que todas las realizaciones sean continuas.

### 2.3 Condiciones prácticas

Desarrollando el cuadrado:

$$E\big[(X(t)-X(t_0))^2\big]=R_X(t,t)-R_X(t_0,t)-R_X(t,t_0)+R_X(t_0,t_0)$$

Si $R_X(t_1,t_2)$ es continua en $(t_0,t_0)$, los cuatro términos convergen al mismo valor $R_X(t_0,t_0)$ y la suma tiende a $0$. De aquí:

| | Condición | Conclusión |
|---|---|---|
| **C1** | $R_X(t_1,t_2)$ continua en $t_1$ y en $t_2$ en el punto $(t_0,t_0)$ | $X(t)$ es continuo en m.s. en $t_0$ |
| **C2** | $X(t)$ es WSS y $R_X(\tau)$ es continua en $\tau=0$ | $X(t)$ es continuo en m.s. en **todo** $t_0$ |

**Por qué C2 (caso WSS).** Si $X$ es WSS,

$$E[(X(t)-X(t_0))^2]=2\big[R_X(0)-R_X(t-t_0)\big]$$

que tiende a $0$ cuando $t\to t_0$ **si y solo si $R_X$ es continua en $0$**.

### 2.4 Consecuencia sobre la media

Si $X(t)$ es continuo en m.s. en $t_0$, entonces **la media $m_X(t)$ es continua** en $t_0$:

$$\lim_{t\to t_0}m_X(t)=m_X(t_0)$$

(Idea: $\big(E[X(t)-X(t_0)]\big)^2\le E[(X(t)-X(t_0))^2]\to0$.)

### 2.5 Ejemplos (complemento)

| Proceso | ¿Continuo en m.s.? | Comentario |
|---|---|---|
| $R_X(\tau)=\sigma^2e^{-\alpha\lvert\tau\rvert}$ | **Sí** | $R_X$ continua en $0$ (aunque tenga un pico) |
| Ruido blanco, $R_X=\frac{N_0}2\delta(\tau)$ | **No** | $R_X$ no es continua en $0$ (de hecho no es una función) |
| Proceso de Poisson $N(t)$ | **Sí** | $R_N(t_1,t_2)=\lambda\min(t_1,t_2)+\lambda^2t_1t_2$ es continua, **pero todas las realizaciones tienen saltos** |

El proceso de Poisson ilustra la frase clave: continuidad en m.s. $\not\Rightarrow$ realizaciones continuas.

---

## 3. Derivación de un proceso aleatorio

### 3.1 Definición

Para una realización, la derivada usual es $\lim_{\varepsilon\to0}\dfrac{X(\xi_j,t+\varepsilon)-X(\xi_j,t)}{\varepsilon}$, pero ese límite puede existir para unas realizaciones y no para otras. Se define entonces la **derivada en sentido cuadrático promedio**:

$$\boxed{\dot X(t)=\frac{dX(t)}{dt}=\text{l.i.m.}_{\varepsilon\to0}\,\frac{X(t+\varepsilon)-X(t)}{\varepsilon}}$$

siempre que exista el límite, es decir, que

$$\lim_{\varepsilon\to0}E\!\left[\left(\frac{X(t+\varepsilon)-X(t)}{\varepsilon}-\dot X(t)\right)^2\right]=0$$

### 3.2 Condiciones de existencia

| | Condición | Conclusión |
|---|---|---|
| **C1** | Existe $\dfrac{\partial^2}{\partial t_1\partial t_2}R_X(t_1,t_2)$ en $(t_1,t_2)=(t,t)$ | Existe $\dot X(t)$ en m.s. en el punto $t$ |
| **C2** | $X(t)$ es WSS y $R_X(\tau)$ tiene derivada de **orden dos** en $\tau=0$: $\ddot R_X(0)=\dfrac{d^2R_X}{d\tau^2}\Big\vert_{\tau=0}$ | Existe $\dot X(t)$ en m.s. para **todo** $t$ |

**Interpretación.** Para poder derivar, la autocorrelación debe ser **suave** en el origen. Un «pico» (vértice) en $\tau=0$ significa que el proceso es demasiado irregular para tener derivada.

### 3.3 Propiedades

- $\dot X(t)$ es **un nuevo proceso aleatorio**.
- Si $X(t)$ es **gaussiano**, $\dot X(t)$ también es **gaussiano** (la derivada es una operación lineal).

### 3.4 Media, correlación cruzada y autocorrelación de la derivada

$$m_{\dot X}(t)=E[\dot X(t)]=\frac{d}{dt}m_X(t)$$

$$R_{X,\dot X}(t_1,t_2)=\frac{\partial}{\partial t_2}R_X(t_1,t_2)\qquad R_{\dot X}(t_1,t_2)=\frac{\partial^2}{\partial t_1\partial t_2}R_X(t_1,t_2)$$

**Si $X(t)$ es WSS** ($R_X$ depende de $\tau=t_1-t_2$; ojo con el signo al derivar respecto a $t_2$):

$$\boxed{R_{X,\dot X}(\tau)=-\frac{d}{d\tau}R_X(\tau),\qquad R_{\dot X}(\tau)=-\frac{d^2}{d\tau^2}R_X(\tau)}$$

**Derivación.** $\dfrac{\partial}{\partial t_2}R_X(t_1-t_2)=-R_X'(\tau)$ y $\dfrac{\partial}{\partial t_1}\big[-R_X'(t_1-t_2)\big]=-R_X''(\tau)$.

### 3.5 Consecuencias útiles (complemento)

- Si $X$ es WSS, $m_{\dot X}=\dfrac{d}{dt}m_X=0$: **la derivada de un WSS tiene media cero**.
- **Potencia de la derivada:** $E[\dot X^2]=R_{\dot X}(0)=-R_X''(0)\ge0$. Por eso $R_X''(0)\le0$ (máximo en el origen).
- Como $R_X(\tau)$ es par y derivable, $R_X'(0)=0$, luego $R_{X,\dot X}(0)=0$: **$X(t)$ y $\dot X(t)$ en el mismo instante están incorrelados** (e independientes si $X$ es gaussiano).
- **En frecuencia:** el derivador es un SLIT con $H(f)=j2\pi f$, luego $S_{\dot X}(f)=4\pi^2f^2\,S_X(f)$ (en $\omega$: $S_{\dot X}(\omega)=\omega^2S_X(\omega)$). **Derivar realza las altas frecuencias**.

**Ejemplos.**

| $R_X(\tau)$ | ¿Existe $\dot X$? | Por qué |
|---|---|---|
| $\sigma^2e^{-\alpha\tau^2}$ | **Sí** | $R_X$ es suave: $R_X''(0)=-2\alpha\sigma^2$, así que $E[\dot X^2]=2\alpha\sigma^2$ |
| $\sigma^2e^{-\alpha\lvert\tau\rvert}$ | **No** | Vértice en $\tau=0$: $R_X''(0)$ no existe |

---

## 4. Integración de un proceso aleatorio

### 4.1 Definición

Para integrar $X(t)$ en $(t_0,t)$, se particiona el intervalo en $n$ subintervalos de anchura $\Delta_k$ y se forma la **suma de Riemann**:

$$I_n=\sum_{k=1}^{n}X(t_k)\,\Delta_k$$

La **integral** es el límite en media cuadrática de $I_n$ cuando $\Delta_k\to0$:

$$\boxed{Y(t)=\int_{t_0}^{t}X(t')\,dt'=\text{l.i.m.}_{\Delta_k\to0}\sum_{k}X(t_k)\,\Delta_k}$$

### 4.2 Condiciones de existencia

- La integral en m.s. existe si existe la **doble integral** de la autocorrelación:

$$E[Y(t)^2]=\int_{t_0}^{t}\!\!\int_{t_0}^{t}R_X(u,v)\,du\,dv<\infty$$

- También existe si $X(t)$ es **continuo en sentido cuadrático promedio**.

### 4.3 Propiedades de la integral

$Y(t)$ es un **nuevo proceso aleatorio** con

$$m_Y(t)=\int_{t_0}^{t}m_X(t')\,dt'\qquad R_Y(t_1,t_2)=\int_{t_0}^{t_1}\!\!\int_{t_0}^{t_2}R_X(u,v)\,du\,dv$$

### 4.4 Observaciones (complemento)

- **Si $X$ es gaussiano, $Y$ también** (la integral es lineal).
- **La integral de un WSS no es en general WSS.** Ejemplo: $X$ WSS con media $m$ ⇒ $m_Y(t)=m(t-t_0)$ **crece con $t$**.
- **Ejemplo: integral del ruido blanco.** Con $R_X(u,v)=\sigma^2\delta(u-v)$ y $t_0=0$:

$$R_Y(t_1,t_2)=\sigma^2\min(t_1,t_2)$$

  Es el **proceso de Wiener** (movimiento browniano): su varianza $\sigma^2t$ crece linealmente con el tiempo y, por tanto, no es WSS. Es el análogo en continuo del «paseo aleatorio» (suma de v.a. independientes).

---

## 5. Sistemas lineales e invariantes (SLIT): repaso

### 5.1 Definiciones

Sistema: $y(t)=T[x(t)]$.

- **Lineal:** $T[\alpha x_1(t)+\beta x_2(t)]=\alpha T[x_1(t)]+\beta T[x_2(t)]$ para cualesquiera señales y constantes $\alpha,\beta$.
- **Invariante en el tiempo:** si la respuesta a $x(t)$ es $y(t)$, la respuesta a $x(t-\tau)$ es $y(t-\tau)$.
- **Respuesta al impulso:** $h(t)=T[\delta(t)]$.
- **Respuesta a una entrada arbitraria** (convolución):

$$y(t)=h(t)*x(t)=\int_{-\infty}^{\infty}h(s)\,x(t-s)\,ds=\int_{-\infty}^{\infty}h(t-s)\,x(s)\,ds$$

- **Función de transferencia** (transformada de Fourier de $h$):

$$H(f)=\mathcal F[h(t)]=\int_{-\infty}^{\infty}h(t)\,e^{-j2\pi ft}\,dt$$

- **Causal:** la salida en $t$ depende solo de la entrada en instantes **pasados**, es decir $h(t)=0$ para $t<0$ (es lo que hace realizable un sistema físico).

### 5.2 Qué aporta cada concepto

| Concepto | Significado práctico |
|---|---|
| $h(t)$ | «Huella» del sistema: respuesta a un impulso |
| $H(f)$ | Cómo cambia el sistema la amplitud (módulo) y la fase de cada frecuencia |
| $H(0)=\int h(t)\,dt$ | **Ganancia en continua** (cuánto amplifica una componente constante) |
| Causalidad | Solo puede usar el pasado de la señal |

---

## 6. Respuesta de un SLIT a un proceso WSS

### 6.1 Salida del sistema

Si la entrada es un proceso aleatorio $X(t)$, la salida es el proceso

$$Y(t)=\int_{-\infty}^{\infty}h(s)\,X(t-s)\,ds=\int_{-\infty}^{\infty}h(t-s)\,X(s)\,ds$$

donde se supone que la integral existe **en sentido cuadrático promedio** (el mismo concepto del §4).

### 6.2 Resultado central

$$\boxed{X(t)\text{ WSS}\;\Longrightarrow\;Y(t)\text{ WSS}}$$

(suponiendo un sistema estable, para que las integrales converjan).

### 6.3 Demostración: la media

$$E[Y(t)]=E\!\left[\int h(s)X(t-s)\,ds\right]=\int h(s)\,E[X(t-s)]\,ds$$

Como $X$ es WSS, $E[X(t-s)]=m_X$ (constante), así que

$$E[Y(t)]=m_X\int_{-\infty}^{\infty}h(s)\,ds=m_X\,H(0)$$

$$\boxed{m_Y=H(0)\,m_X}$$

**Interpretación.** La media pasa por el sistema como una señal continua ($f=0$): se multiplica por la **ganancia en continua** $H(0)$. Un sistema con $H(0)=0$ (por ejemplo un paso alto) elimina la media.

### 6.4 Demostración: la autocorrelación

$$R_Y(t,t+\tau)=E[Y(t)Y(t+\tau)]=E\!\left[\int h(s)X(t-s)\,ds\int h(r)X(t+\tau-r)\,dr\right]$$

Intercambiando esperanza e integrales:

$$R_Y(t,t+\tau)=\int\!\!\int h(s)\,h(r)\,E\big[X(t-s)\,X(t+\tau-r)\big]\,ds\,dr$$

Como $X$ es WSS, $E[X(t-s)X(t+\tau-r)]=R_X\big((t+\tau-r)-(t-s)\big)=R_X(\tau+s-r)$, que **no depende de $t$**:

$$\boxed{R_Y(\tau)=\int_{-\infty}^{\infty}\!\!\int_{-\infty}^{\infty}h(s)\,h(r)\,R_X(\tau+s-r)\,ds\,dr}$$

Como la media es constante y $R_Y$ solo depende de $\tau$, **$Y(t)$ es WSS**.

### 6.5 Forma compacta (complemento)

Agrupando, la doble integral es una doble convolución:

$$R_Y(\tau)=h(-\tau)*h(\tau)*R_X(\tau)$$

Paso intermedio: $\int h(r)R_X(\tau+s-r)\,dr=(h*R_X)(\tau+s)\equiv q(\tau+s)$ y luego $\int h(s)\,q(\tau+s)\,ds=\big(h(-\cdot)*q\big)(\tau)$.

### 6.6 Potencia y varianza de la salida (complemento)

$$P_Y=E[Y^2]=R_Y(0)=\int_{-\infty}^{\infty}\lvert H(f)\rvert^2S_X(f)\,df,\qquad \sigma_Y^2=R_Y(0)-m_Y^2$$

---

## 7. Densidad espectral y correlación cruzada entrada-salida

### 7.1 PSD de la salida

Transformando $R_Y=h(-\tau)*h(\tau)*R_X$ (la transformada de $h(-\tau)$ es $H^*(f)$ para $h$ real):

$$\boxed{S_Y(f)=H^*(f)\,H(f)\,S_X(f)=\lvert H(f)\rvert^2\,S_X(f)}$$

**Relación entre las PSD de entrada y salida a través de la función de transferencia.**

**Interpretación:**

- El sistema **multiplica la potencia de cada frecuencia por su ganancia en potencia $\lvert H(f)\rvert^2$**.
- Solo importa el **módulo** de $H$; la **fase no afecta** a la PSD de salida.
- Si $H$ es paso bajo, la salida tiene la potencia concentrada en bajas frecuencias.

### 7.2 Correlación y PSD cruzadas

$$\boxed{R_{Y,X}(\tau)=R_X(\tau)*h(\tau)}\qquad S_{Y,X}(f)=H(f)\,S_X(f)\qquad S_{X,Y}(f)=S_{Y,X}^*(f)=H^*(f)\,S_X(f)$$

**Demostración de $R_{Y,X}$.** Con $R_{Y,X}(\tau)=E[Y(t+\tau)\,X(t)]$:

$$E[Y(t+\tau)X(t)]=\int h(s)\,E[X(t+\tau-s)X(t)]\,ds=\int h(s)\,R_X(\tau-s)\,ds=(h*R_X)(\tau)$$

> **Ojo con el orden de los subíndices.** Aquí $R_{Y,X}(\tau)=E[Y(t+\tau)X(t)]$ (proceso del primer subíndice en el instante posterior). En el tema anterior se definió $R_{XY}(t,t+\tau)=E[X(t)Y(t+\tau)]$, y con esa convención la misma función $h*R_X$ se llama $R_{XY}$ y la PSD cruzada correspondiente es $S_{XY}=H\,S_X$. **Usa siempre la convención del enunciado** y escribe explícitamente la definición que uses.

### 7.3 Interpretación y aplicaciones (complemento)

| Magnitud | Qué da | Utilidad |
|---|---|---|
| $S_Y=\lvert H\rvert^2S_X$ | Solo el **módulo** de $H$ | Calcular PSD y potencia de la salida |
| $S_{Y,X}=H\,S_X$ | **Módulo y fase** de $H$ | **Identificación de sistemas**: $H(f)=S_{Y,X}(f)/S_X(f)$ |

- **Identificación con ruido blanco.** Si $X$ es ruido blanco ($S_X=N_0/2$), entonces $R_{Y,X}(\tau)=\dfrac{N_0}2\,h(\tau)$: midiendo la correlación cruzada entrada-salida se obtiene **la respuesta al impulso**, $h(\tau)=\dfrac{2}{N_0}R_{Y,X}(\tau)$.
- La PSD cruzada es **compleja**; su fase es la fase del sistema.

---

## 8. Entrada gaussiana, ruido blanco y versión discreta

### 8.1 Entrada gaussiana (complemento)

Como $Y=h*X$ es una operación **lineal**, si $X(t)$ es **gaussiano**:

- $Y(t)$ es **gaussiano**, y $(X,Y)$ son **conjuntamente gaussianos**.
- Si además $X$ es WSS, $Y$ es WSS **y estrictamente estacionario** (WSS + gaussiano).
- Basta conocer $m_Y=H(0)m_X$ y $R_Y(\tau)$ para dar **toda** la estadística de $Y$. En concreto, para $t$ fijo:

$$Y(t)\sim\mathcal N\big(H(0)\,m_X,\;\sigma_Y^2\big),\qquad \sigma_Y^2=R_Y(0)-m_Y^2$$

y el par $(Y(t),Y(t+\tau))$ es gaussiano bidimensional con coeficiente de correlación $\rho=\dfrac{C_Y(\tau)}{C_Y(0)}$. Esto enlaza con el Tema 1 (función $Q$).

### 8.2 Entrada de ruido blanco

Si $S_X(f)=N_0/2$:

$$S_Y(f)=\frac{N_0}2\lvert H(f)\rvert^2,\qquad R_Y(\tau)=\frac{N_0}2\,\big[h(\tau)*h(-\tau)\big],\qquad P_Y=\frac{N_0}2\int_{-\infty}^{\infty}\lvert H(f)\rvert^2df=\frac{N_0}2\int_{-\infty}^{\infty}h(t)^2dt$$

(la última igualdad es Parseval). **La forma de la PSD de salida es la del filtro**: el filtro «colorea» el ruido blanco.

**Ancho de banda equivalente de ruido.** Para un filtro con ganancia máxima $\lvert H_0\rvert$, se define $B_N=\dfrac{\int_0^\infty\lvert H(f)\rvert^2df}{\lvert H_0\rvert^2}$. Entonces $P_Y=N_0\,\lvert H_0\rvert^2\,B_N$. Para un filtro ideal paso bajo de ancho $B$ y ganancia 1, $P_Y=N_0B$.

### 8.3 Versión en tiempo discreto (enlace con la práctica de MATLAB)

Si $Y(n)=\sum_kh(k)X(n-k)$ con $X$ WSS:

$$m_Y=H(1)\,m_X=m_X\sum_kh(k)\qquad R_Y(k)=\sum_i\sum_jh(i)h(j)R_X(k+i-j)\qquad S_Y(\omega)=\lvert H(e^{j\omega})\rvert^2S_X(\omega)$$

**Ejemplo (el filtro de la práctica).** $H(z)=\dfrac1{1-0.7z^{-1}}$ con entrada blanca de varianza $\sigma_w^2$: $S_Y=\dfrac{\sigma_w^2}{1.49-1.4\cos\omega}$ y $R_Y(k)=\dfrac{\sigma_w^2}{0.51}0.7^{\lvert k\rvert}$. Si la entrada tuviera media $m_X$, la salida tendría media $m_X/0.3$ ($H(1)=1/(1-0.7)$).

**Transitorio.** Un filtro causal arrancado en un instante concreto produce una salida **solo asintóticamente WSS**: las primeras muestras no están en régimen estacionario (se vio en la práctica).

---

## 9. Ejercicios resueltos

### Ejercicio 1: filtro RC con ruido blanco

Entrada: ruido blanco, $S_X=N_0/2$. Filtro RC paso bajo: $h(t)=\dfrac1{RC}e^{-t/RC}u(t)$. Halla $H(f)$, $S_Y$, $R_Y$ y $P_Y$.

**Función de transferencia:**

$$H(f)=\frac1{1+j2\pi fRC},\qquad\lvert H(f)\rvert^2=\frac1{1+(2\pi fRC)^2}$$

**PSD de salida:**

$$S_Y(f)=\frac{N_0}2\cdot\frac1{1+(2\pi fRC)^2}$$

**Autocorrelación.** Es una lorentziana: con $\alpha=1/RC$ el par $\sigma^2e^{-\alpha\lvert\tau\rvert}\leftrightarrow\dfrac{2\alpha\sigma^2}{\alpha^2+(2\pi f)^2}$ da $\dfrac{2\sigma^2}{\alpha}=\dfrac{N_0}{2}$, es decir $\sigma^2=\dfrac{N_0}{4RC}$:

$$R_Y(\tau)=\frac{N_0}{4RC}\,e^{-\lvert\tau\rvert/RC}$$

**Potencia:** $P_Y=R_Y(0)=\dfrac{N_0}{4RC}$. Comprobación: $\int\dfrac{N_0/2}{1+(2\pi fRC)^2}df=\dfrac{N_0}{2}\cdot\dfrac1{2RC}=\dfrac{N_0}{4RC}$ ✔.

**Ancho de banda equivalente:** $B_N=\dfrac1{4RC}=\dfrac\pi2B_{3\text{dB}}$ con $B_{3\text{dB}}=\dfrac1{2\pi RC}$.

### Ejercicio 2: probabilidad a la salida del RC (enlace con el Tema 1)

La entrada es ruido blanco **gaussiano** con $N_0/2=10^{-6}$ V²/Hz y $RC=1$ ms. ¿Cuál es $P[Y(t)>0.05\ \text{V}]$ y la correlación entre $Y(t)$ e $Y(t+0.5\,\text{ms})$?

- $Y(t)$ es gaussiano de media $0$ ($m_X=0$) y varianza $\sigma_Y^2=\dfrac{N_0}{4RC}=\dfrac{2\cdot10^{-6}}{4\cdot10^{-3}}=5\cdot10^{-4}$ V², es decir $\sigma_Y=0.0224$ V.
- $P[Y>0.05]=Q\!\left(\dfrac{0.05}{0.0224}\right)=Q(2.236)\approx0.0127$.
- Coeficiente de correlación: $\rho(\tau)=e^{-\lvert\tau\rvert/RC}=e^{-0.5}=0.607$.

### Ejercicio 3: media a través de un filtro

$X(t)$ WSS con $m_X=3$ pasa por un sistema con $H(0)=2$ y por otro con $H(0)=0$. ¿Qué medias salen?

$m_Y=H(0)m_X$ ⇒ $6$ en el primero y $0$ en el segundo (el segundo elimina la componente continua, como un filtro paso alto o paso banda).

### Ejercicio 4: promediador (integrador de ventana)

$y(t)=\dfrac1T\displaystyle\int_{t-T}^{t}x(s)\,ds$ con entrada ruido blanco $N_0/2$. Halla $P_Y$.

$h(t)=\dfrac1T$ para $0<t<T$ (cero fuera) ⇒ $H(f)=\text{sinc}(fT)\,e^{-j\pi fT}$, $\lvert H\rvert^2=\text{sinc}^2(fT)$ con $\text{sinc}(x)=\dfrac{\sin\pi x}{\pi x}$.

$$P_Y=\frac{N_0}2\int h(t)^2dt=\frac{N_0}2\cdot\frac{1}{T^2}\cdot T=\frac{N_0}{2T}$$

(coincide con $\frac{N_0}{2}\int\text{sinc}^2(fT)df=\frac{N_0}{2T}$). **Promediar durante un tiempo $T$ reduce la potencia del ruido en un factor $1/T$.**

### Ejercicio 5: derivada de un proceso con autocorrelación gaussiana

$R_X(\tau)=\sigma^2e^{-\alpha\tau^2}$. ¿Existe $\dot X$? Halla $R_{\dot X}$.

$R_X'=-2\alpha\tau\sigma^2e^{-\alpha\tau^2}$ y $R_X''=\sigma^2(-2\alpha+4\alpha^2\tau^2)e^{-\alpha\tau^2}$. Como $R_X''(0)=-2\alpha\sigma^2$ existe, **sí existe la derivada** en m.s., y

$$R_{\dot X}(\tau)=-R_X''(\tau)=\sigma^2\big(2\alpha-4\alpha^2\tau^2\big)e^{-\alpha\tau^2},\qquad E[\dot X^2]=R_{\dot X}(0)=2\alpha\sigma^2$$

Además $R_{X,\dot X}(0)=-R_X'(0)=0$: $X(t)$ y $\dot X(t)$ incorrelados.

### Ejercicio 6: ¿continuidad y derivada?

Para $R_X(\tau)=\sigma^2e^{-\alpha\lvert\tau\rvert}$:

- $R_X$ es continua en $0$ ⇒ **continuo en m.s.** (C2).
- Tiene un vértice en $\tau=0$ ⇒ no existe $R_X''(0)$ ⇒ **no existe $\dot X$** en m.s.
- Sí se puede integrar (es continuo en m.s.).

Para ruido blanco, $R_X=\frac{N_0}2\delta(\tau)$ no es continua en $0$ ⇒ no es continuo en m.s.

### Ejercicio 7: integral de ruido blanco

$X$ blanco con $R_X=\sigma^2\delta$, $Y(t)=\int_0^tX$. Halla $R_Y$ y $\text{Var}[Y(t)]$, y decide si es WSS.

$R_Y(t_1,t_2)=\sigma^2\min(t_1,t_2)$ ⇒ $\text{Var}[Y(t)]=\sigma^2t$. Depende de $t$ ⇒ **no es WSS** (proceso de Wiener).

### Ejercicio 8: identificación de un sistema

Se excita un sistema desconocido con ruido blanco $N_0/2=0.5$ y se mide $R_{Y,X}(\tau)=0.5\,e^{-3\tau}u(\tau)$. Halla $h(t)$ y $H(f)$.

$h(\tau)=\dfrac{2}{N_0}R_{Y,X}(\tau)=e^{-3\tau}u(\tau)$ ⇒ $H(f)=\dfrac1{3+j2\pi f}$ (sistema causal).

### Ejercicio 9: continuidad sin realizaciones continuas

El proceso de Poisson tiene $R_N(t_1,t_2)=\lambda\min(t_1,t_2)+\lambda^2t_1t_2$, continua en todo punto ⇒ continuo en m.s. (C1); sin embargo cada realización es una escalera con saltos de altura 1. Ejemplo de que **continuidad en m.s. $\not\Rightarrow$ realizaciones continuas**.

---

## 10. Banco de preguntas con respuesta modelo

**1. ¿Para qué se necesita definir continuidad, derivada e integral «en sentido cuadrático promedio»?**
Porque los límites usuales pueden existir para unas realizaciones y no para otras; la definición probabilística (límite de $E[(\cdot)^2]$) garantiza una definición coherente para el proceso.

**2. Define continuidad en sentido cuadrático promedio.**
$E[(X(t)-X(t_0))^2]\to0$ cuando $t\to t_0$.

**3. ¿Implica que todas las realizaciones sean continuas?**
No (ejemplo: el proceso de Poisson).

**4. ¿Cuándo es continuo en m.s. un proceso WSS?**
Si $R_X(\tau)$ es continua en $\tau=0$; entonces lo es en todo punto.

**5. ¿Qué condición garantiza la existencia de la derivada de un WSS?**
Que $R_X(\tau)$ tenga derivada segunda en $\tau=0$.

**6. Relaciones de la derivada para un WSS.**
$m_{\dot X}=0$, $R_{X,\dot X}(\tau)=-R_X'(\tau)$, $R_{\dot X}(\tau)=-R_X''(\tau)$.

**7. ¿Qué ocurre con la derivada de un proceso gaussiano?**
Es gaussiano (operación lineal).

**8. ¿Cómo se define y cuándo existe la integral de un proceso?**
Como límite en m.s. de sumas de Riemann; existe si la doble integral de $R_X(u,v)$ existe o si $X$ es continuo en m.s.

**9. ¿Qué media y autocorrelación tiene la integral?**
$m_Y=\int m_X$; $R_Y(t_1,t_2)=\int_{t_0}^{t_1}\!\int_{t_0}^{t_2}R_X(u,v)\,du\,dv$.

**10. ¿Qué es un sistema lineal e invariante en el tiempo y cómo se caracteriza?**
Cumple superposición e invariancia al desplazamiento; queda caracterizado por $h(t)=T[\delta(t)]$ o su transformada $H(f)$.

**11. ¿Cuándo es causal?**
Si $h(t)=0$ para $t<0$.

**12. Si $X$ es WSS, ¿cómo es $Y$?**
WSS también, con $m_Y=H(0)m_X$ y $R_Y(\tau)=\iint h(s)h(r)R_X(\tau+s-r)\,ds\,dr$.

**13. Relación entre las PSD de entrada y salida.**
$S_Y(f)=\lvert H(f)\rvert^2S_X(f)$.

**14. ¿Qué información pierde la PSD respecto a $H$?**
La fase; se recupera con la PSD cruzada $S_{Y,X}=H\,S_X$.

**15. ¿Cómo se obtienen $R_{Y,X}$ y $S_{Y,X}$?**
$R_{Y,X}(\tau)=R_X(\tau)*h(\tau)$ y $S_{Y,X}(f)=H(f)\,S_X(f)$; además $S_{X,Y}=S_{Y,X}^*=H^*S_X$.

**16. ¿Cómo identificarías $h(t)$ con medidas?**
Con entrada de ruido blanco: $h(\tau)=\frac{2}{N_0}R_{Y,X}(\tau)$.

**17. Entrada gaussiana: ¿qué se puede decir de la salida?**
Es gaussiana (y estacionaria si la entrada es WSS), completamente descrita por $m_Y$ y $R_Y$.

**18. ¿Qué potencia tiene la salida?**
$P_Y=R_Y(0)=\int\lvert H(f)\rvert^2S_X(f)\,df$.

---

## 11. Errores típicos y erratas de las diapositivas

**Errores típicos de examen**

1. Olvidar **elevar $\lvert H\rvert$ al cuadrado** en $S_Y=\lvert H\rvert^2S_X$.
2. Confundir $H(0)$ con $H$ evaluada en otra frecuencia al calcular la media: la media sale con $H(0)$ (frecuencia cero).
3. Decir que la integral de un WSS es WSS. No lo es en general (la media crece y la varianza también).
4. Perder el **signo** al derivar $R_X(t_1-t_2)$ respecto de $t_2$: $R_{X,\dot X}(\tau)=-R_X'(\tau)$.
5. Dar por buena la derivada de $\sigma^2e^{-\alpha\lvert\tau\rvert}$: **no** existe (vértice en cero).
6. Mezclar $f$ (Hz) y $\omega$ (rad/s): con $f$ no hay factor $1/2\pi$ en la potencia.
7. Escribir $R_{Y,X}$ con el subíndice cambiado respecto a la convención del enunciado (ver nota del §7.2).
8. Concluir que $Y$ es WSS sin comprobar que la entrada lo es.
9. Dar la autocorrelación de la salida como $h*R_X$ (eso es la correlación **cruzada**); la autocorrelación lleva **dos** convoluciones.

**Erratas y descuidos en las diapositivas** (conviene conocerlos para no copiarlos)

| Diapositiva | Aparece | Correcto |
|---|---|---|
| 7 | $\lim_{t\to0}m_X(t)=m_X(t_0)$ | $\lim_{t\to t_0}m_X(t)=m_X(t_0)$ |
| 14 | «$=\text{l.i.m.}_{\Delta_k\to0}=\sum$» | Sobra el segundo signo «$=$» |
| 15 | «existe si existe la doble integral $Y(t)=\iint R_X(u,v)\,du\,dv$» | Debe ser $E[Y(t)^2]=\iint R_X(u,v)\,du\,dv$ |
| 23 | Subíndices de la correlación cruzada | Convención distinta de la del tema anterior (§7.2) |

---

## 12. Formulario resumen

**Cálculo en m.s.**

$$X\text{ continuo en m.s. en }t_0\iff E[(X(t)-X(t_0))^2]\to0;\qquad\text{WSS: basta }R_X\text{ continua en }0$$

$$\dot X=\text{l.i.m.}\frac{X(t+\varepsilon)-X(t)}{\varepsilon};\quad\text{WSS: basta }\exists R_X''(0)$$

$$m_{\dot X}=m_X',\qquad R_{X,\dot X}(\tau)=-R_X'(\tau),\qquad R_{\dot X}(\tau)=-R_X''(\tau)$$

$$Y=\int_{t_0}^{t}X:\qquad m_Y=\int m_X,\qquad R_Y(t_1,t_2)=\int_{t_0}^{t_1}\!\!\int_{t_0}^{t_2}R_X(u,v)\,du\,dv$$

**SLIT con entrada WSS ($Y=h*X$, $H=\mathcal F[h]$):**

$$Y\text{ WSS},\qquad m_Y=H(0)\,m_X,\qquad R_Y(\tau)=h(-\tau)*h(\tau)*R_X(\tau)$$

$$\boxed{S_Y(f)=\lvert H(f)\rvert^2S_X(f)},\qquad P_Y=\int\lvert H\rvert^2S_X\,df=R_Y(0)$$

$$R_{Y,X}(\tau)=h(\tau)*R_X(\tau),\qquad S_{Y,X}=H\,S_X,\qquad S_{X,Y}=S_{Y,X}^*=H^*S_X$$

**Entrada blanca ($S_X=N_0/2$):**

$$S_Y=\frac{N_0}2\lvert H\rvert^2,\qquad P_Y=\frac{N_0}2\int\lvert H\rvert^2df=\frac{N_0}2\int h^2\,dt,\qquad h(\tau)=\frac2{N_0}R_{Y,X}(\tau)$$

**Gaussiano:** entrada gaussiana ⇒ salida gaussiana; $Y(t)\sim\mathcal N(H(0)m_X,\;R_Y(0)-m_Y^2)$.

**Casos típicos:**

| Sistema | $H(f)$ | $\lvert H\rvert^2$ |
|---|---|---|
| Derivador | $j2\pi f$ | $4\pi^2f^2$ |
| RC paso bajo | $\dfrac1{1+j2\pi fRC}$ | $\dfrac1{1+(2\pi fRC)^2}$ |
| Promediador $T$ | $\text{sinc}(fT)\,e^{-j\pi fT}$ | $\text{sinc}^2(fT)$ |
| Retardo $t_0$ | $e^{-j2\pi ft_0}$ | $1$ |
