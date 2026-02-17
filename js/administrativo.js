let numeros = document.querySelectorAll(".tarjeta h3");

numeros[0].textContent=25;//usuarios//
numeros[1].textContent=20;//mascotas//
numeros[2].textContent=5;//adopciones//
numeros[3].textContent=1;//reportes//

let botones = document.querySelectorAll(".menu button");//lee los botones de menu//

botones.forEach(function(boton){//recorre los botones del menu//
  if(boton.textContent == "Dashboard"){
    boton.addEventListener("click", function(){
      alert("esto es el inicio");
    })
  }
  if(boton.textContent == "Salir"){//si el texto es salir//
    boton.addEventListener("click", function(){
      alert("ha cerrado sesion");
    })
  }
});

let bloques = document.querySelectorAll(".bloque");

bloques[0].addEventListener("click", function(){
  alert("estas son las mascotas en adopcion");
});

bloques[1].addEventListener("click", function(){
  alert("estos son los proximos eventos");
});