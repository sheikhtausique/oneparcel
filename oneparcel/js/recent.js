const RECENT_KEY = 'courier_tracker_recent';
const PINNED_KEY = 'courier_tracker_pinned';
const LABELS_KEY = 'courier_tracker_labels';
const MAX_RECENT = 5;
const MAX_LABELS = 100;

// ── HELPERS ──
function esc(v) {
  return String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// A value safe to put inside an onclick="..." attribute
const arg = v => esc(JSON.stringify(String(v)));

const sameItem = (a, courier, awb) => a.courier === courier && a.awb === awb;

function write(key, list) {
  try { localStorage.setItem(key, JSON.stringify(list)); } catch {}
}

// ── RECENT ──
function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch { return []; }
}

// ── LABELS ──
// Names are kept in one place, apart from the recent and pinned lists, so a name
// shows the same way whether a shipment is pinned or not, and survives reloads.
const labelKey = (courier, awb) => `${courier}|${awb}`;

function getLabels() {
  try {
    const o = JSON.parse(localStorage.getItem(LABELS_KEY));
    return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
  } catch { return {}; }
}

function labelOf(courier, awb) {
  return getLabels()[labelKey(courier, awb)] || '';
}

function setLabel(courier, awb, label) {
  const m = getLabels();
  const k = labelKey(courier, awb);
  delete m[k];
  if (label) m[k] = label;
  const keys = Object.keys(m);
  if (keys.length > MAX_LABELS) keys.slice(0, keys.length - MAX_LABELS).forEach(x => delete m[x]);
  write(LABELS_KEY, m);
}

// Earlier versions saved the name inside each recent / pinned entry. Move those into the label store.
(function migrateLabels() {
  const m = getLabels();
  let changed = false;
  [RECENT_KEY, PINNED_KEY].forEach(key => {
    let list;
    try { list = JSON.parse(localStorage.getItem(key)) || []; } catch { list = []; }
    let listChanged = false;
    list.forEach(e => {
      if (e && e.label !== undefined) {
        const k = labelKey(e.courier, e.awb);
        if (e.label && m[k] === undefined) { m[k] = e.label; changed = true; }
        delete e.label;
        listChanged = true;
      }
    });
    if (listChanged) write(key, list);
  });
  if (changed) write(LABELS_KEY, m);
})();

function saveRecent(courier, awb) {
  let list = getRecent().filter(r => !sameItem(r, courier, awb));
  list.unshift({ courier, awb, name: couriers[courier].name, hex: couriers[courier].hex });
  if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
  write(RECENT_KEY, list);
  renderRecent();
}

// Remove a shipment completely: from recent, from pinned, and its name
function deleteItem(courier, awb) {
  write(RECENT_KEY, getRecent().filter(r => !sameItem(r, courier, awb)));
  write(PINNED_KEY, getPinned().filter(p => !sameItem(p, courier, awb)));
  setLabel(courier, awb, '');
  renderRecent();
}

function clearAllRecent() {
  try {
    localStorage.removeItem(RECENT_KEY);
    localStorage.removeItem(PINNED_KEY);
    localStorage.removeItem(LABELS_KEY);
  } catch {}
  renderRecent();
}

// Tapping a saved shipment opens its tracking page. The entry form is left alone.
function useRecent(courier, awb) {
  window.open(couriers[courier].url(awb), '_blank');
}

// ── PIN ──
function getPinned() {
  try { return JSON.parse(localStorage.getItem(PINNED_KEY)) || []; }
  catch { return []; }
}

function togglePin(courier, awb, hex, name) {
  let pinned = getPinned();
  const exists = pinned.findIndex(p => sameItem(p, courier, awb));
  if (exists >= 0) {
    pinned.splice(exists, 1);
  } else {
    pinned.unshift({ courier, awb, hex, name });
    if (pinned.length > 5) pinned = pinned.slice(0, 5);
  }
  write(PINNED_KEY, pinned);
  renderRecent();
}

// ── LABEL MODAL ──
let labelTarget = null;

