(function () {
  'use strict';

  /* ─── Tetris Parallax Background ─── */

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

  var SZ       = 24;   // block size in px
  var FILL_A   = 0.13; // fill opacity
  var EDGE_A   = 0.35; // piece-edge highlight opacity
  var PARALLAX = 0.35; // how fast the board scrolls vs the page
  var ROWS     = 320;  // board height in blocks (tall enough to loop)

  var W, H, COLS, board, raf = null;


  /* ── Board generation ── */

  function makeBoard() {
    var rows = ROWS, cols = COLS;
    board = [];
    for (var r = 0; r < rows; r++) {
      board.push(new Array(cols).fill(null));
    }

    var id = 0;
    var tries = rows * cols * 3;

    for (var t = 0; t < tries; t++) {
      var s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      var or = Math.floor(Math.random() * rows);
      var oc = Math.floor(Math.random() * cols);

      // Validate — no overlap, no out-of-bounds
      var ok = true;
      for (var dr = 0; dr < s.cells.length && ok; dr++) {
        for (var dc = 0; dc < s.cells[dr].length && ok; dc++) {
          if (!s.cells[dr][dc]) continue;
          var nr = or + dr, nc = oc + dc;
          if (nr >= rows || nc >= cols || board[nr][nc]) ok = false;
        }
      }

      if (ok) {
        id++;
        for (var dr = 0; dr < s.cells.length; dr++) {
          for (var dc = 0; dc < s.cells[dr].length; dc++) {
            if (s.cells[dr][dc]) {
              board[or + dr][oc + dc] = { color: s.color, id: id };
            }
          }
        }
      }
    }
  }


  /* ── Drawing ── */

  function drawBoardAt(offsetY) {
    var rows = ROWS;
    for (var r = 0; r < rows; r++) {
      var py = r * SZ + offsetY;
      if (py > H + SZ || py + SZ < -SZ) continue; // skip off-screen rows

      for (var c = 0; c < COLS; c++) {
        var cell = board[r][c];
        if (!cell) continue;

        var px = c * SZ;

        // Block fill
        ctx.globalAlpha = FILL_A;
        ctx.fillStyle = cell.color;
        ctx.fillRect(px, py, SZ, SZ);

        // Draw bright 1px edge lines only on piece boundaries
        ctx.globalAlpha = EDGE_A;
        ctx.fillStyle = cell.color;

        var top = r > 0 ? board[r - 1][c] : null;
        if (!top || top.id !== cell.id)
          ctx.fillRect(px, py, SZ, 1);

        var bot = r < rows - 1 ? board[r + 1][c] : null;
        if (!bot || bot.id !== cell.id)
          ctx.fillRect(px, py + SZ - 1, SZ, 1);

        var lft = c > 0 ? board[r][c - 1] : null;
        if (!lft || lft.id !== cell.id)
          ctx.fillRect(px, py, 1, SZ);

        var rgt = c < COLS - 1 ? board[r][c + 1] : null;
        if (!rgt || rgt.id !== cell.id)
          ctx.fillRect(px + SZ - 1, py, 1, SZ);
      }
    }
  }

  function draw() {
    raf = null;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1;

    var BOARD_H = ROWS * SZ;
    // Compute parallax offset and wrap it to create a seamless loop
    var raw = -(window.scrollY * PARALLAX);
    var off = ((raw % BOARD_H) + BOARD_H) % BOARD_H;

    // Draw twice so the seam never shows
    drawBoardAt(off - BOARD_H);
    drawBoardAt(off);
  }

  function scheduleDraw() {
    if (!raf) raf = requestAnimationFrame(draw);
  }


  /* ── Resize ── */

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    COLS = Math.ceil(W / SZ) + 2;
    makeBoard();
    scheduleDraw();
  }

  window.addEventListener('scroll', scheduleDraw, { passive: true });
  window.addEventListener('resize', init,          { passive: true });


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
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    els.forEach(function (el) {
      el.classList.add('sr');
      io.observe(el);
    });
  }


  /* ─── Boot ─── */

  function boot() {
    init();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
