/*
 * scroll-nav.js
 * Navegación con el "modo desplazamiento" del navegador de la TV Samsung.
 * En ese modo las flechas del control no llegan como teclas: desplazan la
 * página. Por eso la página tiene un área invisible para desplazarse, se
 * mantiene centrada, y cada desplazamiento se traduce a una acción:
 * → o ↓ = 'next', ← o ↑ = 'prev'.
 *
 * Una pulsación puede generar varios eventos 'scroll'. Solo el primero
 * dispara la acción; el resto se ignora hasta que pasan IDLE_MS sin
 * eventos. Así una pulsación avanza exactamente un paso.
 */
(function (window, document) {
  'use strict';

  // Tiempo sin eventos que da por terminada una pulsación.
  var IDLE_MS = 400;
  // Desplazamientos menores se consideran ruido.
  var MIN_DELTA = 2;
  // Tras recentrar o cambiar el tamaño de la ventana se ignoran los eventos
  // que provoca el propio navegador (no son pulsaciones de la abuela).
  var SUPPRESS_AFTER_RESET_MS = 150;
  var SUPPRESS_AFTER_RESIZE_MS = 600;

  var centerX = 0;
  var centerY = 0;
  var suppressUntil = 0;
  var isLocked = false;
  var idleTimer = null;

  function createScrollArea() {
    var area = document.createElement('div');
    area.className = 'scroll-nav__area';
    area.setAttribute('aria-hidden', 'true');
    document.body.appendChild(area);
    document.documentElement.classList.add('has-scroll-nav');
  }

  function suppressFor(milliseconds) {
    suppressUntil = Math.max(suppressUntil, Date.now() + milliseconds);
  }

  function recenter() {
    centerX = window.innerWidth;
    centerY = window.innerHeight;
    suppressFor(SUPPRESS_AFTER_RESET_MS);
    window.scrollTo(centerX, centerY);
  }

  function getAction(deltaX, deltaY) {
    if (Math.abs(deltaX) < MIN_DELTA && Math.abs(deltaY) < MIN_DELTA) {
      return null;
    }
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      return deltaX > 0 ? 'next' : 'prev';
    }
    return deltaY > 0 ? 'next' : 'prev';
  }

  function endGesture() {
    isLocked = false;
    recenter();
  }

  function handleScroll() {
    if (Date.now() < suppressUntil) {
      return;
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(endGesture, IDLE_MS);
    if (isLocked) {
      return;
    }
    var action = getAction(window.pageXOffset - centerX, window.pageYOffset - centerY);
    if (!action) {
      return;
    }
    isLocked = true;
    document.dispatchEvent(new CustomEvent('tv:action', { detail: { action: action, source: 'scroll' } }));
  }

  function handleResize() {
    suppressFor(SUPPRESS_AFTER_RESIZE_MS);
    recenter();
  }

  createScrollArea();
  recenter();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  document.addEventListener('fullscreenchange', handleResize);
  document.addEventListener('webkitfullscreenchange', handleResize);
})(window, document);
