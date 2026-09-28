# 📚 Resumen Esquemático: Cuaderno de Prácticas de Señales Digitales

Este documento contiene un resumen completo, estructurado e ilustrativo del contenido técnico del cuaderno de prácticas de la asignatura **Señales Digitales** (Universidad de Granada).

---

## 🛠️ Práctica 0: Introducción a MATLAB™
**Objetivo:** Familiarizarse con el entorno MATLAB, generar/visualizar secuencias discretas y entender exponenciales reales y complejas.

### 1. Impulso Unitario $\delta(n - n_0)$
* **Definición matemática:**
  $$\delta(n - n_0) = \begin{cases} 1 & \text{si } n = n_0 \\ 0 & \text{si } n \neq n_0 \end{cases}$$
* **Visualización en MATLAB:** 
  * `stem(n, x)`: Representación propia de señales en tiempo discreto (puntos sobre tallos).
  * `plot(n, x)`: Conecta puntos de forma continua (no refleja la naturaleza discreta).
* **Tren de impulsos periódico:**
  $$S(n) = \sum_{l=0}^{M-1} A \cdot \delta(n - l P)$$
  * *Vectorización en MATLAB:* Evita bucles `for` usando indexado por pasos: `s(1:P:M*P) = A`.

### 2. Señales Sinusoidales Discretas
* **Expresión general:**
  $$X(n) = A \cos(\omega n - \theta)$$
* **Periodicidad:** A diferencia del tiempo continuo, en discreto la señal sólo es periódica si la frecuencia angular $\omega = 2\pi f$ es un múltiplo racional de $2\pi$ (es decir, si la frecuencia normalizada $f = F/F_s$ es un número racional $\mathbb{Q}$).
* **Comandos clave:** Uso de `subplot(filas, columnas, pos)` para comparar gráficos en una única figura.

### 3. Exponenciales Reales y Decrecientes
* **Ecuación general:** $Y(n) = a^n, \quad n_0 \le n \le n_0 + L$.
* **Operaciones elemento a elemento:** MATLAB usa el punto `.` (ej. `a.^nn`, `.*`, `./`).
* **Suma finita de exponenciales decrecientes ($|a|<1$):**
  $$\sum_{n=N}^{L} a^n = \frac{a^N - a^{L+1}}{1 - a}$$

### 4. Exponenciales Complejas
* **Fórmula de Euler:**
  $$x(n) = r e^{j(\omega n + \theta)} = r \left[ \cos(\omega n + \theta) + j \sin(\omega n + \theta) \right]$$
* **Propiedades y funciones de MATLAB:**
  * `real(x)` obtiene la parte real ($\cos$) y `imag(x)` la parte imaginaria ($\sin$).
  * En el plano complejo (Representación polar): Representa una rotación sobre una circunferencia de radio $r$ centrada en $(0,0)$, donde $\omega$ determina el salto angular entre muestras consecutivas.

---

## 🎙️ Práctica 1: Teorema del Muestreo
**Objetivo:** Comprender la conversión de señales analógicas a digitales, el concepto de frecuencia normalizada, el aliasing y el Teorema de Nyquist-Shannon.

### 1. Muestreo de una Señal Analógica
* **Definición:** Consiste en multiplicar una señal continua $s(t)$ por un tren de impulsos periódico $p(t) = \sum_{k=-\infty}^{\infty} \delta(t - k T_s)$:
  $$s(n) = s(t)\big|_{t = n T_s} = A \cos(2\pi F n T_s + \theta) = A \cos(2\pi f n + \theta)$$

### 2. Frecuencia Normalizada ($f$)
* **Relación:** 
  $$f = \frac{F}{F_s}$$
  Donde $F$ es la frecuencia continua (Hz) y $F_s = 1/T_s$ es la frecuencia de muestreo (Hz).
* **Rango fundamental:** $-1/2 < f < 1/2$ (correspondiente a $-\pi < \omega < \pi$).

### 3. Solapamiento / Aliasing y Frecuencias Imágenes
* Si $f$ sobrepasa el rango fundamental, la señal discreta no representa la señal analógica original y genera **aliasing**.
* **Fórmula de frecuencias imágenes:**
  $$f = \pm \left( n + \frac{F}{F_s} \right) \quad \text{o} \quad \omega = \pm 2\pi \left( n + \frac{F}{F_s} \right)$$
* La frecuencia percibida/reconstruida será aquella imagen que caiga dentro del intervalo $[-0.5, 0.5]$.

### 4. Teorema de Nyquist-Shannon
* **Enunciado:** Para reconstruir una señal continua de banda limitada de frecuencia máxima $F_m$ sin distorsión, la tasa de muestreo debe cumplir:
  $$F_s > 2 F_m$$
