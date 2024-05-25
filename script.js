document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const randomizeTasksBtn = document.getElementById('randomizeTasksBtn');
    const taskList = document.getElementById('taskList');
    const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    let tasks = [];

    addTaskBtn.addEventListener('click', () => {
        document.querySelector('.task-input').classList.toggle('active');
    });

    saveTaskBtn.addEventListener('click', () => {
        const taskName = document.getElementById('taskName').value;

        if (taskName) {
            const task = { name: taskName };
            tasks.push(task);
            renderTasks();
            clearInputs();
        } else {
            alert('Por favor ingresa un nombre para la tarea');
        }
    });

    randomizeTasksBtn.addEventListener('click', () => {
        randomizeSchedule();
        tasks = []; // Limpiar las tareas después de generar el horario
        renderTasks(); // Actualizar la lista de tareas en pantalla
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.name}</span>
                <button class="deleteTaskBtn">Eliminar</button>
            `;
            taskItem.querySelector('.deleteTaskBtn').addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
            });
            taskList.appendChild(taskItem);
        });
    }

    function randomizeSchedule() {
        clearSchedule();
        const shuffledTasks = shuffleArray([...tasks]);

        shuffledTasks.forEach(task => {
            const day = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
            const timeSlot = generateRandomTimeSlot();
            const dayElement = document.getElementById(day).querySelector('ul');

            const scheduleItem = document.createElement('li');
            scheduleItem.innerHTML = `
                <span>${task.name} (${timeSlot})</span>
                <button class="deleteTaskBtn">Eliminar</button>
            `;
            scheduleItem.querySelector('.deleteTaskBtn').addEventListener('click', () => {
                dayElement.removeChild(scheduleItem);
            });
            dayElement.appendChild(scheduleItem);
        });
    }

    function clearSchedule() {
        daysOfWeek.forEach(day => {
            const dayElement = document.getElementById(day).querySelector('ul');
            dayElement.innerHTML = '';
        });
    }

    function generateRandomTimeSlot() {
        const startHour = Math.floor(Math.random() * 9) + 8; // Genera una hora entre las 8 AM y las 5 PM
        const endHour = startHour + 1;
        return `${startHour}:00 - ${endHour}:00`;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function clearInputs() {
        document.getElementById('taskName').value = '';
    }
});
