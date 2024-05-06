document.addEventListener('DOMContentLoaded', () => {
    // Login functionality
    const regForm = document.getElementById('reg-form');
    const loginForm = document.getElementById('login-form');
    
    if (regForm) {
        regForm.addEventListener('submit', registerUser);
    }
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const usernamePlaceholder = document.getElementById('username-placeholder');
    if (username && usernamePlaceholder) {
        usernamePlaceholder.textContent = username;
    }

    // Function to handle user registration
    async function registerUser(event) {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const result = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.json());

        if (result.status === 'ok') {
            alert('Registration Successful');
        } else {
            alert(result.error);
        }
    }

    // Function to handle user login
    async function loginUser(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const result = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.json());

        if (result.status === 'ok') {
            console.log('Got the token: ', result.data);
            localStorage.setItem('token', result.data);
            alert('Login Successful');
            window.location.href = '/dashboard.html'; // Redirect to dashboard
        } else {
            alert(result.error);
        }
    }

    // Task handling functionality
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');

    // Function to add a new task to the list
    function addTaskToList(description, date) {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${description} - ${date}`;
        todoList.appendChild(taskItem);
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = todoInput.value.trim();
        const date = dateInput.value.trim();

        if (description === '' || date === '') {
            alert('Please enter a description and date for the task.');
            return;
        }

        addTaskToList(description, date); // Add the task to the list

        // Clear input fields after adding task
        todoInput.value = '';
        dateInput.value = '';
    });
});
