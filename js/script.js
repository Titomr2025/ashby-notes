// Array of objects that stores id, description, completion status, and completion date
// Start with empty array - users will add their own tasks
let tareas = [];

// Counter to generate unique IDs (start from 1)
let contadorId = 1;

// Function to save tasks to localStorage
function guardarTareas() {
    try {
        localStorage.setItem('ashbyNotesTasks', JSON.stringify(tareas));
        localStorage.setItem('ashbyNotesCounter', contadorId.toString());
        console.log('Tasks saved to localStorage');
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

// Function to load tasks from localStorage
function cargarTareas() {
    try {
        const tareasGuardadas = localStorage.getItem('ashbyNotesTasks');
        const contadorGuardado = localStorage.getItem('ashbyNotesCounter');
        
        if (tareasGuardadas) {
            const tareasParseadas = JSON.parse(tareasGuardadas);
            // Convert date strings back to Date objects
            tareas = tareasParseadas.map(tarea => ({
                ...tarea,
                fechaRealizacion: tarea.fechaRealizacion ? new Date(tarea.fechaRealizacion) : null
            }));
            console.log('Tasks loaded from localStorage:', tareas.length);
        } else {
            // If no saved tasks, start with empty array
            tareas = [];
            console.log('Starting with empty task list');
        }
        
        if (contadorGuardado) {
            contadorId = parseInt(contadorGuardado);
        } else {
            // Start counter from 1 for new users
            contadorId = 1;
        }
        
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        // If error, start with empty array
        tareas = [];
        contadorId = 1;
    }
}

// Referencias a elementos del DOM
const inputDescripcion = document.getElementById('descripcionTarea');
const btnAgregar = document.getElementById('agregarTarea');
const listaTareasPendientes = document.getElementById('listaTareasPendientes');
const listaTareasRealizadas = document.getElementById('listaTareasRealizadas');
const totalTareas = document.getElementById('totalTareas');
const tareasPendientes = document.getElementById('tareasPendientes');
const tareasRealizadas = document.getElementById('tareasRealizadas');

// Función para formatear fecha y hora de manera legible
function formatearFecha(fecha) {
    const opciones = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return fecha.toLocaleDateString('en-US', opciones);
}

// Función para actualizar las listas de tareas pendientes y realizadas
function actualizarLista() {
    // Limpiar ambas tablas
    listaTareasPendientes.innerHTML = '';
    listaTareasRealizadas.innerHTML = '';
    
    // Separar tareas pendientes y realizadas
    const tareasPend = tareas.filter(tarea => !tarea.completado);
    const tareasReal = tareas.filter(tarea => tarea.completado);
    
    // REQUIREMENT: Loop through the array to show pending tasks
    if (tareasPend.length === 0) {
        listaTareasPendientes.innerHTML = '<tr><td colspan="4" class="tabla-vacia">🎉 No pending tasks! Excellent work!</td></tr>';
    } else {
        tareasPend.forEach((tarea) => {
            const fila = document.createElement('tr');
            fila.setAttribute('data-id', tarea.id);
            
            fila.innerHTML = `
                <td class="id-cell" data-label="ID">${tarea.id}</td>
                <td class="tarea-cell" data-label="Task">${tarea.descripcion}</td>
                <td class="checkbox-cell" data-label="Action">
                    <button class="btn-completar" onclick="cambiarEstadoPorId(${tarea.id})" title="Mark as completed">✅ Complete</button>
                </td>
                <td class="eliminar-cell" data-label="Delete">
                    <button class="btn-eliminar" onclick="borrarTareaPorId(${tarea.id})" title="Delete task">🗑️ Delete</button>
                </td>
            `;
            
            listaTareasPendientes.appendChild(fila);
        });
    }
    
    // Loop through the array to show completed tasks
    if (tareasReal.length === 0) {
        listaTareasRealizadas.innerHTML = '<tr><td colspan="5" class="tabla-vacia">📝 You haven\'t completed any tasks yet</td></tr>';
    } else {
        tareasReal.forEach((tarea) => {
            const fila = document.createElement('tr');
            fila.setAttribute('data-id', tarea.id);
            fila.classList.add('tarea-completada');
            
            const contenidoTarea = `<span class="texto-tachado">${tarea.descripcion}</span><span class="estado-realizado">COMPLETED</span>`;
            const fechaTexto = formatearFecha(tarea.fechaRealizacion);
            
            fila.innerHTML = `
                <td class="id-cell" data-label="ID">${tarea.id}</td>
                <td class="tarea-cell" data-label="Task">${contenidoTarea}</td>
                <td class="fecha-cell" data-label="Completed">${fechaTexto}</td>
                <td class="checkbox-cell" data-label="Action">
                    <button class="btn-desmarcar" onclick="cambiarEstadoPorId(${tarea.id})" title="Unmark task">↩️ Unmark</button>
                </td>
                <td class="eliminar-cell" data-label="Delete">
                    <button class="btn-eliminar" onclick="borrarTareaPorId(${tarea.id})" title="Delete task">🗑️ Delete</button>
                </td>
            `;
            
            listaTareasRealizadas.appendChild(fila);
        });
    }
    
    // IMPORTANTE: Actualizar el resumen cada vez que se modifica la lista
    actualizarResumen();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    // Obtener la descripción del input y eliminar espacios en blanco
    const descripcion = inputDescripcion.value.trim();
    
    // Validate that it's not empty
    if (descripcion === '') {
        alert('Please write a task description');
        inputDescripcion.focus(); // Focus the input for better UX
        return;
    }
    
    // Crear nueva tarea con id, descripción y estado inicial completado: false
    const nuevaTarea = {
        id: contadorId++, // Generar ID único
        descripcion: descripcion,
        completado: false,
        fechaRealizacion: null // No date until marked as completed
    };
    
    // Add the new task to the array using push
    tareas.push(nuevaTarea);
    
    // Save to localStorage
    guardarTareas();
    
    // Clear the input after adding
    inputDescripcion.value = '';
    inputDescripcion.focus(); // Keep focus to easily add more tasks
    
    // Update the list and summary
    actualizarLista();
    
    console.log('Tarea agregada:', nuevaTarea);
}

// Function to delete a task by ID
function borrarTareaPorId(id) {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this task?')) {
        // Buscar la tarea por ID
        const tareaEliminada = tareas.find(tarea => tarea.id === id);
        
        // Remove from array using filter
        tareas = tareas.filter(tarea => tarea.id !== id);
        
        // Save to localStorage
        guardarTareas();
        
        // Update the list and summary
        actualizarLista();
        guardarTareas(); // Save to localStorage
        
        console.log('Tarea eliminada:', tareaEliminada);
    }
}

// Function to delete a task by index (maintain compatibility)
function borrarTarea(indice) {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this task?')) {
        // Guardar información de la tarea para logging
        const tareaEliminada = tareas[indice];
        
        // Remove from array using splice
        tareas.splice(indice, 1);
        
        // Save to localStorage
        guardarTareas();
        
        // Update the list and summary
        actualizarLista();
        guardarTareas(); // Save to localStorage
        
        console.log('Tarea eliminada:', tareaEliminada);
        console.log('Total de tareas restantes:', tareas.length);
    }
}

