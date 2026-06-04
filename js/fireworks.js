/* ═══════════════════════════════════════════════════════════
   FIREWORKS ENGINE
   Public API: FireworksStart(durationMs) / FireworksStop()
   Called from effect.js during the #wish_message step.
   Canvas sits fixed over the whole viewport (pointer-events:none)
   so nothing underneath is blocked.
═══════════════════════════════════════════════════════════ */
(function () {

  /* ── Brand colour palette ───────────────────────────── */
  var COLORS = [
    '#E8617A', // coral   (primary)
    '#F4A0B0', // light pink
    '#ff6b9d', // hot pink
    '#ffdd00', // gold
    '#ff9f43', // orange
    '#ffffff', // white
    '#ff4757', // vivid red
    '#a29bfe', // soft lavender
  ];

  /* ── State ──────────────────────────────────────────── */
  var canvas, ctx;
  var rockets   = [];
  var particles = [];
  var running   = false;
  var launchTimer, animId;

  /* ── Canvas setup ───────────────────────────────────── */
  function init() {
    canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* ── Rocket ─────────────────────────────────────────── */
  function launchRocket() {
    var sw = window.innerWidth;
    var sh = window.innerHeight;

    /* explode target: upper 15–50% of screen, full width spread */
    var targetX = sw * (0.05 + Math.random() * 0.90);
    var targetY = sh * (0.10 + Math.random() * 0.40);

    /* launch from random point near the bottom */
    var startX  = sw * (0.15 + Math.random() * 0.70);
    var angle   = Math.atan2(targetY - sh, targetX - startX);
    var speed   = sh * 0.013 + Math.random() * sh * 0.005;

    rockets.push({
      x: startX, y: sh + 6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetY: targetY,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      trail: []
    });
  }

  /* ── Explosion ──────────────────────────────────────── */
  function explode(x, y, color) {
    var count = 60 + Math.floor(Math.random() * 40);   // 60–100 particles

    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.5;
      var speed = 1.2 + Math.random() * 4.0;

      /* 30 % chance to mix in a second brand colour per burst */
      var c = (Math.random() > 0.70)
        ? COLORS[Math.floor(Math.random() * COLORS.length)]
        : color;

      particles.push({
        x: x, y: y,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        gravity: 0.045 + Math.random() * 0.035,
        drag:    0.975 + Math.random() * 0.015,
        life:    1,
        decay:   0.009 + Math.random() * 0.013,
        color:   c,
        size:    1.4 + Math.random() * 2.8,
        twinkle: Math.random() > 0.5         /* some particles blink */
      });
    }

    /* add a few large "glitter" sparks */
    for (var g = 0; g < 6; g++) {
      var ga = Math.random() * Math.PI * 2;
      var gs = 2 + Math.random() * 3;
      particles.push({
        x: x, y: y,
        vx: Math.cos(ga) * gs,
        vy: Math.sin(ga) * gs,
        gravity: 0.06,
        drag:    0.96,
        life:    1,
        decay:   0.006,
        color:   '#ffffff',
        size:    3.5 + Math.random() * 2,
        twinkle: true
      });
    }
  }

  /* ── Draw loop ──────────────────────────────────────── */
  function loop() {
    /* stop when nothing left to draw */
    if (!running && rockets.length === 0 && particles.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      return;
    }

    animId = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* ── rockets ── */
    for (var ri = rockets.length - 1; ri >= 0; ri--) {
      var r = rockets[ri];

      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 12) r.trail.shift();

      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.10;            /* gravity */

      /* draw glowing trail */
      for (var ti = 0; ti < r.trail.length; ti++) {
        var ta = (ti + 1) / r.trail.length;
        ctx.beginPath();
        ctx.arc(r.trail[ti].x, r.trail[ti].y, 2.2 * ta, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.globalAlpha = ta * 0.85;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* explode at apex */
      if (r.y <= r.targetY || r.vy >= -0.5) {
        explode(r.x, r.y, r.color);
        rockets.splice(ri, 1);
      }
    }

    /* ── particles ── */
    var now = Date.now();
    for (var pi = particles.length - 1; pi >= 0; pi--) {
      var p = particles[pi];

      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += p.gravity;
      p.vx  *= p.drag;
      p.life -= p.decay;

      if (p.life <= 0) { particles.splice(pi, 1); continue; }

      /* twinkle: briefly hide every ~200ms */
      if (p.twinkle && Math.floor(now / 120) % 2 === 0 && p.life < 0.6) continue;

      var radius = p.size * p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.4, radius), 0, Math.PI * 2);
      ctx.fillStyle  = p.color;
      ctx.globalAlpha = p.life * p.life;   /* quadratic → snappy spark feel */
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ── Public API ─────────────────────────────────────── */
  window.FireworksStart = function (durationMs) {
    if (!canvas) init();
    if (!canvas) return;

    running   = true;
    rockets   = [];
    particles = [];
    canvas.style.display = 'block';

    /* first rocket immediately, then every 520ms */
    launchRocket();
    if (Math.random() > 0.4) launchRocket();

    launchTimer = setInterval(function () {
      if (!running) return;
      launchRocket();
      if (Math.random() > 0.45) launchRocket();  /* occasional double burst */
    }, 520);

    if (durationMs) {
      setTimeout(function () { window.FireworksStop(); }, durationMs);
    }

    loop();
  };

  window.FireworksStop = function () {
    running = false;
    clearInterval(launchTimer);
    /* loop() drains remaining particles naturally, then hides canvas */
  };

  /* auto-init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
