/* ============================================================
   eventos.js — Filtros y modal de inscripción
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    iniciarFiltros();
    iniciarModal();
  });

  /* ---- Filtros de categoría ---- */
  function iniciarFiltros() {
    const botones = document.querySelectorAll('.evento-filtro-btn');
    const cards   = document.querySelectorAll('.evento-card[data-tipo]');

    botones.forEach(function (btn) {
      btn.addEventListener('click', function () {
        botones.forEach(function (b) { b.classList.remove('activo'); });
        btn.classList.add('activo');
        const tipo = btn.dataset.tipo;
        cards.forEach(function (card) {
          card.style.display = (tipo === 'todos' || card.dataset.tipo === tipo) ? '' : 'none';
        });
      });
    });
  }

  /* ---- Modal inscripción ---- */
  function iniciarModal() {
    const modal     = document.getElementById('modalInscripcion');
    const btnCerrar = document.getElementById('cerrarModalEvento');
    const form      = document.getElementById('formInscripcion');
    const nombreEvento = document.getElementById('nombreEvento');

    document.querySelectorAll('.btn-inscribirse').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (nombreEvento) nombreEvento.textContent = btn.dataset.evento || 'Evento';
        if (modal) modal.classList.add('visible');
      });
    });

    if (btnCerrar) btnCerrar.addEventListener('click', function () { modal.classList.remove('visible'); });
    if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('visible'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal) modal.classList.remove('visible'); });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        btn.textContent = '✅ ¡Inscrito!';
        btn.disabled = true;
        btn.style.background = '#16a47a';
        setTimeout(function () {
          modal.classList.remove('visible');
          btn.textContent = 'Confirmar inscripción';
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 1800);
      });
    }
  }

})();
