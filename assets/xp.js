(function () {
  'use strict';

  var winSeq    = 0;
  var winZ      = 100;
  var cascadeN  = 0;
  var prevSize  = {};
  var dragEl    = null, dragOX = 0, dragOY = 0;

  /* ── IE icon SVG ── */
  function ieIcon(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16" style="flex-shrink:0">' +
      '<circle cx="8" cy="8" r="7" fill="#1565C0"/>' +
      '<text x="8" y="11.5" text-anchor="middle" font-family="Times New Roman,serif" ' +
        'font-style="italic" font-weight="bold" font-size="9" fill="white">e</text>' +
      '<ellipse cx="8" cy="8" rx="7" ry="2.5" fill="none" stroke="#FFD600" stroke-width="1" ' +
        'transform="rotate(-35 8 8)"/>' +
      '</svg>';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Window management ── */

  function openWindow(url, title) {
    // Reuse existing window for same URL
    var existing = document.querySelector('.xp-window[data-url="' + url + '"]');
    if (existing) {
      existing.classList.remove('minimized');
      bringToFront(existing);
      var tbBtn = document.getElementById('tb-' + existing.id);
      if (tbBtn) tbBtn.classList.remove('minimized-btn');
      return;
    }

    winSeq++;
    var id  = 'w' + winSeq;
    var z   = ++winZ;
    var W   = 880, H = 570;
    var vw  = window.innerWidth;
    var vh  = window.innerHeight - 42;
    var lft = Math.max(0, (vw - W) / 2 + cascadeN * 28);
    var top = Math.max(0, (vh - H) / 2 + cascadeN * 28);
    cascadeN = (cascadeN + 1) % 6;

    var el = document.createElement('div');
    el.className = 'xp-window active';
    el.id = id;
    el.dataset.url = url;
    el.style.cssText = 'left:' + lft + 'px;top:' + top + 'px;width:' + W + 'px;height:' + H + 'px;z-index:' + z;

    var shortTitle = esc(title) + ' \u2013 Microsoft Internet Explorer';
    var addrVal    = 'https://errolpascua.github.io' + url;

    el.innerHTML =
      '<div class="win-titlebar">' +
        '<div class="win-title-wrap">' +
          ieIcon(16) +
          '<span class="win-title-text">' + shortTitle + '</span>' +
        '</div>' +
        '<div class="win-btn-group">' +
          '<button class="win-btn btn-min"  title="Minimize">&#x2014;</button>' +
          '<button class="win-btn btn-max"  title="Restore/Maximize">&#x25A1;</button>' +
          '<button class="win-btn btn-close" title="Close">&#x2715;</button>' +
        '</div>' +
      '</div>' +
      '<div class="win-menubar">' +
        '<span>File</span><span>Edit</span><span>View</span>' +
        '<span>Favorites</span><span>Tools</span><span>Help</span>' +
      '</div>' +
      '<div class="win-toolbar">' +
        '<button class="tb-btn tb-back"    title="Back">&#9664; Back</button>' +
        '<button class="tb-btn tb-fwd"     title="Forward" disabled>Forward &#9654;</button>' +
        '<span  class="tb-sep"></span>' +
        '<button class="tb-btn tb-stop"    title="Stop">&#x29D7;</button>' +
        '<button class="tb-btn tb-refresh" title="Refresh">&#x21BB;</button>' +
        '<button class="tb-btn tb-home"    title="Home">&#x2302;</button>' +
        '<div class="tb-addr-bar">' +
          '<span class="tb-addr-label">Address</span>' +
          '<input class="tb-addr-input" value="' + esc(addrVal) + '" readonly>' +
          '<button class="tb-go">Go</button>' +
        '</div>' +
      '</div>' +
      '<iframe class="win-frame" src="' + esc(url) + '" frameborder="0"></iframe>' +
      '<div class="win-statusbar">' +
        '<span class="status-msg">Done</span>' +
        '<span class="status-zone">&#127760; Internet</span>' +
      '</div>';

    document.getElementById('windows').appendChild(el);

    // Title bar drag
    el.querySelector('.win-titlebar').addEventListener('mousedown', function (e) {
      if (e.target.closest('.win-btn-group')) return;
      startDrag(e, el);
    });

    // Focus on click anywhere in window
    el.addEventListener('mousedown', function () { bringToFront(el); });

    // Buttons
    el.querySelector('.btn-close').addEventListener('click',   function () { closeWindow(el); });
    el.querySelector('.btn-min')  .addEventListener('click',   function () { minimizeWindow(el); });
    el.querySelector('.btn-max')  .addEventListener('click',   function () { toggleMaximize(el); });
    el.querySelector('.tb-refresh').addEventListener('click',  function () {
      el.querySelector('.win-frame').src = url;
    });

    addTaskbarBtn(id, title, url);
    bringToFront(el);
  }

  function closeWindow(el) {
    var btn = document.getElementById('tb-' + el.id);
    if (btn) btn.remove();
    el.remove();
  }

  function minimizeWindow(el) {
    el.classList.add('minimized');
    var btn = document.getElementById('tb-' + el.id);
    if (btn) btn.classList.add('minimized-btn');
  }

  function toggleMaximize(el) {
    if (el.classList.contains('maximized')) {
      var p = prevSize[el.id];
      if (p) {
        el.style.left   = p.l;
        el.style.top    = p.t;
        el.style.width  = p.w;
        el.style.height = p.h;
      }
      el.classList.remove('maximized');
    } else {
      prevSize[el.id] = { l: el.style.left, t: el.style.top, w: el.style.width, h: el.style.height };
      el.style.left   = '0';
      el.style.top    = '0';
      el.style.width  = '100vw';
      el.style.height = 'calc(100vh - 42px)';
      el.classList.add('maximized');
    }
  }

  function bringToFront(el) {
    el.style.zIndex = ++winZ;
    document.querySelectorAll('.xp-window').forEach(function (w) { w.classList.remove('active'); });
    el.classList.add('active');
    document.querySelectorAll('.taskbar-btn').forEach(function (b) { b.classList.remove('active'); });
    var btn = document.getElementById('tb-' + el.id);
    if (btn) btn.classList.add('active');
  }

  /* ── Dragging ── */

  function startDrag(e, el) {
    if (el.classList.contains('maximized')) return;
    dragEl = el;
    dragOX = e.clientX - el.offsetLeft;
    dragOY = e.clientY - el.offsetTop;
    e.preventDefault();
  }

  document.addEventListener('mousemove', function (e) {
    if (!dragEl) return;
    var x = e.clientX - dragOX;
    var y = Math.max(0, Math.min(window.innerHeight - 42 - 30, e.clientY - dragOY));
    dragEl.style.left = x + 'px';
    dragEl.style.top  = y + 'px';
  });

  document.addEventListener('mouseup', function () { dragEl = null; });

  /* ── Taskbar buttons ── */

  function addTaskbarBtn(id, title) {
    var btn = document.createElement('button');
    btn.className = 'taskbar-btn active';
    btn.id = 'tb-' + id;
    var label = title.length > 22 ? title.slice(0, 20) + '\u2026' : title;
    btn.innerHTML = ieIcon(14) + '<span>' + esc(label) + '</span>';

    btn.addEventListener('click', function () {
      var win = document.getElementById(id);
      if (!win) return;
      if (win.classList.contains('minimized')) {
        win.classList.remove('minimized');
        btn.classList.remove('minimized-btn');
        bringToFront(win);
      } else if (win.classList.contains('active')) {
        minimizeWindow(win);
      } else {
        bringToFront(win);
      }
    });

    document.getElementById('tray-windows').appendChild(btn);
  }

  /* ── Start menu ── */

  var startOpen = false;

  function toggleStartMenu(e) {
    if (e) e.stopPropagation();
    startOpen = !startOpen;
    document.getElementById('start-menu').classList.toggle('hidden', !startOpen);
    document.getElementById('start-btn').classList.toggle('pressed', startOpen);
  }

  function closeStartMenu() {
    startOpen = false;
    document.getElementById('start-menu').classList.add('hidden');
    document.getElementById('start-btn').classList.remove('pressed');
  }

  /* ── Clock ── */

  function updateClock() {
    var n = new Date();
    var h = n.getHours().toString().padStart(2, '0');
    var m = n.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = h + ':' + m;
  }

  /* ── Init ── */

  document.getElementById('start-btn').addEventListener('click', toggleStartMenu);

  document.querySelectorAll('.sm-clickable').forEach(function (item) {
    item.addEventListener('click', function () {
      closeStartMenu();
      openWindow(item.dataset.url, item.dataset.title);
    });
  });

  document.querySelectorAll('.d-icon').forEach(function (icon) {
    var clicks = 0, timer = null;
    icon.addEventListener('click', function () {
      // Select on single click
      document.querySelectorAll('.d-icon').forEach(function (i) { i.classList.remove('selected'); });
      icon.classList.add('selected');
      clicks++;
      if (clicks === 1) {
        timer = setTimeout(function () { clicks = 0; }, 400);
      } else {
        clearTimeout(timer);
        clicks = 0;
        openWindow(icon.dataset.url, icon.dataset.title);
      }
    });
  });

  // Close start menu when clicking elsewhere
  document.addEventListener('click', function (e) {
    if (startOpen && !e.target.closest('#start-menu') && !e.target.closest('#start-btn')) {
      closeStartMenu();
    }
    // Deselect desktop icons when clicking desktop background
    if (e.target.id === 'desktop') {
      document.querySelectorAll('.d-icon').forEach(function (i) { i.classList.remove('selected'); });
    }
  });

  updateClock();
  setInterval(updateClock, 15000);

  // Expose for any other callers
  window.openWindow = openWindow;

})();
