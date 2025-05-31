const updateDate = () => {
    const dateField = document.getElementById("date-list");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const date = new Date();
    dateField.textContent = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
updateDate();
const listTitle = document.getElementById("list-title");
const tasksContainer = document.getElementById("tasks-container");
const newTaskTemplate = `
    <div class="new-task">
        <div>
            <img id="add-task-icon" src="./images/plus.png">
        </div>
        <div>
            <p id="new-text">Add new task</p>
        </div>
        <div>
            <img id="new-task-cat" src="./images/cat.png" alt="cat waiting for you to add a task">
        </div>
    </div>
    `;
const taskTitle = JSON.parse(localStorage.getItem("title")) || "";
const taskData = JSON.parse(localStorage.getItem("tasks")) || [];

const clearContainer = () => {
    tasksContainer.innerHTML = "";
}

const updateTitle = () =>{
    listTitle.value = taskTitle;
}
updateTitle();

const displayTasks = (taskReturnedData) => {
    tasksContainer.innerHTML += newTaskTemplate;
    
};
displayTasks(taskData);

const newTask = document.querySelector(".new-task");

const addNewTaskSpace = () => {
    const newTaskSpace = 
    `
    <div class="task">
        <div>
            <img class="task-box" src="./images/box.png">
        </div>
        <div class="my">
            <input type="text" placeholder="Write here" id="task-list" name="task-list" class="task-input">
        </div>
        <div>
            <img class="task-trash" src="./images/bin.png">
        </div>
    </div>
    `;
    clearContainer();
    tasksContainer.innerHTML = newTaskSpace + newTaskTemplate;
}
addNewTaskSpace();
newTask.addEventListener('click', addNewTaskSpace);
