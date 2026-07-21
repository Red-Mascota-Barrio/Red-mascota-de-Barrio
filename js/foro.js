/* ============================================================
   foro.js — Filtro de categorías y modal de nuevo hilo
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    iniciarCategorias();
    iniciarModal();
    iniciarBusqueda();
  });

  /* ---- Filtro de categorías ---- */
  function iniciarCategorias() {
    const botones = document.querySelectorAll('.foro-cat-btn');
    const hilos   = document.querySelectorAll('.foro-hilo[data-categoria]');

    botones.forEach(function (btn) {
      btn.addEventListener('click', function () {
        botones.forEach(function (b) { b.classList.remove('activo'); });
        btn.classList.add('activo');

        const cat = btn.dataset.cat;

        hilos.forEach(function (hilo) {
          const mostrar = cat === 'todos' || hilo.dataset.categoria === cat;
          hilo.style.display = mostrar ? '' : 'none';
        });

        actualizarCount();
      });
    });
  }

  function actualizarCount() {
    const visibles = document.querySelectorAll('.foro-hilo[data-categoria]:not([style*="none"])').length;
    const el = document.getElementById('hilosCount');
    if (el) el.textContent = visibles;
  }

  /* ---- Búsqueda ---- */
  function iniciarBusqueda() {
    const input = document.getElementById('buscarHilo');
    if (!input) return;
    const hilos = document.querySelectorAll('.foro-hilo[data-categoria]');

    let timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        const q = input.value.trim().toLowerCase();
        hilos.forEach(function (hilo) {
          const texto = hilo.textContent.toLowerCase();
          hilo.style.display = (!q || texto.includes(q)) ? '' : 'none';
        });
        actualizarCount();
      }, 250);
    });
  }

  /* ---- Modal nuevo hilo ---- */
  function iniciarModal() {
    const btnAbrir  = document.getElementById('btnNuevoHilo');
    const modal     = document.getElementById('modalNuevoHilo');
    const btnCerrar = document.getElementById('cerrarModalHilo');
    const form      = document.getElementById('formNuevoHilo');

    if (!btnAbrir || !modal) return;

    btnAbrir.addEventListener('click', function () {
      modal.classList.add('visible');
    });

    if (btnCerrar) {
      btnCerrar.addEventListener('click', function () {
        modal.classList.remove('visible');
      });
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('visible');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') modal.classList.remove('visible');
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const titulo     = document.getElementById('hiloTitulo').value.trim();
        const categoria  = document.getElementById('hiloCategoria').value;
        const contenido  = document.getElementById('hiloContenido').value.trim();

        if (!titulo || !categoria || !contenido) {
          alert('Completa todos los campos para publicar el hilo.');
          return;
        }

        const btn = form.querySelector('[type="submit"]');
        btn.textContent  = '✅ Hilo publicado';
        btn.disabled     = true;
        btn.style.background = '#16a47a';

        setTimeout(function () {
          modal.classList.remove('visible');
          btn.textContent = 'Publicar hilo';
          btn.disabled    = false;
          btn.style.background = '';
          form.reset();
        }, 1800);
      });
    }
  }

})();
