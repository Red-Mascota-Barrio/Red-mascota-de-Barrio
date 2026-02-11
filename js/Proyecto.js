function irInicio(){
    alert("Vas al inicio");
}

function irForos(){
    alert("Sección de foros");
}

function irContacto(){
    alert("Página de contacto");
}

function verPerfil(){
    alert("Perfil de usuario");
}


function entrarForo(nombre){
    alert("Entraste al foro de " + nombre);
}

function filtrar(categoria){
    document.getElementById("perros").style.display = "none";
    document.getElementById("gatos").style.display = "none";

    document.getElementById(categoria).style.display = "block";
}

function anterior(){
    alert("Página anterior");
}

function siguiente(){
    alert("Página siguiente");
}
