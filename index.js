import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
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
  resetForm();
});

onValue(tasksInDB, function (snapshot) {
  let listItems = Object.values(snapshot.val());
  resetList();
  listItems.forEach((item) => addTask(item));
});

const resetForm = () => {
  inputFieldEl.value = "";
};

const addTask = (value) => {
  tasksList.innerHTML += `<li>${value}</li>`;
};

const resetList = () => {
  tasksList.innerHTML = "";
};
