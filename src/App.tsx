import TodoTask from './components/Todo/TodoTask';
import "../src/style/style.css";
import { useState } from 'react';
import { Itask } from './interfaces';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState<Itask[]>([]); // Inicia um array vazio
  
  const handleClick = () => {
    const idRandom = (num: number) => Math.floor(Math.random() * num); // Cria um número aleatório para o ID

    const newTaskObj = { id: idRandom(9999999), nameTask: task }; // Objeto da nova tarefa
    
    console.log(newTaskObj);
    setTodoList([...todoList, newTaskObj]); // Adiciona a nova tarefa ao estado

    toast.success("Tarefa adicionada com sucesso!");
  };

  function deleteTask(deleteTaskById: number): void {
    setTodoList(todoList.filter((taskName) => taskName.id !== deleteTaskById)); // Remove a tarefa pelo ID
    toast.error('Tarefa excluida com sucesso.')
  }

  return (
    <div className="App">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


      <header>
        <h2 className="title">Gerenciador de tarefas</h2>

        <input
          type="text"
          autoComplete="off"
          placeholder="Adicione uma tarefa"
          name="task"
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit" onClick={handleClick} className="btn-header">
          Adicionar tarefa
        </button>
      </header>

      <div className="line"></div>

      {todoList.map((task, key) => (
        <TodoTask key={key} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
}

export default App;
