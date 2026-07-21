/* ============================================================
   perfil.js — Editar perfil + Agregar mascota (pasos)
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    iniciarAvatarPreview();
    iniciarFormEditar();
    iniciarPasosMascota();
    iniciarFotosMascota();
  });

  /* ---- Preview de avatar en editar perfil ---- */
  function iniciarAvatarPreview() {
    const input = document.getElementById('inputAvatar');
    const img   = document.getElementById('previewAvatar');
    if (!input || !img) return;

    input.addEventListener('change', function () {
      const file = input.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert('Selecciona un archivo de imagen válido.');
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert('La imagen no debe superar 3 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) { img.src = e.target.result; };
      reader.readAsDataURL(file);
    });
  }

  /* ---- Formulario editar perfil ---- */
  function iniciarFormEditar() {
    const form = document.getElementById('formEditarPerfil');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✅ Cambios guardados';
      btn.disabled    = true;
      btn.style.background = '#16a47a';
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled    = false;
        btn.style.background = '';
      }, 2200);
    });
  }

  /* ---- Pasos para agregar mascota ---- */
  function iniciarPasosMascota() {
    const paneles   = document.querySelectorAll('.mascota-form-panel');
    const pasoItems = document.querySelectorAll('.paso-item');
    const btnSig    = document.querySelectorAll('.btn-siguiente-paso');
    const btnAnt    = document.querySelectorAll('.btn-anterior-paso');
    const formFinal = document.getElementById('formAgregarMascota');

    if (!paneles.length) return;

    let pasoActual = 0;

    function irAPaso(n) {
      paneles.forEach(function (p, i) {
        p.classList.toggle('activo', i === n);
      });
      pasoItems.forEach(function (item, i) {
        item.classList.remove('activo', 'completado');
        if (i < n)  item.classList.add('completado');
        if (i === n) item.classList.add('activo');
      });
      pasoActual = n;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    btnSig.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (pasoActual < paneles.length - 1) {
          if (pasoActual === 2) actualizarResumen();
          irAPaso(pasoActual + 1);
        }
      });
    });

    btnAnt.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (pasoActual > 0) irAPaso(pasoActual - 1);
      });
    });

    if (formFinal) {
      formFinal.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = formFinal.querySelector('[type="submit"]');
        btn.textContent = '✅ ¡Mascota publicada!';
        btn.disabled    = true;
        btn.style.background = '#16a47a';
        setTimeout(function () {
          window.location.href = '../PerfilUsuario/perfil_Usuario.html';
        }, 1800);
      });
    }

    irAPaso(0);
  }

  /* ---- Resumen del paso 3 ---- */
  function actualizarResumen() {
    const campos = {
      'resumen-nombre':   'inputNombreMascota',
      'resumen-especie':  'selectEspecie',
      'resumen-raza':     'inputRaza',
      'resumen-edad':     'inputEdad',
      'resumen-tamano':   'selectTamano',
      'resumen-genero':   'selectGenero',
      'resumen-estado':   'selectEstado',
      'resumen-barrio':   'inputBarrio',
    };

    Object.keys(campos).forEach(function (id) {
      const el    = document.getElementById(id);
      const input = document.getElementById(campos[id]);
      if (el && input) el.textContent = input.value || '—';
    });
  }

  /* ---- Preview de fotos de mascota ---- */
  function iniciarFotosMascota() {
    const inputFotos  = document.getElementById('inputFotosMascota');
    const contenedor  = document.getElementById('fotosPreview');
    if (!inputFotos || !contenedor) return;

    inputFotos.addEventListener('change', function () {
      Array.from(inputFotos.files).forEach(function (file) {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          const thumb = document.createElement('div');
          thumb.className = 'foto-preview-thumb';
          thumb.innerHTML = `
            <img src="${e.target.result}" alt="Foto mascota">
            <button type="button" class="foto-preview-remove" aria-label="Eliminar foto">×</button>
          `;
          thumb.querySelector('.foto-preview-remove').addEventListener('click', function () {
            thumb.remove();
          });
          contenedor.appendChild(thumb);
        };
        reader.readAsDataURL(file);
      });
    });
  }

})();


/* ============================================================
   Lógica extraída de perfil_Usuario.html
   ============================================================ */
function mostrarPestaña(id, btn) {
      // Ocultar todos los paneles
      document.querySelectorAll('[id^="tab-"]').forEach(function(el) {
        el.style.display = 'none';
      });
      // Desactivar todas las pestañas
      document.querySelectorAll('.pestaña').forEach(function(el) {
        el.classList.remove('activa');
        el.setAttribute('aria-selected', 'false');
      });
      // Mostrar el panel seleccionado
      document.getElementById('tab-' + id).style.display = 'block';
      btn.classList.add('activa');
      btn.setAttribute('aria-selected', 'true');
    }
