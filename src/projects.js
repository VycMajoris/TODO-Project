export const projects = [
  {
    projectName: "Project 1",
    tasks: [
      {
        title: "Task 1",
        details: "Details of task 1",
        date: "2023-03-10",
      },
      {
        title: "Task 2",
        details: "Details of task 2",
        date: "2023-03-11",
      },
    ],
  },
];

export function createTodosFunc(title, details, date) {
  return { title, details, date };
}
