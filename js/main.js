/**
 * ILS — Innovative Lighting Systems
 * Navegación, menú móvil, logo de respaldo, banner de cookies (con carga
 * condicionada de Google Tag Manager / GA4), formulario de contacto
 * (Web3Forms) y listados de proyectos / noticias desde JSON.
 */
(function () {
  "use strict";

  /* ==========================================================
     1) LOGO DE RESPALDO
     Mientras no se coloque el archivo real assets/logo/ils-logo.png,
     mostramos un logotipo de texto provisional fiel a la paleta de marca.
     En cuanto subáis el PNG real, este código deja de usarse solo.
     ========================================================== */
  var LOGO_SVG = {
    dark: // texto oscuro, para usar sobre fondos claros (cabecera)
      '<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ILS — Innovative Lighting Systems">' +
      '<rect x="0" y="6" width="9" height="9" fill="#E30613"/>' +
      '<text x="16" y="30" font-family="IBM Plex Sans, Arial, sans-serif" font-weight="700" font-size="26" fill="#E30613">ILS</text>' +
      '<text x="16" y="46" font-family="IBM Plex Mono, Consolas, monospace" font-size="7" letter-spacing="1" fill="#16181C">INNOVATIVE LIGHTING SYSTEMS</text>' +
      '</svg>',
    light: // texto claro, para usar sobre fondos oscuros (pie de página)
      '<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ILS — Innovative Lighting Systems">' +
      '<rect x="0" y="6" width="9" height="9" fill="#E30613"/>' +
      '<text x="16" y="30" font-family="IBM Plex Sans, Arial, sans-serif" font-weight="700" font-size="26" fill="#E30613">ILS</text>' +
      '<text x="16" y="46" font-family="IBM Plex Mono, Consolas, monospace" font-size="7" letter-spacing="1" fill="#F7F8F9">INNOVATIVE LIGHTING SYSTEMS</text>' +
      '</svg>'
  };

  function replaceWithFallback(img) {
    var variant = img.getAttribute("data-logo-variant") === "light" ? "light" : "dark";
    var wrapper = document.createElement("span");
    wrapper.className = "logo-fallback";
    wrapper.innerHTML = LOGO_SVG[variant];
    img.replaceWith(wrapper);
  }

  function initLogoFallback() {
    document.querySelectorAll("img.logo-img").forEach(function (img) {
      // Si el navegador ya ha terminado de intentar cargar la imagen (p. ej.
      // porque el error ya ocurrió antes de que este script se ejecutara),
      // "complete" será true y "naturalWidth" 0: hay que sustituirla ya.
      if (img.complete && img.naturalWidth === 0) {
        replaceWithFallback(img);
        return;
      }
      img.addEventListener("error", function () { replaceWithFallback(img); }, { once: true });
    });
  }

  /* ==========================================================
     2) NAVEGACIÓN MÓVIL
     ========================================================== */
  function initMobileNav() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    var toggleLabel = toggle.querySelector("[data-i18n]");

    function setToggleLabel(key) {
      if (!toggleLabel) return;
      toggleLabel.setAttribute("data-i18n", key);
      if (window.ILS_I18N) toggleLabel.textContent = window.ILS_I18N.t(key);
    }
    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      setToggleLabel("nav.menu_open");
    }
    function openMenu() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      setToggleLabel("nav.menu_close");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (window.innerWidth >= 900) return;
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  /* ==========================================================
     3) COOKIES — banner, modal de configuración y carga de GTM/GA4
     ========================================================== */
  var COOKIE_STORAGE_KEY = "ils-cookie-consent";
  var GTM_ID = "GTM-5S85TNVM"; // Identificador de Google Tag Manager (ver README)

  function getConsent() {
    try {
      var raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveConsent(analytics) {
    var value = { necessary: true, analytics: !!analytics, decided: true, date: new Date().toISOString() };
    try { window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(value)); } catch (e) { /* ignorar */ }
    return value;
  }

  function loadGTM() {
    if (window.__ilsGtmLoaded) return;
    window.__ilsGtmLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(script);

    // Nota: Google Tag Manager también pide añadir un <noscript><iframe>...
    // justo tras <body> para navegantes sin JavaScript. Lo omitimos a
    // propósito: esta función solo se ejecuta DESPUÉS de que la persona
    // visitante acepte las cookies analíticas (un gesto que requiere
    // JavaScript), así que un <noscript> estático siempre presente cargaría
    // GTM sin haber pedido consentimiento a quienes navegan sin JavaScript,
    // incumpliendo el requisito de "solo tras aceptar cookies".
  }

  function initCookies() {
    var banner = document.getElementById("cookieBanner");
    var modal = document.getElementById("cookieModal");
    if (!banner) return;

    var acceptBtn = document.getElementById("cookieAccept");
    var rejectBtn = document.getElementById("cookieReject");
    var settingsBtn = document.getElementById("cookieSettings");
    var modalSave = document.getElementById("cookieModalSave");
    var modalClose = document.getElementById("cookieModalClose");
    var analyticsCheckbox = document.getElementById("cookieAnalyticsCheckbox");

    var consent = getConsent();

    function hideBanner() { banner.classList.remove("is-visible"); }
    function showBanner() { banner.classList.add("is-visible"); }
    function openModal() {
      if (!modal) return;
      modal.classList.add("is-visible");
      if (analyticsCheckbox) analyticsCheckbox.checked = consent ? !!consent.analytics : false;
    }
    function closeModal() { if (modal) modal.classList.remove("is-visible"); }

    if (consent && consent.decided) {
      hideBanner();
      if (consent.analytics) loadGTM();
    } else {
      showBanner();
    }

    if (acceptBtn) acceptBtn.addEventListener("click", function () {
      consent = saveConsent(true);
      hideBanner();
      closeModal();
      loadGTM();
    });

    if (rejectBtn) rejectBtn.addEventListener("click", function () {
      consent = saveConsent(false);
      hideBanner();
      closeModal();
    });

    if (settingsBtn) settingsBtn.addEventListener("click", openModal);
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalSave) modalSave.addEventListener("click", function () {
      var wantsAnalytics = analyticsCheckbox ? analyticsCheckbox.checked : false;
      consent = saveConsent(wantsAnalytics);
      hideBanner();
      closeModal();
      if (wantsAnalytics) loadGTM();
    });
  }

  /* ==========================================================
     4) FORMULARIO DE CONTACTO (Web3Forms)
     ========================================================== */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var statusBox = document.getElementById("contactFormStatus");
    var submitBtn = form.querySelector("button[type='submit']");

    function setFieldError(field, hasError) {
      var wrapper = field.closest(".form-field");
      if (!wrapper) return;
      wrapper.classList.toggle("has-error", hasError);
    }

    function validate() {
      var valid = true;
      var name = form.querySelector("#contactName");
      var email = form.querySelector("#contactEmail");
      var message = form.querySelector("#contactMessage");
      var gdpr = form.querySelector("#contactGdpr");

      var nameOk = name.value.trim().length > 0;
      setFieldError(name, !nameOk);
      valid = valid && nameOk;

      var emailOk = isValidEmail(email.value.trim());
      setFieldError(email, !emailOk);
      valid = valid && emailOk;

      var messageOk = message.value.trim().length > 0;
      setFieldError(message, !messageOk);
      valid = valid && messageOk;

      var gdprWrapper = gdpr.closest(".form-field");
      if (gdprWrapper) gdprWrapper.classList.toggle("has-error", !gdpr.checked);
      valid = valid && gdpr.checked;

      return valid;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (statusBox) {
        statusBox.className = "form-status";
        statusBox.textContent = "";
      }

      if (!validate()) return;

      var honeypot = form.querySelector("input[name='botcheck']");
      if (honeypot && honeypot.value) return; // relleno por un bot: abortar en silencio

      var t = window.ILS_I18N ? window.ILS_I18N.t : function (k) { return k; };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("contact_page.form.sending");
      }

      var formData = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            if (statusBox) {
              statusBox.className = "form-status is-success";
              statusBox.textContent = t("contact_page.form.success");
            }
            form.reset();
          } else {
            throw new Error(data.message || "Web3Forms error");
          }
        })
        .catch(function (err) {
          console.error("[contacto] Error al enviar el formulario:", err);
          if (statusBox) {
            statusBox.className = "form-status is-error";
            statusBox.textContent = t("contact_page.form.error");
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = t("contact_page.form.submit");
          }
        });
    });
  }

  /* ==========================================================
     5) LISTADOS DESDE JSON: proyectos y noticias
     ========================================================== */
  function currentLang() {
    return window.ILS_I18N ? window.ILS_I18N.getLang() : "es";
  }

  function renderProjects(data) {
    var grid = document.getElementById("projectsGrid");
    if (!grid) return;
    var t = window.ILS_I18N ? window.ILS_I18N.t : function (k) { return k; };
    var lang = currentLang();

    grid.innerHTML = data.map(function (project) {
      var content = project[lang] || project.es;
      return (
        '<article class="project-card">' +
          '<img src="' + project.image + '" alt="" loading="lazy" width="800" height="600">' +
          '<div class="project-card__body">' +
            '<div class="project-card__meta">' +
              '<span class="ref-code">' + project.ref + '</span>' +
              '<span class="mono-tag">' + t(project.sector === "luxury" ? "worlds.luxury_title" : "worlds.defence_title") + '</span>' +
            '</div>' +
            '<h3>' + content.title + '</h3>' +
            '<p>' + content.text + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function renderNews(data) {
    var grid = document.getElementById("newsGrid");
    if (!grid) return;
    var t = window.ILS_I18N ? window.ILS_I18N.t : function (k) { return k; };
    var lang = currentLang();

    grid.innerHTML = data.map(function (item) {
      var content = item[lang] || item.es;
      var dateObj = new Date(item.date);
      var formattedDate = isNaN(dateObj.getTime()) ? item.date : dateObj.toLocaleDateString(lang === "en" ? "en-GB" : "es-ES", { year: "numeric", month: "long", day: "numeric" });
      return (
        '<article class="news-card">' +
          '<img src="' + item.image + '" alt="" loading="lazy" width="800" height="450">' +
          '<div class="news-card__body">' +
            '<time datetime="' + item.date + '">' + formattedDate + '</time>' +
            '<h3>' + content.title + '</h3>' +
            '<p>' + content.summary + '</p>' +
            '<a href="' + item.link + '" target="_blank" rel="noopener noreferrer">' + t("news_page.read_more") + ' &rarr;</a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function initDynamicLists() {
    var needsProjects = !!document.getElementById("projectsGrid");
    var needsNews = !!document.getElementById("newsGrid");
    if (!needsProjects && !needsNews) return;

    // Los datos viven en data/projects.js y data/news.js, cargados con
    // <script> normal (no con fetch) para que funcione también abriendo
    // el archivo con doble clic, sin necesidad de un servidor.
    function fetchAndRender() {
      if (needsProjects) {
        if (window.ILS_PROJECTS) {
          renderProjects(window.ILS_PROJECTS);
        } else {
          console.error("[proyectos] No se ha encontrado window.ILS_PROJECTS. Comprueba que data/projects.js se carga antes que js/main.js.");
        }
      }

      if (needsNews) {
        if (window.ILS_NEWS) {
          renderNews(window.ILS_NEWS);
        } else {
          console.error("[noticias] No se ha encontrado window.ILS_NEWS. Comprueba que data/news.js se carga antes que js/main.js.");
        }
      }
    }

    // Los datos y las traducciones ya están disponibles de forma síncrona
    // (se cargan con <script>, no con fetch), así que renderizamos ya mismo
    // en vez de esperar a un evento que podría haberse disparado antes de
    // que este código llegara a escucharlo.
    fetchAndRender();
    document.addEventListener("ils:langchange", fetchAndRender);
  }

  /* ==========================================================
     6) VARIOS: año en curso para el copyright
     ========================================================== */
  function initMisc() {
    var yearEls = document.querySelectorAll("[data-current-year]");
    yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ==========================================================
     Arranque
     ========================================================== */
  function init() {
    initLogoFallback();
    initMobileNav();
    initCookies();
    initContactForm();
    initDynamicLists();
    initMisc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
