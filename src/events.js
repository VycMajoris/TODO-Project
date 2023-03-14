// eslint-disable-next-line import/no-cycle
import {
  createProjectDiv,
  addProjectsToPage,
  createIndividualTodoContainer,
} from "./create_element";

import { projects, createTodosFunc, projectNamesArray } from "./projects";

/* Some event listeners are created in create_element.js */

export function eventsFunc() {
  const addProjectBtn = document.querySelector(".add-project-btn");
  const addProjectPopupDiv = document.querySelector(".add-project-popup-div");
  const projectNameInput = document.querySelector(".project-name-input");
  addProjectBtn.addEventListener("click", () => {
    addProjectPopupDiv.style.display = "block";
  });

  const cancelBtn = document.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", () => {
    addProjectPopupDiv.style.display = "none";
  });

  const addProjectForm = document.querySelector(".add-project-form");
  const addTaskForm = document.querySelector(".add-task-form");
  const editTaskForm = document.querySelector(".edit-task-form");

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("projectNamesArray");
    console.log(projectNamesArray);
    if (!projectNamesArray.includes(projectNameInput.value)) {
      projectNamesArray.push(projectNameInput.value);
      createProjectDiv(projectNameInput.value);
    }

    projectNameInput.value = "";
    addProjectPopupDiv.style.display = "none";
  });

  addTaskForm.addEventListener("submit", submitForm);

  const taskPopup = document.querySelector(".task-popup");

  const formCancelBtn = document.querySelector(".form-cancel-btn");
  formCancelBtn.addEventListener("click", () => {
    taskPopup.style.display = "none";
  });

  const addTaskFormBtn = document.querySelector(".add-task-form-btn");
  addTaskFormBtn.addEventListener("click", () => {
    taskPopup.style.display = "none";
  });

  editTaskForm.addEventListener("submit", editForm);

  const editTaskPopup = document.querySelector(".edit-task-popup");

  const editFormCancelBtn = document.querySelector(".edit-form-cancel-btn");
  editFormCancelBtn.addEventListener("click", () => {
    editTaskPopup.style.display = "none";
  });

  const editTaskFormBtn = document.querySelector(".edit-task-form-btn");
  editTaskFormBtn.addEventListener("click", () => {
    editTaskPopup.style.display = "none";
  });
}

// Submit Form:
export function submitForm(e) {
  e.preventDefault();
  const addTaskBtn = document.querySelector(".add-task-btn");
  const projectName = addTaskBtn.id;
  const title = document.getElementById("title");
  const details = document.getElementById("details");
  const date = document.getElementById("date");
  const projectNameInput = document.querySelector(".project-name-input");

  let project = projects.find((p) => p.projectTitle === projectName);

  if (!project) {
    project = {
      projectTitle: projectName,
      tasks: [],
    };

    projects.push(project);
  }
  project.tasks.push(
    createTodosFunc(
      title.value,
      details.value,
      date.value,
      false,
      false,
      project.tasks.length
    )
  );

  addProjectsToPage();

  title.value = "";
  details.value = "";
  date.value = "";
}

// Edit Form:
export function editForm(e) {
  e.preventDefault();

  const editTaskForm = document.querySelector(".edit-task-form");
  const addTaskBtn = document.querySelector(".add-task-btn");

  const editedTitle = document.getElementById("edit-title");

  const editedDetails = document.getElementById("edit-details");
  const editedDate = document.getElementById("edit-date");
  const todoEdit = createIndividualTodoContainer.todoEditAccess;

  const project = projects.find((p) => p.projectTitle === addTaskBtn.id);
  const task = project.tasks.find((t) => t.index === todoEdit);

  task.title = editedTitle.value;
  task.details = editedDetails.value;
  task.date = editedDate.value;

  addProjectsToPage();
}

// All tasks filter

const allTasksFilter = document.querySelector(".all-tasks-filter");
const tasksContainer = document.querySelector(".tasks-container");
const projectNameDisplay = document.querySelector(".filter-display-div");

allTasksFilter.addEventListener("click", () => {
  projectNameDisplay.innerHTML = "All Tasks";
  tasksContainer.innerText = "";

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].tasks.length; j++) {
      createIndividualTodoContainer(
        projects[i].tasks[j].title,
        projects[i].tasks[j].details,
        projects[i].tasks[j].date,
        projects[i].tasks[j].complete,
        projects[i].tasks[j].important,
        i,
        projects[i].projectTitle,
        // remove event listeners from buttons
        true
      );
    }
  }
});

// Important filter

const importantFilter = document.querySelector(".important-filter");

importantFilter.addEventListener("click", importantFilterFunc);

export function importantFilterFunc() {
  const addTaskBtn = document.querySelector(".add-task-btn");

  projectNameDisplay.innerHTML = "Important Tasks";
  tasksContainer.innerText = "";
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].tasks.length; j++) {
      if (projects[i].tasks[j].important === true) {
        createIndividualTodoContainer(
          projects[i].tasks[j].title,
          projects[i].tasks[j].details,
          projects[i].tasks[j].date,
          projects[i].tasks[j].complete,
          projects[i].tasks[j].important,
          i,
          projects[i].projectTitle,
          // remove event listeners from buttons
          true
        );
      }
    }
  }
}
