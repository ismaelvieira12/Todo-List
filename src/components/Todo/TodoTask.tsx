
import { Itask } from "../../interfaces";
import "../Todo/todoTask.css"

interface taskProps{
    task: Itask
}

function TodoTask({ task }: taskProps) {
	
	return (
		<div className="card">
			<div>
                <p>{task.nameTask}</p>
            </div>

            <div className="line2" >
            <span className="btn-card">X</span>
            </div>
		</div>
	);
}

export default TodoTask;