// Función para cambiar el estado de completado de una tarea por ID
function cambiarEstadoPorId(id) {
    // Buscar la tarea por ID
    const tarea = tareas.find(t => t.id === id);
    
    if (tarea) {
        // Guardar el estado anterior para logging
        const estadoAnterior = tarea.completado;
        
        // Cambiar el estado
        tarea.completado = !tarea.completado;
        
        // If marked as completed, assign current date and time
        // If unmarked, remove the date
        if (tarea.completado) {
            tarea.fechaRealizacion = new Date(); // Current date and time when completed
        } else {
            tarea.fechaRealizacion = null; // Remove date when unmarked
        }
        
        // Save to localStorage
        guardarTareas();
        
        // Update the list and summary
        actualizarLista();
        guardarTareas(); // Save to localStorage
        
        const fechaTexto = tarea.fechaRealizacion ? formatearFecha(tarea.fechaRealizacion) : 'no date';
        console.log(`Tarea ID:${id} "${tarea.descripcion}" cambió de ${estadoAnterior} a ${tarea.completado} - Fecha: ${fechaTexto}`);
    }
}

// Función para cambiar el estado por índice (mantener compatibilidad)
function cambiarEstado(indice) {
    // Guardar el estado anterior para logging
    const estadoAnterior = tareas[indice].completado;
    
    // Find element by index and change state
    tareas[indice].completado = !tareas[indice].completado;
    
    // Save to localStorage
    guardarTareas();
    
    // Update the list and summary
    actualizarLista();
    guardarTareas(); // Save to localStorage
    
    console.log(`Tarea "${tareas[indice].descripcion}" cambió de ${estadoAnterior} a ${tareas[indice].completado}`);
}

