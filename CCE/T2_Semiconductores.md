# Semiconductores — Parte I

## Estructura de la materia y fundamentos físicos

---

## 1. Introducción

Los semiconductores constituyen la base física de prácticamente toda la electrónica moderna.

Dispositivos tan diferentes como:

* diodos,
* transistores,
* LEDs,
* fotodetectores,
* células solares,
* circuitos integrados,
* memorias,
* microprocesadores,

funcionan gracias a la capacidad de controlar el transporte de carga en materiales semiconductores.

Para comprender su funcionamiento no basta con saber que un semiconductor "conduce menos que un metal". Es necesario establecer una cadena lógica que conecte la estructura microscópica de la materia con sus propiedades eléctricas:

$$
\boxed{
\text{átomos}
\rightarrow
\text{enlaces}
\rightarrow
\text{estructura cristalina}
\rightarrow
\text{niveles de energía}
\rightarrow
\text{bandas}
\rightarrow
\text{portadores}
\rightarrow
\text{conductividad}
}
$$

Esta cadena constituye la base para entender posteriormente el dopaje, las uniones PN y los dispositivos semiconductores.

---

# 2. Estructura de la materia

La materia está formada por átomos.

Un átomo está constituido fundamentalmente por:

* protones,
* neutrones,
* electrones.

Los protones poseen carga positiva:

$$
q_p=+q
$$

Los electrones poseen carga negativa:

$$
q_e=-q
$$

con:

$$
q=1.602\times10^{-19}\ \mathrm C
$$

Los neutrones son eléctricamente neutros.

El núcleo contiene protones y neutrones, mientras que los electrones ocupan estados cuánticos alrededor del núcleo.

Desde el punto de vista de la electrónica, los electrones más importantes son los **electrones de valencia**, ya que son los que participan principalmente en los enlaces químicos y determinan en gran medida las propiedades eléctricas del material.

---

# 3. Electrones de valencia

Los electrones de un átomo no tienen todos la misma energía.

Los electrones más internos están fuertemente ligados al núcleo.

Los electrones más externos poseen una energía mayor y están menos ligados.

Estos electrones externos reciben el nombre de **electrones de valencia**.

Son especialmente importantes porque:

1. participan en los enlaces entre átomos;
2. determinan muchas propiedades químicas;
3. en un sólido, dan lugar a los estados electrónicos que posteriormente forman las bandas de valencia y conducción.

Por tanto, cuando estudiamos las propiedades eléctricas de un semiconductor, no necesitamos seguir individualmente todos los electrones del átomo.

Nos interesan principalmente los estados asociados a los electrones de valencia y los estados energéticos disponibles a mayor energía.

---

# 4. Formación de sólidos

Cuando los átomos se encuentran aislados, cada uno posee sus propios niveles de energía.

Sin embargo, cuando un número enorme de átomos se aproxima para formar un sólido, los electrones de unos átomos interactúan con los de los átomos vecinos.

Como consecuencia, los niveles energéticos de los átomos individuales dejan de ser independientes.

Los niveles se desdoblan en una enorme cantidad de niveles muy próximos entre sí.

Para un número macroscópico de átomos, estos niveles aparecen prácticamente como intervalos continuos de energía.

Así aparecen las **bandas de energía**.

Este es uno de los pasos conceptuales fundamentales:

$$
\boxed{
\text{niveles atómicos discretos}
\rightarrow
\text{muchos niveles próximos}
\rightarrow
\text{bandas de energía}
}
$$

Entre determinadas bandas aparecen intervalos de energía en los que no existen estados electrónicos permitidos.

Estos intervalos reciben el nombre de **bandas prohibidas** o *bandgaps*.

---

# 5. Estructura de los sólidos

Dependiendo de la organización espacial de los átomos, podemos distinguir diferentes tipos de sólidos.

## 5.1. Sólidos cristalinos

En un sólido cristalino existe una organización espacial periódica.

Los átomos se encuentran distribuidos siguiendo un patrón que se repite en el espacio.

Podemos representar conceptualmente:

```text
●   ●   ●   ●
  ●   ●   ●
●   ●   ●   ●
  ●   ●   ●
```

La periodicidad cristalina es extremadamente importante porque permite estudiar el movimiento de los electrones mediante modelos de física del estado sólido.

Entre los materiales cristalinos de gran importancia tecnológica encontramos:

* silicio ($Si$),
* germanio ($Ge$),
* arseniuro de galio ($GaAs$).

El silicio es particularmente importante en electrónica debido a sus propiedades eléctricas, térmicas, químicas y tecnológicas.

---

## 5.2. Sólidos policristalinos

Un sólido policristalino está formado por numerosos dominios cristalinos llamados **granos**.

Cada grano posee orden cristalino, pero los diferentes granos pueden tener orientaciones diferentes.

Por tanto, aparecen fronteras entre ellos:

```text
\  |  /       / | \
 \ | /       /  |  \
  \|/        \  |  /
---+----------+----
 /|\          \ | /
/ | \          \|/
```

Estas fronteras pueden modificar el transporte de carga y producir fenómenos de dispersión o atrapamiento de portadores.

---

## 5.3. Sólidos amorfos

En un sólido amorfo no existe una periodicidad cristalina de largo alcance.

Los átomos pueden mantener cierto orden local, pero no existe una red cristalina periódica extendida.

Un ejemplo clásico es el vidrio.

Para determinados dispositivos electrónicos pueden utilizarse materiales amorfos, pero el análisis de semiconductores cristalinos resulta especialmente importante para comprender la electrónica convencional basada en silicio.

---

# 6. Enlaces químicos

Cuando los átomos forman un sólido, interactúan entre ellos mediante enlaces.

Los tres tipos fundamentales que conviene distinguir son:

* enlace metálico,
* enlace iónico,
* enlace covalente.

La naturaleza del enlace tiene consecuencias directas sobre la disponibilidad y movilidad de los electrones.

---

# 7. Enlace metálico

En los metales, los electrones de valencia están relativamente deslocalizados.

No pertenecen exclusivamente a un único átomo, sino que pueden extenderse por la estructura del sólido.

Una representación simplificada es:

```text
M⁺    M⁺    M⁺    M⁺
   e⁻  e⁻  e⁻  e⁻
M⁺    M⁺    M⁺    M⁺
   e⁻  e⁻  e⁻  e⁻
M⁺    M⁺    M⁺    M⁺
```

Los electrones pueden desplazarse a través del material con relativa facilidad.

Esto contribuye a la elevada conductividad eléctrica de los metales.

Ejemplos:

* cobre,
* aluminio,
* plata,
* oro.

Sin embargo, esta descripción mediante un "mar de electrones" es una representación cualitativa. El tratamiento riguroso del comportamiento electrónico de un metal requiere recurrir a la estructura de bandas.

---

# 8. Enlace iónico

En un enlace iónico existe una transferencia de electrones entre átomos.

Como consecuencia, se generan especies cargadas:

* iones positivos,
* iones negativos.

La interacción electrostática entre ellos mantiene la estructura.

De manera esquemática:

$$
A+B\rightarrow A^+ + B^-
$$

El enlace iónico es característico de muchos compuestos formados por elementos con diferencias importantes de electronegatividad.

---

# 9. Enlace covalente

El enlace covalente es especialmente importante para los semiconductores.

En este tipo de enlace, dos átomos comparten electrones.

El silicio posee cuatro electrones de valencia.

Por ello, cada átomo de silicio puede establecer cuatro enlaces covalentes con sus vecinos.

Una representación simplificada de una red de silicio es:

```text
        Si
       /  \
     Si    Si
     |      |
     Si    Si
       \  /
        Si
```

Cada átomo comparte electrones con los átomos próximos.

Los electrones implicados en estos enlaces no están libres como los electrones de conducción de un metal.

Sin embargo, tampoco están separados de los posibles estados de conducción por una barrera energética infinita.

Existe una energía determinada que puede permitir que un electrón pase a un estado de mayor energía.

Esto conduce directamente al concepto de bandas.

---

# 10. Del átomo aislado al sólido

Consideremos primero un átomo aislado.

Sus electrones solo pueden ocupar determinados estados energéticos.

Podemos representarlos conceptualmente como:

```text
Energía
  ↑

  ─────────  nivel 3

  ─────────  nivel 2

  ─────────  nivel 1

  ─────────  estado fundamental
```

Cuando acercamos dos átomos, sus funciones de onda electrónicas empiezan a interactuar.

Los niveles se separan.

Si seguimos aumentando el número de átomos:

$$
N=2
\rightarrow
N=10
\rightarrow
N=10^6
\rightarrow
N\sim10^{23}
$$

el número de niveles aumenta enormemente.

Los niveles terminan formando intervalos prácticamente continuos.

Estos intervalos son las bandas de energía.

Por tanto:

$$
\boxed{
\text{átomos aislados}
\rightarrow
\text{niveles discretos}
}
$$

mientras que:

$$
\boxed{
\text{sólido}
\rightarrow
\text{bandas de energía}
}
$$

---

# 11. Bandas de energía

Las bandas más importantes para estudiar semiconductores son:

* banda de valencia;
* banda de conducción.

Entre ellas puede existir una región de energía prohibida.

Podemos representarlo como:

```text
E
↑

│       Banda de conducción
│
│       ███████████████████
│       ███████████████████
│
│       ← banda prohibida →
│              Eg
│
│       ███████████████████
│       ███████████████████
│       Banda de valencia
│
└──────────────────────────→
```

---

# 12. Banda de valencia

La **banda de valencia** es la banda de mayor energía que, en el semiconductor ideal a temperatura cero, se encuentra ocupada por los electrones de valencia.

Su energía máxima se representa como:

$$
E_V
$$

El comportamiento de los electrones próximos a esta banda será fundamental para introducir posteriormente el concepto de **hueco**.

---

# 13. Banda de conducción

Por encima de la banda de valencia se encuentra la **banda de conducción**.

Su energía mínima se representa como:

$$
E_C
$$

Un electrón que se encuentra en esta banda puede participar en el transporte eléctrico a través del sólido.

Por tanto, para estudiar la conducción eléctrica debemos prestar especial atención a:

$$
E_C
$$

y a la concentración de electrones que ocupan estados próximos a esta banda.

---

# 14. Banda prohibida

Entre el máximo de la banda de valencia y el mínimo de la banda de conducción puede existir una región en la que no hay estados electrónicos permitidos.

Esta región se denomina **banda prohibida** o *bandgap*.

Su anchura es:

$$
\boxed{
E_g=E_C-E_V
}
$$

donde:

* $E_C$ es el mínimo de la banda de conducción;
* $E_V$ es el máximo de la banda de valencia;
* $E_g$ es la energía de la banda prohibida.

Esta magnitud es fundamental para determinar el comportamiento eléctrico y óptico de un semiconductor.

---

# 15. Interpretación física del bandgap

Es importante no interpretar $E_g$ simplemente como una "distancia física" entre dos bandas.

Es una **diferencia de energía**.

Para que un electrón pase desde la banda de valencia a la banda de conducción debe adquirir, en el modelo más sencillo, una energía comparable con:

$$
E_g
$$

Por tanto:

$$
\boxed{
\text{energía necesaria}\sim E_g
}
$$

En un semiconductor con $E_g$ relativamente pequeño, la excitación térmica puede generar una cantidad apreciable de portadores.

En un aislante con un $E_g$ mucho mayor, la generación térmica de portadores es mucho menos probable a temperatura ambiente.

---

# 16. Conductores

Un conductor presenta estados electrónicos disponibles que permiten modificar fácilmente la ocupación electrónica cuando se aplica un campo eléctrico.

Desde el punto de vista de bandas, esto puede ocurrir de dos formas principales:

### Banda parcialmente ocupada

Una banda puede estar parcialmente ocupada.

Entonces existen estados vacíos energéticamente próximos a los ocupados.

Los electrones pueden cambiar su estado en respuesta a un campo eléctrico.

### Solapamiento de bandas

También puede producirse solapamiento entre bandas.

En ambos casos existen estados disponibles sin necesidad de superar una gran banda prohibida.

Por ello los metales presentan una elevada conductividad.

---

# 17. Semiconductores

En un semiconductor existe una banda prohibida relativamente pequeña.

En el caso ideal a:

$$
T=0\ \mathrm K
$$

la banda de valencia está llena y la banda de conducción está vacía.

Sin embargo, cuando:

$$
T>0
$$

la energía térmica puede permitir que algunos electrones pasen a la banda de conducción.

El resultado es la aparición simultánea de:

* electrones en la banda de conducción;
* huecos en la banda de valencia.

Por tanto:

$$
\boxed{
\text{excitación térmica}
\rightarrow
e^- \text{ en conducción}
+
\text{hueco en valencia}
}
$$

Esta característica es fundamental.

La conductividad de un semiconductor depende fuertemente de la concentración de portadores, y esta concentración puede controlarse mediante diferentes mecanismos.

---

# 18. Aislantes

En un aislante también existe una banda prohibida entre la banda de valencia y la banda de conducción.

La diferencia fundamental es que el bandgap suele ser suficientemente grande como para que, a temperatura ordinaria, la excitación térmica produzca una concentración extremadamente pequeña de electrones de conducción.

Por tanto:

$$
E_g\ \text{grande}
\quad\Rightarrow\quad
\text{muy pocos portadores térmicos}
$$

y, en consecuencia:

$$
\sigma\approx0
$$

en comparación con la de un conductor.

---

# 19. Comparación conceptual

Podemos resumir la estructura de bandas de forma cualitativa:

```text
CONDUCTOR

████████████████
████████████████
████████████████
Estados disponibles
sin una gran separación energética
```

```text
SEMICONDUCTOR

████████████████
      Eg
████████████████

Eg relativamente pequeño
```

```text
AISLANTE

████████████████
        ↑
        │
        │ Eg grande
        │
        ↓
████████████████
```

La diferencia esencial no es simplemente "conduce/no conduce".

La diferencia fundamental está en:

$$
\boxed{
\text{qué estados electrónicos están disponibles
y qué energía hace falta para acceder a ellos}
}
$$

---

# 20. El papel de la temperatura

La temperatura modifica radicalmente el comportamiento de un semiconductor.

A medida que aumenta $T$, aumenta la energía térmica disponible.

Esto incrementa la probabilidad de que algunos electrones puedan alcanzar estados de mayor energía.

De forma cualitativa:

$$
T\uparrow
\quad\Rightarrow\quad
\text{más electrones excitados}
\quad\Rightarrow\quad
\text{más portadores}
\quad\Rightarrow\quad
\sigma\uparrow
$$

para un semiconductor intrínseco.

Por tanto, a diferencia de lo que ocurre típicamente en los metales, la conductividad de un semiconductor intrínseco **aumenta con la temperatura**.

Equivalentemente, su resistividad disminuye:

$$
T\uparrow
\quad\Rightarrow\quad
\rho\downarrow
$$

en el régimen intrínseco.

---

# 21. Electrones en la banda de conducción

Cuando un electrón recibe suficiente energía para pasar de la banda de valencia a la banda de conducción, deja de estar ligado de la misma manera al enlace covalente.

Ahora ocupa un estado perteneciente a la banda de conducción.

Podemos representar el proceso:

```text
        Banda de conducción
        ───────────────────
              ↑
              │
              │ energía
              │
              ↑
        ───────────────────
        Banda de valencia
```

El electrón de conducción puede desplazarse por el cristal y contribuir al transporte de corriente.

Pero al mismo tiempo ha quedado una vacante en la banda de valencia.

Esa vacante tiene una interpretación física extremadamente importante.

---

# 22. El hueco

Supongamos que una banda de valencia está prácticamente llena.

Si un electrón abandona uno de sus estados para pasar a la banda de conducción, queda una posición vacía.

Esta posición vacía puede ser ocupada por otro electrón de la banda de valencia.

Después otro electrón puede ocupar la nueva vacante.

El resultado macroscópico es equivalente a que la vacante se desplazase en sentido contrario al movimiento de los electrones.

Por ello resulta conveniente describir la vacante como una partícula ficticia efectiva denominada **hueco**.

El hueco tiene carga efectiva:

$$
\boxed{q_h=+q}
$$

Por tanto, aunque físicamente lo que se mueve son electrones, podemos describir el transporte en la banda de valencia mediante el movimiento de huecos.

---

# 23. ¿Por qué el hueco se comporta como una carga positiva?

Esta cuestión es importante conceptualmente.

Supongamos que tenemos una banda de valencia casi llena.

Cuando aplicamos un campo eléctrico, los electrones responden al campo.

Como la banda está casi completamente ocupada, es más sencillo describir el movimiento de la pequeña cantidad de estados vacíos.

El comportamiento colectivo de todos esos electrones puede expresarse matemáticamente de forma equivalente al movimiento de partículas positivas llamadas huecos.

