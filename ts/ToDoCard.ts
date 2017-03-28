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
    
    // append new task cards
    cardContainer: JQuery = this.pageContainer.find('.card--container');
    
    // take user value from input field for new task cards
    newTaskInputField: JQuery = this.pageContainer.find('.new--task--input');

    // show submit task button on input
    submitNewTask: JQuery = this.pageContainer.find('.submit--new--task--btn');

    // data filled on keypress event
	taskInputs: JQuery;
	

	constructor(){

		// initializing event handlers on document 
		$(document).on("keypress", this.keypressHandler.bind(this));
		

		$(document).on("click", this.clickHandler.bind(this));
		
		// display submit new task button
		$(document).on('input', this.inputHandler.bind(this));

	}
	

	keypressHandler(e): void{
		// which key was pressed
		let keyPressed = e.charCode;

		// what element was the target of the keypress
		let target: JQuery = $(e.target);

		// if there is value in New Task Input  
		// display check icon

		// if enter was pressed on new task input
		// add new task card to the card container 
		if( keyPressed === 13 ){
			
			let newTaskInputField = target.closest( this.newTaskInputField );		
			if(newTaskInputField.length > 0){
				this.appendNewTaskToCardContainer();
				this.toggleSubmitButton();
			}
			let submitButton = target.closest(this.submitNewTask);
			if(submitButton.length > 0){
				this.appendNewTaskToCardContainer();
				this.toggleSubmitButton();
			}
		}
	}



	clickHandler(e): void{

		let target:JQuery = $(e.target);

		// submit user input to the new card
		let element = target.closest(this.submitNewTask);
		
		if(element.length > 0){
			this.appendNewTaskToCardContainer();
			this.toggleSubmitButton();
		}
	}



	inputHandler(e): void{
		let target: JQuery = $(e.target);

		
		let element = target.closest(this.newTaskInputField);		
		if (element.length > 0){
			this.toggleSubmitButton();
		}
	}






	fetchUserInput(): string{

		let userInputValue: string = this.newTaskInputField.val();
		
		if (userInputValue){
				
			// clear text input for new input
			this.newTaskInputField.val('');
			return userInputValue;
		}
	}




	renderToDoCard( inputValue ): string{ 
		
		if(inputValue){
			var toDoCardHTML = 
				`<li class='toDoCard to--do--card '>
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
	


	appendNewTaskToCardContainer ():JQuery{
		return this.appendElementToContainer( this.cardContainer, this.renderToDoCard(this.fetchUserInput()));
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


	// helper classes
	appendElementToContainer( containerToAppend, valueToAppen ): JQuery{
		return containerToAppend.append(valueToAppen);
	}


}


// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new ToDoCard();

})