// Función para actualizar el resumen (contadores)
// Esta función se ejecuta cada vez que se agrega, modifica o elimina una tarea
function actualizarResumen() {
    // Contar total de tareas en el arreglo
    const total = tareas.length;
    
    // Filtrar y contar tareas completadas y pendientes
    const realizadas = tareas.filter(tarea => tarea.completado === true).length;
    const pendientes = tareas.filter(tarea => tarea.completado === false).length;
    
    // Actualizar los elementos del DOM con los nuevos valores
    totalTareas.textContent = total;
    tareasPendientes.textContent = pendientes;
    tareasRealizadas.textContent = realizadas;
    
    // Actualizar contadores en la interfaz
    console.log(`Total: ${total}, Pendientes: ${pendientes}, Realizadas: ${realizadas}`);
}

// Mantener la función anterior por compatibilidad (apunta a la nueva función)
function actualizarContadores() {
    actualizarResumen();
}

// Función utilitaria para obtener una tarea por ID
function obtenerTareaPorId(id) {
    return tareas.find(tarea => tarea.id === id);
}

// Función para obtener el índice de una tarea por ID
function obtenerIndicePorId(id) {
    return tareas.findIndex(tarea => tarea.id === id);
}

// Función para mostrar las tareas en consola (recorre el arreglo con for...of)
function mostrarTareas() {
    console.log('Total de tareas:', tareas.length);
    for (const tarea of tareas) {
        const fechaTexto = tarea.fechaRealizacion ? formatearFecha(tarea.fechaRealizacion) : 'Pending';
        console.log(`ID: ${tarea.id} | Descripción: "${tarea.descripcion}" | Completado: ${tarea.completado} | Realizada: ${fechaTexto}`);
    }
}

// Mantener funciones de demostración mínimas solo si son necesarias para el profesor

// Funciones auxiliares simplificadas

// Function to clear all data from localStorage (useful for testing)
function limpiarDatos() {
    if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
        localStorage.removeItem('ashbyNotesTasks');
        localStorage.removeItem('ashbyNotesCounter');
        tareas = [];
        contadorId = 1;
        actualizarLista();
        console.log('All data cleared');
    }
}

// Function to export tasks as JSON
function exportarTareas() {
    const dataStr = JSON.stringify(tareas, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ashby-notes-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    console.log('Tasks exported');
}

// Storage optimization and monitoring functions
function obtenerTamañoStorage() {
    try {
        const tasks = localStorage.getItem('ashbyNotesTasks') || '[]';
        const counter = localStorage.getItem('ashbyNotesCounter') || '1';
        const totalBytes = new Blob([tasks + counter]).size;
        const totalKB = (totalBytes / 1024).toFixed(2);
        console.log(`Storage usage: ${totalBytes} bytes (${totalKB} KB)`);
        return { bytes: totalBytes, kb: totalKB };
    } catch (error) {
        console.error('Error calculating storage size:', error);
        return { bytes: 0, kb: 0 };
    }
}

// Function to clean old completed tasks (keep only recent ones)
function limpiarTareasAntiguas(diasAMantener = 30) {
    if (confirm(`Delete completed tasks older than ${diasAMantener} days?`)) {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - diasAMantener);
        
        const tareasOriginales = tareas.length;
        tareas = tareas.filter(tarea => {
            // Keep pending tasks and recent completed tasks
            if (!tarea.completado) return true;
            if (!tarea.fechaRealizacion) return true;
            return new Date(tarea.fechaRealizacion) > fechaLimite;
        });
        
        const tareasEliminadas = tareasOriginales - tareas.length;
        
        if (tareasEliminadas > 0) {
            guardarTareas();
            actualizarLista();
            console.log(`Cleaned ${tareasEliminadas} old completed tasks`);
            alert(`Cleaned ${tareasEliminadas} old completed tasks`);
        } else {
            alert('No old tasks to clean');
        }
    }
}

