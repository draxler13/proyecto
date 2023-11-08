document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('logiform');
    const loginErrorMessage = document.getElementById('login-error-message');
    const maxLoginAttempts = 3;
    let loginAttempts = 0;
    let isLoginFormBlocked = false;
    const blockDuration = 10000;

    const emailInput = loginForm.querySelector('input[name="email"]');
    const passwordInput = loginForm.querySelector('input[name="password"]');
    const loginButton = loginForm.querySelector('button');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (isLoginFormBlocked) {
            alert('Ha alcanzado el máximo de intentos. Por favor, espere 10 segundos.');
            return;
        }

        const email = emailInput.value;
        const password = passwordInput.value;

        if (email === '' || password === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const data = { email, password };

        const apiUrl = 'http://localhost:3000/api/login';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Verifica el rol del usuario
                if (email === 'admin@proyecto.com' && password === 'admin123') {
                    window.location.href = 'admindashboard.html';
                } else {
                    window.location.href = 'workerdashboard.html';
                }
            } else {
                console.error('Error en el inicio de sesión');
                loginAttempts++;

                if (loginAttempts >= maxLoginAttempts) {
                    isLoginFormBlocked = true;
                    alert('Ha alcanzado el máximo de intentos. Por favor, espere 10 segundos.');
                    emailInput.disabled = true;
                    passwordInput.disabled = true;
                    loginButton.disabled = true;
                    setTimeout(() => {
                        isLoginFormBlocked = false;
                        emailInput.disabled = false;
                        passwordInput.disabled = false;
                        loginButton.disabled = false;
                        loginAttempts = 0;
                    }, blockDuration);
                }

                alert('Credenciales incorrectas');
                passwordInput.value = "";
            }
        } catch (error) {
            console.error('Error en la solicitud');
        }
    });
});




