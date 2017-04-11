
import {TodoCard} from './todoCard';
import {todoTaskInteface} from './todoTaskInterface';
import {Persistable} from './persistable';

export class TodoTask implements Persistable {
	private parentContext: todoTaskInteface;


	public todoTaskID: number;
	public todoTaskJQuery: JQuery;
	private todoTaskHTML: string;
	public todoTaskDescripion: string;
	public todoTaskStatus: boolean;
	
	public todoDate: Date;
	public parentID: number;


	constructor( todoTaskObject, parentContext ) {
		this.parentContext      = parentContext;
		
		this.todoTaskID         = todoTaskObject.todoTaskID;
		this.todoTaskDescripion = todoTaskObject.taskDescription;
		this.todoTaskStatus     = todoTaskObject.todoTaskStatus;
		this.parentID           = todoTaskObject.parentID;
		
		this.todoTaskHTML   = this.getTodoTaskHTML();
		this.todoTaskJQuery = $(this.todoTaskHTML);
		this.todoDate       = new Date();
	}


	destroy() {
		this.todoTaskID         = null;
		this.todoTaskDescripion = null;
		this.todoTaskStatus     = null;
		this.todoTaskJQuery.remove();
		this.todoTaskJQuery     = null;
	}

	getLocalStorageRepresentation() {
		
	}

	public prependTo( parent: JQuery ): void {
		parent.prepend(this.todoTaskJQuery);
	}

	

	clickHandler( e ) {
		let target = $(e.target);
		

		let checkBocks = this.todoTaskJQuery.find('.task--done--status');
		let checkBocksChecked = target.closest(checkBocks);
		if(checkBocksChecked.length > 0) {
			this.changeTaskStatus();
		}
	}


	private getTodoTaskHTML(): string{
		
		let taskChecked = this.todoTaskStatus ? 'checked' : '';

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

	changeTaskStatus( ){
		let todoTaskContainer: JQuery = this.todoTaskJQuery.find('.todo--task--item');
		todoTaskContainer.addClass('taskChecked');
	}




	getTaskStatus(){
		return this.todoTaskStatus;
	}

	

}