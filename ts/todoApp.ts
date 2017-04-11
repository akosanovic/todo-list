import * as $ from 'jquery';
import {MainTodoCard} from './mainTodoCard';
import {ToDoItem} from './todoItem';
import {ToDoItemList} from './todoItemList';
import {TodoCard} from './todoCard';
import {TodoTask} from './todoTask';
/*
	Adding new task card can be done on enter, clicking on submit button
	Every task is submitted:
		- New task input field is empty and focus is back on it

*/ 


export class todoApp implements ToDoItemList{

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
    todoTask: JQuery = this.pageContainer.find('.todo--task--item');

     
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
		$(document).on( "keypress", this.keypressHandler.bind(this) );
		
		$(document).on("click", this.clickHandler.bind(this));

		$(document).on('focusout', this.focusOutHandler.bind(this))

		this.mainTodoCard = new MainTodoCard ( this.mainTodoCardContainer );
		this.getValueFromLocalStorage();
	}


	// INITIALIZING HANDLERS :: BEGIN
	keypressHandler( e ): void {
		let target: JQuery = $(e.target);

		this.newTaskInputField = this.pageContainer.find('.new--todo--task--description');
		// on enter submit new task
		if(  e.charCode === 13 || e.which === 13 || e.key == 'Enter' ) {
		
			let newTaskInputField:JQuery = target.closest(this.newTaskInputField);	
			if( newTaskInputField.length > 0 ) {
				let todoCardParentContainerID = newTaskInputField.closest('.todo--card--contianer').data('card-id');
				this.newTask( todoCardParentContainerID );
			}
		}
		this.todoCardTitle = this.pageContainer.find('.todo--card--title--input');
		let todoCardTitleFocusOut: JQuery = target.closest(this.todoCardTitle);
		if (todoCardTitleFocusOut.length > 0) {
			let todoCardID: number = todoCardTitleFocusOut.closest('. todo--card--contianer').data('card-id');
			if(todoCardTitleFocusOut.val()){
				let newTitle = todoCardTitleFocusOut.val();
				this.editTodoCard(todoCardID, newTitle);
			}
		}
	}

	clickHandler( e ): void{
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
			
			for (let i = 0; i < todoCardsListLength; i++){				
				if (clickedCardID === this.todoCardObjectList[i].cardID){
					let clickedTodoCardItem: TodoCard = this.todoCardObjectList[i];
					clickedTodoCardItem.clickHandler( e );
				}
			}
		}

		// find card object that was clicked on in the todoTaskObject and call event for that 
		// task card
		let element = target.closest('.to--do--card')
		if (element.length > 0 ){
			let clickedTaskId: number = Number(element.attr('data-task-id'));
			
			for ( let todoTaskObjectProperty in this.todoTaskObject ) {
				let arrayOfTodoTaskObject = this.todoTaskObject[todoTaskObjectProperty]
				
				for ( let i = 0; i < arrayOfTodoTaskObject.length; i++ ) {
					if ( clickedTaskId === arrayOfTodoTaskObject[i].taskId ) {						
						
						let clickedTaskCard: ToDoItem = arrayOfTodoTaskObject[i]
						clickedTaskCard.onClick( e );
					}
				}
			}
		}
	}

	focusOutHandler(e) {
		let target = $(e.target);

		
	}


	// object is updated: 
		// on task submit
		// on task delete
		// when task is changed(text and status)
	todoTaskObject = {
		'todoTasks': [],
		'doneTasks': []
	}

	// Todo Card Object is updated: 
	//  when new is created
	//  when one is deleted
	// 	when one is edited
	todoCardsObject = {
		'todoCardList': []
	}
	todoCardObjectsList = this.todoCardsObject.todoCardList;
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
				'cardTitle': todoCardItem.cardTitle
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
					'parentID': todoTaskItem.parentID
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
				cardTitle: cardItem[i],
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

			this.newTask(taskObject.parentID)
		}
	}
	


	// Todo Card :: BEGIN

	createTodoCard( e ): void {
		e.stopPropagation();

		var newCard = {
			cardID: this.todoCardCounter++,
			cardTitle: ""
		}	
		this.appendTodoCard( newCard );
	}


	appendTodoCard( cardObject ):void {
		let newTodoCard: TodoCard = new TodoCard( cardObject, this );

		this.todoCardObjectList.push(newTodoCard);
		newTodoCard.appendCard(this.todoCardsContainer);
		this.updateLocalStorage();
	}

	editTodoCard( todoCardID: number, todoCardTitle: string ): void {
		for( let i = 0; i < this.todoCardObjectList.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardObjectList[i]
			if ( todoCardID === todoCardItem.cardID ){

				todoCardItem.cardTitle = todoCardTitle;
				debugger
			}
		}
		this.updateLocalStorage();
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
	newTask( parentID ) {
		let newTaskDescription: string = this.newTaskInputField.val();
		
		if (newTaskDescription) {
			this.newTaskInputField.val('');

			var newTask = {
				todoTaskID     : this.taskCounter++,
				todoTaskStatus : false,
				taskDescription: newTaskDescription,
				taskParentID   : parentID
			}	
		}

		var taskObject: TodoTask = new TodoTask(newTask)
		let cardContainer = this.fetchParentContainer(parentID);
		cardContainer.prependNewTodoTask(taskObject);


		this.todoTaskObjectsList.push(taskObject);
		console.log(taskObject);
	}


	fetchUserInput(): string{		

		let newTaskData: string = this.newTaskInputField.val();
		
		if (newTaskData){
			this.newTaskInputField.val('');
			return newTaskData;
		}
	}


	fetchParentContainer( todoCardID: number ): TodoCard {
		for( let i = 0; i < this.todoCardObjectList.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardObjectList[i]
			if ( todoCardID === todoCardItem.cardID ){
				return todoCardItem;
			}
		}
	}
	






	taskItemDeleted( taskId: number) {

		for( let objectElement in this.todoTaskObject ){
			let arrayOfTodoTaskObject = this.todoTaskObject[objectElement]
			
			for( let i = 0; i < arrayOfTodoTaskObject.length; i++ ){
			
				if( taskId === arrayOfTodoTaskObject[i].taskId ){
					arrayOfTodoTaskObject[i].destroy();
					arrayOfTodoTaskObject.splice(i, 1);
					
				}
			}
		}
		this.updateLocalStorage();
	}


























} // Class todoApp :: END


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new todoApp();


})
