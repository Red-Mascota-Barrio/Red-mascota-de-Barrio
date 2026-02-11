
document.getElementById("formRegistro").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se envíe el formulario

    const pass1 = document.getElementById("contrasena").value;
    const pass2 = document.getElementById("contrasena2").value;

    if (pass1 !== pass2) {
        alert("Las contraseñas no coinciden");
        return; // no deja continuar
    }

    if (pass1.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    alert("Registro exitoso");
    // Aquí sí podrías enviar el formulario al backend
    this.submit();
});