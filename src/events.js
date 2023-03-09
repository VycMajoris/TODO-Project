import {
  createProjectDiv,
  createTodoListContainer,
  createTaskAddBtn,
} from "./create_element";
import { projects } from "./projects";

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

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createProjectDiv(projectNameInput.value);
    projects.push(projectNameInput.value);
    console.log(projects);
    projectNameInput.value = "";
  });
}
