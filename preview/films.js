/* Light-films — play each band's clip only while it's on screen.
   Posters carry the bands otherwise; reduced-motion / data-saver never play. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var save = navigator.connection && navigator.connection.saveData;
  var vids = document.querySelectorAll('.fb__video');
  if (!vids.length) return;
  if (reduce || save || !('IntersectionObserver' in window)) return; // posters stay

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.2 });

  vids.forEach(function (v) { io.observe(v); });
})();
