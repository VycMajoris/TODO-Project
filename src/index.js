import { eventsFunc } from "./events";
import { projects } from "./projects";
import { createProjectDiv, addProjectsToPage } from "./create_element";
import "./style.css";

let getProjectsLocal;

if (localStorage.getItem("projectsKey")) {
  getProjectsLocal = localStorage.getItem("projectsKey");
  const projectsFromLocal = JSON.parse(getProjectsLocal);
  projects.push(...projectsFromLocal);
}

eventsFunc();

const projectTitles = projects.map((project) => project.projectTitle);

for (let i = 0; i < projectTitles.length; i++) {
  createProjectDiv(projectTitles[i], true);
  console.log("RUNNNNN");
  /* addProjectsToPage(); */
}
