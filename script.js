document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-task-form');
    const newTaskInput = document.getElementById('new-task');
    const checklist = document.getElementById('checklist');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(newTaskInput.value);
        newTaskInput.value = '';
    });

    function addTask(task) {
        if (task.trim() === '') return;

        const li = document.createElement('li');
        li.textContent = task;

        // Toggle completed status on click
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        checklist.appendChild(li);
    }
});