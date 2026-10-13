# Ecuaciones de Maxwell y ondas planas

**Asignatura:** Transmisión de Ondas · 2º Ingeniería de Telecomunicación

> **Convenios usados en todo el documento**
> - Régimen armónico con dependencia temporal $e^{j\omega t}$ y campos en notación **fasorial**: $\mathbf{E}(\mathbf{r},t)=\mathrm{Re}\{\mathbf{E}(\mathbf{r})\,e^{j\omega t}\}$.
> - Las magnitudes en negrita son vectores. Los fasores y los campos instantáneos se distinguen por el contexto.
> - La onda plana se propaga, salvo que se indique lo contrario, en la dirección $+z$ con $\mathbf{E}$ en $x$ y $\mathbf{H}$ en $y$.
> - Si tu profesor usa $e^{-i\omega t}$ (convenio de física), cambia $j\to -i$ y revisa los signos de la polarización y de la parte imaginaria de $\varepsilon_c$.

---

## Índice

1. [Las cuatro ecuaciones de Maxwell](#1-las-cuatro-ecuaciones-de-maxwell)
   - [1.1 Ley de Gauss (campo eléctrico)](#11-ley-de-gauss-campo-eléctrico)
   - [1.2 Ley de Gauss del magnetismo](#12-ley-de-gauss-del-magnetismo)
   - [1.3 Ley de Faraday-Lenz](#13-ley-de-faraday-lenz)
   - [1.4 Ley de Ampère-Maxwell](#14-ley-de-ampère-maxwell)
   - [1.5 Ecuación de continuidad y resumen](#15-ecuación-de-continuidad-y-resumen)
2. [Ecuaciones constitutivas del medio](#2-ecuaciones-constitutivas-del-medio)
3. [Ecuación de ondas](#3-ecuación-de-ondas)
   - [3.1 Medio sin pérdidas](#31-medio-sin-pérdidas)
   - [3.2 Medio con pérdidas](#32-medio-con-pérdidas)
   - [3.3 Tangente de pérdidas](#33-tangente-de-pérdidas)
   - [3.4 Casos límite: buen dieléctrico y buen conductor](#34-casos-límite-buen-dieléctrico-y-buen-conductor)
4. [Propagación de ondas planas](#4-propagación-de-ondas-planas)
   - [4.1 Parámetros de propagación](#41-parámetros-de-propagación)
   - [4.2 Impedancia característica del medio](#42-impedancia-característica-del-medio)
   - [4.3 Relación de estructura de la onda](#43-relación-de-estructura-de-la-onda)
5. [Teorema de Poynting](#5-teorema-de-poynting)
6. [Incidencia normal sobre una discontinuidad](#6-incidencia-normal-sobre-una-discontinuidad)
   - [6.1 Condiciones de contorno](#61-condiciones-de-contorno)
   - [6.2 Coeficientes de reflexión y transmisión](#62-coeficientes-de-reflexión-y-transmisión)
   - [6.3 Balance de potencia](#63-balance-de-potencia)
7. [Concepto de impedancia de onda](#7-concepto-de-impedancia-de-onda)
8. [Onda estacionaria](#8-onda-estacionaria)
9. [Adaptador en λ/4](#9-adaptador-en-λ4)
10. [Polarización](#10-polarización)
11. [Tabla resumen de fórmulas](#11-tabla-resumen-de-fórmulas)
12. [Errores típicos](#12-errores-típicos)

---

## 1. Las cuatro ecuaciones de Maxwell

Las ecuaciones de Maxwell relacionan los campos $\mathbf{E}$ (intensidad de campo eléctrico, V/m), $\mathbf{D}$ (densidad de flujo eléctrico, C/m²), $\mathbf{H}$ (intensidad de campo magnético, A/m) y $\mathbf{B}$ (densidad de flujo magnético, T) con sus fuentes: la densidad de carga $\rho_v$ (C/m³) y la densidad de corriente $\mathbf{J}$ (A/m²).

Cada ley tiene dos formulaciones equivalentes. La **forma integral** habla de magnitudes globales (flujos, circulaciones) sobre superficies y curvas. La **forma diferencial** habla de lo que ocurre en cada punto del espacio. Se pasa de una a otra con dos teoremas del cálculo vectorial:

- **Teorema de la divergencia (Gauss):** $\displaystyle\oint_S \mathbf{F}\cdot d\mathbf{S}=\int_V \nabla\cdot\mathbf{F}\,dV$
- **Teorema del rotacional (Stokes):** $\displaystyle\oint_C \mathbf{F}\cdot d\mathbf{l}=\int_S (\nabla\times\mathbf{F})\cdot d\mathbf{S}$

### 1.1 Ley de Gauss (campo eléctrico)

**Forma integral**

$$\oint_S \mathbf{D}\cdot d\mathbf{S}=Q_{enc}=\int_V\rho_v\,dV$$

**Forma diferencial**

$$\nabla\cdot\mathbf{D}=\rho_v$$

**Interpretación.** El flujo eléctrico que atraviesa una superficie cerrada es igual a la carga libre que encierra. Las **cargas libres son fuentes (o sumideros) de líneas de $\mathbf{D}$**: las líneas nacen en las cargas positivas y mueren en las negativas.

**Ejemplo (carga puntual).** Con una esfera de radio $r$ centrada en la carga, la simetría hace que $D$ sea radial y constante sobre la superficie:

$$D\cdot 4\pi r^2=Q\;\Rightarrow\; \mathbf{D}=\frac{Q}{4\pi r^2}\hat{\mathbf{r}}\;\Rightarrow\;\mathbf{E}=\frac{Q}{4\pi\varepsilon r^2}\hat{\mathbf{r}}$$

Recuperamos la ley de Coulomb. Gauss es la forma cómoda de calcular campos cuando hay simetría (esférica, cilíndrica o plana).

**Por qué se usa $\mathbf{D}$ y no $\mathbf{E}$.** En un dieléctrico aparecen cargas de polarización (ligadas) que también crean campo. $\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P}$ absorbe ese efecto, de modo que **solo las cargas libres** aparecen en el segundo miembro.

### 1.2 Ley de Gauss del magnetismo

**Forma integral**

$$\oint_S \mathbf{B}\cdot d\mathbf{S}=0$$

**Forma diferencial**

$$\nabla\cdot\mathbf{B}=0$$

**Interpretación.** El flujo magnético neto a través de cualquier superficie cerrada es nulo: **no existen monopolos magnéticos** (cargas magnéticas aisladas). Las líneas de $\mathbf{B}$ son siempre **cerradas** o se extienden hasta el infinito: todo flujo que entra en una superficie cerrada sale por otro lado.

**Consecuencias útiles**
- Como $\nabla\cdot(\nabla\times\mathbf{A})=0$ siempre, existe un **potencial vector** $\mathbf{A}$ tal que $\mathbf{B}=\nabla\times\mathbf{A}$. Es la base del cálculo de campos radiados por antenas.
- Un imán partido en dos da dos imanes completos, cada uno con su polo norte y su polo sur.

> Es la única ecuación de Maxwell **sin fuente**, y la asimetría con la ley de Gauss eléctrica refleja que no se han observado monopolos.

### 1.3 Ley de Faraday-Lenz

**Forma integral**

$$\oint_C \mathbf{E}\cdot d\mathbf{l}=-\frac{d}{dt}\int_S \mathbf{B}\cdot d\mathbf{S}=-\frac{d\Phi_B}{dt}$$

**Forma diferencial**

$$\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}$$

**Interpretación.** Un flujo magnético variable en el tiempo **induce un campo eléctrico rotacional** (con circulación no nula). La circulación de $\mathbf{E}$ a lo largo de una espira es la **fuerza electromotriz** inducida $\mathrm{fem}=-d\Phi_B/dt$.

**Ley de Lenz (el signo menos).** La corriente inducida circula en el sentido que **se opone a la variación de flujo** que la produce. Es una consecuencia de la conservación de la energía: si el signo fuera positivo, el flujo inducido reforzaría la variación y la energía crecería sin límite.

**Dos orígenes de la fem**

$$\mathrm{fem}=\underbrace{-\int_S\frac{\partial\mathbf{B}}{\partial t}\cdot d\mathbf{S}}_{\text{fem de transformador}}+\underbrace{\oint_C(\mathbf{v}\times\mathbf{B})\cdot d\mathbf{l}}_{\text{fem de movimiento}}$$

- **De transformador:** la espira está quieta y $\mathbf{B}$ varía en el tiempo.
- **De movimiento:** el campo es estático pero la espira se mueve o se deforma (generadores).

**Ejemplo.** Una espira plana de área $S$ perpendicular a $\mathbf{B}=B_0\cos\omega t$ tiene $\Phi=B_0S\cos\omega t$ y

$$\mathrm{fem}=\omega B_0S\sin\omega t$$

**Idea clave para las ondas:** esta ecuación dice que *un campo magnético variable crea un campo eléctrico*. Combinada con Ampère-Maxwell (sección siguiente), que dice que *un campo eléctrico variable crea un campo magnético*, cada campo "regenera" al otro y la perturbación puede **propagarse sin necesidad de fuentes ni de medio material**.

El campo eléctrico inducido por Faraday **no es conservativo** ($\nabla\times\mathbf{E}\neq0$), por lo que ya no se puede definir $\mathbf{E}=-\nabla V$ en régimen variable.

### 1.4 Ley de Ampère-Maxwell

**Forma integral**

$$\oint_C \mathbf{H}\cdot d\mathbf{l}=I_{enc}+\frac{d}{dt}\int_S\mathbf{D}\cdot d\mathbf{S}=\int_S\left(\mathbf{J}+\frac{\partial\mathbf{D}}{\partial t}\right)\cdot d\mathbf{S}$$

**Forma diferencial**

$$\nabla\times\mathbf{H}=\mathbf{J}+\frac{\partial\mathbf{D}}{\partial t}$$

**Interpretación.** La circulación de $\mathbf{H}$ a lo largo de una curva cerrada es la corriente total que atraviesa cualquier superficie apoyada en ella. Hay dos contribuciones:

- **Corriente de conducción** $\mathbf{J}$: movimiento de cargas (en conductores, $\mathbf{J}=\sigma\mathbf{E}$).
- **Corriente de desplazamiento** $\mathbf{J}_d=\partial\mathbf{D}/\partial t$: **término añadido por Maxwell**. No es movimiento de cargas, sino un campo eléctrico variable.

**Ejemplo de la ley estática (hilo infinito).** Con una circunferencia de radio $r$ alrededor de un hilo con corriente $I$:

$$H\cdot2\pi r=I\;\Rightarrow\;\mathbf{H}=\frac{I}{2\pi r}\hat{\boldsymbol\phi}$$

**Por qué hacía falta el término de desplazamiento.** Tomando la divergencia de $\nabla\times\mathbf{H}=\mathbf{J}$ resulta $\nabla\cdot\mathbf{J}=0$, lo que contradice la conservación de la carga en régimen variable. Además, en un condensador que se está cargando, la corriente $I$ llega a una placa y no cruza el dieléctrico: dos superficies apoyadas en la misma curva darían circulaciones distintas. El término $\partial\mathbf{D}/\partial t$ en el hueco del condensador corrige ambos problemas, y su corriente equivale exactamente a $I=C\,dV/dt$.

**Relación entre conducción y desplazamiento en régimen armónico**

$$\frac{|\mathbf{J}|}{|\mathbf{J}_d|}=\frac{\sigma|\mathbf{E}|}{\omega\varepsilon|\mathbf{E}|}=\frac{\sigma}{\omega\varepsilon}$$

Este cociente será exactamente la **tangente de pérdidas** (sección 3.3) y decide si un material se comporta como conductor o como dieléctrico a una frecuencia dada.

### 1.5 Ecuación de continuidad y resumen

Tomando la divergencia de Ampère-Maxwell y usando Gauss eléctrico:

$$\nabla\cdot\mathbf{J}=-\frac{\partial\rho_v}{\partial t}$$

Es la **conservación de la carga**: la carga que sale de un volumen es la que se pierde en su interior. No es independiente: se deduce de las otras ecuaciones, lo que garantiza que el conjunto es coherente.

**Resumen en forma diferencial**

| Ley | Forma diferencial | Forma fasorial (medio lineal) | Fuente / significado |
|---|---|---|---|
| Gauss eléctrico | $\nabla\cdot\mathbf{D}=\rho_v$ | $\nabla\cdot\mathbf{D}=\rho_v$ | La carga genera flujo de $\mathbf{D}$ |
| Gauss magnético | $\nabla\cdot\mathbf{B}=0$ | $\nabla\cdot\mathbf{B}=0$ | No hay monopolos |
| Faraday-Lenz | $\nabla\times\mathbf{E}=-\partial_t\mathbf{B}$ | $\nabla\times\mathbf{E}=-j\omega\mathbf{B}$ | $\mathbf{B}$ variable crea $\mathbf{E}$ |
| Ampère-Maxwell | $\nabla\times\mathbf{H}=\mathbf{J}+\partial_t\mathbf{D}$ | $\nabla\times\mathbf{H}=\mathbf{J}+j\omega\mathbf{D}$ | $\mathbf{J}$ y $\mathbf{D}$ variable crean $\mathbf{H}$ |

En régimen armónico, derivar respecto al tiempo equivale a multiplicar por $j\omega$. Eso convierte las ecuaciones diferenciales en el tiempo en ecuaciones algebraicas respecto a $t$ y es lo que hace manejable todo lo que sigue.

---

## 2. Ecuaciones constitutivas del medio

Las cuatro ecuaciones de Maxwell tienen 6 incógnitas vectoriales ($\mathbf{E},\mathbf{D},\mathbf{H},\mathbf{B},\mathbf{J}$ y las fuentes). Faltan ecuaciones: las **relaciones constitutivas** describen cómo responde el material a los campos y cierran el sistema.

**Medio lineal, homogéneo, isótropo y no dispersivo (el caso del curso):**

$$\boxed{\mathbf{D}=\varepsilon\mathbf{E}\qquad\mathbf{B}=\mu\mathbf{H}\qquad\mathbf{J}=\sigma\mathbf{E}}$$

con

$$\varepsilon=\varepsilon_0\varepsilon_r,\qquad\mu=\mu_0\mu_r$$

| Constante | Valor en el vacío | Significado |
|---|---|---|
| $\varepsilon_0$ | $8{,}854\times10^{-12}$ F/m | Permitividad eléctrica |
| $\mu_0$ | $4\pi\times10^{-7}$ H/m | Permeabilidad magnética |
| $c=1/\sqrt{\mu_0\varepsilon_0}$ | $3\times10^{8}$ m/s | Velocidad de la luz |
| $\sigma$ | 0 | Conductividad (S/m) |

**Origen microscópico.**
- $\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P}$, con $\mathbf{P}=\varepsilon_0\chi_e\mathbf{E}$ (polarización dieléctrica): al aplicar $\mathbf{E}$, los dipolos del material se orientan y se **almacena energía eléctrica**. De aquí $\varepsilon_r=1+\chi_e$.
- $\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})$, con $\mathbf{M}=\chi_m\mathbf{H}$ (magnetización). De aquí $\mu_r=1+\chi_m$.
- $\mathbf{J}=\sigma\mathbf{E}$ es la **ley de Ohm puntual**: los portadores libres se mueven y **se disipa energía**.

**Significado de cada adjetivo**

| Propiedad | Si se cumple | Si no |
|---|---|---|
| **Lineal** | $\varepsilon,\mu,\sigma$ no dependen de la intensidad del campo | Medios no lineales (efectos ópticos no lineales) |
| **Homogéneo** | No dependen de la posición | Medios estratificados, inhomogéneos |
| **Isótropo** | No dependen de la dirección de $\mathbf{E}$ (escalares) | Anisótropo: $\varepsilon$ es un tensor (cristales, ferritas, plasma con campo magnético) |
| **No dispersivo** | No dependen de la frecuencia | Dispersivo: $\varepsilon(\omega),\mu(\omega),\sigma(\omega)$. **Todos los materiales reales lo son**, aunque en bandas estrechas se aproximan a constantes |

**Clasificación orientativa de materiales**

| Tipo | $\sigma$ | Ejemplos |
|---|---|---|
| Dieléctrico ideal | $\sigma=0$ | Vacío, aproximadamente aire |
| Dieléctrico con pérdidas | $\sigma$ muy pequeña | Teflón, FR4, vidrio |
| Semiconductor/medio disipativo | intermedia | Tierra húmeda, agua de mar (a frecuencias medias) |
| Buen conductor | $\sigma\to\infty$ | Cu ($5{,}8\times10^7$ S/m), Al, Ag |
| Conductor perfecto (PEC) | $\sigma=\infty$ | Idealización: $\mathbf{E}=0$ en su interior |

---

## 3. Ecuación de ondas

Partimos de una región **sin fuentes** ($\rho_v=0$, $\mathbf{J}_{fuente}=0$), homogénea e isótropa. Solo se permite la corriente de conducción $\mathbf{J}=\sigma\mathbf{E}$.

### 3.1 Medio sin pérdidas

Con $\sigma=0$, $\nabla\times\nabla\times\mathbf{E}$ se obtiene de dos formas:

$$\nabla\times(\nabla\times\mathbf{E})=\nabla(\nabla\cdot\mathbf{E})-\nabla^2\mathbf{E}=-\nabla^2\mathbf{E}$$

$$\nabla\times(\nabla\times\mathbf{E})=\nabla\times\left(-\mu\frac{\partial\mathbf{H}}{\partial t}\right)=-\mu\frac{\partial}{\partial t}(\nabla\times\mathbf{H})=-\mu\varepsilon\frac{\partial^2\mathbf{E}}{\partial t^2}$$

Igualando se obtiene la **ecuación de ondas** (o de d'Alembert):

$$\boxed{\nabla^2\mathbf{E}-\mu\varepsilon\frac{\partial^2\mathbf{E}}{\partial t^2}=0}$$

y análogamente para $\mathbf{H}$. En régimen armónico se convierte en la **ecuación de Helmholtz**:

$$\nabla^2\mathbf{E}+\beta^2\mathbf{E}=0,\qquad\beta=\omega\sqrt{\mu\varepsilon}$$

**Onda plana uniforme.** Se llama así a la solución con campos que **solo dependen de una coordenada** (aquí $z$) y que tienen amplitud y fase constantes en cada plano $z=\text{cte}$ (el *frente de onda*). Si $\mathbf{E}$ no depende de $x,y$:

- $\nabla\cdot\mathbf{E}=0\Rightarrow\partial E_z/\partial z=0$.
- La componente $z$ de Ampère-Maxwell da $j\omega\varepsilon E_z=0$ en régimen armónico, así que $E_z=0$.

**Los campos son transversales a la dirección de propagación** (onda **TEM**). Tomando $\mathbf{E}=E_x(z)\hat{\mathbf{x}}$:

$$\frac{d^2E_x}{dz^2}+\beta^2E_x=0\;\Rightarrow\;E_x(z)=E^+e^{-j\beta z}+E^-e^{+j\beta z}$$

En el dominio del tiempo, con $E^\pm$ reales:

$$E_x(z,t)=E^+\cos(\omega t-\beta z)+E^-\cos(\omega t+\beta z)$$

El primer término es una onda que **viaja hacia $+z$** (progresiva) y el segundo hacia $-z$ (regresiva). Un punto de fase constante cumple $\omega t-\beta z=\text{cte}$, de donde se obtiene la velocidad de fase.

### 3.2 Medio con pérdidas

Con $\mathbf{J}=\sigma\mathbf{E}$, el mismo procedimiento da en el dominio del tiempo:

$$\nabla^2\mathbf{E}=\mu\sigma\frac{\partial\mathbf{E}}{\partial t}+\mu\varepsilon\frac{\partial^2\mathbf{E}}{\partial t^2}$$

El término $\mu\sigma\,\partial_t\mathbf{E}$ es de **tipo difusión/amortiguamiento**: introduce pérdidas.

**Truco fasorial: permitividad compleja.** En régimen armónico Ampère-Maxwell se escribe

$$\nabla\times\mathbf{H}=\sigma\mathbf{E}+j\omega\varepsilon\mathbf{E}=j\omega\left(\varepsilon-j\frac{\sigma}{\omega}\right)\mathbf{E}=j\omega\varepsilon_c\mathbf{E}$$

$$\boxed{\varepsilon_c=\varepsilon-j\frac{\sigma}{\omega}=\varepsilon'-j\varepsilon''}$$

Todas las fórmulas del caso sin pérdidas siguen valiendo **sustituyendo $\varepsilon$ por $\varepsilon_c$**. La ecuación de Helmholtz se escribe

$$\nabla^2\mathbf{E}=\gamma^2\mathbf{E},\qquad\gamma^2=j\omega\mu(\sigma+j\omega\varepsilon)=-\omega^2\mu\varepsilon_c$$

donde $\gamma$ es la **constante de propagación**, un número complejo:

$$\gamma=\alpha+j\beta=j\omega\sqrt{\mu\varepsilon_c}$$

La solución progresiva es

$$\mathbf{E}(z)=E_0\,e^{-\gamma z}\hat{\mathbf{x}}=E_0\,e^{-\alpha z}e^{-j\beta z}\hat{\mathbf{x}}$$

- $\alpha$ (Np/m) es la **constante de atenuación**: la amplitud decrece exponencialmente.
- $\beta$ (rad/m) es la **constante de fase**: gobierna el avance de fase.
- Para convertir: $1\ \text{Np}=8{,}686\ \text{dB}$, es decir $\alpha[\text{dB/m}]=8{,}686\,\alpha[\text{Np/m}]$.

**Expresiones explícitas** (resultan de separar $\gamma^2$ en parte real e imaginaria):

$$\alpha=\omega\sqrt{\frac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}-1\right]}\qquad\beta=\omega\sqrt{\frac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}+1\right]}$$

Ambas dependen de $\sigma/\omega\varepsilon$, es decir, de la **tangente de pérdidas**.

**Caso sin pérdidas como límite:** $\sigma=0\Rightarrow\alpha=0,\;\beta=\omega\sqrt{\mu\varepsilon}$.

**Efecto de las pérdidas en la propagación**
1. La amplitud decae como $e^{-\alpha z}$ y la potencia como $e^{-2\alpha z}$.
2. $\mathbf{E}$ y $\mathbf{H}$ **dejan de estar en fase** (sección 4.2).
3. El medio con pérdidas es **dispersivo**: $\alpha$ y $\beta$ no son proporcionales a $\omega$, por lo que una señal de banda ancha se **distorsiona**.

### 3.3 Tangente de pérdidas

Se define como el cociente entre la parte imaginaria y la real de la permitividad compleja:

$$\boxed{\tan\delta=\frac{\varepsilon''}{\varepsilon'}=\frac{\sigma}{\omega\varepsilon}}$$

(si el dieléctrico además tiene pérdidas de polarización, $\varepsilon''$ incluye también ese término: $\tan\delta=(\omega\varepsilon''_{pol}+\sigma)/(\omega\varepsilon')$.)

**Interpretación física.** Es el cociente entre la **corriente de conducción** y la **corriente de desplazamiento** (sección 1.4):

$$\tan\delta=\frac{|\mathbf{J}_{cond}|}{|\mathbf{J}_{desp}|}$$

Además, $\delta$ es el ángulo en el plano complejo que separa $\varepsilon_c$ de su parte real, y mide **cuánto se desfasa la corriente respecto al caso ideal de dieléctrico perfecto**. Es un buen indicador de calidad de un dieléctrico: valores típicos son $\sim10^{-4}$ para el teflón y $\sim2\times10^{-2}$ para el FR4.

**Importante:** la tangente de pérdidas depende de la frecuencia. Un mismo material puede ser buen conductor a baja frecuencia y buen dieléctrico a frecuencias altas.

### 3.4 Casos límite: buen dieléctrico y buen conductor

| | **Buen dieléctrico** | **Buen conductor** |
|---|---|---|
| Condición | $\tan\delta\ll1$ ($\sigma\ll\omega\varepsilon$) | $\tan\delta\gg1$ ($\sigma\gg\omega\varepsilon$) |
| $\gamma$ | $\alpha+j\beta$ con $\alpha\ll\beta$ | $\alpha\approx\beta$ |
| $\alpha$ | $\dfrac{\sigma}{2}\sqrt{\dfrac{\mu}{\varepsilon}}=\dfrac{\sigma\eta}{2}$ | $\sqrt{\pi f\mu\sigma}$ |
| $\beta$ | $\omega\sqrt{\mu\varepsilon}$ | $\sqrt{\pi f\mu\sigma}$ |
| $\eta_c$ | $\approx\sqrt{\mu/\varepsilon}$ (casi real) | $\sqrt{\dfrac{\omega\mu}{\sigma}}\,\angle45^\circ=(1+j)\sqrt{\dfrac{\pi f\mu}{\sigma}}$ |
| Comportamiento | Se parece al caso sin pérdidas | La onda se amortigua en distancias muy cortas |

**Profundidad de penetración (efecto pelicular, *skin depth*).** Es la distancia a la que la amplitud cae a $1/e$ ($\approx37\%$):

$$\boxed{\delta_s=\frac{1}{\alpha}=\frac{1}{\sqrt{\pi f\mu\sigma}}}$$

Ejemplos:

- **Cobre a 1 GHz:** $\delta_s=1/\sqrt{\pi\cdot10^9\cdot4\pi\times10^{-7}\cdot5{,}8\times10^7}\approx2{,}1\ \mu\text{m}$. La corriente fluye en una capa finísima superficial, por lo que basta un recubrimiento de unas micras de buen conductor para guiar la señal. Esto explica también por qué se **aumenta la resistencia efectiva con la frecuencia**.
- **Agua de mar a 1 MHz** ($\sigma\approx4$ S/m, $\varepsilon_r\approx81$): $\sigma/\omega\varepsilon\approx888\gg1$, buen conductor y $\delta_s\approx0{,}25$ m. Por eso las comunicaciones con submarinos usan frecuencias muy bajas (ELF/VLF), que penetran mucho más.

> Un conductor perfecto ($\sigma\to\infty$) tiene $\delta_s\to0$: el campo no penetra y las corrientes son puramente superficiales.

---

## 4. Propagación de ondas planas

### 4.1 Parámetros de propagación

Para una onda plana uniforme $e^{j(\omega t-\beta z)}$:

| Parámetro | Definición | Medio sin pérdidas |
|---|---|---|
| **Velocidad de fase** | $v_p=\dfrac{\omega}{\beta}$ (con qué velocidad avanza un punto de fase constante) | $\dfrac{1}{\sqrt{\mu\varepsilon}}=\dfrac{c}{\sqrt{\mu_r\varepsilon_r}}$ |
| **Longitud de onda** | $\lambda=\dfrac{2\pi}{\beta}=\dfrac{v_p}{f}$ (distancia entre dos puntos con la misma fase) | $\lambda_0/\sqrt{\mu_r\varepsilon_r}$ |
| **Número de onda** | $\beta=\dfrac{2\pi}{\lambda}$ | $\omega\sqrt{\mu\varepsilon}$ |
| **Índice de refracción** | $n=c/v_p$ | $\sqrt{\mu_r\varepsilon_r}$ |

Para un medio no magnético ($\mu_r=1$): $v_p=c/\sqrt{\varepsilon_r}$ y $\lambda=\lambda_0/\sqrt{\varepsilon_r}$. **La longitud de onda se acorta dentro de un dieléctrico** mientras que la frecuencia no cambia.

**Velocidad de grupo.** Es la velocidad a la que viaja la **envolvente** (la información) de un paquete de ondas:

$$v_g=\frac{d\omega}{d\beta}$$

En un medio no dispersivo $v_g=v_p$. En un medio dispersivo (por ejemplo con pérdidas) difieren, y la forma de la señal se deforma al propagarse.

**Sentido de propagación.** El factor $e^{-\gamma z}$ describe propagación hacia $+z$ (con atenuación). El factor $e^{+\gamma z}$ describe propagación hacia $-z$.

### 4.2 Impedancia característica del medio

Sustituyendo la solución $\mathbf{E}=E_x\hat{\mathbf{x}}$ en Faraday:

$$\nabla\times\mathbf{E}=\hat{\mathbf{y}}\frac{\partial E_x}{\partial z}=-j\omega\mu H_y\hat{\mathbf{y}}\;\Rightarrow\;-\gamma E_x=-j\omega\mu H_y$$

La relación entre las amplitudes de $E_x$ y $H_y$ de una onda progresiva es una constante del medio llamada **impedancia característica** (o intrínseca):

$$\boxed{\eta=\frac{E_x}{H_y}=\frac{j\omega\mu}{\gamma}=\sqrt{\frac{j\omega\mu}{\sigma+j\omega\varepsilon}}=\sqrt{\frac{\mu}{\varepsilon_c}}}\quad[\Omega]$$

**Medio sin pérdidas.** $\eta=\sqrt{\mu/\varepsilon}$ es real, así que $\mathbf{E}$ y $\mathbf{H}$ están **en fase**. En el vacío:

$$\eta_0=\sqrt{\frac{\mu_0}{\varepsilon_0}}\approx377\ \Omega=120\pi\ \Omega$$

Para un medio no magnético: $\eta=\eta_0/\sqrt{\varepsilon_r}$.

**Medio con pérdidas.** $\eta_c$ es **complejo**:

$$\eta_c=|\eta_c|e^{j\theta_\eta},\qquad|\eta_c|=\frac{\sqrt{\mu/\varepsilon}}{\left[1+\tan^2\delta\right]^{1/4}},\qquad\theta_\eta=\frac{\delta}{2}\in[0^\circ,45^\circ]$$

donde $\delta=\arctan(\sigma/\omega\varepsilon)$. Entonces **$\mathbf{E}$ adelanta a $\mathbf{H}$ en $\theta_\eta$ radianes**. En un buen conductor $\theta_\eta\to45^\circ$ y la impedancia es muy baja ($|\eta_c|\ll\eta_0$): el campo eléctrico es pequeño frente al magnético (es la razón por la que un conductor "cortocircuita" el campo eléctrico).

**Analogía con líneas de transmisión:** $\eta$ juega el papel de $Z_0$, $\mathbf{E}$ el de la tensión y $\mathbf{H}$ el de la corriente.

### 4.3 Relación de estructura de la onda

Es el conjunto de relaciones geométricas y de amplitud entre $\mathbf{E}$, $\mathbf{H}$ y la dirección de propagación $\hat{\mathbf{k}}$ en una onda plana uniforme:

1. **Transversalidad (TEM):** $\mathbf{E}\perp\hat{\mathbf{k}}$ y $\mathbf{H}\perp\hat{\mathbf{k}}$ (no hay componentes de campo en la dirección de propagación).
2. **Ortogonalidad mutua:** $\mathbf{E}\perp\mathbf{H}$.
3. **Triedro directo:** $(\mathbf{E},\mathbf{H},\hat{\mathbf{k}})$ forman un sistema dextrógiro, es decir, $\mathbf{E}\times\mathbf{H}$ apunta en el sentido de propagación.
4. **Relación de módulos:** $|\mathbf{E}|/|\mathbf{H}|=|\eta|$.

Estas relaciones se resumen en forma vectorial compacta:

$$\boxed{\mathbf{H}=\frac{1}{\eta}\,\hat{\mathbf{k}}\times\mathbf{E}\qquad\mathbf{E}=\eta\,\mathbf{H}\times\hat{\mathbf{k}}}$$

**Comprobación** con $\hat{\mathbf{k}}=\hat{\mathbf{z}}$ y $\mathbf{E}=E_x\hat{\mathbf{x}}$: $\hat{\mathbf{z}}\times\hat{\mathbf{x}}=\hat{\mathbf{y}}$, luego $\mathbf{H}=(E_x/\eta)\hat{\mathbf{y}}$, como habíamos obtenido.

**Para una onda regresiva** ($-\hat{\mathbf{z}}$) la relación cambia de signo: $H_y=-E_x/\eta$, porque el triedro debe mantener el sentido de propagación.

**Energía en una onda plana sin pérdidas.** La densidad de energía eléctrica y magnética son **iguales** en todo punto: $w_e=\tfrac12\varepsilon E^2=\tfrac12\mu H^2=w_m$. Las energías están equilibradas, como en un oscilador en el que se intercambia energía entre dos formas.

> Las relaciones de estructura valen para cada onda **plana** por separado. Cuando hay una superposición (onda estacionaria), los campos pueden no estar en fase ni ser proporcionales con $\eta$ (ver secciones 7 y 8).

---

## 5. Teorema de Poynting

Es el **balance de energía** del campo electromagnético. Partimos de la identidad vectorial

$$\nabla\cdot(\mathbf{E}\times\mathbf{H})=\mathbf{H}\cdot(\nabla\times\mathbf{E})-\mathbf{E}\cdot(\nabla\times\mathbf{H})$$

y sustituimos Faraday y Ampère-Maxwell:

$$\nabla\cdot(\mathbf{E}\times\mathbf{H})=-\mathbf{H}\cdot\frac{\partial\mathbf{B}}{\partial t}-\mathbf{E}\cdot\frac{\partial\mathbf{D}}{\partial t}-\mathbf{E}\cdot\mathbf{J}$$

Si el medio es lineal, $\mathbf{H}\cdot\partial_t\mathbf{B}=\partial_t(\tfrac12\mu H^2)$ y $\mathbf{E}\cdot\partial_t\mathbf{D}=\partial_t(\tfrac12\varepsilon E^2)$. Definimos:

- **Vector de Poynting:** $\mathbf{S}=\mathbf{E}\times\mathbf{H}$ [W/m²], densidad superficial de potencia.
- **Densidades de energía:** $w_e=\tfrac12\varepsilon E^2$ y $w_m=\tfrac12\mu H^2$ [J/m³].

**Forma diferencial**

$$\nabla\cdot\mathbf{S}+\frac{\partial}{\partial t}(w_e+w_m)+\mathbf{E}\cdot\mathbf{J}=0$$

**Forma integral** (se integra sobre un volumen $V$ limitado por $S$ y se aplica el teorema de la divergencia):

$$\boxed{-\oint_S\mathbf{S}\cdot d\mathbf{S}=\frac{d}{dt}\int_V(w_e+w_m)\,dV+\int_V\mathbf{E}\cdot\mathbf{J}\,dV}$$

**Interpretación.** La potencia que **entra** al volumen a través de su frontera ($-\oint\mathbf{S}\cdot d\mathbf{S}$) se emplea en:
1. **Aumentar la energía electromagnética almacenada** (primer término).
2. **Pérdidas por efecto Joule**, $\int\sigma|\mathbf{E}|^2dV$, calor disipado en el medio (segundo término, con $\mathbf{J}=\sigma\mathbf{E}$).

Si dentro hay fuentes que suministran potencia, $\mathbf{E}\cdot\mathbf{J}_{fuente}$ aparece con signo contrario, es decir, aporta energía.

$\mathbf{S}$ indica **dirección y densidad del flujo de energía**: en una onda plana apunta en la dirección de propagación.

### Teorema de Poynting complejo (régimen armónico)

Con fasores se define el **vector de Poynting complejo** $\tfrac12\mathbf{E}\times\mathbf{H}^*$. Su **parte real** es el valor medio temporal de la densidad de potencia:

$$\boxed{\langle\mathbf{S}\rangle=\frac{1}{2}\mathrm{Re}\{\mathbf{E}\times\mathbf{H}^*\}}\quad[\text{W/m}^2]$$

El factor $\tfrac12$ aparece porque los fasores se definen con amplitud (pico), no con valor eficaz. Con valores eficaces desaparece.

Calculando $\nabla\cdot(\tfrac12\mathbf{E}\times\mathbf{H}^*)$ con Faraday y Ampère fasoriales en un volumen sin fuentes:

$$-\oint_S\tfrac12(\mathbf{E}\times\mathbf{H}^*)\cdot d\mathbf{S}=\underbrace{\int_V\tfrac12\sigma|\mathbf{E}|^2dV}_{P_d\text{ (pérdidas, real)}}+2j\omega\int_V\left(\tfrac14\mu|\mathbf{H}|^2-\tfrac14\varepsilon|\mathbf{E}|^2\right)dV$$

- La **parte real** es el balance de potencia activa: la potencia neta entrante equivale a las pérdidas.
- La **parte imaginaria** es potencia reactiva y vale $2\omega(W_m-W_e)$: mide el desequilibrio entre energía magnética y eléctrica almacenadas.

**Aplicación a la onda plana.**

*Sin pérdidas:*

$$\langle\mathbf{S}\rangle=\frac{|E_0|^2}{2\eta}\hat{\mathbf{z}}$$

*Con pérdidas* ($\eta_c=|\eta_c|e^{j\theta_\eta}$):

$$\langle\mathbf{S}\rangle=\frac{|E_0|^2}{2|\eta_c|}\,e^{-2\alpha z}\cos\theta_\eta\,\hat{\mathbf{z}}$$

La potencia decae como $e^{-2\alpha z}$ y $\cos\theta_\eta$ refleja que parte del flujo es reactivo. Con ondas estacionarias de reflexión total, $\langle\mathbf{S}\rangle=0$: hay energía almacenada, pero no se transporta potencia neta.

---

## 6. Incidencia normal sobre una discontinuidad

Es el problema canónico: una onda plana que incide **perpendicularmente** sobre el plano que separa dos medios. Parte de la energía se **refleja** y parte se **transmite**. El análisis es idéntico al de una línea de transmisión con cambio de impedancia.

### 6.1 Condiciones de contorno

Para campos variables en la frontera entre dos medios (sin cargas ni corrientes superficiales libres):

- Componente **tangencial de $\mathbf{E}$ continua:** $E_{t1}=E_{t2}$.
- Componente **tangencial de $\mathbf{H}$ continua:** $H_{t1}=H_{t2}$.
- Componente normal de $\mathbf{D}$ continua si no hay carga superficial ($D_{n1}-D_{n2}=\rho_s$).
- Componente normal de $\mathbf{B}$ siempre continua.

Con incidencia normal, **todos los campos son tangenciales** a la interfaz, por lo que bastan las dos primeras.

*Conductor perfecto:* $\mathbf{E}_{tang}=0$ en la superficie, y aparece una corriente superficial $\mathbf{J}_s=\hat{\mathbf{n}}\times\mathbf{H}$.

### 6.2 Coeficientes de reflexión y transmisión

Geometría: medio 1 ($\eta_1,\beta_1$) para $z<0$; medio 2 ($\eta_2,\beta_2$) para $z>0$; la interfaz está en $z=0$.

$$\begin{aligned}
\text{Medio 1:}\quad&E_1=E_i\left(e^{-j\beta_1z}+\Gamma e^{+j\beta_1z}\right),\quad H_1=\frac{E_i}{\eta_1}\left(e^{-j\beta_1z}-\Gamma e^{+j\beta_1z}\right)\\
\text{Medio 2:}\quad&E_2=\tau E_ie^{-j\beta_2z},\quad H_2=\frac{\tau E_i}{\eta_2}e^{-j\beta_2z}
\end{aligned}$$

(La onda reflejada va hacia $-z$, por eso su $\mathbf{H}$ lleva signo menos.) Imponiendo continuidad de $E$ y $H$ en $z=0$:

$$1+\Gamma=\tau,\qquad\frac{1-\Gamma}{\eta_1}=\frac{\tau}{\eta_2}$$

$$\boxed{\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1}\qquad\tau=\frac{2\eta_2}{\eta_2+\eta_1}=1+\Gamma}$$

**Lectura de los resultados**

| Situación | $\Gamma$ | Comentario |
|---|---|---|
| $\eta_2=\eta_1$ | $0$ | Medios adaptados, no hay reflexión |
| $\eta_2>\eta_1$ | $>0$ (real, sin pérdidas) | $E$ reflejado en fase con el incidente |
| $\eta_2<\eta_1$ | $<0$ | $E$ reflejado con inversión de fase (180°) |
| $\eta_2\to0$ (PEC) | $-1$ | Reflexión total con inversión; $\tau=0$ |
| $\eta_2\to\infty$ (circuito abierto) | $+1$ | Reflexión total sin inversión |

**Ejemplo:** aire ($\eta_1=377\ \Omega$) a dieléctrico con $\varepsilon_r=4$ ($\eta_2=188{,}5\ \Omega$):

$$\Gamma=\frac{188{,}5-377}{188{,}5+377}=-\frac13,\qquad\tau=\frac23$$

### 6.3 Balance de potencia

Con medios sin pérdidas, la potencia incidente, reflejada y transmitida (por unidad de área) cumplen:

$$\frac{P_r}{P_i}=|\Gamma|^2\qquad\frac{P_t}{P_i}=\frac{\eta_1}{\eta_2}|\tau|^2=1-|\Gamma|^2$$

Es decir $|\Gamma|^2+\dfrac{\eta_1}{\eta_2}\tau^2=1$ (**conservación de la energía**). Nótese que **la potencia transmitida no es $|\tau|^2$**: hay que corregir por el cambio de impedancia.

Siguiendo el ejemplo: reflexión $|\Gamma|^2=1/9\approx11{,}1\%$; transmisión $\dfrac{377}{188{,}5}\cdot\dfrac49=\dfrac89\approx88{,}9\%$, y la suma es 1.

---

## 7. Concepto de impedancia de onda

La **impedancia de onda** en un punto del espacio es el cociente entre las componentes transversales (fasores) del campo eléctrico y magnético en ese punto:

$$Z(z)=\frac{E_x(z)}{H_y(z)}$$

**No es lo mismo que la impedancia característica $\eta$:**

| | Impedancia característica $\eta$ | Impedancia de onda $Z(z)$ |
|---|---|---|
| Qué es | Propiedad del **medio** | Propiedad del **campo** en un punto |
| Depende de | $\mu,\varepsilon,\sigma,\omega$ | Del medio **y de la superposición de ondas** presente |
| Varía con la posición | No | Sí, si hay ondas progresiva y regresiva |
| Caso particular | — | Si solo hay onda progresiva, $Z=\eta$ |

**Expresión en el medio 1 con reflexión.** Para una onda con coeficiente de reflexión $\Gamma$ en $z=0$, se define $\Gamma(z)=\Gamma e^{2j\beta_1z}$ (el reflejado respecto del incidente a la cota $z$), y

$$Z(z)=\eta_1\frac{1+\Gamma(z)}{1-\Gamma(z)}$$

Situándonos a una distancia $d$ de la interfaz ($z=-d$), resulta la **transformación de impedancia** (idéntica a la de líneas de transmisión):

$$\boxed{Z(d)=\eta_1\frac{\eta_2+j\eta_1\tan\beta_1d}{\eta_1+j\eta_2\tan\beta_1d}}$$

**Propiedades útiles**
- **Periodicidad:** $Z(d)$ se repite cada $d=\lambda_1/2$, es decir $Z(d+\lambda_1/2)=Z(d)$.
- **Cuarto de onda:** $d=\lambda_1/4\Rightarrow\tan\beta_1d\to\infty$ y $Z=\eta_1^2/\eta_2$ (inversor de impedancias), propiedad que usa el adaptador (sección 9).
- **Media onda:** $d=\lambda_1/2\Rightarrow Z=\eta_2$ (el medio 1 es "transparente").
- **Medio 2 = conductor perfecto** ($\eta_2=0$): $Z(d)=j\eta_1\tan\beta_1d$, **puramente reactiva** (varía de $-\infty$ a $+\infty$).

**Utilidad.** Permite sustituir el problema de ondas por un circuito equivalente: en cualquier plano, todo lo que hay "a la derecha" se comporta como una impedancia $Z$ que carga al medio 1, y $\Gamma$ vuelve a calcularse con $\Gamma=(Z-\eta_1)/(Z+\eta_1)$.

---

## 8. Onda estacionaria

Cuando en un medio sin pérdidas coexisten una onda progresiva y una regresiva (la reflejada) de la **misma frecuencia**, su interferencia produce un patrón de campo con **máximos y mínimos fijos en el espacio**: una onda estacionaria.

**Módulo del campo en el medio 1.** Con $\Gamma=|\Gamma|e^{j\phi}$ y la cota $z=-d$:

$$|E_1(d)|=|E_i|\,\left|1+\Gamma e^{-2j\beta_1d}\right|=|E_i|\sqrt{1+|\Gamma|^2+2|\Gamma|\cos(\phi-2\beta_1d)}$$

$$|E|_{max}=|E_i|(1+|\Gamma|),\qquad|E|_{min}=|E_i|(1-|\Gamma|)$$

**Relación de onda estacionaria** (ROE o SWR / VSWR):

$$\boxed{\text{ROE}=S=\frac{|E|_{max}}{|E|_{min}}=\frac{1+|\Gamma|}{1-|\Gamma|}\qquad\Leftrightarrow\qquad|\Gamma|=\frac{S-1}{S+1}}$$

- $S=1$: adaptación perfecta, solo onda progresiva (sin patrón).
- $S\to\infty$: reflexión total, onda estacionaria pura (con nodos de campo).

**Posición de máximos y mínimos**
- Distancia entre **máximos consecutivos**: $\lambda_1/2$.
- Distancia entre un **máximo y un mínimo contiguos**: $\lambda_1/4$.
- Primer máximo desde la interfaz (si $\phi\ge0$): $d_{max}=\dfrac{\phi}{4\pi}\lambda_1$.
- Si $\Gamma>0$ real ($\phi=0$): máximo de $|E|$ en la propia interfaz. Si $\Gamma<0$ real ($\phi=\pi$): mínimo en la interfaz.
- Los máximos de $|E|$ coinciden con los **mínimos de $|H|$** y viceversa.

**Estacionaria pura (PEC).** Con $\Gamma=-1$:

$$E_1(z)=E_i\left(e^{-j\beta z}-e^{j\beta z}\right)=-2jE_i\sin\beta z$$

y con $E_i$ real, en el tiempo:

$$E(z,t)=2E_i\sin\beta z\,\sin\omega t$$

Es un producto de una función del espacio por una del tiempo: **no hay propagación**, cada punto oscila en fase con amplitud que depende de $z$. Los **nodos** (campo nulo) aparecen en $z=-n\lambda/2$ y los **vientres** (máximo) en $z=-(2n+1)\lambda/4$. $\mathbf{H}$ está desfasado 90° respecto a $\mathbf{E}$ en tiempo y espacio, de modo que $\langle\mathbf{S}\rangle=0$: **no se transporta potencia neta**, solo se intercambia energía entre campo eléctrico y magnético.

**Caso general (onda estacionaria parcial).** La onda total es suma de una progresiva de amplitud $|E_i|(1-|\Gamma|)$ que transporta la potencia y una estacionaria pura de amplitud $2|\Gamma||E_i|$. La potencia neta transportada es $|E_i|^2(1-|\Gamma|^2)/2\eta_1$.

**Aplicaciones prácticas:** la ROE se mide con una línea ranurada y mide la calidad de adaptación de antenas y cargas. Valores típicos: $S<1{,}5$ (buena), $S=2$ corresponde a $|\Gamma|=1/3$ (11 % de potencia reflejada).

---

## 9. Adaptador en λ/4

**Problema.** Adaptar dos medios con impedancias distintas $\eta_1$ y $\eta_3$ para eliminar la reflexión. Se **intercala una capa de un tercer medio** de impedancia $\eta_2$ y espesor $d$.

```
   Medio 1        Capa λ/4       Medio 3
   (η₁)           (η₂, d)        (η₃)
 ─────────────┬──────────────┬─────────────
   →  incide  │              │  → transmitida
   ← Γ_in=0   │  d = λ₂/4    │
```

**Impedancia de entrada.** Aplicamos la transformación de la sección 7 en la capa (medio 2) cargada por $\eta_3$:

$$Z_{in}=\eta_2\frac{\eta_3+j\eta_2\tan\beta_2d}{\eta_2+j\eta_3\tan\beta_2d}$$

Con $d=\lambda_2/4$, $\beta_2d=\pi/2$ y $\tan\to\infty$:

$$Z_{in}=\frac{\eta_2^2}{\eta_3}$$

Para que no haya reflexión en la entrada hay que lograr $Z_{in}=\eta_1$. De ahí las **condiciones de diseño**:

$$\boxed{d=\frac{\lambda_2}{4}\;(\text{o }(2m+1)\tfrac{\lambda_2}{4})\qquad\eta_2=\sqrt{\eta_1\eta_3}}$$

donde $\lambda_2=\lambda_0/\sqrt{\varepsilon_{r2}\mu_{r2}}$ es la longitud de onda **dentro de la capa**. El valor de $\eta_2$ es la **media geométrica** de las impedancias adyacentes.

**Para materiales no magnéticos** ($\eta\propto1/n$), la condición se escribe en índices de refracción:

$$n_2=\sqrt{n_1n_3}\;\Longleftrightarrow\;\varepsilon_{r2}=\sqrt{\varepsilon_{r1}\varepsilon_{r3}}$$

**Interpretación física: interferencia destructiva.** La onda se refleja en las dos interfaces (1-2 y 2-3). La reflejada en la segunda recorre $2\times\lambda_2/4=\lambda_2/2$ de camino extra, es decir, un desfase de 180°, y llega con signo opuesto a la reflejada en la primera. Con $\eta_2=\sqrt{\eta_1\eta_3}$ ambas tienen la **misma amplitud** ($\Gamma_{12}=\Gamma_{23}$), por lo que se cancelan exactamente. Toda la potencia pasa al medio 3.

**Ejemplo numérico.** Adaptar aire ($\varepsilon_{r1}=1$) con un dieléctrico $\varepsilon_{r3}=9$ a $f=10$ GHz:

- $\eta_1=377\ \Omega$, $\eta_3=377/3=125{,}7\ \Omega$.
- $\eta_2=\sqrt{377\cdot125{,}7}=217{,}7\ \Omega\Rightarrow\varepsilon_{r2}=(377/217{,}7)^2=3$.
- $\lambda_0=3$ cm y $d=\dfrac{\lambda_0}{4\sqrt{\varepsilon_{r2}}}=\dfrac{30\ \text{mm}}{4\cdot1{,}732}\approx4{,}33$ mm.

**Limitaciones**
- Solo **funciona perfectamente a una frecuencia** ($d=\lambda_2/4$) y en incidencia normal. Fuera de ella aparece $\Gamma\neq0$: es un adaptador **de banda estrecha**.
- Se necesita un material con la $\varepsilon_r$ exacta, que a veces no existe (se aproxima).
- **Mejora de ancho de banda:** se emplean varias secciones $\lambda/4$ en cascada (transformadores binomiales o de Chebyshev).
- En incidencia oblicua el desfase depende del ángulo y la adaptación se degrada.

**Aplicaciones:** recubrimientos antirreflectantes ópticos (capa de MgF$_2$, $n\approx1{,}38$, sobre vidrio, $n\approx1{,}5$), radomos, lentes dieléctricas, adaptación de antenas y de líneas de transmisión (mismo principio con $Z_0=\sqrt{Z_{01}Z_{03}}$).

---

## 10. Polarización

La **polarización** de una onda describe cómo evoluciona en el tiempo la **dirección del vector $\mathbf{E}$** en un punto fijo del espacio, es decir, la figura que traza su extremo en el plano transversal a la propagación. La polarización de $\mathbf{H}$ es la misma, rotada 90°.

**Planteamiento general.** Una onda que viaja en $+z$ tiene dos componentes transversales ortogonales:

$$\mathbf{E}(z)=\left(E_1\hat{\mathbf{x}}+E_2e^{j\delta}\hat{\mathbf{y}}\right)e^{-j\beta z}$$

con $E_1,E_2\ge0$ y $\delta$ el **desfase entre componentes**. En el tiempo, en $z=0$:

$$E_x=E_1\cos\omega t,\qquad E_y=E_2\cos(\omega t+\delta)$$

Eliminando $t$ se obtiene la **ecuación de una elipse**:

$$\frac{E_x^2}{E_1^2}+\frac{E_y^2}{E_2^2}-\frac{2E_xE_y}{E_1E_2}\cos\delta=\sin^2\delta$$

El tipo de polarización depende de la relación de amplitudes y del desfase.

### 10.1 Polarización lineal

**Condición:** $\delta=0$ o $\delta=\pm\pi$ (componentes en fase o en oposición), o bien una de las amplitudes nula.

La elipse degenera en un **segmento**: el campo oscila siempre a lo largo de una recta que forma un ángulo $\psi$ con el eje $x$:

$$\tan\psi=\pm\frac{E_2}{E_1}$$

Casos habituales: **polarización horizontal** ($E_y=0$) y **vertical** ($E_x=0$). Es la que radian la mayoría de las antenas dipolares.

### 10.2 Polarización circular

**Condición:** $E_1=E_2=E_0$ **y** $\delta=\pm\pi/2$.

La elipse se convierte en una circunferencia: el módulo del campo es **constante** y su dirección gira a velocidad angular $\omega$:

$$\mathbf{E}(t)=E_0\left[\cos\omega t\,\hat{\mathbf{x}}\mp\sin\omega t\,\hat{\mathbf{y}}\right]$$

**Sentido de giro (convenio IEEE).** Se define mirando en el sentido de propagación (desde la fuente):

| $\delta$ | Fasor | Sentido | Nombre |
|---|---|---|---|
| $-\pi/2$ | $E_0(\hat{\mathbf{x}}-j\hat{\mathbf{y}})e^{-j\beta z}$ | Horario visto desde la fuente (regla de la mano derecha con el pulgar en la dirección de propagación) | **Circular a derechas (RHCP)** |
| $+\pi/2$ | $E_0(\hat{\mathbf{x}}+j\hat{\mathbf{y}})e^{-j\beta z}$ | Antihorario visto desde la fuente | **Circular a izquierdas (LHCP)** |

> **Cuidado:** el convenio de **óptica** usa el sentido opuesto, y además cambia con el convenio $e^{\pm j\omega t}$. Comprueba siempre con qué convenio trabaja tu profesor/a.

**Ventajas:** no depende de la orientación relativa de las antenas (comunicaciones por satélite, GPS, radar con lluvia) y es insensible al giro de Faraday en la ionosfera.

### 10.3 Polarización elíptica

**Condición:** caso general, cuando no se cumple ninguna de las anteriores (amplitudes distintas, o desfase distinto de $0,\pm\pi/2,\pi$ con amplitudes iguales).

El extremo de $\mathbf{E}$ describe una **elipse**. Se caracteriza por:

- **Relación axial:** $AR=\dfrac{\text{eje mayor}}{\text{eje menor}}\in[1,\infty)$. Vale $1$ para circular y $\infty$ para lineal.
- **Ángulo de inclinación** $\tau$ del eje mayor respecto al eje $x$:

$$\tan2\tau=\frac{2E_1E_2\cos\delta}{E_1^2-E_2^2}$$

- **Sentido de giro**: según el signo de $\sin\delta$ (para $0<\delta<\pi$ el giro es izquierdo y para $-\pi<\delta<0$ derecho, con los convenios de arriba).

### 10.4 Descomposición y relaciones útiles

- **Toda polarización puede descomponerse** en dos lineales ortogonales, o en **dos circulares de sentidos opuestos** (RHCP + LHCP). La elíptica es la suma de ambas con amplitudes distintas; la lineal, con amplitudes iguales; y la circular es el caso con una nula:

$$\hat{\mathbf{x}}=\tfrac12\left[(\hat{\mathbf{x}}-j\hat{\mathbf{y}})+(\hat{\mathbf{x}}+j\hat{\mathbf{y}})\right]$$

- **Reflexión con inversión de sentido.** Al reflejarse con incidencia normal en un conductor perfecto, la onda circular cambia su sentido de giro (RHCP pasa a LHCP) respecto de su dirección de propagación, porque se invierte el sentido de propagación pero no el sentido de rotación del campo tras la inversión de fase. Este hecho se utiliza en radar para distinguir blancos.
- **Pérdida por desacoplo de polarización.** Entre una onda con polarización $\hat{\boldsymbol\rho}_w$ y una antena receptora con polarización $\hat{\boldsymbol\rho}_a$, la fracción de potencia recibida es

$$\text{PLF}=\left|\hat{\boldsymbol\rho}_w\cdot\hat{\boldsymbol\rho}_a^{\,*}\right|^2$$

Por ejemplo, dos lineales cruzadas (90°) dan $\text{PLF}=0$, y una circular recibida con una lineal da $\text{PLF}=1/2$ (3 dB de pérdida).

**Resumen visual**

| Tipo | $E_2/E_1$ | $\delta$ | Figura |
|---|---|---|---|
| Lineal | cualquiera | $0$ ó $\pi$ | Segmento |
| Circular | $1$ | $\pm\pi/2$ | Circunferencia |
| Elíptica | general | general | Elipse |

---

## 11. Tabla resumen de fórmulas

| Concepto | Fórmula |
|---|---|
| Gauss eléctrico | $\nabla\cdot\mathbf{D}=\rho_v$ |
| Gauss magnético | $\nabla\cdot\mathbf{B}=0$ |
| Faraday-Lenz | $\nabla\times\mathbf{E}=-\partial_t\mathbf{B}$ |
| Ampère-Maxwell | $\nabla\times\mathbf{H}=\mathbf{J}+\partial_t\mathbf{D}$ |
| Constitutivas | $\mathbf{D}=\varepsilon\mathbf{E},\;\mathbf{B}=\mu\mathbf{H},\;\mathbf{J}=\sigma\mathbf{E}$ |
| Permitividad compleja | $\varepsilon_c=\varepsilon-j\sigma/\omega$ |
| Helmholtz | $\nabla^2\mathbf{E}=\gamma^2\mathbf{E}$, $\gamma=j\omega\sqrt{\mu\varepsilon_c}=\alpha+j\beta$ |
| Sin pérdidas | $\beta=\omega\sqrt{\mu\varepsilon}$, $v_p=1/\sqrt{\mu\varepsilon}$, $\lambda=2\pi/\beta$ |
| Tangente de pérdidas | $\tan\delta=\sigma/\omega\varepsilon$ |
| Impedancia intrínseca | $\eta=\sqrt{\mu/\varepsilon_c}$; $\eta_0=120\pi\approx377\ \Omega$ |
| Estructura | $\mathbf{H}=\tfrac1\eta\hat{\mathbf{k}}\times\mathbf{E}$ |
| Buen conductor | $\alpha=\beta=\sqrt{\pi f\mu\sigma}$, $\delta_s=1/\alpha$ |
| Poynting medio | $\langle\mathbf{S}\rangle=\tfrac12\mathrm{Re}\{\mathbf{E}\times\mathbf{H}^*\}$ |
| Reflexión / transmisión | $\Gamma=\dfrac{\eta_2-\eta_1}{\eta_2+\eta_1}$, $\tau=1+\Gamma$ |
| Potencia | $P_r/P_i=|\Gamma|^2$, $P_t/P_i=1-|\Gamma|^2$ |
| ROE | $S=\dfrac{1+|\Gamma|}{1-|\Gamma|}$ |
| Transformación de impedancia | $Z(d)=\eta_1\dfrac{\eta_2+j\eta_1\tan\beta_1d}{\eta_1+j\eta_2\tan\beta_1d}$ |
| Adaptador $\lambda/4$ | $d=\lambda_2/4$, $\eta_2=\sqrt{\eta_1\eta_3}$ |
| Polarización circular | $E_1=E_2$, $\delta=\pm\pi/2$ |

---

## 12. Errores típicos

1. **Olvidar el factor $\tfrac12$** en $\langle\mathbf{S}\rangle$ cuando los fasores son de amplitud (pico) y no eficaces.
2. **Confundir $|\tau|^2$ con la fracción de potencia transmitida.** Hay que multiplicar por $\eta_1/\eta_2$ (en medios sin pérdidas).
3. **Confundir impedancia característica $\eta$ con impedancia de onda $Z(z)$.** Solo coinciden si hay una única onda progresiva.
4. **Usar $\lambda_0$ dentro de un dieléctrico.** En la capa del adaptador se usa $\lambda_2=\lambda_0/\sqrt{\varepsilon_{r2}}$.
5. **Tratar $\tan\delta$ como constante del material.** Depende de la frecuencia.
6. **Olvidar el signo de $\mathbf{H}$ en la onda regresiva** al plantear las condiciones de contorno.
7. **Aplicar las aproximaciones de buen conductor/dieléctrico sin comprobar $\tan\delta$** ($\gg1$ o $\ll1$) a la frecuencia dada.
8. **Dar el sentido de giro sin decir el convenio** (IEEE u óptica) ni el signo de la dependencia temporal.
9. **Mezclar unidades de atenuación:** $\alpha$ está en Np/m; para dB/m se multiplica por $8{,}686$.
