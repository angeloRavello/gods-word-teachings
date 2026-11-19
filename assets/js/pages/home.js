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
  // El foco recorre toda la página: primero las presentaciones y al final
  // el enlace de diagnóstico, así nunca es lo primero que se elige.
  TV.focus.setScope(document.querySelector('.page'));
})(window, document);
