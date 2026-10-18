# Conversión analógico-digital (A/D)

Para **Señales Digitales de 2.º de Teleco**, la conversión **analógico-digital (A/D o ADC)** conviene entenderla como un proceso completo, porque conecta directamente con el teorema del muestreo que acabamos de ver.

La conversión analógico-digital consiste en transformar una señal analógica:

$$
x(t)
$$

en una representación digital que pueda procesar un ordenador, DSP, microcontrolador, FPGA, etc.

La idea general es:

$$
\boxed{
x(t)
\longrightarrow
x[n]
\longrightarrow
x_q[n]
\longrightarrow
\text{código binario}
}
$$

Hay que distinguir **tres conceptos diferentes**:

1. **Muestreo** → discretiza el tiempo.
2. **Cuantificación** → discretiza la amplitud.
3. **Codificación** → representa cada nivel de amplitud mediante bits.

Esta distinción es fundamental.

---

# 1. Señal analógica frente a señal digital

Una señal analógica $x(t)$ es continua tanto en el tiempo como en amplitud.

Por ejemplo:

$$
x(t)=2\cos(2\pi1000t)
$$

puede tomar cualquier valor temporal $t$ y cualquier valor de amplitud dentro de:

$$
[-2,2]
$$

En cambio, una señal digital tiene:

* tiempo discreto;
* amplitud discreta;
* representación binaria.

Por tanto:

$$
\boxed{
\text{Analógica}=
\text{tiempo continuo + amplitud continua}
}
$$

mientras que:

$$
\boxed{
\text{Digital}=
\text{tiempo discreto + amplitud discreta}
}
$$

---

# 2. La cadena completa de conversión A/D

Un ADC real forma parte de una cadena más amplia:

```text
                 SEÑAL ANALÓGICA
                       x(t)
                         │
                         ▼
               ┌─────────────────┐
               │ Filtro          │
               │ antialiasing    │
               └─────────────────┘
                         │
                         ▼
               ┌─────────────────┐
               │    MUESTREO     │
               │                 │
               │      fs         │
               └─────────────────┘
                         │
                         ▼
                       x[n]
                         │
                         ▼
               ┌─────────────────┐
               │ CUANTIFICACIÓN  │
               │                 │
               │      Q          │
               └─────────────────┘
                         │
                         ▼
                      xq[n]
                         │
                         ▼
               ┌─────────────────┐
               │   CODIFICACIÓN  │
               │    binaria      │
               └─────────────────┘
                         │
                         ▼
                  bits digitales
```

Cada bloque hace una cosa distinta.

---

# 3. Primer paso: filtro antialiasing

Antes de muestrear tenemos que controlar el contenido frecuencial de la señal.

Supongamos que nuestro ADC trabaja a:

$$
f_s=20\ \mathrm{kHz}
$$

Entonces su frecuencia de Nyquist es:

$$
f_N=\frac{f_s}{2}=10\ \mathrm{kHz}
$$

No queremos que entren al ADC componentes superiores a esa frecuencia, porque podrían producir aliasing.

Por tanto colocamos un filtro paso bajo:

$$
\boxed{\text{filtro antialiasing}}
$$

antes del ADC.

La cadena queda:

$$
x(t)
\rightarrow
H_{AA}(f)
\rightarrow
\text{muestreador}
$$

Idealmente queremos:

$$
X(f)=0
\qquad
|f|>\frac{f_s}{2}
$$

aunque en la práctica utilizamos un filtro con una banda de transición.

---

# 4. ¿Por qué hace falta?

Supongamos:

$$
f_s=10\ \mathrm{kHz}
$$

y llega una señal de:

$$
f=7\ \mathrm{kHz}
$$

Como:

$$
f_N=5\ \mathrm{kHz}
$$

la componente de 7 kHz sufrirá aliasing.

Su frecuencia aparente será:

$$
7-10=-3\ \mathrm{kHz}
$$

y para una señal real podemos hablar de un alias de:

$$
\boxed{3\ \mathrm{kHz}}
$$

Una vez digitalizada, **no podemos distinguir una componente original de 3 kHz de una de 7 kHz**.

Por eso el filtro debe estar **antes** del ADC.

