
import {TodoCard} from './todoCard';



export class TodoTask {
	public todoTaskID: number;
	public todoTaskJQuery: JQuery;
	private todoTaskHTML: string;
	public todoTaskDescripion: string;
	public todoTaskStatus: boolean;
	public parentContext: JQuery;
	public todoDate: Date;
	public parentID: number;
	constructor( todoTaskObject ) {
		this.todoTaskID = todoTaskObject.todoTaskID;
		this.todoTaskDescripion = todoTaskObject.taskDescription;
		this.todoTaskStatus = todoTaskObject.todoTaskStatus;
		this.parentID = todoTaskObject.parentID;
		// this.parentContext = todoTaskObject.parentContainer;
		this.todoTaskHTML = this.getTodoTaskHTML();
		this.todoTaskJQuery = $(this.todoTaskHTML);
		this.todoDate = new Date();
	}


	destroy() {
		this.todoTaskID         = null;
		this.todoTaskDescripion = null;
		this.todoTaskStatus     = null;
		this.todoTaskJQuery.remove();
		this.todoTaskJQuery     = null;
	}



	public appendToCardContainer() {
	
		this.parentContext.prepend(this.todoTaskJQuery);
	}

	clickHandler( e ) {
		let target = $(e.target);

	}


	private getTodoTaskHTML(): string{
		let taskChecked = this.todoTaskStatus ? this.todoTaskStatus : '';

		var taskItemHTML: string = 
				`<li class="todoTaskItem taskItemContainer todo--task--item" data-task-id="${this.todoTaskID}">
					<div class="inputGroup">
						<div class="absolutePositionedPrefix">
							<div class="customCheckbox">
								<input type="checkbox" taskChecked  name="task status" 
								class="task--done--status" id="todo--card--task--status${this.todoTaskID}">
								<label for="todo--card--task--status${this.todoTaskID}"></label>
							</div>
						</div>											
						<input type="text" class="inputGroupDescription" name="todo card description" 
						readonly="readonly" value="${this.todoTaskDescripion}">
					</div>
				</li>`;
		

		return taskItemHTML;
	}





	getTaskStatus(){
		return this.todoTaskStatus;
	}

	deleteTodoTask(){}

}