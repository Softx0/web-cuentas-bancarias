# React TypeScript Template 2024 🚀

## 📋 Descripción

Template moderno de React con TypeScript completamente configurado con las mejores prácticas de desarrollo. Incluye autenticación, rutas protegidas, sistema de inactividad, y arquitectura escalable siguiendo principios SOLID.

## ✨ Características Principales

### 🔧 Tecnologías Core

- **React 18** con TypeScript
- **Create React App** como build tool
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
git clone <tu-repo>
cd web-cuentas-bancarias
npm install
```

### 2. Variables de Entorno

Crea un archivo `.env` basado en las siguientes variables:

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000

# JWT Configuration
REACT_APP_JWT_SECRET=your-jwt-secret-key
REACT_APP_JWT_EXPIRES_IN=24h

# Feature Flags
REACT_APP_ENABLE_INACTIVITY_TIMER=true
REACT_APP_DEFAULT_INACTIVITY_TIME=300000

# Environment
REACT_APP_ENVIRONMENT=development
```

### 3. Iniciar Desarrollo

```bash
npm start
```

### 4. Build para Producción

```bash
npm run build
```

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

### Desarrollo

```bash
npm start            # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run eject        # Eject de Create React App (no recomendado)
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

- Hot reload con Create React App
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
