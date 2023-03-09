export function createProjectDiv(text) {
  const div = document.createElement("div");
  const projectContainer = document.querySelector(".project-names-container");
  div.setAttribute("class", "individual-project-container");

  div.innerHTML = text;

  const todoListContainer = document.querySelector(".todo-list-container");
  div.addEventListener("click", () => {
    todoListContainer.innerHTML = "";
  });
  div.addEventListener("click", createTaskAddBtn);
  projectContainer.appendChild(div);
}

export function createTodoListContainer() {
  const div = document.createElement("div");
  const rightPanel = document.querySelector(".right-panel");

  div.setAttribute("class", "todo-list-container");

  rightPanel.appendChild(div);
}

export function createTaskAddBtn() {
  const button = document.createElement("button");
  button.setAttribute("class", "add-task-btn");
  button.innerHTML = "Add Task";
  const todoListContainer = document.querySelector(".todo-list-container");
  todoListContainer.appendChild(button);
}
