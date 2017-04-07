

export interface ToDoItemList{


	taskItemDeleted( taskId : number ) :void;
	toggleDoneTask( jqueryElement: JQuery, taskId: number, taskCompleated: boolean )
}