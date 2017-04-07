import {DailyToDoCard} from './dailyToDoCard';
import {ToDoItemList} from './todoItemList';




export class ToDoItem {
	private parentContext  : ToDoItemList;

	private taskDescription: string;
	private taskId         : number;
	private htmlContent    : string;
	private jqueryElement  : JQuery;
	private taskCompleted  : boolean;

	constructor( taskObject, parentContext ) {
		this.parentContext   = parentContext;
		this.taskId          = taskObject.id;
		this.taskDescription = taskObject.taskDescription;
		this.taskCompleted   = taskObject.done;
		
		
		this.htmlContent     = this.getHtml();
		this.jqueryElement   = $(this.htmlContent)

	}

	destroy() {
		this.taskId          = null;
		this.taskDescription = null;
		this.htmlContent     = null;
		this.jqueryElement.remove();
		this.jqueryElement   = null;
	}

	public appendTo(parent: JQuery): void {
		parent.append(this.jqueryElement);
	}



	private getHtml(): string {

		var checkedAttr = this.taskCompleted ? "checked" : ""

		var toDoCardHTML = 
				`<li class='toDoCard to--do--card' draggable="true" data-task-id="`+ this.taskId +`"'>
					<div class='taskStatus'>
						<input type='checkbox' class="task--done--status" name='taskStatus' ${checkedAttr}>
					</div>


					<div class='taskDescription'>
						<input type='text' class='taskDescriptionInput to--do--task--input' name='taskDescription' disabled value = \"` + this.taskDescription + `\">
						<div class='cardModifyBtnContainer card--modify--btn'>
							<i class='fa fa-times item--delete--button' aria-hidden='true' ></i>
						</div>
					</div>
				</li> `

		return toDoCardHTML;
	}


	public onClick( e ): void{

		var target = $(e.target)


		let element: JQuery = target.closest('.item--delete--button')
		if (element.length > 0){

			this.parentContext.taskItemDeleted(this.taskId);
		}
		

		let checkboxClicked = target.closest('.task--done--status');
		if(checkboxClicked.length > 0){

			if(checkboxClicked.is(':checked')){
				this.taskCompleted = true;
				this.parentContext.toggleDoneTask(this.jqueryElement, this.taskId, this.taskCompleted);
			}
			else{
				this.taskCompleted = false;
				this.parentContext.toggleDoneTask(this.jqueryElement, this.taskId, this.taskCompleted);
			}
		}
	}



	public getTaskId() {
		return this.taskId;
	}

	public getTaskDescription() {
		return this.taskDescription;
	}
	public getTaskStatus(){
		return this.taskCompleted;
	}




}

