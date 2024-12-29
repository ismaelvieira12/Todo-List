
import TodoTask from './components/Todo/TodoTask'
import "../src/style/style.css";
import { useState } from 'react';

function App() {
  const [task, setTask] = useState("");
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

    </div>
    
  )
}

export default App
