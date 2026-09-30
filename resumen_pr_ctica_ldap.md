# Práctica 2: Aplicación Cliente/Servidor — Servicio de Directorio (LDAP)

## 1. Fundamentos Teóricos: El Servicio de Directorio

Un **servicio de directorio** es una base de datos optimizada para lecturas, consultas y búsquedas jerárquicas de información sobre usuarios, dispositivos, permisos u otros recursos de red. Sigue el modelo **Cliente/Servidor**.

```
                       ┌─────────────────────────┐
                       │      Servidor LDAP      │
                       │   (slapd en puerto 389) │
                       └────────────┬────────────┘
                                    │
                         Base de Datos Jerárquica
                                    │
                                  c=es
                                    │
                                  o=ugr
                             ┌──────┴──────┐
                        cn=Rector     ou=Profesores
                                      ┌────┼────┐
                                 Gabriel Rafael Pablo

```

### 1.1 Protocolo LDAP (Lightweight Directory Access Protocol)

* **Puerto Estándar:** `389` (sin cifrar / STARTTLS) y `636` (LDAPS).

* **Flujo de Trabajo Típico:**

  1. **Conexión:** El cliente abre un socket TCP con el servidor (puerto 389).

  2. **Autenticación (*Bind*):** Validación mediante DN y contraseña (o conexión anónima).

  3. **Operaciones (*Search / Add / Modify / Delete*):** Transmisión de consultas e instrucciones.

  4. **Desconexión (*Unbind*):** Cierre explícito de la sesión.

### 1.2 Jerarquía y Nomenclatura del Árbol de Directorio (DIT)

El **DIT** (*Directory Information Tree*) organiza los datos en forma de árbol. Cada entrada tiene un identificador único global denominado **DN** (*Distinguished Name*), formado por la unión concisa de sus nombres relativos (**RDN**) desde el nodo hoja hasta la raíz (se lee de izquierda a derecha).

#### Atributos Estándar Frecuentes:

| Atributo | Significado | Ejemplo | 
 | ----- | ----- | ----- | 
| `c` | *Country* (País) | `c=es` | 
| `o` | *Organization* (Organización) | `o=ugr` | 
| `ou` | *Organizational Unit* (Unidad Organizativa) | `ou=Profesores` | 
| `dc` | *Domain Component* (Componente de Dominio) | `dc=aula34`, `dc=ugr` | 
| `cn` | *Common Name* (Nombre Común) | `cn=Rector`, `cn=alumno1` | 
| `sn` | *Surname* (Apellidos) | `sn=Pérez` | 

**Ejemplo de DN Completo:** 

$$
\text{dn: cn=Rector, o=ugr, c=es}
$$

### 1.3 Formato LDIF (LDAP Data Interchange Format)

Es un formato de texto plano estandarizado (*atributo: valor*) utilizado para la representación, importación, exportación y modificación de entradas en una base de datos LDAP.

#### Ejemplo de Entrada LDIF:

```
dn: cn=Rector,o=ugr,c=es
cn: Rector
objectClass: organizationalRole
objectClass: top
userPassword: {SSHA}Xxxxxxxxxx...

```

## 2. Desarrollo Práctico Guía Paso a Paso

### Tarea 0: Instalación del Servidor y Cliente LDAP

Instalación del daemon LDAP (`slapd`) y el kit de herramientas de línea de comandos (`ldap-utils`).

```
# 1. Actualizar el índice de paquetes
sudo apt update

# 2. Instalar el servicio slapd y los clientes LDAP
sudo apt install -y slapd ldap-utils

```

### Tarea 1: Comprobación del Estado del Servidor

Comprobar el daemon del servicio, verificar los puertos en escucha y probar la conectividad básica.

```
# Comprobar el estado del servicio LDAP
sudo systemctl status slapd.service

# En caso de estar detenido, iniciar el servicio:
sudo systemctl start slapd.service

# Verificar que escucha en el puerto 389
sudo ss -tlnp | grep 389

# Probar la conectividad haciendo una búsqueda anónima básica
ldapsearch -x

```

> **Atención a errores:**
>
> Si el servidor está apagado o inalcanzable, obtendrás el error:
>
> `ldap_sasl_bind (SIMPLE): Can't contact LDAP server (-1)`

