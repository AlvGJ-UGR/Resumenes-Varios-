# Práctica 1 de TC — Parte 2: Procesos aleatorios (MATLAB)

Guía completa para entender y reproducir la segunda parte de la práctica: promedios estadísticos, estacionariedad, promedios temporales, ergodicidad y densidad de potencia espectral (PSD).

## Índice

1. [Qué te piden y cómo se relacionan los apartados](#1-qué-te-piden-y-cómo-se-relacionan-los-apartados)
2. [Conceptos básicos desde cero](#2-conceptos-básicos-desde-cero)
3. [Preparación: cargar los datos y comprobar dimensiones](#3-preparación-cargar-los-datos-y-comprobar-dimensiones)
4. [Apartado a): media y autocorrelación estadísticas](#4-apartado-a-media-y-autocorrelación-estadísticas)
5. [Punto 2: pdf de orden 1 y de orden 2](#5-punto-2-pdf-de-orden-1-y-de-orden-2)
6. [Apartado b): media y autocorrelación temporales, ergodicidad](#6-apartado-b-media-y-autocorrelación-temporales-ergodicidad)
7. [Apartado c) y punto 4: densidad de potencia espectral](#7-apartado-c-y-punto-4-densidad-de-potencia-espectral)
8. [Script completo listo para ejecutar](#8-script-completo-listo-para-ejecutar)
9. [Banco de preguntas con respuesta modelo](#9-banco-de-preguntas-con-respuesta-modelo)
10. [Errores típicos](#10-errores-típicos)
11. [Autotest con datos sintéticos](#11-autotest-con-datos-sintéticos)
12. [Enlace con la parte 3](#12-enlace-con-la-parte-3)
13. [Checklist para el examen](#13-checklist-para-el-examen)

> **Aviso sobre los datos.** Esta guía no incluye los resultados numéricos de tus ficheros (`signal1`, `signal1ERG`), porque dependen de ellos. Sí incluye cómo obtenerlos, qué deberías ver y cómo razonarlo. Las fórmulas y el código se han comprobado con datos sintéticos de un proceso AR(1) con $a_1=-0.7$, que es el filtro que menciona el guion para la parte 3.

---

## 1. Qué te piden y cómo se relacionan los apartados

La parte 2 trabaja con **un único proceso aleatorio gaussiano $X(n)$, discreto en el tiempo**, mirado de dos formas distintas:

| Apartado | Fichero | Contenido | Tipo de promedio |
|---|---|---|---|
| a) | `signal1` | 2000 realizaciones, cada una con 128 instantes | **Estadístico** (entre realizaciones, a $n$ fijo) |
| b) | `signal1ERG` | 1 sola realización con 128000 instantes | **Temporal** (a lo largo del tiempo, en una realización) |
| c) | (sale de b) | — | **PSD** mediante Wiener-Khinchin |

El razonamiento que recorre toda la parte 2 es este:

1. Con muchas realizaciones calculas $m_X(n)$ y $R_X(n_1,n_2)$ y compruebas si el proceso es **estacionario en sentido amplio (WSS)**.
2. Con una realización muy larga calculas $m_t$ y $R_t(k)$ y los comparas con los estadísticos. Si coinciden, el proceso es **ergódico**.
3. Si es ergódico, $R_t(k)$ vale como $R_X(k)$ y su transformada de Fourier es la **PSD** $S_X(f)$.

---

## 2. Conceptos básicos desde cero

### 2.1 Proceso aleatorio, realización y muestra

Un **proceso aleatorio** $X(n,\xi)$ es una función de dos variables: el tiempo $n$ y el resultado aleatorio $\xi$ de un experimento.

- Fijando $\xi=\xi_i$ obtienes una **realización** (una señal concreta $x_i(n)$, una «tirada» del proceso).
- Fijando $n=n_0$ obtienes una **variable aleatoria** $X(n_0)$: su valor cambia de una realización a otra.

### 2.2 Cómo se ve esto en los datos de `signal1`

Es una matriz de **2000 realizaciones × 128 instantes**:

```
              n=1   n=2   ...  n=128
realización 1  x    x     ...   x       <- una fila = una señal en el tiempo
realización 2  x    x     ...   x
   ...
realización 2000 x  x     ...   x
                ^
                una columna = 2000 valores de la v.a. X(n)
```

- **Recorrer una fila** es avanzar en el tiempo dentro de una realización → promedio **temporal**.
- **Recorrer una columna** es mirar los 2000 posibles valores de $X(n)$ → promedio **estadístico**.

Esta distinción (filas frente a columnas) es la clave de toda la práctica.

### 2.3 Momentos de un proceso

| Magnitud | Definición | Qué mide |
|---|---|---|
| Media | $m_X(n)=E[X(n)]$ | Valor medio del proceso en el instante $n$ |
| Autocorrelación | $R_X(n_1,n_2)=E[X(n_1)\,X(n_2)]$ | Cuánto se parecen las muestras de dos instantes |
| Autocovarianza | $C_X(n_1,n_2)=R_X(n_1,n_2)-m_X(n_1)\,m_X(n_2)$ | Lo mismo, tras quitar las medias |
| Varianza | $\sigma_X^2(n)=C_X(n,n)$ | Dispersión en el instante $n$ |

> **Cuidado:** la autocorrelación es el momento conjunto **sin restar la media**. Si la media es cero, autocorrelación y autocovarianza coinciden.

### 2.4 Estacionariedad en sentido amplio (WSS)

$X(n)$ es WSS si se cumplen las dos condiciones a la vez:

$$m_X(n)=m\quad(\text{constante}),\qquad R_X(n_1,n_2)=R_X(k),\;\; k=n_2-n_1$$

Es decir: **la media no depende del instante y la autocorrelación solo depende de la distancia entre instantes**, no de dónde estén.

**Cómo se ve en la matriz $R_X$ (128×128):** cada diagonal tiene valor constante. La diagonal principal ($k=0$) vale $R_X(0)$, la primera diagonal ($k=1$) vale $R_X(1)$, etc. Una matriz así se llama **Toeplitz**.

**Propiedades de $R_X(k)$ en un WSS:**

1. $R_X(0)=E[X^2]$ es la **potencia media**.
2. **Par:** $R_X(-k)=R_X(k)$.
3. **Máxima en el origen:** $\lvert R_X(k)\rvert\le R_X(0)$.
4. Si hay media no nula, $R_X(k)\to m^2$ cuando $k\to\infty$.

### 2.5 Promedios temporales

Sobre una sola realización $x(n)$ de $L$ muestras:

$$m_t=\frac1L\sum_{n=1}^{L}x(n),\qquad R_t(k)=\frac1{L-k}\sum_{n=1}^{L-k}x(n)\,x(n+k)$$

Para una realización concreta son **números**. Pero si piensas en todas las realizaciones posibles, $m_t$ y $R_t(k)$ cambian de una a otra: son **variables aleatorias**.

### 2.6 Ergodicidad

Un proceso es **ergódico** (en la media y en la autocorrelación) si los promedios temporales coinciden con los estadísticos:

$$m_t=m_X,\qquad R_t(k)=R_X(k)$$

Formalmente, esto exige que $E[m_t]=m_X$, $E[R_t(k)]=R_X(k)$ y que **la varianza de $m_t$ y de $R_t(k)$ tienda a 0 cuando $L\to\infty$**. Es decir, una realización suficientemente larga «lo cuenta todo».

**Por qué importa.** En la práctica real solo tienes **una** señal medida. Si el proceso es ergódico, de esa única señal puedes estimar la media, la autocorrelación y la PSD del proceso entero.

**Relación entre conceptos:** la ergodicidad es una forma muy restrictiva de estacionariedad. No tiene sentido hablar de ergodicidad si el proceso no es antes estacionario.

### 2.7 PSD y teorema de Wiener-Khinchin

La **densidad de potencia espectral** $S_X(f)$ dice **cómo se reparte la potencia de la señal entre las frecuencias**. El teorema de Wiener-Khinchin la relaciona con la autocorrelación:

$$S_X(\omega)=\sum_{k=-\infty}^{\infty}R_X(k)\,e^{-j\omega k},\qquad \omega=2\pi\frac{f}{f_s}$$

Como $R_X(k)$ es real y par, queda

$$\boxed{S_X(f)=R_X(0)+2\sum_{k=1}^{K}R_X(k)\cos\!\left(2\pi\frac{f}{f_s}\,k\right)}$$

Propiedades: **real**, **par**, **no negativa**, **periódica** con periodo $f_s$, y su integral da la potencia total:

$$R_X(0)=\frac1{f_s}\int_{-f_s/2}^{f_s/2}S_X(f)\,df$$

> **Convenio de unidades.** Algunos textos multiplican la suma por $T_s=1/f_s$ para que $S_X$ quede en potencia por hercio. La forma de la curva es idéntica; solo cambia un factor de escala. Usa el convenio de tus apuntes de clase y sé coherente.

### 2.8 Proceso gaussiano

Si el proceso es gaussiano, **la media y la autocovarianza lo determinan por completo**: cualquier conjunto de muestras tiene pdf conjunta gaussiana de vector de medias $\mathbf m$ y matriz de covarianzas $K$. Esto es lo que permite el punto 2 de la práctica.

---

## 3. Preparación: cargar los datos y comprobar dimensiones

Los ficheros pueden ser `.mat` o texto. Para no depender del nombre de la variable:

```matlab
S = load('signal1');                 % si es .mat devuelve una estructura
if isstruct(S)
    nm = fieldnames(S);              % nombres de las variables dentro del fichero
    disp(nm)                         % mira cuál es la que contiene los datos
    X  = S.(nm{1});                  % se coge la primera; cámbiala si hace falta
else
    X  = S;                          % si era texto, load devuelve directamente la matriz
end
size(X)                              % ¿2000x128 o 128x2000?
```

**Orientación obligatoria:** filas = realizaciones, columnas = instantes.

```matlab
if size(X,1) < size(X,2)             % si viene 128x2000
    X = X.';                         % se transpone a 2000x128
end
[N, Ninst] = size(X);                % N = 2000, Ninst = 128
```

Si no compruebas esto, `mean(X,1)` calculará la media por el lado equivocado y todos los resultados serán incorrectos sin que MATLAB te avise.

---

## 4. Apartado a): media y autocorrelación estadísticas

### 4.1 Qué se calcula

$$\hat m_X(n)=\frac1N\sum_{i=1}^{N}x_i(n),\qquad \hat R_X(n_1,n_2)=\frac1N\sum_{i=1}^{N}x_i(n_1)\,x_i(n_2)$$

Son promedios **entre realizaciones, a $n$ fijo**. Como solo tienes $N=2000$ realizaciones, son **estimaciones**: tienen un pequeño error aleatorio.

### 4.2 Código

```matlab
mX = mean(X, 1);            % 1x128: media de cada columna (a n fijo)
RX = (X.' * X) / N;         % 128x128: RX(n1,n2)
```

**Por qué `X.'*X/N` calcula la autocorrelación.** El elemento $(n_1,n_2)$ de `X.'*X` es el producto escalar de la columna $n_1$ por la columna $n_2$, es decir $\sum_i x_i(n_1)\,x_i(n_2)$. Dividir entre $N$ lo convierte en promedio. No se resta la media porque la autocorrelación no la resta.

### 4.3 Gráfica que piden

Una figura con $m_X(n)$ y con $R_X(n,n+k)$ para $k=0,1,2$ (son las **tres primeras diagonales** de `RX`):

```matlab
n  = 1:Ninst;
R0 = diag(RX, 0);           % RX(n,n),    n = 1..128   (128 valores)
R1 = diag(RX, 1);           % RX(n,n+1),  n = 1..127   (127 valores)
R2 = diag(RX, 2);           % RX(n,n+2),  n = 1..126   (126 valores)

figure; hold on; grid on;
plot(n,           mX, 'k', 'LineWidth', 1.5);
plot(1:Ninst,     R0, 'b', 'LineWidth', 1.5);
plot(1:Ninst-1,   R1, 'r', 'LineWidth', 1.5);
plot(1:Ninst-2,   R2, 'g', 'LineWidth', 1.5);
xlabel('n'); ylabel('Valor');
legend('m_X(n)','R_X(n,n)','R_X(n,n+1)','R_X(n,n+2)');
title('Media y autocorrelación estadísticas');
```

`diag(RX,k)` devuelve la diagonal desplazada $k$ posiciones, es decir los elementos $R_X(n,n+k)$. Tiene $128-k$ valores, por eso el eje $n$ de cada curva cambia de longitud.

**Gráfica extra recomendada** para ver la estructura Toeplitz:

```matlab
figure; imagesc(RX); colorbar; axis square;
xlabel('n_2'); ylabel('n_1'); title('R_X(n_1,n_2)');
```

### 4.4 Cómo razonar si hay indicios de WSS

Se comprueban las dos condiciones sobre las curvas:

1. **¿Es $m_X(n)$ aproximadamente constante?** Debería oscilar alrededor de un valor (probablemente cerca de 0) sin tendencia.
2. **¿Es cada $R_X(n,n+k)$ aproximadamente constante en $n$?** Eso significa que la correlación depende solo de $k$.
3. **¿Se ordenan las curvas?** En un proceso con correlación que decae con el retardo, $R_X(0)>R_X(1)>R_X(2)$.

**Sobre el ruido de estimación.** Las curvas no serán perfectamente planas, y es normal. Con $N=2000$ realizaciones y datos gaussianos:

- La estimación de la media tiene una desviación del orden de $\sigma/\sqrt N\approx2.2\%\,\sigma$.
- La estimación de $R_X(0)$ tiene una desviación relativa de $\sqrt{2/N}\approx3.2\%$.

Por tanto, fluctuaciones de ese orden **sin tendencia** son compatibles con WSS. Lo que sería señal de **no estacionariedad** es una tendencia sistemática (curva que sube, baja o presenta forma periódica).

**Posible transitorio inicial.** Si el proceso se generó filtrando ruido (parte 3) sin descartar las primeras muestras, la varianza de las primeras muestras es menor que la final y crece hasta estabilizarse. Para un AR(1) con $a=0.7$ y $\sigma_w^2=1$:

$$\sigma^2(n)=\sigma_w^2\,\frac{1-a^{2n}}{1-a^2}\;\to\;\frac{\sigma_w^2}{1-a^2}\approx1.96\quad(\text{en unas 5–10 muestras})$$

Si ves un transitorio así al principio de $R_X(n,n)$, **coméntalo**: el proceso sería WSS salvo en ese transitorio inicial.

### 4.5 Redacción modelo de la conclusión

> «La media estadística $m_X(n)$ fluctúa alrededor de ___ sin tendencia apreciable, y las funciones $R_X(n,n+k)$ para $k=0,1,2$ son aproximadamente constantes en $n$, con valores aproximados ___, ___ y ___ respectivamente. Las pequeñas fluctuaciones se deben al número finito de realizaciones. Por tanto, hay indicios de que $X(n)$ es estacionario en sentido amplio.»

---

## 5. Punto 2: pdf de orden 1 y de orden 2

Como el proceso es **gaussiano**, su pdf de cualquier orden queda determinada por la media y la covarianza. Solo hay que calcular esos parámetros con los datos.

### 5.1 pdf de orden 1: $X(60)$

$X(60)$ es una variable aleatoria gaussiana:

$$X(60)\sim\mathcal N(\mu_{60},\sigma_{60}^2),\qquad f_{X(60)}(x)=\frac{1}{\sqrt{2\pi}\,\sigma_{60}}\exp\!\left\{-\frac{(x-\mu_{60})^2}{2\sigma_{60}^2}\right\}$$

con $\mu_{60}=m_X(60)$ y $\sigma_{60}^2=R_X(60,60)-m_X(60)^2$.

```matlab
n0    = 60;
mu    = mX(n0);
var60 = RX(n0,n0) - mX(n0)^2;       % varianza = C_X(60,60)
sig   = sqrt(var60);
fprintf('X(60) ~ N(mu = %.4f, sigma^2 = %.4f)\n', mu, var60);

x = linspace(mu-4*sig, mu+4*sig, 400);
f = exp(-(x-mu).^2/(2*var60)) / sqrt(2*pi*var60);

figure; hold on; grid on;
histogram(X(:,n0), 40, 'Normalization', 'pdf');   % histograma de los 2000 valores de X(60)
plot(x, f, 'r', 'LineWidth', 1.5);                 % pdf teórica
legend('Histograma', 'pdf gaussiana'); xlabel('x'); ylabel('f_{X(60)}(x)');
```

Comparar el histograma con la curva teórica **valida** que $X(60)$ es gaussiana.

> **Sobre el índice.** Se toma $n=60$ como la columna 60 (el primer instante es $n=1$). Si en tu enunciado o en clase el primer instante fuese $n=0$, sería la columna 61. Indícalo en el informe.

### 5.2 pdf conjunta de orden 2: $(X(16),X(30))$

Es un **vector gaussiano bidimensional** con

$$\mathbf m=\begin{bmatrix}m_X(16)\\ m_X(30)\end{bmatrix},\qquad K=\begin{bmatrix}C_X(16,16)&C_X(16,30)\\ C_X(30,16)&C_X(30,30)\end{bmatrix}$$

siendo $C_X(n_1,n_2)=R_X(n_1,n_2)-m_X(n_1)\,m_X(n_2)$. Su pdf es

$$f_{X(16),X(30)}(x_1,x_2)=\frac{1}{2\pi\,\lvert K\rvert^{1/2}}\exp\!\left\{-\tfrac12\,(\mathbf x-\mathbf m)^{T}K^{-1}(\mathbf x-\mathbf m)\right\}$$

```matlab
n1 = 16;  n2 = 30;
m2 = [mX(n1); mX(n2)];
K2 = [RX(n1,n1)-mX(n1)*mX(n1),  RX(n1,n2)-mX(n1)*mX(n2);
      RX(n2,n1)-mX(n2)*mX(n1),  RX(n2,n2)-mX(n2)*mX(n2)];
disp('Vector de medias:');          disp(m2);
disp('Matriz de covarianzas:');     disp(K2);
rho = K2(1,2) / sqrt(K2(1,1)*K2(2,2));
fprintf('Coeficiente de correlacion rho = %.4f\n', rho);

% Representación de la pdf conjunta
s1 = sqrt(K2(1,1));  s2 = sqrt(K2(2,2));
[x1,x2] = meshgrid(linspace(m2(1)-4*s1, m2(1)+4*s1, 120), ...
                   linspace(m2(2)-4*s2, m2(2)+4*s2, 120));
D  = [x1(:)-m2(1), x2(:)-m2(2)];
f2 = exp(-0.5*sum((D/K2).*D, 2)) / (2*pi*sqrt(det(K2)));
f2 = reshape(f2, size(x1));

figure; contour(x1, x2, f2, 15); grid on; axis equal;
hold on; plot(X(1:300,n1), X(1:300,n2), '.', 'MarkerSize', 4);   % algunos datos reales
xlabel('X(16)'); ylabel('X(30)'); title('pdf conjunta de (X(16), X(30))');
```

**Cómo funciona la línea de la pdf.** `D/K2` equivale a $D\,K^{-1}$, y multiplicando elemento a elemento por `D` y sumando por filas se obtiene la forma cuadrática $(\mathbf x-\mathbf m)^TK^{-1}(\mathbf x-\mathbf m)$ de cada punto de la rejilla.

**Qué comentar:**

- Si $C_X(16,30)\approx0$, las dos muestras están **incorreladas** y, por ser conjuntamente gaussianas, también son **independientes**. Los contornos son elipses con los ejes alineados con $X(16)$ y $X(30)$ (círculos si además las varianzas son iguales).
- Si $C_X(16,30)\neq0$, hay correlación y las elipses aparecen **inclinadas**.
- Con $n_2-n_1=14$ el retardo es grande. Si la correlación decae rápido, esperarás $\rho\approx0$.
- Si el proceso es WSS, $K$ debería tener las dos varianzas parecidas ($K_{11}\approx K_{22}$).

---

## 6. Apartado b): media y autocorrelación temporales, ergodicidad

### 6.1 Qué se calcula

Ahora hay **una sola realización** de $L=128000$ muestras. Los promedios se hacen a lo largo del tiempo (sobre el único vector):

$$m_t=\frac1L\sum_{n=1}^{L}x(n),\qquad R_t(k)=\frac1{L-k}\sum_{n=1}^{L-k}x(n)\,x(n+k),\quad k=0,\dots,127$$

**Por qué se divide por $L-k$.** Para un retardo $k$ solo hay $L-k$ parejas $(x(n),x(n+k))$ dentro de la señal. Dividir por ese número da el estimador **insesgado** ($E[R_t(k)]=R_X(k)$). Si se divide por $L$ se obtiene el estimador sesgado, que da PSD siempre no negativa; con $L=128000$ y $k\le127$ la diferencia es despreciable.

### 6.2 Código

```matlab
S = load('signal1ERG');
if isstruct(S), nm = fieldnames(S); x = S.(nm{1}); else, x = S; end
x = x(:);                       % vector columna
L = length(x);                  % 128000

mt = mean(x);                   % media temporal

Kmax = 127;
Rt = zeros(1, Kmax+1);          % Rt(k+1) = R_t(k), porque MATLAB indexa desde 1
for k = 0:Kmax
    Rt(k+1) = sum( x(1:L-k) .* x(1+k:L) ) / (L-k);
end
fprintf('Media temporal m_t = %.5f\n', mt);
fprintf('R_t(0) = %.4f, R_t(1) = %.4f, R_t(2) = %.4f\n', Rt(1), Rt(2), Rt(3));
```

**Explicación de la línea del bucle.** `x(1:L-k)` son las muestras $x(n)$ y `x(1+k:L)` son las muestras $x(n+k)$. El producto elemento a elemento y la suma dan $\sum_n x(n)x(n+k)$.

**Alternativa con la Signal Processing Toolbox:**

```matlab
Rt_full = xcorr(x, 127, 'unbiased');     % k = -127..127
Rt = Rt_full(128:end).';                 % se queda con k = 0..127
```

### 6.3 Comparación con el apartado a)

```matlab
fprintf('m_t = %.4f   frente a   media de m_X(n) = %.4f\n', mt, mean(mX));
fprintf('\n  k      R_t(k)     R_X(k) (estadistica)\n');
for k = 0:5
    fprintf('  %d   %9.4f   %9.4f\n', k, Rt(k+1), mean(diag(RX,k)));
end

figure; hold on; grid on;
stem(0:Kmax, Rt, 'b');
plot(0:5, arrayfun(@(k) mean(diag(RX,k)), 0:5), 'ro', 'MarkerSize', 8, 'LineWidth', 1.5);
xlabel('k'); legend('R_t(k) temporal', 'R_X(k) estadística');
title('Comparación de autocorrelaciones');
```

Se promedian las diagonales de `RX` porque, si el proceso es WSS, todos los elementos de una diagonal estiman el mismo $R_X(k)$ y promediarlos reduce el ruido.

### 6.4 Qué tendría que pasar para ser ergódico

(Es literalmente una pregunta del guion.)

1. El proceso debe ser **WSS** (se comprobó en el apartado a).
2. **Ergodicidad en la media:** $m_t$ debe coincidir con la media estadística $m_X$.
3. **Ergodicidad en la autocorrelación:** $R_t(k)$ debe coincidir con $R_X(k)$ para todo $k$.
4. Teóricamente, la **varianza** de los estimadores $m_t$ y $R_t(k)$ debe tender a 0 cuando $L\to\infty$. En la práctica, se aprecia porque con 128000 muestras el estimador es muy preciso y reproduce los valores de a).

### 6.5 Redacción modelo de la conclusión

> «La media temporal vale $m_t=\_\_\_$, que coincide (dentro del error de estimación) con la media estadística $m_X=\_\_\_$. La autocorrelación temporal $R_t(k)$ coincide con $R_X(k)$ obtenida en el apartado a) para $k=0,1,2,\dots$ Por tanto, hay indicios de que el proceso es ergódico en la media y en la autocorrelación.»

Se dice **«hay indicios»** y no «queda demostrado»: con datos finitos solo se puede comprobar de forma aproximada.

---

## 7. Apartado c) y punto 4: densidad de potencia espectral

### 7.1 Autocorrelación para retardos negativos

Se calculó $R_t(k)$ solo para $k\ge0$. Como el proceso es WSS, la autocorrelación es **par**:

$$R_X(-k)=R_X(k)$$

Esto responde a la pregunta del guion «¿qué valores tomaría para $k=-127,\dots,-1$?»: **los mismos que para $k=127,\dots,1$**.

```matlab
Rfull = [fliplr(Rt(2:end)), Rt];       % k = -127..127
kk    = -Kmax:Kmax;

figure;
subplot(2,1,1); stem(0:Kmax, Rt);  grid on; xlabel('k');
title('R_t(k), k = 0..127');
subplot(2,1,2); stem(kk, Rfull);   grid on; xlabel('k');
title('R_t(k), k = -127..127 (simétrica)');
```

### 7.2 Cálculo de $S_X(f)$ en Hz

$$S_X(f)=R_t(0)+2\sum_{k=1}^{127}R_t(k)\cos\!\left(2\pi\frac{f}{f_s}\,k\right),\qquad f_s=8000\ \text{Hz}$$

```matlab
fs   = 8000;
f    = linspace(-fs/2, fs/2, 2001);              % eje de frecuencias en Hz
k    = 1:Kmax;
SX   = Rt(1) + 2 * cos(2*pi*f(:)*k/fs) * Rt(2:end).';   % vector columna 2001x1

figure; plot(f, SX, 'LineWidth', 1.5); grid on;
xlabel('f (Hz)'); ylabel('S_X(f)');
title('Densidad de potencia espectral');
```

**Cómo funciona la línea de `SX`.** `f(:)*k` es una matriz 2001×127 con todos los productos $f\cdot k$. El coseno se aplica elemento a elemento y la multiplicación por el vector `Rt(2:end).'` realiza la suma ponderada $\sum_k R_t(k)\cos(\cdot)$ para cada frecuencia.

**Comprobación de la potencia** (debe dar $R_t(0)$):

```matlab
fprintf('Potencia por Rt(0): %.4f   Potencia por integral de S: %.4f\n', ...
        Rt(1), trapz(f, SX)/fs);
```

**Por qué no usar directamente `fft`.** La FFT trata el primer elemento como el instante 0 y, con la secuencia simétrica $k=-127..127$, introduce una fase por el desplazamiento de índices. Habría que reordenar con `ifftshift`. La fórmula con cosenos evita ese problema y sale real y simétrica automáticamente.

### 7.3 Qué características comentar de $S_X(f)$

| Característica | Explicación |
|---|---|
| **Real y par** | Porque $R_X(k)$ es real y par |
| **No negativa** | Una PSD es potencia por frecuencia; valores ligeramente negativos son errores numéricos por truncar $R_t$ en $\lvert k\rvert\le127$ |
| **Forma** | Una autocorrelación exponencial decreciente da una PSD **paso bajo** (máximo en $f=0$) |
| **Ancho de banda** | Cuanto **más rápido decae** $R_X(k)$, **más ancha** es $S_X(f)$, y al revés (dualidad tiempo-frecuencia) |
| **Periodicidad** | Periodo $f_s=8$ kHz; solo se dibuja $[-4,4]$ kHz |
| **Potencia total** | El área bajo $S_X$ (dividida entre $f_s$) es $R_X(0)$ |

### 7.4 Expectativa para tus datos (verifícala)

El guion dice en la parte 3 que el proceso se generó con un **filtro todo polos con $a_1=-0.7$**, es decir

$$x(n)=0.7\,x(n-1)+w(n),\qquad H(z)=\frac{1}{1+a_1z^{-1}}=\frac1{1-0.7z^{-1}}$$

Si la entrada $w(n)$ es ruido blanco de varianza $\sigma_w^2$ (lo que se comprueba en la parte 3), la teoría da

$$R_X(k)=\frac{\sigma_w^2}{1-0.7^2}\,0.7^{\lvert k\rvert},\qquad S_X(f)=\frac{\sigma_w^2}{\left\lvert1-0.7\,e^{-j2\pi f/f_s}\right\rvert^2}$$

- **Autocorrelación:** exponencial positiva decreciente, con $R_X(1)/R_X(0)=0.7$ y $R_X(2)/R_X(0)=0.49$. Puedes comprobar esas razones con tus datos.
- **PSD:** paso bajo con máximo en $f=0$ de valor $\sigma_w^2/0.3^2\approx11.1\,\sigma_w^2$ y mínimo en $f=\pm4$ kHz de valor $\sigma_w^2/1.7^2\approx0.35\,\sigma_w^2$.

**Comprobación cruzada que puedes añadir** (no necesita conocer $\sigma_w^2$, la deduce de $R_t(0)$):

```matlab
a1  = -0.7;
sw2 = Rt(1) * (1 - a1^2);                              % de R(0) = sw2/(1-a1^2)
Sth = sw2 ./ abs(1 + a1*exp(-1j*2*pi*f/fs)).^2;        % PSD teórica
hold on; plot(f, Sth, 'r--', 'LineWidth', 1.5);
legend('PSD estimada de R_t', 'PSD teórica AR(1)');
```

Si las dos curvas coinciden, tienes una validación muy sólida de todo el procedimiento. Pero **aclara en el informe** que es un contraste con la teoría basado en lo que dice el guion, no el resultado directo del apartado.

---

## 8. Script completo listo para ejecutar

Copia esto en un archivo `parte2.m` y ajusta los nombres de los ficheros/variables si hace falta.

```matlab
%% PRÁCTICA 1 - PARTE 2: PROCESOS ALEATORIOS
clear; close all; clc;
fs = 8000;                                   % frecuencia de muestreo (Hz)

%% ===== a) PROMEDIOS ESTADÍSTICOS (signal1: 2000 realizaciones x 128 instantes) =====
S = load('signal1');
if isstruct(S), nm = fieldnames(S); X = S.(nm{1}); else, X = S; end
if size(X,1) < size(X,2), X = X.'; end       % filas = realizaciones
[N, Ninst] = size(X);
fprintf('Realizaciones: %d, instantes: %d\n', N, Ninst);

mX = mean(X, 1);                             % media estadística (1x128)
RX = (X.' * X) / N;                          % autocorrelación estadística (128x128)

R0 = diag(RX,0);  R1 = diag(RX,1);  R2 = diag(RX,2);

figure(1); hold on; grid on;
plot(1:Ninst,   mX, 'k', 'LineWidth', 1.5);
plot(1:Ninst,   R0, 'b', 'LineWidth', 1.5);
plot(1:Ninst-1, R1, 'r', 'LineWidth', 1.5);
plot(1:Ninst-2, R2, 'g', 'LineWidth', 1.5);
xlabel('n'); legend('m_X(n)','R_X(n,n)','R_X(n,n+1)','R_X(n,n+2)');
title('Media y autocorrelación estadísticas');

fprintf('media(m_X) = %.4f, std(m_X) = %.4f\n', mean(mX), std(mX));
fprintf('R(k=0): media %.4f std %.4f\n', mean(R0), std(R0));
fprintf('R(k=1): media %.4f std %.4f\n', mean(R1), std(R1));
fprintf('R(k=2): media %.4f std %.4f\n', mean(R2), std(R2));

figure(2); imagesc(RX); colorbar; axis square; title('R_X(n_1,n_2)');

%% ===== Punto 2: pdf de orden 1 (n = 60) =====
n0 = 60;  mu = mX(n0);  var60 = RX(n0,n0) - mX(n0)^2;  sig = sqrt(var60);
fprintf('X(%d) ~ N(%.4f, %.4f)\n', n0, mu, var60);
x = linspace(mu-4*sig, mu+4*sig, 400);
f1 = exp(-(x-mu).^2/(2*var60)) / sqrt(2*pi*var60);
figure(3); hold on; grid on;
histogram(X(:,n0), 40, 'Normalization','pdf'); plot(x, f1, 'r', 'LineWidth', 1.5);
title('pdf de X(60)'); legend('Histograma','pdf gaussiana');

%% ===== Punto 2: pdf de orden 2 (n1 = 16, n2 = 30) =====
n1 = 16; n2 = 30;
m2 = [mX(n1); mX(n2)];
K2 = [RX(n1,n1)-mX(n1)^2,          RX(n1,n2)-mX(n1)*mX(n2);
      RX(n2,n1)-mX(n2)*mX(n1),     RX(n2,n2)-mX(n2)^2];
disp('m ='); disp(m2); disp('K ='); disp(K2);
fprintf('rho = %.4f\n', K2(1,2)/sqrt(K2(1,1)*K2(2,2)));
s1 = sqrt(K2(1,1)); s2 = sqrt(K2(2,2));
[x1,x2] = meshgrid(linspace(m2(1)-4*s1,m2(1)+4*s1,120), linspace(m2(2)-4*s2,m2(2)+4*s2,120));
D  = [x1(:)-m2(1), x2(:)-m2(2)];
f2 = reshape(exp(-0.5*sum((D/K2).*D,2))/(2*pi*sqrt(det(K2))), size(x1));
figure(4); contour(x1,x2,f2,15); grid on; axis equal; hold on;
plot(X(1:300,n1), X(1:300,n2), '.', 'MarkerSize', 4);
xlabel('X(16)'); ylabel('X(30)'); title('pdf conjunta');

%% ===== b) PROMEDIOS TEMPORALES (signal1ERG: 1 realización x 128000) =====
S = load('signal1ERG');
if isstruct(S), nm = fieldnames(S); xr = S.(nm{1}); else, xr = S; end
xr = xr(:);  L = length(xr);
mt = mean(xr);
Kmax = 127;  Rt = zeros(1, Kmax+1);
for k = 0:Kmax
    Rt(k+1) = sum(xr(1:L-k) .* xr(1+k:L)) / (L-k);
end
fprintf('m_t = %.5f\n', mt);
fprintf('  k     R_t(k)    R_X(k)\n');
for k = 0:5, fprintf('  %d  %9.4f  %9.4f\n', k, Rt(k+1), mean(diag(RX,k))); end

%% ===== Punto 4: R_t(k) y simetría =====
Rfull = [fliplr(Rt(2:end)), Rt];
figure(5);
subplot(2,1,1); stem(0:Kmax, Rt); grid on; title('R_t(k), k = 0..127'); xlabel('k');
subplot(2,1,2); stem(-Kmax:Kmax, Rfull); grid on; title('R_t(k), k = -127..127'); xlabel('k');

%% ===== c) PSD =====
f  = linspace(-fs/2, fs/2, 2001);
SX = Rt(1) + 2 * cos(2*pi*f(:)*(1:Kmax)/fs) * Rt(2:end).';
figure(6); plot(f, SX, 'LineWidth', 1.5); grid on;
xlabel('f (Hz)'); ylabel('S_X(f)'); title('Densidad de potencia espectral');
fprintf('Potencia: R_t(0) = %.4f, integral de S/fs = %.4f\n', Rt(1), trapz(f,SX)/fs);

%% ===== Contraste con AR(1) a1 = -0.7 (opcional) =====
a1  = -0.7;
sw2 = Rt(1) * (1 - a1^2);
Sth = sw2 ./ abs(1 + a1*exp(-1j*2*pi*f/fs)).^2;
hold on; plot(f, Sth, 'r--', 'LineWidth', 1.5);
legend('PSD estimada','PSD teórica AR(1)');
```

---

## 9. Banco de preguntas con respuesta modelo

**1. ¿Qué diferencia hay entre promedio estadístico y promedio temporal?**
El estadístico promedia **entre realizaciones a un instante fijo** (columnas de `signal1`). El temporal promedia **a lo largo del tiempo en una sola realización** (el vector de `signal1ERG`). Para un proceso ergódico coinciden.

**2. ¿Qué dos condiciones definen un proceso WSS?**
Media constante y autocorrelación dependiente solo de la diferencia $k=n_2-n_1$.

**3. ¿Cómo se comprueba la WSS con los datos?**
Representando $m_X(n)$ y $R_X(n,n+k)$ para varios $k$ y comprobando que son aproximadamente constantes en $n$ (diagonales constantes de $R_X$).

**4. ¿Por qué las curvas no son perfectamente planas?**
Porque las medias y correlaciones son **estimaciones** con solo 2000 realizaciones; el error es del orden de unos pocos porcentaje y sin tendencia.

**5. ¿Por qué basta media y covarianza para caracterizar $X(60)$ y $(X(16),X(30))$?**
Porque el proceso es gaussiano: toda pdf conjunta de sus muestras es gaussiana y queda fijada por el vector de medias y la matriz de covarianzas.

**6. ¿Qué indica que $C_X(16,30)\approx0$?**
Las muestras están incorreladas y, al ser conjuntamente gaussianas, son independientes.

**7. ¿Qué es ergodicidad?**
Que los promedios temporales de una realización coinciden con los estadísticos: $m_t=m_X$ y $R_t(k)=R_X(k)$, con varianza de los estimadores tendiendo a 0 cuando la longitud tiende a infinito.

**8. ¿Por qué se divide por $L-k$ en $R_t(k)$?**
Porque para el retardo $k$ solo hay $L-k$ productos disponibles; así el estimador es insesgado.

**9. ¿Qué valores toma $R_X(k)$ para $k<0$?**
Los mismos que para $\lvert k\rvert$, porque $R_X(-k)=R_X(k)$ en un WSS.

**10. ¿Qué dice el teorema de Wiener-Khinchin?**
Que la PSD de un proceso WSS es la transformada de Fourier de su autocorrelación.

**11. ¿Por qué $S_X(f)$ es real y par?**
Porque $R_X(k)$ es real y par.

**12. ¿Qué relación hay entre el ancho de $R_X$ y el de $S_X$?**
Son inversas: una autocorrelación que decae rápido (señal poco correlada) da una PSD ancha; una que decae lenta da una PSD estrecha.

**13. ¿Cómo se pasa a frecuencia en Hz?**
Con $\omega=2\pi f/f_s$, de modo que $f\in[-f_s/2,f_s/2]=[-4000,4000]$ Hz para $f_s=8$ kHz.

**14. ¿Qué potencia total tiene el proceso y dónde se ve?**
$R_X(0)=E[X^2]$; también es el área bajo $S_X$ dividida entre $f_s$.

---

## 10. Errores típicos

1. **Orientación de la matriz.** Si `signal1` viene como 128×2000 y no la transpones, `mean(X,1)` promedia entre instantes. Mira siempre `size(X)`.
2. **Restar la media en $R_X$.** Eso es covarianza. La autocorrelación no resta la media.
3. **Dividir $R_t(k)$ entre $L$ en vez de entre $L-k$.** El insesgado usa $L-k$.
4. **Olvidar el desplazamiento de índices.** $R_t(k)$ está en `Rt(k+1)`.
5. **Longitudes distintas al dibujar.** `diag(RX,k)` tiene $128-k$ elementos; su eje $n$ debe tener esa longitud.
6. **Eje de frecuencias.** Debe estar en Hz, de $-4000$ a $4000$, no en rad/muestra ni de $0$ a $1$.
7. **Afirmar sin matizar.** Con datos finitos se dice «hay indicios de» WSS/ergodicidad.
8. **No etiquetar** ejes, títulos y leyendas.
9. **Interpretar $n=60$ sin aclarar el origen de índices** (columna 60 si $n$ empieza en 1).
10. **Confundir correlación y covarianza** al escribir la pdf de orden 2: en $K$ van las covarianzas.

---

## 11. Autotest con datos sintéticos

Para practicar sin tener los ficheros reales (y para comprobar que tu código funciona), genera datos de un AR(1) con $a_1=-0.7$ y pasa por tu código. Debes recuperar $R_X(0)\approx1.96$, $R_X(1)\approx1.37$, $R_X(2)\approx0.96$ si $\sigma_w^2=1$.

```matlab
a1 = -0.7;  N = 2000;  Ninst = 128;  burn = 500;   % burn: se descarta el transitorio inicial

% 2000 realizaciones de 128 muestras
w = randn(N, Ninst + burn);
X = filter(1, [1 a1], w, [], 2);       % filtra cada fila (dim = 2)
X = X(:, burn+1:end);                  % X es 2000 x 128

% 1 realización de 128000 muestras
xr = filter(1, [1 a1], randn(128000 + burn, 1));
xr = xr(burn+1:end);
```

Con estos `X` y `xr` ejecuta las secciones a), b) y c) del script. Comprueba:

| Magnitud | Valor teórico ($\sigma_w^2=1$) |
|---|---|
| $m_X(n)$ y $m_t$ | $0$ |
| $R_X(0)$ | $1/(1-0.49)=1.961$ |
| $R_X(1)$ | $0.7\cdot1.961=1.373$ |
| $R_X(2)$ | $0.49\cdot1.961=0.961$ |
| $S_X(0)$ | $1/0.3^2=11.11$ |
| $S_X(\pm4\ \text{kHz})$ | $1/1.7^2=0.346$ |

Si quitas el descarte inicial (`burn = 0`) verás el transitorio en $R_X(n,n)$ descrito en §4.4. Es un buen ejercicio para entender qué pasa cuando el proceso **no** es exactamente WSS al principio.

---

## 12. Enlace con la parte 3

La parte 3 reutiliza **las mismas herramientas** (`Rt` y la PSD) con el fichero `signalENTRADA`, la entrada del filtro que generó el proceso:

- Si la autocorrelación de la entrada es una delta ($R(0)\neq0$ y $R(k)\approx0$ para $k\neq0$) y su PSD es plana, la entrada es **ruido blanco**.
- Se comprueba entonces la relación entre PSD de salida y de entrada:

$$S_{\text{sal}}(f)=\lvert H(f)\rvert^2\,S_{\text{ent}}(f),\qquad H(f)=\frac1{1+a_1e^{-j2\pi f/f_s}}$$

Por eso conviene que guardes el cálculo de $R_t(k)$ y de la PSD como **funciones** reutilizables (en un script, las funciones locales van al final del archivo):

```matlab
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

## 13. Checklist para el examen

- [ ] Cargar datos y **comprobar `size`** (filas = realizaciones).
- [ ] Calcular `mX = mean(X,1)` y `RX = X.'*X/N`.
- [ ] Dibujar $m_X(n)$ y las diagonales $k=0,1,2$ de $R_X$; **razonar WSS**.
- [ ] pdf de $X(60)$: media y varianza $=R_X(60,60)-m_X(60)^2$; fórmula gaussiana.
- [ ] pdf conjunta de $(X(16),X(30))$: $\mathbf m$, $K$ (con covarianzas), fórmula bidimensional y comentario de $\rho$.
- [ ] $m_t$ y $R_t(k)$ para $k=0..127$ con división por $L-k$.
- [ ] Comparar con a) y **concluir sobre ergodicidad** («hay indicios»).
- [ ] $R_t(k)$ y su simetría para $k<0$.
- [ ] PSD con eje en **Hz** ($-4000$ a $4000$) y comentario de características.
- [ ] Todas las figuras con ejes, título y leyenda.