* **Herramienta espectral:** `magnitudespectra(x, Fs)` sirve para analizar la densidad espectral del módulo.
* **Calidades de audio comunes:** Telefonía ($8\text{ kHz}$), Radio ($11.025\text{ kHz}$), Cassette ($22.05\text{ kHz}$), CD ($44.1\text{ kHz}$).

---

## 🔄 Práctica 2: Convolución de Señales Discretas
**Objetivo:** Comprender y programar manualmente la suma de convolución discreta y aplicarla en audio (reverberación).

### 1. La Suma de Convolución Discreta
* **Expresión general:**
  $$y(n) = h(n) * x(n) = \sum_{k=-\infty}^{\infty} h(k) x(n - k)$$
* **Longitud del resultado:** Si $x(n)$ tiene longitud $N$ y $h(n)$ tiene longitud $M$, la longitud de la secuencia convolucionada $y(n)$ es:
  $$\text{Longitud}(y) = N + M - 1$$

### 2. Algoritmo de Implementación (Código $O(N \cdot M)$)
Para secuencias causales finitas que empiezan en $n=0$:
$$y(n) = \sum_{k=0}^{\min(n, M-1)} h(k) x(n - k), \quad 0 \le n \le N + M - 2$$
*(Nota: En MATLAB los vectores comienzan en índice $1$, requiriendo ajuste $h(k+1) \cdot x(n-k+1)$)*.

### 3. Aplicación Práctica: Reverberación por Convolución
* **Física del fenómeno:** Las reflexiones de acústica en recintos (duración $< 100\text{ ms}$) actúan como una respuesta impulsiva $h(n)$.
* **Procesado:**
  1. Cargar señal seca $x(n)$ y respuesta del recinto $h(n)$ con `[x, Fs] = audioread('archivo.wav')`.
  2. Convolucionar: $y(n) = x(n) * h(n)$.
  3. Reproducir con `soundsc(y, Fs)` para escuchar el sonido dentro del ambiente (hall, iglesia, etc.).

---

## ⚙️ Práctica 3: Sistemas Lineales e Invariantes en el Tiempo (LIT)
**Objetivo:** Caracterizar un sistema LIT mediante su Ecuación en Diferencias, Función de Transferencia $H(z)$, diagrama de Polos/Ceros y Respuesta en Frecuencia $H(\omega)$.

### 1. Representaciones de Sistemas LIT
1. **Ecuación en Diferencias (E.D.):**
   $$\sum_{k=0}^{N} a_k y(n-k) = \sum_{l=0}^{M} b_l x(n-l), \quad a_0 = 1$$
   Forma recursiva para cómputo: $y(n) = \sum_{l=0}^{M} b_l x(n-l) - \sum_{k=1}^{N} a_k y(n-k)$.
2. **Función de Transferencia $H(z)$:**
   $$H(z) = \frac{Y(z)}{X(z)} = \frac{\sum_{l=0}^{M} b_l z^{-l}}{\sum_{k=0}^{N} a_k z^{-k}}$$
3. **Respuesta en Frecuencia $H(\omega)$:** Evaluación de $H(z)$ en la circunferencia unidad ($z = e^{j\omega}$):
   $$H(\omega) = \frac{\sum_{l=0}^{M} b_l e^{-j l \omega}}{\sum_{k=0}^{N} a_k e^{-j k \omega}}$$

### 2. Respuestas Características del Sistema
* **Respuesta al Impulso $h(n)$:** Salida $y(n)$ cuando la entrada es $x(n) = \delta(n)$.
* **Respuesta al Escalón:** Salida $y(n)$ ante $x(n) = u(n)$. Permite estudiar:
  * **Régimen permanente ($y_{perm}$):** Valor constante al alcanzarse el estado estable.
  * **Respuesta transitoria:** $y_{trans}(n) = y(n) - y_{perm}$.

### 3. Comandos MATLAB Clave
* `filter(b, a, x)`: Calcula la salida de un sistema dados los vectores de coeficientes $b$ (numerador) y $a$ (denominador).
* `zplane(b, a)` / `tf2zp(b, a)`: Muestra/Calcula las posiciones de polos y ceros en el plano Z.
  * *Criterio de Estabilidad:* Un sistema es causal y estable si todos sus polos están dentro de la circunferencia unidad ($|p_i| < 1$).
* `[H, W] = freqz(b, a, N, 'WHOLE')`: Obtiene la respuesta en frecuencia evaluando la Transformada Z sobre el círculo unidad.

---

## 🎨 Práctica 4: Estudio de Filtros Digitales mediante FDATool
**Objetivo:** Diseñar y analizar filtros digitales (IIR y FIR) mediante la herramienta gráfica `fdatool`.

