# solicitud-credito

Aplicación web de **solicitud y gestión de créditos** construida con Next.js 16, React 19 y MongoDB Atlas. Permite a usuarios finales enviar solicitudes de crédito a través de un formulario multi-paso y a empleados administrar dichas solicitudes desde un panel protegido.

---
## Usuarios

vista de aplicaciones:

usuario: admin
contraseña: admin

---

## Tabla de contenidos

1. [Stack tecnológico](#stack-tecnológico)
2. [Instrucciones de ejecución](#instrucciones-de-ejecución)
3. [Variables de entorno](#variables-de-entorno)
4. [Arquitectura](#arquitectura)
5. [Supuestos del negocio](#supuestos-del-negocio)
6. [Decisiones de arquitectura](#decisiones-de-arquitectura)
7. [Limitaciones conocidas](#limitaciones-conocidas)
8. [Contratos API](#contratos-api)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui, Radix UI |
| Animaciones | Framer Motion |
| Estado global | Redux Toolkit + redux-persist |
| Tabla de datos | TanStack Table v8 |
| Base de datos | MongoDB Atlas (driver nativo v7) |
| Autenticación | Token JWT casero (HMAC-SHA256) via `node:crypto` |
| Contraseñas | bcryptjs |
| Parsing CSV | PapaParse |
| Exportación | xlsx |
| Iconos | HugeIcons, Lucide React |
| Lenguaje | TypeScript 5 |

---

## Instrucciones de ejecución

### Requisitos previos

- Node.js ≥ 18
- npm ≥ 9
- Acceso a un cluster de MongoDB Atlas (o instancia local)

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd solicitud-credito

# Instalar dependencias
npm install
```

### Configurar variables de entorno

Crear el archivo `.env.local` en la raíz del proyecto (ver sección [Variables de entorno](#variables-de-entorno)).

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Validación de tipos y build de producción

```bash
# Solo verificación de tipos
npm run type-check

# Build completo con verificación estricta
npm run build:strict

# Servir build de producción
npm start
```

### Lint

```bash
npm run lint
```

---

## Variables de entorno

Crear el archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Cadena de conexión a MongoDB Atlas (o instancia local)
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<dbname>?...
#Cadena de conexión db utilizada en el proyecto:
#mongodb://adminclu5t3r:TPls8ouwm5xSATFt@ac-clhbiy2-shard-00-00.aypirrz.mongodb.net:27017,ac-clhbiy2-shard-00-01.aypirrz.mongodb.net:27017,ac-clhbiy2-shard-00-02.aypirrz.mongodb.net:27017/?ssl=true&replicaSet=atlas-531u32-shard-0&authSource=admin&appName=solicitud-credito-db-cluster

# Secreto para firmar los tokens de autenticación
# Si no se define, usa el valor por defecto "impulsa-tecnica-auth" (solo para desarrollo)
AUTH_TOKEN_SECRET=<cadena-secreta-segura>
```

> **⚠️ Importante**: El archivo `.env.local` **nunca** debe commitearse. Está incluido en `.gitignore`.

### Colecciones MongoDB esperadas

La base de datos usada por defecto es `next-mongodb`. Debe contener:

| Colección | Descripción |
|---|---|
| `solicitudes_credito` | Solicitudes de crédito enviadas |
| `solicitudes_abandonadas` | Formularios abandonados con feedback |
| `usuarios` | Empleados con acceso al panel admin |
| `logs_update` | Auditoría de actualizaciones por empleado |

#### Estructura mínima de un usuario (`usuarios`)

```json
{
  "username": "admin",
  "password": "<hash bcrypt>",
  "permissions": 1,
  "id_user": 1
}
```

> `permissions >= 1` es requerido para acceder a los endpoints protegidos.

---

## Arquitectura

El proyecto sigue una **arquitectura en cuatro capas** dentro de `src/`:

```
src/
├── app/              # Capa de enrutamiento (Next.js App Router)
│   ├── api/          # Route Handlers (API REST)
│   └── view/         # Páginas renderizadas (landing, formulario, admin, consulta)
│
├── core/             # Capa de dominio compartido (agnóstica de framework)
│   ├── domain/
│   │   ├── types/    # Tipos TypeScript del dominio
│   │   └── mappers/  # Transformaciones entre capas
│   └── validations/  # Validadores de negocio reutilizables
│
├── backend/          # Lógica server-side exclusiva
│   ├── infrastructure/ # Conexión a MongoDB (singleton)
│   ├── repository/     # Acceso a datos por colección
│   └── services/       # Lógica de negocio server (auth, scoring)
│
├── frontend/         # Lógica client-side exclusiva
│   ├── components/   # Componentes React reutilizables
│   ├── store/        # Redux slices, thunks y hooks
│   ├── services/     # Llamadas fetch a la API interna
│   ├── hooks/        # Custom hooks
│   ├── providers/    # Context providers
│   ├── constants/    # Configuración del simulador de crédito
│   └── utils/        # Utilidades de UI y sesión cliente
│
└── lib/              # Utilidades transversales (tryCatchWrapper, formatCurrency, etc.)
```

### Flujo de datos

```
Cliente (React) → frontend/services → /api/* (Route Handlers)
                                          ↓
                                  backend/services
                                          ↓
                                  backend/repository
                                          ↓
                                  MongoDB Atlas
```

---

## Supuestos del negocio

1. **Aprobación automática por scoring**: Al crear una solicitud, el sistema calcula automáticamente si es `APROBADO` o `RECHAZADO` basándose en la relación entre `cuotaAprox / (ingresos - egresos)`. El resultado incluye un factor estocástico (`Math.random()`).

2. **Scoring de aprobación**:
   | Ratio cuota/capacidad | Probabilidad de aprobación |
   |---|---|
   | ≤ 5% | 97% |
   | ≤ 15% | 90% |
   | ≤ 25% | 85% |
   | ≤ 35% | 70% |
   | > 35% | 40% |
   | Capacidad ≤ 0 | 10% |

3. **Tasa anual fija**: La tasa de interés utilizada en el simulador de cuotas es `17% anual` (hardcodeada en `creditConfig.ts`).

4. **Plazos disponibles**:
   - **Mensuales**: 3, 6, 9 meses
   - **Anuales**: 1, 3, 5 años

5. **Formulario multi-paso**: El flujo de solicitud está dividido en pasos secuenciales. Si el usuario abandona, puede registrar un feedback (rating + mensaje + snapshot del formulario).

6. **Consulta pública por identificación**: Cualquier usuario puede consultar el estado de sus solicitudes con solo su número de identificación, sin autenticación.

7. **Empleados autenticados**: El panel de administración y los endpoints de gestión requieren un token válido con `permissions >= 1`.

8. **Auditoría de cambios**: Cada actualización de una solicitud por un empleado queda registrada en `logs_update` con el ID del usuario, campos modificados y timestamp.

---

## Decisiones de arquitectura

### 1. Separación estricta `backend/` vs `frontend/`
Se optó por una separación física de carpetas para evitar que código server-side (conexiones a BD, secretos) sea accidentalmente importado en bundles del cliente. Next.js no impone esta barrera por defecto.

### 2. Token JWT casero (sin librería)
Se implementó un sistema de tokens HMAC-SHA256 usando la API nativa `node:crypto` en lugar de `jsonwebtoken` u otras librerías, para reducir dependencias externas y tener control total sobre el formato del token.

### 3. `tryCatchWrapper` centralizado
Todos los repositorios usan un wrapper `tryCatchWrapper` para estandarizar el manejo de errores y reducir código boilerplate de `try/catch`.

### 4. `clientPromise` singleton para MongoDB
La conexión a MongoDB se implementa como un singleton global en desarrollo (`global._mongoClientPromise`) para evitar múltiples conexiones durante el hot-reload de Next.js.

### 5. Redux con persistencia
El estado de autenticación y el progreso del formulario se persisten en `localStorage` vía `redux-persist`, permitiendo que el usuario retome su solicitud si recarga la página.

### 6. Optimistic UI con rollback
El panel de administración implementa actualizaciones optimistas: la UI se actualiza inmediatamente y hace rollback si el servidor responde con error.

### 7. Whitelist de campos en `update`
El repositorio de aplicaciones filtra los campos permitidos en las actualizaciones (`allowedFields`), evitando que el cliente pueda modificar campos críticos como `createdAt` o `_id`.

---

## Limitaciones conocidas

| # | Descripción |
|---|---|
| 1 | **Simulación de error en PATCH**: El endpoint `PATCH /api/applications/[id]` introduce un `Math.random() < 0.5` que fuerza un error 500 el 50% de las veces. Esto es código de testing y **no debe llegar a producción**. |
| 2 | **Scoring estocástico**: La aprobación de solicitudes tiene un componente aleatorio. No es un modelo determinista. |
| 3 | **Sin refresh de token**: Los tokens expiran en 8 horas sin renovación automática. La sesión expira silenciosamente. |
| 4 | **Sin paginación en `findAll`**: El repositorio carga **todas** las solicitudes en memoria. No escala para volúmenes grandes. |
| 5 | **Tasa de interés hardcodeada**: El `17% anual` no es configurable sin modificar el código fuente. |
| 6 | **Sin validación server-side completa en POST**: El endpoint `POST /api/applications` solo valida que `ingresos`, `egresos` y `cuotaAprox` no sean `null`. No usa el validador del dominio (`application.validator.ts`). |
| 7 | **`bcrypt.hash("admin", 10)` en login**: Hay una línea de debug en el route handler de login que genera un hash en cada petición y lo imprime en consola. Debe eliminarse. |
| 8 | **Sin HTTPS forzado**: No hay configuración de redirección HTTP→HTTPS en `next.config.ts`. |
| 9 | **GET `/api/abandon` sin autenticación**: El endpoint para listar abandonos no requiere token de empleado. |
| 10 | **Credenciales en `.env.local`**: El `.env.local` contiene la cadena de conexión real a Atlas. Debe rotarse si fue expuesto. |

---

## Contratos API

Ver sección [Contratos API](#contratos-api-detallados) más abajo, o el documento independiente `API_CONTRACTS.md`.

---

# Contratos API Detallados

Base URL (desarrollo): `http://localhost:3000`

Todos los endpoints viven bajo el prefijo `/api/`.

### Autenticación

Los endpoints protegidos requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene en `POST /api/auth/login`. Expira en **8 horas**.

---

## `POST /api/auth/login`

Autentica a un empleado y devuelve un token de sesión.

**Auth requerida**: ❌ No

**Request body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Respuesta 200 OK**:
```json
{
  "token": "string",
  "user": {
    "username": "string",
    "permissions": 1,
    "id_user": 1
  }
}
```

**Errores**:
| Status | Mensaje |
|---|---|
| 400 | `"Usuario y contrasena son requeridos"` |
| 401 | `"Credenciales invalidas"` |
| 500 | `"Error iniciando sesion"` |

---

## `POST /api/applications`

Crea una nueva solicitud de crédito. El sistema calcula automáticamente el estado (`APROBADO`/`RECHAZADO`).

**Auth requerida**: ❌ No

**Request body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (10 dígitos)",
  "identificationType": "string (opcional)",
  "identification": "string (numérico, mínimo 5 chars)",
  "monto": "number (500000 - 999999999)",
  "plazo": "0 | 1 | 3 | 5 | 6 | 9",
  "cuotaAprox": "number",
  "occupation": "string",
  "ingresos": "number",
  "egresos": "number",
  "yearly": "boolean"
}
```

**Respuesta 201 Created**:
```json
{
  "id": "string (ObjectId)",
  "name": "string",
  "email": "string",
  "phone": "string",
  "identificationType": "string",
  "identification": "string",
  "monto": "number",
  "plazo": "number",
  "cuotaAprox": "number",
  "occupation": "string",
  "ingresos": "number",
  "egresos": "number",
  "yearly": "boolean",
  "status": "APROBADO | RECHAZADO",
  "createdAt": "string (ISO 8601)"
}
```

**Errores**:
| Status | Mensaje |
|---|---|
| 400 | `"Datos incompletos"` (si ingresos/egresos/cuotaAprox son null) |
| 500 | `"Error creando solicitud"` |

---

## `GET /api/applications`

Lista todas las solicitudes de crédito.

**Auth requerida**: ✅ Sí (`permissions >= 1`)

**Respuesta 200 OK**: `Application[]`
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "identificationType": "string",
    "identification": "string",
    "monto": "number",
    "plazo": "number",
    "cuotaAprox": "number",
    "occupation": "string",
    "ingresos": "number",
    "egresos": "number",
    "yearly": "boolean",
    "status": "PENDIENTE | APROBADO | RECHAZADO",
    "createdAt": "string (ISO 8601)"
  }
]
```

**Errores**:
| Status | Mensaje |
|---|---|
| 401 | `"Token requerido"` / `"Token invalido o expirado"` |
| 403 | `"No tienes permisos para acceder a este recurso"` |
| 500 | `"Error obteniendo solicitudes"` |

---

## `GET /api/applications/[id]`

Obtiene una solicitud por su ID de MongoDB.

**Auth requerida**: ✅ Sí (`permissions >= 1`)

**Path params**: `id` — ObjectId de MongoDB

**Respuesta 200 OK**: `Application` (misma estructura que en la lista)

**Errores**:
| Status | Mensaje |
|---|---|
| 400 | `"ID requerido"` |
| 401 | `"Token requerido"` / `"Token invalido o expirado"` |
| 403 | `"No tienes permisos..."` |
| 404 | `"Solicitud no encontrada"` |
| 500 | `"Error obteniendo solicitud"` |

---

## `PATCH /api/applications/[id]`

Actualiza campos de una solicitud. Registra un log de auditoría. Campos permitidos: `name`, `email`, `phone`, `identification`, `occupation`, `ingresos`, `egresos`, `monto`, `cuotaAprox`, `status`.

**Auth requerida**: ✅ Sí (`permissions >= 1`)

**Path params**: `id` — ObjectId de MongoDB

**Request body** (todos los campos son opcionales):
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "identification": "string",
  "occupation": "string",
  "ingresos": "number",
  "egresos": "number",
  "monto": "number",
  "cuotaAprox": "number",
  "status": "PENDIENTE | APROBADO | RECHAZADO"
}
```

**Respuesta 200 OK**:
```json
{
  "id": "string",
  "<campos actualizados>": "..."
}
```

> ⚠️ **Nota**: Este endpoint introduce un error 500 simulado con probabilidad 50% para testing de rollback en el frontend. Debe eliminarse en producción.

**Errores**:
| Status | Mensaje |
|---|---|
| 401 | `"Token requerido"` / `"Token invalido o expirado"` |
| 403 | `"No tienes permisos..."` |
| 500 | `"Error actualizando solicitud"` |

---

## `DELETE /api/applications/[id]`

Elimina una solicitud permanentemente.

**Auth requerida**: ✅ Sí (`permissions >= 1`)

**Path params**: `id` — ObjectId de MongoDB

**Respuesta 200 OK**:
```json
{ "success": true }
```

**Errores**:
| Status | Mensaje |
|---|---|
| 401 | `"Token requerido"` / `"Token invalido o expirado"` |
| 403 | `"No tienes permisos..."` |
| 500 | `"Error eliminando solicitud"` |

---

## `GET /api/applications/consult/[identification]`

Consulta pública de solicitudes por número de identificación del solicitante.

**Auth requerida**: ❌ No

**Path params**: `identification` — Número de identificación del cliente

**Respuesta 200 OK**: `Application[]` (array, puede ser vacío)

**Errores**:
| Status | Mensaje |
|---|---|
| 500 | `"Error obteniendo solicitudes"` |

---

## `POST /api/abandon`

Registra una solicitud abandonada junto con el feedback del usuario.

**Auth requerida**: ❌ No

**Request body**:
```json
{
  "rating": "string",
  "message": "string",
  "stepAbandon": "number (opcional)",
  "formSnapshot": {
    "name": "string (opcional)",
    "email": "string (opcional)",
    "phone": "string (opcional)",
    "monto": "number (opcional)",
    "...": "Partial<FormItems>"
  }
}
```

**Respuesta 201 Created**:
```json
{
  "id": "string (ObjectId)",
  "rating": "string",
  "message": "string",
  "stepAbandon": "number",
  "formSnapshot": {},
  "createdAt": "string (ISO 8601)"
}
```

**Errores**:
| Status | Mensaje |
|---|---|
| 500 | `"Error creando solicitud"` |

---

## `GET /api/abandon`

Lista todos los registros de formularios abandonados.

**Auth requerida**: ❌ No *(limitación conocida — debería requerir autenticación)*

**Respuesta 200 OK**: `AbandonApplication[]`
```json
[
  {
    "id": "string",
    "rating": "string",
    "message": "string",
    "stepAbandon": "number",
    "formSnapshot": {},
    "createdAt": "string (ISO 8601)"
  }
]
```

**Errores**:
| Status | Mensaje |
|---|---|
| 500 | `"Error obteniendo solicitudes"` |

---

## Resumen de endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Login de empleado |
| POST | `/api/applications` | ❌ | Crear solicitud de crédito |
| GET | `/api/applications` | ✅ | Listar todas las solicitudes |
| GET | `/api/applications/[id]` | ✅ | Obtener solicitud por ID |
| PATCH | `/api/applications/[id]` | ✅ | Actualizar solicitud |
| DELETE | `/api/applications/[id]` | ✅ | Eliminar solicitud |
| GET | `/api/applications/consult/[identification]` | ❌ | Consulta pública por identificación |
| POST | `/api/abandon` | ❌ | Registrar abandono de formulario |
| GET | `/api/abandon` | ❌ | Listar abandonos *(sin protección — ver limitaciones)* |
