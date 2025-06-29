# Web Cuentas Bancarias

## 📋 Descripción

Este es un proyecto para la gestión de cuentas bancarias donde se tiene la capacidad de:

- Consultar el saldo de una cuenta
- Visualizar transacciones recientes
- Realizar transferencias de dinero entre cuentas

## ✨ Características Principales

### 🔧 Tecnologías Core

- **React 18** con TypeScript
- **Vite** como build tool (más rápido que CRA)
- **TailwindCSS** para estilos
- **React Router DOM** para navegación con lazy loading
- **Context API** para manejo de estado (siguiendo SOLID)
- **Axios** con interceptors para APIs

### 🔐 Autenticación y Seguridad

- Sistema de autenticación con JWT
- Encriptación de tokens con CryptoJS
- Rutas protegidas por roles
- Hook de inactividad configurable
- Logout automático por inactividad

### 📁 Arquitectura Escalable

- Sistema de rutas organizadas por módulos (SOLID)
- Lazy loading de componentes
- Estructura de carpetas escalable
- Servicios API centralizados
- Hooks personalizados reutilizables

### 🛠️ Herramientas de Desarrollo

- **ESLint** con configuración Airbnb
- **Prettier** para formateo de código
- **Husky** para git hooks
- **Commitlint** para mensajes de commit
- **Lint-staged** para linting automático

### 🐳 DevOps y Deploy

- **Docker** con nginx para producción
- **CI/CD** con Azure Pipelines y GitLab
- Scripts de deploy automatizados
- Configuración de variables de entorno

## 🚀 Inicio Rápido

### 1. Clonar e Instalar

```bash
git clone <https o ssh link>
cd web-cuentas-bancarias
npm install
```

> **💡 Importante**: Este proyecto usa `package-lock.json` para garantizar versiones exactas de dependencias en todos los entornos. **Nunca elimines este archivo del repositorio**.
>
> **Para CI/CD**: Usa `npm ci` (más rápido y seguro en pipelines de deploy)

### 2. Configurar Entorno (Automático) ⚡

```bash
# Configurar para desarrollo
./setup_env.sh DEV
```

> **✅ Script ya configurado**: El script ya tiene permisos de ejecución y está listo para usar

### 3. Iniciar Desarrollo

```bash
npm run dev
# o también funciona:
npm start
```

¡Listo! La aplicación estará disponible en `http://localhost:3000`

---

## 📋 Configuración Detallada

### 1. Variables de Entorno

#### Opción A: Configuración Automática (Recomendada) 🚀

Usa el script automatizado para configurar el entorno:

```bash
# Para desarrollo
./setup_env.sh DEV

# Para QA/Testing
./setup_env.sh QA

# Para producción
./setup_env.sh PROD
```

**¿Qué hace el script?**

1. **Genera un archivo `.env`** en la raíz del proyecto
2. **Configura todas las variables** necesarias para el entorno seleccionado
3. **Vite automáticamente** lee estas variables con prefijo `VITE_*`
4. **Tu aplicación** accede a ellas través de `src/config/env.ts`

**Características del script:**

- ✅ Configuración automática por entorno
- ✅ Variables organizadas por categorías
- ✅ Compatibilidad con Docker
- ✅ Backup automático de configuraciones anteriores
- ✅ Validación de variables requeridas

**Entornos disponibles:**

- **DEV**: Desarrollo local (API local, logs habilitados, timeouts largos)
- **QA**: Testing y validación (API de testing, logs mínimos)
- **PROD**: Producción optimizada (API productiva, sin logs, timeouts estrictos)

#### Opción B: Configuración Manual

Si prefieres configurar manualmente, crea un archivo `.env` con estas variables:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000

# JWT Configuration
VITE_JWT_SECRET=your-jwt-secret-key
VITE_JWT_EXPIRES_IN=24h

# Feature Flags
VITE_ENABLE_INACTIVITY_TIMER=true
VITE_DEFAULT_INACTIVITY_TIME=300000

# Environment
VITE_ENVIRONMENT=development

