# Guía Completa Resuelta: Práctica 2 — Servicio de Directorio (LDAP)

**Asignatura:** Sistemas Telemáticos (2º Grado en Ingeniería de Tecnologías de Telecomunicación)  
**Universidad:** Universidad de Granada (UGR)  
**Herramientas:** `slapd`, `ldap-utils`, `JXplorer`, `Wireshark`

---

## 1. Fundamentos Teóricos

El modelo **Cliente/Servidor** se fundamenta en un proceso servidor que escucha peticiones en un puerto TCP específico (en LDAP, el puerto por defecto es el **389**).

```
                      ┌─────────────────────────────────┐
                      │          Servidor LDAP          │
                      │       (slapd - Puerto 389)      │
                      └────────────────┬────────────────┘
                                       │
                      Arbol de Directorio (DIT)
                                       │
                                     c=es
                                       │
                                     o=ugr
                               ┌───────┴───────┐
                          cn=Rector       ou=Profesores
                                          ┌────┼────┐
                                     Gabriel Rafael Pablo
```

### 1.1 Fases del Protocolo LDAP
1. **Conexión TCP:** Apertura del socket hacia el puerto 389.
2. **Autenticación (*Bind*):** Verificación de credenciales mediante *Simple Bind* (usuario/contraseña en texto plano) o autenticación anónima.
3. **Operación:** Ejecución de peticiones (`Search`, `Add`, `Modify`, `Delete`).
4. **Desconexión (*Unbind*):** Cierre de la sesión de protocolo.

### 1.2 Formato LDIF y Jerarquía
Las entradas del directorio se representan en archivos de texto con sintaxis `atributo: valor`.
* **DN (*Distinguished Name*):** Identificador único y absoluto en el árbol. Se lee de izquierda a derecha (desde el nodo hoja hacia la raíz).
  
  $$\text{DN: } \text{cn=Paco,dc=nombre\_PC,dc=aula34,dc=ugr,dc=es}$$

* **ObjectClasses:** Definen el esquema de la entrada. Determinan qué atributos son obligatorios (`MUST`) y cuáles opcionales (`MAY`).
  * `person`: Requiere `cn` (Common Name) y `sn` (Surname).
  * `organizationalRole`: Requiere `cn`.
  * `dcObject` / `organization`: Utilizados para nodos contenedores y organizativos.

---

## 2. Desarrollo Paso a Paso Resuelto

> **Nota sobre el entorno:** En este tutorial asumimos el uso de `pc_alumno` como `<nombre_PC>`. Sustitúyelo por el identificador asignado en tu puesto.

---

### Tarea 0. Instalación del Servidor y Cliente

Si trabajas en máquina virtual, instala los paquetes del servidor OpenLDAP (`slapd`) y los clientes CLI (`ldap-utils`).

```bash
# 1. Actualizar repositorios
sudo apt update

# 2. Instalar el daemon de LDAP y las herramientas de usuario
sudo apt install -y slapd ldap-utils
```
*Si solicita contraseña durante la instalación en la máquina virtual, usa `admin1`.*

---

### Tarea 1. Inicio y Verificación del Servidor

El servidor debe estar activo antes de lanzar peticiones desde el cliente.

```bash
# Comprobar el estado del servicio slapd
sudo systemctl status slapd.service

# Si se encuentra detenido, iniciarlo con:
sudo systemctl start slapd.service

# Verificar que escucha activamente en el puerto TCP 389
sudo ss -tlnp | grep 389
```

#### Verificación inicial con cliente `ldapsearch`:
```bash
ldapsearch -x
```
* **Explicación del comando:** `-x` indica uso de autenticación simple.
* **Resultado esperado:** Retorna `result: 32 No such object` (indica que el servidor está activo y respondiendo, aunque aún no hay una base de datos configurada).

---

### Tarea 2. Cese del Servidor y Comprobación de Error

```bash
# Detener el servicio LDAP
sudo systemctl stop slapd.service

# Intentar realizar una búsqueda
ldapsearch -x
```

* **Salida obtenida:**
  ```text
  ldap_sasl_bind (SIMPLE): Can't contact LDAP server (-1)
  ```
* **Explicación:** El cliente no encuentra ningún socket escuchando en el puerto 389 local.

*Volver a iniciar el servicio para continuar con las tareas:*
```bash
sudo systemctl start slapd.service
```

---

### Tarea 3. Configuración Interactiva del Servicio (`slapd`)

