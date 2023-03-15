import RadioUncheckedIcon from "../assets/images/icons/radio_unchecked.png";
// import RadioCheckedIcon from "../assets/images/icons/radio_checked.png";
import RadioCheckedIcon from "../assets/images/icons/checkmark.png";

import DeleteIcon from "../assets/images/icons/delete.png";
import EditIcon from "../assets/images/icons/edit.png";
import StarCheckedIcon from "../assets/images/icons/star_checked.png";
import StarUncheckedIcon from "../assets/images/icons/star_unchecked.png";
import { projects, createTodosFunc } from "./projects";
// eslint-disable-next-line import/no-cycle
import { submitForm } from "./events";

var md5 = require("md5");

export function createProjectDiv(text, initial) {
  const projectNameDisplay = document.querySelector(".filter-display-div");
  const div = document.createElement("div");
  const projectContainer = document.querySelector(".project-names-container");
  const noTaskPara = document.querySelector(".no-task");
  div.setAttribute("class", "individual-project-container");

  div.innerHTML = text;
  // set the project name as id of the div
  // div.id = text;

  const todoListContainer = document.querySelector(".todo-list-container");
  div.addEventListener("click", () => {
    if (noTaskPara !== undefined) todoListContainer.removeChild(noTaskPara);
  });
  div.addEventListener("click", () => {
    projectNameDisplay.innerHTML = text;
    const buttonElements = todoListContainer.querySelectorAll("button");
    // to prevent from adding more than one button
    for (let i = 0; i < buttonElements.length; i++) {
      if (buttonElements[i].innerText === "Add Task")
        buttonElements[i].remove();
    }
    createTaskAddBtn(text);
  });
  div.addEventListener("click", addProjectsToPage);

  projectContainer.appendChild(div);
}

export function createTodoListContainer() {
  const div = document.createElement("div");
  const rightPanel = document.querySelector(".right-panel");

  div.setAttribute("class", "todo-list-container");

  rightPanel.appendChild(div);
}

export function createTaskAddBtn(divText) {
  const button = document.createElement("button");
  const taskPopup = document.querySelector(".task-popup");

  button.setAttribute("class", "add-task-btn");
  button.innerHTML = "Add Task";
  button.id = divText;

  button.addEventListener("click", addTaskBtnEvent);

  function addTaskBtnEvent() {
    taskPopup.style.display = "block";
  }
  const todoListContainer = document.querySelector(".todo-list-container");
  todoListContainer.appendChild(button);
}

