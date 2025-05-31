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
const taskTitle = JSON.parse(localStorage.getItem("title")) || "";
const taskData = JSON.parse(localStorage.getItem("tasks")) || [];

tasksContainer.innerHTML += 
`
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
