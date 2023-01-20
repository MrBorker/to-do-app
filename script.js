"use strict";

// Data

let tasksArray = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

// Elements

const tasksContainer = document.querySelector(".tasks__container");
const taskTemplate = document.querySelector("#task__template");
const taskCreator = document.querySelector(".task__wrapper-create");
const taskInput = document.querySelector(".task__input__add");
const overlay = document.querySelector(".main__shadow");

const addTaskBtn = document.querySelector(".button__add-task");
const closeBtn = document.querySelector(".task__button-close");
const doneBtn = document.querySelector(".task__button-add");

const filterClearBtn = document.querySelector(".filter__button-clear");
const filterSortBtn = document.querySelector(".filter__button-sort");
const filterContainer = document.querySelector(".filter__options");
const filterInput = filterContainer.querySelectorAll("input");
const defaultFilter = document.querySelector("#radio-1");

const allTaskQuantity = document.querySelector(".header-stat-number-all");
const doTaskQuantity = document.querySelector(".header-stat-number-do");
const doneTaskQuantity = document.querySelector(".header-stat-number-done");

const taskCheckerBtn = ".task__button-checker";
const taskRemoverBtn = ".task__button-remove";
const taskRemoverDoneBtn = ".task__button-remove-done";
const taskEditorBtn = ".task__button-edit";

// Functions

const closeTaskCreator = function () {
  taskInput.value = "";
  overlay.classList.add("hidden");
  taskCreator.classList.add("hidden");
};

const displayAndSave = function (array) {
  displayTasks(array);
  localStorage.tasks = JSON.stringify(array);
  defaultFilter.checked = true;
};

const handleTask = function (selector, action) {
  let button = document.querySelectorAll(selector);
  button.forEach((btn) => btn.addEventListener("click", action));
};

const crossOffTask = function () {
  const id = this.parentElement.dataset.taskNumber;
  const index = tasksArray.findIndex((item) => item.id === id);
  tasksArray[index].status === true
    ? (tasksArray[index].status = false)
    : (tasksArray[index].status = true);
  displayAndSave(tasksArray);
};

const deleteTask = function () {
  const id = this.parentElement.parentElement.dataset.taskNumber;
  const index = tasksArray.findIndex((item) => item.id === id);
  tasksArray.splice(index, 1);
  displayAndSave(tasksArray);
};

const editTask = function () {
  const id = this.parentElement.parentElement.dataset.taskNumber;
  const taskWrapper = document.querySelector(`[data-task-number='${id}']`);
  const taskCheckerBtn = taskWrapper.querySelector(".task__button-checker");
  const doneBtn = taskWrapper.querySelector(".task__button-done");
  const title = taskWrapper.querySelector(".task__title");
  const input = taskWrapper.querySelector(".task__input-edit");

  this.classList.add("hidden");
  taskCheckerBtn.classList.add("hidden");
  title.classList.add("hidden");
  doneBtn.classList.remove("hidden");
  input.classList.remove("hidden");

  doneBtn.addEventListener("click", function () {
    tasksArray.forEach((task) => {
      if (task.id === id && input.value) task.text = input.value;
    });
    displayAndSave(tasksArray);
    this.classList.remove("hidden");
    taskCheckerBtn.classList.remove("hidden");
    title.classList.remove("hidden");
    doneBtn.classList.add("hidden");
    input.classList.add("hidden");
  });
};

const renewStatistics = function (array) {
  allTaskQuantity.textContent = array.length;
  doTaskQuantity.textContent = array.filter(
    (task) => task.status === true
  ).length;
  doneTaskQuantity.textContent = array.filter(
    (task) => task.status === false
  ).length;
};

const displayTasks = function (array) {
  while (tasksContainer.firstChild) {
    tasksContainer.firstChild.remove();
  }
  array.forEach((task) => {
    const taskGenerator = taskTemplate.content.cloneNode(true);
    const taskWrapper = taskGenerator.querySelector(".task__wrapper");
    const taskChecker = taskGenerator.querySelector(".task__checker");
    const taskTitle = taskGenerator.querySelector(".task__title");
    const editBtn = taskGenerator.querySelector(".task__button-edit");
    const removeBtn = taskGenerator.querySelector(".task__button-remove");
    const removeDoneBtn = taskGenerator.querySelector(
      ".task__button-remove-done"
    );
    taskWrapper.dataset.taskNumber = task.id;
    taskTitle.textContent = task.text;
    if (task.status === true) {
      taskChecker.classList.remove("task__checker-done");
      taskTitle.classList.remove("task__title-done");
      editBtn.classList.remove("hidden");
      removeBtn.classList.remove("hidden");
      removeDoneBtn.classList.add("hidden");
    } else {
      taskChecker.classList.add("task__checker-done");
      taskTitle.classList.add("task__title-done");
      editBtn.classList.add("hidden");
      removeBtn.classList.add("hidden");
      removeDoneBtn.classList.remove("hidden");
    }
    tasksContainer.append(taskWrapper);
    const input = document
      .querySelector(`[data-task-number='${task.id}']`)
      .querySelector(".task__input-edit");
    input.value = `${task.text}`;
  });
  handleTask(taskCheckerBtn, crossOffTask);
  handleTask(taskRemoverBtn, deleteTask);
  handleTask(taskRemoverDoneBtn, deleteTask);
  handleTask(taskEditorBtn, editTask);
  renewStatistics(array);
};

// Buttons

filterSortBtn.addEventListener("click", function () {
  filterContainer.classList.toggle("hidden");
});

filterInput.forEach((btn) => {
  btn.addEventListener("click", function () {
    let filteredArray = [...tasksArray];
    switch (btn.id) {
      case "radio-1":
        displayTasks(JSON.parse(localStorage.tasks));
        break;
      case "radio-2":
        displayTasks(filteredArray.filter((task) => task.status === true));
        break;
      case "radio-3":
        displayTasks(filteredArray.filter((task) => task.status === false));
        break;
      case "radio-4":
        displayTasks(
          filteredArray.sort((a, b) =>
            a.text > b.text ? 1 : b.text > a.text ? -1 : 0
          )
        );
        break;
    }
  });
});

document.body.addEventListener("click", function (event) {
  if (event.target !== filterContainer && event.target !== filterSortBtn)
    filterContainer.classList.add("hidden");
});

filterClearBtn.addEventListener("click", function () {
  tasksArray = [];
  displayAndSave(tasksArray);
});

addTaskBtn.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  taskCreator.classList.remove("hidden");
});

doneBtn.addEventListener("click", function () {
  if (taskInput.value !== "") {
    tasksArray.push({
      text: taskInput.value,
      status: true,
      id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
    });
    displayAndSave(tasksArray);
    closeTaskCreator();
  }
});

closeBtn.addEventListener("click", closeTaskCreator);

// Initial launch

displayTasks(tasksArray);
renewStatistics(tasksArray);
