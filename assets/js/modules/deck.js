/*
 * deck.js
 * Motor de diapositivas: ir a una, siguiente y anterior. Cada cambio se
 * anuncia con el evento 'tv:slidechange' para que los demás módulos
 * (fragmentos, progreso, foco, precarga) reaccionen sin acoplarse al motor.
 * La posición se guarda en la URL (#5) para que al recargar no se pierda.
 */
(function (window, document) {
  'use strict';

  var slides = [];
  var currentIndex = -1;

  function readIndexFromHash() {
    var number = parseInt(window.location.hash.replace('#', ''), 10);
    if (isNaN(number)) {
      return 0;
    }
    return number - 1;
  }

  function writeIndexToHash(index) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#' + (index + 1));
    }
  }

  function clampIndex(index) {
    if (index < 0) {
      return 0;
    }
    if (index > slides.length - 1) {
      return slides.length - 1;
    }
    return index;
  }

  function goToSlide(index, options) {
    var settings = options || {};
    var targetIndex = clampIndex(index);
    if (!slides.length || targetIndex === currentIndex) {
      return false;
    }

    if (currentIndex >= 0) {
      slides[currentIndex].classList.remove('is-active');
    }
    slides[targetIndex].classList.add('is-active');
    currentIndex = targetIndex;
    writeIndexToHash(currentIndex);

    document.dispatchEvent(new CustomEvent('tv:slidechange', {
      detail: {
        index: currentIndex,
        total: slides.length,
        slide: slides[currentIndex],
        direction: settings.direction || 'jump',
        revealAll: settings.revealAll === true
      }
    }));
    return true;
  }

  function next() {
    return goToSlide(currentIndex + 1, { direction: 'forward' });
  }

  function prev() {
    // Al volver atrás la diapositiva se muestra completa, como se dejó.
    return goToSlide(currentIndex - 1, { direction: 'backward', revealAll: true });
  }

  function getCurrentSlide() {
    return slides[currentIndex] || null;
  }

  function getSlide(index) {
    return slides[index] || null;
  }

  function init(root) {
    slides = Array.prototype.slice.call((root || document).querySelectorAll('[data-slide]'));
    var startIndex = clampIndex(readIndexFromHash());
    // Si se entra directo a una diapositiva (#12), se muestra completa.
    goToSlide(startIndex, { direction: 'jump', revealAll: startIndex > 0 });
  }

  window.TV.deck = {
    init: init,
    goToSlide: goToSlide,
    next: next,
    prev: prev,
    getCurrentSlide: getCurrentSlide,
    getSlide: getSlide
  };
})(window, document);
