# Transformada Z

La **Transformada Z** es una de las herramientas matemáticas centrales de Señales Digitales. Si la transformada de Fourier nos permite estudiar una señal o sistema en términos de frecuencia, la Transformada Z nos proporciona una herramienta mucho más general para trabajar con **señales discretas, sistemas LTI, ecuaciones en diferencias, estabilidad, causalidad, polos y ceros**.

Para 2.º de Teleco, no conviene verla simplemente como una tabla de transformadas. Lo importante es entender:

$$
\boxed{
x[n]
\quad\longleftrightarrow\quad
X(z)
}
$$

y comprender qué información contiene $X(z)$, qué papel juega la **región de convergencia (ROC)**, por qué una misma expresión algebraica puede corresponder a señales diferentes, cómo se calculan transformadas inversas y por qué la transformada Z unilateral es especialmente útil para sistemas con **condiciones iniciales**.

---

# 1. ¿Por qué necesitamos la Transformada Z?

Hasta ahora has trabajado con señales discretas:

$$
x[n]
$$

Por ejemplo:

$$
x[n]=a^n
$$

o:

$$
x[n]=\cos(\omega_0 n)
$$

y seguramente has visto la **Transformada de Fourier de tiempo discreto (DTFT)**:

$$
X(e^{j\omega})=
\sum_{n=-\infty}^{\infty}
x[n]e^{-j\omega n}
$$

Esta transformación nos permite estudiar el contenido frecuencial de $x[n]$.

Pero tiene una limitación importante.

No todas las señales tienen transformada de Fourier.

Por ejemplo, considera:

$$
x[n]=a^n u[n]
$$

Si:

$$
a>1
$$

la señal crece exponencialmente y la suma de Fourier no converge.

Sin embargo, la Transformada Z puede existir.

Por eso podemos pensar que:

> **La Transformada Z es una generalización de la DTFT que permite introducir una variable compleja $z$ y analizar señales que no necesariamente tienen transformada de Fourier.**

---

# 2. Definición de la Transformada Z bilateral

La definición fundamental es:

$$
\boxed{
X(z)=
\sum_{n=-\infty}^{\infty}
x[n]z^{-n}
}
$$

donde:

$$
z\in\mathbb{C}
$$

es una variable compleja.

Esta es la **Transformada Z bilateral** o **Transformada Z de dos lados**.

---

# 3. ¿Qué es exactamente $z$?

El número complejo $z$ puede escribirse en forma polar como:

$$
\boxed{
z=re^{j\omega}
}
$$

donde:

* $r=|z|$ es el módulo;
* $\omega=\arg(z)$ es el ángulo.

Entonces:

$$
z^{-n}=
(re^{j\omega})^{-n}
$$

$$
=r^{-n}e^{-j\omega n}
$$

Por tanto:

$$
\boxed{
X(z)=
\sum_{n=-\infty}^{\infty}
x[n]r^{-n}e^{-j\omega n}
}
$$

Esta ecuación es importantísima.

La Transformada Z incorpora dos cosas:

* $e^{-j\omega n}$ → análisis frecuencial;
* $r^{-n}$ → control del crecimiento/decaimiento de la señal.

Por eso la Transformada Z es más general que la DTFT.

---

# 4. Relación entre Transformada Z y DTFT

La DTFT es un caso particular de la Transformada Z.

Recordemos:

$$
X(z)=
\sum_{n=-\infty}^{\infty}
x[n]z^{-n}
$$

Si escogemos:

$$
z=e^{j\omega}
$$

entonces:

$$
X(e^{j\omega})=

\sum_{n=-\infty}^{\infty}
x[n]e^{-j\omega n}
$$

que es precisamente la DTFT.

Por tanto:

$$
\boxed{
\text{DTFT}=

\text{Transformada Z evaluada en }z=e^{j\omega}
}
$$

Pero hay una condición fundamental:

> **El círculo unidad debe pertenecer a la región de convergencia de $X(z)$.**

Volveremos a esto porque es una de las ideas más importantes de todo el tema.

---

# 5. El plano Z

Como $z$ es complejo:

$$
z=re^{j\omega}
$$

podemos representar todos los valores de $z$ en un plano complejo.

Tenemos:

```text
                         Im{z}
                           ↑
                           │
                     •     │     •
                           │
                •          │          •
                           │
              ─────────────┼──────────────→ Re{z}
                           │
                •          │          •
                           │
                     •     │     •
                           │
```

El eje horizontal es:

$$
\operatorname{Re}\{z\}
$$

y el vertical:

$$
\operatorname{Im}\{z\}
$$

El módulo es:

$$
|z|=r
$$

y el ángulo:

$$
\angle z=\omega
$$

---

# 6. El círculo unidad

Un objeto especialmente importante es el círculo:

$$
|z|=1
$$

Como:

$$
z=re^{j\omega}
$$

si:

$$
r=1
$$

entonces:

$$
z=e^{j\omega}
$$

Por tanto, el círculo unidad es:

```text
                    Im{z}
                      ↑
                  *****
               ***     ***
             **           **
            *       ○       *
             **           **
               ***     ***
                  *****
                      │
──────────────────────┼────────────→ Re{z}
```

Sobre él se encuentra toda la DTFT:

$$
\boxed{
z=e^{j\omega}
}
$$

Por eso:

$$
\boxed{
X(e^{j\omega})=

X(z)\big|_{z=e^{j\omega}}
}
$$

siempre que el círculo unidad esté dentro de la ROC.

---

# 7. ¿Qué es la Región de Convergencia?

Esta es probablemente **la parte más importante de la Transformada Z**.

La expresión:

$$
X(z)=
\sum_{n=-\infty}^{\infty}
x[n]z^{-n}
$$

es una suma infinita.

No necesariamente converge para todos los valores de $z$.

La **región de convergencia**, o **ROC (Region Of Convergence)**, es el conjunto de valores de $z$ para los que la suma converge.

Formalmente:

$$
\boxed{
ROC=
\left\{
z\in\mathbb C:
\sum_{n=-\infty}^{\infty}x[n]z^{-n}
\text{ converge}
\right\}
}
$$

---

# 8. ¿Por qué la ROC es tan importante?

Porque la expresión algebraica de $X(z)$ **por sí sola no siempre determina completamente la señal**.

Esto es fundamental.

Consideremos:

$$
X(z)=\frac{1}{1-az^{-1}}
$$

Podríamos pensar que esto corresponde automáticamente a:

$$
x[n]=a^nu[n]
$$

Pero no necesariamente.

La misma expresión algebraica puede corresponder a:

$$
x[n]=a^nu[n]
$$

o a:

$$
x[n]=-a^nu[-n-1]
$$

dependiendo de la ROC.

Por tanto:

$$
\boxed{
X(z)+ROC
}
$$

es lo que determina completamente la señal.

---

# 9. Ejemplo fundamental: $a^nu[n]$

Consideremos:

$$
x[n]=a^nu[n]
$$

Por definición:

$$
X(z)=
\sum_{n=-\infty}^{\infty}
a^nu[n]z^{-n}
$$

Como:

$$
u[n]=0
\qquad n<0
$$

queda:

$$
X(z)=
\sum_{n=0}^{\infty}
a^nz^{-n}
$$

Agrupamos:

$$
X(z)=
\sum_{n=0}^{\infty}
(az^{-1})^n
$$

Esto es una serie geométrica:

$$
\sum_{n=0}^{\infty}r^n =
\frac{1}{1-r}
$$

si:

$$
|r|<1
$$

Por tanto:

$$
|az^{-1}|<1
$$

$$
\frac{|a|}{|z|}<1
$$

y entonces:

$$
|z|>|a|
$$

Así:

$$
\boxed{
Z\{a^nu[n]\} =
\frac{1}{1-az^{-1}},
\qquad
ROC:\ |z|>|a|
}
$$

---

# 10. ¿Qué pasa con $a^nu[-n-1]$?

Consideremos ahora:

$$
x[n]=-a^nu[-n-1]
$$

Entonces:

$$
X(z)=
-\sum_{n=-\infty}^{-1}a^nz^{-n}
$$

Hacemos el cambio:

$$
m=-n
$$

Entonces:

$$
n=-m
$$

y como:

$$
n=-1,-2,-3,\ldots
$$

tenemos:

$$
m=1,2,3,\ldots
$$

Por tanto:

$$
X(z)=
-\sum_{m=1}^{\infty}
a^{-m}z^m
$$

$$
=
-\sum_{m=1}^{\infty}
\left(\frac{z}{a}\right)^m
$$

La serie converge cuando:

$$
\left|\frac{z}{a}\right|<1
$$

es decir:

$$
|z|<|a|
$$

Y el resultado algebraico vuelve a ser:

$$
\boxed{
X(z)=
\frac{1}{1-az^{-1}}
}
$$

pero ahora:

$$
\boxed{
ROC:\ |z|<|a|
}
$$

¡La misma expresión algebraica, pero diferente señal!

---

# 11. Esta es una idea que debes dominar

Tenemos:

$$
\boxed{
\frac{1}{1-az^{-1}}
}
$$

pero puede significar:

### ROC exterior

$$
|z|>|a|
$$

y entonces:

$$
\boxed{
x[n]=a^nu[n]
}
$$

### ROC interior

$$
|z|<|a|
$$

y entonces:

$$
\boxed{
x[n]=-a^nu[-n-1]
}
$$

Por tanto:

$$
\boxed{
\text{expresión algebraica}\neq\text{señal completa}
}
$$

Necesitamos la ROC.

---

# 12. Transformada Z de la señal impulso

Comencemos con una de las transformadas más importantes:

$$
x[n]=\delta[n]
$$

Tenemos:

$$
X(z)=
\sum_{n=-\infty}^{\infty}
\delta[n]z^{-n}
$$

Solo sobrevive $n=0$:

$$
X(z)=1
$$

Por tanto:

$$
\boxed{
\delta[n]
\leftrightarrow
1
}
$$

La ROC es todo el plano Z:

$$
\boxed{
ROC:\ \text{todo el plano Z}
}
$$

---

# 13. Transformada Z del escalón

Consideramos:

$$
x[n]=u[n]
$$

Entonces:

$$
X(z)=
\sum_{n=0}^{\infty}z^{-n}
$$

Serie geométrica:

$$
X(z)=
\frac{1}{1-z^{-1}}
$$

con condición:

$$
|z^{-1}|<1
$$

por tanto:

$$
|z|>1
$$

Resultado:

$$
\boxed{
u[n]
\leftrightarrow
\frac{1}{1-z^{-1}},
\qquad
ROC:\ |z|>1
}
$$

---

# 14. Transformada Z de un escalón desplazado

Supongamos:

$$
x[n]=u[n-n_0]
$$

La señal comienza en:

$$
n=n_0
$$

Entonces:

$$
X(z)=
\sum_{n=n_0}^{\infty}z^{-n}
$$

Sacamos:

$$
z^{-n_0}
$$

y hacemos $m=n-n_0$:

$$
X(z)=
z^{-n_0}
\sum_{m=0}^{\infty}z^{-m}
$$

por tanto:

$$
\boxed{
X(z)=
\frac{z^{-n_0}}{1-z^{-1}}
}
$$

con:

$$
|z|>1
$$

---

# 15. Transformada Z de una exponencial

Ya hemos obtenido:

$$
\boxed{
a^nu[n]
\leftrightarrow
\frac{1}{1-az^{-1}}
}
$$

con:

$$
\boxed{
ROC:\ |z|>|a|
}
$$

Esta es probablemente una de las transformadas más importantes de toda la asignatura.

---

# 16. Exponencial compleja

Consideremos:

$$
x[n]=a^n e^{j\omega_0n}u[n]
$$

Podemos combinar:

$$
a^ne^{j\omega_0n}=
(ae^{j\omega_0})^n
$$

Definimos:

$$
p=ae^{j\omega_0}
$$

Entonces:

$$
x[n]=p^nu[n]
$$

y:

$$
\boxed{
X(z)=
\frac{1}{1-pz^{-1}}
}
$$

es decir:

$$
\boxed{
X(z)=
\frac{1}
{1-ae^{j\omega_0}z^{-1}}
}
$$

con:

$$
\boxed{
|z|>a
}
$$

si $a\geq0$.

---

# 17. Coseno causal

Tenemos:

$$
x[n]=\cos(\omega_0n)u[n]
$$

Utilizamos Euler:

$$
\cos(\omega_0n)=
\frac12
\left(
e^{j\omega_0n}
+
e^{-j\omega_0n}
\right)
$$

Por tanto:

$$
x[n]
=
\frac12
e^{j\omega_0n}u[n]
+
\frac12
e^{-j\omega_0n}u[n]
$$

Aplicamos linealidad:

$$
X(z)=
\frac12
\frac{1}{1-e^{j\omega_0}z^{-1}}
+
\frac12
\frac{1}{1-e^{-j\omega_0}z^{-1}}
$$

Simplificando:

