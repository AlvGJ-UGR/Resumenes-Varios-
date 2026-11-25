# Seminario 3: Configuración y análisis de un servicio de mensajería instantánea utilizando XMPP

**Universidad de Granada**

> Guía-esquema completa del seminario. Contiene todo el contenido del guion original, reorganizado, explicado y con ayudas (esquemas, tablas, comprobaciones y errores típicos).
> Las secciones marcadas con 💡 son **explicaciones o aclaraciones añadidas** para entender mejor; todo lo demás procede del guion.

---

## Índice

1. [Introducción y objetivos](#1-introducción-y-objetivos)
2. [Esquema de comunicación XMPP](#2-esquema-de-comunicación-xmpp)
3. [Preparación del entorno en VirtualBox](#3-preparación-del-entorno-en-virtualbox)
4. [Instalación del servidor XMPP (ejabberd)](#4-instalación-del-servidor-xmpp-ejabberd)
5. [Configuración del servidor XMPP](#5-configuración-del-servidor-xmpp)
6. [Acceso por interfaz web](#6-acceso-por-interfaz-web)
7. [Gestión de usuarios](#7-gestión-de-usuarios)
8. [Configuración de clientes con Pidgin](#8-configuración-de-clientes-con-pidgin)
9. [Monitorización de comunicaciones](#9-monitorización-de-comunicaciones)
10. [Servidores en diferentes dominios (s2s)](#10-configuración-de-servidores-en-diferentes-dominios)
11. [Resumen final: flujo de trabajo, comandos y errores típicos](#11-resumen-final)

---

## 1. Introducción y objetivos

**XMPP** = *Extensible Messaging and Presence Protocol*.
Protocolo abierto de mensajería instantánea y presencia, muy usado en aplicaciones de comunicación (similar en funcionalidad a WhatsApp).

### Tareas de la práctica

| Nº | Tarea |
|----|-------|
| 1 | Configurar un servidor XMPP básico |
| 2 | Crear y gestionar usuarios |
| 3 | Analizar comunicaciones entre clientes **del mismo dominio** |
| 4 | Configurar un **segundo servidor** en **otro dominio** y establecer comunicación entre ellos (server-to-server, **s2s**) |
| 5 | Monitorizar mensajes con **Pidgin** (consola XMPP) y **Wireshark** |

---

## 2. Esquema de comunicación XMPP

XMPP funciona en **dos niveles**:

| Nivel | Siglas | Qué es | Puerto típico |
|-------|--------|--------|---------------|
| **Cliente → Servidor** | **c2s** (*client-to-server*) | Cada cliente se conecta a un servidor XMPP para enviar y recibir mensajes | **5222** |
| **Servidor ↔ Servidor** | **s2s** (*server-to-server*) | Los servidores intercambian información cuando los clientes pertenecen a **dominios distintos**. Requiere configurar el **DNS** para resolver la ubicación de los servidores | **5269** |

```
 MISMO DOMINIO (solo c2s)

 [Cliente A] ──c2s──► [ Servidor seminario.ugr.es ] ◄──c2s── [Cliente B]


 DOMINIOS DISTINTOS (c2s + s2s)

 [Cliente A] ──c2s──► [ Servidor seminario.ugr.es ] ══s2s══► [ Servidor empresa.com ] ◄──c2s── [Cliente B]
```

> 💡 **Idea clave:** un cliente *nunca* habla directamente con otro cliente. Siempre pasa por su servidor; y si el destinatario es de otro dominio, su servidor contacta con el servidor de ese dominio (s2s).

---

## 3. Preparación del entorno en VirtualBox

### 3.1 Creación de máquinas virtuales

Se usan **dos máquinas virtuales**, ambas con **IP estática** en la **misma red local**:

| Máquina | Función | IP |
|---------|---------|----|
| Servidor | Servidor XMPP principal | **192.168.1.2** |
| Cliente | Cliente (Pidgin, Wireshark…) | **192.168.1.1** |

> 💡 Para que las dos VM se vean entre sí, deben estar en la misma red virtual de VirtualBox (p. ej. red interna o adaptador sólo-anfitrión). Comprueba con `ping` entre ambas antes de seguir.

---

## 4. Instalación del servidor XMPP (ejabberd)

**ejabberd** se instala en la máquina que hará de **servidor principal**.

### 4.1 Instalación de ejabberd

1. Navega al directorio donde está el instalador (en el seminario, el directorio `Software`).
2. Ejecuta el instalador con privilegios de superusuario:

```bash
sudo ./ejabberd-22.05-2-linux-x64.run
```

3. El instalador crea los directorios necesarios:

| Ruta | Contenido |
|------|-----------|
| `/opt/ejabberd-22.05` | **Ejecutables** |
| `/opt/ejabberd` | **Archivos de configuración y base de datos** |
| `/etc/systemd/system/ejabberd.service` | **Servicio** que lanza ejabberd (unidad de systemd) |

### 4.2 Verificación del estado del servidor

```bash
sudo systemctl status ejabberd.service
```

> 💡 Debe aparecer `active (running)`. Si no, revisa los logs (ver [errores típicos](#11-resumen-final)).

---

## 5. Configuración del servidor XMPP

Archivo principal de configuración (formato **YAML**):

```
/opt/ejabberd/conf/ejabberd.yml
```

> 💡 YAML es **muy sensible a la indentación** (usa espacios, no tabuladores). Un error de sangrado impide que el servidor arranque.

### 5.1 Configuraciones básicas

#### a) Definición del dominio

Modifica la entrada `hosts` para incluir el dominio deseado:

```yaml
hosts:
  - "seminario.ugr.es"
```

#### b) Puertos y protocolos (sección `listen`)

```yaml
listen:
  - port: 5222
    module: ejabberd_c2s
    starttls: true
  - port: 5269
    module: ejabberd_s2s_in
```

| Puerto | Módulo | Uso |
|--------|--------|-----|
| 5222 | `ejabberd_c2s` | Conexiones de **clientes** (c2s) |
| 5269 | `ejabberd_s2s_in` | Conexiones **entrantes de otros servidores** (s2s) |

La opción `starttls: true` establece que el puerto configurado usará el protocolo **STARTTLS** para garantizar la seguridad de las conexiones entre cliente y servidor.

---

#### 5.1.1 ¿Qué es STARTTLS?

Mecanismo que permite **iniciar una conexión no segura y promoverla a una conexión cifrada** mediante **TLS** (*Transport Layer Security*). Asegura que los datos entre cliente y servidor estén:

- **Cifrados:** protege la **confidencialidad** de los datos.
- **Autentificados:** garantiza que los datos provienen de una **fuente confiable**.

```
Cliente                         Servidor
   │── conexión TCP (texto plano) ─►│
   │── "quiero STARTTLS" ──────────►│
   │◄─ "adelante" ─────────────────│
   │═══ negociación TLS ═══════════│
   │═══ todo lo demás CIFRADO ═════│
```

#### 5.1.2 Función de `starttls: true`

Cuando está habilitada:

- **Obliga a los clientes a usar una conexión cifrada.**
- Asegura que las comunicaciones sean **confidenciales**, evitando que un atacante intercepte credenciales o mensajes.
- Incrementa la seguridad al prevenir ataques como:
  - **Eavesdropping** (escucha no autorizada).
  - **Man-in-the-middle** (intermediario malicioso).

> 💡 Matiz técnico: en ejabberd, `starttls: true` *habilita* STARTTLS en ese puerto; para *exigirlo* estrictamente existe además la opción `starttls_required: true`. En la práctica, así lo plantea el guion: *true = cifrado*.

#### 5.1.3 ¿Qué ocurre si `starttls` está en `false`?

Las conexiones en ese puerto **no serán cifradas**. Implica:

1. **Los datos viajan en texto plano:** cualquier atacante con acceso a la red podría interceptar y leer el tráfico, incluidas **credenciales y mensajes**.
2. **Mayor vulnerabilidad a ataques:**
   - Facilita ataques **MITM**, donde un atacante puede interceptar y manipular los datos.
   - Expone información sensible que debería estar protegida.

#### 5.1.4 Cuándo podría ser útil desactivarlo

Aunque **no se recomienda**, puede ser útil en casos específicos:

| Caso | Motivo |
|------|--------|
| **Entornos de prueba o desarrollo** | La seguridad no es prioridad; se simplifica la configuración |
| **Compatibilidad con clientes antiguos** | Algunos clientes XMPP muy antiguos no soportan STARTTLS |
| **Depuración** | Para analizar el tráfico en **Wireshark**, desactivarlo permite ver el contenido sin cifrar |

> 💡 **Relación con la práctica:** en el apartado 9.4 (Wireshark) se necesitará precisamente este caso: desactivar el cifrado para poder leer las estrofas XML.

---

#### c) Listas de Control de Acceso (ACL)

Definen **grupos y permisos**. Ejemplo:

```yaml
acl:
  admin:
    user:
      - "admin@seminario.ugr.es"

access_rules:
  configure:
    allow: admin
```

- Se define el grupo `admin` con el usuario `admin@seminario.ugr.es`.
- La regla `configure` permite el acceso a la administración **sólo** al grupo `admin`.

> 💡 En el guion el bloque aparece con la indentación perdida; en el archivo real debe respetarse el sangrado YAML tal como se muestra aquí. Además, el nombre del usuario debe coincidir exactamente con el registrado (ver [sección 7](#7-gestión-de-usuarios)).

### 5.2 Reiniciar el servidor

Tras **cualquier** cambio en el archivo de configuración hay que reiniciar:

```bash
sudo systemctl restart ejabberd.service
```

---

## 6. Acceso por interfaz web

Panel de administración desde el navegador:

```
http://192.168.1.2:5280/admin
```

(IP del servidor + puerto **5280** + `/admin`).

- Al intentar acceder **pide usuario y contraseña**.
- Por eso **hay que crear usuarios antes** (sección 7), y el usuario administrador debe estar en la ACL (sección 5.1-c).

> 💡 El guion original escribe `192.1682:5280/admin` por errata; la IP correcta del servidor es `192.168.1.2`.
> Al entrar al panel, el usuario se escribe **completo**: `admin@seminario.ugr.es`.

---

## 7. Gestión de usuarios

Se crean y gestionan con la herramienta de línea de comandos **`ejabberdctl`**.

**Registrar un usuario:**

```bash
sudo ./ejabberdctl register usuario dominio password
```

Ejemplos (💡):

```bash
sudo ./ejabberdctl register admin seminario.ugr.es 1234
sudo ./ejabberdctl register user1 seminario.ugr.es 1234
sudo ./ejabberdctl register user2 seminario.ugr.es 1234
```

**Añadir un usuario administrador:**
1. Registrarlo con `ejabberdctl register`.
2. Incluirlo en la lista **ACL** correspondiente (sección 5.1-c).
3. **Reiniciar el servidor** tras los cambios:

```bash
sudo systemctl restart ejabberd.service
```

> 💡 `ejabberdctl` está en el directorio de ejecutables de ejabberd (de ahí el `./`); ejecútalo desde su carpeta `bin` o con ruta completa.

---

## 8. Configuración de clientes con Pidgin

**Pidgin** es el cliente de mensajería gráfico que se usa para conectarse al servidor.

### 8.1 Configuración inicial (en la interfaz gráfica)

1. Seleccionar el protocolo **XMPP**.
2. Introducir **nombre de usuario**, **dominio** y **contraseña**.
3. **Guardar** la configuración.

| Campo en Pidgin | Ejemplo |
|-----------------|---------|
| Protocolo | XMPP |
| Nombre de usuario | `user1` |
| Dominio | `seminario.ugr.es` |
| Contraseña | la usada en `ejabberdctl register` |

### 8.2 Resolutor DNS local

Para que el cliente traduzca el nombre del dominio a la IP del servidor **sin DNS real**, se edita `/etc/hosts`:

```
192.168.1.2   seminario.ugr.es
```

Guardar los cambios y **probar la conectividad con `ping`**:

```bash
ping seminario.ugr.es
```

> 💡 Si el ping no resuelve el nombre, Pidgin tampoco podrá conectar. `/etc/hosts` actúa aquí como "mini-DNS" local.

---

## 9. Monitorización de comunicaciones

Es la parte fundamental para **entender cómo funciona XMPP**. Se usan dos herramientas:

| Herramienta | Qué permite |
|-------------|-------------|
| **Consola XMPP de Pidgin** | Ver las *estrofas* XML enviadas/recibidas por el cliente |
| **Wireshark** | Capturar el tráfico de red en los puertos XMPP |

### 9.1 Consola XMPP en Pidgin

El **plugin XMPP Console** permite observar las **estrofas** (*stanzas*) enviadas y recibidas durante las comunicaciones.
Las estrofas son **bloques estructurados de datos en formato XML** y son la base del intercambio de información en XMPP.

### 9.2 Tipos de estrofas

Existen **tres tipos principales**, cada uno con un propósito:

| Estrofa | Para qué sirve | Analogía |
|---------|----------------|----------|
| `<message>` | Enviar mensajes de texto | Un SMS/WhatsApp |
| `<presence>` | Informar del estado de disponibilidad | "En línea / Ausente" |
| `<iq>` | Consultas/respuestas de información estructurada | Petición HTTP + respuesta |

#### 9.2.1 `message`

Transmite mensajes de texto entre clientes. Es la **base de la mensajería instantánea**.

**Atributos/elementos clave:**

| Atributo | Significado |
|----------|-------------|
| `to` | Dirección del **destinatario** |
| `from` | Dirección del **remitente** |
| `type` | Tipo de mensaje (ver abajo) |
| `body` (elemento hijo) | **Contenido** del mensaje (el texto) |

Valores de `type`:
- `chat`: mensaje directo entre dos usuarios.
- `groupchat`: mensaje dentro de un grupo o sala.
- `error`: indica un error en la comunicación.

**Ejemplo:**

```xml
<message from="user1@seminario.ugr.es" to="user2@seminario.ugr.es" type="chat">
  <body>Hola, ¿cómo estás?</body>
</message>
```

#### 9.2.2 `presence`

Informa del **estado de disponibilidad** de un usuario: disponible, ocupado o desconectado.

**Atributos/elementos comunes:**

| Atributo | Significado |
|----------|-------------|
| `to` | Destinatario |
| `from` | Remitente |
| `type` | Opcional. Valor: `unavailable` → el usuario está **desconectado** |
| `show` (hijo) | Estado del usuario |
| `status` (hijo) | Mensaje adicional de estado (opcional) |

Valores de `show`:
- `away`: ausente.
- `dnd`: no molestar (*do not disturb*).
- `chat`: disponible para chatear.

**Ejemplo:**

```xml
<presence from="user1@seminario.ugr.es" to="user2@seminario.ugr.es">
  <show>away</show>
  <status>Volveré pronto</status>
</presence>
```

#### 9.2.3 `iq` (*Information Query*)

Para **realizar consultas o intercambiar información estructurada**. Es similar a una **solicitud HTTP y su respuesta**.

**Atributos clave:**

| Atributo | Significado |
|----------|-------------|
| `type` | Naturaleza de la consulta (ver abajo) |
| `id` | **Identificador único** para asociar solicitud ↔ respuesta |
| `to` y `from` | Destinatario y remitente |

Valores de `type`:
- `get`: **solicita** información.
- `set`: **envía datos** al servidor.
- `result`: respuesta **exitosa** a una consulta.
- `error`: respuesta **con error**.

**Ejemplo: consultar la lista de contactos (roster)**

*Petición del cliente:*

```xml
<iq from="user1@seminario.ugr.es" to="seminario.ugr.es" type="get" id="12345">
  <query xmlns="jabber:iq:roster"/>
</iq>
```

*Respuesta del servidor:*

```xml
<iq from="seminario.ugr.es" to="user1@seminario.ugr.es" type="result" id="12345">
  <query xmlns="jabber:iq:roster">
    <item jid="user2@seminario.ugr.es" name="Amigo 1"/>
  </query>
</iq>
```

> 💡 Fíjate en que el `id="12345"` es **el mismo** en la petición y en la respuesta: así se emparejan. Además, `from`/`to` se **invierten** en la respuesta.

### 9.3 Atributos comunes en las estrofas

Comunes a **cualquier** tipo de estrofa:

| Atributo | Función |
|----------|---------|
| `to` | Identifica al **destinatario** |
| `from` | Identifica al **remitente** |
| `id` | **Identificador único** para rastrear estrofas específicas |
| `type` | Define el **propósito o categoría** de la estrofa |
| `lang` | (Opcional) Idioma del contenido |

### Tabla comparativa de los tres tipos

| | `message` | `presence` | `iq` |
|-|-----------|------------|------|
| Propósito | Texto | Disponibilidad | Consulta/respuesta |
| `type` posibles | `chat`, `groupchat`, `error` | (opcional) `unavailable` | `get`, `set`, `result`, `error` |
| Hijos típicos | `body` | `show`, `status` | `query` |
| `id` imprescindible | No | No | **Sí** (empareja respuesta) |

### 9.4 Wireshark

- Captura las comunicaciones en los puertos específicos:
  - **5222** → c2s (cliente-servidor)
  - **5269** → s2s (servidor-servidor)
- **Configura los servidores para comunicaciones no cifradas** (`starttls: false`, ver 5.1.4) si necesitas analizar el contenido de los mensajes.

> 💡 Filtros útiles de Wireshark (orientativos):
> - `tcp.port == 5222` → tráfico cliente-servidor
> - `tcp.port == 5269` → tráfico entre servidores
> - `xmpp` → sólo paquetes XMPP dissectados
>
> Con STARTTLS activo verás el inicio en claro y luego datos cifrados ilegibles; sin él, las estrofas `<message>`, `<presence>` e `<iq>` son legibles directamente.

---

## 10. Configuración de servidores en diferentes dominios

Objetivo: comunicación **s2s** entre dos dominios.

**Pasos:**

1. Configurar un **segundo servidor XMPP** con el dominio **`empresa.com`**.
2. Añadir las **entradas necesarias** al archivo `/etc/hosts` (para que cada servidor/cliente resuelva el dominio del otro).
3. **Registrar usuarios** en el nuevo servidor con `ejabberdctl`.
4. **Verificar las comunicaciones entre dominios** con **Pidgin** y **Wireshark**.

```
 seminario.ugr.es (192.168.1.2)  ◄═══ s2s (5269) ═══►  empresa.com (IP del 2º servidor)
         ▲                                                      ▲
     c2s (5222)                                             c2s (5222)
         │                                                      │
   user1@seminario.ugr.es                              user1@empresa.com
```

> 💡 **Ejemplo orientativo de `/etc/hosts`** (la IP del segundo servidor no viene en el guion; usa la que tengas asignada):
> ```
> 192.168.1.2   seminario.ugr.es
> 192.168.1.3   empresa.com
> ```
> Debe estar en **ambos** servidores (y en los clientes que lo necesiten), porque el s2s necesita que cada servidor resuelva el nombre del otro.
>
> Para el segundo servidor se repiten los pasos 4–7: instalar ejabberd, poner `hosts: - "empresa.com"` en su `ejabberd.yml`, reiniciar y registrar usuarios con el dominio `empresa.com`.

**Qué observar en Wireshark:** el tráfico del **puerto 5269** entre los dos servidores al enviar un mensaje de `user1@seminario.ugr.es` a un usuario de `empresa.com`.

---

## 11. Resumen final

### Flujo completo de trabajo

```
1. Crear 2 VM (servidor 192.168.1.2, cliente 192.168.1.1)
2. Instalar ejabberd en el servidor
3. Comprobar:  systemctl status ejabberd.service
4. Editar /opt/ejabberd/conf/ejabberd.yml  (hosts, listen, acl, access_rules)
5. Reiniciar:  systemctl restart ejabberd.service
6. Crear usuarios:  ejabberdctl register usuario dominio password
7. Acceso web admin:  http://192.168.1.2:5280/admin
8. Cliente: /etc/hosts  +  Pidgin (XMPP, usuario, dominio, contraseña)
9. Monitorizar: consola XMPP de Pidgin + Wireshark (5222 / 5269)
10. Segundo servidor (empresa.com) + hosts + usuarios → probar s2s
```

### Chuleta de comandos

| Acción | Comando |
|--------|---------|
| Instalar | `sudo ./ejabberd-22.05-2-linux-x64.run` |
| Estado | `sudo systemctl status ejabberd.service` |
| Reiniciar | `sudo systemctl restart ejabberd.service` |
| Registrar usuario | `sudo ./ejabberdctl register usuario dominio password` |
| Probar resolución | `ping seminario.ugr.es` |

### Archivos y rutas clave

| Ruta | Para qué |
|------|----------|
| `/opt/ejabberd/conf/ejabberd.yml` | Configuración principal |
| `/opt/ejabberd-22.05` | Ejecutables |
| `/opt/ejabberd` | Configuración y base de datos |
| `/etc/systemd/system/ejabberd.service` | Servicio systemd |
| `/etc/hosts` | Resolución local de dominios |

### Puertos

| Puerto | Uso |
|--------|-----|
| 5222 | c2s (clientes) |
| 5269 | s2s (servidores) |
| 5280 | Interfaz web de administración |

### 💡 Errores típicos y cómo detectarlos

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| El servicio no arranca tras editar la config | Error de sangrado YAML | Revisar espacios/indentación del `ejabberd.yml` |
| Pidgin no conecta | Dominio no resuelto o servidor caído | `ping` al dominio; revisar `/etc/hosts` y `systemctl status` |
| No puedo entrar en `/admin` | Usuario no registrado o no en la ACL | Registrar con `ejabberdctl` + añadir a ACL + reiniciar |
| Cambios que "no hacen efecto" | Falta reiniciar el servidor | `sudo systemctl restart ejabberd.service` |
| Wireshark muestra datos ilegibles | STARTTLS activo (cifrado) | Poner `starttls: false` solo para depurar y reiniciar |
| No hay comunicación entre dominios | Falta de entradas en `/etc/hosts` o puerto 5269 sin configurar | Añadir hosts en ambos servidores; comprobar `ejabberd_s2s_in` en `listen` |
| Login incorrecto en panel web | Se puso solo `admin` en vez de `admin@dominio` | Usar el JID completo |

### Conceptos para repasar (autoevaluación)

- ¿Diferencia entre **c2s** y **s2s**? ¿Qué puertos usa cada uno?
- ¿Qué hace **STARTTLS** y qué riesgos aparecen si se desactiva?
- ¿Cuándo es legítimo desactivarlo? (pruebas, clientes antiguos, depuración)
- Los **tres tipos de estrofa** y un ejemplo de cada uno.
- ¿Para qué sirve el atributo **`id`** en un `iq`?
- ¿Por qué hace falta `/etc/hosts` (o DNS) para el s2s?
- ¿Qué se debe hacer siempre después de modificar `ejabberd.yml` o la ACL?
