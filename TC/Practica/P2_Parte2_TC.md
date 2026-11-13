A esta Guía de estudio — Práctica 2, Parte 2
Modelado de la señal de voz como proceso aleatorio y transmisión sobre un canal con pérdidas (modelo 2: cadena de Markov)
Leyenda de la guía
Etiqueta	Significado
📄 ORIGINAL	Contenido (texto, código, valores, figuras) que figura en el material de la práctica.
🧑‍🏫 ACLARACIÓN	Explicación, deducción o ejemplo añadido para facilitar el estudio; no figura en el original.
⚠️ INCIDENCIA (In)	Discrepancia, ambigüedad o error potencial del original. Se señala, no se corrige en silencio.


0. Incidencias del material original (léelas primero)
ID	Dónde	Resumen	Efecto
I1	Evaluación	Las gráficas y el bucle usan realSignal2 / lossySignal2, pero las copias (= lossySignal) y la SNR usan realSignal / lossySignal.	No se puede garantizar que se comparen las mismas señales.
I2	Matriz de transición	quasicero se aplica a la matriz de conteos, no a las probabilidades. Las filas de estados nunca observados se vuelven uniformes (1/256 \approx 0.0039).	Para esos estados, la moda devuelve -128 y la ponderada -0.5 (ver §3.5 y §3.6).
I3	Prob. ponderada	La fórmula original aparece solo como imagen (figura_02_...png); no hay transcripción textual.	Se usa la expresión que implementa el código.
I4	Interpretación SNR	El texto dice "aproximadamente 30 veces más fuerte". Con los valores dados: \approx 34.8 y \approx 38.5 (potencia).	Orden de magnitud correcto, cifra imprecisa.
I5	Matriz de transición	El texto dice que "obtenemos la matriz de probabilidades de transición" y el bucle genera primero conteos (TransitionMatrix); las probabilidades llegan después.	Solo confusión de nombres.
I6	Datos heredados	s1…s5, realSignal, lossySignal no se definen en este documento; se "recuperan" de la Parte 1. También "Nos dan 8 señales" (solo se usan 5).	Las incidencias de la Parte 1 (archivo repetido, factor de escala) quedan fuera de lo verificable aquí.
I7	Redacción	"medios sin pérdidas" (casi seguro "con pérdidas"); erratas ("sustuir", "oren", "muestre", "asginar", "reconstruída", "suma total total"); delimitadores \mid, \mathrm con barra doble (artefacto de conversión); sound() sin frecuencia.	Cosmético.
I8	Salidas MATLAB	m, S, TransitionMatrix, TransitionProbabilityMatrix y los vectores de 256 elementos aparecen truncados.	No se pueden verificar valores no mostrados.
I9	max y empates	max devuelve el primer máximo. Si varias transiciones empatan, la moda toma el valor más negativo.	Comportamiento esperado, pero sesgado hacia valores bajos.


1. Introducción y objetivos
1.1. Planteamiento (📄)
Señal de voz digitalizada a 8 kHz y 8 bits, transmitida por un canal con pérdidas. Objetivo: modelar la señal para estimar las muestras que no llegan al receptor y reconstruir la señal con esas estimaciones.
frequency = 8000; % 8kHz
quasicero = 1e-15;
m=[-128:127]

m = 1×256
  -128  -127  -126  -125  -124  -123  -122  -121  -120  -119  -118  -117  -116

·	frequency: frecuencia de muestreo (Hz).
·	quasicero: valor muy pequeño (10^{-15}) para sustituir ceros.
·	m: vector con los 256 valores posibles de una muestra. Se usará como "etiqueta" de estados: el estado de índice k tiene valor m(k)=k-129.
1.2. Qué cambia respecto al modelo 1 (🧑‍🏫)
	Modelo 1 (Parte 1)	Modelo 2 (esta parte)
Modelo estadístico	Variable aleatoria S (muestras independientes)	Cadena de Markov de primer orden
Se estima	PMF P(S=s) — un vector de 256	Matriz de transición p_{ij} — 256 \times 256
Estimador	Una constante (moda o media)	Un valor que depende de la muestra anterior
Información usada	Ninguna sobre vecinas	La muestra inmediatamente anterior

