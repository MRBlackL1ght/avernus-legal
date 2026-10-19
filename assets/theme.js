// Переключатель темы. Выбор хранится только в этом браузере (localStorage); без него сайт работает по теме системы.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* хранилище недоступно */ }
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function current() {
    var forced = root.getAttribute("data-theme");
    if (forced) return forced;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    // На узком экране содержание свёрнуто, чтобы сразу был виден текст.
    var toc = document.querySelector(".toc details");
    if (toc && window.matchMedia && window.matchMedia("(max-width: 979px)").matches) toc.removeAttribute("open");

    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    function label() { button.textContent = current() === "dark" ? "☀ Светлая тема" : "☾ Тёмная тема"; }
    label();
    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* не сохраняем */ }
      label();
    });
  });
})();
