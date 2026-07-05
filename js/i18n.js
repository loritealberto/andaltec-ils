/**
 * ILS — Innovative Lighting Systems
 * Motor de traducción ES / EN.
 * Lee data/translations.js y aplica el texto a cualquier elemento marcado
 * con data-i18n="ruta.a.la.clave" (o data-i18n-attr para atributos).
 */
(function () {
  "use strict";

  var SUPPORTED_LANGS = ["es", "en"];
  var DEFAULT_LANG = "es";
  var STORAGE_KEY = "ils-lang";

  var translations = null;
  var currentLang = DEFAULT_LANG;

  function detectInitialLang() {
    var stored = null;
    try { stored = window.localStorage.getItem(STORAGE_KEY); } catch (e) { /* localStorage no disponible */ }
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;

    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.indexOf("es") === 0) return "es";
    if (nav) return "en";
    return DEFAULT_LANG;
  }

  function getValueByPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : undefined;
    }, obj);
  }

  function t(key) {
    // Si translations.js todavía no ha cargado (o falló, p. ej. al abrir el
    // archivo con doble clic en vez de por un servidor), devolvemos la propia
    // clave en vez de una cadena vacía: así nunca se borra el texto de la página.
    if (!translations) return key;
    var dict = translations[currentLang] || translations[DEFAULT_LANG];
    var value = getValueByPath(dict, key);
    if (value === undefined) {
      var fallback = translations[DEFAULT_LANG];
      value = getValueByPath(fallback, key);
    }
    return value !== undefined ? value : key;
  }

  function applyTranslations(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = t(key);
      if (typeof value === "string") {
        el.textContent = value;
      }
    });

    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    scope.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      el.setAttribute("aria-label", t(key));
    });

    scope.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      el.setAttribute("alt", t(key));
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(key);
    });

    scope.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-content");
      el.setAttribute("content", t(key));
    });
  }

  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    currentLang = lang;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignorar */ }
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    // Si translations.js aún no ha cargado, no tocamos el contenido de la
    // página (mejor dejar el texto tal cual que sustituirlo por claves sueltas).
    // En cuanto la carga termine, init() vuelve a llamar a setLang() y se aplica.
    if (!translations) return;

    applyTranslations(document);
    document.dispatchEvent(new CustomEvent("ils:langchange", { detail: { lang: lang } }));
  }

  function init() {
    currentLang = detectInitialLang();
    document.documentElement.setAttribute("lang", currentLang);

    // Los textos viven en data/translations.js, cargado con una etiqueta
    // <script> normal (no con fetch): así funciona igual subido a un servidor
    // que abriendo el archivo con doble clic desde el disco duro.
    if (window.ILS_TRANSLATIONS) {
      translations = window.ILS_TRANSLATIONS;
      setLang(currentLang);
      document.dispatchEvent(new CustomEvent("ils:i18nready", { detail: { lang: currentLang } }));
    } else {
      console.error("[i18n] No se ha encontrado window.ILS_TRANSLATIONS. Comprueba que data/translations.js se carga antes que js/i18n.js.");
    }

    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-lang-btn]");
      if (!btn) return;
      setLang(btn.getAttribute("data-lang-btn"));
    });
  }

  window.ILS_I18N = {
    t: t,
    setLang: setLang,
    getLang: function () { return currentLang; },
    applyTranslations: applyTranslations
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
