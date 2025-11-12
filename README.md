# CRUD API - NestJS con PostgreSQL

API REST para gestión de productos desarrollada con NestJS, Prisma ORM y PostgreSQL. Este proyecto está diseñado para ser desplegado en Render.

## Descripción

Esta aplicación proporciona una API completa de CRUD (Create, Read, Update, Delete) para gestionar productos. Incluye:

- **Framework**: NestJS con TypeScript
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Documentación**: Swagger UI
- **Despliegue**: Render

## Estructura del Proyecto

```
crud-api/
├── src/
│   ├── products/          # Módulo de productos
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # Entidades
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── prisma.service.ts  # Servicio de Prisma
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma      # Esquema de base de datos
└── .env                   # Variables de entorno (no incluir en git)
```

## Modelo de Datos

### Product

| Campo     | Tipo     | Descripción                    |
|-----------|----------|--------------------------------|
| id        | Int      | ID autoincrementado (PK)       |
| nombre    | String   | Nombre del producto            |
| costo     | Float    | Costo del producto             |
| precio    | Float    | Precio de venta                |
| stock     | Int      | Cantidad en inventario         |
| status    | Boolean  | Estado (activo/inactivo)       |
| createdAt | DateTime | Fecha de creación              |
| updatedAt | DateTime | Fecha de última actualización  |

## Requisitos Previos

- Node.js (v18 o superior)
- Cuenta en [Render](https://render.com/)
- Cuenta en GitHub

---

## Guía de Despliegue en Render

### Paso 1: Fork del Repositorio

1. Haz clic en el botón **Fork** en la esquina superior derecha de este repositorio
2. Esto creará una copia del proyecto en tu cuenta de GitHub

### Paso 2: Crear Base de Datos PostgreSQL en Render

1. Accede a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en **New +** → **PostgreSQL**
3. Configura la base de datos:
   - **Name**: `crud-api-db` (o el nombre que prefieras)
   - **Database**: `crud_api` (o el nombre que prefieras)
   - **User**: (se genera automáticamente)
   - **Region**: Elige la más cercana a tu ubicación
   - **Plan**: Free (para desarrollo/aprendizaje)
4. Haz clic en **Create Database**
5. **Guarda la siguiente información** que necesitarás más adelante:
   - Internal Database URL
   - External Database URL
   - PSQL Command

### Paso 3: Crear Web Service en Render

1. En el Dashboard de Render, haz clic en **New +** → **Web Service**
2. Conecta tu repositorio de GitHub (el que hiciste fork)
3. Configura el servicio:
   - **Name**: `crud-api` (o el nombre que prefieras)
   - **Region**: La misma que elegiste para la base de datos
   - **Branch**: `main` (o la rama principal de tu repositorio)
   - **Root Directory**: (dejar vacío)
   - **Runtime**: Node
   - **Build Command**:
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm run start:prod
     ```
   - **Plan**: Free

### Paso 4: Configurar Variables de Entorno

En la sección **Environment Variables** del Web Service:

1. Agrega la variable `DATABASE_URL`:
   - **Key**: `DATABASE_URL`
   - **Value**: Pega la **Internal Database URL** que copiaste de tu base de datos PostgreSQL
   - Ejemplo: `postgresql://usuario:password@host.render.com/database_name`

2. Haz clic en **Save Changes**

### Paso 5: Ejecutar Migraciones de Base de Datos




### Paso 6: Verificar el Despliegue

1. Una vez completado el despliegue, Render te proporcionará una URL pública
   - Ejemplo: `https://crud-api-xxxx.onrender.com`

2. Accede a la documentación de Swagger:
   ```
   https://tu-url.onrender.com/api
   ```

3. Prueba los endpoints:
   - **GET** `/products` - Obtener todos los productos
   - **GET** `/products/:id` - Obtener un producto por ID
   - **POST** `/products` - Crear un nuevo producto
   - **PATCH** `/products/:id` - Actualizar un producto
   - **DELETE** `/products/:id` - Eliminar un producto

---

## Desarrollo Local

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/crud-api.git
   cd crud-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db?schema=public"
   ```

4. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

### Ejecutar la Aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000`

La documentación de Swagger estará en `http://localhost:3000/api`

### Comandos Útiles de Prisma

```bash
# Ver la base de datos en el navegador
npx prisma studio

# Crear una nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear la base de datos (CUIDADO: Borra todos los datos)
npx prisma migrate reset
```

---

## Endpoints de la API

### Productos

#### GET `/products`
Obtiene todos los productos

**Respuesta (200)**:
```json
[
  {
    "id": 1,
    "nombre": "Laptop",
    "costo": 500.00,
    "precio": 800.00,
    "stock": 10,
    "status": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET `/products/:id`
Obtiene un producto por ID

**Respuesta (200)**:
```json
{
  "id": 1,
  "nombre": "Laptop",
  "costo": 500.00,
  "precio": 800.00,
  "stock": 10,
  "status": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST `/products`
Crea un nuevo producto

**Body**:
```json
{
  "nombre": "Laptop",
  "costo": 500.00,
  "precio": 800.00,
  "stock": 10
}
```

**Respuesta (201)**:
```json
{
  "id": 1,
  "nombre": "Laptop",
  "costo": 500.00,
  "precio": 800.00,
  "stock": 10,
  "status": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PATCH `/products/:id`
Actualiza un producto existente

**Body** (todos los campos son opcionales):
```json
{
  "nombre": "Laptop Gaming",
  "precio": 850.00,
  "stock": 15
}
```

**Respuesta (200)**: Producto actualizado

#### DELETE `/products/:id`
Elimina (soft delete) un producto

**Respuesta (200)**: Producto eliminado

---

## Solución de Problemas

### Error: "No se puede conectar a la base de datos"

- Verifica que la variable `DATABASE_URL` esté configurada correctamente
- Asegúrate de usar la **Internal Database URL** en Render
- Verifica que la base de datos esté activa en Render

### Error: "Table 'Product' does not exist"

- Ejecuta las migraciones: `npx prisma migrate deploy`
- O desde el shell de Render: `npx prisma migrate deploy`

### El servicio se reinicia constantemente

- Revisa los logs en Render para identificar el error
- Asegúrate de que todas las dependencias estén instaladas
- Verifica que el comando de inicio sea correcto: `npm run start:prod`

### Free tier se duerme después de inactividad

- Los servicios gratuitos de Render se duermen después de 15 minutos de inactividad
- El primer request después de dormir puede tardar ~30 segundos
- Para evitar esto, considera actualizar al plan pagado o usar un servicio de "ping"

---

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Inicia en modo desarrollo con hot-reload

# Producción
npm run build              # Compila el proyecto
npm run start:prod         # Inicia en modo producción

# Testing
npm run test               # Ejecuta tests unitarios
npm run test:e2e           # Ejecuta tests end-to-end
npm run test:cov           # Genera reporte de cobertura

# Linting y formato
npm run lint               # Ejecuta ESLint
npm run format             # Formatea el código con Prettier
```

---

## Tecnologías Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework progresivo de Node.js
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript y Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos relacional
- **[Swagger](https://swagger.io/)** - Documentación de API
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Render](https://render.com/)** - Plataforma de despliegue

---

## Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Guía de despliegue en Render](https://render.com/docs)
- [PostgreSQL en Render](https://render.com/docs/databases)

---

## Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la sección de **Solución de Problemas**
2. Consulta los logs en Render Dashboard
3. Verifica la documentación de las tecnologías utilizadas
4. Contacta al instructor del taller

---

## Licencia

Este proyecto es de uso educativo para el **Taller de Despliegue de Aplicaciones Web**.
