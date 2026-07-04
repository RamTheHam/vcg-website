/* Nordic light — daylight engine + motion tiers (preview) */
(function () {
  'use strict';

  var STATES = ['morning', 'midday', 'bluehour', 'night'];
  var LABELS = { morning: 'Morning', midday: 'Midday', bluehour: 'Blue hour', night: 'Night' };
  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  /* Phones get the poster frame: an ambient background is not worth the
     decode cost and data on a small screen. */
  var posterOnly = window.matchMedia('(max-width: 767px)').matches;

  function clockState() {
    var h = new Date().getHours();
    if (h >= 6 && h < 10) return 'morning';
    if (h >= 10 && h < 17) return 'midday';
    if (h >= 17 && h < 22) return 'bluehour';
    return 'night';
  }

  function storedPin() {
    try { return localStorage.getItem('nl-pin') === 'midday'; } catch (e) { return false; }
  }
  function storedManual() {
    try { return sessionStorage.getItem('nl-state'); } catch (e) { return null; }
  }

  function initialState() {
    var manual = storedManual();
    if (manual && STATES.indexOf(manual) !== -1) return manual;
    if (storedPin()) return 'midday';
    return clockState();
  }

  var fadeTimer = null;
  function applyState(state, animate) {
    if (STATES.indexOf(state) === -1) state = 'midday';
    if (animate && !reduced) {
      html.classList.add('nl-fading');
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(function () { html.classList.remove('nl-fading'); }, 1300);
    }
    html.setAttribute('data-nl', state);
    updateSwitch(state);
    swapFilm(state, animate);
  }

  /* ── Pill switcher ── */
  function updateSwitch(state) {
    var sw = document.querySelector('.nl-switch');
    if (!sw) return;
    sw.querySelectorAll('button[data-state]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-state') === state ? 'true' : 'false');
    });
    var pin = sw.querySelector('.nl-switch__pin');
    if (pin) pin.setAttribute('aria-pressed', storedPin() ? 'true' : 'false');
  }

  function wireSwitch() {
    var sw = document.querySelector('.nl-switch');
    if (!sw) return;
    sw.querySelectorAll('button[data-state]').forEach(function (b) {
      b.addEventListener('click', function () {
        var s = b.getAttribute('data-state');
        try { sessionStorage.setItem('nl-state', s); } catch (e) {}
        applyState(s, true);
      });
    });
    var pin = sw.querySelector('.nl-switch__pin');
    if (pin) pin.addEventListener('click', function () {
      var on = !storedPin();
      try {
        localStorage.setItem('nl-pin', on ? 'midday' : '');
        sessionStorage.removeItem('nl-state');
      } catch (e) {}
      applyState(on ? 'midday' : clockState(), true);
    });
  }

  /* ── Film layer (variants B, C) ── */
  var filmBase = html.getAttribute('data-nl-media') || null;
  var filmEls = null;
  var filmActive = 0;
  var canWebm = null;
  var filmPrimed = false;

  function filmSrc(state) {
    if (canWebm === null) {
      var v = document.createElement('video');
      canWebm = !!v.canPlayType && v.canPlayType('video/webm; codecs="vp9"') !== '';
    }
    return filmBase + '/' + state + (canWebm ? '.webm' : '.mp4');
  }

  function swapFilm(state, animate) {
    if (!filmBase) return;
    var film = document.querySelector('.nl-film');
    if (!film) return;

    if (reduced || saveData || posterOnly) {
      var img = film.querySelector('img.nl-film__poster');
      if (!img) {
        img = document.createElement('img');
        img.className = 'nl-film__poster';
        img.alt = '';
        film.insertBefore(img, film.firstChild);
        film.querySelectorAll('video').forEach(function (v) { v.remove(); });
      }
      img.src = filmBase + '/' + state + '.jpg';
      img.classList.add('nl-film--on');
      return;
    }

    if (!filmEls) filmEls = film.querySelectorAll('video');
    if (!filmEls.length) return;
    if (!filmPrimed) {
      // before window load: show the state's poster only, no video decode yet
      filmEls[0].setAttribute('poster', filmBase + '/' + state + '.jpg');
      filmEls[0].classList.add('nl-film--on');
      return;
    }
    var current = filmEls[filmActive];
    var next = filmEls[1 - filmActive];
    var src = filmSrc(state);
    if (current.classList.contains('nl-film--on') && current.getAttribute('src') === src) return;

    next.setAttribute('poster', filmBase + '/' + state + '.jpg');
    next.setAttribute('src', src);
    next.load();
    var play = next.play();
    if (play && play.catch) play.catch(function () {});
    next.classList.add('nl-film--on');
    current.classList.remove('nl-film--on');
    setTimeout(function () { current.pause(); }, animate ? 1300 : 50);
    filmActive = 1 - filmActive;
  }

  /* Poster paints first; the film attaches only after the page has loaded,
     so first paint and interactivity are never competing with video decode. */
  function primeFilm(state) {
    if (!filmBase) return;
    swapFilm(state, false); // poster paints now (video attach is gated below)
    if (reduced || saveData || posterOnly) return;
    var start = function () {
      setTimeout(function () {
        filmPrimed = true;
        swapFilm(html.getAttribute('data-nl'), false);
      }, 1200);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
  }

  /* Pause the film when the hero has scrolled away */
  function wireFilmPause() {
    if (!filmBase || reduced || saveData || posterOnly) return;
    var hero = document.querySelector('.hero');
    if (!hero || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = document.querySelector('.nl-film video.nl-film--on');
        if (!v) return;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0 }).observe(hero);
  }

  /* ── Count-ups ── */
  function wireCounts() {
    var els = document.querySelectorAll('.nl-count');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }
    els.forEach(function (el) { el.textContent = '0'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var target = parseInt(e.target.getAttribute('data-count'), 10);
        var t0 = null;
        var D = 1200;
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

  /* ── The inversion — fires once ── */
  function wireInversion() {
    var inv = document.querySelector('.nl-inversion');
    if (!inv) return;
    if (reduced || !('IntersectionObserver' in window)) { inv.classList.add('nl-fired'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          inv.classList.add('nl-fired');
          io.unobserve(inv);
        }
      });
    }, { threshold: 0.5 });
    io.observe(inv);
  }

  /* ── Boot ── */
  function boot() {
    wireSwitch();
    updateSwitch(html.getAttribute('data-nl'));
    wireCounts();
    wireInversion();
    wireFilmPause();
    primeFilm(html.getAttribute('data-nl'));
    setTimeout(function () { html.classList.add('nl-ready'); }, 60);
  }

  applyState(initialState(), false);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
