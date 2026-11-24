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
14. [Parámetros y modelo de la línea](#14-parámetros-y-modelo-de-la-línea-t31-y-t32)
15. [Línea sin pérdidas](#15-línea-sin-pérdidas-t33)
16. [Línea con pérdidas](#16-línea-con-pérdidas-t34)
17. [Ondas estacionarias y reflexión sobre una carga](#17-ondas-estacionarias-y-reflexión-sobre-una-carga-t35-y-t36)
18. [Adaptación y carta de Smith](#18-adaptación-y-carta-de-smith-t37-y-t38)
19. [Pulsos en la línea](#19-pulsos-en-la-línea-t39)
20. [Incidencia oblicua, polarización paralela, Brewster y ángulo crítico](#20-incidencia-oblicua-polarización-paralela-brewster-y-ángulo-crítico)
21. [Efecto Doppler](#21-efecto-doppler)

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

---

# Tema 3: Líneas de transmisión

> Convenios: carga en $z=0$, generador en $z=-l$, $d=-z$ (distancia a la carga hacia el generador), fasores de pico con $e^{j\omega t}$. Línea sin pérdidas salvo que se indique.

## 14. Parámetros y modelo de la línea (T3.1 y T3.2)

| Fórmula | Explicación |
|---|---|
| $V=-\int_1^2\mathbf{E}\cdot d\mathbf{l},\ \ I=\oint_C\mathbf{H}\cdot d\mathbf{l}$ | Tensión e intensidad de un modo TEM (se pueden definir de forma única). |
| $l<\lambda/10$ | Regla práctica: por debajo basta un circuito de parámetros concentrados; por encima hay que usar el modelo de línea. |
| $LC=\mu\varepsilon,\ \ G/C=\sigma/\varepsilon$ | Relaciones de una línea con dieléctrico homogéneo: la geometría fija los cuatro parámetros. |
| $R_s=\sqrt{\pi f\mu_c/\sigma_c}=1/(\sigma_c\delta_s)$ | Resistencia superficial del conductor (efecto pelicular). |
| Coaxial: $C=\dfrac{2\pi\varepsilon}{\ln(b/a)},\ L=\dfrac{\mu}{2\pi}\ln\dfrac ba,\ G=\dfrac{2\pi\sigma}{\ln(b/a)},\ R=\dfrac{R_s}{2\pi}\left(\dfrac1a+\dfrac1b\right)$ | Parámetros por unidad de longitud de un cable coaxial (radios $a<b$). |
| Coaxial: $Z_0=\dfrac{\eta}{2\pi}\ln\dfrac ba=\dfrac{60}{\sqrt{\varepsilon_r}}\ln\dfrac ba$ | Impedancia característica del coaxial. |
| Bifilar: $C=\dfrac{\pi\varepsilon}{\cosh^{-1}(D/2a)},\ L=\dfrac\mu\pi\cosh^{-1}\dfrac D{2a},\ G=\dfrac{\pi\sigma}{\cosh^{-1}(D/2a)},\ R=\dfrac{R_s}{\pi a}$ | Línea de dos hilos de radio $a$ y separación $D$. |
| Bifilar: $Z_0=\dfrac\eta\pi\cosh^{-1}\dfrac D{2a}\approx\dfrac{120}{\sqrt{\varepsilon_r}}\ln\dfrac Da\ (D\gg a)$ | Impedancia característica del bifilar. |
| Placas paralelas: $C=\dfrac{\varepsilon w}h,\ L=\dfrac{\mu h}w,\ G=\dfrac{\sigma w}h,\ R=\dfrac{2R_s}w,\ Z_0=\eta\dfrac hw$ | Ancho $w$ y separación $h\ll w$. |
| $\dfrac{\partial v}{\partial z}=-Ri-L\dfrac{\partial i}{\partial t},\ \ \dfrac{\partial i}{\partial z}=-Gv-C\dfrac{\partial v}{\partial t}$ | Ecuaciones del telegrafista en el dominio del tiempo (Kirchhoff en una célula $\Delta z$). |
| $\dfrac{dV}{dz}=-ZI,\ \ \dfrac{dI}{dz}=-YV$ con $Z=R+j\omega L,\ Y=G+j\omega C$ | Telegrafista en régimen armónico ($Z$ e $Y$ por unidad de longitud). |
| $\dfrac{d^2V}{dz^2}=\gamma^2V,\ \ \dfrac{d^2I}{dz^2}=\gamma^2I$ | Ecuación de ondas de la línea. |
| $\gamma=\sqrt{(R+j\omega L)(G+j\omega C)}=\alpha+j\beta$ | Constante de propagación. |
| $V(z)=V_0^+e^{-\gamma z}+V_0^-e^{\gamma z}$ | Solución: onda incidente ($+z$) más reflejada ($-z$). |
| $I(z)=\dfrac{V_0^+e^{-\gamma z}-V_0^-e^{\gamma z}}{Z_0}$ | Corriente asociada (la reflejada lleva signo $-$). |
| $Z_0=\dfrac Z\gamma=\sqrt{\dfrac{R+j\omega L}{G+j\omega C}}$ | Impedancia característica: cociente $V/I$ de la onda incidente. |
| Analogía: $E\leftrightarrow V,\ H\leftrightarrow I,\ \mu\leftrightarrow L,\ \varepsilon\leftrightarrow C,\ \sigma\leftrightarrow G,\ \eta\leftrightarrow Z_0$ | Permite trasladar lo visto de ondas planas a la línea. |

## 15. Línea sin pérdidas (T3.3)

| Fórmula | Explicación |
|---|---|
| $R=G=0\Rightarrow\gamma=j\beta,\ \ \beta=\omega\sqrt{LC},\ \alpha=0$ | Línea sin pérdidas. |
| $V(z)=V_0^+e^{-j\beta z}+V_0^-e^{j\beta z},\ \ I(z)=\dfrac{V_0^+e^{-j\beta z}-V_0^-e^{j\beta z}}{Z_0}$ | Tensión y corriente fasoriales; $V_0^\pm$ referidas a la carga. |
| $V^+/I^+=Z_0,\ \ V^-/I^-=-Z_0$ | Cociente $V/I$ de cada onda viajera. |
| $v(z,t)=\lvert V_0^+\rvert\cos(\omega t-\beta z+\varphi^+)+\lvert V_0^-\rvert\cos(\omega t+\beta z+\varphi^-)$ | Tensión instantánea. |
| $V(d)=V_0^+e^{j\beta d}+V_0^-e^{-j\beta d}$ | Tensión en función de la distancia a la carga. |
| $\dfrac{\partial^2v}{\partial z^2}=LC\dfrac{\partial^2v}{\partial t^2},\ \ v=f^+(t-z/v_p)+f^-(t+z/v_p)$ | Ecuación de d'Alembert y su solución para señales arbitrarias (pulsos). |
| $Z_0=\sqrt{L/C}=\dfrac{\omega L}\beta=\dfrac\beta{\omega C}=v_pL=\dfrac1{v_pC}$ | Impedancia característica (real sin pérdidas). |
| $v_p=\dfrac\omega\beta=\dfrac1{\sqrt{LC}}=\dfrac1{\sqrt{\mu\varepsilon}}=\dfrac c{\sqrt{\varepsilon_r\mu_r}}$ | Velocidad de propagación: depende solo del dieléctrico y no hay dispersión. |
| $\lambda=\dfrac{v_p}f=\dfrac{2\pi}\beta$ | Longitud de onda en la línea. |
| $T=l/v_p,\ \ \beta l=2\pi l/\lambda$ | Retardo y longitud eléctrica de un tramo. |
| $V_0^\pm=\tfrac12[V(0)\pm Z_0I(0)]$ | Amplitudes de las ondas a partir de $V$ e $I$ en $z=0$. |
| $V(z)=V(0)\cosh\gamma z-Z_0I(0)\sinh\gamma z$, $\ I(z)=I(0)\cosh\gamma z-\dfrac{V(0)}{Z_0}\sinh\gamma z$ | Forma hiperbólica a partir de las condiciones en un extremo. |
| $V(z)=V(0)\cos\beta z-jZ_0I(0)\sin\beta z$, $\ I(z)=I(0)\cos\beta z-j\dfrac{V(0)}{Z_0}\sin\beta z$ | Lo mismo sin pérdidas. |
| $\begin{pmatrix}V(d)\\I(d)\end{pmatrix}=\begin{pmatrix}\cos\beta d&jZ_0\sin\beta d\\ \frac j{Z_0}\sin\beta d&\cos\beta d\end{pmatrix}\begin{pmatrix}V_L\\I_L\end{pmatrix}$ | Matriz ABCD de un tramo de longitud $d$ (da $Z_{in}=V/I$). |
| $P=\tfrac12\mathrm{Re}\{VI^*\}$ | Potencia media que atraviesa una sección. |
| $P=\dfrac{\lvert V_0^+\rvert^2}{2Z_0}-\dfrac{\lvert V_0^-\rvert^2}{2Z_0}=P^+-P^-$ | Potencia neta: incidente menos reflejada, constante a lo largo de la línea. |
| $P_L=P^+(1-\lvert\Gamma_L\rvert^2),\ \ P^-/P^+=\lvert\Gamma_L\rvert^2$ | Potencia en la carga y fracción reflejada. |
| Adaptada: $P=\dfrac{\lvert V_0^+\rvert^2}{2Z_0}=\tfrac12Z_0\lvert I_0^+\rvert^2$ | Potencia sin reflexión. |

## 16. Línea con pérdidas (T3.4)

| Fórmula | Explicación |
|---|---|
| $R$ crece con $\sqrt f$ ($R_s=1/\sigma_c\delta_s$) | Las pérdidas en los conductores aumentan con la frecuencia por el efecto pelicular. |
| $G=\dfrac\sigma\varepsilon C=\omega C\tan\delta$ | Conductancia por pérdidas del dieléctrico. |
| $\gamma^2=a+jb,\ \ a=RG-\omega^2LC,\ \ b=\omega(RC+LG)$ | Parte real e imaginaria de $\gamma^2$. |
| $\alpha=\sqrt{\dfrac{\sqrt{a^2+b^2}+a}2},\ \ \beta=\sqrt{\dfrac{\sqrt{a^2+b^2}-a}2}$ | Atenuación (Np/m) y fase (rad/m) exactas. |
| $\alpha\approx\dfrac12\left(\dfrac R{Z_0}+GZ_0\right),\ \ \beta\approx\omega\sqrt{LC}$ | Pérdidas pequeñas ($R\ll\omega L,\ G\ll\omega C$): $\alpha_c=R/2Z_0$ (conductores) y $\alpha_d=GZ_0/2$ (dieléctrico). |
| $\alpha[\text{dB/m}]=8{,}686\,\alpha[\text{Np/m}]$ | Conversión Np–dB. |
| $R/L=G/C\Rightarrow\alpha=R/Z_0,\ \beta=\omega\sqrt{LC},\ Z_0=\sqrt{L/C}$ | Línea sin distorsión (Heaviside): atenuación constante y $\beta$ lineal en $\omega$. |
| $Z_0=\sqrt{\dfrac{R+j\omega L}{G+j\omega C}}$ | Impedancia característica con pérdidas (en general compleja). |
| $Z_0\approx\sqrt{\dfrac LC}\left[1+\dfrac j2\left(\dfrac G{\omega C}-\dfrac R{\omega L}\right)\right]$ | Aproximación con pérdidas pequeñas: casi real. |
| $v_p=\dfrac\omega\beta\approx\dfrac1{\sqrt{LC}},\ \ v_g=\dfrac{d\omega}{d\beta}$ | Velocidades de fase y de grupo; con pérdidas hay dispersión. |
| $P^+(z)=\dfrac{\lvert V_0^+\rvert^2}{2\lvert Z_0\rvert^2}\mathrm{Re}\{Z_0\}\,e^{-2\alpha z}$ | Potencia de la onda incidente: decae como $e^{-2\alpha z}$. |
| Pérdida entre dos puntos: $8{,}686\,\alpha\,\Delta z$ dB | Atenuación en dB de un tramo. |
| $-\dfrac{dP}{dz}=\tfrac12\lvert I\rvert^2R+\tfrac12\lvert V\rvert^2G=2\alpha P$ | Potencia disipada por unidad de longitud. |
| $\Gamma(d)=\Gamma_Le^{-2\gamma d}$ | El coeficiente de reflexión disminuye hacia el generador. |
| $Z_{in}=Z_0\dfrac{Z_L+Z_0\tanh\gamma d}{Z_0+Z_L\tanh\gamma d}$ | Impedancia de entrada con pérdidas. |

## 17. Ondas estacionarias y reflexión sobre una carga (T3.5 y T3.6)

| Fórmula | Explicación |
|---|---|
| $V(d)=V_0^+e^{j\beta d}(1+\Gamma_Le^{-2j\beta d}),\ \ I(d)=\dfrac{V_0^+}{Z_0}e^{j\beta d}(1-\Gamma_Le^{-2j\beta d})$ | Tensión y corriente a una distancia $d$ de la carga. |
| $\lvert V(d)\rvert=\lvert V_0^+\rvert\sqrt{1+\lvert\Gamma_L\rvert^2+2\lvert\Gamma_L\rvert\cos(\theta_\Gamma-2\beta d)}$ | Patrón de onda estacionaria de la tensión. |
| $\lvert I(d)\rvert=\dfrac{\lvert V_0^+\rvert}{Z_0}\sqrt{1+\lvert\Gamma_L\rvert^2-2\lvert\Gamma_L\rvert\cos(\theta_\Gamma-2\beta d)}$ | Patrón de la corriente (máximo donde $V$ es mínima). |
| $\lvert V\rvert_{max}=\lvert V_0^+\rvert(1+\lvert\Gamma_L\rvert),\ \ \lvert V\rvert_{min}=\lvert V_0^+\rvert(1-\lvert\Gamma_L\rvert)$ | Máximo y mínimo de la tensión. |
| $S=\dfrac{\lvert V\rvert_{max}}{\lvert V\rvert_{min}}=\dfrac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ | Relación de onda estacionaria (ROE). |
| $\lvert\Gamma\rvert=\dfrac{S-1}{S+1}$ | Módulo de $\Gamma$ a partir de la ROE. |
| Máximos consecutivos a $\lambda/2$; máximo–mínimo a $\lambda/4$ | Geometría del patrón. |
| Cortocircuito: $V=2jV_0^+\sin\beta d,\ I=\dfrac{2V_0^+}{Z_0}\cos\beta d$ | Onda estacionaria pura con $\Gamma_L=-1$. |
| Abierto: $V=2V_0^+\cos\beta d,\ I=\dfrac{2jV_0^+}{Z_0}\sin\beta d$ | Onda estacionaria pura con $\Gamma_L=+1$. |
| $\Gamma_L=\dfrac{V_0^-}{V_0^+}=\dfrac{Z_L-Z_0}{Z_L+Z_0}$ | Coeficiente de reflexión de la carga. |
| $Z_L=Z_0\dfrac{1+\Gamma_L}{1-\Gamma_L}$ | Carga a partir de $\Gamma_L$. |
| $\Gamma(d)=\Gamma_Le^{-2j\beta d}$ | Reflexión a una distancia $d$: gira $-2\beta d$ hacia el generador. |
| $\Gamma_L=0$ (adaptada), $-1$ (cortocircuito), $+1$ (abierto); resistiva: $S=R_L/Z_0$ si $R_L>Z_0$, $S=Z_0/R_L$ si $R_L<Z_0$ | Casos particulares. |
| $RL=-20\log\lvert\Gamma_L\rvert$ dB | Pérdida de retorno. |
| $ML=-10\log(1-\lvert\Gamma_L\rvert^2)$ dB | Pérdida por desajuste (potencia incidente que no llega a la carga). |
| $d_{max}=\dfrac\lambda{4\pi}\theta_\Gamma\ (+n\lambda/2),\ \ d_{min}=\dfrac\lambda{4\pi}(\theta_\Gamma+\pi)\ (+n\lambda/2)$ | Posición de máximos y mínimos de $\lvert V\rvert$ desde la carga ($-\pi<\theta_\Gamma\le\pi$; si $\theta_\Gamma<0$ el primer máximo es $+\lambda/2$). |
| $Z(d_{max})=Z_0S,\ \ Z(d_{min})=Z_0/S$ | Impedancia (real) en los extremos del patrón. |
| $Z_L=Z_0\dfrac{1-jS\tan\beta d_{min}}{S-j\tan\beta d_{min}}$ | Carga desconocida a partir de $S$ y de la distancia del primer mínimo. |
| $Z_{in}(d)=Z_0\dfrac{Z_L+jZ_0\tan\beta d}{Z_0+jZ_L\tan\beta d}=Z_0\dfrac{1+\Gamma(d)}{1-\Gamma(d)}$ | Impedancia de entrada: transforma la carga a lo largo de la línea. |
| $d=n\lambda/2\Rightarrow Z_{in}=Z_L;\ \ d=(2n+1)\lambda/4\Rightarrow Z_{in}=Z_0^2/Z_L$ | Línea de media onda (repite la carga) y de cuarto de onda (inversor). |
| Cortocircuito: $Z_{in}=jZ_0\tan\beta d$; abierto: $Z_{in}=-jZ_0\cot\beta d$ | Impedancia de líneas terminadas en cortocircuito o abierto (reactivas). |
| $V_0^+=\dfrac{V_L+Z_0I_L}2,\ \ V_0^-=\dfrac{V_L-Z_0I_L}2=\Gamma_LV_0^+$ | Amplitudes a partir de la tensión y corriente en la carga. |
| $V_{in}=V_g\dfrac{Z_{in}}{Z_{in}+Z_g}$ | Tensión en la entrada (divisor con la impedancia del generador). |
| $V_0^+=\dfrac{V_{in}e^{-j\beta l}}{1+\Gamma_Le^{-2j\beta l}}=V_g\dfrac{Z_0}{Z_0+Z_g}\dfrac{e^{-j\beta l}}{1-\Gamma_g\Gamma_Le^{-2j\beta l}}$ | $V_0^+$ a partir del generador y de la línea (con pérdidas: $j\beta\to\gamma$). |
| $\Gamma_g=\dfrac{Z_g-Z_0}{Z_g+Z_0}$ | Reflexión en el generador. |
| $Z_g=Z_0\Rightarrow V_0^+=\dfrac{V_g}2e^{-j\beta l}$ | Generador adaptado: la mitad de la tensión y sin rebotes múltiples. |

## 18. Adaptación y carta de Smith (T3.7 y T3.8)

| Fórmula | Explicación |
|---|---|
| $Z_T=\sqrt{Z_0Z_L},\ \ l=\lambda_T/4$ | Transformador de cuarto de onda para una carga real. |
| $Z_T=Z_0\sqrt S$ (en un máximo) $,\ \ Z_T=Z_0/\sqrt S$ (en un mínimo) | Carga compleja: se coloca el transformador donde la impedancia es real. |
| $\lvert\Gamma\rvert=\left[1+\dfrac{4Z_0Z_L}{(Z_L-Z_0)^2}\sec^2\theta\right]^{-1/2}$ | Respuesta en frecuencia del transformador ($\theta=\beta l=\pi/2$ en la frecuencia de diseño): banda estrecha. |
| $Y_{sc}=-jY_0\cot\beta l,\ \ Y_{oc}=+jY_0\tan\beta l$ | Admitancia (susceptancia pura) de un stub en cortocircuito o abierto. |
| $y(d)=\dfrac{y_L+jt}{1+jy_Lt},\ \ t=\tan\beta d$ | Admitancia normalizada a una distancia $d$ de la carga (se impone $\mathrm{Re}\,y=1$). |
| $t=\dfrac{X_L\pm\sqrt{R_L[(Z_0-R_L)^2+X_L^2]/Z_0}}{R_L-Z_0}\ (R_L\ne Z_0),\ \ t=-\dfrac{X_L}{2Z_0}\ (R_L=Z_0)$ | Posición del stub (dos soluciones) para $Z_L=R_L+jX_L$. |
| $y(d)=1+jb\Rightarrow$ stub con $-jb$ | El stub debe anular la susceptancia. |
| Cortocircuito: $\tan\beta l=1/b$; abierto: $\tan\beta l=-b$ | Longitud del stub (si $l<0$, sumar $\lambda/2$). |
| $z=\dfrac Z{Z_0}=r+jx=\dfrac{1+\Gamma}{1-\Gamma},\ \ \Gamma=\dfrac{z-1}{z+1}$ | Correspondencia impedancia–$\Gamma$ de la carta de Smith. |
| Circunferencias de $r$ constante: centro $\left(\frac r{1+r},0\right)$, radio $\frac1{1+r}$ | Familia de resistencia constante. |
| Circunferencias de $x$ constante: centro $\left(1,\frac1x\right)$, radio $\frac1{\lvert x\rvert}$ | Familia de reactancia constante. |
| $S=r$ en el corte del círculo de ROE con el eje real derecho | Lectura de la ROE. |
| Hacia el generador: giro horario de $2\beta d=4\pi d/\lambda$; vuelta completa $=\lambda/2$ | Desplazamiento sobre la línea (antihorario hacia la carga). |
| $y=1/z$: punto diametralmente opuesto ($\Gamma\to-\Gamma$) | Paso de impedancia a admitancia ($\lambda/4$). |
| Abierto $\Gamma=+1$ (derecha); cortocircuito $\Gamma=-1$ (izquierda); centro: adaptación | Puntos de referencia de la carta. |

## 19. Pulsos en la línea (T3.9)

| Fórmula | Explicación |
|---|---|
| $\Gamma_L=\dfrac{R_L-Z_0}{R_L+Z_0},\ \ \Gamma_g=\dfrac{R_g-Z_0}{R_g+Z_0}$ | Reflexión de la tensión en la carga y en el generador (resistivos). |
| $I^-=-\Gamma I^+$ | La corriente se refleja con signo contrario a la tensión. |
| $V_1^+=V_g\dfrac{Z_0}{Z_0+R_g}$ | Primera onda lanzada por el generador en $t=0$. |
| $T=l/v_p$ | Tiempo de tránsito: los ecos llegan a la carga en $T$ y vuelven al generador en $2T$. |
| $V_L=V_1^+(1+\Gamma_L)\left[1+\Gamma_g\Gamma_L+(\Gamma_g\Gamma_L)^2+\dots\right]$ | Tensión en la carga como suma de rebotes. |
| $V_L(\infty)=\dfrac{V_1^+(1+\Gamma_L)}{1-\Gamma_g\Gamma_L}=V_g\dfrac{R_L}{R_g+R_L}$ | Régimen estacionario (divisor de continua). |
| $R_g=Z_0\Rightarrow V_L=V_1^+(1+\Gamma_L)$ desde $t=T$ | Generador adaptado: un solo eco. |
| Carga $C$: $V_L=2V_1^+(1-e^{-t'/\tau}),\ \tau=Z_0C$ | Respuesta con generador adaptado ($t'=t-T$). |
| Carga $L$: $V_L=2V_1^+e^{-t'/\tau},\ \tau=L/Z_0$ | Respuesta con bobina. |
| Pulso $=V_g[u(t)-u(t-t_p)]$; los ecos no se solapan si $2T>t_p$ | Pulso como suma de dos escalones. |
| $d=v_pt_e/2$ | Reflectometría en el dominio del tiempo: distancia a la discontinuidad. |

---

# Temas añadidos tras el primer parcial

## 20. Incidencia oblicua, polarización paralela, Brewster y ángulo crítico

> Interfaz en $z=0$, medio 1 en $z<0$, plano de incidencia $xz$. Los ángulos se miden respecto a la **normal**.

| Fórmula | Explicación |
|---|---|
| $\mathbf{k}_i=\beta_1(\sin\theta_i\,\hat{\mathbf{x}}+\cos\theta_i\,\hat{\mathbf{z}})$ | Vector de onda incidente. |
| $\mathbf{k}_r=\beta_1(\sin\theta_r\,\hat{\mathbf{x}}-\cos\theta_r\,\hat{\mathbf{z}})$ | Vector de onda reflejado (se invierte la componente normal). |
| $\mathbf{k}_t=\beta_2(\sin\theta_t\,\hat{\mathbf{x}}+\cos\theta_t\,\hat{\mathbf{z}})$ | Vector de onda transmitido. |
| $\cos\theta=\lvert k_{normal}\rvert/\lvert\mathbf{k}\rvert,\ \ \tan\theta=\lvert k_{tang}\rvert/\lvert k_{normal}\rvert$ | Ángulo de incidencia a partir de un $\mathbf{k}$ dado (respecto a la normal). |
| $\lvert\mathbf{k}\rvert=2\pi/\lambda=\omega/v_p$ | Módulo de $\mathbf{k}$ en el medio donde viaja la onda. |
| $\beta_1\sin\theta_i=\beta_1\sin\theta_r=\beta_2\sin\theta_t$ | Conservación de la componente tangencial de $\mathbf{k}$ (las fases deben coincidir en todo $z=0$). |
| $\theta_r=\theta_i$ | Ley de la reflexión. |
| $n_1\sin\theta_i=n_2\sin\theta_t,\ \ n=\sqrt{\varepsilon_r\mu_r}$ | Ley de Snell. |
| $\cos\theta_t=\sqrt{1-(n_1/n_2)^2\sin^2\theta_i}$ | Coseno del ángulo transmitido. |
| TE (perpendicular): $\mathbf{E}=E_y\hat{\mathbf{y}}$, $\mathbf{E}\perp$ plano de incidencia | Polarización perpendicular. |
| TM (paralela): $\mathbf{E}\in$ plano de incidencia, $\mathbf{H}=H_y\hat{\mathbf{y}}$ | Polarización paralela. |
| $\Gamma_\perp=\dfrac{\eta_2\cos\theta_i-\eta_1\cos\theta_t}{\eta_2\cos\theta_i+\eta_1\cos\theta_t}$ | Coeficiente de reflexión TE. |
| $\tau_\perp=1+\Gamma_\perp=\dfrac{2\eta_2\cos\theta_i}{\eta_2\cos\theta_i+\eta_1\cos\theta_t}$ | Coeficiente de transmisión TE. |
| $\Gamma_\parallel=\dfrac{\eta_2\cos\theta_t-\eta_1\cos\theta_i}{\eta_2\cos\theta_t+\eta_1\cos\theta_i}$ | Coeficiente de reflexión TM. |
| $\tau_\parallel=\dfrac{2\eta_2\cos\theta_i}{\eta_2\cos\theta_t+\eta_1\cos\theta_i},\ \ 1+\Gamma_\parallel=\tau_\parallel\dfrac{\cos\theta_t}{\cos\theta_i}$ | Coeficiente de transmisión TM y su relación con $\Gamma_\parallel$. |
| $\Gamma_\perp=\dfrac{n_1\cos\theta_i-n_2\cos\theta_t}{n_1\cos\theta_i+n_2\cos\theta_t},\ \ \Gamma_\parallel=\dfrac{n_1\cos\theta_t-n_2\cos\theta_i}{n_1\cos\theta_t+n_2\cos\theta_i}$ | Lo mismo en función de los índices (medios no magnéticos, $\eta=\eta_0/n$). |
| $\tau_\perp=\dfrac{2n_1\cos\theta_i}{n_1\cos\theta_i+n_2\cos\theta_t},\ \ \tau_\parallel=\dfrac{2n_1\cos\theta_i}{n_1\cos\theta_t+n_2\cos\theta_i}$ | Transmisión en función de los índices. |
| $\theta_i=0\Rightarrow\Gamma_\perp=\Gamma_\parallel=\dfrac{\eta_2-\eta_1}{\eta_2+\eta_1}$ | Se reduce a la incidencia normal. |
| $\dfrac{P_r}{P_i}=\lvert\Gamma\rvert^2,\ \ \dfrac{P_t}{P_i}=\dfrac{\eta_1\cos\theta_t}{\eta_2\cos\theta_i}\lvert\tau\rvert^2=1-\lvert\Gamma\rvert^2$ | Balance de potencia a través de la interfaz (con pérdidas, $\eta_2=\eta_c$). |
| $\sin^2\theta_B=\dfrac{1-\mu_2\varepsilon_1/(\mu_1\varepsilon_2)}{1-(\varepsilon_1/\varepsilon_2)^2}$ | Ángulo de Brewster general ($\Gamma_\parallel=0$). |
| $\tan\theta_B=\sqrt{\varepsilon_2/\varepsilon_1}=n_2/n_1,\ \ \theta_B+\theta_t=90^\circ$ | Brewster para medios no magnéticos: solo existe en polarización paralela; la onda reflejada queda polarizada perpendicular. |
| $\sin\theta_c=n_2/n_1=\sqrt{\varepsilon_2/\varepsilon_1}\ \ (n_1>n_2)$ | Ángulo crítico: para $\theta_i>\theta_c$ hay reflexión total. |
| $\cos\theta_t=-j\sqrt{(n_1/n_2)^2\sin^2\theta_i-1}$ | Para $\theta_i>\theta_c$ es imaginario puro: $\lvert\Gamma\rvert=1$ y $P_t=0$. |
| $\alpha_z=\beta_1\sqrt{\sin^2\theta_i-\sin^2\theta_c},\ \ \beta_x=\beta_1\sin\theta_i$ | Onda evanescente: decae como $e^{-\alpha_zz}$ y se propaga a lo largo de la interfaz. |
| Conductor perfecto: $\mathbf{E}_{tang}$ cambia de signo, $\mathbf{E}_{normal}$ se mantiene; $\mathbf{E}_r\cdot\mathbf{k}_r=0$ | Regla para obtener la onda reflejada. |
| $\mathbf{H}_r=\dfrac1{\eta_0}\hat{\mathbf{k}}_r\times\mathbf{E}_r,\ \ \mathbf{J}_s=\hat{\mathbf{n}}\times\mathbf{H}_{tot}$ | $\mathbf{H}$ reflejado y corriente superficial ($\hat{\mathbf{n}}$ hacia el medio 1); $H_{tang}$ se duplica en la superficie. |
| $E_y=-2jE_i\sin(\beta z\cos\theta_i)\,e^{-j\beta x\sin\theta_i}$ | TE sobre conductor perfecto: onda estacionaria en $z$ y progresiva en $x$. |
| Nodos en $z=-n\lambda/(2\cos\theta_i)$ | Posición de los nodos de $E$. |
| $\lambda_x=\lambda/\sin\theta_i,\ \ v_x=v_p/\sin\theta_i$ | Longitud de onda y velocidad de fase a lo largo de la interfaz (no es velocidad de energía). |

## 21. Efecto Doppler

| Fórmula | Explicación |
|---|---|
| $\omega'=\omega-\mathbf{k}\cdot\mathbf{v}$ | Frecuencia que ve un observador que se mueve con velocidad $\mathbf{v}$. |
| $f'=f\left(1-\dfrac vc\cos\alpha\right)$ | $\alpha$ = ángulo entre $\mathbf{v}$ y la dirección de propagación; solo cuenta la componente radial. |
| $f'\approx f(1+v_r/c)$ (acercamiento), $\ f'\approx f(1-v_r/c)$ (alejamiento) | Caso no relativista de fuente u observador en movimiento. |
| $f'=f\sqrt{\dfrac{1+\beta}{1-\beta}}$ (acercamiento), $\ f'=f\sqrt{\dfrac{1-\beta}{1+\beta}}$ (alejamiento), $\ \beta=v/c$ | Fórmula relativista longitudinal. |
| $f_r=f\,\dfrac{1+\beta}{1-\beta}\approx f(1+2\beta)$ | Eco de un blanco (o espejo) que se acerca con velocidad radial $v_r$. |
| $\Delta f=f_r-f\approx\dfrac{2v_rf}c=\dfrac{2v_r}\lambda$ | Desplazamiento Doppler del eco (doble que el de un observador simple); $v_r<0$ si se aleja. |
| $v_r=\dfrac{\Delta f\,c}{2f}=\dfrac{\Delta f\,\lambda}2$ | Velocidad del blanco a partir del desplazamiento medido. |
