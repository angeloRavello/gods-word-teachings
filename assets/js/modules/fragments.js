/*
 * fragments.js
 * Revelado paso a paso dentro de una diapositiva: cada '→' muestra el
 * siguiente elemento con clase .fragment, en el orden de lectura.
 * Los fragmentos ocultos conservan su espacio, así nada se mueve al aparecer.
 */
(function (window, document) {
  'use strict';

  var VISIBLE_CLASS = 'is-visible';

  function getFragments(slide) {
    if (!slide) {
      return [];
    }
    return Array.prototype.slice.call(slide.querySelectorAll('.fragment'));
  }

  // Devuelve true si reveló algo; false si ya no quedaba nada por mostrar.
  function revealNextFragment(slide) {
    var fragments = getFragments(slide);
    for (var i = 0; i < fragments.length; i++) {
      if (!fragments[i].classList.contains(VISIBLE_CLASS)) {
        fragments[i].classList.add(VISIBLE_CLASS);
        return true;
      }
    }
    return false;
  }

  // Devuelve true si ocultó algo; false si no había fragmentos visibles.
  function hideLastFragment(slide) {
    var fragments = getFragments(slide);
    for (var i = fragments.length - 1; i >= 0; i--) {
      if (fragments[i].classList.contains(VISIBLE_CLASS)) {
        fragments[i].classList.remove(VISIBLE_CLASS);
        return true;
      }
    }
    return false;
  }

  function showAll(slide) {
    getFragments(slide).forEach(function (fragment) {
      fragment.classList.add(VISIBLE_CLASS);
    });
  }

  function hideAll(slide) {
    getFragments(slide).forEach(function (fragment) {
      fragment.classList.remove(VISIBLE_CLASS);
    });
  }

  document.addEventListener('tv:slidechange', function (event) {
    if (event.detail.revealAll) {
      showAll(event.detail.slide);
    } else {
      hideAll(event.detail.slide);
    }
  });

  window.TV.fragments = {
    revealNextFragment: revealNextFragment,
    hideLastFragment: hideLastFragment,
    showAll: showAll,
    hideAll: hideAll
  };
})(window, document);
