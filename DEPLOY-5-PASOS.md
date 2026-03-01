# 🚀 DEPLOY EN 5 PASOS

## Instrucciones Ultra-Simples para Deployment

---

## ✅ PASO 1: Preparar (1 minuto)

Abre PowerShell o CMD en esta carpeta y ejecuta:

```bash
prepare-deploy.bat
```

✅ Esto inicializa Git y crea un commit

---

## ✅ PASO 2: GitHub (2 minutos)

### 2.1 Crear Repositorio

1. Ve a: **https://github.com/new**
2. Nombre: `bitacora-laboratorio`
3. Click **"Create repository"**

### 2.2 Push del Código

Copia y pega estos comandos (reemplaza `TU_USUARIO`):

```bash
git remote add origin https://github.com/TU_USUARIO/bitacora-laboratorio.git
git branch -M main  
git push -u origin main
```

✅ Tu código ahora está en GitHub

---

## ✅ PASO 3: Elegir Plataforma

### Opción A: Render (Recomendado - 100% Gratis)

1. Ve a: **https://render.com**
2. Click **"Get Started"**
3. **"Sign in with GitHub"**
4. Autoriza Render

### Opción B: Railway (Alternativa - $5 gratis)

1. Ve a: **https://railway.app**
2. Click **"Start a New Project"**
3. **"Login with GitHub"**
4. Autoriza Railway

---

## ✅ PASO 4: Deploy (1 minuto)

### Si elegiste Render:

1. En Render, click **"New +"** → **"Web Service"**
2. Busca **"bitacora-laboratorio"** → **"Connect"**
3. Configuración:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Click **"Create Web Service"**
5. ⏱️ Espera 2-3 minutos

### Si elegiste Railway:

1. En Railway, click **"New Project"**
2. **"Deploy from GitHub repo"**
3. Selecciona **"bitacora-laboratorio"**
4. Railway hace todo automáticamente
5. Tab **"Settings"** → **"Generate Domain"**

---

## ✅ PASO 5: ¡Listo! (Instantáneo)

### Obtener tu URL:

**Render**: `https://bitacora-laboratorio-XXXX.onrender.com`
**Railway**: `https://bitacora-laboratorio.up.railway.app`

### Probar:

1. Abre tu URL en el navegador
2. Ve a pestaña **"Calendario"**
3. Selecciona:
   - Equipo 1: **UV**
   - Equipo 2: **Laser**
4. ✅ Verás 6 días en **NARANJA** (uso conjunto)

---

## 🎊 ¡FELICIDADES!

Tu aplicación está en línea y accesible desde cualquier dispositivo.

**Comparte tu URL con tu equipo.**

---

## 🔄 Para Actualizar

Cuando hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

La plataforma hace re-deploy automáticamente.

---

## ❓ ¿Problemas?

### Deploy falla:
- Lee los logs en la plataforma
- Verifica que funcione localmente: `npm start`

### No hay datos:
- Ejecuta en Railway/Render console: `node generar-datos-uv-laser.js`

### Otros problemas:
- Lee `DEPLOY-RENDER.md` o `DEPLOY-RAILWAY.md` para detalles

---

## 📚 Más Información

- **DEPLOY.md** - Guía general completa
- **DEPLOY-RENDER.md** - Paso a paso detallado para Render
- **DEPLOY-RAILWAY.md** - Paso a paso detallado para Railway
- **LISTO-PARA-DEPLOY.md** - Checklist y troubleshooting

---

**¡Eso es todo!** 🚀

5 pasos simples y tu aplicación está en la nube.