---

# 5. Segundo paso: muestreo

Una vez limitada la banda, tomamos muestras.

Tenemos:

$$
x(t)
$$

y obtenemos:

$$
\boxed{x[n]=x(nT_s)}
$$

donde:

$$
T_s=\frac{1}{f_s}
$$

Por ejemplo, si:

$$
f_s=8000\ \mathrm{Hz}
$$

entonces:

$$
T_s=\frac{1}{8000}
=125\ \mu s
$$

Tomamos:

$$
x(0),x(125\mu s),x(250\mu s),x(375\mu s),\ldots
$$

Ahora el tiempo ya es discreto.

Pero hay algo importante:

> **La amplitud todavía puede ser continua.**

Por ejemplo:

$$
x[0]=1.37291
$$

$$
x[1]=1.48127
$$

$$
x[2]=1.58394
$$

etc.

Todavía no tenemos necesariamente valores representables con un número finito de bits.

---

# 6. Muestreo ≠ cuantificación

Esto es una distinción que debes tener clarísima.

Después del muestreo:

$$
\boxed{x[n]=x(nT_s)}
$$

tenemos:

* tiempo → discreto;
* amplitud → continua.

Después de la cuantificación:

$$
\boxed{x_q[n]=Q(x[n])}
$$

tenemos:

* tiempo → discreto;
* amplitud → discreta.

Por tanto:

```text
x(t)
 │
 │ Muestreo
 ▼
x[n]
 │
 │ Cuantificación
 ▼
xq[n]
```

---

# 7. Tercer paso: cuantificación

Aquí aparece el segundo gran concepto.

Supongamos que el ADC puede aceptar tensiones entre:

$$
-1\ \mathrm{V}
$$

y:

$$
+1\ \mathrm{V}
$$

En principio existen infinitos valores posibles:

$$
0.271381\ldots
$$

$$
0.271382\ldots
$$

$$
0.271383\ldots
$$

etc.

Pero un ADC de $N$ bits solamente puede representar:

$$
\boxed{2^N}
$$

niveles distintos.

Por tanto tenemos que aproximar cada muestra a uno de esos niveles.

Eso es la **cuantificación**.

---

# 8. Ejemplo sencillo de cuantificación

Supongamos un ADC de:

$$
N=3\ \text{bits}
$$

Tenemos:

$$
2^3=8
$$

niveles posibles.

Supongamos que el rango es:

$$
[-1,+1]\ \mathrm{V}
$$

Una representación simplificada podría ser:

```text
+1 V        ───────── nivel 7
             │
+0.75 V     ───────── nivel 6
             │
+0.50 V     ───────── nivel 5
             │
+0.25 V     ───────── nivel 4
             │
 0 V        ───────── nivel 3
             │
-0.25 V     ───────── nivel 2
             │
-0.50 V     ───────── nivel 1
             │
-0.75 V     ───────── nivel 0
```

La señal analógica puede tener cualquier valor entre niveles, pero el ADC solamente puede producir uno de los valores permitidos.

---

# 9. Paso de una muestra al nivel cuantificado

Supongamos que tenemos:

$$
x[n]=0.63\ \mathrm{V}
$$

pero los niveles disponibles son:

$$
0.50\ \mathrm{V}
$$

y:

$$
0.75\ \mathrm{V}
$$

El ADC debe decidir a qué nivel pertenece.

Si redondea al más cercano:

$$
0.63\rightarrow0.75
$$

Por tanto:

$$
x_q[n]=0.75\ \mathrm{V}
$$

Hemos cometido un pequeño error.

---

# 10. Error de cuantificación

Definimos:

$$
\boxed{
e_q[n]=x_q[n]-x[n]
}
$$

En nuestro ejemplo:

$$
e_q[n]=0.75-0.63
$$

por tanto:

$$
\boxed{
e_q[n]=0.12\ \mathrm{V}
}
$$

Este error es inevitable en una cuantificación de precisión finita.

Y aquí aparece una diferencia fundamental:

### El aliasing

puede destruir información de forma irreversible.

### El error de cuantificación

es una aproximación de amplitud causada por utilizar un número finito de niveles.

