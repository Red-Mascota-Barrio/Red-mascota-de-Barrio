/* funtionsRegistro.js
   Reemplaza esta función con la lógica real de registro. */

function registrarUsuario() {
  // TODO: conectar con backend real
  window.location.href = 'Inicio_Sesion.html';
}


/* ============================================================
   Lógica extraída de registro.html
   ============================================================ */
/* ---- Modal términos ---- */
    function abrirModal() {
      document.getElementById('modalTerminos').classList.add('visible');
      document.getElementById('modalTerminos').focus();
    }
    function cerrarModal() {
      document.getElementById('modalTerminos').classList.remove('visible');
    }
    function aceptarTerminos() {
      document.getElementById('aceptaTerminos').checked = true;
      cerrarModal();
    }

    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') cerrarModal();
    });

    /* ---- Indicador de fuerza ---- */
    function actualizarFuerza(valor) {
      const barra  = document.getElementById('fuerzaBarra');
      const texto  = document.getElementById('fuerzaTexto');
      let fuerza = 0;
      if (valor.length >= 8)           fuerza++;
      if (/[A-Z]/.test(valor))         fuerza++;
      if (/[0-9]/.test(valor))         fuerza++;
      if (/[^A-Za-z0-9]/.test(valor))  fuerza++;

      const pct     = fuerza * 25;
      const colores = ['#e24b4a', '#ef9f27', '#16a47a', '#06503d'];
      const labels  = ['Muy débil', 'Débil', 'Buena', 'Excelente'];
      barra.style.width      = pct + '%';
      barra.style.background = colores[fuerza - 1] || '#e0e0e0';
      texto.textContent      = fuerza > 0 ? labels[fuerza - 1] : '';
      texto.style.color      = colores[fuerza - 1] || 'var(--texto-tenue)';
    }

    /* ---- Verificación de contraseñas coincidentes ---- */
    document.getElementById('contrasena2').addEventListener('input', function() {
      const p1     = document.getElementById('contrasena').value;
      const p2     = this.value;
      const span   = document.getElementById('matchTexto');
      span.style.display = p2 ? 'block' : 'none';
      if (p1 === p2) {
        span.textContent   = '✅ Las contraseñas coinciden';
        span.style.color   = 'var(--verde-principal)';
        this.style.borderColor = 'var(--verde-principal)';
      } else {
        span.textContent   = '❌ Las contraseñas no coinciden';
        span.style.color   = '#c0392b';
        this.style.borderColor = '#e24b4a';
      }
    });

    /* ---- Submit del formulario ---- */
    document.getElementById('formRegistro').addEventListener('submit', function(e) {
      e.preventDefault();

      const contrasena  = document.getElementById('contrasena').value;
      const contrasena2 = document.getElementById('contrasena2').value;
      const aceptado    = document.getElementById('aceptaTerminos').checked;

      if (contrasena !== contrasena2) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      if (!aceptado) {
        alert('Debes aceptar los términos y condiciones.');
        return;
      }
      if (contrasena.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      // Llamar función del JS externo si existe
      if (typeof registrarUsuario === 'function') {
        registrarUsuario();
      }
    });
