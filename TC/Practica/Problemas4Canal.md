# Tema 4 · Teoría de la Información — Problemas de fuentes de información (resueltos desde cero)

> **Cómo usar este documento.** Cada ejercicio sigue la misma estructura: (1) comprensión del problema, (2) fundamentos teóricos, (3) resolución paso a paso, (4) resultado e interpretación y (5) aprendizaje. Los conceptos se explican **la primera vez que aparecen** y después se referencian ("ver Ejercicio 1"), por lo que conviene leerlo en orden.

## Índice

1. [Convenios y notación](#convenios-y-notación)
2. [Ejercicio 1 — Entropía y tasa de una fuente de 4 mensajes](#ejercicio-1)
3. [Ejercicio 2 — Tasa de una fuente de imágenes de TV](#ejercicio-2)
4. [Ejercicio 3 — Fuente telegráfica](#ejercicio-3)
5. [Ejercicio 4 — Entropías conjunta y condicionales](#ejercicio-4)
6. [Ejercicio 5 — Fuente discreta y su versión cuantizada](#ejercicio-5)
7. [Ejercicio 6 — Cuantizador uniforme con entrada gaussiana](#ejercicio-6)
8. [Ejercicio 7 — Cuantizador de entropía máxima con entrada exponencial](#ejercicio-7)
9. [Ejercicio 8 — Cuantizador de 6 niveles con entrada gaussiana](#ejercicio-8)
10. [Fundamentos comunes de codificación de fuente](#fundamentos-comunes-de-codificación-de-fuente-ejercicios-9-a-13)
    - [Ejercicio 9 — Código de Huffman (5 símbolos)](#ejercicio-9)
11. [Ejercicio 10 — Código compacto con probabilidades potencias de 1/2](#ejercicio-10)
12. [Ejercicio 11 — Código compacto con probabilidades potencias de 1/3](#ejercicio-11)
13. [Ejercicio 12 — Tres mensajes equiprobables y extensión de segundo orden](#ejercicio-12)
14. [Ejercicio 13 — Alfabeto de 100 caracteres](#ejercicio-13)
15. [Resumen de resultados](#resumen-de-resultados)

---

## Convenios y notación

| Símbolo | Significado |
|---|---|
| $X$ | Variable aleatoria discreta que modela la salida de la fuente (en un instante) |
| $x_i$, $i=1,\dots,M$ | Valores (símbolos o mensajes) posibles de $X$; $M$ es el tamaño del alfabeto |
| $p_i=P(X=x_i)$ | Probabilidad del símbolo $x_i$. Siempre $p_i\ge 0$ y $\sum_i p_i=1$ |
| $I(x_i)$ | Información propia del símbolo $x_i$ (bits) |
| $H(X)$ | Entropía de la fuente (bit/símbolo) |
| $R$ | Tasa de información (bit/s) |
| $r_s$ | Ritmo de emisión de símbolos (símbolos/s) |
| $\log_2$, $\ln$ | Logaritmo en base 2 y neperiano. Se usa $\log_2 x=\dfrac{\ln x}{\ln 2}$, con $\ln 2\approx 0.6931$ |
| $\Phi(z)$ | Función de distribución de la normal $\mathcal N(0,1)$ (se usa en los ejercicios 6 y 8) |
| $L$ | Longitud media de un código (bit/símbolo) |
| $\eta$ | Eficiencia de un código |

**Convenios generales**

- Todos los logaritmos de información están en **base 2**, de modo que la unidad es el **bit**.
- Se usa el convenio $0\cdot\log_2 0=0$ (justificado porque $\lim_{p\to0^+}p\log_2 p=0$).
- Los resultados numéricos se redondean a 4 decimales. Las cifras se han comprobado por ordenador con precisión de doble precisión.
- **Dónde el enunciado es ambiguo o incompleto se avisa explícitamente** en el apartado "Comprensión del problema".

---

<a id="ejercicio-1"></a>
## Ejercicio 1 — Entropía y tasa de una fuente de 4 mensajes

> Una fuente genera uno de cuatro mensajes cada microsegundo, con probabilidades $0.4,\ 0.3,\ 0.2,\ 0.1$, de forma independiente. (a) Entropía de la fuente. (b) Tasa de información en bit/s. (c) Comparar con el caso equiprobable.

### 1. Comprensión del problema

- **Datos:** $M=4$ mensajes; $p=(0.4,\,0.3,\,0.2,\,0.1)$; un mensaje cada $T=1\ \mu\text{s}$, es decir, $r_s=1/T=10^{6}$ mensajes/s; mensajes independientes.
- **Incógnitas:** $H(X)$ en bit/mensaje; $R$ en bit/s; y los mismos valores si $p_i=1/4$.
- **Interpretación:** una fuente **discreta sin memoria** (DMS, *Discrete Memoryless Source*): cada símbolo se genera con la misma distribución, sin depender de los anteriores. Medimos cuánta "incertidumbre" o "información" promedio aporta cada mensaje.

Comprobación del enunciado: $0.4+0.3+0.2+0.1=1$ ✔.

### 2. Fundamentos teóricos

**Información propia (definición).** Para un suceso con probabilidad $p$ se define

$$I=\log_2\frac{1}{p}=-\log_2 p \quad\text{[bit]}.$$

*Justificación.* Queremos una medida de "sorpresa" que cumpla: (i) un suceso poco probable sorprende más (decrece con $p$); (ii) un suceso seguro ($p=1$) no aporta información ($I=0$); (iii) para dos sucesos **independientes** la información conjunta es la suma, y como $P(A,B)=P(A)P(B)$, necesitamos una función $f$ con $f(p_Ap_B)=f(p_A)+f(p_B)$. La única función continua que convierte productos en sumas es el logaritmo. Con base 2, un suceso de probabilidad $1/2$ aporta exactamente 1 bit (equivale a una pregunta de sí/no).

**Entropía (definición).** Es la información propia **promedio**, es decir, su esperanza. Para una v.a. discreta, $E[g(X)]=\sum_i g(x_i)\,p_i$. Tomando $g(x_i)=I(x_i)$:

$$H(X)=E[I(X)]=\sum_{i=1}^{M}p_i\log_2\frac{1}{p_i}=-\sum_{i=1}^{M}p_i\log_2 p_i\quad\text{[bit/mensaje]}.$$

**Tasa de información (definición).** Si la fuente emite $r_s$ mensajes por segundo y cada uno aporta en promedio $H(X)$ bits:

$$R=r_s\,H(X)\quad\text{[bit/s]}.$$

*Condición:* los mensajes deben ser independientes y con la misma distribución (hipótesis del problema). Entonces la entropía de $n$ mensajes es $nH(X)$, y en un segundo hay $r_s$ mensajes.

**Propiedad: cota superior de la entropía.** $0\le H(X)\le\log_2 M$, y $H(X)=\log_2 M$ **si y solo si** todos los símbolos son equiprobables.

*Demostración de la cota superior* (útil también en los ejercicios 7 y 8). Usamos la desigualdad $\ln x\le x-1$ (la recta tangente a $\ln x$ en $x=1$ queda por encima de la curva). Entonces

$$H(X)-\log_2 M=\sum_i p_i\log_2\frac{1}{p_i}-\sum_i p_i\log_2 M=\sum_i p_i\log_2\frac{1}{Mp_i}=\frac{1}{\ln2}\sum_i p_i\ln\frac{1}{Mp_i}.$$

Aplicando $\ln x\le x-1$ con $x=\frac{1}{Mp_i}$:

$$H(X)-\log_2 M\le\frac{1}{\ln2}\sum_i p_i\left(\frac{1}{Mp_i}-1\right)=\frac{1}{\ln2}\left(\sum_i\frac1M-\sum_i p_i\right)=\frac{1}{\ln2}(1-1)=0.$$

La igualdad se da solo cuando $\frac{1}{Mp_i}=1$ para todo $i$, es decir, $p_i=1/M$.

### 3. Resolución paso a paso

#### Apartado (a): entropía

**Qué hacemos:** aplicar la definición de entropía a cada símbolo, calculando primero $\log_2(1/p_i)$ (la información propia de cada mensaje) y multiplicando por su probabilidad.

Para pasar a base 2 usamos $\log_2 x=\ln x/\ln 2$:

| Mensaje | $p_i$ | $1/p_i$ | $I_i=\log_2(1/p_i)$ | $p_i\,I_i$ |
|---|---|---|---|---|
| $x_1$ | 0.4 | 2.5 | 1.3219 | $0.4\times1.3219=0.5288$ |
| $x_2$ | 0.3 | 3.3333 | 1.7370 | $0.3\times1.7370=0.5211$ |
| $x_3$ | 0.2 | 5 | 2.3219 | $0.2\times2.3219=0.4644$ |
| $x_4$ | 0.1 | 10 | 3.3219 | $0.1\times3.3219=0.3322$ |

(Ejemplo de cálculo de un logaritmo: $\log_2 2.5=\ln2.5/\ln2=0.9163/0.6931=1.3219$.)

Sumamos los términos (cada uno es la contribución del mensaje a la información media):

$$H(X)=0.5288+0.5211+0.4644+0.3322=1.8465\ \text{bit/mensaje}.$$

(El valor con más cifras es $1.84644$; la pequeña diferencia viene del redondeo de los términos.)

**Interpretación parcial:** los mensajes raros (el de $p=0.1$) aportan mucha información cada vez que ocurren (3.32 bits) pero ocurren poco; los frecuentes aportan poco por aparición. La entropía es el equilibrio de ambos efectos.

#### Apartado (b): tasa de información

**Qué hacemos:** convertir bit/mensaje en bit/s multiplicando por los mensajes que se emiten cada segundo.

Un mensaje cada $1\ \mu\text{s}=10^{-6}\ \text{s}$ implica $r_s=\dfrac{1}{10^{-6}\ \text{s}}=10^{6}$ mensajes/s. Entonces

$$R=r_s\,H(X)=10^{6}\ \frac{\text{mensajes}}{\text{s}}\times1.8464\ \frac{\text{bit}}{\text{mensaje}}=1.8464\times10^{6}\ \text{bit/s}.$$

#### Apartado (c): caso equiprobable

**Qué hacemos:** repetir el cálculo con $p_i=1/4$. Es el caso de máxima entropía, según la propiedad demostrada antes.

$$H_{eq}=\sum_{i=1}^{4}\frac14\log_2 4=4\cdot\frac14\cdot2=2\ \text{bit/mensaje}=\log_2 4.$$

$$R_{eq}=10^{6}\times2=2\times10^{6}\ \text{bit/s}.$$

### 4. Resultado e interpretación

| | $H$ (bit/mensaje) | $R$ (bit/s) |
|---|---|---|
| Fuente dada | **1.8464** | **$1.8464\times10^{6}$** |
| Equiprobable | **2** | **$2\times10^{6}$** |

- La fuente dada produce menos información por mensaje que la equiprobable: $2-1.8464=0.1536$ bit/mensaje menos (un 7.7 % menos). Lo "predecible" de la distribución (hay mensajes más probables que otros) reduce la incertidumbre.
- Es coherente con la cota $H\le\log_2 4=2$ ✔. La diferencia respecto al máximo se llama **redundancia**: $1-H/H_{\max}=1-1.8464/2=7.7\ \%$. Esa redundancia es lo que un buen código de fuente (ejercicios 9-13) puede aprovechar para comprimir.
- Unidades: bit/mensaje × mensaje/s = bit/s ✔.

### 5. Aprendizaje

- **Método:** (1) comprobar que $\sum p_i=1$; (2) calcular $I_i=\log_2(1/p_i)$; (3) $H=\sum p_iI_i$; (4) $R=r_sH$.
- **Cuándo se aplica:** siempre que se pida la información media de una fuente discreta de la que se conocen las probabilidades.
- **Errores típicos:** usar $\ln$ o $\log_{10}$ sin convertir a base 2; olvidar el signo menos en $-\sum p\log_2p$; confundir bit/mensaje con bit/s; suponer que la entropía depende de los *valores* de los símbolos (solo depende de sus probabilidades).

---

<a id="ejercicio-2"></a>
## Ejercicio 2 — Tasa de una fuente de imágenes de TV

> Una imagen de TV en blanco y negro de alta resolución consta de $2\cdot10^{6}$ píxeles con 16 niveles de luminancia, a 32 imágenes/s. Píxeles independientes y niveles equiprobables. Calcular la tasa de información promedio.

### 1. Comprensión del problema

- **Datos:** $N=2\cdot10^{6}$ píxeles por imagen; $M=16$ niveles por píxel, equiprobables ($p=1/16$); $r_{img}=32$ imágenes/s; píxeles independientes.
- **Incógnita:** $R$ en bit/s.
- **Interpretación:** cada píxel es un "símbolo" de una fuente con alfabeto de 16 niveles. Una imagen es un bloque de $N$ símbolos independientes. La fuente de imágenes emite una imagen cada $1/32$ s.

### 2. Fundamentos teóricos

- **Entropía de un símbolo equiprobable:** $H=\log_2 M$ (caso de igualdad de la cota del Ejercicio 1).
- **Entropía de símbolos independientes:** para $X_1,\dots,X_N$ independientes, $P(x_1,\dots,x_N)=\prod_kP(x_k)$, luego

$$H(X_1,\dots,X_N)=E\left[-\log_2\prod_kP(X_k)\right]=\sum_{k=1}^NE[-\log_2P(X_k)]=\sum_{k=1}^{N}H(X_k).$$

  Si además todos tienen la misma distribución, $H(X_1,\dots,X_N)=N\,H(X)$. *Esta propiedad aditiva depende de la independencia*: si los píxeles estuvieran correlacionados (como en una imagen real), la entropía sería menor que $N\,H(X)$.
- **Tasa:** $R=r_{img}\cdot H_{imagen}$.

### 3. Resolución paso a paso

**Paso 1 — Información por píxel.** Con 16 niveles equiprobables:

$$H_{pixel}=\log_2 16=4\ \text{bit/píxel},\qquad\text{porque }2^4=16.$$

**Paso 2 — Información por imagen.** Los $2\cdot10^6$ píxeles son independientes, así que sus entropías se suman:

$$H_{imagen}=N\,H_{pixel}=2\cdot10^{6}\times4=8\cdot10^{6}\ \text{bit/imagen}.$$

**Paso 3 — Tasa.** Se emiten 32 imágenes cada segundo:

$$R=r_{img}\,H_{imagen}=32\ \frac{\text{imágenes}}{\text{s}}\times8\cdot10^{6}\ \frac{\text{bit}}{\text{imagen}}=2.56\cdot10^{8}\ \text{bit/s}.$$

### 4. Resultado e interpretación

$$\boxed{R=2.56\times10^{8}\ \text{bit/s}=256\ \text{Mbit/s}}$$

- Es la tasa **máxima posible** para este formato (todo equiprobable e independiente): no hay redundancia que comprimir. En una imagen real los píxeles vecinos se parecen y los niveles no son equiprobables, por eso la compresión (JPEG, MPEG) reduce muchísimo esta cifra.
- Unidades: (imagen/s)·(bit/imagen) = bit/s ✔.

### 5. Aprendizaje

- **Método:** entropía por símbolo → multiplicar por el número de símbolos independientes del bloque → multiplicar por los bloques por segundo.
- **Reconocimiento:** aparecen frases como "píxeles independientes" y "niveles equiprobables".
- **Errores típicos:** olvidar que $\log_2 16=4$ (no 16); no multiplicar por el número de píxeles; aplicar la suma de entropías cuando los símbolos *no* son independientes.

---

<a id="ejercicio-3"></a>
## Ejercicio 3 — Fuente telegráfica

> Dos símbolos, punto y raya. Duración del punto: 0.2 s; la raya dura el triple. $P(\text{punto})=2\,P(\text{raya})$. El tiempo entre símbolos es 0.2 s. Calcular la tasa de información.

### 1. Comprensión del problema

- **Datos:** punto: duración $\tau_p=0.2$ s; raya: $\tau_r=3\tau_p=0.6$ s; espacio entre símbolos $\tau_e=0.2$ s; $P(p)=2P(r)$.
- **Incógnita:** $R$ en bit/s.
- **Diferencia con ejercicios anteriores:** ahora los símbolos **no duran lo mismo**, por lo que no hay un $r_s$ fijo. Hay que usar la **duración media por símbolo**.
- **Ambigüedad:** "tiempo entre símbolos" se interpreta como un silencio de 0.2 s **después de cada símbolo** (así cada símbolo ocupa su duración más 0.2 s). Es la lectura habitual de este problema clásico.
- Hipótesis añadida: la fuente es sin memoria (símbolos independientes), necesaria para usar la entropía de un solo símbolo.

### 2. Fundamentos teóricos

- **Probabilidades a partir de una relación.** Hay solo dos símbolos, luego $P(p)+P(r)=1$. Con $P(p)=2P(r)$ se despeja.
- **Entropía binaria:** para dos símbolos con probabilidades $q$ y $1-q$, $H=-q\log_2q-(1-q)\log_2(1-q)$.
- **Tasa con símbolos de distinta duración.** Si $T_i$ es el tiempo que ocupa el símbolo $x_i$ (incluyendo silencios asociados), la duración media de un símbolo es la esperanza $\bar T=\sum_ip_iT_i$. En un intervalo largo de $n$ símbolos transcurren $n\bar T$ segundos y se generan $nH$ bits, por lo que

$$R=\frac{H(X)}{\bar T}\quad\text{[bit/s]}.$$

(Si todos los símbolos duran $T$ se recupera $R=H/T=r_sH$ del Ejercicio 1.)

### 3. Resolución paso a paso

**Paso 1 — Probabilidades.** Sea $P(r)=q$. Entonces $P(p)=2q$ y

$$2q+q=1\ \Rightarrow\ 3q=1\ \Rightarrow\ q=\tfrac13,\qquad P(r)=\tfrac13,\quad P(p)=\tfrac23.$$

**Paso 2 — Entropía.**

$$H=\tfrac23\log_2\tfrac32+\tfrac13\log_23.$$

Cada término: $\log_2\tfrac32=\log_23-1=0.5850$ y $\log_23=1.5850$. Entonces

$$H=\tfrac23(0.5850)+\tfrac13(1.5850)=0.3900+0.5283=0.9183\ \text{bit/símbolo}.$$

(Forma cerrada: $H=\log_23-\tfrac23=1.5850-0.6667=0.9183$.)

**Paso 3 — Duración de cada símbolo con su silencio.**

- Punto: $0.2+0.2=0.4$ s.
- Raya: $0.6+0.2=0.8$ s.

**Paso 4 — Duración media.**

$$\bar T=\tfrac23(0.4)+\tfrac13(0.8)=0.2667+0.2667=0.5333\ \text{s/símbolo}.$$

(Comprobación alternativa: $\tfrac23(0.2)+\tfrac13(0.6)+0.2=0.1333+0.2+0.2=0.5333$ ✔.)

**Paso 5 — Tasa.**

$$R=\frac{H}{\bar T}=\frac{0.9183\ \text{bit/símbolo}}{0.5333\ \text{s/símbolo}}=1.7218\ \text{bit/s}.$$

### 4. Resultado e interpretación

$$\boxed{R\approx1.72\ \text{bit/s}}$$

- Es una tasa muy baja, como corresponde a un telégrafo manual: se emiten ~1.9 símbolos por segundo y cada uno lleva menos de 1 bit porque las probabilidades no son 1/2-1/2.
- Si se excluyera el silencio, $\bar T=0.3333$ s y $R=2.755$ bit/s; por eso es importante fijar bien la interpretación del enunciado.

### 5. Aprendizaje

- **Método:** probabilidades → $H$ → duración media (con silencios) → $R=H/\bar T$.
- **Reconocimiento:** símbolos con **duraciones distintas**.
- **Errores típicos:** dividir por la duración de un solo símbolo; olvidar el silencio entre símbolos; ponderar las duraciones con probabilidades equivocadas.

---

<a id="ejercicio-4"></a>
## Ejercicio 4 — Entropías conjunta y condicionales

> Dos v.a. binarias $X$, $Y$ con $P(X{=}0,Y{=}0)=P(X{=}0,Y{=}1)=P(X{=}1,Y{=}1)=\tfrac13$. Calcular $H(X)$, $H(Y)$, $H(X|Y)$, $H(Y|X)$ y $H(X,Y)$.

### 1. Comprensión del problema

- **Datos:** tres de las cuatro probabilidades conjuntas valen $1/3$. La cuarta, $P(X{=}1,Y{=}0)$, **no se da**, pero queda determinada: la suma de las cuatro debe ser 1, luego $P(1,0)=1-\tfrac33=0$. (Se avisa porque el enunciado no lo dice explícitamente.)
- **Incógnitas:** cinco entropías. Interpretación: $H(X|Y)$ es la incertidumbre que *queda* sobre $X$ cuando se conoce $Y$.

### 2. Fundamentos teóricos

- **Distribución conjunta** $P(x,y)=P(X{=}x,Y{=}y)$.
- **Marginales:** $P(x)=\sum_yP(x,y)$ y $P(y)=\sum_xP(x,y)$ (ley de la probabilidad total).
- **Condicional:** $P(x|y)=\dfrac{P(x,y)}{P(y)}$, definida si $P(y)>0$.
- **Entropía conjunta:** $H(X,Y)=-\sum_{x,y}P(x,y)\log_2P(x,y)$. Es la entropía del par visto como un único símbolo.
- **Entropía condicional:**

$$H(X|Y)=\sum_yP(y)\,H(X|Y{=}y)=-\sum_{x,y}P(x,y)\log_2P(x|y),$$

  donde $H(X|Y{=}y)$ es la entropía de la distribución condicional $P(\cdot|y)$. Es la media, ponderada por $P(y)$, de la incertidumbre residual sobre $X$.
- **Regla de la cadena.** Como $\log_2P(x,y)=\log_2P(y)+\log_2P(x|y)$, tomando $-E[\cdot]$ resulta

$$H(X,Y)=H(Y)+H(X|Y)=H(X)+H(Y|X).$$

  Permite calcular una condicional como diferencia: $H(X|Y)=H(X,Y)-H(Y)$.

### 3. Resolución paso a paso

**Paso 1 — Tabla conjunta.**

| | $Y=0$ | $Y=1$ | $P(x)$ |
|---|---|---|---|
| $X=0$ | 1/3 | 1/3 | 2/3 |
| $X=1$ | 0 | 1/3 | 1/3 |
| $P(y)$ | 1/3 | 2/3 | 1 |

Las columnas $P(x)$ y $P(y)$ son las sumas de cada fila y de cada columna (marginales).

**Paso 2 — $H(X)$ y $H(Y)$.** $X$ toma 0 con probabilidad $2/3$ y 1 con $1/3$. Como en el Ejercicio 3:

$$H(X)=\tfrac23\log_2\tfrac32+\tfrac13\log_23=\log_23-\tfrac23=0.9183\ \text{bit}.$$

$Y$ tiene probabilidades $(1/3,\,2/3)$, la misma distribución intercambiada, luego $H(Y)=0.9183$ bit.

**Paso 3 — $H(X,Y)$.** Hay tres pares con probabilidad $1/3$ y uno con 0 (que aporta 0 por el convenio $0\log0=0$):

$$H(X,Y)=3\cdot\tfrac13\log_23=\log_23=1.5850\ \text{bit}.$$

**Paso 4 — $H(X|Y)$ por la regla de la cadena.**

$$H(X|Y)=H(X,Y)-H(Y)=\log_23-\left(\log_23-\tfrac23\right)=\tfrac23=0.6667\ \text{bit}.$$

*Comprobación directa con la definición.* Condicionales de $X$ dado $Y$:

- $Y=0$ (prob. 1/3): solo ocurre $X=0$, luego $P(X|Y{=}0)=(1,0)$ y $H(X|Y{=}0)=0$.
- $Y=1$ (prob. 2/3): $P(X{=}0|Y{=}1)=\dfrac{1/3}{2/3}=\tfrac12$, igual para $X=1$, luego $H(X|Y{=}1)=1$ bit.

$$H(X|Y)=\tfrac13(0)+\tfrac23(1)=\tfrac23\ \checkmark$$

**Paso 5 — $H(Y|X)$.**

$$H(Y|X)=H(X,Y)-H(X)=\log_23-\left(\log_23-\tfrac23\right)=\tfrac23\ \text{bit}.$$

Comprobación directa: $X=0$ (prob. 2/3): $Y$ vale 0 ó 1 con prob. $\tfrac12$ → 1 bit; $X=1$ (prob. 1/3): $Y=1$ seguro → 0 bit; $H(Y|X)=\tfrac23\cdot1+\tfrac13\cdot0=\tfrac23$ ✔.

### 4. Resultado e interpretación

| Magnitud | Valor |
|---|---|
| $H(X)$ | $\log_23-\tfrac23=0.9183$ bit |
| $H(Y)$ | $0.9183$ bit |
| $H(X,Y)$ | $\log_23=1.5850$ bit |
| $H(X\mid Y)$ | $\tfrac23=0.6667$ bit |
| $H(Y\mid X)$ | $\tfrac23=0.6667$ bit |

- **Coherencia:** $H(X|Y)\le H(X)$ (conocer $Y$ nunca aumenta la incertidumbre sobre $X$) ✔, y $H(X,Y)\le H(X)+H(Y)=1.8366$ ✔ (con igualdad solo si $X$ e $Y$ son independientes; aquí no lo son).
- **Información mutua** (cuánto reduce $Y$ la incertidumbre sobre $X$): $I(X;Y)=H(X)-H(X|Y)=0.9183-0.6667=0.2516$ bit. Es el concepto que se usará en canales.

### 5. Aprendizaje

- **Método:** construir la tabla conjunta → marginales → $H(X,Y)$ → condicionales por la regla de la cadena (y verificar con la definición).
- **Reconocimiento:** el enunciado da una distribución conjunta.
- **Errores típicos:** calcular $H(X|Y)$ con $P(x)$ en lugar de $P(x|y)$; no deducir la probabilidad faltante; tomar $0\log0$ como indefinido; creer que $H(X|Y)=H(Y|X)$ siempre (aquí coinciden por simetría, no en general).

---

<a id="ejercicio-5"></a>
## Ejercicio 5 — Fuente discreta y su versión cuantizada

> Fuente sin memoria con alfabeto $A=\{-5,-3,-1,0,1,3,5\}$ y probabilidades $\{0.05,0.1,0.1,0.15,0.05,0.25,0.3\}$. (a) Entropía. (b) Entropía tras cuantizar con $q(-5)=q(-3)=-4$, $q(-1)=q(0)=q(1)=0$, $q(3)=q(5)=4$.

### 1. Comprensión del problema

- **Datos:** 7 símbolos con las probabilidades dadas, en el orden del alfabeto: $P(-5)=0.05$, $P(-3)=0.1$, $P(-1)=0.1$, $P(0)=0.15$, $P(1)=0.05$, $P(3)=0.25$, $P(5)=0.3$. Suma: $0.05+0.1+0.1+0.15+0.05+0.25+0.3=1$ ✔.
- **Incógnitas:** $H(X)$ y $H(q(X))$.
- **Interpretación:** la **cuantización** agrupa varios valores de entrada en un único valor de salida (aquí 7 valores → 3 niveles: $-4$, $0$, $4$). Es una transformación determinista que pierde información.

### 2. Fundamentos teóricos

- **Entropía:** $H=-\sum p_i\log_2p_i$ (Ejercicio 1). Solo depende del conjunto de probabilidades, **no** de los valores numéricos de los símbolos.
- **Función de una variable aleatoria.** Si $Y=q(X)$ con $q$ determinista, la probabilidad de cada valor de salida es la **suma de las probabilidades de todos los valores de entrada** que se transforman en él:

$$P(Y=y)=\sum_{x:\,q(x)=y}P(X=x).$$

- **Propiedad (la entropía no aumenta por procesado determinista):** $H(q(X))\le H(X)$. Intuición: al agrupar símbolos distintos en uno, ya no podemos distinguirlos, luego hay menos incertidumbre (y menos información).

### 3. Resolución paso a paso

#### Apartado (a)

Calculamos $-p\log_2p$ para cada símbolo (con $\log_2p=\ln p/\ln2$):

| $x$ | $p$ | $\log_2(1/p)$ | $p\log_2(1/p)$ |
|---|---|---|---|
| −5 | 0.05 | 4.3219 | 0.2161 |
| −3 | 0.10 | 3.3219 | 0.3322 |
| −1 | 0.10 | 3.3219 | 0.3322 |
| 0 | 0.15 | 2.7370 | 0.4105 |
| 1 | 0.05 | 4.3219 | 0.2161 |
| 3 | 0.25 | 2.0000 | 0.5000 |
| 5 | 0.30 | 1.7370 | 0.5211 |

(Por ejemplo, $\log_2(1/0.05)=\log_220=4.3219$, y $\log_2(1/0.25)=\log_24=2$ exactamente.) Sumando:

$$H(X)=0.2161+0.3322+0.3322+0.4105+0.2161+0.5000+0.5211=2.5282\ \text{bit/símbolo}.$$

Cota: $\log_27=2.8074$, y $2.5282\le2.8074$ ✔.

#### Apartado (b)

**Paso 1 — Probabilidades de la salida.** Aplicamos la propiedad de las funciones de v.a.:

- $P(Y=-4)=P(-5)+P(-3)=0.05+0.10=0.15$.
- $P(Y=0)=P(-1)+P(0)+P(1)=0.10+0.15+0.05=0.30$.
- $P(Y=4)=P(3)+P(5)=0.25+0.30=0.55$.

Comprobación: $0.15+0.30+0.55=1$ ✔.

**Paso 2 — Entropía de la salida.**

| $y$ | $p$ | $\log_2(1/p)$ | $p\log_2(1/p)$ |
|---|---|---|---|
| −4 | 0.15 | 2.7370 | 0.4105 |
| 0 | 0.30 | 1.7370 | 0.5211 |
| 4 | 0.55 | 0.8625 | 0.4744 |

$$H(q(X))=0.4105+0.5211+0.4744=1.4060\ \text{bit/símbolo}.$$

### 4. Resultado e interpretación

$$\boxed{H(X)=2.5282\ \text{bit/símbolo},\qquad H(q(X))=1.4060\ \text{bit/símbolo}}$$

- La cuantización ha eliminado $2.5282-1.4060=1.1222$ bit/símbolo. Es el precio de reducir 7 valores a 3 (menor resolución), pero a cambio se necesitan menos bits para representar la salida.
- Coherencia: $H(q(X))\le H(X)$ ✔ y $H(q(X))\le\log_23=1.585$ ✔.
- Observa que los valores $-4,0,4$ de la salida no intervienen en la entropía; solo cuentan las probabilidades.

### 5. Aprendizaje

- **Método:** (1) hallar las probabilidades de salida sumando las de las entradas agrupadas; (2) calcular la entropía con esas probabilidades.
- **Reconocimiento:** se da una regla $q(\cdot)$ que asigna varios valores a uno.
- **Errores típicos:** calcular la entropía de la salida con las probabilidades *de entrada* sin agrupar; usar los valores del alfabeto ($-4,0,4$) dentro de la fórmula; olvidar comprobar que las probabilidades agrupadas suman 1.

---

<a id="ejercicio-6"></a>
## Ejercicio 6 — Cuantizador uniforme con entrada gaussiana

> Proceso gaussiano de media cero y varianza unidad, muestreado. Las muestras entran a un cuantizador uniforme con la característica de la figura. Calcular la entropía de la salida.

### 1. Comprensión del problema

**Lectura de la figura** (la figura del enunciado es una escalera con 4 escalones):

| Entrada $x$ | Salida |
|---|---|
| $x<-1$ | $-1.5$ |
| $-1<x<0$ | $-0.5$ |
| $0<x<1$ | $+0.5$ |
| $x>1$ | $+1.5$ |

Es decir, umbrales en $-1,\ 0,\ 1$ (paso de cuantización $\Delta=1$) y niveles de reconstrucción en los puntos medios. Esta lectura se deduce de la figura; el enunciado no la da en texto.

- **Datos:** $X\sim\mathcal N(0,1)$ (media 0, varianza 1).
- **Incógnita:** $H(Y)$, con $Y=q(X)$ la salida del cuantizador.
- **Interpretación en términos de procesos aleatorios.** Un proceso gaussiano de media cero y varianza 1 tiene, en cada instante $t$, una muestra $X(t)\sim\mathcal N(0,1)$. Si el proceso es estacionario (en sentido amplio, y por ser gaussiano, también en sentido estricto, porque una gaussiana queda totalmente determinada por su media y su autocorrelación), todas las muestras tienen **la misma distribución**. Por tanto la entropía de la salida **por muestra** es la misma para cualquier instante de muestreo y se calcula con la distribución de una sola muestra. (Para hablar de tasa en bit/s haría falta además suponer independencia entre muestras, como en el Ejercicio 8.)

### 2. Fundamentos teóricos

- **Variable aleatoria continua y densidad.** Una v.a. continua se describe con su función densidad de probabilidad (fdp) $f(x)\ge0$ con $\int_{-\infty}^{\infty}f(x)dx=1$. Las probabilidades se obtienen **integrando**:

$$P(a<X<b)=\int_a^bf(x)\,dx.$$

  (La probabilidad de un valor puntual es 0; por eso los extremos abiertos o cerrados dan igual.)
- **Densidad gaussiana** $\mathcal N(\mu,\sigma^2)$: $f(x)=\dfrac{1}{\sqrt{2\pi\sigma^2}}\,e^{-(x-\mu)^2/(2\sigma^2)}$. Para $\mu=0,\sigma=1$: $f(x)=\dfrac{1}{\sqrt{2\pi}}e^{-x^2/2}$.
- **Función de distribución** $F(x)=P(X\le x)$. Para la normal estándar se denota $\Phi(x)=\int_{-\infty}^x\frac{1}{\sqrt{2\pi}}e^{-t^2/2}dt$. No tiene primitiva elemental, así que se **consulta en tablas**. Entonces $P(a<X<b)=\Phi(b)-\Phi(a)$.
- **Simetría:** como $f$ es par, $\Phi(-z)=1-\Phi(z)$ y $\Phi(0)=\tfrac12$.
- **Valores de tabla necesarios:** $\Phi(1)=0.8413$ (aprox.; más cifras: $0.841345$).
- **Cuantizador y entropía.** La salida $Y$ es una v.a. **discreta** (4 valores). La probabilidad de cada valor de salida es la probabilidad del intervalo de entrada que lo produce, y su entropía es $H(Y)=-\sum_kP_k\log_2P_k$ (Ejercicio 1).

### 3. Resolución paso a paso

**Paso 1 — Probabilidades de cada intervalo.**

- $P(Y=-1.5)=P(X<-1)=\Phi(-1)=1-\Phi(1)=1-0.8413=0.1587.$
- $P(Y=-0.5)=P(-1<X<0)=\Phi(0)-\Phi(-1)=0.5-0.1587=0.3413.$
- $P(Y=0.5)=P(0<X<1)=\Phi(1)-\Phi(0)=0.8413-0.5=0.3413$ (simetría).
- $P(Y=1.5)=P(X>1)=1-\Phi(1)=0.1587.$

Suma: $2(0.1587+0.3413)=1$ ✔.

**Paso 2 — Entropía.** Por la simetría, hay dos probabilidades iguales a $0.1587$ y dos iguales a $0.3413$:

- $\log_2(1/0.1587)=2.6560$, luego $0.1587\times2.6560=0.4214$.
- $\log_2(1/0.3413)=1.5507$, luego $0.3413\times1.5507=0.5293$.

$$H(Y)=2(0.4214)+2(0.5293)=0.8428+1.0586=1.9014\ \text{bit/muestra}.$$

### 4. Resultado e interpretación

$$\boxed{H(Y)\approx1.90\ \text{bit/muestra}}$$

- Con 4 niveles el máximo posible es $\log_24=2$ bit; obtenemos $1.90$, muy cerca. Los niveles centrales son más probables porque la campana gaussiana concentra la probabilidad cerca de 0, pero la anchura $\Delta=1$ del cuantizador es comparable a $\sigma$, de modo que los cuatro intervalos quedan bastante equilibrados.
- Un código de longitud fija usaría 2 bit/muestra; un código de entropía (Huffman) podría acercarse a $1.90$.

### 5. Aprendizaje

- **Método:** (1) leer umbrales de la figura; (2) probabilidad de cada intervalo con $\Phi$; (3) entropía de la distribución discreta resultante.
- **Reconocimiento:** entrada continua (gaussiana, exponencial…) + cuantizador.
- **Errores típicos:** confundir niveles de salida con umbrales; olvidar que $\Phi(-z)=1-\Phi(z)$; usar la fdp en lugar de la probabilidad (hay que integrar); calcular la entropía con los valores $\pm0.5,\pm1.5$.

---

<a id="ejercicio-7"></a>
## Ejercicio 7 — Cuantizador de entropía máxima con entrada exponencial

> La entrada de un cuantizador es una v.a. con fdp $f(x)=a\,e^{-ax}$ para $x\ge0$ y $0$ para $x<0$. Cuantizador de 4 niveles. Determinar $x_1,x_2,x_3$ en función de $a$ para que la entropía de la salida sea máxima.

### 1. Comprensión del problema

- **Datos:** fdp exponencial con parámetro $a>0$. Cuantizador de 4 niveles con umbrales $0<x_1<x_2<x_3$, de modo que los intervalos son $[0,x_1)$, $[x_1,x_2)$, $[x_2,x_3)$ y $[x_3,\infty)$ (lectura de la figura).
- **Incógnitas:** $x_1,x_2,x_3$.
- **Interpretación:** buscamos los umbrales que maximizan $H(Y)$. Como $H$ depende solo de las probabilidades de los intervalos, el problema es: ¿cómo repartir el eje $x\ge0$ en 4 intervalos de modo que la distribución discreta resultante tenga entropía máxima?
- Nota: el enunciado no da los niveles de salida; no hacen falta, pues no influyen en la entropía.

### 2. Fundamentos teóricos

- **Máxima entropía:** por la propiedad demostrada en el Ejercicio 1, $H\le\log_2M$ con igualdad **sii** los $M$ símbolos son equiprobables. Con $M=4$: $H_{\max}=2$ bit, alcanzado cuando cada intervalo tiene probabilidad $1/4$. Esa igualdad es alcanzable aquí porque, al ser continua la entrada, podemos ajustar los umbrales hasta lograr cualquier reparto.
- **Verificación de que $f$ es una fdp:** $\int_0^\infty ae^{-ax}dx=\left[-e^{-ax}\right]_0^\infty=0-(-1)=1$ ✔.
- **Probabilidad de un intervalo:** $P(\alpha<X<\beta)=\int_\alpha^\beta ae^{-ax}dx=e^{-a\alpha}-e^{-a\beta}$ (por la primitiva anterior).
- **Función de distribución** (para $x\ge0$): $F(x)=P(X\le x)=\int_0^xae^{-at}dt=1-e^{-ax}$.

### 3. Resolución paso a paso

**Paso 1 — Condición de equiprobabilidad.** Queremos $P(Y=k)=\tfrac14$ para los 4 intervalos. Expresada con $F$, esto significa que los umbrales son los **cuantiles** $\tfrac14,\tfrac24,\tfrac34$:

$$F(x_1)=\tfrac14,\qquad F(x_2)=\tfrac12,\qquad F(x_3)=\tfrac34.$$

(Porque $P(0<X<x_1)=F(x_1)$, $P(x_1<X<x_2)=F(x_2)-F(x_1)$, etc.)

**Paso 2 — Resolver cada ecuación.** Usamos $F(x)=1-e^{-ax}$ y despejamos $x$:

$$1-e^{-ax_k}=q_k\ \Rightarrow\ e^{-ax_k}=1-q_k\ \Rightarrow\ -ax_k=\ln(1-q_k)\ \Rightarrow\ x_k=\frac{-\ln(1-q_k)}{a}=\frac{1}{a}\ln\frac{1}{1-q_k}.$$

- $q_1=\tfrac14$: $x_1=\dfrac1a\ln\dfrac{1}{3/4}=\dfrac{\ln(4/3)}{a}\approx\dfrac{0.2877}{a}$.
- $q_2=\tfrac12$: $x_2=\dfrac1a\ln2\approx\dfrac{0.6931}{a}$.
- $q_3=\tfrac34$: $x_3=\dfrac1a\ln\dfrac{1}{1/4}=\dfrac{\ln4}{a}=\dfrac{2\ln2}{a}\approx\dfrac{1.3863}{a}$.

**Paso 3 — Comprobación.** $P(X>x_3)=e^{-ax_3}=e^{-\ln4}=\tfrac14$ ✔; $P(x_1<X<x_2)=e^{-ax_1}-e^{-ax_2}=\tfrac34-\tfrac12=\tfrac14$ ✔; $P(x_2<X<x_3)=\tfrac12-\tfrac14=\tfrac14$ ✔; $P(0<X<x_1)=1-\tfrac34=\tfrac14$ ✔.

### 4. Resultado e interpretación

$$\boxed{x_1=\frac{\ln(4/3)}{a},\qquad x_2=\frac{\ln2}{a},\qquad x_3=\frac{\ln4}{a}}$$

con $H_{\max}=\log_24=2$ bit/muestra.

- Los intervalos **no son uniformes**: sus anchuras crecen ($0.288/a$, $0.405/a$, $0.693/a$, y el último es infinito), porque la fdp decrece: hace falta un intervalo más ancho para acumular la misma probabilidad donde la densidad es baja.
- Los umbrales escalan como $1/a$: si $a$ es grande (señal concentrada cerca de 0, media $1/a$ pequeña), los umbrales se acercan al origen.

### 5. Aprendizaje

- **Método:** entropía máxima ⇒ intervalos equiprobables ⇒ umbrales = cuantiles $k/M$ de la distribución ⇒ resolver $F(x_k)=k/M$.
- **Reconocimiento:** "entropía máxima a la salida del cuantizador".
- **Errores típicos:** pensar que "máxima entropía" implica intervalos de igual anchura (solo ocurre con densidad uniforme); olvidar que la probabilidad se obtiene integrando $f$, no evaluándola.

---

<a id="ejercicio-8"></a>
## Ejercicio 8 — Cuantizador de 6 niveles con entrada gaussiana

> Señal muestreada a 500 muestras/s con fdp gaussiana de media 0 y varianza $\sigma^2$, cuantizada según la tabla: $(-\infty,-2\sigma)\to m_0$; $(-2\sigma,-\sigma)\to m_1$; $(-\sigma,0)\to m_2$; $(0,\sigma)\to m_3$; $(\sigma,2\sigma)\to m_4$; $(2\sigma,\infty)\to m_5$. (a) Entropía de la salida y tasa en bit/s. (b) Intervalos de cuantización (en función de $\sigma$) que maximizan la entropía.

### 1. Comprensión del problema

- **Datos:** $X\sim\mathcal N(0,\sigma^2)$; $r_s=500$ muestras/s; 6 intervalos con umbrales $\pm\sigma,\pm2\sigma,0$.
- **Notación:** la varianza es $\sigma^2$, luego la desviación típica es $\sigma$ y los umbrales de la tabla son múltiplos de ella.
- **Incógnitas:** (a) $H(Y)$ y $R$; (b) nuevos umbrales.
- **Hipótesis necesaria para la tasa:** las muestras son independientes entre sí (si no lo fueran, $r_sH$ sería solo una cota superior de la tasa real).

### 2. Fundamentos teóricos

- **Estandarización.** Si $X\sim\mathcal N(0,\sigma^2)$, entonces $Z=X/\sigma\sim\mathcal N(0,1)$. Por tanto

$$P(a\sigma<X<b\sigma)=P(a<Z<b)=\Phi(b)-\Phi(a),$$

  **independiente de $\sigma$**. Consecuencia: la entropía del cuantizador (a) no depende de $\sigma$ porque los umbrales son múltiplos de $\sigma$.
- Valores de tabla: $\Phi(1)=0.8413$, $\Phi(2)=0.9772$ (más precisos: $0.841345$, $0.977250$); $\Phi(-z)=1-\Phi(z)$.
- Entropía, tasa $R=r_sH$ y condición de máxima entropía ($p_k=1/M$): ver Ejercicios 1 y 7.
- **Cuantil de la normal estándar:** $z_q=\Phi^{-1}(q)$, el valor con $\Phi(z_q)=q$. Se busca en la tabla "al revés".

### 3. Resolución paso a paso

#### Apartado (a)

**Paso 1 — Probabilidades.**

- $P(m_0)=P(Z<-2)=\Phi(-2)=1-0.9772=0.0228$.
- $P(m_1)=P(-2<Z<-1)=\Phi(-1)-\Phi(-2)=0.1587-0.0228=0.1359$.
- $P(m_2)=P(-1<Z<0)=0.5-0.1587=0.3413$.
- Por simetría: $P(m_3)=0.3413$, $P(m_4)=0.1359$, $P(m_5)=0.0228$.

Suma: $2(0.0228+0.1359+0.3413)=2(0.5000)=1$ ✔.

**Paso 2 — Entropía.**

| Salida | $p$ | $\log_2(1/p)$ | $p\log_2(1/p)$ |
|---|---|---|---|
| $m_0,m_5$ | 0.0228 | 5.4580 | 0.1242 |
| $m_1,m_4$ | 0.1359 | 2.8793 | 0.3913 |
| $m_2,m_3$ | 0.3413 | 1.5507 | 0.5293 |

Cada fila aparece dos veces (simetría):

$$H(Y)=2(0.1242)+2(0.3913)+2(0.5293)=0.2484+0.7826+1.0586=2.0896\ \text{bit/muestra}.$$

**Paso 3 — Tasa.**

$$R=r_sH(Y)=500\ \frac{\text{muestras}}{\text{s}}\times2.0896\ \frac{\text{bit}}{\text{muestra}}=1044.8\ \text{bit/s}.$$

#### Apartado (b)

**Paso 1 — Condición.** Entropía máxima con $M=6$ ⇒ los 6 intervalos equiprobables, $p=\tfrac16$ cada uno, y $H_{\max}=\log_26=2.5850$ bit.

**Paso 2 — Umbrales como cuantiles.** Los 5 umbrales $t_1<\dots<t_5$ cumplen $\Phi(t_k/\sigma)=\tfrac k6$, $k=1,\dots,5$. Buscamos $z_k=\Phi^{-1}(k/6)$:

- $k=3$: $\Phi(z)=0.5\Rightarrow z_3=0$.
- $k=4$: $\Phi(z)=\tfrac23=0.6667$. En tabla $\Phi(0.43)=0.6664$ y $\Phi(0.44)=0.6700$; interpolando, $z_4\approx0.4307$.
- $k=5$: $\Phi(z)=\tfrac56=0.8333$. En tabla $\Phi(0.96)=0.8315$ y $\Phi(0.97)=0.8340$; interpolando, $z_5\approx0.9674$.
- Por simetría ($\Phi(-z)=1-\Phi(z)$): $z_1=-0.9674$, $z_2=-0.4307$.

**Paso 3 — Tabla de intervalos.**

| Intervalo de $x$ | Salida | Probabilidad |
|---|---|---|
| $(-\infty,\,-0.9674\sigma)$ | $m_0$ | 1/6 |
| $(-0.9674\sigma,\,-0.4307\sigma)$ | $m_1$ | 1/6 |
| $(-0.4307\sigma,\,0)$ | $m_2$ | 1/6 |
| $(0,\,0.4307\sigma)$ | $m_3$ | 1/6 |
| $(0.4307\sigma,\,0.9674\sigma)$ | $m_4$ | 1/6 |
| $(0.9674\sigma,\,\infty)$ | $m_5$ | 1/6 |

Con esta partición: $H_{\max}=\log_26=2.5850$ bit/muestra y, a 500 muestras/s, $R_{\max}=1292.5$ bit/s (dato adicional).

### 4. Resultado e interpretación

$$\boxed{H(Y)=2.0896\ \text{bit/muestra},\quad R=1044.8\ \text{bit/s}}$$

- **(b)** Umbrales: $0,\ \pm0.4307\sigma,\ \pm0.9674\sigma$.
- La partición del enunciado (paso $\sigma$, truncada en $\pm2\sigma$) da una entropía menor que el máximo $2.5850$ porque las colas ($|x|>2\sigma$) son poco probables ($2.3\ \%$ cada una). El cuantizador óptimo en entropía **estrecha los intervalos centrales y ensancha los extremos** hasta igualar probabilidades.
- Como las probabilidades dependen de $x/\sigma$, el resultado no depende de la potencia $\sigma^2$ de la señal, solo los umbrales absolutos escalan con $\sigma$.

### 5. Aprendizaje

- **Método:** estandarizar $Z=X/\sigma$ → probabilidades con $\Phi$ y simetría → entropía → multiplicar por la frecuencia de muestreo. Para entropía máxima: umbrales = $\sigma\,\Phi^{-1}(k/M)$.
- **Errores típicos:** olvidar estandarizar; no usar la simetría (más cálculo y más errores); aplicar $R=r_sH$ sin recordar que supone muestras independientes; confundir $\Phi^{-1}(k/M)$ con $k/M$.

---

## Fundamentos comunes de codificación de fuente (ejercicios 9 a 13)

Los ejercicios 9-13 piden construir **códigos compactos** (óptimos) para una fuente discreta sin memoria. Estos conceptos se usan en todos ellos, por lo que se explican una sola vez aquí.

**Código de fuente.** Asigna a cada símbolo $x_i$ una **palabra código** (secuencia de bits) de longitud $l_i$. Se desea que sea **decodificable de forma única e instantánea**, lo cual se garantiza con un **código prefijo** (ninguna palabra es el comienzo de otra): al terminar de leer una palabra se sabe que acaba, sin esperar a los bits siguientes.

**Longitud media.** Es la esperanza de la longitud de las palabras:

$$L=\sum_{i=1}^{M}p_i\,l_i\quad\text{[bit/símbolo]}.$$

**Desigualdad de Kraft.** Existe un código prefijo binario con longitudes $l_1,\dots,l_M$ **si y solo si** $\sum_i2^{-l_i}\le1$. (Cada palabra de longitud $l$ "ocupa" una fracción $2^{-l}$ del árbol binario de todas las secuencias posibles; no pueden ocuparse más del 100 %.) Con igualdad ($=1$) el código es **completo**: el árbol no tiene ramas sin usar.

**Teorema de codificación de fuente (Shannon).** Para cualquier código prefijo, $L\ge H(X)$, y existe uno óptimo con

$$H(X)\le L<H(X)+1.$$

  La entropía es el límite inferior de bits por símbolo. Si $p_i=2^{-l_i}$ (probabilidades potencias de $1/2$, caso **diádico**), se puede alcanzar $L=H$ porque $l_i=\log_2(1/p_i)=I(x_i)$ es entero.

**Eficiencia y redundancia del código.**

$$\eta=\frac{H(X)}{L}\le1,\qquad\text{redundancia}=1-\eta.$$

**Algoritmo de Huffman** (produce un código prefijo de longitud media mínima):

1. Ordenar los símbolos por probabilidad.
2. Unir los **dos** de menor probabilidad en un nodo cuya probabilidad es su suma.
3. Repetir con la lista reducida hasta quedar un único nodo (la raíz, con probabilidad 1).
4. Recorrer el árbol desde la raíz: etiquetar cada par de ramas con 0 y 1; la palabra de cada símbolo es la secuencia de etiquetas hasta su hoja.

Cuando hay empates el árbol puede variar (distintas palabras o longitudes), pero **$L$ es siempre la misma** (mínima).

**Extensión de orden $n$.** Se agrupan $n$ símbolos consecutivos en un super-símbolo. Para una fuente sin memoria, $H(X^n)=nH(X)$ (Ejercicio 2). Codificando la extensión, la longitud media **por símbolo original** es $L_n/n$, con $H\le L_n/n<H+1/n$: se acerca a la entropía al crecer $n$.

---

<a id="ejercicio-9"></a>
## Ejercicio 9 — Código de Huffman (5 símbolos)

> Fuente DMS con 5 símbolos y $P(x_1)=0.4$, $P(x_2)=0.19$, $P(x_3)=0.16$, $P(x_4)=0.15$, $P(x_5)=0.1$. Construir un código de Huffman y calcular su eficiencia.

### 1. Comprensión del problema

- **Datos:** 5 símbolos; suma $0.4+0.19+0.16+0.15+0.10=1$ ✔.
- **Incógnitas:** las palabras código, $L$ y $\eta$.
- Los fundamentos (código prefijo, $L$, $\eta$, algoritmo de Huffman) están en la sección anterior.

### 2. Fundamentos teóricos

Se usan: algoritmo de Huffman, $L=\sum p_il_i$, $H=\sum p_i\log_2(1/p_i)$ y $\eta=H/L$ (ver sección de fundamentos de codificación).

### 3. Resolución paso a paso

**Paso 1 — Construcción del árbol.** Lista inicial ordenada: $0.4\ (x_1)$, $0.19\ (x_2)$, $0.16\ (x_3)$, $0.15\ (x_4)$, $0.10\ (x_5)$.

| Etapa | Se unen | Nodo nuevo | Lista resultante |
|---|---|---|---|
| 1 | $x_4\,(0.15)+x_5\,(0.10)$ | $A=0.25$ | $0.4,\ 0.25_A,\ 0.19,\ 0.16$ |
| 2 | $x_3\,(0.16)+x_2\,(0.19)$ | $B=0.35$ | $0.4,\ 0.35_B,\ 0.25_A$ |
| 3 | $A\,(0.25)+B\,(0.35)$ | $C=0.60$ | $0.6_C,\ 0.4$ |
| 4 | $C\,(0.6)+x_1\,(0.4)$ | raíz $=1$ | — |

En cada etapa unimos las dos probabilidades más pequeñas de la lista.

**Paso 2 — Asignar bits.** Etiquetamos en la raíz: $x_1\to0$, $C\to1$. Dentro de $C$: $B\to0$, $A\to1$. Dentro de $B$: $x_3\to0$, $x_2\to1$. Dentro de $A$: $x_5\to0$, $x_4\to1$.

| Símbolo | $p_i$ | Palabra | $l_i$ |
|---|---|---|---|
| $x_1$ | 0.40 | `0` | 1 |
| $x_3$ | 0.16 | `100` | 3 |
| $x_2$ | 0.19 | `101` | 3 |
| $x_5$ | 0.10 | `110` | 3 |
| $x_4$ | 0.15 | `111` | 3 |

Es prefijo (ninguna palabra empieza por otra) y Kraft: $2^{-1}+4\cdot2^{-3}=\tfrac12+\tfrac12=1$ ✔.

**Paso 3 — Longitud media.**

$$L=0.4(1)+0.19(3)+0.16(3)+0.15(3)+0.10(3)=0.4+0.57+0.48+0.45+0.30=2.20\ \text{bit/símbolo}.$$

**Paso 4 — Entropía.**

| $p$ | $\log_2(1/p)$ | $p\log_2(1/p)$ |
|---|---|---|
| 0.40 | 1.3219 | 0.5288 |
| 0.19 | 2.3959 | 0.4552 |
| 0.16 | 2.6439 | 0.4230 |
| 0.15 | 2.7370 | 0.4105 |
| 0.10 | 3.3219 | 0.3322 |

$$H=0.5288+0.4552+0.4230+0.4105+0.3322=2.1497\ \text{bit/símbolo}.$$

**Paso 5 — Eficiencia.**

$$\eta=\frac{H}{L}=\frac{2.1497}{2.20}=0.9772\ (97.7\ \%).$$

### 4. Resultado e interpretación

$$\boxed{L=2.20\ \text{bit/símbolo},\quad H=2.1497\ \text{bit/símbolo},\quad\eta\approx97.7\ \%}$$

- Coherencia con el teorema: $2.1497\le2.20<3.1497$ ✔.
- Comparación: un código de longitud fija necesitaría $\lceil\log_25\rceil=3$ bit/símbolo ($\eta=2.1497/3=71.7\ \%$). Huffman ahorra $0.8$ bit/símbolo (26.7 %).
- La eficiencia no llega al 100 % porque las probabilidades no son potencias de 1/2 y las longitudes deben ser enteras.

### 5. Aprendizaje

- **Método:** unir siempre los dos menores → árbol → palabras → $L$ → $H$ → $\eta=H/L$.
- **Errores típicos:** unir los dos *mayores*; olvidar reordenar tras cada unión; asignar longitudes sin construir el árbol; calcular $\eta$ con $L/H$.

---

<a id="ejercicio-10"></a>
## Ejercicio 10 — Código compacto con probabilidades potencias de 1/2

> Siete mensajes con probabilidades $\tfrac12,\tfrac14,\tfrac18,\tfrac1{16},\tfrac1{32},\tfrac1{64},\tfrac1{64}$. Encuentre la entropía, un código compacto binario, la longitud media y la eficiencia.

### 1. Comprensión del problema

- **Datos:** 7 mensajes. Suma: $\tfrac12+\tfrac14+\tfrac18+\tfrac1{16}+\tfrac1{32}+\tfrac2{64}=\tfrac{32+16+8+4+2+1+1}{64}=\tfrac{64}{64}=1$ ✔.
- Observación clave: todas son potencias de $1/2$ (caso **diádico**).
- (El enunciado solo tiene el apartado a).)

### 2. Fundamentos teóricos

- Entropía, Huffman, $L$, $\eta$ (ver fundamentos de codificación).
- Caso diádico: si $p_i=2^{-l_i}$, entonces $I(x_i)=\log_2(1/p_i)=l_i$ es entero. Un código con $l_i=I(x_i)$ cumple Kraft con igualdad ($\sum2^{-l_i}=\sum p_i=1$) y su longitud media es

$$L=\sum p_il_i=\sum p_i\log_2\frac1{p_i}=H\ \Rightarrow\ \eta=1.$$

### 3. Resolución paso a paso

**Paso 1 — Entropía.** Información propia de cada mensaje: $\log_2(1/p)=1,2,3,4,5,6,6$.

$$H=\tfrac12(1)+\tfrac14(2)+\tfrac18(3)+\tfrac1{16}(4)+\tfrac1{32}(5)+\tfrac1{64}(6)+\tfrac1{64}(6)$$

$$=0.5+0.5+0.375+0.25+0.15625+0.09375+0.09375=1.96875\ \text{bit}=\tfrac{63}{32}.$$

**Paso 2 — Huffman.** Unimos siempre los dos menores:

| Etapa | Se unen | Nuevo nodo |
|---|---|---|
| 1 | $\tfrac1{64}+\tfrac1{64}$ | $\tfrac1{32}$ |
| 2 | $\tfrac1{32}+\tfrac1{32}$ | $\tfrac1{16}$ |
| 3 | $\tfrac1{16}+\tfrac1{16}$ | $\tfrac18$ |
| 4 | $\tfrac18+\tfrac18$ | $\tfrac14$ |
| 5 | $\tfrac14+\tfrac14$ | $\tfrac12$ |
| 6 | $\tfrac12+\tfrac12$ | $1$ |

El árbol tiene forma de "peine": el mensaje más probable cuelga cerca de la raíz y los menos probables quedan en lo más profundo.

**Paso 3 — Palabras** (rama 0 para el nodo más probable en cada unión):

| Mensaje | $p$ | Palabra | $l$ |
|---|---|---|---|
| $m_1$ | 1/2 | `0` | 1 |
| $m_2$ | 1/4 | `10` | 2 |
| $m_3$ | 1/8 | `110` | 3 |
| $m_4$ | 1/16 | `1110` | 4 |
| $m_5$ | 1/32 | `11110` | 5 |
| $m_6$ | 1/64 | `111110` | 6 |
| $m_7$ | 1/64 | `111111` | 6 |

Cada $l_i$ coincide con $\log_2(1/p_i)$, como predice la teoría.

**Paso 4 — Longitud media.**

$$L=\tfrac12(1)+\tfrac14(2)+\tfrac18(3)+\tfrac1{16}(4)+\tfrac1{32}(5)+\tfrac1{64}(6)+\tfrac1{64}(6)=1.96875\ \text{bit/mensaje}.$$

**Paso 5 — Eficiencia.** $\eta=\dfrac{H}{L}=\dfrac{1.96875}{1.96875}=1$.

### 4. Resultado e interpretación

$$\boxed{H=L=1.96875\ \text{bit/mensaje},\quad\eta=100\ \%}$$

El código es perfecto: no hay redundancia. Un código de longitud fija usaría $\lceil\log_27\rceil=3$ bit (eficiencia $65.6\ \%$).

### 5. Aprendizaje

- **Método:** si todas las $p_i$ son potencias de 1/2, basta poner $l_i=\log_2(1/p_i)$ y la eficiencia es 1.
- **Errores típicos:** buscar errores de redondeo donde no los hay; olvidar que las dos últimas probabilidades iguales comparten longitud.

---

<a id="ejercicio-11"></a>
## Ejercicio 11 — Código compacto con probabilidades potencias de 1/3

> Siete mensajes con probabilidades $\tfrac13,\tfrac13,\tfrac19,\tfrac19,\tfrac1{27},\tfrac1{27},\tfrac1{27}$. Entropía, código compacto binario, longitud media y eficiencia.

### 1. Comprensión del problema

- **Datos:** suma $\tfrac23+\tfrac29+\tfrac3{27}=\tfrac{18+6+3}{27}=1$ ✔.
- Aquí las probabilidades son potencias de $1/3$ pero el código es **binario**: las longitudes ideales $\log_2(1/p)$ no son enteras y esperamos $\eta<1$.

### 2. Fundamentos teóricos

Entropía, Huffman, $L$, $\eta$ (ver fundamentos). Para simplificar las cuentas trabajamos con pesos enteros: multiplicamos las probabilidades por 27, obteniendo $9,9,3,3,1,1,1$.

### 3. Resolución paso a paso

**Paso 1 — Entropía.** Con $\log_23=1.5850$: $\log_2(1/p)$ vale $\log_23$ para $p=\tfrac13$, $\log_29=2\log_23=3.1699$ para $p=\tfrac19$ y $\log_227=3\log_23=4.7549$ para $p=\tfrac1{27}$.

$$H=2\cdot\tfrac13(1.5850)+2\cdot\tfrac19(3.1699)+3\cdot\tfrac1{27}(4.7549)=1.0566+0.7044+0.5283=2.2894\ \text{bit}.$$

(Forma cerrada: $H=\log_23\left(\tfrac23+\tfrac49+\tfrac39\right)=\tfrac{13}{9}\log_23=2.2894$.)

**Paso 2 — Árbol de Huffman** (pesos sobre 27; llamamos $A,B$ a los de peso 9; $C,D$ a los de peso 3; $E,F,G$ a los de peso 1):

| Etapa | Se unen | Nuevo nodo | Lista resultante |
|---|---|---|---|
| 1 | $E+F\ (1+1)$ | $N_1=2$ | $9,9,3,3,2,1_G$ |
| 2 | $N_1+G\ (2+1)$ | $N_2=3$ | $9,9,3_C,3_D,3_{N_2}$ |
| 3 | $C+D\ (3+3)$ | $N_3=6$ | $9,9,6,3_{N_2}$ |
| 4 | $N_2+N_3\ (3+6)$ | $N_4=9$ | $9_A,9_B,9_{N_4}$ |
| 5 | $A+B\ (9+9)$ | $N_5=18$ | $18,\,9_{N_4}$ |
| 6 | $N_5+N_4$ | raíz $=27$ | — |

En la etapa 3 había un empate entre tres nodos de peso 3; y en la etapa 5, entre tres de peso 9. Elegimos unir $A+B$ (en lugar de $N_4$ con uno de ellos) porque da longitudes más homogéneas; cualquier otra elección da la misma $L$.

**Paso 3 — Palabras.** Raíz: $N_5\to0$, $N_4\to1$. En $N_5$: $A\to00$, $B\to01$. En $N_4$: $N_3\to10$, $N_2\to11$. En $N_3$: $C\to100$, $D\to101$. En $N_2$: $G\to110$, $N_1\to111$. En $N_1$: $E\to1110$, $F\to1111$.

| Mensaje | $p$ | Palabra | $l$ |
|---|---|---|---|
| $A$ | 1/3 | `00` | 2 |
| $B$ | 1/3 | `01` | 2 |
| $C$ | 1/9 | `100` | 3 |
| $D$ | 1/9 | `101` | 3 |
| $G$ | 1/27 | `110` | 3 |
| $E$ | 1/27 | `1110` | 4 |
| $F$ | 1/27 | `1111` | 4 |

Kraft: $2\cdot2^{-2}+3\cdot2^{-3}+2\cdot2^{-4}=\tfrac12+\tfrac38+\tfrac18=1$ ✔ (código completo).

**Paso 4 — Longitud media.**

$$L=2\cdot\tfrac13(2)+2\cdot\tfrac19(3)+\tfrac1{27}(3)+2\cdot\tfrac1{27}(4)=\tfrac43+\tfrac23+\tfrac3{27}+\tfrac8{27}=2+\tfrac{11}{27}=\tfrac{65}{27}=2.4074.$$

**Paso 5 — Eficiencia.**

$$\eta=\frac{H}{L}=\frac{2.2894}{2.4074}=0.9510.$$

(Forma exacta: $\eta=\dfrac{13\log_23/9}{65/27}=\dfrac{3}{5}\log_23=0.9510$.)

### 4. Resultado e interpretación

$$\boxed{H=2.2894,\quad L=\tfrac{65}{27}=2.4074\ \text{bit/mensaje},\quad\eta\approx95.1\ \%}$$

- $H\le L<H+1$: $2.2894\le2.4074<3.2894$ ✔.
- No se alcanza el 100 % porque las longitudes ideales ($1.585,\ 3.170,\ 4.755$) no son enteras: el código binario debe redondearlas (sería diádico solo con un código *ternario*, que usaría longitudes $1,2,3$ símbolos ternarios).
- Longitud fija: $\lceil\log_27\rceil=3$ bit ($\eta=76.3\ \%$).

### 5. Aprendizaje

- **Método:** pesos enteros para evitar fracciones → Huffman → $L$ → $\eta$.
- **Reconocimiento:** probabilidades que no son potencias de 1/2 ⇒ $\eta<1$ con códigos binarios símbolo a símbolo.
- **Errores típicos:** suponer $\eta=1$ por haber probabilidades "regulares"; unir mal en los empates (la $L$ final no cambia, pero sí las palabras).

---

<a id="ejercicio-12"></a>
## Ejercicio 12 — Tres mensajes equiprobables y extensión de segundo orden

> Fuente de tres mensajes equiprobables e independientes. (a) Entropía. (b) Código compacto binario, longitud media, eficiencia. (c) Repetir para la extensión de segundo orden.

### 1. Comprensión del problema

- **Datos:** $p_i=\tfrac13$, $i=1,2,3$; independencia entre mensajes.
- Queremos ver que, con $M=3$ (no potencia de 2), un código símbolo a símbolo pierde eficiencia, y que **codificar pares** de símbolos la mejora.

### 2. Fundamentos teóricos

Entropía, Huffman, $L$, $\eta$ y **extensión de orden $n$** (ver fundamentos). Para la extensión de orden 2, el alfabeto son los $3^2=9$ pares $x_ix_j$, con $P(x_ix_j)=\tfrac13\cdot\tfrac13=\tfrac19$ por independencia.

### 3. Resolución paso a paso

#### Apartado (a)

$$H(X)=\log_23=1.5850\ \text{bit/mensaje}\quad(\text{equiprobables: }H=\log_2M).$$

#### Apartado (b)

**Huffman:** unimos los dos menores ($\tfrac13+\tfrac13=\tfrac23$) y luego $\tfrac23+\tfrac13=1$.

| Mensaje | Palabra | $l$ |
|---|---|---|
| $m_1$ | `0` | 1 |
| $m_2$ | `10` | 2 |
| $m_3$ | `11` | 2 |

$$L=\tfrac13(1)+\tfrac13(2)+\tfrac13(2)=\tfrac53=1.6667\ \text{bit/mensaje},\qquad\eta=\frac{1.5850}{1.6667}=0.9510.$$

#### Apartado (c)

**Paso 1 — Extensión.** Los 9 pares tienen probabilidad $\tfrac19$ cada uno. Entropía de la extensión (propiedad aditiva por independencia):

$$H(X^2)=2H(X)=2\log_23=\log_29=3.1699\ \text{bit/par}.$$

**Paso 2 — Huffman** (en unidades de $\tfrac19$, pesos $1\times9$):

| Etapa | Se unen | Resultado |
|---|---|---|
| 1 | $1+1$ | $2_a$ (quedan $1\times7,\ 2$) |
| 2 | $1+1$ | $2_b$ ($1\times5,\ 2,2$) |
| 3 | $1+1$ | $2_c$ ($1\times3,\ 2,2,2$) |
| 4 | $1+1$ | $2_d$ ($1,\ 2,2,2,2$) |
| 5 | $1+2_a$ | $3$ ($2_b,2_c,2_d,\ 3$) |
| 6 | $2_b+2_c$ | $4$ ($2_d,\ 3,\ 4$) |
| 7 | $2_d+3$ | $5$ ($4,\ 5$) |
| 8 | $4+5$ | raíz $=9$ |

**Paso 3 — Longitudes.** Trazando el árbol: del nodo $4$ cuelgan $2_b$ y $2_c$ (profundidad 2), cuyas 4 hojas quedan a profundidad 3. Del nodo $5$ cuelgan $2_d$ (profundidad 2; 2 hojas a profundidad 3) y el nodo $3$ (profundidad 2), que contiene 1 hoja (profundidad 3) y $2_a$ (profundidad 3, con 2 hojas a profundidad 4). Resultado: **7 palabras de 3 bits y 2 palabras de 4 bits**. Ejemplo de código válido:

| Pares | Palabras |
|---|---|
| 7 de ellos | `000`, `001`, `010`, `011`, `100`, `101`, `110` |
| 2 restantes | `1110`, `1111` |

Kraft: $7\cdot2^{-3}+2\cdot2^{-4}=\tfrac78+\tfrac18=1$ ✔.

**Paso 4 — Longitud media por par y por mensaje.**

$$L_2=\tfrac19(7\cdot3+2\cdot4)=\tfrac{29}{9}=3.2222\ \text{bit/par}\ \Rightarrow\ \frac{L_2}{2}=\tfrac{29}{18}=1.6111\ \text{bit/mensaje}.$$

**Paso 5 — Eficiencia.**

$$\eta_2=\frac{H(X^2)}{L_2}=\frac{3.1699}{3.2222}=0.9838\quad\left(=\frac{H(X)}{L_2/2}=\frac{1.5850}{1.6111}\right).$$

### 4. Resultado e interpretación

| Código | $L$ (bit/mensaje) | $\eta$ |
|---|---|---|
| Símbolo a símbolo | 1.6667 | 95.1 % |
| Extensión de orden 2 | 1.6111 | **98.4 %** |

- Agrupar pares reduce la longitud media por mensaje de $1.667$ a $1.611$ bit, acercándose a $H=1.585$: mejora de eficiencia de 95.1 % a 98.4 %.
- Esto ilustra la cota $H\le L_n/n<H+1/n$: al crecer $n$, $L_n/n\to H$ (a costa de más complejidad y retardo).

### 5. Aprendizaje

- **Método:** si la eficiencia de un código por símbolo es baja, codificar bloques (extensión) y comparar **por símbolo original** ($L_n/n$).
- **Errores típicos:** comparar $L_2$ (por par) con $L$ (por mensaje) sin dividir entre 2; olvidar que $H(X^2)=2H(X)$ solo vale con independencia.

---

<a id="ejercicio-13"></a>
## Ejercicio 13 — Alfabeto de 100 caracteres

> Alfabeto de 100 caracteres. (a) Bits necesarios con código de longitud fija. (b) Suponiendo 10 caracteres equiprobables con $p=0.05$ cada uno y los otros 90 equiprobables entre sí, bits necesarios con un código Huffman de longitud variable.

### 1. Comprensión del problema

- **Apartado (a):** número de bits $n$ por carácter con longitud fija.
- **Apartado (b):** los 10 caracteres frecuentes suman $10\cdot0.05=0.5$ de probabilidad; los 90 restantes se reparten el $0.5$ restante: $p=\dfrac{0.5}{90}=\dfrac1{180}=0.00556$ cada uno. Como la longitud variable no es la misma para todos, "número de bits necesarios" se interpreta como la **longitud media** $L$ en bit/carácter.

### 2. Fundamentos teóricos

- **Código de longitud fija:** con $n$ bits hay $2^n$ palabras; para $M$ símbolos distintos se necesita $2^n\ge M$, es decir, $n=\lceil\log_2M\rceil$ (la función techo redondea hacia arriba).
- Huffman, $L$, $H$, Kraft: ver fundamentos de codificación.

### 3. Resolución paso a paso

#### Apartado (a)

$\log_2100=6.644$. Como $2^6=64<100\le128=2^7$, hacen falta $n=7$ bits por carácter.

#### Apartado (b)

**Paso 1 — Pesos enteros.** En unidades de $\tfrac1{180}$: los 10 frecuentes pesan $0.05\cdot180=9$ y los 90 raros pesan $1$.

**Paso 2 — Huffman por "rondas"** (se unen siempre los dos menores; como hay muchos nodos iguales se agrupan):

| Paso | Operación | Lista resultante |
|---|---|---|
| 1 | $90$ nodos de peso 1 → 45 pares | $45\times2,\ 10\times9$ |
| 2 | 45 nodos de peso 2 → 22 pares, sobra uno | $1\times2,\ 22\times4,\ 10\times9$ |
| 3 | $2+4$ | $21\times4,\ 1\times6,\ 10\times9$ |
| 4 | 21 nodos de peso 4 → 10 pares, sobra uno | $1\times4,\ 1\times6,\ 10\times8,\ 10\times9$ |
| 5 | $4+6$ | $1\times10,\ 10\times8,\ 10\times9$ |
| 6 | 10 nodos de peso 8 → 5 pares | $1\times10,\ 5\times16,\ 10\times9$ |
| 7 | 10 nodos de peso 9 → 5 pares | $1\times10,\ 5\times16,\ 5\times18$ |
| 8 | $10+16$ | $4\times16,\ 5\times18,\ 1\times26$ |
| 9 | $16+16$ (dos veces) | $2\times32,\ 5\times18,\ 1\times26$ |
| 10 | $18+18$ (dos veces), sobra un 18 | $2\times32,\ 2\times36,\ 1\times18,\ 1\times26$ |
| 11 | $18+26$ | $2\times32,\ 2\times36,\ 1\times44$ |
| 12 | $32+32$ y $36+36$ | $44,\ 64,\ 72$ |
| 13 | $44+64$ | $72,\ 108$ |
| 14 | $72+108$ | raíz $=180$ ✔ |

**Paso 3 — Longitudes resultantes.** Trazando el árbol (comprobado por ordenador):

- los **10 caracteres frecuentes** ($p=0.05$) quedan a profundidad **4**;
- de los 90 raros, **6** quedan a profundidad **7** y **84** a profundidad **8**.

*Comprobación por Kraft:* $10\cdot2^{-4}+6\cdot2^{-7}+84\cdot2^{-8}=0.625+0.046875+0.328125=1$ ✔ (código completo).

*Razonamiento complementario:* los raros tienen $\log_2180=7.49$, por lo que sus longitudes están entre 7 y 8. Si $n_7$ y $n_8$ son cuántos usan 7 y 8 bits, imponiendo $n_7+n_8=90$ y que Kraft sume exactamente 1 con los 10 de longitud 4: $\tfrac{n_7}{128}+\tfrac{n_8}{256}=1-\tfrac{10}{16}=\tfrac38\Rightarrow2n_7+n_8=96$; restando la primera ecuación, $n_7=6$ y $n_8=84$ ✔.

**Paso 4 — Longitud media.**

$$L=10\cdot0.05\cdot4+6\cdot\tfrac1{180}\cdot7+84\cdot\tfrac1{180}\cdot8=2+\tfrac{42+672}{180}=2+\tfrac{714}{180}=2+3.9667=5.9667\ \text{bit/carácter}.$$

**Paso 5 — Comparación con la entropía.**

$$H=10\cdot0.05\log_2\tfrac1{0.05}+90\cdot\tfrac1{180}\log_2180=0.5(4.3219)+0.5(7.4919)=2.1610+3.7459=5.9069\ \text{bit/carácter}.$$

Eficiencia: $\eta=5.9069/5.9667=0.9900$.

### 4. Resultado e interpretación

$$\boxed{\text{(a) }7\text{ bits;}\qquad\text{(b) }L=5.9667\approx5.97\text{ bit/carácter con Huffman (}H=5.9069\text{, }\eta\approx99\ \%)}$$

- El código de longitud variable ahorra $7-5.9667=1.033$ bit por carácter, un **14.8 %**, porque da palabras cortas (4 bits) a los frecuentes y más largas (7-8 bits) a los raros.
- Coherencia: $H=5.907\le L=5.967<H+1$ ✔, y $L<7$ ✔.

### 5. Aprendizaje

- **Método:** longitud fija: $\lceil\log_2M\rceil$. Huffman con muchos símbolos iguales: usar pesos enteros y agrupar las uniones por rondas; verificar con Kraft y la longitud media.
- **Errores típicos:** dar a los 90 raros la probabilidad $0.05$ (hay que repartir $0.5$ entre 90); redondear todas las longitudes a un único valor; olvidar que "bits necesarios" en longitud variable es una **media**.

---

## Resumen de resultados

| Ej. | Resultado principal |
|---|---|
| 1 | (a) $H=1.8464$ bit/msg; (b) $R=1.8464\ \text{Mbit/s}$; (c) equiprobable: $H=2$ bit/msg, $R=2$ Mbit/s |
| 2 | $R=2.56\times10^8$ bit/s (256 Mbit/s) |
| 3 | $P(p)=2/3$, $P(r)=1/3$; $H=0.9183$ bit; $\bar T=0.5333$ s; $R=1.7218$ bit/s |
| 4 | $H(X)=H(Y)=0.9183$; $H(X,Y)=\log_23=1.585$; $H(X\mid Y)=H(Y\mid X)=2/3$ bit |
| 5 | (a) $H=2.5282$ bit; (b) $H(q(X))=1.4060$ bit |
| 6 | $P=(0.1587,\,0.3413,\,0.3413,\,0.1587)$; $H=1.9014$ bit/muestra |
| 7 | $x_1=\ln(4/3)/a$, $x_2=\ln2/a$, $x_3=\ln4/a$ ($H_{\max}=2$ bit) |
| 8 | (a) $H=2.0896$ bit/muestra, $R=1044.8$ bit/s; (b) umbrales $0,\pm0.4307\sigma,\pm0.9674\sigma$ |
| 9 | $L=2.20$, $H=2.1497$, $\eta=97.7\ \%$ |
| 10 | $H=L=1.96875$, $\eta=100\ \%$ |
| 11 | $H=2.2894$, $L=65/27=2.4074$, $\eta=95.1\ \%$ |
| 12 | (a) $H=1.585$; (b) $L=5/3$, $\eta=95.1\ \%$; (c) $L_2/2=29/18=1.6111$, $\eta=98.4\ \%$ |
| 13 | (a) 7 bits; (b) $L=5.9667$ bit/carácter (Huffman), $H=5.9069$, $\eta\approx99\ \%$ |
