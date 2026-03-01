const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bitacora.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
    agregarDatosPrueba();
  }
});

function agregarDatosPrueba() {
  console.log('Agregando datos de prueba...');
  
  const registrosPrueba = [
    [1, 'Ana García', '2026-02-20 09:00:00', '2026-02-20 11:30:00', 'Análisis de muestras biológicas', 'Todo correcto', 'finalizado'],
    [2, 'Carlos López', '2026-02-20 10:00:00', '2026-02-20 12:00:00', 'Preparación de reactivos', 'Completado', 'finalizado'],
    [3, 'María Torres', '2026-02-21 08:30:00', '2026-02-21 10:00:00', 'Experimento de PCR', 'Resultados satisfactorios', 'finalizado'],
    [1, 'Pedro Ramírez', '2026-02-22 14:00:00', '2026-02-22 16:30:00', 'Observación celular', 'Sin novedades', 'finalizado'],
    [2, 'Laura Mendoza', '2026-02-22 14:30:00', '2026-02-22 16:00:00', 'Centrifugado de muestras', 'Proceso normal', 'finalizado'],
    [1, 'Juan Hernández', '2026-02-23 09:00:00', '2026-02-23 12:00:00', 'Análisis microscópico detallado', 'Requiere seguimiento', 'finalizado'],
    [4, 'Sofía Ramírez', '2026-02-23 10:00:00', '2026-02-23 11:30:00', 'Calibración de balanza', 'OK', 'finalizado'],
    [1, 'Roberto Silva', '2026-02-24 08:00:00', '2026-02-24 10:30:00', 'Preparación de láminas', 'Completado', 'finalizado'],
    [3, 'Diana Flores', '2026-02-24 13:00:00', '2026-02-24 15:30:00', 'Análisis espectrofotométrico', 'Buenos resultados', 'finalizado'],
    [1, 'Miguel Ángel', '2026-02-25 09:00:00', null, 'Observación en curso', null, 'en_uso'],
    [2, 'Elena Morales', '2026-02-25 09:30:00', null, 'Centrifugado de proyecto X', null, 'en_uso']
  ];

  db.get("SELECT COUNT(*) as count FROM registros", (err, row) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    
    if (row.count > 0) {
      console.log('Ya existen registros en la base de datos.');
      console.log(`Total de registros: ${row.count}`);
      db.close();
      return;
    }

    const stmt = db.prepare(`
      INSERT INTO registros (equipo_id, usuario, fecha_inicio, fecha_fin, proposito, observaciones, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    let insertados = 0;
    registrosPrueba.forEach((registro, index) => {
      stmt.run(registro, function(err) {
        if (err) {
          console.error(`Error al insertar registro ${index + 1}:`, err);
        } else {
          insertados++;
          console.log(`✓ Registro ${insertados}/${registrosPrueba.length} agregado`);
        }
        
        if (insertados === registrosPrueba.length) {
          console.log('\n¡Datos de prueba agregados exitosamente!');
          console.log(`Total insertados: ${insertados}`);
          db.close();
        }
      });
    });

    stmt.finalize();
  });
}
