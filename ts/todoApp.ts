import * as $ from 'jquery';
import {MainTodoCard} from './mainTodoCard';
import {ToDoItem} from './todoItem';
import {ToDoItemList} from './todoItemList';
import {TodoCard} from './todoCard';
import {TodoTask} from './todoTask';
import {TodoCardInterface} from './todoCardInterface';
/*
	Adding new task card can be done on enter, clicking on submit button
	Every task is submitted:
		- New task input field is empty and focus is back on it

*/ 


export class todoApp implements TodoCardInterface {

	// data property storing page container
	// visible globally 
    pageContainer: JQuery = $('.page--container');

    // Main Todo Card 
    mainTodoCardContainer: JQuery = this.pageContainer.find('.main--todo--card');
    mainTodoCard: MainTodoCard;

    // add new Todo Card to row 
    mainTodoCardAddCardButton: JQuery = this.pageContainer.find('.floating--button--add--card')


    todoCardsContainer: JQuery = this.pageContainer.find('.todo--cards--row');
    todoCardCounter: number = 0;
    todoCardItem: JQuery;

    todoCardTitle: JQuery;

    // Todo Task List Container
    todoTask: JQuery;

     
    // append new task cards
    todoTaskListContainer: JQuery = this.pageContainer.find('.todo--tasks--container');
    
    // take user value from input field for new task cards
    newTaskInputField: JQuery;      

    // show submit task button on input
    submitNewTask: JQuery = this.pageContainer.find('.submit--new--task--btn');

	todoTasksCardContainer: JQuery = this.pageContainer.find('.todo--tasks--container');
	
	doneTasksCardContainer: JQuery = this.pageContainer.find('.done--tasks--container');

    // counter
    taskCounter: number = 0;

    // todo card not existing on load, defined on duble click
	todoCardElement: JQuery;              

    // data filled on keypress event
	taskInputs: JQuery;




	constructor() {
		// initializing event handlers on document 		
		$(document).on("click", this.clickHandler.bind(this));

		// render new Main Todo Card
		this.mainTodoCard = new MainTodoCard( this.mainTodoCardContainer, this );
		
		// Restore previous session
		this.renderValueFromLocalStorage();
	}


	// INITIALIZING HANDLERS :: BEGIN
	clickHandler( e ): void {
		let target:JQuery = $(e.target);

		// if clicked on Main Todo Card pass evet to Main Cards handler
		let clickedElement = target.closest(this.mainTodoCardContainer);
		if (clickedElement.length > 0) {			
			this.mainTodoCard.clickHandler( e );
		}

		// click on Main Card Add New Card button - creates new Todo Card Object
		let mainTodoCardAddCardButton = this.pageContainer.find('.floating--button--add--card');
		let createNewTodoCardButtonClicked = target.closest(mainTodoCardAddCardButton);
		if (createNewTodoCardButtonClicked.length > 0){
			this.createTodoCard(e);
		}

		// if clicked on Todo Card pass click event to TodoCard click handler
		this.todoCardItem = this.pageContainer.find('.todo--card--contianer');
		let clickedTodoCard: JQuery = target.closest(this.todoCardItem);
		let todoCardsListLength: number = this.todoCardArray.length;
		
		if (clickedTodoCard.length > 0){
			let clickedCardID: number = Number(clickedTodoCard.attr('data-card-id'));
			
			for (let i = 0; i < this.todoCardArray.length; i++){				
				if (clickedCardID === this.todoCardArray[i].cardID){
					let clickedTodoCardItem: TodoCard = this.todoCardArray[i];
					clickedTodoCardItem.clickHandler( e );
				}
			}
		}
	}

	/*

	JSON za todoApp:

	{
		todoCardsCounter: number
		todoCardsArray: [ JSON za todoCard ]

	}

	JSON za todoCard:
	{
		todoTaskCounter: number
		color: string
		title: string
		todoTasks: [ JSON za todoTask ]		
	}

	JSON za todoTask
	{
		id: number
		desciption: string
		done: bool
	}

	*/
	todoCardArray = [];

	// UPDATE LOCAL STORAGE
	getLocalStorageRepresentation(): any {
				
		let todoCardsArray = [];
		
		for(let i = 0; i < this.todoCardArray.length; i++) {
			let cardItem: TodoCard = this.todoCardArray[i];
			// If there are no Tasks in Todo Card remove Card
			if ( cardItem.todoTasksArray.length > 0) {
				todoCardsArray.push(this.todoCardArray[i].getLocalStorageRepresentation());
			}
		}
		return todoCardsArray;
	}

	updateLocalStorage(): void {
		localStorage.clear();
		localStorage.setItem('localStorageObject', JSON.stringify( this.getLocalStorageRepresentation() ));
	}