# Docker & Build
TAG_IMAGE=web-cuentas-app:latest
NODE_ENV=development
PORT=3000
```

### 2. Desarrollo Manual (Si no usas el script)

```bash
npm run dev
```

### 3. Build para Producción

```bash
npm run build
```

## 🔧 Sistema de Variables de Entorno

### **Flujo Completo** 🔄

1. **Script genera .env**

   ```bash
   ./setup_env.sh DEV
   # ↓ Crea archivo .env con variables VITE_*
   ```

2. **Vite lee las variables**

   ```bash
   # .env (generado automáticamente)
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_JWT_SECRET=your-secret-key
   ```

3. **Aplicación usa las variables**

   ```typescript
   // src/config/env.ts
   export const config = {
     api: {
       baseUrl: import.meta.env.VITE_API_BASE_URL, // ← Del archivo .env
     },
   };
   ```

4. **Componentes acceden a la configuración**

   ```typescript
   // En cualquier componente
   import { config } from "../config/env";

   console.log(config.api.baseUrl); // ← Valor del .env
   ```

### **¿Necesito crear .env manualmente?** ❓

**No, el script lo hace por ti.** Pero si quieres:

```bash
# Crear .env manualmente (alternativa al script)
touch .env
echo "VITE_API_BASE_URL=http://localhost:3001/api" >> .env
echo "VITE_JWT_SECRET=your-secret-key" >> .env
# ... más variables
```

### **Variables Disponibles** 📋

| Variable                       | Descripción               | Ejemplo                     |
| ------------------------------ | ------------------------- | --------------------------- |
| `VITE_API_BASE_URL`            | URL base de la API        | `http://localhost:3001/api` |
| `VITE_API_TIMEOUT`             | Timeout de requests       | `10000`                     |
| `VITE_JWT_SECRET`              | Clave secreta JWT         | `your-secret-key`           |
| `VITE_JWT_EXPIRES_IN`          | Expiración JWT            | `24h`                       |
| `VITE_ENABLE_INACTIVITY_TIMER` | Activar timer inactividad | `true`                      |
| `VITE_DEFAULT_INACTIVITY_TIME` | Tiempo por defecto (ms)   | `300000`                    |
| `VITE_ENVIRONMENT`             | Entorno actual            | `development`               |

> **🎯 Resumen**: El sistema funciona así:
>
> 1. **Ejecutas**: `./setup_env.sh DEV`
> 2. **Se crea**: `.env` con variables `VITE_*`
> 3. **Vite las lee**: automáticamente cuando ejecutas `npm run dev`
> 4. **Tu app las usa**: a través de `import.meta.env.VITE_*` en `src/config/env.ts`
>
> **No necesitas crear `.env` manualmente**, el script lo hace por ti.

## 📱 Uso de la Aplicación

### Login

- Usa cualquier email y contraseña para la demo
- Automáticamente se generará un JWT mock
- Redirección automática al dashboard

### Dashboard

- Área protegida que requiere autenticación
- Logout manual o automático por inactividad
- Interfaz moderna con TailwindCSS

## 📁 Estructura del Proyecto

