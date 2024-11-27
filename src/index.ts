( () => {
    interface Task {
        id: string;
        dateCreated: Date;
        dateUpdated: Date;
        description: string;
        render(): string;
    }
    class Reminder implements Task{
        id: string = '';
        dateCreated: Date =  new Date();
        dateUpdated: Date = new Date();
        description: string = '';
        
        date: Date = new Date();
        notifications: Array<string> = ['EMAIL'];
        
        constructor(description: string, date: Date, notifications: Array<string>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return JSON.stringify(this);
        }
    }

    class Todo implements Task{
        id: string = '';
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
    const reminder = new Reminder('Reminder criado com classe', new Date(), ['EMAIL'])

    // Onde o código se comunica com a interface
    const taskView = {
        // Reder vai receber uma lista, que será os (todos e remindes)
        reder(tasks: Array<Task>){
            const taskList = document.querySelector('#tasksList');  

            // para limpar os elementos usaremos while
            while(taskList?.firstChild){
                taskList.removeChild(taskList.firstChild); 
            }

            tasks.forEach((tasks) => {
                const li = document.createElement('li');    
                const textNode = document.createTextNode(tasks.render());
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
            view.reder(tasks);
        }
        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    taskController(taskView);
})()