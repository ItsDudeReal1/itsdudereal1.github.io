const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
  try {
    const saved = localStorage.getItem('myTasks');
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks(list) {
  try {
    localStorage.setItem('myTasks', JSON.stringify(list));
  } catch {
    // Fallback gracefully if storage is restricted
  }
}

// Load tasks from phone/browser storage
let tasks = loadTasks();

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = 'Done';
    btn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push(text);
    saveTasks(tasks);
    taskInput.value = '';
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

window.deleteTask = deleteTask;

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();

// Register offline service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
