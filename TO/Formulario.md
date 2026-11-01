# Formulario — Transmisión de Ondas, Bloque 1

Ondas planas y ecuaciones de Maxwell. Cada fórmula lleva una explicación breve de qué es y cuándo se usa.

> **Convenios:** dependencia $e^{j\omega t}$; onda hacia $+z$ → $e^{-\gamma z}$; amplitudes de pico salvo que se diga lo contrario.
> **⚪** = no entra en el próximo parcial (al final).
> Constantes: $\varepsilon_0=8{,}854\cdot10^{-12}$ F/m, $\mu_0=4\pi\cdot10^{-7}$ H/m, $c=3\cdot10^{8}$ m/s, $\eta_0=120\pi\approx377\ \Omega$.

## Índice

1. [Ecuaciones de Maxwell](#1-ecuaciones-de-maxwell)
2. [Relaciones constitutivas](#2-relaciones-constitutivas)
3. [Ecuación de ondas y medios con pérdidas](#3-ecuación-de-ondas-y-medios-con-pérdidas)
4. [Parámetros de propagación e impedancia](#4-parámetros-de-propagación-e-impedancia)
5. [Potencia y vector de Poynting](#5-potencia-y-vector-de-poynting)
6. [Reflexión y transmisión (incidencia normal)](#6-reflexión-y-transmisión-incidencia-normal)
7. [Impedancia de onda y onda estacionaria](#7-impedancia-de-onda-y-onda-estacionaria)
8. [Lámina y adaptador en λ/4](#8-lámina-y-adaptador-en-λ4)
9. [Polarización](#9-polarización)
10. [Escribir E(z,t) y H(z,t)](#10-escribir-ezt-y-hzt)
11. [Prácticas de laboratorio](#11-prácticas-de-laboratorio)
12. [Matemáticas de apoyo](#12-matemáticas-de-apoyo)
13. [⚪ Fuera del parcial](#13--fuera-del-parcial)

---

## 1. Ecuaciones de Maxwell

| Fórmula | Explicación |
|---|---|
| $\oint_S\mathbf{D}\cdot d\mathbf{S}=Q_{enc}=\int_V\rho_v\,dV$ | Gauss eléctrico (integral): el flujo de $\mathbf{D}$ por una superficie cerrada es la carga libre encerrada. |
| $\nabla\cdot\mathbf{D}=\rho_v$ | Gauss eléctrico (diferencial): las cargas libres son fuentes de $\mathbf{D}$. |
| $\oint_S\mathbf{B}\cdot d\mathbf{S}=0$ | Gauss magnético (integral): no hay monopolos, el flujo de $\mathbf{B}$ por una superficie cerrada es nulo. |
| $\nabla\cdot\mathbf{B}=0$ | Gauss magnético (diferencial): las líneas de $\mathbf{B}$ son cerradas. |
| $\oint_C\mathbf{E}\cdot d\mathbf{l}=-\dfrac{d\Phi_B}{dt}$ | Faraday-Lenz (integral): un flujo magnético variable induce fem; el signo $-$ es la ley de Lenz (se opone a la variación). |
| $\nabla\times\mathbf{E}=-\dfrac{\partial\mathbf{B}}{\partial t}$ | Faraday (diferencial): un $\mathbf{B}$ variable crea un $\mathbf{E}$ rotacional. |
| $\mathrm{fem}=-\int_S\dfrac{\partial\mathbf{B}}{\partial t}\cdot d\mathbf{S}+\oint_C(\mathbf{v}\times\mathbf{B})\cdot d\mathbf{l}$ | Dos orígenes de la fem: de transformador (B variable, espira quieta) y de movimiento (espira que se mueve). |
| $\oint_C\mathbf{H}\cdot d\mathbf{l}=I_{enc}+\dfrac{d}{dt}\int_S\mathbf{D}\cdot d\mathbf{S}$ | Ampère-Maxwell (integral): la circulación de $\mathbf{H}$ es la corriente de conducción más la de desplazamiento. |
| $\nabla\times\mathbf{H}=\mathbf{J}+\dfrac{\partial\mathbf{D}}{\partial t}$ | Ampère-Maxwell (diferencial): $\mathbf{J}$ y un $\mathbf{D}$ variable crean $\mathbf{H}$. |
| $\mathbf{J}_d=\dfrac{\partial\mathbf{D}}{\partial t}$ | Corriente de desplazamiento (término añadido por Maxwell); en un condensador equivale a $I=C\,dV/dt$. |
| $\nabla\cdot\mathbf{J}=-\dfrac{\partial\rho_v}{\partial t}$ | Ecuación de continuidad: conservación de la carga (se deduce de las anteriores). |
| $\nabla\times\mathbf{E}=-j\omega\mathbf{B}$, $\ \nabla\times\mathbf{H}=\mathbf{J}+j\omega\mathbf{D}$ | Faraday y Ampère en fasores: derivar respecto de $t$ equivale a multiplicar por $j\omega$. |
| $\dfrac{\lvert\mathbf{J}\rvert}{\lvert\mathbf{J}_d\rvert}=\dfrac{\sigma}{\omega\varepsilon}$ | Cociente conducción/desplazamiento: es la tangente de pérdidas; decide si el material es conductor o dieléctrico. |
| $\oint_S\mathbf{F}\cdot d\mathbf{S}=\int_V\nabla\cdot\mathbf{F}\,dV$ | Teorema de la divergencia: pasa de forma integral a diferencial en las leyes de Gauss. |
| $\oint_C\mathbf{F}\cdot d\mathbf{l}=\int_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$ | Teorema de Stokes: pasa de integral a diferencial en Faraday y Ampère. |
| $D\cdot4\pi r^2=Q\Rightarrow\mathbf{E}=\dfrac{Q}{4\pi\varepsilon r^2}\hat{\mathbf{r}}$ | Gauss con simetría esférica: campo de una carga puntual (Coulomb). |
| $H\cdot2\pi r=I\Rightarrow\mathbf{H}=\dfrac{I}{2\pi r}\hat{\boldsymbol\phi}$ | Ampère con simetría cilíndrica: campo de un hilo infinito. |
| $\Phi=B_0S\cos\omega t\Rightarrow\mathrm{fem}=\omega B_0S\sin\omega t$ | Espira plana en $B$ senoidal. |
| $\mathbf{B}=\nabla\times\mathbf{A}$ | Potencial vector: existe porque $\nabla\cdot\mathbf{B}=0$ (base del cálculo de antenas). |

## 2. Relaciones constitutivas

| Fórmula | Explicación |
|---|---|
| $\mathbf{D}=\varepsilon\mathbf{E},\ \ \mathbf{B}=\mu\mathbf{H},\ \ \mathbf{J}=\sigma\mathbf{E}$ | Cierran el sistema en medios lineales, homogéneos, isótropos y no dispersivos; $\mathbf{J}=\sigma\mathbf{E}$ es la ley de Ohm puntual. |
| $\varepsilon=\varepsilon_0\varepsilon_r,\ \ \mu=\mu_0\mu_r$ | Permitividad y permeabilidad absolutas a partir de las relativas (números adimensionales; $\varepsilon_0$ nunca vale 4). |
| $c=\dfrac{1}{\sqrt{\mu_0\varepsilon_0}}$ | Velocidad de la luz en el vacío. |
| $\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P},\ \ \mathbf{P}=\varepsilon_0\chi_e\mathbf{E},\ \ \varepsilon_r=1+\chi_e$ | Polarización dieléctrica: los dipolos almacenan energía eléctrica. |
| $\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M}),\ \ \mathbf{M}=\chi_m\mathbf{H},\ \ \mu_r=1+\chi_m$ | Magnetización del material. |
| Condiciones de contorno: $E_{t1}=E_{t2}$, $H_{t1}=H_{t2}$, $B_{n1}=B_{n2}$, $D_{n1}-D_{n2}=\rho_s$ | Continuidad de campos tangenciales y normales en una interfaz (sin corrientes superficiales libres). |
| PEC: $\mathbf{E}_{tang}=0$, $\mathbf{J}_s=\hat{\mathbf{n}}\times\mathbf{H}$ | Conductor perfecto: no hay campo dentro y aparece corriente superficial. |

## 3. Ecuación de ondas y medios con pérdidas

| Fórmula | Explicación |
|---|---|
| $\nabla^2\mathbf{E}-\mu\varepsilon\dfrac{\partial^2\mathbf{E}}{\partial t^2}=0$ | Ecuación de ondas (d'Alembert) sin pérdidas; igual para $\mathbf{H}$. |
| $\nabla^2\mathbf{E}+\beta^2\mathbf{E}=0,\ \ \beta=\omega\sqrt{\mu\varepsilon}$ | Ecuación de Helmholtz (régimen armónico, sin pérdidas). |
| $E_x(z)=E^+e^{-j\beta z}+E^-e^{+j\beta z}$ | Solución de la onda plana: progresiva ($+z$) más regresiva ($-z$). |
| $E_x(z,t)=E^+\cos(\omega t-\beta z)+E^-\cos(\omega t+\beta z)$ | La misma solución en el dominio del tiempo. |
| $\nabla\cdot\mathbf{E}=0\Rightarrow E_z=0$ | Una onda plana uniforme es TEM: no tiene componente en la dirección de propagación. |
| $\nabla^2\mathbf{E}=\mu\sigma\dfrac{\partial\mathbf{E}}{\partial t}+\mu\varepsilon\dfrac{\partial^2\mathbf{E}}{\partial t^2}$ | Ecuación de ondas con pérdidas; $\mu\sigma\,\partial_t\mathbf{E}$ es el término de amortiguamiento. |
| $\varepsilon_c=\varepsilon-j\dfrac{\sigma}{\omega}=\varepsilon'-j\varepsilon''$ | Permitividad compleja: incluye la conducción; todas las fórmulas sin pérdidas valen cambiando $\varepsilon$ por $\varepsilon_c$. |
| $\nabla\times\mathbf{H}=j\omega\varepsilon_c\mathbf{E}$ | Ampère-Maxwell con $\sigma$ empaquetado en $\varepsilon_c$. |
| $\gamma=\alpha+j\beta=j\omega\sqrt{\mu\varepsilon_c}$ | Constante de propagación; $\gamma^2=j\omega\mu(\sigma+j\omega\varepsilon)$. |
| $\mathbf{E}(z)=E_0e^{-\gamma z}\hat{\mathbf{x}}=E_0e^{-\alpha z}e^{-j\beta z}\hat{\mathbf{x}}$ | Onda progresiva con pérdidas: $\alpha$ atenúa, $\beta$ da la fase. |
| $E(z,t)=E_0e^{-\alpha z}\cos(\omega t-\beta z+\varphi)$ | Campo instantáneo con atenuación. |
| $\alpha=\omega\sqrt{\dfrac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}-1\right]}$ | Constante de atenuación exacta (Np/m), válida siempre. |
| $\beta=\omega\sqrt{\dfrac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}+1\right]}$ | Constante de fase exacta (rad/m), válida siempre. |
| $\tan\delta=\dfrac{\varepsilon''}{\varepsilon'}=\dfrac{\sigma}{\omega\varepsilon}=\dfrac{\lvert\mathbf{J}_{cond}\rvert}{\lvert\mathbf{J}_{desp}\rvert}$ | Tangente de pérdidas: clasifica el medio; depende de la frecuencia. |
| $\tan\delta=\dfrac{\omega\varepsilon''_{pol}+\sigma}{\omega\varepsilon'}$ | Si además hay pérdidas por polarización. |
| Buen dieléctrico ($\tan\delta\ll1$): $\alpha\approx\dfrac{\sigma}{2}\sqrt{\dfrac{\mu}{\varepsilon}}=\dfrac{\sigma\eta}{2}$, $\ \beta\approx\omega\sqrt{\mu\varepsilon}$, $\ \eta_c\approx\sqrt{\mu/\varepsilon}$ | Casi sin pérdidas; la atenuación es una pequeña corrección. |
| Buen conductor ($\tan\delta\gg1$): $\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}$ | Atenuación y fase casi iguales. |
| Buen conductor: $\eta_c\approx(1+j)\sqrt{\dfrac{\pi f\mu}{\sigma}}=\dfrac{1+j}{\sigma\delta_s}$, fase $45^\circ$ | Impedancia muy baja con fase $\approx45^\circ$. |
| $\delta_s=\dfrac{1}{\alpha}=\dfrac{1}{\sqrt{\pi f\mu\sigma}}$ | Profundidad de penetración (skin depth): la amplitud cae a $1/e\approx37\%$; la última igualdad solo vale para buen conductor. |
| $\lambda=2\pi\delta_s$ | Longitud de onda en un buen conductor. |
| $f=\dfrac{1}{\pi\mu\sigma\delta_s^2}=\dfrac{\alpha^2}{\pi\mu\sigma}$ | Frecuencia que produce una profundidad de penetración dada (buen conductor). |
| $z_{1\%}=\dfrac{\ln100}{\alpha}\approx4{,}6\,\delta_s$ | Distancia a la que la amplitud cae al 1 %; para un porcentaje $p$: $z=\ln(1/p)/\alpha$. |
| $\alpha[\text{dB/m}]=8{,}686\,\alpha[\text{Np/m}]$; pérdida en $d$: $8{,}686\,\alpha d$ dB | Conversión Np–dB. |
| Potencia $\propto e^{-2\alpha z}$ | La potencia decae al doble de rápido que la amplitud. |
| Ejemplo de órdenes de magnitud: cobre a 1 GHz, $\delta_s\approx2{,}1\ \mu$m; agua de mar a 1 MHz, $\delta_s\approx0{,}25$ m; teflón $\tan\delta\sim10^{-4}$, FR4 $\sim2\cdot10^{-2}$ | Valores de referencia para saber de qué escala se trata. |

## 4. Parámetros de propagación e impedancia

| Fórmula | Explicación |
|---|---|
| $v_p=\dfrac{\omega}{\beta}=\dfrac{1}{\sqrt{\mu\varepsilon}}=\dfrac{c}{\sqrt{\mu_r\varepsilon_r}}$ | Velocidad de fase (sin pérdidas): con qué velocidad avanza un punto de fase constante. |
| $n=\dfrac{c}{v_p}=\sqrt{\mu_r\varepsilon_r}$ | Índice de refracción; con $\mu_r=1$, $n=\sqrt{\varepsilon_r}$. |
| $\lambda=\dfrac{2\pi}{\beta}=\dfrac{v_p}{f}=\dfrac{\lambda_0}{n}$ | Longitud de onda: se acorta dentro de un dieléctrico; la frecuencia no cambia. |
| $\beta=\dfrac{2\pi}{\lambda}=\omega\sqrt{\mu\varepsilon}=\dfrac{n\omega}{c}$ | Constante de fase (sin pérdidas). |
| $v_g=\dfrac{d\omega}{d\beta}=\dfrac{1}{d\beta/d\omega}$ | Velocidad de grupo: velocidad de la envolvente (la información). |
| $v_g<v_p$ normal; $v_g>v_p$ anómala; $v_g=v_p$ sin dispersión | Clasificación de la dispersión (el vacío no es dispersivo). |
| $\eta=\dfrac{E_x}{H_y}=\dfrac{j\omega\mu}{\gamma}=\sqrt{\dfrac{j\omega\mu}{\sigma+j\omega\varepsilon}}=\sqrt{\dfrac{\mu}{\varepsilon_c}}$ | Impedancia característica (intrínseca) del medio; cociente $E/H$ de una onda progresiva. |
| $\eta=\sqrt{\mu/\varepsilon}$; $\ \eta_0=\sqrt{\mu_0/\varepsilon_0}=120\pi\approx377\ \Omega$; $\ \eta=\eta_0/\sqrt{\varepsilon_r}$ | Sin pérdidas es real ($E$ y $H$ en fase); en medio no magnético se obtiene del vacío. |
| $\eta_c=\dfrac{\eta}{\sqrt{1-j\tan\delta}}$ | Impedancia con pérdidas (compleja), con $\eta=\sqrt{\mu/\varepsilon}$. |
| $\lvert\eta_c\rvert=\dfrac{\sqrt{\mu/\varepsilon}}{(1+\tan^2\delta)^{1/4}},\ \ \theta_\eta=\dfrac{\delta}{2}\in[0^\circ,45^\circ]$, $\ \delta=\arctan(\tan\delta)$ | Módulo y fase de $\eta_c$; $\mathbf{E}$ adelanta a $\mathbf{H}$ un ángulo $\theta_\eta$. |
| $\mathbf{H}=\dfrac{1}{\eta}\hat{\mathbf{k}}\times\mathbf{E},\ \ \mathbf{E}=\eta\,\mathbf{H}\times\hat{\mathbf{k}}$ | Relación de estructura: $(\mathbf{E},\mathbf{H},\hat{\mathbf{k}})$ forman un triedro directo. |
| $\lvert\mathbf{E}\rvert/\lvert\mathbf{H}\rvert=\lvert\eta\rvert$ | Relación de módulos. |
| Onda regresiva: $H_y=-E_x/\eta$ | El signo de $\mathbf{H}$ cambia al invertir la propagación. |
| $w_e=\tfrac12\varepsilon E^2=\tfrac12\mu H^2=w_m$ | En una onda plana sin pérdidas las densidades de energía eléctrica y magnética son iguales. |

## 5. Potencia y vector de Poynting

| Fórmula | Explicación |
|---|---|
| $\mathbf{S}=\mathbf{E}\times\mathbf{H}$ [W/m²] | Vector de Poynting instantáneo: dirección y densidad del flujo de energía. |
| $w_e=\tfrac12\varepsilon E^2,\ \ w_m=\tfrac12\mu H^2$ [J/m³] | Densidades de energía eléctrica y magnética. |
| $\nabla\cdot\mathbf{S}+\dfrac{\partial}{\partial t}(w_e+w_m)+\mathbf{E}\cdot\mathbf{J}=0$ | Teorema de Poynting (diferencial): balance de energía. |
| $-\oint_S\mathbf{S}\cdot d\mathbf{S}=\dfrac{d}{dt}\int_V(w_e+w_m)dV+\int_V\mathbf{E}\cdot\mathbf{J}\,dV$ | Teorema de Poynting (integral): la potencia que entra aumenta la energía almacenada y se disipa por efecto Joule. |
| $P_{Joule}=\int_V\sigma\lvert\mathbf{E}\rvert^2dV$ | Pérdidas por efecto Joule. |
| $\langle\mathbf{S}\rangle=\tfrac12\mathrm{Re}\{\mathbf{E}\times\mathbf{H}^*\}$ | Valor medio de la densidad de potencia en fasores (el $\tfrac12$ es por usar amplitudes de pico). |
| $-\oint_S\tfrac12(\mathbf{E}\times\mathbf{H}^*)\cdot d\mathbf{S}=\int_V\tfrac12\sigma\lvert\mathbf{E}\rvert^2dV+2j\omega\int_V\left(\tfrac14\mu\lvert\mathbf{H}\rvert^2-\tfrac14\varepsilon\lvert\mathbf{E}\rvert^2\right)dV$ | Teorema de Poynting complejo: la parte real es potencia activa (pérdidas) y la imaginaria es potencia reactiva $2\omega(W_m-W_e)$. |
| $\langle S\rangle=\dfrac{E_0^2}{2\eta}=\dfrac{\eta H_0^2}{2}$ | Densidad de potencia de una onda plana sin pérdidas. |
| $E_0=\sqrt{2\eta S},\ \ H_0=\sqrt{2S/\eta}$ | Amplitudes de pico a partir de la densidad de potencia. |
| $S=E_{ef}^2/\eta$ | Lo mismo con valores eficaces (sin el $\tfrac12$). |
| $P=S\cdot A$ | Potencia que atraviesa un área $A$. |
| $\langle S\rangle=\dfrac{\lvert E_0\rvert^2}{2\lvert\eta_c\rvert}e^{-2\alpha z}\cos\theta_\eta$ | Densidad de potencia con pérdidas. |
| $\langle\mathbf{S}\rangle=0$ | Onda estacionaria pura: hay energía almacenada pero no se transporta potencia neta. |

## 6. Reflexión y transmisión (incidencia normal)

| Fórmula | Explicación |
|---|---|
| $E_1=E_i(e^{-j\beta_1z}+\Gamma e^{j\beta_1z}),\ \ H_1=\dfrac{E_i}{\eta_1}(e^{-j\beta_1z}-\Gamma e^{j\beta_1z})$ | Campos en el medio 1 ($z<0$): incidente más reflejada (su $\mathbf{H}$ lleva signo $-$). |
| $E_2=\tau E_ie^{-j\beta_2z},\ \ H_2=\dfrac{\tau E_i}{\eta_2}e^{-j\beta_2z}$ | Campos en el medio 2 ($z>0$): solo onda transmitida. |
| $1+\Gamma=\tau,\ \ \dfrac{1-\Gamma}{\eta_1}=\dfrac{\tau}{\eta_2}$ | Continuidad de $E$ y $H$ en $z=0$. |
| $\Gamma=\dfrac{\eta_2-\eta_1}{\eta_2+\eta_1}$ | Coeficiente de reflexión (en campo eléctrico). |
| $\tau=\dfrac{2\eta_2}{\eta_2+\eta_1}=1+\Gamma$ | Coeficiente de transmisión (en campo eléctrico). |
| $\Gamma=0$ si $\eta_2=\eta_1$; $\Gamma<0$ si $\eta_2<\eta_1$ (inversión de fase); $\Gamma=-1,\ \tau=0$ (PEC); $\Gamma=+1$ (abierto) | Casos límite. |
| $\dfrac{P_r}{P_i}=\lvert\Gamma\rvert^2$ | Fracción de potencia reflejada. |
| $\dfrac{P_t}{P_i}=\dfrac{\eta_1}{\eta_2}\lvert\tau\rvert^2=1-\lvert\Gamma\rvert^2$ | Fracción transmitida (no es $\lvert\tau\rvert^2$: hay que corregir por la impedancia). |
| $\lvert\Gamma\rvert^2+\dfrac{\eta_1}{\eta_2}\tau^2=1$ | Conservación de la energía en la interfaz (medios sin pérdidas). |
| $E_r=\lvert\Gamma\rvert E_i,\ \ E_t=\tau E_i$ | Amplitudes reflejada y transmitida. |
| $S_r=\lvert\Gamma\rvert^2S_i,\ \ S_t=\dfrac{E_t^2}{2\eta_2}$ | Densidades de potencia reflejada y transmitida (medios sin pérdidas). |
| PEC: $H(0)=2H_i$, $\lvert\mathbf{J}_s\rvert=2H_i$ | El campo magnético tangencial se duplica y circula corriente superficial. |
| Medio 2 con pérdidas: $\tau=\dfrac{2\eta_c}{\eta_c+\eta_1}=\lvert\tau\rvert e^{j\varphi_\tau}$ | Se sustituye $\eta_2$ por $\eta_c$ compleja; $\Gamma$ y $\tau$ pasan a ser complejos. |
| $E_t(z,t)=\lvert\tau\rvert E_ie^{-\alpha z}\cos(\omega t-\beta z+\varphi_\tau)$ | Campo transmitido en un medio con pérdidas. |
| $H_t(z,t)=\dfrac{\lvert\tau\rvert E_i}{\lvert\eta_c\rvert}e^{-\alpha z}\cos(\omega t-\beta z+\varphi_\tau-\theta_\eta)$ | Campo magnético transmitido (fase menos $\theta_\eta$). |
| $\dfrac{P_t}{P_i}=\dfrac{\eta_1}{\lvert\eta_c\rvert}\lvert\tau\rvert^2\cos\theta_\eta=1-\lvert\Gamma\rvert^2$ | Balance de potencia con medio 2 con pérdidas. |
| Buen conductor: $\Gamma\approx-1$, $\tau\approx2\eta_c/\eta_1\ll1$ | Casi toda la potencia se refleja. |

## 7. Impedancia de onda y onda estacionaria

| Fórmula | Explicación |
|---|---|
| $Z(z)=\dfrac{E_x(z)}{H_y(z)}$ | Impedancia de onda: propiedad del campo en un punto; solo coincide con $\eta$ si hay una única onda progresiva. |
| $\Gamma(z)=\Gamma e^{2j\beta_1z},\ \ Z(z)=\eta_1\dfrac{1+\Gamma(z)}{1-\Gamma(z)}$ | Coeficiente de reflexión y impedancia a una cota $z$. |
| $Z(d)=\eta_1\dfrac{\eta_2+j\eta_1\tan\beta_1d}{\eta_1+j\eta_2\tan\beta_1d}$ | Transformación de impedancia a una distancia $d$ de la interfaz (como en líneas de transmisión). |
| $Z(d+\lambda_1/2)=Z(d)$; $d=\lambda_1/2\Rightarrow Z=\eta_2$; $d=\lambda_1/4\Rightarrow Z=\eta_1^2/\eta_2$ | Periodicidad, media onda (transparente) y cuarto de onda (inversor). |
| PEC: $Z(d)=j\eta_1\tan\beta_1d$ | Con $\eta_2=0$ la impedancia es puramente reactiva. |
| $\Gamma=\dfrac{Z-\eta_1}{Z+\eta_1}$ | Reflexión vista desde un plano con impedancia $Z$. |
| $\lvert E_1(d)\rvert=\lvert E_i\rvert\sqrt{1+\lvert\Gamma\rvert^2+2\lvert\Gamma\rvert\cos(\phi-2\beta_1d)}$ | Módulo del campo en el medio 1, con $\Gamma=\lvert\Gamma\rvert e^{j\phi}$. |
| $\lvert E\rvert_{max}=\lvert E_i\rvert(1+\lvert\Gamma\rvert),\ \ \lvert E\rvert_{min}=\lvert E_i\rvert(1-\lvert\Gamma\rvert)$ | Máximo y mínimo del patrón de onda estacionaria. |
| $S=\text{ROE}=\dfrac{\lvert E\rvert_{max}}{\lvert E\rvert_{min}}=\dfrac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ | Relación de onda estacionaria (SWR/VSWR). |
| $\lvert\Gamma\rvert=\dfrac{S-1}{S+1}$ | Módulo de $\Gamma$ a partir de la ROE; $S=2\Leftrightarrow\lvert\Gamma\rvert=1/3$. |
| Máximos consecutivos a $\lambda_1/2$; máximo–mínimo a $\lambda_1/4$ | Geometría del patrón. |
| $d_{max}=\dfrac{\phi}{4\pi}\lambda_1$ | Primer máximo desde la interfaz (si $\phi\ge0$). |
| $\Gamma>0$ real: máximo de $\lvert E\rvert$ en la interfaz; $\Gamma<0$ real: mínimo | Posición del patrón según el signo de $\Gamma$. |
| Máximos de $\lvert E\rvert$ = mínimos de $\lvert H\rvert$ | Relación entre los patrones de $E$ y $H$. |
| PEC: $E_1(z)=-2jE_i\sin\beta z$; $\ E(z,t)=2E_i\sin\beta z\sin\omega t$ | Onda estacionaria pura: no se propaga. |
| Nodos en $z=-n\lambda/2$; vientres en $z=-(2n+1)\lambda/4$ | Posición de nodos y vientres (PEC). |
| Onda parcial: progresiva $\lvert E_i\rvert(1-\lvert\Gamma\rvert)$ + estacionaria $2\lvert\Gamma\rvert\lvert E_i\rvert$ | Descomposición de la onda estacionaria parcial. |
| $P_{neta}=\dfrac{\lvert E_i\rvert^2(1-\lvert\Gamma\rvert^2)}{2\eta_1}$ | Potencia neta transportada. |

## 8. Lámina y adaptador en λ/4

| Fórmula | Explicación |
|---|---|
| $Z_{in}=\eta_2\dfrac{\eta_3+j\eta_2\tan\beta_2d}{\eta_2+j\eta_3\tan\beta_2d}$ | Impedancia de entrada de una lámina (medio 2, espesor $d$) cargada con el medio 3. |
| $\Gamma_{in}=\dfrac{Z_{in}-\eta_1}{Z_{in}+\eta_1}$ | Reflexión total vista desde el medio 1. |
| $\lambda_2=\dfrac{\lambda_0}{\sqrt{\varepsilon_{r2}\mu_{r2}}}$ | Longitud de onda dentro de la lámina (la que cuenta para $\lambda/2$ y $\lambda/4$). |
| $d=n\lambda_2/2\Rightarrow Z_{in}=\eta_1$, $\Gamma_{in}=0$ | Lámina de media onda (sin pérdidas, mismo medio a ambos lados): transparente. |
| $d=(2n+1)\lambda_2/4\Rightarrow Z_{in}=\eta_2^2/\eta_1$ | Lámina de cuarto de onda. |
| $\lvert\Gamma_{in}\rvert=\dfrac{\lvert\eta_1^2-\eta_2^2\rvert}{\eta_1^2+\eta_2^2}=\dfrac{\varepsilon_r-1}{\varepsilon_r+1}$ | Reflexión máxima de la lámina de $\lambda_2/4$ ($\varepsilon_r=\varepsilon_{r2}/\varepsilon_{r1}$). |
| $\tau_{tot}=\dfrac{\tau_{12}\tau_{23}e^{-\gamma_2d}}{1-\Gamma_{21}\Gamma_{23}e^{-2\gamma_2d}}$ | Transmisión total de una lámina con pérdidas (suma de reflexiones múltiples). |
| $\tau_{tot}=\dfrac{\tau_{12}\tau_{21}e^{-\gamma_2d}}{1-\Gamma_{21}^2e^{-2\gamma_2d}}$ | Caso medio 3 = medio 1. |
| $\tau_{12}=\dfrac{2\eta_2}{\eta_1+\eta_2},\ \ \tau_{21}=\dfrac{2\eta_1}{\eta_1+\eta_2},\ \ \Gamma_{21}=\dfrac{\eta_1-\eta_2}{\eta_1+\eta_2}$ | Coeficientes de entrada, salida y reflexión interna. |
| $\tau_{tot}=1$ si $\alpha=0$ y $d=n\lambda_2/2$ | Comprobación del límite sin pérdidas. |
| Paso directo: $\tau_{12}\tau_{21}e^{-\alpha d}$ | Sin rebotes; es menor que $\tau_{tot}$ cuando los rebotes suman en fase. |
| Adaptador: $d=\lambda_2/4$ (o $(2m+1)\lambda_2/4$) | Espesor de la capa adaptadora. |
| $Z_{in}=\dfrac{\eta_2^2}{\eta_3}=\eta_1\Rightarrow\eta_2=\sqrt{\eta_1\eta_3}$ | Condición de adaptación: $\eta_2$ es la media geométrica. |
| $n_2=\sqrt{n_1n_3},\ \ \varepsilon_{r2}=\sqrt{\varepsilon_{r1}\varepsilon_{r3}}$ | La misma condición en índices (materiales no magnéticos). |
| $\Gamma_{12}=\Gamma_{23}$ y camino extra $\lambda_2/2$ | Interferencia destructiva de las dos reflexiones. |
| $Z_0=\sqrt{Z_{01}Z_{03}}$ | La misma idea en líneas de transmisión. |
| Ejemplo: aire/$\varepsilon_{r3}=9$ a 10 GHz → $\eta_2=217{,}7\ \Omega$, $\varepsilon_{r2}=3$, $d=\lambda_0/(4\sqrt{\varepsilon_{r2}})=4{,}33$ mm | Diseño numérico típico. |

## 9. Polarización

| Fórmula | Explicación |
|---|---|
| $\mathbf{E}(z)=(E_1\hat{\mathbf{x}}+E_2e^{j\delta}\hat{\mathbf{y}})e^{-j\beta z}$ | Onda con dos componentes transversales; $\delta$ es el desfase entre ellas. |
| $E_x=E_1\cos\omega t,\ \ E_y=E_2\cos(\omega t+\delta)$ | Componentes en el tiempo en $z=0$. |
| $\dfrac{E_x^2}{E_1^2}+\dfrac{E_y^2}{E_2^2}-\dfrac{2E_xE_y}{E_1E_2}\cos\delta=\sin^2\delta$ | Ecuación de la elipse de polarización. |
| Lineal: $\delta=0$ ó $\pm\pi$; $\ \tan\psi=\pm E_2/E_1$ | La elipse degenera en un segmento; $\psi$ es la inclinación respecto de $x$. |
| Circular: $E_1=E_2=E_0$, $\delta=\pm\pi/2$ | El extremo de $\mathbf{E}$ describe una circunferencia con módulo constante. |
| $\mathbf{E}(t)=E_0[\cos\omega t\,\hat{\mathbf{x}}\mp\sin\omega t\,\hat{\mathbf{y}}]$ | Campo circular en el tiempo. |
| RHCP ($\delta=-\pi/2$): $E_0(\hat{\mathbf{x}}-j\hat{\mathbf{y}})e^{-j\beta z}$; LHCP ($\delta=+\pi/2$): $E_0(\hat{\mathbf{x}}+j\hat{\mathbf{y}})e^{-j\beta z}$ | Circular a derechas e izquierdas (convenio IEEE con $e^{j\omega t}$; en óptica es al revés). |
| Elíptica: caso general | Amplitudes distintas o desfase distinto de $0,\pm\pi/2,\pi$. |
| $AR=\dfrac{\text{eje mayor}}{\text{eje menor}}\in[1,\infty)$ | Relación axial: $1$ circular, $\infty$ lineal. |
| $\tan2\tau=\dfrac{2E_1E_2\cos\delta}{E_1^2-E_2^2}$ | Inclinación del eje mayor de la elipse. |
| $\hat{\mathbf{x}}=\tfrac12[(\hat{\mathbf{x}}-j\hat{\mathbf{y}})+(\hat{\mathbf{x}}+j\hat{\mathbf{y}})]$ | Una lineal es suma de RHCP y LHCP de igual amplitud. |
| $\mathbf{E}_R+\mathbf{E}_L=2E_0\cos(\omega t-\beta z)\hat{\mathbf{x}}$ | RHCP + LHCP de igual amplitud = lineal de amplitud $2E_0$. |
| $E_{y0}=\dfrac{E_0}{\sqrt{10}},\ E_{x0}=\dfrac{3E_0}{\sqrt{10}},\ \psi=\arctan\tfrac13=18{,}4^\circ$ | Caso $E_x=3E_y$ con amplitud total $E_0$ ($E_0^2=E_{x0}^2+E_{y0}^2$). |
| $\text{PLF}=\lvert\hat{\boldsymbol\rho}_w\cdot\hat{\boldsymbol\rho}_a^{*}\rvert^2$ | Fracción de potencia recibida según el desacoplo de polarización (cruzadas: 0; circular con lineal: $1/2$, 3 dB). |
| Reflexión normal en PEC: RHCP$\leftrightarrow$LHCP | El sentido de giro en el plano no cambia pero la propagación se invierte. |
| $E=E_0\cos\theta$ | Proyección del campo sobre una antena lineal. |
| $E=E_0\cos\theta_1\cos\theta_2$ | Dos polarizadores en cascada (Malus). |

## 10. Escribir E(z,t) y H(z,t)

| Fórmula | Explicación |
|---|---|
| $\varphi_0=-\omega t_1+\beta z_1$ | Fase inicial si el campo es máximo en $(t_1,z_1)$ (argumento del coseno $=0$). |
| $\omega\dfrac{T}{4}=\dfrac{\pi}{2},\ \ \beta\dfrac{\lambda}{4}=\dfrac{\pi}{2}$ | Truco para $t=T/4$ y $z=\lambda/4$. |
| $\mathbf{E}(z,t)=E_0e^{-\alpha z}\cos(\omega t-\beta z+\varphi_0)\hat{\mathbf{e}}$ | Campo eléctrico instantáneo. |
| $\mathbf{E}(z)=E_0e^{j\varphi_0}e^{-\gamma z}\hat{\mathbf{e}}$ | Campo eléctrico fasorial. |
| $\hat{\mathbf{h}}=\hat{\mathbf{k}}\times\hat{\mathbf{e}}$ | Dirección de $\mathbf{H}$ (comprobar con $\mathbf{E}\times\mathbf{H}\parallel\hat{\mathbf{k}}$). |
| $\mathbf{H}(z,t)=\dfrac{E_0}{\lvert\eta\rvert}e^{-\alpha z}\cos(\omega t-\beta z+\varphi_0-\theta_\eta)\hat{\mathbf{h}}$ | Campo magnético instantáneo ($\theta_\eta=0$ sin pérdidas). |
| $\hat{\mathbf{y}}\times\hat{\mathbf{x}}=-\hat{\mathbf{z}},\ \ \hat{\mathbf{z}}\times\hat{\mathbf{x}}=\hat{\mathbf{y}}$ | Productos que salen en los problemas típicos. |

## 11. Prácticas de laboratorio

| Fórmula | Explicación |
|---|---|
| $V\propto E^2\Rightarrow$ amplitud $\propto\sqrt V$ | El diodo da una tensión proporcional al cuadrado del campo. |
| $E_{tot}=-2jE_i\sin(kx)$, $\ E(x,t)=2E_i\sin kx\sin\omega t$ | P1: onda estacionaria frente a una pantalla metálica. |
| Mínimos en $x=n\lambda/2$; máximo–mínimo a $\lambda/4$ | P1: posición de mínimos y máximos. |
| $V_{norm}=\dfrac{V}{V_{max}}=\sin^2[k(x-x_{min})]$ | P1: tensión normalizada; se grafica $\sqrt{V_{norm}}=\lvert\sin[k(x-x_{min})]\rvert$. |
| $x(m)=x_0\pm m\dfrac{\lambda}{4}\Rightarrow\lambda=4\cdot\lvert\text{pendiente}\rvert,\ \ f=\dfrac{c}{\lambda}$ | P1: regresión de posiciones numeradas $m=0,1,2,\dots$ para hallar $\lambda$ y $f$. |
| $S=\sqrt{V_{max}/V_{min}}$ | P1/P2: ROE medida con las tensiones del detector. |
| Resultado P1: $x(m)=40{,}57+7{,}898\,m$ mm, $\lambda=3{,}159$ cm, $f=9{,}50$ GHz | Valores obtenidos (fabricante: 3,18 cm y 9,456 GHz). |
| $\lvert T\rvert=\sqrt{V_{trans}/V_{directo}}$ | P2: coeficiente de transmisión en campo. |
| $\lvert\Gamma_{eq}\rvert=\dfrac{S-1}{S+1}$ | P2: reflexión de la lámina a partir de la ROE. |
| $\varepsilon_r=\dfrac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ | P2: permitividad si $d\approx\lambda_2/4$ (si no, resolver $\lvert\Gamma_{eq}(d)\rvert$ con $Z_{in}(d)$ numéricamente). |
| $\varepsilon_r=(\lambda_0/\lambda_2)^2$ | P2: relación entre permitividad y longitud de onda en el material. |
| $V\propto\cos\theta_E$ (guion) $\ /\ V\propto\cos^2\theta_E$ (detector cuadrático) | P3: ley de recepción; con los datos ambos ajustan igual ($r\approx0{,}97$; $V\approx6756\cos\theta_E-366$ mV). |
| Rejilla: transmite el campo perpendicular a los hilos | P3: polarizador; el campo paralelo a los hilos se refleja. |
| Rejilla a $45^\circ$: $E_0\cos45^\circ\cos45^\circ=E_0/2$ | P3: igual para el receptor a $0^\circ$ y a $90^\circ$. |

## 12. Matemáticas de apoyo

| Fórmula | Explicación |
|---|---|
| $z=a+jb=\lvert z\rvert\angle\theta=\lvert z\rvert e^{j\theta}$ | Formas binómica, polar y exponencial. |
| $\lvert z\rvert=\sqrt{a^2+b^2},\ \ \theta=\arctan(b/a)$ | Módulo y fase (cuidado con el cuadrante). |
| $e^{\pm j\theta}=\cos\theta\pm j\sin\theta$ | Fórmula de Euler. |
| $z_1z_2=\lvert z_1\rvert\lvert z_2\rvert e^{j(\theta_1+\theta_2)},\ \ \dfrac{z_1}{z_2}=\dfrac{\lvert z_1\rvert}{\lvert z_2\rvert}e^{j(\theta_1-\theta_2)}$ | Producto y cociente. |
| $z^n=\lvert z\rvert^ne^{jn\theta}$ | Moivre. |
| $\sqrt[n]{z}=\lvert z\rvert^{1/n}e^{j(\theta+2k\pi)/n},\ k=0,\dots,n-1$ | Raíces ($n$ soluciones). |
| $ze^{j\varphi}=\lvert z\rvert e^{j(\theta+\varphi)}$ | Gira $z$ un ángulo $\varphi$ sin cambiar el módulo. |
| $z^*=a-jb;\ zz^*=\lvert z\rvert^2;\ z+z^*=2a$ | Conjugado y propiedades. |
| $\sin\theta=\mathrm{Re}[-je^{j\theta}]$ | Para pasar un seno a fasor. |
| $\sinh z=\frac{e^z-e^{-z}}2,\ \cosh z=\frac{e^z+e^{-z}}2,\ \tanh(j\beta)=j\tan\beta$ | Hiperbólicas complejas. |
| $x(t)=X_0\cos(\omega t+\alpha)\Rightarrow X=X_0e^{j\alpha},\ x=\mathrm{Re}[Xe^{j\omega t}]$ | Fasor de una señal armónica. |
| $\dfrac{d}{dt}\to j\omega,\ \ \int dt\to\dfrac{1}{j\omega}$ | La derivada y la integral se vuelven algebraicas. |
| $Y=H(j\omega)X$ | Respuesta de un sistema lineal en régimen armónico. |
| $Z_R=R,\ Z_L=j\omega L,\ Z_C=\dfrac{1}{j\omega C},\ V=ZI,\ Y=\dfrac1Z$ | Impedancias de los elementos pasivos. |
| $V_s=V_g-Z_gI$ | Generador real con impedancia de salida. |
| $\langle P\rangle=\tfrac12V_0I_0\cos\varphi=\tfrac12\mathrm{Re}[VI^*]$ | Potencia media en alterna, con $\varphi=\varphi_2-\varphi_1$. |
| $P_{av}=\tfrac12\lvert I_L\rvert^2R_L=\tfrac12\left\lvert\dfrac{V_L}{Z_L}\right\rvert^2R_L$ | Potencia disipada en una impedancia. |
| $10\log\dfrac{P_0}{P_s}$ dB; $\ 20\log\dfrac{\lvert A_0\rvert}{\lvert A_s\rvert}$ dB | Pérdida en potencia y en amplitud; en cascada los dB se suman. |
| $1\ \text{Np}=8{,}686$ dB; $\ \lvert A_s\rvert=e^{-\alpha}\lvert A_0\rvert$ | Neper; 1 Np equivale a una caída de amplitud del 63,2 % (queda el 36,8 %). |
| $\omega=2\pi f,\ f=1/T,\ \beta=2\pi/\lambda,\ v_p=\lambda f=\omega/\beta$ | Parámetros de una onda armónica. |
| $y(x,t)=A\cos(\omega t-\beta x+\varphi_0)$ | Onda armónica hacia $+x$; valor rms $A/\sqrt2$. |
| $\partial_x^2\Phi-\dfrac{1}{v_p^2}\partial_t^2\Phi=0$, $\ \Phi=f^+(x-v_pt)+f^-(x+v_pt)$ | Ecuación de D'Alembert y su solución general. |
| $\dfrac{d^2Y}{dx^2}+\beta^2Y=0,\ \ Y=Ae^{-j\beta x}$ | Ecuación de ondas en fasores. |
| $y=2A\cos(\omega_0t-\beta_0x)\cos(\Delta\omega t-\Delta\beta x)$ | Dos ondas próximas en frecuencia: portadora por envolvente. |
| $x=r\sin\theta\cos\phi,\ y=r\sin\theta\sin\phi,\ z=r\cos\theta$ | Esféricas a cartesianas. |
| $r=\sqrt{x^2+y^2+z^2},\ \ \theta=\arccos\dfrac{z}{r}$ | Cartesianas a esféricas (con $\phi$ según el cuadrante). |
| $M^{-1}=M^t$ | La matriz de cambio de base de vectores unitarios es ortogonal. |
| $\lvert\vec A\rvert=\sqrt{A_x^2+A_y^2+A_z^2},\ \ \hat A=\vec A/\lvert\vec A\rvert$ | Módulo y vector unitario. |
| $\vec A\cdot\vec B=AB\cos\alpha=A_xB_x+A_yB_y+A_zB_z$ | Producto escalar. |
| $\vec A\times\vec B=\begin{vmatrix}\hat x&\hat y&\hat z\\A_x&A_y&A_z\\B_x&B_y&B_z\end{vmatrix}$, módulo $AB\sin\alpha$ | Producto vectorial. |
| $\hat x\times\hat y=\hat z,\ \hat y\times\hat z=\hat x,\ \hat z\times\hat x=\hat y$ | Ciclo de los vectores unitarios (en sentido contrario, signo $-$). |

## 13. ⚪ Fuera del parcial

No entran en el próximo parcial: ⚪ efecto Doppler, ⚪ ondas planas con incidencia oblicua (Snell, ángulo crítico), ⚪ ángulo de Brewster y ⚪ polarización paralela (TM). No hay fórmulas suyas en este formulario.
