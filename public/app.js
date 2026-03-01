const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api' 
  : '/api';

let equipos = [];
let registros = [];
let currentWeekStart = new Date();
let selectedEquipo1 = null;
let selectedEquipo2 = null;

// Inicializar a la semana actual
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
currentWeekStart.setHours(0, 0, 0, 0);

document.addEventListener('DOMContentLoaded', () => {
    cargarEquipos();
    cargarRegistros();
    cargarEquiposActivos();

    document.getElementById('form-iniciar-uso').addEventListener('submit', iniciarUso);
    document.getElementById('form-agregar-equipo').addEventListener('submit', agregarEquipo);
    document.getElementById('search-input').addEventListener('input', filtrarHistorial);
    
    document.getElementById('calendar-equipo1').addEventListener('change', (e) => {
        selectedEquipo1 = e.target.value;
        if (selectedEquipo1 || selectedEquipo2) {
            actualizarVistaSemanal();
        }
    });
    
    document.getElementById('calendar-equipo2').addEventListener('change', (e) => {
        selectedEquipo2 = e.target.value;
        if (selectedEquipo1 || selectedEquipo2) {
            actualizarVistaSemanal();
        }
    });

    setInterval(() => {
        const tabActual = document.querySelector('.tab-content.active').id;
        if (tabActual === 'equipos-en-uso') {
            cargarEquiposActivos();
        }
    }, 5000);
});

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');

    if (tabId === 'usar-equipo') {
        cargarEquipos();
    } else if (tabId === 'equipos-en-uso') {
        cargarEquiposActivos();
    } else if (tabId === 'calendario') {
        cargarEquipos().then(() => {
            actualizarSelectsCalendario();
            if (selectedEquipo1 || selectedEquipo2) {
                actualizarVistaSemanal();
            }
        });
    } else if (tabId === 'historial') {
        cargarRegistros();
    } else if (tabId === 'gestionar-equipos') {
        cargarEquipos();
        mostrarListaEquipos();
    }
}

async function cargarEquipos() {
    try {
        const response = await fetch(`${API_URL}/equipos`);
        equipos = await response.json();
        actualizarSelectEquipos();
    } catch (error) {
        console.error('Error al cargar equipos:', error);
        showNotification('Error al cargar equipos', 'error');
    }
}

function actualizarSelectEquipos() {
    const select = document.getElementById('equipo-select');
    select.innerHTML = '<option value="">Selecciona un equipo...</option>';
    
    const equiposDisponibles = equipos.filter(e => e.estado === 'disponible');
    
    equiposDisponibles.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo.id;
        option.textContent = `${equipo.nombre} - ${equipo.ubicacion}`;
        select.appendChild(option);
    });

    if (equiposDisponibles.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No hay equipos disponibles';
        option.disabled = true;
        select.appendChild(option);
    }
}

function mostrarListaEquipos() {
    const container = document.getElementById('equipos-list');
    
    if (equipos.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No hay equipos registrados</p></div>';
        return;
    }

    container.innerHTML = '';
    equipos.forEach(equipo => {
        const card = document.createElement('div');
        card.className = 'equipo-card';
        
        const estadoBadge = equipo.estado === 'disponible' 
            ? '<span class="badge badge-success">Disponible</span>'
            : '<span class="badge badge-warning">En Uso</span>';

        card.innerHTML = `
            <h3>${equipo.nombre} ${estadoBadge}</h3>
            <p><strong>Descripción:</strong> ${equipo.descripcion || 'Sin descripción'}</p>
            <p><strong>Ubicación:</strong> ${equipo.ubicacion}</p>
        `;
        container.appendChild(card);
    });
}

