const info = [];
fetch('../../usuarios.txt')
.then(response => response.text())
.then(data => {
    const lines = data.split('\n');
    lines.forEach(line => {
        const [username, password] = line.split('|');
        info.push({ username: username.trim(), password: password.trim() });
    }
    );
}).catch(error => console.error('Error al cargar el archivo:', error));

function verificarLogin() {
    const usernameInput = document.getElementById('usuario').value;
    const passwordInput = document.getElementById('contrasena').value;

    const user = info.find(user => user.username === usernameInput && user.password === passwordInput);

    if (user) {
        alert('Login exitoso');
        // Redirigir a la página de inicio o realizar otras acciones
        window.location.href = '../../index.html'; // Cambia esto por la URL de tu página de inicio
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function verificarLoginAdmin() {
    const usernameInput = document.getElementById('usuario').value;
    const passwordInput = document.getElementById('contrasena').value;

    const user = info.find(user => user.username === usernameInput && user.password === passwordInput);

    if (user) {
        alert('Login exitoso');
        // Redirigir a la página de inicio o realizar otras acciones
        window.location.href = '../Administrador/administrativo.html'; // Cambia esto por la URL de tu página de inicio
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}