
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

        <button type="submit" className="btn-header">Adicionar tarefa</button>
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