Son fenómenos completamente distintos.

---

# 11. Resolución del ADC

Si tenemos un ADC de $N$ bits, tenemos:

$$
L=2^N
$$

niveles.

Si el rango total de entrada es:

$$
V_\mathrm{FS}=V_\mathrm{max}-V_\mathrm{min}
$$

el tamaño aproximado de un escalón es:

$$
\boxed{
\Delta=
\frac{V_\mathrm{FS}}{2^N}
}
$$

Este $\Delta$ se denomina normalmente **LSB** o tamaño de paso de cuantificación, con matices según la convención exacta de los códigos y los extremos.

---

# 12. Ejemplo de resolución

Tenemos un ADC de:

$$
N=12
$$

bits.

Por tanto:

$$
2^{12}=4096
$$

niveles.

Supongamos:

$$
V_\mathrm{min}=0
$$

y:

$$
V_\mathrm{max}=3.3\ \mathrm{V}
$$

Entonces aproximadamente:

$$
\Delta=
\frac{3.3}{4096}
$$

$$
\boxed{
\Delta\approx0.806\ \mathrm{mV}
}
$$

Esto significa que el ADC puede distinguir aproximadamente cambios de amplitud del orden de $0.8$ mV.

---

# 13. ¿Qué significa aumentar el número de bits?

Si pasamos de:

$$
N=8
$$

a:

$$
N=16
$$

tenemos:

### 8 bits

$$
2^8=256
$$

niveles.

### 16 bits

$$
2^{16}=65536
$$

niveles.

Por tanto, un ADC de 16 bits tiene una resolución muchísimo mayor.

La resolución mejora exponencialmente con el número de bits:

$$
\boxed{
L=2^N
}
$$

---

# 14. Cuantificación uniforme

La cuantificación más sencilla es la **cuantificación uniforme**.

Todos los niveles están separados por la misma cantidad:

$$
\Delta
$$

Por ejemplo:

```text
────┬────┬────┬────┬────┬────┬────
   q0   q1   q2   q3   q4   q5   q6

     ← Δ →
```

Esto es habitual en ADCs PCM lineales.

---

# 15. Cuantificador como función matemática

Podemos representar la cuantificación mediante una función:

$$
Q(x)
$$

de manera que:

$$
\boxed{
x_q[n]=Q(x[n])
}
$$

Para un cuantificador uniforme de redondeo:

$$
Q(x)=
\Delta
\operatorname{round}
\left(
\frac{x}{\Delta}
\right)
$$

con las correspondientes consideraciones de saturación en los extremos.

---

# 16. Saturación

¿Qué pasa si la señal supera el rango del ADC?

Supongamos:

$$
V_\mathrm{min}=-1\ \mathrm{V}
$$

$$
V_\mathrm{max}=+1\ \mathrm{V}
$$

y llega:

$$
x(t)=1.4\ \mathrm{V}
$$

El ADC no puede representar $1.4$ V.

Entonces normalmente se produce **saturación**:

$$
1.4\rightarrow1\ \mathrm{V}
$$

o al código máximo.

De manera similar:

$$
-1.4\rightarrow-1\ \mathrm{V}
$$

La saturación genera una distorsión importante.

---

# 17. Por tanto tenemos dos problemas diferentes

En un ADC real tenemos que preocuparnos de:

### 1. Rango

¿La señal cabe dentro del ADC?

Si no:

$$
\boxed{\text{saturación}}
$$

### 2. Resolución

¿Hay suficientes niveles para representar la señal con precisión?

Si no:

$$
\boxed{\text{error de cuantificación}}
$$

Y además:

### 3. Frecuencia

¿La señal está correctamente limitada respecto a $f_s$?

Si no:

$$
\boxed{\text{aliasing}}
$$

---

# 18. Los tres grandes errores

Podemos resumirlo así:

| Problema | Causa | Solución |
| --- | --- | --- |
| Aliasing | $f_s$ demasiado baja | aumentar $f_s$ / filtro antialiasing |
| Cuantificación | pocos bits | aumentar $N$ |
| Saturación | señal fuera del rango | adaptar ganancia/rango |

Esto es extremadamente importante para entender ADCs.

---

