
export interface TodoCardInterface{

	createTodoTask();
	appendTodoTaskToCardContainer();
	createTodoCard( e ):void;
	editTodoCard( cardId:number ): void;
	deleteTodoCard( cardID: number ): void;

}