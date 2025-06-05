const dateField = document.getElementById("date-list");
const updateDate = () => {
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
    dateField.textContent = `${days[date.getDay()]} ${months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
};
const boxImage = "./images/box.png";
const crossedBox = "./images/checkbox.png";
const body = document.querySelector("body");
const darkMode = document.getElementById("header-image");
const listTitle = document.getElementById("list-title");
const tasksContainer = document.getElementById("tasks-container");
const clearDOMContainer = document.querySelector(".btn-container");
const clearBtn = document.querySelector("#clear-btn");
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
let isDarkMode = JSON.parse(localStorage.getItem("darkmode")) || false;
const clearContainer = () => {
    tasksContainer.innerHTML = "";
};

const updateTitle = () => {
    listTitle.value = taskTitle;
};

listTitle.addEventListener("blur", function () {
    localStorage.setItem("title", JSON.stringify(listTitle.value));
})

const displayTasks = (taskReturnedData) => {
    clearContainer();

    taskReturnedData.forEach((element) => {
        tasksContainer.innerHTML += `
        <div class="task ${element.state === false ? "" : "crossed"}">
            <div>
                <img class="task-box ${element.state}" src="${element.state === false ? boxImage : crossedBox}">
            </div>
            <div class="my id-input">
                <input type="text" placeholder="Write here" id="task-list${element.id}" name="task-list${element.id}" class="task-input" value="${element.value}" ${element.state ? "disabled" : ""}>
            </div>
            <div class="delete-btn">
                <img class="task-trash" src="./images/bin.png">
            </div>
        </div>
        `;
    });

    tasksContainer.innerHTML += newTaskTemplate;

    const newTask = document.querySelector(".new-task");
    if (newTask) {
        newTask.addEventListener("click", function () {
            addNewTaskSpace();
        });
    }

    const deleteBtn = document.querySelectorAll(".delete-btn");
    if (deleteBtn) {
        deleteBtn.forEach(btn => {
            btn.addEventListener("click", function (e) {
                const inputId = btn.parentNode.querySelector(".id-input input").id;
                const match = inputId.match(/^task-list(.+)$/);
                const myId = match ? match[1] : null;
                const toDelete = taskData.findIndex(task => task.id === myId);
                if (toDelete !== -1) {
                    taskData.splice(toDelete, 1);
                    localStorage.setItem("tasks", JSON.stringify(taskData));
                    displayTasks(taskData);
                }
            });
        });
    };

    const inputField = document.querySelectorAll(".task-input");
    if (inputField) {
        inputField.forEach(input => {
            input.addEventListener("blur", function (e) {
                const inputId = input.id;
                const match = inputId.match(/^task-list(.+)$/);
                const myId = match ? match[1] : null;
                const toModify = taskData.findIndex(task => task.id === myId);
                if (toModify !== -1) {
                    if (input.value.trim() === "") {
                        taskData.splice(toModify, 1);
                        localStorage.setItem("tasks", JSON.stringify(taskData));
                        displayTasks(taskData);
                    } else {
                        taskData[toModify] = {
                            id: myId,
                            state: taskData[toModify]?.state,
                            value: input.value,
                        };
                        localStorage.setItem("tasks", JSON.stringify(taskData));
                        displayTasks(taskData);
                    }
                }
            });
        });
    };

    const taskBox = document.querySelectorAll(".task-box");
    if (taskBox) {
        taskBox.forEach(box => {
            box.addEventListener("click", function (e) {
                const idInput = box.parentNode.parentNode.querySelector(".id-input input");
                console.log(idInput);
                const boxId = box.parentNode.parentNode.querySelector(".id-input input").id;
                const match = boxId.match(/^task-list(.+)$/);
                const myId = match ? match[1] : null;
                const toCross = taskData.findIndex(task => task.id === myId);
                if (toCross !== -1) {
                    taskData[toCross] = {
                        id: myId,
                        value: taskData[toCross]?.value,
                        state: !taskData[toCross]?.state,
                    };
                    if (taskData[toCross].state == true) {
                        idInput.disabled = true;
                    } else {
                        idInput.disabled = false;
                    }
                    localStorage.setItem("tasks", JSON.stringify(taskData));
                    displayTasks(taskData);
                }
            });
        });
    };
    displayBtn();
    if (isDarkMode) {
        body.classList.add("dark-mode-background");
        listTitle.classList.add("dark-mode-title");
        dateField.classList.add("dark-mode-date");
        darkMode.classList.add("dark-mode-images");

        document.querySelectorAll(".task-input").forEach(input => input.classList.add("dark-mode-inputs"));
        document.querySelectorAll(".delete-btn").forEach(btn => btn.classList.add("dark-mode-images-task"));
        document.querySelectorAll(".task-box").forEach(box => box.classList.add("dark-mode-images-box"));
        document.querySelectorAll(".new-task").forEach(newTask => newTask.classList.add("dark-mode-new"));
    }
};

const addNewTaskSpace = () => {
    let state = false;
    let id = crypto.randomUUID();
    let value = "";

    const newTaskElement = document.querySelector(".new-task");
    if (newTaskElement) newTaskElement.remove();

    // Create the new task element
    const newTaskHTML = document.createElement("div");
    newTaskHTML.className = `task`;
    newTaskHTML.innerHTML = `
    <div>
        <img class="task-box ${state}" src="${state === false ? boxImage : crossedBox}">    </div>
    <div class="my id-input">
        <input type="text" placeholder="Write here" id="task-list${id}" name="task-list${id}" class="task-input" value="${value}">
    </div>
    <div class="delete-btn">
        <img class="task-trash" src="./images/bin.png">
    </div>
  `;

    // Append task
    tasksContainer.appendChild(newTaskHTML);

    // Append back the new task template
    tasksContainer.innerHTML += newTaskTemplate;

    // Add blur listener to the input
    const input = document.getElementById(`task-list${id}`);
    input.addEventListener("blur", function (e) {
        value = e.target.value.trim();
        if (value !== "") {
            taskData.push({
                id: id,
                state: state,
                value: value,
            });
        }
        localStorage.setItem("tasks", JSON.stringify(taskData));
        displayTasks(taskData);
    });

    if (isDarkMode) {
        document.querySelectorAll(".task-input").forEach(input => input.classList.add("dark-mode-inputs"));
        document.querySelectorAll(".delete-btn").forEach(btn => btn.classList.add("dark-mode-images-task"));
        document.querySelectorAll(".task-box").forEach(box => box.classList.add("dark-mode-images-box"));
        document.querySelectorAll(".new-task").forEach(newTask => newTask.classList.add("dark-mode-new"));
    }

    // Re-bind event listener to new ".new-task"
    const newTask = document.querySelector(".new-task");
    if (newTask) {
        newTask.addEventListener("click", function () {
            addNewTaskSpace();
        });
    }
};

const displayBtn = () => {
    if (taskData.length > 0) {
        clearDOMContainer.style.display = "block";
    } else {
        clearDOMContainer.style.display = "none";
    }
}

tasksContainer.addEventListener("change", displayBtn);

clearBtn.addEventListener("click", () => {
    taskData.length = 0;
    localStorage.setItem("tasks", JSON.stringify(taskData));
    displayTasks(taskData);
});

//bonus feature
darkMode.addEventListener("click", function () {
    isDarkMode = !isDarkMode;

    body.classList.toggle("dark-mode-background");
    listTitle.classList.toggle("dark-mode-title");
    dateField.classList.toggle("dark-mode-date");
    darkMode.classList.toggle("dark-mode-images");

    document.querySelectorAll(".task-input").forEach(input => input.classList.toggle("dark-mode-inputs"));
    document.querySelectorAll(".delete-btn").forEach(btn => btn.classList.toggle("dark-mode-images-task"));
    document.querySelectorAll(".task-box").forEach(box => box.classList.toggle("dark-mode-images-box"));
    document.querySelectorAll(".new-task").forEach(newTask => newTask.classList.toggle("dark-mode-new"));

    localStorage.setItem("darkmode", JSON.stringify(isDarkMode));
});


window.addEventListener("load", function () {
    updateDate();
    updateTitle();
    displayTasks(taskData);
    displayBtn();
});

