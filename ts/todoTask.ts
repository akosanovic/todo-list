
import {TodoCard} from './todoCard';
import {todoTaskInteface} from './todoTaskInterface';
import {Persistable} from './persistable';



export class TodoTask implements Persistable {
	private parentContext: todoTaskInteface;
	private todoTaskHTML : string;
	
	public todoTaskID        : number;
	private todoTaskJQuery   : JQuery;
	public todoTaskDescripion: string;
	public todoTaskStatus    : boolean;
	
	public taskDate: Date;
	public parentID: number;


	constructor( todoTaskObject, parentContext ) {
		this.parentContext      = parentContext;
		
		this.todoTaskID         = todoTaskObject.todoTaskID;
		this.todoTaskDescripion = todoTaskObject.todoTaskDescripion;
		this.todoTaskStatus     = todoTaskObject.todoTaskStatus;
		this.parentID           = todoTaskObject.parentID;
		this.taskDate       = todoTaskObject.taskDate ? todoTaskObject.taskDate : new Date();


		this.todoTaskHTML   = this.getTodoTaskHTML();
		this.todoTaskJQuery = $(this.todoTaskHTML);
		

		

		this.todoTaskJQuery.on('click', this.clickHandler.bind(this));
	}


	destroy() {
		this.todoTaskID         = null;
		this.todoTaskDescripion = null;
		this.todoTaskStatus     = null;
		this.todoTaskJQuery.remove();
		this.todoTaskJQuery     = null;
	}

	getLocalStorageRepresentation(): any {

		let json = {

			todoTaskID        : this.todoTaskID,
			todoTaskDescripion: this.todoTaskDescripion,
			todoTaskStatus    : this.todoTaskStatus,
			taskDate          : this.taskDate
		}
		return json;
	}

	public prependTo( parentContainer: JQuery): void {
		
		debugger
		this.todoTaskJQuery.prependTo( parentContainer );
		console.log( "element to prepend", this.todoTaskJQuery);
		console.log( "parent", parentContainer )
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
		let randomCheckboxID = Math.floor(Math.random()*1000);


		var taskItemHTML: string = 
				`<li class="todoTaskItem taskItemContainer todo--task--item" data-task-id="${this.todoTaskID}">
					<div class="inputGroup">
						<div class="absolutePositionedPrefix">
							<div class="customCheckbox">
								<input type="checkbox" taskChecked  name="task status" 
								class="task--done--status" id="todo--card--task--status${randomCheckboxID}">
								<label for="todo--card--task--status${randomCheckboxID}"></label>
							</div>
						</div>											
						<input type="text" class="inputGroupDescription" name="todo card description" 
						readonly="readonly" value="${this.todoTaskDescripion}">
					</div>
				</li>`;
		

		return taskItemHTML;
	}

	changeTaskStatus(){

		let todoTaskContainer: JQuery = this.todoTaskJQuery.find('.todo--task--item');
		todoTaskContainer.addClass('taskChecked');
	}




	getTaskStatus(){
		return this.todoTaskStatus;
	}

	

}