# 🎨 Deploy en Render - Guía Paso a Paso

## 📋 Prerrequisitos

- [x] Cuenta en GitHub
- [x] Git instalado
- [x] Proyecto en tu computadora

---

## 🚀 Paso 1: Preparar Repositorio en GitHub

### 1.1 Crear Repositorio en GitHub

1. Ve a [https://github.com](https://github.com)
2. Click en el botón **"+"** (arriba derecha) → **"New repository"**
3. Configuración:
   - **Repository name**: `bitacora-laboratorio`
   - **Description**: "Sistema de bitácora para equipos de laboratorio"
   - **Public** o **Private** (tú decides)
   - ❌ NO marques "Add README"
   - Click **"Create repository"**

### 1.2 Subir tu Código

Abre la terminal en tu carpeta del proyecto:

```bash
# Si aún no has inicializado Git:
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Initial commit - Bitácora de Laboratorio"

# Agregar el remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git

# Cambiar a branch main
git branch -M main

# Push al repositorio
git push -u origin main
```

✅ **Tu código ahora está en GitHub**

---

## 🌐 Paso 2: Crear Cuenta en Render

### 2.1 Registrarse

1. Ve a [https://render.com](https://render.com)
2. Click en **"Get Started"**
3. **Importante**: Selecciona **"Sign in with GitHub"**
   - Esto facilita la conexión de repositorios
4. Autoriza Render para acceder a GitHub
5. Verifica tu email si es necesario

✅ **Cuenta creada**

---

## 🔧 Paso 3: Crear Web Service

### 3.1 Dashboard de Render

1. En el dashboard de Render, click en **"New +"** (esquina superior derecha)
2. Selecciona **"Web Service"**

### 3.2 Conectar Repositorio

1. Render mostrará tus repositorios de GitHub
2. Busca **"bitacora-laboratorio"**
3. Click en **"Connect"**

### 3.3 Configurar el Servicio

**Configuración Básica:**
```
Name: bitacora-laboratorio
Region: Oregon (US West) o el más cercano a ti
Branch: main
Runtime: Node
```

**Build Settings:**
```
Build Command: npm install
Start Command: npm start
```

**Instance Type:**
```
Free (512 MB RAM, compartida)
```

### 3.4 Variables de Entorno (Opcional)

Click en **"Advanced"** → **"Add Environment Variable"**

```
NODE_ENV = production
```

### 3.5 Auto-Deploy

✅ Dejar marcado **"Auto-Deploy"**
- Esto hará deploy automático cuando hagas push a GitHub

---

## 🎉 Paso 4: Deploy

1. Click en **"Create Web Service"**
2. Render comenzará a:
   - ✅ Clonar tu repositorio
   - ✅ Instalar dependencias (`npm install`)
   - ✅ Iniciar el servidor (`npm start`)

### Monitoreo del Deploy

Verás logs en tiempo real:
```
Cloning repository...
Installing dependencies...
Building...
Starting server...
Servidor corriendo en http://localhost:XXXX
Conectado a la base de datos SQLite
```

⏱️ **Tiempo estimado**: 2-3 minutos

---

## ✅ Paso 5: Verificar Deploy

### 5.1 Obtener URL

Cuando termine el deploy, verás:
```
Live at: https://bitacora-laboratorio-XXXX.onrender.com
```

### 5.2 Probar la Aplicación

1. Click en la URL o cópiala
2. Abre en tu navegador
3. Deberías ver tu aplicación funcionando

### 5.3 Verificar Funcionalidad

1. Ve a **"Calendario"**
2. Selecciona equipos UV y Laser
3. Verifica que el calendario cargue
4. ✅ Si funciona, ¡deploy exitoso!

---

## 🔄 Paso 6: Actualizar la Aplicación

### Hacer Cambios

Cuando necesites actualizar:

```bash
# 1. Hacer cambios en tu código
# 2. Guardar archivos

# 3. Commit
git add .
git commit -m "Descripción de los cambios"

# 4. Push
git push
```

### Deploy Automático

- Render detectará el push automáticamente
- Comenzará un nuevo deploy
- Tomará 1-2 minutos
- La aplicación se actualizará sin hacer nada más

---

## 📊 Paso 7: Monitoreo y Gestión

### Dashboard de Render

En tu dashboard verás:

**Tabs principales:**
- **Events**: Historial de deploys
- **Logs**: Logs en tiempo real del servidor
- **Environment**: Variables de entorno
- **Settings**: Configuración general

### Ver Logs en Tiempo Real

1. Click en tu servicio
2. Tab **"Logs"**
3. Verás output del servidor en vivo

### Métricas

Render muestra:
- Estado del servicio (Live/Building/Failed)
- Último deploy
- RAM usage
- Request count

---

## 🐛 Troubleshooting

### Problema 1: Deploy Falla

**Error**: "Build failed"

**Solución**:
```bash
# Verificar package.json localmente
npm install
npm start

# Si funciona local, verificar logs en Render
```

### Problema 2: Aplicación no carga

**Error**: "Service Unavailable"

**Solución**:
1. Ve a Logs en Render
2. Busca errores
3. Verifica que `PORT` use `process.env.PORT`

### Problema 3: Base de Datos Vacía

**Error**: No hay datos después del deploy

**Solución**:
```bash
# Render reinicia el contenedor en cada deploy
# Los datos SQLite se pierden

# Opción A: Ejecutar seed después del deploy
# Agregar a package.json:
"scripts": {
  "start": "node server.js",
  "postdeploy": "node seed-data.js"
}

# Opción B: Usar PostgreSQL (permanente)
```

---

## 🔒 Seguridad

### SSL/HTTPS

✅ Render incluye SSL gratis automáticamente
- Tu URL será `https://...` (segura)

### Variables Secretas

Para datos sensibles:
1. Dashboard → Environment
2. Click **"Add Environment Variable"**
3. Marca como **"Secret"**

---

## 💾 Persistencia de Datos

### ⚠️ Importante sobre SQLite

SQLite en Render:
- ✅ Funciona perfectamente
- ❌ Los datos se borran en cada deploy
- ❌ Los datos se borran si el servicio se reinicia

### Soluciones:

**Opción 1: Usar Volumen Persistente**
- Render Disk ($1/GB/mes)
- Los datos persisten entre deploys

**Opción 2: Migrar a PostgreSQL**
- Render PostgreSQL (gratis hasta 1GB)
- Datos permanentes
- Mejor para producción

**Opción 3: Backup Periódico**
- Script que exporta datos
- Guarda en servicio externo

---

## 💰 Costos

### Free Tier

Incluye:
- ✅ 512 MB RAM
- ✅ Shared CPU
- ✅ 100 GB bandwidth/mes
- ✅ SSL gratis
- ⚠️ El servicio duerme después de 15 min inactividad
- ⚠️ Primera carga después de dormir: ~30 segundos

### Paid Tier ($7/mes)

- ✅ 512 MB RAM (dedicada)
- ✅ No se duerme
- ✅ Carga instantánea siempre
- ✅ Más bandwidth

---

## 📈 Upgrade a PostgreSQL (Recomendado)

### Crear PostgreSQL Database

1. Dashboard → **"New +"** → **"PostgreSQL"**
2. Name: `bitacora-db`
3. Database: `bitacora`
4. User: `bitacora_user`
5. Region: Same as web service
6. Plan: **Free**

### Conectar a tu App

Render te dará variables:
```
DATABASE_URL=postgres://user:pass@host/db
```

Agregar en Environment de tu Web Service.

---

## 🎯 Checklist Final

Antes de compartir tu URL:

- [ ] Aplicación carga correctamente
- [ ] Calendario funciona
- [ ] Equipos UV y Laser aparecen
- [ ] Datos de prueba cargados
- [ ] Formularios funcionan
- [ ] Responsive funciona (probar en móvil)
- [ ] SSL activo (https://)
- [ ] Logs sin errores

---

## 🌟 URL Final

Tu aplicación estará en:
```
https://bitacora-laboratorio-XXXX.onrender.com
```

**¡Comparte esta URL con tu equipo!**

---

## 📞 Soporte

- Documentación: [docs.render.com](https://docs.render.com)
- Community: [community.render.com](https://community.render.com)
- Status: [status.render.com](https://status.render.com)

---

**🎉 ¡Felicidades! Tu aplicación está en línea.**

Para actualizaciones futuras, simplemente haz `git push` y Render se encargará del resto.
