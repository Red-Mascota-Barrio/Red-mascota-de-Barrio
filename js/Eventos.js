const botones = document.querySelectorAll(".btn");

botones.forEach(boton => {
  boton.addEventListener("click", function() {

    // Quitar active a todos
    botones.forEach(b => b.classList.remove("active"));

    // Agregar active al que se clickeó
    this.classList.add("active");
  });
});

function paticiparEvento() {
    alert("¡Gracias por participar en el evento! Nos vemos allí.");
}

function CrearEvento() {
    alert("Redirigiendo a la página de creación de eventos...");
    window.location.href = "CrearEvento.html";
}