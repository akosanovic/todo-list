
import {TodoCardInterface} from './todoCardInterface';
import {TodoTask} from './todoTask';
import {Persistable} from './persistable';



export class TodoCard implements Persistable  {
	
	private parentContext: TodoCardInterface;
	
	public cardID           : number;
	public cardJQueryElement: JQuery;
	public cardTitle        : string;
	public cardHeaderColor  : string;


	private cardHTMLContent   : string;
	private cardShowMenuButton: JQuery;
	private cardMenuEditButton: JQuery;
	private cardMenuDeleteButton   : JQuery;
	private cardTitleInput         : JQuery;
	private todoTaskInputContainer : JQuery;
	public  todoTasksListContainer : JQuery;
	private newTodoTaskDescriptionInput: JQuery;
	private todoTaskDescripion: string;


	private todoTaskCounter: number = 0;
	public todoTask    : JQuery;

	public todoTasksArray = [];

	private headerColor: string = '';

	constructor( cardObject, parentContext ) {	
		
		this.parentContext = parentContext;		

		this.cardID          = cardObject.cardID;
		this.cardTitle       = cardObject.cardTitle ? cardObject.cardTitle : "Undefined";
		this.cardHeaderColor = cardObject.cardHeaderColor ?  cardObject.cardHeaderColor : this.setCardHeaderColor();


		this.cardHTMLContent    = this.getHTML();
		this.cardJQueryElement  = $(this.cardHTMLContent);

		
		this.cardShowMenuButton   = this.cardJQueryElement.find('.todo--card--menu--button');
		this.cardMenuEditButton   = this.cardJQueryElement.find('.card--menu--edit--button');
		this.cardTitleInput       = this.cardJQueryElement.find('.todo--card--title--input');
		this.cardMenuDeleteButton = this.cardJQueryElement.find('.card--menu--delete--button');
		

		this.todoTasksListContainer = this.cardJQueryElement.find('.todo--task--list--container');
		this.todoTaskInputContainer = this.cardJQueryElement.find('.new--task--input--container');
		this.newTodoTaskDescriptionInput = this.todoTaskInputContainer.find('.new--todo--task--description');

		this.cardJQueryElement.on("keypress", this.keypressHandler.bind(this));
	}


	destroy(){
		this.cardID            = null;
		this.cardTitle         = null;
		this.cardHTMLContent   = null;
		this.cardJQueryElement.remove();
		this.cardJQueryElement = null;
	}


	public getLocalStorageRepresentation() {

		let todoTasksJsons = []

		for (var i = this.todoTasksArray.length - 1; i >= 0; i--) {
			let todoTask = this.todoTasksArray[i];
			let todoTaskJson = todoTask.getLocalStorageRepresentation(); 
			todoTasksJsons.push( todoTaskJson );
		};



		let json = {
			cardID           : this.cardID,
			cardTitle        : this.cardTitle,
			cardHeaderColor  : this.cardHeaderColor,
			todoTasksJsons   : todoTasksJsons
		}
		return json;
	}

	
	appendTodoTaskToCardContainer(){}	
	
	public appendCard(parentContext: JQuery): void {
		parentContext.append(this.cardJQueryElement);
	}


	clickHandler( e ): void {
		let target = $(e.target);

		let todoCardContainer = this.cardJQueryElement.find('.todo--card--contianer');
		let todoCardContainerClicked = target.closest(todoCardContainer);
		if (todoCardContainerClicked.length > 0){
			e.stopPropagation();
			this.toggleTodoBodyHeight( todoCardContainer );
		}


		let cardMenuButtonClicked = target.closest(this.cardShowMenuButton);
		let cardDropDownMenu = this.cardJQueryElement.find('.todo--card--dropdown--menu');
		if (cardMenuButtonClicked.length > 0) {
			e.preventDefault();
			this.showCardMenu(cardDropDownMenu);
		}
		else {
			this.hideCardMenu(cardDropDownMenu);
		}

		// Edit Todo Card
		let editCardButtonClicked = target.closest(this.cardMenuEditButton);
		if (editCardButtonClicked.length > 0) {
			e.preventDefault();
			this.editTodoCard();
		}

		// Delete Todo Card 
		let deleteCardButtonClicked = target.closest(this.cardMenuDeleteButton);
		if (deleteCardButtonClicked.length > 0 ){
			e.preventDefault();
			e.stopPropagation();
			this.parentContext.deleteTodoCard( this.cardID );
		}

		let addNewTaskButton = this.cardJQueryElement.find('.todo--card--add--new--task--button');
		let addNewTaskClicked = target.closest(addNewTaskButton);
		if (addNewTaskClicked.length > 0) {
			e.preventDefault();
			e.stopPropagation();
			this.showNewTaskInputContainer();
		}
	}


	keypressHandler( e ): void {

		let target = $(e.target);

		// ako je keypress unutar new--todo--task--input, proveri:
		//	1. da li je to enter
		//  2. ako je enter, da li ima teksta
		// ako je enter i ima teksta, krnes hide inputu, kreiras todoTask sa tekstom
		
		let todoCardHeader: JQuery = this.cardJQueryElement.find('.todo--card--header');
		let todoCardHeaderTarget: JQuery = target.closest(todoCardHeader);
		
		 if(  e.charCode === 13 || e.which === 13 || e.key == 'Enter' ) {

		 	// Save changes for Todo Card Title
		 	if(todoCardHeaderTarget.length > 0  ) {
		 		let newTitle: string = todoCardHeader.find('.todo--card--title--input').val();
		 		if (newTitle){

				
				
				this.parentContext.editTodoCard( this.cardID, this.cardJQueryElement, newTitle )
				}
		 	}

		 	// Check for Users New Task Input 
		 	if(this.newTodoTaskDescriptionInput.val()){
		 		
		 		this.todoTaskDescripion = this.newTodoTaskDescriptionInput.val();
		 		this.hideNewTaskInputContainer();
		 		this.createNewTodoTask();
		 	}
		}		
	}


