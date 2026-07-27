(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    iniciarModalReporte();
    iniciarComentariosSPA();
  });

  /* ---- Lógica de Comentarios SPA (Sin recargar la página) ---- */
  function iniciarComentariosSPA() {
    const formComentario = document.getElementById('formNuevoComentario');
    const listaComentarios = document.getElementById('listaComentarios');
    const inputTexto = document.getElementById('textoComentario');
    const contadorComentarios = document.getElementById('contadorComentarios');

    if (!formComentario) return;

    formComentario.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita que la página se recargue

      const texto = inputTexto.value.trim();
      if (!texto) return;

      const btnSubmit = formComentario.querySelector('[type="submit"]');
      const textoOriginal = btnSubmit.textContent;
      
      btnSubmit.textContent = 'Publicando...';
      btnSubmit.disabled = true;

      // Simulamos el tiempo de guardado en tu Base de Datos
      setTimeout(function () {
        
        // 1. Crear el nuevo elemento de comentario en HTML
        const nuevoComentarioHTML = `
          <div class="comentario-item" style="animation: fade-in 0.5s ease;">
            <div class="comentario-header">
              <div class="foro-avatar foro-avatar-azul">TU</div>
              <div class="comentario-info">
                <span class="comentario-autor">Tú (Usuario Actual)</span>
                <span class="comentario-fecha">Justo ahora</span>
              </div>
              <button type="button" class="btn-reportar-hilo btn-reportar-accion" data-id="com_nuevo">🚩</button>
            </div>
            <div class="comentario-cuerpo">
              ${texto.replace(/\n/g, '<br>')}
            </div>
          </div>
        `;

        // 2. Insertarlo al final de la lista
        listaComentarios.insertAdjacentHTML('beforeend', nuevoComentarioHTML);

        // 3. Actualizar el contador de comentarios
        let contadorActual = parseInt(contadorComentarios.textContent);
        contadorComentarios.textContent = contadorActual + 1;

        // 4. Limpiar formulario y resetear botón
        formComentario.reset();
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;

        // 5. Reiniciar los eventos de los botones de reportar para que el nuevo botón funcione
        iniciarModalReporte();

      }, 800);
    });
  }

  /* ---- Modal Reporte (SPA) ---- */
  function iniciarModalReporte() {
    const modal = document.getElementById('modalReporte');
    const btnCerrar = document.getElementById('cerrarModalReporte');
    const form = document.getElementById('formReporte');
    const inputId = document.getElementById('reporteElementoId');
    // Selecciona los botones de reporte de la publicación y de los comentarios
    const botonesReportar = document.querySelectorAll('.btn-reportar-accion'); 

    if (!modal) return;

    // Abrir modal
    botonesReportar.forEach(function(btn) {
      // Removemos el evento anterior para evitar duplicados al agregar nuevos comentarios
      btn.replaceWith(btn.cloneNode(true)); 
    });

    // Re-seleccionamos después de clonar
    const botonesLimpios = document.querySelectorAll('.btn-reportar-accion');
    botonesLimpios.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const idElemento = btn.getAttribute('data-id');
        if(inputId) inputId.value = idElemento;
        modal.classList.add('visible');
      });
    });

    // Cerrar modal
    if (btnCerrar) {
      btnCerrar.onclick = () => modal.classList.remove('visible');
    }
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('visible'); };

    // Enviar reporte
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault(); 
        const motivo = document.getElementById('reporteMotivo').value;
        if (!motivo) return;

        const btnSubmit = form.querySelector('[type="submit"]');
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.textContent = 'Enviando...';
        btnSubmit.disabled = true;

        setTimeout(function () {
          modal.classList.remove('visible');
          btnSubmit.textContent = textoOriginal;
          btnSubmit.disabled = false;
          form.reset();
          alert('Reporte enviado correctamente.');
        }, 1000);
      };
    }
  }

})();