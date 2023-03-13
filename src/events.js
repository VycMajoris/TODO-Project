// eslint-disable-next-line import/no-cycle
import {
  createProjectDiv,
  addProjectsToPage,
  createIndividualTodoContainer,
} from "./create_element";

import { projects, createTodosFunc } from "./projects";

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

  const addBtn = document.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {
    addProjectPopupDiv.style.display = "none";
  });

  const addProjectForm = document.querySelector(".add-project-form");
  const addTaskForm = document.querySelector(".add-task-form");
  const editTaskForm = document.querySelector(".edit-task-form");

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createProjectDiv(projectNameInput.value);
    projectNameInput.value = "";
    /* projects.push(projectNameInput.value); */
    /* console.log(projects); */
  });

  /*   addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const addTaskBtn = document.querySelector(".add-task-btn");
    const projectName = addTaskBtn.id;
    const title = document.getElementById("title");
    const details = document.getElementById("details");
    const date = document.getElementById("date");
    let project = projects.find((p) => p.projectTitle === projectName);
    if (!project) {
      project = {
        projectTitle: projectName,
        tasks: [],
      };
      projects.push(project);
    }
    project.tasks.push(
      createTodosFunc(title.value, details.value, date.value, false, false)
    );
    projectNameInput.value = "";
    addProjectsToPage();
  }); */

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

  console.log("editForm Trigger");

  task.title = editedTitle.value;
  task.details = editedDetails.value;
  task.date = editedDate.value;

  addProjectsToPage();
}