	private showCardMenu( cardDropDownMenu ): void {
		
		cardDropDownMenu.toggleClass('showTodoCardDropDownMenu');
	}
	private hideCardMenu(cardDropDownMenu): void {

		if(cardDropDownMenu.hasClass('showTodoCardDropDownMenu')){
			cardDropDownMenu.removeClass('showTodoCardDropDownMenu');
		}
	}


	private setCardHeaderColor(): string {
		let cardHeaderColorArray = [ "yellow", "turquoise", "purple", "blue", "orange" ];
		
		let currentIndex = this.cardID;
		let maxNum = cardHeaderColorArray.length;
		let returnNum = 0;

		// Color is choosen based on current CardID
		while(currentIndex > maxNum-1){
			currentIndex = currentIndex % maxNum;
		}
		this.headerColor = cardHeaderColorArray[currentIndex] + "CardHeader";
		return this.headerColor;
	}


	// remove readonly property, enable user to change value of card title 
	editTodoCard(): void {
		this.cardTitleInput.removeAttr('readonly').select();
	}
	chageCardTitle(): void {

		if(this.cardTitleInput.val() && (this.cardTitleInput.val() !== this.cardTitle)){
			this.cardTitleInput.attr('readonly');
			this.cardTitle = this.cardTitleInput.val();
		}
	}
	// When Max Width <= 950px Hide Todo Card Body
	toggleTodoBodyHeight( cardContainder: JQuery ): void {

		$('.show--card--body').removeClass('showCardBody');
		cardContainder.find('.show--card--body').addClass('showCardBody');
	}


	//  On Add New Task Button Prepend Empty Task Frame 
	showNewTaskInputContainer(): void {

		this.todoTasksListContainer.addClass('newTaskInputOpened');
		this.todoTaskInputContainer.removeClass('remove');

		this.newTodoTaskDescriptionInput.focus();
	}
	hideNewTaskInputContainer(): void {
		this.todoTasksListContainer.removeClass('newTaskInputOpened');
		this.todoTaskInputContainer.addClass('remove');
		this.newTodoTaskDescriptionInput.val( '');
	}




	createNewTodoTask(): void {

		var newTaskObject = {
			"todoTaskID": this.todoTaskCounter++,
			"todoTaskDescripion": this.todoTaskDescripion,
			"todoTaskStatus": false,
			"parentID": this.cardID
		}

		this.prependNewTask( newTaskObject );
	}


	prependNewTask( newTaskObject ): void {

		let newTodoTask: TodoTask = new TodoTask( newTaskObject, this );
		newTodoTask.prependTo(this.todoTasksListContainer);
		console.log(newTodoTask)
		// this.todoTasksArray.push(newTodoTask);
		console.log(this.getLocalStorageRepresentation());
	}


	private getHTML(): string{

		var todoCardHTML = 
			`<div class="col-sm-1 col-ms-1 col-lg-4 col-md-6" draggable="true">
				<div class="todoCardContainer todo--card--contianer" data-card-id = ${ this.cardID }>
					<div class="todoCardContent">

						<!-- Todo Card Header :: BEGIN -->
						<div class="todoCardHeader ${ this.cardHeaderColor } todo--card--header">

							<!-- #1 -->
							<div class="inputGroup">
								<div class="absolutePositionedPrefix">
									<div class="iconContainer">
										<i class="fa fa-file-text-o" aria-hidden="true"></i>
									</div>
								</div>											
								<input type="text" class="inputGroupDescription todo--card--title--input"  readonly="readonly"
								  name="todo card description" value="${this.cardTitle}">
							</div>


							<!-- #2 -->
							<!-- On Click display Drop Down Menu :: BEGIN  -->
							<a href="#" class="cardMenuButton todo--card--menu--button">
								<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
							</a>
							<div class="todoCardDropDownMenu todo--card--dropdown--menu">
								<div class="dropDownMenuContainer">
									<ul class="dropdownMenuList">
										<li class="dropdownMenuItem">
											<a href="#" class="dropdownMenuLink card--menu--edit--button">
												Edit Card
											</a>
										</li>
										<li class="dropdownMenuItem">
											<a href="#" class="dropdownMenuLink card--menu--delete--button">
												Delete Card
											</a>
										</li>
									</ul>
								</div>											
							</div><!-- On Click display Drop Down Menu :: END  -->
						

						</div><!-- Todo Card Header :: END -->


						<!-- Todo Card Body :: BEGIN -->
						<div class="todoCardBody show--card--body">

							<!-- #3 -->
							<div class="todoCardAddNewTaskButtonSmall todo--card--add--new--task--button" >
								<a href="#" class="todoCardAddNewTaskButton">
									<img class="addNewButtonImageSmall" src="images/add-button-small.svg">
								</a>
							</div>
							<!-- #4 Todo Card Task List:: BEGIN -->
							
							<ul class = 'newTaskInputContainer remove  new--task--input--container'>
								<li class="todoTaskItem taskItemContainer todo--task--empty--frame">
									<div class="inputGroup">
																				
										<input type="text" class="inputGroupDescription new--todo--task--description" 
										name="todo card description" value="" >
									</div>
								</li>
							</ul>

						

							<ul class="todoCardTaskList todo--task--list--container">

								<!-- Dynamicaly filled content -->

							</ul><!-- Todo Card Task List:: END -->
						</div><!-- Todo Card Body :: END -->
					</div>
				</div>
			</div><!-- Card Container :: END -->`

		return todoCardHTML;
	}



}