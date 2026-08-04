/* ============================================================
   admin.js — Búsqueda, modales y acciones del panel admin
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    iniciarBusquedaTabla();
    iniciarModales();
    iniciarAccionesTabla();
    iniciarReportes();
  });

  /* ---- Búsqueda en tabla ---- */
  function iniciarBusquedaTabla() {
    const input = document.getElementById('buscarTabla');
    if (!input) return;

    input.addEventListener('input', function () {
      const q    = input.value.trim().toLowerCase();
      const filas = document.querySelectorAll('.tabla-admin tbody tr');
      let visibles = 0;

      filas.forEach(function (fila) {
        const texto = fila.textContent.toLowerCase();
        const mostrar = !q || texto.includes(q);
        fila.style.display = mostrar ? '' : 'none';
        if (mostrar) visibles++;
      });

      const conteo = document.getElementById('conteoFilas');
      if (conteo) conteo.textContent = visibles;
    });
  }

  /* ---- Modales genéricos ---- */
  function iniciarModales() {
    // Abrir
    document.querySelectorAll('[data-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.dataset.modal;
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('visible');
      });
    });

    // Cerrar con botón
    document.querySelectorAll('[data-cerrar-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.dataset.cerrarModal;
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('visible');
      });
    });

    // Cerrar al hacer clic fuera
    document.querySelectorAll('.modal-overlay').forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.classList.remove('visible');
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.visible').forEach(function (m) {
          m.classList.remove('visible');
        });
      }
    });

    // Formularios en modales
    document.querySelectorAll('.form-modal').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const original = btn.textContent;
        btn.textContent = '✅ Guardado';
        btn.disabled    = true;
        btn.style.background = '#16a47a';
        setTimeout(function () {
          const modal = form.closest('.modal-overlay');
          if (modal) modal.classList.remove('visible');
          btn.textContent = original;
          btn.disabled    = false;
          btn.style.background = '';
          form.reset();
        }, 1600);
      });
    });
  }

  /* ---- Acciones de tabla (editar / eliminar) ---- */
  function iniciarAccionesTabla() {
    document.addEventListener('click', function (e) {
      // Eliminar fila
      const btnEliminar = e.target.closest('.btn-eliminar-fila');
      if (btnEliminar) {
        const nombre = btnEliminar.dataset.nombre || 'este elemento';
        if (confirm('¿Eliminar a ' + nombre + '? Esta acción no se puede deshacer.')) {
          const fila = btnEliminar.closest('tr');
          if (fila) {
            fila.style.opacity    = '0';
            fila.style.transition = 'opacity 0.3s';
            setTimeout(function () { fila.remove(); }, 300);
          }
        }
      }

      // Cambiar estado badge
      const btnEstado = e.target.closest('.btn-toggle-estado');
      if (btnEstado) {
        const badge = btnEstado.closest('tr').querySelector('.badge-estado');
        if (!badge) return;
        const esActivo = badge.classList.contains('badge-verde');
        badge.classList.toggle('badge-verde', !esActivo);
        badge.classList.toggle('badge-rojo',  esActivo);
        badge.textContent = esActivo ? 'Inactivo' : 'Activo';
      }
    });
  }

  /* ---- Acciones de reportes ---- */
  function iniciarReportes() {
    document.querySelectorAll('.btn-resolver-reporte').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const card = btn.closest('.reporte-card');
        if (!card) return;
        if (!confirm('¿Marcar este reporte como resuelto?')) return;
        card.style.opacity    = '0';
        card.style.transition = 'opacity 0.3s';
        setTimeout(function () {
          card.remove();
          actualizarConteoReportes();
        }, 300);
      });
    });

    document.querySelectorAll('.btn-eliminar-contenido').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('¿Eliminar el contenido reportado? Esta acción no se puede deshacer.')) return;
        btn.textContent  = '✅ Eliminado';
        btn.disabled     = true;
        btn.style.background = '#16a47a';
        btn.style.borderColor = '#16a47a';
        btn.style.color  = 'white';
      });
    });
  }

  function actualizarConteoReportes() {
    const cards = document.querySelectorAll('.reporte-card');
    const badge = document.getElementById('conteoReportes');
    if (badge) badge.textContent = cards.length;
  }

})();
