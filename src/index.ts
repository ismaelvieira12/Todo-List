( () => {
    enum NotificationPlatform {
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
    }

    enum ViewMode {
        TODO = 'TODO',
        REMINDER = 'REMINDER',   
    }

    const UUID = (): string => {
        return Math.random().toString(32).substring(2, 9);
    } 

    const DateUtils = {
        tomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow
        },

        today(): Date {
            return new Date();
        },

        formatDate (date: Date): string {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
    }

    interface Task {
        id: string;
        dateCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    }
    class Reminder implements Task{
        id: string = UUID()
        dateCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = '';
        
        date: Date = DateUtils.tomorrow();
        notifications: Array<NotificationPlatform> = [NotificationPlatform.EMAIL];
        
        constructor(description: string, date: Date, notifications: Array<NotificationPlatform>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return `
            description: ${this.description}
            date: ${DateUtils.formatDate(this.date)}
            platform: ${this.notifications.join(',')}`;
        }
    }

    class Todo implements Task{
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = '';
        
        done: boolean = false;
        constructor(description: string){
            this.description = description;
        }

        render(): string {
            return `
            description: ${this.description}
            done: ${this.done}
            ` 
        }
    }

    // Descrição do objeto
    // DONE = é a fleg que marca se ja foi feito ou não
    const todo = new Todo('Tudo criado com classe');

      
    // Para lembrete
    const reminder = new Reminder('Reminder criado com classe', new Date(), [NotificationPlatform.EMAIL])

    // Onde o código se comunica com a interface
    const taskView = {
        // Para gravar oque foi digitado
        getTodo(form: HTMLFormElement): Todo {
            const todoDescription = form.todoDescription.value;
            form.reset();
            return new Todo(todoDescription);
        },
        getReminder(form: HTMLFormElement): Reminder{
            const reminderNotifications = [
                form.notifications.value as NotificationPlatform,
            ];
            const reminderDate = new Date(form.reminderDate.value);
            const reminderDescription = form.reminderDescription.value;

            form.reset();
            return new Reminder(
                reminderDescription,
                reminderDate,
                reminderNotifications
            );
        },
        // Reder vai receber uma lista, que será os (todos e remindes)
        render(tasks: Array<Task>, mode: ViewMode){
            const taskList = document.getElementById('tasksList');  

            // para limpar os elementos usaremos while
            while(taskList?.firstChild){
                taskList.removeChild(taskList.firstChild); 
            }

            tasks.forEach((task) => {
                const li = document.createElement('li');    
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList?.appendChild(li)       
            });

            const todoSet = document.getElementById('todoSet');
            const reminderSet = document.getElementById('reminderSet');
            // Validando com IF

            if(mode === ViewMode.TODO){
                todoSet?.setAttribute('style', 'display: block');
                todoSet?.removeAttribute('disabled');
                reminderSet?.setAttribute('style', 'display: none');
                reminderSet?.setAttribute('disabled', 'true');
            }else{
                reminderSet?.setAttribute('style', 'display: block');
                reminderSet?.removeAttribute('disabled');
                todoSet?.setAttribute('style', 'display: none');
                todoSet?.setAttribute('disabled', 'true');
            }

        }
    }

    // Para armazenar em memória
    const taskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [];
        let mode: ViewMode = ViewMode.TODO;

        const handleEvent = (event: Event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            switch(mode as ViewMode){
                case ViewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case ViewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };


        const handleToggleMode = () => {
            switch(mode as ViewMode){
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER;
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO;
                    break;
            }
            view.render(tasks, mode)
        };
        document.getElementById('toggleMode')?.addEventListener('click', handleToggleMode);

        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    taskController(taskView);
})()