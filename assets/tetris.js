(function () {
  'use strict';

  /* ─── Tetris Reveal Background ─── */

  var canvas = document.getElementById('tetris-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var SHAPES = [
    { cells: [[1,1,1,1]],       color: '#00f0f0' }, // I – cyan
    { cells: [[1,0,0],[1,1,1]], color: '#0070f0' }, // J – blue
    { cells: [[0,0,1],[1,1,1]], color: '#f0a000' }, // L – orange
    { cells: [[1,1],[1,1]],     color: '#f0f000' }, // O – yellow
    { cells: [[0,1,1],[1,1,0]], color: '#00d000' }, // S – green
    { cells: [[0,1,0],[1,1,1]], color: '#a000f0' }, // T – purple
    { cells: [[1,1,0],[0,1,1]], color: '#f00000' }, // Z – red
  ];

  var SZ     = 26;   // block size in px
  var FILL_A = 0.14; // fill opacity at full reveal
  var EDGE_A = 0.38; // edge highlight opacity at full reveal
  var ROWS   = 500;  // board rows (tall enough for any page)

  var W, H, COLS, board;
  var lastScrollY = -1;


  /* ── Board generation ── */

  function makeBoard() {
    board = [];
    for (var r = 0; r < ROWS; r++) {
      board.push(new Array(COLS).fill(null));
    }

    var id = 0;
    var tries = COLS * ROWS * 3;

    for (var t = 0; t < tries; t++) {
      var s   = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      var or  = Math.floor(Math.random() * ROWS);
      var oc  = Math.floor(Math.random() * COLS);
      var ok  = true;

      for (var dr = 0; dr < s.cells.length && ok; dr++) {
        for (var dc = 0; dc < s.cells[dr].length && ok; dc++) {
          if (!s.cells[dr][dc]) continue;
          var nr = or + dr, nc = oc + dc;
          if (nr >= ROWS || nc >= COLS || board[nr][nc]) ok = false;
        }
      }

      if (ok) {
        id++;
        for (var dr2 = 0; dr2 < s.cells.length; dr2++) {
          for (var dc2 = 0; dc2 < s.cells[dr2].length; dc2++) {
            if (s.cells[dr2][dc2]) {
              board[or + dr2][oc + dc2] = { color: s.color, id: id };
            }
          }
        }
      }
    }
  }


  /* ── Reveal factor: 0 (hidden) → 1 (fully visible) based on scroll ── */

  function revealFactor(r) {
    var scrollY = window.scrollY;
    // Block's Y position in the document (fixed board, 1:1 with page)
    var blockY = r * SZ;
    // How far below the current viewport bottom this block is
    var viewBottom = scrollY + H;
    // Reveal zone: the bottom 25% of the viewport
    var revealStart = viewBottom - H * 0.25;

    if (blockY < revealStart) return 1;          // already fully revealed
    if (blockY > viewBottom + SZ * 2) return 0;  // not yet in view
    return Math.max(0, (viewBottom - blockY) / (H * 0.25));
  }


  /* ── Draw ── */

  function draw() {
    var scrollY = window.scrollY;
    ctx.clearRect(0, 0, W, H);

    for (var r = 0; r < ROWS; r++) {
      // Screen Y for this row (board moves 1:1 with scroll)
      var py = r * SZ - scrollY;
      if (py > H + SZ || py + SZ < -SZ) continue;

      var rf = revealFactor(r);
      if (rf <= 0) continue;

      for (var c = 0; c < COLS; c++) {
        var cell = board[r][c];
        if (!cell) continue;

        var px = c * SZ;

        // Block fill
        ctx.globalAlpha = FILL_A * rf;
        ctx.fillStyle = cell.color;
        ctx.fillRect(px, py, SZ, SZ);

        // Bright edge lines only on piece boundaries
        ctx.fillStyle = cell.color;

        var top = r > 0 ? board[r - 1][c] : null;
        if (!top || top.id !== cell.id) {
          ctx.globalAlpha = EDGE_A * rf;
          ctx.fillRect(px, py, SZ, 1);
        }
        var bot = r < ROWS - 1 ? board[r + 1][c] : null;
        if (!bot || bot.id !== cell.id) {
          ctx.globalAlpha = EDGE_A * rf;
          ctx.fillRect(px, py + SZ - 1, SZ, 1);
        }
        var lft = c > 0 ? board[r][c - 1] : null;
        if (!lft || lft.id !== cell.id) {
          ctx.globalAlpha = EDGE_A * rf;
          ctx.fillRect(px, py, 1, SZ);
        }
        var rgt = c < COLS - 1 ? board[r][c + 1] : null;
        if (!rgt || rgt.id !== cell.id) {
          ctx.globalAlpha = EDGE_A * rf;
          ctx.fillRect(px + SZ - 1, py, 1, SZ);
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  // Run draw loop — only repaints when scroll actually changes
  function loop() {
    var sy = window.scrollY;
    if (sy !== lastScrollY) {
      draw();
      lastScrollY = sy;
    }
    requestAnimationFrame(loop);
  }


  /* ── Resize ── */

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    COLS = Math.ceil(W / SZ) + 2;
    makeBoard();
    draw();
  }

  window.addEventListener('resize', init, { passive: true });


  /* ─── Scroll Reveal for content elements ─── */

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
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    els.forEach(function (el) {
      el.classList.add('sr');
      io.observe(el);
    });
  }


  /* ─── Boot ─── */

  function boot() {
    init();
    loop();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