Motivación. En la voz, muestras consecutivas están fuertemente relacionadas; si la muestra anterior es grande, la siguiente tiende a ser grande. Un modelo que ignora este hecho (modelo 1) desaprovecha información que el receptor sí tiene. 📄 El original afirma que este modelo "será mejor que el anterior"; los resultados (§4) lo respaldan.

2. Fundamentos teóricos
2.1. Propiedad de Markov
📄 Para predecir qué pasará después, solo importa dónde estamos ahora: no importa cómo se llegó ni qué pasó antes.
🧑‍🏫 En fórmula:
 P[X_{n+1}=j \mid X_n=i,\,X_{n-1}=i_{n-1},\dots,X_0=i_0]=P[X_{n+1}=j \mid X_n=i] 
El pasado (X_{n-1},\dots,X_0) no aporta nada una vez conocido X_n.
2.2. Estados y transiciones
📄 Dos ideas: los estados (situaciones posibles del sistema) y las transiciones (cambios de un estado a otro). Las probabilidades se asignan a las transiciones.
En la práctica: el estado es el valor de una muestra, un entero del conjunto \lbrace -128,\dots,127\rbrace \Rightarrow 256 estados. Una transición es el paso de una muestra a la siguiente.
📄 Como los datos son discretos, el proceso de Markov se llama cadena de Markov.
2.3. Cadena homogénea y de primer orden
·	📄 Homogénea: la probabilidad de ir de A a B en un paso no depende del instante en que se encuentra la cadena. (No homogénea: en caso contrario.)
·	📄 Primer orden: la transición depende solo del estado actual, no de la historia.
·	📄 La práctica asume ambas hipótesis.
🧑‍🏫 Son hipótesis de modelado, no hechos demostrados: la voz real no es exactamente una cadena de Markov homogénea (sus propiedades cambian entre silencio, vocales, consonantes…). Es una aproximación útil.
2.4. Probabilidad de transición y matriz de transición
📄 Para una cadena homogénea de primer orden:
 p_{ij}=P[X_{n+1}=j\mid X_n=i] 
·	X_n: valor de la muestra en el instante n.
·	i: estado actual; j: estado siguiente.
·	p_{ij}: probabilidad de que la siguiente muestra sea j dado que la actual es i (no depende de n: homogénea).
Variando i,j sobre los 256 estados se obtiene la matriz de probabilidades de transición P=[p_{ij}], de tamaño 256 \times 256.
🧑‍🏫 Propiedades (matriz estocástica): p_{ij} \ge 0 y cada fila suma 1:
 \sum_{j}p_{ij}=1\quad\forall i 
Interpretación: la fila i es la PMF de la muestra siguiente condicionada a que la actual vale i. En el modelo 1 había una única PMF; aquí hay 256 PMF, una por cada valor posible de la muestra anterior.
2.5. Estimación de la matriz por frecuencias relativas (🧑‍🏫)
Sea n_{ij} el número de veces que, en los datos, a una muestra de valor i le sigue una de valor j. Entonces:
 \hat p_{ij}=\frac{n_{ij}}{\displaystyle\sum_{j'}n_{ij'}} 
El denominador es el n.º de veces que i aparece como muestra con sucesora. Esto es exactamente lo que hace el código: primero cuenta (n_{ij}), luego normaliza cada fila.
2.6. Moda condicionada
📄 En el modelo 1 la moda era un número; ahora es un vector que asocia a cada valor anterior X[i-1]=m_k el valor X[i]=m_j que maximiza P[X[i]=m_j\mid X[i-1]=m_k]:
 \hat x_{\text{moda}}(m_k)=m_{j^*},\qquad j^*=\arg\max_j\ p_{kj} 