### 1. Máscara de Especificación del Filtro
Parámetros clave de diseño:
* $F_s$: Frecuencia de muestreo.
* $F_{pass}, F_{stop}$: Frecuencia de corte de la banda de paso y de rechazo/atenuada.
* $A_{pass}$: Máximo rizado permitido en la banda de paso (dB).
* $A_{stop}$: Mínima atenuación requerida en la banda atenuada (dB).

### 2. Comparativa de Familias de Filtros IIR
| Tipo de Filtro IIR | Rizado en Banda de Paso | Rizado en Banda Atenuada | Caída / Transición | Orden Requerido para misma máscara |
| :--- | :--- | :--- | :--- | :--- |
| **Butterworth** | No (monótona) | No (monótona) | Lenta | El más alto |
| **Chebyshev Tipo I** | Sí | No | Intermedia | Medio |
| **Elíptico (Cauer)** | Sí | Sí | La más abrupta | **El más bajo** |

### 3. Interpretación Teórica de Gráficas
* **Efecto de Polos y Ceros:**
  * Los **ceros** introducen nulos/mínimos de atenuación profunda en el módulo $|H(\omega)|$.
  * Los **polos** generan picos o resaltes de amplificación en el módulo.
* **Rizado vs. Orden:** En filtros con rizado, el número de extremos locales en la banda de paso está directamente relacionado con el orden $N$ del filtro.
* **Retardo de Grupo $\tau_g(\omega)$:**
  $$\tau_g(\omega) = -\frac{d\theta(\omega)}{d\omega}$$
  Mide la no-linealidad de la fase. Si la fase es lineal, $\tau_g(\omega)$ es constante (ideal para evitar distorsión de fase en señales de audio/comunicaciones).
* **Respuesta en el Tiempo:** Cuanto más cercanos están los polos a la circunferencia de radio 1 ($|p| \approx 1$), más lenta es la atenuación de la respuesta impulsiva y más largo es el régimen transitorio.

---

## 🎛️ Práctica 5: Filtrado Digital Sobre Señales Reales
**Objetivo:** Diseñar e implementar filtros FIR e IIR en MATLAB para limpiar una señal de audio real (`canario.wav`) afectada por ruido de fondo.

### 1. Análisis Temporal y Espectral
* **Lectura:** `[x, Fs] = audioread('canario.wav')`.
* **Transformada Rápida de Fourier (FFT):** `X = fft(x)` permite identificar las bandas de frecuencia de la señal útil $[F_{min}, F_{max}]$ y del ruido.
* **Espectrograma:** `spectrogram(x, window, overlap, nfft)` representa la evolución del espectro en función del tiempo (Eje Y = Frecuencia, Eje X = Tiempo, Color = Magnitud en dB).

### 2. Diseño de Filtro FIR por el Método de Ventanas
Se calcula truncando la respuesta impulsiva ideal $h(n)$ con una función ventana $w(n)$ de longitud $M$:
$$b(n) = w(n) \cdot h(n), \quad 0 \le n \le M-1$$

* **Respuesta Impulsiva del Filtro Paso Banda Ideal:**
  $$h_d(n) = \begin{cases} \dfrac{\omega_{max} - \omega_{min}}{\pi} & \text{si } n = 0 \\[1ex] \dfrac{\sin(n\omega_{max})}{\pi n} - \dfrac{\sin(n\omega_{min})}{\pi n} & \text{si } n \neq 0 \end{cases}$$
* **Ventana de Hamming:** Diseñada para suavizar las discontinuidades en los bordes y reducir el fenómeno de Gibbs.
* **Comando alternativo:** `b = fir1(M-1, [Wmin/pi, Wmax/pi], 'bandpass', hamming(M))`.

### 3. Diseño de Filtro IIR mediante Transformación Bilineal
* **Método:** Mapea un filtro analógico continuo (ej. Butterworth) al dominio digital discreto sin aliasing de frecuencia.
* **Comando MATLAB:** `[b, a] = butter(orden/2, [f_min*2, f_max*2], 'bandpass')`.

### 4. Comparación de Filtros FIR vs. IIR

| Parámetro | Filtro FIR | Filtro IIR |
| :--- | :--- | :--- |
| **Respuesta al Impulso** | Finita | Infinita |
| **Estabilidad** | Siempre estable (no tiene polos finitos) | Depende de la posición de los polos |
| **Fase** | **Estrictamente Lineal** (sin distorsión de fase) | No lineal |
| **Orden Necesario** | Elevado para transiciones abruptas | Mucho menor para la misma exigencia |
| **Estructura** | No recursiva (convolución) | Recursiva (ecuación en diferencias) |