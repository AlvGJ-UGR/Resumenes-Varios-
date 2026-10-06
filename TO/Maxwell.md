# Ecuaciones de Maxwell

Las ecuaciones de Maxwell constituyen el conjunto de ecuaciones fundamentales que describen el comportamiento de los **campos eléctricos y magnéticos**, así como su relación con las cargas eléctricas y las corrientes.

Desde un punto de vista clásico, toda la teoría electromagnética puede organizarse alrededor de cuatro ecuaciones:

1. **Ley de Gauss para el campo eléctrico**.
2. **Ley de Gauss para el campo magnético**.
3. **Ley de Faraday**.
4. **Ley de Ampère-Maxwell**.

Estas cuatro ecuaciones, junto con las relaciones constitutivas del medio y las leyes que describen el movimiento de las cargas, permiten describir prácticamente todos los fenómenos electromagnéticos clásicos.

Sin embargo, para comprender realmente las ecuaciones de Maxwell no basta con memorizar sus cuatro expresiones. Es necesario entender:

* qué representan los campos $\mathbf{E}$ y $\mathbf{B}$;
* qué significa físicamente una carga como fuente de un campo;
* qué es el flujo de un campo vectorial;
* qué papel desempeña la divergencia;
* por qué existen formas **integrales** y **diferenciales** de las ecuaciones;
* cómo aparecen las densidades de carga y corriente;
* qué información proporciona cada ecuación;
* y cómo se relacionan las ecuaciones de Maxwell con las leyes electromagnéticas que se estudian de forma independiente.

Por ello, antes de estudiar las cuatro ecuaciones, conviene establecer el lenguaje que vamos a utilizar.

---

# 1. El campo electromagnético

## 1.1. La idea de campo

En física, un **campo** es una magnitud definida en cada punto del espacio y, eventualmente, en cada instante de tiempo.

Por ejemplo, la temperatura de una habitación puede describirse mediante un campo escalar:

$$\
T = T(x,y,z,t)\
$$

En cada posición y tiempo existe un único valor de temperatura.

El campo eléctrico, en cambio, es un **campo vectorial**. A cada punto del espacio y a cada instante le corresponde un vector:

\mathbf{E}(x,y,z,t)\

$$

De forma equivalente:

E_x(x,y,z,t),\hat{\mathbf{x}}\
+\
E_y(x,y,z,t),\hat{\mathbf{y}}\
+\
E_z(x,y,z,t),\hat{\mathbf{z}}\
$$

Por tanto, el campo eléctrico contiene simultáneamente información sobre:

* su dirección;
* su sentido;
* su módulo;
* y su dependencia espacial y temporal.

La unidad del campo eléctrico en el Sistema Internacional es:

# \frac{\mathrm{N}}{\mathrm{C}}

\frac{\mathrm{V}}{\mathrm{m}}\

$$

El campo eléctrico puede entenderse operacionalmente mediante la fuerza que experimentaría una carga de prueba.

Si colocamos una carga puntual $q$ en una región donde existe un campo eléctrico $\mathbf{E}$, la fuerza eléctrica sobre ella es:

q\mathbf{E}\
$$

Por tanto:

\frac{\mathbf{F}}{q}\

$$$

Esta expresión debe interpretarse con cierto cuidado: la carga utilizada para medir el campo debe considerarse suficientemente pequeña como para no modificar apreciablemente la distribución de cargas que genera el campo.

---

# 2. El campo eléctrico y el campo magnético

Las ecuaciones de Maxwell trabajan fundamentalmente con dos campos:

$$\
\mathbf{E}(\mathbf{r},t)\
$$$

y

$$\
\mathbf{B}(\mathbf{r},t)\
$$

donde $\mathbf{r}$ representa la posición:

x\hat{\mathbf{x}}
+
y\hat{\mathbf{y}}
+
z\hat{\mathbf{z}}\

$$

El campo eléctrico $\mathbf{E}$ está relacionado directamente con las cargas eléctricas y también puede ser generado por campos magnéticos variables en el tiempo.

El campo magnético $\mathbf{B}$ está relacionado con las corrientes eléctricas, con las cargas en movimiento y también puede ser generado por campos eléctricos variables en el tiempo.

Esta última afirmación es fundamental.

En electrostática se suele estudiar el campo eléctrico producido por cargas inmóviles y, por separado, el campo magnético producido por corrientes estacionarias. Las ecuaciones de Maxwell muestran que esta separación es solamente un caso particular.

En general:

\mathbf{E}(\mathbf{r},t)\
$$

\mathbf{B}(\mathbf{r},t)\

$$

y ambos campos están acoplados.

Este acoplamiento es precisamente una de las características más importantes del electromagnetismo clásico.

---

# 3. Fuentes del campo electromagnético

Para comprender las ecuaciones de Maxwell es especialmente útil pensar en términos de **fuentes**.

En electromagnetismo aparecen dos magnitudes fuente fundamentales:

- la densidad de carga eléctrica $\rho$;
- la densidad de corriente eléctrica $\mathbf{J}$.

## 3.1. Densidad de carga

Si la carga está distribuida de manera continua por el espacio, en lugar de hablar de una carga puntual $q$ utilizamos una densidad volumétrica de carga:

\rho(x,y,z,t)\
$$

Su unidad es:

\frac{\mathrm{C}}{\mathrm{m}^3}\

$$

La carga contenida en un volumen $V$ se obtiene mediante:

\iiint_V\
\rho,dV\
$$

o, utilizando una notación más compacta:

\int_V
\rho,dV\

$$

donde el elemento diferencial de volumen es:

dx,dy,dz\
$$

La densidad $\rho$ nos indica cómo está distribuida espacialmente la carga.

Por ejemplo, si $\rho$ es constante en un volumen $V$:

\rho V\

$$

En una distribución no uniforme, la carga debe calcularse mediante la integral.

---

## 3.2. Densidad superficial y lineal

No toda distribución de carga ocupa un volumen.

Una carga puede estar confinada aproximadamente a una superficie. En ese caso utilizamos una densidad superficial:

\frac{dQ}{dS}\
$$

con unidades:

\frac{\mathrm{C}}{\mathrm{m}^2}\

$$

La carga total sobre una superficie $S$ es:

\int_S\
\sigma,dS\
$$

También puede existir una distribución de carga a lo largo de una línea, descrita mediante la densidad lineal:

\frac{dQ}{dl}\

$$

con unidades:

\frac{\mathrm{C}}{\mathrm{m}}\
$$

En ese caso:

\int_L
\lambda,dl\

$$

Estas tres descripciones son casos particulares de una misma idea:

> La densidad de carga permite pasar de una descripción discreta de la carga a una descripción continua.

---

# 4. La ley de Coulomb como punto de partida

Antes de introducir la primera ecuación de Maxwell conviene recordar la ley de Coulomb.

Para dos cargas puntuales $q_1$ y $q_2$, separadas por una distancia $r$, la fuerza eléctrica es:

\frac{1}{4\pi\varepsilon_0}\
\frac{q_1q_2}{r^2}\
\hat{\mathbf{r}}\
$$

donde:

* $\varepsilon_0$ es la permitividad eléctrica del vacío;
* $r$ es la distancia entre las cargas;
* $\hat{\mathbf{r}}$ es el vector unitario que apunta desde una carga hacia la otra.

Si consideramos que $q_1$ es la carga que genera el campo y $q_2$ una carga de prueba, podemos escribir:

q_2\mathbf{E}\

$$

Por tanto:

\frac{1}{4\pi\varepsilon_0}\
\frac{q_1}{r^2}\
\hat{\mathbf{r}}\
$$

Esto muestra que una carga puntual positiva genera un campo eléctrico radial que decrece como $1/r^2$.

Para una carga puntual $q$ situada en el origen:

\frac{q}{4\pi\varepsilon_0 r^2}
\hat{\mathbf{r}}\

$$

Esta expresión será fundamental para comprender la ley de Gauss.

---

# 5. Flujo de un campo vectorial

La primera ecuación de Maxwell se expresa naturalmente mediante el concepto de **flujo**.

Supongamos una superficie diferencial $dS$.

Asociamos a ella un vector diferencial de superficie:

\hat{\mathbf{n}},dS\
$$

donde $\hat{\mathbf{n}}$ es el vector unitario normal a la superficie.

El flujo diferencial de un campo vectorial $\mathbf{E}$ a través de esa superficie es:

\mathbf{E}\cdot d\mathbf{S}\

$$

Como se trata de un producto escalar:

E,dS\cos\theta\
$$

donde $\theta$ es el ángulo entre el campo eléctrico y la normal a la superficie.

Por tanto:

* si $\theta=0^\circ$, el campo atraviesa perpendicularmente la superficie y el flujo es máximo;
* si $\theta=90^\circ$, el campo es paralelo a la superficie y el flujo es cero;
* si $90^\circ<\theta\leq180^\circ$, el flujo es negativo.

Para una superficie completa $S$:

\int_S
\mathbf{E}\cdot d\mathbf{S}\

$$$

Este concepto es esencial porque la ley de Gauss no habla simplemente de cuánto campo existe, sino de **cuánto campo atraviesa una superficie cerrada**.

---

# 6. Superficies cerradas

Una superficie cerrada es aquella que delimita completamente un volumen.

Algunos ejemplos son:

- una esfera;
- un cubo;
- un cilindro cerrado por sus dos tapas;
- cualquier superficie deformada que encierre un volumen.

Para una superficie cerrada utilizaremos la notación:

$$\
\oint_S\
$$$

El círculo sobre el símbolo de integral indica que la superficie es cerrada.

Por tanto, el flujo eléctrico total a través de una superficie cerrada es:

\oint_S
\mathbf{E}\cdot d\mathbf{S}\

$$

Existe además una convención importante:

> En una superficie cerrada, el vector normal $d\mathbf{S}$ se toma apuntando hacia el exterior.

Esto determina el signo del flujo.

Si las líneas de campo salen de la superficie, contribuyen positivamente.

Si entran en la superficie, contribuyen negativamente.

---

# 7. La ley de Gauss para el campo eléctrico

La primera ecuación de Maxwell es la **ley de Gauss para el campo eléctrico**.

En el vacío, su forma integral es:

\frac{Q\_{\mathrm{enc}}}{\varepsilon_0}\
}\
$$

Esta ecuación establece una relación extremadamente profunda:

> El flujo eléctrico neto a través de cualquier superficie cerrada es proporcional a la carga eléctrica encerrada por dicha superficie.

Aquí:

* $S$ es una superficie cerrada;
* $\mathbf{E}$ es el campo eléctrico;
* $d\mathbf{S}$ es el elemento vectorial de superficie;
* $Q_{\mathrm{enc}}$ es la carga total encerrada;
* $\varepsilon_0$ es la permitividad eléctrica del vacío.

Si existe una distribución continua de carga:

\int_V
\rho,dV\

$$

y por tanto:

\frac{1}{\varepsilon_0}\
\int_V\
\rho,dV\
$$

Esta forma permite conectar directamente el campo eléctrico con la densidad de carga.

---

# 8. ¿Qué significa físicamente la ley de Gauss?

La interpretación más importante de la ley de Gauss es que las cargas eléctricas actúan como **fuentes o sumideros del campo eléctrico**.

Una carga positiva genera un flujo neto saliente.

Una carga negativa genera un flujo neto entrante.

Por ejemplo, si dentro de una superficie cerrada tenemos una carga positiva:

$$\
Q\_{\mathrm{enc}}>0\
$$

entonces:

$$\
\oint_S\
\mathbf{E}\cdot d\mathbf{S}

>

0\
$$

El flujo neto es positivo.

Si, por el contrario:

$$\
Q\_{\mathrm{enc}}<0\
$$

entonces:

$$\
\oint_S\
\mathbf{E}\cdot d\mathbf{S}\
<\
0\
$$

Y si la carga neta encerrada es cero:

$$\
Q\_{\mathrm{enc}}=0\
$$

entonces:

0\

$$

Es importante no interpretar esto como que necesariamente el campo eléctrico es cero.

Puede existir un campo eléctrico muy intenso en todos los puntos de la superficie y, sin embargo, que el flujo neto sea cero porque las contribuciones positivas y negativas se compensan.

---

# 9. Una carga puntual y la ley de Gauss

Consideremos una carga puntual $q$ situada en el centro de una esfera de radio $r$.

Por simetría, el campo eléctrico tiene módulo constante sobre toda la esfera:

\frac{q}{4\pi\varepsilon_0r^2}\
$$

Además, el campo es radial y la normal a la esfera también es radial.

Por tanto:

E,dS\

$$

La integral de flujo queda:

E\
\oint_S\
dS\
$$

Como el área de una esfera es:

4\pi r^2\

$$

obtenemos:

E(4\pi r^2)\
$$

Sustituyendo el campo:

\frac{q}{4\pi\varepsilon_0r^2}
4\pi r^2\

$$

y, por tanto:

\frac{q}{\varepsilon_0}\
$$

que coincide exactamente con la ley de Gauss.

Este ejemplo permite entender por qué aparece la dependencia $1/r^2$ en la ley de Coulomb.

El campo disminuye como $1/r^2$, mientras que el área de una esfera aumenta como $r^2$:

$$\
E\propto\frac{1}{r^2}\
$$

$$\
S\propto r^2\
$$

Por tanto:

\text{constante}\

$$$

El flujo total permanece constante independientemente del radio de la superficie esférica, siempre que la carga permanezca encerrada.

---

# 10. La superficie gaussiana

La ley de Gauss es válida para **cualquier superficie cerrada**, pero algunas superficies son especialmente útiles para calcular el campo eléctrico.

Estas superficies se denominan **superficies gaussianas**.

La elección de una superficie gaussiana adecuada depende de la simetría del problema.

Las tres simetrías más importantes son:

### Simetría esférica

Se utiliza normalmente una superficie esférica.

Ejemplo:

- carga puntual;
- esfera cargada uniformemente;
- distribución esféricamente simétrica.

### Simetría cilíndrica

Se utiliza normalmente una superficie cilíndrica.

Ejemplo:

- hilo infinito cargado;
- cilindro infinito cargado.

### Simetría plana

Se utiliza normalmente una superficie tipo "pastilla" o cilindro muy corto que atraviesa el plano.

Ejemplo:

- plano infinito cargado.

La clave no consiste simplemente en dibujar una superficie cerrada.

La clave es elegir una superficie sobre la que el campo tenga una estructura suficientemente sencilla como para poder evaluar:

$$\
\oint_S\
\mathbf{E}\cdot d\mathbf{S}\
$$$

---

# 11. Ejemplo: hilo infinito cargado

Consideremos un hilo infinito con densidad lineal de carga uniforme $\lambda$.

Por simetría:

* el campo debe ser radial;
* el campo solo puede depender de la distancia radial $r$ al hilo;
* el módulo del campo es constante para todos los puntos situados a la misma distancia del hilo.

Elegimos como superficie gaussiana un cilindro de radio $r$ y longitud $L$, coaxial con el hilo.

La superficie cerrada está formada por:

* una superficie lateral;
* una tapa superior;
* una tapa inferior.

En la superficie lateral, $\mathbf{E}$ es paralelo a $d\mathbf{S}$.

Por tanto:

E,dS\

$$

En cambio, en las tapas, el campo es paralelo a las tapas y perpendicular a la normal:

0\
$$

Por tanto, únicamente contribuye la superficie lateral.

El flujo es:

E
\int_S
dS\

$$

La superficie lateral del cilindro es:

2\pi rL\
$$

por lo que:

E(2\pi rL)\

$$

La carga encerrada es:

\lambda L\
$$

Aplicando Gauss:

\frac{\lambda L}{\varepsilon_0}\

$$

Simplificando:

\frac{\lambda}{2\pi\varepsilon_0r}\
$$

Por tanto:

\frac{\lambda}{2\pi\varepsilon_0r}
\hat{\mathbf{r}}
}\

$$$

Obsérvese que ahora:

$$\
E\propto\frac{1}{r}\
$$$

y no $1/r^2$.

Esto tiene sentido geométricamente. En este caso el campo se distribuye sobre una superficie cilíndrica cuya área crece como:

2\pi rL\

$$$

es decir:

$$\
S\propto r\
$$$

Para mantener constante el flujo:

\text{constante}\

$$$

debe cumplirse:

$$\
E\propto\frac{1}{r}\
$$$

La forma espacial del campo está, por tanto, directamente relacionada con la geometría del problema.

---

# 12. La forma diferencial de la ley de Gauss

La ley de Gauss puede escribirse de una forma local, es decir, válida punto por punto.

Esta es la **forma diferencial**:

\frac{\rho}{\varepsilon_0}
}\

$$

Esta ecuación es una de las expresiones más importantes de todo el electromagnetismo.

Mientras que la forma integral:

\frac{Q\_{\mathrm{enc}}}{\varepsilon_0}\
$$

relaciona el flujo a través de una superficie completa con la carga encerrada, la forma diferencial:

\frac{\rho}{\varepsilon_0}\

$$

establece una relación **local** entre la distribución de carga y la estructura del campo eléctrico.

Para comprenderla necesitamos entender la divergencia.

---

# 13. La divergencia

La divergencia es un operador diferencial que actúa sobre un campo vectorial.

Para un campo:

E_x\hat{\mathbf{x}}\
+\
E_y\hat{\mathbf{y}}\
+\
E_z\hat{\mathbf{z}}\
$$

su divergencia es:

\frac{\partial E_x}{\partial x}
+
\frac{\partial E_y}{\partial y}
+
\frac{\partial E_z}{\partial z}\

$$

El operador nabla se define como:

\hat{\mathbf{x}}\frac{\partial}{\partial x}\
+\
\hat{\mathbf{y}}\frac{\partial}{\partial y}\
+\
\hat{\mathbf{z}}\frac{\partial}{\partial z}\
$$

Por tanto, el producto escalar:

$$\
\nabla\cdot\mathbf{E}\
$$

produce un escalar.

La divergencia mide, en esencia, el **flujo neto que sale de un volumen infinitesimal por unidad de volumen**.

Esta interpretación es fundamental.

---

# 14. Interpretación física de la divergencia

Imaginemos un pequeño volumen alrededor de un punto.

Si sale más campo del volumen del que entra, existe una divergencia positiva:

$$\
\nabla\cdot\mathbf{E}>0\
$$

Podemos interpretar el punto como una especie de **fuente local** del campo.

Si entra más campo del que sale:

$$\
\nabla\cdot\mathbf{E}<0\
$$

el punto se comporta como un **sumidero**.

Si entra exactamente la misma cantidad de flujo que sale:

$$\
\nabla\cdot\mathbf{E}=0\
$$

no existe flujo neto.

La ley de Gauss establece precisamente que:

\frac{\rho}{\varepsilon_0}\

$$

Por tanto:

- $\rho>0$ implica divergencia positiva;
- $\rho<0$ implica divergencia negativa;
- $\rho=0$ implica divergencia nula.

Esto permite interpretar la carga eléctrica como la fuente local del campo eléctrico.

---

# 15. Del teorema de Gauss a la ecuación diferencial

La conexión entre las formas integral y diferencial se obtiene mediante el **teorema de la divergencia de Gauss**.

Este teorema matemático establece que:

\int_V\
\nabla\cdot\mathbf{E},dV\
$$

Es decir:

> El flujo total que atraviesa una superficie cerrada es igual a la integral de la divergencia del campo sobre el volumen encerrado.

Por otro lado, la ley de Gauss establece:

\frac{1}{\varepsilon_0}
\int_V
\rho,dV\

$$

Igualando ambas expresiones:

\frac{1}{\varepsilon_0}\
\int_V\
\rho,dV\
$$

Podemos escribir:

0\

$$

Como esto debe cumplirse para cualquier volumen $V$, el integrando debe ser cero:

# \frac{\rho}{\varepsilon_0}

0\
$$

y obtenemos:

\frac{\rho}{\varepsilon_0}\

$$

Por tanto:

\frac{\rho}{\varepsilon_0}\
}\
$$

Las dos formas de la ley de Gauss no son dos leyes diferentes.

Son dos representaciones matemáticas de la misma ley física.

---

# 16. Forma integral frente a forma diferencial

Es importante distinguir qué información proporciona cada representación.

La forma integral:

\frac{Q_{\mathrm{enc}}}{\varepsilon_0}\

$$

es una relación **global**.

Describe el comportamiento del campo en una superficie cerrada completa.

La forma diferencial:

\frac{\rho}{\varepsilon_0}\
$$

es una relación **local**.

Describe lo que ocurre en cada punto del espacio.

Podemos resumirlo conceptualmente de la siguiente manera:

$$\
\text{forma diferencial}\
\quad\
\longleftrightarrow\
\quad\
\text{comportamiento local}\
$$

$$\
\text{forma integral}\
\quad\
\longleftrightarrow\
\quad\
\text{comportamiento global}\
$$

El teorema de la divergencia permite pasar de una descripción a la otra.

Esta distinción será extremadamente importante para las otras tres ecuaciones de Maxwell.

---

# 17. ¿Qué ocurre en una región sin carga?

Supongamos una región del espacio donde:

$$\
\rho=0\
$$

Entonces la ley de Gauss en forma diferencial se convierte en:

0\

$$$

Esto **no significa necesariamente**:

$$\
\mathbf{E}=0\
$$$

Esta diferencia es fundamental.

Por ejemplo, consideremos una región alejada de una carga puntual.

En todos esos puntos:

$$\
\rho=0\
$$

pero existe un campo eléctrico:

$$\
\mathbf{E}\neq0\
$$

Lo que ocurre es que no existe una fuente local de campo en esa región:

$$\
\nabla\cdot\mathbf{E}=0\
$$

El campo puede estar atravesando la región sin comenzar ni terminar allí.

Este punto evita uno de los errores conceptuales más frecuentes al estudiar la ley de Gauss:

> Divergencia nula no significa campo nulo.

---

# 18. Campo eléctrico de una carga puntual en forma diferencial

Consideremos de nuevo una carga puntual $q$:

\frac{q}{4\pi\varepsilon_0r^2}
\hat{\mathbf{r}}\

$$$

Para cualquier punto donde:

$$\
r\neq0\
$$$

no existe carga:

$$\
\rho=0\
$$

y, por tanto:

$$\
\nabla\cdot\mathbf{E}=0\
$$

Sin embargo, en el origen se encuentra la carga puntual.

Matemáticamente, una carga puntual no puede describirse mediante una función ordinaria $\rho(\mathbf{r})$.

Se utiliza la delta de Dirac:

q\delta^{(3)}(\mathbf{r})\

$$

donde $\delta^{(3)}$ es la delta de Dirac tridimensional.

Entonces la ley de Gauss se expresa rigurosamente como:

\frac{q}{\varepsilon_0}\
\delta^{(3)}(\mathbf{r})\
$$

Esto refleja algo muy importante:

La divergencia es cero en todo punto donde no está la carga, pero existe una contribución singular exactamente en la posición de la carga.

No es necesario utilizar esta formulación para resolver los problemas básicos de electromagnetismo, pero resulta fundamental para comprender la estructura matemática de las ecuaciones de Maxwell.

---

# 19. La ley de Gauss en un medio material

Hasta ahora hemos considerado el vacío.

En presencia de materia, la situación puede complicarse porque las cargas del material pueden reorganizarse microscópicamente.

Estas cargas se denominan habitualmente **cargas ligadas**, mientras que las cargas introducidas externamente se denominan **cargas libres**.

Para describir esta situación se introduce el campo eléctrico auxiliar $\mathbf{D}$, denominado **desplazamiento eléctrico**.

La relación fundamental es:

\rho_{\mathrm{libre}}
}\

$$

y su forma integral:

Q\_{\mathrm{libre,enc}}\
}\
$$

En un medio lineal, homogéneo e isótropo:

\varepsilon\mathbf{E}\

$$

donde:

\varepsilon_0\varepsilon_r\
$$

y $\varepsilon_r$ es la permitividad relativa del material.

Por tanto:

\varepsilon_0\varepsilon_r\mathbf{E}\

$$$

En el vacío:

$$\
\varepsilon_r=1\
$$$

y:

\varepsilon_0\mathbf{E}\

$$

Esta distinción entre $\mathbf{E}$ y $\mathbf{D}$ será especialmente importante cuando estudiemos materiales dieléctricos y condiciones de contorno.

---

# 20. Una primera visión de las cuatro ecuaciones

Una vez comprendida la ley de Gauss, podemos empezar a observar la estructura global de las ecuaciones de Maxwell.

En el vacío, utilizando $\rho$ y $\mathbf{J}$ como fuentes:

### Ley de Gauss eléctrica

\frac{\rho}{\varepsilon_0}\
$$

### Ley de Gauss magnética

0\

$$

### Ley de Faraday

-\frac{\partial\mathbf{B}}{\partial t}\
$$

### Ley de Ampère-Maxwell

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$

Estas cuatro ecuaciones tienen una estructura matemática muy reveladora.

Dos utilizan la **divergencia**:

\frac{\rho}{\varepsilon_0}\
$$

0\

$$

y dos utilizan el **rotacional**:

-\frac{\partial\mathbf{B}}{\partial t}\
$$

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$$

Esta estructura no es casual.

La divergencia está relacionada con las **fuentes y sumideros** de un campo, mientras que el rotacional está relacionado con la **circulación local** del campo.

Comprender esta diferencia será esencial para entender por qué las ecuaciones de Maxwell tienen exactamente esta estructura.

---

# 21. Qué hemos aprendido hasta aquí

La primera ecuación de Maxwell puede resumirse conceptualmente como:

$$\
\boxed{\displaystyle\
\text{carga eléctrica}\
\quad\longrightarrow\quad\
\text{divergencia del campo eléctrico}\
}\
$$$

En forma diferencial:

\frac{\rho}{\varepsilon_0}\

$$

y en forma integral:

\frac{Q\_{\mathrm{enc}}}{\varepsilon_0}\
$$

La forma diferencial nos dice que la carga eléctrica constituye una fuente local del campo eléctrico.

La forma integral nos dice que el flujo eléctrico neto que atraviesa una superficie cerrada está determinado exclusivamente por la carga neta encerrada.

También hemos establecido varias ideas que serán necesarias para el resto del desarrollo:

* $\mathbf{E}$ es un campo vectorial.
* $\rho$ describe la densidad volumétrica de carga.
* El flujo de un campo vectorial se calcula mediante un producto escalar.
* Una superficie cerrada se integra mediante $\oint$.
* La divergencia mide el flujo neto saliente por unidad de volumen.
* El teorema de la divergencia conecta las formas integral y diferencial.
* Una divergencia nula no implica necesariamente que el campo sea nulo.
* La carga eléctrica actúa como fuente del campo eléctrico.
* En medios materiales resulta conveniente introducir $\mathbf{D}$.
* Las ecuaciones de Maxwell combinan relaciones de divergencia y de rotacional.

La siguiente parte continuará a partir de esta estructura y desarrollará la **ley de Gauss para el magnetismo**, introduciendo el significado profundo de

$$\
\nabla\cdot\mathbf{B}=0\
$$

y, sobre todo, la diferencia fundamental entre las líneas de campo eléctrico y magnético y la ausencia de monopolos magnéticos en el electromagnetismo clásico.

# 22. El campo magnético

La segunda ecuación de Maxwell describe una propiedad fundamental del campo magnético:

0
}\

$$

Su forma integral equivalente es:

0\
}\
$$

Antes de estudiar el significado de estas ecuaciones es necesario comprender con precisión qué representa el campo magnético y qué diferencias existen entre $\mathbf{B}$ y $\mathbf{E}$.

El campo magnético $\mathbf{B}$ es un campo vectorial que describe el estado magnético del espacio.

Su unidad en el Sistema Internacional es el **tesla**:

\mathrm{T}\

$$

El campo magnético aparece asociado a cargas eléctricas en movimiento, corrientes eléctricas y, en una descripción más general, a la dinámica del campo electromagnético.

Una carga que se mueve en presencia de un campo magnético experimenta una fuerza dada por la parte magnética de la fuerza de Lorentz:

q\mathbf{v}\times\mathbf{B}\
$$

donde:

* $q$ es la carga;
* $\mathbf{v}$ es su velocidad;
* $\mathbf{B}$ es el campo magnético.

El producto vectorial implica que la fuerza magnética es perpendicular tanto a la velocidad como al campo magnético.

Por tanto:

$$\
\mathbf{F}\_{m}\perp\mathbf{v}\
$$

y:

$$\
\mathbf{F}\_{m}\perp\mathbf{B}\
$$

siempre que la fuerza sea distinta de cero.

Esto ya muestra una diferencia conceptual importante respecto al campo eléctrico.

La fuerza eléctrica es:

q\mathbf{E}\

$$

y puede realizar trabajo sobre una carga.

La fuerza magnética:

q\mathbf{v}\times\mathbf{B}\
$$

es perpendicular a la velocidad instantánea de la partícula y, por tanto, no modifica directamente su energía cinética.

---

# 23. El flujo magnético

De forma completamente análoga al caso eléctrico, podemos definir el flujo del campo magnético a través de una superficie.

Para un elemento diferencial de superficie:

\hat{\mathbf{n}},dS\

$$

el flujo magnético diferencial es:

\mathbf{B}\cdot d\mathbf{S}\
$$

Por tanto, el flujo magnético total a través de una superficie $S$ es:

\int_S
\mathbf{B}\cdot d\mathbf{S}\

$$

Si la superficie es cerrada:

\oint_S\
\mathbf{B}\cdot d\mathbf{S}\
$$

La unidad del flujo magnético es el **weber**:

\mathrm{Wb}\

$$

Como:

\int_S\
\mathbf{B}\cdot d\mathbf{S}\
$$

se obtiene dimensionalmente:

1,\mathrm{T},\mathrm{m}^2\

$$

---

# 24. La ley de Gauss para el magnetismo

La ley de Gauss para el magnetismo establece:

0\
}\
$$

para cualquier superficie cerrada.

La interpretación inmediata es:

> El flujo magnético neto a través de cualquier superficie cerrada es siempre cero.

Esta afirmación es radicalmente diferente de la ley de Gauss eléctrica.

Para el campo eléctrico:

\frac{Q_{\mathrm{enc}}}{\varepsilon_0}\

$$

El flujo eléctrico puede ser distinto de cero porque existen cargas eléctricas que actúan como fuentes o sumideros del campo.

Para el campo magnético:

0\
$$

No existe una cantidad análoga a una carga magnética aislada que produzca un flujo magnético neto.

---

# 25. Ausencia de monopolos magnéticos

La forma diferencial de la ley de Gauss magnética es:

0
}\

$$

Esto significa que el campo magnético no tiene fuentes ni sumideros locales en el sentido en que los tiene el campo eléctrico.

Para el campo eléctrico:

\frac{\rho}{\varepsilon_0}\
$$

La existencia de una densidad de carga $\rho$ permite que:

$$\
\nabla\cdot\mathbf{E}\neq0\
$$

Para el campo magnético:

0\

$$

en todo punto.

No existe, dentro del electromagnetismo clásico, una densidad de carga magnética $\rho_m$ que permita escribir algo como:

\mu_0\rho_m\
$$

Por tanto, no existen **monopolos magnéticos clásicos**.

Un monopolo magnético sería, conceptualmente, una partícula que actuase como una carga eléctrica aislada pero para el campo magnético.

Por ejemplo, una carga eléctrica positiva constituye una fuente del campo eléctrico:

$$\
\nabla\cdot\mathbf{E}>0\
$$

Un hipotético monopolo magnético positivo produciría análogamente:

$$\
\nabla\cdot\mathbf{B}>0\
$$

Pero ninguna fuente magnética aislada de este tipo aparece en las ecuaciones de Maxwell estándar.

---

# 26. Líneas de campo magnético

La ausencia de monopolos magnéticos tiene una representación geométrica muy intuitiva.

Las líneas de campo eléctrico pueden comenzar o terminar en cargas.

Por ejemplo:

$$\
+\text{ carga}\
\longrightarrow\
\text{líneas de campo}\
\longrightarrow\
-\text{ carga}\
$$

Las líneas de campo magnético, en cambio, no tienen principio ni final.

Forman líneas cerradas o se extienden hasta el infinito sin comenzar o terminar en un punto.

Por ejemplo, alrededor de un conductor rectilíneo recorrido por corriente, las líneas del campo magnético son circunferencias concéntricas:

$$\
\mathbf{B}\
\sim\
\text{circunferencias alrededor del conductor}\
$$

Esto es una consecuencia geométrica de:

0\

$$$

Las líneas de campo magnético no pueden aparecer espontáneamente en un punto ni desaparecer en otro.

---

# 27. El caso de un imán permanente

Un ejemplo especialmente útil es un imán de barra.

A primera vista puede parecer que un imán posee dos tipos de polos independientes:

- polo norte;
- polo sur.

Podríamos imaginar entonces que el polo norte es una fuente de $\mathbf{B}$ y que el polo sur es un sumidero.

Pero esto no ocurre.

Las líneas del campo magnético salen externamente del polo norte, entran en el polo sur y continúan por el interior del imán desde el sur hacia el norte.

Por tanto, las líneas forman circuitos cerrados.

De manera esquemática:

$$\
\text{N}\
\longrightarrow\
\text{espacio exterior}\
\longrightarrow\
\text{S}\
\longrightarrow\
\text{interior del imán}\
\longrightarrow\
\text{N}\
$$$

Si cortamos el imán por la mitad, no obtenemos un monopolo norte y un monopolo sur separados.

Obtenemos dos imanes:

$$\
\text{N-S}\
\qquad\
\text{N-S}\
$$

Si volvemos a dividirlos:

$$\
\text{N-S}\
\qquad\
\text{N-S}\
\qquad\
\text{N-S}\
\qquad\
\text{N-S}\
$$

y así sucesivamente.

Cada fragmento sigue teniendo ambos polos.

Esta propiedad es coherente con:

0\

$$

---

# 28. No confundir polos magnéticos con monopolos

Es importante hacer una distinción conceptual.

Decir que un imán tiene:

- polo norte;
- polo sur;

no significa que existan dos monopolos magnéticos independientes.

Los términos "norte" y "sur" describen regiones del imán donde el campo presenta determinadas orientaciones, pero no corresponden a cargas magnéticas fundamentales equivalentes a $+q$ y $-q$ eléctricas.

Por eso no podemos escribir para el magnetismo una ley equivalente a:

\frac{\rho_m}{\varepsilon_0}\
$$

La teoría electromagnética clásica no contiene una densidad de carga magnética fundamental.

---

# 29. Comparación entre las dos leyes de Gauss

Podemos comparar directamente las dos primeras ecuaciones de Maxwell.

## Campo eléctrico

\frac{\rho}{\varepsilon_0}\

$$

La divergencia del campo eléctrico está determinada por la densidad de carga.

Por tanto, las cargas eléctricas son fuentes o sumideros de $\mathbf{E}$.

## Campo magnético

0\
$$

La divergencia del campo magnético es siempre nula.

Por tanto, no existen fuentes o sumideros magnéticos aislados.

La comparación fundamental es:

\frac{\rho}{\varepsilon_0}
}\

$$

frente a:

0\
}\
$$

La primera ecuación tiene una fuente.

La segunda no.

---

# 30. Una consecuencia matemática: el flujo magnético neto es cero

Consideremos una superficie cerrada cualquiera.

Aplicando el teorema de la divergencia:

\int_V
\nabla\cdot\mathbf{B},dV\

$$

Como:

0\
$$

tenemos:

\int_V
0,dV\

$$

por lo que:

0\
}\
$$

Esto demuestra matemáticamente la equivalencia entre la forma diferencial y la forma integral de la ley de Gauss magnética.

---

# 31. ¿Significa $\nabla\cdot\mathbf{B}=0$ que no existe campo magnético?

No.

Esta es una confusión análoga a la que vimos anteriormente con el campo eléctrico.

La condición:

0\

$$

no implica:

0\
$$

Simplemente significa que no existe flujo magnético neto generado por una fuente puntual de campo magnético.

Por ejemplo, alrededor de un conductor con corriente:

$$\
\mathbf{B}\
\neq\
0\
$$

pero:

0\

$$

El campo magnético existe, pero sus líneas no comienzan ni terminan en el espacio.

---

# 32. Campo magnético alrededor de un conductor rectilíneo

Consideremos un conductor rectilíneo infinito recorrido por una corriente $I$.

El campo magnético tiene simetría cilíndrica.

Su dirección es azimutal:

B\_\varphi(r),\
\hat{\boldsymbol{\varphi}}\
$$

y, en el vacío:

\frac{\mu_0 I}{2\pi r}\

$$

Por tanto:

\frac{\mu_0 I}{2\pi r}\
\hat{\boldsymbol{\varphi}}\
}\
$$

Las líneas de campo son circunferencias centradas en el conductor.

Observemos ahora algo interesante.

El campo tiene módulo no nulo:

$$\
B(r)>0\
$$

pero las líneas son cerradas.

No existe un punto del espacio donde el campo "nazca" ni otro donde "muera".

Esto es perfectamente compatible con:

0\

$$$

---

# 33. Divergencia y líneas de campo

La divergencia puede visualizarse mediante las líneas de campo.

Para un campo con divergencia positiva:

$$\
\nabla\cdot\mathbf{F}>0\
$$$

las líneas tienden a separarse desde el punto.

Para divergencia negativa:

$$\
\nabla\cdot\mathbf{F}<0\
$$

las líneas tienden a converger.

Para:

$$\
\nabla\cdot\mathbf{F}=0\
$$

no existe creación ni destrucción neta de líneas.

En el caso magnético:

$$\
\nabla\cdot\mathbf{B}=0\
$$

las líneas no pueden comenzar ni terminar.

Esta interpretación geométrica es útil, pero debe utilizarse con cuidado.

Las líneas de campo son una herramienta de visualización; no son objetos físicos.

Lo que realmente expresa la ecuación es una propiedad matemática local del campo vectorial.

---

# 34. Una interpretación más profunda: campos solenoidales

En cálculo vectorial, un campo que satisface:

0\

$$

se denomina **campo solenoidal**.

Por tanto, el campo magnético es un campo solenoidal.

Esta propiedad tiene consecuencias matemáticas importantes.

En una región simplemente conexa, un campo solenoidal puede expresarse como el rotacional de otro campo vectorial.

Por ello se introduce el **potencial vector magnético** $\mathbf{A}$:

\nabla\times\mathbf{A}\
}\
$$

Esta definición garantiza automáticamente que:

\nabla\cdot
\left(
\nabla\times\mathbf{A}
\right)\

$$

y existe una identidad matemática fundamental:

0\
$$

Por tanto:

0\

$$

automáticamente.

Esto significa que la segunda ecuación de Maxwell puede incorporarse de forma natural mediante el potencial vector magnético.

---

# 35. El potencial vector magnético

El potencial vector $\mathbf{A}$ se define mediante:

\nabla\times\mathbf{A}\
$$

Su unidad en el Sistema Internacional es:

\mathrm{T,m}\

$$

aunque también puede expresarse como:

\frac{\mathrm{Wb}}{\mathrm{m}}\
$$

La utilización de $\mathbf{A}$ no es simplemente una maniobra matemática.

Será especialmente importante cuando estudiemos la ley de Faraday, porque el campo eléctrico puede relacionarse con el potencial escalar eléctrico $\phi$ y el potencial vector magnético $\mathbf{A}$.

En general:

## -\nabla\phi

\frac{\partial\mathbf{A}}{\partial t}\

$$

Esta expresión aparecerá de manera natural al estudiar el carácter no conservativo del campo eléctrico cuando existe un campo magnético variable.

---

# 36. Por qué el potencial vector no es único

Existe una característica importante del potencial vector.

Si:

\nabla\times\mathbf{A}\
$$

podemos construir otro potencial:

\mathbf{A}
+
\nabla\psi\

$$

donde $\psi$ es cualquier función escalar suficientemente regular.

Entonces:

\nabla\times\
\left(\
\mathbf{A}\
+\
\nabla\psi\
\right)\
$$

Aplicando la linealidad:

\nabla\times\mathbf{A}
+
\nabla\times\nabla\psi\

$$

y como:

0\
$$

obtenemos:

# \nabla\times\mathbf{A}

\mathbf{B}\

$$

Por tanto, diferentes potenciales vectoriales pueden producir exactamente el mismo campo magnético.

Esta libertad recibe el nombre de **libertad de gauge**.

Su estudio detallado pertenece a una etapa posterior, pero es importante conocer desde ahora que $\mathbf{A}$ no está determinado de manera única por $\mathbf{B}$.

---

# 37. La divergencia en coordenadas cartesianas

Como vamos a trabajar frecuentemente con campos electromagnéticos tridimensionales, conviene recordar explícitamente la divergencia.

Para:

F_x\hat{\mathbf{x}}\
+\
F_y\hat{\mathbf{y}}\
+\
F_z\hat{\mathbf{z}}\
$$

tenemos:

\frac{\partial F_x}{\partial x}
+
\frac{\partial F_y}{\partial y}
+
\frac{\partial F_z}{\partial z}\

$$

Por tanto:

\frac{\partial B_x}{\partial x}\
+\
\frac{\partial B_y}{\partial y}\
+\
\frac{\partial B_z}{\partial z}\
$$

La segunda ecuación de Maxwell exige:

0\

$$$

en todos los puntos donde se aplique la formulación clásica.

Esta expresión puede resultar más útil que la notación compacta cuando se resuelven problemas concretos.

---

# 38. La divergencia en coordenadas cilíndricas

En problemas con simetría cilíndrica, como el campo alrededor de un conductor rectilíneo, es más natural utilizar coordenadas cilíndricas:

$$\
(r,\varphi,z)\
$$$

Un campo general puede escribirse como:

B_r\hat{\mathbf{r}}
+
B_\varphi\hat{\boldsymbol{\varphi}}
+
B_z\hat{\mathbf{z}}\

$$

Su divergencia es:

\frac{1}{r}\
\frac{\partial}{\partial r}\
\left(\
rB_r\
\right)\
+\
\frac{1}{r}\
\frac{\partial B\_\varphi}{\partial\varphi}\
+\
\frac{\partial B_z}{\partial z}\
$$

Para el campo de un hilo infinito:

\frac{\mu_0 I}{2\pi r}
\hat{\boldsymbol{\varphi}}\

$$$

tenemos:

$$\
B_r=0\
$$$

\frac{\mu_0 I}{2\pi r}\

$$$

$$\
B_z=0\
$$$

Además, el campo no depende de $\varphi$ ni de $z$.

Por tanto:

0\

$$

y:

0\
$$

Como también:

$$\
B_r=0\
$$

resulta:

0\

$$

tal como exige la ley de Gauss magnética.

---

# 39. Una diferencia fundamental entre $\mathbf{E}$ y $\mathbf{B}$

Las dos primeras ecuaciones de Maxwell muestran una asimetría fundamental del electromagnetismo clásico.

Para el campo eléctrico:

\frac{\rho}{\varepsilon_0}\
$$

Existen fuentes.

Para el campo magnético:

0\

$$$

No existen fuentes magnéticas aisladas.

Esta asimetría puede expresarse mediante la topología de las líneas de campo:

$$\
\mathbf{E}:\
\quad\
\text{puede comenzar y terminar}\
$$$

$$\
\mathbf{B}:\
\quad\
\text{no comienza ni termina}\
$$

Pero esta diferencia no significa que el campo magnético sea "menos fundamental" que el eléctrico.

Más adelante veremos que, cuando se estudian campos dependientes del tiempo, ambos campos están profundamente relacionados:

-\frac{\partial\mathbf{B}}{\partial t}\

$$

y:

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

Estas ecuaciones harán que la aparente separación entre electricidad y magnetismo desaparezca.

---

# 40. ¿Por qué el campo magnético puede existir sin cargas magnéticas?

La pregunta natural es:

> Si las cargas eléctricas generan $\mathbf{E}$, ¿qué genera $\mathbf{B}$ si no existen cargas magnéticas?

La respuesta aparece en las otras ecuaciones de Maxwell.

Un campo magnético puede estar asociado a una corriente eléctrica:

$$\
\mathbf{J}\
$$

y, más generalmente, a un campo eléctrico variable:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
$$

La ecuación correspondiente será:

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$$

Por tanto, aunque:

$$\
\nabla\cdot\mathbf{B}=0\
$$$

sí puede existir:

$$\
\nabla\times\mathbf{B}\neq0\
$$

Esta distinción entre divergencia y rotacional será una de las ideas centrales del electromagnetismo.

Un campo puede tener divergencia cero y rotacional distinto de cero.

El campo magnético es precisamente un ejemplo fundamental.

---

# 41. Divergencia frente a rotacional

Conviene detenerse aquí porque esta distinción aparecerá constantemente.

La **divergencia**:

$$\
\nabla\cdot\mathbf{F}\
$$

es un escalar.

Describe la tendencia local del campo a comportarse como una fuente o sumidero.

El **rotacional**:

$$\
\nabla\times\mathbf{F}\
$$

es un vector.

Describe la circulación local del campo.

En electromagnetismo:

\frac{\rho}{\varepsilon_0}\

$$

relaciona el campo eléctrico con las cargas.

Mientras que:

-\frac{\partial\mathbf{B}}{\partial t}\
$$

relacionará el campo eléctrico con la variación temporal del campo magnético.

Análogamente:

0\

$$

mientras que:

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

Esta estructura será la clave para comprender la teoría electromagnética completa.

---

# 42. La ley de Gauss magnética en un problema de flujo

Supongamos que una superficie cerrada atraviesa una región donde existe un campo magnético no uniforme.

Podemos tener:

$$\
\mathbf{B}\neq0\
$$

en prácticamente todos los puntos de la superficie.

Sin embargo:

0\

$$

¿Por qué?

Porque todo flujo magnético que entra en el volumen debe salir en algún otro punto.

En otras palabras:

0\
$$

siempre que consideremos la orientación exterior de la superficie.

Por ejemplo:

$$\
\Phi\_{B,\mathrm{entrante}}\
<\
0\
$$

y:

$$\
\Phi\_{B,\mathrm{saliente}}

>

0\
$$

de modo que:

0\

$$

Esto no significa que el flujo individual a través de cada parte de la superficie sea cero.

Significa que el **flujo neto** es cero.

---

# 43. Una observación matemática importante

La condición:

0\
$$

es una restricción local.

La condición:

0\

$$

es una restricción global.

La primera dice:

> En ningún punto existe una fuente local de campo magnético.

La segunda dice:

> En ninguna superficie cerrada existe un flujo magnético neto.

El teorema de la divergencia conecta ambas.

Esto es exactamente análogo a la relación que vimos anteriormente para el campo eléctrico:

\frac{\rho}{\varepsilon_0}\
$$

y:

\frac{Q_{\mathrm{enc}}}{\varepsilon_0}\

$$

La diferencia es que para el campo magnético el lado derecho es siempre cero.

---

# 44. Situación conceptual de las dos primeras ecuaciones

Llegados a este punto podemos interpretar las dos primeras ecuaciones de Maxwell de manera conjunta.

## Primera ecuación

\frac{\rho}{\varepsilon_0}\
$$

La carga eléctrica es fuente del campo eléctrico.

## Segunda ecuación

0\

$$$

No existen fuentes magnéticas aisladas.

Podemos expresarlo conceptualmente como:

$$\
\boxed{\
\begin{array}{c}\
\text{Cargas eléctricas}\
\\[4pt]\
\downarrow\
\\[4pt]\
\text{fuentes de }\mathbf{E}\
\end{array}\
}\
$$$

mientras que:

$$\
\boxed{\
\begin{array}{c}\
\text{No existen monopolos magnéticos}\
\\[4pt]\
\downarrow\
\\[4pt]\
\nabla\cdot\mathbf{B}=0\
\end{array}\
}\
$$

Esta es solamente la primera capa de significado de las ecuaciones.

Todavía falta explicar cómo se comportan los campos cuando cambian con el tiempo.

Y aquí aparece uno de los resultados más importantes de toda la teoría electromagnética:

> Un campo magnético variable puede generar un campo eléctrico.

Esta afirmación conduce directamente a la **ley de Faraday**.

---

# 45. Conexión con la inducción electromagnética

Hasta ahora hemos considerado principalmente la estructura espacial de los campos.

Pero los campos electromagnéticos pueden depender del tiempo:

\mathbf{E}(\mathbf{r},t)\

$$

\mathbf{B}(\mathbf{r},t)\
$$

La existencia de dependencia temporal cambia profundamente el problema.

Si:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\neq\
0\
$$

entonces puede aparecer un campo eléctrico cuya circulación no es cero.

La relación exacta será:

-\frac{\partial\mathbf{B}}{\partial t}
}\

$$

Esta será la tercera ecuación de Maxwell.

La presencia del signo negativo no es una cuestión arbitraria de convención. Está relacionada con la **ley de Lenz** y expresa que la inducción electromagnética se opone al cambio del flujo magnético que la produce.

La comprensión completa de esta ecuación requiere introducir el concepto de circulación y el teorema de Stokes.

Ese será el siguiente paso natural del desarrollo.

---

# 46. Resumen conceptual

Las dos primeras ecuaciones de Maxwell pueden escribirse como:

\frac{\rho}{\varepsilon_0}\
}\
$$

0
}\

$$

y, en forma integral:

\frac{Q\_{\mathrm{enc}}}{\varepsilon_0}\
}\
$$

0
}\

$$

La primera establece que la carga eléctrica constituye una fuente del campo eléctrico.

La segunda establece que el campo magnético no posee fuentes o sumideros aislados.

De estas ecuaciones se desprenden varias ideas fundamentales:

- $\mathbf{E}$ puede presentar divergencia distinta de cero.
- $\mathbf{B}$ siempre presenta divergencia nula.
- Las líneas de $\mathbf{E}$ pueden comenzar o terminar en cargas.
- Las líneas de $\mathbf{B}$ no comienzan ni terminan.
- El flujo eléctrico neto depende de la carga encerrada.
- El flujo magnético neto a través de una superficie cerrada es siempre cero.
- $\mathbf{B}$ es un campo solenoidal.
- Por ello puede escribirse localmente como:

\nabla\times\mathbf{A}\
$$

* La ausencia de monopolos magnéticos es una propiedad fundamental de las ecuaciones de Maxwell clásicas.

Hasta ahora hemos estudiado únicamente ecuaciones que involucran **divergencias**. Las dos ecuaciones restantes introducirán el **rotacional**, y con él aparecerá la parte verdaderamente dinámica del electromagnetismo.

La siguiente ecuación será:

-\frac{\partial\mathbf{B}}{\partial t}\

$$

la ley de Faraday, que establece que un campo magnético variable puede producir un campo eléctrico.
$$

# 47. La circulación de un campo vectorial

Las dos primeras ecuaciones de Maxwell estaban formuladas mediante la **divergencia**:

\frac{\rho}{\varepsilon_0}\

$$

0\
$$

Las dos ecuaciones restantes utilizan otro operador fundamental del cálculo vectorial: el **rotacional**.

Para comprender la tercera ecuación de Maxwell debemos introducir primero el concepto de **circulación**.

Consideremos un campo vectorial cualquiera:

F_x\hat{\mathbf{x}}
+
F_y\hat{\mathbf{y}}
+
F_z\hat{\mathbf{z}}\

$$$

y una curva cerrada $C$.

La circulación de $\mathbf{F}$ alrededor de $C$ se define como:

$$\
\oint_C\
\mathbf{F}\cdot d\mathbf{l}\
$$$

donde:

$$\
d\mathbf{l}\
$$

es un elemento diferencial de longitud tangente a la curva.

El producto escalar:

$$\
\mathbf{F}\cdot d\mathbf{l}\
$$

selecciona la componente del campo que apunta en la dirección tangente al recorrido.

Por tanto, la circulación mide cuánto del campo "acompaña" al recorrido alrededor de la curva.

---

# 48. El significado geométrico de la circulación

Supongamos que recorremos una curva cerrada siguiendo una determinada orientación.

En cada punto de la curva existe un vector tangente:

$$\
d\mathbf{l}\
$$

Si el campo apunta en la misma dirección que el recorrido:

$$\
\mathbf{F}\cdot d\mathbf{l}>0\
$$

Si apunta en sentido contrario:

$$\
\mathbf{F}\cdot d\mathbf{l}<0\
$$

Y si es perpendicular al recorrido:

$$\
\mathbf{F}\cdot d\mathbf{l}=0\
$$

La circulación suma todas estas contribuciones:

$$\
\oint_C\
\mathbf{F}\cdot d\mathbf{l}\
$$

Por tanto, la circulación no mide simplemente el módulo del campo.

Mide específicamente su **componente tangencial acumulada a lo largo de una trayectoria cerrada**.

---

# 49. El rotacional

El operador matemático que describe localmente la circulación de un campo es el **rotacional**:

$$\
\nabla\times\mathbf{F}\
$$

En coordenadas cartesianas:

\begin{vmatrix}
\hat{\mathbf{x}}
&
\hat{\mathbf{y}}
&
\hat{\mathbf{z}}\

$$$
\frac{\partial}{\partial x}\
&\
\frac{\partial}{\partial y}\
&\
\frac{\partial}{\partial z}\
\\\
F_x\
&\
F_y\
&\
F_z\
\end{vmatrix}\
$$

Desarrollando el determinante:

\frac{\partial F_x}{\partial y}\
\right)\
\hat{\mathbf{z}}\
$$

El resultado es un **vector**.

Esto contrasta con la divergencia:

$$\
\nabla\cdot\mathbf{F}\
$$

que es un escalar.

---

# 50. Interpretación física del rotacional

El rotacional mide la tendencia local de un campo vectorial a producir **circulación alrededor de un punto**.

Una imagen intuitiva consiste en imaginar una pequeña rueda de paletas colocada en el campo.

Si el campo tiende a hacer girar la rueda, existe rotacional.

La dirección de:

$$\
\nabla\times\mathbf{F}\
$$

determina el eje de giro mediante la regla de la mano derecha.

Su módulo está relacionado con la intensidad de esa tendencia de circulación.

Esta interpretación debe entenderse como una intuición geométrica, no como la definición matemática del rotacional.

La definición rigurosa aparecerá mediante el teorema de Stokes.

---

# 51. El teorema de Stokes

El puente entre la circulación y el rotacional es el **teorema de Stokes**.

Establece que:

\int_S\
\left(\
\nabla\times\mathbf{F}\
\right)\
\cdot d\mathbf{S}\
}\
$$

donde:

- $C$ es una curva cerrada;
- $S$ es una superficie cuyo borde es $C$;
- $\mathbf{F}$ es un campo vectorial suficientemente regular;
- $d\mathbf{S}$ es el vector diferencial normal a la superficie.

El teorema establece una relación entre:

$$\
\text{circulación alrededor del borde}\
$$

y:

$$\
\text{flujo del rotacional a través de la superficie}\
$$

Esta relación es para el rotacional lo que el teorema de la divergencia era para la divergencia.

Podemos comparar:

\int_V\
\nabla\cdot\mathbf{F},dV\
$$

con:

\int_S\
\left(\
\nabla\times\mathbf{F}\
\right)\
\cdot d\mathbf{S}\
$$

El primero relaciona una **superficie cerrada** con un volumen.

El segundo relaciona una **curva cerrada** con una superficie.

---

# 52. Orientación de la curva y de la superficie

El teorema de Stokes requiere una convención de orientación.

Si la superficie tiene una normal:

$$\
\hat{\mathbf{n}}\
$$

la orientación positiva de la curva frontera se determina mediante la **regla de la mano derecha**.

Si el pulgar apunta en la dirección de:

$$\
\hat{\mathbf{n}}\
$$

los dedos indican el sentido positivo de recorrido de $C$.

Esto será importante al estudiar la ley de Faraday porque el signo de la fuerza electromotriz depende de la orientación elegida para la superficie y para la curva.

No se trata de una arbitrariedad física.

Una vez escogida una orientación, todas las cantidades deben mantenerse coherentes con ella.

---

# 53. La ley de Faraday

La tercera ecuación de Maxwell es:

-\frac{\partial\mathbf{B}}{\partial t}\
}\
$$

Esta ecuación establece que un campo magnético que cambia con el tiempo genera un campo eléctrico con circulación no nula.

Su forma integral es:

-

\frac{d}{dt}\
\int_S\
\mathbf{B}\cdot d\mathbf{S}\
}\
$$

Definiendo el flujo magnético:

\int_S\
\mathbf{B}\cdot d\mathbf{S}\
$$

podemos escribir:

-

\frac{d\Phi_B}{dt}\
}\
$$

Esta es la **ley de Faraday de la inducción electromagnética**.

---

# 54. De la forma diferencial a la forma integral

La conexión entre ambas formas se obtiene directamente mediante el teorema de Stokes.

Partimos de:

-\frac{\partial\mathbf{B}}{\partial t}\
$$

Integramos sobre una superficie $S$:

-

\int_S\
\frac{\partial\mathbf{B}}{\partial t}\
\cdot d\mathbf{S}\
$$

Aplicando Stokes al lado izquierdo:

-

\int_S\
\frac{\partial\mathbf{B}}{\partial t}\
\cdot d\mathbf{S}\
$$

Si la superficie es fija en el espacio y las condiciones permiten intercambiar derivada temporal e integral:

-

\frac{d}{dt}\
\int_S\
\mathbf{B}\cdot d\mathbf{S}\
$$

Por definición del flujo magnético:

\int_S\
\mathbf{B}\cdot d\mathbf{S}\
$$

obtenemos:

-

\frac{d\Phi_B}{dt}\
$$

Por tanto, la forma integral y la diferencial son dos representaciones de la misma ley.

---

# 55. ¿Qué significa físicamente la ley de Faraday?

La ley de Faraday puede expresarse conceptualmente como:

$$\
\boxed{\
\text{campo magnético variable}\
\quad\longrightarrow\quad\
\text{campo eléctrico inducido}\
}\
$$

Pero esta frase debe entenderse con precisión.

No significa simplemente que aparezca un campo eléctrico uniforme.

Lo que establece la ecuación es que el campo eléctrico presenta una **circulación no nula** cuando el flujo magnético a través de una superficie cambia:

$$\
\frac{d\Phi_B}{dt}\
\neq\
0\
$$

implica:

$$\
\oint_C\
\mathbf{E}\cdot d\mathbf{l}\
\neq\
0\
$$

Por tanto, el campo eléctrico inducido tiene una estructura rotacional:

$$\
\nabla\times\mathbf{E}\
\neq\
0\
$$

---

# 56. El campo eléctrico electrostático

Para comprender la importancia de esta afirmación debemos recordar la electrostática.

En electrostática:

0\
$$

y, por tanto:

0\
$$

Un campo con rotacional nulo, en una región apropiada, puede escribirse como el gradiente negativo de un potencial escalar:

-\nabla V\
}\
$$

donde $V$ es el potencial eléctrico.

En consecuencia:

0\
$$

para cualquier trayectoria cerrada.

Esto significa que el campo electrostático es **conservativo**.

El trabajo realizado por el campo eléctrico entre dos puntos no depende de la trayectoria:

q\
\int_A^B\
\mathbf{E}\cdot d\mathbf{l}\
$$

y puede expresarse mediante una diferencia de potencial:

q\
\left(\
V_A-V_B\
\right)\
$$

---

# 57. El campo eléctrico inducido no es conservativo

Cuando el campo magnético varía con el tiempo:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\neq\
0\
$$

la ley de Faraday establece:

-\frac{\partial\mathbf{B}}{\partial t}\
\neq\
0\
$$

Por tanto, el campo eléctrico inducido no es, en general, conservativo.

Su circulación alrededor de una trayectoria cerrada puede ser distinta de cero:

$$\
\oint_C\
\mathbf{E}\cdot d\mathbf{l}\
\neq\
0\
$$

Esto representa una diferencia fundamental respecto a la electrostática.

Podemos resumir:

### Campo electrostático

0\
$$

0\
$$

-\nabla V\
$$

### Campo eléctrico inducido

$$\
\nabla\times\mathbf{E}\
\neq\
0\
$$

$$\
\oint_C\
\mathbf{E}\cdot d\mathbf{l}\
\neq\
0\
$$

en general.

Esta distinción será esencial cuando estudiemos circuitos en presencia de campos magnéticos variables.

---

# 58. La fuerza electromotriz

La circulación del campo eléctrico aparece directamente relacionada con la **fuerza electromotriz**, o FEM.

Se define:

\oint_C\
\mathbf{E}\cdot d\mathbf{l}\
}\
$$

cuando la descripción se realiza mediante el campo eléctrico efectivo alrededor del circuito.

Entonces la ley de Faraday queda:

-

\frac{d\Phi_B}{dt}\
}\
$$

La FEM tiene unidades de voltio:

\mathrm{V}\
$$

La palabra "fuerza" puede resultar engañosa.

La fuerza electromotriz no es una fuerza mecánica medida en newtons.

Es una cantidad energética por unidad de carga:

1,\frac{\mathrm{J}}{\mathrm{C}}\
$$

La FEM representa la energía suministrada por unidad de carga alrededor de un circuito.

---

# 59. Flujo magnético

El flujo magnético es:

\int_S\
\mathbf{B}\cdot d\mathbf{S}\
$$

Si el campo es uniforme y la superficie plana:

BS\cos\theta\
$$

donde $\theta$ es el ángulo entre $\mathbf{B}$ y la normal a la superficie.

Esto es importante.

El ángulo se mide respecto a la **normal**, no respecto al plano.

Si:

$$\
\theta=0\
$$

el campo es perpendicular a la superficie y:

BS\
$$

El flujo es máximo.

Si:

$$\
\theta=90^\circ\
$$

el campo es paralelo a la superficie y:

0\
$$

Por tanto, el flujo puede cambiar aunque el módulo de $\mathbf{B}$ permanezca constante.

---

# 60. Las tres formas de modificar el flujo

La expresión:

BS\cos\theta\
$$

permite identificar tres formas fundamentales de cambiar el flujo magnético:

### Cambiar el campo magnético

$$\
\frac{dB}{dt}\
\neq\
0\
$$

### Cambiar el área

$$\
\frac{dS}{dt}\
\neq\
0\
$$

### Cambiar la orientación

$$\
\frac{d\theta}{dt}\
\neq\
0\
$$

Cualquiera de estos cambios puede producir:

$$\
\frac{d\Phi_B}{dt}\
\neq\
0\
$$

y, por tanto, una FEM inducida:

-

\frac{d\Phi_B}{dt}\
$$

Esto explica fenómenos aparentemente diferentes como:

- mover un imán respecto a una bobina;
- mover una bobina respecto a un imán;
- hacer girar una espira;
- variar la corriente de un electroimán;
- modificar el área de un circuito dentro de un campo magnético.

Todos ellos pueden entenderse mediante una única ley:

-

\frac{d\Phi_B}{dt}\
$$

---

# 61. El signo negativo: ley de Lenz

El signo negativo de:

-

\frac{d\Phi_B}{dt}\
$$

es fundamental.

Representa la **ley de Lenz**.

La corriente inducida aparece en el sentido necesario para oponerse al cambio del flujo magnético que la produce.

Supongamos que el flujo magnético externo aumenta:

$$\
\frac{d\Phi_B}{dt}

>

0\
$$

Entonces:

$$\
\mathcal{E}<0\
$$

respecto a la orientación elegida.

El sistema inducido genera un campo magnético cuyo efecto tiende a reducir el aumento del flujo original.

Si, por el contrario, el flujo disminuye:

$$\
\frac{d\Phi_B}{dt}\
<\
0\
$$

entonces:

$$\
\mathcal{E}>0\
$$

y la respuesta inducida tiende a mantener el flujo que está disminuyendo.

Esta oposición al cambio es una consecuencia directa de la conservación de la energía.

---

# 62. Interpretación energética de la ley de Lenz

Imaginemos una espira conductora y un imán acercándose.

Al acercar el imán, el flujo magnético a través de la espira aumenta.

La corriente inducida crea su propio campo magnético.

Ese campo se orienta de forma que se opone al aumento del flujo.

Como consecuencia, aparece una interacción magnética que se opone al movimiento que está produciendo la variación del flujo.

Para seguir acercando el imán debemos realizar trabajo mecánico.

Ese trabajo no desaparece.

Se transforma en energía eléctrica y, si existe resistencia, finalmente en calor:

$$\
W\_{\mathrm{mecánica}}\
\longrightarrow\
W\_{\mathrm{eléctrica}}\
\longrightarrow\
Q\_{\mathrm{térmico}}\
$$

Por tanto, el signo negativo de Faraday no es simplemente una cuestión matemática.

Es esencial para que el electromagnetismo sea compatible con la conservación de la energía.

---

# 63. Una espira en un campo magnético uniforme

Consideremos una espira de área $S$ dentro de un campo magnético uniforme:

B\hat{\mathbf{z}}\
$$

Supongamos que la normal a la espira forma un ángulo $\theta$ con el campo.

Entonces:

BS\cos\theta\
$$

Si hacemos girar la espira de modo que:

\theta(t)\
$$

entonces:

BS\cos\theta(t)\
$$

y la FEM inducida será:

-

\frac{d}{dt}\
\left[\
BS\cos\theta(t)\
\right]\
$$

Si $B$ y $S$ son constantes:

BS\sin\theta\
\frac{d\theta}{dt}\
$$

Si la espira gira con velocidad angular constante:

\omega\
$$

entonces:

BS\omega\sin\theta\
$$

Esto constituye el principio básico del **generador eléctrico**.

---

# 64. El generador eléctrico

Un generador eléctrico convierte energía mecánica en energía eléctrica mediante inducción electromagnética.

Una espira gira dentro de un campo magnético.

Si:

\omega t\
$$

el flujo es:

BS\cos(\omega t)\
$$

Por tanto:

-

\frac{d}{dt}\
\left[\
BS\cos(\omega t)\
\right]\
$$

obtenemos:

BS\omega\sin(\omega t)\
$$

La FEM es sinusoidal.

Para una bobina de $N$ espiras:

N\Phi_B\
$$

y:

-

N\
\frac{d\Phi_B}{dt}\
}\
$$

Por tanto:

NBS\omega\sin(\omega t)\
$$

Esta es una de las aplicaciones tecnológicas más importantes de la ley de Faraday.

---

# 65. Inducción electromagnética y transformadores

La ley de Faraday también explica el funcionamiento de un transformador.

Una corriente alterna en el devanado primario produce un campo magnético variable:

$$\
I_1(t)\
\longrightarrow\
\mathbf{B}(t)\
$$

Ese campo variable produce un flujo magnético variable a través del núcleo.

El flujo variable induce una FEM en el secundario:

$$\
\mathbf{B}(t)\
\longrightarrow\
\mathcal{E}\_2(t)\
$$

Para un transformador ideal:

\frac{N_2}{N_1}\
$$

donde:

- $N_1$ es el número de espiras del primario;
- $N_2$ es el número de espiras del secundario.

El principio físico fundamental detrás de esta relación es:

-

N\
\frac{d\Phi_B}{dt}\
$$

---

# 66. La ley de Faraday no requiere necesariamente un conductor

Este punto es conceptualmente muy importante.

La ecuación:

-\frac{\partial\mathbf{B}}{\partial t}\
$$

es una ecuación sobre el **campo electromagnético**.

No necesita que exista previamente un cable.

Si:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\neq\
0\
$$

puede existir:

$$\
\nabla\times\mathbf{E}\
\neq\
0\
$$

aunque no haya ningún conductor.

El conductor simplemente proporciona cargas libres que pueden moverse como respuesta al campo eléctrico inducido.

Por tanto:

> La inducción electromagnética es un fenómeno del campo, no un fenómeno que exista exclusivamente dentro de los cables.

---

# 67. Campo eléctrico inducido alrededor de una región con campo magnético variable

Consideremos una región cilíndrica donde existe un campo magnético uniforme:

B(t)\hat{\mathbf{z}}\
$$

Supongamos que fuera de esa región no existe campo magnético significativo.

Por simetría, el campo eléctrico inducido tendrá dirección azimutal:

E\_\varphi(r)\
\hat{\boldsymbol{\varphi}}\
$$

Es decir, las líneas de $\mathbf{E}$ forman circunferencias.

Aplicando Faraday sobre una circunferencia de radio $r$:

-

\frac{d\Phi_B}{dt}\
$$

Como el campo eléctrico es tangente y tiene módulo constante sobre la circunferencia:

E\_\varphi\
\oint_C\
dl\
$$

y:

2\pi r\
$$

Por tanto:

-

\frac{d\Phi_B}{dt}\
$$

Este resultado muestra algo especialmente interesante:

> El campo eléctrico inducido puede formar líneas cerradas.

Esto es imposible para un campo electrostático conservativo.

---

# 68. Campo eléctrico conservativo frente a campo inducido

Podemos representar la diferencia fundamental:

### Campo electrostático

-\nabla V\
$$

0\
$$

Las líneas de campo pueden conectar regiones de distinto potencial.

La circulación cerrada es:

0\
$$

### Campo eléctrico inducido

-\frac{\partial\mathbf{B}}{\partial t}\
$$

Si:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\neq0\
$$

entonces:

$$\
\nabla\times\mathbf{E}\
\neq0\
$$

y las líneas de campo pueden formar circuitos cerrados.

Por ello no puede describirse globalmente mediante un único potencial escalar $V$.

---

# 69. El potencial escalar no desaparece completamente

Es importante no concluir que en presencia de inducción electromagnética el potencial eléctrico deja de existir en cualquier sentido.

La expresión general del campo eléctrico puede escribirse como:

## -\nabla V

\frac{\partial\mathbf{A}}{\partial t}\
}\
$$

Aquí aparecen dos contribuciones:

-\nabla V\
$$

y:

-

\frac{\partial\mathbf{A}}{\partial t}\
$$

Por tanto:

\mathbf{E}*{\mathrm{electrostático}}*\
*+*\
*\mathbf{E}*{\mathrm{inducido}}\
$$

Tomando el rotacional:

## -\nabla\times\nabla V

\frac{\partial}{\partial t}\
\left(\
\nabla\times\mathbf{A}\
\right)\
$$

Como:

0\
$$

y:

\nabla\times\mathbf{A}\
$$

obtenemos:

-

\frac{\partial\mathbf{B}}{\partial t}\
$$

Es decir, la ley de Faraday aparece automáticamente.

---

# 70. El caso de un circuito móvil

Hasta ahora hemos considerado una superficie fija y un circuito fijo.

Pero en situaciones más generales, el circuito puede moverse o deformarse.

En ese caso la expresión:

-

\frac{d\Phi_B}{dt}\
$$

sigue siendo válida bajo la formulación apropiada del flujo a través de la superficie móvil, pero la interpretación de la FEM puede incluir una contribución debida al movimiento de las cargas dentro del campo magnético.

La fuerza de Lorentz completa es:

q\
\left(\
\mathbf{E}\
+\
\mathbf{v}\times\mathbf{B}\
\right)\
$$

Por unidad de carga:

\mathbf{E}\
+\
\mathbf{v}\times\mathbf{B}\
$$

Por tanto, en un circuito móvil la FEM puede escribirse de manera general como:

\oint_C\
\left(\
\mathbf{E}\
+\
\mathbf{v}\times\mathbf{B}\
\right)\
\cdot d\mathbf{l}\
$$

Este resultado es importante porque muestra que la inducción electromagnética no debe entenderse exclusivamente como "un campo eléctrico creado por un campo magnético variable".

Existen dos situaciones físicamente relacionadas:

- **inducción por campo magnético variable**;
- **FEM de movimiento** de un conductor que se desplaza en un campo magnético.

La ley de Faraday proporciona el marco unificado para ambas situaciones.

---

# 71. La forma general de la ley de Faraday

Para una curva que puede desplazarse, la ley puede expresarse de forma general mediante:

-

\frac{d}{dt}\
\int_S\
\mathbf{B}\cdot d\mathbf{S}\
}\
$$

La velocidad $\mathbf{v}$ representa el movimiento local del elemento de circuito.

Cuando el circuito permanece fijo:

0\
$$

y recuperamos:

-

\frac{d\Phi_B}{dt}\
$$

Esta distinción será especialmente útil cuando estudiemos máquinas eléctricas y problemas de inducción con conductores móviles.

---

# 72. El papel fundamental del tiempo

Las dos primeras ecuaciones de Maxwell pueden cumplirse aunque los campos sean estáticos.

La tercera introduce explícitamente una derivada temporal:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
$$

Esto significa que el electromagnetismo completo no puede entenderse únicamente como una teoría de distribuciones espaciales.

Los campos evolucionan.

Una variación temporal de $\mathbf{B}$ produce $\mathbf{E}$:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\neq\
0\
\quad\Longrightarrow\quad\
\nabla\times\mathbf{E}\
\neq\
0\
$$

Más adelante veremos el proceso inverso:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\neq\
0\
\quad\Longrightarrow\quad\
\nabla\times\mathbf{B}\
\neq\
0\
$$

Este acoplamiento mutuo será precisamente lo que permitirá la existencia de **ondas electromagnéticas**.

---

# 73. Una primera visión de la propagación electromagnética

Las ecuaciones de Maxwell contienen una estructura extraordinariamente profunda.

La ley de Faraday establece:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{E}\
$$

La ley de Ampère-Maxwell establecerá:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{B}\
$$

Por tanto:

$$\
\mathbf{E}\
\longrightarrow\
\mathbf{B}\
\longrightarrow\
\mathbf{E}\
\longrightarrow\
\mathbf{B}\
\longrightarrow\
\cdots\
$$

En determinadas condiciones, esta interacción puede propagarse por el espacio en forma de una onda electromagnética.

La velocidad de propagación en el vacío resulta ser:

\frac{1}{\sqrt{\mu_0\varepsilon_0}}\
$$

y coincide con la velocidad de la luz.

Este resultado será una de las consecuencias más importantes que obtendremos al completar las cuatro ecuaciones de Maxwell.

---

# 74. Comparación de las tres primeras ecuaciones

Hasta este punto tenemos:

### Ley de Gauss eléctrica

\frac{\rho}{\varepsilon_0}\
$$

Las cargas eléctricas son fuentes de $\mathbf{E}$.

### Ley de Gauss magnética

0\
$$

No existen monopolos magnéticos clásicos.

### Ley de Faraday

-\frac{\partial\mathbf{B}}{\partial t}\
$$

Un campo magnético variable produce circulación del campo eléctrico.

Estas tres ecuaciones ya proporcionan una visión muy poderosa:

-\dfrac{\partial\mathbf{B}}{\partial t}\
\end{array}\
}\
$$

La primera describe las fuentes eléctricas.

La segunda establece la ausencia de fuentes magnéticas.

La tercera introduce el acoplamiento dinámico entre $\mathbf{B}$ y $\mathbf{E}$.

Todavía falta una ecuación para completar la estructura.

---

# 75. El problema histórico de la ley de Ampère

La última ecuación de Maxwell está relacionada con la ley de Ampère.

En magnetostática, la ley de Ampère puede escribirse:

\mu_0\mathbf{J}\
$$

o, en forma integral:

\mu_0 I\_{\mathrm{enc}}\
$$

Esta ecuación funciona perfectamente cuando las corrientes son estacionarias.

Pero Maxwell descubrió que no podía ser la ecuación general del electromagnetismo.

El problema aparece cuando las cargas y los campos varían con el tiempo.

La solución consiste en añadir un término adicional:

$$\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

Así se obtiene:

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
}\
$$

Esta será la cuarta ecuación de Maxwell y completará el sistema.

---

# 76. Estructura conceptual hasta este punto

Ya podemos interpretar las ecuaciones como un sistema acoplado.

La carga genera divergencia de campo eléctrico:

$$\
\rho\
\longrightarrow\
\nabla\cdot\mathbf{E}\
$$

No existen cargas magnéticas:

0\
$$

Un campo magnético variable genera circulación eléctrica:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{E}\
$$

Y la ecuación que falta establecerá que:

$$\
\mathbf{J}\
\quad\text{y}\quad\
\frac{\partial\mathbf{E}}{\partial t}\
$$

generan circulación magnética.

El término:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
$$

será especialmente importante.

Sin él, las ecuaciones no describirían correctamente los campos electromagnéticos variables y no aparecería la propagación de ondas electromagnéticas en el vacío.

---

# 77. Resumen de la ley de Faraday

La tercera ecuación de Maxwell es:

-\frac{\partial\mathbf{B}}{\partial t}\
}\
$$

y su forma integral:

-

\frac{d}{dt}\
\int_S\
\mathbf{B}\cdot d\mathbf{S}\
}\
$$

