# Sistemas Telemáticos — Tema 4: Servicios conversacionales


**Prof. Óscar Adamuz Hinojosa · Grado en Ingeniería de Tecnologías de Telecomunicación · Universidad de Granada · Curso 2026–2027**

> **Qué es este documento:** esquema completo del Tema 4 (107 diapositivas lógicas), con el texto **y** las figuras (diagramas de señalización, arquitecturas, cabeceras). Cada concepto se explica **una sola vez**; al final hay cuadros comparativos, glosario y test.
>
> **Marcas:**
> - **BÁSICO / COMPL.** — etiqueta que el profesor pone a cada diapositiva. **BÁSICO** = núcleo del tema; **COMPL.** = complementario (menos prioritario).
> - Lo que no lleva marca es contenido **de las diapositivas**.
> - > **Ampliación:** explicación **añadida** por mí (no está en las diapositivas).
> - **(n/107)** = número de diapositiva.

---

## Índice

1. [Fundamentos de los servicios conversacionales](#1-fundamentos-de-los-servicios-conversacionales)
2. [Señalización en redes de telefonía](#2-señalización-en-redes-de-telefonía)
3. [Telefonía fija](#3-telefonía-fija)
4. [Redes móviles 2G (GSM)](#4-redes-móviles-2g-gsm)
5. [Redes móviles 4G (LTE)](#5-redes-móviles-4g-lte)
6. [Redes móviles 5G](#6-redes-móviles-5g)
7. [Servicios corporativos de voz](#7-servicios-corporativos-de-voz)
8. [Servicios multimedia en redes IP (SIP, RTP, IMS)](#8-servicios-multimedia-en-redes-ip-sip-rtp-rtcp-ims)
9. [Mensajería instantánea y XMPP](#9-mensajería-instantánea-y-xmpp)
10. [Cuadros comparativos](#10-cuadros-comparativos)
11. [Glosario de siglas](#11-glosario-de-siglas)
12. [Test de repaso](#12-test-de-repaso)

---

## 0. Qué vamos a aprender (1/107)

Pregunta de partida: *¿qué tiene que ocurrir en la red para que alguien reciba tu llamada y podáis hablar?*

| # | Pregunta | Qué se estudia |
|---|----------|----------------|
| 1 | **¿Cómo se establece una llamada?** | Cómo la red **identifica** a las personas, **encuentra** al destinatario y **coordina** los equipos para establecer la comunicación |
| 2 | **¿Cómo llega nuestra voz?** | **Distinguir entre los mensajes que controlan una llamada** (señalización) **y la información que contiene nuestra voz**; comparar telefonía tradicional con comunicaciones por Internet |
| 3 | **¿Qué ocurre si usamos un móvil?** | Llamadas en redes móviles **(2G, 4G y 5G)**, **cómo se localiza a un usuario** y cómo mantener la comunicación **mientras nos desplazamos** |
| 4 | **¿Y los demás servicios?** | **Centralitas** telefónicas de empresa, llamadas por Internet (**VoIP**) y **mensajería instantánea** (chats) |

**Índice del tema (2/107):** 1 Fundamentos · 2 Señalización · 3 Telefonía fija · 4 Redes móviles 2G (GSM) · 5 Redes móviles 4G (LTE) · 6 Redes móviles 5G · 7 Servicios corporativos de voz · 8 Servicios multimedia en redes IP · 9 Mensajería instantánea y XMPP.

---

---

# 1. Fundamentos de los servicios conversacionales

## 1.1 ¿Qué es un servicio conversacional? (3/107 · COMPL.)

> **Servicio conversacional:** permite que **dos o más usuarios intercambien información e interactúen a distancia**, utilizando **uno o varios medios de comunicación**.

| Tipo de servicio | Ejemplos |
|------------------|----------|
| **Audio** | Llamadas telefónicas y conversaciones de voz por Internet |
| **Vídeo** | Videollamadas y videoconferencias |
| **Mensajería instantánea** | Intercambio de mensajes de texto (chats) |
| **Mixtos** | Combinan **voz, vídeo, texto y otros contenidos** en una misma sesión |

**¿Todos tienen los mismos requisitos?**

| Servicio | Requisito |
|----------|-----------|
| **Voz y vídeo en directo** | Necesitan intercambiar información **con poco retardo** para mantener una **conversación natural** |
| **Mensajería** | **Puede tolerar mayores retardos**; normalmente importa más **recibir los mensajes completos y correctamente** |

> **Idea clave:** cada servicio tiene **diferentes exigencias** de comunicación, sobre todo en **retardo, pérdidas y tasa de transmisión**.

## 1.2 Del usuario a la red: funciones del terminal (4/107 · COMPL.)

Cuando hacemos una llamada o videollamada, **el terminal prepara nuestra voz e imagen para transmitirlas**:

| # | Función | Qué hace |
|---|---------|----------|
| **1** | **Captura** | El **micrófono** recoge la voz y la **cámara** obtiene imágenes; el terminal las **convierte en datos digitales** |
| **2** | **Codificación** | Un **códec** procesa el audio/vídeo digital y, normalmente, lo **comprime** para reducir la cantidad de datos |
| **3** | **Comunicación con la red** | Envía los datos mediante una **interfaz de red** (Ethernet, Wi-Fi o red móvil) con los **protocolos** correspondientes |
| **4** | **Recepción y reproducción** | **Proceso inverso**: los datos llegan, **se decodifican** y se reproducen por el **altavoz** o la **pantalla** |

*Ejemplo (llamada de voz):* el móvil captura y codifica tu voz y la envía; el móvil del destinatario recibe los datos, los **decodifica** y reproduce tu voz.

## 1.3 Calidad de servicio: más que ancho de banda (5/107 · COMPL.)

> **QoS** (*Quality of Service*): describe **las prestaciones de una comunicación**. **No basta con transmitir muchos datos: también importa cómo y cuándo llegan.**

| Magnitud | Qué mide | Qué percibe el usuario |
|----------|----------|------------------------|
| **Retardo** (ms) | Tiempo **desde que se captura la información hasta que se reproduce** | La otra persona nos escucha **con retraso** |
| **Jitter** (ms) | **Variación del retardo** entre los distintos paquetes | La voz se escucha **irregular o entrecortada** |
| **Pérdidas** (%) | Porcentaje de paquetes que **no llegan o llegan demasiado tarde** para utilizarse | **Faltan fragmentos de voz** o aparecen defectos en el vídeo |
| **Tasa disponible** (kb/s, Mb/s) | Cantidad de **datos útiles por segundo** | Puede limitar la **calidad del audio** o la **resolución del vídeo** |

> **Idea clave:** una buena comunicación necesita **suficiente tasa, pero también bajo retardo, poco jitter y pocas pérdidas**.

### Ejemplo: llamada de voz por Internet (6/107 · COMPL.)

El terminal envía **un paquete cada 20 ms (50 paquetes/s)** con un códec que genera **64 kbit/s** de voz.

| Métrica | Situación del ejemplo | Efecto |
|---------|----------------------|--------|
| **Retardo** | La voz tarda **200 ms** en escucharse en el otro extremo | La conversación puede resultar **menos natural** |
| **Jitter** | Unos paquetes tardan **40 ms** y otros **80 ms** | El terminal debe **compensar** esas variaciones para evitar cortes |
| **Pérdidas** | Se pierden **2 de cada 100** paquetes (**2 %**) | Pueden faltar **pequeños fragmentos** de voz |
| **Tasa** | Hay que transportar los **64 kbit/s + cabeceras** de los paquetes | Una tasa insuficiente **degrada** la comunicación |

> **Idea clave:** una llamada puede tener **suficiente ancho de banda y, aun así, oírse mal** por **retardo, jitter o pérdidas**.
> **Ampliación:** 64 kbit/s ÷ 50 paquetes/s = **1280 bit = 160 bytes de voz por paquete** (20 ms de audio).

### El búfer de reproducción (7/107 · COMPL.)

Para compensar el jitter, el terminal usa un **búfer de reproducción**: **memoria temporal que almacena los paquetes antes de reproducirlos**.

| | **Búfer pequeño** | **Búfer grande** |
|--|-------------------|------------------|
| **Retardo** | **Menor** (se reproduce antes) → ventaja | **Mayor** (se espera más) → inconveniente |
| **Jitter** | **Tolera menos** variaciones → inconveniente | **Tolera mayores** variaciones → ventaja |
| **Pérdidas efectivas** | Pueden **aumentar** (más paquetes llegan fuera de plazo) → inconveniente | Pueden **disminuir** (más llegan a tiempo) → ventaja |

> **Importante:** el búfer **no modifica el jitter de la red ni recupera los paquetes realmente perdidos**.
> **Idea clave:** hay un **compromiso entre retardo y tolerancia al jitter**: aumentar el búfer **reduce los paquetes tardíos, pero añade espera** a la conversación.

---

# 2. Señalización en redes de telefonía

## 2.1 Señalización y transporte de información (8/107 · BÁSICO)

| Plano | Función |
|-------|---------|
| **Plano de control (señalización)** | **Identifica y localiza a los usuarios**, **establece y libera comunicaciones** y **gestiona los recursos necesarios** |
| **Plano de usuario (plano de datos)** | **Transporta la información intercambiada** (voz, vídeo o mensajes) mediante **circuitos o paquetes**, según la tecnología |

> **Idea central del tema:** separar **qué controla la llamada** (señalización) de **qué lleva la voz** (usuario).

## 2.2 El teléfono analógico y el bucle de abonado (9/107 · COMPL.)

```
 TELÉFONO ANALÓGICO (domicilio)                    CENTRAL LOCAL
 ┌──────────────────────────┐   bucle de abonado   ┌────────────────────────────┐
 │ Micrófono → señal eléctrica│  (par de dos hilos)  │ Interfaz de línea de abonado│
 │   de transmisión (voz)    │═════════════════════►│ · Alimenta el bucle (≈ −48 V)│
 │ Circuito híbrido          │   (par de cobre,     │ · Detecta colgado/descolgado │
 │ Auricular ← señal de      │  cientos de m hasta  │ · Separa voz (híbrido)       │
 │   recepción               │◄═════varios km)══════│ Commutación y red (PSTN)     │
 └──────────────────────────┘                      └────────────────────────────┘
```

- **Micrófono:** convierte la voz (sonido) en **señal eléctrica de transmisión** (señal analógica).
- **Auricular:** convierte la señal eléctrica de recepción en sonido.
- **Circuito híbrido:** adapta la transmisión y la recepción para que **compartan el mismo par de hilos**.
- **Bucle de abonado:** **par de dos hilos (par de cobre)** que une el teléfono con la central local; de **cientos de metros a varios kilómetros**.
- **Interfaz de línea de abonado (en la central):** **alimenta el bucle con corriente continua (típ. −48 V)**, **detecta el estado del terminal (colgado/descolgado)** y **separa la señal de voz (híbrido)**.

## 2.3 Circuito de conversación y supervisión del terminal (10/107 · COMPL.)

| | **Colgado** | **Descolgado** |
|--|-------------|----------------|
| **Bucle** | **Abierto**: no circula corriente continua | **Cerrado**: circula corriente continua |
| **Qué detecta la central** | **Corriente de bucle ≈ 0** → estado de **colgado** | **Corriente de bucle típica de 20–60 mA** → estado de **descolgado** |

- La central **aplica una tensión continua (típicamente −48 V)** y **mide la corriente del bucle** para conocer el estado del terminal.
- **Transmisión** = voz del abonado a la central · **Recepción** = voz de la central al abonado (por el mismo par, gracias al híbrido).

## 2.4 Marcación por pulsos y por tonos (11/107 · COMPL.)

| | **Pulsos (disco decádico)** | **Tonos (DTMF, teclado)** |
|--|-----------------------------|---------------------------|
| **Cómo se envía el dígito** | Como **un número de interrupciones del bucle** (el disco **abre y cierra el bucle** por cada pulso) | Con **dos tonos simultáneos** de audio (**doble frecuencia**) |
| **Temporización típica** | **≈ 60 ms bucle abierto** y **≈ 40 ms cerrado** (**≈ 10 pulsos/s**); **pausa entre dígitos ≈ 250–500 ms** | Tonos de **≈ 40–200 ms** (se mantienen mientras se pulsa) |
| **Ejemplo** | Dígito **5 → 5 interrupciones** del bucle | Dígito **5 = 770 Hz + 1336 Hz** |
| **Ventaja** | — | Marcación **más rápida y fiable** |

**Matriz de frecuencias DTMF** (fila + columna):

| | **1209 Hz** | **1336 Hz** | **1477 Hz** | **1633 Hz** |
|--|:--:|:--:|:--:|:--:|
| **697 Hz** | 1 | 2 | 3 | A |
| **770 Hz** | 4 | **5** | 6 | B |
| **852 Hz** | 7 | 8 | 9 | C |
| **941 Hz** | * | 0 | # | D |

> **Los teléfonos antiguos de disco decádico usan marcación por pulsos; los modernos de teclado, por tonos DTMF (dos frecuencias simultáneas).**
> **Ampliación:** en pulsos, el dígito **0** se envía como **10 pulsos**.

## 2.5 Telefonía analógica: timbre, tono de llamada y ocupado (12/107 · COMPL.)

Señales **hacia el abonado**:

| Señal | Qué es |
|-------|--------|
| **Timbre (en B)** | **Señal eléctrica** que activa el teléfono: la central aplica **tensión alterna** al bucle del destinatario (≈ **75 V eficaces**) |
| **Marcar (en A)** | Tono: la central está **preparada para recibir los dígitos** |
| **Retorno (en A)** | Indica que **B está siendo avisado, pero todavía no ha respondido** |
| **Ocupado (en A)** | Informa de que **la llamada no puede completarse por ocupación** |

**Ejemplo: red fija de Telefónica**

| Señal | Frecuencia | Cadencia (tiempo de señal / pausa) |
|-------|-----------|------------------------------------|
| **Timbre (B)** | **25 ± 3 Hz** | **1,5 s / 3 s** |
| **Marcar (A)** | **425 ± 15 Hz** | **Continuo** |
| **Retorno (A)** | **425 ± 15 Hz** | **1,5 s / 3 s** |
| **Ocupado (A)** | **425 ± 15 Hz** | **0,2 s / 0,2 s** |

*Referencias:* Telefónica ITE-CA-001 (apdo. 5.11); CNMC, OIR-TDM, anexo II, tabla 1.

## 2.6 Secuencia básica de una llamada analógica (13/107 · COMPL.)

**Actores:** Abonado A (llamante) · Red telefónica (centrales) · Abonado B (llamado).

| Fase | Paso | Qué ocurre |
|------|------|-----------|
| **1. Establecimiento** | **a)** | **A descuelga**: su central **detecta el cierre de bucle** |
| | **b)** | **A recibe el tono de invitación a marcar** y marca el número (**pulsos o DTMF**) |
| | **c)** | La red **encamina** la llamada, **activa el timbre de B** y da a A el **tono de retorno** |
| **2. Conversación y liberación** | **d)** | **B descuelga**: su central detecta la respuesta y **detiene el aviso** |
| | **e)** | Se completa la **conexión bidireccional de voz** |
| | **f)** | Cuando un usuario **cuelga**, la red **detecta la desconexión y libera los recursos** |

> **Idea clave:** **el tono de retorno NO confirma que B haya respondido**: solo indica que **se le está avisando**.

## 2.7 Identidad del abonado, número y equipo (14/107 · BÁSICO)

En telefonía móvil hay que distinguir **suscripción, número telefónico y dispositivo físico**:

| Identificador | Significado | Qué identifica |
|---------------|------------|----------------|
| **IMSI** (*International Mobile Subscriber Identity*) | Identificador internacional de la **suscripción móvil**; **la red lo utiliza para identificar al abonado** | **La suscripción** |
| **MSISDN** (*Mobile Subscriber ISDN Number*) | **Número de teléfono público** que se usa para llamar (ej.: **+34 612 345 678**) | **El número** |
| **IMEI** (*International Mobile Equipment Identity*) | Identificador internacional del **equipo móvil**; identifica el dispositivo **independientemente de la suscripción** | **El dispositivo** |

*Ejemplo:* si cambiamos la **SIM a otro móvil**, normalmente **conservamos el IMSI y el MSISDN**, pero el equipo tiene **otro IMEI**.

## 2.8 SIM, USIM, ISIM y sus soportes (15/107 · BÁSICO)

> Aquí, una **aplicación** es un **software seguro** que gestiona la **identidad y autenticación** del abonado, **no una app convencional**.

| Aplicaciones de identidad (software) | Soporte seguro (hardware) |
|--------------------------------------|---------------------------|
| **SIM** (*Subscriber Identity Module*): aplicación de identidad **original de GSM (2G)**; **no confundir con la tarjeta física** | **UICC** (*Universal Integrated Circuit Card*): **elemento seguro que aloja aplicaciones** como USIM e ISIM; puede presentarse como **tarjeta extraíble** |
| **USIM** (*Universal Subscriber Identity Module*): identifica y autentica al abonado en **3G, 4G y 5G** | **eSIM** (*embedded SIM*): permite **instalar y gestionar perfiles de operador digitalmente** en una **eUICC** (*embedded UICC*) |
| **ISIM** (*IP Multimedia Services Identity Module*): identidades y credenciales para **IMS** (servicios multimedia IP) | **iSIM** (*integrated SIM*): **integra la funcionalidad de identidad en un elemento seguro del propio chip** o sistema del dispositivo |

> **Idea clave:** **USIM e ISIM son aplicaciones; UICC es el soporte seguro que las aloja**. eSIM e iSIM son **otras formas de integración y gestión** de la identidad móvil.

## 2.9 Señalización de usuario en GSM (16/107 · BÁSICO)

```
  MS ──Um──► BTS ──── BSC ───BSSAP───► MSC/VLR
  (móvil)   └──── BSS ────┘      (Base Station System Application Part)

   RR  (Radio Resource)       termina en el BSS
   MM  (Mobility Management)  ◄════ lógico, extremo a extremo MS ↔ MSC/VLR ════►
   CM  (Connection Management)◄════ lógico, extremo a extremo MS ↔ MSC/VLR ════►
```

| Capa | Qué gestiona | Dónde termina |
|------|--------------|---------------|
| **RR** (*Radio Resource*) | **Gestión del recurso radio**: canal, medida, *handover*, control radio… | **En el BSS** |
| **MM** (*Mobility Management*) | **Identificación, autenticación, actualización de ubicación y movilidad** (protocolo lógico **extremo a extremo**) | **En el MSC/VLR** |
| **CM** (*Connection Management*) | **Establecimiento, mantenimiento y liberación de llamadas y servicios suplementarios** | **En el MSC/VLR** |

**BSSAP** (*Base Station System Application Part*), entre BSC y MSC/VLR, se compone de:

| Parte | Función |
|-------|---------|
| **BSSMAP** (*BSS Management Application Part*) | **Gestión del BSS**: asignación de recursos, *handover*, etc. |
| **DTAP** (*Direct Transfer Application Part*) | **Transporta los mensajes de MM y CM a través del BSS** entre el MS y el MSC/VLR |

> **Idea clave:** **RR termina en el BSS; MM y CM terminan en el MSC/VLR.** El BSS **transporta la señalización de las capas superiores mediante DTAP**.

## 2.10 Access Stratum y NAS en 4G (17/107 · BÁSICO)

```
 UE ──Uu──► eNB ──S1-MME──► MME ┄S6a┄► HSS
                              │ S11
                            S-GW ──S5/S8── P-GW
 ┌ NAS (Non-Access Stratum): EMM, ESM      ←── extremo a extremo UE ↔ MME ──►
 └ AS  (Access Stratum): RRC (UE↔eNB) · S1AP (eNB↔MME)
```

| Estrato | Protocolo | Función |
|---------|-----------|---------|
| **NAS** | **EMM** (*EPS Mobility Management*) | **Registro, autenticación, movilidad e identificación** |
| | **ESM** (*EPS Session Management*) | **Gestión de sesiones de datos (PDN)** |
| **AS** | **RRC** (*Radio Resource Control*) | **Control de recursos radio, acceso y movilidad** |
| | **S1AP** | **Señalización entre eNB y MME** |

**Pilas de protocolos:** **UE**: aplicaciones / NAS (EMM-ESM) / RRC / capa radio · **eNB**: RRC + S1AP / transporte · **MME**: NAS (EMM-ESM) + S1AP / transporte.

## 2.11 Access Stratum y NAS en 5G (18/107 · BÁSICO)

```
 UE ──Uu──► gNB ──N2──► AMF ┄Nudm┄► UDM
                          │ N11
                         SMF
 NAS: 5GMM, 5GSM          AS: RRC (UE↔gNB) · NGAP (gNB↔AMF)
```

| Estrato | Protocolo | Función |
|---------|-----------|---------|
| **NAS** | **5GMM** (*5G Mobility Management*) | **Registro, autenticación, movilidad e identificación** |
| | **5GSM** (*5G Session Management*) | **Gestión de sesiones PDU** (los mensajes hacia la **SMF** se transportan **vía AMF**) |
| **AS** | **RRC** | **Control de recursos radio, acceso y movilidad** |
| | **NGAP** | **Señalización entre gNB y AMF** |

| 4G | 5G |
|----|----|
| eNB ↔ MME (**S1-MME / S1AP**) | gNB ↔ AMF (**N2 / NGAP**) |
| NAS: **EMM / ESM** | NAS: **5GMM / 5GSM** |
| HSS | UDM |

## 2.12 SS7: coordinación entre nodos telefónicos (19/107 · BÁSICO)

> **SS7** (*Signalling System No. 7*): **familia de protocolos para el intercambio de mensajes de control entre centrales y otros nodos telefónicos**.

| Protocolo | Significado | Función |
|-----------|-------------|---------|
| **ISUP** | *ISDN User Part* (ISDN = *Integrated Services Digital Network*) | **Coordina el establecimiento y la liberación de circuitos entre centrales** |
| **MAP** | *Mobile Application Part* | Soporta la **localización y movilidad de abonados móviles** (p. ej. encaminar llamadas hacia un usuario GSM) |
| **INAP** | *Intelligent Network Application Part* | Permite **consultar la lógica de servicios de red inteligente**, como la **traducción de números 900 a destinos reales** |

> **Idea clave:** **SS7 transporta señalización de control; la voz NO circula por la red de señalización SS7.**
> *Referencias:* UIT-T **Q.700**, **Q.761–Q.764** (ISUP), **Q.1218** (INAP); 3GPP **TS 29.002** (MAP).

## 2.13 Numeración y encaminamiento (20/107 · BÁSICO)

Al marcar un número, la red debe **identificar el destino** y **determinar por dónde encaminar la llamada**.

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | **¿Cómo se estructura un número?** | La Recomendación **UIT-T E.164** define la **numeración telefónica internacional: máximo 15 dígitos, incluido el código de país**. Ej.: **+34 612 345 678** → **+34** = código de país (España); **612 345 678** = número nacional. El signo **+** indica **formato internacional** y **no forma parte de los dígitos E.164** |
| 2 | **¿Cómo se encamina la llamada?** | La red **analiza el número marcado** y determina **a qué operador y por qué ruta** debe enviarse |
| 3 | **¿Y si cambiamos de operador?** | La **portabilidad** permite **conservar el número**; por eso la red puede necesitar **consultar información de portabilidad** para identificar el operador actual |

> **Idea clave:** el número **identifica el destino telefónico, pero NO determina por sí solo la ruta** que seguirá la llamada.

## 2.14 Números A, B y C (21/107 · BÁSICO)

| Número | Papel |
|--------|-------|
| **A** | **Identifica al usuario que origina la llamada** (llamante) |
| **B** | **Número marcado inicialmente** (llamado inicialmente) |
| **C** | **Destino final al que se redirige la llamada** cuando hay un **desvío** |

```
 Antes del desvío:      A ──llamada──► B
 Después del desvío:    A ──llamada inicial──► B ──desvío──► C
```

> La red **puede conservar información sobre B y sobre el motivo del desvío**.

## 2.15 Encaminamiento de llamadas (22/107 · BÁSICO)

**Ejemplo:** llamada **desde la central B** al número **9583**. La **tabla indica el siguiente salto** de la llamada.

Centrales: **A** (prefijo 9581) · **B** (9582) · **C** (9583).

| **Tabla de la central B** | | |
|--------|------|----------|
| **Prefijo** | **Ruta** | **Prioridad** |
| 9581 | A | 1 |
| 9582 | **LOCAL** | 1 |
| 9583 | A | 1 |

**¿Cómo se decide la ruta?** (1) **Identificar el prefijo** (9583) → (2) **consultar la tabla de B** → (3) **elegir la salida** (hacia A).
**Ruta elegida: B → A → C** (el enlace directo B–C **no está seleccionado**).

> **Idea clave:** la central elige **el siguiente salto según el prefijo de destino**; **la ruta configurada no tiene por qué ser la más corta**.

## 2.16 Desbordamiento y reparto de carga (23/107 · BÁSICO)

| | **Desbordamiento** | **Reparto de carga** |
|--|--------------------|----------------------|
| **Idea** | Si **la ruta principal no está disponible**, se usa **otra ruta de menor prioridad** | **Dos rutas con la misma prioridad** permiten **repartir las llamadas**; la central aplica **un criterio de selección** |
| **Tabla de B (prefijo 9583)** | `9583 → A (prioridad 1)` y `9583 → C (prioridad 2)` | `9583 → A (prioridad 1)` y `9583 → C (prioridad 1)` |
| **Ejemplo** | Llamada de B a 9583: la **ruta vía A está bloqueada** → se usa la **alternativa directa B–C** | **Selección cíclica**: 1.ª llamada **B-A-C**; 2.ª **B-C**; 3.ª **B-A-C** |
| **Criterios posibles** | — | **Cíclico (*round-robin*)**, **aleatorio**, **según ocupación o carga** |

> **Prioridad:** **menor número = ruta preferida**.

## 2.17 El circuito de voz y su identificador CIC (25/107 · BÁSICO)

**Escenario de la figura:** Abonado A (Granada, 958 123 456) → Central A → **Central de tránsito** → Central B → Abonado B1 (Madrid, 912 345 678). Otra llamada: Abonado C (Sevilla, 954 222 333) → Central C → tránsito → Central B → B2 (Madrid, 912 555 000).

```
 A ──[Central A]──CIC 37──[Central de tránsito]──CIC 82──[Central B]── B1
        ISUP IAM (Called 912 345 678, CIC=37)   ISUP IAM (…, CIC=82)
 C ──[Central C]──CIC 51──[Central de tránsito]──CIC 83──[Central B]── B2
```

| Enlace | CIC | Estado | Llamada |
|--------|-----|--------|---------|
| **Central A – Tránsito** | 37 | **Ocupado** | A → B1 |
| | 38 | Libre | — |
| | 39 | **Fuera de servicio** | — |
| | 40 | Libre | — |
| **Tránsito – Central B** | 82 | **Ocupado** | A → B1 |
| | 83 | **Ocupado** | C → B2 |
| | 84 | Libre | — |
| | 85 | **Fuera de servicio** | — |

**Ideas clave:**
1. **Cada llamada reserva un circuito (identificado por un CIC) en cada tramo** de su recorrido (el CIC es **local a cada enlace**: 37 en un tramo, 82 en el siguiente).
2. **Un circuito ocupado no puede ser utilizado por otra llamada.**
3. Si hay **varios circuitos disponibles**, la central **elige uno** (por ejemplo, según prioridad o reparto de carga).
4. **La voz viaja por el circuito**; la **señalización ISUP indica el CIC** que se debe utilizar en cada enlace.

> **CIC** = *Circuit Identification Code*.

## 2.18 ISUP: mensajes principales (24/107 · BÁSICO)

> **ISUP** (*ISDN User Part*): protocolo de SS7 que permite a las centrales **coordinar el establecimiento y la liberación de llamadas**.

| Mensaje | Nombre completo | ¿Cuándo se envía y para qué sirve? |
|---------|-----------------|------------------------------------|
| **IAM** | *Initial Address Message* | **Al iniciar la llamada.** Solicita su establecimiento e **identifica el destino y el circuito** |
| **ACM** | *Address Complete Message* | Cuando **se dispone de información suficiente para completar el encaminamiento**. **NO significa que hayan contestado** |
| **ANM** | *Answer Message* | **Cuando el destinatario responde.** Confirma que **la llamada ha sido atendida** |
| **REL** | *Release* | Cuando se solicita **liberar la llamada**, por finalización o fallo. **Incluye la causa** |
| **RLC** | *Release Complete* | **Confirma que el circuito ha sido liberado** |

## 2.19 ISUP: llamada completada (26/107 · BÁSICO)

**Ejemplo:** el abonado B (+34 958 234 567) está disponible y responde. **Central A** (origen) ↔ **Central B** (destino).

```
 Central A                          Central B
    │── IAM (CIC=37, Called +34958234567, voz) ─►│   Paso 1
    │◄───────────── ACM (dirección completa) ────│   Paso 2  (tono de llamada a A)
    │◄───────────── ANM (usuario responde) ──────│   Paso 3
    │════════════ conversación (CIC 37) ═════════│   Paso 4
    │── REL (A cuelga; causa 16) ───────────────►│   Paso 5
    │◄──────────── RLC (liberación completada) ──│   Paso 6
```

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **Situación inicial** | — | La central A quiere comunicar con un abonado de la central B y **selecciona un circuito disponible entre ambas** |
| **1** | **IAM** | A **reserva un circuito libre (CIC = 37)** y envía IAM con: **Called Party Number** (+34 958 234 567), **Calling Party Number** (opcional: número de A), **Transmission Medium Requirement: voz**. **CIC = 37** en la cabecera ISUP identifica el circuito |
| **2** | **ACM** | **Confirma que se ha recibido la información necesaria para encaminar** la llamada. Incluye los **Backward Call Indicators** (p. ej. que el abonado está **libre**). **La red puede dar el tono de llamada a A.** El circuito ya está reservado, **pero ACM no confirma que B haya contestado** |
| **3** | **ANM** | Informa de que **B ha respondido**. Se refiere al circuito **CIC = 37**; **no necesita repetir el número de destino**. A sabe que la llamada ha sido atendida |
| **4** | — | **A y B intercambian voz en ambos sentidos.** El **CIC 37 permanece ocupado**. **Los mensajes ISUP no transportan las muestras de voz** → *control y voz utilizan funciones diferentes de la red* |
| **5** | **REL** | **A cuelga** y solicita finalizar: la central A envía **REL** a B con **Cause Indicators: causa 16 = *Normal Call Clearing*** (fin normal). **REL inicia la liberación; no confirma que haya terminado** |
| **6** | **RLC** | **B libera el circuito** y envía **RLC**, que **confirma la liberación completa de CIC 37**. Al recibir RLC, A da por finalizado el procedimiento. **El circuito vuelve a estar disponible** |

## 2.20 ISUP: abonado ocupado (27/107 · BÁSICO)

**Ejemplo:** la central B detecta que el abonado llamado (+34 958 234 567) **está ocupado**.

```
 Central A                          Central B
    │── IAM (CIC=37) ──────────────────────────►│   Paso 1
    │◄────────── REL (causa 17: ocupado) ───────│   Paso 2
    │── RLC (liberación completada) ───────────►│   Paso 3
```

| Paso | Qué ocurre |
|------|-----------|
| **1. IAM** | Igual que en la llamada completada: A **reserva el CIC 37** y envía IAM. B **ocupa el circuito y comprueba la disponibilidad** del abonado |
| **2. REL** | B detecta que el abonado **está ocupado** y responde con **REL cuyo Cause Indicators = causa 17: *User Busy*** (usuario ocupado). Se inicia la liberación del CIC 37. **No se envían ACM ni ANM.** El circuito **se había reservado aunque B no haya contestado** |
| **3. RLC** | **A libera el circuito** y envía **RLC** a B. Al recibirlo, B da por finalizado el procedimiento. El circuito **vuelve a estar disponible, sin haberse establecido conversación** |

| Causa | Significado |
|-------|-------------|
| **16** | ***Normal Call Clearing*** (fin normal de la comunicación) |
| **17** | ***User Busy*** (usuario ocupado) |

## 2.21 MAP: señalización en redes móviles (28/107 · BÁSICO)

> **MAP** (*Mobile Application Part*): protocolo de **SS7** para intercambiar **información de control entre nodos de las redes móviles tradicionales (principalmente GSM y UMTS)**.

| # | Problema que permite resolver | Descripción |
|---|-------------------------------|-------------|
| 1 | **Actualización de localización** | Cuando el abonado **pasa a otro VLR**, permite **actualizar en el HLR qué VLR atiende actualmente al usuario** |
| 2 | **Encaminamiento de llamadas entrantes** | **Consultar al HLR** y obtener la información para dirigir la llamada **hacia la MSC que atiende al destinatario** |
| 3 | **Otros procedimientos** | Participa en la **entrega de SMS** y en determinados **traspasos entre MSC** |

> **Idea clave:** **MAP proporciona información para localizar y atender al móvil; ISUP establece y libera los circuitos de llamada.**

## 2.22 MAP: operaciones representativas (29/107 · BÁSICO)

| Operación MAP | Finalidad |
|---------------|-----------|
| **UpdateLocation** | El **VLR** solicita **actualizar en el HLR la localización** del abonado |
| **SendRoutingInfo (SRI)** | El **GMSC** consulta al **HLR** la información necesaria para **encaminar una llamada entrante** |
| **ProvideRoamingNumber (PRN)** | El **HLR** solicita al **VLR/MSC que atiende al abonado** un **número temporal de encaminamiento (MSRN)** |
| **ForwardSM** | **Transfiere un mensaje corto (SMS)** para su entrega mediante los nodos de la red |
| **PrepareHandover** | Interviene en la **preparación de determinados traspasos entre MSC** |

> **Idea clave:** **SRI/PRN permiten determinar la MSC de destino y obtener un MSRN; ISUP señaliza el establecimiento del circuito de llamada.**

## 2.23 INAP: consulta a la lógica del servicio (30/107 · BÁSICO)

> **INAP** (*Intelligent Network Application Part*): permite a una central **consultar la lógica de red inteligente mediante señalización SS7, antes de continuar el tratamiento de una llamada**.

| Elemento | Función |
|----------|---------|
| **SSP** (*Service Switching Point*) | **Detecta la necesidad de un servicio especial** y **consulta al SCP** |
| **SCP** (*Service Control Point*) | **Ejecuta la lógica del servicio** y **devuelve instrucciones al SSP** |

**Ejemplo: llamada a un número 900**

| Paso | Qué ocurre |
|------|-----------|
| **1. Consulta** | Al marcar 900, el **SSP envía `InitialDP` al SCP** |
| **2. Decisión** | El **SCP selecciona el destino según las reglas del servicio** (p. ej., **la hora**) |
| **3. Respuesta** | El **SCP envía `Connect`** y el SSP **continúa el establecimiento hacia ese destino** |

> **Idea clave:** INAP **separa la lógica del servicio de la conmutación**: **el SCP decide y el SSP ejecuta** sus instrucciones. *(Referencia: UIT-T Q.1218.)*

## 2.24 Protocolos de control y transporte en 4G (31/107 · BÁSICO)

En el **núcleo 4G (EPC)**, **unos protocolos gestionan las comunicaciones y otros transportan los datos del usuario**.

| Protocolo | ¿Para qué sirve? | ¿Dónde se utiliza? |
|-----------|------------------|--------------------|
| **GTP-C** (*GPRS Tunnelling Protocol – Control*) | **Crear, modificar y eliminar portadoras y túneles de datos** | **MME–S-GW (S11)** y **S-GW–P-GW (S5/S8, con GTP)** |
| **Diameter** (control) | Intercambiar **información de abonados, autenticación y autorización** | **MME–HSS (S6a)**, p. ej. para obtener datos de autenticación |
| **GTP-U** (*GPRS Tunnelling Protocol – User*; usuario) | **Encapsula y transporta los paquetes del usuario mediante túneles** | **eNB–S-GW (S1-U)** y **S-GW–P-GW (S5/S8, con GTP)** |

> **Nota:** **GPRS = General Packet Radio Service**. Un **túnel** transporta **paquetes encapsulados entre nodos**.
> **Idea clave:** **GTP-C: control de túneles; GTP-U: transporte de datos.** *(Referencia: 3GPP TS 29.274, GTPv2-C.)*

## 2.25 Protocolos de control y transporte en 5G (32/107 · BÁSICO)

En el **núcleo 5G (5GC)**, los protocolos **comunican las funciones de control y gestionan el transporte de datos**.

| Protocolo | ¿Para qué sirve? | ¿Dónde se utiliza? |
|-----------|------------------|--------------------|
| **HTTP/2** (control) | *Hypertext Transfer Protocol, versión 2*: intercambiar **peticiones y respuestas mediante APIs** entre funciones de control | **SBI** (*Service-Based Interface*), **entre funciones del núcleo 5G** |
| **PFCP** (control) | *Packet Forwarding Control Protocol*: configura **cómo trata la UPF los paquetes** (clasificación, reenvío y medición) | **SMF–UPF (N4)**: la **SMF configura las reglas de la UPF** |
| **GTP-U** (usuario) | Encapsula y transporta **los paquetes del usuario mediante túneles** | **gNB–UPF (N3)** y **entre distintas UPF (N9)** |

> **Importante:** **HTTP/2 opera en SBI; no sustituye a NAS, RRC ni NGAP.** *(Referencia: 3GPP TS 29.500 y 29.502.)*

| 4G (EPC) | 5G (5GC) |
|----------|----------|
| **GTP-C** (control de túneles) | **HTTP/2** en SBI + **PFCP** (N4) |
| **Diameter** (S6a: abonados, autenticación) | HTTP/2 (SBI) |
| **GTP-U** (S1-U, S5/S8) | **GTP-U** (N3, N9) |

---

# 3. Telefonía fija

## 3.1 Llamada fija: encaminamiento salto a salto (33/107 · BÁSICO)

**Ejemplo:** el abonado A (**Granada, 958 123 456**) llama al abonado B (**Madrid, 912 345 678**). **Situación inicial:** A está conectado a una central de Granada y B a una de Madrid; la red debe **seleccionar una ruta entre ambas centrales locales**.

```
 Abonado A ─ Central local A ─ Central de tránsito ─ Central local B ─ Abonado B
   │ 1. marca 912345678
   │              │ 2. IAM (CIC=37) ──►│ 3. IAM (CIC=82) ──►│ 4. Timbre en B
```

| Paso | Qué ocurre |
|------|-----------|
| **1. Marcación** | A descuelga y marca **912345678**. La central local A recibe los dígitos y **reconoce el prefijo geográfico 91 (Madrid)**; debe seleccionar una ruta hacia ese destino |
| **2. Primer salto: central A → tránsito** | La central A **consulta su tabla de encaminamiento**, selecciona un **circuito disponible (CIC = 37)** y envía **IAM de ISUP** hacia la central de tránsito, con el **número llamado (912345678)** y los parámetros necesarios |
| **3. Segundo salto: tránsito → central B** | La central de tránsito **analiza el número** y **selecciona el enlace hacia la central local B**. Envía **un nuevo IAM con el mismo destino, pero con otro circuito: CIC = 82**. **El CIC identifica un circuito de un tramo concreto, no toda la llamada** |
| **4. Llegada a B** | La central local B reconoce el número como **una línea que atiende**. **Si B está libre, activa el timbre**. La red informa del progreso a A y, **cuando B descuelga, notifica su respuesta mediante ANM** |

## 3.2 Llamada fija: del descolgado a la conversación (34/107 · BÁSICO)

**Ejemplo:** A (Granada, 958 123 456) llama a B (Madrid, 912 345 678). **Se omite la central de tránsito** en el diagrama. **Situación inicial:** ambos teléfonos están **colgados** y sus **bucles de abonado abiertos**.

| Paso | Qué ocurre |
|------|-----------|
| **1. Descolgado de A** | A **levanta el auricular y cierra el bucle**. La central A **detecta el paso de corriente continua**: A solicita iniciar una comunicación (todavía no ha marcado) |
| **2. Invitación a marcar** | La central A comprueba que puede atender y da el **tono de invitación a marcar**. **Aún no se ha establecido ningún circuito hacia Madrid** |
| **3. Marcación** | A marca **912345678**. Los dígitos se envían por **DTMF** (o por **pulsos** en equipos antiguos). La central A **reconoce el prefijo 91** y **consulta su tabla de encaminamiento** |
| **4. Establecimiento con ISUP** | La central A selecciona **CIC = 37** hacia tránsito y envía **IAM** (número llamado + requisito de medio de transmisión). El tránsito continúa hacia B con **otro circuito (p. ej. CIC = 82)**. **Cada tramo tiene su propio CIC** |
| **5. Timbre y progreso** | La central B identifica la línea y, **si está libre, aplica la señal alterna de timbre**. También devuelve **ACM** hacia el origen con indicadores del estado. **A oye el tono de llamada. ACM no significa que B haya respondido** |
| **6. Respuesta de B** | B oye el timbre y **descuelga**: su teléfono **cierra el bucle**, lo que permite a la central B **detectar la respuesta**. La central **interrumpe el timbre** e inicia la notificación al origen |
| **7. Notificación ANM** | La central B envía **ANM** hacia A (identifica el circuito del tramo con su **CIC**). Informa de que **el destinatario ha contestado** |
| **8. Conversación** | A y B **intercambian voz por los circuitos establecidos**. **Los circuitos permanecen ocupados mientras dura la comunicación.** **La voz no viaja dentro de los mensajes ISUP**: estos **controlan la llamada** |

> **Resumen de la secuencia:** descolgar (cierra bucle) → tono de marcar → dígitos (DTMF/pulsos) → **IAM** → timbre + **ACM** (tono de llamada) → B descuelga → **ANM** → **voz por circuitos**.

## 3.3 Parada, consulta y continuación: INAP con el número 900 (35/107 · COMPL.)

**Ejemplo:** un usuario marca el **900 123 456**; en horario laboral el servicio debe dirigir la llamada al **958 765 432**.

> **Situación inicial:** el **900** identifica **un servicio**, **no necesariamente el teléfono físico** que recibirá la llamada. **La red debe determinar el destino según las reglas del servicio.**

| Paso | Qué ocurre |
|------|-----------|
| **1. Detección del servicio** | A marca 900 123 456. El **SSP** detecta que el número **requiere tratamiento especial**; **alcanza un punto de detección y suspende temporalmente el avance** de la llamada |
| **2. Consulta mediante INAP** | El SSP envía al SCP la operación **`InitialDP`** con, p. ej., **`serviceKey = 42`** (identifica el servicio; valor ilustrativo) y **`calledPartyNumber = 900123456`** |
| **3. Decisión del SCP** | El SCP **consulta la lógica del servicio y comprueba el horario**. Si son las **11:00** y el servicio está abierto, responde con **`Connect`** incluyendo **`destinationRoutingAddress = 958765432`** |
| **4. Continuación** | El SSP **recibe `Connect` y reanuda el establecimiento**: consulta su tabla de rutas hacia 958765432 y **puede enviar un IAM de ISUP** hacia la central de destino con un circuito disponible. **El SSP realiza la conmutación; el SCP no transporta la voz** |

> **Idea clave:** el usuario marca **un número de servicio estable**, pero la **red inteligente puede seleccionar distintos destinos reales según sus reglas**.

---


# 4. Redes móviles 2G (GSM)

## 4.1 ¿Por qué se actualiza la localización? (36/107 · BÁSICO)

**Problema:** un móvil puede desplazarse **sin mantener una llamada activa**; la red necesita saber **en qué zona buscarlo** si recibe una llamada o un SMS.

| Concepto | Definición |
|----------|-----------|
| **LA** (*Location Area*) | **Conjunto de celdas** que forman un **área de localización** |
| **LAI** (*Location Area Identity*) | **Identificador del área de localización**, **difundido por las celdas** |
| **VLR** | Mantiene el **contexto temporal del abonado**, incluida su **LA registrada** |
| **HLR** | Almacena los **datos de suscripción** y **la referencia al VLR servidor** |

**Ejemplo (cambio de LA-A a LA-B):**

| Paso | Qué ocurre |
|------|-----------|
| **1. Situación inicial** | El móvil está registrado en el área **LA-A** |
| **2. Desplazamiento** | El usuario entra en **LA-B**; el móvil **detecta el cambio del LAI** |
| **3. Actualización** | El móvil inicia **Location Updating** para comunicar su nueva área a la red |
| **4. Resultado** | Si llega una llamada, la red hace ***paging* en LA-B**, **sin buscar al móvil por toda la red** |

> **Importante:** **cambiar de LA no implica necesariamente cambiar de VLR ni actualizar el HLR.**
> *Referencia:* 3GPP TS 23.012 y 24.008.

## 4.2 Actualización de localización, paso a paso (37/107 · BÁSICO)

**Ejemplo:** el móvil pasa de **LA-A (VLR antiguo)** a **LA-B (VLR nuevo)** sin llamada activa. Como LA-B depende de **otro VLR**, hay que actualizar **la localización del móvil** y **la referencia al VLR servidor que mantiene el HLR**.

```
 MS                    MSC/VLR (nuevo)                     HLR
  │─ MM: Location Updating Request ─►│                       │
  │                                  │─ MAP: UpdateLocation ─►│
  │                                  │◄─ MAP: InsertSubscriberData ─│
  │                                  │─ InsertSubscriberData (res.) ►│
  │                                  │◄─ UpdateLocation (res.) ──────│
  │◄─ MM: Location Updating Accept ──│
```

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1** | **MM: Location Updating Request** | La MS lo envía; incluye **tipo de actualización (normal)**, **identidad (TMSI anterior o IMSI)** y **LAI anterior** (identifica el contexto previo). El nuevo MSC/VLR lo recibe a través de la BSS |
| **2** | **MAP: UpdateLocation** | El nuevo VLR lo envía al HLR con el **IMSI** (identidad permanente) y el **VLR Number** (referencia del nuevo VLR). Objetivo: **comunicar al HLR qué VLR atiende ahora al abonado** |
| **3** | **MAP: InsertSubscriberData** | El HLR envía al nuevo VLR los **datos de suscripción**: **servicios autorizados**, **restricciones** y **datos suplementarios** |
| **4** | **InsertSubscriberData (res.)** | El VLR **confirma que ha procesado** los datos. **No debe confundirse con la aceptación final que recibirá el móvil** |
| **5** | **UpdateLocation (res.)** | El HLR confirma: **ya sabe a qué VLR dirigirse** para localizar al abonado |
| **6** | **MM: Location Updating Accept** | El MSC/VLR lo envía a la MS: **queda registrada en LA-B** (si se asigna un nuevo TMSI, hay que completar su confirmación) |

> **Resultado:** la red podrá buscar al móvil mediante *paging* en su nueva LA.

## 4.3 Llamada entre dos móviles: encaminamiento (38/107 · BÁSICO)

**Ejemplo:** el móvil **A (612 111 111)** llama al **B (612 222 222)**. **Mismo operador, MSC diferentes** (MSC A y MSC B). El MSC A debe obtener la información para encaminar hacia el MSC B.

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Inicio** | **CM: SETUP** (MS A → MSC A, vía BSS) | A marca 612222222. Incluye el **número llamado (MSISDN de B)** |
| **2. Consulta al HLR** | **MAP: SendRoutingInfo (SRI)** | El MSC A pregunta al HLR con **MSISDN = 612222222**; el HLR identifica el **MSC/VLR servidor de B** |
| **3. Solicitud de MSRN** | **MAP: ProvideRoamingNumber (PRN)** | El HLR lo envía al MSC B (con su **IMSI**) para pedir **un número temporal** de encaminamiento: el **MSRN** |
| **4. Asignación de MSRN** | **PRN (res.): MSRN** | El MSC B asigna un **MSRN (*Mobile Station Roaming Number*)**, p. ej. **699000321**, y lo devuelve al HLR. **Es temporal: sirve para alcanzar el MSC B, no para identificar permanentemente al abonado** |
| **5. Respuesta al MSC A** | **SRI (res.): MSRN** | El HLR devuelve el MSRN al MSC A. **El número público de B sigue siendo 612222222; MSISDN y MSRN no son lo mismo** |
| **6. Encaminamiento** | **ISUP: IAM (MSRN)** | El MSC A envía un **IAM** al MSC B usando el **MSRN = 699000321**. Al procesarlo, el MSC B **asocia el MSRN con el abonado B**; el MSRN **ya no es necesario y puede liberarse**. **El circuito ISUP sigue reservado.** **Todavía debe localizarse el móvil B** |

*Referencia:* 3GPP TS 23.018 (llamada GSM); TS 29.002 (SRI/PRN).

## 4.4 Llamada entre dos móviles: entrega y respuesta (39/107 · BÁSICO)

**Continuación:** el MSC B ha recibido el IAM; el **VLR conoce el área de localización de B, pero no su celda exacta** → hay que **buscar** al móvil antes de avisarle.

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Orden de búsqueda** | **BSSMAP: Paging** (MSC B → BSS B) | Indica la **identidad del abonado** y **el área donde buscarlo**; la BSS inicia la búsqueda en las celdas |
| **2. *Paging* por radio** | **RR: Paging Request** | La BSS lo transmite por los **canales de control** de las celdas del área; identifica al móvil por **TMSI o IMSI** |
| **3. Respuesta del móvil** | **RR: Paging Response** → **BSSMAP: Complete Layer 3 Information** | El móvil B responde a la BSS, que lo remite al MSC B. (Se omiten acceso y autenticación) |
| **4. Aviso de llamada** | **CC: SETUP** (MSC B → MS B) | El terminal sabe que hay una **llamada entrante**; **todavía no se ha aceptado** |
| **5. Móvil sonando** | **CC: ALERTING** | B activa el aviso; **la red puede informar a A mediante ACM**. **B aún no ha contestado** |
| **6. B acepta** | **CC: CONNECT** → **ISUP: ANM** | La MS B envía CONNECT al MSC B, que **comunica la respuesta al origen con ANM**. El MSC A sabe que B **ha contestado** |
| **7. Confirmación** | **CC: CONNECT ACKNOWLEDGE** | Finaliza el intercambio de control de llamada; **A y B conversan** a través de sus BSS y MSC |

> **La voz no viaja dentro de MAP ni ISUP.**

## 4.5 Llamada entre móviles de distintos operadores (40/107 · BÁSICO)

**Escenario:** **Operador X (red origen)** → **Interconexión entre operadores (ISUP)** → **Operador Y (red destino)**. Móvil A (**622 111 111**) → BSS → MSC (X) → ***Gateway MSC* (Y)** → MSC (Y) → BSS → Móvil B (**622 222 222**). El **HLR de Y** se consulta por **MAP (SRI/PRN)**.

| Paso | Qué ocurre |
|------|-----------|
| **1. Inicio en el operador X** | El móvil A marca el número de B (**622 222 222**) y envía **CM SETUP** al MSC de X con el **MSISDN de B** |
| **2. Encaminamiento a otro operador** | El MSC de X **detecta por el número de B que pertenece a otro operador** y **encamina la llamada al *gateway* MSC de Y** a través de la **interconexión entre operadores (ISUP)** |
| **3. Localización en el operador Y** | El **gateway MSC de Y consulta a su HLR mediante MAP SRI**; el HLR **identifica el MSC que atiende a B** y **solicita un MSRN (MAP: PRN)**. El gateway MSC **recibe el MSRN** y lo usa para enviar un **IAM de ISUP** al MSC de destino |
| **4. Entrega y conversación en Y** | El MSC de Y hace ***paging*** al móvil B a través de su BSS; **B responde y se establece la llamada**. **El circuito ISUP permanece reservado durante toda la llamada hasta su liberación** |

## 4.6 Itinerancia entre redes (*roaming*) (41/107 · BÁSICO)

> **Roaming:** permite al abonado **utilizar una red distinta de la de origen**. El procedimiento de registro **asegura que el abonado está autorizado** y **actualiza su ubicación en el HLR de origen**.

| Elemento | Descripción |
|----------|-------------|
| **VPLMN** (*Visited PLMN*) | **Red visitada** (operador V, país visitado): su **MSC/VLR** guarda **registro temporal, datos de contexto y servicios autorizados** |
| **HPLMN** (*Home PLMN*) | **Red de origen** (operador H, país de origen): su **HLR** guarda **datos de suscripción, IMSI, servicios autorizados y restricciones** (con **AuC**, opcional) |
| **Interconexión entre operadores** | **MAP sobre SS7**: *Update Location* (IMSI, nueva ubicación) y su respuesta (datos de suscripción, restricciones) |

| Paso | Qué ocurre |
|------|-----------|
| **1. Selección de red visitada** | El móvil **detecta las redes GSM disponibles** y **selecciona una red del operador V** (automática o manualmente) |
| **2. Solicitud de registro** | Envía una **solicitud de actualización de ubicación (*Location Updating*)** al MSC/VLR visitado, con su **identidad (IMSI/TMSI)** y la de la red visitada |
| **3. Autenticación y verificación** | El VLR **solicita al HLR datos de autenticación**; se verifica la identidad y se comprueba que **los servicios están permitidos en la red visitada** |
| **4. Actualización del HLR** | El VLR envía al HLR la **nueva ubicación (Update Location)**; el HLR actualiza y **devuelve datos de suscripción y servicios autorizados** |
| **5. Registro completado** | El móvil queda **registrado en la red visitada**; puede **realizar y recibir llamadas, SMS** y otros servicios autorizados |

## 4.7 Procedimiento de registro en roaming, paso a paso (42/107 · BÁSICO)

**Ejemplo:** un abonado del **operador H** (HPLMN) viaja al extranjero y se registra en la red del **operador V** (VPLMN). **Existe un acuerdo de roaming** entre ambos; **el móvil debe registrarse antes de utilizar los servicios**.

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Solicitud de registro** | **Location Updating Request** | Al MSC/VLR del operador V, a través de su BSS; identifica al abonado por **TMSI o IMSI** |
| **2. Autenticación** | **Authentication Request / Response** | El MSC/VLR lanza un **desafío**; **la SIM calcula la respuesta con su clave secreta**; el VLR comprueba el resultado (si necesita datos de autenticación, **los puede obtener de la red de origen**) |
| **3. Actualización del HLR** | **MAP: UpdateLocation** | El VLR visitado la envía al **HLR de origen** con **IMSI** y **dirección del VLR**; el HLR **comprueba si el abonado puede usar la red visitada** |
| **4. Datos de suscripción** | **MAP: InsertSubscriberData** | El HLR transfiere **servicios contratados, restricciones y otros parámetros**; el VLR los **almacena temporalmente** |
| **5. Confirmación de datos** | **InsertSubscriberData (res.)** | El VLR confirma que los ha procesado |
| **6. Confirmación del HLR** | **UpdateLocation (res.)** | La red de origen **ha registrado la ubicación** en el VLR visitado; **falta confirmar al móvil** |
| **7. Registro completado** | **Location Updating Accept** | El terminal queda registrado; **la suscripción permanece en el operador H**, aunque el acceso sea por el V |

*Referencia:* 3GPP TS 23.012; TS 29.002.

## 4.8 Cómo funciona el servicio SMS (43/107 · BÁSICO)

> **SMS** (*Short Message Service*): servicio de mensajes cortos con **almacenamiento y reenvío (*store-and-forward*)**, **a diferencia de las llamadas de voz en tiempo real**.

| | **MO-SMS** (*Mobile Originated*) | **MT-SMS** (*Mobile Terminated*) |
|--|----------------------------------|----------------------------------|
| **Qué es** | **Envío desde el móvil**: A envía el mensaje a través de la red GSM **hacia el SMSC** | **Entrega hacia el móvil**: el **SMSC gestiona la localización del destinatario B** y la entrega **a través de su MSC** |
| **Papel del SMSC** | **Recibe y almacena** el mensaje para su posterior entrega | **Si B está temporalmente inaccesible**, el SMSC **puede conservar el mensaje y reintentar** |

> **Idea clave:** **SMSC = almacenamiento y reenvío.** **Que el SMSC acepte un mensaje no significa que el destinatario ya lo haya recibido.**
> *Referencia:* 3GPP TS 23.040 y 24.011.

## 4.9 SMS originado en el móvil, MO-SMS (44/107 · BÁSICO)

**Ejemplo:** A (612 111 111) envía a B (612 222 222) el SMS **«Llego a las 18:00»**. **No se establece una llamada de voz.**

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Envío** | **SMS-SUBMIT** | A genera el SMS-SUBMIT con **destino (612222222)** y **contenido**; llega al MSC A por la BSS, mediante señalización GSM |
| **2. Transferencia al SMSC** | — | El MSC A **encamina el mensaje hacia el SMSC** (se omiten funciones intermedias). **B todavía no ha recibido el SMS** |
| **3. Aceptación** | — | El SMSC **acepta el mensaje para su tratamiento**; puede permanecer almacenado hasta poder entregarlo. **Aceptación no equivale a entrega** |
| **4. Confirmación a A** | **RP-ACK** | El MSC A comunica el resultado al móvil: si la transferencia fue correcta, devuelve **RP-ACK**. A sabe que **el mensaje ha sido aceptado para su posterior entrega** |

## 4.10 SMS destinado a un móvil, MT-SMS (45/107 · BÁSICO)

**Continuación:** el SMSC debe entregar «Llego a las 18:00» a B (612 222 222). Necesita **averiguar qué MSC atiende a B** y luego **localizar el terminal**.

| Paso | Qué ocurre |
|------|-----------|
| **1. Consulta al HLR** | El SMSC localiza al destinatario consultando al HLR con **MSISDN = 612222222** |
| **2. Respuesta del HLR** | Devuelve **la dirección del MSC servidor**. **A diferencia de una llamada de voz, no se necesita MSRN** |
| **3. Transferencia al MSC** | El SMSC gestiona la transferencia del mensaje al **MSC B**. Todavía no se ha entregado |
| **4. Búsqueda del móvil** | **Si B está en reposo, el MSC inicia el *paging***; la BSS lo transmite en las celdas del área de localización |
| **5. Respuesta de B** | B responde con **Paging Response** (llega al MSC B vía BSS) |
| **6. Entrega** | El MSC B envía **SMS-DELIVER** con **origen (612111111)** y **contenido** |
| **7. Acuse del móvil** | Si B lo recibe bien, envía **RP-ACK**. **Esta confirmación no significa que el usuario haya leído el SMS** |
| **8. Resultado final** | El MSC B comunica el resultado al SMSC, que **actualiza el estado del mensaje**; si B no estuviera disponible, el SMSC **podría almacenarlo y reintentar** |

## 4.11 *Handover* durante una llamada (46/107 · BÁSICO)

**Situación:** el Móvil A, en llamada con B, **se desplaza de la celda X a la celda Y** (distinto MSC) manteniendo la llamada.

| Paso | Qué ocurre |
|------|-----------|
| **1. Situación inicial** | A está en la **celda X**; la llamada llega **desde el MSC B hasta el MSC X** |
| **2. Movilidad y *handover*** | A se desplaza a la **celda Y**, controlada por el **BSC Y y el MSC Y**; **la llamada debe mantenerse durante el handover** |
| **3. Nuevo camino de voz** | **El MSC X sigue como ancla** de la llamada y **establece un nuevo tramo de voz hacia el MSC Y**, que atiende al Móvil A. **La llamada continúa con el móvil B a través del MSC X** |

```
 Camino original:   MSC B ═══ MSC X ═══ BSC X ═══ BTS X ═══ Móvil A
 Tras el handover:  MSC B ═══ MSC X ═══ MSC Y ═══ BSC Y ═══ BTS Y ═══ Móvil A
                           (ancla)   (nuevo tramo)
```

## 4.12 *Handover* inter-MSC paso a paso (47/107 · BÁSICO)

**Ejemplo:** A mantiene una llamada con B y pasa de la **celda X (MSC X)** a la **celda Y (MSC Y)**, mismo operador. **MSC X permanece como MSC ancla.**

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Necesidad** | **BSSMAP: Handover Required** (BSC X → MSC X) | A **mide nivel y calidad radio**; la BSC X decide que conviene la celda Y. Incluye **causa** y **posibles celdas destino** |
| **2. Preparación inter-MSC** | **MAP: PrepareHandover** (MSC X → MSC Y) | Solicita preparar la recepción de la llamada activa; el MSC Y **comprueba si puede atender** al móvil |
| **3. Recursos radio** | **BSSMAP: Handover Request** (MSC Y → BSC Y) → **Handover Request Ack** | La BSC Y **selecciona y prepara un canal en la BTS Y** |
| **4. *Handover Number*** | **PrepareHandover (res.)** | El MSC Y devuelve un **Handover Number: número temporal para alcanzar al MSC Y durante el traspaso. No es el número del abonado B** |
| **5. Camino de voz** | **ISUP: IAM y ACM** (MSC X ↔ MSC Y) | El MSC X usa el Handover Number para **preparar un circuito hacia el MSC Y**; **el nuevo tramo queda preparado antes del cambio radio**; **el tramo MSC B–MSC X se mantiene** |
| **6. Orden al móvil** | **BSSMAP Handover Command** → **RR: Handover Command** | MSC X → BSC X → móvil A: indica **cómo acceder al nuevo canal de la celda Y** |
| **7. Nueva celda** | **Handover Access** | A **abandona el canal de X**, se sincroniza con la BTS Y; **puede haber una breve interrupción de la voz** |
| **8. Detección** | **Handover Detect** | La BSC Y detecta el acceso de A e informa al MSC Y; la red continúa con el nuevo camino |
| **9. Confirmación** | **RR: Handover Complete** → **Handover Complete** | La llamada continúa desde la celda Y |
| **10. Cierre inter-MSC** | **MAP: SendEndSignal** | El MSC Y informa al MSC X de que el handover se ha completado; **MSC X sigue siendo el ancla** |
| **11. Liberación** | **BSSMAP Clear Command / Clear Complete** | El MSC X ordena liberar el acceso antiguo; la BSC X libera los recursos de la celda X |

> **Resultado:** la voz sigue el camino **MSC B – MSC X – MSC Y – BSC Y – BTS Y**.

## 4.13 Tipos de *handover* según los nodos implicados (48/107 · BÁSICO)

| | **Intra-BSC** | **Inter-BSC, intra-MSC** | **Inter-MSC** |
|--|---------------|---------------------------|---------------|
| **Recursos que cambian** | **BTS y canal radio** (misma BSC) | **BTS y BSC** (mismo MSC) | **BTS, BSC y MSC servidor** |
| **Quién coordina** | **La BSC común** | **El MSC común a las BSC** | **Los MSC de origen y destino** |
| **Señalización de referencia** | **Gestión radio y BSC–BTS** | **RR/BSSMAP** en el acceso y coordinación MSC | **RR, BSSMAP y señalización entre MSC (MAP/ISUP, según escenario)** |

> **Idea clave:** el propósito de todos los handovers es **mantener la llamada**, aunque cambien los recursos y nodos que la soportan.

## 4.14 Servicios suplementarios de telefonía (49/107 · COMPL.)

| Servicio | Qué es |
|----------|--------|
| **Llamada en espera** | A está en conversación con B y **recibe una segunda llamada de C** (se le notifica) |
| **Desvío de llamada** | La llamada dirigida a B **se redirige a C** (B no la recibe) |
| **Conferencia** | **Varios usuarios participan en la misma comunicación** |
| **Identificación restringida** | **La red conoce el número de A, pero no lo presenta a B** |

## 4.15 Dónde se implementan los servicios (50/107 · COMPL.)

```
                 HLR / plataforma de servicio
                 (información del abonado y reglas de servicio)
                       ▲ consulta de información   │ datos y reglas del servicio
        Móvil A ◄══► MSC / central ◄══► Móvil B
                  (señalización y tráfico de voz)
```

| # | Idea | Descripción |
|---|------|-------------|
| **1. Datos del servicio** | El **HLR** y las plataformas de servicio mantienen **la información y las reglas asociadas al abonado** | Ej.: **desvío de llamadas, restricción de llamadas, lista de números permitidos**; se consultan **cuando se necesita aplicar el servicio** |
| **2. Decisión de la red** | **La central (MSC) aplica las condiciones del servicio**, usando la información recibida | Ej.: **decide desviar la llamada, restringir la presentación del número o establecer avisos**. **La decisión se toma en la red, no en el terminal** |
| **3. Señalización** | Los protocolos **transportan la información necesaria** para tratar la llamada y aplicar el servicio | Ej.: **números de destino, indicadores de presentación, causas de liberación, parámetros del servicio**; se intercambia **entre entidades de la red y, en su caso, con los terminales** |

## 4.16 Servicios suplementarios: desvío de llamadas (51/107 · COMPL.)

**Ejemplo:** el abonado B activa el **desvío incondicional** de sus llamadas hacia un tercer número C.

| Fase | Qué ocurre |
|------|-----------|
| **Configuración** | B **solicita activar el desvío incondicional** e indica **C**; la red **registra la configuración en los datos del servicio asociados a B** |
| **Tratamiento de una llamada** | Cuando A llama a B, la red **comprueba que el desvío está activado** y **la encamina hacia C** en lugar de entregarla al terminal B. **A no necesita conocer el número de desvío** |

> **Idea clave:** este servicio **puede implementarse mediante las funciones de la propia red GSM, sin requerir una plataforma de red inteligente**.
> *Referencia:* 3GPP TS 22.082 (Call Forwarding); TS 23.082.

## 4.17 Servicios de red inteligente (52/107 · BÁSICO)

> En una **red inteligente (IN, *Intelligent Network*)**, la central **SSP** puede **consultar a un SCP** para obtener instrucciones sobre cómo tratar una llamada.

| **Decisiones de encaminamiento** | **Decisiones sobre el servicio** |
|----------------------------------|----------------------------------|
| **Número de servicio**: un **900** se traduce al destino telefónico correspondiente | **Autorización por saldo**: la llamada se autoriza si hay **saldo suficiente** |
| **Selección por horario**: de día a la **sede principal**, fuera de horario a un **centro de guardia** | **Control del consumo**: la red **supervisa el tiempo o consumo permitido** durante la comunicación |
| **Selección por disponibilidad**: si un centro no puede atender, el servicio **selecciona otro destino** | **Numeración corporativa**: un **número interno de empresa se traduce al destino** definido por sus reglas |

> **Idea clave:** **el SSP ejecuta la conmutación, mientras que el SCP aplica las reglas del servicio y devuelve las instrucciones.**

## 4.18 Red inteligente: selección dinámica y portabilidad (53/107 · BÁSICO)

| **Selección dinámica de destino (SDD)** | **Portabilidad numérica** |
|-----------------------------------------|---------------------------|
| Un **número de servicio (p. ej. un 900)** puede traducirse a **distintos destinos**: **horario laboral → centro de atención**; **fuera de horario → otro centro o locución**. La decisión puede depender de **reglas configuradas en la plataforma de servicio** | **Que un número pertenezca a un rango originalmente asignado a un operador no implica que siga en él.** El encaminamiento puede **requerir consultar información de portabilidad** para obtener **la red de destino actual** |

> **Un matiz importante:** **traducción de servicio, consulta de portabilidad y localización del móvil son operaciones diferentes**, aunque todas influyan en la ruta final.
> **Idea clave:** **el número marcado no determina necesariamente, por sí solo, el destino físico ni el operador que sirve al abonado.**

## 4.19 Control de saldo prepago (54/107 · BÁSICO)

**Ejemplo:** el móvil A llama a B con **servicio prepago**; el saldo permite **autorizar inicialmente 60 segundos**. **El MSC A incorpora la función SSP**, **el SCP ejecuta la lógica** y **el SDP proporciona los datos de saldo**.

```
 MS A     MSC A (SSP)        SCP              SDP          MSC B
  │─CC:SETUP─►│                │                │             │
  │           │─CAP:InitialDP─►│                │             │
  │           │                │─consulta saldo►│             │
  │           │                │◄─saldo (60 s)──│             │
  │           │◄CAP:ApplyCharging (60 s)+Continue             │
  │           │─────────── ISUP: IAM ───────────────────────►│
  │           │◄────────── ISUP: ANM ────────────────────────│   conversación
  │           │── a los 60 s: ISUP REL / RLC ───────────────►│
  │           │─CAP:ApplyChargingReport─►│─actualiza cuenta─►│
```

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Inicio** | **CC: SETUP** | A marca; la red detecta que A **tiene activado un servicio prepago** y debe comprobar si autoriza la llamada |
| **2. Consulta al SCP** | **CAP: InitialDP** | El MSC A (como SSP) envía **identidad del abonado y número llamado**; el SCP identifica el servicio prepago |
| **3. Consulta al SDP** | — | El SCP consulta los **datos de la cuenta**: el saldo permite **solo 60 s** |
| **4. Autorización** | **CAP: ApplyCharging** + **CAP: Continue** | **ApplyCharging** autoriza **60 s** y configura la **liberación si se supera**; **Continue** ordena al MSC **continuar la llamada** |
| **5. Conversación** | **ISUP: IAM / ANM** | El MSC A continúa hacia el MSC B; cuando B responde se recibe **ANM**; el MSC A **supervisa la duración autorizada** |
| **6. Fin del tiempo** | **ISUP: REL / RLC** | A los **60 s** el MSC A **finaliza la comunicación** (liberación automática) |
| **7. Informe final** | **CAP: ApplyChargingReport** | El MSC A **informa al SCP de la duración supervisada y el resultado**; el SCP puede **actualizar la cuenta mediante el SDP** |

> **El SCP controla el servicio; el MSC ejecuta la llamada.** *CAP* = protocolo de control (CAMEL) que usan MSC y SCP en este ejemplo.

---

# 5. Redes móviles 4G (LTE)

## 5.1 APN, conexión PDN y portadora EPS (55/107 · BÁSICO)

| Concepto | Definición |
|----------|-----------|
| **APN** (*Access Point Name*) | **Nombre que identifica un servicio de conectividad**. Ej.: **`internet`**, **`ims`** |
| **Conexión PDN** | **Conectividad lógica entre el UE y una red de datos**; **se establece a través del P-GW**; **puede haber varias conexiones PDN** |
| **Portadora EPS** | **Tratamiento de transporte con QoS**; **siempre existe una portadora por defecto**; **puede haber portadoras dedicadas** |

```
 UE ─ eNodeB ═══ S-GW ═══ P-GW ══ Conexión PDN (APN "internet") ══► Internet
                 │                 ├─ portadora EPS por defecto (APN internet)
                 │                 └─ Conexión PDN (APN "ims") ═══► Servidores IMS
                 ├─ portadora EPS por defecto (APN ims)
                 └─ portadora EPS dedicada (opcional; p. ej. mayor QoS para IMS)
   (en el acceso radio: E-RAB)
```

**Secuencia:** (1) **Registro en EPS** → (2) **selección/solicitud de APN** → (3) **conexión PDN + portadora por defecto** → (4) **portadora dedicada (si hace falta)**.

## 5.2 Registro inicial del UE, *EPS attach* (56/107 · BÁSICO)

**Ejemplo:** el UE A enciende LTE y se registra en el EPC (primera conexión, sin cambio de MME). **El eNB facilita el acceso; el MME gestiona la señalización NAS.**

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Solicitud** | **NAS: Attach Request** → **S1AP: Initial UE Message** | El UE envía Attach Request (identidad temporal o permanente + **petición de conectividad PDN en un contenedor ESM**); el eNB lo remite al MME por S1AP |
| **2. Autenticación** | **Diameter: Authentication Information (S6a)** | El MME pide al HSS información de autenticación; el HSS facilita los **vectores** |
| **3. Comprobación** | **NAS: Authentication Request/Response** | MME ↔ UE; si es correcta se activa la **protección de señalización (seguridad NAS)** |
| **4. Suscripción** | **Update Location / perfil de abonado** | El MME actualiza su registro con el HSS y obtiene **restricciones, APN autorizados y parámetros**. **El HSS no transporta los paquetes del usuario** |
| **5. Aceptación** | **NAS: Attach Accept** (con **Initial Context Setup**) | Cuando también se ha preparado la conectividad de datos, el MME envía Attach Accept por el eNB, **con la información de la portadora EPS por defecto** |
| **6. Finalización** | **NAS: Attach Complete** | El UE confirma; **queda registrado en EPS** |

> **Registro y transporte son funciones distintas:** **el MME gestiona el control**, y **los datos usarán eNB, S-GW y P-GW**.

## 5.3 Establecimiento de la portadora por defecto (57/107 · BÁSICO)

**Ejemplo:** A solicita el **APN `internet`**.

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Solicitud al S-GW** | **GTP-C: Create Session Request** (MME → S-GW) | Incluye información de sesión y del **APN** |
| **2. Solicitud al P-GW** | **Create Session Request** (S-GW → P-GW) | El P-GW es la **pasarela hacia Internet**; **la selección del P-GW está asociada al APN** |
| **3. Respuestas** | **Create Session Response** (P-GW → S-GW → MME) | El P-GW **asigna conectividad PDN (p. ej. una dirección IPv4)** y devuelve los datos de la portadora; el S-GW responde al MME con los **identificadores de túnel** |
| **4. Acceso radio** | **S1AP: Initial Context Setup / Response** | El MME pide al eNB establecer el **E-RAB** asociado a la portadora; **el UE recibe la activación de la portadora por defecto en NAS durante el attach** |
| **5. Ajuste del camino** | **GTP-C: Modify Bearer** (MME ↔ S-GW) | Con la información del eNB, el MME **actualiza el punto de entrega en el S-GW**. Desde entonces los datos circulan por **GTP-U en S1-U y S5/S8 (si se usa GTP)** |

## 5.4 Actualización de área frente a *handover* (58/107 · BÁSICO)

| | **UE en reposo · `RRC_IDLE`** | **UE conectado · `RRC_CONNECTED`** |
|--|-------------------------------|-------------------------------------|
| **Señalización** | **Control (NAS)** UE–MME | **Control (S1-MME)** y **paquetes (GTP-U)** vía S-GW |
| **Cambio de celda** | **Reselección de celda** (no handover) | **Handover entre eNB** |
| **Cuándo se actualiza** | Se realiza un **TAU** (*Tracking Area Update*) **solo si se cambia a un área de seguimiento fuera de su lista o vence el temporizador**; **actualiza el área para futuras búsquedas (*paging*)** | El UE tiene **conexión PDN y tráfico de datos activo** (p. ej. descarga de un archivo o *streaming*); **se actualiza el camino de datos (GTP-U) en el S-GW** |
| **Resultado** | — | **La transferencia continúa sin interrupción significativa** |

## 5.5 *Handover* X2 entre eNB, paso a paso (59/107 · BÁSICO)

**Ejemplo:** el UE pasa del **eNB A al eNB B** durante una sesión de datos. **El S-GW es el punto de anclaje de usuario; el MME controla la movilidad pero no transporta los datos.**

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Mediciones** | **RRC: Measurement Report** | El UE informa; **el eNB A decide solicitar un handover** porque B ofrece mejores condiciones |
| **2. Reserva en destino** | **X2AP: Handover Request / Request Acknowledge** | A → B; **B reserva recursos** y devuelve la configuración |
| **3. Cambio de radio** | **RRCConnectionReconfiguration / ...Complete** | El UE **accede al eNB B** y confirma |
| **4. *Path Switch*** | **S1AP: Path Switch Request** (eNB B → MME) | Comunica que **el UE está atendido por el nuevo eNB**: hay que **cambiar el extremo de entrega del tráfico de usuario** |
| **5. Nuevo túnel** | **GTP-C: Modify Bearer Request/Response** (MME ↔ S-GW) | El S-GW **actualiza el destino del túnel S1-U hacia el eNB B** |
| **6. Confirmación** | **S1AP: Path Switch Request Acknowledge** | El camino de datos queda dirigido al nuevo eNB |
| **7. Liberación** | **X2AP: UE Context Release** | El eNB B indica al eNB A que **libere el contexto anterior**. **La sesión continúa: no hay que crear otra conexión PDN** |

*Referencia:* 3GPP TS 23.401 (§5.5), TS 36.423 (X2AP).

## 5.6 Dos soluciones para las llamadas de voz en 4G (60/107 · BÁSICO)

| | **CS Fallback (CSFB)** | **VoLTE** (*Voice over LTE*) |
|--|------------------------|-------------------------------|
| **Idea** | **El móvil pasa a 2G o 3G para la llamada de voz** | **El móvil permanece en LTE** |
| **Cómo funciona** | Inicialmente usa LTE para datos. Para la llamada hace ***CS Fallback* (reselección a 2G/3G)** y se desplaza a una **red de circuitos (GSM o UMTS)**; **la llamada se establece en el MSC** | El usuario **se registra en IMS**; la llamada **se establece y gestiona mediante SIP (IMS)**; **la voz se transporta como paquetes RTP/IP por LTE y el EPC (plano de usuario)** |
| **Señalización** | NAS y **SGs** (MME ↔ MSC/VLR) | **SIP** (P-CSCF, I-CSCF, S-CSCF) |
| **Voz en el EPC** | **No atraviesa el EPC como tráfico VoLTE** | **Sí: como paquetes RTP** |
| **Referencia** | 3GPP TS 23.272 | GSMA IR.92 |

## 5.7 IMS y SIP: control de las llamadas de voz IP (61/107 · BÁSICO)

- **IMS** = arquitectura que permite **controlar servicios multimedia y de telefonía IP en redes móviles**. **VoLTE utiliza IMS para la señalización de llamadas.**
- **SIP** (*Session Initiation Protocol*): protocolo que **gestiona el establecimiento, modificación y terminación de sesiones multimedia**. **Métodos: `REGISTER`, `INVITE`, `BYE`.**

| Elemento | Función |
|----------|---------|
| **P-CSCF** (*Proxy–Call Session Control Function*) | **Primer punto de señalización SIP del terminal hacia IMS** |
| **S-CSCF** (*Serving–Call Session Control Function*) | **Controla el registro y parte de los servicios SIP del usuario en IMS** |

> **Idea clave:** **registro LTE y registro IMS son independientes**: **registrarse en la red de paquetes no equivale a estar registrado para telefonía IMS.**
> *Referencia:* 3GPP TS 23.228 (IMS); RFC 3261 (SIP).

## 5.8 Registro en IMS para utilizar VoLTE (62/107 · BÁSICO)

**Ejemplo:** UE A está registrado en LTE y tiene conectividad con IMS (**APN `ims`**); **descubre el P-CSCF** (p. ej. durante la configuración de conectividad).

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Solicitud** | **SIP: REGISTER** (UE → P-CSCF → S-CSCF) | Llega al S-CSCF por la red IMS (se omite el I-CSCF) |
| **2. Vectores IMS-AKA** | **Diameter Cx: MAR/MAA** (S-CSCF ↔ HSS) | El S-CSCF obtiene los **vectores de autenticación** |
| **3. Desafío SIP** | **401 Unauthorized** | El S-CSCF devuelve el **desafío IMS-AKA**. **Es un desafío, no un rechazo definitivo** |
| **4. Respuesta al desafío** | **REGISTER + autenticación** | El UE reenvía REGISTER con su respuesta; el S-CSCF la verifica y completa operaciones con el HSS (asignación y obtención del **perfil IMS**) |
| **5. Registro aceptado** | **SIP: 200 OK** | **El usuario ya está registrado en IMS. Todavía no se ha establecido ninguna llamada** |

*Referencia:* 3GPP TS 24.229; TS 29.228 (Diameter Cx).

## 5.9 Dos modelos de *roaming* de datos en 4G (63/107 · BÁSICO)

| | **Home Routed (HR)** | **Local Breakout (LBO)** |
|--|----------------------|---------------------------|
| **Dónde está el P-GW** | **En la red de origen** (HPLMN) | **En la red visitada** (VPLMN) |
| **Camino de datos** | **UE → eNB → S-GW (visitado) → S8 / interconexión (IPX) → P-GW de origen → PDN** | **UE → eNB → S-GW → S5 → P-GW visitado → salida local a Internet/PDN** |
| **Salida del tráfico IP** | **En la red de origen** | **En la red visitada** |

- **En ambos casos**, el **S-GW está en la red visitada** y el **MME visitado** consulta al **HSS de origen** (**S6a, Diameter**).
> **Diferencia clave:** **la ubicación del P-GW determina dónde sale el tráfico IP.**

---

# 6. Redes móviles 5G

## 6.1 NAS, NGAP y sesiones PDU (64/107 · COMPL.)

```
 UE ─(NAS · N1: 5GMM/5GSM, vía gNB)────────────────────────► AMF / SMF
 UE ─ gNB ─(NGAP · N2)─► AMF ─(N11)─► SMF ─(N4)─► UPF ─(N6)─► Red de datos (DN)
         └──────────── GTP-U · N3 (datos de usuario) ────────► UPF
 Sesión PDU (DNN = "internet"):  Flujo QoS 1 (QFI=9, 5QI=9) · Flujo QoS 2 (QFI=2, 5QI=7)
```

| Elemento | Qué es |
|----------|--------|
| **NAS (N1)** | **Señalización entre el UE y el núcleo, transportada vía gNB**; incluye procedimientos de **5GMM** (movilidad/registro) y **5GSM** (sesiones) |
| **NGAP (N2)** | **Señalización entre el gNB y el AMF**; se utiliza para **gestionar el acceso radio** (registro, movilidad, establecimiento de recursos…) |
| **GTP-U (N3)** | **Transporte encapsulado de paquetes de usuario entre gNB y UPF** (plano de usuario) |
| **Sesión PDU** | **Proporciona conectividad entre el UE y una red de datos (DN)**, **seleccionada mediante un DNN**; puede contener **varios flujos con distintos requisitos** |
| **DNN** | Identifica la **red de datos** (*Data Network Name*) |
| **QFI** | Identifica el **flujo QoS dentro de una sesión PDU** |
| **5QI** | **Caracteriza el tratamiento QoS** del flujo (aparece como "SQI" en la figura) |

> **Aviso:** **el registro 5G NO implica automáticamente que exista una sesión PDU activa.**

## 6.2 Señalización basada en servicios (65/107 · COMPL.)

- En el núcleo 5G, **las funciones del plano de control pueden ofrecer servicios a otras funciones mediante APIs**.
- **SBI** (*Service-Based Interface*): **1. petición HTTP/2** del **consumidor** (AMF) → **proveedor** (UDM) y **2. respuesta HTTP/2**.

| Pieza | Descripción | Ejemplo |
|-------|-------------|---------|
| **API** | **Define los servicios y operaciones que una función ofrece a otras** | Consultar datos de suscripción |
| **HTTP/2** | **Permite intercambiar peticiones y respuestas entre funciones del núcleo 5G**; se utiliza en las interfaces SBI | — |
| **JSON** | **Formato utilizado habitualmente para representar los datos intercambiados** | Información de un abonado |

> **Idea clave:** en la **SBA**, **una función solicita un servicio y otra proporciona la respuesta correspondiente.**

## 6.3 Ejemplo de consulta entre funciones (66/107 · COMPL.)

**Ejemplo:** durante el **registro de un UE**, el **AMF** (gestiona acceso y movilidad) necesita consultar en el **UDM** datos de suscripción.

| Paso | Qué ocurre |
|------|-----------|
| **1. Consulta al UDM** | El AMF usa el servicio **`Nudm_SDM`** (*Subscriber Data Management*) y envía **`HTTP/2 GET /nudm-sdm/{supi}/am-data`** para consultar los **datos de acceso y movilidad**; **la URI identifica al usuario mediante su SUPI** |
| **2. Respuesta del UDM** | El UDM procesa la consulta y devuelve **`200 OK`** con **JSON: am-data** (información de suscripción relevante para acceso y movilidad) |
| **3. Utilización** | El AMF **comprueba restricciones de acceso, movilidad permitida u otros parámetros** y **continúa el registro del UE** |

> **Esta consulta pertenece al plano de control y no transporta datos de usuario.** *Referencia:* 3GPP TS 23.502; TS 29.503 (`Nudm_SDM`).

## 6.4 Registro inicial del UE, paso a paso (67/107 · COMPL.)

**Ejemplo:** el UE se conecta a un gNB de una **red 5G SA**. **Actores:** UE · gNB · AMF · AUSF · UDM. **Situación inicial:** el UE encuentra cobertura NR y necesita **registrarse en el 5G Core**.

| Paso | Mensajes | Qué ocurre |
|------|----------|-----------|
| **1. Solicitud NAS** | **Registration Request** (NAS) · **NGAP: Initial UE Message** | El UE la envía, p. ej. con **SUCI o 5G-GUTI**; el gNB la transporta al AMF dentro de NGAP |
| **2. Autenticación** | **Nausf: Auth.** · **Nudm: Auth. Data** | El AMF usa servicios del **AUSF**, que consulta los datos de autenticación mediante **UDM** (**interfaces basadas en servicios**) |
| **3. Material de seguridad** | Resultado / vector | Permite al AMF **verificar al usuario mediante un intercambio NAS**. **No transporta audio ni paquetes de la aplicación** |
| **4. Desafío al UE** | **NAS: Authentication Request / Response** | También se activa la **seguridad NAS** (mensajes específicos omitidos) |
| **5. Suscripción** | **Nudm: registro / datos** | El AMF **registra la asociación de servicio** y obtiene los **datos del abonado** (restricciones y movilidad) |
| **6. Aceptación** | **Registration Accept** (+ **Registration Complete***) | Si se asigna **nueva 5G-GUTI**, el UE envía **Registration Complete** (*no obligatorio en todos los registros*). **Todavía no existe una sesión PDU hacia Internet** |

*Referencia:* 3GPP TS 23.502 (§4.2.2.2) y TS 24.501.

## 6.5 Establecimiento de una sesión PDU (68/107 · COMPL.)

**Ejemplo:** el UE **ya registrado** solicita acceso al **DNN `internet`** mediante 5G SA. **Actores:** UE · gNB · AMF · SMF · UPF. Solicitará **el DNN `internet` y un identificador de sesión PDU**.

| Paso | Mensajes | Qué ocurre |
|------|----------|-----------|
| **1. Petición NAS** | **NAS: PDU Session Establishment Request** · **N2: transporte NAS** | La señalización NAS identifica la sesión y puede indicar el **DNN** y el **S-NSSAI** solicitados; llega vía **gNB y AMF** |
| **2. Selección de SMF** | **Create SM Context** | El AMF **selecciona una SMF** y le entrega la solicitud. **La SMF gestiona la sesión, no el transporte de paquetes** |
| **3. Configurar UPF** | **N4: PFCP Session Establishment Request/Response** | La SMF **comprueba suscripción y políticas**, **elige la UPF** y **establece reglas mediante PFCP sobre N4**; la UPF devuelve los **parámetros del túnel** |
| **4. Preparar acceso** | **N1/N2: PDU Session Accept + info** · **N2: PDU Resource Setup** | La SMF devuelve el **Accept** y **datos N2 para el gNB**; el AMF solicita **recursos radio y túnel N3** |
| **5. Confirmación N2** | **N2: Setup Response** · **Update SM Context** | El gNB da su **extremo N3**; el AMF lo devuelve a la SMF |
| **6. Ajustar N4** | **N4: Session Modify** | La SMF actualiza la UPF para **dirigir el tráfico descendente hacia el gNB** |
| **7. Sesión utilizable** | **N3: GTP-U (datos)** | Con N3 y N4 configurados, **el tráfico viaja por gNB–UPF mediante GTP-U, sin atravesar el AMF ni la SMF** |

> **En 5G se gestionan sesiones PDU y flujos QoS, no portadoras EPS.** *Referencia:* 3GPP TS 23.502 (§4.3.2.2); TS 29.244 (PFCP).

## 6.6 *Handover* con cambio de UPF (69/107 y 70/107 · COMPL.)

| Fase | Camino de datos |
|------|-----------------|
| **Antes** | **UE → gNB A → UPF A → Internet** (gNB B y UPF B sin usar) |
| **Durante** | **Handover en curso**: el camino anterior **sigue activo** y el nuevo (gNB B → UPF B) **está en preparación** |
| **Después** | **UE → gNB B → UPF B → Internet** (gNB A sin tráfico, **UPF A liberada**) |

> **Control:** **AMF y SMF coordinan el cambio.** **La sesión de datos sigue activa; cambia el camino por el que pasan los paquetes.**

**Handover Xn: gNB A → gNB B, con cambio de UPF A → UPF B** (se mantiene la sesión PDU; **AMF y SMF permanecen**):

| Paso | Mensajes | Qué ocurre |
|------|----------|-----------|
| **1. Medidas** | **RRC: Measurement Report** | El UE informa de celdas vecinas; **el gNB A decide el handover** hacia el gNB B |
| **2. Preparación Xn** | **XnAP: Handover Request / Request Ack** | El gNB B **prepara recursos radio y flujos QoS**. El UE aún usa la celda inicial |
| **3. Cambio de celda** | **RRC Reconfiguration / Reconfiguration Complete** | El UE accede al gNB B; **la red puede reenviar paquetes temporalmente para reducir pérdidas** |
| **4. Aviso al núcleo** | **NGAP: Path Switch Request** → **Update SM Context** | El gNB B avisa al AMF y este a la SMF, que **determina que debe sustituir UPF A por UPF B** |
| **5. Nueva UPF** | **N4 Session Establishment / Response** | La SMF **establece el contexto de sesión en la UPF B** mediante **PFCP**. Nuevo tramo: **UE – gNB B – UPF B**; UPF A aún puede conservar recursos |
| **6. Confirmación** | **Update SM Context (res.)** → **Path Switch Ack** | El nuevo camino queda confirmado; la sesión PDU continúa |
| **7. Liberación** | **XnAP: UE Context Release** · **N4 Session Release Request/Response** | Se libera el contexto del gNB A y, tras la transición, **la SMF pide a UPF A liberar recursos** |

*Referencia:* esquema didáctico; 3GPP TS 23.502 (§4.9.1.2.4); TS 38.423.

## 6.7 Variantes de *handover* (71/107 · COMPL.)

| Escenario | ¿Qué cambia? | ¿Qué se mantiene? |
|-----------|--------------|-------------------|
| **1. Dentro del mismo gNB** | El UE cambia de celda dentro del mismo gNB | **La UPF y la sesión PDU. No se utiliza Xn entre gNB** |
| **2. Entre gNB, sin cambio de UPF** | El UE cambia de gNB A a B y **se actualiza el túnel N3** | **La misma UPF y la sesión PDU** |
| **3. Entre gNB, con cambio de UPF** | Cambia de gNB A a B y **la SMF sustituye UPF A por UPF B** | En el ejemplo, **AMF, SMF y la continuidad de la sesión PDU** |

> El handover **puede cambiar solo la celda o modificar también el camino de datos**. *Referencia:* 3GPP TS 23.502 (§4.9.1.2 Xn y §4.9.1.3 N2).

## 6.8 Voz en 5G: VoNR o *EPS fallback* (72/107 · COMPL.)

| | **VoNR** (*Voice over NR*) | **EPS fallback** |
|--|----------------------------|------------------|
| **Dónde está el UE** | **Permanece en 5G NR** | **Inicialmente en 5G SA**; si VoNR no está disponible, **el acceso pasa a LTE/EPC** |
| **Cómo viaja la voz** | **Es IP** y se transporta mediante una **sesión PDU con los flujos QoS correspondientes** (NR / gNB / 5GC) | **La llamada se cursa en LTE (VoLTE)**: sigue siendo IP |
| **Servicio de llamadas** | **IMS** (SIP para establecer; **RTP/VoLTE-VoNR** para la voz) | **IMS** |

> **En ambos casos, IMS proporciona el servicio de llamada; lo que cambia es el acceso y el núcleo usados para transportar la voz.**
> **EPS fallback ≠ CS fallback:** en EPS fallback **la voz sigue siendo IP** (no hay vuelta al dominio de circuitos).

---

# 7. Servicios corporativos de voz

## 7.1 La centralita de una organización (73/107 · COMPL.)

```
 Extensiones internas (201, 202, 203) ──SIP/IP (red local)──► PBX/PABX (IP-PBX)
        plan de numeración · conmutación y enrutamiento · servicios y políticas (buzón de voz, desvíos…)
                                  │ enlace exterior (troncal SIP o RDSI)
                                  ▼
                       Red pública / operador ──► números públicos (p. ej. 958 123 456)
```

| # | Función | Descripción |
|---|---------|-------------|
| **1. Extensiones internas** | **Numeración privada** (p. ej. 201, 202, 203) | Se comunican con la PBX mediante **SIP sobre la red local**; pueden ser **teléfonos IP, *softphones***… |
| **2. Conmutación de llamadas** | La PBX **aplica el plan de numeración** | **Conmuta las llamadas internas** entre extensiones; **decide si una llamada es interna o exterior y por qué enlace**; **aplica servicios y políticas** (desvíos, buzón de voz, restricciones) |
| **3. Acceso a la red pública** | **Troncal SIP o acceso RDSI** | Permite **realizar y recibir llamadas desde/hacia números públicos** (p. ej. 958 123 456) y **traduce entre la numeración interna (201) y la pública** |

## 7.2 Escenarios de llamada en una centralita (74/107 · COMPL.)

| # | Escenario | Qué ocurre |
|---|-----------|-----------|
| **1** | **Extensión a extensión** (201 → 202) | **SIP/IP**; **la centralita resuelve el número interno** y **no utiliza la red pública** |
| **2** | **Extensión a número público** (→ 958 234 567) | La centralita **verifica permisos** y **selecciona una ruta exterior** (troncal SIP / acceso RDSI) |
| **3** | **Entrada al número de cabecera** (958 123 400) | La llamada llega al **número general** y **la atiende una operadora o un sistema automático** |
| **4** | **Marcación directa entrante (DDI)** (958 123 456 → extensión 202) | **La PBX asocia un número público con una extensión**; **no es necesario pasar por operadora** |

> **Idea clave:** **una extensión interna y un número público pueden ser distintos; la centralita establece la asociación.**

## 7.3 Funciones útiles para cada llamada (75/107 · COMPL.)

| **En la señalización** | **Durante el servicio** |
|------------------------|-------------------------|
| **CLI/CLIP**: **identidad/presentación del llamante** (sujetas a restricciones) | **Transferencia**: pasar una llamada a otra extensión |
| **DNIS** (*Dialed Number Identification Service*): **identificación del número marcado que recibió la llamada** | **Captura**: responder a la llamada dirigida a otra extensión del grupo |
| **DDI/DID** (*Direct Dial-In / Direct Inward Dialing*): **permite alcanzar directamente una extensión desde un número público** | **Conferencia**: conectar varias personas |
| | **Ruta de menor coste**: **escoger una salida según reglas de encaminamiento y tarifas** |

> **Idea clave:** una centralita **aplica un plan de numeración interno y políticas propias**, además de **proporcionar acceso a la red telefónica pública**.

## 7.4 Operadora, colas y servicios de hotel (76/107 · COMPL.)

| Función | Descripción |
|---------|-------------|
| **ACD** (*Automatic Call Distribution*) | **Reparte las llamadas entrantes entre los agentes disponibles.** Ejemplo: llegan **4 llamadas**; **dos agentes las atienden y las otras dos quedan en cola de espera** |
| **Funciones de operadora** | Los agentes pueden hacer **retenciones, transferencias** y gestionar su disponibilidad con estados **Ready (disponible) y Pause (pausa)**; la centralita puede **registrar las llamadas y supervisar las colas** |
| **Servicios de hotel** | **Despertador, no molestar, restricciones de llamadas e integración con el estado de las habitaciones (check-in/check-out)** |

## 7.5 Implementaciones de centralitas (77/107 · COMPL.)

| | **KTS clásico** | **PABX** | **Centrex clásico** |
|--|-----------------|----------|---------------------|
| **Idea** | **Varios terminales comparten líneas de acceso**; **selección directa de línea** | **Centralita privada**: conmutación **dentro de la organización** y **enlaces exteriores** | **Funciones de centralita en la red pública**; **plan de numeración privado desde la red del operador** |
| **Dónde reside la conmutación** | — (**no hay una centralita privada completa**) | **En la organización** | **En la central del operador** (extensiones 301, 302, 303 conectadas al operador) |

## 7.6 Centralita propia frente a centralita alojada (78/107 · COMPL.)

| Aspecto | **IP-PBX propia** (en la empresa) | **IP-PBX alojada** (en el proveedor) |
|---------|-----------------------------------|--------------------------------------|
| **Infraestructura** | **Equipamiento en la empresa** | **Infraestructura del proveedor** |
| **Administración y mantenimiento** | **A cargo de la organización (o un tercero)** | **Principalmente a cargo del proveedor** |
| **Interconexión telefónica** | **Troncal SIP o pasarela hacia la red pública** | **La presta el proveedor o se integra con su servicio** |
| **Costes (habitualmente)** | **Mayor inversión y mantenimiento** | **Más cuota periódica / servicio** |
| **Dependencias** | **Infraestructura local y enlace exterior** | **Conectividad IP y proveedor** |

> **IP-PBX alojada:** la organización **accede al servicio mediante Internet o un enlace privado**; **el proveedor opera y mantiene la plataforma**.

## 7.7 KTS, PABX, Centrex e Ibercom: evolución histórica (79/107 · COMPL.)

| Solución | Qué la caracteriza |
|----------|--------------------|
| **KTS** (*Key Telephone System*) | **Sistema multilínea cuyos teléfonos comparten y seleccionan líneas externas**; **funciones internas más limitadas que una PABX** |
| **PABX** (*Private Automatic Branch Exchange*) | **Centralita privada que conmuta llamadas entre extensiones y hacia la red pública** |
| **Centrex** | **Servicio de centralita ofrecido desde la red del operador**, **sin requerir una PABX completa en la sede** |
| **Ibercom** | **Oferta histórica de Telefónica de voz corporativa y redes privadas**, apoyada en **centralitas digitales**. **No equivale a Centrex** |
| **IP-PBX** | **Centralita basada en IP**: puede ser **local (en la empresa) o alojada (en un proveedor)** |

> **Idea clave:** **KTS/PABX: sistemas; Centrex: servicio del operador; Ibercom: oferta histórica. Una IP-PBX puede ser local o alojada.**
> *Fuente histórica:* Telefónica (2024), *100 años de historia de las redes de Telefónica*.

---

# 8. Servicios multimedia en redes IP (SIP, RTP, RTCP, IMS)

## 8.1 Introducción a SIP, RTP y RTCP (80/107 · BÁSICO)

| Protocolo | Para qué sirve | Papel |
|-----------|----------------|-------|
| **SIP** (*Session Initiation Protocol*) | **Establecer, modificar y terminar una sesión de comunicación** | **Control de sesión** entre los terminales (Usuario A ↔ Usuario B) |
| **RTP** (*Real-time Transport Protocol*) | **Transporta los paquetes de audio y/o vídeo durante la conversación** | **Audio/vídeo en tiempo real** por la red IP (Internet/Intranet) |
| **RTCP** (*RTP Control Protocol*) | **Intercambia información de control sobre la calidad, el retardo, las pérdidas y la sincronización** | **Informes de calidad** entre los extremos |

> **Resumen:** **SIP: organiza la sesión · RTP: transporta la voz o el vídeo · RTCP: informa sobre la calidad.** *Referencia:* IETF RFC 3550 (RTP/RTCP).

## 8.2 TCP y UDP: impacto en el tiempo real (81/107 · BÁSICO)

| | **TCP: entrega fiable y ordenada** | **UDP: continuidad temporal** |
|--|------------------------------------|--------------------------------|
| **Qué hace** | **Si falta un segmento, intenta recuperarlo antes de entregar los datos posteriores** a la aplicación | **No retransmite ni garantiza el orden**; la aplicación puede **seguir reproduciendo el audio recibido aunque se pierdan paquetes** |
| **Efecto en tiempo real** | Puede **aumentar el retardo y provocar interrupciones** en la reproducción | **Es preferible recibir el audio a tiempo que esperar retransmisiones** |

> **La voz sobre IP utiliza habitualmente UDP**; normalmente se emplea **RTP sobre UDP**.

## 8.3 RTP: transporte de audio y vídeo en tiempo real (82/107 y 83/107 · BÁSICO)

**Ejemplo (figura):** el emisor envía paquetes RTP con **Seq 1000, 1001 y 1002**; **el 1001 se pierde** en la red IP.

- **Si llega el 1002 tras el 1000, se detecta que falta el 1001.**

| Paquete | Sequence Number | Timestamp | Payload Type | SSRC | Estado |
|---------|-----------------|-----------|--------------|------|--------|
| RTP 1000 | 1000 | 36000 | 96 | 0x4A1F2B3C | Entregado |
| RTP 1001 | 1001 | 36360 | 96 | 0x4A1F2B3C | **Perdido** |
| RTP 1002 | 1002 | 36720 | 96 | 0x4A1F2B3C | Entregado |

**Cabecera RTP (12 bytes):** `V (2) · P (1) · X (1) · CC (4) · M (1) · PT (7)` · **Sequence Number (16)** · **Timestamp (32)** · **SSRC (32)**.

| Campo | Tamaño | Qué aporta |
|-------|--------|-----------|
| **Número de secuencia** | **16 bits** | **Aumenta en una unidad por paquete RTP.** **Permite detectar pérdidas y paquetes fuera de orden; no los recupera por sí solo** |
| **Marca de tiempo (*Timestamp*)** | **32 bits** | **Identifica el instante de muestreo del contenido según el reloj RTP**; **no es la hora de llegada a la red**; permite reproducir en el momento correcto |
| **Tipo de carga (PT)** | **7 bits** | **Indica el formato de la carga útil** (p. ej., un códec), según las asignaciones acordadas en la sesión |
| **SSRC** | **32 bits** | **Identifica una fuente de sincronización dentro de la sesión RTP**; **no identifica globalmente al usuario** |

> **Idea clave:** **RTP aporta información para la reproducción (ordenar y temporizar el flujo), pero NO garantiza la entrega ni un retardo máximo.**

## 8.4 RTCP: control de la comunicación en tiempo real (84/107 · BÁSICO)

- **RTCP** (*Real-time Transport Control Protocol*) **acompaña a RTP: informa sobre la comunicación, pero NO transporta voz ni vídeo.**

| Función | Descripción |
|---------|-------------|
| **Calidad** | Informa sobre **pérdidas y jitter** |
| **Sincronización** | **Relaciona el reloj RTP con una referencia temporal común** |
| **Identificación** | Puede aportar **información sobre los participantes** |

| Mensaje | Contenido |
|---------|-----------|
| **SR** (*Sender Report*) | **Estadísticas del emisor y referencias temporales** |
| **RR** (*Receiver Report*) | **Estadísticas de recepción, como pérdidas y jitter** |

## 8.5 Sesiones RTP/RTCP: audio, vídeo y puertos (85/107 · BÁSICO)

- **Cada extremo usa sus propios puertos UDP locales**; **los números de puerto en Alicia y Bob pueden coincidir o ser distintos.**
- **RTP transporta los datos de audio o vídeo; RTCP transporta información de control y calidad.**

| Sesión | Alicia | Bob |
|--------|--------|-----|
| **Audio** | RTP **UDP 5004** · RTCP **UDP 5005** | RTP **UDP 6004** · RTCP **UDP 6005** |
| **Vídeo** | RTP **UDP 5006** · RTCP **UDP 5007** | RTP **UDP 6006** · RTCP **UDP 6007** |

- **Audio** = una sesión multimedia con su RTP y su RTCP; **vídeo** = otra sesión con su RTP y su RTCP. **Audio y vídeo no completan la misma sesión** (son sesiones separadas).
- **Opcionalmente**, RTP y RTCP pueden **multiplexarse en un mismo puerto** (*RTP/RTCP mux*, **RFC 5761**), aunque aquí se muestran separados. *Ejemplo con puertos RTP pares y RTCP impares consecutivos.*

## 8.6 SIP: funciones e identificación de usuarios (86/107 · BÁSICO)

> **SIP** es un **protocolo de señalización** que permite **establecer, modificar y finalizar sesiones de comunicación multimedia sobre redes IP**.

| # | Función | Descripción |
|---|---------|-------------|
| **1** | **Identificación y localización** | Utiliza una **identidad lógica**, como **`sip:bob@example.net`**, para localizar dónde contactar al usuario; **no tiene por qué coincidir con su IP actual** |
| **2** | **Invitación y disponibilidad** | Permite **solicitar una comunicación** y conocer si el destinatario **acepta o rechaza** la sesión |
| **3** | **Descripción de medios** | Permite **intercambiar descripciones SDP** con los medios, formatos y parámetros de transporte propuestos |
| **4** | **Gestión de la sesión** | Permite **modificar una sesión en curso o finalizarla** cuando los participantes lo soliciten |

## 8.7 SDP: descripción de una sesión multimedia (87/107 · BÁSICO)

> **SDP** (*Session Description Protocol*): **formato de descripción de sesiones** que indica **qué medios se utilizarán y con qué parámetros**. **Habitualmente se intercambia dentro de mensajes SIP.**

```
v=0
o=alicia 1234 1 IN IP4 192.0.2.10
s=Videollamada
c=IN IP4 192.0.2.10
t=0 0
a=sendrecv
m=audio 5004 RTP/AVP 0
a=rtpmap:0 PCMU/8000
m=video 5006 RTP/AVP 96
a=rtpmap:96 H264/90000
```

| Línea | Significado |
|-------|-------------|
| **`v=`, `o=`, `s=`, `t=`** | **Versión SDP, origen, nombre y temporización de la sesión** |
| **`c=`** | **Dirección IP propuesta para recibir los medios** |
| **`m=`** | **Tipo de medio, puerto UDP, perfil RTP y formatos admitidos** (`m=audio 5004 RTP/AVP 0`; `m=video 5006 RTP/AVP 96`) |
| **`a=rtpmap:`** | **Asocia un identificador de formato con un códec y su reloj RTP** (`0 → PCMU/8000`; `96 → H264/90000`) |
| **`a=sendrecv`** | **Se propone una comunicación bidireccional** |

*Referencia:* IETF RFC 8866 (SDP).

## 8.8 SIP y SDP: negociar antes de transportar audio (88/107 · BÁSICO)

**Modelo de oferta/respuesta:** A inicia una llamada de audio con B.

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1** | **A → B: `INVITE` + SDP (oferta)** | A **propone códecs** y la **dirección IP y puerto** donde recibirá el audio RTP |
| **2** | **B → A: `200 OK` + SDP (respuesta)** | B **acepta los parámetros compatibles** e indica **su dirección y puerto de recepción** |
| **3** | **A → B: `ACK`** | A **confirma la recepción del 200 OK**. Los extremos **intercambian RTP** según lo acordado |

| Protocolo | Función |
|-----------|---------|
| **SIP** | **Establece y gestiona la sesión** |
| **SDP** | **Describe los medios y los parámetros negociados** |
| **RTP** | **Transporta el audio** |
| **RTCP** | **Aporta información de control** |

> *Simplificación:* puede haber **respuestas provisionales con SDP**; **el inicio de RTP no depende necesariamente de recibir el ACK.** *Referencias:* RFC 3261 (SIP); RFC 3264 (oferta/respuesta SDP).

## 8.9 SIP: registro de un usuario, paso a paso (89/107 · BÁSICO)

**Ejemplo:** Bob usa un **agente de usuario (*User Agent, UA*)** (la aplicación SIP de su terminal) para registrar **`sip:bob@example.net`**. Actualmente usa la **IP 192.0.2.20**. El **Registrar** es el servidor que **procesa los registros SIP y actualiza la información de contacto.**

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. REGISTER** | **REGISTER** | El terminal solicita registrar su identidad. Incluye **`To:` identidad de Bob**, **`Contact:` dirección actual (`sip:bob@192.0.2.20:5060`)** y **`Expires:` duración solicitada (3600 s)** |
| **2. Autenticación** | **401 Unauthorized** | El Registrar **solicita verificar la identidad**; puede incluir un **desafío en `WWW-Authenticate`** (parámetros **realm** y **nonce**). **Es un paso habitual: no implica un error definitivo** |
| **3. REGISTER autenticado** | **REGISTER + Authorization** | Bob reenvía REGISTER con la cabecera **`Authorization`** (respuesta al desafío) e **incrementa el `CSeq`**; el servidor verifica las credenciales |
| **4. Registro aceptado** | **200 OK** | La red **actualiza la asociación entre la identidad SIP y el contacto actual**. **El registro tiene una vigencia determinada y debe renovarse** |

## 8.10 SIP: establecimiento y finalización de una llamada (90/107 · BÁSICO)

**Escenario:** Alicia conoce la dirección SIP de Bob; ambos ejecutan un **UA** y **se comunican directamente (sin Proxy)**.

```
 Alicia (UA)                             Bob (UA)
    │──── INVITE + SDP (oferta) ──────────►│   1
    │◄─────────── 180 Ringing ─────────────│   2
    │◄──────── 200 OK + SDP (resp.) ───────│   3
    │──────────────── ACK ────────────────►│   4
    │◄══════════ RTP: audio (ambos) ═══════►│   5
    │──────────────── BYE ────────────────►│   6
    │◄───────────── 200 OK ────────────────│   7
```

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1** | **INVITE + SDP** | Alicia envía la oferta: **códecs propuestos, dirección IP y puerto para recibir RTP**. **Todavía no se ha establecido la llamada** |
| **2** | **180 Ringing** | El terminal de Bob **comienza a avisar** al usuario. **Bob aún no ha aceptado** |
| **3** | **200 OK + SDP** | Bob descuelga; la respuesta incluye **formatos aceptados y puertos de recepción RTP**: **la negociación de medios se completa** |
| **4** | **ACK** | Alicia **confirma la recepción de la respuesta final 200 OK** al INVITE: **la sesión SIP queda establecida** |
| **5** | **RTP: audio** | Los terminales intercambian paquetes RTP al **puerto indicado por el otro en su SDP**. **SIP señaliza; RTP transporta la voz. Los medios no necesitan atravesar servidores SIP** |
| **6** | **BYE** | Alicia decide finalizar. **BYE pertenece a SIP, no a RTP** |
| **7** | **200 OK** | Bob confirma; **los terminales dejan de intercambiar audio** |

## 8.11 SIP: establecimiento de llamada mediante *Proxy* (91/107 · BÁSICO)

**Ejemplo:** Alicia llama a **`sip:bob@example.net`**. Bob **ya está registrado**, pero Alicia **desconoce su contacto actual** (solo conoce su identidad SIP). **El Proxy SIP permite localizarlo.**

```
 Alicia ──INVITE (+SDP)──► Proxy SIP ──consulta localización──► (Contact de Bob: sip:bob@192.0.2.20)
                              │──INVITE──► Bob          ◄── 180 Ringing ── (reenviado a Alicia)
                              ◄────────── 200 OK + SDP ───── (reenviado a Alicia)
 Alicia ──ACK (vía Record-Route)──► Bob
 Alicia ◄═════════ RTP: audio directo ═════════► Bob       (el Proxy no transporta el audio)
 Alicia ──BYE (vía Proxy)──► Bob ──200 OK──► Alicia
```

| Paso | Qué ocurre |
|------|-----------|
| **0. Situación inicial** | Bob **se ha registrado en la red SIP**; Alicia conoce **su identidad SIP pero no su IP actual** |
| **1. INVITE** | Alicia envía `INVITE` **al Proxy SIP**, identificando al destinatario con `sip:bob@example.net`; puede incluir **oferta SDP** |
| **2. Localización** | El Proxy **consulta la información de localización del dominio** y **obtiene el *Contact* registrado por Bob** (p. ej. `sip:bob@192.0.2.20`) |
| **3. Reenvío** | **El Proxy reenvía el INVITE al contacto actual de Bob.** **Alicia no necesita conocer la IP del terminal de Bob** |
| **4. Aviso** | El terminal de Bob suena y responde **`180 Ringing`**, que el Proxy reenvía a Alicia. **No significa que Bob haya contestado** |
| **5. Aceptación** | Bob devuelve **`200 OK` con su respuesta SDP**; el Proxy la reenvía hasta Alicia |
| **6. ACK** | Alicia envía **ACK** para confirmar la respuesta final. **En este ejemplo el Proxy se incluyó en el camino de los futuros mensajes SIP mediante `Record-Route`.** **La sesión SIP queda establecida** |
| **7. RTP** | Empieza el audio por **RTP**: **la voz viaja directamente entre los terminales**; **el Proxy participa en la señalización, pero no transporta el audio** |
| **8. Finalización** | Alicia envía **BYE**; **recorre el Proxy por la ruta SIP establecida** y Bob responde **200 OK**. **La sesión finaliza** |

## 8.12 IMS: servicios multimedia en redes móviles 4G y 5G (92/107 · BÁSICO)

```
 Terminales (UE A/B, clientes SIP) ── gNB/eNB (5G NR / 4G LTE) ── 5GC / EPC (core móvil)
       │  SIP: registro y control de sesiones ──► P-CSCF ─► I-CSCF ─► S-CSCF ─► Servidor de aplicaciones
       └═══ RTP/RTCP: transporte de audio/vídeo (plano de usuario IP; los medios NO atraviesan los CSCF) ═══►
```

| Bloque | Qué es |
|--------|--------|
| **Terminales de usuario** | UE A y UE B, **clientes SIP** |
| **Acceso y conectividad IP** | **gNB/eNB y 5GC/EPC**: la red móvil **aporta conectividad IP y calidad de servicio (QoS)** |
| **Plataforma IMS** | **P-CSCF** (*Proxy Call Session Control Function*), **I-CSCF** (*Interrogating…*), **S-CSCF** (*Serving…*) y **Servidor de aplicaciones** (mensajería, presencia, voz/vídeo) |

> **Idea clave:** **en 4G y 5G, IMS utiliza SIP para controlar la comunicación; la voz y el vídeo viajan por RTP/RTCP en el plano de usuario IP.** **IMS aporta la lógica del servicio multimedia.**

## 8.13 VoLTE: establecimiento de una llamada mediante IMS (93/107 · BÁSICO)

**Actores:** Terminal de Alicia (VoLTE) · Acceso LTE + EPC · **P-CSCF** · Red IMS (**I-CSCF/S-CSCF**) · Acceso LTE + EPC · Terminal de Bob (VoLTE).

| Fase | Mensajes |
|------|----------|
| **Establecimiento** | **INVITE + SDP** → **180 Ringing** → **200 OK + SDP** → **ACK** (cada mensaje atraviesa el acceso LTE+EPC, el P-CSCF y la red IMS) |
| **Conversación** | **RTP/RTCP (voz)**: **la voz se transporta como paquetes IP sobre LTE/EPC con QoS** |
| **Finalización** | **BYE** → **200 OK** |

> **IMS controla la sesión mediante SIP; la voz viaja como RTP/RTCP sobre la conectividad LTE/EPC.**

## 8.14 Servicios de voz en 4G y 5G: VoLTE, VoNR y EPS Fallback (94/107 · BÁSICO)

| | **VoLTE** | **VoNR** | **EPS Fallback** |
|--|-----------|----------|------------------|
| **Acceso radio** | **LTE** | **5G NR** | **5G NR y 4G LTE** (fallback a LTE) |
| **Núcleo de red** | **EPC** | **5GC** | **EPC** |
| **Servicio de llamadas** | **IMS** | **IMS** | **IMS** |
| **Qué ocurre** | **El UE permanece en LTE.** Voz sobre LTE/EPC | **El UE permanece en NR.** Voz sobre NR/5GC | **La llamada se cursa en LTE; no es CS fallback: la voz sigue siendo IP** |
| **Control / voz** | **IMS/SIP** (control) · **RTP/IP** (flujo de voz) | igual | igual |

> **IMS aporta el servicio de llamada; lo que cambia es el acceso y el núcleo que transportan la voz.**

---

# 9. Mensajería instantánea y XMPP

> Todo este bloque está marcado **COMPL.**

## 9.1 Qué ofrece la mensajería instantánea (95/107)

| Función | Descripción |
|---------|-------------|
| **Contactos y presencia** | **Lista de contactos**, **presencia y estado**, **conversaciones individuales o en grupo** |
| **Conversación y actividad** | **Mensajes de texto, notificaciones e indicadores de actividad** |
| **Contenido compartido** | **Imágenes y ficheros, adjuntos e intercambio de contenido multimedia** |
| **Entrega y sincronización** | **Entrega inmediata o diferida, almacenamiento temporal y sincronización entre dispositivos** |

**Ejemplo:** Alicia envía un mensaje a Bob **aunque Bob no esté conectado**; **el servicio puede almacenarlo y entregarlo cuando Bob vuelva a conectarse.**
> **Idea clave:** la mensajería instantánea puede **combinar comunicación interactiva, almacenamiento y sincronización.**

## 9.2 XMPP: mensajería y presencia extensibles (96/107)

> **XMPP** (*Extensible Messaging and Presence Protocol*): **protocolo abierto basado en XML** (*Extensible Markup Language*) **para intercambiar mensajes y estados de presencia.**

| Función | Descripción |
|---------|-------------|
| **Mensajería** | Intercambio de mensajes entre usuarios, **en conversaciones o de forma asíncrona** |
| **Presencia** | **Publicación y consulta autorizada de la disponibilidad de los contactos** |
| **Extensiones** | Las **XEP** (*XMPP Extension Protocols*) incorporan funciones como **recibos de mensajes, estados de conversación y transferencia de ficheros** |

*Referencia:* IETF **RFC 6120 y 6121** (XMPP).

## 9.3 XMPP: flujo federado de mensajes (97/107)

```
 Cliente de Alicia ──C2S (TCP 5222)── Servidor XMPP example.org ──S2S (TCP 5269)── Servidor XMPP example.net ──C2S (TCP 5222)── Cliente de Bob
 alicia@example.org/portatil                                                                              bob@example.net/movil
   1 Alicia envía mensaje a bob@example.net · 2 Encaminamiento al dominio example.net · 3 Entrega a Bob en su cliente
```

| Concepto | Descripción |
|----------|-------------|
| **C2S** (*client-to-server*) | **Cada usuario se conecta a su servidor XMPP** (**TCP 5222**) |
| **S2S** (*server-to-server*) | **Los dominios pueden intercambiarse mensajes** (**TCP 5269**) |
| **Federación** | **Usuarios de distintos dominios pueden comunicarse sin conexión directa entre clientes** |

> **El dominio del JID indica a qué servidor debe encaminarse el mensaje.**

## 9.4 XMPP: identidad del usuario mediante JID (98/107)

> **JID** (*Jabber ID*): identidad XMPP. Ejemplo: **`alicia@example.org/portatil`**.

| Parte | Significado |
|-------|-------------|
| **Parte local** (`alicia`) | **Identifica al usuario dentro del dominio** |
| **Dominio** (`example.org`) | **Identifica el servicio XMPP del dominio** |
| **Recurso** (`portatil`) | **Distingue una conexión o instancia concreta** (dispositivo, aplicación…) |

| **Bare JID** (sin recurso) | **Full JID** (con recurso) |
|----------------------------|----------------------------|
| `alicia@example.org` — **identifica al usuario en el dominio** | `alicia@example.org/portatil` — **identifica una conexión concreta del usuario** |

> **Un mismo usuario puede tener varios recursos activos.** **El JID identifica al usuario por dominio; el recurso distingue una conexión concreta.**

## 9.5 XMPP: flujos XML y tipos de estrofas (99/107)

> XMPP usa **flujos XML (*XML Streams*)**; dentro de cada flujo se transmiten unidades llamadas **estrofas (*stanzas*)**.

| Estrofa | Para qué sirve | Ejemplo del tema |
|---------|----------------|------------------|
| **`message`** | **Intercambiar contenido entre usuarios** | `<message to="bob@example.net" type="chat"><body>Hola, Bob.</body></message>` |
| **`presence`** | **Comunicar información sobre el estado de un usuario** | `<presence><show>away</show></presence>` (**`away` = ausente**) |
| **`iq`** | **Petición y respuesta: consultar o modificar información del servicio** | `<iq type="get" id="r1"><query xmlns="jabber:iq:roster"/></iq>` (**solicita la lista de contactos, *roster***) |

## 9.6 XMPP: cómo interpretar una estrofa (100/107)

| Atributo | Significado |
|----------|-------------|
| **`from`** | **Remitente** (entidad de origen; **puede incluir un recurso concreto**) |
| **`to`** | **Destinatario** (su **JID**) |
| **`id`** | **Identifica la estrofa**; **en una petición IQ permite relacionarla con su respuesta** |
| **`type`** | **Su significado depende de la estrofa**: `chat` en un mensaje o `get` en una IQ |
| **`xml:lang`** | **Idioma del contenido** |

*Ejemplo:* `<message from="alicia@example.org/portatil" to="bob@example.net" id="m1" type="chat" xml:lang="es"><body>Hola, Bob.</body></message>` → **Alicia envía desde su portátil un mensaje de chat a Bob; el contenido está en el elemento `body`.**

## 9.7 XMPP: intercambio de mensajes entre usuarios (101/107)

**Ejemplo:** Alicia (`alicia@example.org`) envía un mensaje a Bob (`bob@example.net`). **Dominios diferentes; ambos conectados a sus servidores XMPP.**

| Paso | Qué ocurre |
|------|-----------|
| **1. Mensaje de Alicia** | Crea una estrofa **`message`** dirigida a `bob@example.net` con un elemento **`body`**; su cliente la envía al servidor de `example.org` |
| **2. Federación** | El servidor de Alicia **examina el dominio del destinatario**; como es otro, **reenvía la estrofa al servidor de Bob** mediante **S2S** |
| **3. Entrega a Bob** | El servidor de Bob **localiza una conexión activa de Bob** y le entrega el mensaje. **No se implica una confirmación de lectura** |
| **4. Respuesta de Bob** | Bob escribe una respuesta: **otra estrofa `message`** dirigida a `alicia@example.org`. **Es un mensaje independiente, no un acuse automático** |
| **5. Camino inverso** | La respuesta viaja del servidor de Bob al de Alicia mediante S2S y se entrega a su cliente. **Los clientes no necesitan una conexión directa** |

## 9.8 XMPP: presencia y estados de conversación (102/107)

> XMPP distingue la **presencia (disponibilidad)** de los **estados de conversación (actividad al redactar mensajes)**.

| | **Presencia** | **Estado de conversación** |
|--|---------------|----------------------------|
| **Ejemplo** | `<presence><show>away</show><status>Estoy en clase</status></presence>` | `<message to="alicia@example.org" type="chat"><composing xmlns="http://jabber.org/protocol/chatstates"/></message>` |
| **Elementos** | **`show`**: disponibilidad anunciada: **`away`** (ausente), **`chat`** (disponible para conversar), **`dnd`** (no molestar), **`xa`** (ausencia prolongada). **`status`**: texto libre | **`composing`**: **el cliente anuncia que está redactando un mensaje**. Otros estados: **`active`, `paused`, `inactive`** (**XEP-0085**) |
| **Notas** | **La distribución de presencia suele depender de una suscripción autorizada** | **Estos estados no confirman la entrega ni la lectura** de un mensaje |

*Referencia:* RFC 6121 (presencia); **XEP-0085** (estados de conversación).

## 9.9 XMPP: seguridad de la comunicación (103/107)

| **TLS: protección del transporte** | **SASL: autenticación** |
|------------------------------------|-------------------------|
| **Proporciona confidencialidad e integridad** a los datos transmitidos por una conexión. Ej.: **entre Alicia y su servidor XMPP, o entre dos servidores federados** | ***Simple Authentication and Security Layer***: **marco para autenticar entidades**. Ej.: **Alicia presenta sus credenciales y el servidor verifica su identidad** |

> **Autenticación y cifrado son funciones diferentes. Cada conexión se protege de forma independiente.**
> **¿Y el cifrado extremo a extremo (E2EE)?** **TLS protege las conexiones individuales, pero NO garantiza que los mensajes permanezcan cifrados entre Alicia y Bob**: hacen falta **mecanismos adicionales de E2EE**.
> *Referencia:* RFC 6120 (§§5–6).

## 9.10 XMPP: recibos, estados y archivos (104/107, 105/107 y 106/107)

**Confirmación de recepción (XEP-0184, *Message Delivery Receipts*):**

| Paso | Qué ocurre |
|------|-----------|
| **1. Solicitud** | Alicia incluye **`<request xmlns="urn:xmpp:receipts"/>`** en su mensaje (con `id="m1"`) |
| **2. Confirmación** | Si el cliente de Bob admite el mecanismo, puede enviar **`<received xmlns="urn:xmpp:receipts" id="m1"/>`** |
| **3. Identificación** | **El atributo `id="m1"` identifica el mensaje recibido** |

> **Importante: la confirmación indica recepción por el cliente, NO que Bob haya leído el contenido.**

| Mecanismo | Qué indica y qué NO garantiza |
|-----------|-------------------------------|
| **Presencia** | Estado de disponibilidad anunciado por un recurso. **No implica que el usuario lea los mensajes** |
| **Escribiendo** (XEP-0085) | Informa de la **actividad de composición**, **no de la entrega** |
| **Recibos** (XEP-0184) | Confirman la **recepción** de un mensaje. **No garantizan su lectura humana ni una entrega exactamente una vez** |
| **IBB** (*In-Band Bytestreams*, **XEP-0047**) | **Permite transferir datos binarios codificados en Base64 mediante estrofas XMPP** |

> **IBB es una alternativa para transferir archivos, generalmente menos eficiente; no es el único mecanismo de transferencia disponible en XMPP.**

**Transferencia de ficheros mediante IBB (IQ `set` / `result`):**

| Paso | Mensaje | Qué ocurre |
|------|---------|-----------|
| **1. Apertura** | **IQ set: `open` (sid, block-size)** | Alicia solicita abrir un flujo. **`sid`** = identificador del flujo; **`block-size`** = tamaño máximo del bloque original (antes de Base64); `stanza="iq"` = modalidad de transporte |
| **2. Aceptación** | **IQ result** | Bob acepta; la respuesta usa **el mismo `id`** que la petición. **El flujo IBB queda abierto** |
| **3. Primer bloque** | **IQ set: `data` (seq=0, Base64)** | **`seq=0`: primer bloque**; **Base64** = representación textual de los bytes; pertenece al flujo indicado por `sid` |
| **4. Confirmación** | **IQ result** | Bob confirma el procesamiento del bloque (conserva el `id` de esa petición) |
| **5. Nuevos bloques** | **IQ set: `data` (seq=1, 2, …)** | **Los bloques se numeran con `seq`: 0, 1, 2…**; **cada petición IQ recibe su respuesta**; todos mantienen el mismo `sid` |
| **6. Cierre** | **IQ set: `close` (sid)** | Alicia solicita **finalizar el flujo IBB** |
| **7. Fin del flujo** | **IQ result** | Bob procesa el cierre y responde; **el flujo ha finalizado** |

---

## 9.11 Síntesis: de la señalización al servicio conversacional (107/107)

| # | Fase | Contenido |
|---|------|-----------|
| **1** | **Se identifica y localiza** | **Un número telefónico, identidad SIP o JID** permite dirigirse a un usuario o servicio. **En redes móviles, los procedimientos de registro y movilidad mantienen datos para encontrar al abonado** |
| **2** | **Se establece o negocia** | **Telefonía tradicional:** centrales, circuitos e **ISUP**. **Telefonía IP:** **SIP/SDP** y, si procede, **políticas de QoS de la red** |
| **3** | **Se transporta el contenido** | **La voz tradicional ocupa recursos de circuito; la voz IP se codifica y se transporta como paquetes, con frecuencia mediante RTP/UDP/IP.** **RTCP** proporciona información de control del flujo multimedia |
| **4** | **Se gestiona la comunicación** | **La red reacciona a movilidad, liberación de recursos y servicios suplementarios.** **XMPP aplica un modelo de mensajes, presencia y estrofas diferente de una llamada telefónica** |

> **Idea clave:** una explicación correcta **separa siempre identidad, señalización, recursos de red y flujo de información.**

---

# 10. Cuadros comparativos

### 10.1 Señalización de la telefonía: ISUP, MAP e INAP
| | **ISUP** | **MAP** | **INAP** |
|--|----------|---------|----------|
| **Para qué** | **Establecer y liberar circuitos** entre centrales | **Localización y movilidad de abonados móviles** | **Consultar la lógica de red inteligente** |
| **Mensajes típicos** | **IAM, ACM, ANM, REL, RLC** | **UpdateLocation, SendRoutingInfo, ProvideRoamingNumber, ForwardSM, PrepareHandover** | **InitialDP, Connect** |

### 10.2 Mensajes ISUP
| Mensaje | Significado |
|---------|-------------|
| **IAM** | Inicia la llamada; destino y circuito (CIC) |
| **ACM** | Dirección completa; **NO significa que contesten** |
| **ANM** | **El destinatario responde** |
| **REL** | Libera (con **causa**: 16 normal; 17 usuario ocupado) |
| **RLC** | Confirma la liberación del circuito |

### 10.3 Identificadores móviles y números temporales
| Identificador | Qué es |
|---------------|--------|
| **IMSI** | **Suscripción** (permanente, usada por la red) |
| **MSISDN** | **Número de teléfono** público |
| **IMEI** | **Equipo** (independiente de la SIM) |
| **TMSI** | Identidad temporal del abonado (en el registro) |
| **MSRN** | **Número temporal** para alcanzar el MSC que atiende al móvil en **llamadas entrantes** |
| **Handover Number** | **Número temporal** para alcanzar el MSC destino **durante un handover inter-MSC** |
| **LAI** | **Identificador de un área de localización** |

### 10.4 Llamada, SMS y handover en 2G: operaciones MAP
| Procedimiento | Operaciones MAP principales |
|---------------|-----------------------------|
| **Location Updating** | UpdateLocation, InsertSubscriberData |
| **Llamada a un móvil** | SendRoutingInfo (SRI), ProvideRoamingNumber (PRN) |
| **SMS** | ForwardSM (el SMSC pregunta al HLR; **no se necesita MSRN**) |
| **Handover inter-MSC** | PrepareHandover, SendEndSignal |

### 10.5 Handover por generación
| | **2G inter-MSC** | **4G (X2)** | **5G (Xn)** |
|--|------------------|-------------|-------------|
| **Ancla** | **MSC X** (ancla) | **S-GW** | **UPF** (con posible cambio A → B) |
| **Control** | MSC / BSC | **MME** | **AMF y SMF** |
| **Mensaje clave al núcleo** | MAP PrepareHandover | **S1AP Path Switch Request** + Modify Bearer | **NGAP Path Switch Request** + N4 |

### 10.6 Sesión de datos: 4G frente a 5G
| | **4G** | **5G** |
|--|--------|--------|
| **Concepto** | **Conexión PDN + portadora EPS** (APN) | **Sesión PDU + flujos QoS** (DNN) |
| **Identificadores** | APN | **DNN, QFI, 5QI** |
| **Señalización** | NAS (EMM/ESM), S1AP, GTP-C, Diameter | NAS (5GMM/5GSM), NGAP, **HTTP/2 (SBI)**, **PFCP (N4)** |
| **Usuario** | GTP-U (S1-U, S5/S8) | **GTP-U (N3, N9)** |

### 10.7 Voz en 4G y 5G
| | **CSFB** | **VoLTE** | **VoNR** | **EPS Fallback** |
|--|----------|-----------|----------|------------------|
| **Voz** | **Circuitos (2G/3G)** | **IP (LTE/EPC)** | **IP (NR/5GC)** | **IP (LTE/EPC)** |
| **IMS** | No | **Sí** | **Sí** | **Sí** |

### 10.8 Centralitas y evolución
| | **KTS** | **PABX** | **Centrex** | **IP-PBX** |
|--|---------|----------|-------------|------------|
| **Idea** | Líneas compartidas | **Centralita privada** | **Servicio desde el operador** | **Basada en IP: propia o alojada** |

### 10.9 SIP, SDP, RTP y RTCP
| | Función |
|--|---------|
| **SIP** | **Establece, modifica y termina** sesiones (señalización) |
| **SDP** | **Describe** los medios y parámetros (se intercambia **dentro de SIP**) |
| **RTP** | **Transporta** audio/vídeo |
| **RTCP** | **Informa** sobre calidad y sincronización |

### 10.10 Mensajes SIP y su significado
| Mensaje | Significado |
|---------|-------------|
| **REGISTER** | Registrar identidad y contacto (con `Expires`) |
| **INVITE** | Solicitar la sesión (con SDP) |
| **180 Ringing** | El destinatario está siendo avisado (**no ha contestado**) |
| **200 OK** | Aceptación (con SDP si responde a INVITE) |
| **ACK** | **Confirma el 200 OK** al INVITE |
| **BYE** | **Finaliza** la sesión |
| **401 Unauthorized** | **Desafío de autenticación** (no es un error definitivo) |

### 10.11 Elementos IMS
| | Función |
|--|---------|
| **P-CSCF** | **Primer punto SIP** del terminal hacia IMS |
| **I-CSCF** | **Entrada al dominio**; elige S-CSCF |
| **S-CSCF** | **Control de sesión y registro** |
| **AS** | **Lógica de los servicios** |
| **HSS** | **Datos de abonado** (Diameter **Cx**) |

### 10.12 Cabecera RTP
| Campo | Bits |
|-------|------|
| V / P / X / CC / M / PT | 2 / 1 / 1 / 4 / 1 / 7 |
| **Sequence Number** | **16** |
| **Timestamp** | **32** |
| **SSRC** | **32** |

### 10.13 XMPP
| Concepto | Valor |
|----------|-------|
| **Puertos** | **C2S: TCP 5222 · S2S: TCP 5269** |
| **Estrofas** | **message, presence, iq** |
| **JID** | **local@dominio/recurso** (bare sin recurso; full con recurso) |
| **Seguridad** | **TLS (transporte) y SASL (autenticación)**; **E2EE requiere mecanismos adicionales** |
| **Recibo** | **XEP-0184**: indica **recepción, no lectura** |
| **Estados de conversación** | **XEP-0085** (composing, active, paused, inactive) |
| **Transferencia de ficheros** | **IBB (XEP-0047)**: Base64 en estrofas IQ |

---

# 11. Glosario de siglas

| Sigla | Significado |
|-------|-------------|
| **ACD** | *Automatic Call Distribution* |
| **ACM / ANM / IAM / REL / RLC** | Mensajes ISUP: *Address Complete, Answer, Initial Address, Release, Release Complete* |
| **APN** | *Access Point Name* |
| **AS** | *Application Server* |
| **BSSAP / BSSMAP / DTAP** | *Base Station System Application Part / BSS Management AP / Direct Transfer AP* |
| **CC / CM / MM / RR** | *Call Control / Connection / Mobility / Radio Resource Management* (GSM) |
| **CIC** | *Circuit Identification Code* |
| **CSCF** | *Call Session Control Function* (P-/I-/S-) |
| **CSFB** | *Circuit-Switched Fallback* |
| **DDI / DID** | *Direct Dial-In / Direct Inward Dialing* |
| **DNIS** | *Dialed Number Identification Service* |
| **DNN** | *Data Network Name* |
| **DTMF** | *Dual-Tone Multi-Frequency* |
| **E.164** | Numeración telefónica internacional (UIT-T) |
| **EMM / ESM** | *EPS Mobility / Session Management* |
| **E-RAB** | *E-UTRAN Radio Access Bearer* |
| **GTP-C / GTP-U** | *GPRS Tunnelling Protocol – Control / User* |
| **HLR / VLR / AuC / EIR / SMSC** | Registros y centros del núcleo GSM |
| **HPLMN / VPLMN** | *Home / Visited Public Land Mobile Network* |
| **IBB** | *In-Band Bytestreams* |
| **IMEI / IMSI / MSISDN / TMSI / MSRN** | Identificadores móviles |
| **IMS** | *IP Multimedia Subsystem* |
| **INAP** | *Intelligent Network Application Part* |
| **ISUP** | *ISDN User Part* |
| **JID** | *Jabber ID* |
| **KTS** | *Key Telephone System* |
| **LA / LAI** | *Location Area / Identity* |
| **MAP** | *Mobile Application Part* |
| **MO-SMS / MT-SMS** | *Mobile Originated / Terminated* |
| **NAS / AS** | *Non-Access / Access Stratum* |
| **NGAP / S1AP / XnAP / X2AP** | Protocolos de señalización del acceso |
| **PBX / PABX / IP-PBX** | Centralitas (*Private Automatic Branch Exchange*) |
| **PFCP** | *Packet Forwarding Control Protocol* |
| **PDU / DN** | *Protocol Data Unit (sesión PDU) / Data Network* |
| **QFI / 5QI** | *QoS Flow Identifier / 5G QoS Identifier* |
| **RTP / RTCP** | *Real-time Transport (Control) Protocol* |
| **SASL / TLS** | Autenticación y seguridad de transporte (XMPP) |
| **SBI** | *Service-Based Interface* |
| **SCP / SDP / SSP** | Red inteligente (*Service Control/Data/Switching Point*) |
| **SDP** (sesión) | *Session Description Protocol* (no confundir con el SDP de datos de servicio) |
| **SIP** | *Session Initiation Protocol* |
| **SS7** | *Signalling System No. 7* |
| **TAU** | *Tracking Area Update* |
| **UA** | *User Agent* (SIP) |
| **VoLTE / VoNR** | *Voice over LTE / over NR* |
| **XMPP / XEP** | *Extensible Messaging and Presence Protocol / XMPP Extension Protocol* |

---

# 12. Test de repaso

> Tapa la columna derecha y responde.

### Fundamentos y señalización

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es un servicio conversacional? | Permite que **dos o más usuarios intercambien información e interactúen a distancia** con uno o varios medios (audio, vídeo, mensajería, mixtos) |
| ¿Qué exigen la voz y el vídeo en directo frente a la mensajería? | **Poco retardo** (conversación natural) frente a **mayor tolerancia al retardo**, importando más recibir los mensajes completos |
| ¿Cuatro magnitudes de QoS? | **Retardo, jitter, pérdidas y tasa disponible** |
| ¿Qué es el jitter? | **Variación del retardo** entre paquetes |
| ¿Qué hace un búfer de reproducción y cuál es su compromiso? | Almacena paquetes antes de reproducirlos para **compensar el jitter**; **mayor búfer = más tolerancia pero más retardo** |
| ¿Plano de control frente a plano de usuario? | **Señalización** (identificar, localizar, establecer/liberar, gestionar recursos) frente a **transporte de la información** (voz, vídeo, mensajes) |
| ¿Cómo detecta la central que un teléfono está descolgado? | **Corriente de bucle de 20–60 mA** (≈ 0 si está colgado), con tensión continua de ≈ −48 V |
| ¿Pulsos frente a DTMF? | **Interrupciones del bucle** (≈ 60 ms abierto / 40 ms cerrado) frente a **dos tonos simultáneos** |
| ¿Qué tonos forman el 5 en DTMF? | **770 Hz + 1336 Hz** |
| ¿Cuánto vale el timbre fijo, la frecuencia de tonos y la cadencia de ocupado (Telefónica)? | Timbre **25 ± 3 Hz** (1,5 s / 3 s); tonos **425 ± 15 Hz**; ocupado **0,2 s / 0,2 s** |
| ¿Confirma el tono de retorno que B contestó? | **No**: solo que se le está avisando |
| IMSI / MSISDN / IMEI | **Suscripción / número de teléfono / equipo** |
| SIM, USIM, ISIM, UICC, eSIM | **SIM** (aplicación de GSM); **USIM** (3G/4G/5G); **ISIM** (IMS); **UICC** = soporte seguro que las aloja; **eSIM** = perfiles digitales en eUICC |
| ¿Dónde termina RR, y dónde MM y CM en GSM? | **RR en el BSS; MM y CM en el MSC/VLR** |
| ¿Qué es BSSAP y sus dos partes? | Entre BSC y MSC; **BSSMAP** (gestión del BSS) y **DTAP** (transporta MM y CM) |
| NAS y AS en 4G | NAS: **EMM/ESM**; AS: **RRC** (UE–eNB) y **S1AP** (eNB–MME) |
| NAS y AS en 5G | NAS: **5GMM/5GSM**; AS: **RRC** y **NGAP** (gNB–AMF) |
| ¿Qué es SS7? | **Familia de protocolos de control entre centrales**; **la voz no circula por la red de señalización** |
| ISUP / MAP / INAP | **Circuitos entre centrales** / **localización y movilidad móvil** / **consulta de red inteligente** |
| ¿Qué es E.164? | **Numeración internacional**, **máximo 15 dígitos** incluido el código de país |
| Números A, B, C | **Llamante / llamado inicial / destino tras un desvío** |
| ¿Determina el número por sí solo la ruta? | **No** |
| Desbordamiento frente a reparto de carga | Ruta alternativa de **menor prioridad** si falla la principal / **dos rutas con la misma prioridad** con un criterio (round-robin, aleatorio, carga) |
| ¿Qué es un CIC? | **Código de circuito**; **cada llamada reserva uno en cada tramo** y es **local al enlace** |
| IAM, ACM, ANM, REL, RLC | Inicia la llamada · **dirección completa (no contesta)** · **contesta** · libera (con causa) · **confirma liberación** |
| Causas 16 y 17 | **16 = Normal Call Clearing; 17 = User Busy** |
| ¿Qué mensajes faltan si el abonado está ocupado? | **ACM y ANM**: solo IAM → REL (causa 17) → RLC |
| Operaciones MAP principales | **UpdateLocation, SendRoutingInfo (SRI), ProvideRoamingNumber (PRN), ForwardSM, PrepareHandover** |
| INAP: ¿quién decide y quién ejecuta? | **El SCP decide; el SSP ejecuta** (InitialDP → Connect) |
| GTP-C, GTP-U, Diameter en 4G | Control de túneles / transporte de usuario / abonados y autenticación (S6a) |
| 5G: HTTP/2, PFCP, GTP-U | **SBI (control)** / **N4 (SMF–UPF)** / **N3 y N9 (usuario)** |

### Telefonía fija y 2G

| Pregunta | Respuesta |
|----------|-----------|
| Llamada fija: pasos principales | Descolgar → tono de marcar → dígitos → **IAM** → timbre + **ACM** → B descuelga → **ANM** → **voz por circuitos** |
| ¿Por qué el CIC cambia entre tramos? | **Identifica un circuito de un tramo concreto, no toda la llamada** |
| Ejemplo de INAP del 900 | **InitialDP (serviceKey 42) → decisión del SCP según horario → Connect → IAM** |
| ¿Qué es un LA y un LAI? | **Conjunto de celdas** / **su identificador difundido** |
| ¿Cambiar de LA implica cambiar de VLR? | **No necesariamente** |
| Location Updating: mensajes | **MM Location Updating Request → MAP UpdateLocation → InsertSubscriberData → … → Location Updating Accept** |
| ¿Qué es el MSRN? ¿Es el número del abonado? | **Número temporal de encaminamiento** para llegar al MSC; **no es el MSISDN** |
| Llamada a un móvil: orden de operaciones | **CM SETUP → SRI (al HLR) → PRN (al MSC B) → MSRN → IAM con MSRN → paging → ALERTING → CONNECT → ANM** |
| ¿Qué es el *paging*? | **Búsqueda del móvil** en las celdas de su área de localización |
| Llamada entre operadores | **MSC X → interconexión ISUP → gateway MSC de Y → HLR de Y (SRI/PRN) → IAM → paging** |
| ¿Qué es el roaming y qué es VPLMN/HPLMN? | Usar una **red distinta de la de origen**; **red visitada / red de origen** |
| Registro en roaming | **Location Updating → autenticación (con datos del HLR) → UpdateLocation → InsertSubscriberData → Accept** |
| ¿Qué es MO-SMS y MT-SMS? | **Envío desde el móvil al SMSC** / **entrega del SMSC al móvil** |
| ¿Necesita un SMS un MSRN? | **No** (a diferencia de una llamada de voz) |
| ¿Es RP-ACK una lectura del SMS? | **No**: indica **aceptación/entrega correcta**, no lectura |
| ¿Qué es el handover inter-MSC y quién es el ancla? | Cambio de celda con cambio de MSC; **el MSC X sigue como ancla** |
| ¿Qué es el Handover Number? | **Número temporal para alcanzar al MSC destino durante el traspaso** |
| Tipos de handover (nodos) | **Intra-BSC, inter-BSC (intra-MSC) e inter-MSC** |
| Servicios suplementarios del tema | **Llamada en espera, desvío, conferencia, identificación restringida** |
| ¿Dónde se toma la decisión del servicio? | **En la red (MSC/HLR), no en el terminal** |
| ¿Necesita el desvío incondicional red inteligente? | **No**, puede implementarse con las funciones de la red GSM |
| Prepago: mensajes clave | **InitialDP → consulta saldo → ApplyCharging (60 s) + Continue → IAM/ANM → REL/RLC → ApplyChargingReport** |

### 4G y 5G

| Pregunta | Respuesta |
|----------|-----------|
| APN, conexión PDN, portadora EPS | **Nombre del servicio de conectividad** / **conectividad lógica UE–red de datos vía P-GW** / **tratamiento con QoS (siempre hay una por defecto)** |
| Registro EPS (*attach*): mensajes | **Attach Request → Authentication (Diameter S6a) → Attach Accept → Attach Complete** |
| Portadora por defecto: mensajes | **Create Session Request (MME → S-GW → P-GW) → Response → Initial Context Setup (E-RAB) → Modify Bearer** |
| TAU frente a handover | **UE en reposo** (reselección; TAU si cambia de área) frente a **UE conectado** (handover con tráfico) |
| Handover X2: mensaje clave al núcleo | **Path Switch Request** (S1AP) + **Modify Bearer** (S-GW) |
| CSFB frente a VoLTE | **Voz por circuitos en 2G/3G** frente a **voz IP sobre LTE/EPC con IMS** |
| Registro IMS en VoLTE | **REGISTER → 401 (desafío IMS-AKA) → REGISTER autenticado → 200 OK** |
| Roaming de datos 4G | **Home Routed (P-GW en origen)** frente a **Local Breakout (P-GW visitado)** |
| 5G: NAS, NGAP, GTP-U | **N1** (UE–núcleo) / **N2** (gNB–AMF) / **N3** (gNB–UPF) |
| DNN, QFI, 5QI | **Red de datos / flujo QoS / tratamiento QoS** |
| ¿Implica el registro 5G una sesión PDU? | **No** |
| Sesión PDU: elementos que intervienen | **UE, gNB, AMF, SMF, UPF** (PFCP en N4, GTP-U en N3) |
| ¿Por qué la UPF cambia en el handover? | La SMF **sustituye UPF A por UPF B**; **AMF y SMF coordinan**; **la sesión PDU se mantiene** |
| VoNR frente a EPS Fallback | **Voz sobre NR/5GC** frente a **voz en LTE/EPC (VoLTE)**; **no es CS fallback** |

### Centralitas

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué hace una centralita (PBX)? | **Plan de numeración, conmutación de llamadas internas y externas, servicios y políticas** |
| Cuatro escenarios de llamada | **Extensión a extensión; extensión a número público; entrada al número de cabecera; marcación directa entrante (DDI)** |
| CLI/CLIP, DNIS, DDI/DID | **Identidad del llamante / número marcado / alcanzar directamente una extensión** |
| ¿Qué es ACD? | **Distribución automática de llamadas** entre agentes (con cola de espera) |
| KTS, PABX, Centrex, Ibercom | **Líneas compartidas / centralita privada / servicio del operador / oferta histórica de Telefónica** |
| IP-PBX propia frente a alojada | **Equipo en la empresa y mantenimiento propio** frente a **infraestructura y mantenimiento del proveedor** |

### SIP, RTP e IMS

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué hacen SIP, RTP y RTCP? | **Organizan la sesión / transportan la voz o el vídeo / informan de la calidad** |
| ¿Por qué UDP y no TCP para voz? | **Es preferible recibir el audio a tiempo que esperar retransmisiones** (TCP puede aumentar el retardo) |
| Campos RTP: tamaños | **Sequence Number 16 bits; Timestamp 32; SSRC 32; PT 7 bits; cabecera de 12 bytes** |
| ¿Garantiza RTP la entrega? | **No**: ayuda a ordenar y temporizar |
| ¿Qué es el SSRC? | **Fuente de sincronización dentro de la sesión RTP** (no identifica globalmente al usuario) |
| ¿Qué informan SR y RR? | **Estadísticas del emisor / de recepción (pérdidas y jitter)** |
| Puertos del ejemplo de Alicia | **Audio: RTP 5004, RTCP 5005; vídeo: RTP 5006, RTCP 5007** |
| ¿Qué es SDP y qué líneas tiene? | **Describe medios y parámetros**: `v=`, `o=`, `s=`, `c=`, `t=`, `m=`, `a=` |
| `m=audio 5004 RTP/AVP 0` y `a=rtpmap:0 PCMU/8000` | **Audio, puerto 5004, formato 0 = PCMU a 8000 Hz** |
| Oferta/respuesta SIP | **INVITE + SDP (oferta) → 200 OK + SDP (respuesta) → ACK** |
| Registro SIP | **REGISTER → 401 (desafío) → REGISTER + Authorization → 200 OK** |
| ¿Qué significa 180 Ringing? ¿Y 401? | **Se avisa a B (no ha contestado)** / **desafío de autenticación, no error definitivo** |
| ¿Qué es el Proxy SIP y qué es Record-Route? | **Localiza al destinatario y reenvía** / **obliga a que futuros mensajes pasen por el Proxy** |
| ¿Pasa el audio por el Proxy? | **No**: va **directo entre terminales por RTP** |
| IMS en 4G/5G: papel de SIP y de RTP | **SIP controla la sesión (CSCF); RTP/RTCP lleva la voz por el plano de usuario, sin pasar por los CSCF** |
| P-CSCF, I-CSCF, S-CSCF, AS | **Primer punto / entrada y selección del S-CSCF / control de sesión / lógica del servicio** |

### XMPP

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es XMPP? | **Protocolo abierto basado en XML** para mensajería y presencia (RFC 6120/6121) |
| Estrofas | **message, presence, iq** |
| ¿Qué es un JID y sus partes? | **local@dominio/recurso**; bare = sin recurso, full = con recurso |
| ¿Qué es la federación? | **Usuarios de distintos dominios se comunican a través de sus servidores (S2S)**, sin conexión directa entre clientes |
| Puertos XMPP | **C2S 5222, S2S 5269 (TCP)** |
| `show`: valores | **away, chat, dnd, xa** |
| ¿Confirma un recibo (XEP-0184) la lectura? | **No**: solo la **recepción por el cliente** |
| TLS y SASL en XMPP | **Protección del transporte** / **autenticación**; funciones diferentes |
| ¿Garantiza TLS el cifrado extremo a extremo? | **No**: protege cada conexión; E2EE requiere mecanismos adicionales |
| IBB: ¿qué es y qué mensajes usa? | **Transferencia de binarios en Base64 dentro de estrofas IQ**: `open`, `data (seq)`, `close` |

### Verdadero o falso

| Afirmación | V/F |
|------------|-----|
| El tono de retorno confirma que B ha contestado | **F** |
| Un número de teléfono determina por sí solo la ruta de la llamada | **F** |
| ACM significa que el destinatario ha contestado | **F** |
| La voz viaja dentro de los mensajes ISUP | **F** |
| Un SMS necesita MSRN para su entrega | **F** |
| En el handover inter-MSC, el MSC X sigue como ancla | **V** |
| El MME transporta el tráfico de usuario en 4G | **F** |
| El registro 5G implica una sesión PDU activa | **F** |
| EPS Fallback es lo mismo que CS Fallback | **F** |
| RTP garantiza la entrega de los paquetes | **F** |
| El audio SIP/RTP atraviesa siempre el Proxy SIP | **F** |
| Un recibo XMPP confirma que Bob ha leído el mensaje | **F** |
| TLS garantiza E2EE en XMPP | **F** |
| El código 401 de SIP es un rechazo definitivo | **F** |
| Una IP-PBX puede ser local o alojada | **V** |

---

*Esquema elaborado a partir de las diapositivas del **Tema 4 · Servicios conversacionales** de Sistemas Telemáticos (Prof. Óscar Adamuz Hinojosa, Dpto. de Teoría de la Señal, Telemática y Comunicaciones, UGR, curso 2026–2027). Las secciones marcadas como "Ampliación" son material de apoyo propio. Material de estudio personal.*
