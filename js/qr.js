let qrStream   = null;
let qrInterval = null;

async function openQRScanner() {
  document.getElementById('qrModalOverlay').classList.add('visible');
  try {
    qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const video = document.getElementById('qrVideo');
    video.srcObject = qrStream;
    startQRDetection(video);
  } catch {
    closeQRScanner();
    document.getElementById('err').textContent = 'Camera access denied. Please allow camera permission.';
  }
}

function closeQRScanner() {
  document.getElementById('qrModalOverlay').classList.remove('visible');
  if (qrStream)   { qrStream.getTracks().forEach(t => t.stop()); qrStream = null; }
  if (qrInterval) { clearInterval(qrInterval); qrInterval = null; }
}

function onQRDetected(val) {
  closeQRScanner();
  const input = document.getElementById('awb');
  input.value = val.trim();
  document.getElementById('clearBtn').style.display = 'flex';
  document.getElementById('pasteBtn').style.display = 'none';
  document.getElementById('err').textContent = '';
}

function startQRDetection(video) {
  if ('BarcodeDetector' in window) {
    const detector = new BarcodeDetector({
      formats: ['qr_code','code_128','code_39','ean_13','ean_8','itf','data_matrix']
    });
    qrInterval = setInterval(async () => {
      try {
        const barcodes = await detector.detect(video);
        if (barcodes.length > 0) onQRDetected(barcodes[0].rawValue);
      } catch {}
    }, 400);
  } else {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
    script.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx    = canvas.getContext('2d');
      qrInterval = setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width  = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) onQRDetected(code.data);
        }
      }, 400);
    };
    document.head.appendChild(script);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('qrModalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeQRScanner();
  });
});
