# T5 Modelos de Canal — Teoría de la Comunicación

Resumen completo y explicado del tema «Canales de comunicación y fuentes — Modelos probabilísticos»: canal aditivo gaussiano, desvanecimiento Rayleigh, modelo analógico (multiplicador) y modelos discretos de canal (DMC, canal digital, BSC y canal digital binario).

> **Imágenes.** Este archivo usa las figuras de la carpeta `T5_Modelos_de_Canal_img/`. Para que se vean en GitHub, sube el `.md` **y la carpeta** al mismo directorio del repositorio. Las figuras `01`–`11` son las del PDF de clase y las `g1`–`g4` están generadas a propósito para este resumen.

## Índice

0. [Mapa del tema y notación](#0-mapa-del-tema-y-notación)
1. [El canal aditivo gaussiano](#1-el-canal-aditivo-gaussiano)
2. [Caracterización estadística del desvanecimiento: canal Rayleigh](#2-caracterización-estadística-del-desvanecimiento-canal-rayleigh)
3. [Modelo analógico de canal](#3-modelo-analógico-de-canal)
4. [Modelos discretos de canal](#4-modelos-discretos-de-canal)
5. [Ejercicios resueltos](#5-ejercicios-resueltos)
6. [Banco de preguntas con respuesta modelo](#6-banco-de-preguntas-con-respuesta-modelo)
7. [Errores típicos y erratas de las diapositivas](#7-errores-típicos-y-erratas-de-las-diapositivas)
8. [Formulario resumen](#8-formulario-resumen)

> Los apartados marcados como **(complemento)** no están literalmente en las diapositivas, pero se deducen de ellas y ayudan a entender o a resolver ejercicios.

---

## 0. Mapa del tema y notación

### 0.1 Qué es un «modelo de canal»

Un **sistema de transmisión** lleva información desde una fuente hasta un destino:

![Sistema de transmisión](T5_Modelos_de_Canal_img/01_sistema_transmision.jpg)

- **Fuente de información** → **Transmisor** → **Canal** → **Receptor** → **Destino**.
- Sobre el canal actúan **perturbaciones** (ruido, desvanecimiento, interferencias…).

Un **modelo de canal** es una descripción **probabilística** de lo que le ocurre a la señal entre dos puntos del sistema. El tema presenta cuatro modelos:

| Modelo | Tipo | Idea |
|---|---|---|
| Canal aditivo gaussiano | Analógico | $Y(t)=X(t)+N(t)$ con ruido blanco gaussiano |
| Canal con desvanecimiento Rayleigh | Analógico | Multitrayecto: la envolvente de la señal recibida es Rayleigh |
| Modelo analógico (multiplicador) | Analógico | $Y(t)=X(t)A_0\cos\omega_0t$ (modulación analógica) |
| Canales discretos | Discreto | Matriz de probabilidades de transición entre símbolos o bits (DMC, digital, BSC) |

### 0.2 Idea clave: según dónde pongas el «canal», el modelo cambia

El **mismo** sistema de comunicaciones digitales puede verse como tres canales anidados:

![Canales anidados](T5_Modelos_de_Canal_img/10_canales_anidados.jpg)

| Canal | Qué incluye | Entrada → salida | Modelo |
|---|---|---|---|
| **Canal gaussiano** | Solo el medio físico + ruido | $s(t)\to r(t)$ | Aditivo gaussiano (continuo) |
| **Canal digital** | Modulador + canal gaussiano + demodulador + decisor | $A[n]\to\hat A[n]$ | Discreto sin memoria (símbolos) |
| **Canal digital binario** | Todo lo anterior + codificador + decodificador | $B[l]\to\hat B[l]$ | Binario simétrico (bits), definido por el BER |

> Cada vez que «englobas» más bloques dentro del canal, el modelo se vuelve **más simple** (discreto) pero **más dependiente de los parámetros** de los bloques que has englobado (modulación, SNR, decisor…).

### 0.3 Notación

| Símbolo | Significado |
|---|---|
| $X(t)$, $N(t)$, $Y(t)$ | Señal de interés, ruido, señal recibida |
| $\sigma_X^2,\;\sigma_N^2$ | Potencias medias de señal y ruido (si las medias son cero) |
| $N_0/2$ | Densidad espectral bilateral del ruido blanco |
| SNR | Relación señal a ruido |
| $E_s,\;E_b$ | Energía media por símbolo y por bit |
| $M$ | Tamaño del alfabeto (nº de símbolos) |
| $p_{Y\mid X}(y_j\mid x_i)$ | Probabilidad de transición (canal discreto) |
| $Q(x)=P[\mathcal N(0,1)>x]$ | Función $Q$ (Tema 1) |
| BER | *Bit Error Rate*: probabilidad de error de bit |

---

## 1. El canal aditivo gaussiano

### 1.1 Concepto de ruido y modelo

**Ruido** = toda perturbación de carácter **aleatorio** sobre una señal o proceso de interés.

El **modelo de canal aditivo gaussiano** supone que el ruido $N(t)$:

1. Tiene **media cero**.
2. Es **independiente** de la señal de interés $X(t)$.
3. **Distorsiona la señal de forma aditiva**.
4. Es **blanco**: $S_N(\omega)=\dfrac{N_0}2$, $R_N(\tau)=\dfrac{N_0}2\delta(\tau)$.
5. Es un proceso aleatorio **gaussiano**.

$$\boxed{Y(t)=X(t)+N(t)}$$

donde $Y(t)$ es la señal que llega al receptor. Por reunir las cinco hipótesis se le llama a menudo **AWGN** (*Additive White Gaussian Noise*).

**Observaciones importantes (complemento):**

- «Canal gaussiano» significa que **el ruido** es gaussiano, **no necesariamente $Y$**. $Y$ solo es gaussiano si $X$ también lo es.
- **Dado el valor transmitido**, la salida es gaussiana centrada en él: si $X=x$, entonces $Y\mid X=x\sim\mathcal N(x,\sigma_N^2)$. Es la base de toda la detección (el decisor compara $Y$ con umbrales) y del cálculo de errores con la función $Q$.
- Como el ruido es blanco, **todas sus muestras son independientes** (incorreladas + gaussianas, Tema 1).

### 1.2 Autocorrelación y PSD de la salida

$$R_Y(t,t+\tau)=R_X(t,t+\tau)+R_N(\tau)+R_{XN}(t,t+\tau)+R_{NX}(t,t+\tau)$$

Los términos cruzados $R_{XN}$ y $R_{NX}$ **valen cero** si $X(t)$ y $N(t)$ son independientes **y al menos uno tiene media cero** (aquí el ruido lo tiene): $R_{XN}=E[X(t)]\,E[N(t+\tau)]=0$.

Si además $X(t)$ es **WSS**:

$$\boxed{R_Y(\tau)=R_X(\tau)+R_N(\tau)\qquad S_Y(\omega)=S_X(\omega)+S_N(\omega)}$$

(es el caso de «suma de procesos ortogonales» del tema de caracterización espectral: las PSD se suman).

### 1.3 Potencia de la señal recibida

Evaluando en $\tau=0$:

$$R_Y(0)=\sigma_Y^2=R_X(0)+R_N(0)=\sigma_X^2+\sigma_N^2$$

**La potencia media de $Y(t)$ es la suma de las potencias medias de la señal de interés y del ruido.**

> **Aviso (complemento).** Para ruido blanco **ideal**, $R_N(0)=\frac{N_0}2\delta(0)=\infty$. En la práctica el ruido pasa por el filtro de entrada del receptor, de ancho de banda finito. Con un filtro ideal paso banda de ancho $B$ Hz (una banda positiva), $\sigma_N^2=\frac{N_0}2\cdot2B=N_0B$. Esa es la $\sigma_N^2$ que se usa en la SNR.
>
> Además, «$R_Y(0)=\sigma_Y^2$» solo es cierto con medias cero; en general $R_Y(0)=E[Y^2]=\sigma_Y^2+m_Y^2$.

### 1.4 Relación señal a ruido (SNR)

Medida de la **calidad** de la señal recibida: cociente entre la potencia de la señal de interés y la del ruido.

$$\boxed{\text{SNR}=\frac{\sigma_X^2}{\sigma_N^2}\qquad\text{SNR(dB)}=10\log_{10}\frac{\sigma_X^2}{\sigma_N^2}}$$

![Efecto de la SNR](T5_Modelos_de_Canal_img/g4_snr_ejemplo.png)

*Figura g4: una sinusoide $X$ (negro) y $Y=X+N$ (naranja) para tres SNR. Con 20 dB apenas se aprecia el ruido; con 0 dB (potencia de ruido igual a la de señal) la señal casi se pierde.*

**Tabla de conversión útil:**

| SNR (dB) | −10 | −3 | 0 | 3 | 6 | 10 | 20 | 30 |
|---|---|---|---|---|---|---|---|---|
| SNR (natural) | 0.1 | ≈0.5 | 1 | ≈2 | ≈4 | 10 | 100 | 1000 |

Reglas rápidas: **+3 dB ≈ ×2**, **+10 dB = ×10**, **−3 dB ≈ ×½**. Para pasar de dB a natural: $10^{\text{SNR(dB)}/10}$.

---

## 2. Caracterización estadística del desvanecimiento: canal Rayleigh

### 2.1 Qué es y cuándo aparece

El **canal Rayleigh** es un modelo de canal **radio** que caracteriza el efecto **multitrayectoria** (*multipath*), que genera **desvanecimientos** (*fading*). Ejemplo típico: comunicaciones móviles en entornos urbanos.

![Multitrayecto](T5_Modelos_de_Canal_img/02_multitrayecto.jpg)

- La señal modulada **no** encuentra un camino directo del emisor al receptor (sin línea de visión): llega a través de **múltiples caminos** (reflejos en edificios, etc.).
- Cada versión recorre una distancia distinta, así que llega con **distinto retardo, amplitud y fase**.
- El **desvanecimiento** se debe a la **interferencia** entre esas versiones: unas veces se refuerzan (interferencia constructiva) y otras se anulan (destructiva).
- Resultado: la señal recibida puede variar mucho **en amplitud y en fase**.

### 2.2 Modelo: suma de sinusoides

Si se transmite $A\cos(2\pi f_ct)$, la señal recibida es la superposición de $N$ réplicas:

$$Y(t)=\sum_{k=1}^{N}A_k\cos(2\pi f_ct+\Theta_k)$$

con amplitudes $A_k$ y fases $\Theta_k$ distintas.

### 2.3 Forma en cuadratura

Usando $\cos(a+\Theta)=\cos a\cos\Theta-\sin a\sin\Theta$:

$$Y(t)=Y_I\cos(2\pi f_ct)-Y_Q\sin(2\pi f_ct)$$

$$Y_I=\sum_{k=1}^{N}A_k\cos\Theta_k\qquad Y_Q=\sum_{k=1}^{N}A_k\sin\Theta_k$$

- $Y_I$ es la componente **en fase** y $Y_Q$ la componente **en cuadratura**.
- **¿Por qué son gaussianas?** Son sumas de muchos términos aleatorios independientes ⇒ **teorema central del límite** (complemento: es necesario que $N$ sea grande).

**Propiedades de $Y_I,Y_Q$ (complemento).** Con fases $\Theta_k$ independientes y uniformes en $[0,2\pi)$:

- $E[\cos\Theta_k]=E[\sin\Theta_k]=0$ ⇒ **media cero**.
- $E[\cos^2\Theta_k]=E[\sin^2\Theta_k]=\tfrac12$ ⇒ varianza común $\sigma^2=\tfrac12\sum_kE[A_k^2]$.
- $E[\cos\Theta_k\sin\Theta_k]=0$ ⇒ $Y_I$ e $Y_Q$ **incorreladas**, y por ser conjuntamente gaussianas, **independientes** (propiedad del Tema 1).

Es decir, $Y_I,Y_Q$ son **$\mathcal N(0,\sigma^2)$ independientes**.

### 2.4 Forma en módulo y fase

$$Y(t)=R\cos(2\pi f_ct+\Psi),\qquad R=\sqrt{Y_I^2+Y_Q^2},\qquad \Psi=\tan^{-1}\!\left(\frac{Y_Q}{Y_I}\right)$$

(en la práctica se usa $\text{atan2}(Y_Q,Y_I)$ para obtener el cuadrante correcto).

Con $Y_I=R\cos\Psi$ e $Y_Q=R\sin\Psi$ se comprueba que **la superposición de $N$ sinusoides de la misma frecuencia es otra sinusoide de amplitud $R$ y fase $\Psi$**.

### 2.5 Distribución de la envolvente y de la fase

$R$ es una v.a. con distribución **Rayleigh**:

$$\boxed{f_R(r)=\frac{r}{\sigma^2}\,e^{-\frac{r^2}{2\sigma^2}},\qquad r\ge0}$$

La fase $\Psi$ es **uniforme en $[0,2\pi]$**: $f_\Psi(\psi)=\frac1{2\pi}$.

![pdf de Rayleigh para varios σ](T5_Modelos_de_Canal_img/03_pdf_rayleigh_slide.jpg)

*Figura: pdf de Rayleigh para $\sigma=0.5,1,2,3,4$. Al aumentar $\sigma$, la curva se ensancha y su máximo baja (el máximo está en $r=\sigma$ y vale $e^{-1/2}/\sigma\approx0.607/\sigma$).*

#### Demostración (complemento, muy preguntable)

$Y_I,Y_Q$ independientes $\mathcal N(0,\sigma^2)$ ⇒

$$f_{Y_I,Y_Q}(y_I,y_Q)=\frac{1}{2\pi\sigma^2}\,e^{-\frac{y_I^2+y_Q^2}{2\sigma^2}}$$

Cambio a coordenadas polares ($y_I=r\cos\psi$, $y_Q=r\sin\psi$, jacobiano $=r$):

$$f_{R,\Psi}(r,\psi)=\frac{r}{2\pi\sigma^2}\,e^{-\frac{r^2}{2\sigma^2}}=\underbrace{\frac{r}{\sigma^2}e^{-\frac{r^2}{2\sigma^2}}}_{f_R(r)}\cdot\underbrace{\frac1{2\pi}}_{f_\Psi(\psi)}$$

La densidad **se factoriza**: $R$ y $\Psi$ son **independientes**, $R$ es Rayleigh y $\Psi$ es uniforme.

![Simulación de multitrayecto](T5_Modelos_de_Canal_img/g1_fading_simulado.png)

*Figura g1 (simulación con $N=30$ trayectos de amplitud y fase aleatorias): (izquierda) $(Y_I,Y_Q)$ forman una nube gaussiana circular; (centro) el histograma de la envolvente $R$ coincide con la pdf de Rayleigh; (derecha) la fase es uniforme.*

### 2.6 Propiedades de la distribución Rayleigh (complemento)

| Magnitud | Valor |
|---|---|
| CDF | $F_R(r)=1-e^{-r^2/2\sigma^2}$ |
| $P[R>r]$ | $e^{-r^2/2\sigma^2}$ |
| Moda (máximo de la pdf) | $\sigma$ |
| Mediana | $\sigma\sqrt{2\ln2}\approx1.177\,\sigma$ |
| Media | $E[R]=\sigma\sqrt{\pi/2}\approx1.253\,\sigma$ |
| Momento de orden 2 | $E[R^2]=2\sigma^2$ |
| Varianza | $\left(2-\frac\pi2\right)\sigma^2\approx0.429\,\sigma^2$ |
| Potencia media recibida | $E[Y(t)^2]=E[R^2]/2=\sigma^2$ |

- **$R^2$ es exponencial** de media $2\sigma^2$ ($F_{R^2}(u)=1-e^{-u/2\sigma^2}$). Por eso la **potencia instantánea** recibida sigue una exponencial: es frecuente que haya potencias muy bajas (**desvanecimientos profundos**).
- Ejemplo: $P[R^2<0.1\,E[R^2]]=1-e^{-0.1}\approx9.5\%$: el 9.5 % del tiempo la potencia está **10 dB por debajo** de la media.
- Si existiese un camino directo (línea de visión), la envolvente sería **Rice** y no Rayleigh; el canal Rayleigh es el caso **sin** componente directa.

---

## 3. Modelo analógico de canal

### 3.1 Modulación analógica

Muchos sistemas trasladan una señal de **banda base** $X(t)$ a una **portadora** de frecuencia alta mediante un **multiplicador**:

$$\boxed{Y(t)=X(t)\,A_0\cos(\omega_0t)}$$

![Modulador y demodulador](T5_Modelos_de_Canal_img/04_modulador_demodulador.jpg)

*Figura: (a) el modulador combina la señal mensaje con una onda portadora sinusoidal y da la onda modulada; (b) el demodulador, a partir de la salida del canal, estima la señal mensaje.*

La **calidad** se caracteriza mediante la **SNR** (§1.4).

### 3.2 Efecto en el dominio de la frecuencia

Resultado del tema anterior (respuesta de un multiplicador a una señal aleatoria): con $X(t)$ WSS,

$$A[R_Y(t,t+\tau)]=\frac{A_0^2}{2}R_X(\tau)\cos(\omega_0\tau)\qquad\Longrightarrow\qquad\boxed{S_Y(\omega)=\frac{A_0^2}{4}\Big[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)\Big]}$$

![Espectro del multiplicador](T5_Modelos_de_Canal_img/05_espectro_multiplicador.jpg)

*Figura: (a) PSD de $X(t)$, paso bajo con $S_{XX}(\omega)=0$ para $\lvert\omega\rvert>W/2$; (b) PSD de $Y(t)$: **dos réplicas** centradas en $\pm\omega_0$, de altura $\frac{A_0^2}{4}S_{XX}(0)$ y ancho total $W$.*

**Interpretación:**

- El espectro de $X$ se **traslada** a $\pm\omega_0$, escalado por $A_0^2/4$.
- La **potencia** de salida es $P_Y=\frac{A_0^2}{2}P_X$ (el valor cuadrático medio de $\cos\omega_0t$ es $\tfrac12$).
- Si $X$ ocupa $\lvert\omega\rvert<W/2$, la señal modulada ocupa una banda de ancho **$W$** alrededor de $\omega_0$ (el doble que $X$ en frecuencias positivas). *Convención de esta figura: $W$ es el ancho de banda **total** de cada réplica.*
- Aunque $X$ sea WSS, $Y$ **no es WSS** (es cicloestacionario); su PSD se define con el promedio temporal de la autocorrelación.

### 3.3 Canal con ruido en el modelo analógico (complemento)

Con ruido aditivo, la señal recibida es $r(t)=X(t)A_0\cos\omega_0t+N(t)$. La SNR de recepción se calcula con las potencias de **señal modulada** y de **ruido en la banda del receptor**:

$$\text{SNR}=\frac{A_0^2P_X/2}{\sigma_N^2}$$

Si el receptor demodula **coherentemente** (multiplica por $\cos\omega_0t$ y filtra paso bajo), la componente de ruido en cuadratura se rechaza y la SNR a la salida es el doble (+3 dB) de la de entrada del demodulador (esto es un resultado clásico para doble banda lateral sin portadora; las diapositivas solo piden «caracterizar la calidad mediante la SNR»).

---

## 4. Modelos discretos de canal

### 4.1 Modulación digital: la cadena completa

![Cadena de comunicación digital](T5_Modelos_de_Canal_img/06_modulacion_digital_cadena.jpg)

| Bloque | Qué hace |
|---|---|
| **Entrada** $B[l]$ | **Bits** que toman valores en $\{0,1\}$ |
| **Codificador** | **Agrupa** bits para formar símbolos que toman uno de $M$ valores $\mathcal B=\{b_i,\;i=0,\dots,M-1\}$ (**alfabeto de entrada**) y los **transforma** en el símbolo $A$ mediante $b_i\to a_i$. Los $a_i$ pueden ser reales, complejos o vectores de dimensión $N$. El conjunto $\{a_i\}$ se llama **constelación** |
| **Modulador** | Convierte cada símbolo $a_i$ en una **señal analógica** $s_i(t)$, nula fuera de $0\le t\le T$ y de **energía finita** |
| **Canal** | Suma ruido gaussiano $n(t)$: $r(t)=s(t)+n(t)$ |
| **Demodulador** | Convierte $r(t)$ en una muestra (o vector) $q[n]$ por símbolo |
| **Decisor de símbolos** | Decide qué símbolo $\hat A[n]$ se transmitió a partir de $q[n]$ |
| **Decodificador** | Recupera los bits $\hat B[l]$ a partir de los símbolos decididos |

**Relaciones básicas (complemento):**

- Cada símbolo transporta $\log_2M$ bits. Para $M=4$: 2 bits/símbolo.
- Energía por bit: $E_b=\dfrac{E_s}{\log_2M}$. Para 4-PAM, $E_s=2E_b$.
- $T$ es el **periodo de símbolo**; la tasa de símbolos es $1/T$ y la de bits $\log_2M/T$.

### 4.2 Ejemplo: modulación PAM

**PAM** (*Pulse Amplitude Modulation*): cada símbolo se asigna a una **amplitud** de una portadora:

$$s_i(t)=a_i\cos(2\pi f_ct),\qquad0\le t\le T$$

![Constelación 4-PAM](T5_Modelos_de_Canal_img/07_constelacion_4pam.jpg)

*Constelación 4-PAM con codificación Gray: $a_0=-3\to01$, $a_1=-1\to00$, $a_2=+1\to10$, $a_3=+3\to11$.*

**Codificación Gray:** los símbolos **vecinos** difieren en **un solo bit** (01–00–10–11). Es la clave para que un error entre símbolos adyacentes solo corrompa 1 bit (ver §4.8).

![Formas de onda PAM](T5_Modelos_de_Canal_img/08_formas_onda_pam.jpg)

*Forma de onda $s(t)$: en cada intervalo $T$ se transmite una sinusoide cuya amplitud depende del símbolo (líneas discontinuas: la amplitud $a_i$).*

### 4.3 Canal discreto sin memoria (DMC)

![DMC](T5_Modelos_de_Canal_img/09_dmc.jpg)

Un **canal discreto sin memoria** (*Discrete Memoryless Channel*) es un modelo estadístico con una **entrada** $X$ (v.a.) y una **salida** $Y$ (v.a.). En cada instante acepta un símbolo $x_i$ de un alfabeto de entrada $\{x_i,\;i=1,\dots,M\}$ y emite un símbolo $y_j$ de un alfabeto de salida $\{y_j,\;j=1,\dots,L\}$.

- **Discreto**: los alfabetos de entrada y salida tienen **tamaño finito**.
- **Sin memoria**: el símbolo de salida actual depende **solo del símbolo de entrada actual**, no de ningún símbolo anterior.

**Caracterización.** Un DMC queda determinado por:

1. El alfabeto de entrada.
2. El alfabeto de salida.
3. Las **probabilidades de transición** $p_{Y|X}(y_j|x_i)$, agrupadas en la **matriz de canal**:

$$P=\begin{pmatrix}p_{Y|X}(y_0|x_0)&p_{Y|X}(y_1|x_0)&\cdots&p_{Y|X}(y_{L-1}|x_0)\\p_{Y|X}(y_0|x_1)&p_{Y|X}(y_1|x_1)&\cdots&p_{Y|X}(y_{L-1}|x_1)\\\vdots&\vdots&\ddots&\vdots\\p_{Y|X}(y_0|x_{M-1})&p_{Y|X}(y_1|x_{M-1})&\cdots&p_{Y|X}(y_{L-1}|x_{M-1})\end{pmatrix}\quad(M\times L)$$

**Cómo se lee:** la fila $i$ es la **distribución de la salida cuando se envió $x_i$**. Por tanto **cada fila suma 1** (es una pmf).

**Propiedades útiles (complemento):**

- **Sin memoria** significa $p(y_1,\dots,y_n\mid x_1,\dots,x_n)=\prod_kp(y_k\mid x_k)$: los usos sucesivos del canal son independientes.
- **Pmf de la salida:** con pmf de entrada $\mathbf p_X=(p_0,\dots,p_{M-1})$ (vector fila), $\mathbf p_Y=\mathbf p_X\,P$.
- **Probabilidad conjunta:** $p(x_i,y_j)=p_X(x_i)\,p_{Y|X}(y_j|x_i)$.
- **Bayes** (para decidir): $p_{X|Y}(x_i|y_j)=\dfrac{p_X(x_i)\,p_{Y|X}(y_j|x_i)}{p_Y(y_j)}$.

### 4.4 Canal digital

Un **canal digital** es un caso particular de DMC en el que el **alfabeto de entrada es el mismo que el de salida** y coincide con el alfabeto de símbolos de la **constelación** $\{a_i,\;i=0,\dots,M-1\}$.

![Canal digital](T5_Modelos_de_Canal_img/10_canales_anidados.jpg)

Corresponde a englobar **modulador, canal gaussiano, demodulador y decisor** (zona «Canal digital» de la figura). Entre el codificador y el decodificador, el canal digital transforma $A[n]$ en $\hat A[n]$.

Las probabilidades de transición son

$$p_{Y|X}(y_j|x_i)=p_{\hat A|A}(a_j|a_i)$$

es decir, la **probabilidad de decidir que el símbolo transmitido fue $a_j$ cuando el transmitido fue $a_i$** (o de recibir $a_j$ habiendo enviado $a_i$).

- **Diagonal** de $P$: decisiones **correctas**.
- **Fuera de la diagonal**: **errores de símbolo**.
- **Probabilidad de error de símbolo** (complemento): $P_s=\sum_ip(a_i)\,\big(1-P_{ii}\big)$.

### 4.5 Ejemplo: canal digital 4-PAM sobre canal gaussiano

**Modelo de partida.** Tras demodular, $q=g\,a_i+n$, con $n\sim\mathcal N(0,N_0/2)$ y $a_i\in\{-3,-1,1,3\}$. La energía media por símbolo es proporcional a $\overline{a^2}=\frac{9+1+1+9}{4}=5$, de modo que $g=\sqrt{E_s/5}$.

**Decisor:** decide el símbolo más cercano, con **umbrales en $-2g,\;0,\;2g$**.

**Cálculo de una fila (se envía $a_1=-g$).** La distancia de $-g$ a un umbral vecino es $g$ (a $-2g$ y a $0$):

$$\frac{g}{\sqrt{N_0/2}}=\sqrt{\frac{E_s/5}{N_0/2}}=\sqrt{\frac25\frac{E_s}{N_0}}\equiv z$$

![Decisión 4-PAM](T5_Modelos_de_Canal_img/g2_decision_4pam.png)

*Figura g2: se transmite $a_1$ (fila 2 de la matriz). La zona verde es la decisión correcta ($1-2Q(z)$); azul y rojo son los errores a los símbolos vecinos ($Q(z)$ y $Q(z)-Q(3z)$); la zona morada, error a dos niveles de distancia ($Q(3z)$).*

Aplicando la función $Q$ (Tema 1) a cada región se obtiene la **matriz del canal**:

$$P=\begin{pmatrix}1-Q(z)&Q(z)-Q(3z)&Q(3z)-Q(5z)&Q(5z)\\Q(z)&1-2Q(z)&Q(z)-Q(3z)&Q(3z)\\Q(3z)&Q(z)-Q(3z)&1-2Q(z)&Q(z)\\Q(5z)&Q(3z)-Q(5z)&Q(z)-Q(3z)&1-Q(z)\end{pmatrix},\quad z=\sqrt{\frac25\frac{E_s}{N_0}}$$

**Comprobaciones:** cada fila suma 1; es **simétrica respecto a la antidiagonal** ($P_{ij}=P_{3-i,3-j}$); los símbolos extremos tienen **un solo vecino** ($1-Q(z)$) y los centrales **dos** ($1-2Q(z)$).

**Valores numéricos (los de las diapositivas, con $E_s/N_0$ en unidades naturales):**

| $E_s/N_0$ (natural) | dB | $z$ |
|---|---|---|
| **2.5** | 3.98 dB | $1$ |
| **25** | 13.98 dB | $\sqrt{10}$ |

Para $E_s/N_0=2.5$:

$$P=\begin{pmatrix}0.8413&0.1573&0.0013&2.9\cdot10^{-7}\\0.1587&0.6827&0.1573&0.0013\\0.0013&0.1573&0.6827&0.1587\\2.9\cdot10^{-7}&0.0013&0.1573&0.8413\end{pmatrix}$$

Para $E_s/N_0=25$:

$$P=\begin{pmatrix}0.9992&7.8\cdot10^{-4}&1.2\cdot10^{-21}&1.3\cdot10^{-56}\\7.8\cdot10^{-4}&0.9984&7.8\cdot10^{-4}&1.2\cdot10^{-21}\\1.2\cdot10^{-21}&7.8\cdot10^{-4}&0.9984&7.8\cdot10^{-4}\\1.3\cdot10^{-56}&1.2\cdot10^{-21}&7.8\cdot10^{-4}&0.9992\end{pmatrix}$$

**Interpretación:**

- Con **poca SNR** ($E_s/N_0=2.5$) los errores a vecinos son frecuentes (15.9 % entre $a_1$ y $a_0$). Con **mucha SNR** (25) la matriz es casi la identidad.
- Los errores se producen **casi siempre a símbolos adyacentes**; saltarse un símbolo ($Q(3z)$) o dos ($Q(5z)$) es mucho menos probable (caen como $e^{-9z^2/2}$ y $e^{-25z^2/2}$).
- **Probabilidad de error de símbolo** (símbolos equiprobables, complemento):

$$P_s=\frac14\big[Q(z)+2Q(z)+2Q(z)+Q(z)\big]=\frac32\,Q(z)$$

  Para $E_s/N_0=2.5$: $P_s=1.5\cdot0.1587\approx0.238$. Para 25: $P_s\approx1.2\cdot10^{-3}$.

### 4.6 Canal binario simétrico (BSC)

Caso particular de DMC con **$M=L=2$** y matriz **simétrica**:

$$P=\begin{pmatrix}p_{Y|X}(y_0|x_0)&p_{Y|X}(y_1|x_0)\\p_{Y|X}(y_0|x_1)&p_{Y|X}(y_1|x_1)\end{pmatrix}=\begin{pmatrix}1-p&p\\p&1-p\end{pmatrix}$$

![BSC](T5_Modelos_de_Canal_img/11_bsc.jpg)

- $p$ es la **probabilidad de cruce** (*crossover*): probabilidad de que el bit llegue **cambiado**.
- Los errores son **igual de probables** en las dos direcciones ($0\to1$ y $1\to0$).

**Casos y propiedades (complemento):**

| $p$ | Significado |
|---|---|
| $0$ | Canal sin ruido |
| $0<p<\frac12$ | Canal útil |
| $\frac12$ | La salida es independiente de la entrada: **no transmite información** |
| $>\frac12$ | Se corrige invirtiendo todos los bits (equivale a $1-p$) |

- Número de errores en $n$ bits independientes: $\text{Binomial}(n,p)$ (Tema 1). $P[\text{ningún error}]=(1-p)^n$.
- **Dos BSC en serie** equivalen a un BSC con $p'=2p(1-p)$ (es el elemento $(0,1)$ de $P^2$).

### 4.7 Canal digital binario

En el modelo de **canal digital binario** se considera **todo el sistema** (codificador, modulador, canal gaussiano, demodulador, decisor y decodificador) como **un canal cuyas entradas y salidas son bits** (zona «Canal digital binario» de la figura de §0.2).

- Entrada y salida: $\{0,1\}$.
- Queda caracterizado por el **BER** (*Bit Error Rate*):

$$\text{BER}=p(0|1)=p(1|0)$$

- El **BSC** es el modelo probabilístico más adecuado para representarlo:

$$\boxed{P=\begin{pmatrix}1-\text{BER}&\text{BER}\\\text{BER}&1-\text{BER}\end{pmatrix}}$$

### 4.8 Ejemplo: canal digital binario de 4-PAM con canal gaussiano

Con la codificación Gray de la constelación y $E_s=2E_b$ ($E_b$ = energía por bit), se obtiene

$$\boxed{\text{BER}=\frac34\,Q\!\left(\sqrt{\frac45\frac{E_b}{N_0}}\right)+\frac12\,Q\!\left(3\sqrt{\frac45\frac{E_b}{N_0}}\right)-\frac14\,Q\!\left(5\sqrt{\frac45\frac{E_b}{N_0}}\right)}$$

**Cómo sale (complemento).** El BER es el promedio del número de bits que cambian en cada error de símbolo. Con $d_{ij}$ la distancia de Hamming entre los códigos de $a_i$ y $a_j$:

$$\text{BER}=\frac{1}{4\cdot2}\sum_{i}\sum_{j}P_{ij}\,d_{ij},\qquad d=\begin{pmatrix}0&1&2&1\\1&0&1&2\\2&1&0&1\\1&2&1&0\end{pmatrix}$$

(entre $a_0=01$ y $a_2=10$ difieren 2 bits; entre vecinos, 1 bit). Sustituyendo la matriz del §4.5, con $z=\sqrt{\tfrac45\tfrac{E_b}{N_0}}$ (porque $\tfrac25\tfrac{E_s}{N_0}=\tfrac45\tfrac{E_b}{N_0}$):

$$\text{BER}=\frac{6Q(z)+4Q(3z)-2Q(5z)}{8}=\frac34Q(z)+\frac12Q(3z)-\frac14Q(5z)\ \checkmark$$

**A SNR alta**, el primer término domina: $\text{BER}\approx\tfrac34Q(z)=\tfrac{P_s}{2}$, es decir, **un error de símbolo suele corromper un único bit** (gracias a Gray).

![BER de 4-PAM](T5_Modelos_de_Canal_img/g3_ber_4pam.png)

*Figura g3: BER frente a $E_b/N_0$ (dB). Los dos puntos rojos son los de las diapositivas.*

**Valores de las diapositivas:**

| $E_b/N_0$ (natural) | dB | BER |
|---|---|---|
| **1.25** | 0.97 dB | $0.1197$ |
| **12.5** | 10.97 dB | $0.0006$ (en realidad $5.9\cdot10^{-4}$) |

Matrices del canal digital binario (BSC con $p=\text{BER}$):

$$E_b/N_0=1.25:\;\begin{pmatrix}0.8803&0.1197\\0.1197&0.8803\end{pmatrix}\qquad E_b/N_0=12.5:\;\begin{pmatrix}0.9994&0.0006\\0.0006&0.9994\end{pmatrix}$$

(Con $E_b/N_0=1.25$ se tiene $E_s/N_0=2.5$, el mismo punto que la primera matriz del §4.5; con $12.5$, $E_s/N_0=25$.)

**Resumen del encaje de los tres niveles de modelo para este ejemplo:**

| Nivel | Modelo | Parámetro |
|---|---|---|
| Canal gaussiano | $r(t)=s(t)+n(t)$ | $N_0/2$ |
| Canal digital | Matriz $4\times4$ con $Q(\cdot)$ | $E_s/N_0$ |
| Canal digital binario | BSC $2\times2$ | BER (función de $E_b/N_0$) |

### 4.9 Código MATLAB para comprobar las matrices (complemento)

```matlab
Q  = @(x) 0.5*erfc(x/sqrt(2));          % función Q
EsN0 = 2.5;                              % unidades naturales (no dB)
z  = sqrt(0.4*EsN0);
P  = [1-Q(z),   Q(z)-Q(3*z), Q(3*z)-Q(5*z), Q(5*z);
      Q(z),     1-2*Q(z),    Q(z)-Q(3*z),   Q(3*z);
      Q(3*z),   Q(z)-Q(3*z), 1-2*Q(z),      Q(z);
      Q(5*z),   Q(3*z)-Q(5*z), Q(z)-Q(3*z), 1-Q(z)];
disp(P); disp(sum(P,2));                 % cada fila debe sumar 1

EbN0 = EsN0/2;  zb = sqrt(0.8*EbN0);
BER  = 0.75*Q(zb) + 0.5*Q(3*zb) - 0.25*Q(5*zb)
Pbsc = [1-BER BER; BER 1-BER]
```

---

## 5. Ejercicios resueltos

### Ejercicio 1: SNR en el canal aditivo gaussiano

La señal tiene potencia $\sigma_X^2=8$ W y el ruido $\sigma_N^2=0.08$ W. Halla la SNR (natural y dB) y la potencia recibida. ¿Qué SNR en dB corresponde a una relación de 20 y qué natural a 13 dB?

$$\text{SNR}=\frac{8}{0.08}=100\;\Rightarrow\;10\log_{10}100=20\text{ dB},\qquad\sigma_Y^2=8+0.08=8.08\text{ W}$$

(suponiendo señal y ruido independientes y de media cero). Para 20: $10\log_{10}20=13$ dB. Para 13 dB: $10^{1.3}\approx19.95\approx20$.

### Ejercicio 2: de canal gaussiano a BSC (enlace con el Tema 1)

Se transmite un bit con la señal $\pm A$ de forma equiprobable y se recibe $Y=X+N$, $N\sim\mathcal N(0,\sigma^2)$. El decisor compara con umbral $0$. Con $A=2$, $\sigma=1$: halla el modelo del canal digital binario y el nº medio de errores en 100 bits.

Se produce error si $N$ lleva la señal al otro lado del umbral: $p=P[N>A]=Q(A/\sigma)=Q(2)=0.0228$, y por simetría es igual para los dos símbolos. El canal es un **BSC**:

$$P=\begin{pmatrix}0.9772&0.0228\\0.0228&0.9772\end{pmatrix}$$

Errores en 100 bits: $\text{Binomial}(100,0.0228)$, con media $2.28$. La probabilidad de que no haya ninguno es $0.9772^{100}\approx0.10$.

### Ejercicio 3: envolvente Rayleigh

El canal Rayleigh tiene $\sigma=2$. Halla $E[R]$, la mediana, $P[R>3]$, $P[R<1]$ y la potencia media recibida.

- $E[R]=\sigma\sqrt{\pi/2}=2.507$
- Mediana $=\sigma\sqrt{2\ln2}=2.355$
- $P[R>3]=e^{-9/8}=0.325$
- $P[R<1]=1-e^{-1/8}=0.118$
- Potencia media $=\sigma^2=4$ (porque $E[R^2]=2\sigma^2=8$ y se divide entre 2).

Fracción de tiempo con la potencia 10 dB por debajo de la media: $P[R^2<0.1\cdot8]=1-e^{-0.1}=0.095$ (9.5 %).

### Ejercicio 4: de $Y_I,Y_Q$ a Rayleigh

$Y_I,Y_Q$ son $\mathcal N(0,\sigma^2)$ independientes. Demuestra que $P[R>r]=e^{-r^2/2\sigma^2}$ y que la fase es uniforme.

Pasando a polares la densidad conjunta es $\frac{r}{2\pi\sigma^2}e^{-r^2/2\sigma^2}$, que se factoriza en $f_R(r)=\frac r{\sigma^2}e^{-r^2/2\sigma^2}$ y $f_\Psi=\frac1{2\pi}$. Entonces $P[R>r]=\int_r^\infty\frac{u}{\sigma^2}e^{-u^2/2\sigma^2}du=e^{-r^2/2\sigma^2}$.

### Ejercicio 5: DMC genérico

Un DMC tiene $P=\begin{pmatrix}0.8&0.15&0.05\\0.1&0.3&0.6\end{pmatrix}$ y entradas con $p_X=(0.6,\,0.4)$. Halla $p_Y$, la probabilidad a posteriori $P(x_0|y_2)$, la decisión MAP y la probabilidad de error.

**Pmf de la salida:** $\mathbf p_Y=\mathbf p_XP=(0.6\cdot0.8+0.4\cdot0.1,\;0.6\cdot0.15+0.4\cdot0.3,\;0.6\cdot0.05+0.4\cdot0.6)=(0.52,\;0.21,\;0.27)$ (suma 1 ✓).

**A posteriori** (Bayes): $P(x_0|y_2)=\dfrac{0.6\cdot0.05}{0.27}=0.111$ y $P(x_1|y_2)=0.889$.

**Decisión MAP:** para cada $y_j$ se elige el $x$ de mayor $p(x)\,p(y_j|x)$:

| $y$ | $0.6\,p(y\mid x_0)$ | $0.4\,p(y\mid x_1)$ | Decide |
|---|---|---|---|
| $y_0$ | $0.48$ | $0.04$ | $x_0$ |
| $y_1$ | $0.09$ | $0.12$ | $x_1$ |
| $y_2$ | $0.03$ | $0.24$ | $x_1$ |

**Probabilidad de error:** suma de los términos perdedores $=0.04+0.09+0.03=0.16$.

### Ejercicio 6: canal digital 4-PAM a 10 dB

Con $E_s/N_0=10$ (10 dB), calcula $z$, la fila 2 de la matriz del canal, $P_s$ y el BER (con $E_b/N_0=5$).

$z=\sqrt{0.4\cdot10}=2$; $Q(2)=0.02275$; $Q(6)=9.9\cdot10^{-10}$.

Fila 2: $(Q(z),\;1-2Q(z),\;Q(z)-Q(3z),\;Q(3z))=(0.02275,\;0.9545,\;0.02275,\;9.9\cdot10^{-10})$.

$P_s=1.5\,Q(2)=0.0341$.

$\text{BER}=\tfrac34Q(2)+\tfrac12Q(6)-\tfrac14Q(10)\approx0.0171$ ($\approx P_s/2$).

### Ejercicio 7: BSC en serie

Dos BSC de $p=0.1$ se ponen en cascada. ¿Qué BSC equivalente forman? ¿Cuál es la probabilidad de recibir correctamente un paquete de 8 bits por el primer canal solo?

$p'=2p(1-p)=0.18$ (error si falla exactamente uno de los dos; si fallan ambos, se corrige). Paquete de 8 bits en el primer canal: $0.9^8=0.430$ (y $1-0.43=0.57$ de probabilidad de que haya al menos un error).

### Ejercicio 8: ancho de banda tras el multiplicador

La señal de voz $X(t)$ tiene $P_X=2$ W y ocupa hasta 4 kHz. Se multiplica por $3\cos(2\pi\cdot900\,\text{kHz}\cdot t)$. Halla la potencia de salida, la altura de la PSD (en función de la de $X$) y el ancho de banda.

- $P_Y=\dfrac{A_0^2}{2}P_X=\dfrac92\cdot2=9$ W.
- $S_Y=\dfrac{A_0^2}{4}[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)]$ con $\dfrac{A_0^2}{4}=2.25$: las réplicas tienen **2.25 veces** la altura de $S_X$.
- $Y$ ocupa $900\pm4$ kHz, es decir, **8 kHz** de ancho (el doble que $X$).

---

## 6. Banco de preguntas con respuesta modelo

**1. ¿Qué es el ruido y qué hipótesis tiene el canal aditivo gaussiano?**
Perturbación aleatoria sobre la señal de interés. El ruido es de media cero, independiente de la señal, aditivo, blanco ($N_0/2$) y gaussiano.

**2. ¿Cuál es la potencia promedio de la señal recibida?**
$\sigma_Y^2=\sigma_X^2+\sigma_N^2$: suma de las potencias de señal y ruido.

**3. ¿Por qué se anulan los términos cruzados $R_{XN}$ y $R_{NX}$?**
Por la independencia y porque el ruido tiene media cero: $R_{XN}=E[X]\,E[N]=0$.

**4. ¿Qué es la SNR y cómo se expresa en dB?**
Cociente entre potencia de señal y de ruido: $\sigma_X^2/\sigma_N^2$; en dB, $10\log_{10}(\sigma_X^2/\sigma_N^2)$.

**5. ¿Qué es el canal Rayleigh y qué fenómeno modela?**
Un canal radio que modela el multitrayecto: la señal llega por varios caminos (sin camino directo) y las réplicas interfieren, causando desvanecimientos.

**6. ¿Cómo se modela la señal recibida?**
$Y(t)=\sum_kA_k\cos(2\pi f_ct+\Theta_k)=Y_I\cos(2\pi f_ct)-Y_Q\sin(2\pi f_ct)=R\cos(2\pi f_ct+\Psi)$.

**7. ¿Qué distribución tienen $Y_I$, $Y_Q$, $R$ y $\Psi$?**
$Y_I,Y_Q$ gaussianas (TCL), $R$ Rayleigh, $\Psi$ uniforme en $[0,2\pi]$; $R$ y $\Psi$ independientes.

**8. ¿Por qué $R$ es Rayleigh?**
Porque es el módulo de un par gaussiano independiente de media cero y misma varianza; al pasar a polares la pdf se factoriza.

**9. ¿Cómo es la PSD a la salida de un multiplicador?**
$S_Y=\frac{A_0^2}{4}[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)]$: dos réplicas desplazadas $\pm\omega_0$.

**10. ¿Qué hace el codificador y el modulador en la cadena digital?**
El codificador agrupa bits en símbolos y los asigna a puntos de la constelación; el modulador convierte cada símbolo en una señal $s_i(t)$ de duración $T$ y energía finita.

**11. ¿Qué es un DMC?**
Un canal con entrada y salida discretas (alfabetos finitos), sin memoria: la salida actual solo depende de la entrada actual. Se describe con su matriz de canal.

**12. ¿Cómo es la matriz de un DMC?**
Filas indexadas por la entrada, columnas por la salida, elementos $p_{Y|X}(y_j|x_i)$; cada fila suma 1.

**13. ¿Qué es un canal digital?**
Un DMC cuyos alfabetos de entrada y salida son el de la constelación; los elementos son las probabilidades de decidir $a_j$ cuando se envió $a_i$.

**14. ¿Qué es el BSC?**
DMC binario simétrico: $P=\begin{pmatrix}1-p&p\\p&1-p\end{pmatrix}$.

**15. ¿Qué es el canal digital binario y cómo se caracteriza?**
El sistema completo visto como canal de bits; lo caracteriza el BER y se modela como BSC con $p=\text{BER}$.

**16. ¿Por qué se usa codificación Gray?**
Para que los símbolos vecinos difieran en un bit, de modo que los errores más probables (a vecinos) solo corrompan un bit y el BER sea mínimo.

**17. ¿Cómo se pasa del canal gaussiano al canal digital 4-PAM?**
Fijando los umbrales del decisor y calculando con la función $Q$ la probabilidad de que el ruido lleve $q$ a cada región, obteniendo la matriz $4\times4$.

---

## 7. Errores típicos y erratas de las diapositivas

**Errores típicos de examen**

1. Usar $E_s/N_0$ o $E_b/N_0$ **en dB** dentro de las fórmulas: deben ir en **unidades naturales** ($2.5$ y $25$ en el ejemplo no son dB).
2. Confundir $E_s$ y $E_b$: $E_s=E_b\log_2M$ (en 4-PAM, $E_s=2E_b$).
3. Olvidar que **cada fila** de la matriz de canal suma 1 (no las columnas).
4. Decir que $Y$ es gaussiano en el canal AWGN **siempre**: solo lo es el ruido (y $Y$ si $X$ lo es).
5. Calcular la SNR con la potencia de ruido **infinita** del ruido blanco ideal: hay que usar la potencia dentro del ancho de banda del receptor.
6. Escribir $P[R>r]$ de Rayleigh sin el factor $\frac12$ en el exponente: es $e^{-r^2/2\sigma^2}$.
7. Confundir la **media de $R$** ($\sigma\sqrt{\pi/2}$) con la **moda** ($\sigma$) o con $\sigma$ de la gaussiana.
8. Asumir que el BER es igual a la probabilidad de error de símbolo: con Gray y SNR alta, $\text{BER}\approx P_s/\log_2M$.
9. Ignorar que, en el modelo analógico, $Y$ **no es WSS** aunque $X$ lo sea.

**Erratas y descuidos en las diapositivas** (conviene conocerlos)

| Diapositiva | Aparece | Correcto / comentario |
|---|---|---|
| 4 | $S_X(w)=N_0/2$, $R_X(\tau)=\frac{N_0}2\delta(\tau)$ para el ruido | Debería ser $S_N$ y $R_N$ (el ruido es $N(t)$) |
| 5 | $R_Y(0)=\sigma_Y^2$ | Solo con medias cero; en general $R_Y(0)=\sigma_Y^2+m_Y^2$ |
| 8 | «$Y_I$ e $Y_Q$, que serán v.a. gaussianas» | Es por el TCL y exige $N$ grande |
| 9 | $\Psi=\tan^{-1}(Y_Q/Y_I)$ | Hay que usar $\text{atan2}$ para el cuadrante correcto |
| 17 | Índices $i=1,\dots,M$ junto a $i=0,\dots,M-1$ | Mezcla de convenciones de índices; usa una sola |
| 20 | $E_s/N_0=2{,}5$ y $25$ | Están en **unidades naturales** (3.98 dB y 13.98 dB) |
| 23 | BER $=0.0006$ para $E_b/N_0=12.5$ | Redondeo; el valor exacto de la fórmula es $5.9\cdot10^{-4}$ |
| 12 | $W/2$ y $W$ en las figuras | Convención distinta a la del tema de caracterización espectral (allí $X$ ocupaba $\lvert\omega\rvert<W$); aquí $W$ es el ancho **total** de cada réplica |

---

## 8. Formulario resumen

**Canal aditivo gaussiano**

$$Y=X+N,\quad R_Y=R_X+R_N,\quad S_Y=S_X+S_N,\quad\sigma_Y^2=\sigma_X^2+\sigma_N^2,\quad\text{SNR(dB)}=10\log_{10}\frac{\sigma_X^2}{\sigma_N^2}$$

**Rayleigh**

$$Y(t)=Y_I\cos2\pi f_ct-Y_Q\sin2\pi f_ct=R\cos(2\pi f_ct+\Psi),\quad f_R(r)=\frac r{\sigma^2}e^{-r^2/2\sigma^2},\quad\Psi\sim U(0,2\pi)$$

$$E[R]=\sigma\sqrt{\tfrac\pi2},\quad E[R^2]=2\sigma^2,\quad P[R>r]=e^{-r^2/2\sigma^2}$$

**Analógico:**

$$Y=XA_0\cos\omega_0t\;\Rightarrow\;S_Y=\frac{A_0^2}4[S_X(\omega-\omega_0)+S_X(\omega+\omega_0)],\quad P_Y=\frac{A_0^2}2P_X$$

**Canales discretos**

| Modelo | Matriz |
|---|---|
| DMC | $P_{ij}=p_{Y|X}(y_j|x_i)$, filas suman 1 |
| Canal digital | DMC con alfabetos = constelación; $P_{ij}=p_{\hat A|A}(a_j|a_i)$ |
| BSC | $\begin{pmatrix}1-p&p\\p&1-p\end{pmatrix}$ |
| Canal digital binario | BSC con $p=\text{BER}$ |

**4-PAM con AWGN** ($z=\sqrt{\tfrac25\tfrac{E_s}{N_0}}$):

$$P_s=\tfrac32Q(z),\qquad\text{BER}=\tfrac34Q(z')+\tfrac12Q(3z')-\tfrac14Q(5z'),\quad z'=\sqrt{\tfrac45\tfrac{E_b}{N_0}},\quad E_s=2E_b$$
