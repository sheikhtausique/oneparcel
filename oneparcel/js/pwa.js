let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  try {
    if (!localStorage.getItem('pwa_dismissed')) {
      setTimeout(() => document.getElementById('pwaBanner').classList.add('visible'), 3000);
    }
  } catch {}
});

async function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('pwaBanner').classList.remove('visible');
}

function dismissPWA() {
  document.getElementById('pwaBanner').classList.remove('visible');
  try { localStorage.setItem('pwa_dismissed', '1'); } catch {}
}
