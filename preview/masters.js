/* Masters preview — count-ups on the stats + the one inversion beat.
   Reveals, nav and smooth-scroll are handled by the site's own script. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* Stat count-ups ------------------------------------------------ */
  function wireCounts() {
    var els = document.querySelectorAll('.nl-count');
    if (!els.length) return;
    if (reduced || !hasIO) {
      els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }
    els.forEach(function (el) { el.textContent = '0'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var target = parseInt(e.target.getAttribute('data-count'), 10);
        var t0 = null, D = 1200;
        function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / D, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          e.target.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* The inversion — fires once ----------------------------------- */
  function wireInversion() {
    var inv = document.querySelector('.nl-inversion');
    if (!inv) return;
    if (reduced || !hasIO) { inv.classList.add('nl-fired'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { inv.classList.add('nl-fired'); io.unobserve(inv); }
      });
    }, { threshold: 0.45 });
    io.observe(inv);
  }

  function boot() { wireCounts(); wireInversion(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
