export const projects = [];

export function createTodosFunc(
  title,
  details,
  date,
  complete,
  important,
  index
) {
  return { title, details, date, complete, important, index };
}

export const projectNamesArray = [];
/* 
export const projects = [
  {
    projectTitle: "Project 1",
    tasks: [
      {
        title: "Task 1",
        details: "Details of task 1",
        date: "2023-03-10",
        complete: false,
        important: false,
        index: 0,
      },
      {
        title: "Task 2",
        details: "Details of task 2",
        date: "2023-03-11",
        complete: false,
        important: false,
        index: 1,
      },
    ],
  },
]; */
