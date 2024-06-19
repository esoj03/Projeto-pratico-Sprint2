// public/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Habilitar botão se os campos estiverem preenchidos
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            loginButton.disabled = !emailInput.value || !passwordInput.value;
        });
    });
});
