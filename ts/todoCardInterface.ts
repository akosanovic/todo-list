
export interface TodoCardInterface{

	addNewTodoTask();
	appendTodoTaskToCardContainer();
	createTodoCard( e ):void;
	editTodoCard( cardId:number ): void;
	deleteTodoCard( cardID: number ): void;

}