/*
 * scroll-nav.js
 * Navegación con el "modo desplazamiento" del navegador de la TV Samsung.
 * En ese modo las flechas del control no llegan como teclas: desplazan la
 * página. Por eso la página tiene un área invisible para desplazarse, se
 * mantiene centrada, y cada desplazamiento se traduce a una acción:
 * → o ↓ = 'next', ← o ↑ = 'prev'.
 *
 * Medido en la TV: una pulsación es un desplazamiento animado de ~2 s con
 * 100+ eventos 'scroll'. Solo el primero dispara la acción; el resto se
 * ignora hasta que pasan IDLE_MS sin eventos. Así una pulsación = un paso.
 *
 * Al terminar, la página vuelve al centro. La TV también anima ese regreso,
 * y sus eventos NO son una pulsación nueva: mientras la página vuelve al
 * centro se ignora todo (hasta llegar, o RECENTER_TIMEOUT_MS como máximo).
 */
(function (window, document) {
  'use strict';

  // Tiempo sin eventos que da por terminada una pulsación.
  var IDLE_MS = 400;
  // Desplazamientos menores se consideran ruido.
  var MIN_DELTA = 2;
  // Distancia al centro que se considera "ya llegó".
  var CENTER_TOLERANCE = 2;
  // Máximo tiempo que se espera a que termine la animación de regreso.
  var RECENTER_TIMEOUT_MS = 1500;
  // Al cambiar el tamaño (p. ej. pantalla completa) el navegador mueve la
  // página por su cuenta: esos eventos tampoco son pulsaciones.
  var SUPPRESS_AFTER_RESIZE_MS = 600;

  var centerX = 0;
  var centerY = 0;
  var suppressUntil = 0;
  var isLocked = false;
  var isRecentering = false;
  var recenterDeadline = 0;
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

  function distanceToCenter() {
    return Math.abs(window.pageXOffset - centerX) + Math.abs(window.pageYOffset - centerY);
  }

  function recenter() {
    centerX = window.innerWidth;
    centerY = window.innerHeight;
    if (distanceToCenter() <= CENTER_TOLERANCE) {
      isRecentering = false;
      return;
    }
    isRecentering = true;
    recenterDeadline = Date.now() + RECENTER_TIMEOUT_MS;
    window.scrollTo(centerX, centerY);
  }

  // Devuelve true mientras la página siga volviendo al centro.
  function isStillRecentering() {
    if (!isRecentering) {
      return false;
    }
    if (distanceToCenter() <= CENTER_TOLERANCE || Date.now() > recenterDeadline) {
      isRecentering = false;
    }
    return true;
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
    if (Date.now() < suppressUntil || isStillRecentering()) {
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
