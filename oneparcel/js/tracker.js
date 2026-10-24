let activeCourier = 'bluedart';
let hasCourier = false;   // false until the visitor picks a courier

const input    = document.getElementById('awb');
const err      = document.getElementById('err');
const clearBtn = document.getElementById('clearBtn');
const pasteBtn = document.getElementById('pasteBtn');

// ── INPUT EVENTS ──
input.addEventListener('input', () => {
  err.textContent = '';
  clearBtn.style.display = input.value ? 'flex' : 'none';
  pasteBtn.style.display  = input.value ? 'none' : 'flex';
});

input.addEventListener('keydown', e => { if (e.key === 'Enter') track(); });

// ── PASTE FROM CLIPBOARD ──
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    if (text.trim()) {
      input.value = text.trim();
      clearBtn.style.display = 'flex';
      pasteBtn.style.display = 'none';
      err.textContent = '';
      input.focus();
    }
  } catch { input.focus(); }
}

// ── CLEAR INPUT ──
function clearInput() {
  input.value = '';
  clearBtn.style.display = 'none';
  pasteBtn.style.display = 'flex';
  input.focus();
  err.textContent = '';
}

// ── BACKGROUND GLOW: the old and new colour cross-fade (two layers, opacity only) ──
const glowLayers = [...document.querySelectorAll('.glow-layer')];
let glowActive = 0;
let glowColour = null;
function setGlow(color) {
  if (!glowLayers.length || color === glowColour) return;
  if (glowColour === null) {
    glowLayers[glowActive].style.setProperty('--c', color);   // first colour: no fade
  } else {
    const next = glowLayers[1 - glowActive];
    next.style.setProperty('--c', color);
    next.classList.add('on');
    glowLayers[glowActive].classList.remove('on');
    glowActive = 1 - glowActive;
  }
  glowColour = color;
}

// ── SELECT COURIER ──
function selectCourier(c, preserveInput = false) {
  activeCourier = c;
  hasCourier = true;
  const cfg = couriers[c];
  const root = document.documentElement;

  root.style.setProperty('--accent-color',       cfg.hex);
  setGlow(cfg.glow);
  root.style.setProperty('--tag-bg',             cfg.tagBg);
  root.style.setProperty('--tag-border',         cfg.tagBorder);
  root.style.setProperty('--tag-color',          cfg.tagColor);
  root.style.setProperty('--btn-active-border',  cfg.btnActiveBorder);
  root.style.setProperty('--btn-active-bg',      cfg.btnActiveBg);
  root.style.setProperty('--input-focus-border', cfg.inputFocusBorder);
  root.style.setProperty('--input-focus-shadow', cfg.inputFocusShadow);
  root.style.setProperty('--card-border-color',  cfg.cardBorder);

  document.getElementById('tagText').textContent   = cfg.name;
  document.getElementById('heroAccent').textContent = cfg.name;
  document.getElementById('heroSub').textContent   = t(cfg.i18n.sub, { name: cfg.name });
  document.getElementById('chipLabel').textContent  = cfg.name;
  document.getElementById('inputLabel').textContent = t(cfg.i18n.label);
  document.getElementById('btnLabel').textContent   = t(cfg.i18n.btn, { name: cfg.name });

  const inp = document.getElementById('awb');
  inp.placeholder = t('eg', { x: cfg.placeholder.replace(/^e\.g\.\s*/, '') });
  if (!preserveInput) {
    inp.value = '';
    clearBtn.style.display = 'none';
    pasteBtn.style.display = 'flex';
  }

  document.querySelectorAll('.courier-btn').forEach(btn => btn.classList.remove('active-courier'));
  document.getElementById('btn-' + c).classList.add('active-courier');

  // Restore card if it was in empty state
  document.getElementById('trackerCard').classList.remove('idle');

  // courier-specific notices (shown only for that courier)
  const notices = { xpressbees: 'captchaWarning', bluedart: 'bluedartWarning' };
  Object.entries(notices).forEach(([key, id]) => {
    document.getElementById(id).style.display = (c === key) ? 'flex' : 'none';
  });

  err.textContent = '';
  fitHero();
}

