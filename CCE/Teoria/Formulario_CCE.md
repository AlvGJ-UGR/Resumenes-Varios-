# Formulario — Componentes y Circuitos Electrónicos

**UGR · Grado en Ingeniería de Tecnologías de Telecomunicación**

> Formulario de consulta rápida. **Temas 1 (Componentes pasivos), 2 (Semiconductores), 3 (Diodos) y 4 (MOSFET)** completos (el 2 a partir de tu resumen `T2_Semiconductores.md`; el 1, el 3 y el 4, de las diapositivas).
> Notación: $v$ minúscula = total instantáneo; $V$ mayúscula = polarización (DC); $v_x$ minúscula con subíndice minúsculo = pequeña señal.

---

## Índice

- [Tema 1 — Componentes pasivos](#tema-1--componentes-pasivos)
- [Tema 2 — Semiconductores](#tema-2--semiconductores)
- [Tema 3 — Diodos](#tema-3--diodos)
- [Tema 4 — Transistor MOSFET](#tema-4--transistor-mosfet)
- [Constantes y valores típicos](#constantes-y-valores-típicos)

---

## Tema 1 — Componentes pasivos

### 1.1 Resistores

| Concepto | Fórmula / dato |
|---|---|
| Resistencia de un conductor | $R=\rho\dfrac LS$ |
| Tolerancia | $\Delta R=\dfrac{R-R_0}{R_0}\times100$ |
| Deriva térmica | $R_H=R_0\left[1+\alpha(T_H-T_0)\right]$ (TCR en ppm/°C) |
| Potencia | Máxima que puede disipar (laboratorio: ¼ W) |
| Series normalizadas (IEC 60063) | $E_n(S)=10^{(n-1)/S}$ |
| Modelo con parásitos | $Z(j\omega)=\dfrac{R+j\omega L_c}{(1-\omega^2L_cC_p)+j\omega RC_p}$ |
| Si $R>1{,}5\sqrt{L_c/C_p}$ | Paso bajo, $f=\dfrac{1}{2\pi RC_p}$ |
| Si $R<1{,}5\sqrt{L_c/C_p}$ | Comportamiento inductivo |

| Serie | E6 | E12 | E24 | E48 | E96 | E192 |
|---|---|---|---|---|---|---|
| Tolerancia | 20 % | 10 % | 5 % | 2 % | 1 % | 0,1 / 0,25 / 0,5 % |

| Tecnología | TCR (ppm/°C) | Tolerancia | Potencia (W) | Ruido |
|---|---|---|---|---|
| Carbón (composición) | −200 a −1500 | ±5 a ±20 % | 0,25–1 | 2–6 µV/V |
| Carbón (película) | −200 a −1500 | ±2 a ±10 % | 0,25–2 | <1 |
| Película metálica | ±5 a ±50 | ±0,1 a ±2 % | 0,063–1 | <0,1 |
| Hilo bobinado | ±1 a ±200 | ±0,1 a ±10 % | 0,1–>1000 | Despreciable |

**Código de colores (resistencias):**

| Color | Dígito | Multiplicador | Tolerancia | ppm/°C |
|---|---|---|---|---|
| Negro | 0 | ×1 | — | — |
| Marrón | 1 | ×10 | ±1 % | 100 |
| Rojo | 2 | ×100 | ±2 % | 50 |
| Naranja | 3 | ×1K | ±3 % | 15 |
| Amarillo | 4 | ×10K | ±4 % | 25 |
| Verde | 5 | ×100K | ±0,5 % | — |
| Azul | 6 | ×1M | ±0,25 % | 10 |
| Violeta | 7 | ×10M | ±0,10 % | 5 |
| Gris | 8 | ×100M | ±0,05 % | — |
| Blanco | 9 | ×1G | — | — |
| Oro | — | ×0,1 | ±5 % | — |
| Plata | — | ×0,01 | ±10 % | — |

- 4 bandas: 2 cifras + multiplicador + tolerancia. 5 bandas: 3 cifras + mult. + tol. 6 bandas: + coef. temperatura.
- **RKM:** R, K, M como coma decimal (4K7 = 4,7 kΩ; 5K36; 1M27; 6K8G = 6,8 kΩ ±2 %). Letras de tolerancia: F 1 %, G 2 %, J 5 %, K 10 %, M 20 %.
- **SMD:** 3 cifras (2 cifras + potencia de 10), en Ω: 103 = 10 kΩ; 474 = 470 kΩ.

### 1.2 Condensadores

| Concepto | Fórmula |
|---|---|
| Láminas paralelas | $C=\varepsilon\dfrac Ad$ |
| Impedancia con parásitos | $Z=R_w+j\omega L_w+\dfrac{R_l}{1+j\omega R_lC}$ |
| Parte real e imaginaria | $\left[R_w+\dfrac{R_l}{1+(\omega R_lC)^2}\right]+j\left[\omega L_w-\dfrac{\omega R_l^2C}{1+(\omega R_lC)^2}\right]$ |
| DC | $Z(0)=R_w+R_l$ |
| Tangente de pérdidas | $\tan\delta=\dfrac{\text{Re}Z}{\lvert\text{Im}Z\rvert}\approx\omega CR_w+\dfrac1{\omega R_lC}$; a partir de unas decenas de Hz, $\tan\delta\approx\omega CR_w$ |
| Modelo simplificado | $Z=R_w+j\omega L_w-\dfrac j{\omega C}$ |
| Resonancia (serie) | $\omega_r=\dfrac1{\sqrt{CL_w}}$, $Z(\omega_r)=R_w$ |
| ➕ Factor de calidad | $Q=\dfrac1{R_w}\sqrt{\dfrac{L_w}{C}}$ |

- $D=\tan\delta$: bueno ≈ $10^{-4}$; regular ≈ $10^{-2}$. $L_w$ típica: 1,4 nH (cerámico), 120 nH (electrolítico).
- Frecuencias útiles: cerámico ≈ 1 GHz; poliéster ≈ 1 GHz; electrolítico (tántalo/alúmina) ≈ 1 kHz.

| Tipo | Rango | Claves |
|---|---|---|
| Cerámico clase 1 (C0G/NP0) | pF – decenas nF | Lineal, sin envejecimiento, bajas pérdidas |
| Cerámico clase 2 (X7R, X5R, Y5V) | nF – decenas µF | Mucha capacidad; DC bias, no lineal con $T$, envejece |
| Film (poliéster/PP) | <1 µF (≈100 pF – decenas µF) | Autocurado, estable |
| Electrolítico Al | 0,1 µF – F | Polarizado; se seca (sube ESR); hasta centenas de V |
| Tántalo | 0,1 µF – centenas µF | Polarizado; no se seca, pero se puede inflamar; decenas de V |
| Supercondensador (EDLC) | 1 F – 3000 F | ≈2,5–2,7 V por celda |
| Trimmer | — | Q muy alto, sin polarización |
| Varactor | — | Capacidad = zona de deplexión de PN inversa, controlada por tensión |

**Códigos:**

| Código | Regla | Ejemplo |
|---|---|---|
| Numérico EIA (pF) | 2 cifras + potencia de 10; 8 → ×0,01; 9 → ×0,1 | 102K = 1 nF ±10 %; 473Z = 47 nF (+80/−20 %); 474J = 0,47 µF ±5 % |
| Tolerancia (letras) | B ±0,1 pF; C ±0,25 pF; D ±0,5 pF; F 1 %; G 2 %; H 2,5 %; J 5 %; K 10 %; M 20 %; P +100/−0 %; Z +80/−20 % | — |
| RKM (IEC 60062) | Letra = coma decimal; coma = µF | n47 = 470 pF; 4n7K = 4,7 nF ±10 % |
| Tensión (número + letra) | Letra: A 1 V, C 1,6, D 2, E 2,5, G 4, H 5, J 6,3, K 8; número = potencia de 10 | 2G = 400 V; 1J = 63 V; 2E473K = 47 nF ±10 % / 250 V |

### 1.3 Inductores

| Concepto | Fórmula |
|---|---|
| Inductancia | $L=\dfrac{N^2\mu A}{l}$ |
| Modelo con parásitos | $Z(j\omega)=\dfrac{R_w+j\omega L}{(1-\omega^2LC_p)+j\omega R_wC_p}$ |
| Resonancia (paralelo) | $\omega_r=\sqrt{\dfrac1{LC_p}-\dfrac{R_w^2}{L^2}}$ |
| Impedancia en resonancia | $Z(\omega_r)=\dfrac{L}{C_pR_w}$ (puramente resistiva) |

| Tipo | Rango | Claves |
|---|---|---|
| Bobinado THT | nH – decenas de mH | Versátil, buena corriente; voluminoso |
| Bobinado SMD | decenas nH – ~1 mH | Malas tolerancias |
| Toroidal | µH – decenas mH | Muy poca radiación; Q alto |
| Multicapa | 1 nH – 4,7 µH | SMD pequeño; menor Q y corriente |
| Película fina | ~0,1 – 22 nH | Máxima precisión; RF |
| Variable (slug) | — | Casi obsoleto; ±10–30 % |

- **Códigos:** colores (4/5 bandas, resultado en µH), numérico SMD (µH), RKM con R como coma (4R7 = 4,7 µH).

---

## Tema 2 — Semiconductores

> Basado en tu resumen `T2_Semiconductores.md` (Partes I–IV).

### 2.1 Bandas y clasificación de materiales

| Material | Banda prohibida $E_g$ | Conductividad $\sigma$ |
|---|---|---|
| **Conductor** | Bandas solapadas o parcialmente ocupadas (sin salto energético grande) | Grande |
| **Semiconductor** | $E_g$ relativamente pequeño | Intermedia y controlable |
| **Aislante** | $E_g$ grande | Muy pequeña |

$$
\mathbf J=\sigma\mathbf E,\qquad \rho=\frac1\sigma
$$

- **Electrón** en la banda de conducción y **hueco** en la de valencia: dos tipos de portadores. Los huecos se comportan como carga positiva.
- La temperatura aumenta la generación térmica de pares electrón–hueco.

### 2.2 Semiconductor intrínseco

$$
n=p=n_i,\qquad n_i\propto T^{3/2}\exp\!\left(-\frac{E_g}{2kT}\right),\qquad n_i=\sqrt{N_CN_V}\,\exp\!\left(-\frac{E_g}{2kT}\right)
$$

- $n_i$ depende del **material**, de la **temperatura** y de $E_g$: $T\uparrow\Rightarrow n_i\uparrow$.
- **Equilibrio térmico:** generación = recombinación.

### 2.3 Semiconductor extrínseco (dopaje)

| | **Tipo N** | **Tipo P** |
|---|---|---|
| Impureza | **Donadores** ($N_D$) | **Aceptores** ($N_A$) |
| Mayoritarios | Electrones, $n\approx N_D$ | Huecos, $p\approx N_A$ |
| Minoritarios | $p=\dfrac{n_i^2}{n}$ | $n=\dfrac{n_i^2}{p}$ |
| Nivel de Fermi | $E_F\to E_C$ ($E_F\uparrow$) | $E_F\to E_V$ ($E_F\downarrow$) |

$$
\boxed{\,np=n_i^2\,}\quad\text{(ley de acción de masas)}
$$

- **Ejemplo:** $n=10^{16}\ \text{cm}^{-3}$, $n_i=10^{10}\ \text{cm}^{-3}$ $\Rightarrow$ $p=\dfrac{(10^{10})^2}{10^{16}}=10^4\ \text{cm}^{-3}$.
- El dopaje **no añade electrones**: añade átomos que ceden electrones (o huecos) a las bandas.

### 2.4 Neutralidad eléctrica

$$
p+N_D^+=n+N_A^-\quad\xrightarrow{\text{ionización completa}}\quad p+N_D=n+N_A
$$

Con $\Delta N=N_D-N_A$ (y $np=n_i^2$):

$$
n-p=\Delta N,\qquad
n=\frac{\Delta N+\sqrt{\Delta N^2+4n_i^2}}{2},\qquad
p=\frac{-\Delta N+\sqrt{\Delta N^2+4n_i^2}}{2}
$$

- **Semiconductor compensado:** tipo N si $N_D>N_A$: $n\approx N_D-N_A$; tipo P si $N_A>N_D$: $p\approx N_A-N_D$.
  Ejemplo: $N_D=10^{16}$, $N_A=3\cdot10^{15}$ $\Rightarrow$ $n\approx7\cdot10^{15}\ \text{cm}^{-3}$.

### 2.5 Conducción: deriva y difusión

| Concepto | Fórmula |
|---|---|
| Deriva de huecos | $\mathbf v_{dp}=\mu_p\mathbf E$ (los electrones: fuerza $\mathbf F_n=-q\mathbf E$) |
| Corriente de deriva | $\mathbf J_n=qn\mu_n\mathbf E$, $\ \mathbf J_p=qp\mu_p\mathbf E$ |
| Densidad de corriente total | $\mathbf J=\mathbf J_n+\mathbf J_p=q(n\mu_n+p\mu_p)\mathbf E$ |
| Conductividad | $\sigma=q(n\mu_n+p\mu_p)=\sigma_n+\sigma_p$ |
| Resistividad | $\rho=\dfrac1{q(n\mu_n+p\mu_p)}$ |
| Tipo N / tipo P | $\sigma\approx qN_D\mu_n$ / $\sigma\approx qN_A\mu_p$ |
| Movilidades | $\mu_n>\mu_p$ |
| Difusión | $\mathbf J_{n,dif}=qD_n\nabla n$, $\ \mathbf J_{p,dif}=-qD_p\nabla p$ |
| Relación de Einstein | $\dfrac{D_n}{\mu_n}=\dfrac{D_p}{\mu_p}=\dfrac{kT}{q}$ |

- Electrones y huecos se mueven en sentidos contrarios pero **contribuyen a la corriente en el mismo sentido**.
- A más dopaje, más portadores y más $\sigma$ (menor $\rho$).

### 2.6 Nivel de Fermi y estadística

$$
f(E)=\frac{1}{1+e^{(E-E_F)/(kT)}},\qquad f(E_F)=50\,\%
$$

Aproximación de **Maxwell–Boltzmann**:

$$
n=N_C\,e^{-(E_C-E_F)/(kT)},\qquad p=N_V\,e^{-(E_F-E_V)/(kT)}
$$

$$
E_i=\frac{E_C+E_V}{2}+\frac{kT}{2}\ln\frac{N_V}{N_C}\ \ (\approx\tfrac{E_C+E_V}{2})\quad\text{(nivel de Fermi intrínseco)}
$$

### 2.7 Unión PN en equilibrio

- Al unir P y N: **difusión** de huecos (P→N) y de electrones (N→P) ⇒ queda **región de agotamiento** (carga espacial) con iones fijos ⇒ **campo eléctrico interno** que se opone a la difusión.
- **Equilibrio** (no es ausencia de movimiento): $J_n=J_{n,drift}+J_{n,dif}=0$ y $J_p=J_{p,drift}+J_{p,dif}=0$; el **nivel de Fermi es constante** ($E_{F,P}=E_{F,N}$).

$$
\rho(x)=q\left[p-n+N_D^+-N_A^-\right],\qquad \frac{dE}{dx}=\frac{\rho}{\epsilon},\qquad E=-\frac{dV}{dx}
$$

**Aproximación de agotamiento** ($n\approx p\approx0$, dopantes ionizados): $\rho=-qN_A$ (lado P), $\rho=+qN_D$ (lado N).

| Magnitud | Fórmula |
|---|---|
| Potencial incorporado | $V_{bi}=\dfrac{kT}{q}\ln\dfrac{N_AN_D}{n_i^2}$ |
| Neutralidad de carga | $N_Ax_P=N_Dx_N$ |
| Anchura total | $W=x_P+x_N$ |
| Extensión en P / N | $x_P=\dfrac{N_D}{N_A+N_D}W$ / $x_N=\dfrac{N_A}{N_A+N_D}W$ |
| Campo eléctrico | $E(x)=-\dfrac{qN_A}{\epsilon}(x+x_P)$ ($-x_P<x<0$); $\ E(x)=\dfrac{qN_D}{\epsilon}(x-x_N)$ ($0<x<x_N$) |
| Campo máximo (en la unión) | $\lvert E_{max}\rvert=\dfrac{qN_Ax_P}{\epsilon}=\dfrac{qN_Dx_N}{\epsilon}$ |
| $V_{bi}$ desde la carga | $V_{bi}=\dfrac{q}{2\epsilon}\left(N_Ax_P^2+N_Dx_N^2\right)$ |
| Anchura de agotamiento | $W=\sqrt{\dfrac{2\epsilon V_{bi}}{q}\left(\dfrac1{N_A}+\dfrac1{N_D}\right)}$ |
| Unión muy asimétrica | $W\approx\sqrt{\dfrac{2\epsilon V_{bi}}{qN_D}}$ (si $N_A\gg N_D$) |

- La región de agotamiento se extiende **más hacia el lado menos dopado**. El campo tiene **forma triangular**.
- $V_{bi}$ **no** es una batería externa: no se mide directamente con un voltímetro.

### 2.8 Unión PN con polarización

| | **Directa** ($V_D>0$) | **Inversa** ($V_R>0$) |
|---|---|---|
| Conexión | $+$ al lado P, $-$ al N | $-$ al lado P, $+$ al N |
| Barrera | $V_{bi}-V_D$ (disminuye) | $V_{bi}+V_R$ (aumenta) |
| Anchura $W$ | $\sqrt{\dfrac{2\epsilon}{q}\left(\dfrac1{N_A}+\dfrac1{N_D}\right)(V_{bi}-V_D)}$ ($\downarrow$) | $\sqrt{\dfrac{2\epsilon}{q}\left(\dfrac1{N_A}+\dfrac1{N_D}\right)(V_{bi}+V_R)}$ ($\uparrow$) |
| Conducción | Sí | No (corriente muy pequeña) |

**Ruptura en inversa:**

| Mecanismo | Cuándo predomina | Causa |
|---|---|---|
| **Zener** | Dopaje alto, $W$ muy estrecha | Túnel cuántico de electrones |
| **Avalancha** | Dopaje menor, $W$ más ancha | Ionización por impacto (multiplicación de portadores) |

- Dopaje alto $\Rightarrow$ $W\downarrow$ $\Rightarrow$ campo intenso con menos tensión: el dopaje controla la tensión de ruptura.

---

## Tema 3 — Diodos

### 3.1 Diodo ideal

| Estado | Condición | Equivalente |
|---|---|---|
| Corte (inverso) | $v<0 \Rightarrow i=0$ | Circuito abierto |
| Conducción (directo) | $i>0 \Rightarrow v=0$ | Cortocircuito |

### 3.2 Diodo real (característica I–V)

$$
i_D=I_S\left(e^{\frac{v_D}{nV_T}}-1\right),\qquad V_T=\frac{k_BT}{q}\approx25{,}85\ \text{mV (300 K)}
$$

| Concepto | Fórmula / valor |
|---|---|
| Inversa ($v_D<0$) | $i_D=-I_S$ |
| Directa ($v_D\gg nV_T$) | $i_D\approx I_Se^{v_D/(nV_T)}$ |
| Factor de idealidad | $1<n<2$ |
| Diferencia de tensión entre dos corrientes | $v_B-v_A=nV_T\ln\dfrac{i_B}{i_A}=2{,}3\,nV_T\log\dfrac{i_B}{i_A}$ |
| Una década de corriente | $\approx59$ mV ($n=1$) |
| Temperatura (Si, a $I$ fija) | $\approx-2$ mV/°C |
| Tensión de codo $V_\gamma=V_{D0}$ | Si $\approx0{,}65$ V; Ge $\approx0{,}3$ V |

### 3.3 Modelado (gran señal)

**Modelo exacto + recta de carga** (circuito $V_{DD}$–$R$–diodo):

$$
I_D=\frac{V_{DD}-V_D}{R},\qquad I_D=I_Se^{V_D/(nV_T)}\;\Rightarrow\;V_D=V_T\ln\frac{V_{DD}-V_D}{I_SR}\ \text{(iterar)}
$$

**Modelos simplificados:**

| Modelo | Conducción | Corte |
|---|---|---|
| **Ideal** | $V_D=0$ | Abierto |
| **Ideal con desplazamiento** | $V_D=V_{D0}$ | Abierto |
| **Lineal a tramos** | $V_D=V_{D0}+I_Dr_D$ | Abierto |

**Método:** suponer estado ⇒ sustituir ⇒ resolver ⇒ comprobar ($V_D<V_\gamma$ en corte; $I_D>0$ en directa) ⇒ si hay contradicción, nueva suposición.

**Ejemplos de las diapositivas:**

| Ejemplo | Resultado |
|---|---|
| $V_{DD}=5$ V, $R=1$ kΩ, exacto ($I_S=2$ fA, $n=1$) | $V_D$: 0,7 → 0,73 → 0,732 V |
| Mismo, ideal / con desplazamiento (0,65 V) / lineal a tramos ($r_D=20\ \Omega$) | 5 mA / 4,35 mA / 4,26 mA ($V_D=0{,}73$ V) |
| Dos diodos en serie ($V_1=10$ V, $R_1=2$ kΩ), lineal a tramos | $I=\dfrac{V_1-V_{\gamma1}-V_{\gamma2}}{R_1+r_{D1}+r_{D2}}=4{,}26$ mA |
| Mismo, exacto ($I_{S1}=10^{-12}$, $I_{S2}=6\cdot10^{-12}$ A) | $I_D=4{,}45$ mA |

### 3.4 Pequeña señal

$$
v_D=V_D+v_d,\qquad i_D\approx I_D\left(1+\frac{v_d}{nV_T}\right)=I_D+i_d
$$

$$
\boxed{\,r_d=\frac{nV_T}{I_D}\,},\qquad i_d=\frac{v_d}{r_d}
$$

- **Baja frecuencia:** solo $r_d$. **Alta frecuencia:** $r_d$ en paralelo con $C_d$ (difusión) y $C_j$ (unión).
- **Receta:** (1) DC con fuentes de señal a 0; (2) sustituir el diodo por $r_d$ y anular fuentes DC; (3) resolver con las fuentes de señal.
- **Ejemplo:** $V^+=10$ V + rizado 0,5 V a 60 Hz, $R=10$ kΩ, $n=2$, $V_D=0{,}7$ V:
  $I_D=\dfrac{10-0{,}7}{10\ \text{k}\Omega}=0{,}93$ mA; $r_d=55{,}4\ \Omega$; $v_d=0{,}5\cdot\dfrac{r_d}{r_d+R}=2{,}76$ mV.

### 3.5 Zener

$$
V_Z=V_{Z0}+I_Zr_Z,\qquad \Delta V=\Delta I\,r_Z
$$

- Se usa en **inversa** (para $I>I_{ZK}$, corriente de codo). Estabiliza $V_O$ porque $r_Z$ es pequeña.
- **Ejemplo (Zener 6,8 V, $I_Z=5$ mA, $r_Z=20\ \Omega$, $I_{ZK}=0{,}2$ mA, $R=0{,}5$ kΩ, $V^+=10\pm1$ V):**
  $V_{Z0}=6{,}7$ V; $I_Z=\dfrac{V^+-V_{Z0}}{R+r_Z}=6{,}35$ mA; $V_O=6{,}83$ V; $\Delta V_O=\Delta V^+\dfrac{r_Z}{R+r_Z}=\pm38{,}5$ mV.

### 3.6 Varactor (diodo varicap, en inversa)

$$
C_j=\frac{\varepsilon_S\text{Área}}{W}=\frac{C_{J0}}{\left(1-\dfrac{V_D}{V_{bi}}\right)^n}\propto|V_D|^{-n}
$$

- Unión PN abrupta: $C_T=\dfrac{dQ}{dV_D}=\dfrac A2\sqrt{\dfrac{2q\varepsilon}{V_{bi}-V_D}\dfrac{N_DN_A}{N_D+N_A}}\propto|V_D|^{-1/2}$.
- Más tensión inversa ⇒ menos capacidad. Usos: VCO, filtros sintonizados, multiplicadores de frecuencia.

### 3.7 Rectificadores

| Magnitud | Fórmula |
|---|---|
| Valor eficaz (senoidal) | $V_{RMS}=\dfrac{V_{pico}}{\sqrt2}$, $I_{RMS}=\dfrac{I_{pico}}{\sqrt2}$ |
| Valor eficaz (general) | $V_{RMS}=\sqrt{\dfrac1T\displaystyle\int_0^TV(t)^2dt}$ |
| Media onda | $v_O=0$ si $v_S<V_D$; $v_O=v_S-V_D$ si $v_S\ge V_D$ |
| Onda completa (toma central) | $v_O=v_S-V_D$ (2 diodos) |
| Puente de diodos | $v_O=v_S-2V_D$ (4 diodos; conducen 2 por semiciclo) |
| PIV (criterio) | $V_s<0{,}5\cdot\text{PIV}$ |
| Fuente DC | transformador → rectificador → filtro → regulador → carga |

- Rectificador ideal: corriente inversa muy baja, $V_\gamma\approx0$, $R_S=0$, tensión de ruptura elevada (ej.: 1N4001, BYV95C). Conmutación rápida: UF4001.

### 3.8 LED y fotodiodo

| | LED | Fotodiodo |
|---|---|---|
| Polarización | Directa | **Inversa** |
| Principio | Recombinación de minoritarios ⇒ fotones | Fotones ⇒ pares e–h ⇒ corriente inversa |
| Proporcionalidad | Luz $\propto$ corriente | Corriente inversa $\propto$ iluminancia |
| Materiales | GaAs ($E_g=1{,}4$ eV, infrarrojo, 1962), GaP (rojo/verde), GaN ($E_g=3{,}4$ eV, azul/UV) | — |

- ➕ $\lambda\,(\text{nm})\approx\dfrac{1240}{E_g\,(\text{eV})}$.
- Luz blanca: fósforos (LED azul/UV + fósforo), mezcla RGB o híbrido.

---

## Tema 4 — Transistor MOSFET

### 4.1 Regiones de funcionamiento (NMOS)

| Región | Condición | $i_{DS}$ |
|---|---|---|
| **Corte** | $v_{GS}<V_T$ | $0$ |
| **Lineal (triodo)** | $v_{GS}>V_T$, $v_{DS}\le v_{GS}-V_T$ | $k_n\left[(v_{GS}-V_T)v_{DS}-\tfrac12v_{DS}^2\right]$ |
| **Saturación** | $v_{GS}>V_T$, $v_{DS}\ge v_{GS}-V_T$ | $\dfrac{k_n}2(v_{GS}-V_T)^2\,[1+\lambda v_{DS}]$ |

- $i_G=0$. Tensión de sobrecarga: $v_{ov}=v_{GS}-V_T$.
- Lineal con $v_{DS}$ pequeña: $i_{DS}=k_n(v_{GS}-V_T)v_{DS}$ ⇒ $r_{ch}=\dfrac{1}{k_n(v_{GS}-V_T)}$.

### 4.2 Parámetros

$$
Q_I=C(v_{GS}-V_T),\quad C=C_{ox}WL,\quad C_{ox}=\frac{\varepsilon_{ox}}{t_{ox}},\qquad
k_n=C_{ox}\mu_n\frac WL=k'_n\frac WL
$$

| Parámetro | Valor / significado |
|---|---|
| $V_T$ | Tensión umbral (típ. 0,3–1 V) |
| $k_n$ | Parámetro de transconductancia (mA/V²) |
| $k'_n=C_{ox}\mu_n$ | Transconductancia de proceso |
| $\lambda=1/V_A$ | Modulación de longitud de canal (Early) |

**Efecto Body:** $V_T=V_{T0}+\gamma\left[\sqrt{2\phi_f+v_{SB}}-\sqrt{2\phi_f}\right]$, $\gamma=\dfrac{\sqrt{2qN_A\varepsilon_S}}{C_{ox}}$. Normalmente $V_{SB}=0$; nunca $V_B>V_S$.

### 4.3 Polarización

| Circuito | Ecuaciones |
|---|---|
| Recta de carga D–S | $I_{DS}=-\dfrac{V_{DS}}{R_D}+\dfrac{V_{DD}}{R_D}$ |
| Autopolarizado | $V_{GG}=V_{GS}+I_{DS}R_S$; $V_{DD}=I_{DS}(R_D+R_S)+V_{DS}$ |
| Realimentación D–G | $V_{DD}=I_{DS}R_D+V_{GS}$ (siempre en saturación si conduce) |
| Fuente de corriente en S | $I_{DS}=I_{DC}$, $V_G=0$, $V_D=V_{DD}-I_{DS}R_D$ |

**Método:** suponer saturación ⇒ malla G–S + ecuación del transistor ⇒ $I_{DS}$, $V_{GS}$ ⇒ malla D–S ⇒ $V_{DS}$ ⇒ **comprobar** $V_{GS}>V_T$ (descartar raíz con $V_{GS}<V_T$) y $V_{DS}\ge V_{GS}-V_T$.

**Resultados de las diapositivas:**

| Ejemplo | Resultado |
|---|---|
| Región lineal ($V_{DD}=5$ V, $V_D=0{,}1$ V, $k_n=1$ mA/V², $V_T=1$ V) | $I_{DS}=0{,}395$ mA; $R_D=12{,}4$ kΩ; $R_{ch}=253\ \Omega$ |
| Autopolarizado ($V_{DD}=10$ V, $R_G$ 10 MΩ+10 MΩ, $R_D=R_S=6$ kΩ) | $I_{DS}=0{,}5$ mA; $V_D=7$ V; $V_{DS}=4$ V |
| Diseño ($I_{DS}=1$ mA, $V_S=2$ V, $V_{DS}=5$ V, $k_n=0{,}2$) | $R_S=2$ kΩ; $V_{GS}=4{,}16$ V; $R_{G2}=1{,}6R_{G1}$; $R_D=3$ kΩ |
| Bipolar ($V_{DD}=5$, $V_{SS}=-5$ V, $I_{DS}=1$ mA, $V_o=0$) | $R_S=1$ kΩ; $R_D=5$ kΩ |

### 4.4 Pequeña señal (NMOS en saturación)

$$
i_{ds}=g_mv_{gs}+\frac{v_{ds}}{r_o}
$$

| Magnitud | Fórmula |
|---|---|
| Transconductancia | $g_m=k_n(V_{GS}-V_T)[1+\lambda V_{DS}]=\dfrac{2I_{DS}}{V_{GS}-V_T}$ |
| Resistencia de salida | $\dfrac1{r_o}=\dfrac{k_n}2(V_{GS}-V_T)^2\lambda\approx\dfrac{I_{DS}}{V_A}$ |
| Validez | $v_{gs}\ll2(V_{GS}-V_T)$ |
| Ganancia (fuente común) | $A_v=\dfrac{v_{ds}}{v_{gs}}=-g_mR_D=-k_n(V_{GS}-V_T)R_D$ |
| Con $R_S$ (sin desacoplo) | $\dfrac{v_d}{v_g}=-R_D\dfrac{g_m}{1+g_mR_S}$ |
| Modelo en T | $1/g_m$ entre G y S; $i=\dfrac{v_g}{1/g_m+R_S}$ |

- **Receta:** DC (señal a 0, condensadores abiertos) ⇒ Q, $g_m$, $r_o$; AC (fuentes DC a 0, condensadores en cortocircuito) ⇒ ganancia.
- **Alta frecuencia:** $C_{gs}=\tfrac23WLC_{ox}+C_{ov}$, $C_{gd}=C_{ov}=WL_{ov}C_{ox}$; $C_{sb}$ cortocircuitada si no hay body; $C_{db}$ suele despreciarse.
- **Ejemplo:** $V_{DD}=5$ V, $R_D=2$ kΩ, $R_S=0{,}5$ kΩ, $V_G=3{,}5$ V, $k_n=0{,}5$ mA/V², $V_T=1$ V ⇒ $Q=(I_{DS},V_{GS},V_{DS})=(1\ \text{mA},3\ \text{V},2{,}5\ \text{V})$; $g_m=1$ mA/V.
  Con $C_D$ en $R_S$: $A_v=-2$ ($v_d=0{,}4$ V para $v_g=0{,}2$ V). Sin $C_D$: $A_v=-1{,}33$ ($0{,}266$ V).

### 4.5 PMOS (cambia $v_{GS}\to v_{SG}$, $v_{DS}\to v_{SD}$)

$$
i_{SD}=\begin{cases}0&v_{SG}<-V_T\\ k_p\left[(v_{SG}-(-V_T))v_{SD}-\tfrac12v_{SD}^2\right]&v_{SD}\le v_{SG}-(-V_T)\\ \dfrac{k_p}2(v_{SG}-(-V_T))^2[1+\lvert\lambda\rvert v_{SD}]&v_{SD}>v_{SG}-(-V_T)\end{cases}
$$

- $V_T<0$, $V_A<0$ (convenio). Canal de **huecos**.
- $g_m=k_p(V_{SG}-(-V_T))=\dfrac{2I_{SD}}{V_{SG}-(-V_T)}$; $\dfrac1{r_o}\approx\dfrac{I_{SD}}{V_A}$.
- **Ejemplo:** $I_{SD}=1$ mA, $V_D=3$ V, $k_p=0{,}5$, $V_T=-1$ V ⇒ $V_{SG}=3$ V; $V_{SD}=3$ V; $R_S=4$ kΩ; $R_D=3$ kΩ; $V_G=3$ V.

### 4.6 MOSFET de deplexión

- Canal implantado ⇒ conduce con $v_{GS}=0$ ($I_{DSS}$); no apto para digital.
- Como un MOSFET normal con $V_T<0$ (canal N) o $V_T>0$ (canal P).

---

## Constantes y valores típicos

| Constante | Valor |
|---|---|
| Carga del electrón $q$ | $1{,}602\cdot10^{-19}$ C |
| Constante de Boltzmann $k_B$ | $1{,}38\cdot10^{-23}$ J/K ($8{,}6\cdot10^{-5}$ eV/K) |
| Tensión térmica $V_T$ (300 K) | 25,852 mV (≈ 25,9 mV) |
| Permitividad del vacío $\varepsilon_0$ | $8{,}854\cdot10^{-14}$ F/cm |
| Constante de Planck $h$ | $6{,}625\cdot10^{-34}$ J·s |
| Masa del electrón $m_e$ | $9{,}11\cdot10^{-31}$ kg |
| Número de Avogadro | $6{,}022\cdot10^{23}$ mol⁻¹ |
| $V_\gamma$ Si / Ge | 0,65 V / 0,3 V |
| $V_T$ típica del MOSFET | 0,3–1 V |

---

*Fin del formulario (Temas 1, 2, 3 y 4).*
