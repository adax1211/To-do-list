{
  let hideCompletedTask = false;

  let tasks = [];

  const addNewItem = (newItemContent) => {
    tasks = [...tasks, { content: newItemContent, completed: false }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((_, i) => i !== taskIndex);
    render();
  };

  const toggleTaskCompleted = (taskIndex) => {
    tasks = tasks.map((task, i) =>
      i === taskIndex ? { ...task, completed: !task.completed } : task
    );
    render();
  };

  const tickAllTasksCompleted = () => {
    tasks = tasks.map((task) => ({ ...task, completed: true }));
    render();
  };

  const hideAllCompletedTasks = () => {
    hideCompletedTask = !hideCompletedTask;
    render();
  };

  const bindEvents = () => {
    document.querySelectorAll(".js-remove").forEach((button, index) => {
      button.addEventListener("click", () => removeTask(index));
    });

    document.querySelectorAll(".js-toggleCompleted").forEach((button, index) => {
      button.addEventListener("click", () => toggleTaskCompleted(index));
    });
  };

  const renderTask = () => {
    const taskListElement = document.querySelector(".js-tasks");

    const filteredTasks = hideCompletedTask
      ? tasks.filter((task) => !task.completed)
      : tasks;

    taskListElement.innerHTML = filteredTasks.length
      ? filteredTasks
          .map(
            (task) => `
          <li class="todoTasks__item ${
            task.completed ? "todoTasks__item--toggleCompleted" : ""
          }">
              <button class="js-toggleCompleted todoTasks__button" aria-label="Zaznacz jako ukończone">
                  ${task.completed ? "✔" : ""}
              </button>
              <span>${task.content}</span>
              <button class="js-remove todoTasks__button todoTasks__button--deleted" aria-label="Usuń zadanie">🗑</button>
          </li>
      `
          )
          .join("")
      : "<p class='emptyMessage'>Brak zadań do wyświetlenia.</p>";
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="todoSection__buttons js-toggleHideCompleted">
        ${hideCompletedTask ? "Pokaż" : "Ukryj"} ukończone
      </button>
  
      <button class="todoSection__buttons js-tickAllTasksCompleted" 
        ${tasks.every(({ completed }) => completed) ? "disabled" : ""}>
        Ukończ wszystkie
      </button>
    `;
  };

  const bindButtonsEvents = () => {
    const tickAllTasksCompletedButton = document.querySelector(".js-tickAllTasksCompleted");
    if (tickAllTasksCompletedButton) {
      tickAllTasksCompletedButton.addEventListener("click", tickAllTasksCompleted);
    }

    const hideAllCompletedTasksButton = document.querySelector(".js-toggleHideCompleted");
    if (hideAllCompletedTasksButton) {
      hideAllCompletedTasksButton.addEventListener("click", hideAllCompletedTasks);
    }
  };

  const render = () => {
    renderTask();
    renderButtons();
    bindEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newItemInput = document.querySelector(".js-newItem");
    const newItemContent = newItemInput.value.trim();

    if (newItemContent === "") {
      newItemInput.focus();
      return;
    }

    addNewItem(newItemContent);
    newItemInput.value = "";
    newItemInput.focus();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
