/*
 * preload.js
 * Carga las imágenes con data-src solo de la diapositiva actual y de la
 * siguiente. La TV tiene poca memoria: no conviene cargarlas todas al inicio.
 */
(function (window, document) {
  'use strict';

  function loadImages(slide) {
    if (!slide) {
      return;
    }
    var images = slide.querySelectorAll('img[data-src]');
    for (var i = 0; i < images.length; i++) {
      images[i].setAttribute('src', images[i].getAttribute('data-src'));
      images[i].removeAttribute('data-src');
    }
  }

  document.addEventListener('tv:slidechange', function (event) {
    loadImages(event.detail.slide);
    loadImages(window.TV.deck.getSlide(event.detail.index + 1));
  });

  window.TV.preload = {
    loadImages: loadImages
  };
})(window, document);
