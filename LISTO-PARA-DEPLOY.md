# ✅ TODO LISTO PARA DEPLOY

## 🎉 Tu aplicación está completamente preparada para desplegarse

---

## 📦 ARCHIVOS DE DEPLOY CREADOS

### Configuración
- ✅ `Procfile` - Configuración para Heroku/Render
- ✅ `package.json` - Dependencias y scripts
- ✅ `.gitignore` - Archivos a ignorar
- ✅ `server.js` - Configurado con `process.env.PORT`
- ✅ `public/app.js` - URLs relativas para producción

### Scripts de Preparación
- ✅ `prepare-deploy.bat` - Script para Windows
- ✅ `prepare-deploy.sh` - Script para Linux/Mac

### Documentación
- ✅ `DEPLOY.md` - Guía general de deploy
- ✅ `DEPLOY-RENDER.md` - Guía paso a paso para Render
- ✅ `DEPLOY-RAILWAY.md` - Guía paso a paso para Railway

---

## 🚀 OPCIONES DE DEPLOY

### 🎨 Opción 1: Render (RECOMENDADO)

**Por qué Render:**
- ✅ 100% GRATIS
- ✅ Sin tarjeta de crédito requerida
- ✅ SSL automático
- ✅ Deploy desde GitHub
- ✅ Muy fácil de usar

**Pasos rápidos:**
1. Ejecuta `prepare-deploy.bat`
2. Sube a GitHub
3. Conecta con Render
4. ¡Listo en 5 minutos!

**Guía completa:** `DEPLOY-RENDER.md`

---

### 🚂 Opción 2: Railway

**Por qué Railway:**
- ✅ $5 crédito gratis mensual
- ✅ App SIEMPRE activa (no se duerme)
- ✅ Deploy ultra-rápido
- ✅ Mejor performance que Render free

**Pasos rápidos:**
1. Ejecuta `prepare-deploy.bat`
2. Sube a GitHub
3. Conecta con Railway
4. ¡Listo en 3 minutos!

**Guía completa:** `DEPLOY-RAILWAY.md`

---

## 📋 CHECKLIST PRE-DEPLOY

### Verificar Archivos
- [x] `package.json` tiene todas las dependencias
- [x] `server.js` usa `process.env.PORT`
- [x] `Procfile` existe
- [x] `.gitignore` configurado
- [x] `public/app.js` usa URLs relativas

### Verificar Funcionalidad Local
```bash
# Probar localmente antes de deploy
npm install
npm start
```

Verificar:
- [ ] Servidor inicia sin errores
- [ ] http://localhost:3001 carga
- [ ] Calendario funciona
- [ ] Equipos UV y Laser aparecen
- [ ] Datos se muestran correctamente

---

## 🎯 PASO A PASO RÁPIDO

### Para Render (5 minutos)

```bash
# 1. Preparar repositorio
prepare-deploy.bat

# 2. Crear repo en GitHub
# Ve a: https://github.com/new

# 3. Push a GitHub
git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git
git branch -M main
git push -u origin main

# 4. Ve a Render
# https://render.com
# - Sign in with GitHub
# - New + → Web Service
# - Connect repository
# - Deploy!
```

**URL final**: `https://bitacora-laboratorio-XXXX.onrender.com`

---

### Para Railway (3 minutos)

```bash
# 1. Preparar repositorio
prepare-deploy.bat

# 2. Push a GitHub (igual que arriba)

# 3. Ve a Railway
# https://railway.app
# - Login with GitHub
# - New Project
# - Deploy from GitHub
# - Select repo
# - Generate Domain
```

**URL final**: `https://bitacora-laboratorio.up.railway.app`

---

## 🔍 DIFERENCIAS CLAVE

