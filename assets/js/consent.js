/* Google Ads nur mit Einwilligung (Consent Mode v2, Basisvariante):
   ohne Einwilligung wird kein Google-Script geladen und kein Cookie
   gesetzt. Die Entscheidung liegt in localStorage ("jc-consent");
   diese Speicherung ist fuer die Einwilligungsverwaltung unbedingt
   erforderlich und darum einwilligungsfrei (§ 25 Abs. 2 Nr. 2 TDDDG).
   Das Script laedt synchron im head, damit der gtag-Stub existiert,
   bevor conversions.js Events schickt. */
(function () {
  "use strict";

  var TAG_ID = "AW-11267101551";
  var KEY = "jc-consent";

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };

  /* Consent Mode v2: alles verweigert, bis der Besucher zustimmt */
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  function lesen() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function speichern(wert) {
    try { localStorage.setItem(KEY, wert); } catch (e) {}
  }

  var geladen = false;
  function googleStarten() {
    /* Erst die Freigabe, dann Tag-Konfiguration und Script-Load.
       ad_personalization bleibt denied: kein Remarketing, nur Messung
       (so steht es auch in der Datenschutzerklaerung). */
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted"
    });
    if (geladen) return;
    geladen = true;
    gtag("js", new Date());
    gtag("config", TAG_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + TAG_ID;
    document.head.appendChild(s);
  }

  function googleStoppen() {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied"
    });
    /* Bereits gesetzte Google-Ads-Cookies (Erstanbieter, _gcl/_gac)
       beim Widerruf loeschen */
    var teile = document.cookie.split(";");
    for (var i = 0; i < teile.length; i++) {
      var name = teile[i].split("=")[0].replace(/^\s+/, "");
      if (name.indexOf("_gcl") === 0 || name.indexOf("_gac") === 0) {
        var ablauf = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = name + ablauf;
        document.cookie = name + ablauf + "; domain=." + location.hostname;
      }
    }
  }

  /* ---------------------------- Banner ---------------------------- */

  var banner = null;

  function entscheiden(wert) {
    speichern(wert);
    if (wert === "ja") { googleStarten(); } else { googleStoppen(); }
    if (banner) { banner.remove(); banner = null; }
    document.body.classList.remove("has-consent-banner");
  }

  function bannerZeigen() {
    if (banner) return;
    banner = document.createElement("div");
    banner.className = "consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie-Hinweis");
    banner.innerHTML =
      '<div class="consent__inner">' +
        '<p class="consent__text"><strong>Cookies für die Werbemessung.</strong> ' +
        'Wir möchten mit Google Ads messen, ob unsere Anzeigen zu Anfragen führen. ' +
        'Stimmen Sie zu, setzt Google dafür Cookies. Lehnen Sie ab, wird nichts von ' +
        'Google geladen und die Seite funktioniert genauso. ' +
        '<a href="/datenschutz.html#google-ads">Details in der Datenschutzerklärung</a></p>' +
        '<div class="consent__actions">' +
          '<button type="button" class="consent__btn" data-consent="nein">Ablehnen</button>' +
          '<button type="button" class="consent__btn consent__btn--primary" data-consent="ja">Akzeptieren</button>' +
        '</div>' +
      '</div>';
    banner.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-consent]") : null;
      if (b) entscheiden(b.getAttribute("data-consent"));
    });
    document.body.appendChild(banner);
    document.body.classList.add("has-consent-banner");
  }

  function bereit(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else { fn(); }
  }

  /* Gespeicherte Entscheidung anwenden, sonst Banner zeigen */
  if (lesen() === "ja") {
    googleStarten();
  } else if (lesen() !== "nein") {
    bereit(bannerZeigen);
  }

  /* Erneut oeffnen: jeder Link auf #cookie-einstellungen (Seitenfuss,
     Datenschutzerklaerung) holt das Banner zurueck */
  bereit(function () {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href$="#cookie-einstellungen"]') : null;
      if (!a) return;
      e.preventDefault();
      bannerZeigen();
    });
    if (location.hash === "#cookie-einstellungen") bannerZeigen();
  });
})();
