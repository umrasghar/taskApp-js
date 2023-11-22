
  const tasks = [
    { text: 'Complete project proposal', category: 'Work', twist: 'Include at least three innovative ideas.', completed: false },
    { text: 'Go for a 30-minute run', category: 'Health', twist: 'Try a new route in the park.', completed: true },
    { text: 'Read a chapter of a book', category: 'General', twist: 'Take notes on interesting quotes.', completed: false },
    { text: 'Prepare a healthy lunch', category: 'Health', twist: 'Experiment with a new recipe.', completed: true },
    { text: 'Attend team meeting', category: 'Work', twist: 'Share progress on current tasks.', completed: false },
    { text: 'Practice meditation', category: 'Health', twist: 'Focus on deep breathing for relaxation.', completed: false },
  ];;

  updateTaskList();

// Function to show/hide task form
function showTaskForm() {
  const taskFormContainer = document.getElementById('taskFormContainer');
  taskFormContainer.style.display = taskFormContainer.style.display === 'none' ? 'block' : 'none';
}

//Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const twistInput = document.getElementById('twistInput');
  
    const taskText = taskInput.value.trim();
    const category = categoryDropdown.value;
    const twistText = twistInput.value.trim();
  
    if (taskText !== '') {
      
      const task = { text: taskText, category: category, twist: twistText, completed: false };
      tasks.push(task);

      updateTaskList();

      taskInput.value = '';
      twistInput.value = '';
    }
  }

// Function to update the task list
function updateTaskList() {
  const taskList = document.getElementById('taskList');
  const completedTaskList = document.getElementById('completedTaskList');


  taskList.innerHTML = '';
  completedTaskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    taskItem.innerHTML = `<span class="task-category" style="background-color: ${getCategoryColor(task.category)};"></span>
                          <span class="task-text ${task.completed ? 'completed-task' : ''}">${task.text}</span>
                          <button onclick="showTwist(${index})">Show Twist</button>
                          <button onclick="completeTask(${index})">Complete</button>
                          <button onclick="deleteTask(${index})">Delete</button>`;
    if (task.completed) {
      completedTaskList.appendChild(taskItem);
    } else {
      taskList.appendChild(taskItem);
    }
  });
}



function showTwist(index) {
    const task = tasks[index];
    if (task.twist) {
      alert(`Twist: ${task.twist}`);
    } else {
      alert('No twist added for this task.');
    }
  }

// Function to complete a task using promises
function completeTask(index) {
  const completionPromise = new Promise((resolve, reject) => {
   
    setTimeout(() => {
      tasks[index].completed = true;
      resolve();
    }, 2000);
  });

  completionPromise.then(() => {
    updateTaskList();
  });
}

// Function to delete a task
function deleteTask(index) {
  const deleteConfirmed = confirm('Are you sure you want to delete this task?');
  if (deleteConfirmed) {
    tasks.splice(index, 1);
    updateTaskList();
  }
}

// Function to get the color associated with a category
function getCategoryColor(category) {
  switch (category) {
    case 'General':
      return '#3498db'; 
    case 'Work':
      return '#e74c3c'; 
    case 'Health':
      return '#2ecc71'; 
    default:
      return '#95a5a6';
  }
}
