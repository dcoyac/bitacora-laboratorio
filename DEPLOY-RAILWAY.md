# 🚂 Deploy en Railway - Guía Paso a Paso

## 📋 Prerrequisitos

- [x] Cuenta en GitHub
- [x] Git instalado
- [x] Proyecto en tu computadora

---

## 🚀 Paso 1: Preparar Repositorio en GitHub

### 1.1 Crear Repositorio

1. Ve a [https://github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Configuración:
   - Name: `bitacora-laboratorio`
   - Public o Private
   - Click **"Create repository"**

### 1.2 Push del Código

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git
git branch -M main
git push -u origin main
```

✅ **Código en GitHub**

---

## 🌐 Paso 2: Crear Cuenta en Railway

### 2.1 Registrarse

1. Ve a [https://railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. **Login with GitHub** (recomendado)
4. Autoriza Railway

### 2.2 Verificar Email

Si es tu primera vez:
- Verifica tu email
- Railway te da $5 de crédito gratis

✅ **Cuenta lista**

---

## 🔧 Paso 3: Crear Proyecto

### 3.1 Nuevo Proyecto

1. En el dashboard, click **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**

### 3.2 Conectar Repositorio

1. Railway mostrará tus repos
2. Busca **"bitacora-laboratorio"**
3. Click en el repo para seleccionarlo

### 3.3 Auto-Detección

Railway detectará automáticamente:
- ✅ Es una app Node.js
- ✅ Tiene package.json
- ✅ Comando de inicio: `npm start`

### 3.4 Variables de Entorno

Railway configura automáticamente:
```
PORT: Railway lo asigna dinámicamente
NODE_ENV: production
```

---

## 🎉 Paso 4: Deploy Automático

### Inicio del Deploy

Railway comenzará automáticamente:
```
Building...
Installing dependencies...
Starting application...
Deploy successful!
```

⏱️ **Tiempo**: 1-2 minutos

### Monitoreo

Verás en tiempo real:
- Build logs
- Deploy status
- Output del servidor

---

## 🌍 Paso 5: Obtener URL Pública

### 5.1 Generar Dominio

1. Click en tu servicio en Railway
2. Tab **"Settings"**
3. Section **"Networking"**
4. Click **"Generate Domain"**

Railway te dará una URL:
```
https://bitacora-laboratorio.up.railway.app
```

### 5.2 (Opcional) Custom Domain

Si tienes dominio propio:
1. Settings → Networking
2. **"Custom Domain"**
3. Agrega tu dominio
4. Configura DNS según instrucciones

---

## ✅ Paso 6: Verificar Deploy

### 6.1 Abrir Aplicación

1. Click en la URL generada
2. O ve a: Settings → **"Open App"**

### 6.2 Probar Funcionalidad

1. Navega por las pestañas
2. Ve al Calendario
3. Selecciona UV y Laser
4. Verifica que carga correctamente

✅ **¡Aplicación en línea!**

---

## 🔄 Paso 7: Actualizar Aplicación

### Deploy Automático

Railway monitorea tu repo de GitHub:

```bash
# Hacer cambios
# Guardar archivos

# Commit y push
git add .
git commit -m "Actualización"
git push
```

Railway automáticamente:
1. Detecta el push
2. Hace un nuevo deploy
3. Actualiza la app en vivo

⏱️ **Tiempo de redeploy**: 1-2 minutos

---

## 📊 Paso 8: Monitoreo y Gestión

### Dashboard de Railway

Tabs principales:

**Deployments**
- Historial completo
- Cada deploy con timestamp
- Logs de cada deploy

**Metrics**
- CPU usage
- Memory usage
- Network traffic
- Request count

**Variables**
- Environment variables
- Secretos
- Configuración

**Settings**
- General settings
- Networking
- Integrations
- Danger zone

---

## 🔍 Ver Logs en Tiempo Real

### Opción 1: Web Dashboard

1. Click en tu servicio
2. Verás logs en tiempo real abajo
3. Auto-scroll activado

### Opción 2: Railway CLI

```bash
# Instalar CLI
npm i -g @railway/cli

# Login
railway login

# Ver logs
railway logs
```

---

## 💾 Volumen Persistente (Opcional)

### Para Datos Permanentes

Railway permite agregar volumen:

1. Click en tu servicio
2. Tab **"Data"**
3. Click **"Add Volume"**
4. Configuración:
   ```
   Mount Path: /app/data
   Size: 1GB (gratis)
   ```

### Modificar para Usar Volumen

```javascript
// En server.js, cambiar:
const db = new sqlite3.Database('./bitacora.db', ...

// A:
const db = new sqlite3.Database('/app/data/bitacora.db', ...
```

✅ **Datos ahora persisten entre deploys**

---

## 🐛 Troubleshooting

### Problema 1: Build Falla

**Error**: "Build failed"

**Verificar**:
```bash
# Local
npm install
npm start

# Si funciona, revisar logs en Railway
```

### Problema 2: App Crash

**Error**: "Application error"

**Solución**:
1. Ve a logs en Railway
2. Busca el error específico
3. Común: `PORT` no configurado
   ```javascript
   // Verificar en server.js:
   const PORT = process.env.PORT || 3001;
   ```

### Problema 3: No Genera URL

**Error**: No aparece opción "Generate Domain"

**Solución**:
1. Verifica que el deploy fue exitoso
2. Tab Settings → Networking
3. Debe aparecer **"Generate Domain"**

---

## 🔒 Seguridad

### HTTPS

✅ Railway incluye SSL automáticamente
- Todas las URLs son `https://`
- Certificado renovado automáticamente

### Variables Sensibles

Para secretos:
1. Tab **"Variables"**
2. Click **"New Variable"**
3. Marca como **"Private"** si es sensible

---

## 💰 Pricing

### Free Tier (Con Cuenta)

- $5 de crédito mensual gratis
- 500 horas de ejecución
- 1GB RAM
- 1GB disco
- 100GB transfer

### Usage-Based

Después de créditos:
- $0.01/hora ($7/mes aprox)
- Facturación por uso real
- Sin planes fijos

### Developer Plan ($5/mes)

- $5 + $5 crédito = $10 valor
- Priority support
- Más recursos

---

## 🗄️ Agregar PostgreSQL

### Crear Database

1. Click **"New"** en tu proyecto
2. Selecciona **"Database"**
3. Selecciona **"PostgreSQL"**
4. Railway crea la DB automáticamente

### Conectar a tu App

Railway inyecta variables:
```
DATABASE_URL=postgres://...
```

Usar en tu código:
```javascript
// Si cambias a PostgreSQL:
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

---

## 📱 Railway CLI

### Instalar

```bash
npm i -g @railway/cli
```

### Comandos Útiles

```bash
# Login
railway login

# Listar proyectos
railway list

# Ver logs
railway logs

# Variables
railway variables

# Ejecutar comandos
railway run node seed-data.js
```

---

## 🎯 Optimizaciones

### Sleep Prevention

Railway no duerme tu app (a diferencia de Render free tier)
- ✅ Siempre activa
- ✅ Sin cold starts

### Auto-Scaling

Railway escala automáticamente:
- Horizontal scaling
- Load balancing
- Zero-downtime deploys

---

## 🔗 Integraciones

### GitHub

Ya configurado al conectar repo.

### Discord

Notificaciones de deploy:
1. Settings → Integrations
2. Discord Webhook
3. Pegar webhook URL

### Slack

Similar a Discord:
1. Settings → Integrations
2. Slack Webhook

---

## 📊 Monitoreo Avanzado

### Metrics Dashboard

Railway muestra:
- CPU %
- Memory MB
- Network In/Out
- Response times

### Alertas

Configurar en Settings:
- CPU > 80%
- Memory > 90%
- Crashes

---

## 🎨 Custom Domain

### Agregar Dominio Propio

1. Settings → Networking
2. **"Custom Domain"**
3. Agregar: `bitacora.tudominio.com`

### Configurar DNS

Railway te dará:
```
CNAME: tuapp.up.railway.app
```

En tu proveedor DNS:
```
CNAME bitacora -> tuapp.up.railway.app
```

⏱️ **Propagación**: 5 min - 24 hrs

---

## 🚀 Deploy desde CLI

### Alternativa a GitHub

```bash
# Instalar CLI
npm i -g @railway/cli

# Login
railway login

# Iniciar proyecto
railway init

# Deploy
railway up
```

---

## 📋 Checklist Final

- [ ] App desplegada exitosamente
- [ ] URL generada y accesible
- [ ] Calendario funciona
- [ ] Datos se muestran
- [ ] SSL activo (https)
- [ ] Logs sin errores críticos
- [ ] (Opcional) Volumen configurado
- [ ] (Opcional) Custom domain

---

## 🌟 URL Final

```
https://bitacora-laboratorio.up.railway.app
```

**¡Comparte con tu equipo!**

---

## 📞 Soporte

- Docs: [docs.railway.app](https://docs.railway.app)
- Discord: [discord.gg/railway](https://discord.gg/railway)
- Status: [status.railway.app](https://status.railway.app)

---

**🎉 ¡Felicidades! Tu app está en producción.**

Railway manejará todo automáticamente. Solo haz `git push` para actualizar.
