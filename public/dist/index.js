"use strict";
(function () {
    var todo = {
        // Descrição do objeto
        // DONE = é a fleg que marca se ja foi feito ou não
        description: 'todo',
        done: false
    };
    // Para lembrete
    var reminder = {
        description: 'reminder',
        date: '22.11.2024'
    };
    // Onde o código se comunica com a interface
    var taskView = {
        // Reder vai receber uma lista, que será os (todos e remindes)
        reder: function (tasks) {
            var taskList = document.querySelector('#tasksList');
            // para limpar os elementos usaremos while
            while (taskList === null || taskList === void 0 ? void 0 : taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            tasks.forEach(function (tasks) {
                var li = document.createElement('li');
                var textNode = document.createTextNode(JSON.stringify(tasks));
                li.appendChild(textNode);
                taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
            });
        }
    };
    // Para armazenar em memória
    var taskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.reder(tasks);
        };
        (_a = document.getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    taskController(taskView);
})();
