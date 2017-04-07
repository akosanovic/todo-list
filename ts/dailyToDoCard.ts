import * as $ from 'jquery';
import {ToDoItem} from './todoItem';
import {ToDoItemList} from './todoItemList';


/*
	Adding new task card can be done on enter, clicking on submit button
	Every task is submitted:
		- New task input field is empty and focus is back on it

*/ 


export class DailyToDoCard implements ToDoItemList{

	// data property storing page container
	// visible globally 
    pageContainer: JQuery = $('.page--container');
    
    // holds both list of todo tasks and list of done tasks
    cardContainer: JQuery = this.pageContainer.find('.tasks--list--container');

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
	// Local storage is consist of:
	//  
	// taskArray: 
	//			 - holds both todoTasks and doneTasks
	//           - converted from todoItem to todoJSON		
	// counter

	localStorageObject = {
		counter  : 0,
		taskArray: []
	}

	updateLocalStorage(): void{
		
		localStorage.clear();
		this.localStorageObject.taskArray = [];
		this.localStorageObject.counter   = 0;


		for(let todoTaskObjectProperty in this.todoTaskObject) {

			let arrayOfTaskObject = this.todoTaskObject[ todoTaskObjectProperty ]
			if( arrayOfTaskObject.length > 0 ) {
				for( let i = 0; i < arrayOfTaskObject.length; i++ ) {
					var todoTaskObject  = arrayOfTaskObject[i];


					var taskJSON = {
						taskId         : todoTaskObject.taskId,
						taskDescription: todoTaskObject.taskDescription,
						taskCompleted  : todoTaskObject.taskCompleted
					}
					this.localStorageObject.taskArray.push(taskJSON);
				}
			}			
		}

		this.localStorageObject.counter = this.taskCounter;
		localStorage.setItem('localStorageObject', JSON.stringify(this.localStorageObject));
	}




	getValueFromLocalStorage(): void {

		if(localStorage.length > 0) {
			let localStorageObject = JSON.parse(localStorage.getItem('localStorageObject'));

			this.renderTasksFromLocalStorage(localStorageObject);
		}

	}

	renderTasksFromLocalStorage(localStorageObject): any {
		
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



























} // Class DailyToDoCard :: END


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new DailyToDoCard();


})
