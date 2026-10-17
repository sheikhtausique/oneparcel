const RECENT_KEY = 'courier_tracker_recent';
const PINNED_KEY = 'courier_tracker_pinned';
const MAX_RECENT = 5;

// ── RECENT ──
function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch { return []; }
}

function saveRecent(courier, awb) {
  let list = getRecent().filter(r => !(r.courier === courier && r.awb === awb));
  list.unshift({ courier, awb, name: couriers[courier].name, hex: couriers[courier].hex });
  if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
  renderRecent();
}

function deleteRecent(i) {
  const list = getRecent();
  list.splice(i, 1);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
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
  const exists = pinned.findIndex(p => p.courier === courier && p.awb === awb);
  if (exists >= 0) {
    pinned.splice(exists, 1);
  } else {
    pinned.unshift({ courier, awb, hex, name });
    if (pinned.length > 5) pinned = pinned.slice(0, 5);
  }
  try { localStorage.setItem(PINNED_KEY, JSON.stringify(pinned)); } catch {}
  renderRecent();
}

// ── LABEL MODAL ──
let labelModalIndex = -1;

function openLabelModal(i) {
  labelModalIndex = i;
  const list = getRecent();
  const r = list[i];
  document.getElementById('labelModalMeta').textContent = `${r.name} · ${r.awb}`;
  document.getElementById('labelInput').value = r.label || '';
  document.getElementById('labelModalOverlay').classList.add('visible');
  setTimeout(() => document.getElementById('labelInput').focus(), 100);
}

function closeLabelModal() {
  document.getElementById('labelModalOverlay').classList.remove('visible');
  labelModalIndex = -1;
}

function saveLabelModal() {
  if (labelModalIndex < 0) return;
  const list = getRecent();
  list[labelModalIndex].label = document.getElementById('labelInput').value.trim();
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
  renderRecent();
  closeLabelModal();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('labelInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveLabelModal();
    if (e.key === 'Escape') closeLabelModal();
  });

  document.getElementById('labelModalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLabelModal();
  });
});

// ── RENDER ──
function renderRecent() {
  const pinned  = getPinned();
  const recent  = getRecent();
  const recentFiltered = recent.filter(r => !pinned.some(p => p.courier === r.courier && p.awb === r.awb));
  const combined = [
    ...pinned.map(r => ({ ...r, _pinned: true })),
    ...recentFiltered
  ];

  const section   = document.getElementById('recentSection');
  const container = document.getElementById('recentList');
  if (!combined.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';

  container.innerHTML = combined.map((r) => {
    const ri    = recent.findIndex(x => x.courier === r.courier && x.awb === r.awb);
    const label = r.label || '';
    const pinCol = r._pinned ? 'var(--accent-color,#0066CC)' : 'var(--text)';
    return `
    <div class="recent-item" onclick="useRecent('${r.courier}','${r.awb}')">
      <span class="recent-dot" style="background:${r.hex};"></span>
      <div class="recent-text">
        <span class="recent-courier">
          ${label ? `<em style="color:var(--text2);font-style:normal;">${label}</em>` : r.name}
          ${r._pinned ? '<span class="pinned-badge">pinned</span>' : ''}
        </span>
        <span class="recent-awb" style="color:var(--text);">${r.awb}</span>
      </div>
      <div style="display:flex;gap:3px;flex-shrink:0;">
        <button class="recent-delete ${r._pinned ? 'pin-active' : ''}"
          onclick="event.stopPropagation();togglePin('${r.courier}','${r.awb}','${r.hex}','${r.name}')"
          title="${r._pinned ? 'Unpin' : 'Pin to top'}">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="${r._pinned ? pinCol : 'none'}" stroke="${pinCol}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 2L9 7L11 9H3L5 7V2"/><line x1="7" y1="9" x2="7" y2="13"/><line x1="4" y1="2" x2="10" y2="2"/>
          </svg>
        </button>
        ${ri >= 0 ? `
        <button class="recent-delete" onclick="event.stopPropagation();openLabelModal(${ri})" title="Rename">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 10.5V12h1.5l5-5L7 5.5l-5 5z"/><path d="M10 2L12 4l-1.5 1.5L8.5 3.5 10 2z"/>
          </svg>
        </button>
        <button class="recent-delete" onclick="event.stopPropagation();deleteRecent(${ri})" title="Remove">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round">
            <polyline points="3,4 11,4"/><path d="M5 4V3h4v1"/><path d="M4 4l.7 7.5h4.6L10 4"/>
          </svg>
        </button>` : ''}
      </div>
    </div>`;
  }).join('');
}
