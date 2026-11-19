/*
 * pointer.js
 * Navegación con el puntero del navegador de la TV Samsung. En ese navegador
 * las flechas del control mueven un cursor (o desplazan la página) y NO llegan
 * a la página como teclas; lo único que llega es el clic de OK.
 * Por eso cada clic se traduce a la misma acción que una tecla ('tv:action'):
 *  - sobre un elemento con data-action (flechas ‹ ›): esa acción;
 *  - sobre enlaces o botones: se deja que funcionen solos;
 *  - en cualquier otro lugar: borde izquierdo = 'prev', el resto = 'next'.
 * Así basta con dejar el cursor a la derecha y pulsar OK para avanzar.
 */
(function (window, document) {
  'use strict';

  // Fracción izquierda de la pantalla que retrocede al hacer clic.
  var PREV_ZONE_RATIO = 0.25;

  function findAncestor(element, test) {
    while (element && element !== document) {
      if (element.nodeType === 1 && test(element)) {
        return element;
      }
      element = element.parentNode;
    }
    return null;
  }

  function hasAction(element) {
    return element.hasAttribute('data-action');
  }

  function isInteractive(element) {
    var tag = element.tagName;
    return tag === 'A' || tag === 'BUTTON' || element.hasAttribute('data-focusable');
  }

  function getActionForClick(event) {
    var actionElement = findAncestor(event.target, hasAction);
    if (actionElement) {
      return actionElement.getAttribute('data-action');
    }
    if (findAncestor(event.target, isInteractive)) {
      return null;
    }
    return event.clientX < window.innerWidth * PREV_ZONE_RATIO ? 'prev' : 'next';
  }

  document.addEventListener('click', function (event) {
    var action = getActionForClick(event);
    if (!action) {
      return;
    }
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('tv:action', { detail: { action: action, source: 'pointer' } }));
  });
})(window, document);
