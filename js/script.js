"use strict";

// Data

let tasksArray = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

// Elements

const tasksContainer = document.querySelector(".tasks__container");
const taskTemplate = document.querySelector("#task__template");
const taskCreator = document.querySelector(".task__wrapper-create");
const taskInput = document.querySelector(".task__input__add");
const overlay = document.querySelector(".shadow");
const main = document.querySelector(".main");

const addTaskBtn = document.querySelector(".button__add-task");
const closeBtn = document.querySelector(".task__button-close");
const createBtn = document.querySelector(".task__button-add");

const filterClearBtn = document.querySelector(".filter__button-clear");
const filterOpenBtn = document.querySelector(".filter__button-sort");
const filterContainer = document.querySelector(".filter__options");
const filterInput = filterContainer.querySelectorAll("input");
const defaultFilter = document.querySelector("#default");

const allTaskQuantity = document.querySelector(".header-stat-number-all");
const doTaskQuantity = document.querySelector(".header-stat-number-do");
const doneTaskQuantity = document.querySelector(".header-stat-number-done");

const taskCheckerBtn = ".task__button-checker";
const taskRemoverBtn = ".task__button-remove";
const taskRemoverDoneBtn = ".task__button-remove-done";
const taskEditorBtn = ".task__button-edit";
const taskDoneBtn = ".task__button-done";

// Functions

const removeChildNodes = function (parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};

const getUniqueId = function () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const getNodes = function () {
  const taskWrapper = this.closest(".task__wrapper");
  const input = taskWrapper.querySelector(".task__input-edit");
  const id = taskWrapper.dataset.taskNumber;
  const index = tasksArray.findIndex((item) => item.id === id);
  const taskCheckerBtn = taskWrapper.querySelector(".task__button-checker");
  const doneBtn = taskWrapper.querySelector(".task__button-done");
  const title = taskWrapper.querySelector(".task__title");
  return { taskWrapper, index, input, taskCheckerBtn, doneBtn, title };
};

const renderAndSave = function (array) {
  renderTasks(array);
  localStorage.tasks = JSON.stringify(array);
  defaultFilter.checked = true;
};

const taskButtons = function (selector, action) {
  let button = document.querySelectorAll(selector);
  button.forEach((btn) => btn.addEventListener("click", action));
};

const handleCrossOffTaskBtnClick = function () {
  const { index } = getNodes.call(this);
  tasksArray[index].status = !tasksArray[index].status;
  renderAndSave(tasksArray);
};

const handleDeleteTaskBtnClick = function () {
  const { index } = getNodes.call(this);
  tasksArray.splice(index, 1);
  renderAndSave(tasksArray);
};

const handleEditTaskBtnClick = function () {
  const { input, taskCheckerBtn, doneBtn, title } = getNodes.call(this);

  this.classList.toggle("hidden");
  taskCheckerBtn.classList.toggle("hidden");
  title.classList.toggle("hidden");
  doneBtn.classList.toggle("hidden");
  input.classList.toggle("hidden");
};

const handleDoneBtnClick = function () {
  const { index, input } = getNodes.call(this);
  if (input.value) {
    tasksArray[index].text = input.value;
    renderAndSave(tasksArray);
    handleEditTaskBtnClick.call(this);

    return;
  }
  renderTasks(tasksArray);
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

const renderTasks = function (array) {
  removeChildNodes(tasksContainer);
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
  taskButtons(taskCheckerBtn, handleCrossOffTaskBtnClick);
  taskButtons(taskRemoverBtn, handleDeleteTaskBtnClick);
  taskButtons(taskRemoverDoneBtn, handleDeleteTaskBtnClick);
  taskButtons(taskEditorBtn, handleEditTaskBtnClick);
  taskButtons(taskDoneBtn, handleDoneBtnClick);
  renewStatistics(array);
};

// Buttons

document.body.addEventListener("click", function (event) {
  if (event.target !== filterContainer && event.target !== filterOpenBtn)
    filterContainer.classList.add("hidden");
});

const handleFilterOpenBtnClick = function () {
  filterContainer.classList.toggle("hidden");
};

const handleFilterBtnClick = function () {
  let filteredArray = [...tasksArray];
  switch (this.id) {
    case "default":
      renderTasks(JSON.parse(localStorage.tasks));
      break;
    case "active":
      renderTasks(filteredArray.filter((task) => task.status === true));
      break;
    case "done":
      renderTasks(filteredArray.filter((task) => task.status === false));
      break;
    case "alphabet":
      renderTasks(
        filteredArray.sort((a, b) =>
          a.text > b.text ? 1 : b.text > a.text ? -1 : 0
        )
      );
      break;
  }
};

const handleClearBtnClick = function () {
  tasksArray = [];
  renderAndSave(tasksArray);
};

const handleAddTaskBtnClick = function () {
  overlay.classList.remove("hidden");
  taskCreator.classList.remove("hidden");
};

const closeTaskCreator = function () {
  taskInput.value = "";
  overlay.classList.add("hidden");
  taskCreator.classList.add("hidden");
};

const handleCreateBtnClick = function () {
  if (taskInput.value !== "") {
    tasksArray.push({
      text: taskInput.value,
      status: true,
      id: getUniqueId(),
    });
    renderAndSave(tasksArray);
    closeTaskCreator();
  }
};

filterInput.forEach((btn) => {
  btn.addEventListener("click", handleFilterBtnClick);
});

filterOpenBtn.addEventListener("click", handleFilterOpenBtnClick);
addTaskBtn.addEventListener("click", handleAddTaskBtnClick);
filterClearBtn.addEventListener("click", handleClearBtnClick);
createBtn.addEventListener("click", handleCreateBtnClick);
closeBtn.addEventListener("click", closeTaskCreator);

// Initial launch
renderTasks(tasksArray);
renewStatistics(tasksArray);
