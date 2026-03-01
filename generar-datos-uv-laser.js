const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bitacora.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
    agregarEquiposYDatos();
  }
});

async function agregarEquiposYDatos() {
  console.log('🔬 Agregando equipos UV y Laser...');
  
  // Primero, agregar los equipos UV y Laser
  const equiposUVLaser = [
    ['UV', 'Equipo de luz ultravioleta para esterilización', 'Sala A', 'disponible'],
    ['Laser', 'Equipo láser para corte y grabado', 'Sala B', 'disponible']
  ];

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Verificar si ya existen
      db.get("SELECT id FROM equipos WHERE nombre = 'UV'", (err, row) => {
        if (row) {
          console.log('✓ Los equipos UV y Laser ya existen');
          generarRegistros();
        } else {
          console.log('→ Creando equipos UV y Laser...');
          const stmt = db.prepare("INSERT INTO equipos (nombre, descripcion, ubicacion, estado) VALUES (?, ?, ?, ?)");
          
          equiposUVLaser.forEach(equipo => {
            stmt.run(equipo, function(err) {
              if (err) {
                console.error('Error:', err);
              } else {
                console.log(`✓ Equipo ${equipo[0]} agregado (ID: ${this.lastID})`);
              }
            });
          });
          
          stmt.finalize(() => {
            console.log('\n📅 Generando registros de uso...\n');
            setTimeout(generarRegistros, 500);
          });
        }
      });
    });
  });
}