Reconfiguramos el paquete `slapd` para definir la raíz del árbol jerárquico (*Base DN*).

```bash
sudo dpkg-reconfigure slapd
```

#### Respuestas exactas para el asistente interactivo:
1. **¿Omitir la configuración de OpenLDAP?** $\rightarrow$ **No**
2. **Nombre del dominio DNS:** `aula34.ugr.es` *(esto establece la Base DN como `dc=aula34,dc=ugr,dc=es`)*
3. **Nombre de la organización:** `aula34.ugr.es`
4. **Tipo de base de datos:** `MDB`
5. **Contraseña del administrador (`cn=admin`):** `admin1` *(o `finisterre` si estás en el laboratorio)*
6. **Confirmar contraseña:** Repetir la clave elegida.
7. **¿Borrar la base de datos cuando se purgue slapd?** $\rightarrow$ **No**
8. **¿Mover la base de datos antigua?** $\rightarrow$ **Sí**

#### Verificación del nodo raíz creado:
```bash
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es"
```

---

### Tarea 4. Inserción de Nodos mediante Fichero LDIF (`ldapadd`)

> **Regla de Orden Jerárquico:** Un nodo hijo nunca se puede crear bajo un nodo padre que no exista previamente.

#### 1. Crear el archivo `ejemplo.ldif`:
Crea un fichero llamado `ejemplo.ldif` usando `nano ejemplo.ldif` o `gedit ejemplo.ldif`:

```ldif
dn: dc=pc_alumno,dc=aula34,dc=ugr,dc=es
objectClass: dcObject
objectClass: organization
dc: pc_alumno
o: Servicios Telematicos S. L.
description: Empresa de Telecomunicaciones

dn: cn=alumno1,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
objectClass: organizationalRole
cn: alumno1
description: Director

dn: cn=alumno2,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
objectClass: person
cn: alumno2
sn: apellido
description: Tecnico
```

#### 2. Ejecutar la inserción en la base de datos:
```bash
ldapadd -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemplo.ldif
```

* **Desglose de opciones:**
  * `-x`: Autenticación simple.
  * `-D <DN>`: Binding DN. Usuario con permisos de escritura (`cn=admin,...`).
  * `-W`: Solicita la contraseña por pantalla de forma interactiva.
  * `-f <fichero>`: Fichero de entrada en formato LDIF.

---

### Tarea 5. Consultas a la Base de Datos (`ldapsearch`)

La estructura básica del comando de búsqueda es:
$$\text{ldapsearch -x -b "<Base DN>" "(<Filtro>)" <Atributos>}$$

#### Consulta de ejemplo general:
```bash
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(dc=aula34)" dn cn
```

#### Ejercicios de búsqueda propuestos:

* **Ejercicio A:** *Encontrar los nodos con un nombre específico (`cn=alumno1`) y mostrar solo su atributo `objectClass`.*
  ```bash
  ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=alumno1)" objectClass
  ```

* **Ejercicio B:** *Encontrar los nodos que tienen el atributo `cn` (con cualquier valor) y mostrar todos sus atributos.*
  ```bash
  ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=*)"
  ```

---

### Tarea 6. Modificación y Eliminación de Datos (`ldapmodify`)

#### 1. Fichero de modificación guiado (`ejemploModify.ldif`):
Crea el archivo `ejemploModify.ldif` con el siguiente contenido:

```ldif
dn: dc=pc_alumno,dc=aula34,dc=ugr,dc=es
changetype: modify
replace: o
o: Donuts S. L.
-
replace: description
description: Empresa de Donuts

dn: cn=Paco,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
changetype: add
objectClass: person
cn: Paco
sn: paquito
description: Secretario

dn: cn=alumno2,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
changetype: delete
```

#### 2. Aplicar los cambios con `ldapmodify`:
```bash
ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemploModify.ldif
```

---

### Ejercicios Autónomos Resueltos (Tarea 6 Aislada)

Se requiere redactar un nuevo archivo de modificación (`ejercicio_autonomo.ldif`) que realice las siguientes acciones de forma combinada:
1. Añadir un nuevo usuario.
2. Añadir un campo de teléfono (`telephoneNumber`) a un empleado.
3. Establecer una contraseña (`userPassword`) al secretario Paco.
4. Cambiar la descripción de uno de los integrantes.
5. Eliminar el campo `description` del usuario Paco.

