/* ============================================================
   info_mascota.js — Galería de imágenes y acciones
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    iniciarGaleria();
    iniciarFavorito();
    iniciarContacto();
  });

  /* ---- Galería de imágenes ---- */
  function iniciarGaleria() {
    const principal = document.getElementById('imgPrincipal');
    const thumbs    = document.querySelectorAll('.galeria-thumb');

    if (!principal || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const src = thumb.querySelector('img').src;
        const alt = thumb.querySelector('img').alt;
        principal.src = src;
        principal.alt = alt;
        thumbs.forEach(function (t) { t.classList.remove('activo'); });
        thumb.classList.add('activo');
      });
    });

    // Primera thumb activa por defecto
    if (thumbs[0]) thumbs[0].classList.add('activo');
  }

  /* ---- Botón favorito ---- */
  function iniciarFavorito() {
    const btn = document.getElementById('btnFavorito');
    if (!btn) return;

    const id        = btn.dataset.id || '0';
    const favoritos = JSON.parse(localStorage.getItem('rmb_favoritos') || '[]');

    if (favoritos.includes(id)) {
      btn.classList.add('activo');
      btn.textContent = '❤️ En favoritos';
    }

    btn.addEventListener('click', function () {
      const lista = JSON.parse(localStorage.getItem('rmb_favoritos') || '[]');
      const idx   = lista.indexOf(id);
      if (idx === -1) {
        lista.push(id);
        btn.classList.add('activo');
        btn.textContent = '❤️ En favoritos';
      } else {
        lista.splice(idx, 1);
        btn.classList.remove('activo');
        btn.textContent = '🤍 Guardar en favoritos';
      }
      localStorage.setItem('rmb_favoritos', JSON.stringify(lista));
    });
  }

  /* ---- Modal de contacto ---- */
  function iniciarContacto() {
    const btnContactar = document.getElementById('btnContactar');
    const modal        = document.getElementById('modalContacto');
    const btnCerrar    = document.getElementById('cerrarModalContacto');
    const form         = document.getElementById('formContacto');

    if (!btnContactar || !modal) return;

    btnContactar.addEventListener('click', function () {
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
        const btn = form.querySelector('[type="submit"]');
        btn.textContent  = '✅ Mensaje enviado';
        btn.disabled     = true;
        btn.style.background = '#16a47a';
        setTimeout(function () { modal.classList.remove('visible'); }, 1800);
      });
    }
  }

})();
