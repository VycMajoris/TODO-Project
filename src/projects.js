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

export function dateFormatter(dateValue) {
  const dateArray = dateValue.split("");
  const dash = dateArray.slice(4, 5);
  const year = dateArray.slice(0, 4);
  const month = dateArray.slice(5, 8);
  const day = dateArray.slice(8);
  const formattedDate = month.concat(day).concat(dash).concat(year);
  const finalDate = formattedDate.join("");
  return { finalDate, day };
}

/* 
export const projects = [
  {
    projectTitle: "Project 1",
    tasks: [
      {
        title: "Task 1",
        details: "Details of task 1",
        date: "03-10-2023",
        complete: false,
        important: false,
        index: 0,
      },
      {
        title: "Task 2",
        details: "Details of task 2",
        date: "15-03-2023",
        complete: false,
        important: false,
        index: 1,
      },
    ],
  },
]; */
