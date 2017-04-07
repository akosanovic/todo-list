
import * as $ from "jquery"
//import com  from './Message'
import msg from './Message'


	// var newObject = new com('yo!');
	// console.log(newObject.greet());

//import CardInput from './CardInput'

// User input is always in the same static card
// that value is taken and passed to the next rendered card
// css animation

// take Remmember song from the net
// parse it into each of the new cards as placeholder text

// clear value from input field when



$(document).ready( function(){


	var myMessage = new msg();
	myMessage.show();

	var pageContainer:JQuery = $('.page--container');
	var cardContainer:JQuery = pageContainer.find('.task--list--container');


	// event handlers

	pageContainer.on('keypress', keypressHandler.bind(this))
	pageContainer.on('click', clickHandler.bind(this))

	// helper functions:
	// 	-if empty
	//  -time/date,...

	// check if there is tex in input
	function isNotEmpty( fieldToCheck ){

		if(fieldToCheck !== " "){
			return fieldToCheck;
		}
	}



	function keypressHandler( e ){

		let target:JQuery = $(e.target);


		// take user input text and store it to the new to-do card on enter
		let selectedCard = target.closest($('.to--do--card'));
		if (selectedCard.length > 0){
			if(e.keyCode === 13){
				newToDoCard( selectedCard )
			}
		}
	}


	function newToDoCard( selectedCard ){



		let input    :JQuery =  selectedCard.find('.task--input');

		let userInput: string = input.val();

		// clear input field for new input
		input = input.val('');

		if(isNotEmpty(userInput)){
			cardContainer.append( renderToDoCard(userInput) );
		}
	}




	function renderToDoCard( userInput:string ):string{


		var renderCard: string =

			`<li class='toDoCard to--do--card '>
				<div class='taskStatus'>
					<input type='checkbox' name='taskStatus'>
				</div>


				<div class='taskDescription'>
					<input type='text' class='taskDescriptionInput task--input' name='taskDescription' value = \"` + userInput + `\">
					<div class='closeCardIconContainer close--card'>
						<i class='fa fa-times' aria-hidden='true' ></i>
					</div>
				</div>
			</li> `
		return renderCard;
	}


	function clickHandler ( e ){
		var target:JQuery = $(e.target);

		var element: JQuery = target.closest('.close--card');
		if (element.length > 0){
			alert("are you sure you want to close task")
		}



	}




});
