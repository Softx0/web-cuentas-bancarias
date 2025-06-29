#!/bin/bash

# Web Cuentas Bancarias - Environment Setup Script
# Usage: ./setup_env.sh [DEV|QA|PROD]

env=$1

if [ -z "$env" ]; then
  echo "❌ Error: Environment not specified"
  echo "Usage: ./setup_env.sh [DEV|QA|PROD]"
  exit 1
fi

echo "🚀 Setting up environment variables for: $env"

# Function to set variables based on environment
set_environment_variables() {
    case $env in
        "DEV")
            # Development Configuration
            TAG_IMAGE="web-cuentas-app:dev"
            NODE_ENV="development"
            PORT="3000"
            VITE_API_BASE_URL="http://localhost:3001/api"
            VITE_API_TIMEOUT="15000"
            VITE_JWT_SECRET="dev-secret-key-for-testing-only"
            VITE_JWT_EXPIRES_IN="24h"
            VITE_ENABLE_INACTIVITY_TIMER="true"
            VITE_DEFAULT_INACTIVITY_TIME="600000"
            VITE_ENVIRONMENT="development"
            ;;
        "QA")
            # QA/Testing Configuration
            TAG_IMAGE="web-cuentas-app:qa"
            NODE_ENV="production"
            PORT="3000"
            VITE_API_BASE_URL="https://qa-api.cuentas-bancarias.com/api"
            VITE_API_TIMEOUT="10000"
            VITE_JWT_SECRET="qa-secret-key-change-in-production"
            VITE_JWT_EXPIRES_IN="12h"
            VITE_ENABLE_INACTIVITY_TIMER="true"
            VITE_DEFAULT_INACTIVITY_TIME="300000"
            VITE_ENVIRONMENT="qa"
            ;;
        "PROD")
            # Production Configuration
            TAG_IMAGE="web-cuentas-app:latest"
            NODE_ENV="production"
            PORT="3000"
            VITE_API_BASE_URL="https://api.cuentas-bancarias.com/api"
            VITE_API_TIMEOUT="8000"
            VITE_JWT_SECRET="CHANGE-THIS-IN-PRODUCTION-SECURE-KEY"
            VITE_JWT_EXPIRES_IN="8h"
            VITE_ENABLE_INACTIVITY_TIMER="true"
            VITE_DEFAULT_INACTIVITY_TIME="180000"
            VITE_ENVIRONMENT="production"
            ;;
        *)
            echo "❌ Error: Invalid environment. Use DEV, QA, or PROD"
            exit 1
            ;;
    esac
}

# Set variables for the specified environment
set_environment_variables

echo "📝 Writing environment variables to .env file"

# Create or clear the .env file in current directory
echo "# Generated environment file for $env environment" > .env
echo "# Generated on: $(date)" >> .env
echo "# Web Cuentas Bancarias Project" >> .env
echo "" >> .env

# Docker & Build Variables
echo "# Docker & Build Configuration" >> .env
echo "TAG_IMAGE=$TAG_IMAGE" >> .env
echo "NODE_ENV=$NODE_ENV" >> .env
echo "PORT=$PORT" >> .env
echo "" >> .env

# API Configuration
echo "# API Configuration" >> .env
echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" >> .env
echo "VITE_API_TIMEOUT=$VITE_API_TIMEOUT" >> .env
echo "" >> .env

# JWT Configuration
echo "# JWT Configuration" >> .env
echo "VITE_JWT_SECRET=$VITE_JWT_SECRET" >> .env
echo "VITE_JWT_EXPIRES_IN=$VITE_JWT_EXPIRES_IN" >> .env
echo "" >> .env

# Feature Flags
echo "# Feature Flags" >> .env
echo "VITE_ENABLE_INACTIVITY_TIMER=$VITE_ENABLE_INACTIVITY_TIMER" >> .env
echo "VITE_DEFAULT_INACTIVITY_TIME=$VITE_DEFAULT_INACTIVITY_TIME" >> .env
echo "" >> .env

# Environment
echo "# Environment Configuration" >> .env
echo "VITE_ENVIRONMENT=$VITE_ENVIRONMENT" >> .env

echo "✅ Environment setup completed for: $env"
echo "📄 Environment file generated at: ./.env"
echo ""
echo "🔧 Variables configured:"
echo "   🌐 API URL: $VITE_API_BASE_URL"
echo "   ⏱️  API Timeout: $VITE_API_TIMEOUT ms"
echo "   🔐 JWT Expires: $VITE_JWT_EXPIRES_IN"
echo "   ⌛ Inactivity: $VITE_DEFAULT_INACTIVITY_TIME ms"
echo ""
echo "🚀 Next steps:"
echo "   1. Review the generated .env file"
echo "   2. Run 'npm run dev' to start development"
echo "   3. For production, change JWT_SECRET to a secure value"