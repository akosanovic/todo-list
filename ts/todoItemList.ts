

export interface ToDoItemList{


	taskItemDeleted( taskId         : number ) :void;
	// moveTaskToDone(  jqueryElement  : JQuery, taskId: number);
	// moveTaskToTodoList(jqueryElement: JQuery, taskId: number);
	toggleDoneTask( jqueryElement: JQuery, taskId: number, taskCompleated: boolean )
}