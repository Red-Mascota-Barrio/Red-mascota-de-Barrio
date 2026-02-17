
document.getElementById("formRegistro").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que se envíe el formulario

    const pass1 = document.getElementById("contrasena").value;
    const pass2 = document.getElementById("contrasena2").value;
    var acceso = true;

    if (pass1 !== pass2) {
        alert("Las contraseñas no coinciden");
        acceso = false;
        return; // no deja continuar
    }

    if (pass1.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        acceso = false;
        return;
    }

    if (pass1 === pass2 && acceso === true) {
        window.location.href = "../Inicio Sesion/Inicio_Sesion.html";
        alert("Registro exitoso");
        acceso = true;
    }

});