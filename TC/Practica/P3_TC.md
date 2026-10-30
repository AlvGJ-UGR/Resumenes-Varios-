# Práctica 1 de TC — Parte 3: Filtrado de procesos aleatorios (MATLAB)

Guía completa para entender y reproducir la tercera parte de la práctica: identificar el proceso de entrada de un filtro, y comprobar la relación entre las densidades de potencia espectral (PSD) de la entrada y la salida de un sistema lineal.

## Índice

1. [Qué te piden y cómo se enlaza con la parte 2](#1-qué-te-piden-y-cómo-se-enlaza-con-la-parte-2)
2. [Conceptos básicos desde cero](#2-conceptos-básicos-desde-cero)
3. [Qué esperar de los datos (y cómo se ve el ruido de estimación)](#3-qué-esperar-de-los-datos-y-cómo-se-ve-el-ruido-de-estimación)
4. [Punto 1: autocorrelación y PSD de la entrada](#4-punto-1-autocorrelación-y-psd-de-la-entrada)
5. [Punto 2: contraste de PSD con la respuesta en frecuencia del filtro](#5-punto-2-contraste-de-psd-con-la-respuesta-en-frecuencia-del-filtro)
6. [Cómo generar un proceso WSS con un espectro dado](#6-cómo-generar-un-proceso-wss-con-un-espectro-dado)
7. [Script completo listo para ejecutar](#7-script-completo-listo-para-ejecutar)
8. [Banco de preguntas con respuesta modelo](#8-banco-de-preguntas-con-respuesta-modelo)
9. [Errores típicos](#9-errores-típicos)
10. [Autotest con datos sintéticos](#10-autotest-con-datos-sintéticos)
11. [Checklist para el examen](#11-checklist-para-el-examen)

> **Aviso sobre los datos.** Esta guía no incluye los resultados numéricos de tu fichero `signalENTRADA`, porque dependen de él. Sí incluye cómo obtenerlos, qué deberías ver y cómo razonarlo. Las fórmulas y el código se han comprobado con datos sintéticos (ruido blanco gaussiano filtrado con $a_1=-0.7$).

---

## 1. Qué te piden y cómo se enlaza con la parte 2

En la parte 2 caracterizaste la **salida** de un filtro lineal: un proceso gaussiano $X(n)$ (ficheros `signal1` y `signal1ERG`). En la parte 3 miras la **entrada** de ese filtro.

```
   entrada w(n)            filtro todo polos             salida X(n)
 (signalENTRADA)   --->   H(z) = 1 / (1 + a1 z^-1)   --->   (parte 2)
                                 a1 = -0.7
```

**Tareas:**

1. Con la realización `signalENTRADA` (128000 muestras) calcular la **autocorrelación temporal** $R_{ent}(k)$ y la **PSD** $S_{ent}(f)$ de la entrada, y razonar **qué tipo de proceso** es.
2. **Comprobar** que la PSD de la salida (parte 2) coincide con la que predice la teoría a partir de la entrada y del filtro:

$$S_{sal}(f)=\lvert H(f)\rvert^2\,S_{ent}(f)$$

3. Dibujar aparte la **respuesta en frecuencia del filtro** junto a $S_{ent}(f)$ y comentar.
4. Razonar **cómo generar un proceso WSS con un comportamiento en frecuencia dado**.

**Hipótesis que da el enunciado:** la entrada es WSS y ergódica en la media y en la autocorrelación. Por eso puedes calcular $R_{ent}(k)$ de **una sola realización** (promedios temporales) y usarla como autocorrelación del proceso.

---

## 2. Conceptos básicos desde cero

### 2.1 Resumen de lo que ya sabes de la parte 2

Para un proceso WSS y ergódico:

$$R_t(k)=\frac1{L-k}\sum_{n=1}^{L-k}x(n)\,x(n+k)\;\approx\;R_X(k)$$

$$S_X(f)=R_X(0)+2\sum_{k=1}^{K}R_X(k)\cos\!\left(2\pi\frac f{f_s}\,k\right),\qquad f\in[-f_s/2,\,f_s/2],\; f_s=8000\ \text{Hz}$$

### 2.2 Ruido blanco

Un proceso $w(n)$ es **ruido blanco** (de media cero y varianza $\sigma^2$) si sus muestras están **incorreladas** entre sí:

$$R_w(k)=\sigma^2\,\delta(k)=\begin{cases}\sigma^2,&k=0\\0,&k\neq0\end{cases}$$

Aplicando la fórmula de la PSD solo sobrevive el término $k=0$:

$$S_w(f)=\sigma^2\quad\text{para todo }f$$

**La PSD es plana (constante)**: toda frecuencia aporta la misma potencia, de ahí el nombre «blanco» (por analogía con la luz blanca, que contiene todos los colores por igual). El nivel de la PSD es la **varianza** $\sigma^2=R_w(0)$.

**Si además es gaussiano:** muestras incorreladas **y conjuntamente gaussianas ⇒ independientes** (propiedad del Tema 1). Es el **ruido blanco gaussiano**, el modelo estándar del ruido térmico.

### 2.3 Sistema lineal e invariante (LTI): qué es $H(f)$

Un filtro lineal con respuesta al impulso $h(n)$ transforma la entrada $x(n)$ en la salida

$$y(n)=\sum_{i}h(i)\,x(n-i)$$

Su **respuesta en frecuencia** es la transformada de Fourier de $h(n)$:

$$H(f)=H(\omega)\big\vert_{\omega=2\pi f/f_s}=\sum_i h(i)\,e^{-j\omega i}$$

Es una función compleja: su **módulo** $\lvert H(f)\rvert$ dice cuánto amplifica o atenúa cada frecuencia, y su fase cuánto la retrasa.

### 2.4 Filtro todo polos de primer orden

El guion dice «filtro todo polos con coeficiente $a_1=-0.7$». En la convención de MATLAB (`filter(b, a, x)` con `a = [1 a1]`) el denominador es $A(z)=1+a_1z^{-1}$, luego

$$H(z)=\frac{1}{1+a_1z^{-1}}=\frac{1}{1-0.7\,z^{-1}}\;\Longleftrightarrow\; y(n)=0.7\,y(n-1)+x(n)$$

- **Un único polo en $z=0.7$** (real, positivo, dentro de la circunferencia unidad ⇒ filtro estable).
- Respuesta al impulso: $h(n)=0.7^n\,u(n)$.
- Respuesta en frecuencia:

$$H(f)=\frac{1}{1-0.7\,e^{-j2\pi f/f_s}},\qquad \lvert H(f)\rvert^2=\frac{1}{1.49-1.4\cos(2\pi f/f_s)}$$

- Valores clave de $\lvert H\rvert^2$ (ganancia en potencia):

| Frecuencia | $\lvert H\rvert^2$ |
|---|---|
| $f=0$ | $1/0.3^2=11.11$ |
| $f=\pm f_s/2=\pm4$ kHz | $1/1.7^2=0.346$ |

Es un **filtro paso bajo**: deja pasar las frecuencias bajas (ganancia $\approx11$) y atenúa las altas (ganancia $\approx0.35$).

> **Sobre el signo de $a_1$.** Hay dos convenciones: $A(z)=1+a_1z^{-1}$ (MATLAB; polo en $+0.7$, paso bajo) y $y(n)=a_1y(n-1)+x(n)$ (polo en $-0.7$, paso alto). Los datos te dicen cuál es la correcta; ver §5.4. Todo lo que sigue usa la convención de MATLAB.

### 2.5 Relación entre las PSD de entrada y salida (teoría de clase)

Si la entrada $x(n)$ es **WSS** y pasa por un filtro LTI estable, la salida $y(n)$ también es **WSS** y

$$\boxed{S_Y(f)=\lvert H(f)\rvert^2\,S_X(f)}$$

**Idea de la demostración.** La autocorrelación de la salida es

$$R_Y(k)=E[y(n)y(n+k)]=\sum_i\sum_j h(i)h(j)\,R_X(k-j+i)$$

que es la convolución de $R_X(k)$ con la «autocorrelación del filtro» $R_h(m)=\sum_i h(i)h(i+m)=h(m)*h(-m)$:

$$R_Y(k)=R_X(k)*h(k)*h(-k)$$

Una convolución en el tiempo es un producto en frecuencia, y $h(-k)$ tiene transformada $H^*(f)$, de modo que

$$S_Y(f)=S_X(f)\,H(f)\,H^*(f)=\lvert H(f)\rvert^2S_X(f)$$

**Interpretación:** el filtro **multiplica la potencia de cada frecuencia por la ganancia en potencia $\lvert H(f)\rvert^2$** de esa frecuencia. La fase del filtro no influye en la PSD.

**Caso particular (el de la práctica).** Con entrada blanca $S_{ent}(f)=\sigma_w^2$:

$$S_{sal}(f)=\sigma_w^2\,\lvert H(f)\rvert^2=\frac{\sigma_w^2}{1.49-1.4\cos(2\pi f/f_s)}$$

Es decir, **la forma de la PSD de salida es exactamente la forma del filtro**, escalada por $\sigma_w^2$. Y la autocorrelación de la salida del AR(1) es

$$R_{sal}(k)=\frac{\sigma_w^2}{1-0.7^2}\,0.7^{\lvert k\rvert}=\frac{\sigma_w^2}{0.51}\,0.7^{\lvert k\rvert}$$

### 2.6 Ergodicidad de la entrada

Un ruido blanco de muestras independientes e idénticamente distribuidas es automáticamente WSS y ergódico (la ley de los grandes números hace que los promedios temporales converjan a los estadísticos). Por eso el enunciado te permite usar una sola realización.

---

## 3. Qué esperar de los datos (y cómo se ve el ruido de estimación)

### 3.1 Resultados esperados (a verificar con tus datos)

| Magnitud | Esperado si la entrada es ruido blanco de varianza $\sigma_w^2$ |
|---|---|
| Media temporal $m_t$ | $\approx0$ |
| $R_{ent}(0)$ | $\sigma_w^2$ |
| $R_{ent}(k)$, $k\neq0$ | $\approx0$ |
| $S_{ent}(f)$ | Plana, de nivel $\sigma_w^2$ |
| $R_{sal}(0)$ | $\sigma_w^2/0.51\approx1.96\,\sigma_w^2$ |
| $R_{sal}(1)/R_{sal}(0)$ | $0.7$ |

### 3.2 Por qué la PSD estimada no sale perfectamente plana

Estás estimando con $L=128000$ muestras y solo $127$ retardos. Para ruido blanco gaussiano:

- Cada $R_t(k)$ con $k\neq0$ fluctúa alrededor de $0$ con desviación $\approx\sigma_w^2/\sqrt L\approx0.0028\,\sigma_w^2$. Valores de hasta $\approx0.008\,\sigma_w^2$ ($\approx3$ desviaciones) son normales.
- La PSD estimada suma $\approx256$ términos aleatorios y presenta un **rizado** de desviación $\approx\sigma_w^2\sqrt{256/L}\approx4.5\%\,\sigma_w^2$.

Por tanto, una PSD que oscila un **±5–10 %** alrededor de un nivel constante, **sin forma ni tendencia**, es compatible con ruido blanco. Una PSD con una forma clara (subida, bajada, picos) no lo sería.

---

## 4. Punto 1: autocorrelación y PSD de la entrada

### 4.1 Funciones reutilizables (las mismas de la parte 2)

```matlab
function x = cargar_vector(nombre)
    S = load(nombre);
    if isstruct(S), nm = fieldnames(S); x = S.(nm{1}); else, x = S; end
    x = x(:);                                  % vector columna
end

function Rt = autocorr_temporal(x, Kmax)
    x = x(:);  L = length(x);  Rt = zeros(1, Kmax+1);
    for k = 0:Kmax
        Rt(k+1) = sum(x(1:L-k) .* x(1+k:L)) / (L-k);     % insesgado
    end
end

function S = psd_desde_R(Rt, f, fs)
    Kmax = length(Rt) - 1;
    S = Rt(1) + 2 * cos(2*pi*f(:)*(1:Kmax)/fs) * Rt(2:end).';
end
```

### 4.2 Cálculo

```matlab
fs   = 8000;  Kmax = 127;
f    = linspace(-fs/2, fs/2, 2001).';        % eje en Hz (columna)

xin  = cargar_vector('signalENTRADA');
Lin  = length(xin);                          % 128000
mt_in = mean(xin);
Rin  = autocorr_temporal(xin, Kmax);         % R_ent(k), k = 0..127
Sin  = psd_desde_R(Rin, f, fs);              % S_ent(f)

fprintf('Media temporal de la entrada = %.5f\n', mt_in);
fprintf('R_ent(0) = %.4f (varianza si la media es 0)\n', Rin(1));
fprintf('max |R_ent(k)|, k>=1 : %.5f   (3*R(0)/sqrt(L) = %.5f)\n', ...
        max(abs(Rin(2:end))), 3*Rin(1)/sqrt(Lin));
fprintf('PSD: media %.4f, desv. tipica %.4f (%.1f %% del nivel)\n', ...
        mean(Sin), std(Sin), 100*std(Sin)/mean(Sin));
```

### 4.3 Gráficas

```matlab
% Autocorrelación (completa, simétrica) y zoom para ver los retardos k >= 1
Rfull = [fliplr(Rin(2:end)), Rin];
figure;
subplot(2,1,1); stem(-Kmax:Kmax, Rfull); grid on;
xlabel('k'); title('R_{ent}(k)');
subplot(2,1,2); stem(1:Kmax, Rin(2:end)); grid on;
xlabel('k'); title('R_{ent}(k) sin k = 0 (zoom)');

% PSD
figure; plot(f, Sin, 'LineWidth', 1); grid on; hold on;
yline(mean(Sin), 'r--', 'LineWidth', 1.5);          % nivel medio (yline: R2018b+)
xlabel('f (Hz)'); ylabel('S_{ent}(f)'); title('PSD de la entrada');
ylim([0, 2*mean(Sin)]);                              % misma escala para apreciar que es plana
```

Fija el eje vertical (`ylim`) en torno al nivel medio. Si el eje se autoescala, el rizado del 5 % parecerá enorme y puede inducir a error.

### 4.4 Cómo razonar el tipo de proceso

| Observación | Conclusión |
|---|---|
| $R_{ent}(k)$ es un **pico en $k=0$** y $\approx0$ para $k\neq0$ (la «delta») | Las muestras están **incorreladas** entre sí |
| $S_{ent}(f)$ es **constante** en $[-4,4]$ kHz | Todas las frecuencias tienen la misma potencia |
| $m_t\approx0$ | Media cero |

**Conclusión:** la entrada es **ruido blanco** (de media cero y varianza $\sigma_w^2=R_{ent}(0)$).

**Matiz gaussiano.** Puedes añadir que, como el proceso de salida es gaussiano y el filtro es lineal e invertible, la entrada es gaussiana, y por tanto **ruido blanco gaussiano**, con muestras independientes. Lo puedes apoyar con un histograma:

```matlab
figure; histogram(xin, 60, 'Normalization', 'pdf'); hold on; grid on;
sg = sqrt(Rin(1) - mt_in^2);
xx = linspace(-4*sg, 4*sg, 400);
plot(xx, exp(-(xx-mt_in).^2/(2*sg^2))/(sqrt(2*pi)*sg), 'r', 'LineWidth', 1.5);
title('Histograma de la entrada frente a gaussiana');
```

**Características a comentar de la autocorrelación:** simétrica ($R(-k)=R(k)$), máxima en el origen ($R(0)=\sigma_w^2$ = potencia), valor casi nulo para $k\neq0$.

**Características a comentar de la PSD:** real, par, no negativa, de nivel constante $\sigma_w^2$, con un pequeño rizado atribuible a la estimación finita; la potencia total ($\frac1{f_s}\int S\,df$) coincide con $R_{ent}(0)$.

---

## 5. Punto 2: contraste de PSD con la respuesta en frecuencia del filtro

### 5.1 Qué se dibuja

1. **Figura A.** La PSD de la salida estimada en la parte 2, $S_X(f)$, **superpuesta** a la que predice la teoría, $\lvert H(f)\rvert^2\,S_{ent}(f)$, usando la $S_{ent}$ estimada en el punto 1.
2. **Figura B.** La respuesta en frecuencia del filtro junto a $S_{ent}(f)$.

### 5.2 Código

```matlab
a1 = -0.7;

% --- PSD de la SALIDA (parte 2, con signal1ERG) ---
xr = cargar_vector('signal1ERG');
Rx = autocorr_temporal(xr, Kmax);
Sx = psd_desde_R(Rx, f, fs);

% --- Respuesta en frecuencia del filtro (evaluada en el mismo eje f) ---
H  = 1 ./ (1 + a1*exp(-1j*2*pi*f/fs));       % H(f) = 1/(1 + a1 e^{-j 2 pi f/fs})

% --- PSD predicha por la teoría: |H|^2 * S_ent ---
Spred = abs(H).^2 .* Sin;

% Figura A: superposición
figure; hold on; grid on;
plot(f, Sx,    'b',  'LineWidth', 1.5);
plot(f, Spred, 'r--','LineWidth', 1.5);
xlabel('f (Hz)'); ylabel('PSD');
legend('S_X(f) estimada (parte 2)', '|H(f)|^2 S_{ent}(f) (teoría)');
title('Comprobación de S_{sal} = |H|^2 S_{ent}');

err_rel = abs(Sx - Spred) ./ Spred;
fprintf('Error relativo entre las dos PSD: maximo %.1f %%, mediano %.1f %%\n', ...
        100*max(err_rel), 100*median(err_rel));

% Figura B: filtro y PSD de entrada (escalas distintas -> dos ejes verticales)
figure;
yyaxis left;  plot(f, abs(H), 'LineWidth', 1.5); ylabel('|H(f)|');
yyaxis right; plot(f, Sin,    'LineWidth', 1.0); ylabel('S_{ent}(f)');
ylim([0, 2*mean(Sin)]);
xlabel('f (Hz)'); grid on;
title('Respuesta en frecuencia del filtro y PSD de la entrada');
```

**Si tu MATLAB no tiene `yyaxis` (antes de R2016a)**, usa dos `subplot` (uno con $\lvert H(f)\rvert$ y otro con $S_{ent}(f)$) con el mismo eje de frecuencias.

**Alternativa con la Signal Processing Toolbox:** `H = freqz(1, [1 a1], f, fs);`.

### 5.3 Cómo se interpreta

**Figura A.** Las dos curvas deben **coincidir**, salvo pequeñas diferencias de rizado por el error de estimación (errores relativos máximos del orden de unos pocos por ciento). Esto **confirma la relación de clase** $S_{sal}(f)=\lvert H(f)\rvert^2S_{ent}(f)$ con datos reales.

**Figura B y características de $S_{ent}(f)$:**

- $\lvert H(f)\rvert$ es **paso bajo** (máximo $1/0.3\approx3.33$ en $f=0$ y mínimo $1/1.7\approx0.59$ en $\pm4$ kHz; en potencia, $11.1$ y $0.346$).
- $S_{ent}(f)$ es **plana**: aporta la misma potencia a todas las frecuencias.
- Como la entrada no favorece ninguna frecuencia, **el filtro es el único que da forma al espectro de salida**: la PSD de la salida tiene exactamente la forma de $\lvert H(f)\rvert^2$, con un máximo en $f=0$ y mínimo en $\pm4$ kHz, es decir, la salida es «ruido coloreado» (paso bajo).
- En el tiempo, esto se corresponde con la correlación positiva entre muestras consecutivas: la salida cambia más despacio que la entrada.

> La potencia de salida es $R_{sal}(0)=\sigma_w^2/0.51\approx1.96\,\sigma_w^2$, mayor que la de entrada. Con entrada blanca, la ganancia en potencia del filtro es $\sum_n h(n)^2=\sum_n 0.49^n=1/0.51$: las frecuencias bajas se amplifican (hasta 11.1) más de lo que se atenúan las altas (hasta 0.35).

### 5.4 Comprobación de la convención del signo de $a_1$

Hay dos formas de comprobar que has usado la convención correcta:

**(1) Con los datos de la parte 2.** El cociente $R_{sal}(1)/R_{sal}(0)$ debe ser $+0.7$ con polo en $+0.7$ (convención MATLAB) o $-0.7$ con polo en $-0.7$:

```matlab
fprintf('R_sal(1)/R_sal(0) = %.3f\n', Rx(2)/Rx(1));      % +0.7 -> convención MATLAB
```

**(2) Contraste de ambos signos con la PSD predicha:**

```matlab
for s = [-0.7, +0.7]
    Hs = 1 ./ (1 + s*exp(-1j*2*pi*f/fs));
    e  = median(abs(Sx - abs(Hs).^2.*Sin) ./ Sx);
    fprintf('a1 = %+.1f -> error relativo mediano %.1f %%\n', s, 100*e);
end
```

Con el signo correcto el error es de pocos por ciento; con el incorrecto es enorme (curvas totalmente distintas).

### 5.5 Comprobación opcional en el dominio del tiempo

Si `signalENTRADA` es la entrada **exacta** que generó `signal1ERG`, al filtrarla debes recuperar la salida:

```matlab
y = filter(1, [1 a1], xin);
fprintf('Diferencia maxima (excluyendo transitorio): %.2e\n', ...
        max(abs(y(200:end) - xr(200:end))));
```

Un resultado cercano a cero (del orden de $10^{-10}$ o menor) confirma a la vez que las dos señales corresponden a la misma realización y que el filtro es el correcto. Si no es cero, no pasa nada: puede ser otra realización del mismo proceso. En ese caso solo es válido el contraste estadístico de §5.2.

---

## 6. Cómo generar un proceso WSS con un espectro dado

Pregunta del guion: «Razone cómo se podría generar un proceso aleatorio estacionario en sentido amplio con un comportamiento en frecuencia dado».

**Idea:** usar la relación $S_Y=\lvert H\rvert^2S_X$ al revés. Si parto de un ruido blanco (PSD plana y conocida) y lo paso por un filtro, la PSD de la salida es la forma del filtro. Así que basta **diseñar el filtro**.

**Procedimiento:**

1. Se parte de **ruido blanco** $w(n)$, de media cero y varianza $\sigma_w^2$ (por ejemplo `randn` escalado), con $S_w(f)=\sigma_w^2$. Si se quiere un proceso gaussiano, el ruido blanco debe ser gaussiano.
2. Se fija la PSD deseada $S_d(f)$, que debe ser **real, par y no negativa**.
3. Se diseña un filtro estable $H(f)$ tal que

$$\lvert H(f)\rvert^2=\frac{S_d(f)}{\sigma_w^2}\quad\Longrightarrow\quad\lvert H(f)\rvert=\frac{\sqrt{S_d(f)}}{\sigma_w}$$

   La fase del filtro es libre (no afecta a la PSD).
4. Se filtra: $y=\text{filter}(b,a,w)$. La salida es WSS con $S_Y(f)=\lvert H(f)\rvert^2\sigma_w^2=S_d(f)$. Si $w$ es gaussiano, $y$ es **gaussiano** (operación lineal), y por tanto también estacionario en sentido estricto.
5. Se descartan las primeras muestras (**transitorio**) para que la salida ya esté en régimen estacionario.

**Cómo diseñar el filtro en la práctica:**

| Método | Función MATLAB | Idea |
|---|---|---|
| FIR por muestreo en frecuencia | `fir2`, `firls` | Se pide el módulo $\lvert H\rvert=\sqrt{S_d}/\sigma_w$ |
| Modelo AR (todo polos) | `aryule`, `levinson` | Se ajusta a la autocorrelación deseada $R_d(k)$ (transformada inversa de $S_d$) |
| IIR general | `invfreqz`, `yulewalk` | Se ajusta una respuesta racional al módulo deseado |

**Ejemplo de esta práctica.** El proceso de la parte 2 se obtiene con $\sigma_w^2$ dado y $H(z)=1/(1-0.7z^{-1})$: la PSD resultante es $\sigma_w^2/(1.49-1.4\cos\omega)$, paso bajo.

**Otro ejemplo (banda estrecha).** Para un proceso con potencia concentrada alrededor de $f_0$, se usa un filtro paso banda centrado en $f_0$ (por ejemplo, un filtro todo polos con un par de polos complejos conjugados cerca de la circunferencia unidad en $\omega_0=2\pi f_0/f_s$).

**Condición de realizabilidad.** Un filtro causal y estable solo puede dar PSD $S_d$ con $\int\ln S_d\,d\omega>-\infty$ (criterio de Paley-Wiener): $S_d$ no puede anularse en un intervalo de frecuencias. En la práctica se aproxima.

---

## 7. Script completo listo para ejecutar

Copia esto en un archivo `parte3.m`. Las funciones locales van **al final** del script (válido desde MATLAB R2016b; si tu versión es anterior, ponlas en archivos `.m` aparte).

```matlab
%% PRÁCTICA 1 - PARTE 3: FILTRADO DE PROCESOS ALEATORIOS
clear; close all; clc;
fs = 8000;  Kmax = 127;  a1 = -0.7;
f  = linspace(-fs/2, fs/2, 2001).';

%% ===== Punto 1: autocorrelación y PSD de la entrada =====
xin   = cargar_vector('signalENTRADA');
Lin   = length(xin);
mt_in = mean(xin);
Rin   = autocorr_temporal(xin, Kmax);
Sin   = psd_desde_R(Rin, f, fs);

fprintf('Entrada: L = %d, m_t = %.5f, R_ent(0) = %.4f\n', Lin, mt_in, Rin(1));
fprintf('max|R_ent(k>=1)| = %.5f  (umbral 3R(0)/sqrt(L) = %.5f)\n', ...
        max(abs(Rin(2:end))), 3*Rin(1)/sqrt(Lin));
fprintf('PSD entrada: media %.4f, desv. tipica %.4f (%.1f %%)\n', ...
        mean(Sin), std(Sin), 100*std(Sin)/mean(Sin));

Rfull = [fliplr(Rin(2:end)), Rin];
figure(1);
subplot(2,1,1); stem(-Kmax:Kmax, Rfull); grid on; xlabel('k'); title('R_{ent}(k)');
subplot(2,1,2); stem(1:Kmax, Rin(2:end)); grid on; xlabel('k'); title('R_{ent}(k), k \geq 1');

figure(2); plot(f, Sin); grid on; hold on;
plot(f, mean(Sin)*ones(size(f)), 'r--', 'LineWidth', 1.5);
xlabel('f (Hz)'); ylabel('S_{ent}(f)'); title('PSD de la entrada'); ylim([0, 2*mean(Sin)]);

figure(3); histogram(xin, 60, 'Normalization','pdf'); hold on; grid on;
sg = sqrt(Rin(1) - mt_in^2);  xx = linspace(-4*sg, 4*sg, 400);
plot(xx, exp(-(xx-mt_in).^2/(2*sg^2))/(sqrt(2*pi)*sg), 'r', 'LineWidth', 1.5);
title('Histograma de la entrada y gaussiana');

%% ===== PSD de la salida (parte 2) =====
xr = cargar_vector('signal1ERG');
Rx = autocorr_temporal(xr, Kmax);
Sx = psd_desde_R(Rx, f, fs);
fprintf('R_sal(1)/R_sal(0) = %.3f (esperado +0.7 con la convención de MATLAB)\n', Rx(2)/Rx(1));

%% ===== Punto 2: contraste con |H|^2 * S_ent =====
H     = 1 ./ (1 + a1*exp(-1j*2*pi*f/fs));
Spred = abs(H).^2 .* Sin;

figure(4); hold on; grid on;
plot(f, Sx,    'b',   'LineWidth', 1.5);
plot(f, Spred, 'r--', 'LineWidth', 1.5);
xlabel('f (Hz)'); ylabel('PSD');
legend('S_X(f) estimada (parte 2)', '|H(f)|^2 S_{ent}(f)');
title('S_{sal} = |H|^2 S_{ent}');

err_rel = abs(Sx - Spred) ./ Spred;
fprintf('Error relativo: max %.1f %%, mediano %.1f %%\n', 100*max(err_rel), 100*median(err_rel));

% Contraste de convenciones de signo
for s = [-0.7, +0.7]
    Hs = 1 ./ (1 + s*exp(-1j*2*pi*f/fs));
    e  = median(abs(Sx - abs(Hs).^2.*Sin) ./ Sx);
    fprintf('a1 = %+.1f -> error relativo mediano %.1f %%\n', s, 100*e);
end

% Filtro y PSD de entrada
figure(5);
yyaxis left;  plot(f, abs(H), 'LineWidth', 1.5); ylabel('|H(f)|');
yyaxis right; plot(f, Sin);                        ylabel('S_{ent}(f)');
ylim([0, 2*mean(Sin)]); xlabel('f (Hz)'); grid on;
title('Respuesta en frecuencia del filtro y PSD de la entrada');

%% ===== Comprobación en el tiempo (opcional) =====
y = filter(1, [1 a1], xin);
fprintf('Max |filter(entrada) - signal1ERG| (n>=200) = %.2e\n', max(abs(y(200:end) - xr(200:end))));

%% ===== FUNCIONES LOCALES =====
function x = cargar_vector(nombre)
    S = load(nombre);
    if isstruct(S), nm = fieldnames(S); x = S.(nm{1}); else, x = S; end
    x = x(:);
end

function Rt = autocorr_temporal(x, Kmax)
    x = x(:);  L = length(x);  Rt = zeros(1, Kmax+1);
    for k = 0:Kmax
        Rt(k+1) = sum(x(1:L-k) .* x(1+k:L)) / (L-k);
    end
end

function S = psd_desde_R(Rt, f, fs)
    Kmax = length(Rt) - 1;
    S = Rt(1) + 2 * cos(2*pi*f(:)*(1:Kmax)/fs) * Rt(2:end).';
end
```

---

## 8. Banco de preguntas con respuesta modelo

**1. ¿Qué es un ruido blanco?**
Un proceso de media cero cuyas muestras están incorreladas: $R(k)=\sigma^2\delta(k)$. Su PSD es constante, $S(f)=\sigma^2$.

**2. ¿Cómo se deduce del dato que la entrada es ruido blanco?**
Porque $R_{ent}(k)$ es un pico en $k=0$ y prácticamente cero para $k\neq0$, y $S_{ent}(f)$ es plana en toda la banda.

**3. ¿Por qué la PSD de la entrada no es exactamente plana?**
Por el error de estimación: se calcula con una realización finita y con $127$ retardos, lo que produce un rizado de unos pocos por ciento sin forma definida.

**4. ¿Qué relación hay entre las PSD de entrada y salida de un filtro lineal?**
$S_{sal}(f)=\lvert H(f)\rvert^2S_{ent}(f)$, siendo $H(f)$ la respuesta en frecuencia del filtro. La fase del filtro no afecta.

**5. ¿Qué tipo de filtro es $H(z)=1/(1-0.7z^{-1})$?**
Un filtro todo polos de primer orden y paso bajo, con un polo real en $z=0.7$ (estable).

**6. ¿Qué forma tiene la PSD de salida y por qué?**
Paso bajo, con forma $\sigma_w^2/(1.49-1.4\cos\omega)$: como la entrada es blanca, la forma la impone íntegramente el filtro.

**7. ¿Qué valor tiene la PSD de salida en $f=0$ y en $f=\pm4$ kHz?**
$\approx11.1\,\sigma_w^2$ y $\approx0.346\,\sigma_w^2$ respectivamente.

**8. ¿Por qué la salida es gaussiana?**
Porque una operación lineal (filtrado) sobre un proceso gaussiano da otro proceso gaussiano.

**9. ¿Por qué la autocorrelación de la salida decae como $0.7^{\lvert k\rvert}$?**
Porque $R_{sal}=R_{ent}*h(k)*h(-k)$ y, con entrada blanca, $R_{sal}(k)=\sigma_w^2\sum_i h(i)h(i+k)=\sigma_w^2\,0.7^{\lvert k\rvert}/(1-0.7^2)$.

**10. ¿Cómo se genera un proceso WSS con una PSD dada?**
Se pasa ruido blanco por un filtro estable cuyo módulo cumpla $\lvert H(f)\rvert^2=S_d(f)/\sigma_w^2$; la salida tiene PSD $S_d(f)$. Si el ruido es gaussiano, la salida también.

**11. ¿Por qué se puede usar una sola realización para la entrada?**
Porque el enunciado asume que el proceso es WSS y ergódico en la media y en la autocorrelación (y un ruido blanco iid lo es).

**12. ¿Qué indica que $S_{sal}$ y $\lvert H\rvert^2S_{ent}$ coincidan?**
Que se verifica con datos reales la relación teórica entre las PSD de entrada y salida de un sistema LTI.

---

## 9. Errores típicos

1. **Comparar escalas distintas.** $\lvert H\rvert$ (de 0.59 a 10) y $S_{ent}$ (de nivel $\sigma_w^2$) no tienen la misma escala: usa dos ejes (`yyaxis`) o `subplot`.
2. **Usar $\lvert H\rvert$ en lugar de $\lvert H\rvert^2$** en la relación entre PSD. Va al cuadrado.
3. **Olvidar multiplicar por $S_{ent}$** y dibujar solo $\lvert H\rvert^2$. Entonces las curvas difieren en un factor $\sigma_w^2$.
4. **Convención de signo del filtro.** Con $a_1$ de signo equivocado, la PSD predicha queda invertida (paso alto). Contrástalo con §5.4.
5. **Escala vertical autoescalada** en la PSD de entrada: el rizado parece enorme. Fija `ylim` alrededor del nivel medio.
6. **Concluir «no es blanco» por el rizado.** Una desviación del 5 % sin tendencia es compatible con blanco; lo relevante es que no haya forma.
7. **Eje de frecuencias.** Debe estar en Hz, de $-4000$ a $4000$.
8. **Evaluar $H$ en otro eje de frecuencias** distinto del de las PSD: todas las curvas deben compartir el vector `f`.
9. **Usar la PSD teórica ideal $\sigma_w^2\lvert H\rvert^2$ en lugar de la estimada** cuando el guion pide usar la PSD de la entrada obtenida de los datos (puedes añadirla como tercera curva, pero la comparación principal usa $S_{ent}$ estimada).
10. **No etiquetar** ejes, títulos y leyendas.

---

## 10. Autotest con datos sintéticos

Para practicar sin los ficheros reales, genera una entrada blanca gaussiana y su salida. Debes recuperar los valores teóricos de la tabla.

```matlab
L = 128000;  a1 = -0.7;
xin = randn(L,1);                      % ruido blanco gaussiano, sigma_w^2 = 1
xr  = filter(1, [1 a1], xin);          % salida (misma realización)
save('signalENTRADA_sint.mat', 'xin'); % opcional: guardarlos con otros nombres para probar tu script
```

| Magnitud | Valor teórico | Rango esperado en la estimación |
|---|---|---|
| $m_t$ (entrada) | $0$ | $\pm0.01$ |
| $R_{ent}(0)$ | $1$ | $1\pm0.01$ |
| $\max\lvert R_{ent}(k\geq1)\rvert$ | $0$ | $<0.0084$ (3 desv.) |
| Rizado de $S_{ent}$ | — | $\approx4.4\,\%$ (desv. tipica) |
| $R_{sal}(1)/R_{sal}(0)$ | $0.7$ | $0.70\pm0.01$ |
| $S_{sal}(0)$ | $11.11$ | $\approx11$–$12$ |
| $S_{sal}(\pm4\text{ kHz})$ | $0.346$ | $\approx0.35$ |
| Error relativo máx. $S_{sal}$ frente a $\lvert H\rvert^2S_{ent}$ | — | pocos % (en la prueba: $\approx2.5\,\%$) |

Ejercicio útil: cambia `a1` a `+0.7` y observa que $S_{sal}$ pasa a ser **paso alto** (máximo en $\pm4$ kHz). Es la forma más rápida de entender qué hace el signo de $a_1$.

---

## 11. Checklist para el examen

- [ ] Cargar `signalENTRADA` y calcular $m_t$, $R_{ent}(k)$ ($k=0..127$) y $S_{ent}(f)$ en Hz con las **mismas funciones** que en la parte 2.
- [ ] Dibujar $R_{ent}(k)$ (con simetría) y $S_{ent}(f)$ con el eje vertical fijado.
- [ ] Razonar: pico en $k=0$ + PSD plana ⇒ **ruido blanco** (gaussiano, por la linealidad del filtro). Nivel $=\sigma_w^2=R_{ent}(0)$.
- [ ] Evaluar $H(f)=1/(1+a_1e^{-j2\pi f/f_s})$ en el mismo eje de frecuencias.
- [ ] Superponer $S_X(f)$ (parte 2) con $\lvert H(f)\rvert^2S_{ent}(f)$ y **relacionarlo con la teoría** $S_{sal}=\lvert H\rvert^2S_{ent}$.
- [ ] Dibujar aparte $\lvert H(f)\rvert$ y $S_{ent}(f)$ (dos ejes) y comentar: filtro paso bajo, entrada plana, forma de la salida impuesta por el filtro.
- [ ] Contrastar el signo de $a_1$ con los datos.
- [ ] Explicar cómo generar un proceso WSS con espectro dado: ruido blanco + filtro con $\lvert H\rvert^2=S_d/\sigma_w^2$.
- [ ] Todas las figuras con ejes, título y leyenda.
