//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Event handling, uder interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    if (!taskString || taskString ===null)
        return 0;

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
	//If class of the parent is .editmode
	if(containsClass){
        //switch to .editmode
	    //label becomes the inputs value.
	    label.innerText=editInput.value;
	}else{
		editInput.value=label.innerText;
	}

	//toggle .editmode on the parent.
	listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
	console.log("Delete Task...");

	var listItem=this.parentNode;
	var ul=listItem.parentNode;
	//Remove the parent list item from the ul.
	ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
	console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
	console.log("Incomplete Task...");
    //Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incomplete-tasks.
	var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


	//Bind editTask to edit button.
	editButton.onclick=editTask;
	//Bind deleteTask to delete button.
	deleteButton.onclick=deleteTask;
	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

//MODAL

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btnCompteRendu");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {

    var incompleteList = document.getElementById("incomplete-tasks")
    var incompleteListTag = incompleteList.getElementsByTagName("li");
    var completedList = document.getElementById("completed-tasks")
    var completedListTag = completedList.getElementsByTagName("li");
    var i;
    var modalContent = document.getElementById("modal-content");
    var todoContent = document.getElementById("todoModal");
    var doneContent = document.getElementById("doneModal");

    
    console.log("test1");

    var list = document.getElementById("incomplete-tasks")
    while(list.firstChild) {
        var todo = document.createElement("li");
        var elem = list.firstChild;
        if (elem === null) {
            break;
        }
        console.log("test 1.1");
        console.log(elem);
        todo.innerText = elem.textContent.replace('EditDelete', '');
        todoContent.appendChild(todo);
        list.removeChild(list.firstChild);
    }
        
    console.log("test2");


    list = document.getElementById("completed-tasks")
    while(list.firstChild) {
        var done = document.createElement("li");
        var elem = list.firstChild;
        if (elem === null) {
            break;
        }
        console.log(elem.textContent);
        done.innerText = elem.textContent.replace('EditDelete', '');
        doneContent.appendChild(done);
        list.removeChild(list.firstChild);
    }
    console.log("test3");
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