async function iniciarUso(e) {
    e.preventDefault();
    
    const equipoId = document.getElementById('equipo-select').value;
    const usuario = document.getElementById('usuario-input').value;
    const proposito = document.getElementById('proposito-input').value;

    try {
        const response = await fetch(`${API_URL}/registros/iniciar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                equipo_id: equipoId,
                usuario: usuario,
                proposito: proposito
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            showNotification('Uso iniciado correctamente', 'success');
            e.target.reset();
            cargarEquipos();
        } else {
            showNotification(data.error || 'Error al iniciar uso', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al iniciar uso', 'error');
    }
}

async function cargarEquiposActivos() {
    try {
        const response = await fetch(`${API_URL}/registros/activos`);
        const activos = await response.json();
        mostrarEquiposActivos(activos);
    } catch (error) {
        console.error('Error al cargar equipos activos:', error);
    }
}

function mostrarEquiposActivos(activos) {
    const container = document.getElementById('equipos-activos-list');
    
    if (activos.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No hay equipos en uso actualmente</p></div>';
        return;
    }

    container.innerHTML = '';
    activos.forEach(registro => {
        const div = document.createElement('div');
        div.className = 'uso-activo';
        
        const fechaInicio = new Date(registro.fecha_inicio);
        const tiempoUso = calcularTiempoUso(fechaInicio);

        div.innerHTML = `
            <div class="uso-activo-header">
                <div>
                    <h3>${registro.equipo_nombre}</h3>
                    <p><strong>Usuario:</strong> ${registro.usuario}</p>
                    <p><strong>Inicio:</strong> ${formatearFecha(registro.fecha_inicio)}</p>
                    <p><strong>Tiempo de uso:</strong> ${tiempoUso}</p>
                    <p><strong>Propósito:</strong> ${registro.proposito}</p>
                </div>
                <span class="badge badge-warning">En Uso</span>
            </div>
            <div class="finalizar-form">
                <textarea id="obs-${registro.id}" placeholder="Observaciones finales (opcional)" rows="2"></textarea>
                <button class="btn btn-success btn-small" onclick="finalizarUso(${registro.id})">
                    Finalizar Uso
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

function calcularTiempoUso(fechaInicio) {
    const ahora = new Date();
    const diff = ahora - fechaInicio;
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (horas > 0) {
        return `${horas}h ${minutos}m`;
    }
    return `${minutos}m`;
}

async function finalizarUso(registroId) {
    const observaciones = document.getElementById(`obs-${registroId}`).value;

    try {
        const response = await fetch(`${API_URL}/registros/finalizar/${registroId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ observaciones })
        });

        const data = await response.json();
        
        if (response.ok) {
            showNotification('Uso finalizado correctamente', 'success');
            cargarEquiposActivos();
            cargarEquipos();
        } else {
            showNotification(data.error || 'Error al finalizar uso', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al finalizar uso', 'error');
    }
}

async function cargarRegistros() {
    try {
        const response = await fetch(`${API_URL}/registros`);
        registros = await response.json();
        mostrarHistorial(registros);
    } catch (error) {
        console.error('Error al cargar registros:', error);
    }
}

function mostrarHistorial(datos) {
    const tbody = document.getElementById('historial-tbody');
    
    if (datos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay registros</td></tr>';
        return;
    }

    tbody.innerHTML = '';
    datos.forEach(registro => {
        const tr = document.createElement('tr');
        
        const estadoBadge = registro.estado === 'finalizado'
            ? '<span class="badge badge-success">Finalizado</span>'
            : '<span class="badge badge-warning">En Uso</span>';

        tr.innerHTML = `
            <td>${formatearFecha(registro.fecha_inicio)}</td>
            <td>${registro.fecha_fin ? formatearFecha(registro.fecha_fin) : '-'}</td>
            <td>${registro.equipo_nombre}</td>
            <td>${registro.usuario}</td>
            <td>${registro.proposito}</td>
            <td>${registro.observaciones || '-'}</td>
            <td>${estadoBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filtrarHistorial(e) {
    const termino = e.target.value.toLowerCase();
    const filtrados = registros.filter(registro => 
        registro.equipo_nombre.toLowerCase().includes(termino) ||
        registro.usuario.toLowerCase().includes(termino) ||
        registro.proposito.toLowerCase().includes(termino) ||
        (registro.observaciones && registro.observaciones.toLowerCase().includes(termino))
    );
    mostrarHistorial(filtrados);
}

async function agregarEquipo(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre-equipo').value;
    const descripcion = document.getElementById('descripcion-equipo').value;
    const ubicacion = document.getElementById('ubicacion-equipo').value;

    try {
        const response = await fetch(`${API_URL}/equipos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                ubicacion: ubicacion
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            showNotification('Equipo agregado correctamente', 'success');
            e.target.reset();
            cargarEquipos();
            mostrarListaEquipos();
        } else {
            showNotification(data.error || 'Error al agregar equipo', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al agregar equipo', 'error');
    }
}

function formatearFecha(fecha) {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const año = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

function showNotification(mensaje, tipo) {
    const notification = document.getElementById('notification');
    notification.textContent = mensaje;
    notification.className = `notification ${tipo}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Funciones de Calendario Semanal
function actualizarSelectsCalendario() {
    const select1 = document.getElementById('calendar-equipo1');
    const select2 = document.getElementById('calendar-equipo2');
    
    select1.innerHTML = '<option value="">Selecciona un equipo...</option>';
    select2.innerHTML = '<option value="">Selecciona un equipo...</option>';
    
    equipos.forEach(equipo => {
        const option1 = document.createElement('option');
        option1.value = equipo.id;
        option1.textContent = equipo.nombre;
        select1.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = equipo.id;
        option2.textContent = equipo.nombre;
        select2.appendChild(option2);
    });
}

function cambiarSemana(delta) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (delta * 7));
    actualizarVistaSemanal();
}

function irHoy() {
    currentWeekStart = new Date();
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
    currentWeekStart.setHours(0, 0, 0, 0);
    actualizarVistaSemanal();
}

async function actualizarVistaSemanal() {
    if (!selectedEquipo1 && !selectedEquipo2) {
        return;
    }

    await cargarRegistros();
    
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const startDay = currentWeekStart.getDate();
    const endDay = weekEnd.getDate();
    const startMonth = monthNames[currentWeekStart.getMonth()];
    const endMonth = monthNames[weekEnd.getMonth()];
    const year = currentWeekStart.getFullYear();
    
    let rangeText = '';
    if (startMonth === endMonth) {
        rangeText = `${startDay} - ${endDay} de ${startMonth} ${year}`;
    } else {
        rangeText = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
    
    document.getElementById('week-range').textContent = rangeText;
    
    const weekGrid = document.getElementById('calendar-week-grid');
    weekGrid.innerHTML = '';
    
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentDate.getDate() + i);
        
        const dayCard = document.createElement('div');
        dayCard.className = 'week-day-card';
        
        if (currentDate.getTime() === today.getTime()) {
            dayCard.classList.add('today');
        }
        
        const dayHeader = document.createElement('div');
        dayHeader.className = 'week-day-header';
        
        const dayName = document.createElement('div');
        dayName.className = 'week-day-name';
        dayName.textContent = dayNames[i];
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'week-day-number';
        dayNumber.textContent = currentDate.getDate();
        
        dayHeader.appendChild(dayName);
        dayHeader.appendChild(dayNumber);
        dayCard.appendChild(dayHeader);
        
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'week-events';
        
        const eventos = obtenerEventosDelDia(currentDate);
        
        if (eventos.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.color = 'var(--gray-400)';
            emptyMsg.style.fontSize = '0.875rem';
            emptyMsg.style.marginTop = '20px';
            emptyMsg.textContent = 'Sin eventos';
            eventsContainer.appendChild(emptyMsg);
        } else {
            eventos.forEach(evento => {
                const eventoDiv = document.createElement('div');
                eventoDiv.className = `week-event ${evento.clase}`;
                
                if (evento.registro) {
                    const fechaInicio = new Date(evento.registro.fecha_inicio);
                    const horaInicio = fechaInicio.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
                    
                    eventoDiv.innerHTML = `
                        <span class="week-event-time">${horaInicio}</span>
                        <span class="week-event-user">${evento.registro.usuario}</span>
                    `;
                } else {
                    eventoDiv.innerHTML = `
                        <span class="week-event-user">${evento.texto}</span>
                    `;
                }
                
                eventoDiv.title = evento.detalle;
                eventsContainer.appendChild(eventoDiv);
            });
        }
        
        dayCard.appendChild(eventsContainer);
        dayCard.addEventListener('click', () => mostrarDetallesDia(currentDate, eventos));
        
        weekGrid.appendChild(dayCard);
    }
}

function obtenerEventosDelDia(fecha) {
    const eventos = [];
    
    const registrosDia = registros.filter(r => {
        const fechaInicio = new Date(r.fecha_inicio);
        const fechaFin = r.fecha_fin ? new Date(r.fecha_fin) : new Date();
        
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(23, 59, 59, 999);
        const fechaActual = new Date(fecha);
        fechaActual.setHours(12, 0, 0, 0);
        
        return fechaActual >= fechaInicio && fechaActual <= fechaFin;
    });
    
    const equipo1Ids = selectedEquipo1 ? [parseInt(selectedEquipo1)] : [];
    const equipo2Ids = selectedEquipo2 ? [parseInt(selectedEquipo2)] : [];
    
    const registrosEquipo1 = registrosDia.filter(r => equipo1Ids.includes(r.equipo_id));
    const registrosEquipo2 = registrosDia.filter(r => equipo2Ids.includes(r.equipo_id));
    
    const usoConjunto = registrosEquipo1.length > 0 && registrosEquipo2.length > 0;
    
    if (usoConjunto) {
        registrosEquipo1.forEach(r => {
            eventos.push({
                clase: 'conjunto',
                texto: `${r.usuario} (${r.equipo_nombre})`,
                detalle: `USO CONJUNTO - ${r.equipo_nombre} - ${r.usuario}: ${r.proposito}`,
                registro: r
            });
        });
        
        registrosEquipo2.forEach(r => {
            eventos.push({
                clase: 'conjunto',
                texto: `${r.usuario} (${r.equipo_nombre})`,
                detalle: `USO CONJUNTO - ${r.equipo_nombre} - ${r.usuario}: ${r.proposito}`,
                registro: r
            });
        });
    } else {
        registrosEquipo1.forEach(r => {
            eventos.push({
                clase: 'equipo1',
                texto: `${r.usuario}`,
                detalle: `${r.equipo_nombre} - ${r.usuario}: ${r.proposito}`,
                registro: r
            });
        });
        
        registrosEquipo2.forEach(r => {
            eventos.push({
                clase: 'equipo2',
                texto: `${r.usuario}`,
                detalle: `${r.equipo_nombre} - ${r.usuario}: ${r.proposito}`,
                registro: r
            });
        });
    }
    
    return eventos;
}

function mostrarDetallesDia(fecha, eventos) {
    const container = document.getElementById('calendar-events-detail');
    
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es', { month: 'long' });
    const año = fecha.getFullYear();
    const diaSemana = fecha.toLocaleString('es', { weekday: 'long' });
    
    if (eventos.length === 0) {
        container.innerHTML = `
            <h3>${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}, ${dia} de ${mes} de ${año}</h3>
            <div class="empty-state">
                <p>No hay registros de uso para este día</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `<h3>${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}, ${dia} de ${mes} de ${año}</h3>`;
    
    const registrosDia = registros.filter(r => {
        const fechaInicio = new Date(r.fecha_inicio);
        const fechaFin = r.fecha_fin ? new Date(r.fecha_fin) : new Date();
        
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(23, 59, 59, 999);
        const fechaActual = new Date(fecha);
        fechaActual.setHours(12, 0, 0, 0);
        
        return fechaActual >= fechaInicio && fechaActual <= fechaFin;
    });
    
    const equipo1Ids = selectedEquipo1 ? [parseInt(selectedEquipo1)] : [];
    const equipo2Ids = selectedEquipo2 ? [parseInt(selectedEquipo2)] : [];
    
    const registrosRelevantes = registrosDia.filter(r => 
        equipo1Ids.includes(r.equipo_id) || equipo2Ids.includes(r.equipo_id)
    );
    
    const hayUsoConjunto = registrosRelevantes.filter(r => equipo1Ids.includes(r.equipo_id)).length > 0 &&
                           registrosRelevantes.filter(r => equipo2Ids.includes(r.equipo_id)).length > 0;
    
    if (hayUsoConjunto) {
        const alertDiv = document.createElement('div');
        alertDiv.style.background = '#fef3c7';
        alertDiv.style.border = '2px solid #f59e0b';
        alertDiv.style.padding = '12px';
        alertDiv.style.borderRadius = '8px';
        alertDiv.style.marginBottom = '16px';
        alertDiv.style.fontWeight = '600';
        alertDiv.style.color = '#92400e';
        alertDiv.textContent = '⚠️ AMBOS EQUIPOS EN USO SIMULTÁNEO';
        container.appendChild(alertDiv);
    }
    
    registrosRelevantes.forEach(registro => {
        const esEquipo1 = equipo1Ids.includes(registro.equipo_id);
        const clase = hayUsoConjunto ? 'conjunto' : (esEquipo1 ? 'equipo1' : 'equipo2');
        
        const card = document.createElement('div');
        card.className = `event-detail-card ${clase}`;
        
        const estado = registro.estado === 'en_uso' ? 
            '<span class="badge badge-warning">En Uso</span>' : 
            '<span class="badge badge-success">Finalizado</span>';
        
        card.innerHTML = `
            <h4>${registro.equipo_nombre} ${estado}</h4>
            <p><strong>Usuario:</strong> ${registro.usuario}</p>
            <p><strong>Inicio:</strong> ${formatearFecha(registro.fecha_inicio)}</p>
            <p><strong>Fin:</strong> ${registro.fecha_fin ? formatearFecha(registro.fecha_fin) : 'En uso'}</p>
            <p><strong>Propósito:</strong> ${registro.proposito}</p>
            ${registro.observaciones ? `<p><strong>Observaciones:</strong> ${registro.observaciones}</p>` : ''}
        `;
        
        container.appendChild(card);
    });
}

