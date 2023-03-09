export function createProjectDiv(text) {
  const div = document.createElement("div");
  const projectContainer = document.querySelector(".project-names-container");
  const noTaskPara = document.querySelector(".no-task");
  div.setAttribute("class", "individual-project-container");

  div.innerHTML = text;
  // set the project name as id of the div
  // div.id = text;

  const todoListContainer = document.querySelector(".todo-list-container");
  div.addEventListener("click", () => {
    todoListContainer.removeChild(noTaskPara);
  });
  div.addEventListener("click", () => {
    const buttonElements = todoListContainer.querySelectorAll("button");
    // to prevent from adding more than one button
    for (let i = 0; i < buttonElements.length; i++) {
      if (buttonElements[i].innerText === "Add Task")
        buttonElements[i].remove();
    }
    createTaskAddBtn(text);
  });

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

  button.addEventListener("click", () => {
    console.log(taskPopup);
    taskPopup.style.display = "block";
  });
  const todoListContainer = document.querySelector(".todo-list-container");
  todoListContainer.appendChild(button);
}
