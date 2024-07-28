document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage and add them to the DOM
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false indicates not to save again to Local Storage
    }

    // Function to add a task to the DOM and optionally save it to Local Storage
    function addTask(taskText, save = true) {
        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button to remove the li element from taskList
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the li element, then append the li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";

        // Save the task to Local Storage if the save parameter is true
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add event listener to addButton to call addTask when clicked
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
    });

    // Add event listener to taskInput for the 'keypress' event to allow adding tasks by pressing "Enter"
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