Por eso podemos escribir:

$$
q_h=+q
$$

aunque el hueco no sea una partícula elemental independiente como un protón.

Es una **cuasipartícula**, es decir, una descripción efectiva del comportamiento colectivo del sistema electrónico.

---

# 24. Dos tipos de portadores

A partir de este punto debemos distinguir claramente dos tipos de portadores de carga:

### Electrones

Se encuentran principalmente en la banda de conducción.

Tienen carga:

$$
q_n=-q
$$

### Huecos

Representan estados vacíos en la banda de valencia.

Tienen carga efectiva:

$$
q_p=+q
$$

Por tanto:

$$
\boxed{
\text{transporte electrónico}
=
\text{electrones}
+
\text{huecos}
}
$$

Esta distinción será esencial en la siguiente parte, donde estudiaremos los semiconductores intrínsecos y extrínsecos.

---

# 25. Conducción eléctrica en un semiconductor

Cuando aplicamos un campo eléctrico $\mathbf E$ a un semiconductor, los portadores adquieren una velocidad de deriva.

De forma simplificada:

$$
\mathbf v_d=\mu\mathbf E
$$

donde $\mu$ es la movilidad del portador.

Sin embargo, los electrones y los huecos tienen cargas de signo contrario.

Para un electrón:

$$
\mathbf F_n=-q\mathbf E
$$

mientras que para un hueco:

$$
\mathbf F_p=+q\mathbf E
$$

Por tanto, sus movimientos físicos son opuestos.

Esto no significa que sus contribuciones a la corriente sean opuestas.

Precisamente debido al signo de la carga, ambos pueden contribuir a la corriente eléctrica en el mismo sentido convencional.

Este punto será desarrollado matemáticamente al estudiar la conductividad.

---

# 26. Conductividad y resistividad

La relación macroscópica entre densidad de corriente y campo eléctrico es:

$$
\boxed{
\mathbf J=\sigma\mathbf E
}
$$

donde:

* $\mathbf J$ es la densidad de corriente;
* $\sigma$ es la conductividad;
* $\mathbf E$ es el campo eléctrico.

La resistividad es la inversa de la conductividad:

$$
\boxed{
\rho=\frac{1}{\sigma}
}
$$

Por tanto:

* conductor $\rightarrow$ $\sigma$ grande;
* semiconductor $\rightarrow$ $\sigma$ intermedia y controlable;
* aislante $\rightarrow$ $\sigma$ muy pequeña.

Esta clasificación es útil, pero todavía es insuficiente para comprender el comportamiento real de los semiconductores.

Para ello necesitamos conocer **cuántos electrones y huecos existen** y cómo se controla su concentración.

Ese será precisamente el objetivo de la siguiente parte.

---

# 27. Cadena conceptual de la Parte I

Todo lo desarrollado puede condensarse en la siguiente cadena:

$$
\boxed{
\text{átomos}
\rightarrow
\text{electrones de valencia}
\rightarrow
\text{enlaces}
\rightarrow
\text{sólido}
}
$$

A continuación:

$$
\boxed{
\text{sólido}
\rightarrow
\text{interacción entre átomos}
\rightarrow
\text{niveles energéticos}
\rightarrow
\text{bandas}
}
$$

Y finalmente:

$$
\boxed{
\text{bandas}
\rightarrow
E_V,\ E_C,\ E_g
\rightarrow
\text{portadores}
\rightarrow
\text{conductividad}
}
$$

La idea fundamental que debemos conservar es:

> **Las propiedades eléctricas de un sólido están determinadas, en última instancia, por qué estados electrónicos están disponibles, cómo están ocupados y qué energía es necesaria para pasar de unos estados a otros.**

En un semiconductor, la existencia de una banda prohibida relativamente pequeña permite controlar la concentración de portadores mediante temperatura, impurezas, luz y campos eléctricos.

---

# 28. Qué queda por construir

Hasta ahora hemos llegado a comprender:

* qué es un sólido;
* qué es un cristal;
* qué son los enlaces;
* por qué aparecen bandas de energía;
* qué son las bandas de valencia y conducción;
* qué es el *bandgap*;
* por qué un conductor conduce;
* por qué un aislante conduce muy poco;
* por qué un semiconductor tiene un comportamiento intermedio;
* qué son los electrones de conducción;
* qué es un hueco;
* por qué existen dos tipos de portadores.

Pero todavía falta responder una pregunta fundamental:

$$
\boxed{
\text{¿Cómo podemos controlar deliberadamente la cantidad de electrones y huecos de un semiconductor?}
}
$$

La respuesta es el **dopaje**.

A partir de él podremos pasar de un semiconductor intrínseco a materiales tipo $N$ y tipo $P$, introducir los conceptos de donadores y aceptores, obtener las concentraciones de portadores, estudiar la ley de acción de masas, la neutralidad eléctrica, la conductividad y finalmente comprender el nivel de Fermi.

Eso constituye la **Parte II**.

## Esquema conceptual de la Parte I

```text
                         MATERIA
                            │
                            ▼
                          ÁTOMOS
                            │
                 ┌──────────┴──────────┐
                 │                     │
          Electrones internos    Electrones de valencia
                                       │
                                       ▼
                                    ENLACES
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 │                     │                     │
             Metálico               Iónico              Covalente
                 │                                           │
                 │                                           ▼
                 │                                      Semiconductores
                 │                                           │
                 └──────────────────┐                        │
                                    ▼                        ▼
                              SÓLIDO CRISTALINO       Interacción atómica
                                    │                        │
                                    └──────────┬─────────────┘
                                               ▼
                                      NIVELES DE ENERGÍA
                                               │
                                               ▼
                                        BANDAS DE ENERGÍA
                                               │
                         ┌─────────────────────┼─────────────────────┐
                         │                     │                     │
                         ▼                     ▼                     ▼
                 Banda de valencia     Banda prohibida      Banda de conducción
                       $E_V$                  $E_g$                  $E_C$
                                               │
                                               ▼
                                  Clasificación eléctrica
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
                    ▼                          ▼                          ▼
                CONDUCTOR                 SEMICONDUCTOR               AISLANTE
                    │                          │                          │
                    │                          ▼                          │
                    │                 $E_g$ relativamente               │
                    │                      pequeño                       │
                    │                          │                          │
                    │                          ▼                          │
                    │                    Portadores                      │
                    │                          │                          │
                    │                 ┌────────┴────────┐                │
                    │                 ▼                 ▼                │
                    │             Electrones          Huecos              │
                    │                 │                 │                │
                    └─────────────────┴─────────────────┘                │
                                      │                                   │
                                      ▼                                   │
                                  CORRIENTE                               │
                                      │                                   │
                                      ▼                                   │
                                CONDUCTIVIDAD                             │
```

### Idea central

La estructura microscópica determina la estructura electrónica:

$$
\boxed{
\text{estructura atómica}
\rightarrow
\text{estructura de bandas}
\rightarrow
\text{portadores}
\rightarrow
\text{transporte eléctrico}
}
$$

Y el objetivo de las siguientes partes será aprender a **controlar esos portadores** para convertir un semiconductor en un material tipo $N$, tipo $P$ y, finalmente, construir una unión PN.

Esta será la **Parte I**, sin entrar todavía en dopaje ni PN para no adelantar conceptos. En la Parte II podemos profundizar bastante más en **intrínsecos → dopaje → N/P → $n,p$ → ley de acción de masas → neutralidad → conductividad → movilidad → Fermi → compensados**, con las derivaciones y relaciones entre todas las ecuaciones.

---









---


# Semiconductores — Parte II

## Portadores de carga, dopaje y nivel de Fermi

---

# 1. Introducción

En la Parte I hemos establecido el origen microscópico de las propiedades eléctricas de los semiconductores.

Partimos de:

$$
\text{átomos}
\rightarrow
\text{enlaces}
\rightarrow
\text{estructura cristalina}
\rightarrow
\text{niveles de energía}
\rightarrow
\text{bandas}
\rightarrow
\text{portadores}
$$

Ahora debemos responder una cuestión fundamental:

> **¿Cuántos electrones y huecos existen realmente en un semiconductor y cómo podemos controlar sus concentraciones?**

Esta pregunta es esencial porque la corriente eléctrica no depende únicamente de que existan estados de conducción. Depende también de **cuántos portadores existen y de cómo se mueven**.

En esta parte construiremos progresivamente:

$$
\boxed{
\text{semiconductor intrínseco}
\rightarrow
\text{generación térmica}
\rightarrow
n_i
\rightarrow
\text{dopaje}
\rightarrow
N_D,N_A
\rightarrow
\text{tipo N/P}
\rightarrow
n,p
\rightarrow
\sigma
\rightarrow
E_F
}
$$

---

# 2. Portadores de carga

En un semiconductor existen dos tipos fundamentales de portadores móviles:

* electrones;
* huecos.

Los electrones se encuentran principalmente en la banda de conducción y poseen carga negativa:

$$
q_n=-q
$$

Los huecos representan estados vacíos en la banda de valencia y se comportan como partículas de carga positiva:

$$
q_p=+q
$$

con:

$$
q=1.602\times10^{-19}\ \mathrm C
$$

Es importante distinguir entre **carga** y **concentración**.

La carga de un electrón o de un hueco es una propiedad individual:

$$
|q|=1.602\times10^{-19}\ \mathrm C
$$

Mientras que $n$ y $p$ describen cuántos portadores existen por unidad de volumen:

$$
n=\frac{\text{número de electrones}}{\text{volumen}}
$$

$$
p=\frac{\text{número de huecos}}{\text{volumen}}
$$

Sus unidades habituales son:

$$
\mathrm{cm^{-3}}
$$

o, en el Sistema Internacional:

$$
\mathrm{m^{-3}}
$$

---

# 3. Semiconductor intrínseco

Un **semiconductor intrínseco** es un semiconductor idealmente puro, sin impurezas dopantes introducidas intencionadamente.

Consideremos un cristal de silicio puro.

A temperatura $T=0\ \mathrm K$, en el modelo ideal, los electrones ocupan los estados de menor energía disponibles.

La banda de valencia está llena y la banda de conducción está vacía.

Por tanto:

$$
n=0
$$

y:

$$
p=0
$$

en el modelo ideal de $T=0$.

Sin embargo, cuando:

$$
T>0
$$

los electrones pueden adquirir energía térmica.

Algunos electrones pasan de la banda de valencia a la banda de conducción.

Cada transición genera simultáneamente:

* un electrón de conducción;
* un hueco de valencia.

Por tanto, en un semiconductor intrínseco:

$$
\boxed{n=p}
$$

Esta igualdad es una consecuencia directa de la forma en que se generan los pares electrón-hueco.

---

# 4. Concentración intrínseca $n_i$

Se denomina **concentración intrínseca de portadores** a la concentración de electrones y huecos existente en un semiconductor intrínseco en equilibrio térmico.

Se representa mediante:

$$
n_i
$$

Por tanto:

$$
\boxed{n=p=n_i}
$$

El valor de $n_i$ depende principalmente de:

* el material;
* la temperatura;
* la energía de la banda prohibida.

Por tanto, no es una constante universal.

Por ejemplo, $n_i$ es muy diferente para silicio y germanio.

---

# 5. Dependencia de $n_i$ con la temperatura

La concentración intrínseca aumenta fuertemente con la temperatura.

Una expresión aproximada es:

$$
\boxed{
n_i\propto T^{3/2}
\exp\left(
-\frac{E_g}{2kT}
\right)
}
$$

Una forma más completa puede escribirse como:

$$
n_i=
\sqrt{N_C N_V}
\exp\left(
-\frac{E_g}{2kT}
\right)
$$

donde:

* $N_C$ es la densidad efectiva de estados de la banda de conducción;
* $N_V$ es la densidad efectiva de estados de la banda de valencia;
* $E_g$ es la energía de la banda prohibida;
* $k$ es la constante de Boltzmann;
* $T$ es la temperatura absoluta.

La dependencia exponencial es especialmente importante.

Al aumentar $T$, el término:

$$
\exp\left(-\frac{E_g}{2kT}\right)
$$

aumenta significativamente.

Por tanto:

$$
\boxed{
T\uparrow
\quad\Rightarrow\quad
n_i\uparrow
}
$$

---

# 6. Interpretación microscópica de la generación térmica

La generación térmica de un par electrón-hueco puede representarse como:

```text
              Banda de conducción
        ─────────────────────────────
                    ↑
                    │
                    │ Energía térmica
                    │
                    ↑
        ─────────────────────────────
              Banda de valencia

              electrón + hueco
```

Un electrón recibe energía suficiente para superar la banda prohibida.

El proceso puede representarse de forma simplificada como:

$$
\boxed{
\text{energía térmica}
\rightarrow
e^-+h^+
}
$$

Este proceso no crea carga neta.

Antes de la excitación:

$$
Q_{\text{total}}=0
$$

Después:

$$
(-q)+(+q)=0
$$

Por tanto, se conserva la neutralidad eléctrica global.

---

# 7. Recombinación

El proceso inverso también puede producirse.

Un electrón de la banda de conducción puede caer hacia un estado vacío de la banda de valencia.

Cuando esto ocurre, desaparecen:

* un electrón de conducción;
* un hueco.

Podemos representarlo como:

$$
\boxed{
e^-+h^+
\rightarrow
\text{recombinación}
}
$$

La energía liberada durante la recombinación debe conservarse y puede aparecer de diferentes formas dependiendo del material y del mecanismo microscópico.

Por ejemplo, puede liberarse mediante:

* emisión de fotones;
* vibraciones de la red cristalina;
* otros procesos microscópicos.

En un semiconductor en equilibrio térmico, generación y recombinación se compensan estadísticamente.

---

# 8. Equilibrio térmico

En equilibrio térmico no significa que no existan procesos microscópicos.

Al contrario, continuamente se producen:

$$
\text{generación}
$$

y:

$$
\text{recombinación}
$$

Pero sus tasas medias se igualan:

$$
G=R
$$

donde:

* $G$ es la tasa de generación;
* $R$ es la tasa de recombinación.

Por tanto:

$$
\boxed{G=R}
$$

El sistema permanece macroscópicamente estable aunque los procesos microscópicos continúen.

---

# 9. ¿Por qué dopamos un semiconductor?

Un semiconductor intrínseco tiene:

$$
n=p=n_i
$$

Sin embargo, para fabricar dispositivos electrónicos normalmente necesitamos controlar deliberadamente la concentración de portadores.

Por ejemplo, puede interesarnos tener una región donde haya muchos electrones:

$$
n\gg p
$$

o una región donde haya muchos huecos:

$$
p\gg n
$$

Para conseguirlo se introducen cantidades muy pequeñas de átomos de otros elementos en el cristal.

Este proceso se denomina:

$$
\boxed{\text{dopaje}}
$$

El semiconductor resultante se denomina **semiconductor extrínseco**.

---

# 10. El dopaje no consiste en "añadir electrones" directamente

Es importante entender correctamente qué hace el dopaje.

No se introducen simplemente electrones libres desde el exterior.

Se introducen **átomos de impureza** que poseen una estructura electrónica diferente de la del semiconductor anfitrión.

Estos átomos generan niveles energéticos adicionales próximos a las bandas principales.

Como consecuencia, resulta mucho más fácil generar determinados tipos de portadores.

Por tanto:

$$
\boxed{
\text{dopaje}
\rightarrow
\text{niveles energéticos adicionales}
\rightarrow
\text{modificación de las concentraciones de portadores}
}
$$

---

# 11. Dopaje tipo N

Para fabricar un semiconductor tipo $N$ se introducen impurezas denominadas **donadoras**.

En silicio son habituales elementos del grupo V:

* fósforo ($P$);
* arsénico ($As$);
* antimonio ($Sb$).

El silicio posee cuatro electrones de valencia.

Un átomo del grupo V posee cinco.

Cuando sustituye a un átomo de silicio dentro de la red cristalina:

* cuatro electrones participan en los enlaces covalentes;
* queda un quinto electrón débilmente ligado.

Podemos visualizarlo:

```text
             Si
              |
       Si — D — Si
              |
             Si

        + electrón adicional
```

Este electrón adicional puede liberarse con una energía relativamente pequeña.

---

# 12. Donadores

La impureza del grupo V se denomina **donadora** porque puede donar un electrón al sistema.

El proceso de ionización se representa:

$$
\boxed{
D\rightarrow D^++e^-
}
$$

Inicialmente el átomo donador es eléctricamente neutro.

Después de liberar el electrón:

* el electrón es móvil;
* el ion $D^+$ queda prácticamente fijo en la red cristalina.

Por tanto:

$$
\boxed{
D\rightarrow D^++e^-
}
$$

es una de las relaciones fundamentales del dopaje tipo $N$.

---

# 13. Nivel donador

