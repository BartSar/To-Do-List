//localStorage.setItem("tasks", JSON.stringify([])); throw 1;

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskList)
function updateLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

function createTask(taskText, taskStatus, update){
    console.log("createTask",taskText,taskStatus)
    try{
        let taskObject = {}
        taskObject.taskText = taskText;
        let taskListNode = document.getElementById("task-list");
        let taskNumber = document.querySelectorAll("#task-list > li").length;
        let newTaskLi = document.createElement("li");
        taskObject.taskNumber = "task-"+ taskNumber+1;
        newTaskLi.setAttribute("name","task-"+ taskNumber+1);
        let newCheckboxInput = document.createElement("input");
        newCheckboxInput.setAttribute("type","checkbox");
        newCheckboxInput.checked = taskStatus;
        newCheckboxInput.addEventListener("change", function(event){
            let activeLi = event.target.parentNode;
            if (event.target.checked) event.target.nextSibling.style.textDecoration="line-through";
            else event.target.nextSibling.style.textDecoration="none";
            console.log(activeLi.getAttribute("name"),event.target.checked)
            for (i in taskList){
                if (taskList[i].taskNumber == activeLi.getAttribute("name")) {
                    taskList[i].taskStatus = event.target.checked
                    updateLocalStorage()
                    break;
                }
            }
        })
        taskObject.taskStatus = taskStatus;
        let newSpan = document.createElement("span");
        newSpan.setAttribute("class","task");
        newSpan.appendChild(document.createTextNode(taskText));
        let newButton = document.createElement("button");
        newButton.setAttribute("class","delete-btn");
        newButton.addEventListener("click", function(event){
            let activeLi = event.target.parentNode;
            activeLi.parentNode.removeChild(activeLi);
            for (i in taskList){
                if (taskList[i].taskNumber == activeLi.getAttribute("name")) {
                    taskList.splice(i,1)
                    updateLocalStorage()
                    break;
                }
            }
        })
        newTaskLi.appendChild(newCheckboxInput);
        newTaskLi.appendChild(newSpan);
        newTaskLi.appendChild(newButton);
        taskListNode.appendChild(newTaskLi);
        document.getElementById("input-task").value = "";

        if(update){
            taskList.push(taskObject)
            updateLocalStorage()
            console.log(taskList)
        }

    }
    catch(e){
        console.log(e);
    }
}



for (i in taskList){
    createTask(taskList[i].taskText, taskList[i].taskStatus, false)
}

document.getElementById("add-task-button").addEventListener("click",function (event) {
    createTask(document.getElementById("input-task").value, false, true)
})