# 19. Cuarto paso: codificación

Una vez que hemos decidido qué nivel de cuantificación corresponde a cada muestra, debemos representarlo mediante bits.

Supongamos un ADC de 3 bits.

Tenemos:

$$
8
$$

niveles.

Podemos asociarlos a:

| Nivel | Código |
| ---: | :---: |
| 0 | 000 |
| 1 | 001 |
| 2 | 010 |
| 3 | 011 |
| 4 | 100 |
| 5 | 101 |
| 6 | 110 |
| 7 | 111 |

Entonces una muestra que cae en el nivel 5 se convierte en:

$$
\boxed{101}
$$

---

# 20. Ejemplo completo

Vamos a hacer una conversión completa.

Supongamos:

$$
x(t)
$$

una señal analógica entre:

$$
0\leq x(t)\leq1\ \mathrm{V}
$$

Tenemos un ADC de:

$$
N=3
$$

bits.

Y muestreamos a:

$$
f_s=8\ \mathrm{kHz}
$$

## Paso 1: muestreo

Tomamos:

$$
x[n]=x(nT_s)
$$

con:

$$
T_s=\frac{1}{8000}=125\ \mu s
$$

Supongamos que obtenemos:

$$
x[0]=0.10
$$

$$
x[1]=0.27
$$

$$
x[2]=0.61
$$

$$
x[3]=0.88
$$

etc.

## Paso 2: cuantificación

Tenemos:

$$
2^3=8
$$

niveles.

Aproximadamente:

$$
\Delta=\frac{1}{8}=0.125\ \mathrm{V}
$$

Entonces:

$$
0.10
$$

se aproxima a:

$$
0.125
$$

$$
0.27
$$

a:

$$
0.25
$$

$$
0.61
$$

a:

$$
0.625
$$

etc.

Por tanto:

$$
x_q[n]
$$

ya solamente puede tomar determinados valores.

## Paso 3: codificación

Cada nivel recibe un código binario.

Por ejemplo:

$$
0.125\rightarrow001
$$

$$
0.25\rightarrow010
$$

$$
0.625\rightarrow101
$$

etc.

Finalmente tenemos una secuencia de bits.

---

# 21. ¿Qué información se pierde durante el proceso?

Esta pregunta es muy importante.

En teoría, si cumplimos el teorema de muestreo:

$$
f_s>2B
$$

el **muestreo ideal** no tiene por qué perder información.

Es reversible mediante reconstrucción ideal.

Pero la cuantificación sí introduce un error porque:

$$
x[n]
$$

puede tomar infinitos valores mientras que:

$$
x_q[n]
$$

solamente puede tomar:

$$
2^N
$$

valores.

Por tanto:

$$
\boxed{
\text{muestreo ideal}
\rightarrow
\text{no pérdida de información}
}
$$

si se cumplen las condiciones del teorema.

Mientras que:

$$
\boxed{
\text{cuantificación}
\rightarrow
\text{error inevitable}
}
$$

para $N$ finito.

---

# 22. Error de cuantificación máximo

Para un cuantificador uniforme con redondeo, normalmente:

$$
-\frac{\Delta}{2}
\leq
e_q
\leq
\frac{\Delta}{2}
$$

Por tanto:

$$
\boxed{
|e_q|\leq\frac{\Delta}{2}
}
$$

Esto es muy importante.

Si:

$$
\Delta=1\ \mathrm{mV}
$$

el error máximo de cuantificación será aproximadamente:

$$
\boxed{0.5\ \mathrm{mV}}
$$

bajo ese modelo ideal.

---

# 23. El ruido de cuantificación

En muchas situaciones podemos modelar el error de cuantificación como un ruido aproximadamente aleatorio:

$$
e_q[n]
$$

y escribir:

$$
\boxed{
x_q[n]=x[n]+e_q[n]
}
$$

Esta es una aproximación muy útil en ingeniería.

El error de cuantificación no es literalmente ruido blanco en todas las circunstancias, pero bajo determinadas hipótesis se puede modelar así.

---

# 24. Potencia del ruido de cuantificación

Para un cuantificador uniforme ideal, con error uniformemente distribuido entre:

