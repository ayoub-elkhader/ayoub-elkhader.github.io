// Language switch: English by default, French with ?lang=fr or the FR button.
(function () {
  var body = document.body;
  var buttons = document.querySelectorAll(".lang button");

  function setLang(lang) {
    body.classList.remove("lang-en", "lang-fr");
    body.classList.add("lang-" + lang);
    document.documentElement.lang = lang;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    var title = document.querySelector("title");
    if (title && title.dataset[lang]) title.textContent = title.dataset[lang];
    try { localStorage.setItem("lang", lang); } catch (e) { /* storage unavailable */ }
  }

  var fromUrl = new URLSearchParams(window.location.search).get("lang");
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) { /* storage unavailable */ }
  setLang(fromUrl === "fr" || fromUrl === "en" ? fromUrl : (stored === "fr" ? "fr" : "en"));

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  // light / dark toggle, remembered on this device
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