#### Fichero `ejercicio_autonomo.ldif`:
```ldif
# 1. Añadir un nuevo usuario (Maria)
dn: cn=Maria,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
changetype: add
objectClass: person
cn: Maria
sn: Garcia
description: Administradora

# 2, 3 y 5. Operaciones sobre Paco (Añadir teléfono, contraseña y eliminar descripción)
dn: cn=Paco,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
changetype: modify
add: telephoneNumber
telephoneNumber: 958123456
-
add: userPassword
userPassword: secretPacoPass
-
delete: description

# 4. Cambiar la descripción de alumno1 (Director)
dn: cn=alumno1,dc=pc_alumno,dc=aula34,dc=ugr,dc=es
changetype: modify
replace: description
description: Director General Ejecutivo
```

#### Aplicar y verificar las modificaciones autónomas:
```bash
# Aplicar los cambios
ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejercicio_autonomo.ldif

# Búsqueda para verificar los cambios en Paco
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=Paco)"

# Búsqueda para verificar la inserción de Maria
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(cn=Maria)"
```

---

### Tarea 7. Administración Gráfica con JXplorer

1. **Instalar JXplorer:**
   ```bash
   sudo apt update
   sudo apt install -y jxplorer
   ```

2. **Lanzar la aplicación:**
   ```bash
   jxplorer
   ```

3. **Parámetros de Conexión (File $\rightarrow$ Connect):**
   * **Host:** `localhost`
   * **Port:** `389`
   * **Protocol:** `LDAP v3`
   * **Base DN:** `dc=aula34,dc=ugr,dc=es`
   * **Security Level:** `User + Password`
   * **User DN:** `cn=admin,dc=aula34,dc=ugr,dc=es`
   * **Password:** `admin1` (o `finisterre`)

*Desde la interfaz gráfica puedes navegar visualmente por las ramas `es` $\rightarrow$ `ugr` $\rightarrow$ `aula34` $\rightarrow$ `pc_alumno`, añadir atributos o modificar campos directamente en la tabla.*

---

### Tarea 8. Monitorización del Tráfico con Wireshark

1. **Lanzar Wireshark con privilegios:**
   ```bash
   sudo wireshark &
   ```

2. **Configuración de Captura:**
   * Selecciona la interfaz de red **Loopback (`lo`)** (dado que cliente y servidor residen en la misma máquina).
   * Pulsa en **Start Capture**.
   * Aplica el filtro de visualización en la barra superior: `ldap`.

3. **Secuencia de Paquetes Observada en el Análisis:**

```
   Cliente (Puerto Efímero)                         Servidor (Puerto 389)
      │                                                     │
      │ ───────── 1. bindRequest(Simple) ─────────────────> │
      │ <──────── 2. bindResponse(success) ─────────────── │ (Autenticación)
      │                                                     │
      │ ───────── 3. searchRequest / addRequest ─────────> │
      │ <──────── 4. searchResEntry / addResponse ──────── │ (Operación)
      │                                                     │
      │ ───────── 5. unbindRequest ───────────────────────> │ (Cierre)
```

#### Discusión sobre Seguridad:
Al analizar el paquete `bindRequest` dentro del árbol de Wireshark:
* Expandir: `Lightweight Directory Access Protocol` $\rightarrow$ `Simple Bind`.
* **Hallazgo:** La clave enviada en el parámetro `simple` se transmite íntegramente en **texto plano** (código ASCII sin cifrar).
* **Implicación:** Cualquier atacante situado en el mismo segmento de red mediante un *sniffer* o un ataque *Man-in-the-Middle* puede interceptar las credenciales del administrador. Para solventar este fallo de seguridad, en producción se debe exigir el uso de **LDAPS (puerto 636)** o iniciar una sesión **STARTTLS**.

---

## 3. Hoja de Referencia Rápida (Cheat Sheet)

| Operación | Comando / Sintaxis |
| :--- | :--- |
| **Iniciar Servidor** | `sudo systemctl start slapd.service` |
| **Comprobar Puerto 389** | `sudo ss -tlnp \| grep 389` |
| **Reconfigurar Dominio**| `sudo dpkg-reconfigure slapd` |
| **Añadir Nodos (LDIF)** | `ldapadd -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f archivo.ldif` |
| **Modificar / Borrar** | `ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f cambio.ldif` |
| **Buscar Todo** | `ldapsearch -x -b "dc=aula34,dc=ugr,dc=es"` |
