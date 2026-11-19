/*
 * presentation.js
 * Inicializa una presentación y decide qué hace cada acción del control:
 * '→' primero revela fragmentos y después pasa de diapositiva; OK activa el
 * elemento enfocado o, si no hay ninguno, avanza (es lo más natural en la TV).
 */
(function (window, document) {
  'use strict';

  var TV = window.TV;

  function getHomeUrl() {
    return document.body.getAttribute('data-home-url') || '../';
  }

  function goNext() {
    if (!TV.fragments.revealNextFragment(TV.deck.getCurrentSlide())) {
      TV.deck.next();
    }
  }

  function goPrev() {
    if (!TV.fragments.hideLastFragment(TV.deck.getCurrentSlide())) {
      TV.deck.prev();
    }
  }

  function handleAction(event) {
    switch (event.detail.action) {
      case 'next':
        goNext();
        break;
      case 'prev':
        goPrev();
        break;
      case 'up':
        TV.focus.moveFocus(-1);
        break;
      case 'down':
        TV.focus.moveFocus(1);
        break;
      case 'select':
        if (!TV.focus.activateFocused()) {
          goNext();
        }
        break;
      case 'home':
        window.location.href = getHomeUrl();
        break;
    }
  }

  // El foco siempre vive dentro de la diapositiva visible.
  document.addEventListener('tv:slidechange', function (event) {
    TV.focus.setScope(event.detail.slide);
  });

  document.addEventListener('tv:action', handleAction);

  // Los scripts se cargan con defer: el HTML ya está listo aquí.
  TV.deck.init(document.querySelector('.deck'));
})(window, document);