o:

-

\frac{d\Phi_B}{dt}\
}\
$$

Sus ideas fundamentales son:

- El campo eléctrico puede tener circulación no nula.
- Esto ocurre cuando existe una variación temporal del campo magnético.
- El campo eléctrico inducido no es, en general, conservativo.
- La FEM inducida está relacionada con la variación del flujo magnético.
- El signo negativo expresa la ley de Lenz.
- El flujo puede variar porque cambia $B$, el área $S$ o la orientación $\theta$.
- La inducción electromagnética es una propiedad del campo, no exclusivamente de los conductores.
- En circuitos móviles aparece además la contribución magnética $\mathbf{v}\times\mathbf{B}$.
- La ley de Faraday constituye uno de los mecanismos de acoplamiento entre $\mathbf{E}$ y $\mathbf{B}$.

La estructura electromagnética ya está casi completa. La última pieza será la **ley de Ampère-Maxwell**, que mostrará que no solo las corrientes eléctricas producen campos magnéticos: también lo hace un campo eléctrico variable.

Esto cerrará el sistema de cuatro ecuaciones y permitirá, a partir de ellas, estudiar la conservación de la carga, las ondas electromagnéticas, la velocidad de la luz y la unificación de electricidad, magnetismo y óptica.


# 78. La ley de Ampère-Maxwell

La cuarta y última ecuación de Maxwell es:

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}
}\

$$

Esta ecuación establece que el campo magnético puede presentar circulación debido a dos fenómenos distintos:

1. una **densidad de corriente eléctrica** $\mathbf{J}$;
2. un **campo eléctrico variable en el tiempo** $\partial\mathbf{E}/\partial t$.

La primera contribución corresponde a la ley de Ampère original:

\mu_0\mathbf{J}\
$$

La segunda fue introducida por Maxwell:

$$\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

Este término adicional recibe una importancia fundamental porque permite que las ecuaciones de Maxwell sean compatibles con la conservación de la carga y permite describir correctamente campos electromagnéticos variables.

La forma integral de la ecuación es:

\mu_0 I_{\mathrm{enc}}
+
\mu_0\varepsilon_0
\frac{d}{dt}
\int_S
\mathbf{E}\cdot d\mathbf{S}
}\

$$

Definiendo el flujo eléctrico:

\int_S\
\mathbf{E}\cdot d\mathbf{S}\
$$

podemos escribir:

\mu_0 I_{\mathrm{enc}}
+
\mu_0\varepsilon_0
\frac{d\Phi_E}{dt}
}\

$$

---

# 79. La ley de Ampère original

Para comprender por qué Maxwell tuvo que modificar la ley de Ampère, comencemos con la situación magnetostática.

Cuando las corrientes son constantes en el tiempo:

0\
$$

la ley de Ampère puede escribirse:

\mu_0\mathbf{J}\

$$

Su forma integral es:

\mu_0 I\_{\mathrm{enc}}\
$$

Esta ecuación funciona correctamente para corrientes estacionarias.

Por ejemplo, para un conductor rectilíneo infinito:

\frac{\mu_0 I}{2\pi r}\

$$

y el campo magnético forma circunferencias alrededor del conductor.

Si elegimos una circunferencia de radio $r$:

B\
\oint_C\
dl\
$$

Como:

2\pi r\

$$

tenemos:

B(2\pi r)\
$$

y sustituyendo:

\frac{\mu_0I}{2\pi r}\

$$

obtenemos:

\mu_0I\
$$

La ley funciona perfectamente.

El problema aparece cuando la corriente no es estacionaria.

---

# 80. La incompatibilidad con la conservación de la carga

La forma diferencial de la ley de Ampère original sería:

\mu_0\mathbf{J}\

$$

Tomemos la divergencia de ambos lados:

\mu_0\
\nabla\cdot\mathbf{J}\
$$

Existe una identidad fundamental del cálculo vectorial:

0\

$$

Por tanto:

\mu_0\
\nabla\cdot\mathbf{J}\
$$

y necesariamente:

0\

$$

Pero esto no es cierto para una distribución de carga variable en el tiempo.

La conservación de la carga eléctrica establece:

0\
}\
$$

Esta es la **ecuación de continuidad**.

Por tanto:

*

\frac{\partial\rho}{\partial t}\

$$$

Si la densidad de carga cambia con el tiempo:

$$\
\frac{\partial\rho}{\partial t}\
\neq\
0\
$$$

entonces:

$$\
\nabla\cdot\mathbf{J}\
\neq\
0\
$$

Esto entra en contradicción con la ley de Ampère original.

La teoría necesitaba una modificación.

---

# 81. La ecuación de continuidad

La ecuación:

0\

$$

expresa matemáticamente la **conservación local de la carga eléctrica**.

Su significado físico es:

> La carga eléctrica no puede desaparecer ni aparecer espontáneamente. Si la cantidad de carga dentro de una región cambia, debe existir una corriente que transporte carga hacia dentro o hacia fuera de la región.

Consideremos un volumen $V$.

La carga contenida es:

\int_V\
\rho,dV\
$$

Su variación temporal es:

\frac{d}{dt}
\int_V
\rho,dV\

$$

Si el volumen es fijo:

\int_V\
\frac{\partial\rho}{\partial t}\
,dV\
$$

Por la ecuación de continuidad:

*

\int_V
\nabla\cdot\mathbf{J},dV\

$$

Aplicando el teorema de la divergencia:

-

\oint_S\
\mathbf{J}\cdot d\mathbf{S}\
$$

Por tanto:

*

\oint_S
\mathbf{J}\cdot d\mathbf{S}
}\

$$$

La interpretación es inmediata.

Si sale corriente del volumen:

$$\
\oint_S\
\mathbf{J}\cdot d\mathbf{S}

>

0\
$$$

entonces:

$$\
\frac{dQ}{dt}<0\
$$

La carga almacenada disminuye.

Si entra corriente:

$$\
\oint_S\
\mathbf{J}\cdot d\mathbf{S}\
<\
0\
$$

entonces:

$$\
\frac{dQ}{dt}>0\
$$

La carga almacenada aumenta.

---

# 82. El problema del condensador

La necesidad del término de Maxwell puede entenderse de forma especialmente clara mediante un condensador.

Consideremos un circuito que carga un condensador:

```text
        I(t)
   ────────────────►
   │               │
   │               │
   │      +   -    │
   └──────| |──────┘
          C
```

Mientras el condensador se está cargando:

$$\
I(t)\neq0\
$$

La carga acumulada en las placas aumenta:

$$\
Q(t)\
$$

y, por tanto:

I(t)\

$$$

Entre las placas existe un campo eléctrico:

$$\
\mathbf{E}(t)\
$$$

que aumenta a medida que el condensador se carga.

Por tanto:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\neq\
0\
$$

Aquí aparece el problema.

Podemos dibujar una curva cerrada $C$ alrededor del cable:

```text
        ┌─────────────┐
        │             │
   ─────┤             ├────
        │             │
        └─────────────┘
```

La superficie que atraviesa el conductor está atravesada por una corriente:

$$\
I\
$$

Pero podemos deformar la superficie manteniendo la misma curva frontera de forma que atraviese el espacio entre las placas del condensador.

En ese caso, la superficie no atraviesa físicamente el conductor.

Por tanto, a través de esa segunda superficie:

0\

$$

Si utilizáramos únicamente la ley de Ampère:

\mu_0I\_{\mathrm{enc}}\
$$

obtendríamos dos resultados diferentes para la misma curva $C$:

\mu_0I\

$$

si elegimos una superficie que corta el cable, pero:

0\
$$

si elegimos una superficie que pasa entre las placas.

Esto no puede ser correcto.

La circulación del campo magnético alrededor de una curva determinada no puede depender arbitrariamente de qué superficie matemática elijamos para calcularla.

---

# 83. La corriente de desplazamiento

Maxwell resolvió el problema introduciendo un nuevo término.

Entre las placas del condensador no existe corriente de conducción:

$$\
\mathbf{J}=0\
$$

pero sí existe un campo eléctrico variable:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\neq\
0\
$$

Maxwell identificó que este término debía contribuir a la generación del campo magnético.

Introdujo la denominada **densidad de corriente de desplazamiento**:

\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}
}\

$$

Por tanto, la corriente de desplazamiento total a través de una superficie es:

\varepsilon_0\
\frac{d\Phi_E}{dt}\
}\
$$

donde:

\int_S
\mathbf{E}\cdot d\mathbf{S}\

$$

La ley de Ampère puede entonces generalizarse como:

\mu_0\
\left(\
I\_{\mathrm{conducción}}\
+\
I_d\
\right)\
}\
$$

y, como:

\varepsilon_0
\frac{d\Phi_E}{dt}\

$$

obtenemos:

\mu_0I\
+\
\mu_0\varepsilon_0\
\frac{d\Phi_E}{dt}\
$$

Esta es la ley de Ampère-Maxwell.

---

# 84. La corriente de desplazamiento no es una corriente de cargas

El nombre puede inducir a error.

La corriente de desplazamiento:

\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$$

no representa necesariamente cargas moviéndose físicamente por el espacio.

Entre las placas ideales de un condensador:

$$\
\mathbf{J}=0\
$$$

pero:

$$\
\mathbf{J}\_d\
\neq\
0\
$$

porque el campo eléctrico está cambiando.

Por tanto, debemos distinguir:

### Corriente de conducción

Movimiento real de carga:

\rho\mathbf{v}\

$$

en una descripción macroscópica sencilla.

### Corriente de desplazamiento

Variación temporal del campo eléctrico:

\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

Ambas tienen las mismas unidades:

# [\mathbf{J}_d]

\frac{\mathrm{A}}{\mathrm{m}^2}\

$$

y ambas contribuyen a la circulación del campo magnético.

---

# 85. El campo eléctrico entre las placas del condensador

Consideremos un condensador plano ideal con placas de área $A$.

Entre las placas:

\frac{\sigma}{\varepsilon_0}\
\hat{\mathbf{n}}\
$$

donde:

\frac{Q}{A}\

$$

Por tanto:

\frac{Q}{\varepsilon_0A}\
$$

El flujo eléctrico entre las placas es:

EA\

$$

por tanto:

\frac{Q}{\varepsilon_0A}A\
$$

y:

\frac{Q}{\varepsilon_0}\

$$

Derivando respecto del tiempo:

\frac{1}{\varepsilon_0}\
\frac{dQ}{dt}\
$$

Multiplicando por $\varepsilon_0$:

\frac{dQ}{dt}\

$$

Pero:

I\
$$

Por tanto:

I
}\

$$

La corriente de desplazamiento entre las placas es exactamente igual a la corriente de conducción que llega al condensador, en el caso ideal.

Esta igualdad es lo que permite que la ley de Ampère-Maxwell proporcione el mismo campo magnético independientemente de la superficie elegida.

---

# 86. Resolución del problema de la superficie

Volvamos a la curva $C$ alrededor del cable del condensador.

Si elegimos una superficie que atraviesa el conductor:

I\
$$

y, aproximadamente fuera del condensador:

$$\
I_d\
\approx\
0\
$$

Por tanto:

I\

$$

Si elegimos una superficie que pasa entre las placas:

0\
$$

pero:

I\

$$

Por tanto:

I\
$$

En ambos casos:

I
}\

$$

y la circulación magnética es la misma:

\mu_0I\
$$

La inconsistencia desaparece.

---

# 87. La forma diferencial de Ampère-Maxwell

La ley completa es:

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}
}\

$$

Podemos agrupar los dos términos:

\mu_0\
\left(\
\mathbf{J}\
+\
\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
\right)\
$$

Definiendo la densidad de corriente total efectiva:

\mathbf{J}
+
\mathbf{J}_d\

$$

tenemos:

\mathbf{J}\
+\
\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

y:

\mu_0\mathbf{J}_{\mathrm{total}}
}\

$$

Esta forma es útil conceptualmente porque muestra que tanto la corriente de conducción como la variación temporal del campo eléctrico producen circulación magnética.

---

# 88. La conservación de la carga y la corrección de Maxwell

Podemos demostrar ahora matemáticamente por qué el término de Maxwell era necesario.

Partimos de:

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

Tomamos la divergencia:

\mu_0
\nabla\cdot\mathbf{J}
+
\mu_0\varepsilon_0
\nabla\cdot
\frac{\partial\mathbf{E}}{\partial t}\

$$

El lado izquierdo es cero:

\mu_0\
\nabla\cdot\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial}{\partial t}\
\left(\
\nabla\cdot\mathbf{E}\
\right)\
$$

Utilizamos ahora la ley de Gauss:

\frac{\rho}{\varepsilon_0}\

$$

Entonces:

\mu_0\
\nabla\cdot\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial}{\partial t}\
\left(\
\frac{\rho}{\varepsilon_0}\
\right)\
$$

Como $\varepsilon_0$ es constante:

\mu_0
\nabla\cdot\mathbf{J}
+
\mu_0
\frac{\partial\rho}{\partial t}\

$$

Dividiendo entre $\mu_0$:

\nabla\cdot\mathbf{J}\
+\
\frac{\partial\rho}{\partial t}\
$$

Por tanto:

0
}\

$$$

Hemos recuperado exactamente la ecuación de continuidad.

Esto es extraordinariamente importante.

La corrección de Maxwell no fue un término añadido arbitrariamente para "hacer funcionar" una ecuación.

El término:

$$\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$$

es precisamente el que permite que la ley de Ampère sea compatible con la conservación local de la carga.

---

# 89. El término de desplazamiento como simetría electromagnética

La ley de Ampère-Maxwell tiene una estructura especialmente interesante:

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$

Comparemos con Faraday:

-

\frac{\partial\mathbf{B}}{\partial t}\
$$

Tenemos:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{E}\
$$

y:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{B}\
$$

Los campos están, por tanto, dinámicamente acoplados.

Esta estructura es el corazón del electromagnetismo clásico.

---

# 90. El caso del vacío

Supongamos ahora que estamos en el vacío y no existen cargas ni corrientes:

0\

$$

0\
$$

Las cuatro ecuaciones de Maxwell quedan:

0
}\

$$

0\
}\
$$

*

\frac{\partial\mathbf{B}}{\partial t}
}\

$$

\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
}\
$$

Observemos algo sorprendente.

Aunque:

$$\
\rho=0\
$$

y:

$$\
\mathbf{J}=0\
$$

pueden existir campos:

$$\
\mathbf{E}\neq0\
$$

y:

$$\
\mathbf{B}\neq0\
$$

Los campos pueden sostenerse mutuamente mediante sus variaciones temporales.

Esto conduce directamente a las ondas electromagnéticas.

---

# 91. La propagación de una onda electromagnética

Partimos de:

*

\frac{\partial\mathbf{B}}{\partial t}\

$$

Tomamos el rotacional:

-

\frac{\partial}{\partial t}\
\left(\
\nabla\times\mathbf{B}\
\right)\
$$

En el vacío:

\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$

por lo que:

-

\mu_0\varepsilon_0\
\frac{\partial^2\mathbf{E}}{\partial t^2}\
$$

Utilizamos ahora la identidad vectorial:

\nabla^2\mathbf{E}\

$$

En el vacío:

0\
$$

por lo que:

*

\nabla^2\mathbf{E}\

$$

Así:

-

\mu_0\varepsilon_0\
\frac{\partial^2\mathbf{E}}{\partial t^2}\
$$

Cancelando el signo negativo:

\mu_0\varepsilon_0
\frac{\partial^2\mathbf{E}}{\partial t^2}
}\

$$

Esta es una **ecuación de onda**.

Análogamente se obtiene:

\mu_0\varepsilon_0\
\frac{\partial^2\mathbf{B}}{\partial t^2}\
}\
$$

Por tanto, las propias ecuaciones de Maxwell predicen que los campos eléctrico y magnético pueden propagarse como ondas.

---

# 92. La velocidad de propagación

La ecuación de onda tridimensional estándar tiene la forma:

\frac{1}{v^2}
\frac{\partial^2\mathbf{F}}{\partial t^2}\

$$

Comparando con:

\mu_0\varepsilon_0\
\frac{\partial^2\mathbf{E}}{\partial t^2}\
$$

obtenemos:

\mu_0\varepsilon_0\

$$

Por tanto:

\frac{1}{\sqrt{\mu_0\varepsilon_0}}\
}\
$$

Esta velocidad es:

$$\
v=c\
$$

la velocidad de la luz en el vacío.

Por tanto:

\frac{1}{\sqrt{\mu_0\varepsilon_0}}
}\

$$

Este resultado fue históricamente revolucionario.

Maxwell descubrió que las perturbaciones electromagnéticas se propagan con una velocidad que coincide con la velocidad conocida de la luz.

La conclusión fue:

> La luz es una onda electromagnética.

---

# 93. La unificación de la luz y el electromagnetismo

Antes de Maxwell, la electricidad, el magnetismo y la óptica se consideraban fenómenos relacionados pero conceptualmente diferenciados.

Las ecuaciones de Maxwell mostraron que:

\text{electromagnetismo}\
$$

y además:

\text{onda electromagnética}\

$$$

Por tanto, la óptica clásica queda integrada dentro del electromagnetismo.

Una onda luminosa consiste en campos:

$$\
\mathbf{E}(\mathbf{r},t)\
$$$

y:

$$\
\mathbf{B}(\mathbf{r},t)\
$$

que se propagan conjuntamente por el espacio.

---

# 94. La estructura completa de Maxwell en el vacío

Podemos observar ahora el sistema completo:

\frac{\rho}{\varepsilon_0}
}\

$$

0\
}\
$$

*

\frac{\partial\mathbf{B}}{\partial t}
}\

$$

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
}\
$$

Estas cuatro ecuaciones contienen una enorme cantidad de física.

Podemos interpretarlas como cuatro afirmaciones fundamentales:

### 1. Las cargas generan divergencia eléctrica

$$\
\rho\
\longrightarrow\
\nabla\cdot\mathbf{E}\
$$

### 2. No existen monopolos magnéticos

0\

$$$

### 3. Un campo magnético variable genera circulación eléctrica

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{E}\
$$$

### 4. Las corrientes y los campos eléctricos variables generan circulación magnética

$$\
\mathbf{J},\
\frac{\partial\mathbf{E}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{B}\
$$

Esta es la estructura fundamental del electromagnetismo clásico.

---

# 95. Las cuatro ecuaciones en forma integral

También es importante conservar simultáneamente la formulación integral.

## Ley de Gauss eléctrica

\frac{Q_{\mathrm{enc}}}{\varepsilon_0}
}\

$$

## Ley de Gauss magnética

0\
}\
$$

## Ley de Faraday

*

\frac{d}{dt}
\int_S
\mathbf{B}\cdot d\mathbf{S}
}\

$$

## Ley de Ampère-Maxwell

\mu_0\
\int_S\
\mathbf{J}\cdot d\mathbf{S}\
+\
\mu_0\varepsilon_0\
\frac{d}{dt}\
\int_S\
\mathbf{E}\cdot d\mathbf{S}\
}\
$$

Estas expresiones muestran una simetría matemática muy clara.

Las dos primeras están relacionadas con **flujo a través de superficies cerradas**.

Las dos últimas están relacionadas con **circulación alrededor de curvas cerradas**.

---

# 96. Tabla conceptual de las cuatro ecuaciones

| Ecuación        | Forma diferencial                                                                        | Significado principal                                                  |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Gauss eléctrica | $\nabla\cdot\mathbf{E}=\rho/\varepsilon_0$                                               | Las cargas son fuentes de $\mathbf{E}$                                 |
| Gauss magnética | $\nabla\cdot\mathbf{B}=0$                                                                | No existen monopolos magnéticos                                        |
| Faraday         | $\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$                                  | Un $\mathbf{B}$ variable genera circulación de $\mathbf{E}$            |
| Ampère-Maxwell  | $\nabla\times\mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\partial\mathbf{E}/\partial t$ | Corrientes y $\mathbf{E}$ variable generan circulación de $\mathbf{B}$ |

Una manera especialmente útil de memorizar la estructura es:

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\dfrac{\partial\mathbf{E}}{\partial t}
\end{array}
}\

$$

---

# 97. El papel de las fuentes

Podemos clasificar las ecuaciones según el tipo de estructura matemática que contienen.

Las ecuaciones de divergencia:

\frac{\rho}{\varepsilon_0}\
$$

y:

0\

$$

describen las fuentes de los campos.

Las ecuaciones de rotacional:

-

\frac{\partial\mathbf{B}}{\partial t}\
$$

y:

\mu_0\mathbf{J}
+
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}\

$$$

describen la circulación y el acoplamiento dinámico entre los campos.

Por tanto, Maxwell no proporciona simplemente cuatro fórmulas independientes.

Las cuatro ecuaciones constituyen un sistema acoplado.

---

# 98. La electricidad y el magnetismo dejan de ser fenómenos independientes

En electrostática podemos pensar en:

$$\
\rho\
\longrightarrow\
\mathbf{E}\
$$$

y en magnetostática:

$$\
\mathbf{J}\
\longrightarrow\
\mathbf{B}\
$$

Pero en electromagnetismo general tenemos:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\longrightarrow\
\mathbf{E}\
$$

y:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\longrightarrow\
\mathbf{B}\
$$

Por tanto, $\mathbf{E}$ y $\mathbf{B}$ no son dos campos completamente independientes.

Forman un único objeto físico más profundo:

$$\
\boxed{\text{campo electromagnético}}\
$$

La separación entre "campo eléctrico" y "campo magnético" depende además del sistema de referencia, algo que se comprenderá plenamente al estudiar relatividad especial.

---

# 99. Un punto fundamental: Maxwell no es solamente cuatro ecuaciones

Las cuatro ecuaciones de Maxwell son el núcleo del electromagnetismo clásico, pero para resolver problemas físicos reales necesitamos información adicional.

En particular, debemos conocer las propiedades del medio.

En el vacío aparecen:

$$\
\varepsilon_0\
$$

y:

$$\
\mu_0\
$$

En un medio material aparecen las relaciones constitutivas:

\mathbf{D}(\mathbf{E})\

$$

y:

\mathbf{H}(\mathbf{B})\
$$

En un medio lineal, homogéneo e isótropo:

\varepsilon\mathbf{E}\

$$

\mu\mathbf{H}\
$$

También puede existir una relación entre corriente y campo eléctrico:

\sigma\mathbf{E}\

$$$

en un conductor óhmico.

Estas relaciones no son las ecuaciones de Maxwell propiamente dichas.

Son **relaciones constitutivas** que describen cómo responde un determinado material ante los campos electromagnéticos.

---

# 100. Maxwell en términos de $\mathbf{D}$ y $\mathbf{H}$

En medios materiales resulta especialmente conveniente utilizar:

$$\
\mathbf{D}\
$$$

y:

$$\
\mathbf{H}\
$$

Las ecuaciones macroscópicas de Maxwell se escriben:

\rho_{\mathrm{libre}}
}\

$$

0\
}\
$$

*

\frac{\partial\mathbf{B}}{\partial t}
}\

$$

\mathbf{J}\_{\mathrm{libre}}\
+\
\frac{\partial\mathbf{D}}{\partial t}\
}\
$$

Esta formulación es especialmente útil en ingeniería electromagnética porque permite separar las cargas y corrientes libres de la respuesta electromagnética de los materiales.

En un medio lineal e isótropo:

\varepsilon\mathbf{E}\

$$

\mu\mathbf{H}\
$$

y, para un conductor lineal:

\sigma\mathbf{E}\

$$

Estas tres relaciones:

\varepsilon\mathbf{E}\
$$

\mu\mathbf{H}\

$$

\sigma\mathbf{E}\
$$

serán fundamentales en problemas de ondas, transmisión, materiales y electromagnetismo aplicado.

---

# 101. La forma macroscópica completa

En medios materiales, la formulación que utilizaremos habitualmente será:

\rho_f
}\

$$

0\
}\
$$

*

\frac{\partial\mathbf{B}}{\partial t}
}\

$$

\mathbf{J}\_f\
+\
\frac{\partial\mathbf{D}}{\partial t}\
}\
$$

donde el subíndice $f$ indica magnitudes asociadas a cargas o corrientes libres.

Es importante no mezclar indiscriminadamente esta formulación con la formulación microscópica en términos de $\mathbf{E}$ y $\mathbf{B}$.

Ambas describen electromagnetismo, pero están construidas a niveles diferentes:

* la descripción microscópica trabaja con las cargas y corrientes totales;
* la descripción macroscópica incorpora la respuesta colectiva de la materia en $\mathbf{D}$ y $\mathbf{H}$.

---

# 102. La cuarta ecuación como pieza que cierra el sistema

Ahora podemos comprender por qué la corrección de Maxwell fue tan importante.

Sin el término:

$$\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

tendríamos:

\mu_0\mathbf{J}\

$$

pero esto sería incompatible con la ecuación de continuidad para distribuciones de carga variables.

Con la corrección:

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
$$

se recupera:

0\

$$$

y además aparece el mecanismo necesario para que los campos eléctricos y magnéticos puedan propagarse en el vacío.

Por tanto, el término de desplazamiento tiene dos consecuencias fundamentales:

1. garantiza la consistencia matemática con la conservación de la carga;
2. permite la propagación autónoma de ondas electromagnéticas.

---

# 103. El sistema completo como una cadena de acoplamientos

Podemos visualizar el electromagnetismo dinámico de la siguiente forma:

$$\
\rho\
\longrightarrow\
\nabla\cdot\mathbf{E}\
$$$

$$\
\mathbf{J}\
\longrightarrow\
\nabla\times\mathbf{B}\
$$

pero además:

$$\
\frac{\partial\mathbf{B}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{E}\
$$

y:

$$\
\frac{\partial\mathbf{E}}{\partial t}\
\longrightarrow\
\nabla\times\mathbf{B}\
$$

Por tanto:

$$\
\mathbf{E}\
\overset{\partial/\partial t}{\longrightarrow}\
\mathbf{B}\
$$

y:

$$\
\mathbf{B}\
\overset{\partial/\partial t}{\longrightarrow}\
\mathbf{E}\
$$

Este acoplamiento permite que una perturbación electromagnética se mantenga y se propague incluso en ausencia de cargas y corrientes materiales.

---

# 104. La visión moderna del electromagnetismo

Las ecuaciones de Maxwell pueden verse como un sistema que determina la evolución del campo electromagnético a partir de:

* las cargas;
* las corrientes;
* las propiedades del medio;
* las condiciones iniciales;
* las condiciones de contorno.

En términos muy generales:

$$\
\boxed{\
\text{fuentes}\
+\
\text{medio}\
+\
\text{condiciones de contorno}\
\longrightarrow\
\mathbf{E},\mathbf{B}\
}\
$$

Pero las ecuaciones también establecen que los propios campos pueden influirse mutuamente:

$$\
\mathbf{E}\
\longleftrightarrow\
\mathbf{B}\
$$

Esta es la razón por la que el electromagnetismo es una teoría de campos y no simplemente una colección de leyes de fuerzas entre partículas.

---

# 105. Las cuatro ecuaciones fundamentales

Podemos cerrar esta primera visión completa de las ecuaciones de Maxwell escribiendo juntas sus formas diferenciales:

\frac{\rho}{\varepsilon_0}
}\

$$

0\
}\
$$

*

\frac{\partial\mathbf{B}}{\partial t}
}\

$$

\mu_0\mathbf{J}\
+\
\mu_0\varepsilon_0\
\frac{\partial\mathbf{E}}{\partial t}\
}\
$$

Y sus formas integrales:

\frac{Q_{\mathrm{enc}}}{\varepsilon_0}
}\

$$

0\
}\
$$

*

\frac{d\Phi_B}{dt}
}\

$$

\mu_0I\_{\mathrm{enc}}\
+\
\mu_0\varepsilon_0\
\frac{d\Phi_E}{dt}\
}\
$$

A partir de aquí ya conocemos el sistema fundamental.

Pero **esto no significa que hayamos terminado el estudio de las ecuaciones de Maxwell**.

Memorizar estas ocho expresiones sería solamente el comienzo.

Para alcanzar un nivel universitario avanzado todavía debemos estudiar cómo se utilizan realmente estas ecuaciones para obtener resultados físicos concretos.

Entre los desarrollos fundamentales que quedan están:

* las ecuaciones de Maxwell en medios materiales;
* las relaciones entre $\mathbf{E}$, $\mathbf{D}$, $\mathbf{B}$ y $\mathbf{H}$;
* condiciones de contorno en interfaces;
* conductores, dieléctricos y cargas superficiales;
* potencial escalar y potencial vector;
* libertad de gauge;
* energía electromagnética;
* teorema de Poynting;
* densidad de energía de los campos;
* potencia transportada por una onda;
* ondas electromagnéticas en el vacío;
* ondas en medios materiales;
* polarización;
* impedancia intrínseca;
* número de onda y constante de propagación;
* velocidad de fase;
* longitud de onda;
* ondas planas;
* relación entre $\mathbf{E}$, $\mathbf{H}$ y la dirección de propagación;
* reflexión y transmisión;
* ecuaciones de Helmholtz;
* aproximación fasorial;
* régimen sinusoidal permanente;
* y la relación entre las ecuaciones de Maxwell y la teoría de circuitos.


# Ondas electromagnéticas

Las ecuaciones de Maxwell no solo describen campos eléctricos y magnéticos estáticos o situaciones particulares. Una de sus consecuencias más importantes es que, cuando los campos varían con el tiempo, pueden propagarse por el espacio en forma de **ondas electromagnéticas**.

La idea fundamental puede resumirse así:

* un campo eléctrico variable genera un campo magnético;
* un campo magnético variable genera un campo eléctrico;
* esta interacción permite que la perturbación electromagnética se propague incluso en ausencia de materia.

En el vacío no necesitamos cargas que se desplacen para mantener la propagación. El propio acoplamiento entre $\mathbf{E}$ y $\mathbf{B}$ es suficiente.

---

## Ecuaciones de Maxwell en el vacío

Consideremos una región del espacio completamente libre de cargas y corrientes:

$$
\rho=0
$$

$$
\mathbf{J}=0
$$

Las ecuaciones de Maxwell quedan:

$$
\nabla\cdot\mathbf{E}=0
$$

$$
\nabla\cdot\mathbf{B}=0
$$

$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}
$$

$$
\nabla\times\mathbf{B}=\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
$$

Las dos ecuaciones de divergencia indican que, en el vacío sin cargas, los campos no presentan fuentes ni sumideros locales.

Las dos ecuaciones de rotacional son las que permiten la propagación:

$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}
$$

indica que una variación temporal del campo magnético genera circulación del campo eléctrico.

Por otro lado,

$$
\nabla\times\mathbf{B}=\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
$$

indica que una variación temporal del campo eléctrico genera circulación del campo magnético.

Por tanto, $\mathbf{E}$ y $\mathbf{B}$ están dinámicamente acoplados.

---

# Derivación de la ecuación de onda para el campo eléctrico

Partimos de la ley de Faraday:

$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}
$$

Aplicamos el operador rotacional a ambos lados:

$$
\nabla\times(\nabla\times\mathbf{E})
=
-\nabla\times\frac{\partial\mathbf{B}}{\partial t}
$$

Como las derivadas espaciales y temporales pueden intercambiarse para campos suficientemente regulares:

$$
\nabla\times\frac{\partial\mathbf{B}}{\partial t}
=
\frac{\partial}{\partial t}(\nabla\times\mathbf{B})
$$

Por tanto:

$$
\nabla\times(\nabla\times\mathbf{E})
=
-\frac{\partial}{\partial t}(\nabla\times\mathbf{B})
$$

Utilizamos ahora la identidad vectorial:

$$
\nabla\times(\nabla\times\mathbf{A})
=
\nabla(\nabla\cdot\mathbf{A})-\nabla^2\mathbf{A}
$$

Aplicándola a $\mathbf{E}$:

$$
\nabla\times(\nabla\times\mathbf{E})
=
\nabla(\nabla\cdot\mathbf{E})-\nabla^2\mathbf{E}
$$

En el vacío:

$$
\nabla\cdot\mathbf{E}=0
$$

por lo que:

$$
\nabla\times(\nabla\times\mathbf{E})
=
-\nabla^2\mathbf{E}
$$

Por otra parte, la ley de Ampère-Maxwell proporciona:

$$
\nabla\times\mathbf{B}
=
\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
$$

Sustituyendo:

$$
-\nabla^2\mathbf{E}
=
-\frac{\partial}{\partial t}
\left(
\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}
\right)
$$

Como $\mu_0$ y $\varepsilon_0$ son constantes:

$$
-\nabla^2\mathbf{E}
=
-\mu_0\varepsilon_0
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

Cancelando el signo negativo:

$$
\nabla^2\mathbf{E}
=
\mu_0\varepsilon_0
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

Esta es la **ecuación de onda electromagnética para el campo eléctrico en el vacío**.

Podemos escribirla en la forma estándar:

$$
\nabla^2\mathbf{E}
-
\mu_0\varepsilon_0
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

---

# Derivación de la ecuación de onda para el campo magnético

El procedimiento es completamente análogo.

Partimos de:

$$
\nabla\times\mathbf{B}
=
\mu_0\varepsilon_0
\frac{\partial\mathbf{E}}{\partial t}
$$

Aplicamos el rotacional:

$$
\nabla\times(\nabla\times\mathbf{B})
=
\mu_0\varepsilon_0
\nabla\times
\frac{\partial\mathbf{E}}{\partial t}
$$

Intercambiamos las derivadas:

$$
\nabla\times(\nabla\times\mathbf{B})
=
\mu_0\varepsilon_0
\frac{\partial}{\partial t}
(\nabla\times\mathbf{E})
$$

Utilizamos la identidad:

$$
\nabla\times(\nabla\times\mathbf{B})
=
\nabla(\nabla\cdot\mathbf{B})
-
\nabla^2\mathbf{B}
$$

Como:

$$
\nabla\cdot\mathbf{B}=0
$$

obtenemos:

$$
\nabla\times(\nabla\times\mathbf{B})
=
-\nabla^2\mathbf{B}
$$

Utilizando Faraday:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

queda:

$$
-\nabla^2\mathbf{B}
=
-\mu_0\varepsilon_0
\frac{\partial^2\mathbf{B}}{\partial t^2}
$$

Por tanto:

$$
\nabla^2\mathbf{B}
=
\mu_0\varepsilon_0
\frac{\partial^2\mathbf{B}}{\partial t^2}
$$

o equivalentemente:

$$
\nabla^2\mathbf{B}
-
\mu_0\varepsilon_0
\frac{\partial^2\mathbf{B}}{\partial t^2}
=
0
$$

Así, tanto $\mathbf{E}$ como $\mathbf{B}$ satisfacen una ecuación de onda.

---

# Identificación de la velocidad de propagación

La ecuación de onda escalar unidimensional tiene la forma:

$$
\frac{\partial^2\psi}{\partial z^2}
-
\frac{1}{v^2}
\frac{\partial^2\psi}{\partial t^2}
=
0
$$

Comparando con:

$$
\nabla^2\mathbf{E}
-
\mu_0\varepsilon_0
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

identificamos:

$$
\frac{1}{v^2}
=
\mu_0\varepsilon_0
$$

Por tanto:

$$
v=
\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

El valor de esta cantidad es:

$$
v=c
$$

donde $c$ es la velocidad de la luz en el vacío:

$$
c\approx3\times10^8\ \mathrm{m/s}
$$

Este resultado fue históricamente extraordinariamente importante.

Maxwell observó que las perturbaciones electromagnéticas se propagan con una velocidad que coincide con la velocidad conocida de la luz.

La conclusión fue revolucionaria:

> **La luz es una onda electromagnética.**

No se trata de una coincidencia numérica. La teoría electromagnética predice de manera natural la existencia de ondas cuya velocidad en el vacío es precisamente $c$.

---

# Forma unidimensional de la ecuación de onda

Para estudiar con mayor facilidad las ondas planas, supongamos que el campo solamente depende de una coordenada espacial, por ejemplo $z$.

Entonces:

$$
\mathbf{E}=\mathbf{E}(z,t)
$$

y la ecuación de onda puede escribirse como:

$$
\frac{\partial^2\mathbf{E}}{\partial z^2}
-
\frac{1}{c^2}
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

Una solución general de esta ecuación tiene la forma:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_+(z-ct)
+
\mathbf{E}_-(z+ct)
$$

La primera función representa una onda que se desplaza en la dirección $+z$.

La segunda representa una onda que se desplaza en la dirección $-z$.

Por ejemplo:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_0 f(z-ct)
$$

representa una onda que se desplaza hacia $+z$.

Mientras que:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_0 f(z+ct)
$$

representa una onda que se desplaza hacia $-z$.

---

# ¿Por qué $z-ct$ representa propagación hacia $+z$?

Este punto es fundamental y conviene entenderlo matemáticamente.

Supongamos:

$$
E(z,t)=f(z-ct)
$$

Para localizar una característica concreta de la onda, por ejemplo un máximo, debemos mantener constante el argumento:

$$
z-ct=\text{constante}
$$

Despejando:

$$
z=ct+\text{constante}
$$

Por tanto:

$$
\frac{dz}{dt}=c
$$

La posición aumenta con el tiempo.

La perturbación se desplaza hacia $+z$.

En cambio, para:

$$
E(z,t)=f(z+ct)
$$

tenemos:

$$
z+ct=\text{constante}
$$

de donde:

$$
z=-ct+\text{constante}
$$

y:

$$
\frac{dz}{dt}=-c
$$

Por tanto, la onda se desplaza hacia $-z$.

Esta relación será extremadamente importante cuando posteriormente trabajemos con expresiones como:

$$
\cos(\omega t-\beta z)
$$

o:

$$
\cos(\omega t+\beta z)
$$

---

# Ondas armónicas

Una solución especialmente importante de la ecuación de onda es la onda sinusoidal.

Consideremos:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_0
\cos(\omega t-\beta z+\phi)
$$

donde:

* $\mathbf{E}_0$ es el vector amplitud;
* $\omega$ es la frecuencia angular;
* $\beta$ es la constante de fase o número de onda;
* $\phi$ es la fase inicial.

La frecuencia angular está relacionada con la frecuencia mediante:

$$
\omega=2\pi f
$$

y la longitud de onda mediante:

$$
\beta=\frac{2\pi}{\lambda}
$$