Desde el punto de vista de bandas, la impureza donadora introduce un nivel energético cercano a la banda de conducción.

Podemos representarlo como:

```text
E
↑

      Banda de conducción
      ─────────────────── EC

      ─────────────────── ED
          Nivel donador

             pequeño
             intervalo

      ─────────────────── EV
      Banda de valencia
```

Como $E_D$ está próximo a $E_C$, un electrón situado en el nivel donador necesita relativamente poca energía para alcanzar la banda de conducción.

Por ello, a temperaturas suficientemente elevadas, una gran parte de los donadores puede ionizarse.

---

# 14. Semiconductor tipo N

Después del dopaje donador, la concentración de electrones aumenta considerablemente.

Por tanto:

$$
n\gg p
$$

Los electrones son entonces los **portadores mayoritarios**.

Los huecos pasan a ser los **portadores minoritarios**.

Así:

$$
\boxed{
\text{tipo N}
\Rightarrow
\text{electrones mayoritarios}
}
$$

El nombre "$N$" procede de la naturaleza negativa de los portadores mayoritarios.

---

# 15. Aproximación $n\approx N_D$

Si los donadores están prácticamente completamente ionizados y el dopaje es suficientemente fuerte frente a la concentración intrínseca:

$$
n\approx N_D
$$

donde $N_D$ representa la concentración de átomos donadores.

Por ejemplo, si:

$$
N_D=10^{16}\ \mathrm{cm^{-3}}
$$

y estamos en condiciones donde la ionización es prácticamente completa, podemos aproximar:

$$
n\approx10^{16}\ \mathrm{cm^{-3}}
$$

Pero esta igualdad es una **aproximación**, no una identidad universal.

En general, para determinar exactamente $n$ y $p$ debemos utilizar simultáneamente las ecuaciones de equilibrio y neutralidad.

---

# 16. Dopaje tipo P

Para fabricar un semiconductor tipo $P$ se introducen impurezas **aceptoras**.

En silicio son habituales elementos del grupo III:

* boro ($B$);
* aluminio ($Al$);
* galio ($Ga$).

Estas impurezas tienen tres electrones de valencia.

Al sustituir a un átomo de silicio, solo pueden completar tres de los cuatro enlaces covalentes de la estructura.

Por tanto, aparece una situación en la que falta un electrón.

Esta ausencia se describe como un hueco.

---

# 17. Aceptores

La impureza acepta un electrón de la red.

Podemos escribir:

$$
\boxed{
A+e^-\rightarrow A^-
}
$$

El electrón que es capturado por la impureza deja detrás un hueco móvil en la red.

Por tanto, aunque la impureza acepta un electrón, el efecto sobre el semiconductor es aumentar la concentración de huecos.

---

# 18. Nivel aceptor

El dopante aceptor introduce un nivel energético próximo a la banda de valencia.

Esquemáticamente:

```text
E
↑

      Banda de conducción
      ─────────────────── EC

             intervalo pequeño

      ─────────────────── EA
          Nivel aceptor

      ─────────────────── EV
      Banda de valencia
```

Como $E_A$ está próximo a $E_V$, resulta relativamente fácil que un electrón de la banda de valencia pase al nivel aceptor.

Cuando esto sucede:

* el aceptor se convierte en $A^-$;
* queda un hueco en la banda de valencia.

---

# 19. Semiconductor tipo P

Después del dopaje aceptor:

$$
p\gg n
$$

Los huecos son los portadores mayoritarios.

Los electrones son los portadores minoritarios.

Por tanto:

$$
\boxed{
\text{tipo P}
\Rightarrow
\text{huecos mayoritarios}
}
$$

---

# 20. Aproximación $p\approx N_A$

Si los aceptores están prácticamente completamente ionizados y el dopaje domina sobre la concentración intrínseca:

$$
p\approx N_A
$$

donde $N_A$ representa la concentración de átomos aceptores.

Por ejemplo:

$$
N_A=10^{16}\ \mathrm{cm^{-3}}
$$

implica aproximadamente:

$$
p\approx10^{16}\ \mathrm{cm^{-3}}
$$

bajo las condiciones anteriores.

---

# 21. Ley de acción de masas

Ahora podemos establecer una relación fundamental entre electrones y huecos.

En equilibrio térmico, para un semiconductor no degenerado se cumple:

$$
\boxed{
np=n_i^2
}
$$

Esta expresión recibe el nombre de **ley de acción de masas**.

Es una de las ecuaciones más importantes de la física de semiconductores.

---

# 22. Consecuencia en un semiconductor tipo N

Supongamos que:

$$
n\gg p
$$

Como:

$$
np=n_i^2
$$

podemos despejar:

$$
\boxed{
p=\frac{n_i^2}{n}
}
$$

Por tanto, si incrementamos mucho la concentración de electrones, la concentración de huecos disminuye.

Por ejemplo, si:

$$
n=10^{16}\ \mathrm{cm^{-3}}
$$

y:

$$
n_i=10^{10}\ \mathrm{cm^{-3}}
$$

entonces:

$$
p=
\frac{(10^{10})^2}{10^{16}}
$$

$$
p=10^4\ \mathrm{cm^{-3}}
$$

Por tanto:

$$
n\gg p
$$

como esperábamos.

---

# 23. Consecuencia en un semiconductor tipo P

De forma equivalente:

$$
np=n_i^2
$$

y si:

$$
p\gg n
$$

entonces:

$$
\boxed{
n=\frac{n_i^2}{p}
}
$$

Así, un aumento de la concentración de huecos provoca una disminución de la concentración de electrones minoritarios.

---

# 24. Por qué los portadores minoritarios siguen existiendo

Es importante no decir que un semiconductor tipo $N$ "solo tiene electrones".

Eso sería incorrecto.

Un semiconductor tipo $N$ tiene:

* muchos electrones;
* pocos huecos.

Por tanto:

$$
n\gg p
$$

pero:

$$
p\neq0
$$

De igual forma, un semiconductor tipo $P$ tiene:

$$
p\gg n
$$

pero:

$$
n\neq0
$$

Los portadores minoritarios serán especialmente importantes cuando estudiemos posteriormente la unión PN y los procesos de inyección y recombinación.

---

# 25. Neutralidad eléctrica

Aunque existan muchos portadores móviles, una región semiconductor en equilibrio suele ser globalmente neutra.

Para entenderlo debemos contabilizar todas las cargas.

Tenemos:

* huecos: carga positiva;
* donadores ionizados: carga positiva;
* electrones: carga negativa;
* aceptores ionizados: carga negativa.

La condición de neutralidad es:

$$
p+N_D^+=n+N_A^-
$$

Esta es la forma general.

Si suponemos ionización completa:

$$
N_D^+\approx N_D
$$

y:

$$
N_A^-\approx N_A
$$

por lo que:

$$
\boxed{
p+N_D=n+N_A
}
$$

Equivalentemente:

$$
\boxed{
n+N_A=p+N_D
}
$$

---

# 26. Caso tipo N

Supongamos un semiconductor tipo $N$ donde no existen aceptores:

$$
N_A=0
$$

La neutralidad queda:

$$
p+N_D=n
$$

o:

$$
n=p+N_D
$$

Como normalmente:

$$
p\ll n
$$

podemos aproximar:

$$
\boxed{
n\approx N_D
}
$$

La aproximación tiene ahora una interpretación física clara:

los electrones móviles generados por la ionización de los donadores compensan aproximadamente la carga positiva de los donadores ionizados.

---

# 27. Caso tipo P

Si tenemos un semiconductor tipo $P$ sin donadores:

$$
N_D=0
$$

la neutralidad queda:

$$
p=n+N_A
$$

Como:

$$
n\ll p
$$

obtenemos:

$$
\boxed{
p\approx N_A
}
$$

Los huecos móviles compensan aproximadamente la carga negativa de los aceptores ionizados.

---

# 28. Resolución general de $n$ y $p$

Tenemos dos ecuaciones:

$$
np=n_i^2
$$

y:

$$
p+N_D=n+N_A
$$

Podemos escribir la neutralidad como:

$$
n-p=N_D-N_A
$$

Definimos:

$$
\Delta N=N_D-N_A
$$

Entonces:

$$
n-p=\Delta N
$$

y:

$$
np=n_i^2
$$

De:

$$
n=p+\Delta N
$$

sustituimos en la ley de acción de masas:

$$
(p+\Delta N)p=n_i^2
$$

Desarrollando:

$$
p^2+\Delta Np-n_i^2=0
$$

Tenemos una ecuación cuadrática.

La solución físicamente válida es:

$$
\boxed{
p=
\frac{
-\Delta N+
\sqrt{\Delta N^2+4n_i^2}
}{2}
}
$$

Una vez obtenido $p$:

$$
\boxed{
n=p+\Delta N
}
$$

También podemos obtener directamente:

$$
\boxed{
n=
\frac{
\Delta N+
\sqrt{\Delta N^2+4n_i^2}
}{2}
}
$$

Estas expresiones permiten resolver el caso general con donadores y aceptores simultáneamente.

---

# 29. Conductividad del semiconductor

La existencia de portadores no garantiza por sí sola una corriente neta.

Para que exista transporte dirigido necesitamos, por ejemplo, un campo eléctrico.

Cuando aplicamos un campo $\mathbf E$, los electrones y huecos experimentan movimiento de deriva.

La conductividad total es:

$$
\boxed{
\sigma=q(n\mu_n+p\mu_p)
}
$$

Esta expresión contiene dos contribuciones:

$$
\sigma_n=qn\mu_n
$$

debida a los electrones, y:

$$
\sigma_p=qp\mu_p
$$

debida a los huecos.

Por tanto:

$$
\boxed{
\sigma=\sigma_n+\sigma_p
}
$$

o:

$$
\boxed{
\sigma=q(n\mu_n+p\mu_p)
}
$$

---

# 30. Deriva de los electrones

Un electrón posee carga:

$$
-q
$$

Por tanto, la fuerza eléctrica sobre él es:

$$
\boxed{
\mathbf F_n=-q\mathbf E
}
$$

Su movimiento físico de deriva se produce en sentido opuesto al campo eléctrico.

Si:

$$
\mathbf E=E\hat x
$$

entonces la velocidad de deriva electrónica apunta aproximadamente hacia:

$$
-\hat x
$$

Podemos escribir:

$$
\mathbf v_{dn}=-\mu_n\mathbf E
$$

donde $\mu_n>0$.

---

# 31. Deriva de los huecos

Un hueco posee carga efectiva:

$$
+q
$$

Por tanto:

$$
\mathbf F_p=+q\mathbf E
$$

Su movimiento de deriva tiene el mismo sentido que el campo:

$$
\boxed{
\mathbf v_{dp}=\mu_p\mathbf E
}
$$

Así:

```text
Campo eléctrico:

E  ───────────────→

Huecos:

h⁺  ─────────────→

Electrones:

e⁻  ←──────────────
```

---

# 32. ¿Por qué ambos contribuyen a la corriente en el mismo sentido?

Esta cuestión suele producir confusión.

Los electrones se mueven en sentido contrario al campo:

$$
\mathbf v_{dn}=-\mu_n\mathbf E
$$

pero tienen carga negativa:

$$
q_n=-q
$$

La corriente asociada a una carga es proporcional a:

$$
q\,n\,\mathbf v
$$

Por tanto, para electrones:

$$
\mathbf J_n=(-q)n(-\mu_n\mathbf E)
$$

y obtenemos:

$$
\boxed{
\mathbf J_n=qn\mu_n\mathbf E
}
$$

Para huecos:

$$
\mathbf J_p=(+q)p(\mu_p\mathbf E)
$$

por tanto:

$$
\boxed{
\mathbf J_p=qp\mu_p\mathbf E
}
$$

Las dos contribuciones apuntan en el mismo sentido:

$$
\boxed{
\mathbf J=\mathbf J_n+\mathbf J_p
}
$$

y:

$$
\boxed{
\mathbf J=q(n\mu_n+p\mu_p)\mathbf E
}
$$

---

# 33. Movilidad

La movilidad mide la respuesta de un portador frente a un campo eléctrico.

Para electrones:

$$
|\mathbf v_{dn}|=\mu_n|\mathbf E|
$$

Para huecos:

$$
|\mathbf v_{dp}|=\mu_p|\mathbf E|
$$

La movilidad depende de numerosos factores, entre ellos:

* material;
* temperatura;
* concentración de dopantes;
* dispersión por impurezas;
* dispersión por vibraciones de la red;
* estructura cristalina.

En silicio, normalmente:

$$
\boxed{
\mu_n>\mu_p
}
$$

Por tanto, los electrones presentan generalmente una movilidad superior a la de los huecos.

---

# 34. Efecto del dopaje sobre la conductividad

En un semiconductor tipo $N$:

$$
n\gg p
$$

por lo que aproximadamente:

$$
\sigma\approx qn\mu_n
$$

y, si además:

$$
n\approx N_D
$$

entonces:

$$
\boxed{
\sigma\approx qN_D\mu_n
}
$$

En un semiconductor tipo $P$:

$$
p\gg n
$$

y:

$$
\sigma\approx qp\mu_p
$$

Si:

$$
p\approx N_A
$$

entonces:

$$
\boxed{
\sigma\approx qN_A\mu_p
}
$$

Por tanto, el dopaje permite modificar directamente la conductividad.

---

# 35. Resistividad

La resistividad es:

$$
\boxed{
\rho=\frac{1}{\sigma}
}
$$

Por tanto:

$$
\boxed{
\rho=
\frac{1}
{q(n\mu_n+p\mu_p)}
}
$$

Esto muestra matemáticamente por qué aumentar la concentración de portadores reduce la resistividad.

---

# 36. Nivel de Fermi

Ahora podemos introducir una herramienta fundamental para describir la distribución estadística de los electrones:

$$
\boxed{\text{nivel de Fermi}}
$$

El nivel de Fermi $E_F$ es una magnitud energética que aparece en la distribución de Fermi-Dirac.

La probabilidad de ocupación de un estado de energía $E$ es:

$$
\boxed{
f(E)=
\frac{1}
{1+\exp\left(
\frac{E-E_F}{kT}
\right)}
}
$$

donde:

* $E$ es la energía del estado;
* $E_F$ es el nivel de Fermi;
* $k$ es la constante de Boltzmann;
* $T$ es la temperatura absoluta.

---

# 37. Significado de $f(E)$

La función:

$$
f(E)
$$

representa la probabilidad de que un estado electrónico de energía $E$ esté ocupado.

Si:

$$
E=E_F
$$

entonces:

$$
f(E_F)=
\frac{1}{1+e^0}
=
\frac12
$$

por tanto:

$$
\boxed{
f(E_F)=50\%
}
$$

El nivel de Fermi no debe interpretarse simplemente como "la energía del electrón más alto".

Es una magnitud estadística que permite describir la distribución de ocupación de los estados.

---

# 38. Aproximación de Maxwell-Boltzmann

En semiconductores no degenerados, si estamos suficientemente alejados del nivel de Fermi, la distribución de Fermi-Dirac puede aproximarse mediante Maxwell-Boltzmann.

Para estados de conducción:

$$
E-E_F\gg kT
$$

y:

$$
f(E)\approx
\exp\left(
-\frac{E-E_F}{kT}
\right)
$$

Esta aproximación permite obtener expresiones muy útiles para las concentraciones de portadores.

---

# 39. Concentración de electrones

En un semiconductor no degenerado:

$$
\boxed{
n=
N_C
\exp\left(
-\frac{E_C-E_F}{kT}
\right)
}
$$

donde $N_C$ es la densidad efectiva de estados de la banda de conducción.

Esta expresión muestra directamente que:

$$
E_F\uparrow
\quad\Rightarrow\quad
n\uparrow
$$

Es decir, cuanto más cerca está el nivel de Fermi de la banda de conducción, mayor es la concentración de electrones.

---

# 40. Concentración de huecos

De forma análoga:

$$
\boxed{
p=
N_V
\exp\left(
-\frac{E_F-E_V}{kT}
\right)
}
$$

donde $N_V$ es la densidad efectiva de estados de la banda de valencia.

Ahora:

$$
E_F\downarrow
\quad\Rightarrow\quad
p\uparrow
$$

Por tanto, cuanto más cerca está $E_F$ de la banda de valencia, mayor es la concentración de huecos.

---

# 41. Nivel de Fermi intrínseco

En un semiconductor intrínseco:

$$
n=p=n_i
$$

El nivel de Fermi correspondiente se denomina **nivel de Fermi intrínseco**:

$$
E_i
$$

Para un semiconductor ideal puede encontrarse aproximadamente cerca del centro de la banda prohibida.

De forma más precisa:

$$
\boxed{
E_i=
\frac{E_C+E_V}{2}
+
\frac{kT}{2}
\ln\left(
\frac{N_V}{N_C}
\right)
}
$$

