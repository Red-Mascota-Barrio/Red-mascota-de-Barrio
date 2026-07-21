/* verificacionLogin.js
   Reemplaza esta función con la lógica real de autenticación.
   Ejemplo de uso básico: */

function verificarLogin(usuario, contrasena) {
  // TODO: conectar con backend real
  if (usuario && contrasena) {
    window.location.href = '../PerfilUsuario/perfil_Usuario.html';
  }
}


/* ============================================================
   Lógica extraída de Inicio_Sesion.html
   ============================================================ */
// Toggle visibilidad de contraseña
    function togglePassword() {
      const campo = document.getElementById('contrasena');
      const btn   = document.getElementById('ojoBtnLogin');
      if (campo.type === 'password') {
        campo.type = 'text';
        btn.textContent = '🙈';
        btn.setAttribute('aria-label', 'Ocultar contraseña');
      } else {
        campo.type = 'password';
        btn.textContent = '👁';
        btn.setAttribute('aria-label', 'Mostrar contraseña');
      }
    }

    // CORRECCIÓN: el formulario ahora escucha 'submit' en lugar de onclick en el botón
    document.getElementById('formLogin').addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario    = document.getElementById('usuario').value.trim();
      const contrasena = document.getElementById('contrasena').value;

      if (!usuario || !contrasena) {
        document.getElementById('alertaError').textContent = '⚠️ Completa todos los campos.';
        document.getElementById('alertaError').classList.add('visible');
        return;
      }

      // Llamar función de verificación del JS externo si existe
      if (typeof verificarLogin === 'function') {
        verificarLogin(usuario, contrasena);
      } else {
        // Fallback: mostrar alerta de demo
        document.getElementById('alertaError').textContent = '⚠️ Sistema de autenticación no disponible en demo.';
        document.getElementById('alertaError').classList.add('visible');
      }
    });
