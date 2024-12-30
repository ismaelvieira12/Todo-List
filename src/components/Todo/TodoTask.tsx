
import { Itask } from "../../interfaces";
import "../Todo/todoTask.css"

interface taskProps{
    task: Itask,
    deleteTask(deleteTaskById: number): void
}

function TodoTask({ task, deleteTask }: taskProps) {
	
	return (
		<div className="card">
			<div>
                <p>{task.nameTask}</p>
            </div>

            <div className="line2" >
            <span className="btn-card" onClick={() => deleteTask(task.id)}>X</span>
            </div>
		</div>
	);
}

export default TodoTask;