function openLabelModal(courier, awb) {
  labelTarget = { courier, awb };
  const name = couriers[courier] ? couriers[courier].name : courier;
  document.getElementById('labelModalMeta').textContent = `${name} · ${awb}`;
  document.getElementById('labelInput').value = labelOf(courier, awb);
  document.getElementById('labelModalOverlay').classList.add('visible');
  setTimeout(() => document.getElementById('labelInput').focus(), 100);
}

function closeLabelModal() {
  document.getElementById('labelModalOverlay').classList.remove('visible');
  labelTarget = null;
}

function saveLabelModal() {
  if (!labelTarget) return;
  const { courier, awb } = labelTarget;
  const label = document.getElementById('labelInput').value.trim();
  setLabel(courier, awb, label);
  renderRecent();
  closeLabelModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderRecent();   // show saved shipments as soon as the page opens

  document.getElementById('labelInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) saveLabelModal();
    if (e.key === 'Escape') closeLabelModal();
  });

  document.getElementById('labelModalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLabelModal();
  });
});

// Keep the list current when the page is restored from cache (back button)
// or when another tab changes it
window.addEventListener('pageshow', e => { if (e.persisted) renderRecent(); });
window.addEventListener('storage', e => {
  if (e.key === RECENT_KEY || e.key === PINNED_KEY || e.key === LABELS_KEY) renderRecent();
});

// ── RENDER ──
function renderRecent() {
  const pinned  = getPinned();
  const recent  = getRecent();
  const recentFiltered = recent.filter(r => !pinned.some(p => sameItem(p, r.courier, r.awb)));
  const combined = [
    ...pinned.map(r => ({ ...r, _pinned: true })),
    ...recentFiltered
  ];

  const section   = document.getElementById('recentSection');
  const container = document.getElementById('recentList');
  if (!combined.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';

  const labels = getLabels();
  container.innerHTML = combined.map((r) => {
    const label  = labels[labelKey(r.courier, r.awb)] || '';
    const pinCol = r._pinned ? 'var(--accent-color,#0066CC)' : 'var(--text)';
    const c = arg(r.courier), a = arg(r.awb);
    return `
    <div class="recent-item" onclick="useRecent(${c},${a})">
      <span class="recent-dot" style="background:${esc(r.hex)};"></span>
      <div class="recent-text">
        <span class="recent-courier">
          ${label ? `<em style="color:var(--text2);font-style:normal;">${esc(label)}</em>` : esc(r.name)}
          ${r._pinned ? `<span class="pinned-badge">${esc(t('pinned'))}</span>` : ''}
        </span>
        <span class="recent-awb" style="color:var(--text);">${esc(r.awb)}</span>
      </div>
      <div style="display:flex;gap:3px;flex-shrink:0;">
        <button class="recent-delete ${r._pinned ? 'pin-active' : ''}"
          onclick="event.stopPropagation();togglePin(${c},${a},${arg(r.hex)},${arg(r.name)})"
          title="${esc(r._pinned ? t('unpinTip') : t('pinTip'))}">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="${r._pinned ? pinCol : 'none'}" stroke="${pinCol}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 2L9 7L11 9H3L5 7V2"/><line x1="7" y1="9" x2="7" y2="13"/><line x1="4" y1="2" x2="10" y2="2"/>
          </svg>
        </button>
        <button class="recent-delete" onclick="event.stopPropagation();openLabelModal(${c},${a})" title="${esc(t('renameTip'))}">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 10.5V12h1.5l5-5L7 5.5l-5 5z"/><path d="M10 2L12 4l-1.5 1.5L8.5 3.5 10 2z"/>
          </svg>
        </button>
        <button class="recent-delete" onclick="event.stopPropagation();deleteItem(${c},${a})" title="${esc(t('removeTip'))}">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round">
            <polyline points="3,4 11,4"/><path d="M5 4V3h4v1"/><path d="M4 4l.7 7.5h4.6L10 4"/>
          </svg>
        </button>
      </div>
    </div>`;
  }).join('');
}

onLangChange(renderRecent);