$$
\boxed{
X(z)=
\frac{1-\cos(\omega_0)z^{-1}}
{1-2\cos(\omega_0)z^{-1}+z^{-2}}
}
$$

con:

$$
\boxed{
ROC:\ |z|>1
}
$$

---

# 18. Seno causal

Para:

$$
x[n]=\sin(\omega_0n)u[n]
$$

utilizamos:

$$
\sin(\omega_0n)=
\frac{
e^{j\omega_0n}-

e^{-j\omega_0n}
}{2j}
$$

Obtenemos:

$$
\boxed{
X(z)=
\frac{
\sin(\omega_0)z^{-1}
}{
1-2\cos(\omega_0)z^{-1}+z^{-2}
}
}
$$

con:

$$
\boxed{
ROC:\ |z|>1
}
$$

---

# 19. Tabla de transformadas Z importantes

Te conviene tener una tabla mental como esta:

| $x[n]$                | $X(z)$                                                      | ROC                                                                    |   |     |   |   |
| --------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- | - | --- | - | - |
| $\delta[n]$           | $1$                                                         | Todo $z$                                                               |   |     |   |   |
| $\delta[n-n_0]$       | $z^{-n_0}$                                                  | Todo $z$, salvo posibles cuestiones en $0/\infty$ según representación |   |     |   |   |
| $u[n]$                | $\frac{1}{1-z^{-1}}$                                        | $                                                                      | z | >1$ |   |   |
| $a^nu[n]$             | $\frac{1}{1-az^{-1}}$                                       | $                                                                      | z | >   | a | $ |
| $-a^nu[-n-1]$         | $\frac{1}{1-az^{-1}}$                                       | $                                                                      | z | <   | a | $ |
| $n a^nu[n]$           | $\frac{az^{-1}}{(1-az^{-1})^2}$                             | $                                                                      | z | >   | a | $ |
| $\cos(\omega_0n)u[n]$ | $\frac{1-\cos\omega_0z^{-1}}{1-2\cos\omega_0z^{-1}+z^{-2}}$ | $                                                                      | z | >1$ |   |   |
| $\sin(\omega_0n)u[n]$ | $\frac{\sin\omega_0z^{-1}}{1-2\cos\omega_0z^{-1}+z^{-2}}$   | $                                                                      | z | >1$ |   |   |

---

# 20. Propiedad de linealidad

Si:

$$
x_1[n]
\leftrightarrow
X_1(z)
$$

y:

$$
x_2[n]
\leftrightarrow
X_2(z)
$$

entonces:

$$
a x_1[n]+b x_2[n]
$$

tiene transformada:

$$
\boxed{
aX_1(z)+bX_2(z)
}
$$

Por tanto:

$$
\boxed{
Z\{ax_1[n]+bx_2[n]\}=
aX_1(z)+bX_2(z)
}
$$

---

# 21. Propiedad de desplazamiento temporal

Esta es importantísima.

Si:

$$
x[n]
\leftrightarrow
X(z)
$$

entonces:

$$
x[n-n_0]
$$

tiene transformada:

$$
\boxed{
z^{-n_0}X(z)
}
$$

Por ejemplo:

$$
x[n-2]
\leftrightarrow
z^{-2}X(z)
$$

---

# 22. ¿Por qué?

Partimos de:

$$
y[n]=x[n-n_0]
$$

Entonces:

$$
Y(z)=
\sum_nx[n-n_0]z^{-n}
$$

hacemos:

$$
m=n-n_0
$$

por tanto:

$$
n=m+n_0
$$

y:

$$
Y(z)
=
\sum_m
x[m]z^{-(m+n_0)}
$$

$$
=
z^{-n_0}
\sum_mx[m]z^{-m}
$$

Por tanto:

$$
\boxed{
Y(z)=z^{-n_0}X(z)
}
$$

---

# 23. Propiedad de convolución

Esta es fundamental para sistemas LTI.

Si:

$$
y[n]=x[n]*h[n]
$$

entonces:

$$
\boxed{
Y(z)=X(z)H(z)
}
$$

Es decir:

$$
\boxed{
\text{convolución en tiempo}
\longleftrightarrow
\text{multiplicación en Z}
}
$$

Esta propiedad es una de las razones por las que la Transformada Z es tan útil para estudiar sistemas.

---

# 24. Sistemas LTI

Para un sistema LTI:

$$
y[n]=x[n]*h[n]
$$

Aplicando Transformada Z:

$$
Y(z)=X(z)H(z)
$$

Por tanto:

$$
\boxed{
H(z)=\frac{Y(z)}{X(z)}
}
$$

siempre que la división tenga sentido.

Aquí $H(z)$ es la **función de transferencia** del sistema.

---

# 25. Propiedad de convolución y función de transferencia

Esto permite convertir un problema de:

$$
y[n]=x[n]*h[n]
$$

en:

$$
Y(z)=X(z)H(z)
$$

que algebraicamente es mucho más sencillo.

Y si conocemos:

$$
H(z)
$$

podemos estudiar:

* polos;
* ceros;
* estabilidad;
* causalidad;
* respuesta frecuencial;
* ecuaciones en diferencias.

---

# 26. Propiedad de escalado de la variable Z

Si:

$$
x[n]\leftrightarrow X(z)
$$

entonces:

$$
a^nx[n]
$$

tiene transformada:

$$
\boxed{
X\left(\frac{z}{a}\right)
}
$$

Demostración:

$$
Y(z)=
\sum_n a^nx[n]z^{-n}
$$

$$

= \sum_nx[n]
\left(\frac{z}{a}\right)^{-n}
$$

por tanto:

$$
\boxed{
Y(z)=X(z/a)
}
$$

---

# 27. Inversión temporal

Si:

$$
x[n]\leftrightarrow X(z)
$$

entonces:

$$
x[-n]
$$

tiene transformada:

$$
\boxed{
X(z^{-1})
}
$$

porque:

$$
\sum_nx[-n]z^{-n}
$$

haciendo:

$$
m=-n
$$

obtenemos:

$$
\sum_mx[m]z^m
$$

que es:

$$
X(z^{-1})
$$

---

# 28. Diferenciación respecto a $z$

Otra propiedad importante:

$$
\boxed{
Z\{nx[n]\}=

-z\frac{dX(z)}{dz}
}
$$

Esta propiedad es muy útil para obtener transformadas de señales como:

$$
na^nu[n]
$$

Partimos de:

$$
X(z)=
\frac{1}{1-az^{-1}}
$$

Aplicando:

$$
-z\frac{d}{dz}
$$

obtenemos:

$$
\boxed{
Z\{na^nu[n]\}=
\frac{az^{-1}}
{(1-az^{-1})^2}
}
$$

---

# 29. Diferencia temporal

Esta propiedad merece especial atención porque conecta la Transformada Z con las **ecuaciones en diferencias**.

Consideremos:

$$
y[n]=x[n]-x[n-1]
$$

Para una señal bilateral, utilizando la propiedad de desplazamiento:

$$
Y(z)=
X(z)-z^{-1}X(z)
$$

por tanto:

$$
\boxed{
Y(z)=
(1-z^{-1})X(z)
}
$$

Esto significa que el operador diferencia:

$$
1-z^{-1}
$$

en el dominio Z corresponde a:

$$
x[n]-x[n-1]
$$

en tiempo.

---

# 30. Suma acumulativa

Supongamos:

$$
y[n]=\sum_{k=-\infty}^{n}x[k]
$$

Entonces:

$$
y[n]-y[n-1]=x[n]
$$

Aplicando Z:

$$
Y(z)-z^{-1}Y(z)=X(z)
$$

$$
Y(z)(1-z^{-1})=X(z)
$$

por tanto:

$$
\boxed{
Y(z)=
\frac{X(z)}
{1-z^{-1}}
}
$$

Esto explica por qué:

$$
\frac1{1-z^{-1}}
$$

aparece continuamente en sistemas digitales.

---

# 31. Teorema del valor inicial

Bajo las condiciones apropiadas:

$$
\boxed{
x[0]=

\lim_{z\rightarrow\infty}X(z)
}
$$

Esto es muy útil para comprobar transformadas inversas.

Por ejemplo:

$$
X(z)=
\frac{1}{1-az^{-1}}
$$

Cuando:

$$
z\rightarrow\infty
$$

tenemos:

$$
z^{-1}\rightarrow0
$$

por tanto:

$$
\lim_{z\rightarrow\infty}X(z)=1
$$

y efectivamente:

$$
x[0]=a^0=1
$$

---

# 32. Teorema del valor final

Para determinadas señales y bajo las condiciones de estabilidad necesarias:

$$
\boxed{
\lim_{n\rightarrow\infty}x[n]=

\lim_{z\rightarrow1}(1-z^{-1})X(z)
}
$$

Es muy útil para estudiar valores estacionarios.

Pero hay que tener cuidado:

> No puede aplicarse indiscriminadamente. Hay condiciones sobre los polos de la expresión correspondiente.

---

# 33. Transformadas Z racionales

Llegamos ahora a una parte muy importante.

Una Transformada Z racional tiene la forma:

$$
\boxed{
X(z)=
\frac{B(z)}{A(z)}
}
$$

donde $B(z)$ y $A(z)$ son polinomios en $z^{-1}$, por ejemplo:

$$
X(z)=
\frac{
1+2z^{-1}
}{
1-0.5z^{-1}+0.2z^{-2}
}
$$

También podemos escribir:

$$
X(z)=
K
\frac{
\prod_i(1-z_i z^{-1})
}{
\prod_k(1-p_kz^{-1})
}
$$

donde:

* $z_i$ son los **ceros**;
* $p_k$ son los **polos**.

---

# 34. Polos y ceros

Un cero es un valor de $z$ que hace:

$$
X(z)=0
$$

Un polo es un valor de $z$ donde:

$$
X(z)\rightarrow\infty
$$

Por ejemplo:

$$
X(z)=
\frac{
1-0.5z^{-1}
}{
1-0.8z^{-1}
}
$$

El cero cumple:

$$
1-0.5z^{-1}=0
$$

por tanto:

$$
z=0.5
$$

El polo cumple:

$$
1-0.8z^{-1}=0
$$

por tanto:

$$
z=0.8
$$

Tenemos:

```text
                 Im
                  ↑
                  │
                  │       ×
                  │      p=0.8
                  │
───────○──────────×────────────────→ Re
      z=0.5
```

---

# 35. ¿Qué información nos dan los polos?

Los polos están directamente relacionados con la respuesta natural de un sistema.

Un polo:

$$
p=re^{j\omega}
$$

está asociado a términos del tipo:

$$
p^n=
r^ne^{j\omega n}
$$

Por tanto:

* $r$ determina crecimiento/decaimiento;
* $\omega$ determina oscilación.

Si:

$$
r<1
$$

tenemos decaimiento.

Si:

$$
r=1
$$

tenemos oscilación sostenida.

Si:

$$
r>1
$$

tenemos crecimiento.

---

# 36. Conexión con estabilidad

Para un sistema LTI causal racional, la estabilidad BIBO exige que todos los polos estén dentro del círculo unidad:

$$
\boxed{
|p_k|<1
}
$$

Esto es consecuencia de que la respuesta impulsional causal asociada a un polo $p$ contiene:

$$
p^nu[n]
$$

y para que sea absolutamente sumable necesitamos:

$$
|p|<1
$$

Por tanto:

$$
\boxed{
\text{sistema causal racional estable}
\iff
\text{todos los polos están dentro del círculo unidad}
}
$$

---

# 37. Pero cuidado con esta afirmación

Decir:

> "Los polos tienen que estar dentro del círculo unidad"

no es siempre suficiente sin especificar la causalidad.

La condición general de estabilidad es:

$$
\boxed{
\text{la ROC debe contener el círculo unidad}
}
$$

Para sistemas racionales:

* causal → ROC exterior al polo de mayor módulo;
* anticausal → ROC interior;
* bilateral → ROC puede ser un anillo.

Por tanto la ROC vuelve a ser fundamental.

---

# 38. Regiones de convergencia de funciones racionales

Supongamos:

$$
X(z)=
\frac1{
(1-a z^{-1})(1-bz^{-1})
}
$$

Los polos están en:

$$
z=a
$$

y:

$$
z=b
$$

Si:

$$
|a|<|b|
$$

las posibles ROC son:

### ROC exterior

$$
|z|>|b|
$$

### ROC intermedia

$$
|a|<|z|<|b|
$$

### ROC interior

$$
|z|<|a|
$$

Cada una corresponde a una señal diferente.

---

# 39. Regla fundamental de la ROC

Para una Transformada Z racional:

> **La ROC nunca contiene polos.**

Por ejemplo:

```text
             Im
              ↑
              │
          ×   │
              │
───────○───────┼──────────→ Re
       │       │
       │       │
```

Si hay un polo en:

$$
|z|=0.8
$$

la ROC no puede contener ese punto.

---

# 40. ROC para señales causales

Si:

$$
x[n]
$$

es causal:

$$
x[n]=0
\qquad n<0
$$

entonces la ROC es exterior al polo de mayor módulo.

Por ejemplo:

$$
X(z)=
\frac1{
(1-0.5z^{-1})(1-0.8z^{-1})
}
$$

para una señal causal:

$$
\boxed{
ROC:\ |z|>0.8
}
$$

---

# 41. ROC para señales anticausales

Si la señal es anticausal:

$$
x[n]=0
\qquad n>0
$$

la ROC es interior al polo de menor módulo.

En el ejemplo anterior:

$$
\boxed{
ROC:\ |z|<0.5
}
$$

---

# 42. ROC para señales bilaterales

Una señal puede tener parte causal y parte anticausal.

Por ejemplo:

$$
x[n]=
a^nu[n]
+
b^nu[-n-1]
$$

Puede aparecer una ROC:

$$
\boxed{
|a|<|z|<|b|
}
$$

si las magnitudes están adecuadamente ordenadas.

Esto produce una región en forma de anillo.

---

# 43. La ROC contiene información temporal

Esta es una de las ideas más bonitas de la Transformada Z.

La misma función racional:

$$
X(z)
$$

puede representar:

* una señal causal;
* una señal anticausal;
* una señal bilateral.

La ROC nos dice cuál.

Por tanto, la Transformada Z codifica información no solamente sobre las frecuencias, sino también sobre **cómo está distribuida la señal en el tiempo**.

---

# 44. Transformada Z inversa

Ahora queremos hacer el proceso contrario.

Tenemos:

$$
X(z)
$$

y queremos encontrar:

$$
x[n]
$$

Es decir:

$$
\boxed{
X(z)\rightarrow x[n]
}
$$

Esto es la **Transformada Z inversa**.

Formalmente:

$$
\boxed{
x[n]=
\frac{1}{2\pi j}
\oint_C
X(z)z^{n-1}\,dz
}
$$

donde $C$ es un contorno cerrado situado dentro de la ROC.

Esta fórmula es importante conceptualmente, aunque en ejercicios normalmente utilizaremos métodos algebraicos.

---

# 45. Métodos para calcular la Transformada Z inversa

Los principales métodos que debes dominar son:

1. inspección mediante tabla;
2. expansión en serie;
3. división larga;
4. fracciones parciales;
5. cálculo mediante residuos;
6. propiedades de la Transformada Z.

Para 2.º de Teleco, **fracciones parciales + ROC** es probablemente el método más importante.

---

# 46. Método 1: inspección

Si tenemos:

$$
X(z)=
\frac1{1-az^{-1}}
$$

y sabemos que:

$$
ROC:\ |z|>|a|
$$

reconocemos directamente:

$$
\boxed{
x[n]=a^nu[n]
}
$$

Pero si la ROC fuese:

$$
|z|<|a|
$$

entonces:

$$
\boxed{
x[n]=-a^nu[-n-1]
}
$$

Esto vuelve a demostrar la importancia de la ROC.

---

# 47. Método 2: expansión en serie

Supongamos:

$$
X(z)=
\frac1{1-az^{-1}}
$$

Si:

$$
|z|>|a|
$$

podemos escribir:

$$
X(z)=
1+az^{-1}+a^2z^{-2}+a^3z^{-3}+\cdots
$$

Comparando con:

$$
X(z)=
\sum_nx[n]z^{-n}
$$

obtenemos:

$$
x[0]=1
$$

$$
x[1]=a
$$

$$
x[2]=a^2
$$

etc.

Por tanto:

$$
\boxed{
x[n]=a^nu[n]
}
$$

---

# 48. ¿Qué pasa si la expansión es alrededor de $z=0$?

Si:

$$
|z|<|a|
$$

podemos escribir:

$$
\frac1{1-az^{-1}}
$$

de otra manera.

Multiplicamos numerador y denominador por $z$:

$$
X(z)=
\frac{z}{z-a}
$$

Podemos escribir:

$$
X(z)=
-\frac{z/a}{1-z/a}
$$

y para:

$$
|z|<|a|
$$

tenemos:

$$
X(z)=
-\sum_{k=1}^{\infty}
\left(\frac{z}{a}\right)^k
$$

Ahora aparecen potencias positivas de $z$:

$$
z^1,z^2,z^3,\ldots
$$

que corresponden a:

$$
n=-1,-2,-3,\ldots
$$

y obtenemos:

$$
\boxed{
x[n]=-a^nu[-n-1]
}
$$

---

# 49. Método de fracciones parciales

Supongamos:

$$
X(z)=
\frac{
1
}{
(1-0.5z^{-1})(1-0.8z^{-1})
}
$$

Podemos escribir:

$$
X(z)=
\frac{A}{1-0.5z^{-1}}
+
\frac{B}{1-0.8z^{-1}}
$$

Multiplicando:

$$
1=
A(1-0.8z^{-1})
+
B(1-0.5z^{-1})
$$

Comparando coeficientes:

$$
A+B=1
$$

y:

$$
-0.8A-0.5B=0
$$

Resolviendo:

$$
A=\frac{8}{3}
$$

$$
B=-\frac{5}{3}
$$

Por tanto:

$$
X(z)=
\frac{8/3}{1-0.5z^{-1}}-
\frac{5/3}{1-0.8z^{-1}}
$$

Si la ROC es:

$$
|z|>0.8
$$

ambos términos son causales:

$$
\boxed{
x[n]=
\frac83(0.5)^nu[n]-
\frac53(0.8)^nu[n]
}
$$

---

# 50. Pero si la ROC fuera distinta...

Aquí está la gracia.

Con la misma expresión:

$$
X(z)=
\frac{
1
}{
(1-0.5z^{-1})(1-0.8z^{-1})
}
$$

podríamos tener:

### ROC

$$
|z|>0.8
$$

→ ambos términos derechos.

### ROC

$$
|z|<0.5
$$

→ ambos términos izquierdos.

### ROC

$$
0.5<|z|<0.8
$$

→ un término derecho y otro izquierdo.

Por tanto, **no puedes hacer la inversa correctamente sin conocer la ROC**.

---

# 51. Transformada Z racional propia e impropia

Una función racional puede ser:

### Propia

El grado del numerador es menor que el del denominador.

### Impropia

El grado del numerador es mayor o igual.

En la forma en $z^{-1}$, hay que prestar atención a cómo están escritos los términos.

Si tenemos una función impropia, primero puede ser necesario realizar división polinómica antes de aplicar fracciones parciales.

---

# 52. Polos repetidos

Consideremos:

$$
X(z)=
\frac{1}
{(1-az^{-1})^2}
$$

Sabemos que:

$$
Z\{na^nu[n]\}=
\frac{az^{-1}}
{(1-az^{-1})^2}
$$

Por tanto podemos obtener:

$$
\frac1{(1-az^{-1})^2}
$$

utilizando relaciones apropiadas, resultando en una señal con estructura:

$$
(a^n)(n+1)u[n]
$$

En concreto:

$$
\boxed{
\frac1{(1-az^{-1})^2}
\leftrightarrow
(n+1)a^nu[n]
}
$$

para ROC:

$$
|z|>|a|
$$

Los polos repetidos generan factores polinómicos en $n$.

---

# 53. Estructura general de polos repetidos

Un polo de multiplicidad $m$ en:

$$
z=p
$$

produce términos de la forma:

$$
n^k p^n
$$

para:

$$
k=0,1,\ldots,m-1
$$

Por ejemplo:

### Polo simple

$$
p
$$

produce:

$$
p^n
$$

### Polo doble

produce:

$$
p^n
$$

y:

$$
np^n
$$

### Polo triple

produce:

$$
p^n,\quad
np^n,\quad
n^2p^n
$$

Esto es fundamental al resolver ecuaciones en diferencias.

---

# 54. Transformada Z y ecuaciones en diferencias

Esta es una de las aplicaciones más importantes.

Consideremos:

$$
y[n]-ay[n-1]=x[n]
$$

Aplicamos Transformada Z bilateral suponiendo condiciones adecuadas:

$$
Y(z)-az^{-1}Y(z)=X(z)
$$

Sacamos $Y(z)$:

$$
Y(z)(1-az^{-1})=X(z)
$$

Por tanto:

$$
\boxed{
H(z)=
\frac{Y(z)}{X(z)}=
\frac1{1-az^{-1}}
}
$$

El polo está en:

$$
z=a
$$

y si el sistema es causal:

$$
ROC:\ |z|>|a|
$$

Para que sea estable:

$$
|a|<1
$$

---

# 55. Conexión con sistemas recursivos

La ecuación:

$$
y[n]=ay[n-1]+x[n]
$$

es un sistema recursivo.

Si:

$$
|a|<1
$$

la respuesta natural:

$$
a^n
$$

decae.

Si:

$$
|a|>1
$$

crece.

Por tanto la posición del polo:

$$
z=a
$$

nos dice directamente cómo se comporta dinámicamente el sistema.

---

# 56. Ceros y polos en sistemas

Para:

$$
H(z)=
\frac{
b_0+b_1z^{-1}+\cdots+b_Mz^{-M}
}{
1+a_1z^{-1}+\cdots+a_Nz^{-N}
}
$$

los ceros son las raíces del numerador y los polos las raíces del denominador.

Podemos escribir:

$$
\boxed{
H(z)=
K
\frac{
\prod_{k=1}^{M}(1-z_kz^{-1})
}{
\prod_{k=1}^{N}(1-p_kz^{-1})
}
}
$$

El diagrama de polos y ceros permite estudiar visualmente:

* estabilidad;
* resonancias;
* respuesta frecuencial;
* comportamiento temporal.

---

# 57. Respuesta frecuencial a partir de $H(z)$

Si el círculo unidad pertenece a la ROC:

$$
z=e^{j\omega}
$$

podemos obtener:

$$
\boxed{
H(e^{j\omega})=
H(z)|_{z=e^{j\omega}}
}
$$

Esta es la respuesta frecuencial del sistema.

Por tanto la Transformada Z conecta:

$$
\boxed{
H(z)
\rightarrow
H(e^{j\omega})
}
$$

siempre que sea válida la evaluación sobre el círculo unidad.

---

# 58. ¿Qué ocurre cerca de un polo?

Supongamos un polo:

$$
p=re^{j\omega_0}
$$

Si $r$ está cerca de 1, el polo está cerca del círculo unidad.

Entonces normalmente tendremos una fuerte respuesta alrededor de:

$$
\omega=\omega_0
$$

Por eso los polos cercanos al círculo unidad producen **resonancias** o respuestas frecuenciales pronunciadas.

Esto conecta directamente el plano Z con filtros digitales.

---

# 59. Transformada Z unilateral

Ahora llegamos a la última parte que has pedido.

La Transformada Z unilateral o de un solo lado se define como:

$$
\boxed{
X^+(z)=
\sum_{n=0}^{\infty}
x[n]z^{-n}
}
$$

A diferencia de la bilateral:

$$
X(z)=
\sum_{n=-\infty}^{\infty}
x[n]z^{-n}
$$

la unilateral solamente utiliza:

$$
n\geq0
$$

---

# 60. ¿Por qué existe?

La Transformada Z unilateral es especialmente útil para:

* sistemas causales;
* ecuaciones en diferencias;
* condiciones iniciales;
* análisis de sistemas desde $n=0$;
* problemas de respuesta transitoria.

En ingeniería es muy parecida conceptualmente a lo que ocurre con la **Transformada de Laplace unilateral**.

---

# 61. Diferencia entre bilateral y unilateral

Bilateral:

$$
\boxed{
X(z)=
\sum_{n=-\infty}^{\infty}
x[n]z^{-n}
}
$$

Unilateral:

$$
\boxed{
X^+(z)=
\sum_{n=0}^{\infty}
x[n]z^{-n}
}
$$

Por tanto la unilateral ignora explícitamente la parte:

$$
n<0
$$

---

# 62. ¿Por qué esto es útil para condiciones iniciales?

Consideremos:

$$
y[n]=ay[n-1]+x[n]
$$

Queremos resolver el sistema para:

$$
n\geq0
$$

Si aplicamos la Transformada Z bilateral, tenemos que ser muy cuidadosos con las condiciones iniciales y la causalidad.

La unilateral incorpora naturalmente términos relacionados con:

$$
y[-1],y[-2],\ldots
$$

cuando desplazamos señales.

---

# 63. Propiedad de desplazamiento de la unilateral

Esta es una de las fórmulas que debes aprender muy bien.

Si:

$$
X^+(z)=
\sum_{n=0}^{\infty}x[n]z^{-n}
$$

entonces:

$$
\boxed{
Z^+\{x[n-1]\}=
z^{-1}X^+(z)+x[-1]
}
$$

Observa la diferencia con la bilateral.

En la bilateral:

$$
Z\{x[n-1]\}=
z^{-1}X(z)
$$

pero en la unilateral aparece:

$$
\boxed{x[-1]}
$$

---

# 64. Demostración

Partimos de:

$$
Z^+\{x[n-1]\}=
\sum_{n=0}^{\infty}
x[n-1]z^{-n}
$$

Hacemos:

$$
m=n-1
$$

Entonces:

$$
n=m+1
$$

y:

$$
m=-1,0,1,2,\ldots
$$

Por tanto:

$$
\sum_{m=-1}^{\infty}
x[m]z^{-(m+1)}
$$

Sacamos:

$$
z^{-1}
$$

$$
=
z^{-1}
\sum_{m=-1}^{\infty}
x[m]z^{-m}
$$

Separando el término $m=-1$:

$$
=
z^{-1}x[-1]z
+
z^{-1}
\sum_{m=0}^{\infty}x[m]z^{-m}
$$

El primer término es:

$$
x[-1]
$$

por tanto:

$$
\boxed{
Z^+\{x[n-1]\}=
x[-1]+z^{-1}X^+(z)
}
$$

---

# 65. Desplazamiento de dos muestras

Para:

$$
x[n-2]
$$

tenemos:

$$
\boxed{
Z^+\{x[n-2]\}=
z^{-2}X^+(z)
+
x[-1]z^{-1}
+
x[-2]
}
$$

Observa el patrón.

Para $k$:

$$
\boxed{
Z^+\{x[n-k]\}=
z^{-k}X^+(z)
+
\sum_{r=1}^{k}
x[-r]z^{-(k-r)}
}
$$

Esta propiedad es fundamental cuando resolvemos ecuaciones en diferencias con condiciones iniciales.

---

# 66. Ejemplo de ecuación en diferencias con condición inicial

Consideremos:

$$
y[n]-0.5y[n-1]=x[n]
$$

y supongamos:

$$
y[-1]=2
$$

Aplicamos Transformada Z unilateral.

Tenemos:

$$
Y^+(z)-
0.5
Z^+\{y[n-1]\}=
X^+(z)
$$

Utilizamos:

$$
Z^+\{y[n-1]\}=
z^{-1}Y^+(z)+y[-1]
$$

Por tanto:

$$
Y^+(z)-
0.5
\left[
z^{-1}Y^+(z)+2
\right]=
X^+(z)
$$

Distribuimos:

$$
Y^+(z)-
0.5z^{-1}Y^+(z)-
1=
X^+(z)
$$

Agrupamos:

$$
Y^+(z)(1-0.5z^{-1})=
X^+(z)+1
$$

y:

$$
\boxed{
Y^+(z)=
\frac{X^+(z)+1}
{1-0.5z^{-1}}
}
$$

Observa que la condición inicial aparece automáticamente.

---

# 67. Respuesta de estado cero y respuesta de entrada cero

La Transformada Z unilateral permite separar naturalmente dos componentes.

La respuesta total puede escribirse como:

$$
\boxed{
y[n]=y_{ZI}[n]+y_{ZS}[n]
}
$$

donde:

* $y_{ZI}[n]$ → **zero-input response**, respuesta debida a condiciones iniciales;
* $y_{ZS}[n]$ → **zero-state response**, respuesta debida a la entrada.

Esto es especialmente importante en sistemas dinámicos.

---

# 68. Ejemplo conceptual

Supongamos:

$$
y[n]-ay[n-1]=x[n]
$$

con:

$$
y[-1]\neq0
$$

Aunque:

$$
x[n]=0
$$

podemos tener:

$$
y[n]\neq0
$$

debido a la energía/estado inicial del sistema.

Esto se representa mediante la respuesta de entrada cero.

La Transformada Z unilateral permite mantener explícitamente esos términos iniciales.

---

# 69. Transformada Z unilateral de una señal causal

Si una señal es causal:

$$
x[n]=0
\qquad n<0
$$

entonces:

$$
\sum_{n=-\infty}^{\infty}x[n]z^{-n}=
\sum_{n=0}^{\infty}x[n]z^{-n}
$$

por tanto, para una señal causal:

$$
\boxed{
X(z)=X^+(z)
}
$$

bajo la interpretación correspondiente.

Esta es una razón por la que muchas veces parecen "lo mismo" en problemas de sistemas causales.

Pero conceptualmente siguen siendo transformadas diferentes.

---

# 70. Una diferencia crucial

La Transformada Z bilateral contiene información sobre la señal para:

$$
n<0
$$

La unilateral no.

Por eso la bilateral es más apropiada para estudiar:

* ROC;
* causalidad;
* estabilidad;
* señales generales.

Mientras que la unilateral es especialmente útil para:

* condiciones iniciales;
* ecuaciones en diferencias;
* sistemas causales.

---

# 71. ¿Cuándo usar cada una?

Una buena regla práctica:

### Si te preguntan por:

* ROC;
* polos y ceros;
* causalidad;
* estabilidad;
* transformada Z de una señal general;
* transformada inversa;

piensa en la:

$$
\boxed{\text{Transformada Z bilateral}}
$$

---

### Si te preguntan por:

* condiciones iniciales;
* ecuaciones en diferencias;
* $y[-1]$, $y[-2]$, etc.;
* respuesta de entrada cero;
* resolución de sistemas a partir de $n=0$;

piensa en:

$$
\boxed{\text{Transformada Z unilateral}}
$$

---

# 72. Resumen de propiedades principales

Para estudiar, te recomiendo dominar esta tabla:

| Propiedad                         | Resultado                                                           |
| --------------------------------- | ------------------------------------------------------------------- |
| Linealidad                        | $ax[n]+by[n]\leftrightarrow aX(z)+bY(z)$                            |
| Desplazamiento temporal           | $x[n-n_0]\leftrightarrow z^{-n_0}X(z)$                              |
| Escalado temporal por exponencial | $a^nx[n]\leftrightarrow X(z/a)$                                     |
| Inversión temporal                | $x[-n]\leftrightarrow X(z^{-1})$                                    |
| Convolución                       | $x[n]*h[n]\leftrightarrow X(z)H(z)$                                 |
| Multiplicación por $n$            | $nx[n]\leftrightarrow-z\frac{dX}{dz}$                               |
| Diferencia                        | $x[n]-x[n-1]\leftrightarrow(1-z^{-1})X(z)$                          |
| Acumulación                       | $\sum_{k=-\infty}^nx[k]\leftrightarrow\frac{X(z)}{1-z^{-1}}$        |
| Valor inicial                     | $x[0]=\lim_{z\to\infty}X(z)$, bajo condiciones apropiadas           |
| Valor final                       | $\lim x[n]=\lim_{z\to1}(1-z^{-1})X(z)$, bajo condiciones apropiadas |

---

