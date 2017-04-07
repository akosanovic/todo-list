
import {TodoCardInterface} from './todoCardInterface';


export class TodoCard implements TodoCardInterface {
	private counter        : number;
	private cardHeaderColor: string;
	private cardTitle      : string;


	constructor() {

	}
	clickHandler( e ){

	}

	private getHeaderColor(){}
	private getCardTitle(){}


	private getHTML(): string{


		let todoCardHTML = 
			`
				<div class="col-sm-1 col-ms-1 col-lg-4 col-md-6">
					<div class="todoCardContainer todo--card--contianer" data-cardId="counter">
						<div class="todoCardContent">


							<div class="todoCardHeader cardHeaderColor">

								<!-- #1 -->
								<div class="inputGroup">
									<div class="absolutePositionedPrefix">
										<div class="iconContainer">
											<i class="fa fa-file-text-o" aria-hidden="true"></i>
										</div>
									</div>											
									<input type="text" class="inputGroupDescription" name="todo card description" value="Danasnji Taskovi">
								</div>


								<!-- #2 -->
								<!-- On Click display Drop Down Menu :: BEGIN  -->
								<a href="#" class="cardMenuButton todo--card--menu--button">
									<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
								</a>
								<div class="todoCardDropDownMenu">
									<div class="dropDownMenuContainer todo--card--dropdown--menu">
										<ul class="dropdownMenuList">
											<li class="dropdownMenuItem">
												<a href="#" class="dropdownMenuLink drop--down--menu--link">
													Edit Card
												</a>
											</li>
											<li class="dropdownMenuItem">
												<a href="#" class="dropdownMenuLink drop--down--menu--link">
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

								<ul class="todoCardTaskList">



									<li class="todoCardTaskItem taskItem">
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


									<li class="todoCardTaskItem taskItem">
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
										<li class="todoCardTaskItem taskItem">
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
									<li class="todoCardTaskItem taskItem">
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
									<li class="todoCardTaskItem taskItem">
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





								</ul>
							</div><!-- Todo Card Body :: END -->
						</div>
					</div>
				</div><!-- Card Container :: END -->
			`
	}

}