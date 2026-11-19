/*
 * home.js
 * Inicializa la portada: el foco recorre la lista de presentaciones con
 * las flechas y OK abre la elegida.
 */
(function (window, document) {
  'use strict';

  var TV = window.TV;

  function handleAction(event) {
    switch (event.detail.action) {
      // 1 / 2 del control (y ← →) cambian de página, como en una presentación.
      case 'prev':
        TV.paging.prevPage();
        break;
      case 'next':
        TV.paging.nextPage();
        break;
      case 'up':
        TV.focus.moveFocus(-1);
        break;
      case 'down':
        TV.focus.moveFocus(1);
        break;
      case 'select':
        TV.focus.activateFocused();
        break;
    }
  }

  // Etiqueta de versión: confirma si la TV ya cargó la última publicación.
  function renderVersion() {
    var label = document.querySelector('[data-version]');
    if (label && TV.version) {
      label.textContent = 'Versión ' + TV.version.number + ' - ' + TV.version.date;
    }
  }

  // El foco recorre toda la página: primero las presentaciones de la página
  // visible, luego el paginador y al final las herramientas, así el
  // diagnóstico nunca es lo primero que se elige.
  function resetFocus() {
    TV.focus.setScope(document.querySelector('.page'));
  }

  document.addEventListener('tv:action', handleAction);
  document.addEventListener('tv:pagechange', resetFocus);
  renderVersion();
  // La versión se escribe antes de paginar: ocupa lugar en el pie.
  TV.paging.init(document.querySelector('.home-menu'), document.querySelector('[data-pager]'));
})(window, document);
