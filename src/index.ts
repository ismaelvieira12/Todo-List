( () => {
    const todo ={
        // Descrição do objeto
        // DONE = é a fleg que marca se ja foi feito ou não

        description: 'todo',
        done: false
    }
        // Para lembrete
    const reminder = {
        description: 'reminder',
        date: '22.11.2024'
    }

    // Onde o código se comunica com a interface
    const taskView = {
        // Reder vai receber uma lista, que será os (todos e remindes)
        reder(tasks: Array<Object>){
            const taskList = document.querySelector('#tasksList');  

            // para limpar os elementos usaremos while
            while(taskList?.firstChild){
                taskList.removeChild(taskList.firstChild); 
            }

            tasks.forEach((tasks) => {
                const li = document.createElement('li');    
                const textNode = document.createTextNode(JSON.stringify(tasks));
                li.appendChild(textNode);
                taskList?.appendChild(li)       
            });
        }
    }

    // Para armazenar em memória
    const taskController = (view: typeof taskView) => {
        const tasks: Array<Object> = [todo, reminder];

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.reder(tasks);
        }
        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    taskController(taskView);
})()