"use strict";

// Data

const tasksArray = [
  ["Somebody once told me the world has gonna roll me", true],
  ["Somebody once told me the world", true],
  ["Somebody once told me", true],
  ["Somebody once", true],
];

// Elements

const tasksContainer = document.querySelector(".tasks__container");
const taskCreator = document.querySelector(".task__wrapper-create");
const overlay = document.querySelector(".main__shadow");

const addTaskBtn = document.querySelector(".button__add-task");
const closeBtn = document.querySelector(".task__button-close");
const doneBtn = document.querySelector(".task__button-done");
const filterClear = document.querySelector(".filter__button-clear");

const taskInput = document.querySelector(".task__input");

addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.classList.remove("hidden");
  taskCreator.classList.remove("hidden");
});

doneBtn.addEventListener("click", function () {
  if (taskInput.value !== "") {
    tasksArray.push([taskInput.value, true]);
    displayTasks(tasksArray);
    taskInput.value = "";
    overlay.classList.add("hidden");
    taskCreator.classList.add("hidden");
  }
});

closeBtn.addEventListener("click", function () {
  overlay.classList.add("hidden");
  taskCreator.classList.add("hidden");
});

const addTask = function () {};

const displayTasks = function (tasks, sort = false) {
  tasksContainer.innerHTML = "";
  tasks.forEach((task, i) => {
    const html = ` <div class="task__wrapper">
    <div class="task__checker"></div>
    <p class="task__title">
      ${task[0]}
    </p>
    <div class="task__buttons__wrapper">
      <svg
        class="task__icon__edit"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_36_144)">
          <path
            d="M38.7643 26.3841C38.1866 26.3841 37.7183 26.8524 37.7183 27.4302V36.7177C37.7163 38.4501 36.3127 39.8541 34.5803 39.8557H5.23009C3.49762 39.8541 2.09408 38.4501 2.09203 36.7177V9.45949C2.09408 7.72743 3.49762 6.32348 5.23009 6.32144H14.5176C15.0953 6.32144 15.5636 5.85318 15.5636 5.27542C15.5636 4.69807 15.0953 4.2294 14.5176 4.2294H5.23009C2.34292 4.23267 0.0032688 6.57232 0 9.45949V36.7181C0.0032688 39.6052 2.34292 41.9449 5.23009 41.9481H34.5803C37.4674 41.9449 39.8071 39.6052 39.8104 36.7181V27.4302C39.8104 26.8524 39.3421 26.3841 38.7643 26.3841Z"
            fill="#8F8F8F"
          />
          <path
            d="M39.3961 1.53795C37.5578 -0.300348 34.5774 -0.300348 32.7391 1.53795L14.0775 20.1996C13.9496 20.3274 13.8573 20.486 13.8091 20.66L11.355 29.5197C11.2541 29.883 11.3567 30.272 11.6231 30.5388C11.8899 30.8052 12.2789 30.9077 12.6421 30.8072L21.5018 28.3528C21.6759 28.3046 21.8344 28.2122 21.9623 28.0843L40.6235 9.4223C42.4589 7.58278 42.4589 4.6049 40.6235 2.76538L39.3961 1.53795ZM16.3567 20.8795L31.6298 5.60597L36.5555 10.5317L21.282 25.8051L16.3567 20.8795ZM15.3728 22.8538L19.308 26.7895L13.8646 28.2976L15.3728 22.8538ZM39.1444 7.94317L38.035 9.05252L33.1089 4.12643L34.2187 3.01708C35.2398 1.99599 36.8954 1.99599 37.9165 3.01708L39.1444 4.24452C40.1638 5.26683 40.1638 6.92126 39.1444 7.94317Z"
            fill="#8F8F8F"
          />
        </g>
        <defs>
          <clipPath id="clip0_36_144">
            <rect width="42" height="42" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        class="task__icon__close"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_36_140)">
          <path
            d="M21.0991 19.0008L37.565 2.53481C38.1447 1.95509 38.1447 1.01519 37.565 0.435539C36.9853 -0.144109 36.0454 -0.144183 35.4657 0.435539L18.9997 16.9015L2.53382 0.435539C1.9541 -0.144183 1.01419 -0.144183 0.434547 0.435539C-0.1451 1.01526 -0.145175 1.95517 0.434547 2.53481L16.9005 19.0007L0.434547 35.4667C-0.145175 36.0465 -0.145175 36.9864 0.434547 37.566C0.72437 37.8558 1.1043 38.0007 1.48422 38.0007C1.86415 38.0007 2.244 37.8558 2.53389 37.566L18.9997 21.1001L35.4656 37.566C35.7555 37.8558 36.1354 38.0007 36.5153 38.0007C36.8952 38.0007 37.2751 37.8558 37.565 37.566C38.1447 36.9863 38.1447 36.0464 37.565 35.4667L21.0991 19.0008Z"
            fill="#8F8F8F"
          />
        </g>
        <defs>
          <clipPath id="clip0_36_140">
            <rect width="38" height="38" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>`;
    tasksContainer.insertAdjacentHTML("afterbegin", html);
  });
};

displayTasks(tasksArray);
