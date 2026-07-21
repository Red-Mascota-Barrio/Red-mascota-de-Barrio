

/* ============================================================
   Lógica extraída de Inicio_Sesion_Administrador.html
   ============================================================ */
// Toggle contraseña
    document.getElementById('ojoBtnAdmin').addEventListener('click', function () {
      const input = document.getElementById('adminContrasena');
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      this.textContent = isPass ? '🙈' : '👁';
    });

    // Solo números en código
    document.getElementById('adminCodigo').addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 6);
    });

    // Submit
    document.getElementById('formLoginAdmin').addEventListener('submit', function (e) {
      e.preventDefault();
      const usuario    = document.getElementById('adminUsuario').value.trim();
      const contrasena = document.getElementById('adminContrasena').value;
      const codigo     = document.getElementById('adminCodigo').value.trim();
      const alerta     = document.getElementById('alertaError');
      const btn        = document.getElementById('btnLoginAdmin');

      alerta.style.display = 'none';

      if (!usuario || !contrasena || !codigo) {
        alerta.textContent   = '⚠️ Completa todos los campos para continuar.';
        alerta.style.display = 'block';
        return;
      }

      if (codigo.length !== 6) {
        alerta.textContent   = '⚠️ El código de acceso debe tener exactamente 6 dígitos.';
        alerta.style.display = 'block';
        return;
      }

      // Animación de carga
      btn.textContent  = '⏳ Verificando…';
      btn.disabled     = true;

      setTimeout(function () {
        // En producción aquí va la verificación real con el servidor
        window.location.href = 'administrativo.html';
      }, 1200);
    });