2.7. Probabilidad ponderada (esperanza condicionada)
📄 La muestra estimada viene dada por una probabilidad ponderada (la fórmula del original estaba en imagen; ver In3 y §3.6). 🧑‍🏫 La expresión implementada por el código es la esperanza condicionada:
 \hat x_{\text{pond}}(m_k)=E[X_n\mid X_{n-1}=m_k]=\sum_{j=1}^{256}m_j\,p_{kj} 
Por qué es buen estimador (🧑‍🏫). Condicionado a X_{n-1}=m_k, y con \mu_k=E[X_n\mid X_{n-1}=m_k], para cualquier valor c:
 E\big[(X_n-c)^2\mid X_{n-1}=m_k\big]=\underbrace{\mathrm{Var}(X_n\mid X_{n-1}=m_k)}_{\text{no depende de }c}+(\mu_k-c)^2 
(el término cruzado 2(\mu_k-c)\,E[X_n-\mu_k\mid\cdot] vale 0). Es mínimo para c=\mu_k: la esperanza condicionada minimiza el error cuadrático medio. Como la SNR mide energía de error (cuadrática), cabe esperar que este método supere a la moda, cuyo objetivo es acertar el valor exacto y no minimizar el error cuadrático.
2.8. Relación señal-ruido (SNR)
📄 Para k=1 (moda) y k=2 (ponderada):
 \mathrm{SNR}_k(\mathrm{dB})=10\log_{10}\frac{\displaystyle\sum_{n=1}^{N}x[n]^2}{\displaystyle\sum_{n=1}^{N}\big(x[n]-r_k[n]\big)^2} 
·	x[n]: señal enviada (real); r_k[n]: reconstrucción k; N: n.º total de muestras.
🧑‍🏫 Como el error solo existe en las posiciones perdidas \mathcal L=\lbrace 1,11,21,\dots\rbrace, el denominador es \sum_{n\in\mathcal L}(x[n]-r_k[n])^2. Y 10^{\mathrm{SNR}/10} es una relación de potencias (no de amplitudes).

3. Desarrollo de la práctica paso a paso
3.1. Base de datos de partida
Objetivo. Disponer de todas las muestras de entrenamiento.

Fundamento. Los datos de entrenamiento determinan el modelo estimado.
S = [s1;s2;s3;s4;s5]

S = 85502×1
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
    -1

Explicación. Se recupera el supervector S de la Parte 1 (📄 "recuperar de la anterior parte"): las 5 señales decodificadas apiladas en columna. N=85502 muestras. Las 14 primeras valen 0 y la 15.ª vale -1.
⚠️ I6. Las variables s1…s5 y su decodificación no se definen aquí.

3.2. Matriz de conteo de transiciones
Objetivo. Contar cuántas veces ocurre cada transición i \to j.

Fundamento. Frecuencias absolutas n_{ij} (§2.5).
TransitionMatrix = zeros([256,256]);

for i = 1:length(S) - 1
    TransitionMatrix(S(i) + 129, S(i + 1) + 129) = (TransitionMatrix(S(i) + 129, S(i + 1) + 129) + 1);
    % Esta línea cuenta cuántas veces ocurre cada transición entre los
    % valores de la señal.
    % S(i) me da el valor de la muestra. S(i + 1) me da el valor de la
    % muestra siguiente.
end

TransitionMatrix(TransitionMatrix==0) = quasicero

TransitionMatrix = 256×256
10^4 ×

    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000    0.0000
    ⋮

