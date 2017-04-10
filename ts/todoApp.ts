import * as $ from 'jquery';
import {MainTodoCard} from './mainTodoCard';
import {ToDoItem} from './todoItem';
import {ToDoItemList} from './todoItemList';
import {TodoCard} from './todoCard';

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

    // Todo Task List Container
    todoTask: JQuery = this.pageContainer.find('.todo--task--item');

     
    // append new task cards
    todoTaskListContainer: JQuery = this.pageContainer.find('.todo--tasks--container');
    
    // take user value from input field for new task cards
    newTaskInputField: JQuery = this.pageContainer.find('.new--task--input');      

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
		
		// display submit new task button
		$(document).on( 'input', this.inputHandler.bind(this) );


		$(document).on("click", this.clickHandler.bind(this));

		// remove disabled property from todo(uncopleated cards)
		$(document).on("dblclick", this.doubleClickHandler.bind(this));

		this.mainTodoCard = new MainTodoCard ( this.mainTodoCardContainer );

		this.getValueFromLocalStorage();
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


	localStorageObject = {
		cardCounter: 0,
		cardArray: [],

		counter  : 0,
		taskArray: []
	}





	updateLocalStorage(): void{

		localStorage.clear();
		this.localStorageObject.cardCounter = 0;
		this.localStorageObject.cardArray = [];
		this.localStorageObject.taskArray = [];
		this.localStorageObject.counter   = 0;


		this.localStorageObject.cardCounter = this.todoCardCounter;
		for(let i = 0; i < this.todoCardObjectsList.length; i++){
			let todoCardItem: TodoCard = this.todoCardObjectsList[i];
			let todoCardObject = {
				'cardID': todoCardItem.cardID,
				'cardTitle': todoCardItem.cardTitle
			}
			this.localStorageObject.cardArray.push(todoCardObject);
		}


		// for(let todoTaskObjectProperty in this.todoTaskObject) {

		// 	let arrayOfTaskObject = this.todoTaskObject[ todoTaskObjectProperty ]
		// 	if( arrayOfTaskObject.length > 0 ) {
		// 		for( let i = 0; i < arrayOfTaskObject.length; i++ ) {
		// 			var todoTaskObject  = arrayOfTaskObject[i];


		// 			var taskJSON = {
		// 				taskId         : todoTaskObject.taskId,
		// 				taskDescription: todoTaskObject.taskDescription,
		// 				taskCompleted  : todoTaskObject.taskCompleted
		// 			}
		// 			this.localStorageObject.taskArray.push(taskJSON);
		// 		}
		// 	}			
		// }
		// this.localStorageObject.counter = this.taskCounter;
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
		let localStorageItem;

		for (let i = 0; i < localStorageObject.taskArray.length; i++) {
			localStorageItem = localStorageObject.taskArray[i];

			let newTask = {
				id             : i,
				taskDescription: localStorageItem.taskDescription,
				done           : localStorageItem.taskCompleted
			}	

			// adds element to todoTaskObject
			// displays it on sceen
			this.appendNewTaskToCardContainer(newTask);
		}
	}


	// INITIALIZING HANDLERS :: BEGIN
	keypressHandler( e ): void {
		let target: JQuery = $(e.target);


		// on enter submit new task
		if(  e.charCode === 13 || e.which === 13 || e.key == 'Enter' ) {
		
			let newTaskInputField = target.closest(this.newTaskInputField);	
			if( newTaskInputField.length > 0 ) {
				this.createNewTask();
			}

			// when using tab to move to submit button
			let submitButton = target.closest(this.submitNewTask);
			if (submitButton.length > 0) {
				this.createNewTask();
			}
		}
	}


	inputHandler( e ): void {
		let target: JQuery = $(e.target);
		
		let element = target.closest(this.newTaskInputField);		
		if (element.length > 0){
			this.toggleSubmitButton();
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
		let todoCardsListLength: number = this.todoCardObjectsList.length;
		
		if (clickedTodoCard.length > 0){
			let clickedCardID: number = Number(clickedTodoCard.attr('data-card-id'));
			
			for (let i = 0; i < todoCardsListLength; i++){				
				if (clickedCardID === this.todoCardObjectsList[i].cardID){
					let clickedTodoCardItem: TodoCard = this.todoCardObjectsList[i];
					clickedTodoCardItem.clickHandler( e );
				}
			}
		}


		
		// submit user input to the new card
		let submitButton = target.closest(this.submitNewTask);
		if(submitButton.length > 0){
			this.createNewTask();
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

	

	doubleClickHandler(e): void{		
		let target: JQuery = $(e.target);
		
		this.todoCardElement = this.pageContainer.find('.to--do--card');
		let todoCardElement  : JQuery = target.closest(this.todoCardElement);

		if(todoCardElement.length > 0 ){
			todoCardElement.find('.to--do--task--input').prop('disabled', false);
		}
	}// INITIALIZING HANDLERS :: END






	// CREATE NEW TASK OBJECT
	createNewTask(){
		let newTaskDescription: string = this.newTaskInputField.val();
		
		if (newTaskDescription) {
			this.newTaskInputField.val('');

			var newTask = {
				id             : this.taskCounter++,
				taskDescription: newTaskDescription,
				done           : false
			}				

			this.appendNewTaskToCardContainer( newTask );
			this.toggleSubmitButton();		
			
		}
	}
	fetchUserInput(): string{		

		let newTaskData: string = this.newTaskInputField.val();
		
		if (newTaskData){
			this.newTaskInputField.val('');
			return newTaskData;
		}
	}
	appendNewTaskToCardContainer ( newTask ): void {

		var item: ToDoItem = new ToDoItem(newTask, this);
		if(item.getTaskStatus()){

			item.appendTo(this.doneTasksCardContainer);
			this.todoTaskObject['doneTasks'].push(item)
		}
		else{
			item.appendTo(this.todoTaskListContainer);
			this.todoTaskObject['todoTasks'].push( item );
		}
		
		this.updateLocalStorage();
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

		this.todoCardsObject['todoCardList'].push(newTodoCard);
		newTodoCard.appendCard(this.todoCardsContainer);
		this.updateLocalStorage();
	}

	editTodoCard( todoCardID: number, todoCardTitle: string ): void {
		for( let i = 0; i < this.todoCardObjectsList.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardObjectsList[i]
			if ( todoCardID === todoCardItem.cardID ){
				console.log(todoCardItem);
			}
		}
		this.updateLocalStorage();
	}


	// remove deleted Card From Card Object list, update local storage
	deleteTodoCard (todoCardID: number): void {
		for( let i = 0; i < this.todoCardObjectsList.length; i++ ){
			
			let todoCardItem: TodoCard = this.todoCardObjectsList[i]
			if ( todoCardID === todoCardItem.cardID ){
				console.log(todoCardItem);
				todoCardItem.destroy();
				this.todoCardObjectsList.splice(i, 1);
			}
		}
		this.updateLocalStorage();
	}

	// findTodoCardObjectByID( todoCardID: number ): TodoCard {
	// 	let todoCardObject: TodoCard;

	// 	for( let i = 0; i < this.todoCardObjectsList.length; i++ ){
			
	// 		let todoCardObject: TodoCard = this.todoCardObjectsList[i]
	// 		if ( todoCardID === todoCardObject.cardID ){
	// 			return todoCardObject;
	// 		}
	// 	}
	// }
	// Todo Card :: END


	// show/hide buton if New Task input has value
	toggleSubmitButton(): void{
		
		let inputValue = this.newTaskInputField.val();
			
		if (inputValue.length > 0){
			this.submitNewTask.addClass('showSubmitNewTaskButton');
		}
		else{
			this.submitNewTask.removeClass('showSubmitNewTaskButton');
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



	toggleDoneTask(jQueryElement: JQuery, taskId: number, taskCompleted: boolean ): void {
		let todoList     = this.todoTaskObject['todoTasks'];
		let doneTaskList = this.todoTaskObject['doneTasks'];
		let removedObject;
		
		if (taskCompleted) {
			jQueryElement.remove();
			this.doneTasksCardContainer.append(jQueryElement)
			for( let i = 0; i < todoList.length; i++ ){
					
				let elementId = todoList[i].taskId;
				
				if( taskId === todoList[i].taskId ){
					removedObject = todoList.splice(i, 1);
					doneTaskList.push(removedObject[0]);
				}
			}
		}

		else {
			jQueryElement.remove();
			this.todoTaskListContainer.append(jQueryElement)
			for( let i = 0; i < todoList.length; i++ ){
					
				let elementId = todoList[i].taskId;
				
				if( taskId === todoList[i].taskId ){
					removedObject = todoList.splice(i, 1);
					doneTaskList.push(removedObject[0]);
					
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
