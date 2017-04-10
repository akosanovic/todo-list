import {todoApp} from './todoApp';
import {TodoCardInterface} from './todoCardInterface';
import {TodoCard} from './todoCard';


export class MainTodoCard implements TodoCardInterface {

	private mainTodoCardContainer: JQuery;
	private addNewButton: JQuery;
	private addNewButtonContainer: JQuery;
	private floatingButton : JQuery;
	private floatingButtonAddCard: JQuery;
	private oldestTaskListContainer: JQuery;

	


	constructor( mainTodoCard: JQuery ) {
		this.mainTodoCardContainer   = mainTodoCard;
		
		// On click show floating buttons
		this.addNewButton            = this.mainTodoCardContainer.find('.main--content--add--new--button');

		// toggle showFloatingButtons Class
		this.addNewButtonContainer   = this.mainTodoCardContainer.find('.main--content--add--new--button--container');
		
		//  On click detect which floating button was clicked
		this.floatingButton          = this.mainTodoCardContainer.find('.floating--button');
		this.floatingButtonAddCard   = this.mainTodoCardContainer.find('.floating--button--add--card');

		//  container to fill with oldest tasks
		this.oldestTaskListContainer = this.mainTodoCardContainer.find('.oldest--task--container');

		this.fillOldestTaskListContainer();
	}


	public clickHandler( e ): void {
		let target = $(e.target);


		let addNewButton = target.closest(this.addNewButton);
		if (addNewButton.length > 0){
			e.stopPropagation();
			this.displayFloatingButtons( e );
		}


		let floatingButtonClicked = target.closest(this.floatingButton)
		if(floatingButtonClicked.length > 0){
			e.stopPropagation();
			
			if (floatingButtonClicked.hasClass('floating--button--add--card')){
				// this.createTodoCard( e );
			}
			else if(floatingButtonClicked.hasClass('floating--button--add--task')){
				console.log("add task clicked");
				this.createNewCardWithTask( e );
			}
		}
	}



	private displayFloatingButtons( e ): void {
		e.stopPropagation();
		

		if( this.addNewButtonContainer.hasClass('showFloatingButtons') ) {		
			this.addNewButtonContainer.addClass('hideFloatingButtons').removeClass('showFloatingButtons');
		}
		else{

			this.addNewButtonContainer.removeClass('hideFloatingButtons').addClass('showFloatingButtons');
		}
	}

	createTodoTask(){}

	// createTodoCard( e ): void {
	// 	e.stopPropagation();
	// 	console.log('connect with Task Card and Task Item');


	// 	let newTodoCard: TodoCard = new TodoCard( this.todoCardCounter  );
	// 	console.log(newTodoCard.getHTML());
	// 	$('.todo--cards--row').append(newTodoCard.getHTML());

	// 	this.todoCardCounter++;
	// }




	createNewCardWithTask( e ): void {
		e.stopPropagation();
		
		console.log('connect with Task Card and Task Item')
	}


	fillOldestTaskListContainer(){
		console.log("Fill Oldest Task List Container on load");
	}

	appendTodoTaskToCardContainer(){}
	

	
	deleteTodoCard(){}


}


