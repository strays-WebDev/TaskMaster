document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const descriptionInput = document.getElementById('description'); // Add description input
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = input.value.trim();
        const descriptionText = descriptionInput.value.trim(); // Get description value
        if (todoText) {
            addTodoItem(todoText, descriptionText); // Pass description to addTodoItem function
            input.value = '';
            descriptionInput.value = ''; // Clear input fields after adding todo
        }
    });

    function addTodoItem(todoText, descriptionText) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${todoText}</span>
            <span class="description">${descriptionText}</span> <!-- Display description -->
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
    }

    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
        }
    });

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