Explicación del código.
·	zeros([256,256]): matriz 256 \times 256; fila = estado actual i, columna = estado siguiente j.
·	El bucle recorre i = 1:length(S)-1 (hasta la penúltima muestra: la última no tiene sucesora \Rightarrow hay N-1=85501 transiciones).
·	S(i)+129 y S(i+1)+129: índices de fila y columna. Como m(k)=k-129, el valor v corresponde al índice v+129 (p. ej. -128 \to 1, 0 \to 129, 127 \to 256).
·	Cada pasada suma 1 a la celda (S(i)+129,\,S(i+1)+129).
·	La última línea sustituye por quasicero (10^{-15}) todas las celdas con conteo 0.
Lectura de la salida (📄 + 🧑‍🏫). El encabezado 10^4 × significa que los valores mostrados hay que multiplicarlos por 10^4 para obtener los reales (la escala común indica que hay conteos del orden de 10^4). Con 4 decimales, 0.0000 equivale a un valor real menor que 0.5. Como un conteo entero \ge 1 se mostraría como \ge 0.0001, las celdas visibles que aparecen como 0.0000 son las que valen quasicero (transiciones que no ocurren en los datos). Solo se ve una esquina de la matriz (In8).
🧑‍🏫 Observaciones.
·	La matriz TransitionMatrix contiene conteos, no probabilidades (In5).
·	Al concatenar las 5 señales se crean 4 transiciones "artificiales" (última muestra de un archivo \to primera del siguiente); efecto despreciable frente a 85501 transiciones.
·	🧑‍🏫 Con 65 536 parámetros (256^2) y solo \approx 8.5 \times 10^4 transiciones, muchas filas se estiman con muy pocos datos (estimaciones ruidosas), sobre todo para valores extremos de la señal.
·	🧑‍🏫 Aquí el índice es +129, coherente con m=[-128:127] y con la reconstrucción (§3.8). (En la Parte 1, el conteo usaba +128 mientras otras partes usaban +129; en esta parte la convención es consistente.)

3.3. Normalización por filas: matriz de probabilidades
Objetivo. Obtener \hat p_{ij}=n_{ij}/\sum_{j'}n_{ij'}.
TransitionProbabilityMatrix = TransitionMatrix./sum(TransitionMatrix, 2) % 

📄 "Pongo 2 para que la suma sea sobre cada fila y no columna."
TransitionProbabilityMatrix = 256×256

    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039    0.0039
    ⋮

Explicación del código.
·	sum(TransitionMatrix, 2): suma por filas\Rightarrow vector columna 256 \times 1 con n_i=\sum_j n_{ij}.
·	./: división elemento a elemento con expansión implícita: cada fila se divide entre su propia suma (MATLAB expande el vector columna a lo largo de las columnas).
·	Resultado: cada fila suma 1 (§2.4).
Interpretación de la salida: filas uniformes (🧑‍🏫 deducción).

El valor mostrado 0.0039 es 1/256=0.00390625. Esto es lo que ocurre en una fila cuyos 256 conteos eran 0: todos pasan a quasicero y
 \hat p_{ij}=\frac{10^{-15}}{256\cdot10^{-15}}=\frac{1}{256} 
Es decir, las primeras filas visibles (valores -128,-127,\dots) corresponden a estados que nunca aparecen como muestra actual en los datos de entrenamiento, y quedan con distribución uniforme (sin información).
⚠️ I2. quasicero se aplica sobre conteos y no sobre probabilidades (en la Parte 1 se aplicaba sobre la PMF). Efectos:
·	En filas observadas, sumar 10^{-15} a los ceros es despreciable (las probabilidades de relleno son \sim 10^{-15}/n_i).
·	En filas no observadas, convierte "sin datos" en "distribución uniforme", lo que condiciona la moda y la media de esos estados (§3.5 y §3.6).
·	Sin quasicero, esas filas darían 0/0=\text{NaN} (🧑‍🏫); este parche evita los NaN.

3.4. Representación gráfica de la matriz
figure;
imagesc(TransitionProbabilityMatrix)
colorbar


Cómo leer la figura (🧑‍🏫, deducido del código).
·	imagesc pinta cada elemento con un color según su valor; colorbar muestra la escala.
·	Eje vertical = fila i = estado actual (índice 1…256, valor =\text{índice}-129); eje horizontal = columna j = estado siguiente.
·	Una fila brillante en una zona estrecha = distribución muy concentrada (siguiente valor muy predecible); una fila de color uniforme = distribución plana (estado no observado o poco informativo, §3.3).
·	Esperable (no verificado con los datos): como las muestras vecinas de voz están correlacionadas, la masa de probabilidad se concentra cerca de la diagonal (j \approx i), y especialmente alrededor del 0.