| Característica | Render Free | Railway Free |
|----------------|-------------|--------------|
| **Precio** | $0 | $5 crédito/mes |
| **SSL** | ✅ Incluido | ✅ Incluido |
| **Sleep** | ⚠️ Después 15 min | ✅ Siempre activo |
| **Deploy time** | 2-3 min | 1-2 min |
| **Cold start** | ~30 seg | Instantáneo |
| **Tarjeta requerida** | ❌ No | ❌ No |
| **Datos persistentes** | ⚠️ Se pierden | ⚠️ Se pierden* |

*Ambos: SQLite se resetea en deploy. Usar PostgreSQL para datos permanentes.

---

## 💾 SOBRE LOS DATOS

### ⚠️ Importante

Con SQLite en ambas plataformas:
- Los datos se pierden en cada deploy
- Los datos se pierden si el servicio se reinicia

### Soluciones:

**1. Ejecutar seed después del deploy**
```bash
# Agregar a package.json:
"scripts": {
  "start": "node server.js",
  "postinstall": "node generar-datos-uv-laser.js"
}
```

**2. Migrar a PostgreSQL** (Recomendado para producción)
- Render: PostgreSQL gratis hasta 1GB
- Railway: PostgreSQL incluido
- Datos permanentes garantizados

---

## 🎨 DESPUÉS DEL DEPLOY

### Tu URL estará lista:
```
Render: https://bitacora-laboratorio-XXXX.onrender.com
Railway: https://bitacora-laboratorio.up.railway.app
```

### Compartir con tu equipo:
1. Copia la URL
2. Envía por email/WhatsApp
3. Todos pueden acceder desde cualquier dispositivo
4. Sin instalación necesaria

### Actualizar la app:
```bash
# Hacer cambios en el código
git add .
git commit -m "Actualización"
git push

# Deploy automático en ambas plataformas
```

---

## 📊 MONITOREO

### Render
- Dashboard: Ver logs en tiempo real
- Metrics: RAM, CPU usage
- Events: Historial de deploys

### Railway
- Dashboard: Logs automáticos
- Metrics: CPU, Memory, Network
- Deployments: Cada deploy registrado

---

## 🐛 TROUBLESHOOTING COMÚN

### "Build failed"
```bash
# Verificar localmente:
npm install
npm start

# Si funciona, revisar logs en la plataforma
```

### "Application error"
```bash
# Verificar en server.js:
const PORT = process.env.PORT || 3001;

# Debe usar process.env.PORT
```

### "Cannot find module"
```bash
# Verificar package.json tiene todas las deps:
npm install --save express sqlite3 body-parser cors
```

---

## 🎯 RECOMENDACIÓN FINAL

**Para empezar rápido:**
👉 **Usa Render**
- Más simple
- Totalmente gratis
- Suficiente para demos y prototipos

**Para producción seria:**
👉 **Usa Railway + PostgreSQL**
- Siempre activo
- Datos permanentes
- Mejor performance

---

## 📞 NECESITAS AYUDA?

1. **Revisa las guías detalladas:**
   - `DEPLOY.md` - Overview
   - `DEPLOY-RENDER.md` - Paso a paso Render
   - `DEPLOY-RAILWAY.md` - Paso a paso Railway

2. **Errores comunes:**
   - Busca en el archivo de la plataforma
   - Sección "Troubleshooting"

3. **Comunidad:**
   - Render: [community.render.com](https://community.render.com)
   - Railway: [Discord](https://discord.gg/railway)

---

## 🎊 ¡ESTÁS LISTO!

Tu aplicación está completamente preparada para deploy.

**Siguiente paso:**
```bash
# Ejecuta esto:
prepare-deploy.bat

# Y sigue las instrucciones en pantalla
```

---

**URL demo después del deploy:**
```
🌐 https://tu-app.onrender.com
📅 Pestaña "Calendario"
⚙️  Equipo 1: UV, Equipo 2: Laser
🎨 Ver código de colores en acción
```

**¡Mucha suerte con tu deploy!** 🚀

---

*Desarrollado para el Instituto Politécnico Nacional*
*Proyecto de Posdoctorado 2025*