// Function to show storage statistics in modal
function mostrarEstadisticasStorage() {
    const stats = obtenerTamañoStorage();
    const pendientes = tareas.filter(t => !t.completado).length;
    const completadas = tareas.filter(t => t.completado).length;
    const total = tareas.length;
    
    // Update modal content
    document.getElementById('statTotalTasks').textContent = total;
    document.getElementById('statPendingTasks').textContent = pendientes;
    document.getElementById('statCompletedTasks').textContent = completadas;
    document.getElementById('statStorageUsed').textContent = `${stats.kb} KB`;
    
    // Calculate estimated capacity
    let estimatedCapacity = '∞';
    if (stats.bytes > 0 && total > 0) {
        const capacityEstimate = Math.floor(5000000 / stats.bytes * total);
        estimatedCapacity = capacityEstimate.toLocaleString();
    }
    document.getElementById('statCapacity').textContent = `${estimatedCapacity} tasks`;
    
    // Update progress bar (assuming 5MB limit)
    const usagePercent = Math.min((stats.bytes / 5000000) * 100, 100);
    document.getElementById('storageProgress').style.width = `${usagePercent}%`;
    
    // Show modal
    document.getElementById('modalEstadisticas').classList.add('show');
    
    // Also log to console for developers
    console.log('=== STORAGE STATISTICS ===');
    console.log(`Total tasks: ${total}`);
    console.log(`Pending: ${pendientes}`);
    console.log(`Completed: ${completadas}`);
    console.log(`Storage used: ${stats.bytes} bytes (${stats.kb} KB)`);
    console.log(`Storage capacity: ~5-10 MB available`);
    console.log(`Estimated capacity: ~${estimatedCapacity} tasks`);
    
    return stats;
}

// Optimized save function with compression check and automatic alerts
function guardarTareasOptimizado() {
    try {
        // Compress data by removing unnecessary whitespace
        const dataComprimida = JSON.stringify(tareas);
        localStorage.setItem('ashbyNotesTasks', dataComprimida);
        localStorage.setItem('ashbyNotesCounter', contadorId.toString());
        
        // Check storage usage after saving and show alerts if needed
        setTimeout(() => verificarAlmacenamiento(), 100);
        
        console.log('Tasks saved (optimized)');
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            // Show critical alert for full storage
            mostrarAlertaAlmacenamiento('critical', 
                '🚨 Storage Full!', 
                'Cannot save more tasks. Clean old tasks immediately.',
                'Clean Now');
            console.error('Storage quota exceeded');
        } else {
            console.error('Error saving tasks:', error);
        }
    }
}

// Replace the original save function
function guardarTareas() {
    guardarTareasOptimizado();
}

// Modal control functions
function cerrarModal() {
    document.getElementById('modalEstadisticas').classList.remove('show');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalEstadisticas');
    if (e.target === modal) {
        cerrarModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Event listeners
btnAgregar.addEventListener('click', agregarTarea);

// Permitir agregar tarea presionando Enter
inputDescripcion.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load tasks from localStorage
    cargarTareas();
    
    // Show initial tasks and update summary
    actualizarLista();
    
    // Check storage usage on load
    setTimeout(() => verificarAlmacenamiento(), 500);
    
    // Focus the input for better user experience
    inputDescripcion.focus();
    
    console.log('Todo List Application started');
    console.log('Initial tasks loaded:', tareas.length);
    mostrarTareas();
});

// Also execute if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        cargarTareas();
        actualizarLista();
        inputDescripcion.focus();
    });
} else {
    // DOM is already loaded
    cargarTareas();
    actualizarLista();
    setTimeout(() => verificarAlmacenamiento(), 500);
    inputDescripcion.focus();
}

// Storage alert thresholds
const STORAGE_THRESHOLDS = {
    WARNING: 2000000,    // 2MB - Yellow warning
    CRITICAL: 3500000,   // 3.5MB - Red alert
    MAXIMUM: 5000000     // 5MB - Browser limit
};