Si $N_C$ y $N_V$ fueran iguales, tendríamos exactamente:

$$
E_i=\frac{E_C+E_V}{2}
$$

En general, puede existir un pequeño desplazamiento respecto al centro exacto debido a las diferentes masas efectivas y densidades de estados de electrones y huecos.

---

# 42. Nivel de Fermi en tipo N

Al introducir donadores, aumenta $n$.

Partimos de:

$$
n=
N_C
\exp\left(
-\frac{E_C-E_F}{kT}
\right)
$$

Si $n$ aumenta, para mantener la igualdad debe aumentar $E_F$.

Por tanto:

$$
\boxed{
\text{dopaje N}
\Rightarrow
E_F\uparrow
}
$$

El nivel de Fermi se desplaza hacia la banda de conducción:

$$
\boxed{
E_F\rightarrow E_C
}
$$

Cuanto mayor sea el dopaje tipo $N$, más próximo estará $E_F$ de $E_C$, dentro de la aproximación no degenerada.

---

# 43. Nivel de Fermi en tipo P

En un semiconductor tipo $P$ aumenta la concentración de huecos.

Utilizando:

$$
p=
N_V
\exp\left(
-\frac{E_F-E_V}{kT}
\right)
$$

si $p$ aumenta, $E_F$ debe disminuir.

Por tanto:

$$
\boxed{
\text{dopaje P}
\Rightarrow
E_F\downarrow
}
$$

y:

$$
\boxed{
E_F\rightarrow E_V
}
$$

---

# 44. Representación energética

Podemos resumirlo visualmente:

```text
                 TIPO N

        EC ─────────────────────
             ↑
             │
             │   EF
             │   ───────────────
             │
        EV ─────────────────────
```

El nivel de Fermi se encuentra desplazado hacia $E_C$.

Para tipo $P$:

```text
                 TIPO P

        EC ─────────────────────
             │
             │
             │   ─────────────── EF
             │
        EV ─────────────────────
```

Aquí $E_F$ está desplazado hacia $E_V$.

---

# 45. Relación entre $n$, $p$ y $E_F$

Las expresiones:

$$
n=
N_C
e^{-(E_C-E_F)/(kT)}
$$

y:

$$
p=
N_V
e^{-(E_F-E_V)/(kT)}
$$

muestran algo fundamental:

$$
\boxed{
E_F
\text{ determina estadísticamente la concentración de portadores}
}
$$

Por tanto, el dopaje no solo cambia "el número de electrones o huecos".

También modifica la posición del nivel de Fermi.

Esta idea será especialmente importante cuando dos regiones con diferentes dopajes entren en contacto.

---

# 46. Derivación de la ley de acción de masas

Podemos demostrar la ley:

$$
np=n_i^2
$$

partiendo de:

$$
n=
N_C
\exp\left(
-\frac{E_C-E_F}{kT}
\right)
$$

y:

$$
p=
N_V
\exp\left(
-\frac{E_F-E_V}{kT}
\right)
$$

Multiplicamos:

$$
np=
N_CN_V
\exp\left[
-\frac{E_C-E_F}{kT}
\right]
\exp\left[
-\frac{E_F-E_V}{kT}
\right]
$$

Agrupamos los exponentes:

$$
np=
N_CN_V
\exp\left[
-\frac{E_C-E_V}{kT}
\right]
$$

Como:

$$
E_C-E_V=E_g
$$

obtenemos:

$$
np=
N_CN_V
\exp\left(
-\frac{E_g}{kT}
\right)
$$

Para el semiconductor intrínseco:

$$
n=p=n_i
$$

por tanto:

$$
n_i^2=
N_CN_V
\exp\left(
-\frac{E_g}{kT}
\right)
$$

Finalmente:

$$
\boxed{
np=n_i^2
}
$$

La ley de acción de masas no aparece, por tanto, como una regla aislada: se puede obtener directamente a partir de la estadística de ocupación de los estados.

---

# 47. Semiconductores compensados

Hasta ahora hemos considerado:

* solo donadores;
* o solo aceptores.

Pero en un semiconductor real pueden existir ambos.

Es decir:

$$
N_D\neq0
$$

y:

$$
N_A\neq0
$$

Simultáneamente.

El material se denomina entonces **semiconductor compensado**.

---

# 48. Compensación tipo N

Si:

$$
N_D>N_A
$$

predominan los donadores.

El material se comporta como tipo $N$.

En el régimen de dopaje suficientemente fuerte:

$$
n\approx N_D-N_A
$$

Esta expresión es una aproximación que supone ionización prácticamente completa y que el semiconductor está claramente en régimen extrínseco.

Los electrones siguen siendo los portadores mayoritarios.

---

# 49. Compensación tipo P

Si:

$$
N_A>N_D
$$

predominan los aceptores.

El material se comporta como tipo $P$.

En el régimen extrínseco:

$$
p\approx N_A-N_D
$$

Los huecos son los portadores mayoritarios.

---

# 50. Interpretación física de la compensación

Supongamos:

$$
N_D=10^{16}\ \mathrm{cm^{-3}}
$$

y:

$$
N_A=3\times10^{15}\ \mathrm{cm^{-3}}
$$

Entonces, aproximadamente:

$$
n\approx N_D-N_A
$$

$$
n\approx
10^{16}-3\times10^{15}
$$

$$
\boxed{
n\approx7\times10^{15}\ \mathrm{cm^{-3}}
}
$$

Aunque se hayan introducido $10^{16}$ donadores, los aceptores compensan parcialmente su efecto.

Por eso el dopaje efectivo no es simplemente $N_D$, sino aproximadamente:

$$
\boxed{
N_D-N_A
}
$$

cuando el material es tipo $N$ y estamos en las condiciones de la aproximación.

---

# 51. Resumen de las ecuaciones fundamentales

Las ecuaciones que debemos dominar después de esta parte son:

### Semiconductor intrínseco

$$
\boxed{
n=p=n_i
}
$$

### Ley de acción de masas

$$
\boxed{
np=n_i^2
}
$$

### Neutralidad general

$$
\boxed{
p+N_D^+=n+N_A^-
}
$$

### Neutralidad con ionización completa

$$
\boxed{
p+N_D=n+N_A
}
$$

### Conductividad

$$
\boxed{
\sigma=q(n\mu_n+p\mu_p)
}
$$

### Densidad de corriente

$$
\boxed{
\mathbf J=\sigma\mathbf E
}
$$

### Concentración de electrones

$$
\boxed{
n=
N_Ce^{-(E_C-E_F)/(kT)}
}
$$

### Concentración de huecos

$$
\boxed{
p=
N_Ve^{-(E_F-E_V)/(kT)}
}
$$

### Distribución de Fermi-Dirac

$$
\boxed{
f(E)=
\frac{1}
{1+e^{(E-E_F)/(kT)}}
}
$$

---

# 52. Visión global

Ahora podemos completar una parte importante de la cadena física:

$$
\boxed{
\text{estructura de bandas}
\rightarrow
\text{portadores}
\rightarrow
\text{dopaje}
\rightarrow
\text{concentraciones}
\rightarrow
\text{conductividad}
}
$$

El dopaje permite fabricar regiones con características radicalmente diferentes:

```text
TIPO P                         TIPO N

Muchos huecos                  Muchos electrones
p >> n                         n >> p

EF cercano a EV                EF cercano a EC

Aceptores                      Donadores
NA >> ND                       ND >> NA
```

Esta diferencia será precisamente la que haga posible construir una unión PN.

---

# 53. Concepto clave antes de la unión PN

Imaginemos ahora dos bloques separados:

```text
REGIÓN P                         REGIÓN N

p >> n                           n >> p

Muchos huecos                    Muchos electrones

EF,P                             EF,N
──────                            ──────
cerca de EV                      cerca de EC
```

Antes de ponerlos en contacto, cada región puede considerarse aproximadamente independiente.

Por tanto, sus concentraciones de portadores son diferentes y, en general, sus niveles de Fermi también son diferentes:

$$
E_{F,P}\neq E_{F,N}
$$

Esto será crucial.

Cuando las dos regiones entren en contacto, el sistema tenderá hacia el equilibrio termodinámico.

En equilibrio, el nivel de Fermi debe ser uniforme:

$$
\boxed{
E_F=\text{constante}
}
$$

Para conseguirlo, las cargas no pueden permanecer distribuidas exactamente como estaban antes del contacto.

Los portadores comenzarán a desplazarse.

Y aquí comienza la física de la **unión PN**.

---

# 54. Cadena conceptual de la Parte II

Podemos resumir todo el desarrollo:

$$
\boxed{
\text{semiconductor puro}
}
$$

$$
\downarrow
$$

$$
\boxed{
n=p=n_i
}
$$

$$
\downarrow
$$

$$
\boxed{
\text{dopaje}
}
$$

$$
\downarrow
$$

$$
\boxed{
\begin{cases}
N_D>N_A &\Rightarrow \text{tipo N}\\
N_A>N_D &\Rightarrow \text{tipo P}
\end{cases}
}
$$

$$
\downarrow
$$

$$
\boxed{
np=n_i^2
}
$$

$$
\downarrow
$$

$$
\boxed{
n,p\ \text{determinados por dopaje y equilibrio}
}
$$

$$
\downarrow
$$

$$
\boxed{
\sigma=q(n\mu_n+p\mu_p)
}
$$

$$
\downarrow
$$

$$
\boxed{
E_F
\text{ se desplaza según el tipo y nivel de dopaje}
}
$$

Finalmente:

$$
\boxed{
E_{F,P}\neq E_{F,N}
\quad\text{antes del contacto}
}
$$

y esto prepara el problema fundamental que resolveremos en la siguiente parte:

$$
\boxed{
\text{¿qué ocurre cuando P y N se ponen en contacto?}
}
$$

---

# 55. Idea fundamental que debemos conservar

El punto más importante de esta parte es que **el dopaje permite controlar la concentración de portadores sin cambiar la estructura fundamental del semiconductor**.

Una región tipo $N$ no es un material "con electrones en lugar de silicio", ni una región tipo $P$ es un material "con cargas positivas añadidas".

Ambas siguen siendo redes semiconductoras, pero las impurezas modifican profundamente el equilibrio electrónico:

$$
\boxed{
\text{dopantes}
\rightarrow
\text{niveles energéticos}
\rightarrow
\text{ionización}
\rightarrow
\text{portadores}
\rightarrow
\text{nivel de Fermi}
\rightarrow
\text{conductividad}
}
$$

Y cuando dos regiones con diferentes concentraciones de portadores y diferentes niveles de Fermi se ponen en contacto, aparece necesariamente una redistribución de carga.

Esa redistribución será el origen de:

$$
\boxed{
\text{difusión}
\rightarrow
\text{carga espacial}
\rightarrow
\text{campo eléctrico interno}
\rightarrow
\text{región de agotamiento}
\rightarrow
\text{potencial de contacto}
}
$$

Todo ello será desarrollado en la **Parte III: Unión PN y equilibrio físico**.

# Mapa conceptual — Parte II

```text
                         SEMICONDUCTOR
                              │
                    ┌─────────┴─────────┐
                    │                   │
                Intrínseco          Extrínseco
                    │                   │
                 n = p = ni             │
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                           Donadores           Aceptores
                              │                   │
                             ND                  NA
                              │                   │
                           Tipo N              Tipo P
                              │                   │
                         n >> p                p >> n
                              │                   │
                         EF → EC               EF → EV
                              │                   │
                              └─────────┬─────────┘
                                        │
                                        ▼
                              EQUILIBRIO TÉRMICO
                                        │
                          ┌─────────────┴─────────────┐
                          │                           │
                   Acción de masas               Neutralidad
                          │                           │
                     np = ni²                  p + ND = n + NA
                          │                           │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                                  TRANSPORTE
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                          Electrones           Huecos
                              │                   │
                           μn, q=-q            μp, q=+q
                              │                   │
                              └─────────┬─────────┘
                                        │
                                        ▼
                                  CONDUCTIVIDAD
                                        │
                                        ▼
                           σ = q(nμn + pμp)
                                        │
                                        ▼
                                  NIVEL DE FERMI
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                     Tipo N                        Tipo P
                         │                             │
                       EF → EC                       EF → EV
                         │                             │
                         └──────────────┬──────────────┘
                                        │
                                        ▼
                                  CONTACTO P-N
```

La siguiente etapa será explicar qué ocurre físicamente cuando se realiza ese contacto.

---
---
---
---
# Semiconductores — Parte III: Unión PN, física y equilibrio

## 1. Introducción

En la Parte II estudiamos por separado los semiconductores de tipo N y tipo P. Ahora vamos a ponerlos en contacto.

La unión PN es la estructura fundamental sobre la que se construyen los **diodos**, transistores, LEDs, células solares y muchos otros dispositivos semiconductores.

La idea central es que, al poner en contacto una región P y una región N, los portadores mayoritarios empiezan a desplazarse debido al gradiente de concentración. Este proceso genera una región sin portadores móviles, una **región de agotamiento**, y una diferencia de potencial interna que termina deteniendo la difusión neta.

La cadena física fundamental es:

$$
\boxed{
\text{P + N}
\rightarrow
\text{difusión}
\rightarrow
\text{recombinación}
\rightarrow
\text{carga espacial}
\rightarrow
\text{campo eléctrico interno}
\rightarrow
\text{equilibrio}
}
$$

La unión PN puede entenderse, por tanto, como un equilibrio entre dos mecanismos:

* **difusión**, causada por diferencias de concentración;
* **deriva (drift)**, causada por el campo eléctrico interno.

En equilibrio:

$$
\boxed{J_{\text{difusión}}+J_{\text{deriva}}=0}
$$

para cada tipo de portador.

---

# 2. Situación antes de formar la unión

Consideremos dos regiones independientes:

* una región **P**, dopada con aceptores;
* una región **N**, dopada con donadores.

Supongamos que ambas están fabricadas con el mismo semiconductor, por ejemplo silicio.

Antes de ponerlas en contacto:

$$
\boxed{E_{F,P}\neq E_{F,N}}
$$

en general.

Esto es importante.

En la región P, los huecos son los portadores mayoritarios:

$$
p_P\gg n_P
$$

mientras que en la región N los electrones son mayoritarios:

$$
n_N\gg p_N
$$

En condiciones de régimen extrínseco y suponiendo ionización completa:

$$
p_P\approx N_A
$$

y

$$
n_N\approx N_D
$$

Además:

$$
n_P=\frac{n_i^2}{p_P}
$$

y

$$
p_N=\frac{n_i^2}{n_N}
$$

por la ley de acción de masas.

Por tanto, tenemos una fuerte diferencia de concentración entre ambos lados.

---

# 3. ¿Qué ocurre cuando P y N entran en contacto?

Supongamos inicialmente:

```text
        REGIÓN P              REGIÓN N

     huecos: muchos        electrones: muchos
     electrones: pocos     huecos: pocos

        p ≫ n                  n ≫ p
```

Al eliminar la separación física entre ambas regiones aparece una interfaz.

Los portadores ya pueden desplazarse de una región a otra.

Y aquí aparece el primer fenómeno fundamental:

> **Los portadores mayoritarios comienzan a difundirse desde la región donde están más concentrados hacia la región donde están menos concentrados.**

Por tanto:

### Huecos

Los huecos están muy concentrados en P y poco concentrados en N.

Por ello:

$$
\boxed{\text{huecos: P}\rightarrow\text{N}}
$$

### Electrones

Los electrones están muy concentrados en N y poco concentrados en P.

Por ello:

$$
\boxed{\text{electrones: N}\rightarrow\text{P}}
$$

Es decir, inicialmente tenemos:

```text
             difusión

       P                     N
       |                     |
       |   h  → → →          |
       |          ← ← ←  e⁻  |
       |                     |
```

donde:

* $h$ representa huecos;
* $e^-$ representa electrones.

---

# 4. ¿Por qué se produce la difusión?

La difusión no necesita inicialmente ningún campo eléctrico.

Se produce debido al **gradiente de concentración**.

Un portador sometido a movimiento térmico se mueve aleatoriamente. Si existe una concentración mucho mayor de portadores en una región que en otra, estadísticamente habrá un flujo neto desde la región de mayor concentración hacia la de menor concentración.

En términos de densidad de corriente:

### Corriente de difusión de electrones

$$
\boxed{
\mathbf J_{n,\text{dif}}
=
qD_n\nabla n
}
$$

### Corriente de difusión de huecos

$$
\boxed{
\mathbf J_{p,\text{dif}}
=
-qD_p\nabla p
}
$$

donde:

* $D_n$ es la constante de difusión de electrones;
* $D_p$ es la constante de difusión de huecos;
* $n$ es la concentración de electrones;
* $p$ es la concentración de huecos;
* $q$ es el valor positivo de la carga elemental.

