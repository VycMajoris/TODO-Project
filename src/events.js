// eslint-disable-next-line import/no-cycle
import { createProjectDiv, addProjectsToPage } from "./create_element";

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

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createProjectDiv(projectNameInput.value);
    projectNameInput.value = "";
    /* projects.push(projectNameInput.value); */
    /* console.log(projects); */
  });

  addTaskForm.addEventListener("submit", submitForm);

  editForm();

  const taskPopup = document.querySelector(".task-popup");

  const formCancelBtn = document.querySelector(".form-cancel-btn");
  formCancelBtn.addEventListener("click", () => {
    taskPopup.style.display = "none";
  });

  const addTaskFormBtn = document.querySelector(".add-task-form-btn");
  addTaskFormBtn.addEventListener("click", () => {
    taskPopup.style.display = "none";
  });
}

export function submitForm(e, editOption, titleVal, todoEdit) {
  e.preventDefault();

  const addTaskBtn = document.querySelector(".add-task-btn");
  const projectName = addTaskBtn.id;
  const title = document.getElementById("title");
  const details = document.getElementById("details");
  const date = document.getElementById("date");
  const projectNameInput = document.querySelector(".project-name-input");

  let project = projects.find((p) => p.projectTitle === projectName);

  if (editOption) {
    /* project = projects.find((p) => p.projectTitle === titleVal); */
    const taskIndex = project.tasks.findIndex((t) => t.title === titleVal);

    project.tasks[taskIndex] = createTodosFunc(
      title.value,
      details.value,
      date.value,
      false,
      false
    );
  } else {
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
    console.log("second");
  }

  addProjectsToPage();
  title.value = "";
  details.value = "";
  date.value = "";
}

export function editForm() {
  const todoEdit = document.querySelector(".todo-edit-form");
  todoEdit.addEventListener("submit", (e) => {
    submitForm(e, true, null, todoEdit);
  });
}
