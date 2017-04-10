import {TodoCardInterface} from './todoCardInterface';
import {TodoCard} from './todoCard';



export class TodoTask {

	private taskItemDescription: string;
	constructor( taskItemObject, parentConstext ) {

		this.taskItemDescription = taskItemObject.taskDescription;
	}


	clickHandler( e ) {
		let target = $(e.target);

	}

	get taskItemHTML(){

		var taskItemHTML = 
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