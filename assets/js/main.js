/* JC Detailing — minimales Vanilla-JS: Header, Mobile-Nav, Scroll-Reveal */
(function () {
  "use strict";

  /* Header: Hintergrund nach dem ersten Scroll */
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile-Navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* Leistungen-Dropdown (Klick/Touch zusätzlich zum Hover) */
  var subToggles = document.querySelectorAll(".has-sub > .nav-sub-toggle");
  function closeSubs(except) {
    document.querySelectorAll(".has-sub.is-open").forEach(function (item) {
      if (item === except) return;
      item.classList.remove("is-open");
      item.querySelector(".nav-sub-toggle").setAttribute("aria-expanded", "false");
    });
  }
  subToggles.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var item = btn.parentElement;
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      closeSubs(item);
    });
  });
  document.addEventListener("click", function () { closeSubs(null); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSubs(null);
  });

  /* Hero-Video: nur laden, wenn großer Screen, keine Reduced-Motion,
     kein Datensparmodus — sonst bleibt das Poster-Standbild */
  var heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    var wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isWide = window.matchMedia("(min-width: 48rem)").matches;
    var savesData = navigator.connection && navigator.connection.saveData;
    if (wantsMotion && isWide && !savesData) {
      [["webm", heroVideo.dataset.srcWebm], ["mp4", heroVideo.dataset.srcMp4]]
        .forEach(function (s) {
          if (!s[1]) return;
          var source = document.createElement("source");
          source.src = s[1];
          source.type = "video/" + s[0];
          heroVideo.appendChild(source);
        });
      heroVideo.autoplay = true;
      heroVideo.load();
    }
  }

  /* Google Maps: DSGVO-Zwei-Klick (Karte erst nach Einwilligung laden) */
  var mapConsent = document.getElementById("map-consent");
  if (mapConsent) {
    mapConsent.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; /* Datenschutz-Link normal folgen */
      var frame = document.createElement("iframe");
      frame.src = mapConsent.dataset.mapSrc;
      frame.title = mapConsent.dataset.mapTitle;
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.allowFullscreen = true;
      mapConsent.parentElement.appendChild(frame);
      mapConsent.remove();
    });
  }

  /* Scroll-Reveal */
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
