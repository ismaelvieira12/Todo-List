"use strict";
(function () {
    var NotificationPlatform;
    (function (NotificationPlatform) {
        NotificationPlatform["SMS"] = "SMS";
        NotificationPlatform["EMAIL"] = "EMAIL";
        NotificationPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlatform || (NotificationPlatform = {}));
    var ViewMode;
    (function (ViewMode) {
        ViewMode["TODO"] = "TODO";
        ViewMode["REMINDER"] = "REMINDER";
    })(ViewMode || (ViewMode = {}));
    var UUID = function () {
        return Math.random().toString(32).substring(2, 9);
    };
    var DateUtils = {
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today: function () {
            return new Date();
        },
        formatDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
        }
    };
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.date = DateUtils.tomorrow();
            this.notifications = [NotificationPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Reminder.prototype.render = function () {
            return "\n            description: ".concat(this.description, "\n            date: ").concat(DateUtils.formatDate(this.date), "\n            platform: ").concat(this.notifications.join(','));
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return "\n            description: ".concat(this.description, "\n            done: ").concat(this.done, "\n            ");
        };
        return Todo;
    }());
    // Descrição do objeto
    // DONE = é a fleg que marca se ja foi feito ou não
    var todo = new Todo('Tudo criado com classe');
    // Para lembrete
    var reminder = new Reminder('Reminder criado com classe', new Date(), [NotificationPlatform.EMAIL]);
    // Onde o código se comunica com a interface
    var taskView = {
        // Reder vai receber uma lista, que será os (todos e remindes)
        render: function (tasks) {
            var taskList = document.getElementById('tasksList');
            // para limpar os elementos usaremos while
            while (taskList === null || taskList === void 0 ? void 0 : taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement('li');
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
            });
        }
    };
    // Para armazenar em memória
    var taskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var mode = ViewMode.TODO;
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks, mode);
        };
        var handleToggleMode = function () {
            switch (mode) {
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER;
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO;
                    break;
            }
            view.render(tasks, mode);
        };
        (_a = document.getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    taskController(taskView);
})();