function generarRegistros() {
  // Obtener IDs de UV y Laser
  db.all("SELECT id, nombre FROM equipos WHERE nombre IN ('UV', 'Laser')", (err, equipos) => {
    if (err || equipos.length < 2) {
      console.error('Error al obtener equipos:', err);
      db.close();
      return;
    }

    const uvId = equipos.find(e => e.nombre === 'UV').id;
    const laserId = equipos.find(e => e.nombre === 'Laser').id;

    console.log(`UV ID: ${uvId}, Laser ID: ${laserId}`);

    // Generar registros para la semana del 23-29 de febrero 2026
    // Basados en la imagen proporcionada
    const registros = [
      // LUNES 24 - UV
      [uvId, 'Daniel Horacio', '2026-02-24 07:00:00', '2026-02-24 13:00:00', 'Esterilización de muestras biológicas', 'Proceso completado', 'finalizado'],
      
      // LUNES 24 - Laser
      [laserId, 'Benito', '2026-02-24 08:00:00', '2026-02-24 13:00:00', 'Corte de materiales para experimento', 'Trabajo finalizado', 'finalizado'],
      [laserId, 'David', '2026-02-24 15:00:00', '2026-02-24 17:00:00', 'Grabado de muestras', 'Sin problemas', 'finalizado'],
      
      // MARTES 25 - UV
      [uvId, 'Benito', '2026-02-25 08:00:00', '2026-02-25 12:00:00', 'Desinfección UV de equipo', 'OK', 'finalizado'],
      
      // MARTES 25 - Laser
      [laserId, 'Liz', '2026-02-25 08:00:00', '2026-02-25 12:00:00', 'Corte de precisión', 'Completado correctamente', 'finalizado'],
      
      // MIÉRCOLES 26 - UV
      [uvId, 'David', '2026-02-26 13:00:00', '2026-02-26 16:00:00', 'Tratamiento UV de superficies', 'Proceso normal', 'finalizado'],
      
      // MIÉRCOLES 26 - Laser (múltiples usuarios - uso intensivo)
      [laserId, 'Yamileth', '2026-02-26 09:00:00', '2026-02-26 13:00:00', 'Grabado de serie de muestras', 'Completado', 'finalizado'],
      [laserId, 'Moisés y Jon', '2026-02-26 13:00:00', '2026-02-26 17:00:00', 'Proyecto conjunto de corte', 'Excelente resultado', 'finalizado'],
      [laserId, 'Alexa', '2026-02-26 17:00:00', '2026-02-26 20:00:00', 'Grabado personalizado', 'OK', 'finalizado'],
      
      // JUEVES 27 - UV (uso prolongado)
      [uvId, 'Yamileth', '2026-02-27 08:00:00', '2026-02-27 19:00:00', 'Esterilización prolongada de lote completo', 'Proceso largo pero exitoso', 'finalizado'],
      
      // JUEVES 27 - Laser
      [laserId, 'Benito', '2026-02-27 08:00:00', '2026-02-27 14:00:00', 'Corte de materiales diversos', 'Completado', 'finalizado'],
      [laserId, 'Liz', '2026-02-27 14:00:00', '2026-02-27 19:00:00', 'Grabado de componentes', 'Sin novedades', 'finalizado'],
      
      // VIERNES 28 - UV
      [uvId, 'Benito', '2026-02-28 08:00:00', '2026-02-28 14:00:00', 'Desinfección UV semanal', 'Rutina completada', 'finalizado'],
      [uvId, 'Moisés y Jon', '2026-02-28 16:00:00', '2026-02-28 19:00:00', 'Tratamiento UV experimental', 'Resultados prometedores', 'finalizado'],
      
      // VIERNES 28 - Laser (día con más uso conjunto)
      [laserId, 'Benito', '2026-02-28 08:00:00', '2026-02-28 13:00:00', 'Corte de prototipos', 'OK', 'finalizado'],
      [laserId, 'Alexa', '2026-02-28 13:00:00', '2026-02-28 15:00:00', 'Grabado fino', 'Precisión excelente', 'finalizado'],
      
      // SÁBADO 29 - Algunos usos esporádicos
      [uvId, 'Daniel Horacio', '2026-02-29 09:00:00', '2026-02-29 12:00:00', 'Esterilización de fin de semana', 'OK', 'finalizado'],
      [laserId, 'Liz', '2026-02-29 10:00:00', '2026-02-29 13:00:00', 'Trabajo especial de sábado', 'Completado', 'finalizado'],
      
      // SEMANA ACTUAL (25 Feb es martes, así que datos para esta semana)
      // MARTES 25 - Registros activos actuales
      [uvId, 'Carlos Pérez', '2026-02-25 14:00:00', null, 'Esterilización en proceso', null, 'en_uso'],
      
      // MIÉRCOLES 26 - Para mostrar uso conjunto HOY
      [uvId, 'Ana Martínez', '2026-02-26 09:00:00', null, 'Tratamiento UV experimental en curso', null, 'en_uso'],
      [laserId, 'Roberto Silva', '2026-02-26 09:30:00', null, 'Corte de material especial', null, 'en_uso']
    ];

    // Eliminar registros anteriores para evitar duplicados
    db.run("DELETE FROM registros", (err) => {
      if (err) {
        console.error('Error al limpiar registros:', err);
        db.close();
        return;
      }

      console.log('✓ Registros anteriores eliminados\n');

      // Insertar nuevos registros
      const stmt = db.prepare(`
        INSERT INTO registros (equipo_id, usuario, fecha_inicio, fecha_fin, proposito, observaciones, estado) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      let insertados = 0;
      registros.forEach((registro, index) => {
        stmt.run(registro, function(err) {
          if (err) {
            console.error(`Error al insertar registro ${index + 1}:`, err);
          } else {
            insertados++;
            const equipoNombre = registro[0] === uvId ? 'UV' : 'Laser';
            const estado = registro[6] === 'en_uso' ? '🟢' : '✓';
            console.log(`${estado} [${equipoNombre}] ${registro[1]} - ${registro[2]} ${registro[6] === 'en_uso' ? '(EN USO)' : ''}`);
          }
          
          if (insertados === registros.length) {
            console.log(`\n✅ ¡Datos generados exitosamente!`);
            console.log(`\n📊 Resumen:`);
            console.log(`   - Total de registros: ${insertados}`);
            console.log(`   - Equipos: UV y Laser`);
            console.log(`   - Rango: 24-29 Febrero 2026`);
            console.log(`   - Incluye uso conjunto: SÍ`);
            console.log(`   - Registros activos: ${registros.filter(r => r[6] === 'en_uso').length}`);
            console.log(`\n🌐 Abre el navegador en: http://localhost:3001`);
            console.log(`📅 Ve a la pestaña "Calendario"`);
            console.log(`⚙️  Selecciona: Equipo 1 = UV, Equipo 2 = Laser`);
            console.log(`\n🎨 Verás:`);
            console.log(`   🔵 Azul = Solo UV`);
            console.log(`   🟢 Verde = Solo Laser`);
            console.log(`   🟡 Naranja = AMBOS EN USO SIMULTÁNEO`);
            
            db.close();
          }
        });
      });

      stmt.finalize();
    });
  });
}
