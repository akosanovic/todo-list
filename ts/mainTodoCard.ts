import {TodoCardInterface} from './todoCardInterface';
import {todoApp} from './todoApp';
import {TodoCard} from './todoCard';
import {TodoTask} from './todoTask';

export class MainTodoCard implements TodoCardInterface {

	private parentContext : todoApp;
	private mainTodoCardContainer  : JQuery;
	private addNewButton           : JQuery;
	private addNewButtonContainer  : JQuery;
	private floatingButton         : JQuery;
	private floatingButtonAddCard  : JQuery;
	private oldestTaskListContainer: JQuery;

	public oldestTaskItem: JQuery;
		


	constructor( mainTodoCard: JQuery, parentContext ) {
		this.mainTodoCardContainer   = mainTodoCard;
		
		this.parentContext = parentContext;
		// On click show floating buttons
		this.addNewButton            = this.mainTodoCardContainer.find('.main--content--add--new--button');

		// toggle showFloatingButtons Class
		this.addNewButtonContainer   = this.mainTodoCardContainer.find('.main--content--add--new--button--container');
		
		//  On click detect which floating button was clicked
		this.floatingButton        = this.mainTodoCardContainer.find('.floating--button');
		this.floatingButtonAddCard = this.mainTodoCardContainer.find('.floating--button--add--card');
		

		//  container to fill with oldest tasks
		this.oldestTaskListContainer = this.mainTodoCardContainer.find('.oldest--task--container');


		this.fillOldestTaskListContainer();
	}




	// EVENT HANDLERS
	public clickHandler( e ): void {
		let target = $(e.target);


		let addNewButton = target.closest(this.addNewButton);
		if (addNewButton.length > 0){
			e.stopPropagation();
			this.showFloatingButtons( e );
		}


		let floatingButtonClicked = target.closest(this.floatingButton)
		if(floatingButtonClicked.length > 0){
			e.stopPropagation();
			
			this.hideFloatingButtons( e );

			if (floatingButtonClicked.hasClass('floating--button--add--card')) {
				// this.createTodoCard( e );
			}
			else if( floatingButtonClicked.hasClass('floating--button--add--task')) {
				
				this.parentContext.createTodoCardWithTask( e );
			}
		}
	}





	showFloatingButtons( e ): void {
		e.stopPropagation();
		

		if( this.addNewButtonContainer.hasClass('hideFloatingButtons') ) {		
			this.addNewButtonContainer.removeClass('hideFloatingButtons');
		}
	}
	hideFloatingButtons( e ): void {

		if (!this.addNewButtonContainer.hasClass('hideFloatingButtons')){
			this.addNewButtonContainer.addClass('hideFloatingButtons');
		}
	}

	createTodoTask(){}


	createNewCardWithTask( e ): void {
		e.stopPropagation();
		
		console.log('connect with Task Card and Task Item')
	}


	fillOldestTaskListContainer(){
	
		let taskArray = this.parentContext.getOldestTasksForMainTodoCard( );
		for(let i = 0; i = taskArray.length; i++) {
			// console.log('length ', this.oldestTaskItem);
		}
	}

	appendTodoTaskToCardContainer(){}
	

	
	deleteTodoCard(){}


}


