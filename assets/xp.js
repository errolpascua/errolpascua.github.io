(function () {
  'use strict';

  var winSeq    = 0;
  var winZ      = 100;
  var cascadeN  = 0;
  var prevSize  = {};
  var dragEl    = null, dragOX = 0, dragOY = 0;

  /* ── IE icon (real XP icon, transparent background) ── */
  var IE_ICON_URL = 'https://www.freeiconspng.com/uploads/internet-explorer-icon-13.png';

  function ieIcon(size) {
    return '<img src="' + IE_ICON_URL + '" width="' + size + '" height="' + size + '" style="flex-shrink:0;image-rendering:auto" alt="IE">';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isMobile() {
    return window.innerWidth < 768;
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
    var id = 'w' + winSeq;
    var z  = ++winZ;
    var vw = window.innerWidth;
    var vh = window.innerHeight - 30; // taskbar height

    var W, H, lft, top;

    if (isMobile()) {
      // Full-screen on mobile — no cascade, no chrome padding
      W   = vw;
      H   = vh;
      lft = 0;
      top = 0;
    } else {
      W   = Math.min(880, vw - 40);
      H   = Math.min(570, vh - 40);
      lft = Math.max(0, (vw - W) / 2 + cascadeN * 28);
      top = Math.max(0, (vh - H) / 2 + cascadeN * 28);
      cascadeN = (cascadeN + 1) % 6;
    }

    var el = document.createElement('div');
    el.className = 'xp-window active';
    el.id = id;
    el.dataset.url = url;
    el.style.cssText = 'left:' + lft + 'px;top:' + top + 'px;width:' + W + 'px;height:' + H + 'px;z-index:' + z;

    var shortTitle = esc(title) + ' \u2013 Microsoft Internet Explorer';
    var addrVal    = 'https://errolpascua.github.io' + url;

    // On mobile hide the menubar + toolbar to maximise content space
    var extraChrome = isMobile() ? '' :
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
      '</div>';

    el.innerHTML =
      '<div class="win-titlebar">' +
        '<div class="win-title-wrap">' +
          ieIcon(16) +
          '<span class="win-title-text">' + shortTitle + '</span>' +
        '</div>' +
        '<div class="win-btn-group">' +
          (isMobile() ? '' : '<button class="win-btn btn-min"  title="Minimize">&#x2014;</button>') +
          (isMobile() ? '' : '<button class="win-btn btn-max"  title="Restore/Maximize">&#x25A1;</button>') +
          '<button class="win-btn btn-close" title="Close">&#x2715;</button>' +
        '</div>' +
      '</div>' +
      extraChrome +
      '<iframe class="win-frame" src="' + esc(url) + '" frameborder="0"></iframe>' +
      (isMobile() ? '' :
        '<div class="win-statusbar">' +
          '<span class="status-msg">Done</span>' +
          '<span class="status-zone">&#127760; Internet</span>' +
        '</div>');

    document.getElementById('windows').appendChild(el);

    // Title bar — mouse drag (desktop)
    el.querySelector('.win-titlebar').addEventListener('mousedown', function (e) {
      if (e.target.closest('.win-btn-group')) return;
      startDrag(e, el);
    });

    // Title bar — touch drag (single finger only, so two-finger pinch isn't hijacked)
    el.querySelector('.win-titlebar').addEventListener('touchstart', function (e) {
      if (e.target.closest('.win-btn-group')) return;
      if (e.touches.length !== 1) return;  // ignore multi-touch
      startDragTouch(e, el);
    }, { passive: false });

    // Focus on click/touch anywhere in window
    el.addEventListener('mousedown',  function () { bringToFront(el); });
    el.addEventListener('touchstart', function () { bringToFront(el); }, { passive: true });

    // Long-press on titlebar → show close overlay (mobile)
    if (isMobile()) {
      attachLongPress(el);
    }

    // Buttons
    el.querySelector('.btn-close').addEventListener('click', function () { closeWindow(el); });
    if (!isMobile()) {
      el.querySelector('.btn-min').addEventListener('click', function () { minimizeWindow(el); });
      el.querySelector('.btn-max').addEventListener('click', function () { toggleMaximize(el); });
      el.querySelector('.tb-refresh').addEventListener('click', function () {
        el.querySelector('.win-frame').src = url;
      });
    }

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
      el.style.height = 'calc(100vh - 30px)';
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

  /* ── Long-press to close (mobile) ── */

  function attachLongPress(el) {
    var timer = null;

    function cancel() {
      clearTimeout(timer);
      timer = null;
    }

    el.querySelector('.win-titlebar').addEventListener('touchstart', function (e) {
      if (e.target.closest('.win-btn-group')) return;
      cancel();
      timer = setTimeout(function () {
        showCloseOverlay(el);
      }, 700);
    }, { passive: true });

    el.querySelector('.win-titlebar').addEventListener('touchend',  cancel, { passive: true });
    el.querySelector('.win-titlebar').addEventListener('touchmove', cancel, { passive: true });
  }

  function showCloseOverlay(el) {
    // Don't stack overlays
    if (el.querySelector('.close-overlay')) return;

    var overlay = document.createElement('div');
    overlay.className = 'close-overlay';
    overlay.innerHTML =
      '<div class="close-overlay-box">' +
        '<p>Close this window?</p>' +
        '<button class="close-overlay-yes">&#x2715; Close</button>' +
        '<button class="close-overlay-no">Cancel</button>' +
      '</div>';

    overlay.querySelector('.close-overlay-yes').addEventListener('click', function () {
      closeWindow(el);
    });
    overlay.querySelector('.close-overlay-no').addEventListener('click', function () {
      overlay.remove();
    });

    el.appendChild(overlay);
  }

  /* ── Dragging — mouse ── */

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
    var y = Math.max(0, Math.min(window.innerHeight - 30 - 30, e.clientY - dragOY));
    dragEl.style.left = x + 'px';
    dragEl.style.top  = y + 'px';
  });

  document.addEventListener('mouseup', function () { dragEl = null; });

  /* ── Dragging — touch ── */

  function startDragTouch(e, el) {
    if (el.classList.contains('maximized')) return;
    var t = e.touches[0];
    dragEl = el;
    dragOX = t.clientX - el.offsetLeft;
    dragOY = t.clientY - el.offsetTop;
    e.preventDefault();
  }

  document.addEventListener('touchmove', function (e) {
    if (!dragEl) return;
    if (e.touches.length !== 1) { dragEl = null; return; }  // release drag on pinch
    var t = e.touches[0];
    var x = t.clientX - dragOX;
    var y = Math.max(0, Math.min(window.innerHeight - 30 - 30, t.clientY - dragOY));
    dragEl.style.left = x + 'px';
    dragEl.style.top  = y + 'px';
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', function () { dragEl = null; });

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
    if (isMobile()) {
      // Single tap on mobile
      icon.addEventListener('click', function () {
        openWindow(icon.dataset.url, icon.dataset.title);
      });
    } else {
      // Double-click on desktop
      var clicks = 0, timer = null;
      icon.addEventListener('click', function () {
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
    }
  });

  // Close start menu when clicking elsewhere
  document.addEventListener('click', function (e) {
    if (startOpen && !e.target.closest('#start-menu') && !e.target.closest('#start-btn')) {
      closeStartMenu();
    }
    if (e.target.id === 'desktop') {
      document.querySelectorAll('.d-icon').forEach(function (i) { i.classList.remove('selected'); });
    }
  });

  updateClock();
  setInterval(updateClock, 15000);

  window.openWindow = openWindow;

})();