```
src/
├── routes/                    # 🎯 Sistema de rutas escalable (SOLID)
│   ├── types/
│   │   └── route.types.ts     # Definiciones de tipos para rutas
│   ├── routeConfigs/          # Configuraciones por módulo
│   │   ├── authRoutes.ts      # Rutas de autenticación
│   │   ├── dashboardRoutes.ts # Rutas del dashboard
│   │   ├── bankingRoutes.ts   # Rutas bancarias
│   │   └── errorRoutes.ts     # Rutas de error
│   └── allRoutes.ts           # Consolidador de todas las rutas
├── components/                # 🧩 Componentes reutilizables
│   ├── common/                # Componentes base (Button, Input, etc.)
│   ├── layout/                # Layout y navegación
│   │   └── Navigation.tsx     # Navegación dinámica
│   ├── forms/                 # Formularios
│   │   └── LoginForm.tsx      # Formulario de login
│   ├── routing/               # Componentes de enrutamiento
│   │   ├── ProtectedRoute.tsx # Rutas protegidas
│   │   ├── RouteRenderer.tsx  # Renderizador escalable de rutas
│   │   └── InactivityWrapper.tsx # Wrapper de inactividad
│   └── __tests__/             # Tests de componentes
├── contexts/                  # 📡 Context API providers
│   ├── AuthContext.tsx        # Context de autenticación
│   ├── BaseContext.tsx        # Context base reutilizable
│   └── index.ts               # Exportaciones centralizadas
├── hooks/                     # 🪝 Custom hooks
│   ├── useAsync.ts            # Hook para operaciones asíncronas
│   ├── useInactivityTimer.ts  # Hook de timer de inactividad
│   ├── usePageInactivity.ts   # Hook de inactividad por página
│   ├── useDocumentTitle.ts    # Hook para títulos de página
│   ├── useRoutes.ts           # Hook para rutas dinámicas
│   └── index.ts               # Exportaciones centralizadas
├── pages/                     # 📄 Páginas organizadas por módulos
│   ├── Auth/                  # Módulo de autenticación
│   │   ├── ForgotPassword/    # Recuperar contraseña
│   │   └── ResetPassword/     # Restablecer contraseña
│   ├── Dashboard/             # Panel principal
│   │   └── Dashboard.tsx      # Página principal del dashboard
│   ├── Banking/               # Módulo bancario
│   │   ├── Accounts/          # Gestión de cuentas
│   │   ├── Transactions/      # Historial de transacciones
│   │   ├── Transfer/          # Transferencias
│   │   └── Reports/           # Reportes financieros
│   ├── Profile/               # Perfil de usuario
│   ├── Settings/              # Configuración de la app
│   ├── Errors/                # Páginas de error
│   │   ├── NotFound/          # Error 404
│   │   ├── Unauthorized/      # Error 401
│   │   └── ServerError/       # Error 500
│   └── __tests__/             # Tests de páginas
├── services/                  # 🔌 Servicios de API y lógica de negocio
│   ├── api/
│   │   └── axiosConfig.ts     # Configuración de Axios con interceptors
│   ├── authService.ts         # Servicios de autenticación
│   ├── bankService.ts         # Servicios bancarios (con mocks)
│   ├── __tests__/             # Tests de servicios
│   └── index.ts               # Exportaciones centralizadas
├── types/                     # 📋 Definiciones de tipos TypeScript
│   ├── api.types.ts           # Tipos para APIs
│   ├── auth.types.ts          # Tipos de autenticación
│   └── index.ts               # Exportaciones centralizadas
├── utils/                     # 🛠️ Utilidades y helpers
│   ├── apiHelpers.ts          # Helpers para manejo de APIs
│   ├── encryption.ts          # Utilidades de encriptación
│   ├── jwt.ts                 # Manejo de JWT con encriptación
│   ├── test-utils.tsx         # Utilidades para testing
│   ├── navigation.ts          # Utilidades de navegación
│   └── index.ts               # Exportaciones centralizadas
├── config/                    # ⚙️ Configuraciones
│   ├── env.ts                 # Variables de entorno tipadas
│   └── constants.ts           # Constantes de la aplicación
├── assets/                    # 🎨 Recursos estáticos
│   ├── images/                # Imágenes
│   └── icons/                 # Iconos
└── styles/                    # 💄 Estilos globales
    ├── globals.css            # Estilos globales con TailwindCSS
    └── components.css         # Estilos de componentes específicos

# Archivos de configuración en la raíz del proyecto
├── .env.example               # Ejemplo de variables de entorno
├── .eslintrc.json            # Configuración de ESLint
├── .prettierrc               # Configuración de Prettier
├── .gitignore                # Archivos ignorados por Git
├── commitlint.config.js      # Configuración de Commitlint
├── tailwind.config.js        # Configuración de TailwindCSS
├── tsconfig.json             # Configuración de TypeScript
└── SETUP_GUIDE.md            # Guía completa de configuración
```

### 🎯 Características de la Arquitectura

#### **Principios SOLID Aplicados:**

- **S (Single Responsibility)**: Cada archivo tiene una responsabilidad específica
- **O (Open/Closed)**: Fácil extensión sin modificar código existente
- **L (Liskov Substitution)**: Componentes intercambiables
- **I (Interface Segregation)**: Interfaces específicas y focused
- **D (Dependency Inversion)**: Dependencias de abstracciones, no implementaciones

#### **Escalabilidad:**

- **Rutas modulares**: Agregar nuevas funcionalidades sin tocar App.tsx
- **Lazy Loading**: Carga diferida de componentes para mejor performance
- **Navegación dinámica**: Menús que se construyen automáticamente
- **Testing estructurado**: Tests organizados por funcionalidad

#### **Seguridad:**

- **JWT encriptado**: Tokens seguros con AES encryption
- **Rutas protegidas**: Control de acceso granular por roles
- **Inactividad configurable**: Timeouts específicos por página crítica
- **Interceptors**: Manejo centralizado de autenticación en APIs

## 🔒 Gestión de Dependencias

### ¿Por qué se incluye `package-lock.json`?

Este archivo es **CRÍTICO** para el proyecto y garantiza:

#### ✅ **Builds Reproducibles**

- Todos los desarrolladores instalan las **mismas versiones exactas**
- CI/CD usa las **mismas dependencias** que desarrollo
- Eliminación del problema _"funciona en mi máquina"_

#### ⚡ **Performance**

```bash
# Desarrollo inicial
npm install    # Resuelve dependencias

# CI/CD y producción
npm ci         # 2-3x más rápido, no modifica package-lock.json
```

#### 🛡️ **Seguridad**

- **Hashes de integridad** verifican que los paquetes no fueron alterados
- **Versiones fijadas** previenen ataques de supply chain
- **Auditorías consistentes** con `npm audit`

#### 🎯 **Comandos Recomendados**

```bash
# ✅ DESARROLLO
npm install              # Actualiza package-lock.json si es necesario

# ✅ PRODUCCIÓN/CI/CD
npm ci                   # Instalación rápida y exacta

# ✅ ACTUALIZAR DEPENDENCIAS
npm update               # Actualiza dentro de rangos permitidos
npm audit fix            # Corrige vulnerabilidades automáticamente
```