function selectCourierAnimated(c, preserveInput = false) {
  const card = document.getElementById('trackerCard');
  card.style.opacity   = '0.5';
  card.style.transform = 'scale(0.98)';
  setTimeout(() => {
    selectCourier(c, preserveInput);
    card.style.opacity   = '1';
    card.style.transform = 'scale(1)';
  }, 150);
}

// ── BULK TRACKING ──
let isBulkMode = false;

function toggleBulk() {
  isBulkMode = !isBulkMode;
  document.getElementById('bulkSection').classList.toggle('visible', isBulkMode);
  document.getElementById('singleInputWrap').style.display = isBulkMode ? 'none' : 'block';
  document.getElementById('trackBtn').style.display        = isBulkMode ? 'none' : 'flex';
  document.getElementById('bulkToggle').style.color        = isBulkMode ? 'var(--accent-color)' : '';
}

function trackBulk() {
  const lines = document.getElementById('bulkInput').value
    .split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return;
  lines.forEach(awb => {
    saveRecent(activeCourier, awb);
    window.open(couriers[activeCourier].url(awb), '_blank');
  });
  document.getElementById('bulkInput').value = '';
}

// ── SHARE ──
function shareTracking() {
  const val = input.value.trim();
  if (!val) { err.textContent = t('errShare'); return; }
  const url = couriers[activeCourier].url(val);
  try {
    navigator.clipboard.writeText(url);
    const copied = document.getElementById('shareCopied');
    copied.style.display = 'inline';
    setTimeout(() => { copied.style.display = 'none'; }, 2500);
  } catch { window.open(url, '_blank'); }
}

// ── TRACK ──
function track() {
  const val = input.value.trim();
  if (!val) {
    err.textContent = t('errEmpty');
    input.focus();
    return;
  }
  err.textContent = '';
  saveRecent(activeCourier, val);
  window.open(couriers[activeCourier].url(val), '_blank');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  const fromUrl = new URLSearchParams(location.search).get('courier');
  if (fromUrl && couriers[fromUrl]) selectCourier(fromUrl);
  else initEmpty();
});

function initEmpty() {
  const root = document.documentElement;
  root.style.setProperty('--accent-color',       '#6b6b7a');
  setGlow('rgba(100,100,120,0.06)');
  root.style.setProperty('--tag-bg',             'rgba(100,100,120,0.08)');
  root.style.setProperty('--tag-border',         'rgba(100,100,120,0.2)');
  root.style.setProperty('--tag-color',          '#8a8a94');
  root.style.setProperty('--btn-active-border',  'rgba(100,100,120,0.3)');
  root.style.setProperty('--btn-active-bg',      'rgba(100,100,120,0.06)');
  root.style.setProperty('--input-focus-border', 'rgba(100,100,120,0.4)');
  root.style.setProperty('--input-focus-shadow', '0 0 0 3px rgba(100,100,120,0.08)');
  root.style.setProperty('--card-border-color',  'rgba(100,100,120,0.2)');

  hasCourier = false;
  document.getElementById('trackerCard').classList.add('idle');
  document.getElementById('heroAccent').textContent = t('courierWord');
  document.getElementById('tagText').textContent = t('tagBegin');
  document.getElementById('heroSub').textContent = t('subEmpty');
  document.getElementById('chipLabel').textContent = t('chipNone');
  document.getElementById('inputLabel').textContent = t('labelAwb');
  document.getElementById('awb').placeholder = t('eg', { x: '1234567890' });
  document.getElementById('btnLabel').textContent = t('btnNone');
  fitHero();
  document.querySelectorAll('.courier-btn').forEach(b => b.classList.remove('active-courier'));
}

// Switching language: redo the texts that are set from code
onLangChange(() => {
  if (hasCourier) selectCourier(activeCourier, true);
  else initEmpty();
});
