let isLight = false;

function toggleTheme() {
  isLight = !isLight;
  document.documentElement.classList.toggle('light', isLight);
  document.getElementById('themeToggle').classList.toggle('light-mode', isLight);
  document.getElementById('logoCloud').style.display  = isLight ? 'none'  : 'block';
  document.getElementById('logoParcel').style.display = isLight ? 'block' : 'none';
  try { localStorage.setItem('oneparcel_theme', isLight ? 'light' : 'dark'); } catch {}
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('oneparcel_theme');
    if (saved === 'light') toggleTheme();
  } catch {}
});