En el vacío:

$$
\beta=\frac{\omega}{c}
$$

Por tanto:

$$
\omega=\beta c
$$

y también:

$$
c=f\lambda
$$

Esta última expresión es la conocida relación entre velocidad, frecuencia y longitud de onda.

---

# Interpretación de $\beta$

El parámetro $\beta$ mide cuánto cambia la fase espacialmente.

Consideremos:

$$
E(z,t)=E_0\cos(\omega t-\beta z)
$$

En un instante fijo $t$, si avanzamos una distancia $\Delta z$, la variación de fase es:

$$
\Delta\phi=-\beta\Delta z
$$

Si avanzamos una longitud de onda:

$$
\Delta z=\lambda
$$

entonces:

$$
\Delta\phi=-\beta\lambda
$$

Como:

$$
\beta=\frac{2\pi}{\lambda}
$$

obtenemos:

$$
\Delta\phi=-2\pi
$$

Es decir, después de recorrer una longitud de onda, la onda vuelve a encontrarse en la misma fase.

Por ello:

$$
\lambda=\frac{2\pi}{\beta}
$$

---

# Interpretación de $\omega$

El parámetro $\omega$ determina la rapidez con la que cambia la fase temporalmente.

Si mantenemos fija la posición:

$$
E(t)=E_0\cos(\omega t-\beta z)
$$

la fase cambia según:

$$
\phi(t)=\omega t-\beta z
$$

Durante un periodo $T$, la fase aumenta $2\pi$:

$$
\omega T=2\pi
$$

por lo que:

$$
\omega=\frac{2\pi}{T}
$$

y dado que:

$$
f=\frac{1}{T}
$$

obtenemos:

$$
\omega=2\pi f
$$

---

# Frente de onda

Una forma muy útil de interpretar una onda electromagnética consiste en estudiar superficies de fase constante.

Para:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_0
\cos(\omega t-\beta z+\phi)
$$

un frente de onda se caracteriza por:

$$
\omega t-\beta z+\phi=\text{constante}
$$

Despejando $z$:

$$
z=\frac{\omega}{\beta}t+\text{constante}
$$

Por tanto, la velocidad de propagación es:

$$
v_p=\frac{\omega}{\beta}
$$

Esta es la **velocidad de fase**.

En el vacío:

$$
v_p=c
$$

Más adelante veremos que en un medio material:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

para un medio lineal, homogéneo, isotrópico y sin pérdidas.

---

# La dirección de propagación y el vector de onda

Hasta ahora hemos utilizado una propagación exclusivamente en la dirección $z$.

Para describir una onda que pueda propagarse en cualquier dirección necesitamos introducir el **vector de onda**:

$$
\mathbf{k}
$$

El vector de onda apunta en la dirección de propagación y su módulo es:

$$
|\mathbf{k}|=\beta=\frac{2\pi}{\lambda}
$$

Una onda plana armónica puede escribirse entonces como:

$$
\mathbf{E}(\mathbf{r},t)
=
\mathbf{E}_0
\cos(\omega t-\mathbf{k}\cdot\mathbf{r}+\phi)
$$

donde:

$$
\mathbf{r}=x\hat{\mathbf{x}}+y\hat{\mathbf{y}}+z\hat{\mathbf{z}}
$$

y:

$$
\mathbf{k}
=
k_x\hat{\mathbf{x}}
+
k_y\hat{\mathbf{y}}
+
k_z\hat{\mathbf{z}}
$$

El producto escalar:

$$
\mathbf{k}\cdot\mathbf{r}
$$

determina la variación espacial de la fase.

Si la onda se propaga en dirección $+z$:

$$
\mathbf{k}=\beta\hat{\mathbf{z}}
$$

y entonces:

$$
\mathbf{k}\cdot\mathbf{r}=\beta z
$$

recuperando:

$$
\mathbf{E}(\mathbf{r},t)
=
\mathbf{E}_0
\cos(\omega t-\beta z+\phi)
$$

---

# ¿Qué significa que una onda sea plana?

Una onda plana es una onda cuyos frentes de fase constante son planos.

Partimos de:

$$
\omega t-\mathbf{k}\cdot\mathbf{r}=\text{constante}
$$

Para un instante $t$ determinado:

$$
\mathbf{k}\cdot\mathbf{r}=\text{constante}
$$

Esta es precisamente la ecuación de un plano perpendicular a $\mathbf{k}$.

Por tanto:

> **El vector de onda $\mathbf{k}$ es perpendicular a los frentes de onda.**

Esta propiedad será fundamental para entender la geometría de las ondas electromagnéticas.

---

# Transversalidad de las ondas electromagnéticas

Una de las propiedades más importantes de una onda electromagnética en un medio homogéneo sin fuentes es que los campos son transversales a la dirección de propagación.

Consideremos una onda que se propaga en $+z$:

$$
\mathbf{k}=\beta\hat{\mathbf{z}}
$$

En el vacío tenemos:

$$
\nabla\cdot\mathbf{E}=0
$$

Para una onda plana, esta condición conduce a:

$$
\mathbf{k}\cdot\mathbf{E}_0=0
$$

Por tanto:

$$
\mathbf{E}_0\perp\mathbf{k}
$$

Como $\mathbf{k}$ indica la dirección de propagación:

$$
\mathbf{E}\perp\text{dirección de propagación}
$$

De forma análoga:

$$
\mathbf{k}\cdot\mathbf{B}_0=0
$$

y por tanto:

$$
\mathbf{B}_0\perp\mathbf{k}
$$

Así, para una onda plana electromagnética:

$$
\mathbf{E}\perp\mathbf{B}
$$

y ambos campos son perpendiculares a la dirección de propagación.

Por ejemplo, si la onda se propaga en $+z$, podemos tener:

$$
\mathbf{E}=E_x\hat{\mathbf{x}}
$$

y:

$$
\mathbf{B}=B_y\hat{\mathbf{y}}
$$

con:

$$
\mathbf{k}\parallel\hat{\mathbf{z}}
$$

La geometría es entonces:

$$
\mathbf{E}\perp\mathbf{B}
$$

$$
\mathbf{E}\perp\mathbf{k}
$$

$$
\mathbf{B}\perp\mathbf{k}
$$

---

# Relación vectorial entre $\mathbf{E}$ y $\mathbf{B}$

Podemos obtener una relación más profunda entre los campos a partir de las ecuaciones de Maxwell.

Consideremos una onda plana:

$$
\mathbf{E}(\mathbf{r},t)
=
\mathbf{E}_0
\cos(\omega t-\mathbf{k}\cdot\mathbf{r})
$$

y:

$$
\mathbf{B}(\mathbf{r},t)
=
\mathbf{B}_0
\cos(\omega t-\mathbf{k}\cdot\mathbf{r})
$$

Utilizando la ley de Faraday:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

para una onda plana se obtiene:

$$
\mathbf{k}\times\mathbf{E}_0
=
\omega\mathbf{B}_0
$$

Por tanto:

$$
\mathbf{B}_0
=
\frac{1}{\omega}
\mathbf{k}\times\mathbf{E}_0
$$

Como:

$$
|\mathbf{k}|=\beta
$$

y $\mathbf{k}$ es perpendicular a $\mathbf{E}_0$:

$$
B_0
=
\frac{\beta}{\omega}E_0
$$

En el vacío:

$$
\beta=\frac{\omega}{c}
$$

por lo que:

$$
B_0=\frac{E_0}{c}
$$

o:

$$
E_0=cB_0
$$

Esta relación es fundamental.

---

# Relación entre $\mathbf{E}$ y $\mathbf{H}$

En ingeniería electromagnética es frecuente trabajar con $\mathbf{H}$ en lugar de $\mathbf{B}$.

En el vacío:

$$
\mathbf{B}=\mu_0\mathbf{H}
$$

Por tanto:

$$
E_0=cB_0
$$

implica:

$$
E_0=c\mu_0H_0
$$

Como:

$$
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

tenemos:

$$
c\mu_0
=
\sqrt{\frac{\mu_0}{\varepsilon_0}}
$$

Definimos la **impedancia intrínseca del vacío**:

$$
\eta_0
=
\sqrt{\frac{\mu_0}{\varepsilon_0}}
$$

cuyo valor es aproximadamente:

$$
\eta_0\approx377\ \Omega
$$

Por tanto:

$$
E_0=\eta_0H_0
$$

o equivalentemente:

$$
H_0=\frac{E_0}{\eta_0}
$$

Esta relación será especialmente importante cuando pasemos al análisis de ondas electromagnéticas en medios materiales.

---

# La regla vectorial de propagación

La relación entre los campos puede expresarse elegantemente mediante productos vectoriales.

Para una onda plana:

$$
\mathbf{B}
=
\frac{1}{\omega}
\mathbf{k}\times\mathbf{E}
$$

Como:

$$
\mathbf{B}=\mu\mathbf{H}
$$

en un medio:

$$
\mathbf{H}
=
\frac{1}{\omega\mu}
\mathbf{k}\times\mathbf{E}
$$

Si definimos el vector unitario en la dirección de propagación:

$$
\hat{\mathbf{k}}
=
\frac{\mathbf{k}}{|\mathbf{k}|}
$$

entonces:

$$
\mathbf{H}
=
\frac{1}{\eta}
\hat{\mathbf{k}}\times\mathbf{E}
$$

donde $\eta$ es la impedancia intrínseca del medio.

Equivalentemente:

$$
\mathbf{E}
=
-\eta\hat{\mathbf{k}}\times\mathbf{H}
$$

Estas expresiones contienen simultáneamente:

* la dirección de $\mathbf{E}$;
* la dirección de $\mathbf{H}$;
* la dirección de propagación;
* la relación entre sus amplitudes.

---

# La terna $\mathbf{E}$, $\mathbf{H}$ y $\mathbf{k}$

Para una onda que se propaga en $+z$, podemos elegir:

$$
\mathbf{E}=E_x\hat{\mathbf{x}}
$$

Entonces:

$$
\mathbf{H}
=
\frac{1}{\eta}
\hat{\mathbf{z}}\times
E_x\hat{\mathbf{x}}
$$

Como:

$$
\hat{\mathbf{z}}\times\hat{\mathbf{x}}
=
\hat{\mathbf{y}}
$$

resulta:

$$
\mathbf{H}
=
\frac{E_x}{\eta}\hat{\mathbf{y}}
$$

Tenemos entonces:

$$
\mathbf{E}\parallel\hat{\mathbf{x}}
$$

$$
\mathbf{H}\parallel\hat{\mathbf{y}}
$$

$$
\mathbf{k}\parallel\hat{\mathbf{z}}
$$

Es decir:

$$
\hat{\mathbf{x}}\times\hat{\mathbf{y}}
=
\hat{\mathbf{z}}
$$

La dirección de propagación coincide con:

$$
\mathbf{E}\times\mathbf{H}
$$

Esta propiedad será crucial cuando estudiemos el vector de Poynting y el transporte de energía electromagnética.

---

# Ondas electromagnéticas en medios materiales

Hasta ahora hemos trabajado en el vacío.

En un medio material aparecen nuevas magnitudes:

* permitividad $\varepsilon$;
* permeabilidad $\mu$;
* conductividad $\sigma$.

Las relaciones constitutivas, para un medio lineal, homogéneo e isótropo, son:

$$
\mathbf{D}=\varepsilon\mathbf{E}
$$

$$
\mathbf{B}=\mu\mathbf{H}
$$

$$
\mathbf{J}=\sigma\mathbf{E}
$$

En un medio no magnético suele cumplirse aproximadamente:

$$
\mu\approx\mu_0
$$

mientras que:

$$
\varepsilon=\varepsilon_r\varepsilon_0
$$

donde $\varepsilon_r$ es la permitividad relativa.

---

# Ecuaciones de Maxwell en un medio material

En términos de los campos macroscópicos:

$$
\nabla\cdot\mathbf{D}=\rho_f
$$

$$
\nabla\cdot\mathbf{B}=0
$$

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

$$
\nabla\times\mathbf{H}
=
\mathbf{J}_f
+
\frac{\partial\mathbf{D}}{\partial t}
$$

donde $\rho_f$ y $\mathbf{J}_f$ representan densidad de carga libre y densidad de corriente libre.

Para un medio lineal:

$$
\mathbf{D}=\varepsilon\mathbf{E}
$$

$$
\mathbf{B}=\mu\mathbf{H}
$$

y, si existe conducción:

$$
\mathbf{J}=\sigma\mathbf{E}
$$

La ley de Ampère-Maxwell queda entonces:

$$
\nabla\times\mathbf{H}
=
\sigma\mathbf{E}
+
\varepsilon
\frac{\partial\mathbf{E}}{\partial t}
$$

Esta ecuación muestra que el campo magnético puede ser generado por dos mecanismos:

1. la corriente de conducción $\mathbf{J}=\sigma\mathbf{E}$;
2. la corriente de desplazamiento $\varepsilon\partial\mathbf{E}/\partial t$.

---

# Ecuación de onda en un medio sin pérdidas

Consideremos primero un medio:

* lineal;
* homogéneo;
* isótropo;
* sin pérdidas;
* sin cargas libres;
* sin corrientes libres.

Entonces:

$$
\rho_f=0
$$

$$
\mathbf{J}_f=0
$$

y:

$$
\mathbf{D}=\varepsilon\mathbf{E}
$$

$$
\mathbf{B}=\mu\mathbf{H}
$$

Las ecuaciones de Maxwell relevantes quedan:

$$
\nabla\times\mathbf{E}
=
-\mu\frac{\partial\mathbf{H}}{\partial t}
$$

$$
\nabla\times\mathbf{H}
=
\varepsilon\frac{\partial\mathbf{E}}{\partial t}
$$

Además:

$$
\nabla\cdot\mathbf{E}=0
$$

si $\varepsilon$ es constante.

Aplicamos el rotacional a Faraday:

$$
\nabla\times(\nabla\times\mathbf{E})
=
-\mu
\frac{\partial}{\partial t}
(\nabla\times\mathbf{H})
$$

Sustituyendo Ampère-Maxwell:

$$
\nabla\times(\nabla\times\mathbf{E})
=
-\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

Utilizamos:

$$
\nabla\times(\nabla\times\mathbf{E})
=
\nabla(\nabla\cdot\mathbf{E})
-
\nabla^2\mathbf{E}
$$

Como:

$$
\nabla\cdot\mathbf{E}=0
$$

obtenemos:

$$
-\nabla^2\mathbf{E}
=
-\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

y finalmente:

$$
\nabla^2\mathbf{E}
=
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

o:

$$
\nabla^2\mathbf{E}
-
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

De forma análoga:

$$
\nabla^2\mathbf{H}
-
\mu\varepsilon
\frac{\partial^2\mathbf{H}}{\partial t^2}
=
0
$$

---

# Velocidad de propagación en un medio

Comparando:

$$
\nabla^2\mathbf{E}
-
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

con la ecuación de onda:

$$
\nabla^2\mathbf{E}
-
\frac{1}{v^2}
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

obtenemos:

$$
v=
\frac{1}{\sqrt{\mu\varepsilon}}
$$

Por tanto, la velocidad de fase en un medio sin pérdidas es:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

Si:

$$
\mu=\mu_r\mu_0
$$

y:

$$
\varepsilon=\varepsilon_r\varepsilon_0
$$

entonces:

$$
v_p
=
\frac{1}
{\sqrt{\mu_r\mu_0\varepsilon_r\varepsilon_0}}
$$

Como:

$$
c=
\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

resulta:

$$
v_p=
\frac{c}{\sqrt{\mu_r\varepsilon_r}}
$$

Para un medio aproximadamente no magnético:

$$
\mu_r\approx1
$$

por lo que:

$$
v_p\approx\frac{c}{\sqrt{\varepsilon_r}}
$$

Este resultado será especialmente importante para problemas en los que se proporciona directamente $\varepsilon_r$.

Por ejemplo, si:

$$
\varepsilon_r=4
$$

y:

$$
\mu_r=1
$$

entonces:

$$
v_p=\frac{c}{2}
$$

La onda se propaga a la mitad de la velocidad que tendría en el vacío.

---

# Constante de propagación

Para una onda armónica en un medio sin pérdidas:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_0
\cos(\omega t-\beta z)
$$

la velocidad de fase es:

$$
v_p=\frac{\omega}{\beta}
$$

Como:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

tenemos:

$$
\frac{\omega}{\beta}
=
\frac{1}{\sqrt{\mu\varepsilon}}
$$

y por tanto:

$$
\beta
=
\omega\sqrt{\mu\varepsilon}
$$

Esta expresión es fundamental:

$$
\beta=\omega\sqrt{\mu\varepsilon}
$$

En términos de la frecuencia:

$$
\omega=2\pi f
$$

por lo que:

$$
\beta
=
2\pi f\sqrt{\mu\varepsilon}
$$

También podemos escribir:

$$
\beta=\frac{2\pi}{\lambda}
$$

y por tanto:

$$
\lambda
=
\frac{2\pi}{\beta}
$$

Combinando las expresiones:

$$
\lambda
=
\frac{1}{f\sqrt{\mu\varepsilon}}
$$

o, equivalentemente:

$$
\lambda=\frac{v_p}{f}
$$

---

# Impedancia intrínseca de un medio sin pérdidas

La relación entre los campos eléctricos y magnéticos también cambia cuando pasamos del vacío a un medio material.

Para una onda plana:

$$
\mathbf{H}
=
\frac{1}{\eta}
\hat{\mathbf{k}}\times\mathbf{E}
$$

donde:

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$

es la **impedancia intrínseca del medio**.

Por tanto, en magnitud:

$$
\frac{E_0}{H_0}
=
\eta
$$

es decir:

$$
E_0=\eta H_0
$$

En el vacío:

$$
\eta_0
=
\sqrt{\frac{\mu_0}{\varepsilon_0}}
\approx377\ \Omega
$$

En un medio no magnético:

$$
\eta
=
\sqrt{\frac{\mu_0}{\varepsilon_r\varepsilon_0}}
$$

por lo que:

$$
\eta
=
\frac{\eta_0}{\sqrt{\varepsilon_r}}
$$

Si:

$$
\varepsilon_r=4
$$

entonces:

$$
\eta=\frac{\eta_0}{2}
$$

y aproximadamente:

$$
\eta\approx188.5\ \Omega
$$

Esto significa que, para una misma amplitud de campo eléctrico, el campo magnético $H$ será mayor en este medio que en el vacío.

---

# Resumen geométrico de una onda plana uniforme

Para una onda que se propaga en la dirección $+z$ podemos tener:

$$
\mathbf{E}(z,t)
=
E_0\cos(\omega t-\beta z)\hat{\mathbf{x}}
$$

y:

$$
\mathbf{H}(z,t)
=
\frac{E_0}{\eta}
\cos(\omega t-\beta z)\hat{\mathbf{y}}
$$

La estructura espacial es:

$$
\mathbf{E}\parallel\hat{\mathbf{x}}
$$

$$
\mathbf{H}\parallel\hat{\mathbf{y}}
$$

$$
\mathbf{k}\parallel\hat{\mathbf{z}}
$$

y:

$$
\mathbf{E}\times\mathbf{H}
\parallel\hat{\mathbf{z}}
$$

Las magnitudes están relacionadas por:

$$
\frac{E_0}{H_0}=\eta
$$

La velocidad de fase es:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

La constante de fase es:

$$
\beta=\omega\sqrt{\mu\varepsilon}
$$

y la longitud de onda:

$$
\lambda=\frac{2\pi}{\beta}
$$

Estas relaciones constituyen la base matemática de prácticamente todos los problemas elementales y muchos problemas avanzados de propagación de ondas electromagnéticas.

---

# Representación fasorial de una onda plana

Cuando los campos son sinusoidales en régimen permanente, resulta extremadamente conveniente abandonar temporalmente la representación explícita mediante senos y cosenos y utilizar **fasores**.

Supongamos:

$$
\mathbf{E}(z,t)
=
\mathbf{E}_0
\cos(\omega t-\beta z)
$$

Podemos escribir:

$$
\mathbf{E}(z,t)
=
\operatorname{Re}
\left\{
\mathbf{E}_0
e^{j(\omega t-\beta z)}
\right\}
$$

Separando la dependencia temporal:

$$
\mathbf{E}(z,t)
=
\operatorname{Re}
\left\{
\mathbf{E}_0
e^{-j\beta z}
e^{j\omega t}
\right\}
$$

Definimos el fasor:

$$
\tilde{\mathbf{E}}(z)
=
\mathbf{E}_0e^{-j\beta z}
$$

de modo que:

$$
\mathbf{E}(z,t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}(z)e^{j\omega t}
\right\}
$$

De forma análoga:

$$
\tilde{\mathbf{H}}(z)
=
\mathbf{H}_0e^{-j\beta z}
$$

Esta representación será esencial para trabajar con:

* ondas sinusoidales;
* desfases;
* reflexión;
* transmisión;
* impedancias;
* líneas de transmisión;
* polarización;
* potencia media;
* ondas estacionarias.

En particular, transforma derivadas temporales en multiplicaciones por $j\omega$:

$$
\frac{\partial}{\partial t}
\longrightarrow
j\omega
$$

y derivadas espaciales de una onda plana en multiplicaciones por $-j\beta$ cuando la dependencia espacial es $e^{-j\beta z}$.

Esto permite transformar las ecuaciones diferenciales de Maxwell en ecuaciones algebraicas mucho más manejables.

---

# Significado físico de la notación fasorial

Es importante entender que el fasor **no es un campo físico diferente**.

El campo físico sigue siendo:

$$
\mathbf{E}(z,t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}(z)e^{j\omega t}
\right\}
$$

El fasor simplemente elimina de la representación la dependencia temporal común $e^{j\omega t}$.

Por ejemplo, si:

$$
\tilde{\mathbf{E}}(z)
=
E_0e^{-j\beta z}\hat{\mathbf{x}}
$$

entonces:

$$
\mathbf{E}(z,t)
=
E_0
\cos(\omega t-\beta z)
\hat{\mathbf{x}}
$$

La notación fasorial es especialmente poderosa porque permite representar simultáneamente amplitud y fase mediante números complejos.

---

# Convención temporal

Existe una cuestión de notación que será importante mantener consistente.

Podemos utilizar la convención:

$$
e^{j\omega t}
$$

En ese caso, una onda que se propaga hacia $+z$ se representa mediante:

$$
e^{-j\beta z}
$$

y por tanto:

$$
e^{j\omega t}e^{-j\beta z}
=
e^{j(\omega t-\beta z)}
$$

Por otro lado, si se utiliza la convención temporal:

$$
e^{-j\omega t}
$$

la onda hacia $+z$ se escribiría como:

$$
e^{j\beta z}e^{-j\omega t}
$$

Ambas convenciones son válidas.

Lo importante es **no mezclarlas** dentro del mismo problema.

A partir de aquí, salvo indicación contraria, utilizaremos:

$$
e^{j\omega t}
$$

como convención temporal.

---

# Maxwell en régimen fasorial

Consideremos un medio lineal, homogéneo e isótropo, y campos sinusoidales con dependencia temporal:

$$
e^{j\omega t}
$$

Las ecuaciones de Maxwell:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

y:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\frac{\partial\mathbf{D}}{\partial t}
$$

se convierten en:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\mu\tilde{\mathbf{H}}
$$

y:

$$
\nabla\times\tilde{\mathbf{H}}
=
(\sigma+j\omega\varepsilon)
\tilde{\mathbf{E}}
$$

Aquí aparece una combinación extremadamente importante:

$$
\sigma+j\omega\varepsilon
$$

El término $\sigma$ representa conducción.

El término $j\omega\varepsilon$ representa corriente de desplazamiento.

La comparación entre ambos determinará si el medio se comporta predominantemente como conductor o como dieléctrico.

---

# Medios con pérdidas

Hasta ahora hemos supuesto:

$$
\sigma=0
$$

Pero en un medio real normalmente puede existir conductividad.

Entonces:

$$
\mathbf{J}=\sigma\mathbf{E}
$$

y Ampère-Maxwell queda:

$$
\nabla\times\mathbf{H}
=
\sigma\mathbf{E}
+
\varepsilon
\frac{\partial\mathbf{E}}{\partial t}
$$

En fasores:

$$
\nabla\times\tilde{\mathbf{H}}
=
(\sigma+j\omega\varepsilon)
\tilde{\mathbf{E}}
$$

La presencia de $\sigma$ provoca que la onda pierda energía a medida que se propaga.

Por eso la constante de propagación deja de ser simplemente real.

Se introduce entonces:

$$
\gamma=\alpha+j\beta
$$

donde:

* $\alpha$ es la **constante de atenuación**;
* $\beta$ es la **constante de fase**.

Una onda que se propaga hacia $+z$ se representa como:

$$
\tilde{\mathbf{E}}(z)
=
\mathbf{E}_0e^{-\gamma z}
$$

es decir:

$$
\tilde{\mathbf{E}}(z)
=
\mathbf{E}_0e^{-\alpha z}e^{-j\beta z}
$$

El primer factor:

$$
e^{-\alpha z}
$$

representa la disminución de amplitud.

El segundo:

$$
e^{-j\beta z}
$$

representa la evolución de fase.

Por tanto, en un medio con pérdidas, la onda no solo cambia de fase al propagarse: también disminuye su amplitud.

---

# Constante de propagación general

En un medio lineal, homogéneo e isótropo:

$$
\gamma
=
\sqrt{j\omega\mu(\sigma+j\omega\varepsilon)}
$$

Esta expresión contiene toda la información básica sobre la propagación:

$$
\gamma=\alpha+j\beta
$$

A partir de $\gamma$ podemos determinar:

* atenuación;
* fase;
* longitud de onda;
* velocidad de fase;
* profundidad de penetración en buenos conductores;
* comportamiento del campo con la distancia.

En un medio sin pérdidas:

$$
\sigma=0
$$

entonces:

$$
\gamma
=
\sqrt{j\omega\mu(j\omega\varepsilon)}
$$

Como:

$$
j^2=-1
$$

resulta:

$$
\gamma
=
j\omega\sqrt{\mu\varepsilon}
$$

Por tanto:

$$
\alpha=0
$$

y:

$$
\beta=\omega\sqrt{\mu\varepsilon}
$$

Esto recupera exactamente el resultado obtenido mediante la ecuación de onda.

---

# Dieléctrico ideal frente a conductor

La comparación entre:

$$
\sigma
$$

y:

$$
\omega\varepsilon
$$

permite determinar qué mecanismo domina.

Si:

$$
\sigma\ll\omega\varepsilon
$$

el medio se comporta aproximadamente como un **buen dieléctrico**.

Si:

$$
\sigma\gg\omega\varepsilon
$$

el medio se comporta aproximadamente como un **buen conductor**.

La cantidad:

$$
\frac{\sigma}{\omega\varepsilon}
$$

es, por tanto, un parámetro fundamental.

Este cociente compara la corriente de conducción con la corriente de desplazamiento.

---

# Relación entre todos los parámetros fundamentales

Para una onda plana en un medio homogéneo sin pérdidas:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

$$
\beta=\omega\sqrt{\mu\varepsilon}
$$

$$
\lambda=\frac{2\pi}{\beta}
$$

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$

$$
\frac{E_0}{H_0}=\eta
$$

y:

$$
\omega=2\pi f
$$

Por tanto:

$$
v_p=f\lambda
$$

y:

$$
\beta=\frac{2\pi}{\lambda}
$$

Estas expresiones no son relaciones independientes arbitrarias. Todas proceden de las ecuaciones de Maxwell y de las propiedades constitutivas del medio.

---

# Visión global

Llegados a este punto podemos interpretar una onda electromagnética desde varios niveles.

### Desde el punto de vista de Maxwell

Un campo eléctrico variable genera un campo magnético:

$$
\frac{\partial\mathbf{E}}{\partial t}
\longrightarrow
\mathbf{H}
$$

y un campo magnético variable genera un campo eléctrico:

$$
\frac{\partial\mathbf{H}}{\partial t}
\longrightarrow
\mathbf{E}
$$

### Desde el punto de vista de la ecuación de onda

Los campos satisfacen:

$$
\nabla^2\mathbf{E}
-
\frac{1}{v_p^2}
\frac{\partial^2\mathbf{E}}{\partial t^2}
=
0
$$

y:

$$
\nabla^2\mathbf{H}
-
\frac{1}{v_p^2}
\frac{\partial^2\mathbf{H}}{\partial t^2}
=
0
$$

### Desde el punto de vista geométrico

En una onda plana:

$$
\mathbf{E}\perp\mathbf{H}
$$

y:

$$
\mathbf{E}\perp\mathbf{k}
$$

$$
\mathbf{H}\perp\mathbf{k}
$$

### Desde el punto de vista energético

La dirección de propagación de la energía está asociada a:

$$
\mathbf{E}\times\mathbf{H}
$$

### Desde el punto de vista de ingeniería

Los parámetros fundamentales son:

$$
\varepsilon,\qquad\mu,\qquad\sigma
$$

a partir de los cuales se obtienen:

$$
v_p,\qquad\beta,\qquad\eta,\qquad\gamma,\qquad\alpha
$$

Esta conexión entre Maxwell, geometría, propagación, fase, impedancia y energía es la base sobre la que se construye todo el estudio de ondas electromagnéticas

# Condiciones de contorno de los campos electromagnéticos

Hasta ahora hemos estudiado ondas electromagnéticas propagándose en un medio homogéneo. El siguiente paso natural es preguntarnos qué sucede cuando la onda llega a una región en la que cambian las propiedades electromagnéticas del medio.

Por ejemplo:

* aire → vidrio;
* vacío → dieléctrico;
* aire → agua;
* dieléctrico 1 → dieléctrico 2;
* aire → metal.

En general, al cambiar el medio cambian:

$$
\varepsilon
$$

$$
\mu
$$

y eventualmente:

$$
\sigma
$$

Como consecuencia, cambian también:

$$
v_p
$$

$$
\beta
$$

$$
\eta
$$

y, si existen pérdidas:

$$
\gamma
$$

La onda incidente no puede simplemente continuar sin modificaciones. En una interfaz aparecen, en general:

* una **onda reflejada** que vuelve al primer medio;
* una **onda transmitida** que penetra en el segundo medio.

La descripción matemática de este fenómeno comienza con las **condiciones de contorno de Maxwell**.

---

# La interfaz entre dos medios

Consideremos dos medios separados por una superficie.

Denominaremos:

* medio 1 al medio de incidencia;
* medio 2 al medio de transmisión.

Supongamos inicialmente que la interfaz es el plano:

$$
z=0
$$

con:

$$
z<0
$$

correspondiente al medio 1 y:

$$
z>0
$$

correspondiente al medio 2.

Podemos representarlo conceptualmente como:

```text
                 Medio 2
             z > 0
                 
                 ↑
                 │
─────────────────┼─────────────────  z = 0
                 │
                 ↓
                 
             Medio 1
             z < 0
```

Las propiedades electromagnéticas pueden ser diferentes:

$$
\varepsilon_1,\mu_1,\sigma_1
$$

frente a:

$$
\varepsilon_2,\mu_2,\sigma_2
$$

Nuestro objetivo será determinar qué relaciones deben satisfacer los campos inmediatamente a ambos lados de la interfaz.

---

# ¿De dónde salen las condiciones de contorno?

Las condiciones de contorno no son leyes adicionales independientes de Maxwell.

Se obtienen directamente a partir de las formas integrales de las ecuaciones de Maxwell.

Las cuatro condiciones fundamentales proceden de:

1. ley de Gauss para $\mathbf{D}$;
2. ley de Gauss para $\mathbf{B}$;
3. ley de Faraday;
4. ley de Ampère-Maxwell.

Cada ecuación proporciona información sobre una componente diferente de los campos.

---

# Condición de contorno para $\mathbf{D}$

Partimos de:

$$
\nabla\cdot\mathbf{D}=\rho_f
$$

En forma integral:

$$
\oint_S\mathbf{D}\cdot d\mathbf{S}
=
Q_{f,\mathrm{enc}}
$$

Para obtener la condición de contorno utilizamos una pequeña superficie cilíndrica o "pastilla" que atraviesa la interfaz.

La altura del cilindro se hace tender a cero.

Las contribuciones procedentes de la superficie lateral desaparecen en el límite y solamente permanecen las dos caras.

Si $\hat{\mathbf{n}}$ es el vector normal dirigido del medio 1 al medio 2:

$$
\hat{\mathbf{n}}\cdot\mathbf{D}_2
-
\hat{\mathbf{n}}\cdot\mathbf{D}_1
=
\rho_s
$$

donde $\rho_s$ es la densidad superficial de carga libre.

Por tanto:

$$
\hat{\mathbf{n}}\cdot
(\mathbf{D}_2-\mathbf{D}_1)
=
\rho_s
$$

Esta es la condición de contorno para la componente normal de $\mathbf{D}$.

Si no existe carga libre superficial:

$$
\rho_s=0
$$

entonces:

$$
\hat{\mathbf{n}}\cdot\mathbf{D}_2
=
\hat{\mathbf{n}}\cdot\mathbf{D}_1
$$

Es decir, la componente normal de $\mathbf{D}$ es continua.

---

# Condición de contorno para $\mathbf{B}$

Partimos de:

$$
\nabla\cdot\mathbf{B}=0
$$

En forma integral:

$$
\oint_S\mathbf{B}\cdot d\mathbf{S}=0
$$

Aplicando de nuevo una pequeña superficie que atraviesa la interfaz:

$$
\hat{\mathbf{n}}\cdot
(\mathbf{B}_2-\mathbf{B}_1)
=
0
$$

por lo que:

$$
\hat{\mathbf{n}}\cdot\mathbf{B}_2
=
\hat{\mathbf{n}}\cdot\mathbf{B}_1
$$

La componente normal de $\mathbf{B}$ es siempre continua.

Esto está relacionado con:

$$
\nabla\cdot\mathbf{B}=0
$$

y con la inexistencia de monopolos magnéticos.

En otras palabras, las líneas de $\mathbf{B}$ no pueden comenzar o terminar bruscamente en una superficie debido a una carga magnética inexistente.

---

# Condición de contorno para $\mathbf{E}$

Partimos de la ley de Faraday:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

Su forma integral es:

$$
\oint_C\mathbf{E}\cdot d\mathbf{l}
=
-\frac{d}{dt}
\int_S\mathbf{B}\cdot d\mathbf{S}
$$

Utilizamos ahora un pequeño rectángulo que atraviesa la interfaz.

Al hacer que su altura tienda a cero, el área encerrada tiende a cero.

Si los campos permanecen finitos, el flujo magnético también tiende a cero.

Por tanto:

$$
\oint_C\mathbf{E}\cdot d\mathbf{l}=0
$$

y se obtiene:

$$
\hat{\mathbf{n}}\times
(\mathbf{E}_2-\mathbf{E}_1)
=
0
$$

o equivalentemente:

$$
\mathbf{E}_{2t}
=
\mathbf{E}_{1t}
$$

La componente tangencial del campo eléctrico es continua.

Es decir:

> **La componente tangencial de $\mathbf{E}$ no puede presentar un salto en una interfaz ordinaria.**

---

# Condición de contorno para $\mathbf{H}$

Partimos de la ley de Ampère-Maxwell:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}_f
+
\frac{\partial\mathbf{D}}{\partial t}
$$

En forma integral:

$$
\oint_C\mathbf{H}\cdot d\mathbf{l}
=
I_{f,\mathrm{enc}}
+
\frac{d}{dt}
\int_S\mathbf{D}\cdot d\mathbf{S}
$$

Utilizamos nuevamente un pequeño rectángulo que atraviesa la interfaz.

En el límite de altura cero, el flujo de desplazamiento tiende a cero si $\mathbf{D}$ permanece finito.

Si existe una corriente superficial libre $\mathbf{J}_s$, obtenemos:

$$
\hat{\mathbf{n}}\times
(\mathbf{H}_2-\mathbf{H}_1)
=
\mathbf{J}_s
$$

Esta es la condición general.

Si no existe corriente superficial libre:

$$
\mathbf{J}_s=0
$$

entonces:

$$
\hat{\mathbf{n}}\times
(\mathbf{H}_2-\mathbf{H}_1)
=
0
$$

y por tanto:

$$
\mathbf{H}_{2t}
=
\mathbf{H}_{1t}
$$

La componente tangencial de $\mathbf{H}$ es continua si no existe corriente superficial libre.

---

# Las cuatro condiciones de contorno fundamentales

Podemos reunir los resultados:

$$
\hat{\mathbf{n}}\cdot
(\mathbf{D}_2-\mathbf{D}_1)
=
\rho_s
$$

$$
\hat{\mathbf{n}}\cdot
(\mathbf{B}_2-\mathbf{B}_1)
=
0
$$

$$
\hat{\mathbf{n}}\times
(\mathbf{E}_2-\mathbf{E}_1)
=
0
$$

$$
\hat{\mathbf{n}}\times
(\mathbf{H}_2-\mathbf{H}_1)
=
\mathbf{J}_s
$$

Estas cuatro expresiones son una de las herramientas más importantes de electromagnetismo aplicado.

---

# Caso habitual: interfaz sin fuentes superficiales

En muchísimos problemas de propagación se supone:

$$
\rho_s=0
$$

y:

$$
\mathbf{J}_s=0
$$

Entonces:

$$
D_{2n}=D_{1n}
$$

$$
B_{2n}=B_{1n}
$$

$$
\mathbf{E}_{2t}=\mathbf{E}_{1t}
$$

$$
\mathbf{H}_{2t}=\mathbf{H}_{1t}
$$

Estas son las condiciones que utilizaremos para estudiar reflexión y transmisión.

---

# Diferencia entre componentes normales y tangenciales

Es importante no confundir las condiciones.

Para $\mathbf{E}$ y $\mathbf{H}$ hablamos principalmente de sus componentes **tangenciales**:

$$
\mathbf{E}_t
$$

$$
\mathbf{H}_t
$$

Mientras que para $\mathbf{D}$ y $\mathbf{B}$ aparecen sus componentes **normales**:

$$
D_n
$$

$$
B_n
$$

La razón matemática procede directamente del tipo de integral utilizada para obtener cada condición.

---

# Reflexión de una onda electromagnética

Consideremos ahora una onda plana que viaja por el medio 1 y llega perpendicularmente a una interfaz con el medio 2.

Supongamos:

$$
z<0
$$

para el medio 1 y:

$$
z>0
$$

para el medio 2.

La onda incidente se propaga hacia $+z$.

Por tanto:

$$
\mathbf{k}_i=\beta_1\hat{\mathbf{z}}
$$

Al llegar a la interfaz, aparecen dos ondas:

* onda reflejada en el medio 1;
* onda transmitida en el medio 2.

Por tanto:

$$
\mathbf{E}_1
=
\mathbf{E}_i+\mathbf{E}_r
$$

y en el medio 2:

$$
\mathbf{E}_2
=
\mathbf{E}_t
$$

Este fenómeno es la **reflexión y transmisión electromagnética**.

---

# Elección de la polarización

Para simplificar, supongamos que el campo eléctrico está polarizado según $x$.

La onda incidente puede escribirse:

$$
\mathbf{E}_i(z,t)
=
E_{0i}
\cos(\omega t-\beta_1z)
\hat{\mathbf{x}}
$$

La onda reflejada viaja hacia $-z$:

$$
\mathbf{E}_r(z,t)
=
E_{0r}
\cos(\omega t+\beta_1z)
\hat{\mathbf{x}}
$$

La onda transmitida viaja hacia $+z$:

$$
\mathbf{E}_t(z,t)
=
E_{0t}
\cos(\omega t-\beta_2z)
\hat{\mathbf{x}}
$$

Observa el cambio de signo:

* propagación hacia $+z$: $-\beta z$;
* propagación hacia $-z$: $+\beta z$.

---

# Campos magnéticos correspondientes

Para una onda que se propaga en $+z$:

$$
\mathbf{H}
=
\frac{1}{\eta}
\hat{\mathbf{z}}\times\mathbf{E}
$$

Para la onda incidente:

$$
\mathbf{H}_i
=
\frac{E_{0i}}{\eta_1}
\cos(\omega t-\beta_1z)
\hat{\mathbf{y}}
$$

Para la onda reflejada, la dirección de propagación es $-z$:

$$
\mathbf{H}_r
=
\frac{1}{\eta_1}
(-\hat{\mathbf{z}})\times
\mathbf{E}_r
$$

Como:

$$
(-\hat{\mathbf{z}})\times\hat{\mathbf{x}}
=
-\hat{\mathbf{y}}
$$

resulta:

$$
\mathbf{H}_r
=
-\frac{E_{0r}}{\eta_1}
\cos(\omega t+\beta_1z)
\hat{\mathbf{y}}
$$

Este signo negativo es extremadamente importante.

Para la onda transmitida:

$$
\mathbf{H}_t
=
\frac{E_{0t}}{\eta_2}
\cos(\omega t-\beta_2z)
\hat{\mathbf{y}}
$$

---

# Aplicación de las condiciones de contorno

En la interfaz:

$$
z=0
$$

el campo eléctrico tangencial debe ser continuo.

Por tanto:

$$
E_i+E_r=E_t
$$

En términos de amplitudes:

$$
E_{0i}+E_{0r}=E_{0t}
$$

Para el campo magnético tangencial:

$$
H_i+H_r=H_t
$$

pero debemos recordar el signo de la onda reflejada:

$$
\frac{E_{0i}}{\eta_1}
-
\frac{E_{0r}}{\eta_1}
=
\frac{E_{0t}}{\eta_2}
$$

Tenemos por tanto dos ecuaciones:

$$
E_{0i}+E_{0r}=E_{0t}
$$

$$
\frac{E_{0i}-E_{0r}}{\eta_1}
=
\frac{E_{0t}}{\eta_2}
$$

Estas dos ecuaciones permiten determinar las amplitudes reflejada y transmitida.

---

# Coeficiente de reflexión

Definimos el **coeficiente de reflexión eléctrico**:

$$
\Gamma
=
\frac{E_{0r}}{E_{0i}}
$$

A partir de:

$$
E_{0t}
=
E_{0i}+E_{0r}
$$

tenemos:

$$
E_{0t}
=
E_{0i}(1+\Gamma)
$$

La condición magnética es:

$$
\frac{E_{0i}-E_{0r}}{\eta_1}
=
\frac{E_{0t}}{\eta_2}
$$

Dividiendo por $E_{0i}$:

$$
\frac{1-\Gamma}{\eta_1}
=
\frac{1+\Gamma}{\eta_2}
$$

Multiplicando:

$$
\eta_2(1-\Gamma)
=
\eta_1(1+\Gamma)
$$

Desarrollamos:

$$
\eta_2-\eta_2\Gamma
=
\eta_1+\eta_1\Gamma
$$

Agrupamos los términos con $\Gamma$:

$$
\eta_2-\eta_1
=
\Gamma(\eta_1+\eta_2)
$$

Por tanto:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

Esta es la expresión del coeficiente de reflexión para incidencia normal.

---

# Interpretación del coeficiente de reflexión

El coeficiente:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

puede ser positivo, negativo o cero.

### Si $\eta_2=\eta_1$

Entonces:

$$
\Gamma=0
$$

No existe reflexión.

La onda pasa completamente al segundo medio.

Esto tiene sentido: electromagnéticamente, ambos medios presentan la misma impedancia.

---

### Si $\eta_2>\eta_1$

Entonces:

$$
\Gamma>0
$$

La onda reflejada mantiene la fase del campo eléctrico respecto a la onda incidente.

---

### Si $\eta_2<\eta_1$

Entonces:

$$
\Gamma<0
$$

El campo eléctrico reflejado presenta un cambio de fase de $\pi$ respecto al incidente.

Este cambio de signo será fundamental para comprender las ondas estacionarias.

---

# Coeficiente de transmisión eléctrico

Definimos:

$$
\tau
=
\frac{E_{0t}}{E_{0i}}
$$

Como:

$$
E_{0t}=E_{0i}+E_{0r}
$$

tenemos:

$$
\tau=1+\Gamma
$$

Sustituyendo $\Gamma$:

$$
\tau
=
1+
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

Operando:

$$
\tau
=
\frac{2\eta_2}
{\eta_1+\eta_2}
$$

Por tanto:

$$
\tau
=
\frac{2\eta_2}
{\eta_1+\eta_2}
$$

Este coeficiente relaciona la amplitud del campo eléctrico transmitido con la amplitud incidente.

---

# Coeficiente de transmisión magnético

Para el campo magnético:

$$
H_{0i}
=
\frac{E_{0i}}{\eta_1}
$$

y:

$$
H_{0t}
=
\frac{E_{0t}}{\eta_2}
$$

Por tanto:

$$
\frac{H_{0t}}{H_{0i}}
=
\frac{E_{0t}/\eta_2}
{E_{0i}/\eta_1}
$$

Utilizando $\tau$:

$$
\frac{H_{0t}}{H_{0i}}
=
\tau
\frac{\eta_1}{\eta_2}
$$

Sustituyendo:

$$
\frac{H_{0t}}{H_{0i}}
=
\frac{2\eta_1}
{\eta_1+\eta_2}
$$

Por tanto, el coeficiente de transmisión de $H$ es:

$$
\tau_H
=
\frac{2\eta_1}
{\eta_1+\eta_2}
$$

Es diferente del coeficiente de transmisión eléctrico.

Esto es lógico porque $E$ y $H$ están relacionados mediante la impedancia del medio.

---

# Potencia transportada por una onda

La amplitud de los campos no determina directamente la potencia.

Para estudiar la energía electromagnética introducimos el **vector de Poynting**:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

Sus unidades son:

$$
[\mathbf{S}]
=
\mathrm{W/m^2}
$$

La dirección de $\mathbf{S}$ indica la dirección del flujo de energía electromagnética.

Para una onda plana:

$$
\mathbf{E}\perp\mathbf{H}
$$

y por tanto:

$$
|\mathbf{S}|
=
EH
$$

Como:

$$
H=\frac{E}{\eta}
$$

obtenemos:

$$
S
=
\frac{E^2}{\eta}
$$

Para campos sinusoidales, normalmente nos interesa el valor medio temporal:

$$
\langle\mathbf{S}\rangle
=
\frac{1}{2}
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}
\times
\tilde{\mathbf{H}}^*
\right\}
$$

En un medio sin pérdidas y para una onda plana:

$$
\langle S\rangle
=
\frac{|E_0|^2}{2\eta}
$$

si $E_0$ representa la amplitud de pico.

---

# Coeficiente de reflexión de potencia

La potencia reflejada es proporcional al cuadrado de la amplitud del campo.

Por tanto, para medios sin pérdidas:

$$
R
=
\frac{P_r}{P_i}
=
|\Gamma|^2
$$

donde $R$ es la **reflectancia**.

El coeficiente de transmisión de potencia es:

$$
T
=
\frac{P_t}{P_i}
$$

y, si no existen pérdidas en la interfaz:

$$
R+T=1
$$

Es importante distinguir:

$$
\Gamma
$$

de:

$$
R
$$

porque:

* $\Gamma$ es un cociente de amplitudes de campo;
* $R$ es un cociente de potencias.

No son la misma magnitud.

---

# Transmitancia en incidencia normal

Como:

$$
E_{0t}
=
\tau E_{0i}
$$

la potencia transmitida es:

$$
P_t
\propto
\frac{|E_{0t}|^2}{\eta_2}
$$

mientras que:

$$
P_i
\propto
\frac{|E_{0i}|^2}{\eta_1}
$$

Por tanto:

$$
T
=
\frac{|E_{0t}|^2/\eta_2}
{|E_{0i}|^2/\eta_1}
$$

obtenemos:

$$
T
=
|\tau|^2
\frac{\eta_1}{\eta_2}
$$

Para medios sin pérdidas:

$$
T
=
\frac{4\eta_1\eta_2}
{(\eta_1+\eta_2)^2}
$$

Mientras que:

$$
R
=
\left(
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
\right)^2
$$

y se verifica:

$$
R+T=1
$$

---

# Caso particular: aire a dieléctrico no magnético

Supongamos que:

$$
\mu_1\approx\mu_2\approx\mu_0
$$

y que:

$$
\varepsilon_1=\varepsilon_0
$$

mientras:

$$
\varepsilon_2=\varepsilon_r\varepsilon_0
$$

Entonces:

$$
\eta_1=\eta_0
$$

y:

$$
\eta_2=
\frac{\eta_0}{\sqrt{\varepsilon_r}}
$$

El coeficiente de reflexión queda:

$$
\Gamma
=
\frac{
\frac{\eta_0}{\sqrt{\varepsilon_r}}
-\eta_0
}{
\frac{\eta_0}{\sqrt{\varepsilon_r}}
+\eta_0
}
$$

Cancelando $\eta_0$:

$$
\Gamma
=
\frac{
\frac{1}{\sqrt{\varepsilon_r}}-1
}{
\frac{1}{\sqrt{\varepsilon_r}}+1
}
$$

Multiplicando numerador y denominador por $\sqrt{\varepsilon_r}$:

$$
\Gamma
=
\frac{1-\sqrt{\varepsilon_r}}
{1+\sqrt{\varepsilon_r}}
$$

Por tanto, si la onda pasa del aire a un dieléctrico con $\varepsilon_r>1$:

$$
\Gamma<0
$$

Esto significa que el campo eléctrico reflejado cambia de fase $\pi$.

---

# Ejemplo conceptual con $\varepsilon_r=4$

Supongamos:

$$
\varepsilon_r=4
$$

y:

$$
\mu_r=1
$$

Entonces:

$$
\eta_2=\frac{\eta_0}{2}
$$

La impedancia del primer medio es:

$$
\eta_1=\eta_0
$$

Por tanto:

$$
\Gamma
=
\frac{\eta_0/2-\eta_0}
{\eta_0/2+\eta_0}
$$

Simplificando:

$$
\Gamma=-\frac{1}{3}
$$

La amplitud del campo eléctrico reflejado es:

$$
|E_{0r}|=\frac{1}{3}|E_{0i}|
$$

pero con signo negativo:

$$
E_{0r}
=
-\frac{1}{3}E_{0i}
$$

El signo negativo representa un desfase de $\pi$.

El coeficiente de reflexión de potencia es:

$$
R=|\Gamma|^2=\frac{1}{9}
$$

Por tanto:

$$
R\approx0.111
$$

es decir, aproximadamente el $11.1%$ de la potencia incidente se refleja.

La potencia transmitida será:

$$
T=1-R
$$

por lo que:

$$
T=\frac{8}{9}
$$

aproximadamente un $88.9%$.

---

# Onda estacionaria

Cuando una onda incidente se superpone con una onda reflejada, aparece un fenómeno especialmente importante: la **onda estacionaria**.

Consideremos:

$$
E_i(z,t)
=
E_{0i}
\cos(\omega t-\beta z)
$$

y:

$$
E_r(z,t)
=
E_{0r}
\cos(\omega t+\beta z)
$$

La suma es:

$$
E(z,t)
=
E_i+E_r
$$

Si la reflexión es total y:

$$
E_{0r}=-E_{0i}
$$

tenemos:

$$
E(z,t)
=
E_{0i}
\left[
\cos(\omega t-\beta z)
-
\cos(\omega t+\beta z)
\right]
$$

Utilizando:

$$
\cos A-\cos B
=
-2\sin
\left(
\frac{A+B}{2}
\right)
\sin
\left(
\frac{A-B}{2}
\right)
$$

obtenemos:

$$
E(z,t)
=
2E_{0i}
\sin(\beta z)
\sin(\omega t)
$$

La dependencia temporal y espacial quedan separadas:

$$
E(z,t)
=
2E_{0i}
\sin(\beta z)
\sin(\omega t)
$$

Esta es una **onda estacionaria**.

La distribución espacial no se desplaza por el espacio como una onda viajera.

Aparecen puntos fijos de amplitud máxima y puntos fijos donde el campo es siempre cero.

---

# Nodos y vientres

Los puntos donde:

$$
E=0
$$

para todo instante se denominan **nodos**.

En nuestra expresión:

$$
E(z,t)
=
2E_{0i}
\sin(\beta z)
\sin(\omega t)
$$

los nodos satisfacen:

$$
\sin(\beta z)=0
$$

por lo que:

$$
\beta z=n\pi
$$

y:

$$
z=\frac{n\pi}{\beta}
$$

Como:

$$
\beta=\frac{2\pi}{\lambda}
$$

obtenemos:

$$
z=n\frac{\lambda}{2}
$$

Por tanto, los nodos están separados:

$$
\frac{\lambda}{2}
$$

Los puntos de amplitud máxima, llamados **vientres**, aparecen entre los nodos.

La separación entre dos vientres consecutivos también es:

$$
\frac{\lambda}{2}
$$

mientras que la distancia entre un nodo y el vientre adyacente es:

$$
\frac{\lambda}{4}
$$

---

# Relación con líneas de transmisión

Este resultado tiene una importancia enorme en ingeniería de telecomunicaciones.

Una onda estacionaria aparece también en:

* líneas de transmisión;
* cables coaxiales;
* guías de onda;
* antenas;
* cavidades resonantes;
* sistemas de radiofrecuencia.

De hecho, muchos conceptos de teoría de circuitos de alta frecuencia pueden interpretarse como una consecuencia de la propagación de ondas electromagnéticas y de sus reflexiones.

Una línea de transmisión no debe entenderse simplemente como un circuito ideal con componentes concentrados cuando su longitud deja de ser despreciable frente a la longitud de onda.

Aparecen entonces:

* ondas incidentes;
* ondas reflejadas;
* impedancia característica;
* coeficiente de reflexión;
* ondas estacionarias;
* adaptación de impedancias.

La conexión entre electromagnetismo y teoría de circuitos aparecerá más adelante.

---

# Impedancia de onda

En una onda viajera podemos definir localmente:

$$
Z_{\mathrm{onda}}
=
\frac{E}{H}
$$

Para una onda plana en un medio homogéneo sin pérdidas:

$$
Z_{\mathrm{onda}}=\eta
$$

Sin embargo, cuando existen simultáneamente ondas incidente y reflejada, el cociente total:

$$
\frac{E_{\mathrm{total}}}{H_{\mathrm{total}}}
$$

ya no tiene necesariamente el mismo valor que $\eta$.

Por ejemplo:

$$
E_{\mathrm{total}}
=
E_i+E_r
$$

mientras:

$$
H_{\mathrm{total}}
=
H_i+H_r
$$

y las ondas incidente y reflejada tienen signos diferentes en la relación entre $E$ y $H$.

Por ello, cerca de una interfaz o en una onda estacionaria, la relación $E/H$ puede variar con la posición.

Esta observación es fundamental para comprender posteriormente la **impedancia de entrada** de una línea de transmisión.

---

# Incidencia oblicua

Hasta ahora hemos considerado incidencia normal, es decir:

$$
\mathbf{k}_i\perp\text{interfaz}
$$

El caso general es más complejo.

Si la onda incide formando un ángulo $\theta_i$ respecto a la normal, aparecen:

* un ángulo de incidencia $\theta_i$;
* un ángulo de reflexión $\theta_r$;
* un ángulo de transmisión $\theta_t$.

La ley de reflexión establece:

$$
\theta_r=\theta_i
$$

Mientras que la transmisión viene determinada por la **ley de Snell**:

$$
n_1\sin\theta_i
=
n_2\sin\theta_t
$$

donde el índice de refracción de un medio sin pérdidas es:

$$
n=\frac{c}{v_p}
$$

Como:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

tenemos:

$$
n
=
c\sqrt{\mu\varepsilon}
$$

y utilizando:

$$
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

resulta:

$$
n
=
\sqrt{\mu_r\varepsilon_r}
$$

Para un medio aproximadamente no magnético:

$$
n\approx\sqrt{\varepsilon_r}
$$

---

# Conservación de la componente tangencial del vector de onda

La ley de Snell no es una regla independiente introducida arbitrariamente.

Procede de la necesidad de que los campos satisfagan las condiciones de contorno en todos los puntos de la interfaz.

En particular, la fase debe coincidir a lo largo de la superficie.

Esto implica que la componente tangencial del vector de onda es la misma para las ondas incidente, reflejada y transmitida:

$$
\mathbf{k}_{i,t}
=
\mathbf{k}_{r,t}
=
\mathbf{k}_{t,t}
$$

En magnitud:

$$
k_1\sin\theta_i
=
k_1\sin\theta_r
=
k_2\sin\theta_t
$$

Como:

$$
k=\frac{n\omega}{c}
$$

obtenemos:

$$
n_1\sin\theta_i
=
n_1\sin\theta_r
=
n_2\sin\theta_t
$$

De aquí salen simultáneamente:

$$
\theta_r=\theta_i
$$

y:

$$
n_1\sin\theta_i
=
n_2\sin\theta_t
$$

Es decir:

> **Las leyes de reflexión y refracción pueden entenderse como consecuencias de las condiciones de fase y de las condiciones de contorno de Maxwell.**

---

# Polarización en incidencia oblicua

Cuando la incidencia no es normal, aparecen dos configuraciones fundamentales.

## Polarización TE

El campo eléctrico es perpendicular al plano de incidencia.

También se denomina polarización:

$$
s
$$

## Polarización TM

El campo magnético es perpendicular al plano de incidencia.

También se denomina polarización:

$$
p
$$

Los coeficientes de reflexión y transmisión dependen entonces de la polarización.

Aparecen las ecuaciones de **Fresnel**, que permiten calcular las amplitudes reflejadas y transmitidas.

---

# Ángulo de Brewster

Para una determinada polarización puede existir un ángulo de incidencia para el cual:

$$
\Gamma=0
$$

Es decir, desaparece la reflexión.

Este es el **ángulo de Brewster**.

Para medios no magnéticos, su expresión para la polarización TM es:

$$
\tan\theta_B
=
\frac{n_2}{n_1}
$$

En ese ángulo, la onda incidente se transmite completamente en términos de la amplitud correspondiente al campo eléctrico de la polarización TM, sin onda reflejada.

Este fenómeno tiene aplicaciones en:

* óptica;
* antenas;
* polarización;
* sensores;
* sistemas de radar;
* comunicaciones electromagnéticas.

---

# Reflexión interna total

Consideremos ahora el caso:

$$
n_1>n_2
$$

La ley de Snell:

$$
n_1\sin\theta_i
=
n_2\sin\theta_t
$$

implica que, al aumentar $\theta_i$, puede alcanzarse una situación en la que:

$$
\sin\theta_t=1
$$

El correspondiente ángulo se denomina **ángulo crítico**:

$$
\sin\theta_c
=
\frac{n_2}{n_1}
$$

Si:

$$
\theta_i>\theta_c
$$

no existe una onda transmitida propagándose normalmente dentro del segundo medio.

Se produce entonces **reflexión interna total**.

Este fenómeno es fundamental, por ejemplo, en:

* fibra óptica;
* guías de luz;
* sensores ópticos;
* telecomunicaciones ópticas.

---

# De Maxwell a Fresnel

Podemos observar ahora una cadena conceptual completa:

$$
\text{Ecuaciones de Maxwell}
$$

↓

$$
\text{Condiciones de contorno}
$$

↓

$$
\text{Continuidad de las componentes apropiadas}
$$

↓

$$
\text{Reflexión y transmisión}
$$

↓

$$
\text{Coeficientes de Fresnel}
$$

↓

$$
\text{Potencia reflejada y transmitida}
$$

↓

$$
\text{Ondas estacionarias, refracción y polarización}
$$

Esto muestra que muchos resultados que en cursos posteriores pueden parecer fórmulas aisladas son en realidad consecuencias directas de las ecuaciones de Maxwell.

---

# Tabla conceptual de las condiciones de contorno

| Campo        | Componente | Condición                                                                     |
| ------------ | ---------- | ----------------------------------------------------------------------------- |
| $\mathbf{D}$ | Normal     | $D_{2n}-D_{1n}=\rho_s$                                                        |
| $\mathbf{B}$ | Normal     | $B_{2n}-B_{1n}=0$                                                             |
| $\mathbf{E}$ | Tangencial | $\mathbf{E}*{2t}=\mathbf{E}*{1t}$                                             |
| $\mathbf{H}$ | Tangencial | $\mathbf{H}*{2t}-\mathbf{H}*{1t}=\mathbf{J}_s\times\text{relación vectorial}$ |

La forma vectorial exacta es:

$$
\hat{\mathbf{n}}\cdot
(\mathbf{D}_2-\mathbf{D}_1)
=
\rho_s
$$

$$
\hat{\mathbf{n}}\cdot
(\mathbf{B}_2-\mathbf{B}_1)
=
0
$$

$$
\hat{\mathbf{n}}\times
(\mathbf{E}_2-\mathbf{E}_1)
=
0
$$

$$
\hat{\mathbf{n}}\times
(\mathbf{H}_2-\mathbf{H}_1)
=
\mathbf{J}_s
$$

Estas cuatro ecuaciones son las que deben utilizarse en problemas generales.

---

# Ideas fundamentales que deben quedar consolidadas

Una onda electromagnética que llega a una interfaz no puede tratarse simplemente como una función que continúa de un medio a otro.

El cambio de propiedades electromagnéticas obliga a satisfacer simultáneamente las ecuaciones de Maxwell en ambos medios y las condiciones de contorno en la interfaz.

Para incidencia normal:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

$$
\tau_E
=
\frac{2\eta_2}
{\eta_1+\eta_2}
$$

y:

$$
R=|\Gamma|^2
$$

Para medios sin pérdidas:

$$
R+T=1
$$

La velocidad de propagación en cada medio es:

$$
v_p=\frac{1}{\sqrt{\mu\varepsilon}}
$$

y la impedancia intrínseca:

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$

Por tanto, un cambio de $\varepsilon$ o $\mu$ modifica simultáneamente:

$$
v_p
$$

$$
\lambda
$$

$$
\beta
$$

$$
\eta
$$

y, en consecuencia, la cantidad de onda que se refleja y transmite.

La siguiente extensión natural consiste en estudiar **la energía electromagnética de forma rigurosa**, derivando el teorema de Poynting desde Maxwell, introduciendo la densidad de energía eléctrica y magnética, potencia instantánea y media, y después conectándolo con la interpretación física de $\mathbf{E}\times\mathbf{H}$. A partir de ahí se puede abordar con mucha más profundidad la propagación en medios con pérdidas, conductores, profundidad de penetración y efecto pelicular.



# Energía electromagnética y teorema de Poynting

Las ecuaciones de Maxwell describen la evolución espacial y temporal de los campos eléctricos y magnéticos. Sin embargo, todavía falta responder una pregunta fundamental:

> ¿Cómo se almacena y cómo se transporta la energía electromagnética?

La respuesta aparece al combinar la ley de Faraday con la ley de Ampère-Maxwell.

El resultado es el **teorema de Poynting**, una de las consecuencias más importantes de las ecuaciones de Maxwell.

Este resultado permite relacionar:

* energía eléctrica;
* energía magnética;
* potencia transportada por una onda;
* trabajo realizado sobre las cargas;
* disipación en materiales conductores;
* flujo de energía a través de una superficie.

---

# Densidad de energía electromagnética

En electromagnetismo existen dos contribuciones fundamentales a la energía almacenada en los campos.

La primera procede del campo eléctrico.

La segunda procede del campo magnético.

En un medio lineal, homogéneo e isótropo:

$$
u_E=\frac{1}{2}\mathbf{E}\cdot\mathbf{D}
$$

Como:

$$
\mathbf{D}=\varepsilon\mathbf{E}
$$

obtenemos:

$$
u_E=\frac{1}{2}\varepsilon E^2
$$

Esta es la **densidad de energía eléctrica**.

Sus unidades son:

$$
[u_E]=\mathrm{J/m^3}
$$

---

La densidad de energía magnética es:

$$
u_H=\frac{1}{2}\mathbf{B}\cdot\mathbf{H}
$$

Como:

$$
\mathbf{B}=\mu\mathbf{H}
$$

resulta:

$$
u_H=\frac{1}{2}\mu H^2
$$

Por tanto, la densidad total de energía electromagnética es:

$$
u=u_E+u_H
$$

es decir:

$$
u=
\frac{1}{2}\varepsilon E^2
+
\frac{1}{2}\mu H^2
$$

Esta expresión será especialmente importante para las ondas electromagnéticas.

---

# Derivación del teorema de Poynting

Partimos de dos ecuaciones de Maxwell en un medio general:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

y:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\frac{\partial\mathbf{D}}{\partial t}
$$

Queremos combinar ambas.

Multiplicamos escalarmente la primera por $\mathbf{H}$:

$$
\mathbf{H}\cdot
(\nabla\times\mathbf{E})
=
-\mathbf{H}\cdot
\frac{\partial\mathbf{B}}{\partial t}
$$

Y la segunda por $\mathbf{E}$:

$$
\mathbf{E}\cdot
(\nabla\times\mathbf{H})
=
\mathbf{E}\cdot\mathbf{J}
+
\mathbf{E}\cdot
\frac{\partial\mathbf{D}}{\partial t}
$$

Ahora utilizamos la identidad vectorial:

$$
\nabla\cdot
(\mathbf{E}\times\mathbf{H})
=
\mathbf{H}\cdot
(\nabla\times\mathbf{E})
-
\mathbf{E}\cdot
(\nabla\times\mathbf{H})
$$

Sustituyendo las ecuaciones de Maxwell:

$$
\nabla\cdot
(\mathbf{E}\times\mathbf{H})
=
-\mathbf{H}\cdot
\frac{\partial\mathbf{B}}{\partial t}
-
\mathbf{E}\cdot\mathbf{J}
-
\mathbf{E}\cdot
\frac{\partial\mathbf{D}}{\partial t}
$$

Reordenando:

$$
\nabla\cdot
(\mathbf{E}\times\mathbf{H})
+
\mathbf{E}\cdot\mathbf{J}
+
\mathbf{E}\cdot
\frac{\partial\mathbf{D}}{\partial t}
+
\mathbf{H}\cdot
\frac{\partial\mathbf{B}}{\partial t}
=
0
$$

Para un medio lineal donde $\varepsilon$ y $\mu$ no dependen del tiempo:

$$
\mathbf{E}\cdot
\frac{\partial\mathbf{D}}{\partial t}
=
\frac{\partial}{\partial t}
\left(
\frac{1}{2}\varepsilon E^2
\right)
$$

y:

$$
\mathbf{H}\cdot
\frac{\partial\mathbf{B}}{\partial t}
=
\frac{\partial}{\partial t}
\left(
\frac{1}{2}\mu H^2
\right)
$$

Por tanto:

$$
\nabla\cdot
(\mathbf{E}\times\mathbf{H})
+
\mathbf{J}\cdot\mathbf{E}
+
\frac{\partial u}{\partial t}
=
0
$$

donde:

$$
u=
\frac{1}{2}\varepsilon E^2
+
\frac{1}{2}\mu H^2
$$

Definimos el **vector de Poynting**:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

y obtenemos:

$$
\frac{\partial u}{\partial t}
+
\nabla\cdot\mathbf{S}
=
-\mathbf{J}\cdot\mathbf{E}
$$

Esta es la **forma diferencial del teorema de Poynting**.

---

# Interpretación física

La ecuación:

$$
\frac{\partial u}{\partial t}
+
\nabla\cdot\mathbf{S}
=
-\mathbf{J}\cdot\mathbf{E}
$$

es una ecuación de conservación de energía.

Cada término tiene un significado físico.

## Primer término

$$
\frac{\partial u}{\partial t}
$$

representa la variación temporal de la energía electromagnética almacenada por unidad de volumen.

---

## Segundo término

$$
\nabla\cdot\mathbf{S}
$$

representa el flujo neto de energía electromagnética que sale de una región.

---

## Tercer término

$$
\mathbf{J}\cdot\mathbf{E}
$$

representa la potencia entregada por el campo electromagnético a las cargas por unidad de volumen.

Por tanto:

> La disminución de energía electromagnética almacenada más la energía que sale de una región es igual a la energía transferida a las cargas.

Esto es exactamente una ley local de conservación de la energía.

---

# Forma integral del teorema de Poynting

Integramos sobre un volumen $V$:

$$
\int_V
\frac{\partial u}{\partial t}
\,dV
+
\int_V
\nabla\cdot\mathbf{S}
\,dV
=
-
\int_V
\mathbf{J}\cdot\mathbf{E}
\,dV
$$

Aplicamos el teorema de la divergencia:

$$
\int_V
\nabla\cdot\mathbf{S}\,dV
=
\oint_S
\mathbf{S}\cdot d\mathbf{A}
$$

Por tanto:

$$
\frac{d}{dt}
\int_Vu\,dV
+
\oint_S
\mathbf{S}\cdot d\mathbf{A}
=
-
\int_V
\mathbf{J}\cdot\mathbf{E}\,dV
$$

Esta es la forma integral del teorema de Poynting.

---

# Interpretación global

La ecuación puede leerse como:

$$
\text{variación de energía almacenada}
+
\text{energía que sale}
=
-\text{energía entregada a las cargas}
$$

Por tanto, si no hay pérdidas:

$$
\mathbf{J}=0
$$

entonces:

$$
\frac{d}{dt}
\int_Vu\,dV
+
\oint_S
\mathbf{S}\cdot d\mathbf{A}
=
0
$$

La energía electromagnética no desaparece.

Simplemente puede:

* permanecer almacenada;
* desplazarse hacia otra región;
* atravesar la superficie del volumen.

---

# El vector de Poynting como flujo de potencia

El vector:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

tiene unidades:

$$
[\mathbf{S}]
=
\mathrm{W/m^2}
$$

Por tanto, representa potencia por unidad de superficie.

Si una superficie $A$ es atravesada por un flujo de potencia uniforme y perpendicular:

$$
P
=
SA
$$

En el caso general:

$$
P
=
\int_A
\mathbf{S}\cdot d\mathbf{A}
$$

Esta expresión es extremadamente importante.

---

# Dirección del flujo de energía

La dirección de $\mathbf{S}$ es:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

En una onda plana:

$$
\mathbf{E}\perp\mathbf{H}
$$

y ambos son perpendiculares a la dirección de propagación.

Por ejemplo:

$$
\mathbf{E}
=
E_x\hat{\mathbf{x}}
$$

y:

$$
\mathbf{H}
=
H_y\hat{\mathbf{y}}
$$

Entonces:

$$
\mathbf{S}
=
E_xH_y
(\hat{\mathbf{x}}\times\hat{\mathbf{y}})
$$

Como:

$$
\hat{\mathbf{x}}\times\hat{\mathbf{y}}
=
\hat{\mathbf{z}}
$$

resulta:

$$
\mathbf{S}
=
E_xH_y\hat{\mathbf{z}}
$$

La energía se propaga hacia $+z$.

Esto proporciona una interpretación física extremadamente útil:

> El vector de Poynting apunta en la dirección en la que se transporta la energía electromagnética.

---

# Energía de una onda plana

Consideremos una onda plana en un medio sin pérdidas:

$$
\mathbf{E}
=
E_0
\cos(\omega t-\beta z)
\hat{\mathbf{x}}
$$

y:

$$
\mathbf{H}
=
\frac{E_0}{\eta}
\cos(\omega t-\beta z)
\hat{\mathbf{y}}
$$

Entonces:

$$
\mathbf{S}
=
\frac{E_0^2}{\eta}
\cos^2(\omega t-\beta z)
\hat{\mathbf{z}}
$$

La potencia instantánea oscila con:

$$
\cos^2(\omega t-\beta z)
$$

Por tanto, aunque la onda tenga una amplitud constante, el flujo instantáneo de potencia no es constante.

---

# Potencia media

El valor medio temporal de:

$$
\cos^2(\omega t-\beta z)
$$

es:

$$
\left\langle
\cos^2(\omega t-\beta z)
\right\rangle
=
\frac{1}{2}
$$

Por tanto:

$$
\langle\mathbf{S}\rangle
=
\frac{E_0^2}{2\eta}
\hat{\mathbf{z}}
$$

Esta es la potencia media por unidad de superficie transportada por la onda.

---

# Notación fasorial y vector de Poynting

Para campos sinusoidales utilizamos fasores:

$$
\mathbf{E}(t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}e^{j\omega t}
\right\}
$$

y:

$$
\mathbf{H}(t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{H}}e^{j\omega t}
\right\}
$$

El vector de Poynting medio es:

$$
\langle\mathbf{S}\rangle
=
\frac{1}{2}
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}
\times
\tilde{\mathbf{H}}^*
\right\}
$$

El asterisco representa conjugación compleja.

Esta expresión será fundamental en problemas de ondas en régimen sinusoidal.

---

# Potencia activa y reactiva electromagnética

En un sistema sinusoidal, el producto complejo asociado al flujo de potencia puede contener una parte real y una imaginaria.

Definimos el vector de Poynting complejo:

$$
\mathbf{S}_c
=
\frac{1}{2}
\tilde{\mathbf{E}}
\times
\tilde{\mathbf{H}}^*
$$

Podemos escribir:

$$
\mathbf{S}_c
=
\mathbf{P}
+
j\mathbf{Q}
$$

donde, conceptualmente:

* la parte real está relacionada con potencia media activa;
* la parte imaginaria está relacionada con intercambio reactivo de energía.

Esto es análogo a lo que sucede en circuitos de corriente alterna con la potencia compleja:

$$
\underline{S}
=
P+jQ
$$

La analogía no es accidental. Ambos fenómenos proceden del almacenamiento y transferencia alterna de energía electromagnética.

---

# Energía eléctrica y magnética en una onda plana

Para una onda plana sin pérdidas:

$$
u_E
=
\frac{1}{2}\varepsilon E^2
$$

y:

$$
u_H
=
\frac{1}{2}\mu H^2
$$

Como:

$$
E=\eta H
$$

y:

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$

tenemos:

$$
E^2
=
\frac{\mu}{\varepsilon}H^2
$$

por lo que:

$$
\varepsilon E^2
=
\mu H^2
$$

En consecuencia:

$$
u_E=u_H
$$

Es decir:

> En una onda plana electromagnética que se propaga en un medio lineal, homogéneo, isótropo y sin pérdidas, las densidades instantáneas de energía eléctrica y magnética son iguales.

Por tanto:

$$
u
=
u_E+u_H
=
2u_E
=
2u_H
$$

y:

$$
u
=
\varepsilon E^2
=
\mu H^2
$$

---

# Relación entre densidad de energía y flujo de potencia

Para una onda plana:

$$
S=EH
$$

Como:

$$
E=\eta H
$$

y:

$$
\eta=\sqrt{\frac{\mu}{\varepsilon}}
$$

podemos obtener:

$$
S
=
\frac{E^2}{\eta}
$$

Por otro lado:

$$
u=\varepsilon E^2
$$

Por tanto:

$$
S
=
\frac{u}{\varepsilon\eta}
$$

Como:

$$
\varepsilon\eta
=
\varepsilon
\sqrt{\frac{\mu}{\varepsilon}}
=
\sqrt{\mu\varepsilon}
$$

obtenemos:

$$
S
=
\frac{u}{\sqrt{\mu\varepsilon}}
$$

Pero:

$$
v_p
=
\frac{1}{\sqrt{\mu\varepsilon}}
$$

Por tanto:

$$
S=uv_p
$$

Esta relación es muy importante:

> **El flujo de energía de una onda plana es igual a la densidad de energía multiplicada por la velocidad de propagación.**

---

# Medios conductores

Hasta ahora hemos considerado principalmente medios sin pérdidas.

Ahora introducimos conductividad.

La ley de Ohm local establece:

$$
\mathbf{J}
=
\sigma\mathbf{E}
$$

Sustituyendo en el término de disipación:

$$
\mathbf{J}\cdot\mathbf{E}
=
\sigma E^2
$$

Por tanto, el término:

$$
\mathbf{J}\cdot\mathbf{E}
$$

es positivo si:

$$
\sigma>0
$$

y representa conversión de energía electromagnética en energía térmica.

Esta es la base electromagnética del **efecto Joule**.

---

# Efecto Joule

La potencia disipada por unidad de volumen es:

$$
p_{\mathrm{diss}}
=
\mathbf{J}\cdot\mathbf{E}
$$

Utilizando:

$$
\mathbf{J}=\sigma\mathbf{E}
$$

obtenemos:

$$
p_{\mathrm{diss}}
=
\sigma E^2
$$

También podemos escribir:

$$
p_{\mathrm{diss}}
=
\frac{J^2}{\sigma}
$$

Esta expresión conecta directamente la teoría de campos con la potencia disipada en una resistencia.