Los signos de estas expresiones tienen que ver con el hecho de que el electrón posee carga $-q$, mientras que el hueco posee carga $+q$.

La interpretación física es más importante inicialmente que memorizar las fórmulas:

$$
\boxed{\text{gradiente de concentración}\rightarrow\text{difusión}}
$$

---

# 5. Los portadores no atraviesan la unión indefinidamente

Aquí aparece uno de los puntos más importantes de la unión PN.

Podríamos pensar inicialmente:

> Si los electrones están en N y los huecos en P, ¿no seguirán cruzando indefinidamente hasta que todo el semiconductor se vuelva uniforme?

No.

A medida que los portadores mayoritarios se difunden, modifican la distribución de carga eléctrica alrededor de la unión.

Este fenómeno crea un **campo eléctrico interno** que se opone progresivamente a la difusión.

Vamos a verlo paso a paso.

---

# 6. ¿Qué ocurre con los electrones que abandonan la región N?

En la región N tenemos átomos donadores.

Por ejemplo, imaginemos un átomo de fósforo introducido en silicio.

Cuando el donador libera su electrón:

$$
D\rightarrow D^++e^-
$$

el electrón pasa a formar parte de los portadores móviles.

El ion donador que queda en la red cristalina es:

$$
D^+
$$

y está prácticamente inmóvil porque forma parte de la estructura cristalina.

Por tanto, inicialmente podemos imaginar:

```text
N:

D⁺     D⁺     D⁺
  e⁻    e⁻
D⁺     D⁺     D⁺
```

Los electrones son móviles.

Los iones donadores son prácticamente inmóviles.

---

## 6.1. Difusión de electrones hacia P

Cuando los electrones cercanos a la interfaz se difunden:

$$
N\rightarrow P
$$

dejan detrás los iones donadores positivos.

Por tanto, cerca de la interfaz N empieza a quedar una región con:

$$
\rho>0
$$

porque predominan los iones:

$$
D^+
$$

que están fijos en la red.

---

# 7. ¿Qué ocurre con los huecos que abandonan P?

En la región P tenemos aceptores.

Cuando un átomo aceptor captura un electrón, queda cargado negativamente:

$$
A+e^-\rightarrow A^-
$$

Los aceptores ionizados son:

$$
A^-
$$

y permanecen prácticamente inmóviles en la red.

Los huecos son móviles.

Cuando los huecos cercanos a la interfaz se difunden:

$$
P\rightarrow N
$$

dejan detrás los iones aceptores negativos.

Por tanto, cerca de la interfaz P empieza a quedar:

$$
\rho<0
$$

debido a la presencia de:

$$
A^-
$$

---

# 8. Aparición de la región de agotamiento

Después de cierto tiempo tenemos aproximadamente:

```text
              UNIÓN PN

        P                     N
   ───────────┬────────────────────
              │
       A⁻ A⁻  │  D⁺ D⁺
       A⁻ A⁻  │  D⁺ D⁺
       A⁻ A⁻  │  D⁺ D⁺
              │
        − − − │ + + +
```

En las proximidades de la unión:

* han desaparecido muchos portadores móviles;
* permanecen los iones aceptores negativos;
* permanecen los iones donadores positivos.

Esta región recibe varios nombres:

* **región de agotamiento**;
* **región de depleción**;
* **región de carga espacial**;
* **depletion region**;
* **space-charge region**.

El término "agotamiento" hace referencia al agotamiento de **portadores móviles**.

No significa que no haya cargas.

De hecho, precisamente ocurre lo contrario:

> La región contiene carga eléctrica neta debido a los iones dopantes inmóviles.

---

# 9. ¿Por qué se llama región de carga espacial?

Porque la carga eléctrica ya no está compensada localmente.

En una región N neutra tenemos aproximadamente:

$$
\rho\approx0
$$

porque las cargas positivas y negativas se compensan.

En una región P neutra ocurre lo mismo:

$$
\rho\approx0
$$

Pero dentro de la región de agotamiento:

### Lado P

Predominan:

$$
A^-
$$

por lo que:

$$
\rho<0
$$

### Lado N

Predominan:

$$
D^+
$$

por lo que:

$$
\rho>0
$$

Esquemáticamente:

```text
       P                 N

       |                 |
       |   − − − | + + + |
       |   − − − | + + + |
       |   − − − | + + + |
       |         |
       └─────────┴─────────→ x
```

Esta distribución de carga será precisamente la que utilizaremos en la Parte IV para resolver la ecuación de Poisson.

---

# 10. La carga espacial crea un campo eléctrico

Tenemos una distribución de cargas:

$$
\boxed{
\text{P: carga negativa}
\qquad
\text{N: carga positiva}
}
$$

Sabemos que las líneas de campo eléctrico van desde las cargas positivas hacia las negativas.

Por tanto, el campo eléctrico interno apunta:

$$
\boxed{\mathbf E:\text{N}\rightarrow\text{P}}
$$

Es decir:

```text
       P                         N
       |                         |
       − − − − ← ← ← ← ← + + + 
                         E
```

Si definimos el eje $x$ creciendo de P hacia N:

$$
P\quad\longrightarrow\quad N
$$

entonces el campo eléctrico apunta en dirección $-x$:

$$
\boxed{E_x<0}
$$

dentro de la región de agotamiento.

---

# 11. El campo eléctrico se opone a la difusión

Este es probablemente el concepto más importante de toda esta parte.

La difusión intenta seguir haciendo:

$$
\text{huecos: P}\rightarrow\text{N}
$$

y

$$
\text{electrones: N}\rightarrow\text{P}
$$

Pero aparece un campo:

$$
\boxed{\mathbf E:\text{N}\rightarrow\text{P}}
$$

Ahora debemos analizar qué hace este campo con cada portador.

---

# 12. Fuerza eléctrica sobre un hueco

Un hueco tiene carga:

$$
q_h=+q
$$

Por la fuerza de Lorentz eléctrica:

$$
\mathbf F=q_h\mathbf E
$$

por lo que:

$$
\mathbf F_h=q\mathbf E
$$

El hueco se mueve en la dirección del campo.

Como:

$$
\mathbf E:\text{N}\rightarrow\text{P}
$$

tenemos:

$$
\boxed{
\text{deriva de huecos: N}\rightarrow\text{P}
}
$$

Pero la difusión de huecos era:

$$
\boxed{
\text{difusión de huecos: P}\rightarrow\text{N}
}
$$

Por tanto:

$$
\boxed{
\text{difusión}\leftrightarrow\text{deriva}
}
$$

son mecanismos opuestos.

---

# 13. Fuerza eléctrica sobre un electrón

El electrón tiene carga:

$$
q_e=-q
$$

Por tanto:

$$
\mathbf F_e=-q\mathbf E
$$

El electrón se mueve en dirección contraria al campo eléctrico.

Como el campo apunta:

$$
\text{N}\rightarrow\text{P}
$$

el movimiento de deriva de los electrones es:

$$
\boxed{
\text{deriva de electrones: P}\rightarrow\text{N}
}
$$

Pero la difusión de electrones era:

$$
\boxed{
\text{difusión de electrones: N}\rightarrow\text{P}
}
$$

De nuevo:

$$
\boxed{
\text{difusión}\leftrightarrow\text{deriva}
}
$$

---

# 14. Resumen físico de las dos corrientes

Podemos representar todo el proceso así:

```text
                         UNIÓN PN

        P                                        N

   huecos: muchos                         electrones: muchos

       h  ───────────────→
          DIFUSIÓN

                         ←───────────────  e⁻
                              DIFUSIÓN


       ←──────────────────────────────
                 DERIVA
                  h⁺

       ──────────────────────────────→
                 DERIVA
                  e⁻
```

Por tanto:

| Portador   | Difusión | Deriva por campo interno |
| ---------- | -------- | ------------------------ |
| Huecos     | P → N    | N → P                    |
| Electrones | N → P    | P → N                    |

La orientación espacial de los portadores es importante, pero también hay que distinguir **movimiento de carga** de **corriente convencional**.

---

# 15. Movimiento de electrones y sentido de corriente

Esto suele generar confusión.

Un electrón se mueve en dirección contraria al campo eléctrico porque tiene carga negativa.

Pero la corriente convencional asociada al movimiento de una carga negativa tiene sentido contrario al movimiento de esa carga.

Por eso, aunque:

$$
\text{electrones: movimiento}\quad P\rightarrow N
$$

la corriente eléctrica asociada a su deriva apunta:

$$
\boxed{\mathbf J_n:\text{N}\rightarrow\text{P}}
$$

Es decir, en una representación de corriente convencional, tanto la corriente de deriva de electrones como la de huecos están relacionadas con el campo de manera consistente.

---

# 16. La región de agotamiento crece

Al principio, la difusión es fuerte porque existe una gran diferencia de concentración.

Por tanto:

$$
|\mathbf J_{\text{difusión}}|
$$

es grande.

La difusión provoca una separación progresiva de cargas y, por tanto, aumenta el campo eléctrico interno.

A medida que aumenta $E$:

$$
|\mathbf J_{\text{deriva}}|
$$

también aumenta.

Tenemos entonces:

$$
\boxed{
\text{más difusión}
\rightarrow
\text{más carga espacial}
\rightarrow
\text{mayor }E
\rightarrow
\text{más deriva}
}
$$

Hasta alcanzar una situación de equilibrio.

---

# 17. Equilibrio de la unión PN

En equilibrio térmico ya no existe una corriente neta a través de la unión.

Pero esto **no significa que los portadores hayan dejado de moverse**.

Los portadores siguen teniendo movimiento térmico y, microscópicamente, pueden seguir existiendo procesos de difusión y deriva.

Lo que ocurre es que ambos efectos se compensan.

Para los electrones:

$$
\boxed{
J_{n,\mathrm{dif}}+J_{n,\mathrm{drift}}=0
}
$$

y para los huecos:

$$
\boxed{
J_{p,\mathrm{dif}}+J_{p,\mathrm{drift}}=0
}
$$

Por tanto:

$$
\boxed{
J_n=0
}
$$

y:

$$
\boxed{
J_p=0
}
$$

y, consecuentemente:

$$
\boxed{
J_{\mathrm{total}}=0
}
$$

---

# 18. No confundir equilibrio con ausencia de movimiento

Este punto es especialmente importante.

En equilibrio:

$$
J_{\text{neto}}=0
$$

pero no necesariamente:

$$
J_{\text{difusión}}=0
$$

ni:

$$
J_{\text{deriva}}=0
$$

De hecho:

$$
J_{\text{difusión}}=-J_{\text{deriva}}
$$

Por tanto:

```text
             DIFUSIÓN
                 →
                 →
                 →

             ←
             ←
             ←
             DERIVA
```

La suma es cero.

Esto es exactamente análogo a otros equilibrios físicos donde existen procesos microscópicos opuestos cuya contribución neta se cancela.

---

# 19. ¿Por qué deja de crecer la región de agotamiento?

Inicialmente:

$$
J_{\text{difusión}}>J_{\text{deriva}}
$$

en términos de magnitud.

Por tanto, los portadores siguen cruzando la unión.

Pero al crecer la región de agotamiento aumenta el campo eléctrico:

$$
E\uparrow
$$

y con él aumenta la deriva.

Finalmente:

$$
|J_{\text{difusión}}|
=
|J_{\text{deriva}}|
$$

y entonces:

$$
J_{\text{neto}}=0
$$

La región de agotamiento deja de crecer.

Se alcanza el equilibrio.

---

# 20. El potencial eléctrico interno

El campo eléctrico está relacionado con el potencial eléctrico mediante:

$$
\boxed{
\mathbf E=-\nabla V
}
$$

En una dimensión:

$$
\boxed{
E(x)=-\frac{dV(x)}{dx}
}
$$

Por tanto, si existe un campo eléctrico interno en la región de agotamiento, necesariamente existe una variación espacial del potencial eléctrico.

La unión PN desarrolla una diferencia de potencial interna denominada:

$$
\boxed{V_{bi}}
$$

que recibe el nombre de:

* potencial incorporado;
* potencial interno;
* potencial de contacto;
* built-in potential.

---

# 21. Interpretación física de $V_{bi}$

El potencial incorporado representa la diferencia de potencial electrostático asociada a la región de carga espacial en equilibrio.

Su existencia es consecuencia directa de:

$$
\boxed{
\text{difusión de portadores}
\rightarrow
\text{separación de cargas}
\rightarrow
\text{campo eléctrico}
\rightarrow
\text{diferencia de potencial}
}
$$

No es un potencial aplicado desde el exterior.

Aparece espontáneamente al formar la unión.

---

# 22. El potencial incorporado no es una batería externa

Es importante distinguir:

### Potencial externo aplicado

Proviene de una fuente externa:

$$
V_{\text{fuente}}
$$

por ejemplo, una batería.

### Potencial incorporado

Aparece internamente debido a la redistribución de carga:

$$
V_{bi}
$$

Por tanto, una unión PN en equilibrio posee internamente una diferencia de potencial aunque no haya conectado ninguna batería.

---

# 23. Expresión del potencial incorporado

Para una unión PN ideal, abrupta, en equilibrio, con semiconductor no degenerado y bajo las aproximaciones habituales de dopaje y temperatura, el potencial incorporado es:

$$
\boxed{
V_{bi}
=
\frac{kT}{q}
\ln
\left(
\frac{N_A N_D}{n_i^2}
\right)
}
$$

donde:

* $k$ es la constante de Boltzmann;
* $T$ es la temperatura absoluta;
* $q$ es la carga elemental;
* $N_A$ es la concentración de aceptores;
* $N_D$ es la concentración de donadores;
* $n_i$ es la concentración intrínseca.

Esta ecuación muestra algo físicamente muy interesante:

$$
V_{bi}\uparrow
\quad\text{si}\quad
N_A N_D\uparrow
$$

Es decir, cuanto más fuertemente dopadas estén ambas regiones, mayor será, bajo estas aproximaciones, el potencial incorporado.

La dependencia con la temperatura también aparece explícitamente a través de:

$$
\frac{kT}{q}
$$

y, de forma mucho más importante, implícitamente mediante:

$$
n_i(T)
$$

---

# 24. ¿De dónde sale la expresión de $V_{bi}$?

No debemos tratarla como una fórmula aislada.

Su origen está en la condición de equilibrio.

En equilibrio, el nivel de Fermi debe ser constante en todo el semiconductor:

$$
\boxed{
E_F=\text{constante}
}
$$

Antes del contacto:

$$
E_{F,P}\neq E_{F,N}
$$

Después de alcanzar el equilibrio:

$$
\boxed{
E_{F,P}=E_{F,N}
}
$$

La redistribución de portadores necesaria para conseguir esta condición genera el campo eléctrico interno.

Por tanto:

$$
\boxed{
\text{alineamiento de }E_F
\leftrightarrow
\text{redistribución de carga}
\leftrightarrow
V_{bi}
}
$$

---

# 25. Nivel de Fermi antes y después del contacto

Antes de formar la unión:

```text
P separado                    N separado

EF,P                          EF,N
──────                        ──────
                             
EV                             EC
```

En una región P:

$$
E_F
$$

está más próximo a $E_V$.

En una región N:

$$
E_F
$$

está más próximo a $E_C$.

Por tanto:

$$
E_{F,P}\neq E_{F,N}
$$

Si ponemos ambos materiales en contacto, ya no pueden mantener indefinidamente dos niveles de Fermi distintos si están en equilibrio térmico y forman un único sistema.

El sistema evoluciona hasta:

$$
\boxed{
E_F(x)=\text{constante}
}
$$

---

# 26. Bandas de energía y curvatura de bandas

La condición de Fermi constante se representa mediante el llamado **doblamiento de bandas** (*band bending*).

En equilibrio, las bandas $E_C$ y $E_V$ dejan de ser constantes espacialmente en la región de unión.

Conceptualmente:

```text
Energía

 ↑

 EC        _________
          /
         /
 EF  ────────────────────
       /
      /
 EV _/____________________

          posición x →
```

La forma exacta y el sentido de la curvatura dependen de la convención elegida para el eje, la referencia energética y el perfil de potencial.

La idea fundamental que debemos conservar es:

$$
\boxed{
E_F=\text{constante}
}
$$

mientras que:

$$
\boxed{
E_C(x),E_V(x)
}
$$

varían espacialmente en la región de unión.

---

# 27. Relación entre potencial eléctrico y energía de los electrones

Un electrón posee carga:

$$
-q
$$

Por tanto, su energía potencial electrostática es:

$$
U=-qV
$$

Consecuentemente, los bordes de banda se desplazan con el potencial electrostático siguiendo, salvo una constante de referencia:

$$
\boxed{
E_C(x)=-qV(x)+C_C
}
$$

y

$$
\boxed{
E_V(x)=-qV(x)+C_V
}
$$

