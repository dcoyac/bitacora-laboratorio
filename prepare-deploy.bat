@echo off
echo 🚀 Preparando Bitacora de Laboratorio para Deploy
echo ==================================================
echo.

REM Verificar si Git esta instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git no esta instalado. Por favor instala Git primero.
    echo    Descarga: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo ✓ Git detectado
echo.

REM Verificar si ya es un repositorio Git
if exist .git (
    echo ✓ Repositorio Git ya existe
) else (
    echo → Inicializando repositorio Git...
    git init
    echo ✓ Git inicializado
)

echo.
echo → Verificando archivos para commit...

REM Agregar todos los archivos
git add .

echo ✓ Archivos agregados
echo.

REM Mostrar estado
echo 📊 Estado del repositorio:
git status --short

echo.
echo → Creando commit inicial...

REM Crear commit
git commit -m "Initial commit - Bitacora de Laboratorio con vista semanal y equipos UV/Laser"

echo.
echo ✅ ¡Repositorio preparado!
echo.
echo ==========================================
echo 📋 PROXIMOS PASOS:
echo ==========================================
echo.
echo 1️⃣  Crear repositorio en GitHub:
echo     👉 https://github.com/new
echo     📝 Nombre sugerido: bitacora-laboratorio
echo.
echo 2️⃣  Conectar con GitHub (reemplaza TU_USUARIO):
echo     git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git
echo     git branch -M main
echo     git push -u origin main
echo.
echo 3️⃣  Elegir plataforma de deploy:
echo.
echo     🎨 OPCION A - Render (Recomendado)
echo     ├─ Sitio: https://render.com
echo     ├─ Guia: Ver DEPLOY-RENDER.md
echo     └─ Gratuito, facil, con SSL
echo.
echo     🚂 OPCION B - Railway
echo     ├─ Sitio: https://railway.app
echo     ├─ Guia: Ver DEPLOY-RAILWAY.md
echo     └─ $5 credito gratis, muy rapido
echo.
echo ==========================================
echo 📚 DOCUMENTACION:
echo ==========================================
echo.
echo   📄 DEPLOY.md           - Guia general
echo   📄 DEPLOY-RENDER.md    - Guia especifica de Render
echo   📄 DEPLOY-RAILWAY.md   - Guia especifica de Railway
echo.
echo ¡Buena suerte con tu deploy! 🎉
echo.
pause
