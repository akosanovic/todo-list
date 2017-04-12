
export interface TodoCardInterface{

	addNewTodoTask();
	appendTodoTaskToCardContainer();
	
	editTodoCard( cardId:number, jqueryElement: JQuery, newTitle: string ): void;
	deleteTodoCard( cardID: number ): void;
	updateLocalStorage();
	
}