$$
-\frac{\Delta}{2}
$$

y:

$$
+\frac{\Delta}{2}
$$

la potencia media del error es:

$$
\sigma_q^2
=
\frac{\Delta^2}{12}
$$

Por tanto:

$$
\boxed{
P_q=\frac{\Delta^2}{12}
}
$$

Esta ecuación aparece muchísimo en teoría de ADCs.

---

# 25. Relación señal/ruido de cuantificación

Una métrica fundamental es:

$$
\mathrm{SNR}
=
\frac{P_\mathrm{señal}}{P_\mathrm{ruido}}
$$

En decibelios:

$$
\boxed{
\mathrm{SNR}_{dB}
=
10\log_{10}
\left(
\frac{P_s}{P_q}
\right)
}
$$

Para una sinusoide que ocupa aproximadamente todo el rango de un cuantificador ideal, aparece el famoso resultado:

$$
\boxed{
\mathrm{SNR}_{dB}
\approx
6.02N+1.76
}
$$

donde $N$ es el número de bits.

---

# 26. ¿De dónde sale el famoso 6.02 dB/bit?

Cada bit duplica el número de niveles:

$$
2^N
$$

y reduce aproximadamente a la mitad el tamaño del escalón:

$$
\Delta
\propto
2^{-N}
$$

La potencia del ruido es proporcional a:

$$
\Delta^2
$$

por tanto:

$$
P_q\propto2^{-2N}
$$

Cada bit adicional mejora la relación señal/ruido aproximadamente:

$$
10\log_{10}(4)
\approx6.02\ \mathrm{dB}
$$

Por eso:

$$
\boxed{
\text{+1 bit}\approx+6.02\ \mathrm{dB de SNR}
}
$$

para el modelo ideal.

---

# 27. Ejemplos de SNR ideal

Para:

$$
N=8
$$

tenemos:

$$
\mathrm{SNR}
\approx
6.02(8)+1.76
$$

$$
\boxed{
\mathrm{SNR}\approx49.9\ \mathrm{dB}
}
$$

Para:

$$
N=12
$$

$$
\mathrm{SNR}
\approx
74\ \mathrm{dB}
$$

aproximadamente.

Para:

$$
N=16
$$

$$
\mathrm{SNR}
\approx
98.1\ \mathrm{dB}
$$

aproximadamente.

En un ADC real, la SNR suele ser peor debido a ruido, distorsión, jitter, no linealidades, etc.

---

# 28. ¿Qué ocurre si aumentamos $f_s$?

Aumentar $f_s$ no mejora directamente la resolución en amplitud.

Por ejemplo:

### ADC A

$$
12\text{ bits},\quad 10\text{ kS/s}
$$

### ADC B

$$
12\text{ bits},\quad 1\text{ MS/s}
$$

Ambos tienen idealmente:

$$
2^{12}=4096
$$

niveles.

El segundo puede representar señales de mayor contenido frecuencial, pero no tiene automáticamente mayor resolución de amplitud.

---

# 29. ¿Qué ocurre si aumentamos los bits?

Si pasamos de:

$$
N=12
$$

a:

$$
N=16
$$

mantenemos el mismo límite de frecuencia si $f_s$ no cambia, pero obtenemos más niveles:

$$
4096
\rightarrow
65536
$$

y menor error de cuantificación.

Por tanto:

$$
\boxed{
N\rightarrow\text{resolución de amplitud}
}
$$

mientras:

$$
\boxed{
f_s\rightarrow\text{resolución temporal / ancho de banda representable}
}
$$

Esta distinción es fundamental.

---

# 30. Un ADC real

Un ADC no es simplemente un bloque matemático ideal.

En un sistema real podemos encontrar:

```text
             ADC REAL
                 │
        ┌────────┴────────┐
        │                 │
     Entrada          Referencia
     analógica         de tensión
        │                 │
        ▼                 │
    Sample & Hold         │
        │                 │
        ▼                 │
    Comparación ◄─────────┘
        │
        ▼
   Cuantificación
        │
        ▼
     Codificación
        │
        ▼
      Código
```

Dependiendo de la arquitectura, estos bloques se implementan de maneras diferentes.

---