	getValueFromLocalStorage() { 
		
		if(localStorage.length > 0) {
			let localStorageObject = JSON.parse( localStorage.getItem('localStorageObject'));
			return localStorageObject;
		}
	}

	

	renderValueFromLocalStorage(): any {
		let localStorageObject = this.getValueFromLocalStorage();
		console.log(localStorageObject)
		// reset counters
		this.todoCardCounter = localStorageObject.length;
		let cardObject ;
		
		for(let i = 0; i < localStorageObject.length; i++){
			cardObject = localStorageObject[i]
			this.appendTodoCard(cardObject);
		}	
	}


	getOldestTasksForMainTodoCard (  ) {
		let listOfTaskCards = this.getValueFromLocalStorage();

		let taskCardItem: TodoCard,
			todoTaskArray = [];
		let arrayOfTodoCards = listOfTaskCards;
		for(let i = 0; i < arrayOfTodoCards.length; i++) {
			
			taskCardItem  = arrayOfTodoCards[i];
			todoTaskArray.push(taskCardItem.todoTasksJsons);
		}
		todoTaskArray.sort(this.sortTasksByDate);
		return todoTaskArray;
	}


	sortTasksByDate(task1, task2 ): number {
		
			let date1 = new Date(task1[0].taskDate);
			let date2 = new Date(task2[0].taskDate);

			return date2 - date1;
	}


	// Todo Card :: BEGIN
	createTodoCard( e ): TodoCard {
		e.stopPropagation();

		var newCard = {
			cardID: this.todoCardCounter++,
			cardTitle: "",
			cardHeaderColor: ''
		}	
		return this.appendTodoCard( newCard );
	}


	appendTodoCard( cardObject ): TodoCard {
		let newTodoCard: TodoCard = new TodoCard( cardObject, this );

		this.todoCardArray.push( newTodoCard );

		newTodoCard.appendCard(this.todoCardsContainer);
		this.updateLocalStorage();
		return newTodoCard;
	}
	
	createTodoCardWithTask(e) { 

		let newCard: TodoCard = this.createTodoCard(e);
		newCard.showNewTaskInputContainer();
	}


	editTodoCard( todoCardID: number, todoCardJQuery: JQuery, todoCardTitle: string ): void {
		
		for( let i = 0; i < this.todoCardArray.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardArray[i]
			if ( todoCardID === todoCardItem.cardID ){
				todoCardItem.cardTitle = todoCardTitle;
			}
		}		

		this.updateLocalStorage();
	}


	// remove deleted Card From Card Object list, update local storage
	deleteTodoCard (todoCardID: number): void {
		for( let i = 0; i < this.todoCardArray.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardArray[i]
			if ( todoCardID === todoCardItem.cardID ){
				todoCardItem.destroy();
				this.todoCardArray.splice(i, 1);
			}
		}
		this.updateLocalStorage();
	}






	// CREATE NEW TASK OBJECT
	// newTask() {
	// 	let newTaskDescription: string = this.newTaskInputField.val();
		
	// 	if (newTaskDescription) {
	// 		this.newTaskInputField.val('');

	// 		var newTask = {
	// 			todoTaskID     : this.taskCounter++,
	// 			todoTaskStatus : false,
	// 			taskDescription: newTaskDescription,
	// 			taskParentID   : parentID
	// 		}	
	// 	}

	// 	var taskObject: TodoTask = new TodoTask(newTask, this);
	// 	let cardContainer = this.fetchParentContainer(parentID);
	// 	//taskObject.prependTo(cardContainer.todoTasksListContainer);


	// 	cardContainer.prependNewTodoTask(taskObject);


	// 	this.todoTaskObjectsList.push(taskObject);
	// 	console.log(taskObject);
	// }
	// prependTodoTask( taskObject ){

	// }


	// fetchUserInput(): string{		

	// 	let newTaskData: string = this.newTaskInputField.val();
		
	// 	if (newTaskData){
	// 		this.newTaskInputField.val('');
	// 		return newTaskData;
	// 	}
	// }


	// fetchParentContainer( todoCardID: number ): TodoCard {
	// 	for( let i = 0; i < this.todoCardObjectList.length; i++ ){
			
	// 		let todoCardItem: TodoCard = this.todoCardObjectList[i]
	// 		if ( todoCardID === todoCardItem.cardID ){
	// 			return todoCardItem;
	// 		}
	// 	}
	// }
	// changeTaskStatus(  ) {
	// 	let todoTaskContainer: JQuery = this.pageContainer.find('.todo--task--item');
	// 	todoTaskContainer.addClass('taskChecked');

	// 	this.updateLocalStorage();
	// }



























} // Class todoApp :: END


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new todoApp();


})
