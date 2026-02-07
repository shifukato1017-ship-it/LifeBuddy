// Load from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let totalExpense = Number(localStorage.getItem('totalExpense')) || 0;
let mood = localStorage.getItem('mood') || '';

const taskList = document.getElementById('taskList');
const totalDisplay = document.getElementById('total');
const moodDisplay = document.getElementById('moodDisplay');

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index,1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
    taskList.appendChild(li);
  });
}
renderTasks();

// Render expense
totalDisplay.textContent = totalExpense;

// Render mood
moodDisplay.textContent = mood ? "Today you feel " + mood : '';

function addTask() {
  const input = document.getElementById('taskInput');
  if(input.value === '') return;
  tasks.push(input.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  renderTasks();
}

function addExpense() {
  const input = document.getElementById('expenseInput');
  const amount = Number(input.value);
  if(!amount) return;
  totalExpense += amount;
  localStorage.setItem('totalExpense', totalExpense);
  totalDisplay.textContent = totalExpense;
  input.value = '';
}

function setMood(selectedMood) {
  mood = selectedMood;
  localStorage.setItem('mood', mood);
  moodDisplay.textContent = "Today you feel " + mood;
}