3.5. Estimador 1: vector moda condicionada
Objetivo. Para cada posible valor anterior m_k, encontrar el valor siguiente más probable.

Fundamento. §2.6.
trendProbabilityValues = zeros(length(m),1)

trendProbabilityValues = 256×1
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     0
     ⋮

for k = 1:length(m)
    [~, trendProbabilityPosition] = max(TransitionProbabilityMatrix(k, :));
    trendProbabilityValues(k) = m(trendProbabilityPosition);
end

Explicación del código.
·	trendProbabilityValues: vector columna 256 \times 1 (inicializado a 0) que guardará, para cada estado k, su estimación.
·	TransitionProbabilityMatrix(k, :): fila k = PMF del siguiente valor dado el anterior m(k).
·	[~, pos] = max(...): se descarta el valor máximo (~) y se conserva su posición pos.
·	m(pos): convierte posición (columna) en valor de muestra (ya que m(c)=c-129).
·	Uso posterior: trendProbabilityValues(valor_anterior + 129) devuelve la estimación.
🧑‍🏫 Consecuencias.
·	Es una tabla de consulta (lookup table): la muestra anterior es el índice, la estimación es el contenido.
·	⚠️ I9 / I2. En empate, max devuelve la primera posición (valor más negativo). En filas uniformes (estados no observados) todas las probabilidades son iguales \Rightarrow posición 1 \RightarrowtrendProbabilityValues(k) = m(1) = -128. Esa estimación sería muy mala (extrema), aunque solo se usa si en la señal de prueba aparece como muestra anterior un valor nunca visto en el entrenamiento.

3.6. Estimador 2: probabilidad ponderada
Objetivo. Para cada valor anterior m_k, calcular la media de los valores siguientes ponderada por sus probabilidades.
📄 La muestra que se estima viene dada por una probabilidad ponderada.
⚠️ I3. La fórmula original aparece solo como imagen. La expresión que implementa el código, y que se corresponde con la esperanza condicionada (§2.7), es:
 \hat x_{\text{pond}}(m_k)=\sum_{j=1}^{256}m_j\,p_{kj} 
Implementación mediante bucle (📄 "Implemento la fórmula de la sumatoria a través de un bucle for"):
weightProbabilityValues = zeros(length(m),1)

weightProbabilityValues = 256×1
     0
     0
     0
     0
     0
     0
     0
     ⋮

for k = 1:length(m)
    weightProbabilityValues(k) = sum(m.* TransitionProbabilityMatrix(k, :));
end

📄 Nota: el operador .* le dice a MATLAB que multiplique cada posible valor que puede tomar cada muestra por su respectiva probabilidad.
Explicación del código.
·	m (1 \times 256) y TransitionProbabilityMatrix(k,:) (1 \times 256): .* multiplica elemento a elementom_j \cdot p_{kj}.
·	sum(...): suma los 256 términos \Rightarrow \sum_j m_j p_{kj} (un escalar por fila).
·	Resultado: weightProbabilityValues(k) = estimación para la muestra perdida cuando la anterior vale m(k).
🧑‍🏫 Observaciones.
·	Los valores no son enteros en general (a diferencia de la moda).
·	Para una fila uniforme (estado no observado): \sum_j m_j/256=\bar m=(-128+127)/2=-0.5. Es un valor "neutro" y moderado, mucho menos dañino que el -128 de la moda en esos casos.
·	Coherente con §2.7: es el estimador de mínimo error cuadrático condicionado.
·	Comparación con el modelo 1: allí era un único número; aquí es un vector de 256 estimaciones.

3.7. Evaluación: señales real y alterada
Objetivo. Disponer de la señal de prueba y de su versión tras el canal con pérdidas.
📄 "Recuperamos de la anterior parte nuestras variables realSignal y lossySignal (ahorramos así recursos de cómputo)":
figure;
plot([1:length(realSignal2)]/frequency, realSignal2)
title("Señal real representada en el dominio del tiempo")


