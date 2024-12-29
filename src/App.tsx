
import TodoTask from './components/Todo/TodoTask'
import "../src/style/style.css";
import { useState } from 'react';

interface task {
  id: Number,
  text: String,
}
function App() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<task[]>([])// inicia um array vazio
  
  const handleClick = () => {
    const idRadom = (num: number) => Math.floor(Math.random() * num); // Cria um numero aleatório para o id


    const newTaskObj = { id: idRadom(9999999), newTask: task} // ess NewTask faz referência a task da useState String acima

    setTodoList([...todoList, newTaskObj]); // essa newTaskObj faz referência ao objeto criado acima
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

        <button type="submit" className="btn-header" onClick={handleClick}>Adicionar tarefa</button>
      </header>

      <div className="line"></div>

      <TodoTask />

      {todoList.map(item => (
        <div {...item.id}>
          <div>
            {item.text}
          </div>
        </div>
      ))}
    </div>
    
  )
}

export default App
