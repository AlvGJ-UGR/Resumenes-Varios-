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