# 31. Sample and Hold

Aquí aparece otro concepto importante:

$$
\boxed{\text{Sample and Hold (S/H)}}
$$

El ADC necesita tomar una muestra de la señal y mantenerla constante durante parte del proceso de conversión.

La idea:

```text
x(t)

     /\
    /  \      /\
   /    \    /  \
──/──────\──/────\─────

        ↓ muestreo

        ●
        │
        ├────────
        │
                ●
                │
                ├────────
```

Durante la conversión, la tensión de entrada queda aproximadamente congelada.

---

# 32. ¿Por qué hace falta mantenerla?

Imagina un ADC que necesita cierto tiempo para determinar el código.

Si la señal sigue cambiando durante la conversión:

$$
x(t_1)\neq x(t_2)
$$

el ADC podría estar intentando convertir una señal cuyo valor está cambiando.

El Sample-and-Hold permite:

$$
\boxed{
\text{capturar}\rightarrow\text{mantener}\rightarrow\text{convertir}
}
$$

---

# 33. Arquitecturas de ADC

En segundo de Teleco es habitual conocer las principales:

### Flash ADC

Muy rápido.

Utiliza muchos comparadores en paralelo.

### SAR ADC

**Successive Approximation Register.**

Muy utilizado porque ofrece buen compromiso entre:

* velocidad,
* resolución,
* consumo.

### ADC de doble rampa

Muy utilizado históricamente en instrumentación y multímetros.

### Sigma-Delta

Muy alta resolución.

Utiliza sobremuestreo y técnicas de conformación del ruido.

### Pipeline

Muy rápido y utilizado en sistemas de adquisición de alta velocidad.

---

# 34. Flash ADC

Un ADC Flash de $N$ bits necesita aproximadamente:

$$
2^N-1
$$

comparadores.

Por ejemplo, para:

$$
N=3
$$

tenemos:

$$
2^3-1=7
$$

comparadores.

Es muy rápido porque realiza muchas comparaciones simultáneamente.

Pero para muchos bits el número de comparadores crece exponencialmente.

Por eso:

$$
\boxed{
\text{Flash}\rightarrow\text{muy rápido, pero costoso en hardware}
}
$$

---

# 35. SAR ADC

El SAR es extremadamente importante en sistemas embebidos.

La idea es ir determinando los bits uno por uno.

Para un ADC de 4 bits:

```text
¿MSB = 1?
     │
     ▼
¿El valor supera el umbral?
     │
     ▼
decidir bit 2
     │
     ▼
decidir bit 1
     │
     ▼
decidir bit 0
     │
     ▼
código final
```

Es una especie de **búsqueda binaria**.

Por eso resulta mucho más eficiente que tener un comparador para cada nivel.

---

# 36. Ejemplo conceptual de SAR

Supongamos que queremos convertir:

$$
V_\mathrm{in}=2.1\ \mathrm{V}
$$

en un ADC de 3 bits con rango:

$$
0-4\ \mathrm{V}
$$

Primero prueba:

$$
100
$$

que corresponde aproximadamente a:

$$
2\ \mathrm{V}
$$

Como:

$$
2.1>2
$$

mantiene el bit.

Después prueba un nivel superior, etc.

Al final obtiene el código correspondiente al intervalo que contiene $2.1$ V.

---

# 37. Sigma-Delta

Los ADC sigma-delta son conceptualmente muy interesantes.

En lugar de simplemente utilizar una frecuencia de muestreo mínima, utilizan:

$$
\boxed{\text{sobremuestreo}}
$$

es decir:

$$
f_s\gg2B
$$

Además emplean técnicas de **noise shaping** para desplazar parte del ruido de cuantificación hacia frecuencias fuera de la banda de interés.

Después un filtro digital elimina ese ruido.

Es una arquitectura muy utilizada cuando interesa una gran resolución.

---

# 38. Sobremuestreo

El teorema dice que necesitamos:

$$
f_s>2B
$$

pero no prohíbe utilizar:

$$
f_s\gg2B
$$

Por ejemplo:

$$
B=20\ \mathrm{kHz}
$$

y:

$$
f_s=192\ \mathrm{kHz}
$$

