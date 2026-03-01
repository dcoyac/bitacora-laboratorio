# 🚀 Guía de Despliegue (Deploy)

Esta aplicación puede desplegarse en múltiples plataformas. Te proporciono instrucciones para las 3 mejores opciones.

---

## 🌟 Opción 1: Render (RECOMENDADO)

**Ventajas:**
- ✅ 100% Gratuito
- ✅ SQLite funciona perfectamente
- ✅ Deployment automático desde Git
- ✅ SSL gratis
- ✅ Muy fácil de configurar

### Paso 1: Preparar el Proyecto

Ya está listo, solo necesitas:
```bash
# Asegúrate de tener todos los archivos
git init
git add .
git commit -m "Preparar para deploy"
```

### Paso 2: Crear Cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Regístrate con GitHub (recomendado)
3. Verifica tu email

### Paso 3: Subir a GitHub

```bash
# Crear repositorio en GitHub
# Luego:
git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git
git branch -M main
git push -u origin main
```

### Paso 4: Crear Web Service en Render

1. Click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name**: `bitacora-laboratorio`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. Click en **"Create Web Service"**

### Paso 5: Esperar el Deploy

- Render instalará dependencias automáticamente
- El deploy toma 2-3 minutos
- Obtendrás una URL como: `https://bitacora-laboratorio.onrender.com`

---

## 🚂 Opción 2: Railway

**Ventajas:**
- ✅ Muy fácil de usar
- ✅ SQLite compatible
- ✅ Deploy automático
- ✅ Free tier generoso

### Paso 1: Crear Cuenta en Railway

1. Ve a [https://railway.app](https://railway.app)
2. Regístrate con GitHub
3. Verifica tu cuenta

### Paso 2: Crear Proyecto

1. Click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Selecciona tu repositorio
4. Railway detectará automáticamente que es Node.js

### Paso 3: Configurar Variables

Railway lo hace automáticamente, pero verifica:
- **PORT**: Railway lo asigna automáticamente

### Paso 4: Deploy

- Railway hace deploy automáticamente
- Obtendrás una URL como: `https://bitacora-laboratorio.up.railway.app`

---

## ☁️ Opción 3: Vercel (Requiere Adaptaciones)

**Nota**: Vercel es serverless, SQLite requiere cambios.

### Alternativa: Usar PostgreSQL

Si quieres usar Vercel, necesitarás:
1. Cambiar SQLite por PostgreSQL
2. Usar Vercel Postgres (gratuito hasta cierto límite)

**Pasos:**
```bash
npm install pg
# Modificar server.js para usar PostgreSQL
```

---

## 🔧 Configuración para Producción

### Variables de Entorno

Crear archivo `.env` (ya incluido en .gitignore):
```env
NODE_ENV=production
PORT=3001
```

### Archivos Necesarios

Todos ya están incluidos:
- ✅ `package.json` - Dependencias
- ✅ `server.js` - Servidor configurado
- ✅ `.gitignore` - Archivos a ignorar
- ✅ `README.md` - Documentación

---

## 📋 Checklist Pre-Deploy

Antes de desplegar, verifica:

- [x] `package.json` tiene todas las dependencias
- [x] `server.js` usa `process.env.PORT || 3001`
- [x] `.gitignore` está configurado
- [x] Base de datos tiene estructura correcta
- [x] Frontend apunta a URLs relativas (no localhost)

---

## 🌐 Después del Deploy

### Actualizar URLs del Frontend

Si usas un servicio, actualiza `public/app.js`:

```javascript
// Antes (desarrollo):
const API_URL = 'http://localhost:3001/api';

// Después (producción):
const API_URL = '/api'; // URL relativa
```

**Ya está configurado así**, no necesitas cambiar nada.

---

## 🔄 Deploy Automático

Ambas plataformas (Render y Railway) soportan **deploy automático**:

1. Haces cambios en tu código
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Actualización"
   git push
   ```
3. La plataforma detecta cambios y hace re-deploy automáticamente

---

## 💾 Persistencia de Datos

### SQLite en Producción

**Render y Railway**:
- ✅ SQLite funciona
- ⚠️ Los datos se pierden en cada re-deploy
- 💡 Solución: Usar volumen persistente (Railway) o backup periódico

### Para Datos Permanentes

**Opción A: Usar PostgreSQL** (Recomendado para producción)
```bash
# Cambiar a PostgreSQL para datos permanentes
npm install pg
```

**Opción B: Backup Automático**
- Exportar datos periódicamente
- Guardar en servicio externo (AWS S3, etc.)

---

## 🔒 Seguridad

### Antes de Deploy:

1. **No incluir `.env` en Git**
   ```
   # Ya está en .gitignore
   .env
   ```

2. **Usar variables de entorno**
   - Configura en el dashboard de Render/Railway
   - No hardcodees datos sensibles

3. **Actualizar CORS si es necesario**
   ```javascript
   // En server.js, ya está configurado:
   app.use(cors());
   ```

---

## 📊 Monitoreo

### Render Dashboard
- Ve logs en tiempo real
- Métricas de uso
- Reinicio manual si necesario

### Railway Dashboard
- Logs en tiempo real
- Uso de recursos
- Variables de entorno

---

## 🐛 Troubleshooting

### Error: "Port already in use"
```javascript
// server.js ya usa:
const PORT = process.env.PORT || 3001;
```

### Error: "Database locked"
- SQLite no soporta alta concurrencia
- Considera PostgreSQL para producción

### Error: "Module not found"
```bash
# Asegúrate que package.json tenga todas las deps:
npm install
```

---

## 📱 URL Final

Después del deploy tendrás:

**Render**: `https://bitacora-laboratorio.onrender.com`
**Railway**: `https://bitacora-laboratorio.up.railway.app`

Comparte esta URL con tu equipo para acceso remoto.

---

## 🎯 Próximos Pasos

1. **Elige una plataforma** (Render recomendado)
2. **Sube a GitHub** tu código
3. **Conecta con la plataforma**
4. **Deploy automático**
5. **Prueba la URL generada**
6. **Comparte con tu equipo**

---

## 💡 Tips Finales

- 🔄 Configura deploy automático
- 📊 Monitorea logs regularmente
- 💾 Considera PostgreSQL para producción
- 🔒 Usa HTTPS (viene incluido gratis)
- 📧 Configura notificaciones de deploy

---

**¿Necesitas ayuda?** Consulta las guías específicas:
- `DEPLOY-RENDER.md` - Guía detallada para Render
- `DEPLOY-RAILWAY.md` - Guía detallada para Railway

---

**¡Tu aplicación está lista para el mundo!** 🌍
