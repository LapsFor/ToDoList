let nextId = 1;

class Task {
    constructor(text) {
        this.text = text;
        this.completed = false;
        this.id = nextId++;
    }
}

arrTasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Обработчик события для кнопки добавления задачи
addTaskButton.addEventListener('click', () => {
    const text = taskInput.value;
    if (text === '') return;

    // создаем новую задачу и добавляем ее в массив
    const newTask = new Task(text);
    arrTasks.push(newTask);
    console.log("Tasks:", arrTasks);

    // создаем элемент списка для новой задачи
    const li = document.createElement('li');
    li.textContent = text;
    taskList.appendChild(li);

    // создаем кнопку удаления задачи
    const button = document.createElement('button');
    button.textContent = 'Удалить';
    li.appendChild(button);
    taskInput.value = '';

    // Добавляем обработчик события для кнопки удаления
    button.addEventListener('click', () => {
        li.remove();
        const index = arrTasks.findIndex(task => task.id === newTask.id);
        if (index !== -1) {
        arrTasks.splice(index, 1);
        };
        console.log("Tasks:", arrTasks);
    })

})

