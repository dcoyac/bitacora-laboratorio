#!/bin/bash

echo "🚀 Preparando Bitácora de Laboratorio para Deploy"
echo "=================================================="
echo ""

# Verificar si Git está instalado
if ! command -v git &> /dev/null
then
    echo "❌ Git no está instalado. Por favor instala Git primero."
    echo "   Descarga: https://git-scm.com/downloads"
    exit 1
fi

echo "✓ Git detectado"
echo ""

# Verificar si ya es un repositorio Git
if [ -d .git ]; then
    echo "✓ Repositorio Git ya existe"
else
    echo "→ Inicializando repositorio Git..."
    git init
    echo "✓ Git inicializado"
fi

echo ""
echo "→ Verificando archivos para commit..."

# Agregar todos los archivos
git add .

echo "✓ Archivos agregados"
echo ""

# Mostrar estado
echo "📊 Estado del repositorio:"
git status --short

echo ""
echo "→ Creando commit inicial..."

# Crear commit
git commit -m "Initial commit - Bitácora de Laboratorio con vista semanal y equipos UV/Laser"

echo ""
echo "✅ ¡Repositorio preparado!"
echo ""
echo "=========================================="
echo "📋 PRÓXIMOS PASOS:"
echo "=========================================="
echo ""
echo "1️⃣  Crear repositorio en GitHub:"
echo "    👉 https://github.com/new"
echo "    📝 Nombre sugerido: bitacora-laboratorio"
echo ""
echo "2️⃣  Conectar con GitHub (reemplaza TU_USUARIO):"
echo "    git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git"
echo "    git branch -M main"
echo "    git push -u origin main"
echo ""
echo "3️⃣  Elegir plataforma de deploy:"
echo ""
echo "    🎨 OPCIÓN A - Render (Recomendado)"
echo "    ├─ Sitio: https://render.com"
echo "    ├─ Guía: Ver DEPLOY-RENDER.md"
echo "    └─ Gratuito, fácil, con SSL"
echo ""
echo "    🚂 OPCIÓN B - Railway"
echo "    ├─ Sitio: https://railway.app"
echo "    ├─ Guía: Ver DEPLOY-RAILWAY.md"
echo "    └─ $5 crédito gratis, muy rápido"
echo ""
echo "=========================================="
echo "📚 DOCUMENTACIÓN:"
echo "=========================================="
echo ""
echo "  📄 DEPLOY.md           - Guía general"
echo "  📄 DEPLOY-RENDER.md    - Guía específica de Render"
echo "  📄 DEPLOY-RAILWAY.md   - Guía específica de Railway"
echo ""
echo "¡Buena suerte con tu deploy! 🎉"