# 73. Tabla de transformadas que deberías manejar

$$
\boxed{
\delta[n]
\leftrightarrow
1
}
$$

$$
\boxed{
u[n]
\leftrightarrow
\frac1{1-z^{-1}},
\qquad |z|>1
}
$$

$$
\boxed{
a^nu[n]
\leftrightarrow
\frac1{1-az^{-1}},
\qquad |z|>|a|
}
$$

$$
\boxed{
-a^nu[-n-1]
\leftrightarrow
\frac1{1-az^{-1}},
\qquad |z|<|a|
}
$$

$$
\boxed{
na^nu[n]
\leftrightarrow
\frac{az^{-1}}
{(1-az^{-1})^2}
}
$$

$$
\boxed{
\cos(\omega_0n)u[n]
\leftrightarrow
\frac{1-\cos(\omega_0)z^{-1}}
{1-2\cos(\omega_0)z^{-1}+z^{-2}}
}
$$

$$
\boxed{
\sin(\omega_0n)u[n]
\leftrightarrow
\frac{\sin(\omega_0)z^{-1}}
{1-2\cos(\omega_0)z^{-1}+z^{-2}}
}
$$

---

# 74. El gran mapa conceptual

Todo este tema se puede organizar así:

```text
                         TRANSFORMADA Z
                               │
              ┌────────────────┴────────────────┐
              │                                 │
          DEFINICIÓN                         PROPIEDADES
              │                                 │
              ▼                                 ▼
 X(z)=Σx[n]z⁻ⁿ                     linealidad
              │                    desplazamiento
              │                    convolución
              ▼                    escalado
             ROC                   diferenciación
              │
      ┌───────┼────────┐
      │       │        │
      ▼       ▼        ▼
   causal  anticausal bilateral
      │       │        │
      └───────┼────────┘
              ▼
        POLOS Y CEROS
              │
       ┌──────┼───────┐
       ▼      ▼       ▼
   causal  estable  H(z)
                       │
                       ▼
                  H(eʲω)
                       │
                       ▼
                respuesta frecuencial
```

Y en paralelo:

```text
                 TRANSFORMADA Z INVERSA
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
        inspección   fracciones   residuos
                       parciales
            │            │            │
            └────────────┼────────────┘
                         ▼
                        x[n]
```

Finalmente:

```text
                 TRANSFORMADA Z
                       │
                       │
             ¿condiciones iniciales?
                       │
                 ┌─────┴─────┐
                 │           │
                NO           SÍ
                 │           │
                 ▼           ▼
             bilateral    unilateral
                 │           │
          ROC/polos/       ecuaciones
          causalidad       en diferencias
          estabilidad      condiciones
                           iniciales
```

---

# 75. Lo más importante que debes comprender

Si tuviera que reducir todo este tema a unas pocas ideas fundamentales, serían estas:

### 1. La Transformada Z es una generalización de la DTFT

$$
\boxed{
X(z)=\sum_nx[n]z^{-n}
}
$$

y:

$$
\boxed{
X(e^{j\omega})=X(z)|_{z=e^{j\omega}}
}
$$

si el círculo unidad pertenece a la ROC.

---

### 2. $z$ es complejo

$$
\boxed{
z=re^{j\omega}
}
$$

y por eso la Z estudia simultáneamente:

* comportamiento frecuencial mediante $\omega$;
* crecimiento/decaimiento mediante $r$.

---

### 3. La ROC es esencial

$$
\boxed{
X(z)+ROC
}
$$

determinan la señal.

La misma expresión racional puede representar señales distintas dependiendo de la ROC.

---

### 4. Los polos determinan gran parte del comportamiento dinámico

Un polo:

$$
p=re^{j\omega}
$$

produce términos relacionados con:

$$
r^ne^{j\omega n}
$$

Por eso:

* $r<1$ → decaimiento;
* $r=1$ → oscilación sostenida;
* $r>1$ → crecimiento.

---

### 5. Para un sistema causal racional estable

$$
\boxed{
\text{todos los polos deben estar dentro del círculo unidad}
}
$$

o, de forma más general:

$$
\boxed{
\text{la ROC debe contener }|z|=1
}
$$

---

### 6. La convolución se convierte en multiplicación

$$
\boxed{
y[n]=x[n]*h[n]
}
$$

se convierte en:

$$
\boxed{
Y(z)=X(z)H(z)
}
$$

Esta es una de las razones principales por las que la Transformada Z es tan potente.

---

### 7. La Transformada inversa necesita la ROC

No basta con tener:

$$
X(z)=\frac1{1-az^{-1}}
$$

Hay que saber si:

$$
|z|>|a|
$$

o:

$$
|z|<|a|
$$

porque obtenemos señales diferentes.

---

### 8. La unilateral es especialmente útil para condiciones iniciales

$$
\boxed{
X^+(z)=\sum_{n=0}^{\infty}x[n]z^{-n}
}
$$

y, por ejemplo:

$$
\boxed{
Z^+\{x[n-1]\}=
z^{-1}X^+(z)+x[-1]
}
$$

Ese término $x[-1]$ es precisamente el tipo de información que hace que la Transformada Z unilateral sea tan útil para resolver ecuaciones en diferencias con condiciones iniciales.

---

# 76. La conexión que te interesa dominar para los siguientes temas

Como estás estudiando **Señales Digitales**, el flujo lógico que te recomiendo tener en la cabeza es:

$$
\boxed{
x[n]
\overset{Z}{\longrightarrow}
X(z)
}
$$

↓

$$
\boxed{
X(z)=
\frac{\text{ceros}}
{\text{polos}}
}
$$

↓

$$
\boxed{
\text{ROC}
}
$$

↓

$$
\boxed{
\text{causalidad + estabilidad}
}
$$

↓

$$
\boxed{
X(e^{j\omega})
}
$$

↓

$$
\boxed{
\text{respuesta frecuencial}
}
$$

Y para sistemas:

$$
\boxed{
\text{ecuación en diferencias}
\rightarrow
H(z)
\rightarrow
\text{polos y ceros}
\rightarrow
H(e^{j\omega})
}
$$

Mientras que para problemas con condiciones iniciales:

$$
\boxed{
\text{ecuación en diferencias}
\rightarrow
\text{Z unilateral}
\rightarrow
Y(z)
\rightarrow
y[n]
}
$$

**Si entiendes esta cadena y no solamente memorizas las tablas, la Transformada Z deja de ser una colección de fórmulas y pasa a convertirse en una herramienta para resolver prácticamente todo el bloque de sistemas discretos de Señales Digitales.**
