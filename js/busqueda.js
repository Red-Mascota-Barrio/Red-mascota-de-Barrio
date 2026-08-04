/* ============================================================
   busqueda.js — Filtros, favoritos y paginación
   ============================================================ */

(function () {
  'use strict';

  /* ---- Estado ---- */
  const estado = {
    especie:   'todas',
    edad:      'todas',
    tamano:    'todos',
    barrio:    'todos',
    busqueda:  '',
    pagina:    1,
    porPagina: 9,
    favoritos: JSON.parse(localStorage.getItem('rmb_favoritos') || '[]'),
  };

  /* ---- Inicialización ---- */
  document.addEventListener('DOMContentLoaded', function () {
    iniciarFiltros();
    iniciarBusqueda();
    iniciarFavoritos();
    renderizarChips();
  });

  /* ---- Filtros de opciones ---- */
  function iniciarFiltros() {
    document.querySelectorAll('.filtro-opcion').forEach(function (el) {
      el.addEventListener('click', function () {
        const grupo = el.closest('.filtro-opciones');
        grupo.querySelectorAll('.filtro-opcion').forEach(function (o) {
          o.classList.remove('activo');
        });
        el.classList.add('activo');

        const tipo  = el.closest('.filtro-seccion').dataset.filtro;
        const valor = el.dataset.valor;

        estado[tipo]  = valor;
        estado.pagina = 1;
        actualizarResultados();
        renderizarChips();
      });
    });

    // Select de ordenar
    const selectOrdenar = document.getElementById('selectOrdenar');
    if (selectOrdenar) {
      selectOrdenar.addEventListener('change', function () {
        estado.orden  = this.value;
        estado.pagina = 1;
        actualizarResultados();
      });
    }
  }

  /* ---- Barra de búsqueda ---- */
  function iniciarBusqueda() {
    const input = document.getElementById('inputBusqueda');
    if (!input) return;

    let timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        estado.busqueda = input.value.trim().toLowerCase();
        estado.pagina   = 1;
        actualizarResultados();
        renderizarChips();
      }, 280);
    });
  }

  /* ---- Chips activos ---- */
  function renderizarChips() {
    const contenedor = document.getElementById('chipsActivos');
    if (!contenedor) return;

    const etiquetas = {
      especie: { perros: '🐶 Perros', gatos: '🐱 Gatos', otras: '🐰 Otras' },
      edad:    { cachorro: '🐣 Cachorros', joven: '🌱 Jóvenes', adulto: '🐾 Adultos', senior: '🧓 Senior' },
      tamano:  { pequeno: 'Pequeño', mediano: 'Mediano', grande: 'Grande' },
    };

    let html = '';

    ['especie', 'edad', 'tamano'].forEach(function (tipo) {
      const valor = estado[tipo];
      const def   = tipo === 'especie' ? 'todas' : 'todos';
      if (valor !== def && etiquetas[tipo][valor]) {
        html += `<span class="chip-filtro" data-filtro="${tipo}">
          ${etiquetas[tipo][valor]}
          <span class="chip-filtro-x">×</span>
        </span>`;
      }
    });

    if (estado.busqueda) {
      html += `<span class="chip-filtro" data-filtro="busqueda">
        🔍 "${estado.busqueda}"
        <span class="chip-filtro-x">×</span>
      </span>`;
    }

    if (html) {
      html += `<button type="button" id="limpiarFiltros"
        style="font-size:12.5px; color:var(--texto-tenue); background:none; border:none; cursor:pointer; padding:4px 8px; font-family:var(--font-principal);">
        Limpiar todo
      </button>`;
    }

    contenedor.innerHTML = html;

    contenedor.querySelectorAll('.chip-filtro').forEach(function (chip) {
      chip.addEventListener('click', function () {
        const filtro = chip.dataset.filtro;
        if (filtro === 'especie') estado.especie  = 'todas';
        else if (filtro === 'edad')   estado.edad = 'todas';
        else if (filtro === 'tamano') estado.tamano = 'todos';
        else if (filtro === 'busqueda') {
          estado.busqueda = '';
          const input = document.getElementById('inputBusqueda');
          if (input) input.value = '';
        }
        sincronizarFiltrosUI();
        actualizarResultados();
        renderizarChips();
      });
    });

    const btnLimpiar = document.getElementById('limpiarFiltros');
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', function () {
        estado.especie  = 'todas';
        estado.edad     = 'todas';
        estado.tamano   = 'todos';
        estado.barrio   = 'todos';
        estado.busqueda = '';
        estado.pagina   = 1;
        const input = document.getElementById('inputBusqueda');
        if (input) input.value = '';
        sincronizarFiltrosUI();
        actualizarResultados();
        renderizarChips();
      });
    }
  }

  function sincronizarFiltrosUI() {
    document.querySelectorAll('.filtro-opcion').forEach(function (el) {
      const tipo  = el.closest('.filtro-seccion').dataset.filtro;
      const valor = el.dataset.valor;
      const def   = tipo === 'especie' ? 'todas' : 'todos';
      el.classList.toggle('activo', valor === (estado[tipo] || def));
    });
  }

  /* ---- Favoritos ---- */
  function iniciarFavoritos() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.mascota-card-fav');
      if (!btn) return;
      const id = btn.dataset.id;
      const idx = estado.favoritos.indexOf(id);
      if (idx === -1) {
        estado.favoritos.push(id);
        btn.classList.add('activo');
        btn.title = 'Quitar de favoritos';
      } else {
        estado.favoritos.splice(idx, 1);
        btn.classList.remove('activo');
        btn.title = 'Agregar a favoritos';
      }
      localStorage.setItem('rmb_favoritos', JSON.stringify(estado.favoritos));
    });
  }

  /* ---- Actualizar conteo visible (DOM real de cards estáticas) ---- */
  function actualizarResultados() {
    const cards   = document.querySelectorAll('.mascota-card[data-especie]');
    let visibles  = 0;

    cards.forEach(function (card) {
      const coincideEspecie  = estado.especie  === 'todas'  || card.dataset.especie  === estado.especie;
      const coincideEdad     = estado.edad     === 'todas'  || card.dataset.edad     === estado.edad;
      const coincideTamano   = estado.tamano   === 'todos'  || card.dataset.tamano   === estado.tamano;
      const texto            = card.textContent.toLowerCase();
      const coincideBusqueda = !estado.busqueda || texto.includes(estado.busqueda);

      const mostrar = coincideEspecie && coincideEdad && coincideTamano && coincideBusqueda;
      card.style.display = mostrar ? '' : 'none';
      if (mostrar) visibles++;
    });

    const countEl = document.getElementById('resultadosCount');
    if (countEl) countEl.textContent = visibles;

    const vacio = document.getElementById('estadoVacio');
    if (vacio) vacio.style.display = visibles === 0 ? 'block' : 'none';
  }

})();