Por ejemplo, en un conductor:

$$
P
=
\int_V
\sigma E^2\,dV
$$

Esta es la versión distribuida de:

$$
P=VI
$$

o:

$$
P=I^2R
$$

de la teoría de circuitos.

---

# Ecuación de onda en un medio conductor

Partimos de:

$$
\nabla\times\mathbf{E}
=
-\mu
\frac{\partial\mathbf{H}}{\partial t}
$$

y:

$$
\nabla\times\mathbf{H}
=
\sigma\mathbf{E}
+
\varepsilon
\frac{\partial\mathbf{E}}{\partial t}
$$

Suponemos un medio:

* lineal;
* homogéneo;
* isótropo;
* con $\sigma$, $\varepsilon$ y $\mu$ constantes.

Tomamos el rotacional de la ley de Faraday:

$$
\nabla\times
(\nabla\times\mathbf{E})
=
-\mu
\frac{\partial}{\partial t}
(\nabla\times\mathbf{H})
$$

Sustituyendo Ampère-Maxwell:

$$
\nabla\times
(\nabla\times\mathbf{E})
=
-\mu
\frac{\partial}{\partial t}
\left(
\sigma\mathbf{E}
+
\varepsilon
\frac{\partial\mathbf{E}}{\partial t}
\right)
$$

Como $\sigma$ y $\varepsilon$ son constantes:

$$
\nabla\times
(\nabla\times\mathbf{E})
=
-\mu\sigma
\frac{\partial\mathbf{E}}{\partial t}
-
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

Utilizamos la identidad:

$$
\nabla\times
(\nabla\times\mathbf{E})
=
\nabla(\nabla\cdot\mathbf{E})
-
\nabla^2\mathbf{E}
$$

En una región homogénea sin carga libre volumétrica:

$$
\rho=0
$$

y:

$$
\nabla\cdot\mathbf{D}=0
$$

Como:

$$
\mathbf{D}=\varepsilon\mathbf{E}
$$

y $\varepsilon$ es constante:

$$
\nabla\cdot\mathbf{E}=0
$$

Por tanto:

$$
-\nabla^2\mathbf{E}
=
-\mu\sigma
\frac{\partial\mathbf{E}}{\partial t}
-
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

Multiplicando por $-1$:

$$
\nabla^2\mathbf{E}
=
\mu\sigma
\frac{\partial\mathbf{E}}{\partial t}
+
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

Esta es la ecuación de onda eléctrica en un medio conductor.

---

# Comparación con el vacío

En un medio sin pérdidas:

$$
\sigma=0
$$

queda:

$$
\nabla^2\mathbf{E}
=
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

En un conductor:

$$
\sigma\neq0
$$

y aparece un término adicional:

$$
\mu\sigma
\frac{\partial\mathbf{E}}{\partial t}
$$

Este término es responsable de la atenuación de la onda.

La onda ya no mantiene una amplitud constante mientras se propaga.

---

# Forma fasorial de la ecuación de onda

Supongamos régimen sinusoidal:

$$
\mathbf{E}(\mathbf{r},t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}(\mathbf{r})
e^{j\omega t}
\right\}
$$

Entonces:

$$
\frac{\partial}{\partial t}
\rightarrow
j\omega
$$

y:

$$
\frac{\partial^2}{\partial t^2}
\rightarrow
-\omega^2
$$

La ecuación:

$$
\nabla^2\mathbf{E}
=
\mu\sigma
\frac{\partial\mathbf{E}}{\partial t}
+
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

se transforma en:

$$
\nabla^2\tilde{\mathbf{E}}
=
j\omega\mu\sigma
\tilde{\mathbf{E}}
-
\omega^2\mu\varepsilon
\tilde{\mathbf{E}}
$$

Reordenando:

$$
\nabla^2\tilde{\mathbf{E}}
+
\left(
\omega^2\mu\varepsilon
-
j\omega\mu\sigma
\right)
\tilde{\mathbf{E}}
=
0
$$

Podemos definir una constante de propagación compleja.

---

# Constante de propagación

Definimos:

$$
\gamma
=
\alpha+j\beta
$$

donde:

* $\alpha$ es la constante de atenuación;
* $\beta$ es la constante de fase.

La constante de propagación satisface:

$$
\gamma^2
=
j\omega\mu
(\sigma+j\omega\varepsilon)
$$

Equivalentemente:

$$
\gamma
=
\sqrt{
j\omega\mu
(\sigma+j\omega\varepsilon)
}
$$

La elección de la rama de la raíz debe hacerse de forma que:

$$
\alpha\geq0
$$

para garantizar que la amplitud disminuya en la dirección de propagación en un medio pasivo.

---

# Onda plana en un medio con pérdidas

Una solución típica que se propaga en $+z$ es:

$$
\tilde{\mathbf{E}}(z)
=
\mathbf{E}_0e^{-\gamma z}
$$

Como:

$$
\gamma=\alpha+j\beta
$$

tenemos:

$$
e^{-\gamma z}
=
e^{-(\alpha+j\beta)z}
$$

Por las propiedades de la exponencial:

$$
e^{-\gamma z}
=
e^{-\alpha z}
e^{-j\beta z}
$$

Por tanto:

$$
\tilde{\mathbf{E}}(z)
=
\mathbf{E}_0
e^{-\alpha z}
e^{-j\beta z}
$$

Aparecen dos efectos distintos.

### Factor de atenuación

$$
e^{-\alpha z}
$$

controla la disminución de amplitud.

### Factor de fase

$$
e^{-j\beta z}
$$

controla la evolución de fase.

Por tanto:

> $\alpha$ describe cuánto se atenúa la onda y $\beta$ describe cuánto cambia su fase al propagarse.

---

# Significado físico de $\alpha$

Supongamos:

$$
|\mathbf{E}(z)|
=
E_0e^{-\alpha z}
$$

Si:

$$
\alpha=0
$$

la amplitud no disminuye.

Si:

$$
\alpha>0
$$

la amplitud decrece exponencialmente.

La distancia necesaria para que la amplitud disminuya hasta $1/e$ de su valor inicial es:

$$
z=\frac{1}{\alpha}
$$

Esta distancia se denomina a menudo **profundidad de penetración** o longitud característica de atenuación, dependiendo del contexto.

---

# Profundidad de penetración en un buen conductor

En un buen conductor se cumple:

$$
\sigma\gg\omega\varepsilon
$$

Esto significa que la corriente de conducción domina sobre la corriente de desplazamiento.

La constante de propagación se aproxima por:

$$
\gamma
\approx
\sqrt{j\omega\mu\sigma}
$$

Como:

$$
\sqrt{j}
=
\frac{1+j}{\sqrt{2}}
$$

obtenemos:

$$
\gamma
\approx
(1+j)
\sqrt{
\frac{\omega\mu\sigma}{2}
}
$$

Por tanto:

$$
\alpha
\approx
\sqrt{
\frac{\omega\mu\sigma}{2}
}
$$

y:

$$
\beta
\approx
\sqrt{
\frac{\omega\mu\sigma}{2}
}
$$

En un buen conductor:

$$
\alpha\approx\beta
$$

---

# Profundidad de penetración

Definimos:

$$
\delta
=
\frac{1}{\alpha}
$$

Por tanto, para un buen conductor:

$$
\delta
=
\sqrt{
\frac{2}{\omega\mu\sigma}
}
$$

Como:

$$
\omega=2\pi f
$$

también:

$$
\delta
=
\sqrt{
\frac{1}{\pi f\mu\sigma}
}
$$

Esta es la **profundidad de penetración**.

La amplitud del campo disminuye como:

$$
E(z)=E_0e^{-z/\delta}
$$

A una profundidad:

$$
z=\delta
$$

queda:

$$
E(\delta)=E_0e^{-1}
$$

aproximadamente:

$$
E(\delta)\approx0.368E_0
$$

---

# Efecto pelicular

La profundidad de penetración explica el denominado **efecto pelicular** o *skin effect*.

En corriente continua, idealmente la corriente puede distribuirse por toda la sección de un conductor.

En corriente alterna de frecuencia suficientemente elevada, el campo electromagnético penetra solamente una distancia limitada desde la superficie.

La densidad de corriente se concentra cerca de la superficie.

Para un buen conductor:

$$
J(z)
=
J_0e^{-z/\delta}
$$

Por tanto, cuanto mayor sea la frecuencia:

$$
f\uparrow
$$

menor es:

$$
\delta
$$

porque:

$$
\delta
\propto
\frac{1}{\sqrt{f}}
$$

Esto tiene consecuencias prácticas enormes en:

* cables;
* líneas de transmisión;
* RF;
* microondas;
* antenas;
* circuitos de alta frecuencia;
* pérdidas en conductores.

---

# Comparación entre conducción y desplazamiento

En un medio conductor aparecen dos términos en Ampère-Maxwell:

$$
\mathbf{J}
=
\sigma\mathbf{E}
$$

y:

$$
\mathbf{J}_d
=
j\omega\varepsilon\mathbf{E}
$$

en representación fasorial.

Sus magnitudes son:

$$
|\mathbf{J}_c|
=
\sigma E
$$

y:

$$
|\mathbf{J}_d|
=
\omega\varepsilon E
$$

Por tanto, la razón entre ambas es:

$$
\frac{|\mathbf{J}_c|}
{|\mathbf{J}_d|}
=
\frac{\sigma}
{\omega\varepsilon}
$$

Esta relación es fundamental.

Si:

$$
\frac{\sigma}{\omega\varepsilon}\gg1
$$

domina la conducción.

Si:

$$
\frac{\sigma}{\omega\varepsilon}\ll1
$$

domina la corriente de desplazamiento.

---

# Frecuencia de transición

Podemos estimar la frecuencia para la cual ambas contribuciones tienen el mismo orden de magnitud:

$$
\sigma
\approx
\omega\varepsilon
$$

por lo que:

$$
\omega_c
\approx
\frac{\sigma}{\varepsilon}
$$

y:

$$
f_c
\approx
\frac{\sigma}{2\pi\varepsilon}
$$

Esta frecuencia no debe interpretarse automáticamente como una frecuencia de corte de una guía de onda.

Es simplemente una escala que indica cuándo conducción y desplazamiento tienen magnitudes comparables.

---

# Clasificación de medios

La razón:

$$
\frac{\sigma}{\omega\varepsilon}
$$

permite clasificar aproximadamente el comportamiento electromagnético.

## Buen dieléctrico

$$
\sigma\ll\omega\varepsilon
$$

La corriente de desplazamiento domina.

---

## Buen conductor

$$
\sigma\gg\omega\varepsilon
$$

La corriente de conducción domina.

---

## Región intermedia

$$
\sigma\sim\omega\varepsilon
$$

Ambos mecanismos son importantes.

Esta clasificación será especialmente útil en problemas de propagación.

---

# Impedancia intrínseca en un medio conductor

En un medio con pérdidas, la relación entre los fasores de campo ya no es simplemente una impedancia real.

La impedancia intrínseca es:

$$
\eta
=
\frac{\tilde{E}}
{\tilde{H}}
$$

y viene dada por:

$$
\eta
=
\sqrt{
\frac{j\omega\mu}
{\sigma+j\omega\varepsilon}
}
$$

En general:

$$
\eta
\in\mathbb{C}
$$

Es decir, la impedancia tiene módulo y fase.

Esto significa que en un medio conductor $E$ y $H$ pueden no estar en fase.

---

# Consecuencia energética

En un medio sin pérdidas:

$$
\eta\in\mathbb{R}
$$

y $E$ y $H$ están en fase para una onda plana.

En un medio con pérdidas:

$$
\eta=\eta_R+j\eta_I
$$

y aparece una diferencia de fase entre los campos.

Esto está relacionado con el almacenamiento temporal y la disipación de energía en el medio.

La potencia media transferida al material está asociada a la parte disipativa.

---

# Imagen física completa

Podemos ahora construir una visión unificada.

Una fuente electromagnética genera campos:

$$
\mathbf{E}
\qquad
\mathbf{H}
$$

Los campos contienen energía:

$$
u=
\frac{1}{2}\varepsilon E^2
+
\frac{1}{2}\mu H^2
$$

La energía puede transportarse mediante:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

Si existen cargas conductoras:

$$
\mathbf{J}=\sigma\mathbf{E}
$$

parte de esa energía se convierte en calor:

$$
p_{\mathrm{diss}}
=
\mathbf{J}\cdot\mathbf{E}
$$

y, como consecuencia, una onda que se propaga por un medio conductor se atenúa:

$$
E(z)
\propto
e^{-\alpha z}
$$

La constante $\alpha$ cuantifica las pérdidas.

Simultáneamente, la fase evoluciona según:

$$
e^{-j\beta z}
$$

Por tanto, la propagación completa queda descrita por:

$$
e^{-\gamma z}
=
e^{-\alpha z}
e^{-j\beta z}
$$

con:

$$
\gamma=\alpha+j\beta
$$

---

# Conexión con los circuitos

Existe una conexión profunda entre todo esto y la teoría de circuitos.

En un circuito concentrado:

* un condensador almacena energía eléctrica;
* una bobina almacena energía magnética;
* una resistencia disipa energía.

Las expresiones correspondientes son:

$$
W_C
=
\frac{1}{2}CV^2
$$

$$
W_L
=
\frac{1}{2}LI^2
$$

$$
P_R
=
I^2R
$$

En electromagnetismo distribuido:

$$
u_E
=
\frac{1}{2}\varepsilon E^2
$$

$$
u_H
=
\frac{1}{2}\mu H^2
$$

y:

$$
p_{\mathrm{diss}}
=
\sigma E^2
$$

Por tanto:

> condensadores, bobinas y resistencias pueden entenderse como modelos concentrados de fenómenos electromagnéticos distribuidos.

Cuando las dimensiones físicas del sistema se vuelven comparables con la longitud de onda, el modelo concentrado deja de ser suficiente y debemos volver a Maxwell.

---

# Escala espacial y validez de la aproximación de circuito

La teoría de circuitos supone esencialmente que los campos pueden considerarse suficientemente uniformes dentro de cada elemento y que los retardos de propagación son despreciables.

Si una estructura tiene una dimensión característica $L$ y:

$$
L\ll\lambda
$$

la aproximación de parámetros concentrados suele ser razonable.

Pero cuando:

$$
L\sim\lambda
$$

los efectos de propagación dejan de ser despreciables.

Entonces aparecen:

* diferencias de fase espaciales;
* retardos;
* ondas viajeras;
* reflexiones;
* interferencia;
* ondas estacionarias.

Es en este régimen donde las líneas de transmisión y posteriormente las guías de onda se vuelven necesarias.

---

# Resumen conceptual

A partir de las ecuaciones de Maxwell hemos obtenido:

$$
\boxed{\text{energía electromagnética}}
$$

No obstante, para mantener una notación adecuada para documentos de GitHub/Obsidian, las relaciones fundamentales pueden resumirse sin necesidad de encerrarlas en una caja.

La densidad de energía:

$$
u=
\frac{1}{2}\varepsilon E^2
+
\frac{1}{2}\mu H^2
$$

El vector de Poynting:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

El teorema de Poynting:

$$
\frac{\partial u}{\partial t}
+
\nabla\cdot\mathbf{S}
=
-\mathbf{J}\cdot\mathbf{E}
$$

La potencia media:

$$
\langle\mathbf{S}\rangle
=
\frac{1}{2}
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}
\times
\tilde{\mathbf{H}}^*
\right\}
$$

La ecuación de onda en un medio conductor:

$$
\nabla^2\mathbf{E}
=
\mu\sigma
\frac{\partial\mathbf{E}}{\partial t}
+
\mu\varepsilon
\frac{\partial^2\mathbf{E}}{\partial t^2}
$$

La constante de propagación:

$$
\gamma=\alpha+j\beta
$$

La impedancia intrínseca:

$$
\eta
=
\sqrt{
\frac{j\omega\mu}
{\sigma+j\omega\varepsilon}
}
$$

Y para un buen conductor:

$$
\alpha
\approx
\beta
\approx
\sqrt{
\frac{\omega\mu\sigma}{2}
}
$$

con profundidad de penetración:

$$
\delta
=
\sqrt{
\frac{2}{\omega\mu\sigma}
}
$$

---

# Una visión unificada de las ondas electromagnéticas

Llegados a este punto, podemos interpretar una onda electromagnética de manera mucho más completa.

Una onda no es simplemente una función:

$$
E(z,t)=E_0\cos(\omega t-\beta z)
$$

Esa expresión es únicamente una representación matemática de una estructura física mucho más rica.

La onda contiene simultáneamente:

**Campo eléctrico**

$$
\mathbf{E}
$$

**Campo magnético**

$$
\mathbf{H}
$$

**Densidad de energía**

$$
u
$$

**Flujo de energía**

$$
\mathbf{S}
$$

**Frecuencia**

$$
f
$$

**Longitud de onda**

$$
\lambda
$$

**Velocidad de fase**

$$
v_p
$$

**Constante de fase**

$$
\beta
$$

y, si el medio tiene pérdidas:

**Constante de atenuación**

$$
\alpha
$$

La constante de propagación reúne las dos últimas:

$$
\gamma=\alpha+j\beta
$$

Por tanto:

$$
e^{-\gamma z}
=
e^{-\alpha z}
e^{-j\beta z}
$$

describe simultáneamente:

* cuánto disminuye la amplitud;
* cuánto avanza la fase.

---

# El siguiente nivel: potenciales electromagnéticos

Aunque las cuatro ecuaciones de Maxwell constituyen una formulación fundamental, existe otra formulación extremadamente poderosa basada en los **potenciales electromagnéticos**.

Partimos de:

$$
\nabla\cdot\mathbf{B}=0
$$

Esta ecuación implica que podemos representar $\mathbf{B}$ mediante un potencial vector $\mathbf{A}$:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

Introduciendo esta expresión en la ley de Faraday:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

obtenemos:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial}{\partial t}
(\nabla\times\mathbf{A})
$$

Como las derivadas espaciales y temporales pueden intercambiarse:

$$
\nabla\times\mathbf{E}
=
\nabla\times
\left(
-\frac{\partial\mathbf{A}}{\partial t}
\right)
$$

Por tanto:

$$
\nabla\times
\left(
\mathbf{E}
+
\frac{\partial\mathbf{A}}{\partial t}
\right)
=
0
$$

Un campo cuyo rotacional es cero puede expresarse localmente como el gradiente negativo de un potencial escalar:

$$
\mathbf{E}
+
\frac{\partial\mathbf{A}}{\partial t}
=
-\nabla\phi
$$

por lo que:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

Hemos obtenido así las dos relaciones fundamentales de los potenciales:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

Estas ecuaciones no sustituyen a Maxwell, sino que proporcionan una formulación alternativa.

A partir de ellas pueden derivarse las ecuaciones de Maxwell restantes.

Pero aparece una característica profunda:

> Los potenciales $\phi$ y $\mathbf{A}$ no son únicos.

Existe una libertad matemática denominada **libertad de gauge**.

Elegir adecuadamente ese gauge permite simplificar enormemente las ecuaciones diferenciales y conduce a las ecuaciones de onda de los potenciales.

Este formalismo será el siguiente paso natural, junto con la ecuación de Helmholtz, los potenciales retardados y la formulación fasorial completa de las ondas electromagnéticas.




# Potenciales electromagnéticos

Las ecuaciones de Maxwell pueden formularse directamente en términos de los campos $\mathbf{E}$ y $\mathbf{B}$, pero existe una formulación alternativa basada en dos funciones auxiliares:

* el **potencial escalar** $\phi$;
* el **potencial vector** $\mathbf{A}$.

Esta formulación no es simplemente una forma diferente de escribir las ecuaciones. Tiene ventajas matemáticas importantes y permite comprender mejor:

* la estructura interna de las ecuaciones de Maxwell;
* la propagación de perturbaciones electromagnéticas;
* las fuentes electromagnéticas;
* la radiación;
* las antenas;
* la relación entre potenciales y campos;
* la formulación relativista del electromagnetismo.

---

# El potencial vector magnético

Una de las ecuaciones de Maxwell es:

$$
\nabla\cdot\mathbf{B}=0
$$

Esta ecuación expresa que el campo magnético no tiene fuentes escalares aisladas.

Matemáticamente, sabemos que cualquier campo vectorial que pueda escribirse como el rotacional de otro campo vectorial tiene divergencia nula, porque:

$$
\nabla\cdot(\nabla\times\mathbf{A})=0
$$

Por tanto, podemos definir un campo vectorial $\mathbf{A}$ tal que:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

El campo $\mathbf{A}$ se denomina **potencial vector magnético**.

Esta definición garantiza automáticamente:

$$
\nabla\cdot\mathbf{B}
=
\nabla\cdot(\nabla\times\mathbf{A})
=
0
$$

Por tanto, una de las cuatro ecuaciones de Maxwell queda incorporada automáticamente en la definición de $\mathbf{A}$.

---

# Obtención del potencial escalar

Partimos de la ley de Faraday:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

Sustituimos:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

y obtenemos:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial}{\partial t}
(\nabla\times\mathbf{A})
$$

Como las derivadas espaciales y temporales pueden intercambiarse:

$$
\nabla\times\mathbf{E}
=
-\nabla\times
\frac{\partial\mathbf{A}}{\partial t}
$$

Por tanto:

$$
\nabla\times
\left(
\mathbf{E}
+
\frac{\partial\mathbf{A}}{\partial t}
\right)
=
0
$$

Ahora utilizamos otra propiedad vectorial.

Si un campo vectorial tiene rotacional nulo:

$$
\nabla\times\mathbf{F}=0
$$

entonces, localmente, puede escribirse como el gradiente de un potencial escalar.

Por convenio se utiliza el signo negativo:

$$
\mathbf{F}
=
-\nabla\phi
$$

Por tanto:

$$
\mathbf{E}
+
\frac{\partial\mathbf{A}}{\partial t}
=
-\nabla\phi
$$

y finalmente:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

Tenemos así las dos relaciones fundamentales:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

---

# Significado físico de $\phi$

En electrostática:

$$
\frac{\partial\mathbf{A}}{\partial t}=0
$$

por lo que:

$$
\mathbf{E}
=
-\nabla\phi
$$

Esta es precisamente la expresión conocida de electrostática.

El potencial escalar representa, por tanto, la parte del campo eléctrico asociada al gradiente de potencial.

Sin embargo, en electromagnetismo dinámico aparece un segundo término:

$$
-\frac{\partial\mathbf{A}}{\partial t}
$$

Esto significa que el campo eléctrico puede existir incluso cuando no puede describirse exclusivamente mediante un potencial escalar.

Esta es una diferencia fundamental entre electrostática y electromagnetismo dinámico.

---

# El campo eléctrico tiene dos contribuciones

La expresión:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

puede interpretarse como:

$$
\mathbf{E}
=
\mathbf{E}_{\phi}
+
\mathbf{E}_{A}
$$

donde:

$$
\mathbf{E}_{\phi}
=
-\nabla\phi
$$

y:

$$
\mathbf{E}_{A}
=
-\frac{\partial\mathbf{A}}{\partial t}
$$

La primera contribución está relacionada con el potencial eléctrico.

La segunda aparece como consecuencia de la variación temporal del potencial vector.

Por tanto, en general:

$$
\nabla\times\mathbf{E}\neq0
$$

y el campo eléctrico no es conservativo.

---

# Electrostática como caso particular

Si los campos no dependen del tiempo:

$$
\frac{\partial\mathbf{A}}{\partial t}=0
$$

entonces:

$$
\mathbf{E}
=
-\nabla\phi
$$

y:

$$
\nabla\times\mathbf{E}=0
$$

En este caso sí podemos definir una diferencia de potencial independiente del camino:

$$
V_B-V_A
=
-\int_A^B
\mathbf{E}\cdot d\mathbf{l}
$$

Esto deja de ser cierto en general cuando existe inducción electromagnética.

---

# Introducción de los potenciales en Ampère-Maxwell

Consideremos ahora:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\frac{\partial\mathbf{D}}{\partial t}
$$

En un medio lineal, homogéneo e isótropo:

$$
\mathbf{B}=\mu\mathbf{H}
$$

por lo que:

$$
\mathbf{H}
=
\frac{\mathbf{B}}{\mu}
$$

y:

$$
\nabla\times\mathbf{B}
=
\mu\mathbf{J}
+
\mu\varepsilon
\frac{\partial\mathbf{E}}{\partial t}
$$

Sustituimos:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

y:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

Entonces:

$$
\nabla\times
(\nabla\times\mathbf{A})
=
\mu\mathbf{J}
+
\mu\varepsilon
\frac{\partial}{\partial t}
\left(
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
\right)
$$

Desarrollamos:

$$
\nabla\times
(\nabla\times\mathbf{A})
=
\mu\mathbf{J}
-
\mu\varepsilon
\nabla
\frac{\partial\phi}{\partial t}
-
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
$$

Utilizamos la identidad:

$$
\nabla\times
(\nabla\times\mathbf{A})
=
\nabla(\nabla\cdot\mathbf{A})
-
\nabla^2\mathbf{A}
$$

Por tanto:

$$
\nabla(\nabla\cdot\mathbf{A})
-
\nabla^2\mathbf{A}
=
\mu\mathbf{J}
-
\mu\varepsilon
\nabla
\frac{\partial\phi}{\partial t}
-
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
$$

Agrupando los términos:

$$
-\nabla^2\mathbf{A}
+
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
+
\nabla
\left(
\nabla\cdot\mathbf{A}
+
\mu\varepsilon
\frac{\partial\phi}{\partial t}
\right)
=
\mu\mathbf{J}
$$

Esta ecuación todavía presenta un problema.

Los potenciales $\phi$ y $\mathbf{A}$ aparecen acoplados.

Aquí aparece la libertad de gauge.

---

# Libertad de gauge

Los potenciales no son únicos.

Esto es muy importante.

Podemos modificar los potenciales sin cambiar los campos físicos.

Supongamos que introducimos una función escalar arbitraria $\Lambda(\mathbf{r},t)$.

Definimos:

$$
\mathbf{A}'
=
\mathbf{A}
+
\nabla\Lambda
$$

y:

$$
\phi'
=
\phi
-
\frac{\partial\Lambda}{\partial t}
$$

Veamos qué ocurre con $\mathbf{B}$.

Tenemos:

$$
\mathbf{B}'
=
\nabla\times\mathbf{A}'
$$

por lo que:

$$
\mathbf{B}'
=
\nabla\times
(\mathbf{A}+\nabla\Lambda)
$$

Entonces:

$$
\mathbf{B}'
=
\nabla\times\mathbf{A}
+
\nabla\times(\nabla\Lambda)
$$

Pero:

$$
\nabla\times(\nabla\Lambda)=0
$$

por lo que:

$$
\mathbf{B}'=\mathbf{B}
$$

El campo magnético no cambia.

Ahora comprobamos el campo eléctrico:

$$
\mathbf{E}'
=
-\nabla\phi'
-
\frac{\partial\mathbf{A}'}{\partial t}
$$

Sustituyendo:

$$
\mathbf{E}'
=
-\nabla
\left(
\phi-
\frac{\partial\Lambda}{\partial t}
\right)
-
\frac{\partial}{\partial t}
\left(
\mathbf{A}+\nabla\Lambda
\right)
$$

Desarrollando:

$$
\mathbf{E}'
=
-\nabla\phi
+
\nabla
\frac{\partial\Lambda}{\partial t}
-
\frac{\partial\mathbf{A}}{\partial t}
-
\frac{\partial}{\partial t}
(\nabla\Lambda)
$$

Como:

$$
\nabla
\frac{\partial\Lambda}{\partial t}
=
\frac{\partial}{\partial t}
(\nabla\Lambda)
$$

los dos términos se cancelan.

Por tanto:

$$
\mathbf{E}'=\mathbf{E}
$$

Así:

$$
\mathbf{E}'=\mathbf{E}
$$

y:

$$
\mathbf{B}'=\mathbf{B}
$$

Los campos físicos son invariantes.

---

# ¿Qué significa esto físicamente?

Significa que $\phi$ y $\mathbf{A}$ contienen cierto grado de redundancia matemática.

Diferentes parejas:

$$
(\phi,\mathbf{A})
$$

pueden producir exactamente los mismos campos:

$$
(\mathbf{E},\mathbf{B})
$$

La elección concreta de los potenciales se denomina **elección de gauge**.

Podemos utilizar esta libertad para imponer una condición adicional que simplifique las ecuaciones.

Existen varios gauges importantes.

Los dos más relevantes son:

* gauge de Coulomb;
* gauge de Lorenz.

---

# Gauge de Coulomb

El gauge de Coulomb impone:

$$
\nabla\cdot\mathbf{A}=0
$$

Esta elección es particularmente útil en determinados problemas electrostáticos y cuasiestáticos.

Sin embargo, para problemas de propagación electromagnética relativista suele resultar más conveniente el gauge de Lorenz.

---

# Gauge de Lorenz

El gauge de Lorenz impone:

$$
\nabla\cdot\mathbf{A}
+
\mu\varepsilon
\frac{\partial\phi}{\partial t}
=
0
$$

Esta condición puede sustituirse directamente en la ecuación acoplada obtenida anteriormente.

Recordemos:

$$
-\nabla^2\mathbf{A}
+
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
+
\nabla
\left(
\nabla\cdot\mathbf{A}
+
\mu\varepsilon
\frac{\partial\phi}{\partial t}
\right)
=
\mu\mathbf{J}
$$

Con el gauge de Lorenz:

$$
\nabla\cdot\mathbf{A}
+
\mu\varepsilon
\frac{\partial\phi}{\partial t}
=
0
$$

el último término desaparece.

Queda:

$$
-\nabla^2\mathbf{A}
+
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
=
\mu\mathbf{J}
$$

Multiplicando por $-1$:

$$
\nabla^2\mathbf{A}
-
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
=
-\mu\mathbf{J}
$$

Esta es una ecuación de onda para el potencial vector.

---

# Ecuación de onda para el potencial escalar

También podemos obtener una ecuación para $\phi$.

La ley de Gauss establece:

$$
\nabla\cdot\mathbf{E}
=
\frac{\rho}{\varepsilon}
$$

Sustituimos:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

Entonces:

$$
\nabla\cdot
\left(
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
\right)
=
\frac{\rho}{\varepsilon}
$$

Desarrollamos:

$$
-\nabla^2\phi
-
\frac{\partial}{\partial t}
(\nabla\cdot\mathbf{A})
=
\frac{\rho}{\varepsilon}
$$

Utilizamos el gauge de Lorenz:

$$
\nabla\cdot\mathbf{A}
=
-\mu\varepsilon
\frac{\partial\phi}{\partial t}
$$

Derivando respecto al tiempo:

$$
\frac{\partial}{\partial t}
(\nabla\cdot\mathbf{A})
=
-\mu\varepsilon
\frac{\partial^2\phi}{\partial t^2}
$$

Sustituyendo:

$$
-\nabla^2\phi
+
\mu\varepsilon
\frac{\partial^2\phi}{\partial t^2}
=
\frac{\rho}{\varepsilon}
$$

Multiplicando por $-1$:

$$
\nabla^2\phi
-
\mu\varepsilon
\frac{\partial^2\phi}{\partial t^2}
=
-\frac{\rho}{\varepsilon}
$$

Tenemos así las dos ecuaciones desacopladas:

$$
\nabla^2\phi
-
\mu\varepsilon
\frac{\partial^2\phi}{\partial t^2}
=
-\frac{\rho}{\varepsilon}
$$

y:

$$
\nabla^2\mathbf{A}
-
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
=
-\mu\mathbf{J}
$$

---

# Interpretación de las ecuaciones de potenciales

Estas ecuaciones son especialmente elegantes porque tienen la misma estructura matemática que una ecuación de onda con fuente.

Para $\phi$:

$$
\nabla^2\phi
-
\frac{1}{v^2}
\frac{\partial^2\phi}{\partial t^2}
=
-\frac{\rho}{\varepsilon}
$$

Para $\mathbf{A}$:

$$
\nabla^2\mathbf{A}
-
\frac{1}{v^2}
\frac{\partial^2\mathbf{A}}{\partial t^2}
=
-\mu\mathbf{J}
$$

donde:

$$
v
=
\frac{1}{\sqrt{\mu\varepsilon}}
$$

Por tanto, tanto $\phi$ como $\mathbf{A}$ se propagan con la velocidad electromagnética del medio.

En el vacío:

$$
v=c
$$

---

# Caso sin fuentes

Si:

$$
\rho=0
$$

y:

$$
\mathbf{J}=0
$$

entonces:

$$
\nabla^2\phi
-
\mu\varepsilon
\frac{\partial^2\phi}{\partial t^2}
=
0
$$

y:

$$
\nabla^2\mathbf{A}
-
\mu\varepsilon
\frac{\partial^2\mathbf{A}}{\partial t^2}
=
0
$$

Los potenciales pueden propagarse como ondas incluso en una región donde no existen cargas ni corrientes locales.

Esto es coherente con las ondas electromagnéticas en el vacío.

---

# Potenciales retardados

Una consecuencia profunda de las ecuaciones anteriores es que las fuentes electromagnéticas no producen una respuesta instantánea a distancia.

La información electromagnética se propaga a velocidad finita.

Para una distribución de carga $\rho(\mathbf{r}',t)$, el potencial escalar en un punto $\mathbf{r}$ depende de la carga evaluada en un tiempo retardado:

$$
t_r
=
t-\frac{R}{v}
$$

donde:

$$
R
=
|\mathbf{r}-\mathbf{r}'|
$$

En el vacío:

$$
t_r
=
t-\frac{R}{c}
$$

Este es el concepto de **tiempo retardado**.

El potencial escalar adopta una estructura del tipo:

$$
\phi(\mathbf{r},t)
=
\frac{1}{4\pi\varepsilon}
\int
\frac{
\rho(\mathbf{r}',t_r)
}{
R
}
\,dV'
$$

y el potencial vector:

$$
\mathbf{A}(\mathbf{r},t)
=
\frac{\mu}{4\pi}
\int
\frac{
\mathbf{J}(\mathbf{r}',t_r)
}{
R
}
\,dV'
$$

Estas expresiones muestran que el campo en un punto depende de cómo eran las fuentes en el pasado.

La razón es sencilla:

> Una modificación de la distribución de cargas no puede propagarse instantáneamente.

---

# De Maxwell a las ondas radiadas

Este formalismo permite entender la radiación electromagnética.

Una carga estática produce esencialmente un campo electrostático.

Una corriente constante produce campos estáticos o estacionarios.

Pero una carga acelerada puede producir una perturbación electromagnética que se propaga hacia el exterior.

En términos simplificados:

$$
\text{carga acelerada}
\rightarrow
\text{campos variables}
\rightarrow
\text{onda electromagnética}
\rightarrow
\text{radiación}
$$

Este es el fundamento físico de las antenas.

Una antena transforma energía eléctrica suministrada por un circuito en energía electromagnética que se propaga por el espacio.

En recepción sucede el proceso inverso.

---

# Formulación fasorial

En ingeniería electromagnética, muchos problemas se estudian en régimen sinusoidal permanente.

Supongamos que todos los campos varían sinusoidalmente con frecuencia angular $\omega$.

Por ejemplo:

$$
\mathbf{E}(\mathbf{r},t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}(\mathbf{r})
e^{j\omega t}
\right\}
$$

El símbolo:

$$
\tilde{\mathbf{E}}
$$

representa el **fasor** del campo eléctrico.

De manera equivalente:

$$
\mathbf{H}(\mathbf{r},t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{H}}(\mathbf{r})
e^{j\omega t}
\right\}
$$

---

# Ventaja de los fasores

En el dominio temporal:

$$
\frac{\partial}{\partial t}
\mathbf{E}
$$

requiere realizar una derivación.

Pero:

$$
\mathbf{E}(\mathbf{r},t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}e^{j\omega t}
\right\}
$$

implica:

$$
\frac{\partial\mathbf{E}}{\partial t}
=
\operatorname{Re}
\left\{
j\omega
\tilde{\mathbf{E}}
e^{j\omega t}
\right\}
$$

Por tanto, en el dominio fasorial:

$$
\frac{\partial}{\partial t}
\longrightarrow
j\omega
$$

y:

$$
\frac{\partial^2}{\partial t^2}
\longrightarrow
-\omega^2
$$

Las ecuaciones diferenciales temporales se convierten así en ecuaciones algebraicas respecto a la dependencia temporal.

---

# Ecuaciones de Maxwell en forma fasorial

Partimos de:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

En régimen sinusoidal:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\tilde{\mathbf{B}}
$$

Si:

$$
\tilde{\mathbf{B}}
=
\mu\tilde{\mathbf{H}}
$$

entonces:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\mu\tilde{\mathbf{H}}
$$

Esta es la forma fasorial de Faraday.

---

Ampère-Maxwell:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\frac{\partial\mathbf{D}}{\partial t}
$$

se convierte en:

$$
\nabla\times\tilde{\mathbf{H}}
=
\tilde{\mathbf{J}}
+
j\omega\tilde{\mathbf{D}}
$$

Para un medio lineal:

$$
\tilde{\mathbf{D}}
=
\varepsilon\tilde{\mathbf{E}}
$$

y:

$$
\tilde{\mathbf{J}}
=
\sigma\tilde{\mathbf{E}}
$$

Por tanto:

$$
\nabla\times\tilde{\mathbf{H}}
=
(\sigma+j\omega\varepsilon)
\tilde{\mathbf{E}}
$$

---

# Permitividad compleja

Podemos introducir una cantidad muy útil:

$$
\varepsilon_c
=
\varepsilon
-
j\frac{\sigma}{\omega}
$$

Entonces:

$$
j\omega\varepsilon_c
=
j\omega
\left(
\varepsilon
-
j\frac{\sigma}{\omega}
\right)
$$

por lo que:

$$
j\omega\varepsilon_c
=
j\omega\varepsilon+\sigma
$$

Así:

$$
\sigma+j\omega\varepsilon
=
j\omega\varepsilon_c
$$

y Ampère-Maxwell puede escribirse:

$$
\nabla\times\tilde{\mathbf{H}}
=
j\omega\varepsilon_c
\tilde{\mathbf{E}}
$$

Esta representación permite tratar formalmente un medio conductor como un medio con una permitividad compleja.

---

# Maxwell fasorial completo

Para un medio lineal, homogéneo e isótropo:

$$
\nabla\cdot\tilde{\mathbf{D}}
=
\tilde{\rho}
$$

$$
\nabla\cdot\tilde{\mathbf{B}}
=
0
$$

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\tilde{\mathbf{B}}
$$

$$
\nabla\times\tilde{\mathbf{H}}
=
\tilde{\mathbf{J}}
+
j\omega\tilde{\mathbf{D}}
$$

Si además:

$$
\tilde{\mathbf{D}}
=
\varepsilon\tilde{\mathbf{E}}
$$

$$
\tilde{\mathbf{B}}
=
\mu\tilde{\mathbf{H}}
$$

y:

$$
\tilde{\mathbf{J}}
=
\sigma\tilde{\mathbf{E}}
$$

entonces:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\mu\tilde{\mathbf{H}}
$$

y:

$$
\nabla\times\tilde{\mathbf{H}}
=
(\sigma+j\omega\varepsilon)
\tilde{\mathbf{E}}
$$

Estas dos ecuaciones son las que se utilizan constantemente en problemas de ondas electromagnéticas en régimen sinusoidal.

---

# Ecuación de Helmholtz

En un medio homogéneo sin pérdidas:

$$
\sigma=0
$$

tenemos:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\mu\tilde{\mathbf{H}}
$$

y:

$$
\nabla\times\tilde{\mathbf{H}}
=
j\omega\varepsilon\tilde{\mathbf{E}}
$$

Tomamos el rotacional de la primera:

$$
\nabla\times
(\nabla\times\tilde{\mathbf{E}})
=
-j\omega\mu
(\nabla\times\tilde{\mathbf{H}})
$$

Sustituimos la segunda:

$$
\nabla\times
(\nabla\times\tilde{\mathbf{E}})
=
-j\omega\mu
(j\omega\varepsilon\tilde{\mathbf{E}})
$$

Como:

$$
-jj\omega^2\mu\varepsilon
=
\omega^2\mu\varepsilon
$$

queda:

$$
\nabla\times
(\nabla\times\tilde{\mathbf{E}})
=
\omega^2\mu\varepsilon
\tilde{\mathbf{E}}
$$

Utilizamos:

$$
\nabla\times
(\nabla\times\tilde{\mathbf{E}})
=
\nabla(\nabla\cdot\tilde{\mathbf{E}})
-
\nabla^2\tilde{\mathbf{E}}
$$

En una región sin carga:

$$
\nabla\cdot\tilde{\mathbf{E}}=0
$$

Por tanto:

$$
-\nabla^2\tilde{\mathbf{E}}
=
\omega^2\mu\varepsilon
\tilde{\mathbf{E}}
$$

Finalmente:

$$
\nabla^2\tilde{\mathbf{E}}
+
\omega^2\mu\varepsilon
\tilde{\mathbf{E}}
=
0
$$

Definimos:

$$
k^2
=
\omega^2\mu\varepsilon
$$

por lo que:

$$
\nabla^2\tilde{\mathbf{E}}
+
k^2\tilde{\mathbf{E}}
=
0
$$

Esta es la **ecuación de Helmholtz vectorial** para el campo eléctrico.

Análogamente:

$$
\nabla^2\tilde{\mathbf{H}}
+
k^2\tilde{\mathbf{H}}
=
0
$$

---

# Número de onda

El número de onda es:

$$
k
=
\omega\sqrt{\mu\varepsilon}
$$

Como:

$$
\omega=2\pi f
$$

y:

$$
\lambda=\frac{2\pi}{k}
$$

tenemos:

$$
\lambda
=
\frac{2\pi}
{\omega\sqrt{\mu\varepsilon}}
$$

Como:

$$
\omega=2\pi f
$$

queda:

$$
\lambda
=
\frac{1}
{f\sqrt{\mu\varepsilon}}
$$

Utilizando:

$$
v_p
=
\frac{1}{\sqrt{\mu\varepsilon}}
$$

obtenemos finalmente:

$$
\lambda
=
\frac{v_p}{f}
$$

que es la relación fundamental entre velocidad, frecuencia y longitud de onda.

---

# Diferencia entre $\beta$ y $k$

En un medio sin pérdidas:

$$
\beta
=
k
$$

por lo que:

$$
\beta
=
\omega\sqrt{\mu\varepsilon}
$$

En un medio con pérdidas, la constante de propagación es compleja:

$$
\gamma
=
\alpha+j\beta
$$

y $\beta$ sigue representando la variación espacial de la fase.

Por tanto:

* $k$ suele utilizarse como número de onda en medios sin pérdidas;
* $\beta$ es la constante de fase;
* $\gamma$ es la constante de propagación compleja.

En medios sin pérdidas:

$$
\alpha=0
$$

y:

$$
\gamma=j\beta
$$

---

# Velocidad de fase

La fase de una onda plana típica es:

$$
\omega t-\beta z
$$

Una superficie de fase constante satisface:

$$
\omega t-\beta z
=
\text{constante}
$$

Derivando:

$$
\omega-\beta
\frac{dz}{dt}
=
0
$$

por tanto:

$$
\frac{dz}{dt}
=
\frac{\omega}{\beta}
$$

Definimos la velocidad de fase:

$$
v_p
=
\frac{\omega}{\beta}
$$

En un medio sin pérdidas:

$$
\beta
=
\omega\sqrt{\mu\varepsilon}
$$

por lo que:

$$
v_p
=
\frac{1}
{\sqrt{\mu\varepsilon}}
$$

---

# Índice de refracción

En muchos problemas ópticos y electromagnéticos se define:

$$
n
=
\frac{c}{v_p}
$$

Para un medio no magnético aproximadamente:

$$
\mu\approx\mu_0
$$

y:

$$
\varepsilon
=
\varepsilon_r\varepsilon_0
$$

entonces:

$$
v_p
=
\frac{1}
{\sqrt{\mu_0\varepsilon_0\varepsilon_r}}
$$

Como:

$$
c
=
\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

obtenemos:

$$
v_p
=
\frac{c}{\sqrt{\varepsilon_r}}
$$

y:

$$
n
=
\sqrt{\varepsilon_r}
$$

para un medio no magnético.

Por ejemplo, si:

$$
\varepsilon_r=4
$$

entonces:

$$
v_p
=
\frac{c}{2}
$$

y:

$$
n=2
$$

Este resultado será directamente útil en problemas de propagación en medios dieléctricos.

---

# Relación entre $\beta$, frecuencia y longitud de onda

Tenemos:

$$
\beta
=
\frac{2\pi}{\lambda}
$$

y:

$$
\omega
=
2\pi f
$$

Por tanto:

$$
v_p
=
\frac{\omega}{\beta}
=
\frac{2\pi f}
{2\pi/\lambda}
$$

de donde:

$$
v_p=f\lambda
$$

Esta relación debe manejarse con soltura:

$$
v_p=f\lambda
$$

$$
\beta=\frac{2\pi}{\lambda}
$$

$$
\omega=2\pi f
$$

$$
v_p=\frac{\omega}{\beta}
$$

Son cuatro expresiones equivalentes que aparecen constantemente en problemas de ondas.

---

# La onda plana como solución de Helmholtz

Consideremos una onda que se propaga en la dirección $+z$.

Supongamos:

$$
\tilde{\mathbf{E}}(z)
=
\tilde{E}_0e^{-j\beta z}
\hat{\mathbf{x}}
$$

Esta expresión debe satisfacer:

$$
\nabla^2\tilde{\mathbf{E}}
+
\beta^2\tilde{\mathbf{E}}
=
0
$$

Como la dependencia espacial únicamente está en $z$:

$$
\frac{d^2\tilde{\mathbf{E}}}{dz^2}
+
\beta^2\tilde{\mathbf{E}}
=
0
$$

Derivando:

$$
\frac{d\tilde{\mathbf{E}}}{dz}
=
-j\beta
\tilde{\mathbf{E}}
$$

y:

$$
\frac{d^2\tilde{\mathbf{E}}}{dz^2}
=
-\beta^2
\tilde{\mathbf{E}}
$$

por tanto:

$$
-\beta^2\tilde{\mathbf{E}}
+
\beta^2\tilde{\mathbf{E}}
=
0
$$

La ecuación se satisface.

La solución general en una dimensión es:

$$
\tilde{E}(z)
=
E^+e^{-j\beta z}
+
E^-e^{j\beta z}
$$

Los dos términos representan ondas que viajan en direcciones opuestas.

---

# Identificación de la dirección de propagación

Consideremos:

$$
E^+e^{-j\beta z}
$$

Al volver al dominio temporal:

$$
E^+(z,t)
=
\operatorname{Re}
\left\{
E^+
e^{j\omega t}
e^{-j\beta z}
\right\}
$$

por lo que:

$$
E^+(z,t)
\propto
\cos(\omega t-\beta z)
$$

La fase constante cumple:

$$
\omega t-\beta z
=
\text{constante}
$$

por tanto:

$$
z
=
\frac{\omega}{\beta}t
+
\text{constante}
$$

y la onda se desplaza hacia:

$$
+z
$$

En cambio:

$$
E^-e^{j\beta z}
$$

produce:

$$
\cos(\omega t+\beta z)
$$

y se propaga hacia:

$$
-z
$$

Este criterio es fundamental:

$$
e^{-j\beta z}
\rightarrow
+z
$$

$$
e^{+j\beta z}
\rightarrow
-z
$$

cuando se adopta la convención temporal $e^{j\omega t}$.

---

# Relación entre $\mathbf{E}$ y $\mathbf{H}$

Partimos de:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\omega\mu\tilde{\mathbf{H}}
$$

Supongamos:

$$
\tilde{\mathbf{E}}
=
\tilde{E}_0
e^{-j\beta z}
\hat{\mathbf{x}}
$$

Calculamos el rotacional.

Como únicamente existe componente $x$ y depende de $z$:

$$
\nabla\times\tilde{\mathbf{E}}
=
\frac{\partial E_x}{\partial z}
\hat{\mathbf{y}}
$$

Con:

$$
\frac{\partial E_x}{\partial z}
=
-j\beta E_x
$$

obtenemos:

$$
\nabla\times\tilde{\mathbf{E}}
=
-j\beta E_x
\hat{\mathbf{y}}
$$

Por Faraday:

$$
-j\beta E_x
\hat{\mathbf{y}}
=
-j\omega\mu
\tilde{\mathbf{H}}
$$

Cancelamos $-j$:

$$
\beta E_x
\hat{\mathbf{y}}
=
\omega\mu
\tilde{\mathbf{H}}
$$

por tanto:

$$
\tilde{\mathbf{H}}
=
\frac{\beta}{\omega\mu}
E_x
\hat{\mathbf{y}}
$$

Como:

$$
\frac{\beta}{\omega\mu}
=
\frac{1}{\omega\mu/\beta}
$$

y:

$$
\eta
=
\frac{\omega\mu}{\beta}
$$

tenemos:

$$
\tilde{\mathbf{H}}
=
\frac{1}{\eta}
\tilde{\mathbf{E}}
\hat{\mathbf{y}}
$$

Por tanto:

$$
\tilde{E}
=
\eta\tilde{H}
$$

---

# Impedancia intrínseca en un medio sin pérdidas

Para un medio sin pérdidas:

$$
\eta
=
\sqrt{\frac{\mu}{\varepsilon}}
$$

En el vacío:

$$
\eta_0
=
\sqrt{\frac{\mu_0}{\varepsilon_0}}
$$

y su valor es aproximadamente:

$$
\eta_0
\approx
377\,\Omega
$$

Esta magnitud recibe el nombre de **impedancia intrínseca del vacío**.

Por tanto, para una onda plana en el vacío:

$$
E
=
377H
$$

si $E$ se expresa en $\mathrm{V/m}$ y $H$ en $\mathrm{A/m}$.

---

# Estructura geométrica de una onda plana

Para una onda que se propaga hacia $+z$:

$$
\mathbf{E}
\perp
\mathbf{H}
$$

y:

$$
\mathbf{E}
\perp
\hat{\mathbf{z}}
$$

además:

$$
\mathbf{H}
\perp
\hat{\mathbf{z}}
$$

Por tanto:

$$
\mathbf{E}
\perp
\mathbf{H}
\perp
\mathbf{k}
$$

donde $\mathbf{k}$ es el vector de propagación.

Además:

$$
\mathbf{E}\times\mathbf{H}
\parallel
\mathbf{k}
$$

Esto proporciona una regla geométrica esencial:

> En una onda electromagnética plana, el campo eléctrico, el campo magnético y la dirección de propagación forman una tríada ortogonal.

---

# Polarización

Hasta ahora hemos elegido:

$$
\mathbf{E}
=
E_0\hat{\mathbf{x}}
$$

pero no existe ninguna razón fundamental para que el campo eléctrico tenga que estar únicamente en $x$.

En general, para una onda propagándose en $z$:

$$
\mathbf{E}
=
E_x\hat{\mathbf{x}}
+
E_y\hat{\mathbf{y}}
$$

La relación entre las amplitudes y fases de $E_x$ y $E_y$ determina la **polarización**.

Podemos tener:

* polarización lineal;
* polarización circular;
* polarización elíptica.

---

# Polarización lineal

Si:

$$
E_x
=
E_{0x}
\cos(\omega t-\beta z)
$$

y:

$$
E_y
=
E_{0y}
\cos(\omega t-\beta z)
$$

ambas componentes están en fase.

La dirección del campo eléctrico permanece fija.

Por tanto, la polarización es lineal.

---

# Polarización circular

Supongamos dos componentes de igual amplitud con una diferencia de fase de $90^\circ$:

$$
E_x
=
E_0
\cos(\omega t-\beta z)
$$

$$
E_y
=
E_0
\sin(\omega t-\beta z)
$$

Entonces:

$$
\frac{E_x^2}{E_0^2}
+
\frac{E_y^2}{E_0^2}
=
1
$$

por lo que:

$$
E_x^2+E_y^2
=
E_0^2
$$

El extremo del vector $\mathbf{E}$ describe un círculo.

La onda tiene polarización circular.

---

# Polarización elíptica

Si las amplitudes son distintas o la diferencia de fase no es exactamente $90^\circ$, en general obtenemos una elipse.

Por eso la polarización circular puede considerarse un caso particular de la polarización elíptica.

La lineal también puede entenderse como un caso límite.

---

# Importancia de la polarización

La polarización no es simplemente una característica matemática.

Tiene consecuencias directas en:

* antenas;
* comunicaciones inalámbricas;
* radar;
* satélites;
* enlaces de microondas;
* fibra óptica;
* sensores;
* teledetección.

Dos antenas con polarizaciones incompatibles pueden presentar una pérdida importante de potencia recibida.

Por eso la polarización forma parte esencial del diseño de sistemas electromagnéticos.

---

# Imagen conceptual final

Podemos reunir todo el formalismo desarrollado hasta ahora.

Una fuente produce:

$$
\rho,\mathbf{J}
$$

Estas fuentes generan potenciales:

$$
\phi,\mathbf{A}
$$

mediante ecuaciones de onda.

Los potenciales producen los campos:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

Los campos satisfacen las ecuaciones de Maxwell.

En una región sin fuentes pueden propagarse como ondas.

En régimen sinusoidal utilizamos fasores:

$$
\mathbf{E}(\mathbf{r},t)
=
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}(\mathbf{r})
e^{j\omega t}
\right\}
$$

y las ecuaciones de Maxwell se transforman en ecuaciones fasoriales.

En un medio homogéneo sin pérdidas obtenemos la ecuación de Helmholtz:

$$
\nabla^2\tilde{\mathbf{E}}
+
k^2\tilde{\mathbf{E}}
=
0
$$

con:

$$
k
=
\omega\sqrt{\mu\varepsilon}
$$

Una solución de onda plana es:

$$
\tilde{\mathbf{E}}
=
\mathbf{E}_0e^{-j\beta z}
$$

con:

$$
\beta=k
$$

y:

$$
v_p
=
\frac{\omega}{\beta}
=
\frac{1}{\sqrt{\mu\varepsilon}}
$$

El campo magnético asociado es:

$$
\tilde{\mathbf{H}}
=
\frac{1}{\eta}
\hat{\mathbf{k}}
\times
\tilde{\mathbf{E}}
$$

donde:

$$
\eta
=
\sqrt{\frac{\mu}{\varepsilon}}
$$

Finalmente, la energía se transporta mediante:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

Esta cadena conecta directamente:

$$
\text{fuentes}
\rightarrow
\text{potenciales}
\rightarrow
\text{campos}
\rightarrow
\text{ondas}
\rightarrow
\text{energía}
$$

y constituye una de las visiones más completas del electromagnetismo clásico.

# Siguiente desarrollo

A partir de aquí, el siguiente bloque fundamental consiste en estudiar qué ocurre cuando una onda encuentra una **discontinuidad entre dos medios**.

Esto conduce de forma natural a:

* condiciones de contorno de Maxwell;
* reflexión;
* transmisión;
* coeficientes de Fresnel;
* incidencia normal;
* incidencia oblicua;
* polarizaciones TE y TM;
* ángulo de Brewster;
* reflexión interna total;
* ondas evanescentes;
* impedancias de onda;
* potencia reflejada y transmitida.

Estos fenómenos constituyen la conexión entre las ecuaciones de Maxwell y muchos problemas reales de antenas, microondas, óptica, RF y transmisión de ondas.


# Condiciones de contorno, reflexión y transmisión

Hasta ahora hemos estudiado cómo se propagan las ondas electromagnéticas dentro de un medio.

Pero en problemas reales aparece constantemente una situación diferente:

> ¿Qué ocurre cuando una onda electromagnética que se propaga por un medio llega a la frontera con otro medio?

Por ejemplo:

* una onda que pasa del aire al vidrio;
* una onda que pasa del aire al agua;
* una señal de radio que llega a una pared;
* una onda que llega a un conductor;
* una onda que incide sobre una antena;
* una onda que pasa de un dieléctrico a otro.

En general, cuando una onda llega a una interfaz aparecen dos fenómenos:

$$
\boxed{\text{reflexión}}
$$

y:

$$
\boxed{\text{transmisión}}
$$

Una parte de la energía puede regresar al primer medio y otra puede penetrar en el segundo.

La proporción entre ambas depende de las propiedades electromagnéticas de los medios y de la geometría de la incidencia.

---

# La interfaz entre dos medios

Consideremos dos medios separados por una superficie plana.

Supongamos inicialmente que la interfaz está situada en:

$$
z=0
$$

y que:

* medio 1 ocupa $z<0$;
* medio 2 ocupa $z>0$.

Cada medio puede caracterizarse mediante:

$$
\varepsilon_1,\mu_1,\sigma_1
$$

y:

$$
\varepsilon_2,\mu_2,\sigma_2
$$

Si ambos medios son dieléctricos ideales:

$$
\sigma_1=\sigma_2=0
$$

y las impedancias intrínsecas son:

$$
\eta_1
=
\sqrt{\frac{\mu_1}{\varepsilon_1}}
$$

y:

$$
\eta_2
=
\sqrt{\frac{\mu_2}{\varepsilon_2}}
$$

---

# ¿Por qué aparecen ondas reflejadas?

Supongamos que una onda viaja por el medio 1 hacia la interfaz.

Si:

$$
\eta_1=\eta_2
$$

la onda puede continuar hacia el segundo medio sin necesidad de producir una onda reflejada.

Pero si:

$$
\eta_1\neq\eta_2
$$

los campos eléctricos y magnéticos deben satisfacer simultáneamente las condiciones de contorno de Maxwell.

En general, esto obliga a generar una segunda onda que se propaga en sentido contrario.

Esa es la onda reflejada.

Por tanto:

$$
\text{onda incidente}
\rightarrow
\begin{cases}
\text{onda reflejada}\\
\text{onda transmitida}
\end{cases}
$$

La reflexión no es un fenómeno añadido artificialmente al modelo.

Aparece necesariamente al imponer las ecuaciones de Maxwell en la interfaz.

---

# Condiciones de contorno de Maxwell

Las condiciones de contorno son una de las consecuencias más importantes de las ecuaciones de Maxwell.

Consideremos una superficie que separa dos medios.

Definimos un vector normal unitario:

$$
\hat{\mathbf{n}}
$$

que apunta del medio 1 al medio 2.

---

# Componente tangencial del campo eléctrico

Partimos de la ley de Faraday integral:

$$
\oint_C
\mathbf{E}\cdot d\mathbf{l}
=
-\frac{d}{dt}
\int_S
\mathbf{B}\cdot d\mathbf{S}
$$

Tomamos un rectángulo extremadamente pequeño que atraviesa la interfaz.

Cuando hacemos que su altura tienda a cero, el flujo magnético encerrado también tiende a cero para campos finitos.

Por tanto:

$$
\oint_C
\mathbf{E}\cdot d\mathbf{l}
=
0
$$

y obtenemos:

$$
\mathbf{E}_{2t}
=
\mathbf{E}_{1t}
$$

Es decir:

> La componente tangencial del campo eléctrico es continua a través de una interfaz.

En forma vectorial:

$$
\hat{\mathbf{n}}
\times
(\mathbf{E}_2-\mathbf{E}_1)
=
0
$$

---

# Componente tangencial del campo magnético

Partimos de la ley de Ampère-Maxwell:

$$
\oint_C
\mathbf{H}\cdot d\mathbf{l}
=
\int_S
\mathbf{J}\cdot d\mathbf{S}
+
\frac{d}{dt}
\int_S
\mathbf{D}\cdot d\mathbf{S}
$$

Ahora puede existir una corriente superficial:

$$
\mathbf{J}_s
$$

medida en:

$$
\mathrm{A/m}
$$

En el límite de una superficie infinitamente pequeña obtenemos:

$$
\hat{\mathbf{n}}
\times
(\mathbf{H}_2-\mathbf{H}_1)
=
\mathbf{J}_s
$$

Si no existe corriente superficial:

$$
\mathbf{J}_s=0
$$

entonces:

$$
\hat{\mathbf{n}}
\times
(\mathbf{H}_2-\mathbf{H}_1)
=
0
$$

y:

$$
\mathbf{H}_{2t}
=
\mathbf{H}_{1t}
$$

---

# Componente normal de $\mathbf{D}$

Utilizamos la ley de Gauss:

$$
\oint_S
\mathbf{D}\cdot d\mathbf{A}
=
Q_f
$$

Consideramos una pequeña pastilla atravesando la interfaz.

En el límite:

$$
\hat{\mathbf{n}}\cdot
(\mathbf{D}_2-\mathbf{D}_1)
=
\rho_s
$$

donde $\rho_s$ es una densidad superficial de carga libre:

$$
[\rho_s]=\mathrm{C/m^2}
$$

Si no existe carga superficial libre:

$$
\rho_s=0
$$

entonces:

$$
D_{2n}
=
D_{1n}
$$

---

# Componente normal de $\mathbf{B}$

Como:

$$
\nabla\cdot\mathbf{B}=0
$$

no existen monopolos magnéticos.

La aplicación de esta ecuación a una pequeña superficie cerrada atravesando la interfaz produce:

$$
\hat{\mathbf{n}}\cdot
(\mathbf{B}_2-\mathbf{B}_1)
=
0
$$

por tanto:

$$
B_{2n}
=
B_{1n}
$$

La componente normal de $\mathbf{B}$ siempre es continua.

---

# Resumen de las condiciones de contorno

Las cuatro condiciones fundamentales son:

$$
\hat{\mathbf{n}}
\times
(\mathbf{E}_2-\mathbf{E}_1)
=
0
$$

$$
\hat{\mathbf{n}}
\times
(\mathbf{H}_2-\mathbf{H}_1)
=
\mathbf{J}_s
$$

$$
\hat{\mathbf{n}}\cdot
(\mathbf{D}_2-\mathbf{D}_1)
=
\rho_s
$$

$$
\hat{\mathbf{n}}\cdot
(\mathbf{B}_2-\mathbf{B}_1)
=
0
$$

En una interfaz sin carga ni corriente superficial:

$$
\mathbf{E}_{1t}
=
\mathbf{E}_{2t}
$$

$$
\mathbf{H}_{1t}
=
\mathbf{H}_{2t}
$$

$$
D_{1n}
=
D_{2n}
$$

$$
B_{1n}
=
B_{2n}
$$

Estas cuatro relaciones son fundamentales para todos los problemas de reflexión y transmisión.

---

# Incidencia normal

Comenzaremos con el caso más sencillo:

> Una onda plana incide perpendicularmente sobre la interfaz.

Supongamos:

* interfaz en $z=0$;
* onda incidente propagándose hacia $+z$;
* onda reflejada propagándose hacia $-z$;
* onda transmitida propagándose hacia $+z$.

Podemos escribir:

$$
\tilde{\mathbf{E}}_i
=
\mathbf{E}_{0i}
e^{-j\beta_1z}
$$

$$
\tilde{\mathbf{E}}_r
=
\mathbf{E}_{0r}
e^{+j\beta_1z}
$$

$$
\tilde{\mathbf{E}}_t
=
\mathbf{E}_{0t}
e^{-j\beta_2z}
$$

---

# Elección de las direcciones

Supongamos:

$$
\tilde{\mathbf{E}}_i
=
\tilde{E}_i
e^{-j\beta_1z}
\hat{\mathbf{x}}
$$

Como la onda incidente viaja hacia $+z$, el campo magnético debe apuntar hacia $+y$:

$$
\tilde{\mathbf{H}}_i
=
\frac{\tilde{E}_i}{\eta_1}
e^{-j\beta_1z}
\hat{\mathbf{y}}
$$

Para la onda reflejada, la dirección de propagación es $-z$.

El campo eléctrico puede seguir apuntando en $x$, pero ahora:

$$
\mathbf{E}_r
\times
\mathbf{H}_r
\parallel
-z
$$

Por tanto:

$$
\tilde{\mathbf{H}}_r
=
-\frac{\tilde{E}_r}{\eta_1}
e^{+j\beta_1z}
\hat{\mathbf{y}}
$$

Finalmente, la onda transmitida viaja hacia $+z$:

$$
\tilde{\mathbf{H}}_t
=
\frac{\tilde{E}_t}{\eta_2}
e^{-j\beta_2z}
\hat{\mathbf{y}}
$$

---

# Condición de contorno para $\mathbf{E}$

En:

$$
z=0
$$

el campo eléctrico total en el medio 1 es:

$$
\tilde{E}_1
=
\tilde{E}_i+\tilde{E}_r
$$

Mientras que en el medio 2:

$$
\tilde{E}_2
=
\tilde{E}_t
$$

La continuidad de la componente tangencial de $\mathbf{E}$ exige:

$$
\tilde{E}_i
+
\tilde{E}_r
=
\tilde{E}_t
$$

Esta es la primera ecuación.

---

# Condición de contorno para $\mathbf{H}$

En el medio 1:

$$
\tilde{H}_1
=
\tilde{H}_i+\tilde{H}_r
$$

pero:

$$
\tilde{H}_r
=
-\frac{\tilde{E}_r}{\eta_1}
$$

por tanto:

$$
\tilde{H}_1
=
\frac{\tilde{E}_i}{\eta_1}
-
\frac{\tilde{E}_r}{\eta_1}
$$

En el medio 2:

$$
\tilde{H}_2
=
\frac{\tilde{E}_t}{\eta_2}
$$

La continuidad de la componente tangencial de $\mathbf{H}$ exige:

$$
\frac{\tilde{E}_i}{\eta_1}
-
\frac{\tilde{E}_r}{\eta_1}
=
\frac{\tilde{E}_t}{\eta_2}
$$

Tenemos ahora dos ecuaciones:

$$
\tilde{E}_i+\tilde{E}_r
=
\tilde{E}_t
$$

$$
\frac{\tilde{E}_i-\tilde{E}_r}{\eta_1}
=
\frac{\tilde{E}_t}{\eta_2}
$$

---

# Coeficiente de reflexión

Definimos el coeficiente de reflexión del campo eléctrico:

$$
\Gamma
=
\frac{\tilde{E}_r}{\tilde{E}_i}
$$

Utilizando:

$$
\tilde{E}_t
=
\tilde{E}_i+\tilde{E}_r
$$

podemos escribir:

$$
\tilde{E}_t
=
\tilde{E}_i(1+\Gamma)
$$

Sustituimos en la ecuación magnética:

$$
\frac{\tilde{E}_i-\tilde{E}_r}{\eta_1}
=
\frac{\tilde{E}_t}{\eta_2}
$$

Dividimos por $\tilde{E}_i$:

$$
\frac{1-\Gamma}{\eta_1}
=
\frac{1+\Gamma}{\eta_2}
$$

Multiplicamos:

$$
\eta_2(1-\Gamma)
=
\eta_1(1+\Gamma)
$$

Desarrollamos:

$$
\eta_2-\eta_2\Gamma
=
\eta_1+\eta_1\Gamma
$$

Agrupamos:

$$
\eta_2-\eta_1
=
\Gamma(\eta_1+\eta_2)
$$

Finalmente:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

Esta es una de las fórmulas fundamentales de electromagnetismo.

---

# Coeficiente de transmisión del campo eléctrico

Definimos:

$$
\tau
=
\frac{\tilde{E}_t}
{\tilde{E}_i}
$$

Como:

$$
\tilde{E}_t
=
\tilde{E}_i+\tilde{E}_r
$$

obtenemos:

$$
\tau
=
1+\Gamma
$$

Sustituyendo $\Gamma$:

$$
\tau
=
1+
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

Ponemos todo sobre el mismo denominador:

$$
\tau
=
\frac{\eta_2+\eta_1+\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

Por tanto:

$$
\tau
=
\frac{2\eta_2}
{\eta_1+\eta_2}
$$

Así:

$$
\frac{\tilde{E}_t}
{\tilde{E}_i}
=
\frac{2\eta_2}
{\eta_1+\eta_2}
$$

---

# Caso de medios idénticos

Si:

$$
\eta_1=\eta_2
$$

entonces:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
=
0
$$

No existe reflexión.

Además:

$$
\tau
=
\frac{2\eta_2}
{\eta_1+\eta_2}
=
1
$$

por tanto:

$$
E_r=0
$$

y:

$$
E_t=E_i
$$

Tiene sentido físico: si los dos medios son electromagnéticamente idénticos, la onda no encuentra ninguna discontinuidad.

---

# Caso de un conductor perfecto

Consideremos un conductor perfecto.

Idealmente:

$$
\sigma\rightarrow\infty
$$

Su impedancia intrínseca tiende a:

$$
\eta_2\rightarrow0
$$

Entonces:

$$
\Gamma
=
\frac{0-\eta_1}
{0+\eta_1}
=
-1
$$

Por tanto:

$$
\tilde{E}_r
=
-\tilde{E}_i
$$

El campo eléctrico reflejado tiene la misma amplitud pero un cambio de fase de:

$$
180^\circ
$$

Además:

$$
\tau
=
\frac{2\eta_2}
{\eta_1+\eta_2}
\rightarrow0
$$

No existe campo eléctrico transmitido en el conductor perfecto.

Esto explica una propiedad fundamental de un conductor perfecto:

$$
E_t=0
$$

en su superficie.

---

# ¿Qué ocurre con el campo magnético?

Para la onda reflejada:

$$
\tilde{\mathbf{H}}_r
=
-\frac{\tilde{E}_r}{\eta_1}\hat{\mathbf{y}}
$$

Si:

$$
\tilde{E}_r=-\tilde{E}_i
$$

entonces:

$$
\tilde{\mathbf{H}}_r
=
\frac{\tilde{E}_i}{\eta_1}
\hat{\mathbf{y}}
$$

Por tanto, los campos magnéticos incidente y reflejado están en fase.

Esto tiene como consecuencia que, cerca del conductor, se formen patrones de interferencia.

---

# Ondas estacionarias

Cuando una onda incidente y una onda reflejada se superponen, el campo total puede escribirse como:

$$
\tilde{E}(z)
=
E_i e^{-j\beta z}
+
E_r e^{j\beta z}
$$

Si:

$$
E_r=\Gamma E_i
$$

entonces:

$$
\tilde{E}(z)
=
E_i
\left(
e^{-j\beta z}
+
\Gamma e^{j\beta z}
\right)
$$

Cuando la reflexión es importante, el módulo del campo ya no es constante.

Aparecen máximos y mínimos espaciales.

Esto constituye una **onda estacionaria** o, más precisamente, una superposición de ondas que puede producir un patrón estacionario.

---

# Caso de reflexión total

Si:

$$
|\Gamma|=1
$$

la onda reflejada tiene la misma amplitud que la incidente.

Esto ocurre, por ejemplo, ante un conductor perfecto.

Para $\Gamma=-1$:

$$
\tilde{E}(z)
=
E_i
\left(
e^{-j\beta z}
-
e^{j\beta z}
\right)
$$

Utilizamos:

$$
e^{-j\theta}
-
e^{j\theta}
=
-2j\sin\theta
$$

por lo que:

$$
\tilde{E}(z)
=
-2jE_i\sin(\beta z)
$$

El módulo es proporcional a:

$$
|\sin(\beta z)|
$$

Aparecen posiciones donde:

$$
E=0
$$

denominadas nodos, y posiciones de máximo campo denominadas vientres o antinodos.

---

# Distancia entre nodos

Los ceros de:

$$
\sin(\beta z)
$$

aparecen cuando:

$$
\beta z=n\pi
$$

por tanto:

$$
z_n
=
\frac{n\pi}{\beta}
$$

Como:

$$
\beta
=
\frac{2\pi}{\lambda}
$$

tenemos:

$$
z_n
=
\frac{n\lambda}{2}
$$

Por tanto, la distancia entre dos nodos consecutivos es:

$$
\frac{\lambda}{2}
$$

La distancia entre un nodo y el vientre más próximo es:

$$
\frac{\lambda}{4}
$$

---

# Potencia reflejada

El coeficiente $\Gamma$ describe amplitudes de campo.

Pero muchas veces nos interesa la potencia.

Para una onda plana sin pérdidas:

$$
\langle S\rangle
=
\frac{|E_0|^2}{2\eta}
$$

La potencia reflejada es proporcional a:

$$
|E_r|^2
$$

Por tanto, la fracción de potencia reflejada es:

$$
R
=
\frac{P_r}{P_i}
=
|\Gamma|^2
$$

A $R$ se le denomina **reflectancia**.

---

# Potencia transmitida

En medios sin pérdidas:

$$
T
=
\frac{P_t}{P_i}
$$

y la conservación de energía exige:

$$
R+T=1
$$

Es decir:

$$
|\Gamma|^2+T=1
$$

En términos de las impedancias:

$$
T
=
\frac{\eta_2}{\eta_1}
|\tau|^2
$$

Como:

$$
\tau
=
\frac{2\eta_2}
{\eta_1+\eta_2}
$$

obtenemos:

$$
T
=
\frac{\eta_2}{\eta_1}
\left|
\frac{2\eta_2}
{\eta_1+\eta_2}
\right|^2
$$

Para medios reales sin pérdidas, las impedancias son reales.

Entonces:

$$
T
=
\frac{4\eta_1\eta_2}
{(\eta_1+\eta_2)^2}
$$

Mientras que:

$$
R
=
\left(
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
\right)^2
$$

Se verifica:

$$
R+T=1
$$

---

# Interpretación energética

Es importante distinguir tres conceptos:

### Coeficiente de reflexión

$$
\Gamma
=
\frac{E_r}{E_i}
$$

Describe una relación de **amplitudes de campo**.

Puede ser negativo o complejo.

### Reflectancia

$$
R=|\Gamma|^2
$$

Describe una relación de **potencias**.

Siempre:

$$
R\geq0
$$

### Transmitancia

$$
T=\frac{P_t}{P_i}
$$

Describe la fracción de potencia que atraviesa la interfaz.

En medios sin pérdidas:

$$
R+T=1
$$

---

# Ejemplo conceptual: aire → vidrio

Supongamos aproximadamente:

$$
\eta_1=\eta_0
$$

y un vidrio no magnético con:

$$
\varepsilon_r=4
$$

Entonces:

$$
\eta_2
=
\sqrt{\frac{\mu_0}
{4\varepsilon_0}}
$$

por tanto:

$$
\eta_2
=
\frac{\eta_0}{2}
$$

El coeficiente de reflexión es:

$$
\Gamma
=
\frac{\eta_0/2-\eta_0}
{\eta_0/2+\eta_0}
$$

Simplificando:

$$
\Gamma
=
-\frac{1}{3}
$$

Por tanto:

$$
R
=
|\Gamma|^2
=
\frac{1}{9}
$$

aproximadamente:

$$
R\approx11.1\%
$$

Es decir, alrededor del $11%$ de la potencia se refleja en incidencia normal para este ejemplo idealizado.

El resto se transmite.

---

# Reflexión y adaptación

La fórmula:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

muestra que la reflexión aparece debido a una **desadaptación de impedancias**.

Cuanto más diferentes sean:

$$
\eta_1
$$

y:

$$
\eta_2
$$

mayor será generalmente la reflexión.

Si:

$$
\eta_1=\eta_2
$$

entonces:

$$
\Gamma=0
$$

y tenemos adaptación perfecta.

Esta idea es extremadamente importante porque es exactamente la misma filosofía que aparece en:

* líneas de transmisión;
* circuitos de RF;
* antenas;
* conectores;
* guías de onda;
* sistemas de microondas.

La reflexión electromagnética y la reflexión en una línea de transmisión son manifestaciones relacionadas del mismo problema físico: una onda encuentra un cambio de impedancia.

---

# Incidencia oblicua

Hasta ahora hemos supuesto:

$$
\theta_i=0
$$

es decir, incidencia normal.

Pero en general una onda puede llegar a la interfaz formando un ángulo.

Definimos:

* $\theta_i$: ángulo de incidencia;
* $\theta_r$: ángulo de reflexión;
* $\theta_t$: ángulo de transmisión o refracción.

Todos se miden respecto a la normal a la superficie.

---

# Ley de la reflexión

Una consecuencia de las condiciones de contorno y de la continuidad de la fase sobre la interfaz es:

$$
\theta_r=\theta_i
$$

Esta es la ley de la reflexión.

Pero existe una segunda relación fundamental para la transmisión.

---

# Ley de Snell

La continuidad de fase tangencial exige que:

$$
\beta_1\sin\theta_i
=
\beta_2\sin\theta_t
$$

Como:

$$
\beta
=
\omega\sqrt{\mu\varepsilon}
$$

podemos escribir:

$$
\sqrt{\mu_1\varepsilon_1}
\sin\theta_i
=
\sqrt{\mu_2\varepsilon_2}
\sin\theta_t
$$

Utilizando:

$$
n
=
\frac{c}{v_p}
$$

se obtiene la conocida ley de Snell:

$$
n_1\sin\theta_i
=
n_2\sin\theta_t
$$

Esta relación explica la refracción.

---

# ¿Por qué se refracta una onda?

Cuando la onda entra en un medio diferente cambia su velocidad de fase:

$$
v_{p1}
\neq
v_{p2}
$$

pero la frecuencia permanece constante:

$$
f_1=f_2
$$

Como:

$$
v_p=f\lambda
$$

si cambia $v_p$ y $f$ permanece constante, necesariamente cambia la longitud de onda:

$$
\lambda_1
\neq
\lambda_2
$$

Como:

$$
\beta
=
\frac{2\pi}{\lambda}
$$

también cambia:

$$
\beta_1
\neq
\beta_2
$$

El resultado geométrico es la refracción.

---

# La frecuencia no cambia al cruzar la interfaz

Este punto es muy importante.

Al pasar de un medio a otro:

$$
f_1=f_2
$$

porque la frecuencia está determinada por la oscilación temporal de la fuente.

Lo que cambia es:

$$
v_p
$$

y por tanto:

$$
\lambda
$$

y:

$$
\beta
$$

Es incorrecto decir que la onda cambia de frecuencia simplemente por entrar en otro medio estacionario.

---

# Polarizaciones TE y TM

En incidencia oblicua ya no basta con hablar simplemente de "campo eléctrico paralelo" o "perpendicular".

Aparecen dos polarizaciones fundamentales.

## Polarización TE

TE significa:

**Transverse Electric**

El campo eléctrico es perpendicular al plano de incidencia.

También se denomina polarización **s**.

Si el plano de incidencia es el plano $xz$, entonces:

$$
\mathbf{E}
\parallel
\hat{\mathbf{y}}
$$

---

## Polarización TM

TM significa:

**Transverse Magnetic**

El campo magnético es perpendicular al plano de incidencia.

También se denomina polarización **p**.

Si el plano de incidencia es $xz$, entonces:

$$
\mathbf{H}
\parallel
\hat{\mathbf{y}}
$$

y el campo eléctrico se encuentra en el plano $xz$.

---

# ¿Por qué aparecen dos coeficientes de reflexión?

En incidencia normal no existe una distinción física entre TE y TM.

Pero cuando:

$$
\theta_i\neq0
$$

la geometría rompe esa simetría.

Los campos eléctrico y magnético interactúan con la interfaz de forma diferente dependiendo de su orientación.

Por ello obtenemos:

$$
\Gamma_{TE}
$$

y:

$$
\Gamma_{TM}
$$

que son diferentes en general.

Estas son las ecuaciones de Fresnel.

---

# Coeficiente de Fresnel para TE

Para dos medios dieléctricos sin pérdidas:

$$
\Gamma_{TE}
=
\frac{
\eta_2\cos\theta_i
-
\eta_1\cos\theta_t
}{
\eta_2\cos\theta_i
+
\eta_1\cos\theta_t
}
$$

Este coeficiente relaciona la amplitud del campo eléctrico reflejado con la incidente para polarización TE.

---

# Coeficiente de Fresnel para TM

Para polarización TM:

$$
\Gamma_{TM}
=
\frac{
\eta_2\cos\theta_t
-
\eta_1\cos\theta_i
}{
\eta_2\cos\theta_t
+
\eta_1\cos\theta_i
}
$$

Existen distintas convenciones de signo en algunos textos dependiendo de cómo se definan los vectores de polarización.

Por eso, en problemas concretos, es importante mantener una convención coherente para los vectores unitarios.

---

# Ángulo de Brewster

Una propiedad extraordinariamente importante aparece en polarización TM.

Existe un ángulo de incidencia para el cual:

$$
\Gamma_{TM}=0
$$

Es decir:

> No existe onda reflejada para la polarización TM.

Este ángulo se denomina **ángulo de Brewster**.

Para medios no magnéticos:

$$
\tan\theta_B
=
\frac{n_2}{n_1}
$$

si la onda pasa del medio 1 al medio 2.

Por ejemplo, si:

$$
n_1=1
$$

y:

$$
n_2=2
$$

entonces:

$$
\tan\theta_B=2
$$

y:

$$
\theta_B
=
\arctan(2)
$$

aproximadamente:

$$
\theta_B\approx63.4^\circ
$$

En ese ángulo:

$$
R_{TM}=0
$$

---

# Reflexión interna total

Consideremos ahora una onda que pasa de un medio con mayor índice de refracción a uno con menor:

$$
n_1>n_2
$$

Por la ley de Snell:

$$
n_1\sin\theta_i
=
n_2\sin\theta_t
$$

Si aumentamos $\theta_i$, llegará un momento en que:

$$
\sin\theta_t=1
$$

El ángulo correspondiente es el **ángulo crítico**:

$$
\theta_c
=
\arcsin
\left(
\frac{n_2}{n_1}
\right)
$$

para:

$$
n_1>n_2
$$

Si:

$$
\theta_i>\theta_c
$$

la ecuación de Snell exigiría:

$$
\sin\theta_t>1
$$

lo cual no es posible para un ángulo real.

Por tanto, no existe una onda propagante transmitida.

Se produce:

$$
\boxed{\text{reflexión interna total}}
$$

---

# Onda evanescente

Aunque no exista una onda transmitida propagándose hacia el segundo medio, el campo electromagnético no es necesariamente exactamente cero allí.

Aparece una **onda evanescente**.

Su amplitud decrece exponencialmente alejándose de la interfaz.

Esquemáticamente:

$$
E(z)
\propto
e^{-\alpha z}
$$

pero sin transportar potencia neta normal hacia el interior del segundo medio de la misma forma que una onda propagante.

Este fenómeno es fundamental en:

* fibra óptica;
* guías de onda;
* sensores ópticos;
* microscopía de campo cercano;
* acoplamiento evanescente;
* túnel óptico.

---

# Significado profundo de la reflexión y transmisión

Podemos resumir toda esta sección con una idea fundamental:

> Las ondas electromagnéticas no "deciden" arbitrariamente cuánto reflejarse y cuánto transmitirse. Los coeficientes de reflexión y transmisión son consecuencia directa de las ecuaciones de Maxwell y de las condiciones de contorno.

La secuencia lógica es:

$$
\text{Maxwell}
$$

$$
\downarrow
$$

$$
\text{condiciones de contorno}
$$

$$
\downarrow
$$

$$
\text{relaciones entre amplitudes}
$$

$$
\downarrow
$$

$$
\Gamma,\tau
$$

$$
\downarrow
$$

$$
\text{potencia reflejada/transmitida}
$$

Y en incidencia oblicua:

$$
\text{Maxwell}
\rightarrow
\text{continuidad de fase}
\rightarrow
\text{Snell}
$$

y:

$$
\text{condiciones de contorno}
\rightarrow
\text{Fresnel}
$$

---

# Conexión con líneas de transmisión

Existe una analogía extremadamente útil entre una onda plana y una línea de transmisión.

En una línea:

$$
\Gamma
=
\frac{Z_L-Z_0}
{Z_L+Z_0}
$$

Para una onda electromagnética en incidencia normal:

$$
\Gamma
=
\frac{\eta_2-\eta_1}
{\eta_2+\eta_1}
$$

La estructura matemática es idéntica.

La correspondencia conceptual es:

$$
Z_0
\longleftrightarrow
\eta_1
$$

y:

$$
Z_L
\longleftrightarrow
\eta_2
$$

En ambos casos:

* una onda llega a una discontinuidad;
* existe una impedancia característica;
* si hay desadaptación aparece reflexión;
* si existe adaptación perfecta no hay reflexión.

Esta conexión será fundamental cuando estudiemos cómo Maxwell conduce a las **ecuaciones del telegrafista y las líneas de transmisión**.

---

# Visión unificada

Hasta este punto podemos construir una jerarquía bastante completa:

$$
\text{ecuaciones de Maxwell}
$$

determinan:

$$
\mathbf{E},\mathbf{B},\mathbf{D},\mathbf{H}
$$

A partir de ellas obtenemos:

$$
\text{ecuaciones de onda}
$$

que permiten estudiar:

$$
\text{propagación}
$$

En régimen sinusoidal:

$$
\text{ecuación de Helmholtz}
$$

nos permite obtener:

$$
\text{ondas planas y modos}
$$

Cuando aparece una interfaz:

$$
\text{condiciones de contorno}
$$

producen:

$$
\text{reflexión}
+
\text{transmisión}
$$

En incidencia oblicua:

$$
\text{continuidad de fase}
\rightarrow
\text{Snell}
$$

y:

$$
\text{condiciones de contorno}
\rightarrow
\text{Fresnel}
$$

De aquí se llega naturalmente a:

$$
\text{guías de onda}
$$

$$
\text{líneas de transmisión}
$$

$$
\text{antenas}
$$

$$
\text{radiación}
$$

y:

$$
\text{microondas y RF}
$$

# Siguiente desarrollo

El siguiente paso será profundizar en la **radiación electromagnética y las antenas**. Partiremos de las soluciones de Maxwell para fuentes variables y llegaremos a la estructura de los campos cercano y lejano, el dipolo eléctrico, los términos $1/r^3$, $1/r^2$ y $1/r$, el campo de radiación, la potencia radiada, la directividad y la relación entre Maxwell y el funcionamiento físico de una antena.


# Radiación electromagnética y antenas

Hasta ahora hemos estudiado principalmente ondas electromagnéticas que ya existen y se propagan por un medio.

Ahora debemos responder una pregunta más profunda:

> ¿Cómo se genera una onda electromagnética?

La respuesta está contenida directamente en las ecuaciones de Maxwell.

Una carga estática produce un campo eléctrico estático.

Una carga que se mueve con velocidad constante produce campos eléctrico y magnético asociados a su movimiento.

Pero cuando las cargas experimentan **aceleración**, aparece un fenómeno nuevo:

$$
\boxed{\text{radiación electromagnética}}
$$

Una antena es precisamente un sistema diseñado para producir y/o recibir este tipo de radiación.

---

# 1. Cargas, corrientes y campos electromagnéticos

Recordemos las ecuaciones de Maxwell en un medio lineal e isótropo:

$$
\nabla\cdot\mathbf{D}
=
\rho
$$

$$
\nabla\cdot\mathbf{B}
=
0
$$

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\frac{\partial\mathbf{D}}{\partial t}
$$

En un medio lineal:

$$
\mathbf{D}=\varepsilon\mathbf{E}
$$

$$
\mathbf{B}=\mu\mathbf{H}
$$

por lo que:

$$
\nabla\cdot\mathbf{E}
=
\frac{\rho}{\varepsilon}
$$

y:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\varepsilon
\frac{\partial\mathbf{E}}{\partial t}
$$

La fuente electromagnética está constituida fundamentalmente por:

$$
\rho
$$

y:

$$
\mathbf{J}
$$

es decir:

* distribución de carga;
* distribución de corriente.

Una corriente variable en el tiempo genera un campo magnético variable.

Ese campo magnético variable genera a su vez un campo eléctrico.

Y el campo eléctrico variable genera un campo magnético.

Esto permite que la perturbación se propague incluso alejándose de la fuente.

---

# 2. El mecanismo físico de la radiación

Supongamos una carga que oscila.

Su posición puede representarse como:

$$
z(t)=z_0\cos(\omega t)
$$

Su velocidad es:

$$
v(t)
=
\frac{dz}{dt}
=
-\omega z_0\sin(\omega t)
$$

y su aceleración:

$$
a(t)
=
\frac{d^2z}{dt^2}
=
-\omega^2z_0\cos(\omega t)
$$

La carga está acelerando continuamente.

Esa aceleración produce una perturbación electromagnética que se propaga hacia el exterior.

La idea fundamental es:

$$
\text{carga acelerada}
\rightarrow
\text{perturbación electromagnética}
\rightarrow
\text{radiación}
$$

---

# 3. Una distinción fundamental: campo cercano y campo lejano

Los campos producidos por una fuente localizada no tienen todos la misma dependencia con la distancia.

Aparecen términos proporcionales a:

$$
\frac{1}{r^3}
$$

$$
\frac{1}{r^2}
$$

y:

$$
\frac{1}{r}
$$

Esto es extremadamente importante.

Los términos:

$$
\frac{1}{r^3}
$$

y:

$$
\frac{1}{r^2}
$$

dominan cerca de la fuente.

El término:

$$
\frac{1}{r}
$$

domina suficientemente lejos de ella.

Por eso se distinguen dos regiones conceptuales:

$$
\boxed{\text{campo cercano}}
$$

y:

$$
\boxed{\text{campo lejano}}
$$

---

# 4. ¿Por qué el término $1/r$ es especial?

Supongamos que un campo tiene amplitud:

$$
E(r)\propto\frac{1}{r}
$$

Entonces su densidad de potencia es proporcional a:

$$
S(r)\propto |E(r)|^2
$$

por lo que:

$$
S(r)\propto\frac{1}{r^2}
$$

Pero una esfera de radio $r$ tiene superficie:

$$
A=4\pi r^2
$$

Por tanto, la potencia total que atraviesa la esfera es aproximadamente:

$$
P
\propto
S(r)A
$$

y:

$$
P
\propto
\frac{1}{r^2}r^2
$$

de modo que:

$$
P\approx\text{constante}
$$

Esto significa que la energía radiada se conserva mientras se expande por el espacio.

Esta es precisamente la dependencia espacial esperada para una onda que transporta energía hacia el infinito.

---

# 5. El término $1/r^3$

Los campos cuasiestáticos pueden presentar términos:

$$
E\propto\frac{1}{r^3}
$$

Entonces:

$$
|E|^2
\propto
\frac{1}{r^6}
$$

Su contribución disminuye extremadamente rápido al alejarnos de la fuente.

Estos campos están ligados principalmente al almacenamiento local de energía alrededor de la antena.

No representan la parte dominante de la energía que escapa al infinito.

---

# 6. El término $1/r^2$

También aparecen términos:

$$
E\propto\frac{1}{r^2}
$$

Son importantes en una región intermedia.

Se suelen asociar con el **campo de inducción**.

A diferencia del campo radiado, su comportamiento energético es más complejo: puede existir intercambio de energía reactiva entre la fuente y el campo sin que toda esa energía se transporte permanentemente hacia el infinito.

---

# 7. Campo radiado

En la región suficientemente alejada de la fuente domina:

$$
\frac{1}{r}
$$

En esa región:

$$
|\mathbf{E}|
\propto
\frac{1}{r}
$$

y:

$$
|\mathbf{H}|
\propto
\frac{1}{r}
$$

Además, los campos son aproximadamente transversales:

$$
\mathbf{E}
\perp
\mathbf{H}
$$

y:

$$
\mathbf{E}
\perp
\hat{\mathbf{r}}
$$

$$
\mathbf{H}
\perp
\hat{\mathbf{r}}
$$

Por tanto:

$$
\mathbf{E}
\perp
\mathbf{H}
\perp
\hat{\mathbf{r}}
$$

La dirección del transporte de energía viene dada por:

$$
\mathbf{S}
=
\mathbf{E}
\times
\mathbf{H}
$$

y apunta aproximadamente en la dirección:

$$
\hat{\mathbf{r}}
$$

---

# 8. El dipolo eléctrico

Una de las fuentes fundamentales de radiación es el **dipolo eléctrico oscilante**.

Podemos imaginar dos cargas:

$$
+q
$$

y:

$$
-q
$$

separadas por una distancia pequeña:

$$
\ell
$$

El momento dipolar eléctrico es:

$$
\mathbf{p}
=
q\mathbf{\ell}
$$

Si las cargas oscilan, entonces:

$$
\mathbf{p}=\mathbf{p}(t)
$$

y el dipolo variable produce radiación.

---

# 9. Corriente y momento dipolar

Existe una relación profunda entre corriente y momento dipolar.

Para una distribución localizada de carga:

$$
\mathbf{p}(t)
=
\int
\mathbf{r}'\rho(\mathbf{r}',t)
\,dV'
$$

Derivando:

$$
\frac{d\mathbf{p}}{dt}
=
\int
\mathbf{r}'
\frac{\partial\rho}{\partial t}
\,dV'
$$

Utilizamos la ecuación de continuidad:

$$
\frac{\partial\rho}{\partial t}
+
\nabla\cdot\mathbf{J}
=
0
$$

por tanto:

$$
\frac{\partial\rho}{\partial t}
=
-\nabla\cdot\mathbf{J}
$$

y se obtiene una relación entre el momento dipolar variable y la corriente.

En el caso de una corriente aproximadamente uniforme en un hilo corto:

$$
\frac{d\mathbf{p}}{dt}
\approx
I(t)\mathbf{\ell}
$$

Por tanto:

$$
\mathbf{p}(t)
\approx
\mathbf{\ell}
\int I(t)\,dt
$$

Esta relación conecta directamente el concepto de dipolo con el funcionamiento de una antena alimentada por corriente.

---

# 10. Dipolo eléctrico corto

Consideremos una antena lineal muy corta respecto a la longitud de onda:

$$
\ell\ll\lambda
$$

A esta aproximación se la suele denominar **dipolo corto**.

Supongamos que está orientado según:

$$
\hat{\mathbf{z}}
$$

y que circula una corriente sinusoidal:

$$
I(t)
=
I_0\cos(\omega t)
$$

La antena genera un campo electromagnético variable.

En el campo lejano, las componentes dominantes tienen la estructura:

$$
E_\theta
\propto
\frac{\sin\theta}{r}
$$

y:

$$
H_\phi
\propto
\frac{\sin\theta}{r}
$$

donde $\theta$ es el ángulo medido respecto al eje del dipolo.

---

# 11. Patrón de radiación del dipolo

A partir de:

$$
E_\theta
\propto
\sin\theta
$$

podemos obtener inmediatamente algunas propiedades.

Sobre el eje del dipolo:

$$
\theta=0
$$

y:

$$
\sin0=0
$$

por tanto:

$$
E_\theta=0
$$

No existe radiación en la dirección del eje.

En cambio, en dirección perpendicular:

$$
\theta=\frac{\pi}{2}
$$

tenemos:

$$
\sin\left(\frac{\pi}{2}\right)=1
$$

y se obtiene la máxima radiación.

Por tanto:

> Un dipolo lineal radia máximamente en las direcciones perpendiculares a su eje y mínimamente sobre su eje.

---

# 12. Patrón tridimensional

Si giramos el patrón alrededor del eje del dipolo, obtenemos aproximadamente una forma de:

$$
\text{toroide}
$$

o, coloquialmente:

$$
\text{``donut''}
$$

La antena no radia uniformemente en todas las direcciones.

Esto nos lleva directamente al concepto de:

$$
\boxed{\text{directividad}}
$$

---

# 13. Potencia radiada

La potencia transportada por una onda electromagnética se obtiene mediante el vector de Poynting:

$$
\mathbf{S}
=
\mathbf{E}
\times
\mathbf{H}
$$

Para campos sinusoidales se utiliza el valor medio temporal:

$$
\langle\mathbf{S}\rangle
=
\frac{1}{2}
\operatorname{Re}
\left\{
\tilde{\mathbf{E}}
\times
\tilde{\mathbf{H}}^*
\right\}
$$

En el campo lejano del dipolo, $\mathbf{E}$ y $\mathbf{H}$ están prácticamente en fase.

Además:

$$
|\mathbf{H}|
=
\frac{|\mathbf{E}|}{\eta}
$$

por lo que:

$$
\langle S\rangle
=
\frac{|E|^2}{2\eta}
$$

Como:

$$
E\propto\frac{\sin\theta}{r}
$$

obtenemos:

$$
\langle S\rangle
\propto
\frac{\sin^2\theta}{r^2}
$$

---

# 14. Potencia por unidad de ángulo sólido

En coordenadas esféricas:

$$
dA
=
r^2\sin\theta
\,d\theta\,d\phi
$$

La potencia que atraviesa un elemento de superficie es:

$$
dP
=
\langle S\rangle dA
$$

Por tanto:

$$
\frac{dP}{d\Omega}
=
r^2\langle S\rangle
$$

donde:

$$
d\Omega
=
\sin\theta\,d\theta\,d\phi
$$

es el elemento de ángulo sólido.

Como:

$$
\langle S\rangle
\propto
\frac{\sin^2\theta}{r^2}
$$

queda:

$$
\frac{dP}{d\Omega}
\propto
\sin^2\theta
$$

Esto es importante porque el factor $r^2$ ha desaparecido.

La distribución angular de la potencia es una propiedad intrínseca del patrón de radiación.

---

# 15. Intensidad de radiación

Definimos la intensidad de radiación:

$$
U(\theta,\phi)
=
r^2
\langle S_r\rangle
$$

Sus unidades son:

$$
[U]
=
\mathrm{W/sr}
$$

donde $\mathrm{sr}$ significa estereorradián.

La potencia total radiada se obtiene integrando sobre todas las direcciones:

$$
P_{\mathrm{rad}}
=
\int_{4\pi}
U(\theta,\phi)
\,d\Omega
$$

---

# 16. Directividad

La directividad compara la intensidad radiada en una determinada dirección con la que tendría una fuente isotrópica que radiase la misma potencia total.

Una antena isotrópica tendría:

$$
U_{\mathrm{iso}}
=
\frac{P_{\mathrm{rad}}}{4\pi}
$$

Por definición:

$$
D(\theta,\phi)
=
\frac{U(\theta,\phi)}
{P_{\mathrm{rad}}/(4\pi)}
$$

por tanto:

$$
D(\theta,\phi)
=
\frac{4\pi U(\theta,\phi)}
{P_{\mathrm{rad}}}
$$

La directividad máxima es:

$$
D_0
=
\frac{4\pi U_{\max}}
{P_{\mathrm{rad}}}
$$

Una antena isotrópica ideal tendría:

$$
D_0=1
$$

o en decibelios:

$$
D_{\mathrm{dBi}}
=
10\log_{10}(D_0)
$$

---

# 17. Ganancia de una antena

La directividad no tiene en cuenta las pérdidas de la antena.

En una antena real existen pérdidas debidas, por ejemplo, a:

* resistencia del conductor;
* pérdidas dieléctricas;
* pérdidas en conexiones;
* pérdidas en materiales.

Definimos la eficiencia:

$$
\eta_{\mathrm{rad}}
=
\frac{P_{\mathrm{rad}}}
{P_{\mathrm{in}}}
$$

donde $P_{\mathrm{in}}$ es la potencia aceptada por la antena.

La ganancia es:

$$
G
=
\eta_{\mathrm{rad}}D
$$

Por tanto:

$$
G\leq D
$$

si:

$$
0\leq\eta_{\mathrm{rad}}\leq1
$$

En decibelios:

$$
G_{\mathrm{dBi}}
=
10\log_{10}(G)
$$

---

# 18. Ganancia, directividad y eficiencia

Es muy importante no confundir:

### Directividad

Describe cómo concentra la radiación una antena.

$$
D
=
\frac{\text{intensidad en una dirección}}
{\text{intensidad isotrópica equivalente}}
$$

### Eficiencia

Describe qué fracción de la potencia aceptada acaba radiándose.

$$
\eta_{\mathrm{rad}}
=
\frac{P_{\mathrm{rad}}}
{P_{\mathrm{in}}}
$$

### Ganancia

Combina ambas:

$$
G=\eta_{\mathrm{rad}}D
$$

Una antena puede tener una directividad elevada pero una eficiencia baja.

---

# 19. Polarización de una antena

La polarización de una antena describe la trayectoria que sigue el vector campo eléctrico observado en una dirección concreta.

Puede ser:

* lineal;
* circular;
* elíptica.

Por ejemplo, si:

$$
\mathbf{E}
=
E_0\cos(\omega t-\beta r)\hat{\boldsymbol{\theta}}
$$

el campo eléctrico oscila siempre sobre una misma dirección.

Tenemos polarización lineal.

---

# 20. Polarización circular

Si existen dos componentes perpendiculares:

$$
E_x
=
E_0\cos(\omega t-\beta z)
$$

y:

$$
E_y
=
E_0\sin(\omega t-\beta z)
$$

entonces el módulo del campo es constante:

$$
|\mathbf{E}|
=
\sqrt{E_x^2+E_y^2}
$$

y:

$$
|\mathbf{E}|=E_0
$$

pero la dirección gira continuamente.

El resultado es una polarización circular.

La polarización circular requiere:

1. dos componentes ortogonales;
2. igual amplitud;
3. diferencia de fase de $\pm90^\circ$.

---

# 21. Polarización elíptica

Si las amplitudes no son iguales o la diferencia de fase no es exactamente $\pm90^\circ$, generalmente aparece una polarización elíptica.

La polarización circular es un caso particular de la elíptica.

La polarización lineal también puede considerarse un caso límite.

Por tanto:

$$
\text{lineal}
\subset
\text{elíptica}
$$

y:

$$
\text{circular}
\subset
\text{elíptica}
$$

desde el punto de vista matemático.

---

# 22. El campo cercano reactivo

La región inmediatamente próxima a una antena puede contener una cantidad importante de energía almacenada.

Los campos presentan componentes con dependencias:

$$
\frac{1}{r^3}
$$

y:

$$
\frac{1}{r^2}
$$

En esta región:

$$
\mathbf{E}
$$

y:

$$
\mathbf{H}
$$

no tienen necesariamente la relación simple:

$$
\frac{E}{H}=\eta
$$

que encontramos para una onda plana en campo lejano.

Además, pueden estar desfasados.

Por ello el vector de Poynting puede tener una componente reactiva.

---

# 23. Campo lejano

Cuando:

$$
r\gg\lambda
$$

en el sentido apropiado según la geometría de la antena, los términos de orden superior desaparecen rápidamente frente al término:

$$
\frac{1}{r}
$$

Entonces:

$$
E_\theta
\propto
\frac{e^{-jkr}}{r}
$$

y:

$$
H_\phi
\propto
\frac{e^{-jkr}}{r}
$$

Además:

$$
\frac{E_\theta}{H_\phi}
=
\eta
$$

y:

$$
\mathbf{E}
\perp
\mathbf{H}
\perp
\hat{\mathbf{r}}
$$

El campo lejano se comporta localmente como una onda plana.

Esta es una idea extremadamente importante:

> Una onda radiada por una antena no es una onda plana globalmente, pero suficientemente lejos de la antena su comportamiento local se aproxima al de una onda plana.

---

# 24. La fase esférica

En una onda plana utilizábamos:

$$
e^{-j\beta z}
$$

porque las superficies de fase constante eran planos:

$$
z=\text{constante}
$$

Para una fuente localizada, la distancia relevante es:

$$
r
=
|\mathbf{r}|
$$

y aparece:

$$
e^{-jkr}
$$

Por tanto:

$$
\tilde{E}
\propto
\frac{e^{-jkr}}{r}
$$

Las superficies de fase constante satisfacen:

$$
kr=\text{constante}
$$

o:

$$
r=\text{constante}
$$

Son superficies esféricas.

Por eso se habla de una **onda esférica** en el campo lejano de una fuente puntual idealizada.

---

# 25. Aproximación de onda plana

Sin embargo, si observamos solamente una pequeña región de una esfera enorme, esa superficie curva parece prácticamente plana.

Por eso, localmente:

$$
\text{onda esférica}
\approx
\text{onda plana}
$$

cuando:

$$
r\gg\lambda
$$

Esta aproximación es fundamental en:

* enlaces de radio;
* comunicaciones por satélite;
* radares;
* propagación en espacio libre;
* mediciones de antenas.

---

# 26. Reciprocidad de las antenas

Existe otro resultado fundamental:

> Una antena tiene, bajo condiciones de reciprocidad, las mismas propiedades de transmisión y recepción.

Esto significa que si una antena transmite eficientemente en una determinada dirección y polarización, presenta una respuesta equivalente cuando recibe desde esa dirección y con esa polarización.

Por ejemplo:

* patrón de radiación;
* polarización;
* directividad.

son propiedades estrechamente relacionadas entre transmisión y recepción.

Este principio se denomina **reciprocidad electromagnética**.

---

# 27. Antena como conversor de energía

Desde un punto de vista energético, una antena puede entenderse como un dispositivo que transforma:

$$
\text{energía eléctrica}
\longleftrightarrow
\text{energía electromagnética radiada}
$$

En transmisión:

$$
P_{\mathrm{eléctrica}}
\rightarrow
P_{\mathrm{electromagnética}}
$$

En recepción:

$$
P_{\mathrm{electromagnética}}
\rightarrow
P_{\mathrm{eléctrica}}
$$

Las ecuaciones de Maxwell proporcionan el marco físico que describe esta conversión.

---

# 28. Maxwell → antena

Podemos ahora unir todas las ideas desarrolladas hasta aquí.

Una fuente produce:

$$
\rho,\mathbf{J}
$$

Estas fuentes generan:

$$
\mathbf{E},\mathbf{B}
$$

mediante Maxwell.

Si las fuentes son variables en el tiempo:

$$
\frac{\partial\mathbf{E}}{\partial t}\neq0
$$

y/o:

$$
\frac{\partial\mathbf{B}}{\partial t}\neq0
$$

los campos están acoplados mediante:

$$
\nabla\times\mathbf{E}
=
-\frac{\partial\mathbf{B}}{\partial t}
$$

y:

$$
\nabla\times\mathbf{H}
=
\mathbf{J}
+
\frac{\partial\mathbf{D}}{\partial t}
$$

La solución contiene componentes que disminuyen como:

$$
\frac{1}{r^3},
\qquad
\frac{1}{r^2},
\qquad
\frac{1}{r}
$$

La última constituye la parte radiativa dominante:

$$
\frac{1}{r}
$$

Esta energía se transporta mediante:

$$
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
$$

hacia el espacio.

---

# 29. La cadena completa

Podemos resumir la física de una antena mediante:

$$
\text{cargas aceleradas}
$$

$$
\downarrow
$$

$$
\text{corrientes variables}
$$

$$
\downarrow
$$

$$
\text{campos eléctricos y magnéticos variables}
$$

$$
\downarrow
$$

$$
\text{acoplamiento de Maxwell}
$$

$$
\downarrow
$$

$$
\text{onda electromagnética}
$$

$$
\downarrow
$$

$$
\text{campo radiado } \propto \frac{1}{r}
$$

$$
\downarrow
$$

$$
\text{transporte de energía}
$$

$$
\downarrow
$$

$$
\text{recepción por otra antena}
$$

Esta cadena es una de las conexiones más importantes de todo el electromagnetismo.

---

# 30. Una consecuencia especialmente importante

Existe una diferencia conceptual entre:

$$
\text{campo electromagnético}
$$

y:

$$
\text{onda electromagnética radiada}
$$

No todo campo electromagnético variable cerca de una fuente constituye una onda radiada que transporte energía al infinito.

Una parte importante del campo cercano puede representar energía almacenada temporalmente.

La radiación propiamente dicha corresponde al comportamiento que sobrevive en el límite:

$$
r\rightarrow\infty
$$

manteniendo una potencia finita atravesando superficies esféricas.

Por eso el término:

$$
\frac{1}{r}
$$

es tan fundamental.

---

# 31. Conexión con la ingeniería de telecomunicaciones

Aquí aparece directamente la conexión entre Maxwell y una gran parte de la ingeniería de telecomunicaciones.

Las ecuaciones de Maxwell permiten derivar y comprender:

$$
\text{antenas}
$$

$$
\text{propagación}
$$

$$
\text{radiofrecuencia}
$$

$$
\text{microondas}
$$

$$
\text{radar}
$$

$$
\text{satélites}
$$

$$
\text{fibra óptica}
$$

$$
\text{guías de onda}
$$

$$
\text{líneas de transmisión}
$$

$$
\text{compatibilidad electromagnética}
$$

$$
\text{propagación inalámbrica}
$$

Todo ello parte de las mismas cuatro ecuaciones.

---

# 32. La importancia del potencial vector

Antes vimos que:

$$
\mathbf{B}
=
\nabla\times\mathbf{A}
$$

y:

$$
\mathbf{E}
=
-\nabla\phi
-
\frac{\partial\mathbf{A}}{\partial t}
$$

Esto permite interpretar la radiación desde otra perspectiva.

En presencia de fuentes variables, el potencial vector $\mathbf{A}$ contiene una parte que se propaga desde la fuente.

Los potenciales retardados introducen naturalmente el tiempo de propagación:

$$
t_r
=
t-\frac{R}{v}
$$

donde $R$ es la distancia desde la fuente hasta el punto de observación.

La fuente que observamos no es, por tanto, la fuente en su estado instantáneo actual.

Observamos su estado anterior.

Esto es consecuencia directa de la velocidad finita de propagación de las interacciones electromagnéticas.

---

# 33. Tiempo retardado

En espacio libre:

$$
v=c
$$

por lo que:

$$
t_r
=
t-\frac{R}{c}
$$

Si una fuente cambia en el instante:

$$
t_0
$$

un observador situado a distancia $R$ no puede detectar inmediatamente ese cambio.

Lo detectará aproximadamente en:

$$
t
=
t_0+\frac{R}{c}
$$

Esto muestra otra vez que las ecuaciones de Maxwell incorporan de forma natural la causalidad y la propagación a velocidad finita.

---

# 34. Maxwell y la velocidad de la luz

En vacío:

$$
v
=
\frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

y esta velocidad coincide con:

$$
c
$$

La teoría electromagnética predice, por tanto, una velocidad de propagación que coincide con la velocidad de la luz.

La conclusión histórica de Maxwell fue extraordinaria:

> La luz es una onda electromagnética.

No son dos fenómenos independientes.

La luz visible es simplemente una región concreta del espectro electromagnético.

---

# 35. Espectro electromagnético

Todas estas ondas están descritas por las mismas ecuaciones.

Lo que cambia principalmente es la frecuencia:

$$
f
$$

y la longitud de onda:

$$
\lambda
$$

relacionadas en vacío mediante:

$$
c=f\lambda
$$

Aparecen, entre otras:

* ondas de radio;
* microondas;
* infrarrojo;
* luz visible;
* ultravioleta;
* rayos X;
* rayos gamma.

Desde el punto de vista fundamental:

$$
\text{todas son ondas electromagnéticas}
$$

La diferencia es principalmente su frecuencia y, por tanto, su energía por fotón en el tratamiento cuántico.

---

# 36. Una visión final de la radiación

Podemos visualizar todo el proceso de forma conceptual:

$$
\boxed{
\text{fuente variable}
\rightarrow
\text{campo cercano}
\rightarrow
\text{campo radiado}
\rightarrow
\text{propagación}
}
$$

Cerca de la antena predominan términos:

$$
\frac{1}{r^3},
\frac{1}{r^2}
$$

mientras que lejos domina:

$$
\frac{1}{r}
$$

En la región radiativa:

$$
\mathbf{E}
\perp
\mathbf{H}
\perp
\hat{\mathbf{r}}
$$

y:

$$
\langle\mathbf{S}\rangle
\parallel
\hat{\mathbf{r}}
$$

La energía electromagnética se aleja de la fuente.

---

# 37. De Maxwell a los sistemas de comunicaciones

Podemos cerrar esta etapa conectando la teoría fundamental con un sistema de telecomunicaciones.

Un transmisor genera una señal eléctrica:

$$
v(t)
$$

que produce una corriente:

$$
i(t)
$$

en una antena.

La corriente variable produce campos:

$$
\mathbf{E}(\mathbf{r},t)
$$

y:

$$
\mathbf{H}(\mathbf{r},t)
$$

Una parte de estos campos constituye radiación.

La onda se propaga por el espacio.

Al llegar a otra antena, induce una corriente y una tensión.

Tenemos entonces:

$$
\text{señal eléctrica}
\rightarrow
\text{onda electromagnética}
\rightarrow
\text{onda electromagnética}
\rightarrow
\text{señal eléctrica}
$$

Este proceso constituye físicamente un enlace inalámbrico.

---

# 38. La jerarquía conceptual completa

Llegados a este punto podemos organizar todo el electromagnetismo estudiado:

$$
\boxed{
\text{cargas y corrientes}
}
$$

generan:

$$
\boxed{
\mathbf{E},\mathbf{B}
}
$$

que obedecen:

$$
\boxed{
\text{ecuaciones de Maxwell}
}
$$

De ellas obtenemos:

$$
\boxed{
\text{ecuaciones de onda}
}
$$

que producen:

$$
\boxed{
\text{propagación electromagnética}
}
$$

Cuando aparece una interfaz:

$$
\boxed{
\text{reflexión y transmisión}
}
$$

Cuando existen fuentes radiantes:

$$
\boxed{
\text{radiación}
}
$$

y:

$$
\boxed{
\text{antenas}
}
$$

Finalmente, toda la energía electromagnética se describe mediante:

$$
\boxed{
\mathbf{S}
=
\mathbf{E}\times\mathbf{H}
}
$$

Este vector permite pasar de los campos a una magnitud directamente relacionada con el transporte de energía.

---

# 39. Próximo desarrollo natural

El siguiente paso es profundizar en algo que aparece constantemente en segundo curso de Telecomunicaciones: **la energía electromagnética y el teorema de Poynting**.

A partir de Maxwell se puede demostrar rigurosamente que la energía electromagnética satisface una ecuación de conservación.

La estructura fundamental será:

$$
\text{Maxwell}
\rightarrow
\text{producto escalar con los campos}
\rightarrow
\text{identidad vectorial}
\rightarrow
\text{teorema de Poynting}
$$

y de ahí podremos obtener:

* densidad de energía eléctrica;
* densidad de energía magnética;
* vector de Poynting;
* potencia instantánea;
* potencia media;
* potencia reactiva;
* energía almacenada;
* conservación de la energía;
* pérdidas Joule;
* interpretación física de $\mathbf{E}\times\mathbf{H}$;
* relación entre potencia radiada y antenas;
* potencia en medios conductores;
* y conexión con líneas de transmisión y circuitos.

Esta conexión es especialmente importante porque permite pasar de una descripción puramente de **campos** a una descripción de **potencia y energía**, que es la que finalmente necesitamos para analizar sistemas electromagnéticos reales.











