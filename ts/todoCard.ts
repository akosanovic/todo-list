
import {TodoCardInterface} from './todoCardInterface';




export class TodoCard implements TodoCardInterface {
	
	private parentContext: TodoCardInterface;

	public cardID           : number;
	private cardHTMLContent : string;
	public cardJQueryElement: JQuery;
	
	public cardTitle          : string;
	private cardHeaderColor   : string;
	private cardShowMenuButton: JQuery;
	private cardDropDownMenu  : JQuery;
	private cardMenuEditButton: JQuery;
	private cardMenuDeleteButton: JQuery;
	private cardTitleInput : JQuery;

	public todoTask           : JQuery;


	constructor( cardObject, parentContext ) {	

		this.parentContext = parentContext;		
		this.cardID = cardObject.cardID;
		this.cardTitle = cardObject.cardTitle ? cardObject.cardTitle : "Undefined";
		
		this.cardHeaderColor = this.setCardHeaderColor();
		this.cardHTMLContent    = this.getHTML();
		this.cardJQueryElement  = $(this.cardHTMLContent);
		this.cardDropDownMenu     = this.cardJQueryElement.find('.todo--card--dropdown--menu');
		this.cardShowMenuButton   = this.cardJQueryElement.find('.todo--card--menu--button');
		this.cardMenuEditButton   = this.cardJQueryElement.find('.card--menu--edit--button');
		this.cardTitleInput       = this.cardJQueryElement.find('.todo--card--title--input');
		this.cardMenuDeleteButton = this.cardJQueryElement.find('.card--menu--delete--button');

		this.cardTitleInput.on("blur", this.chageCardTitle.bind(this));

	}


	destroy(){
		this.cardID            = null;
		this.cardTitle         = null;
		this.cardHTMLContent   = null;
		this.cardJQueryElement.remove();
		this.cardJQueryElement = null;
	}


	createTodoTask(){}
	appendTodoTaskToCardContainer(){}
	createTodoCard(){}
	deleteTodoCard(){}
	
	private getCardTitle(){}


	public appendCard(parentContext: JQuery): void {
		parentContext.append(this.cardJQueryElement);
	}


	clickHandler( e ): void {
		let target = $(e.target);

		
		let cardMenuButtonClicked = target.closest(this.cardShowMenuButton);
		if (cardMenuButtonClicked.length > 0) {
			this.showCardMenu();
		}
		else {
			this.hideCardMenu();
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
			this.parentContext.deleteTodoCard( this.cardID );
		}
	}



	private showCardMenu(): void {
		this.cardDropDownMenu.toggleClass('showTodoCardDropDownMenu');
	}
	private hideCardMenu(): void {
		if(this.cardDropDownMenu.hasClass('showTodoCardDropDownMenu')){
			this.cardDropDownMenu.removeClass('showTodoCardDropDownMenu');
		}
	}


	private setCardHeaderColor(): string {
		let cardHeaderColorArray = [ "yellow", "turquoise", "purple", "blue", "orange" ];
		
		let headerColor: string = '';
		let currentIndex = this.cardID;
		let maxNum = cardHeaderColorArray.length;
		let returnNum = 0;

		// Color is choosen based on current CardID
		while(currentIndex > maxNum-1){
			currentIndex = currentIndex % maxNum;
		}
		headerColor = cardHeaderColorArray[currentIndex] + "CardHeader";
		return headerColor;
	}
	// remove readonly property, enable user to change value of card title 
	editTodoCard(): void {
		this.cardTitleInput.removeAttr('readonly').select();


		this.parentContext.editTodoCard( this.cardID );
	}
	
	chageCardTitle(): void {

		if(this.cardTitleInput.val() && (this.cardTitleInput.val() !== this.cardTitle)){
			this.cardTitleInput.attr('readonly');
			console.log(this.cardTitleInput.val());
			this.cardTitle = this.cardTitleInput.val();
		}
	}



	private getHTML(): string{

		let todoCardHTML = 
			`<div class="col-sm-1 col-ms-1 col-lg-4 col-md-6" 
			 draggable="true">
				<div class="todoCardContainer todo--card--contianer" data-card-id = ${ this.cardID }>
					<div class="todoCardContent">

						<!-- Todo Card Header :: BEGIN -->
						<div class="todoCardHeader ${ this.cardHeaderColor }">

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
						<div class="todoCardBody showCardBody show--card--body">

							<!-- #3 -->
							<div class="todoCardAddNewTaskButtonSmall todo--card--add--new--task--button" >
								<a href="#" class="todoCardAddNewTaskButton">
									<img class="addNewButtonImageSmall" src="images/add-button-small.svg">
								</a>
							</div>
							<!-- Todo Card Task List:: BEGIN -->
							<ul class="todoCardTaskList">



								<li class="todoTaskItem taskItemContainer">
									<div class="inputGroup">
										<div class="absolutePositionedPrefix">
											<div class="customCheckbox">
												<input type="checkbox" name="task status" class="task--done--status" id="todo--card--task--status5">
												<label for="todo--card--task--status5"></label>
											</div>
										</div>											
										<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
									</div>
								</li>


								<li class="todoTaskItem taskItemContainer">
									<div class="inputGroup">
										<div class="absolutePositionedPrefix">
											<div class="customCheckbox">
												<input type="checkbox" name="task status" class="task--done--status" id="todo--card--task--status7">
												<label for="todo--card--task--status7"></label>
											</div>
										</div>											
										<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
									</div>
								</li>
									<li class="todoTaskItem taskItemContainer">
									<div class="inputGroup">
										<div class="absolutePositionedPrefix">
											<div class="customCheckbox">
												<input type="checkbox" name="task status" class="task--done--status" id="todo--card--task--status7">
												<label for="todo--card--task--status7"></label>
											</div>
										</div>											
										<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
									</div>
								</li>
								<li class="todoTaskItem taskItemContainer">
									<div class="inputGroup">
										<div class="absolutePositionedPrefix">
											<div class="customCheckbox">
												<input type="checkbox" name="task status" class="task--done--status" id="todo--card--task--status7">
												<label for="todo--card--task--status7"></label>
											</div>
										</div>											
										<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
									</div>
								</li>
								<li class="todoTaskItem taskItemContainer">
									<div class="inputGroup">
										<div class="absolutePositionedPrefix">
											<div class="customCheckbox">
												<input type="checkbox" name="task status" class="task--done--status" id="todo--card--task--status7">
												<label for="todo--card--task--status7"></label>
											</div>
										</div>											
										<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
									</div>
								</li>


							</ul><!-- Todo Card Task List:: END -->
						</div><!-- Todo Card Body :: END -->
					</div>
				</div>
			</div><!-- Card Container :: END -->`

		return todoCardHTML;
	}

}