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
    console.log('URL Parameters:', urlParams.toString()); // Log URL parameters
    const username = urlParams.get('username');
    console.log('Username:', username); // Debugging
    const usernamePlaceholder = document.getElementById('username-placeholder');
    console.log('Username placeholder element:', usernamePlaceholder); // Log the username placeholder element
    if (username && usernamePlaceholder) {
        usernamePlaceholder.textContent = username;
    }

    // Call the setupLogoutButton function here
    setupLogoutButton();
});

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
            window.location.href = `/dashboard.html?username=${username}`; 
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


// Wrap the event listener code in a function
function setupLogoutButton() {
    console.log('Setting up logout button'); // debug
    const logoutBtn = document.getElementById('logout-btn');
    console.log('logoutBtn:', logoutBtn); // debug
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    } else {
        console.log('Logout button not found'); // debugging
    }
}

async function logoutUser() {
    console.log('Logout button clicked'); //debug
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to index page
    window.location.href = '/'; // Redirect to index
}
