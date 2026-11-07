const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from phone storage
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Done</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push(text);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
  }
}

window.deleteTask = function(index) {
  tasks.splice(index, 1);
  localStorage.setItem('myTasks', JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();