> **⚠️ Nunca elimines `package-lock.json` del repositorio**. Es tan importante como el código fuente.

## 📘 Configuración Completa

Para una configuración paso a paso detallada de todo el proyecto, consulta la **[📋 Guía Completa de Configuración](./SETUP_GUIDE.md)**, que incluye:

- ✅ Configuración completa paso a paso
- 🔧 Instalación de todas las dependencias
- 📋 Ejemplos de código detallados
- 🧪 Configuración de testing
- 🐳 Docker y despliegue
- 🛠️ Configuración de herramientas de desarrollo
- 📚 Documentación de arquitectura

## 🔧 Scripts Disponibles

### Configuración

```bash
./setup_env.sh DEV     # Configurar entorno de desarrollo
./setup_env.sh QA      # Configurar entorno de QA
./setup_env.sh PROD    # Configurar entorno de producción
```

### Desarrollo

```bash
npm run dev          # Iniciar servidor de desarrollo (Vite)
npm start            # Alias para npm run dev
npm run build        # Build para producción
npm run preview      # Preview del build de producción
```

### Gestión de Dependencias

```bash
npm install          # Instalar/actualizar dependencias (desarrollo)
npm ci               # Instalación exacta para CI/CD (más rápido)
npm update           # Actualizar dependencias dentro de rangos
npm audit            # Auditar vulnerabilidades
npm audit fix        # Corregir vulnerabilidades automáticamente
```

### Calidad de Código

```bash
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores automáticamente
npm run format       # Formatear código con Prettier
npm run type-check   # Verificar tipos TypeScript
```

### Testing

```bash
npm run test         # Ejecutar tests
npm run test:coverage # Tests con coverage
```

## 🎯 Características Avanzadas

### Sistema de Rutas Escalable

- Configuración modular de rutas
- Lazy loading automático
- Metadata para SEO
- Timeouts de inactividad por ruta

### Gestión de Estado Escalable

- Context API para todo el manejo de estado (siguiendo SOLID)
- Hooks personalizados para lógica reutilizable
- Patrón reducer para estados complejos

### Seguridad

- JWT con encriptación AES
- Validación de tokens
- Refresh tokens automático
- Logout por inactividad

### Desarrollo

- Hot reload ultra-rápido con Vite
- Type checking en tiempo real con TypeScript
- Git hooks automatizados con Husky
- Mensajes de commit estandarizados con Commitlint
- Linting automático con ESLint + Prettier

## 🐳 Docker

### Desarrollo

```bash
docker build -t react-app .
docker run -p 3000:80 react-app
```

### Producción

El template incluye configuración completa de Docker con nginx optimizado para producción.

## 🔄 CI/CD

Incluye configuración para:

- **Azure Pipelines** (`azure-pipelines.yml`)
- **GitLab CI** (`.gitlab-ci.yml`)
- **GitHub Actions** (opcional)

## 📚 Clean Architecture

### Arquitectura Implementada

El proyecto sigue los principios de Clean Architecture adaptados para React:

![CleanArchitectureReact](https://user-images.githubusercontent.com/32858351/173492130-2400f1b6-0262-4214-86c8-2733a5219f57.svg)

### Capas

- **Servicios Externos:** Conectan el dominio con APIs externas

  - `services/`: Configuración de Axios y servicios HTTP
  - `api/`: Cliente HTTP centralizado

- **Adaptadores:** Estandarización de datos

  - `adapters/`: Transformación de datos entre capas
  - `utils/`: Utilidades de manejo de APIs

- **Componentes:** Lógica de negocio y presentación

  - `components/`: Componentes reutilizables
  - `hooks/`: Custom hooks
  - `routes/`: Sistema de enrutamiento
  - `pages/`: Páginas de la aplicación

- **Models/State:** Corazón de la aplicación
  - `types/`: Interfaces y modelos TypeScript
  - `context/`: Estado local con Context API
  - `redux/`: Estado global con Redux Toolkit

## 📚 Guías de Uso

### Agregar Nueva Ruta

1. Crear el componente en `src/pages/`
2. Agregar configuración en `src/routes/routeConfigs/`
3. Importar en `src/routes/allRoutes.ts`

### Crear Nuevo Hook

1. Crear archivo en `src/hooks/`
2. Exportar en `src/hooks/index.ts`
3. Usar en componentes

### Agregar Nuevo Servicio

1. Crear archivo en `src/services/`
2. Usar el cliente Axios configurado
3. Manejar errores correctamente

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit con formato (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Hecho con ❤️ para la comunidad de desarrolladores**
