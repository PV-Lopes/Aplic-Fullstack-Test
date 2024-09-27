const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Carregar tarefas do arquivo JSON
let tasks = require("./data/tasks.json");

// Listar tarefas
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// Criar nova tarefa
app.post("/api/tasks", (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
    };

    tasks.push(newTask);

    // Salvar no arquivo JSON
    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
