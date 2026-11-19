/*
 * paging.js
 * Divide una lista larga (la portada) en páginas que caben enteras en
 * pantalla, como diapositivas: nunca hay desplazamiento. Cuántos elementos
 * entran se mide en la propia pantalla, así funciona con cualquier fuente.
 * Solo los elementos de la página visible quedan enfocables.
 */
(function (window, document) {
  'use strict';

  var list = null;
  var items = [];
  var pages = [];
  var currentPage = 0;
  var prevButton = null;
  var nextButton = null;
  var label = null;

  function setItemVisible(item, visible) {
    var link = item.querySelector('[data-focusable], [data-page-focusable]');
    if (visible) {
      item.classList.remove('u-hidden');
      if (link) {
        link.removeAttribute('data-page-focusable');
        link.setAttribute('data-focusable', '');
      }
    } else {
      item.classList.add('u-hidden');
      if (link) {
        link.removeAttribute('data-focusable');
        link.setAttribute('data-page-focusable', '');
      }
    }
  }

  // Agrega elementos uno a uno hasta que la lista desborda; el que no
  // entra empieza la página siguiente.
  function buildPages() {
    pages = [];
    var page = [];
    items.forEach(function (item) { setItemVisible(item, false); });
    items.forEach(function (item) {
      setItemVisible(item, true);
      if (page.length && list.scrollHeight > list.clientHeight) {
        page.forEach(function (previous) { setItemVisible(previous, false); });
        pages.push(page);
        page = [];
      }
      page.push(item);
    });
    if (page.length) {
      pages.push(page);
    }
  }

  // Un botón deshabilitado u oculto no debe recibir el foco.
  function setButtonEnabled(button, enabled) {
    if (!button) {
      return;
    }
    button.disabled = !enabled;
    if (enabled) {
      button.setAttribute('data-focusable', '');
    } else {
      button.removeAttribute('data-focusable');
    }
  }

  function showPage(index) {
    if (index < 0 || index >= pages.length) {
      return false;
    }
    currentPage = index;
    items.forEach(function (item) { setItemVisible(item, false); });
    pages[index].forEach(function (item) { setItemVisible(item, true); });
    if (label) {
      label.textContent = (index + 1) + ' de ' + pages.length;
    }
    setButtonEnabled(prevButton, index > 0);
    setButtonEnabled(nextButton, index < pages.length - 1);
    document.dispatchEvent(new CustomEvent('tv:pagechange', { detail: { page: index } }));
    return true;
  }

  function nextPage() {
    return showPage(currentPage + 1);
  }

  function prevPage() {
    return showPage(currentPage - 1);
  }

  function init(listElement, pagerElement) {
    list = listElement;
    if (!list) {
      return;
    }
    items = Array.prototype.slice.call(list.children);
    if (pagerElement) {
      prevButton = pagerElement.querySelector('[data-page="prev"]');
      nextButton = pagerElement.querySelector('[data-page="next"]');
      label = pagerElement.querySelector('[data-page-label]');
      if (prevButton) {
        prevButton.addEventListener('click', prevPage);
      }
      if (nextButton) {
        nextButton.addEventListener('click', nextPage);
      }
    }
    buildPages();
    // Con una sola página el paginador sobra.
    if (pagerElement && pages.length < 2) {
      pagerElement.classList.add('u-hidden');
    }
    showPage(0);
  }

  window.TV.paging = {
    init: init,
    nextPage: nextPage,
    prevPage: prevPage
  };
})(window, document);
