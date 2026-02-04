var botones = document.querySelectorAll(".menu button");

for (var botonMomento = 0; botonMomento < botones.length; botonMomento++) {
  
  botones[botonMomento].onclick = function() {
    
    for (var botonQuitar = 0; botonQuitar < botones.length; botonQuitar++) {
      botones[botonQuitar].classList.remove("activo");
    }
    
    this.classList.add("activo");
  }
}
