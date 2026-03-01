const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./bitacora.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
    initDatabase();
  }
});

function initDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS equipos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    ubicacion TEXT,
    estado TEXT DEFAULT 'disponible',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipo_id INTEGER NOT NULL,
    usuario TEXT NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    proposito TEXT,
    observaciones TEXT,
    estado TEXT DEFAULT 'en_uso',
    FOREIGN KEY (equipo_id) REFERENCES equipos (id)
  )`);

  db.get("SELECT COUNT(*) as count FROM equipos", (err, row) => {
    if (err) {
      console.error('Error al verificar equipos:', err);
      return;
    }
    if (row && row.count === 0) {
      const equiposIniciales = [
        ['UV', 'Equipo de luz ultravioleta para esterilización', 'Sala A', 'disponible'],
        ['Laser', 'Equipo láser para corte y grabado', 'Sala B', 'disponible'],
        ['Microscopio Óptico', 'Microscopio binocular con aumento 40x-1000x', 'Sala A', 'disponible'],
        ['Centrífuga', 'Centrífuga de mesa para tubos de 15ml y 50ml', 'Sala B', 'disponible'],
        ['Espectrofotómetro', 'Espectrofotómetro UV-Vis', 'Sala A', 'disponible'],
        ['Balanza Analítica', 'Precisión 0.0001g', 'Sala C', 'disponible'],
        ['PCR', 'Termociclador para PCR', 'Sala B', 'disponible']
      ];

      const stmt = db.prepare("INSERT INTO equipos (nombre, descripcion, ubicacion, estado) VALUES (?, ?, ?, ?)");
      equiposIniciales.forEach(equipo => {
        stmt.run(equipo);
      });
      stmt.finalize();
      console.log('✓ Equipos iniciales creados (incluyendo UV y Laser)');
    }
  });
}

app.get('/api/equipos', (req, res) => {
  db.all("SELECT * FROM equipos ORDER BY nombre", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/equipos', (req, res) => {
  const { nombre, descripcion, ubicacion } = req.body;
  db.run(
    "INSERT INTO equipos (nombre, descripcion, ubicacion, estado) VALUES (?, ?, ?, 'disponible')",
    [nombre, descripcion, ubicacion],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, nombre, descripcion, ubicacion, estado: 'disponible' });
    }
  );
});

app.get('/api/registros', (req, res) => {
  const query = `
    SELECT r.*, e.nombre as equipo_nombre 
    FROM registros r
    JOIN equipos e ON r.equipo_id = e.id
    ORDER BY r.fecha_inicio DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/registros/iniciar', (req, res) => {
  const { equipo_id, usuario, proposito } = req.body;
  
  db.run(
    "INSERT INTO registros (equipo_id, usuario, fecha_inicio, proposito, estado) VALUES (?, ?, datetime('now', 'localtime'), ?, 'en_uso')",
    [equipo_id, usuario, proposito],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      db.run("UPDATE equipos SET estado = 'en_uso' WHERE id = ?", [equipo_id]);
      
      res.json({ 
        id: this.lastID, 
        equipo_id, 
        usuario, 
        proposito,
        estado: 'en_uso',
        mensaje: 'Uso iniciado correctamente' 
      });
    }
  );
});

app.post('/api/registros/finalizar/:id', (req, res) => {
  const { observaciones } = req.body;
  const registroId = req.params.id;
  
  db.get("SELECT equipo_id FROM registros WHERE id = ?", [registroId], (err, row) => {
    if (err || !row) {
      res.status(500).json({ error: 'Registro no encontrado' });
      return;
    }
    
    db.run(
      "UPDATE registros SET fecha_fin = datetime('now', 'localtime'), observaciones = ?, estado = 'finalizado' WHERE id = ?",
      [observaciones, registroId],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        db.run("UPDATE equipos SET estado = 'disponible' WHERE id = ?", [row.equipo_id]);
        
        res.json({ mensaje: 'Uso finalizado correctamente' });
      }
    );
  });
});

app.get('/api/registros/activos', (req, res) => {
  const query = `
    SELECT r.*, e.nombre as equipo_nombre 
    FROM registros r
    JOIN equipos e ON r.equipo_id = e.id
    WHERE r.estado = 'en_uso'
    ORDER BY r.fecha_inicio DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/registros/rango', (req, res) => {
  const { inicio, fin, equipo1, equipo2 } = req.query;
  
  let query = `
    SELECT r.*, e.nombre as equipo_nombre 
    FROM registros r
    JOIN equipos e ON r.equipo_id = e.id
    WHERE (r.fecha_inicio <= ? AND (r.fecha_fin >= ? OR r.fecha_fin IS NULL))
  `;
  
  const params = [fin, inicio];
  
  if (equipo1 || equipo2) {
    const equipoIds = [];
    if (equipo1) equipoIds.push(equipo1);
    if (equipo2) equipoIds.push(equipo2);
    query += ` AND r.equipo_id IN (${equipoIds.map(() => '?').join(',')})`;
    params.push(...equipoIds);
  }
  
  query += ' ORDER BY r.fecha_inicio DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
