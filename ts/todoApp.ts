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

		this.mainTodoCard = new MainTodoCard ( this.mainTodoCardContainer );
		this.getValueFromLocalStorage();
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
		let todoCardsListLength: number = this.todoCardObjectList.length;
		
		if (clickedTodoCard.length > 0){
			let clickedCardID: number = Number(clickedTodoCard.attr('data-card-id'));
			
			for (let i = 0; i < this.todoCardObjectList.length; i++){				
				if (clickedCardID === this.todoCardObjectList[i].cardID){
					let clickedTodoCardItem: TodoCard = this.todoCardObjectList[i];
					clickedTodoCardItem.clickHandler( e );
				}
			}
		}



		// // find card object that was clicked on in the todoTaskObject and call event for that 
		// // task card
		// let element = target.closest('.to--do--card')
		// if (element.length > 0 ){
		// 	let clickedTaskId: number = Number(element.attr('data-task-id'));
			
		// 	for ( let todoTaskObjectProperty in this.todoTaskObject ) {
		// 		let arrayOfTodoTaskObject = this.todoTaskObject[todoTaskObjectProperty]
				
		// 		for ( let i = 0; i < arrayOfTodoTaskObject.length; i++ ) {
		// 			if ( clickedTaskId === arrayOfTodoTaskObject[i].taskId ) {						
						
		// 				let clickedTaskCard: ToDoItem = arrayOfTodoTaskObject[i]
		// 				clickedTaskCard.onClick( e );
		// 			}
		// 		}
		// 	}
		// }



		// If clicked on todo task pass click event to TodoTask Card
		this.todoTask = this.pageContainer.find('.todo--task--item');
		let todoTaskClicked: JQuery = target.closest(this.todoTask);
		if (todoTaskClicked.length > 0) {
			let todoTaskID: number = Number(todoTaskClicked.attr('data-task-id'));
			for(let i = 0; i < this.todoTaskObjectsList.length;  i++){
				

				let todoTaskItem: TodoTask = this.todoTaskObjectsList[i];
				if(todoTaskID === todoTaskItem.todoTaskID) {
					this.todoTaskObjectsList[i].clickHandler( e );
					console.log(todoTaskItem);
				}
			}
		}
	}


	// Todo Card Object is updated: 
	//  when new is created
	//  when one is deleted
	// 	when one is edited

	
	todoObject = {
		'todoCardList': [],
		'todoTaskList': []
	}


	todoCardObjectList = this.todoObject.todoCardList;
	todoTaskObjectsList = this.todoObject.todoTaskList;

	localStorageObject = {
		cardCounter: 0,
		cardArray: [],

		taskCounter  : 0,
		taskArray: []
	}





	updateLocalStorage(): void{

		localStorage.clear();
		this.localStorageObject.cardCounter = 0;
		this.localStorageObject.cardArray = [];
		this.localStorageObject.taskArray = [];
		this.localStorageObject.taskCounter= 0;


		this.localStorageObject.cardCounter = this.todoCardCounter;
		for(let i = 0; i < this.todoCardObjectList.length; i++){
			let todoCardItem: TodoCard = this.todoCardObjectList[i];
			let todoCardObject = {
				'cardID': todoCardItem.cardID,
				'cardTitle': todoCardItem.cardTitle,
				'cardHeaderColor': todoCardItem.cardHeaderColor
			}

			this.localStorageObject.cardArray.push(todoCardObject);
		}


		this.localStorageObject.taskCounter = this.taskCounter;
		for( let i = 0; i < this.todoTaskObjectsList.length; i++ ){

			
			let todoTaskItem: TodoTask = this.todoTaskObjectsList[i];
			if( !todoTaskItem.todoTaskStatus) {
				

				let todoTaskObject = {
					'todoTaskID': todoTaskItem.todoTaskID,
					'todoTaskDescripion': todoTaskItem.todoTaskDescripion,
					'todoTaskStatus': false,
					'parentID': todoTaskItem.parentID,
					'todoDate': todoTaskItem.todoDate
				}
			}
			this.localStorageObject.taskArray.push(todoTaskItem);
		}
		localStorage.setItem('localStorageObject', JSON.stringify(this.localStorageObject));
	}




	getValueFromLocalStorage(): void {

		if(localStorage.length > 0) {
			let localStorageObject = JSON.parse(localStorage.getItem('localStorageObject'));

			this.renderValueFromLocalStorage(localStorageObject);
		}
	}
	

	renderValueFromLocalStorage(localStorageObject): any {
		// reset counters
		this.todoCardCounter = localStorageObject.cardArray.length;
		for(let i = 0; i < localStorageObject.cardArray.length; i++) {
			let cardItem = localStorageObject.cardArray[i];
			

			let newCard = {
				cardID: i,
				cardTitle: cardItem.cardTitle,
				cardHeaderColor: cardItem.cardHeaderColor
			}

			this.appendTodoCard(newCard);
		}
		// reseting counter
		this.taskCounter = localStorageObject.taskArray.length;
		for(let i = 0; i < localStorageObject.taskArray.length; i++){
			let taskItem = localStorageObject.taskArray[i];
			let taskObject = {
				'todoTaskID': i,
				'todoTaskDescripion': taskItem.todoTaskDescripion,
				'todoTaskStatus': false,
				'parentID': taskItem.parentID
			}

			this.prependTodoTask(taskObject);
		}
	}
	


	// Todo Card :: BEGIN

	createTodoCard( e ): void {
		e.stopPropagation();

		var newCard = {
			cardID: this.todoCardCounter++,
			cardTitle: "",
			cardHeaderColor: ''
		}	
		this.appendTodoCard( newCard );
	}


	appendTodoCard( cardObject ):void {
		console.log(cardObject);
		let newTodoCard: TodoCard = new TodoCard( cardObject, this );

		this.todoCardObjectList.push(newTodoCard);
		newTodoCard.appendCard(this.todoCardsContainer);
		this.updateLocalStorage();
	}

	editTodoCard( todoCardID: number, todoCardJQuery: JQuery, todoCardTitle: string ): void {
		console.log("Gode are you there");
		for( let i = 0; i < this.todoCardObjectList.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardObjectList[i]
			if ( todoCardID === todoCardItem.cardID ){

				todoCardItem.cardTitle = todoCardTitle;
				console.log("passed value", todoCardItem.cardTitle);
			}
		}
		
		this.updateLocalStorage();
		console.log(localStorage);
	}


	// remove deleted Card From Card Object list, update local storage
	deleteTodoCard (todoCardID: number): void {
		for( let i = 0; i < this.todoCardObjectList.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardObjectList[i]
			if ( todoCardID === todoCardItem.cardID ){
				console.log(todoCardItem);
				todoCardItem.destroy();
				this.todoCardObjectList.splice(i, 1);
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




















} // Class todoApp :: END


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new todoApp();


})
