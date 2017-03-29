import * as $ from 'jquery';

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
		
		// what element was the target of the keypress
		let target: JQuery = $(e.target);

		// if there is value in New Task Input  
		// display check icon

		// if enter was pressed on new task input
		// add new task card to the card container 
		if(  e.charCode === 13 || e.which === 13 || e.key == 'Enter'){
			console.log("enter clicked")

			let newTaskInputField = target.closest( this.newTaskInputField );	
				
			if(newTaskInputField.length > 0){
				this.submitNewValue();
			}
			// when using tab to move to submit button
			let submitButton = target.closest(this.submitNewTask);
			if(submitButton.length > 0){
				this.submitNewValue();
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

		let target:JQuery = $(e.target);

		// submit user input to the new card
		let element = target.closest(this.submitNewTask);
		
		if(element.length > 0){
			
			this.submitNewValue();
		}
		// change status of taskcard

		// remove task card
	}

	doubleClickHandler(e): void{
		
		let target: JQuery = $(e.target);
		
		this.toDoCardElement = this.pageContainer.find('.to--do--card');
		let toDoCardClicked: JQuery = target.closest(this.toDoCardElement);

		if(toDoCardClicked.length > 0 ){
			// enable todo card text editing
			console.log(toDoCardClicked);
			toDoCardClicked.find('.to--do--task--input').prop('disabled', false);
		}

	}// INITIALIZING HANDLERS :: END



	// if there is value in New Input Task and value is submited 
	// update both object array and screen display
	submitNewValue(){

		let newTask = this.fetchUserInput();

		
		this.appendNewTaskToCardContainer( newTask );
		this.updateDataObject( newTask );
		this.toggleSubmitButton();
	}


	
	updateDataObject( newTask ){

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


	
	


	appendNewTaskToCardContainer ( newTask ): JQuery{

		return this.appendElementToContainer( this.todoTaskListContainer, this.renderToDoCard( newTask ));

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

	renderToDoCard( inputValue ): string{ 	

		if(inputValue){
			var toDoCardHTML = 
				`<li class='toDoCard to--do--card data-id=" placeholder "'>
					<div class='taskStatus'>
						<input type='checkbox' name='taskStatus'>
					</div>


					<div class='taskDescription'>
						<input type='text' class='taskDescriptionInput to--do--task--input' name='taskDescription' disabled value = \"`+inputValue+`\">
						<div class='cardModifyBtnContainer card--modify--btn'>
							<i class='fa fa-times' aria-hidden='true' ></i>
						</div>
					</div>
				</li> `

			return toDoCardHTML;
		}
	}






	// helper classes
	appendElementToContainer( containerToAppend, valueToAppen ): JQuery{
		return containerToAppend.append(valueToAppen);
	}

	clearInputField( inputFieldToClear: JQuery ): JQuery{
		return inputFieldToClear.val('');
	}




	// MODIFYING TODO CARDS

	// to do cards on double click change content
	// toggle cards from done to todo list on checkbox click
	// remove cards on click on delete button
	// store all cards into local storage - string JSON.stringify
	// on tab reopening reload cards 
	// store all ( todo, done ) cards in object 



	// 

}


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new ToDoCard();

})