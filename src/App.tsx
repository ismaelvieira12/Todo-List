
import TodoTask from './components/Todo/TodoTask'
import "../src/style/style.css";
import { useState } from 'react';
import { Itask } from './interfaces';


function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState<Itask[]>([])// inicia um array vazio
  
  const handleClick = () => {
    const idRandom = (num: number) => Math.floor(Math.random() * num); // Cria um numero aleatório para o id


    const newTaskObj = { id: idRandom(9999999), nameTask: task} // ess NewTask faz referência a task da useState String acima
    
    console.log(newTaskObj);
    setTodoList([...todoList, newTaskObj]); // essa newTaskObj faz referência ao objeto criado acima
  }

  function deleteTask (deleteTaskById: number) {
    setTodoList(todoList.filter((taskName) => taskName.id ! == deleteTaskById)
  }
  return (
    
    <div className="App">

      <header>

        <h2 className='title'>Gerenciador de tarefas</h2>

        <input
          type="text" autoComplete="off" 
          placeholder="Adicione uma tarefa" 
          name="task"
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit" onClick={handleClick} className="btn-header">Adicionar tarefa</button>
      </header>

      <div className="line"></div>

      {/* <TodoTask /> */}

      {todoList.map((task, key) => (
        <TodoTask  key={key} task={task} deleteTask={deleteTask}/>
      ))}
    </div>
    
  )
}

export default App