figure;
plot([1:length(lossySignal2)]/frequency, lossySignal2)
title("Señal alterada representada en el dominio del tiempo")


Explicación.
·	[1:length(x)]/frequency: eje temporal en segundos (t_n=n/f_s).
·	Figura 2: señal enviada; Figura 3: señal recibida con el 10 % de muestras sustituidas.
🧑‍🏫 Contexto (de la Parte 1, no reproducido aquí). La pérdida se simulaba sustituyendo, cada 10 muestras (posiciones 1,11,21,\dots), el valor real por un entero aleatorio entre 1 y 10 (randi([1,10])). Los demás valores (9 de cada 10) llegan intactos.
⚠️ I1. Aquí las gráficas usan realSignal2 y lossySignal2, pero la reconstrucción parte de lossySignal y la SNR usa realSignal. Si las versiones con "2" y sin "2" son la misma señal (lo más probable, pero no confirmado), no hay problema; si no, la SNR no compararía lo mismo que se grafica.

3.8. Reconstrucción de la señal con ambos estimadores
Objetivo. Rellenar cada muestra perdida usando el vector asociado y la muestra anterior.

Fundamento. §2.6 y §2.7: \hat x[n]=v\big(x[n-1]\big), donde v es trendProbabilityValues o weightProbabilityValues.
trend_reconstructedSignal_Markov = lossySignal;
weightProbability_reconstructedSignal_Markov = lossySignal;

for row_index = 1:10:length(lossySignal2)
    if (row_index ~= 1)
        trend_reconstructedSignal_Markov(row_index, 1) = trendProbabilityValues(trend_reconstructedSignal_Markov(row_index - 1) + 129);
        weightProbability_reconstructedSignal_Markov(row_index, 1) = weightProbabilityValues(weightProbability_reconstructedSignal_Markov(row_index - 1) + 129);
        % Hacemos "row_index - 1" para recuperar el valor anterior de la
        % muestra.
    else
        % Hago este else para asginar un valor a la muestra número 1. Cómo
        % antes de este no hay ninguna muestra, asumo que es 0.
        trend_reconstructedSignal_Markov(row_index, 1) = trendProbabilityValues(0 + 129);
        weightProbability_reconstructedSignal_Markov(row_index, 1) = weightProbabilityValues(0 + 129);
    end
end

Explicación paso a paso.
1.	Se parten de dos copias de lossySignal.
2.	1:10:length(...): recorre las posiciones perdidas 1,11,21,\dots.
3.	Para row_index ≠ 1: se lee la muestra anterior (row_index - 1), se calcula su índice +129 y se consulta el vector correspondiente. El resultado sustituye a la muestra perdida.
4.	Para row_index = 1: no existe muestra anterior; se asume 0 y se consulta trendProbabilityValues(0 + 129) (el índice 129 corresponde al valor 0).
🧑‍🏫 Por qué funciona sin propagar errores. Las posiciones perdidas son n \equiv 1 \pmod{10}; la anterior, n-1 \equiv 0 \pmod{10}, nunca está perdida. Por tanto, la muestra anterior que se usa como contexto es siempre una muestra correctamente recibida (igual a la real). No hay propagación de errores de reconstrucción. (Si se perdieran muestras consecutivas habría que usar una muestra ya reconstruida, posiblemente no entera, y el uso como índice +129 fallaría para la ponderada.)
🧑‍🏫 Detalles.
·	Los valores de relleno aleatorios de lossySignal (1–10) no influyen en el resultado: se sobrescriben, y la muestra anterior no es una de ellas.
·	Con la moda, el relleno es entero; con la ponderada, generalmente no entero.
·	Solo 1 muestra de cada 10 se modifica; las otras 9 son idénticas a la señal real.

3.9. Gráficas de las señales reconstruidas
figure;
plot([1:length(trend_reconstructedSignal_Markov)]/frequency, trend_reconstructedSignal_Markov)
title("Señal reconstruída usando el método de la MODA")


