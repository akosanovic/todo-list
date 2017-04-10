
import {TodoCard} from './todoCard';



export class TodoTask {

	private todoTaskDescripion: string;
	private todoTaskHTML: string;

	constructor( todoTaskObject, parentConstext ) {

		this.todoTaskHTML = this.taskItemHTML();
		this.todoTaskDescripion = todoTaskObject.taskDescription;
	}


	clickHandler( e ) {
		let target = $(e.target);

	}
	renderTodoTask(){
		
	}

	get taskItemHTML(): string{

		var taskItemHTML: string = 
				`<li class="todoTaskItem taskItemContainer todo--task--item">
					<div class="inputGroup">
						<div class="absolutePositionedPrefix">
							<div class="customCheckbox">
								<input type="checkbox" name="task status" class="task--done--status" id="todo--card--task--status7">
								<label for="todo--card--task--status7"></label>
							</div>
						</div>											
						<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
					</div>
				</li>`;
		

		return taskItemHTML;
	}





	compleateTodTask(){}

	deleteTodoTask(){}

}