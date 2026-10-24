// Courier list, built from couriers.js so new couriers show up automatically
(function buildLedger() {
  const wrap = document.getElementById('ledger');
  const chevron = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5,3 9,7 5,11"/></svg>';
  wrap.innerHTML = Object.entries(couriers).map(([key, c]) => {
    let site = '';
    try { site = new URL(c.url('x')).hostname.replace(/^www\./, ''); } catch {}
    return `<a class="ledger-row" href="track.html?courier=${key}" style="--c:${c.hex};">
      <span class="ledger-dot"></span>
      <span class="ledger-name">${c.name}</span>
      <span class="ledger-site">${site}</span>
      ${chevron}
    </a>`;
  }).join('');
})();

// Hero: the highlighted word and the accent colour move through each courier.
// Set CYCLE to false to keep the headline still.
(function cycleHero() {
  const CYCLE = true;
  const HOLD = 5000;   // ms each courier stays (raise it to slow the changes down)
  const word = document.getElementById('heroAccent');
  const glows = [...document.querySelectorAll('.glow-layer')];
  // Ordered by colour (blue, purple, red, orange, yellow, tan, green), so each change is a small step
  const ORDER = ['bluedart', 'fedex', 'valmo', 'delhivery', 'aramex', 'xpressbees', 'amazon', 'dhl', 'ups', 'ekart'];
  const keys = ORDER.filter(k => couriers[k]).concat(Object.keys(couriers).filter(k => !ORDER.includes(k)));
  const root = document.documentElement;
  let i = 0;
  let currentHex = null;
  let activeGlow = 0;

  // dark text on light colours (DHL yellow, Amazon orange), white text on the rest
  function textOn(hex) {
    const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) > 0.3 ? '#111' : '#fff';
  }

  function setColours(cfg, first) {
    root.style.setProperty('--accent-color', cfg.hex);
    root.style.setProperty('--on-accent',    textOn(cfg.hex));
    root.style.setProperty('--tag-bg',       cfg.tagBg);
    root.style.setProperty('--tag-border',   cfg.tagBorder);
    root.style.setProperty('--tag-color',    cfg.tagColor);
    if (first) {
      glows[0].style.setProperty('--c', cfg.glow);
    } else {
      // fade the other layer in (already in the new colour) while the current one fades out
      const next = glows[1 - activeGlow];
      next.style.setProperty('--c', cfg.glow);
      next.classList.add('on');
      glows[activeGlow].classList.remove('on');
      activeGlow = 1 - activeGlow;
    }
  }

  // The headline font is wider than the fallback, so measure each name and shrink it if needed
  function fitWord(el) {
    el.style.fontSize = '';
    const hero = word.closest('.hero');
    const cs = getComputedStyle(hero);
    const avail = hero.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const w = el.getBoundingClientRect().width;
    if (w > avail) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * avail / w * 0.97) + 'px';
  }
  function fitAll() { word.querySelectorAll('.word').forEach(fitWord); }
  window.addEventListener('resize', fitAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  function makeWord(text) {
    const el = document.createElement('span');
    el.className = 'word';
    el.textContent = text;
    return el;
  }

  function show(cfg, animate) {
    const next = makeWord(cfg.name);
    const prev = word.querySelector('.word:not(.leave)');
    setColours(cfg, !animate);

    if (!animate || !prev) {
      word.replaceChildren(next);
      fitWord(next);
      currentHex = cfg.hex;
      return;
    }

    next.classList.add('enter');
    word.appendChild(next);
    fitWord(next);
    prev.style.color = currentHex;   // the leaving name keeps its own colour
    currentHex = cfg.hex;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      prev.classList.add('leave');
      next.classList.remove('enter');
    }));
    setTimeout(() => prev.remove(), 1100);
  }

  if (!CYCLE || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const still = () => { word.replaceChildren(makeWord(t('courierWord'))); fitAll(); };
    still();
    onLangChange(still);
    return;
  }

  show(couriers[keys[0]], false);
  setInterval(() => {
    if (document.hidden) return;
    i = (i + 1) % keys.length;
    show(couriers[keys[i]], true);
  }, HOLD);
})();

// Reveal feature cards on scroll
(function reveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.feat-card').forEach(el => observer.observe(el));
})();

// Header: identical on every screen. If the row is wider than the screen,
// scale the whole row down together instead of dropping anything.
(function fitHeader() {
  const nav   = document.querySelector('nav');
  const logo  = nav.querySelector('.nav-logo');
  const right = nav.querySelector('.nav-right');

  function fit() {
    logo.style.zoom = right.style.zoom = '';
    const cs    = getComputedStyle(nav);
    const avail = nav.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 8;
    const need  = logo.offsetWidth + right.offsetWidth;
    if (need > avail) logo.style.zoom = right.style.zoom = Math.max(0.6, avail / need);
  }

  fit();
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();

// Features heading: keep each sentence on one line, whatever font the device uses
(function fitFeaturesTitle() {
  const h2 = document.querySelector('.features-title');
  if (!h2) return;
  const lines = [...h2.querySelectorAll('.h2-line')];

  function fit() {
    h2.style.fontSize = '';
    const avail = h2.clientWidth;
    const widest = Math.max(...lines.map(l => l.getBoundingClientRect().width));
    if (widest > avail) h2.style.fontSize = (parseFloat(getComputedStyle(h2).fontSize) * avail / widest * 0.98) + 'px';
  }

  fit();
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
