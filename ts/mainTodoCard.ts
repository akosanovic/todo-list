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
	private mainTodoTaskContainer  : JQuery;
	private maxNumOfOldestTaskToDisplay: number;

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
		this.maxNumOfOldestTaskToDisplay = 3;

		//  container to fill with oldest tasks
		this.oldestTaskListContainer = this.mainTodoCardContainer.find('.oldest--task--container');

		this.mainTodoCardContainer.on('focusout', this.blurHandler.bind(this));
		this.renderTodoTasksFromLocalStorage()
		
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
	blurHandler(e): void {
		let target = $(e.target);

		let addNewButtonBlured = target.closest(this.addNewButton);
		if(addNewButtonBlured.length > 0) {
			this.hideFloatingButtons(e);
		}
	}

	updateLocalStorage() {
		this.parentContext.updateLocalStorage();
	}



	showFloatingButtons(e): void {
		e.stopPropagation();
		

		if( this.addNewButtonContainer.hasClass('hideFloatingButtons') ) {		
			this.addNewButtonContainer.removeClass('hideFloatingButtons');
		}
		else {
			this.hideFloatingButtons(e);
		}
	}
	hideFloatingButtons(e): void {

		if (!this.addNewButtonContainer.hasClass('hideFloatingButtons')){
			this.addNewButtonContainer.addClass('hideFloatingButtons');
		}
	}


	renderTodoTasksFromLocalStorage() {
		
		let oldestTaskArray: TodoTask[] = this.parentContext.getOldestTasksForMainTodoCard();

		if ( oldestTaskArray.length > 0 ) {
			
			for(let i = 0; (i < this.maxNumOfOldestTaskToDisplay && i < oldestTaskArray.length); i++) {
				let oldestTask = oldestTaskArray[i];
				console.log('oldest task', oldestTask)
				this.prependOldestTask( oldestTask )
			}
		}
		else if (oldestTaskArray.length === 0) {
			this.emptyMainTodoTaskContainer()
		}
	}
	prependOldestTask( taskObject: Object ): void {

		let oldTodoTask: TodoTask = new TodoTask( taskObject, this);
		let oldestTaskContainer: JQuery = this.mainTodoCardContainer.find('.oldest--task--container');
		oldTodoTask.prependTo( oldestTaskContainer );
	}

	emptyMainTodoTaskContainer() {

		this.mainTodoTaskContainer = this.mainTodoCardContainer.find('.main--card--body--container');
		this.mainTodoTaskContainer.addClass('emptyMainTodoCardTaskList');
	}

	


}