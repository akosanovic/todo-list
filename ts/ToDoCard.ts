import * as $ from "jquery"


class ToDoCard{


	pageContainer = $('.page--container');
	cardContainer: JQuery;
	userInputField: JQuery;
	userInputValue: string; 
	

	constructor(){
		
		this.cardContainer = this.pageContainer.find('.card--container');


		$(document).on("keypress", this.keypressHandler.bind(this));

	}



	keypressHandler = function(e){	  

	   if (e.charCode === 13){
	   	this.getUserInputContent();
	   }
	}


	getUserInputContent(): void{
		this.userInputField = this.pageContainer.find('.task--input');
		this.userInputValue = this.userInputField.val();

		if(this.userInputValue.length > 0){
			
			var userInput: string = this.userInputValue;
		
			this.userInputField.val("");

			this.fillCardContent( userInput );
		}
	}





	fillCardContent( userInput: string ) {


		let cardBluePrint = `<li class='toDoCard to--do--card '>
					<div class='taskStatus'>
						<input type='checkbox' name='taskStatus'>
					</div>


					<div class='taskDescription'>
						<input type='text' class='taskDescriptionInput task--input' name='taskDescription' value = \" `+userInput+`\">
						<div class='closeCardIconContainer close--card'>
							<i class='fa fa-times' aria-hidden='true' ></i>
						</div>
					</div>
				</li> `

		this.renderNewToDoCard(cardBluePrint);

	}


	appendElement( appendTo: JQuery, appendElement ): void {

		appendTo.append(appendElement);
	}



	renderNewToDoCard( userInputPlaceholder ){

		this.appendElement( this.cardContainer, this.fillCardContent(userInputPlaceholder));
	}
}




// loading aplication once DOM is ready using 'jQuery.ready'

$(() => {


	let myCard = new ToDoCard();
	//console.log(myCard.cardContainer.append(myCard.renderCard("hello")));
	

})
