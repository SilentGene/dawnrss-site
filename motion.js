// A few small movements, each borrowed from the app or from paper:
// highlighter pens drawn across keywords as they come into view, the
// closing emblem's sun rising, and the phone syncing in a new article.
// Only runs when theme.js has set `html.motion` (it doesn't when the reader
// asks for reduced motion); without it every piece is shown finished.

(function () {
  'use strict';
  var root = document.documentElement;
  if (!root.classList.contains('motion') || !('IntersectionObserver' in window)) {
    root.classList.remove('motion');
    return;
  }

  // Marks: each is drawn once it is well inside the viewport; marks in the
  // same block follow one another like a hand working down the page.
  var marks = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      marks.unobserve(e.target);
      e.target.classList.add('in');
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 1 });
  var blocks = new Map();
  document.querySelectorAll('mark').forEach(function (m) {
    var block = m.closest('.row, .plate, p, div') || document.body;
    var n = blocks.get(block) || 0;
    blocks.set(block, n + 1);
    m.style.transitionDelay = (0.25 + n * 0.18) + 's';
    marks.observe(m);
  });

  // The closing emblem rises when it is reached.
  var once = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      once.unobserve(e.target);
      e.target.classList.add('in');
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.closing .emblem').forEach(function (el) { once.observe(el); });

  // The phone: a moment after it is seen, the sync icon turns once and a
  // new article slides in at the top of today's list; the count goes up.
  var app = document.querySelector('.app');
  if (!app) return;
  var phone = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    phone.disconnect();
    setTimeout(function () {
      app.classList.add('syncing');
      setTimeout(function () {
        app.classList.add('arrived');
        var count = app.querySelector('.masthead-strip .count');
        if (count) {
          count.textContent = count.textContent.replace(/\d+/, function (n) {
            return String(Number(n) + 1);
          });
        }
      }, 850);
    }, 1400);
  }, { threshold: 0.6 });
  phone.observe(app);
})();
