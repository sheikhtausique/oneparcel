// The saved theme is already applied by a small script in the page head (so there is no flash).
// This keeps the logo, toggle and browser colour in step with it.
let isLight = document.documentElement.classList.contains('light');

function applyThemeUI() {
  document.documentElement.classList.toggle('light', isLight);
  document.getElementById('themeToggle').classList.toggle('light-mode', isLight);
  document.getElementById('logoCloud').style.display  = isLight ? 'none'  : 'block';
  document.getElementById('logoParcel').style.display = isLight ? 'block' : 'none';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', isLight ? '#f0f2f5' : '#0a0a0b');
}

function toggleTheme() {
  isLight = !isLight;
  applyThemeUI();
  try { localStorage.setItem('oneparcel_theme', isLight ? 'light' : 'dark'); } catch {}
}

applyThemeUI();
