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
      case 'up':
      case 'prev':
        TV.focus.moveFocus(-1);
        break;
      case 'down':
      case 'next':
        TV.focus.moveFocus(1);
        break;
      case 'select':
        TV.focus.activateFocused();
        break;
    }
  }

  document.addEventListener('tv:action', handleAction);
  TV.focus.setScope(document.querySelector('.home-menu'));
})(window, document);
