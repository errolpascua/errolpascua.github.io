(function () {
  'use strict';

  /* ─── Tetris Background Canvas ─── */

  var canvas = document.getElementById('tetris-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  // Classic Tetris piece shapes and colors
  var SHAPES = [
    { cells: [[1,1,1,1]],       color: '#00f0f0' }, // I – cyan
    { cells: [[1,0,0],[1,1,1]], color: '#0070f0' }, // J – blue
    { cells: [[0,0,1],[1,1,1]], color: '#f0a000' }, // L – orange
    { cells: [[1,1],[1,1]],     color: '#f0f000' }, // O – yellow
    { cells: [[0,1,1],[1,1,0]], color: '#00d000' }, // S – green
    { cells: [[0,1,0],[1,1,1]], color: '#a000f0' }, // T – purple
    { cells: [[1,1,0],[0,1,1]], color: '#f00000' }, // Z – red
  ];

  var SZ    = 22;    // block size (px)
  var ALPHA = 0.065; // overall opacity – keep subtle
  var COUNT = 13;    // simultaneous falling pieces

  var W, H, pieces = [], raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function newPiece(startY) {
    var s  = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    var pw = s.cells[0].length * SZ;
    return {
      cells : s.cells,
      color : s.color,
      x     : Math.floor(Math.random() * Math.max(1, W - pw)),
      y     : startY !== undefined ? startY : -(s.cells.length * SZ + 4),
      vy    : 0.28 + Math.random() * 0.45,
    };
  }

  function drawPiece(p) {
    for (var r = 0; r < p.cells.length; r++) {
      for (var c = 0; c < p.cells[r].length; c++) {
        if (!p.cells[r][c]) continue;
        var px = p.x + c * SZ;
        var py = p.y + r * SZ;
        // fill
        ctx.globalAlpha = ALPHA;
        ctx.fillStyle = p.color;
        ctx.fillRect(px, py, SZ - 1, SZ - 1);
        // inner highlight border
        ctx.globalAlpha = ALPHA * 0.45;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 1, py + 1, SZ - 3, SZ - 3);
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    for (var i = 0; i < pieces.length; i++) {
      pieces[i].y += pieces[i].vy;
      if (pieces[i].y > H + SZ * 4) {
        pieces[i] = newPiece();
      }
      drawPiece(pieces[i]);
    }
    raf = requestAnimationFrame(tick);
  }

  function initCanvas() {
    resize();
    pieces = [];
    for (var i = 0; i < COUNT; i++) {
      // spread initial positions across full viewport height
      pieces.push(newPiece(Math.random() * H));
    }
    cancelAnimationFrame(raf);
    tick();
  }

  window.addEventListener('resize', function () {
    cancelAnimationFrame(raf);
    initCanvas();
  }, { passive: true });


  /* ─── Scroll Reveal ─── */

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var els = document.querySelectorAll(
      '.page-content h1, .page-content h2, .page-content h3, ' +
      '.page-content p, .page-content ul, .page-content ol, ' +
      '.page-content blockquote, .page-content img, ' +
      '.page-content hr, .page-content table'
    );

    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-in');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -24px 0px',
    });

    els.forEach(function (el) {
      el.classList.add('sr');
      io.observe(el);
    });
  }


  /* ─── Boot ─── */

  function boot() {
    initCanvas();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
