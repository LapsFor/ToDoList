let nextId = 1;

class Task {
    constructor(text) {
        this.text = text;
        this.completed = false;
        this.id = nextId++;
        this.startDate = new Date();
        this.endDate = null;
    }
}

let arrTasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Обработчик события для кнопки добавления задачи
addTaskButton.addEventListener('click', () => {
    const text = taskInput.value;
    if (text === '') return;

    // Создаем новую задачу и добавляем ее в массив
    const newTask = new Task(text);
    arrTasks.push(newTask);
    console.log("Tasks:", arrTasks);

    // Создаем элемент списка для новой задачи
    const li = document.createElement('li');

    // Оборачиваем текст в span, чтобы его можно было зачеркнуть
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    li.appendChild(textSpan);

    // Создаем контейнер для правой части (дата + кнопки)
    const rightBox = document.createElement('div');
    rightBox.style.display = 'flex';
    rightBox.style.alignItems = 'center';
    rightBox.style.gap = '5px'; // Добавит небольшой отступ между кнопками

    const dateSpan = document.createElement('small');
    dateSpan.textContent = '(' + newTask.startDate.toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    }) + ')';
    rightBox.appendChild(dateSpan);

    // Кнопка завершения задачи (обычно логичнее ставить её ПЕРЕД удалением)
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    completeButton.className = 'btn btn-outline-success rounded-circle d-flex justify-content-center align-items-center';
    completeButton.style.width = '32px';
    completeButton.style.height = '32px';
    completeButton.style.padding = '0';
    rightBox.appendChild(completeButton);

    // Кнопка удаления задачи
    const delbutton = document.createElement('button');
    delbutton.innerHTML = '<i class="bi bi-trash"></i>';
    delbutton.className = 'btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center';
    delbutton.style.width = '32px';
    delbutton.style.height = '32px';
    delbutton.style.padding = '0';
    rightBox.appendChild(delbutton);

    // Очищаем инпут и собираем карточку
    taskInput.value = '';
    li.appendChild(rightBox);
    taskList.appendChild(li);

    // 1. Обработчик для кнопки удаления
    delbutton.addEventListener('click', () => {
        li.remove();
        const index = arrTasks.findIndex(task => task.id === newTask.id);
        if (index !== -1) {
            arrTasks.splice(index, 1);
        };
        console.log("Tasks:", arrTasks);
    }); // <-- Закрываем обработчик удаления здесь!

    // 2. Обработчик для кнопки выполнения
    completeButton.addEventListener('click', () => {
        const index = arrTasks.findIndex(task => task.id === newTask.id);
        if (index !== -1) {
            arrTasks[index].completed = !arrTasks[index].completed;

            if (arrTasks[index].completed) {
                // ЗАДАЧА ВЫПОЛНЕНА:
                textSpan.style.textDecoration = 'line-through';
                textSpan.style.color = 'gray';

                // Меняем иконку на крестик
                completeButton.innerHTML = '<i class="bi bi-x-lg"></i>';
                // Заменяем зеленый класс на красный
                completeButton.classList.replace('btn-outline-success', 'btn-outline-danger');
                arrTasks[index].endDate = new Date();

            } else {
                // ЗАДАЧУ ВЕРНУЛИ В РАБОТУ:
                textSpan.style.textDecoration = 'none';
                textSpan.style.color = 'black';

                // Возвращаем иконку галочки
                completeButton.innerHTML = '<i class="bi bi-check-lg"></i>';
                // Заменяем красный класс обратно на зеленый
                completeButton.classList.replace('btn-outline-danger', 'btn-outline-success');
                arrTasks[index].endDate = null;
            }
        };
        console.log("Tasks:", arrTasks);
    });

})