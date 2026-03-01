# 📋 Bitácora de Equipos de Laboratorio

Sistema web para registro y seguimiento del uso de equipos de laboratorio compartidos.

## 🚀 Características

- **Iniciar y finalizar uso de equipos**: Registro en tiempo real del uso de equipos
- **Visualización de equipos activos**: Ver qué equipos están siendo utilizados y por quién
- **Calendario semanal visual**: Vista de 7 días con navegación mediante flechas para identificar uso conjunto
- **Historial completo**: Búsqueda y filtrado de todos los registros
- **Gestión de equipos**: Agregar y visualizar equipos del laboratorio
- **Interfaz moderna y responsiva**: Funciona en computadoras, tablets y móviles

## 📦 Instalación

### Requisitos previos
- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Pasos de instalación

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor:**
   ```bash
   npm start
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3001
   ```

## 💻 Uso

### Iniciar uso de un equipo

1. Ve a la pestaña "Usar Equipo"
2. Selecciona el equipo que deseas usar
3. Ingresa tu nombre
4. Describe el propósito del uso
5. Haz clic en "Iniciar Uso"

### Finalizar uso

1. Ve a la pestaña "Equipos en Uso"
2. Encuentra tu registro activo
3. Opcionalmente agrega observaciones finales
4. Haz clic en "Finalizar Uso"

### Ver calendario de uso

1. Ve a la pestaña "Calendario"
2. Selecciona 2 equipos para monitorear
3. Usa las flechas ← → para navegar entre semanas
4. Haz clic en "Hoy" para volver a la semana actual
5. Haz clic en cualquier día para ver detalles
6. **Código de colores**:
   - 🔵 **Azul**: Solo equipo 1 en uso
   - 🟢 **Verde**: Solo equipo 2 en uso
   - 🟡 **Amarillo**: Ambos equipos en uso (uso conjunto)

### Ver historial

1. Ve a la pestaña "Historial"
2. Usa la barra de búsqueda para filtrar registros
3. Visualiza todos los detalles de cada uso

### Agregar equipos

1. Ve a la pestaña "Gestionar Equipos"
2. Completa el formulario con los datos del equipo
3. Haz clic en "Agregar Equipo"

## 🗄️ Base de Datos

El sistema utiliza SQLite, una base de datos local que se crea automáticamente al iniciar el servidor por primera vez. El archivo de base de datos se llama `bitacora.db`.

### Equipos iniciales

El sistema viene con 5 equipos de ejemplo:
- Microscopio Óptico
- Centrífuga
- Espectrofotómetro
- Balanza Analítica
- PCR (Termociclador)

Puedes agregar más equipos desde la interfaz web.

## 🛠️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js con Express
- **Base de datos**: SQLite3
- **Diseño**: CSS moderno con gradientes y animaciones

## 📱 Responsive Design

La aplicación está optimizada para funcionar en:
- Computadoras de escritorio
- Tablets
- Teléfonos móviles

## 🔧 Estructura del proyecto

```
Bitacora/
├── server.js           # Servidor backend
├── package.json        # Dependencias del proyecto
├── bitacora.db        # Base de datos (se crea automáticamente)
└── public/
    ├── index.html     # Interfaz principal
    ├── styles.css     # Estilos
    └── app.js         # Lógica del frontend
```

## 🌐 API Endpoints

- `GET /api/equipos` - Obtener todos los equipos
- `POST /api/equipos` - Agregar un nuevo equipo
- `GET /api/registros` - Obtener todos los registros
- `GET /api/registros/activos` - Obtener registros activos
- `GET /api/registros/rango` - Obtener registros por rango de fechas y equipos
- `POST /api/registros/iniciar` - Iniciar uso de un equipo
- `POST /api/registros/finalizar/:id` - Finalizar uso de un equipo

## 🔒 Seguridad

Este sistema está diseñado para uso en red local del laboratorio. Para uso en producción considera:
- Agregar autenticación de usuarios
- Implementar HTTPS
- Agregar validación de datos más robusta
- Considerar una base de datos más robusta como PostgreSQL

## 📝 Notas

- Los registros se actualizan en tiempo real
- El sistema calcula automáticamente el tiempo de uso
- Todos los datos se guardan de forma persistente en la base de datos
- El calendario semanal permite visualizar uso conjunto de equipos con navegación simple
- Vista de 7 días con eventos detallados (hora y usuario)
- Incluye datos de prueba para demostración (ejecuta `node seed-data.js`)

## 📚 Documentación Adicional

- **README.md**: Documentación completa del proyecto
- **INICIO-RAPIDO.md**: Guía de inicio rápido
- **GUIA-CALENDARIO.md**: Guía detallada del calendario
- **VISTA-SEMANAL.md**: Documentación de la vista semanal
- **VISTA-SEMANAL-VISUAL.md**: Diagrama visual de la interfaz
- **DATOS-UV-LASER.md**: Documentación de datos de equipos UV y Laser
- **DEPLOY.md**: 🚀 **Guía general de despliegue**
- **DEPLOY-RENDER.md**: Guía detallada para Render
- **DEPLOY-RAILWAY.md**: Guía detallada para Railway

## 🚀 Deploy en Producción

Esta aplicación puede desplegarse en la nube gratuitamente:

### Opción 1: Render (Recomendado)
```bash
# 1. Ejecutar script de preparación (Windows)
prepare-deploy.bat

# 2. Subir a GitHub
# 3. Conectar con Render
# 4. Deploy automático
```

**Ventajas:**
- ✅ 100% gratuito
- ✅ SSL incluido
- ✅ Deploy automático desde Git
- ✅ Guía completa en DEPLOY-RENDER.md

### Opción 2: Railway
```bash
# Similar a Render, muy fácil de configurar
# Ver guía en DEPLOY-RAILWAY.md
```

**Ventajas:**
- ✅ $5 crédito mensual gratis
- ✅ No se duerme
- ✅ Deploy ultra-rápido

📖 **Ver DEPLOY.md para instrucciones completas**

## 🤝 Soporte

Para reportar problemas o sugerir mejoras, contacta al administrador del sistema.

---

**Desarrollado para el Instituto Politécnico Nacional**
