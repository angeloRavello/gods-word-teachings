/*
 * keys.js
 * Único lugar del proyecto con códigos de teclas. Traduce cada tecla del
 * control remoto (o del teclado) a una acción y la anuncia con el evento
 * 'tv:action'. El resto del código solo conoce acciones:
 * 'next', 'prev', 'up', 'down', 'select', 'home'.
 */
(function (window, document) {
  'use strict';

  // Algunos motores antiguos no envían event.key: por eso también usamos keyCode.
  var KEY_NAME_TO_ACTION = {
    ArrowLeft: 'prev',
    Left: 'prev',
    PageUp: 'prev',
    ArrowRight: 'next',
    Right: 'next',
    PageDown: 'next',
    ArrowUp: 'up',
    Up: 'up',
    ArrowDown: 'down',
    Down: 'down',
    Enter: 'select',
    Home: 'home'
  };

  var KEY_CODE_TO_ACTION = {
    37: 'prev',
    33: 'prev',
    39: 'next',
    34: 'next',
    38: 'up',
    40: 'down',
    13: 'select',
    36: 'home'
  };

  function getAction(event) {
    if (event.key && KEY_NAME_TO_ACTION.hasOwnProperty(event.key)) {
      return KEY_NAME_TO_ACTION[event.key];
    }
    var code = event.keyCode || event.which;
    if (KEY_CODE_TO_ACTION.hasOwnProperty(code)) {
      return KEY_CODE_TO_ACTION[code];
    }
    return null;
  }

  function handleKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    var action = getAction(event);
    if (!action) {
      return;
    }
    // Evita que el navegador haga scroll o siga enlaces por su cuenta:
    // cada página decide qué hacer con la acción.
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('tv:action', { detail: { action: action } }));
  }

  document.addEventListener('keydown', handleKeyDown);

  window.TV.keys = {
    getAction: getAction
  };
})(window, document);
