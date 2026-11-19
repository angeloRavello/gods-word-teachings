/*
 * refresh.js
 * Botón "Actualizar" ([data-refresh]). Una página no puede borrar el caché del
 * navegador, pero sí puede volver a descargar cada archivo con
 * fetch(url, { cache: 'reload' }): eso ignora la copia guardada y la REEMPLAZA
 * por la nueva. Se hace con la portada, sus archivos, cada presentación
 * enlazada y los archivos de cada presentación; después se recarga la página.
 */
(function (window, document) {
  'use strict';

  var LABEL_WORKING = 'Actualizando…';

  function toAbsoluteUrl(url, baseUrl) {
    return new URL(url, baseUrl).href.split('#')[0];
  }

  function isSameOrigin(url) {
    return url.indexOf(window.location.origin) === 0;
  }

  // Archivos que ya cargó esta página (CSS, JS, imágenes).
  function getLoadedResourceUrls() {
    if (!window.performance || !window.performance.getEntriesByType) {
      return [];
    }
    return window.performance.getEntriesByType('resource').map(function (entry) {
      return entry.name.split('#')[0];
    });
  }

  // Presentaciones y herramientas enlazadas desde la portada.
  function getLinkedPageUrls() {
    var links = document.querySelectorAll('a[href]');
    return Array.prototype.map.call(links, function (link) {
      return toAbsoluteUrl(link.getAttribute('href'), window.location.href);
    });
  }

  // Archivos que usa una página (sin ejecutarla): estilos, scripts e imágenes.
  function extractAssetUrls(html, pageUrl) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var nodes = doc.querySelectorAll('link[href], script[src], img[src], img[data-src]');
    return Array.prototype.map.call(nodes, function (node) {
      var url = node.getAttribute('href') || node.getAttribute('src') || node.getAttribute('data-src');
      return toAbsoluteUrl(url, pageUrl);
    });
  }

  function unique(urls) {
    var seen = {};
    return urls.filter(function (url) {
      if (seen[url] || !isSameOrigin(url)) {
        return false;
      }
      seen[url] = true;
      return true;
    });
  }

  // Descarga ignorando el caché; nunca falla (un archivo caído no frena el resto).
  function reloadUrl(url) {
    return fetch(url, { cache: 'reload' })
      .then(function (response) {
        return response.ok ? response.text() : '';
      })
      .catch(function () {
        return '';
      });
  }

  function refreshAll() {
    // Cada archivo se descarga una sola vez aunque lo usen varias páginas.
    var requested = {};
    function reloadOnce(url) {
      if (!requested[url]) {
        requested[url] = reloadUrl(url);
      }
      return requested[url];
    }

    var homeUrl = window.location.href.split('#')[0];
    var pageUrls = unique(getLinkedPageUrls());
    var directUrls = unique([homeUrl].concat(getLoadedResourceUrls()));

    var pageJobs = pageUrls.map(function (pageUrl) {
      return reloadOnce(pageUrl).then(function (html) {
        var assetUrls = unique(extractAssetUrls(html, pageUrl));
        return Promise.all(assetUrls.map(reloadOnce)).then(function () {
          return [pageUrl].concat(assetUrls);
        });
      });
    });

    var directJob = Promise.all(directUrls.map(reloadOnce)).then(function () {
      return directUrls;
    });

    return Promise.all(pageJobs.concat([directJob])).then(function (groups) {
      // Lista final de archivos actualizados (útil para revisar).
      window.TV.refresh.lastUrls = unique([].concat.apply([], groups));
      return window.TV.refresh.lastUrls;
    });
  }

  function handleClick(button) {
    if (button.disabled) {
      return;
    }
    button.disabled = true;
    button.textContent = LABEL_WORKING;
    refreshAll().then(function () {
      window.location.reload();
    });
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (target && target.hasAttribute && target.hasAttribute('data-refresh')) {
      handleClick(target);
    }
  });

  window.TV.refresh = {
    refreshAll: refreshAll,
    lastUrls: []
  };
})(window, document);
