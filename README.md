# Web Cuentas Bancarias

## 📋 Descripción

Este es un proyecto para la gestión de cuentas bancarias donde se tiene la capacidad de:

- Consultar el saldo de una cuenta
- Visualizar transacciones recientes
- Realizar transferencias de dinero entre cuentas

## ✨ Características Principales

### 🔧 Tecnologías Core

- **React 18** con TypeScript
- **Vite** como build tool
- **TailwindCSS** para estilos
- **React Router DOM** para navegación con lazy loading
- **Context API** para manejo de estado
- **Axios** con interceptors para APIs mockeadas

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

- **ESLint** con configuración personalizada
- **Prettier** para formateo de código
- **Husky** para git hooks
- **Commitlint** para mensajes de commit
- **Lint-staged** para linting automático

### 🐳 DevOps y Deploy

- **Docker** con nginx para producción
- **CI/CD** con Azure Pipelines
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
3. **Vite automáticamente** lee las variables con prefijo `VITE_*`
4. **Tu aplicación** accede a ellas través de `src/config/env.ts`

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

## 📱 Uso de la Aplicación

### ¿Por qué se incluye `package-lock.json`?

Nos garantiza:

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

## 🔄 CI/CD

- **Azure Pipelines** (`azure-pipelines.yml`)

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

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit con formato (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

**Hecho con ❤️**