Como consecuencia:

$$
\boxed{
E_C(x)-E_V(x)=E_g
}
$$

si el material es el mismo y suponemos un $E_g$ constante.

Es decir, el potencial eléctrico puede modificar conjuntamente la posición energética de las bandas sin modificar necesariamente su separación:

$$
E_g=E_C-E_V
$$

---

# 28. Una sutileza importante: $V_{bi}$ no es simplemente lo que mide un voltímetro

Es habitual escuchar:

> "La unión PN tiene una tensión $V_{bi}$, así que si pongo un voltímetro debería medir $V_{bi}$."

Esto no es correcto de forma general.

El potencial incorporado es una **diferencia de potencial electrostático interna** asociada a la unión.

Cuando conectamos contactos metálicos y un instrumento de medida aparecen otros potenciales de contacto y efectos electroquímicos que deben considerarse.

En una unión PN aislada en equilibrio, no podemos interpretar directamente $V_{bi}$ como una tensión externa disponible en bornes.

Por eso:

$$
\boxed{
V_{bi}\neq\text{necesariamente tensión medida con un voltímetro}
}
$$

Esta distinción es importante cuando se pasa de un modelo físico interno del semiconductor a un dispositivo real conectado a un circuito.

---

# 29. Neutralidad eléctrica lejos de la unión

La región de agotamiento no ocupa todo el semiconductor.

Lejos de la interfaz, ambas regiones vuelven a ser aproximadamente neutras.

En la región P neutra:

$$
\rho\approx0
$$

y en la región N neutra:

$$
\rho\approx0
$$

Por tanto:

```text
            región P       agotamiento       región N

ρ(x)       ≈ 0              < 0               > 0
             |                |                 |
─────────────┴────────────────┴─────────────────┴──────→ x
```

El campo eléctrico también está principalmente concentrado en la región de agotamiento.

En el modelo ideal:

$$
E\approx0
$$

fuera de la región de agotamiento.

Esto será fundamental para resolver matemáticamente el problema en la Parte IV.

---

# 30. ¿Por qué la región de agotamiento no tiene el mismo tamaño a ambos lados?

Esta es otra consecuencia importante del dopaje.

Supongamos una unión donde:

$$
N_A\gg N_D
$$

Es decir, el lado P está mucho más dopado que el lado N.

Para conseguir la carga espacial necesaria, basta con una pequeña región del lado P para obtener una determinada carga negativa.

En cambio, hace falta una región más extensa del lado N para obtener la carga positiva correspondiente.

Por tanto:

$$
\boxed{
\text{la región de agotamiento se extiende más hacia el lado menos dopado}
}
$$

Si:

$$
N_A\gg N_D
$$

entonces:

$$
x_N\gg x_P
$$

donde:

* $x_P$ es la extensión del agotamiento en P;
* $x_N$ es la extensión del agotamiento en N.

En una unión fuertemente asimétrica:

```text
       P                         N
       |                         |
       |      |<--->|<-------------------->|
       |       xP              xN          |
       |__________ agotamiento ____________|
```

El lado N, al estar menos dopado, necesita una región espacial mayor para compensar la carga.

---

# 31. Conservación de la carga en la región de agotamiento

En equilibrio, la carga negativa del lado P debe compensarse con la carga positiva del lado N.

Por tanto:

$$
|Q_P|=|Q_N|
$$

o:

$$
\boxed{
Q_P+Q_N=0
}
$$

Si suponemos dopaje uniforme:

$$
Q_P\approx -qN_Ax_P
$$

y:

$$
Q_N\approx qN_Dx_N
$$

Por tanto:

$$
-qN_Ax_P+qN_Dx_N=0
$$

y:

$$
\boxed{
N_Ax_P=N_Dx_N
}
$$

Esta relación es extremadamente útil.

Muestra matemáticamente que:

$$
N_A\gg N_D
\quad\Rightarrow\quad
x_N\gg x_P
$$

como habíamos deducido físicamente.

La expresión completa de la anchura de agotamiento la derivaremos en la Parte IV.

---

# 32. ¿Qué sucede exactamente en el equilibrio?

Podemos resumir toda la evolución temporal:

### Paso 1 — Antes del contacto

Tenemos:

$$
E_{F,P}\neq E_{F,N}
$$

y grandes concentraciones de portadores mayoritarios en sus respectivas regiones.

### Paso 2 — Se forma el contacto

Los portadores encuentran una interfaz común.

### Paso 3 — Difusión inicial

Los huecos se difunden:

$$
P\rightarrow N
$$

y los electrones:

$$
N\rightarrow P
$$

### Paso 4 — Recombinación

Los electrones y huecos que se encuentran cerca de la interfaz pueden recombinarse.

### Paso 5 — Aparición de carga espacial

Quedan expuestos:

$$
A^-
$$

en P y:

$$
D^+
$$

en N.

### Paso 6 — Aparición del campo eléctrico

La separación de cargas produce:

$$
\mathbf E:\text{N}\rightarrow\text{P}
$$

### Paso 7 — Aumento de la deriva

El campo eléctrico produce corrientes de deriva que se oponen a la difusión.

### Paso 8 — Equilibrio

Finalmente:

$$
J_{n,\text{dif}}+J_{n,\text{drift}}=0
$$

y:

$$
J_{p,\text{dif}}+J_{p,\text{drift}}=0
$$

### Paso 9 — Equilibrio electrostático

El sistema presenta:

* región de agotamiento;
* campo eléctrico interno;
* potencial incorporado;
* nivel de Fermi constante.

---

# 33. La unión PN vista desde cuatro magnitudes

Una forma muy útil de organizar mentalmente la unión PN es relacionar cuatro magnitudes:

$$
\boxed{
\rho(x)
\longrightarrow
E(x)
\longrightarrow
V(x)
\longrightarrow
E_C(x),E_V(x)
}
$$

Es decir:

### 1. Distribución de carga

Los dopantes ionizados producen:

$$
\rho(x)
$$

### 2. Campo eléctrico

La carga genera:

$$
\nabla\cdot\mathbf E=\frac{\rho}{\epsilon}
$$

### 3. Potencial eléctrico

El campo está relacionado con:

$$
\mathbf E=-\nabla V
$$

### 4. Bandas de energía

El potencial modifica la energía electrostática de los electrones:

$$
E_C(x),E_V(x)\propto-qV(x)
$$

Esta cadena será el punto de partida matemático de la Parte IV.

---

# 34. Ecuaciones fundamentales que debemos conservar

Para una unión PN en equilibrio, las relaciones fundamentales son:

### Carga espacial

$$
\boxed{
\rho(x)=q\left[p(x)-n(x)+N_D^+(x)-N_A^-(x)\right]
}
$$

Esta es la expresión general.

Dentro de la aproximación de agotamiento, los portadores móviles se consideran despreciables dentro de la región de agotamiento:

$$
n\approx0
$$

$$
p\approx0
$$

y con dopantes completamente ionizados:

$$
N_D^+\approx N_D
$$

$$
N_A^-\approx N_A
$$

por lo que:

### Lado P agotado

$$
\boxed{
\rho(x)\approx-qN_A
}
$$

### Lado N agotado

$$
\boxed{
\rho(x)\approx+qN_D
}
$$

---

### Campo eléctrico

$$
\boxed{
\nabla\cdot\mathbf E=\frac{\rho}{\epsilon}
}
$$

En una dimensión:

$$
\boxed{
\frac{dE}{dx}=\frac{\rho(x)}{\epsilon}
}
$$

---

### Potencial

$$
\boxed{
E=-\frac{dV}{dx}
}
$$

---

### Equilibrio de corriente

Para electrones:

$$
\boxed{
J_n=J_{n,\mathrm{drift}}+J_{n,\mathrm{dif}}=0
}
$$

Para huecos:

$$
\boxed{
J_p=J_{p,\mathrm{drift}}+J_{p,\mathrm{dif}}=0
}
$$

---

# 35. Una visión física completa

Podemos condensar el funcionamiento de una unión PN en una única secuencia:

$$
\boxed{
\begin{array}{c}
\text{P y N separados}\\
\downarrow\\
E_{F,P}\neq E_{F,N}\\
\downarrow\\
\text{contacto}\\
\downarrow\\
\text{difusión de huecos P}\rightarrow\text{N}\\
\text{difusión de electrones N}\rightarrow\text{P}\\
\downarrow\\
\text{recombinación}\\
\downarrow\\
A^-\text{ en P},\ D^+\text{ en N}\\
\downarrow\\
\text{región de agotamiento}\\
\downarrow\\
\text{campo interno N}\rightarrow\text{P}\\
\downarrow\\
\text{deriva opuesta a difusión}\\
\downarrow\\
J_{\text{dif}}+J_{\text{drift}}=0\\
\downarrow\\
E_F=\text{constante}\\
\downarrow\\
V_{bi}
\end{array}
}
$$

---

# 36. Qué NO debemos confundir

## 36.1. Región de agotamiento ≠ región sin carga

Incorrecto:

> "En la región de agotamiento no hay carga."

Correcto:

> Hay pocos portadores móviles, pero existe carga espacial neta debida principalmente a los iones dopantes inmóviles.

---

## 36.2. Equilibrio ≠ ausencia de movimiento

Incorrecto:

> "En equilibrio los electrones y huecos están quietos."

Correcto:

> Los procesos de difusión y deriva se compensan, produciendo corriente neta cero.

---

## 36.3. Campo interno ≠ campo aplicado

El campo interno aparece espontáneamente debido a la redistribución de carga.

Un campo externo aparece al aplicar una tensión mediante una fuente.

---

## 36.4. $V_{bi}$ ≠ tensión externa directamente disponible

El potencial incorporado es una magnitud interna de la unión y no debe interpretarse directamente como la tensión que necesariamente mediría un voltímetro conectado a la estructura.

---

## 36.5. Los electrones no se mueven en la dirección del campo

Como:

$$
q_e=-q
$$

tenemos:

$$
\mathbf F_e=-q\mathbf E
$$

por lo que su movimiento de deriva es contrario a $\mathbf E$.

Los huecos, en cambio, se desplazan en la dirección de $\mathbf E$.

---

# 37. Concepto clave: barrera de potencial

La unión PN genera una **barrera de potencial** que dificulta que los portadores mayoritarios continúen atravesando la unión por difusión.

Esta barrera aumenta hasta que:

$$
\boxed{
\text{fuerza de difusión}
\longleftrightarrow
\text{fuerza de deriva}
}
$$

En equilibrio, la barrera alcanza el valor correspondiente a:

$$
V_{bi}
$$

Esta barrera es precisamente la que posteriormente podremos modificar mediante una tensión externa.

Si aplicamos una tensión en un sentido, la barrera disminuye.

Si aplicamos la tensión en el sentido contrario, la barrera aumenta.

Esto nos llevará directamente al comportamiento del diodo:

* **polarización directa**;
* **polarización inversa**.

---

# 38. Preparación para la Parte IV

Hasta ahora hemos descrito la unión PN físicamente.

En la Parte IV vamos a convertir esta descripción en un modelo matemático.

Partiremos de:

$$
\rho(x)
$$

y utilizaremos la ecuación de Poisson:

$$
\boxed{
\frac{d^2V}{dx^2}=
-\frac{\rho(x)}{\epsilon}
}
$$

o, equivalentemente:

$$
\boxed{
\frac{dE}{dx}=
\frac{\rho(x)}{\epsilon}
}
$$

A partir de ahí obtendremos paso a paso:

$$
\rho(x)
\rightarrow
E(x)
\rightarrow
V(x)
\rightarrow
V_{bi}
\rightarrow
W
$$

donde $W$ será la anchura total de la región de agotamiento.

Finalmente derivaremos:

$$
\boxed{
W=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac{1}{N_A}+\frac{1}{N_D}
\right)
V_{bi}
}
}
$$

y las extensiones individuales:

$$
\boxed{
x_P=
\frac{N_D}{N_A+N_D}W
}
$$

$$
\boxed{
x_N=
\frac{N_A}{N_A+N_D}W
}
$$

De esta forma podremos ver matemáticamente por qué la región de agotamiento penetra más en el lado menos dopado.

Después introduciremos la polarización externa y veremos cómo cambia la barrera:

### Polarización directa

$$
V_{barrera}\downarrow
$$

### Polarización inversa

$$
V_{barrera}\uparrow
$$

Esto constituye el puente entre la física microscópica de la unión PN y el comportamiento macroscópico del **diodo semiconductor**.

---
---
---
---

# Semiconductores — Parte IV: tratamiento matemático de la unión PN

---

# 1. Introducción

En la Parte III explicamos físicamente qué ocurre cuando una región P y una región N entran en contacto:

$$
\text{difusión}
\rightarrow
\text{recombinación}
\rightarrow
\text{carga espacial}
\rightarrow
\text{campo eléctrico}
\rightarrow
\text{equilibrio}
$$

Ahora vamos a convertir esta descripción física en un modelo matemático.

La cadena fundamental será:

$$
\boxed{
\rho(x)
\rightarrow
E(x)
\rightarrow
V(x)
\rightarrow
V_{bi}
\rightarrow
W
}
$$

donde:

* $\rho(x)$ es la densidad volumétrica de carga;
* $E(x)$ es el campo eléctrico;
* $V(x)$ es el potencial electrostático;
* $V_{bi}$ es el potencial incorporado;
* $W$ es la anchura total de la región de agotamiento.

El procedimiento se basa principalmente en la **ecuación de Poisson**:

$$
\boxed{
\nabla^2V=-\frac{\rho}{\epsilon}
}
$$

y, en una dimensión:

$$
\boxed{
\frac{d^2V}{dx^2}=-\frac{\rho(x)}{\epsilon}
}
$$

Como:

$$
E(x)=-\frac{dV}{dx}
$$

también podemos escribir:

$$
\boxed{
\frac{dE}{dx}=\frac{\rho(x)}{\epsilon}
}
$$

---

# 2. Modelo de unión PN abrupta

Para poder resolver analíticamente el problema utilizaremos el modelo de **unión PN abrupta**.

Supondremos que el cambio de dopaje ocurre prácticamente de forma instantánea en la interfaz:

```text
                         x = 0

             P                         N
             │                         │
             │                         │
─────────────┼─────────────────────────┼──────→ x
             │                         │
          NA constante             ND constante
```

Matemáticamente:

$$
N_A(x)=
\begin{cases}
N_A, & x<0\\
0, & x>0
\end{cases}
$$

y:

$$
N_D(x)=
\begin{cases}
0, & x<0\\
N_D, & x>0
\end{cases}
$$

Es decir:

* para $x<0$ tenemos la región P;
* para $x>0$ tenemos la región N.

---

# 3. Aproximación de agotamiento

Resolver exactamente la unión PN requeriría considerar simultáneamente:

* electrones;
* huecos;
* difusión;
* deriva;
* generación;
* recombinación;
* distribución estadística;
* campo eléctrico;
* potencial.

Para obtener un modelo analítico sencillo utilizamos la **aproximación de agotamiento** (*depletion approximation*).

La idea es:

> Dentro de la región de agotamiento suponemos que la concentración de portadores móviles es despreciable frente a la concentración de iones dopantes.

Por tanto, dentro de la región de agotamiento:

$$
n\approx0
$$

y:

$$
p\approx0
$$

pero los dopantes ionizados permanecen:

$$
N_A^-\approx N_A
$$

$$
N_D^+\approx N_D
$$

Esto hace que la carga espacial esté determinada principalmente por los dopantes.

---

# 4. Definición de la región de agotamiento

Definimos:

* $x_P$ como la extensión del agotamiento hacia el lado P;
* $x_N$ como la extensión del agotamiento hacia el lado N.

La región de agotamiento será entonces:

$$
-x_P<x<x_N
$$

y su anchura total:

$$
\boxed{
W=x_P+x_N
}
$$

Esquemáticamente:

```text
                         x = 0

       P                  │                  N
                          │
───────┬──────────────────┼──────────────────┬──────→ x
       │                  │                  │
     -xP                  0                 xN

       |<---------------- W ---------------->|
```

Fuera de esta región suponemos que el semiconductor es aproximadamente neutro.

---

# 5. Densidad de carga dentro de la región de agotamiento

La expresión general para la densidad de carga es:

$$
\boxed{
\rho(x)=
q
\left[
p(x)-n(x)+N_D^+(x)-N_A^-(x)
\right]
}
$$

Dentro de la aproximación de agotamiento:

$$
n\approx0
$$

$$
p\approx0
$$

y suponiendo ionización completa:

$$
N_D^+\approx N_D
$$

$$
N_A^-\approx N_A
$$

Por tanto:

$$
\rho(x)=
q(N_D-N_A)
$$

pero debemos recordar que $N_A$ solo existe en P y $N_D$ solo en N.

