const RECENT_KEY = 'courier_tracker_recent';
const PINNED_KEY = 'courier_tracker_pinned';
const MAX_RECENT = 5;

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

// A shipment's label lives on its recent entry and/or its pinned entry
function findLabel(courier, awb) {
  const r = getRecent().find(x => sameItem(x, courier, awb));
  const p = getPinned().find(x => sameItem(x, courier, awb));
  return (r && r.label) || (p && p.label) || '';
}

function saveRecent(courier, awb) {
  const label = findLabel(courier, awb);
  let list = getRecent().filter(r => !sameItem(r, courier, awb));
  const entry = { courier, awb, name: couriers[courier].name, hex: couriers[courier].hex };
  if (label) entry.label = label;   // keep the name when the same number is tracked again
  list.unshift(entry);
  if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
  write(RECENT_KEY, list);
  renderRecent();
}

// Remove a shipment completely: from recent and from pinned
function deleteItem(courier, awb) {
  write(RECENT_KEY, getRecent().filter(r => !sameItem(r, courier, awb)));
  write(PINNED_KEY, getPinned().filter(p => !sameItem(p, courier, awb)));
  renderRecent();
}

function clearAllRecent() {
  try { localStorage.removeItem(RECENT_KEY); localStorage.removeItem(PINNED_KEY); } catch {}
  renderRecent();
}

function useRecent(courier, awb) {
  selectCourier(courier);
  document.getElementById('awb').value = awb;
  document.getElementById('clearBtn').style.display = 'flex';
  document.getElementById('pasteBtn').style.display = 'none';
  document.getElementById('err').textContent = '';
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
    const entry = { courier, awb, hex, name };
    const label = findLabel(courier, awb);
    if (label) entry.label = label;   // a pinned shipment keeps its name
    pinned.unshift(entry);
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
  document.getElementById('labelInput').value = findLabel(courier, awb);
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
  const apply = list => list.map(x => {
    if (!sameItem(x, courier, awb)) return x;
    const next = { ...x };
    if (label) next.label = label; else delete next.label;
    return next;
  });
  write(RECENT_KEY, apply(getRecent()));
  write(PINNED_KEY, apply(getPinned()));
  renderRecent();
  closeLabelModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderRecent();   // show saved shipments as soon as the page opens

  document.getElementById('labelInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveLabelModal();
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
  if (e.key === RECENT_KEY || e.key === PINNED_KEY) renderRecent();
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

  container.innerHTML = combined.map((r) => {
    const label  = r.label || '';
    const pinCol = r._pinned ? 'var(--accent-color,#0066CC)' : 'var(--text)';
    const c = arg(r.courier), a = arg(r.awb);
    return `
    <div class="recent-item" onclick="useRecent(${c},${a})">
      <span class="recent-dot" style="background:${esc(r.hex)};"></span>
      <div class="recent-text">
        <span class="recent-courier">
          ${label ? `<em style="color:var(--text2);font-style:normal;">${esc(label)}</em>` : esc(r.name)}
          ${r._pinned ? '<span class="pinned-badge">pinned</span>' : ''}
        </span>
        <span class="recent-awb" style="color:var(--text);">${esc(r.awb)}</span>
      </div>
      <div style="display:flex;gap:3px;flex-shrink:0;">
        <button class="recent-delete ${r._pinned ? 'pin-active' : ''}"
          onclick="event.stopPropagation();togglePin(${c},${a},${arg(r.hex)},${arg(r.name)})"
          title="${r._pinned ? 'Unpin' : 'Pin to top'}">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="${r._pinned ? pinCol : 'none'}" stroke="${pinCol}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 2L9 7L11 9H3L5 7V2"/><line x1="7" y1="9" x2="7" y2="13"/><line x1="4" y1="2" x2="10" y2="2"/>
          </svg>
        </button>
        <button class="recent-delete" onclick="event.stopPropagation();openLabelModal(${c},${a})" title="Rename">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 10.5V12h1.5l5-5L7 5.5l-5 5z"/><path d="M10 2L12 4l-1.5 1.5L8.5 3.5 10 2z"/>
          </svg>
        </button>
        <button class="recent-delete" onclick="event.stopPropagation();deleteItem(${c},${a})" title="Remove">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round">
            <polyline points="3,4 11,4"/><path d="M5 4V3h4v1"/><path d="M4 4l.7 7.5h4.6L10 4"/>
          </svg>
        </button>
      </div>
    </div>`;
  }).join('');
}
