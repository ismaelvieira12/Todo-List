( () => {
    enum NotificationPlatform {
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
    }

    const UUID = (): string => {
        return Math.random().toString(32).substring(2, 9);
    } 

    const DateUtils = {
        today(): Date {
            return;
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
        dateCreated: Date =  new Date();
        dateUpdated: Date = new Date();
        description: string = '';
        
        date: Date = new Date();
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
        dateCreated: Date = new Date();
        dateUpdated: Date = new Date();
        description: string = '';
        
        done: boolean = false;
        constructor(description: string){
            this.description = description;
        }

        render(): string {
            return JSON.stringify(this);
        }
    }

    // Descrição do objeto
    // DONE = é a fleg que marca se ja foi feito ou não
    const todo = new Todo('Tudo criado com classe');

      
    // Para lembrete
    const reminder = new Reminder('Reminder criado com classe', new Date(), [NotificationPlatform.EMAIL])

    // Onde o código se comunica com a interface
    const taskView = {
        // Reder vai receber uma lista, que será os (todos e remindes)
        render(tasks: Array<Task>){
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
        }
    }

    // Para armazenar em memória
    const taskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo, reminder];

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        }
        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    taskController(taskView);
})()