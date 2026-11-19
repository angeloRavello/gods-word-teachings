/*
 * focus.js
 * Foco entre elementos interactivos ([data-focusable]) de una zona de la
 * página. No depende del mouse: se mueve con ↑ ↓ y se activa con OK.
 * La zona la define cada página (la portada, o la diapositiva actual).
 */
(function (window, document) {
  'use strict';

  var FOCUSED_CLASS = 'is-focused';
  var items = [];
  var currentIndex = -1;

  function clearFocus() {
    items.forEach(function (item) {
      item.classList.remove(FOCUSED_CLASS);
    });
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  }

  function focusItemAt(index) {
    if (index < 0 || index >= items.length) {
      return false;
    }
    clearFocus();
    currentIndex = index;
    items[index].classList.add(FOCUSED_CLASS);
    items[index].focus();
    return true;
  }

  // Cambia la zona activa y enfoca su primer elemento, si existe.
  function setScope(scope) {
    clearFocus();
    items = scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-focusable]')) : [];
    currentIndex = -1;
    if (items.length) {
      focusItemAt(0);
    }
  }

  // step: +1 (abajo) o -1 (arriba). Devuelve true si el foco se movió.
  function moveFocus(step) {
    if (!items.length) {
      return false;
    }
    return focusItemAt(currentIndex + step);
  }

  function hasItems() {
    return items.length > 0;
  }

  // Un elemento oculto (display: none) no tiene offsetParent: no se puede activar.
  function isVisible(item) {
    return item.offsetParent !== null;
  }

  // Devuelve true si había un elemento enfocado y visible para activar.
  function activateFocused() {
    if (currentIndex < 0 || !items[currentIndex] || !isVisible(items[currentIndex])) {
      return false;
    }
    items[currentIndex].click();
    return true;
  }

  window.TV.focus = {
    setScope: setScope,
    moveFocus: moveFocus,
    hasItems: hasItems,
    activateFocused: activateFocused
  };
})(window, document);
