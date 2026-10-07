# Sistemas Telemáticos — Tema 2: Arquitectura básica de las redes

**Universidad de Granada · Grado en Ingeniería de Tecnologías de Telecomunicación**
Basado en las diapositivas del Prof. Óscar Adamuz Hinojosa (curso 2026–2027).

> **Cómo usar este resumen**
> - Las secciones siguen el orden del tema. Cada concepto se explica **una sola vez**; el cuadro comparativo final (§9) los junta para memorizar.
> - **(COMPL.)** = el profesor lo marca como *complementario* en las diapositivas (menos prioritario, pero cae en preguntas de comprensión).
> - **(Ampliación)** = información que **no** está en las diapositivas, añadida para entender mejor el porqué. No la tomes como "lo que dijo el profesor".
> - Al final: test de repaso (§10).

---

## Índice

0. [Idea organizadora: acceso vs troncal](#0-idea-organizadora-acceso-vs-troncal)
1. [Telefonía fija](#1-telefonía-fija)
2. [Red de acceso móvil (2G–5G)](#2-red-de-acceso-móvil-2g5g)
3. [Núcleo de la red móvil (2G–5G)](#3-núcleo-de-la-red-móvil-2g5g)
4. [Red inteligente](#4-red-inteligente)
5. [IMS](#5-ims-ip-multimedia-subsystem)
6. [Arquitectura de Internet](#6-arquitectura-de-internet)
7. [Convergencia telefonía–Internet](#7-convergencia-telefoníainternet)
8. [Lo que el profesor dice que debe quedar claro](#8-lo-que-el-profesor-dice-que-debe-quedar-claro)
9. [Cuadro resumen por generación](#9-cuadro-resumen-por-generación)
10. [Test de repaso](#10-test-de-repaso)

---

## 0. Idea organizadora: acceso vs troncal

La pregunta que organiza todo el tema: *cuando un usuario se comunica, ¿qué parte de la red lo conecta y qué parte transporta la comunicación hasta el destino?*

```
Usuario A ──► RED DE ACCESO ──► RED TRONCAL (NÚCLEO) ──► RED DE ACCESO ──► Usuario B / servicio
 (fijo/móvil)  conecta al       interconecta accesos,     conecta al
               usuario con el   transporta y gestiona     destino
               operador         la comunicación
```

| Parte | Qué es | Medios / funciones |
|-------|--------|--------------------|
| **Red de acceso** | Conecta al **usuario** con la infraestructura del operador | Par de cobre, fibra óptica, enlaces radio |
| **Red troncal / núcleo** | Parte **central**: interconecta las redes de acceso, transporta las comunicaciones entre ellas y hace funciones de **gestión** | Conmutación, encaminamiento, movilidad, interconexión con otras redes |

### Dos evoluciones paralelas (clave del tema)

| | Acceso | Núcleo |
|--|--------|--------|
| **Fija** | Par de cobre (telefonía) → xDSL (datos sobre el mismo cobre) → **fibra** (FTTH, gran capacidad) | **Conmutación de circuitos** (voz) → **conmutación de paquetes** (voz y datos) |
| **Móvil** | 2G GSM (voz y SMS) → 2.5G GPRS (datos por paquetes) → 3G UMTS (datos móviles) → 4G LTE (banda ancha móvil) → 5G NR (más capacidad, menor latencia, muchos dispositivos) | 2G inicial: circuitos (voz) → 2G/3G: **circuitos para voz + paquetes para datos** → 4G/5G: **solo paquetes** (voz y datos) |

- **Conmutación de circuitos**: se **reservan recursos** durante toda la comunicación (típico en voz tradicional).
- **Conmutación de paquetes**: se **comparte** la infraestructura y se transportan voz, datos y otros servicios sobre ella.

---

## 1. Telefonía fija

### 1.1 Red de acceso de abonados fijos (COMPL.)

Tres tramos:

1. **Abonado**: punto donde se origina o termina la comunicación (vivienda, empresa, local).
2. **Red de distribución**: recoge las conexiones de muchos abonados mediante **cajas, armarios y enlaces de distribución**.
3. **Central local**: punto de la red del operador al que llega el acceso y desde el que la comunicación continúa hacia la red troncal.

Evolución del medio de acceso (COMPL.):

| Tecnología | Idea |
|-----------|------|
| **Par de cobre** | Desplegado originalmente para **telefonía analógica**; después se reutilizó para datos |
| **xDSL** | Transmite **datos sobre el par de cobre existente** → una infraestructura pensada para telefonía sirve también para Internet |
| **Fibra óptica** | Sustituye progresivamente al cobre; más capacidad. En **FTTH** (*Fiber To The Home*) la fibra llega **hasta la instalación del abonado** |

### 1.2 Red troncal fija: centrales local y de tránsito

| Central | Función |
|---------|---------|
| **Local (de abonado)** | Conecta los abonados de una zona. Es el **primer punto de conmutación**: permite pasar de los **bucles de abonado** a la red troncal |
| **De tránsito** | **No conecta abonados directamente**: interconecta otras centrales y transporta comunicaciones entre zonas. Una llamada puede atravesar **varias** centrales de tránsito |

> **Por qué existen las de tránsito:** evitan tener que conectar cada central local con todas las demás (malla completa).

### 1.3 Jerarquía clásica de la red troncal fija

De arriba (internacional) a abajo (abonado):

| Nivel | Cobertura / función |
|-------|---------------------|
| **Central internacional** | Conexión con **otros países** (redes internacionales) |
| **Central terciaria** | Nivel **nacional**: conecta varias centrales secundarias |
| **Central secundaria** | Nivel **provincial**: conecta varias centrales primarias |
| **Central primaria** | Nivel **sectorial** (zona o sector): conecta varias centrales locales |
| **Central local (abonado)** | Nivel urbano/local: conecta los bucles de abonado; primer nivel de conmutación |
| **Abonados** | Hogares y empresas; conexión por par de cobre, fibra, etc. |

Además de los enlaces jerárquicos hay **enlaces transversales** entre centrales del mismo nivel (la figura distingue "enlaces de la red troncal" e "interconexión con otras redes").

### 1.4 Interconexión entre operadores

Recorrido de una llamada entre abonados de operadores distintos:

```
Abonado A → central local A → central(es) de tránsito A → PUNTO DE INTERCONEXIÓN
          → central(es) de tránsito B → central local B → Abonado B
```

Cada operador tiene su propia red troncal; se unen en el **punto de interconexión entre operadores**.

---

## 2. Red de acceso móvil (2G–5G)

### 2.1 Principios comunes

- El territorio se divide en **celdas**; cada celda tiene **una estación base** que da cobertura radio a los terminales de esa zona y los comunica con el resto de la red.
- **¿Por qué varias celdas?** Una sola estación base no cubre todo el territorio. Las celdas se **solapan parcialmente** para extender cobertura y permitir que el usuario **se desplace manteniendo el servicio**.
- Tres problemas que la red debe resolver por el solapamiento:

| Problema | Solución |
|----------|----------|
| Cobertura solapada (incluso de **varios operadores** en la misma zona) | Solapar celdas del mismo operador para mantener la cobertura al moverse |
| El terminal debe **distinguir las celdas** que recibe | Cada celda tiene **identificadores** que la reconocen y diferencian |
| Muchos usuarios comparten la estación base | **Técnicas de acceso múltiple y multiplexación** reparten los recursos radio |

### 2.2 Terminología por generación (se repite el patrón *terminal – estación base – controlador*)

| Generación | Terminal | Estación base | Controlador | Acceso al núcleo |
|-----------|----------|---------------|-------------|------------------|
| **2G GSM** | **MS** (*Mobile Station*) | **BTS** (*Base Transceiver Station*) | **BSC** (*Base Station Controller*): controla varias BTS; punto de conexión con la red troncal | BSS = BTS + BSC |
| **3G UMTS** | **UE** (*User Equipment*): sustituye a MS; incluye terminal e identidad del abonado | **Node B** (equivale a la BTS) | **RNC** (*Radio Network Controller*): equivale al BSC pero con **más funciones** de control radio y movilidad | UTRAN = Node B + RNC |
| **4G LTE** | **UE** | **eNodeB**: asume **más funciones de control** | **No hay** (desaparece el RNC) | eNodeB → núcleo directamente |
| **5G** | **UE** | **gNB** (*next generation Node B*): equivale al eNodeB, adaptado a 5G NR | **No hay** (igual que LTE) | gNB → 5G Core |

> **Regla mnemotécnica:** 2G *BTS/BSC* → 3G *Node B/RNC* → 4G *eNodeB* (sin controlador) → 5G *gNB* (sin controlador). Las funciones del controlador se absorben en la estación base: **red de acceso más simple**.

### 2.3 Acceso radio: cómo se reparte el medio entre usuarios

#### GSM (2G): FDMA + TDMA
- **FDMA** (*Frequency Division Multiple Access*): el espectro se divide en **canales de frecuencia** (portadoras) de **200 kHz**, usables por distintos usuarios o celdas.
- **TDMA** (*Time Division Multiple Access*): cada canal se divide en **8 ranuras temporales** (*time slots*, 0–7) asignables a distintos usuarios. Trama GSM ≈ **4,615 ms**; ranura ≈ **577 µs**.
- Usuarios separados por **frecuencia y ranura temporal**.

#### UMTS (3G): WCDMA
- *Wideband Code Division Multiple Access*: **varios usuarios transmiten a la vez y en la misma banda de frecuencia**; cada comunicación usa **un código distinto**.
- Las señales llegan **superpuestas** al receptor; este **conoce el código** de la comunicación que quiere y lo usa para identificarla y separarla de las demás.
- Contraste: GSM separa por frecuencias y ranuras; **WCDMA separa por códigos**.

#### LTE (4G): OFDMA, SC-FDMA y MIMO

| Elemento | Enlace | Idea |
|----------|--------|------|
| **OFDMA** (*Orthogonal Frequency Division Multiple Access*) | **Descendente (downlink)**: eNodeB → UE | El eNodeB transmite a varios usuarios asignando **bloques de recursos distintos en tiempo y frecuencia** |
| **SC-FDMA** (*Single-Carrier FDMA*) | **Ascendente (uplink)**: UE → eNodeB | Varios usuarios transmiten, cada uno con **recursos contiguos en frecuencia**; **reduce la variación de potencia** de la señal del terminal |
| **MIMO** (*Multiple Input Multiple Output*) | Ambos | **Múltiples antenas** en estación base y/o terminal → varios **flujos espaciales** en paralelo → más **capacidad, velocidad y/o robustez** |

*(Ampliación)* La menor variación de potencia (bajo PAPR) del SC-FDMA permite amplificadores más eficientes en el móvil → **ahorra batería**; por eso no se usa OFDMA en el uplink.

#### 5G NR (*New Radio*) (COMPL.)
- **OFDMA con numerología flexible**: separación entre subportadoras de **15, 30 o 60 kHz**; cuanto mayor es la separación, **más corto es el símbolo OFDM** (≈66,7 µs, ≈33,3 µs, ≈16,7 µs respectivamente). 5G NR **adapta** la numerología al servicio.
- **Uso flexible del espectro**:

| Rango | Bandas | Características |
|-------|--------|-----------------|
| **FR1** (*Frequency Range 1*) | Bajas y medias | **Más cobertura** (llega a áreas más amplias), buen compromiso cobertura/capacidad |
| **FR2** (*Frequency Range 2*) | Altas (**mmWave**) | **Más capacidad**, haces más direccionales, pero **alcance más corto** (cubre un área más pequeña) |

- **Beamforming**: en vez de difundir la señal en todas direcciones, **concentra la energía en un haz dirigido** hacia un usuario o dirección.
- **Massive MIMO**: **gran arreglo de antenas** que crea **varios haces/flujos espaciales** y atiende **a varios usuarios simultáneamente** → aumenta capacidad.

---

## 3. Núcleo de la red móvil (2G–5G)

### 3.1 GSM (2G): núcleo de circuitos orientado a voz

Núcleo organizado alrededor de la **MSC**, apoyada en bases de datos y funciones auxiliares:

| Elemento | Función |
|----------|---------|
| **MSC** (*Mobile Switching Centre*) | **Nodo central**: conmutación de llamadas y coordinación de funciones de **movilidad** |
| **HLR** (*Home Location Register*) | Información **permanente** del abonado: identidad, servicios contratados, datos de gestión. **Base de datos principal** del usuario |
| **VLR** (*Visitor Location Register*) | Información **temporal** de los usuarios que están en una zona; ayuda a gestionar la movilidad **sin consultar continuamente el HLR** |
| **AuC** (*Authentication Centre*) | **Autenticación** del abonado; contribuye a la seguridad |
| **EIR** (*Equipment Identity Register*) | Información sobre los **terminales**: autorizados, no autorizados o con restricciones |
| **SMSC** (*Short Message Service Centre*) | Servicio de **SMS**: recibe, almacena y reenvía mensajes |
| **BSS** (BTS + BSC) | Conecta el acceso con el núcleo |

- A través de la MSC, GSM se comunica con la **PSTN** (*Public Switched Telephone Network*, red telefónica pública conmutada) u otras redes.
- Interfaces que aparecen en la figura: **Um** (MS–BTS, radio), **Abis** (BTS–BSC), **A** (BSC–MSC).

> **Memoriza HLR vs VLR:** HLR = "casa" (datos **permanentes**); VLR = "visitante" (datos **temporales** de la zona donde está ahora).

### 3.2 GPRS (2.5G): aparece la conmutación de paquetes

GPRS (*General Packet Radio Service*) **no sustituye** al núcleo GSM: **conviven dos dominios** → circuitos para voz, paquetes para datos.

| Elemento | Función |
|----------|---------|
| **PCU** (*Packet Control Unit*) | Introduce en el acceso el **tratamiento del tráfico de paquetes**; dirige los datos desde la BSC hacia el nuevo dominio GPRS |
| **SGSN** (*Serving GPRS Support Node*) | Atiende al usuario dentro de la red móvil para el tráfico de datos; gestiona **movilidad y transporte** de paquetes |
| **GGSN** (*Gateway GPRS Support Node*) | **Pasarela** entre la red GPRS y las **redes externas de datos** (Internet, redes IP) |

*(Ampliación)* En la figura aparecen las interfaces **Gb**, **Gn** y **Gi**: según el estándar, Gb une el acceso con el SGSN, Gn une SGSN y GGSN, y Gi une el GGSN con las redes externas.

### 3.3 UMTS (3G): dos dominios, CS y PS

```
                    ┌── CS (circuitos, voz):   MSC → GMSC → PSTN / redes de voz
UTRAN (Node B+RNC) ─┤
                    └── PS (paquetes, datos):  SGSN → GGSN → Internet / redes IP
         HLR / AuC (abonados y autenticación) comunes a ambos
```

| Dominio | Elementos | Función |
|---------|-----------|---------|
| **CS** (*Circuit Switched*) | **MSC**: conmutación de llamadas y movilidad. **GMSC** (*Gateway MSC*): **pasarela** hacia la PSTN y otras redes de voz | Voz |
| **PS** (*Packet Switched*) | **SGSN** y **GGSN** (heredados de GPRS) | Datos |

- UMTS mantiene ambos dominios y **adapta la arquitectura a UTRAN**. **El núcleo totalmente de paquetes llega con LTE.**

### 3.4 LTE (4G): Evolved Packet Core (EPC)

LTE **elimina la separación CS/PS**: el **EPC** es un núcleo **íntegramente de conmutación de paquetes** que además **separa claramente plano de control y plano de usuario**.

| Elemento | Plano | Función |
|----------|-------|---------|
| **MME** (*Mobility Management Entity*) | **Control** | Señalización, **movilidad** del usuario y establecimiento de la conectividad. **El tráfico de usuario NO atraviesa el MME** |
| **HSS** (*Home Subscriber Server*) | Datos de abonado | **Base de datos principal** de abonados; el MME la consulta para **identificación, autenticación y autorización** |
| **PCRF** (*Policy and Charging Rules Function*) | Políticas | Define **políticas** de las conexiones: **calidad de servicio y tarificación** |
| **S-GW** (*Serving Gateway*) | **Usuario** | Transporta el tráfico entre el eNodeB y el resto del núcleo; **punto de anclaje** cuando el usuario cambia de eNodeB |
| **P-GW** (*Packet Data Network Gateway*) | **Usuario** | Punto de conexión del EPC con **redes externas de datos** (Internet, redes IP) |

Interfaces de la figura: **LTE-Uu** (UE–eNodeB), **S1-MME** (eNodeB–MME, control), **S1-U** (eNodeB–S-GW, usuario), **S11** (MME–S-GW), **S6a** (MME–HSS), **S5** (S-GW–P-GW), **Gx** (P-GW–PCRF), **SGi** (P-GW–Internet).

> **Qué cambia respecto a 3G:** desaparece el dominio de circuitos; SGSN/GGSN se sustituyen por S-GW/P-GW; aparece el MME para el control; voz y datos viajan como paquetes.

### 3.5 5G: despliegues, servicios y 5G Core

#### NSA vs SA (COMPL.)

| | **NSA** (*Non-Standalone*) | **SA** (*Standalone*) |
|--|---------------------------|-----------------------|
| Acceso | 5G NR **apoyado en LTE** (coordinación con un eNB LTE) | 5G NR (gNB) |
| Núcleo | **EPC** (4G) | **5G Core** |
| Control | **Parte del control depende de LTE** | Acceso 5G + núcleo 5G → **despliegue 5G completo** |

#### Adaptación a distintos servicios: slices y edge (COMPL.)

| Slice | Servicio | Características |
|-------|----------|-----------------|
| **eMBB** (*enhanced Mobile Broadband*) | Banda ancha móvil mejorada | Alta tasa de datos, gran ancho de banda, buena capacidad |
| **URLLC** (*Ultra-Reliable Low-Latency Communications*) | Comunicaciones fiables y de baja latencia | Latencia baja, alta fiabilidad (p. ej. control industrial, vehículos) |
| **mMTC** (*massive Machine-Type Communications*) | IoT masivo | Gran densidad de dispositivos, tráfico esporádico, bajo consumo |

- **Network slicing**: cada slice usa **recursos radio y de red adaptados** a su servicio (recursos OFDMA diferentes para eMBB, URLLC, mMTC).
- **Edge Computing / MEC** (*Multi-access Edge Computing*): parte del **procesamiento se acerca al gNB** (servidores cerca de la estación base) → **menor latencia** y menos carga en la red troncal. Contraste: procesar en la red troncal/nube da más capacidad de cómputo y alcance, pero **mayor latencia**.

#### Funciones del 5G Core

**Separa plano de control y de usuario.** Las funciones son **servicios de red especializados**, no nodos rígidos:

| Grupo | Función | Qué hace |
|-------|---------|----------|
| **Núcleo del control / usuario** | **AMF** (*Access and Mobility Management Function*) | Gestiona el **acceso del UE al núcleo y su movilidad**; participa en el registro y mantiene la conexión |
| | **SMF** (*Session Management Function*) | Gestiona las **sesiones de datos**; decide cómo establecer el camino de datos y **configura la UPF** |
| | **UPF** (*User Plane Function*) | **Plano de usuario**: transporta paquetes entre el **gNB y las redes de datos externas** |
| **Abonados, autenticación, políticas** | **UDM** (*Unified Data Management*) | **Suscripción** y datos del usuario (asume funciones del antiguo HSS) |
| | **AUSF** (*Authentication Server Function*) | **Autenticación**: verifica que el abonado está autorizado |
| | **PCF** (*Policy Control Function*) | **Políticas** de red; adapta el tratamiento según los requisitos del servicio |
| **Arquitectura flexible** | **NRF** (*Network Repository Function*) | **Registro de funciones**: permite descubrir qué funciones hay y qué servicios ofrecen |
| | **NSSF** (*Network Slice Selection Function*) | **Selección de slice** adecuado para un usuario/servicio |
| | **NEF** (*Network Exposure Function*) | **Expone** de forma controlada capacidades de la red a aplicaciones externas |
| | **AF** (*Application Function*) | Función de **aplicación**: informa de las necesidades de un servicio para influir en su tratamiento |

> **Idea:** AMF y SMF **deciden** (control); la UPF **transporta** (usuario). UDM/AUSF/PCF responden a *¿quién es?, ¿puede entrar?, ¿qué políticas aplican?*

#### SBA: arquitectura basada en servicios (COMPL.)

| | Basada en interfaces (punto a punto) | **SBA** (*Service-Based Architecture*) |
|--|---------------------------------------|----------------------------------------|
| Modelo | Cada par de funciones se conecta con una **interfaz específica** (N8, N10, N11, N12…) | Las funciones **ofrecen y consumen servicios** mediante **APIs** sobre una **interfaz basada en servicios (SBI)** común |
| Tecnología | — | **HTTP/2, REST** |
| Ventaja | — | Funciones que se **descubren (NRF)**, ofrecen servicios e interactúan entre sí → **flexibilidad** |

Las interfaces **N2** (gNB–AMF), **N3** (gNB–UPF), **N4** (SMF–UPF) y **N6** (UPF–Internet) conectan acceso, plano de usuario y redes externas (según el estándar, referencias de la figura).

#### NFV y SDN (COMPL.)

| | **NFV** (*Network Functions Virtualization*) | **SDN** (*Software Defined Networking*) |
|--|---------------------------------------------|------------------------------------------|
| Idea | Las funciones de red (AMF, SMF, UPF, PCF…) pasan de **equipos dedicados** a **software sobre infraestructura de cómputo común** | **Control lógicamente centralizado** y **programable** de la red de transporte |
| Clave | Funciones virtualizadas (**VNF/CNF**), compartidas o específicas de un slice | **Separa plano de control** (controlador) **y plano de datos** (reenvío) |
| Uso en 5G | Slices con funciones virtualizadas | Distintos **caminos/políticas** de transporte para distintos slices |

### 3.6 Equivalencias entre generaciones (para no perderse)

| Función | GSM | GPRS / UMTS-PS | LTE | 5G |
|---------|-----|----------------|-----|-----|
| Conmutación de voz / control | MSC | MSC + GMSC (CS) | — (todo paquetes) | — |
| Gestión de paquetes y movilidad de datos | — | SGSN | MME (control) + S-GW (usuario) | AMF (control) + UPF (usuario) |
| Pasarela a redes externas | MSC → PSTN | GGSN | P-GW | UPF |
| Base de datos de abonados | HLR (+VLR) | HLR / AuC | HSS | UDM (+ AUSF) |
| Autenticación | AuC | AuC | HSS (con MME) | AUSF |
| Políticas / QoS / tarificación | — | — | PCRF | PCF |

*(Ampliación)* Equivalencias estándar que el profesor no escribe literalmente en una tabla: MME → AMF (movilidad/señalización) y SMF (sesiones); S-GW/P-GW → UPF. La del HSS → UDM sí aparece en las diapositivas.

---

## 4. Red inteligente

**Problema:** ¿cómo introducir **nuevos servicios** sin modificar la lógica de conmutación de **todas** las centrales?
**Solución:** **separar la lógica del servicio de la conmutación**. Es **complementaria** a la red que transporta y conmuta.

| Elemento | Función |
|----------|---------|
| **SSP** (*Service Switching Point*) | Realiza la **conmutación**; **detecta** cuándo una comunicación requiere tratamiento especial y **consulta al SCP** antes de continuar |
| **SCP** (*Service Control Point*) | Contiene y **ejecuta la lógica del servicio**: recibe la consulta del SSP, aplica reglas y **devuelve una decisión** |
| **SDP** (*Service Data Point*) | **Almacena los datos** que usan los servicios; el SCP lo consulta (usuario, destino, ubicación…) |

```
Usuario ──llamada──► SSP ──consulta (señalización IN)──► SCP ◄──► SDP
                      ▲                                    │
                      └────────── decisión ◄───────────────┘
                      │
                      └──llamada (voz)──► Red de transporte ──► Destino
```

- **Ejemplo del profesor:** marcar un mismo número especial, como el **091**, puede llevar a **destinos distintos según la ubicación del llamante**. Otro ejemplo de la figura: **servicio prepago**.
- **Integración en 2G:** la **MSC actúa también como SSP**; el tráfico de voz sigue el camino normal y la señalización de red inteligente va al SCP/SDP.
- **Ventaja:** servicios **introducidos o modificados de forma centralizada**.

---

## 5. IMS (IP Multimedia Subsystem)

**Motivación:** en 2G/3G la voz se apoyaba en un **dominio de circuitos**; en 4G/5G todo es IP, así que hace falta un sistema que dé **control de voz y servicios multimedia sobre IP**.

- IMS **controla sesiones y servicios**; **no transporta** los paquetes. **Complementa** al acceso y al núcleo (EPC / 5G Core), que dan la conectividad IP.
- Servicios: **voz (VoLTE / VoNR)**, **vídeo (videollamadas)**, **mensajería, presencia**, comunicaciones multimedia.

| Elemento | Función |
|----------|---------|
| **P-CSCF** (*Proxy CSCF*) | **Primer punto de contacto** del usuario con IMS; recibe y reenvía la **señalización SIP** |
| **I-CSCF** (*Interrogating CSCF*) | **Punto de entrada al dominio IMS**; consulta información para decidir **qué S-CSCF** atiende al usuario |
| **S-CSCF** (*Serving CSCF*) | **Función principal de control de sesiones**: procesa SIP y coordina el acceso a los servicios del usuario |
| **AS** (*Application Server*) | **Ejecuta la lógica de los servicios** (voz, mensajería, presencia, multimedia) |
| **HSS** | Información del abonado y servicios. **No es exclusivo de IMS**: en LTE da datos al EPC **y** a IMS. En 5G Core esa gestión evoluciona hacia **UDM** |

### Cómo se combinan red móvil e IMS (3 pasos)

1. **La red móvil da conectividad IP** (LTE: eNodeB + EPC; el tráfico pasa por S-GW y P-GW; en 5G, 5G Core + UPF).
2. **IMS controla la sesión**: sobre esa conectividad IP el usuario intercambia **señalización SIP** con P-CSCF → I-CSCF → S-CSCF (establecer, modificar, finalizar sesiones).
3. **El contenido multimedia va por otro camino**: voz/vídeo se transportan como tráfico IP, típicamente con **RTP**, por el **plano de usuario**, **sin pasar por P/I/S-CSCF**.

> **Señalización (SIP, por IMS) ≠ medios (RTP, por plano de usuario).** Pregunta típica de examen.

---

## 6. Arquitectura de Internet

### 6.1 Internet: una red de redes

- Internet **no pertenece a una única organización**: es el resultado de **interconectar muchas redes IP independientes** (hogar, empresa, campus, servicios).
- Los **routers** permiten que los paquetes pasen de una red a otra hasta llegar a la red de destino.
- **ISP** (*Internet Service Provider*): proveedor que **conecta las redes de sus usuarios con otras redes**, permitiendo alcanzar destinos fuera de la red local.

### 6.2 LAN y WAN

| | **LAN** (*Local Area Network*) | **WAN** (*Wide Area Network*) |
|--|-------------------------------|-------------------------------|
| Ámbito | **Local**: casa, oficina, aula | **Gran escala**: grandes distancias |
| Qué conecta | Dispositivos (PC, portátiles, móviles, impresoras, servidores, punto de acceso Wi-Fi) | **Varias LAN** (oficina, universidad, empresa, centro de datos) mediante enlaces y routers |

### 6.3 Switch vs router (pregunta clásica)

| | **Switch** | **Router** |
|--|-----------|-----------|
| Conecta | Dispositivos **dentro de una misma LAN / subred IP** | **Redes o subredes IP diferentes** |
| Qué maneja | **Tramas** (capa de **enlace**) | **Paquetes IP** (capa de **red**) |
| Función | **Conmuta** tramas en la LAN | **Reenvía/encamina** paquetes entre redes; hacia Internet |

- **Subred IP**: conjunto de dispositivos pertenecientes a una misma red IP.
- Si el destino está **fuera de la red local de origen**, el tráfico **debe pasar por un router**.

### 6.4 De nuestra LAN a Internet (5 tramos)

| # | Tramo | Qué hay |
|---|-------|---------|
| 1 | **Dispositivos en la LAN** | PC, móviles, impresoras…; conectados por cable o Wi-Fi; forman una red local (misma subred) |
| 2 | **Router del usuario** | Conecta la LAN con la red de acceso del operador; da conectividad a todos los dispositivos; puede incluir firewall, Wi-Fi, switch |
| 3 | **Red de acceso** | Último tramo hasta el operador: **xDSL** (línea telefónica de cobre → DSLAM) o **FTTH** (fibra → terminal óptico ONT → terminal de línea óptica OLT) |
| 4 | **Red del operador (ISP)** | **Agrega** el tráfico de muchos usuarios; gestiona el transporte hacia redes mayores |
| 5 | **Internet** | Red de redes: conecta operadores y permite acceder a servicios en cualquier parte |

*(DSLAM = multiplexor de acceso de línea DSL.)*

### 6.5 Firewall y servidor

| | **Firewall** | **Servidor** |
|--|-------------|--------------|
| Función | **Controla y protege** el tráfico de una red: analiza el que entra y sale y aplica **reglas de seguridad** para **permitir o bloquear** comunicaciones | **Proporciona servicios** a otros dispositivos (web, correo, vídeo/streaming, DNS…) |
| Aclaraciones | **No sustituye al router**: el router sigue encargándose del encaminamiento | Los usuarios acceden a sus servicios a través de la red; puede estar en una empresa, un centro de datos o en Internet |

Resumen de equipos: **switch** conecta dispositivos de una LAN (tramas) · **router** conecta redes distintas y reenvía paquetes · **firewall** protege según reglas · **servidor** ofrece servicios.

### 6.6 Cómo se organizan e interconectan los ISP

Estructura **jerárquica en tres niveles**:

| Nivel | Qué son |
|-------|---------|
| **Redes globales (backbones)** | Operadores de gran tamaño con presencia internacional; **interconectan las redes globales** entre sí y llevan el tráfico entre regiones del mundo |
| **Redes regionales o nacionales** | Operadores que cubren un país o región; se conectan entre sí y con los backbones; transportan el tráfico entre los distintos ISP de acceso |
| **ISP de acceso** | Conectan las redes de los **usuarios finales** (hogares, empresas, centros educativos) a Internet; se conectan a un operador regional o nacional |

### 6.7 Tránsito, peering e IXP (COMPL.)

| Concepto | Definición |
|----------|------------|
| **Tránsito** | Una red **contrata (paga) a otra** para que transporte su tráfico y le dé **conectividad hacia otras redes de Internet**; permite alcanzar destinos que la primera no alcanza directamente |
| **Peering** | **Dos redes se conectan directamente** para intercambiar el tráfico destinado a sus respectivas redes; **evita pasar por un proveedor de tránsito** |
| **IXP** (*Internet Exchange Point*) | **Infraestructura común** donde **múltiples redes** se conectan e intercambian tráfico; **facilita el peering** entre ISP y proveedores de contenido |

*(Ampliación)* Regla práctica: el tránsito normalmente implica **pago** por llegar a "todo Internet"; el peering es un acuerdo directo para llegar **solo a las redes del otro**.

### 6.8 El camino completo: de casa a un servidor

```
1 Dispositivo        2 LAN             3 Red de           4 ISP             5 Interconexión      6 Red destino       7 Servidor
  del usuario   ───►    (switch/    ───►  acceso     ───►  (proveedor   ───►  entre redes   ───►  (proveedor del ───► o servicio
  genera la             router            (FTTH/xDSL)        de Internet)       (peering / tránsito   servicio: nube,
  petición              doméstico)                                              / IXP)               empresa…)
```

- La petición atraviesa **varias redes** hasta el servidor; **la ruta de vuelta puede ser distinta** de la de ida.

---

## 7. Convergencia telefonía–Internet

- **Antes:** redes **separadas** y orientadas a voz: telefonía fija (PSTN) y móvil 2G/3G con **centrales/MSC y conmutación de circuitos** (+ red inteligente para servicios de valor añadido).
- **Evolución:** migración hacia **redes de paquetes IP**: GPRS/UMTS (primeros datos por paquetes) → LTE/4G (banda ancha móvil IP) → 5G (más capacidad y servicios avanzados IP).
- **Hoy:** **voz, vídeo, datos y mensajería convergen sobre infraestructuras IP comunes** (4G/5G Core, IMS, Internet, servidores y otras redes IP), aunque siguen existiendo **funciones específicas** de **movilidad, calidad de servicio y control de sesiones**.

---

## 8. Lo que el profesor dice que debe quedar claro

1. **Acceso, troncal y núcleo:** el acceso conecta al usuario con el operador; la troncal/núcleo concentra tráfico y da conmutación, encaminamiento, movilidad e interconexión.
2. **Evolución de las redes móviles:** de voz con circuitos a **todo IP y paquetes**.
   - **Acceso:** GSM: BTS/BSC · UMTS: Node B/RNC · LTE: eNodeB · 5G: gNB.
   - **Núcleo:** GSM/CS: MSC · GPRS/UMTS-PS: SGSN/GGSN · LTE: EPC · 5G: 5G Core.
3. **Control de servicios:** la **Red Inteligente** separa la lógica del servicio de la conmutación; **IMS** da control de sesiones y servicios multimedia sobre IP, complementando al núcleo de 4G y 5G.
4. **Internet, red de redes:** una LAN conecta dispositivos localmente; los **routers** comunican redes distintas; los ISP se interconectan por **tránsito y peering**.

> **Idea global:** telefonía e Internet convergen en una infraestructura común de **paquetes IP** para voz, vídeo y datos.

---

## 9. Cuadro resumen por generación

| | **2G GSM** | **2.5G GPRS** | **3G UMTS** | **4G LTE** | **5G** |
|--|-----------|--------------|------------|-----------|--------|
| **Servicio principal** | Voz y SMS | + datos por paquetes | Datos móviles | **Banda ancha móvil** | Más capacidad, **menor latencia**, muchos dispositivos |
| **Terminal** | MS | MS | UE | UE | UE |
| **Estación base** | BTS | BTS | Node B | eNodeB | gNB |
| **Controlador** | BSC | BSC (+ PCU) | RNC | — | — |
| **Acceso múltiple** | FDMA + TDMA | FDMA + TDMA | **WCDMA** | **OFDMA** (DL) / **SC-FDMA** (UL) + MIMO | OFDMA flexible, FR1/FR2, beamforming, Massive MIMO |
| **Núcleo** | Circuitos: MSC, HLR, VLR, AuC, EIR, SMSC | Circuitos (voz) **+ paquetes** (SGSN, GGSN) | **CS** (MSC, GMSC) **+ PS** (SGSN, GGSN) | **EPC** (todo paquetes): MME, S-GW, P-GW, HSS, PCRF | **5G Core**: AMF, SMF, UPF, UDM, AUSF, PCF… (SBA) |
| **Salida a otras redes** | PSTN (vía MSC) | PSTN + Internet (GGSN) | PSTN (GMSC) + Internet (GGSN) | Internet (P-GW) | Internet (UPF) |
| **Voz** | Circuitos | Circuitos | Circuitos | Paquetes (**IMS**, VoLTE) | Paquetes (**IMS**, VoNR) |

---

## 10. Test de repaso

Tapa la columna derecha y responde.

### Conceptos generales

| Pregunta | Respuesta |
|----------|-----------|
| ¿Diferencia entre red de acceso y red troncal? | Acceso: conecta al usuario con el operador (cobre, fibra, radio). Troncal: interconecta accesos, transporta y gestiona las comunicaciones |
| ¿Qué es la conmutación de circuitos? ¿Y la de paquetes? | Circuitos: reserva recursos durante la comunicación (voz tradicional). Paquetes: infraestructura compartida que transporta voz, datos y otros servicios |
| ¿Hacia dónde evoluciona el núcleo? | De circuitos para voz a paquetes para voz y datos |
| ¿Por qué hay centrales de tránsito? | Para no conectar cada central local con todas las demás; interconectan centrales de distintas zonas |
| Niveles de la jerarquía fija (de abajo a arriba) | Local (abonado) → primaria (sectorial) → secundaria (provincial) → terciaria (nacional) → internacional |

### Acceso móvil

| Pregunta | Respuesta |
|----------|-----------|
| Estaciones base en 2G / 3G / 4G / 5G | BTS / Node B / eNodeB / gNB |
| ¿Qué controlador hay en 2G y en 3G? ¿Y en 4G y 5G? | BSC y RNC. Ninguno: eNodeB y gNB asumen sus funciones |
| ¿Por qué se solapan las celdas? | Mantener cobertura y permitir que el usuario se desplace sin perder el servicio |
| ¿Cómo se reparte el acceso en GSM? | FDMA (canales de 200 kHz) + TDMA (8 ranuras por trama) |
| ¿Y en UMTS? | WCDMA: misma banda y mismo tiempo, separando usuarios por **códigos** |
| ¿Y en LTE? | OFDMA en bajada, SC-FDMA en subida, y MIMO |
| ¿Por qué SC-FDMA en subida? | Recursos contiguos en frecuencia y menor variación de potencia del terminal |
| ¿Qué es la numerología flexible de 5G NR? | Subportadoras de 15/30/60 kHz adaptables al servicio |
| FR1 frente a FR2 | FR1: bandas bajas/medias, más cobertura. FR2: mmWave, más capacidad, menos alcance |
| Beamforming frente a Massive MIMO | Beamforming concentra la energía en un haz hacia un usuario; Massive MIMO usa muchas antenas para varios haces y usuarios a la vez |

### Núcleo móvil

| Pregunta | Respuesta |
|----------|-----------|
| Nodo central del núcleo GSM | MSC |
| HLR frente a VLR | HLR: datos permanentes del abonado. VLR: datos temporales de la zona visitada |
| ¿Para qué sirven AuC, EIR y SMSC? | Autenticar al abonado; registrar/controlar terminales; gestionar SMS |
| ¿Qué aporta GPRS? | Dominio de paquetes (PCU, SGSN, GGSN) conviviendo con el de circuitos GSM |
| SGSN frente a GGSN | SGSN atiende al usuario y su movilidad en datos; GGSN es la pasarela a redes externas |
| ¿Qué dominios tiene el núcleo UMTS? | CS (MSC, GMSC → PSTN) y PS (SGSN, GGSN → Internet) |
| ¿Qué es el GMSC? | Pasarela del dominio de circuitos hacia la PSTN y otras redes de voz |
| Elementos del EPC y su función | MME (control/movilidad), HSS (abonados), PCRF (políticas), S-GW (tráfico y anclaje), P-GW (salida a redes externas) |
| ¿Atraviesa el tráfico de usuario el MME? | No: es plano de control; el tráfico va por S-GW y P-GW |
| ¿Qué cambia entre UMTS y LTE en el núcleo? | Se elimina la separación CS/PS: todo es paquetes |
| NSA frente a SA | NSA: 5G NR apoyado en LTE/EPC. SA: 5G NR + 5G Core, despliegue completo |
| Los tres slices de 5G | eMBB (banda ancha), URLLC (baja latencia y fiabilidad), mMTC (IoT masivo) |
| ¿Qué es el edge computing (MEC)? | Procesamiento cerca del gNB para reducir latencia y carga en el núcleo |
| AMF, SMF y UPF | Acceso/movilidad, sesiones, plano de usuario |
| ¿Qué hacen UDM, AUSF y PCF? | Suscripción (sustituye al HSS), autenticación, políticas |
| ¿Qué hacen NRF, NSSF, NEF y AF? | Registro/descubrimiento de funciones, selección de slice, exposición controlada, función de aplicación |
| ¿Qué es la SBA? | Funciones que ofrecen y consumen servicios vía APIs (HTTP/2, REST) en vez de interfaces punto a punto |
| NFV frente a SDN | NFV: funciones de red como software sobre infraestructura común. SDN: control centralizado y programable, separando control y datos |

### Red inteligente e IMS

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué problema resuelve la red inteligente? | Introducir servicios sin modificar la conmutación de todas las centrales |
| SSP, SCP, SDP | Conmuta y detecta el servicio; ejecuta la lógica; almacena los datos |
| Ejemplo del profesor | El 091: destino distinto según la ubicación del llamante |
| ¿Qué es IMS? | Subsistema de control de sesiones y servicios multimedia sobre IP; no transporta el contenido |
| P-CSCF, I-CSCF, S-CSCF y AS | Primer contacto; entrada al dominio y elige S-CSCF; control principal de sesión; lógica del servicio |
| ¿Protocolo de señalización y de medios en IMS? | SIP y RTP |
| ¿Pasa el vídeo/voz por los CSCF? | No: va por el plano de usuario |
| ¿Es el HSS exclusivo de IMS? | No: también sirve al EPC; en 5G evoluciona hacia UDM |

### Internet

| Pregunta | Respuesta |
|----------|-----------|
| ¿Por qué Internet es una "red de redes"? | Interconecta muchas redes IP independientes mediante routers |
| LAN frente a WAN | LAN: local. WAN: interconecta varias LAN a gran escala |
| Switch frente a router | Switch: tramas dentro de una subred (enlace). Router: paquetes IP entre redes distintas |
| ¿Sustituye el firewall al router? | No: el firewall filtra según reglas; el router encamina |
| Tramos de LAN a Internet | LAN → router del usuario → red de acceso (xDSL/FTTH) → ISP → Internet |
| ¿Qué es FTTH? | Fibra que llega hasta la instalación del abonado |
| Niveles de organización de los ISP | Backbones globales → redes regionales/nacionales → ISP de acceso |
| Tránsito, peering e IXP | Pago por conectividad; intercambio directo de tráfico; infraestructura común que facilita el peering |
| ¿Es el camino de vuelta igual al de ida? | No necesariamente |
| ¿Qué es la convergencia? | Voz, vídeo y datos sobre una infraestructura común de paquetes IP |

### Preguntas de desarrollo típicas

1. **Evolución de las redes móviles de 2G a 5G:** acceso (estación base, controlador, acceso múltiple) y núcleo (circuitos → circuitos+paquetes → todo paquetes → 5G Core con SBA).
2. **Arquitectura del núcleo GSM:** MSC, HLR, VLR, AuC, EIR, SMSC y salida a la PSTN.
3. **De GSM a LTE en el núcleo:** GPRS añade PCU/SGSN/GGSN; UMTS separa CS y PS; LTE unifica en el EPC (MME, S-GW, P-GW, HSS, PCRF).
4. **Qué aporta la red inteligente** y cómo interactúan SSP, SCP y SDP.
5. **Cómo se establece una sesión multimedia con IMS** (conectividad IP → SIP → RTP por otro camino).
6. **Cómo viaja un paquete de casa a un servidor:** LAN, router, acceso, ISP, interconexión, red destino, servidor.

---

*Resumen elaborado a partir de las diapositivas del Tema 2 de Sistemas Telemáticos (Prof. Óscar Adamuz Hinojosa, Dpto. de Teoría de la Señal, Telemática y Comunicaciones, UGR). Las secciones marcadas como (Ampliación) son material de apoyo propio. Material de estudio personal.*
