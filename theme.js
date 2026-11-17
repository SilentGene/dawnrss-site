// Light / dark choice: follows the system until the reader picks one.
(function () {
  var root = document.documentElement;
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
  } catch (e) {}
  // Set before first paint, so the animated pieces start from their
  // opening state instead of flashing in finished (see motion.js).
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('motion');
  }
  // The new theme spreads out from the button like a drop of ink on paper
  // (View Transitions where the browser has them; an instant switch elsewhere).
  window.dawnToggleTheme = function (button) {
    var now = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = now === 'dark' ? 'light' : 'dark';
    function apply() {
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    }
    var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || still || !button) return apply();
    var box = button.getBoundingClientRect();
    var x = box.left + box.width / 2, y = box.top + box.height / 2;
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('ink-switch');
    var t = document.startViewTransition(apply);
    t.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0 at ' + x + 'px ' + y + 'px)',
                     'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 700, easing: 'cubic-bezier(.65, 0, .35, 1)',
          pseudoElement: '::view-transition-new(root)' });
    });
    t.finished.then(function () { root.classList.remove('ink-switch'); });
  };
})();
