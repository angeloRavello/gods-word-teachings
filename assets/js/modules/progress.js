/*
 * progress.js
 * Actualiza el indicador discreto de posición ("3 / 10").
 */
(function (window, document) {
  'use strict';

  document.addEventListener('tv:slidechange', function (event) {
    var indicator = document.querySelector('[data-progress]');
    if (!indicator) {
      return;
    }
    indicator.textContent = (event.detail.index + 1) + ' / ' + event.detail.total;
  });
})(window, document);