### Tarea 2: Cese del Servicio LDAP

Detención del servicio para mantenimiento o pruebas de desconexión.

```
# Detener el servidor LDAP
sudo systemctl stop slapd.service

```

### Tarea 3: Configuración de la Base de Datos

Configuración inicial mediante reconfiguración del paquete interactivo `dpkg-reconfigure`.

```
# Reconfigurar el servidor slapd (Establecer Dominio, Organización y Contraseña Admin)
sudo dpkg-reconfigure slapd

# Comprobar la entrada base recién creada en la raíz (ejemplo dc=aula34,dc=ugr,dc=es)
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es"

```

### Tarea 4: Inserción de Datos (Añadir Nodos)

> **Regla de oro de la jerarquía:**
>
> **No** se puede insertar un nodo hijo debajo de un nodo padre que no existe previamente. El orden dentro del fichero LDIF es estricto.

#### 1. Creación del Fichero de Datos (`ejemplo.ldif`):

```
dn: dc=nombre_PC,dc=aula34,dc=ugr,dc=es
objectClass: dcObject
objectClass: organization
dc: nombre_PC
o: Servicios Telemáticos S. L.
description: Empresa de Telecomunicaciones

dn: cn=alumno1,dc=nombre_PC,dc=aula34,dc=ugr,dc=es
objectClass: organizationalRole
cn: alumno1
description: Director

dn: cn=alumno2,dc=nombre_PC,dc=aula34,dc=ugr,dc=es
objectClass: person
cn: alumno2
sn: apellido
description: Técnico

```

#### 2. Comando para Importar los Datos:

```
ldapadd -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemplo.ldif

```

#### Explicación de Opciones de Comando:

* `-x`: Emplea **Autenticación Simple** (usuario/contraseña sin SASL).

* `-D <DN>`: Binding DN. Usuario administrador con privilegios de escritura.

* `-W`: Solicita la contraseña por terminal de forma segura.

* `-f <fichero.ldif>`: Ruta del fichero LDIF con las instrucciones.

### Tarea 5: Consultas y Búsquedas Avanzadas (`ldapsearch`)

Permite filtrar las búsquedas en la base de datos LDAP usando expresiones lógicas.

```
ldapsearch -x -b "dc=aula34,dc=ugr,dc=es" "(dc=nombre_PC)" dn cn

```

#### Desglose del Comando:

* `-b "dc=aula34,dc=ugr,dc=es"`: **Base DN** o punto de partida de la búsqueda en el árbol.

* `"(dc=nombre_PC)"`: **Filtro de búsqueda** (expresión lógica de selección).

* `dn cn`: **Atributos solicitados** a devolver. Si se especifica `+`, se muestran los atributos operacionales internos del sistema.

### Tarea 6: Modificación y Eliminación de Datos

Las modificaciones de la estructura o de atributos se definen en un archivo LDIF que utiliza la directiva `changetype`.

#### 1. Fichero de Modificaciones (`ejemploModify.ldif`):

```
dn: dc=nombre_PC,dc=aula34,dc=ugr,dc=es
changetype: modify
replace: o
o: Donuts S. L.
-
replace: description
description: Empresa de Donuts

dn: cn=Paco,dc=nombre_PC,dc=aula34,dc=ugr,dc=es
changetype: add
objectClass: person
cn: Paco
sn: paquito
description: Secretario

dn: cn=alumno2,dc=nombre_PC,dc=aula34,dc=ugr,dc=es
changetype: delete

```

> **Nota importante:** En operaciones compuestas dentro del mismo `changetype: modify`, los cambios deben estar separados por un guion `-` en una línea independiente.

#### 2. Comando para Aplicar Cambios:

```
ldapmodify -x -D "cn=admin,dc=aula34,dc=ugr,dc=es" -W -f ejemploModify.ldif

```

### Tarea 7: Administración Gráfica con JXplorer

Herramienta GUI orientada a la inspección navegable del DIT.

```
# Instalar el cliente gráfico JXplorer
sudo apt install -y jxplorer

# Ejecución desde la terminal
jxpl

```