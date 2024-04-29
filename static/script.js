//script.js
const regForm = document.getElementById('reg-form');
        regForm.addEventListener('submit', registerUser);

        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', loginUser);

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