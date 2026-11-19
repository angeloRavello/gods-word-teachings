/*
 * fullscreen.js
 * Botón de pantalla completa ([data-fullscreen-toggle]). El navegador solo
 * permite pedirla como respuesta a una tecla o clic del usuario, por eso se
 * activa con OK sobre el botón. Al cambiar de página el navegador sale de
 * pantalla completa: por eso el botón vive en cada presentación.
 * Usa los nombres con prefijo webkit porque los Tizen antiguos solo tienen esos.
 */
(function (window, document) {
  'use strict';

  function isSupported() {
    var root = document.documentElement;
    return !!(root.requestFullscreen || root.webkitRequestFullscreen || root.webkitRequestFullScreen);
  }

  function isActive() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.webkitIsFullScreen);
  }

  function enter() {
    var root = document.documentElement;
    if (root.requestFullscreen) {
      root.requestFullscreen();
    } else if (root.webkitRequestFullscreen) {
      root.webkitRequestFullscreen();
    } else if (root.webkitRequestFullScreen) {
      root.webkitRequestFullScreen();
    }
  }

  function exit() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

  function toggle() {
    if (isActive()) {
      exit();
    } else {
      enter();
    }
  }

  function getButtons() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-fullscreen-toggle]'));
  }

  // En pantalla completa el botón se oculta: así el siguiente OK avanza
  // (focus.js no activa elementos ocultos) en vez de salir sin querer.
  // Para salir se usa la tecla Volver/Return del control.
  function updateButtons() {
    var active = isActive();
    getButtons().forEach(function (button) {
      if (active) {
        button.classList.add('u-hidden');
      } else {
        button.classList.remove('u-hidden');
      }
    });
  }

  // Si la TV no permite pantalla completa, el botón no se muestra.
  function hideButtons() {
    getButtons().forEach(function (button) {
      button.classList.add('u-hidden');
      button.removeAttribute('data-focusable');
    });
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (target && target.hasAttribute && target.hasAttribute('data-fullscreen-toggle') && !isActive()) {
      enter();
    }
  });

  document.addEventListener('fullscreenchange', updateButtons);
  document.addEventListener('webkitfullscreenchange', updateButtons);

  if (isSupported()) {
    updateButtons();
  } else {
    hideButtons();
  }

  window.TV.fullscreen = {
    isSupported: isSupported,
    isActive: isActive,
    toggle: toggle
  };
})(window, document);
