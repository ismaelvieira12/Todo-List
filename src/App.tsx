
import TodoTask from './components/Todo/TodoTask'
import "../src/style/style.css";

function App() {

  return (
    
    <div className="App">

      <header>

        <h2 className='title'>Gerenciador de tarefas</h2>

        <input
          type="text" autoComplete="off" 
          placeholder="Adicione uma tarefa" 
          name="task"
          className="input"
        />

        <button type="submit" className="btn-header">Adicionar tarefa</button>
      </header>

      <div className="line"></div>

      <TodoTask />

    </div>
    
  )
}

export default App
