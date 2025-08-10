document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const buttonAdd = document.getElementById("buttonAdd");

// Тут у нас будут храниться задачи в виде JSON-массива
// Ниже мы будем превращать JSON в HTML
    let tasksJSON = [];

// Укажите ваш ID проекта
    const API_URL = "https://00de97822c6ccace.mokky.dev";

// Получаем JSON-массив задач
    async function fetchTasks() {
        const resp = await fetch(`${API_URL}/users`);

        if (resp.ok) {
            const json = await resp.json();

            return json;
        } else {
            alert("Не удалось получить задачи");
            return [];
        }
    }

// Ренедерим JSON в HTML
    function renderTasks() {
        let html = "";

        // Генерируем HTML-код для вставки в UL
        tasksJSON.forEach((task) => {
            const { id, text } = task;
            html += `<li id="task-${id}">${text} <button onclick="removeTask(${task.id})">X</button></li>`;
        });

        taskList.innerHTML = html;
    }

// Отправляем на сервер задачу и отображаем на странице
    async function addTask() {
        const text = taskInput.value;

        taskInput.value = "";

        const resp = await fetch(`${API_URL}/users`, {
            method: "POST", // 👈 Отправляем именно POST-запрос
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }), // 👈 И передаем сам текст задачи
        });

        if (resp.ok) {
            const newTask = await resp.json();

            // Сохраняем новую задачу в наш массив
            tasksJSON.push(newTask);

            // И сразу рендерим новый список
            renderTasks();
        }
    }

// Удаление задач
    function removeTask(id) {
        if (window.confirm("Удалить задачу?")) {
            tasksJSON = tasksJSON.filter((task) => task.id !== id);

            // Не дожидаясь ответа от сервера, рендерим новый список уже без этой задачи
            renderTasks();

            // И отправляем запрос на удаление уже на сервере

            fetch(`${API_URL}/users/${id}`, {
                // 👈 Указываем ID задачи
                method: "DELETE", // 👈 Отправляем DELETE-запрос
            });
        }
    }

    window.addEventListener("DOMContentLoaded", async () => {
        // При первом рендере запращиваем список задач
        tasksJSON = await fetchTasks();

        // Отображаем задачи
        renderTasks();

        // Вещаем клик на добавление задач
        buttonAdd.addEventListener("click", addTask);
    });

})