export function createIndividualTodoContainer(
  title,
  details,
  date,
  complete,
  important,
  order,
  projectName,
  removeEvents
) {
  const taskPopup = document.querySelector(".task-popup");
  const editTaskPopup = document.querySelector(".edit-task-popup");

  const addTaskBtn = document.querySelector(".add-task-btn");
  const tasksContainer = document.querySelector(".tasks-container");
  /* tasksContainer.innerHTML = ""; */
  const hash = Math.floor(Math.random() * 1000000);
  const todoDisplayContainer = document.createElement("div");
  const taskTitle = document.getElementById("title");
  const project = projects.find((p) => p.projectTitle === addTaskBtn.id);
  const todoEdit = document.createElement("div");
  // todoEdit.setAttribute("data-custom-edit", title);
  todoEdit.setAttribute("class", order);
  todoEdit.setAttribute("data-custom", "todoEditData");

  // const dataCustomEdit = todoEdit.getAttribute("data-custom-edit");
  const task = project.tasks.find((t) => t.index === order);

  todoDisplayContainer.setAttribute("class", "todo-display-container");
  todoDisplayContainer.setAttribute("id", order);
  const leftSide = document.createElement("div");
  leftSide.setAttribute("class", "todo-display-left");
  leftSide.setAttribute("id", md5(hash));
  const rightSide = document.createElement("div");
  rightSide.setAttribute("class", "todo-display-right");
  const todoIsCompleted = document.createElement("div");

  const todoTitle = document.createElement("span");
  todoTitle.innerText = title;
  const todoDetails = document.createElement("span");
  todoDetails.innerText = details;
  const dateDisplayDiv = document.createElement("div");
  date === ""
    ? (dateDisplayDiv.innerText = "No due date")
    : (dateDisplayDiv.innerText = date);
  const todoIsImportant = document.createElement("div");

  const todoRemove = document.createElement("div");
  todoRemove.setAttribute("class", order);

  const radioUncheckedBtn = new Image();
  radioUncheckedBtn.src = RadioUncheckedIcon;
  radioUncheckedBtn.setAttribute("class", "unchecked");

  const radioCheckedBtn = new Image();
  radioCheckedBtn.src = RadioCheckedIcon;

  radioCheckedBtn.setAttribute("class", "checked");
  /*   radioCheckedBtn.style.fill = "red"; */
  const deleteBtn = new Image();
  deleteBtn.src = DeleteIcon;
  const editBtn = new Image();
  editBtn.src = EditIcon;
  const starCheckedBtn = new Image();
  starCheckedBtn.src = StarCheckedIcon;
  const starUncheckedBtn = new Image();
  starUncheckedBtn.src = StarUncheckedIcon;
  const projectNameDisplay = document.createElement("div");
  projectNameDisplay.innerText = projectName;
  projectNameDisplay.style.marginRight = "2rem";

  if (complete) {
    todoIsCompleted.appendChild(radioCheckedBtn);
  } else if (!complete) {
    todoIsCompleted.appendChild(radioUncheckedBtn);
  }

  if (important) {
    todoIsImportant.appendChild(starCheckedBtn);
  } else if (!important) {
    todoIsImportant.appendChild(starUncheckedBtn);
  }

  todoEdit.appendChild(editBtn);
  todoRemove.appendChild(deleteBtn);

  leftSide.appendChild(todoIsCompleted);
  leftSide.appendChild(todoTitle);
  leftSide.appendChild(todoDetails);

  rightSide.appendChild(projectNameDisplay);
  rightSide.appendChild(dateDisplayDiv);
  rightSide.appendChild(todoIsImportant);
  rightSide.appendChild(todoEdit);
  rightSide.appendChild(todoRemove);

  todoDisplayContainer.appendChild(leftSide);
  todoDisplayContainer.appendChild(rightSide);

  tasksContainer.appendChild(todoDisplayContainer);

  if (!removeEvents) {
    todoIsCompleted.addEventListener("click", () => {
      /*   const project = projects.find((p) => p.projectTitle === addTaskBtn.id); */

      if (project.tasks[order].complete === true) {
        project.tasks[order].complete = false;
      } else if (project.tasks[order].complete === false) {
        project.tasks[order].complete = true;
      }

      addProjectsToPage();
    });
  }

  if (!removeEvents) {
    todoIsImportant.addEventListener("click", () => {
      if (project.tasks[order].important === true) {
        project.tasks[order].important = false;
      } else if (project.tasks[order].important === false) {
        project.tasks[order].important = true;
      }

      addProjectsToPage();
    });
  }

  if (!removeEvents) {
    todoRemove.addEventListener("click", () => {
      const selectProject = projects.find(
        (p) => p.projectTitle === addTaskBtn.id
      );
      const removeTask = project.tasks.find((t) => t.index === order);
      selectProject.tasks.splice(removeTask.index, 1);
      addProjectsToPage();
    });
  }

  if (!removeEvents) {
    todoEdit.addEventListener("click", () => {
      const addTaskForm = document.querySelector(".add-task-form");

      editTaskPopup.style.display = "block";
      createIndividualTodoContainer.todoEditAccess = order;

      const titleInput = document.getElementById("edit-title");
      const detailsInput = document.getElementById("edit-details");
      const dateInput = document.getElementById("edit-date");

      titleInput.value = task.title;
      detailsInput.value = task.details;
      dateInput.value = task.date;

      /*    const editTaskForm = document.querySelector(".edit-task-form");
    const event = new Event("submit"); */
    });
  }

  todoRemove.addEventListener("click", () => {
    createIndividualTodoContainer.todoRemoveAccess = order;
  });

  /*   todoEdit.addEventListener("submit", () => {
    createTodosFunc(title.value, details.value, date.value, false, false);
  }); */
}

export function addProjectsToPage() {
  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerText = "";
  const addTaskBtn = document.querySelector(".add-task-btn");

  let project = projects.find((p) => p.projectTitle === addTaskBtn.id);

  if (project !== undefined) {
    for (let i = 0; i < project.tasks.length; i++) {
      createIndividualTodoContainer(
        project.tasks[i].title,
        project.tasks[i].details,
        project.tasks[i].date,
        project.tasks[i].complete,
        project.tasks[i].important,
        i,
        project.projectTitle
      );
    }
  } else {
    project = "";
  }
}