Así obtenemos:

$$
\boxed{
\rho(x)=
\begin{cases}
-qN_A, & -x_P<x<0\\[4pt]
+qN_D, & 0<x<x_N\\[4pt]
0, & |x|>\text{región de agotamiento}
\end{cases}
}
$$

Esta es una de las expresiones fundamentales de la unión PN abrupta.

---

# 6. Interpretación de $\rho(x)$

La distribución de carga tiene una forma rectangular:

```text
ρ(x)

 ↑
 │                         +qND
 │                       ┌─────────
 │                       │
 │                       │
0├───────────────────────┼──────────────→ x
 │                       │
 │       -qNA            │
 │───────┐               │
 │       │
 └───────┴───────────────────────────────
       -xP     0          xN
```

En el lado P:

$$
\rho=-qN_A
$$

En el lado N:

$$
\rho=+qN_D
$$

Fuera de la región de agotamiento:

$$
\rho\approx0
$$

---

# 7. Primera condición importante: neutralidad de carga

La unión completa debe ser eléctricamente neutra.

La carga negativa acumulada en P debe compensarse con la carga positiva acumulada en N.

La carga por unidad de área en P es:

$$
Q_P=
\int_{-x_P}^{0}\rho(x)\,dx
$$

Como:

$$
\rho=-qN_A
$$

tenemos:

$$
Q_P=
\int_{-x_P}^{0}(-qN_A)\,dx
$$

Sacamos las constantes:

$$
Q_P=
-qN_A
\int_{-x_P}^{0}dx
$$

y:

$$
\boxed{
Q_P=-qN_Ax_P
}
$$

Análogamente, en N:

$$
Q_N=
\int_{0}^{x_N}qN_D\,dx
$$

por tanto:

$$
\boxed{
Q_N=qN_Dx_N
}
$$

La neutralidad exige:

$$
Q_P+Q_N=0
$$

por tanto:

$$
-qN_Ax_P+qN_Dx_N=0
$$

Dividiendo entre $q$:

$$
-N_Ax_P+N_Dx_N=0
$$

y finalmente:

$$
\boxed{
N_Ax_P=N_Dx_N
}
$$

Esta ecuación será fundamental.

---

# 8. ¿Hacia qué lado se extiende más la región de agotamiento?

Tenemos:

$$
N_Ax_P=N_Dx_N
$$

Despejando:

$$
\frac{x_P}{x_N}=
\frac{N_D}{N_A}
$$

Por tanto:

$$
\boxed{
\frac{x_P}{x_N}=\frac{N_D}{N_A}
}
$$

Supongamos:

$$
N_A=10^{17}\ \mathrm{cm^{-3}}
$$

y:

$$
N_D=10^{15}\ \mathrm{cm^{-3}}
$$

Entonces:

$$
\frac{x_P}{x_N}=
\frac{10^{15}}{10^{17}}=
10^{-2}
$$

por lo que:

$$
x_P=0.01x_N
$$

La región de agotamiento penetra muchísimo más en el lado N.

Esto confirma matemáticamente:

$$
\boxed{
\text{el agotamiento se extiende principalmente hacia el lado menos dopado}
}
$$

---

# 9. Ecuación de Poisson

Partimos de:

$$
\boxed{
\frac{dE}{dx}=\frac{\rho(x)}{\epsilon}
}
$$

Vamos a resolverla por regiones.

Recordemos:

$$
\rho(x)=
\begin{cases}
-qN_A,&-x_P<x<0\\
+qN_D,&0<x<x_N
\end{cases}
$$

---

# 10. Campo eléctrico en el lado P

Para:

$$
-x_P<x<0
$$

tenemos:

$$
\rho=-qN_A
$$

Por tanto:

$$
\frac{dE}{dx}=
-\frac{qN_A}{\epsilon}
$$

Integramos:

$$
E(x)=
-\frac{qN_A}{\epsilon}x+C_1
$$

Necesitamos una condición de contorno.

Fuera de la región de agotamiento, en el lado P neutro, suponemos:

$$
E(-x_P)=0
$$

Sustituimos:

$$
0=
-\frac{qN_A}{\epsilon}(-x_P)+C_1
$$

$$
0=
\frac{qN_Ax_P}{\epsilon}+C_1
$$

por tanto:

$$
C_1=
-\frac{qN_Ax_P}{\epsilon}
$$

Así:

$$
\boxed{
E_P(x)=
-\frac{qN_A}{\epsilon}(x+x_P)
}
$$

para:

$$
-x_P<x<0
$$

---

# 11. Campo eléctrico en el lado N

Para:

$$
0<x<x_N
$$

tenemos:

$$
\rho=+qN_D
$$

Por tanto:

$$
\frac{dE}{dx}=
\frac{qN_D}{\epsilon}
$$

Integramos:

$$
E(x)=
\frac{qN_D}{\epsilon}x+C_2
$$

Ahora usamos:

$$
E(x_N)=0
$$

Entonces:

$$
0=
\frac{qN_D}{\epsilon}x_N+C_2
$$

y:

$$
C_2=
-\frac{qN_Dx_N}{\epsilon}
$$

Por tanto:

$$
\boxed{
E_N(x)=
\frac{qN_D}{\epsilon}(x-x_N)
}
$$

para:

$$
0<x<x_N
$$

---

# 12. Campo eléctrico completo

Podemos escribir:

$$
\boxed{
E(x)=
\begin{cases}
0, & x<-x_P\\[4pt]
-\dfrac{qN_A}{\epsilon}(x+x_P),
& -x_P<x<0\\[8pt]
\dfrac{qN_D}{\epsilon}(x-x_N),
& 0<x<x_N\\[8pt]
0, & x>x_N
\end{cases}
}
$$

Veamos qué aspecto tiene.

```text
E(x)

 ↑
0├───────\                  /──────
 │        \                /
 │         \              /
 │          \            /
 │           \          /
 │            \        /
 │             \      /
 │              \    /
 │               \  /
 │                \/
 └──────────────────────────────────→ x
              0
```

Con nuestra elección de eje:

$$
P\rightarrow N
$$

el campo es negativo dentro de la región de agotamiento.

Esto significa que apunta hacia:

$$
\boxed{N\rightarrow P}
$$

como habíamos predicho físicamente.

---

# 13. Campo máximo en la unión

El campo alcanza su magnitud máxima en:

$$
x=0
$$

Justo en la interfaz.

Desde el lado P:

$$
E(0^-)=
-\frac{qN_Ax_P}{\epsilon}
$$

Desde el lado N:

$$
E(0^+)=
-\frac{qN_Dx_N}{\epsilon}
$$

Pero sabemos que:

$$
N_Ax_P=N_Dx_N
$$

por tanto:

$$
E(0^-)=E(0^+)
$$

y:

$$
\boxed{
E_{\max}=
-\frac{qN_Ax_P}{\epsilon}=
-\frac{qN_Dx_N}{\epsilon}
}
$$

La magnitud es:

$$
\boxed{
|E_{\max}|=
\frac{qN_Ax_P}{\epsilon}=
\frac{qN_Dx_N}{\epsilon}
}
$$

---

# 14. Forma triangular del campo

La distribución de campo tiene forma triangular.

La razón es sencilla:

$$
\frac{dE}{dx}=\frac{\rho}{\epsilon}
$$

y $\rho$ es constante en cada lado.

Si la derivada de una función es constante, la función es lineal.

Por eso:

$$
\rho=\text{constante}
\rightarrow
E(x)=\text{lineal}
$$

y posteriormente:

$$
E(x)=\text{lineal}
\rightarrow
V(x)=\text{parabólico}
$$

Esta cadena será muy importante:

$$
\boxed{
\rho(x)
\rightarrow
E(x)
\rightarrow
V(x)
}
$$

con:

$$
\boxed{
\text{rectangular}
\rightarrow
\text{triangular}
\rightarrow
\text{parabólico}
}
$$

para la aproximación de unión abrupta.

---

# 15. Cálculo del potencial

Sabemos que:

$$
E(x)=-\frac{dV}{dx}
$$

por tanto:

$$
\boxed{
\frac{dV}{dx}=-E(x)
}
$$

Tenemos que integrar el campo.

Como el campo es diferente en cada región, el potencial también tendrá expresiones diferentes.

---

# 16. Potencial en el lado P

Para:

$$
-x_P<x<0
$$

tenemos:

$$
E_P(x)=
-\frac{qN_A}{\epsilon}(x+x_P)
$$

Por tanto:

$$
\frac{dV}{dx}=
\frac{qN_A}{\epsilon}(x+x_P)
$$

Integramos:

$$
V_P(x)=
\frac{qN_A}{\epsilon}
\int(x+x_P)\,dx
$$

Entonces:

$$
V_P(x)=
\frac{qN_A}{2\epsilon}(x+x_P)^2+C_3
$$

Podemos elegir arbitrariamente:

$$
V(-x_P)=0
$$

Como:

$$
x=-x_P
$$

tenemos:

$$
(x+x_P)^2=0
$$

por tanto:

$$
C_3=0
$$

Así:

$$
\boxed{
V_P(x)=
\frac{qN_A}{2\epsilon}(x+x_P)^2
}
$$

---

# 17. Potencial en el lado N

Para:

$$
0<x<x_N
$$

tenemos:

$$
E_N(x)=
\frac{qN_D}{\epsilon}(x-x_N)
$$

Entonces:

$$
\frac{dV}{dx}=
-\frac{qN_D}{\epsilon}(x-x_N)
$$

o:

$$
\frac{dV}{dx}=
\frac{qN_D}{\epsilon}(x_N-x)
$$

Integramos:

$$
V_N(x)=
\frac{qN_D}{\epsilon}
\left(
x_Nx-\frac{x^2}{2}
\right)
+C_4
$$

La constante se obtiene imponiendo continuidad del potencial en $x=0$.

En $x=0$:

$$
V_P(0)=
\frac{qN_Ax_P^2}{2\epsilon}
$$

Por tanto:

$$
V_N(0)=
\frac{qN_Ax_P^2}{2\epsilon}
$$

y:

$$
\boxed{
V_N(x)=
\frac{qN_Ax_P^2}{2\epsilon}
+
\frac{qN_D}{\epsilon}
\left(
x_Nx-\frac{x^2}{2}
\right)
}
$$

---

# 18. Potencial incorporado

El potencial incorporado es la diferencia de potencial entre los extremos de la región de agotamiento:

$$
V_{bi}=
V(x_N)-V(-x_P)
$$

Como hemos elegido:

$$
V(-x_P)=0
$$

tenemos simplemente:

$$
V_{bi}=V(x_N)
$$

En $x=x_N$:

$$
V_N(x_N)=
\frac{qN_Ax_P^2}{2\epsilon}
+
\frac{qN_D}{\epsilon}
\left(
x_N^2-\frac{x_N^2}{2}
\right)
$$

por tanto:

$$
V_{bi}=
\frac{qN_Ax_P^2}{2\epsilon}
+
\frac{qN_Dx_N^2}{2\epsilon}
$$

Finalmente:

$$
\boxed{
V_{bi}=
\frac{q}{2\epsilon}
\left(
N_Ax_P^2+
N_Dx_N^2
\right)
}
$$

Esta es una expresión fundamental del modelo de agotamiento.

---

# 19. Obtención de la anchura de agotamiento

Tenemos dos relaciones:

$$
W=x_P+x_N
$$

y:

$$
N_Ax_P=N_Dx_N
$$

Queremos expresar $x_P$ y $x_N$ en función de $W$.

De:

$$
N_Ax_P=N_Dx_N
$$

obtenemos:

$$
x_P=\frac{N_D}{N_A}x_N
$$

Sustituimos en:

$$
W=x_P+x_N
$$

$$
W=
\frac{N_D}{N_A}x_N+x_N
$$

Sacamos factor común:

$$
W=
x_N
\left(
\frac{N_D}{N_A}+1
\right)
$$

$$
W=
x_N
\frac{N_D+N_A}{N_A}
$$

Por tanto:

$$
\boxed{
x_N=
\frac{N_A}{N_A+N_D}W
}
$$

Análogamente:

$$
\boxed{
x_P=
\frac{N_D}{N_A+N_D}W
}
$$

---

# 20. Derivación completa de $W$

Partimos de:

$$
V_{bi}=
\frac{q}{2\epsilon}
\left(
N_Ax_P^2+
N_Dx_N^2
\right)
$$

Sustituimos:

$$
x_P=
\frac{N_D}{N_A+N_D}W
$$

y:

$$
x_N=
\frac{N_A}{N_A+N_D}W
$$

Entonces:

$$
V_{bi}=
\frac{q}{2\epsilon}
\left[
N_A
\left(
\frac{N_D}{N_A+N_D}W
\right)^2
+
N_D
\left(
\frac{N_A}{N_A+N_D}W
\right)^2
\right]
$$

Sacamos:

$$
\frac{W^2}{(N_A+N_D)^2}
$$

obtenemos:

$$
V_{bi}=
\frac{qW^2}{2\epsilon}
\frac{
N_AN_D^2+N_DN_A^2
}{
(N_A+N_D)^2
}
$$

Factorizamos:

$$
N_AN_D^2+N_DN_A^2=
N_AN_D(N_A+N_D)
$$

por tanto:

$$
V_{bi}=
\frac{qW^2}{2\epsilon}
\frac{N_AN_D}{N_A+N_D}
$$

Despejamos $W^2$:

$$
W^2=
\frac{2\epsilon V_{bi}}{q}
\frac{N_A+N_D}{N_AN_D}
$$

Y como:

$$
\frac{N_A+N_D}{N_AN_D}=
\frac1{N_A}+\frac1{N_D}
$$

obtenemos finalmente:

$$
\boxed{
W=
\sqrt{
\frac{2\epsilon V_{bi}}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
}
}
$$

Esta es una de las ecuaciones más importantes de la unión PN.

---

# 21. Sustituyendo $V_{bi}$

En equilibrio:

$$
\boxed{
V_{bi}=
\frac{kT}{q}
\ln
\left(
\frac{N_AN_D}{n_i^2}
\right)
}
$$

Sustituimos esta expresión en la anchura:

$$
W=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
V_{bi}
}
$$

y obtenemos:

$$
\boxed{
W=
\sqrt{
\frac{2\epsilon kT}{q^2}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
\ln
\left(
\frac{N_AN_D}{n_i^2}
\right)
}
}
$$

Esta expresión permite calcular directamente la anchura de agotamiento a partir de:

* temperatura;
* permitividad;
* dopaje;
* concentración intrínseca.

---

# 22. Caso de unión muy asimétrica

Supongamos:

$$
N_A\gg N_D
$$

Entonces:

$$
\frac1{N_A}\ll\frac1{N_D}
$$

y podemos aproximar:

$$
\frac1{N_A}+\frac1{N_D}
\approx
\frac1{N_D}
$$

Por tanto:

$$
\boxed{
W\approx
\sqrt{
\frac{2\epsilon V_{bi}}{qN_D}
}
}
$$

Es decir, la anchura está controlada principalmente por el lado menos dopado.

Además:

$$
x_N\approx W
$$

y:

$$
x_P\approx0
$$

en comparación.

---

# 23. Potencial incorporado desde el equilibrio de portadores

Hasta ahora hemos obtenido $V_{bi}$ a partir de la solución electrostática.

Ahora podemos entender su expresión desde el equilibrio de portadores.

En equilibrio:

$$
J_n=0
$$

La corriente electrónica total puede escribirse como:

$$
J_n=
q\mu_n nE
+
qD_n\frac{dn}{dx}
$$

Para que exista equilibrio:

$$
J_n=0
$$

por tanto:

$$
q\mu_n nE
+
qD_n\frac{dn}{dx}=0
$$

Dividimos entre $qn$:

$$
\mu_nE
+
D_n\frac1n\frac{dn}{dx}=0
$$

Entonces:

$$
E=
-\frac{D_n}{\mu_n}
\frac1n\frac{dn}{dx}
$$

Utilizamos la relación de Einstein:

$$
\boxed{
\frac{D_n}{\mu_n}=
\frac{kT}{q}
}
$$

por tanto:

$$
E=
-\frac{kT}{q}
\frac1n\frac{dn}{dx}
$$

Pero:

$$
E=-\frac{dV}{dx}
$$

entonces:

$$
-\frac{dV}{dx}=
-\frac{kT}{q}
\frac1n\frac{dn}{dx}
$$

Cancelamos los signos:

$$
\frac{dV}{dx}=
\frac{kT}{q}
\frac1n\frac{dn}{dx}
$$

Integramos:

$$
\int dV=
\frac{kT}{q}
\int\frac{dn}{n}
$$

y:

$$
V=
\frac{kT}{q}\ln n+C
$$

Por tanto, entre dos puntos:

$$
\boxed{
V_2-V_1=
\frac{kT}{q}
\ln
\left(
\frac{n_2}{n_1}
\right)
}
$$

Aplicándolo a la unión PN y usando las concentraciones de equilibrio apropiadas se obtiene:

$$
\boxed{
V_{bi}=
\frac{kT}{q}
\ln
\left(
\frac{N_AN_D}{n_i^2}
\right)
}
$$

Esta derivación es especialmente importante porque muestra que el potencial incorporado no es una fórmula arbitraria: aparece como consecuencia del equilibrio entre **difusión y deriva**.

---

# 24. Relación de Einstein

La relación utilizada anteriormente es:

$$
\boxed{
\frac{D}{\mu}=\frac{kT}{q}
}
$$

Para electrones:

$$
\boxed{
\frac{D_n}{\mu_n}=
\frac{kT}{q}
}
$$

y para huecos:

$$
\boxed{
\frac{D_p}{\mu_p}=
\frac{kT}{q}
}
$$

Esta relación conecta dos fenómenos aparentemente diferentes:

* difusión;
* deriva.

La movilidad $\mu$ caracteriza la respuesta al campo eléctrico.

El coeficiente $D$ caracteriza el transporte debido a gradientes de concentración.

La relación de Einstein demuestra que ambos están profundamente relacionados mediante la temperatura.

---

# 25. Polarización externa de la unión PN

Hasta ahora hemos estudiado la unión en equilibrio:

$$
V_{\text{externa}}=0
$$

Ahora podemos conectar una fuente externa.

Dependiendo de la polaridad, podemos:

* reducir la barrera;
* aumentar la barrera.

Tenemos dos casos fundamentales.

---

# 26. Polarización directa

Para polarizar directamente una unión PN conectamos:

* terminal positivo al lado P;
* terminal negativo al lado N.

Es decir:

```text
        +                       -
        │                       │
        P ──────── PN ───────── N
```

La tensión externa genera un campo que se opone parcialmente al campo interno de la unión.

Por tanto, la barrera efectiva disminuye:

$$
\boxed{
V_{\text{barrera}}=
V_{bi}-V_D
}
$$

donde $V_D>0$ representa la tensión directa aplicada bajo esta convención idealizada.

Consecuentemente, la región de agotamiento se hace más estrecha.

---

# 27. ¿Qué ocurre físicamente en polarización directa?

Al disminuir la barrera:

$$
V_{bi}-V_D\downarrow
$$

los portadores mayoritarios encuentran más fácil atravesar la unión.

Por tanto:

* los huecos de P pueden inyectarse hacia N;
* los electrones de N pueden inyectarse hacia P.

Aumentan fuertemente las corrientes de difusión.

La corriente total deja de ser cero.

Por tanto:

$$
\boxed{
\text{polarización directa}
\rightarrow
\text{barrera menor}
\rightarrow
\text{inyección de portadores}
\rightarrow
\text{corriente elevada}
}
$$

---

# 28. Polarización inversa

Para polarización inversa conectamos:

* terminal negativo al lado P;
* terminal positivo al lado N.

```text
        -                       +
        │                       │
        P ──────── PN ───────── N
```

El campo externo tiene el mismo sentido que el campo interno.

Por tanto, la barrera aumenta:

$$
\boxed{
V_{\text{barrera}}=
V_{bi}+V_R
}
$$

y la región de agotamiento se ensancha.

Así:

$$
\boxed{
\text{polarización inversa}
\rightarrow
\text{barrera mayor}
\rightarrow
W\uparrow
}
$$

---

# 29. Anchura de agotamiento bajo polarización

En una unión ideal, la tensión efectiva que aparece en la región de agotamiento puede escribirse:

### Polarización directa

$$
V_{\text{depl}}=V_{bi}-V_D
$$

### Polarización inversa

$$
V_{\text{depl}}=V_{bi}+V_R
$$

La anchura general puede expresarse como:

$$
\boxed{
W=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
V_{\text{depl}}
}
}
$$

Por tanto, en directa:

$$
\boxed{
W_D=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
(V_{bi}-V_D)
}
}
$$

y en inversa:

$$
\boxed{
W_R=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
(V_{bi}+V_R)
}
}
$$

Esto muestra inmediatamente:

$$
\boxed{
V_D\uparrow\Rightarrow W\downarrow
}
$$

y:

$$
\boxed{
V_R\uparrow\Rightarrow W\uparrow
}
$$

---

# 30. Por qué el diodo conduce en directa y no en inversa

La explicación física completa es ahora mucho más clara.

## Directa

La tensión externa:

$$
\downarrow V_{\text{barrera}}
$$

facilita que los portadores mayoritarios atraviesen la unión.

Resultado:

$$
I\uparrow
$$

## Inversa

La tensión externa:

$$
\uparrow V_{\text{barrera}}
$$

dificulta todavía más el paso de portadores mayoritarios.

La corriente ideal de mayoritarios es prácticamente nula.

Existe, sin embargo, una pequeña corriente inversa debida principalmente a portadores minoritarios generados térmicamente.

A tensiones inversas suficientemente elevadas puede producirse ruptura.

---

# 31. Ruptura en polarización inversa

Si aumentamos mucho:

$$
V_R
$$

el campo eléctrico dentro de la región de agotamiento puede alcanzar valores extremadamente elevados.

Entonces pueden aparecer mecanismos de ruptura.

Los dos mecanismos clásicos son:

### Ruptura Zener

Predomina en uniones muy fuertemente dopadas y con una región de agotamiento muy estrecha.

El campo eléctrico puede permitir el **túnel cuántico** de electrones a través de la barrera.

### Ruptura por avalancha

Predomina generalmente en uniones menos dopadas con una región de agotamiento más ancha.

Los portadores acelerados por el campo adquieren suficiente energía para producir ionización por impacto.

Esto genera nuevos pares electrón-hueco y puede producir una multiplicación en avalancha.

---

# 32. Relación entre dopaje y ruptura

El dopaje influye fuertemente en el comportamiento inverso.

Un dopaje elevado implica:

$$
W\downarrow
$$

y, para una misma tensión aplicada, puede producirse un campo eléctrico muy intenso.

Por ello, el nivel de dopaje permite controlar en gran medida las características de ruptura de una unión PN.

---

# 33. Resumen matemático completo

Para una unión PN abrupta ideal:

### Densidad de carga

$$
\rho(x)=
\begin{cases}
-qN_A, & -x_P<x<0\\
+qN_D, & 0<x<x_N\\
0, & \text{fuera de la región de agotamiento}
\end{cases}
$$

### Neutralidad de carga

$$
\boxed{
N_Ax_P=N_Dx_N
}
$$

### Anchura total

$$
\boxed{
W=x_P+x_N
}
$$

### Extensión en P

$$
\boxed{
x_P=
\frac{N_D}{N_A+N_D}W
}
$$

### Extensión en N

$$
\boxed{
x_N=
\frac{N_A}{N_A+N_D}W
}
$$

### Campo eléctrico

$$
\boxed{
E(x)=
\begin{cases}
-\dfrac{qN_A}{\epsilon}(x+x_P),
&-x_P<x<0\\[8pt]
\dfrac{qN_D}{\epsilon}(x-x_N),
&0<x<x_N
\end{cases}
}
$$

### Campo máximo

$$
\boxed{
|E_{\max}|=
\frac{qN_Ax_P}{\epsilon}=
\frac{qN_Dx_N}{\epsilon}
}
$$

### Potencial incorporado

$$
\boxed{
V_{bi}=
\frac{q}{2\epsilon}
\left(
N_Ax_P^2+N_Dx_N^2
\right)
}
$$

### Potencial incorporado en equilibrio

$$
\boxed{
V_{bi}=
\frac{kT}{q}
\ln
\left(
\frac{N_AN_D}{n_i^2}
\right)
}
$$

### Anchura de agotamiento

$$
\boxed{
W=
\sqrt{
\frac{2\epsilon V_{bi}}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
}
}
$$

---

# 34. La cadena matemática completa

Toda la unión PN puede entenderse mediante una secuencia muy compacta:

$$
\boxed{
\text{dopaje}
\rightarrow
\rho(x)
}
$$

$$
\boxed{
\rho(x)
\overset{\text{Poisson}}{\longrightarrow}
E(x)
}
$$

$$
\boxed{
E(x)
\rightarrow
V(x)
}
$$

$$
\boxed{
V(x)
\rightarrow
V_{bi}
}
$$

$$
\boxed{
V_{bi}
\rightarrow
W
}
$$

Y físicamente:

$$
\boxed{
\text{dopaje}
\rightarrow
\text{difusión}
\rightarrow
\text{carga espacial}
\rightarrow
\text{campo}
\rightarrow
\text{barrera}
}
$$

---

# 35. Qué hemos conseguido demostrar

Ya podemos explicar matemáticamente por qué una unión PN presenta una región de agotamiento.

No es simplemente una propiedad que haya que memorizar.

Partimos de:

$$
N_A,\ N_D
$$

que determinan la distribución de carga:

$$
\rho(x)
$$

La ecuación de Poisson nos proporciona:

$$
E(x)
$$

El campo determina el potencial:

$$
V(x)
$$

La diferencia de potencial proporciona:

$$
V_{bi}
$$

y finalmente obtenemos:

$$
W
$$

la anchura de la región de agotamiento.

Por tanto:

$$
\boxed{
N_A,N_D
\rightarrow
\rho(x)
\rightarrow
E(x)
\rightarrow
V(x)
\rightarrow
V_{bi},W
}
$$

---

# 36. Límites del modelo de agotamiento

El modelo que acabamos de utilizar es extremadamente útil, pero no es una descripción exacta de todos los dispositivos reales.

Hemos supuesto:

1. unión abrupta;
2. dopaje uniforme en cada región;
3. dopantes completamente ionizados;
4. semiconductor no degenerado;
5. equilibrio térmico;
6. una dimensión;
7. región de agotamiento con portadores móviles despreciables;
8. región neutra fuera del agotamiento;
9. temperatura uniforme;
10. permitividad constante;
11. ausencia de efectos geométricos tridimensionales;
12. ausencia de efectos de generación/recombinación relevantes dentro del modelo electrostático.

Estas hipótesis permiten obtener expresiones analíticas sencillas.

Cuando alguna de ellas deja de ser válida, debemos utilizar modelos más completos.

---

# 37. Qué ocurre cuando aplicamos corriente

La unión PN en equilibrio es solo el punto de partida.

Cuando aplicamos una tensión externa y hacemos circular corriente, ya no estamos en equilibrio térmico.

Entonces:

$$
J_n\neq0
$$

y:

$$
J_p\neq0
$$

La concentración de portadores deja de ser simplemente la correspondiente al equilibrio.

Aparecen fenómenos de:

* inyección;
* difusión de portadores minoritarios;
* recombinación;
* generación;
* transporte fuera del equilibrio.

El análisis completo conduce a la ecuación característica del diodo.

---

# 38. De la unión PN a la ecuación del diodo

Bajo las aproximaciones habituales del modelo ideal, el resultado final del análisis de transporte es:

$$
\boxed{
I=
I_S
\left(
e^{qV/(nkT)}-1
\right)
}
$$

donde:

* $I$ es la corriente;
* $I_S$ es la corriente de saturación inversa;
* $V$ es la tensión aplicada;
* $n$ es el factor de idealidad;
* $q$ es la carga elemental;
* $k$ es la constante de Boltzmann;
* $T$ es la temperatura absoluta.

La derivación completa de esta ecuación requiere introducir transporte de portadores minoritarios fuera del equilibrio, por lo que conceptualmente constituye el siguiente nivel después de la unión PN electrostática.

---

# 39. Visión global de todo el bloque de semiconductores

Ya podemos conectar las cuatro partes:

$$
\boxed{
\begin{array}{c}
\text{ESTRUCTURA DE LA MATERIA}\\
\downarrow\\
\text{BANDAS DE ENERGÍA}\\
\downarrow\\
\text{PORTADORES}\\
\downarrow\\
\text{DOPAJE}\\
\downarrow\\
\text{TIPO N / TIPO P}\\
\downarrow\\
\text{NIVELES DE FERMI}\\
\downarrow\\
\text{CONTACTO P-N}\\
\downarrow\\
\text{DIFUSIÓN}\\
\downarrow\\
\text{CARGA ESPACIAL}\\
\downarrow\\
\text{REGIÓN DE AGOTAMIENTO}\\
\downarrow\\
\text{CAMPO ELÉCTRICO}\\
\downarrow\\
\text{POTENCIAL INCORPORADO}\\
\downarrow\\
\text{POLARIZACIÓN}\\
\downarrow\\
\text{CORRIENTE DEL DIODO}
\end{array}
}
$$

Esta cadena constituye una de las estructuras conceptuales fundamentales de la electrónica de semiconductores.

---

# 40. Mapa final de la unión PN

```text
                         UNIÓN PN
                             │
                             ▼
                    Diferencia de dopaje
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
             P                              N
        NA elevado                     ND elevado
        huecos ↑                       electrones ↑
              │                             │
              └──────────────┬──────────────┘
                             │
                             ▼
                         DIFUSIÓN
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
          huecos P → N                  e⁻ N → P
              │                             │
              └──────────────┬──────────────┘
                             ▼
                        RECOMBINACIÓN
                             │
                             ▼
                    CARGA ESPACIAL
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
                A⁻ en P               D⁺ en N
                  │                     │
                  └──────────┬──────────┘
                             ▼
                       CAMPO INTERNO
                             │
                             ▼
                          N → P
                             │
                             ▼
                     DERIVA OPUESTA
                     A LA DIFUSIÓN
                             │
                             ▼
                         EQUILIBRIO
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
             EF constante             J = 0
                 │
                 ▼
               Vbi
                 │
                 ▼
                 W
                 │
        ┌────────┴────────┐
        ▼                 ▼
     DIRECTA           INVERSA
        │                 │
      W ↓               W ↑
        │                 │
      I ↑             I pequeña
```

---

# 41. Fórmulas que conviene dominar de memoria

Para problemas de unión PN, las ecuaciones que más frecuentemente necesitaremos son:

$$
\boxed{
np=n_i^2
}
$$

$$
\boxed{
V_{bi}=
\frac{kT}{q}
\ln
\left(
\frac{N_AN_D}{n_i^2}
\right)
}
$$

$$
\boxed{
N_Ax_P=N_Dx_N
}
$$

$$
\boxed{
W=x_P+x_N
}
$$

$$
\boxed{
W=
\sqrt{
\frac{2\epsilon V_{bi}}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
}
}
$$

$$
\boxed{
x_P=
\frac{N_D}{N_A+N_D}W
}
$$

$$
\boxed{
x_N=
\frac{N_A}{N_A+N_D}W
}
$$

$$
\boxed{
|E_{\max}|=
\frac{qN_Ax_P}{\epsilon}=
\frac{qN_Dx_N}{\epsilon}
}
$$

y, para polarización:

$$
\boxed{
W(V_D)=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
(V_{bi}-V_D)
}
}
$$

en directa, y:

$$
\boxed{
W(V_R)=
\sqrt{
\frac{2\epsilon}{q}
\left(
\frac1{N_A}+\frac1{N_D}
\right)
(V_{bi}+V_R)
}
}
$$

en inversa.

---

# 42. Conclusión

La unión PN no debe entenderse como una simple frontera entre un semiconductor tipo P y otro tipo N.

Es una estructura electrostática que aparece espontáneamente debido a la redistribución de portadores.

La secuencia fundamental es:

$$
\boxed{
\text{diferencia de concentración}
\rightarrow
\text{difusión}
\rightarrow
\text{recombinación}
\rightarrow
\text{iones fijos}
\rightarrow
\text{carga espacial}
\rightarrow
\text{campo eléctrico}
\rightarrow
\text{potencial incorporado}
}
$$

En equilibrio:

$$
\boxed{
J_{\text{difusión}}+
J_{\text{deriva}}=0
}
$$

y:

$$
\boxed{
E_F=\text{constante}
}
$$

El campo y el potencial pueden obtenerse matemáticamente a partir de la distribución de carga mediante:

$$
\boxed{
\rho(x)
\overset{\text{Poisson}}{\longrightarrow}
E(x)
\overset{E=-dV/dx}{\longrightarrow}
V(x)
}
$$

y de ahí se obtienen:

$$
\boxed{
V_{bi}
\quad\text{y}\quad
W
}
$$

Finalmente, al aplicar una tensión externa:

$$
\boxed{
\text{directa}\Rightarrow W\downarrow,\ \text{barrera}\downarrow,\ I\uparrow
}
$$

mientras que:

$$
\boxed{
\text{inversa}\Rightarrow W\uparrow,\ \text{barrera}\uparrow,\ I\approx0
}
$$

Este es el fundamento físico y matemático del comportamiento del diodo PN.




