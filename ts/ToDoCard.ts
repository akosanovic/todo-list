import * as $ from 'jquery';
import {ToDoItem} from './ToDoItem';
/*
	Adding new task card can be done on enter, clicking on the submit button or clicking enter on submit button
	Every task is submited:
		- New task input field is empty and focus is back on it

*/ 


class ToDoCard{

	// data property storing page container
	// visible globally 
    pageContainer: JQuery = $('.page--container');
    
    // holds both list of todo tasks and list of done tasks
    cardContainer: JQuery = this.pageContainer.find('.card--container');

    // append new task cards
    todoTaskListContainer: JQuery = this.pageContainer.find('.todo--tasks--container');
    
    // take user value from input field for new task cards
    newTaskInputField: JQuery = this.pageContainer.find('.new--task--input');      

    // show submit task button on input
    submitNewTask: JQuery = this.pageContainer.find('.submit--new--task--btn');

	todoTasksCardContainer: JQuery = this.pageContainer.find('.todo--tasks--container');
	
	doneTasksCardContainer: JQuery = this.pageContainer.find('.done--tasks--container');

    // counter
    numberOfTasks: number = 0;

    // todo card not existing on load, defined on duble click
	toDoCardElement: JQuery;              

    // data filled on keypress event
	taskInputs: JQuery;


	constructor(){

		// initializing event handlers on document 
		$(document).on("keypress", this.keypressHandler.bind(this));
		
		// display submit new task button
		$(document).on('input', this.inputHandler.bind(this));


		$(document).on("click", this.clickHandler.bind(this));

		// remove disabled property from todo(uncopleated cards)
		$(document).on("dblclick", this.doubleClickHandler.bind(this));
	}




	// object is updated: 
		// on task submit
		// on task delete
		// when task is changed(text and status)
	cardData = {

		todoTasks: [],
		doneTasks: []

	}
	


	// INITIALIZING HANDLERS :: BEGIN

	keypressHandler(e): void {
		let target: JQuery = $(e.target);

		// if there is value in New Task Input  
		// display check icon

		// if enter was pressed on new task input
		// add new task card to the card container 
		if(  e.charCode === 13 || e.which === 13 || e.key == 'Enter'){
		

			let newTaskInputField = target.closest( this.newTaskInputField );	
				
			if(newTaskInputField.length > 0){
				this.createNewTask();
			}
			// when using tab to move to submit button
			let submitButton = target.closest(this.submitNewTask);
			if(submitButton.length > 0){
				this.createNewTask();
			}
		}
	}

	inputHandler(e): void{
		let target: JQuery = $(e.target);

		
		let element = target.closest(this.newTaskInputField);		
		if (element.length > 0){
			this.toggleSubmitButton();
		}
	}


	clickHandler(e): void{

		// element = target.closest('.to--do--card')
		// if element.length > 0
		// 		clickedTaskId = element.attr("data-task-id")
		// 
		// 		for card in cardData.todoTasks
		// 				if card.taskId

		let target:JQuery = $(e.target);

		// submit user input to the new card
		let submitButton = target.closest(this.submitNewTask);
		
		if(submitButton.length > 0){
			
			this.createNewTask();
		}
		// change status of taskcard
		// toggle task compleated status
		let checkbox: JQuery = this.pageContainer.find('.task--checkbox');
		
		let checkboxClicked = target.closest(checkbox);
		
		if(checkboxClicked.length > 0){

			let taskModified: JQuery =  checkboxClicked.closest( '.to--do--card');	

			
			this.toggleTaskCompleatStatus( checkboxClicked, taskModified );
		}

		// remove task card
	}

	doubleClickHandler(e): void{		
		let target: JQuery = $(e.target);
		
		this.toDoCardElement = this.pageContainer.find('.to--do--card');
		let toDoCardClicked: JQuery = target.closest(this.toDoCardElement);

		if(toDoCardClicked.length > 0 ){
			// enable todo card text editing
			toDoCardClicked.find('.to--do--task--input').prop('disabled', false);
		}

	}// INITIALIZING HANDLERS :: END



	// if there is value in New Input Task and value is submited 
	// update both object array and screen display
	createNewTask(){

	
		var newTask = {
			id: this.numberOfTasks++,
			taskDescription: this.fetchUserInput()
		}
		

		
		this.appendNewTaskToCardContainer( newTask );
		this.updateDataObject( newTask );
		this.toggleSubmitButton();
	}


	
	updateDataObject( newTask: Object ){

		// when user submits new task
		this.cardData.todoTasks.push( newTask )

	}

	fetchUserInput(): string{
		
		let newTaskData: string = this.newTaskInputField.val();
		
		if (newTaskData){
			
			// clear text input for new input
			this.clearInputField( this.newTaskInputField )
			return newTaskData;
		}
	}

	appendNewTaskToCardContainer ( newTask ): void {

		console.log(newTask.id)

		var item : ToDoItem = new ToDoItem(newTask.taskDescription, newTask.id);
		item.appendTo(this.todoTaskListContainer);

		this.cardData.todoTasks.push( item )

		// return this.appendElementToContainer( this.todoTaskListContainer, this.renderToDoCard( newTask ));

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


	// MODIFYING TODO CARDS

	// to do cards on double click change content
	// toggle cards from done to todo list on checkbox click
	// remove cards on click on delete button
	// store all cards into local storage - string JSON.stringify
	// on tab reopening reload cards 
	// store all ( todo, done ) cards in object 


		toggleTaskCompleatStatus( checkboxClicked, taskCardWithModifiedCompleatStatus ){
		

		}




	toggleTaskCompleatedStatus( checkboxClicked, taskCardWithModifiedCompleatStatus ){
		

		console.log(
			this.cardData
			)

		var idOfModifiedTask = taskCardWithModifiedCompleatStatus.data('id');
		
		let lengthOftoDoArray = this.cardData.todoTasks.length;
		let lengthOfDoneTasksArray = this.cardData.todoTasks.length;

		//  move task to done list
		if(checkboxClicked.is(':checked')){
			taskCardWithModifiedCompleatStatus.remove();


			this.doneTasksCardContainer.append( taskCardWithModifiedCompleatStatus );


			for(var i = 0; i < lengthOftoDoArray; i++ ){

				let currnetTask = this.cardData.todoTasks[i];

				if (idOfModifiedTask === this.cardData.todoTasks[i].id){
					let modifiedObject = this.cardData.todoTasks[i];
					this.cardData.todoTasks.splice(modifiedObject);
				
				}
			}
		}

		// move task from done to to-do list
		else{
			taskCardWithModifiedCompleatStatus.remove();
			this.todoTasksCardContainer.prepend( taskCardWithModifiedCompleatStatus );
		}		
	}


	// helper classes
	appendElementToContainer( containerToAppend, valueToAppen ): JQuery{
		return containerToAppend.append(valueToAppen);
	}

	// when enter is pressed clear new input field
	clearInputField( inputFieldToClear: JQuery ): JQuery{
		return inputFieldToClear.val('');
	}

}


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new ToDoCard();

})