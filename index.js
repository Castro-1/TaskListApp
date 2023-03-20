import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  if (inputValue) {
    push(tasksInDB, inputValue);
    resetForm();
  }
});

onValue(tasksInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listItems = Object.entries(snapshot.val());
    resetList();
    listItems.forEach((item) => {
      addTask(item);
    });
    return;
  }
  tasksList.innerHTML = "No items here...";
});

const resetForm = () => {
  inputFieldEl.value = "";
};

const resetList = () => {
  tasksList.innerHTML = "";
};

const addTask = (item) => {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", () => {
    let exactLocationOfTaskInDB = ref(database, `tasks/${itemID}`);
    remove(exactLocationOfTaskInDB);
  });

  tasksList.append(newEl);
};
