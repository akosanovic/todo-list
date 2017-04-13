
export interface TodoCardInterface{

	appendTodoTaskToCardContainer();
	fillOldestTaskListContainer();
	deleteTodoCard( cardID: number ): void;
	
	showFloatingButtons( e );
	createTodoCardWithTask( event );
	updateLocalStorage();
}