// Function to check storage and show alerts
function verificarAlmacenamiento() {
    const stats = obtenerTamañoStorage();
    const usageBytes = stats.bytes;
    const usagePercent = (usageBytes / STORAGE_THRESHOLDS.MAXIMUM) * 100;
    
    // Remove any existing alerts first
    removeStorageAlert();
    
    if (usageBytes >= STORAGE_THRESHOLDS.CRITICAL) {
        // Critical: Red alert - storage almost full
        mostrarAlertaAlmacenamiento('critical', 
            `🚨 Storage almost full! (${stats.kb} KB used)`, 
            'Your storage is 70%+ full. Clean old tasks to free space.',
            'Clean Now');
    } else if (usageBytes >= STORAGE_THRESHOLDS.WARNING) {
        // Warning: Yellow alert - storage getting full
        mostrarAlertaAlmacenamiento('warning', 
            `⚠️ Storage getting full (${stats.kb} KB used)`, 
            'Consider cleaning old completed tasks.',
            'Clean Old Tasks');
    }
    
    return { usageBytes, usagePercent };
}

// Function to show storage alert banner
function mostrarAlertaAlmacenamiento(type, title, message, buttonText) {
    // Create alert element
    const alert = document.createElement('div');
    alert.id = 'storageAlert';
    alert.className = `storage-alert storage-alert-${type}`;
    
    alert.innerHTML = `
        <div class="alert-content">
            <div class="alert-text">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <div class="alert-actions">
                <button onclick="limpiarTareasAntiguasAutomatico()" class="btn-alert-action">
                    <i class="fas fa-broom"></i> ${buttonText}
                </button>
                <button onclick="removeStorageAlert()" class="btn-alert-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    // Insert after welcome section
    const welcomeSection = document.querySelector('.welcome-section');
    welcomeSection.after(alert);
    
    // Auto-hide warning after 10 seconds (but not critical alerts)
    if (type === 'warning') {
        setTimeout(() => {
            removeStorageAlert();
        }, 10000);
    }
}

// Function to remove storage alert
function removeStorageAlert() {
    const existingAlert = document.getElementById('storageAlert');
    if (existingAlert) {
        existingAlert.remove();
    }
}

// Smart automatic cleanup function
function limpiarTareasAntiguasAutomatico() {
    const completedTasks = tareas.filter(t => t.completado && t.fechaRealizacion);
    
    if (completedTasks.length === 0) {
        alert('No completed tasks to clean!');
        removeStorageAlert();
        return;
    }
    
    // Sort completed tasks by date (oldest first)
    completedTasks.sort((a, b) => new Date(a.fechaRealizacion) - new Date(b.fechaRealizacion));
    
    // Calculate how many to remove (remove 30% of oldest completed tasks)
    const tasksToRemove = Math.max(1, Math.floor(completedTasks.length * 0.3));
    const oldestTasks = completedTasks.slice(0, tasksToRemove);
    
    // Get date range for user confirmation
    const oldestDate = new Date(oldestTasks[0].fechaRealizacion).toLocaleDateString();
    const newestOldDate = new Date(oldestTasks[oldestTasks.length - 1].fechaRealizacion).toLocaleDateString();
    
    const confirmMessage = `Clean ${tasksToRemove} oldest completed tasks?\n\nDate range: ${oldestDate} to ${newestOldDate}`;
    
    if (confirm(confirmMessage)) {
        // Remove the oldest tasks
        const idsToRemove = oldestTasks.map(t => t.id);
        const originalCount = tareas.length;
        
        tareas = tareas.filter(t => !idsToRemove.includes(t.id));
        
        // Save and update
        guardarTareas();
        actualizarLista();
        removeStorageAlert();
        
        const removedCount = originalCount - tareas.length;
        const newStats = obtenerTamañoStorage();
        
        // Show success message
        mostrarMensajeExito(`✅ Cleaned ${removedCount} old tasks! 
        Storage freed: ${newStats.kb} KB remaining`);
        
        console.log(`Automatically cleaned ${removedCount} oldest completed tasks`);
    }
}

// Function to show success message
function mostrarMensajeExito(message) {
    const successAlert = document.createElement('div');
    successAlert.className = 'storage-alert storage-alert-success';
    successAlert.innerHTML = `
        <div class="alert-content">
            <div class="alert-text">
                <strong>${message}</strong>
            </div>
        </div>
    `;
    
    const welcomeSection = document.querySelector('.welcome-section');
    welcomeSection.after(successAlert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successAlert.remove();
    }, 5000);
}