figure;
plot([1:length(weightProbability_reconstructedSignal_Markov)]/frequency, weightProbability_reconstructedSignal_Markov)
title("Señal reconstruída usando el método de la PROBABILIDAD PONDERADA")


Qué aportan. Permiten comparar visualmente las reconstrucciones con la señal real (Figura 2) y con la alterada (Figura 3).
🧑‍🏫 Con solo un 10 % de las muestras modificado y un relleno que sigue el contexto, es esperable que las dos reconstrucciones se parezcan mucho a la original a simple vista; las diferencias finas entre métodos se aprecian mejor mediante la SNR (§3.10) que en las figuras.
📄 Para escucharlas se usaría sound().

3.10. Cálculo de la SNR
Objetivo. Cuantificar la calidad de cada reconstrucción.

Fundamento. §2.8.
📄 La SNR viene dada por la siguiente expresión:
 \mathrm{SNR}_k(\mathrm{dB})=10\log_{10}\frac{\displaystyle\sum_{n=1}^{N}x[n]^2}{\displaystyle\sum_{n=1}^{N}(x[n]-r_k[n])^2} 
donde x[n] es la señal enviada, r_k[n] las reconstrucciones (k=1: moda; k=2: probabilidad ponderada) y N el n.º total de muestras.
SNR1 = 10*log10(((realSignal'*realSignal))/((realSignal-trend_reconstructedSignal_Markov)'*(realSignal-trend_reconstructedSignal_Markov)))

SNR1 =

15.4107

SNR2 = 10*log10(((realSignal'*realSignal))/((realSignal-weightProbability_reconstructedSignal_Markov)'*(realSignal-weightProbability_reconstructedSignal_Markov)))

SNR2 =

15.8525

Explicación del código.
·	realSignal'*realSignal=\sum x[n]^2 (energía de la señal; vector columna transpuesto por sí mismo = escalar).
·	(realSignal - rec)'*(realSignal - rec)=\sum (x[n]-r_k[n])^2 (energía del error).
·	10*log10(...): conversión a dB.
⚠️ I1: realSignal frente a realSignal2 en las gráficas.
📄 Interpretación del original: "Obtenemos dos SNR positivas. ¿Qué implica? Pues que la señal es aproximadamente 30 veces más fuerte que el ruido. Además observamos que, la estimación usando el método de la probabilidad ponderada es mejor."
🧑‍🏫 Precisión (⚠️ I4): 10^{15.4107/10} \approx 34.8 y 10^{15.8525/10} \approx 38.5 en potencia; en amplitud, \approx 5.9 y \approx 6.2. "Aproximadamente 30" es un orden de magnitud correcto (15\ \text{dB} \approx 31.6).

3.11. Escucha
% sound(trend_reconstructedSignal_Markov)
% sound(weightProbability_reconstructedSignal_Markov)
% Redactado por Alexandru Theodor Muntenaş.

📄 Líneas comentadas: permitirían oír las reconstrucciones; cierre con la autoría.
🧑‍🏫 sound(x) sin frecuencia usa 8192 Hz por defecto (no 8000 Hz) y espera valores en [-1,1]; las señales aquí están en escala [-128,127], por lo que se recortarían (In7).

4. Resultados y análisis
4.1. Resultados numéricos (📄)
Magnitud	Valor
f_s / profundidad	8 kHz / 8 bits
N.º de estados	256
Muestras de entrenamiento N	85502
Tamaño de TransitionMatrix	256 \times 256
\mathrm{SNR}_1 (moda, Markov)	15.4107 dB
\mathrm{SNR}_2 (ponderada, Markov)	15.8525 dB

4.2. Qué representa cada figura
Figura	Archivo	Contenido
1	figura_01_matriz_probabilidades_transicion.png	\hat P (filas = estado actual; columnas = siguiente).
2	figura_03_senal_real_dominio_tiempo.png	Señal real.
3	figura_04_senal_alterada_dominio_tiempo.png	Señal tras el canal con pérdidas.
4	figura_05_reconstruccion_metodo_moda.png	Reconstrucción por moda condicionada.
5	figura_06_reconstruccion_probabilidad_ponderada.png	Reconstrucción por esperanza condicionada.

4.3. Interpretación de la SNR (🧑‍🏫, cálculos a partir de los valores dados)
	Moda	Ponderada
SNR (dB)	15.4107	15.8525
Razón de potencias 10^{\mathrm{SNR}/10}	\approx 34.8	\approx 38.5
Energía del error / energía de la señal	\approx 2.9\ \%	\approx 2.6\ \%

·	Diferencia entre métodos:15.8525-15.4107=0.4418\text{ dB} \Rightarrow cociente de energías de error 10^{0.04418} \approx 1.107. La moda comete \approx 10.7\ \% más energía de error que la ponderada.
·	Coherencia con la teoría: la esperanza condicionada minimiza el error cuadrático (§2.7), de modo que \mathrm{SNR}_2 > \mathrm{SNR}_1 es lo esperado.
4.4. Comparación con el modelo 1 (🧑‍🏫, con cautela)
Valores de la Parte 1: 9.8253 dB (moda) y 9.8361 dB (ponderada).
	Modelo 1	Modelo 2	Ganancia
Moda	9.8253	15.4107	+5.59 dB
Ponderada	9.8361	15.8525	+6.02 dB

Una ganancia de \approx 6\text{ dB} equivale a reducir la energía de error por un factor \approx 4. Esto respalda la afirmación del original (modelo 2 mejor que modelo 1).
⚠️ Cautela: esta comparación solo es rigurosa si ambas partes evalúan la misma señal de prueba y la misma pérdida (no confirmado; In1, In6). Además, la diferencia entre métodos es más marcada en el modelo 2 (0.44 dB) que en el modelo 1 (0.0108 dB, según la Parte 1).
4.5. Por qué la ponderada gana más en el modelo 2 (🧑‍🏫)
En el modelo 1 ambos estimadores eran constantes casi iguales (\approx 0), de ahí una diferencia mínima. En el modelo 2, la moda condicionada y la media condicionada pueden diferir bastante cuando la distribución del siguiente valor es dispersa o asimétrica (la moda ignora la forma de la distribución; la media la tiene en cuenta), y además la moda sufre en filas planas o con empates (I2, I9).

5. Conclusiones
1.	Qué se ha demostrado. Modelar la voz como cadena de Markov de primer orden y usar la muestra anterior como contexto permite reconstruir las muestras perdidas con una SNR de \approx 15.4\text{--}15.9\text{ dB} (📄), claramente superior a la del modelo sin memoria de la Parte 1 (\approx 9.8\text{ dB}; sujeto a la cautela de §4.4).
2.	Efecto de las pérdidas. Perder 1 de cada 10 muestras degrada la señal; con el modelo 2 el error de reconstrucción queda en \approx 2.6\text{--}2.9\ \% de la energía de la señal (cálculo propio a partir de las SNR).
3.	Comparación de métodos. La probabilidad ponderada (15.8525 dB) supera a la moda (15.4107 dB) en \approx 0.44\text{ dB} (📄 "es mejor"); es coherente con que la esperanza condicionada minimiza el error cuadrático.
4.	Mejor método según los datos: la probabilidad ponderada (modelo de Markov).
5.	Limitaciones del modelo (🧑‍🏫 salvo la primera, que enuncia el original):
o	Hipótesis de homogeneidad y primer orden (📄); la voz real las cumple solo aproximadamente.
o	Solo se usa la muestra anterior; la posterior (también recibida, x[n+1]) no se aprovecha.
o	Matriz con 65 536 parámetros estimada con \approx 8.5 \times 10^4 transiciones: filas poco pobladas son poco fiables; los estados no observados quedan con distribución uniforme (I2), lo que perjudica sobre todo a la moda.
o	Pérdida periódica y conocida, más simple que un canal real.
o	Evaluación con una señal de prueba y una ejecución; sin análisis de variabilidad.
o	Inconsistencias de nombres de variables (I1), no
