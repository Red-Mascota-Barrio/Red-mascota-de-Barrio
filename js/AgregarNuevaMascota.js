const botones = document.querySelectorAll(".btn1");

botones.forEach(boton => {
  boton.addEventListener("click", function() {

    // Quitar active a todos
    botones.forEach(b => b.classList.remove("active"));

    // Agregar active al que se clickeó
    this.classList.add("active");
  });
});

const botones2 = document.querySelectorAll(".btn2");

botones2.forEach(boton => {
  boton.addEventListener("click", function() {

    // Quitar active a todos
    botones2.forEach(b => b.classList.remove("active"));

    // Agregar active al que se clickeó
    this.classList.add("active");
  });
});