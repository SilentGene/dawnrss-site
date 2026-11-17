// Light / dark choice: follows the system until the reader picks one.
(function () {
  var root = document.documentElement;
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
  } catch (e) {}
  window.dawnToggleTheme = function () {
    var now = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = now === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  };
})();