Tenemos:

$$
f_s=4.8(2B)
$$

Estamos sobremuestreando.

Esto puede facilitar el diseño del filtro antialiasing y, en determinadas arquitecturas, mejorar el procesamiento del ruido.

---

# 39. Jitter

Hay otro efecto importante en ADCs reales:

$$
\boxed{\text{jitter de reloj}}
$$

El teorema ideal supone que tomamos muestras exactamente en:

$$
t=nT_s
$$

Pero en un ADC real:

$$
t_n=nT_s+\epsilon_n
$$

donde:

$$
\epsilon_n
$$

es un pequeño error temporal.

Esto se denomina **jitter**.

Para señales de alta frecuencia, pequeñas variaciones temporales pueden provocar errores importantes.

Por eso, en ADCs de alta velocidad, la calidad del reloj es fundamental.

---

# 40. Resumen matemático de toda la conversión

Podemos escribir el proceso ideal como:

### Señal analógica

$$
x(t)
$$

### Filtrado

$$
x_a(t)
$$

con:

$$
X_a(f)\approx0
\qquad
|f|>\frac{f_s}{2}
$$

### Muestreo

$$
x[n]=x_a(nT_s)
$$

### Cuantificación

$$
x_q[n]=Q(x[n])
$$

### Error de cuantificación

$$
e_q[n]=x_q[n]-x[n]
$$

### Codificación

$$
x_q[n]\longrightarrow b[n]
$$

donde $b[n]$ representa la secuencia de bits.

Por tanto:

$$
\boxed{
x(t)
\rightarrow
x[n]
\rightarrow
x_q[n]
\rightarrow
b[n]
}
$$

---

# 41. Diferencia entre muestreo, cuantificación y codificación

Quiero que esta tabla te quede muy clara:

| Proceso | ¿Qué discretiza? | Resultado |
| --- | --- | --- |
| Muestreo | Tiempo | $x[n]$ |
| Cuantificación | Amplitud | $x_q[n]$ |
| Codificación | Representación | bits |

Por tanto:

$$
\boxed{
\text{Muestreo}\neq\text{cuantificación}\neq\text{codificación}
}
$$

Aunque en un ADC real ocurran como partes del mismo proceso.

---

# 42. Una visión muy importante: ¿qué determina cada parámetro?

Piensa en un ADC mediante dos parámetros principales:

## Frecuencia de muestreo $f_s$

Determina qué contenido frecuencial podemos representar.

Idealmente:

$$
\boxed{
B<\frac{f_s}{2}
}
$$

---

## Número de bits $N$

Determina cuántos niveles de amplitud tenemos:

$$
\boxed{
L=2^N
}
$$

y por tanto la resolución:

$$
\boxed{
\Delta\approx\frac{V_\mathrm{FS}}{2^N}
}
$$

Así:

```text
             ADC

      ┌─────────────────┐
      │                 │
 fs ──┤ contenido       │
      │ frecuencial     │
      │                 │
 N  ──┤ resolución      │
      │ amplitud        │
      └─────────────────┘
```

---

# 43. Ejemplo completo de diseño

Supongamos que queremos digitalizar una señal de:

$$
B=15\ \mathrm{kHz}
$$

con un rango:

$$
-2\leq x(t)\leq2\ \mathrm{V}
$$

y queremos una resolución aproximada inferior a:

$$
1\ \mathrm{mV}
$$

### Paso 1: frecuencia de muestreo

Necesitamos:

$$
f_s>2B
$$

$$
f_s>30\ \mathrm{kHz}
$$

Podríamos elegir, por ejemplo:

$$
\boxed{f_s=40\ \mathrm{kHz}}
$$

---

### Paso 2: rango

Tenemos:

$$
V_\mathrm{FS}=4\ \mathrm{V}
$$

Queremos:

$$
\Delta<1\ \mathrm{mV}
$$

Necesitamos:

$$
\frac{4}{2^N}<0.001
$$

Por tanto:

$$
2^N>4000
$$

Como:

$$
2^{11}=2048
$$

y:

$$
2^{12}=4096
$$

necesitamos:

$$
\boxed{N=12}
$$

Por tanto una posible especificación sería:

$$
\boxed{
f_s=40\ \mathrm{kS/s},\qquad N=12
}
$$

---

# 44. ¿Qué papel juega el ADC en un sistema de telecomunicaciones?

En Telecomunicaciones es fundamental.

Por ejemplo, en un receptor:

```text
Antena
  │
  ▼
LNA
  │
  ▼
Filtro
  │
  ▼
Mezclador
  │
  ▼
Filtro
  │
  ▼
ADC
  │
  ▼
Procesamiento digital
```

A partir del ADC podemos realizar digitalmente:

* filtrado,
* demodulación,
* FFT,
* sincronización,
* estimación de canal,
* detección,
* ecualización,
* extracción de características,
* etc.

Por eso la conversión A/D es el puente entre el mundo analógico de RF y el procesamiento digital.

---

# 45. Conexión directa con SDR

Esto es especialmente importante para entender sistemas SDR.

Un receptor SDR básicamente intenta llevar una señal suficientemente cerca del dominio digital:

$$
\text{RF}
\rightarrow
\text{analógico}
\rightarrow
\text{ADC}
\rightarrow
\text{DSP}
$$

Por ejemplo:

$$
\text{antena}
\rightarrow
\text{LNA}
\rightarrow
\text{filtro}
\rightarrow
\text{ADC}
\rightarrow
\text{FPGA/CPU}
$$

Pero el ADC no puede simplemente digitalizar cualquier frecuencia arbitrariamente.

Tenemos que considerar:

$$
f_s
$$

el ancho de banda:

$$
B
$$

el aliasing:

$$
\text{aliasing}
$$

y el rango dinámico:

$$
\text{bits}
$$

---

# 46. La idea más importante de todo el tema

La conversión A/D puede verse como la respuesta a dos preguntas:

### Pregunta 1

**¿Cuándo tomo muestras?**

Eso lo determina:

$$
\boxed{f_s}
$$

y el teorema del muestreo:

$$
\boxed{
f_s>2B
}
$$

---

### Pregunta 2

**¿Con qué precisión represento cada muestra?**

Eso lo determina:

$$
\boxed{N}
$$

y:

$$
\boxed{
2^N\text{ niveles}
}
$$

Por tanto:

$$
\boxed{
\text{ADC}=
\text{muestreo temporal}
+
\text{cuantificación de amplitud}
+
\text{codificación}
}
$$

---

# 47. Mapa mental final

Quédate con este esquema:

```text
                         CONVERSIÓN A/D
                               │
               ┌───────────────┴───────────────┐
               │                               │
        CONTENIDO FRECUENCIAL             AMPLITUD
               │                               │
               ▼                               ▼
           MUESTREO                       CUANTIFICACIÓN
               │                               │
             fs                              N bits
               │                               │
               ▼                               ▼
          fs > 2B                          2^N niveles
               │                               │
               ▼                               ▼
          evitar aliasing                reducir error
               │                               │
               └───────────────┬───────────────┘
                               ▼
                         CODIFICACIÓN
                               │
                               ▼
                           BITS
```

Y la cadena completa:

$$
\boxed{
x(t)
\xrightarrow{\text{filtro AA}}
x_a(t)
\xrightarrow{\text{muestreo}}
x[n]
\xrightarrow{\text{cuantificación}}
x_q[n]
\xrightarrow{\text{codificación}}
\text{bits}
}
$$

### Fórmulas que deberías tener absolutamente dominadas

$$
\boxed{f_s=\frac1{T_s}}
$$

$$
\boxed{x[n]=x(nT_s)}
$$

$$
\boxed{f_s>2B}
$$

$$
\boxed{f_N=\frac{f_s}{2}}
$$

$$
\boxed{L=2^N}
$$

$$
\boxed{\Delta\approx\frac{V_\mathrm{FS}}{2^N}}
$$

$$
\boxed{|e_q|\leq\frac{\Delta}{2}}
$$

$$
\boxed{\sigma_q^2=\frac{\Delta^2}{12}}
$$

y, para una senoide a escala completa en un ADC ideal:

$$
\boxed{\mathrm{SNR}_{dB}\approx6.02N+1.76}
$$
