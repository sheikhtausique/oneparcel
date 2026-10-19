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

// Hero: the highlighted word and the page accent move through each courier
(function cycleHero() {
  const word = document.getElementById('heroAccent');
  const keys = Object.keys(couriers);
  const root = document.documentElement;
  let i = 0;

  function apply(cfg) {
    root.style.setProperty('--accent-color', cfg.hex);
    root.style.setProperty('--glow-color',   cfg.glow);
    root.style.setProperty('--tag-bg',       cfg.tagBg);
    root.style.setProperty('--tag-border',   cfg.tagBorder);
    root.style.setProperty('--tag-color',    cfg.tagColor);
    word.textContent = cfg.name;
    fit();
  }

  // The headline font is wider than the fallback, so measure and shrink if needed
  function fit() {
    word.style.fontSize = '';
    const hero = word.closest('.hero');
    const cs = getComputedStyle(hero);
    const avail = hero.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const w = word.getBoundingClientRect().width;
    if (w > avail) word.style.fontSize = (parseFloat(getComputedStyle(word).fontSize) * avail / w * 0.97) + 'px';
  }
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    word.textContent = t('courierWord');
    onLangChange(() => { word.textContent = t('courierWord'); fit(); });
    return;
  }
  apply(couriers[keys[0]]);
  setInterval(() => {
    if (document.hidden) return;
    word.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % keys.length;
      apply(couriers[keys[i]]);
      word.classList.remove('swap');
    }, 180);
  }, 2400);
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
