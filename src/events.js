import {
  createProjectDiv,
  createTodoListContainer,
  createTaskAddBtn,
} from "./create_element";
import { projects, createTodosFunc } from "./projects";

/* Some event listeners are created in create_element.js */

export default function eventsFunc() {
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
    projects.push(projectNameInput.value);
    console.log(projects);
    projectNameInput.value = "";
  });

  /*   addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const addTaskBtn = document.querySelector(".add-task-btn");
    const projectName = addTaskBtn.id;
    const title = document.getElementById("title");
    const details = document.getElementById("details");
    const date = document.getElementById("date");

    const obj1 = {projectName, }

    projects.push({addTaskBtn.id, });
    console.log(projects);
    projectNameInput.value = "";
  }); */
}
