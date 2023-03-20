import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://tasklistapp-f286f-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const tasksInDB = ref(database, "tasks");

console.log(app);

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const tasksList = document.getElementById("tasks-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(tasksInDB, inputValue);
  tasksList.innerHTML += `<li>${inputValue}</li>`;
  inputFieldEl.value = "";

  console.log(`${inputValue} added to database`);
});
