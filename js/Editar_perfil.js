const botones2 = document.querySelectorAll(".btn2");

botones2.forEach(boton => {
  boton.addEventListener("click", function() {

    // Quitar active a todos
    botones2.forEach(b => b.classList.remove("active"));

    // Agregar active al que se clickeó
    this.classList.add("active");
  });
});

function Editar_perfil() {
    alert("Perfil actualizado exitosamente");
    window.location.href = "../Perfil Usuario/perfil_usuario.html";
}

