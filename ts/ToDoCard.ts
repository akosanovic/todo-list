import * as $ from 'jquery';


class ToDoCard{

	// data property storing page container
	// visible globally 
    pageContainer: JQuery = $('.page--container');
    cardContainer: JQuery = this.pageContainer.find('.card--container');

	constructor(){

		// initializing event handlers on document 
		$(document).on("keypress", this.keypressHandler.bind(this));
		$(document).on("click", this.clickHandler.bind(this));

		console.log("this is ", this);

	}
	

	keypressHandler(e):void {

		if( e.charCode === 13){
			console.log(e.charCode);
			this.appendElementToContainer( this.cardContainer, this.renderToDoCard(this.fetchUserInput()) );
		}
	}


	clickHandler(e):void {

		let target:JQuery = $(e.target);
	}


	fetchUserInput(): string {
		let userInputField: JQuery = this.pageContainer.find('.new--task--input');
		let userInputValue: string = userInputField.val();
		
		if (userInputValue){
			let userInput = userInputValue;
			
			// clear text input for new input
			userInputField.val('');
			return userInput;
		}

	}

	

	renderToDoCard( inputValue ): string { 
		if(inputValue){
			var toDoCardHTML = `
							<li class='toDoCard to--do--card '>
								<div class='taskStatus'>
									<input type='checkbox' name='taskStatus'>
								</div>


								<div class='taskDescription'>
									<input type='text' class='taskDescriptionInput task--input' name='taskDescription' value = \"`+inputValue+`\">
									<div class='closeCardIconContainer close--card'>
										<i class='fa fa-times' aria-hidden='true' ></i>
									</div>
								</div>
							</li> `


			return toDoCardHTML;
		}
		
	}
	

	appendElementToContainer( containerToAppend, valueToAppen ): JQuery{
		return containerToAppend.append(valueToAppen);
	}




}





// loading aplication once DOM is ready using $(callback)
$(() => {

	var todoCard = new ToDoCard();

})