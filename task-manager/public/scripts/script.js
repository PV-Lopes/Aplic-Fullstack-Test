const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasksContainer');

// Função para carregar tarefas
async function loadTasks() {
    const response = await fetch('http://localhost:3001/api/tasks');
    const tasks = await response.json();

    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
        `;
        tasksContainer.appendChild(taskItem);
    });
}

// Função para adicionar uma nova tarefa
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    });

    // Limpar o formulário
    taskForm.reset();

    // Recarregar as tarefas
    loadTasks();
});

// Carregar tarefas ao iniciar a página
loadTasks();
