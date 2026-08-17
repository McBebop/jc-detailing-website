/* Google Ads Conversion-Tracking: Klicks auf WhatsApp-, Anruf- und
   E-Mail-Links. Laeuft ueber einen einzigen Listener am document, damit
   auch die per main.js nachtraeglich eingefuegte mobile Kontaktleiste
   erfasst wird.

   HIER die drei Conversion-Labels aus Google Ads eintragen
   (Ziele, Conversions, Aktion oeffnen, Tag einrichten, "Tag selbst
   hinzufuegen": im Event-Snippet steht 'send_to': 'AW-11267101551/XXXX',
   der Wert hinter dem Schraegstrich ist das Label).
   Solange die Platzhalter drinstehen, sendet das Script bewusst nichts. */
(function () {
  "use strict";

  var TAG_ID = "AW-11267101551";
  var LABEL_WHATSAPP = "0HrgCLK6keMcEO-myfwp";
  var LABEL_ANRUF = "i8DmCLW6keMcEO-myfwp";
  var LABEL_EMAIL = "dOsUCLi6keMcEO-myfwp";

  var PLATZHALTER = ["WHATSAPP_LABEL", "ANRUF_LABEL", "EMAIL_LABEL"];
  var warned = false;

  function send(label, quelle) {
    if (typeof gtag !== "function") return;
    if (!label || PLATZHALTER.indexOf(label) !== -1) {
      if (!warned && window.console && console.warn) {
        warned = true;
        console.warn("Conversion-Tracking: Labels in assets/js/conversions.js fehlen noch.");
      }
      return;
    }
    gtag("event", "conversion", {
      send_to: TAG_ID + "/" + label,
      event_category: "kontakt",
      event_label: quelle
    });
  }

  function istWhatsApp(href) {
    var h = href.toLowerCase();
    /* Der Link zu den WhatsApp-Nutzungsbedingungen in der
       Datenschutzerklaerung ist keine Kontaktaufnahme. */
    if (h.indexOf("whatsapp.com/legal") !== -1) return false;
    return h.indexOf("wa.me") !== -1 || h.indexOf("whatsapp") !== -1;
  }

  document.addEventListener("click", function (e) {
    var el = e.target;
    if (!el || typeof el.closest !== "function") return;

    var a = el.closest("a");
    if (!a) return;

    var href = a.getAttribute("href") || "";
    if (!href) return;

    var h = href.toLowerCase();
    if (istWhatsApp(href)) {
      send(LABEL_WHATSAPP, "whatsapp");
    } else if (h.indexOf("tel:") === 0) {
      send(LABEL_ANRUF, "anruf");
    } else if (h.indexOf("mailto:") === 0) {
      send(LABEL_EMAIL, "email");
    }
  });
})();
