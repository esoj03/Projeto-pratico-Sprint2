// Cadastro
document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('/api/usuarios/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Cadastro realizado com sucesso!');
    } else {
        alert(`Erro: ${result.error}`);
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Login realizado com sucesso!');
        // Salve o token para uso posterior
        localStorage.setItem('token', result.token);
    } else {
        alert(`Erro: ${result.error}`);
    }
});
