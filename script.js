const updateDate = () => {
  const dateField = document.getElementById("date-list");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  dateField.textContent = `${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};
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
};

const updateTitle = () => {
  listTitle.value = taskTitle;
};

let tempSaver;
const displayTasks = (taskReturnedData) => {
  clearContainer();

  taskReturnedData.forEach((element) => {
    tasksContainer.innerHTML += `
        <div class="task ${element.state}">
            <div>
                <img class="task-box" src="./images/box.png">
            </div>
            <div class="my">
                <input type="text" placeholder="Write here" id="task-list${element.id}" name="task-list" class="task-input" value=${element.value}>
            </div>
            <div>
                <img class="task-trash" src="./images/bin.png">
            </div>
        </div>
        `;
  });

  tempSaver = tasksContainer.innerHTML;

  tasksContainer.innerHTML += newTaskTemplate;

  const newTask = document.querySelector(".new-task");
  if (newTask) {
    newTask.addEventListener("click", function () {
      console.log("A ver que show");
      addNewTaskSpace();
    });
  }
};

const addNewTaskSpace = () => {
  let state = false;
  let id = crypto.randomUUID(); // ✅ generates unique ID
  let value = "";

  tasksContainer.innerHTML =
    tempSaver +
    `
        <div class="task ${state}">
            <div>
                <img class="task-box" src="./images/box.png">
            </div>
            <div class="my">
                <input type="text" placeholder="Write here" id="task-list${id}" name="task-list" class="task-input" value=${value}>
            </div>
            <div>
                <img class="task-trash" src="./images/bin.png">
            </div>
        </div>
    ` +
    newTaskTemplate;

  const input = document.getElementById(`task-list${id}`);
  input.addEventListener("blur", function (e) {
    value = e.target.value.trim();

    if (value !== "") {
      taskData.push({
        id: id,
        value: value,
        state: state,
      });
      localStorage.setItem("tasks", JSON.stringify(taskData)); // Save it!
    }

    console.log(taskData);
  });
};


window.addEventListener("load", function () {
  updateDate();
  updateTitle();
  displayTasks(taskData);
});
