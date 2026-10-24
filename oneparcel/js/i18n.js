// Languages: English, Hindi, Bengali.
// Text in the pages is marked with data-i18n attributes; t('key') is used from scripts.
const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
];

const I18N = {
  en: {
    navHome: 'Home', navCouriers: 'Couriers', navHow: 'How it works', navTrack: 'Track a parcel',
    langTitle: 'Language', themeTitle: 'Toggle light/dark mode', homeTip: 'Back to top',

    liveTag: 'Live shipment tracking',
    h1a: 'Track your', h1c: 'Shipment', courierWord: 'courier',
    landSub: 'One page for every courier. Enter your AWB and OneParcel opens the official tracking page for you.',
    btnStart: 'Start tracking', btnSee: 'See couriers',
    pickTitle: 'Pick your courier',
    pickLead: 'Choose one and your tracking page opens with it already selected.',
    howTitle: 'Three steps to your parcel', howLead: 'No account, no sign-up.',
    how1t: 'Select your courier',
    how1d: 'Pick from the supported couriers. Nothing is pre-selected, so you always choose.',
    how2t: 'Enter the number',
    how2d: 'Type it, paste it, or scan the barcode on the package with your camera.',
    how3t: 'See live status',
    how3d: "The courier's own tracking page opens in a new tab with your shipment loaded.",
    whyLabel: 'Why use this',
    featL1: 'Everything you need.', featL2: "Nothing you don't.",
    feat1t: 'Instant redirect',
    feat1d: 'Takes you directly to the official courier tracking page. No middlemen, no delays, no ads.',
    feat2t: 'Official data',
    feat2d: "Pulls tracking information directly from each courier's own system. Always accurate, always up-to-date.",
    feat3t: 'One-click tracking',
    feat3d: "Paste your AWB, hit enter. That's it. Opens in a new tab so you never lose your place.",
    ctaTitle: 'Got a tracking number?',

    pwaTitle: 'Install OneParcel', pwaSub: 'Add to home screen for quick access', pwaInstall: 'Install',
    footCredits: 'Created by <span>Tausique</span> &nbsp;·&nbsp; Powered by <span>CuriosityLabs</span>',
    footDisclaimer: 'This tool redirects to official courier websites. Not affiliated with any courier.',
    githubLink: 'View on GitHub',

    tagBegin: 'Select a courier to begin',
    subEmpty: 'Choose your courier below to get started.',
    chipNone: 'No courier selected',
    btnNone: 'Select a courier first',
    labelAwb: 'Airway Bill (AWB) number', labelTracking: 'Tracking number', labelShipment: 'Shipment number',
    subAwb: 'Enter your {name} AWB number below and get redirected to live shipment status on the official {name} website.',
    subTracking: 'Enter your {name} tracking number below and get redirected to live shipment status on the official {name} website.',
    subShipment: 'Enter your {name} shipment number below and get redirected to live shipment status on the official {name} website.',
    btnTrack: 'Track {name} shipment', btnTrackName: 'Track {name}',
    eg: 'e.g. {x}',
    bulkBtn: 'Bulk',
    bulkPlaceholder: 'Paste multiple AWB numbers, one per line\ne.g.\n1234567890\n0987654321',
    bulkOpen: 'Open all in new tabs',
    scanTitle: 'Scan QR / barcode', pasteTitle: 'Paste from clipboard',
    recentLabel: 'Recently tracked', clearAll: 'Clear all',
    pinned: 'pinned', pinTip: 'Pin to top', unpinTip: 'Unpin', renameTip: 'Rename', removeTip: 'Remove',
    errEmpty: 'Please enter a tracking number to continue.',
    errShare: 'Enter a tracking number first.',
    kbdHint: 'to track',
    shareBtn: 'Share tracking link', shareCopied: '✓ Link copied!',
    captchaNote: 'Xpressbees requires a <strong>captcha verification</strong> on their website before showing tracking results.',
    bluedartNote: 'The Blue Dart website may occasionally be unavailable due to server issues. If it doesn’t load, try tracking your AWB on the DHL website instead.',
    step1: 'Select courier', step2: 'Enter number', step3: 'Live status',
    qrTitle: 'Scan AWB barcode',
    qrHint: 'Point your camera at the AWB barcode or QR code on the package',
    qrDenied: 'Camera access denied. Please allow camera permission.',
    labelModalTitle: 'Label this shipment', labelPlaceholder: 'e.g. Shoes from Myntra',
    cancel: 'Cancel', saveLabel: 'Save label',
  },

  hi: {
    navHome: 'होम', navCouriers: 'कूरियर', navHow: 'कैसे चलता है', navTrack: 'ट्रैक करें',
    langTitle: 'भाषा', themeTitle: 'लाइट/डार्क मोड बदलें', homeTip: 'ऊपर जाएँ',

    liveTag: 'लाइव शिपमेंट ट्रैकिंग',
    h1a: 'अपनी', h1c: 'शिपमेंट ट्रैक करें', courierWord: 'कूरियर',
    landSub: 'हर कूरियर के लिए एक ही पेज। अपना AWB नंबर डालें, और OneParcel आपके लिए आधिकारिक ट्रैकिंग पेज खोल देगा।',
    btnStart: 'ट्रैकिंग शुरू करें', btnSee: 'कूरियर देखें',
    pickTitle: 'अपना कूरियर चुनें',
    pickLead: 'एक चुनें, और ट्रैकिंग पेज उसी कूरियर के साथ पहले से चुना हुआ खुलेगा।',
    howTitle: 'आपके पार्सल तक तीन कदम', howLead: 'कोई अकाउंट नहीं, कोई साइन-अप नहीं।',
    how1t: 'अपना कूरियर चुनें',
    how1d: 'उपलब्ध कूरियरों में से चुनें। कुछ भी पहले से चुना नहीं होता, इसलिए चुनाव हमेशा आपका होता है।',
    how2t: 'नंबर डालें',
    how2d: 'टाइप करें, पेस्ट करें, या कैमरे से पैकेज का बारकोड स्कैन करें।',
    how3t: 'लाइव स्टेटस देखें',
    how3d: 'कूरियर का अपना ट्रैकिंग पेज नए टैब में आपकी शिपमेंट के साथ खुल जाता है।',
    whyLabel: 'इसे क्यों इस्तेमाल करें',
    featL1: 'वह सब कुछ जो आपको चाहिए।', featL2: 'और कुछ भी फ़ालतू नहीं।',
    feat1t: 'तुरंत रीडायरेक्ट',
    feat1d: 'सीधे आधिकारिक कूरियर ट्रैकिंग पेज पर ले जाता है। कोई बिचौलिया नहीं, कोई देरी नहीं, कोई विज्ञापन नहीं।',
    feat2t: 'आधिकारिक जानकारी',
    feat2d: 'ट्रैकिंग की जानकारी सीधे हर कूरियर के अपने सिस्टम से दिखती है। हमेशा सही, हमेशा अपडेटेड।',
    feat3t: 'एक क्लिक में ट्रैकिंग',
    feat3d: 'अपना AWB पेस्ट करें और एंटर दबाएँ। बस इतना ही। नए टैब में खुलता है, इसलिए आप अपनी जगह नहीं खोते।',
    ctaTitle: 'ट्रैकिंग नंबर है?',

    pwaTitle: 'OneParcel इंस्टॉल करें', pwaSub: 'जल्दी खोलने के लिए होम स्क्रीन पर जोड़ें', pwaInstall: 'इंस्टॉल करें',
    footCredits: '<span>Tausique</span> द्वारा निर्मित &nbsp;·&nbsp; <span>CuriosityLabs</span> द्वारा संचालित',
    footDisclaimer: 'यह टूल आधिकारिक कूरियर वेबसाइटों पर भेजता है। किसी भी कूरियर कंपनी से जुड़ा नहीं है।',
    githubLink: 'GitHub पर देखें',

    tagBegin: 'शुरू करने के लिए कूरियर चुनें',
    subEmpty: 'शुरू करने के लिए नीचे अपना कूरियर चुनें।',
    chipNone: 'कोई कूरियर नहीं चुना',
    btnNone: 'पहले कूरियर चुनें',
    labelAwb: 'एयरवे बिल (AWB) नंबर', labelTracking: 'ट्रैकिंग नंबर', labelShipment: 'शिपमेंट नंबर',
    subAwb: 'नीचे अपना {name} AWB नंबर डालें और आधिकारिक {name} वेबसाइट पर लाइव शिपमेंट स्टेटस देखें।',
    subTracking: 'नीचे अपना {name} ट्रैकिंग नंबर डालें और आधिकारिक {name} वेबसाइट पर लाइव शिपमेंट स्टेटस देखें।',
    subShipment: 'नीचे अपना {name} शिपमेंट नंबर डालें और आधिकारिक {name} वेबसाइट पर लाइव शिपमेंट स्टेटस देखें।',
    btnTrack: '{name} शिपमेंट ट्रैक करें', btnTrackName: '{name} ट्रैक करें',
    eg: 'जैसे {x}',
    bulkBtn: 'बल्क',
    bulkPlaceholder: 'एक से ज़्यादा AWB नंबर पेस्ट करें, हर लाइन में एक\nजैसे\n1234567890\n0987654321',
    bulkOpen: 'सभी को नए टैब में खोलें',
    scanTitle: 'QR / बारकोड स्कैन करें', pasteTitle: 'क्लिपबोर्ड से पेस्ट करें',
    recentLabel: 'हाल में ट्रैक किए गए', clearAll: 'सब हटाएँ',
    pinned: 'पिन किया', pinTip: 'ऊपर पिन करें', unpinTip: 'पिन हटाएँ', renameTip: 'नाम बदलें', removeTip: 'हटाएँ',
    errEmpty: 'आगे बढ़ने के लिए ट्रैकिंग नंबर डालें।',
    errShare: 'पहले ट्रैकिंग नंबर डालें।',
    kbdHint: 'ट्रैक करने के लिए',
    shareBtn: 'ट्रैकिंग लिंक शेयर करें', shareCopied: '✓ लिंक कॉपी हो गया!',
    captchaNote: 'Xpressbees अपनी वेबसाइट पर ट्रैकिंग नतीजे दिखाने से पहले <strong>कैप्चा वेरिफिकेशन</strong> माँगता है।',
    bluedartNote: 'सर्वर की समस्या के कारण Blue Dart की वेबसाइट कभी-कभी उपलब्ध नहीं हो सकती। अगर वह न खुले, तो इसके बजाय अपना AWB DHL की वेबसाइट पर ट्रैक करके देखें।',
    step1: 'कूरियर चुनें', step2: 'नंबर डालें', step3: 'लाइव स्टेटस',
    qrTitle: 'AWB बारकोड स्कैन करें',
    qrHint: 'अपना कैमरा पैकेज पर लगे AWB बारकोड या QR कोड की ओर करें',
    qrDenied: 'कैमरा की अनुमति नहीं मिली। कृपया कैमरा की अनुमति दें।',
    labelModalTitle: 'इस शिपमेंट को नाम दें', labelPlaceholder: 'जैसे Myntra से जूते',
    cancel: 'रद्द करें', saveLabel: 'नाम सेव करें',
  },

  bn: {
    navHome: 'হোম', navCouriers: 'কুরিয়ার', navHow: 'কীভাবে কাজ করে', navTrack: 'ট্র্যাক করুন',
    langTitle: 'ভাষা', themeTitle: 'লাইট/ডার্ক মোড পরিবর্তন করুন', homeTip: 'উপরে যান',

    liveTag: 'লাইভ শিপমেন্ট ট্র্যাকিং',
    h1a: 'আপনার', h1c: 'শিপমেন্ট ট্র্যাক করুন', courierWord: 'কুরিয়ার',
    landSub: 'সব কুরিয়ারের জন্য একটি পেজ। আপনার AWB নম্বর দিন, আর OneParcel আপনার জন্য অফিসিয়াল ট্র্যাকিং পেজ খুলে দেবে।',
    btnStart: 'ট্র্যাকিং শুরু করুন', btnSee: 'কুরিয়ার দেখুন',
    pickTitle: 'আপনার কুরিয়ার বেছে নিন',
    pickLead: 'একটি বেছে নিন, ট্র্যাকিং পেজ সেটি আগে থেকেই নির্বাচিত অবস্থায় খুলবে।',
    howTitle: 'আপনার পার্সেল পর্যন্ত তিন ধাপ', howLead: 'কোনো অ্যাকাউন্ট নয়, সাইন-আপ নয়।',
    how1t: 'আপনার কুরিয়ার বেছে নিন',
    how1d: 'সমর্থিত কুরিয়ারগুলো থেকে বেছে নিন। আগে থেকে কিছুই নির্বাচিত থাকে না, তাই পছন্দ সবসময় আপনার।',
    how2t: 'নম্বর দিন',
    how2d: 'টাইপ করুন, পেস্ট করুন, বা ক্যামেরা দিয়ে প্যাকেজের বারকোড স্ক্যান করুন।',
    how3t: 'লাইভ স্ট্যাটাস দেখুন',
    how3d: 'কুরিয়ারের নিজস্ব ট্র্যাকিং পেজ নতুন ট্যাবে আপনার শিপমেন্টসহ খুলে যায়।',
    whyLabel: 'কেন ব্যবহার করবেন',
    featL1: 'আপনার যা দরকার, সবই।', featL2: 'অপ্রয়োজনীয় কিছুই নয়।',
    feat1t: 'তাৎক্ষণিক রিডাইরেক্ট',
    feat1d: 'সরাসরি অফিসিয়াল কুরিয়ার ট্র্যাকিং পেজে নিয়ে যায়। কোনো মধ্যস্থতাকারী নেই, দেরি নেই, বিজ্ঞাপন নেই।',
    feat2t: 'অফিসিয়াল তথ্য',
    feat2d: 'ট্র্যাকিংয়ের তথ্য সরাসরি প্রতিটি কুরিয়ারের নিজস্ব সিস্টেম থেকে দেখা যায়। সবসময় সঠিক, সবসময় আপ-টু-ডেট।',
    feat3t: 'এক ক্লিকে ট্র্যাকিং',
    feat3d: 'আপনার AWB পেস্ট করুন, এন্টার চাপুন। ব্যস, এটুকুই। নতুন ট্যাবে খোলে, তাই আপনি আপনার জায়গা হারান না।',
    ctaTitle: 'ট্র্যাকিং নম্বর আছে?',

    pwaTitle: 'OneParcel ইনস্টল করুন', pwaSub: 'দ্রুত খুলতে হোম স্ক্রিনে যোগ করুন', pwaInstall: 'ইনস্টল করুন',
    footCredits: '<span>Tausique</span> এর তৈরি &nbsp;·&nbsp; <span>CuriosityLabs</span> দ্বারা চালিত',
    footDisclaimer: 'এই টুল অফিসিয়াল কুরিয়ার ওয়েবসাইটে নিয়ে যায়। কোনো কুরিয়ার কোম্পানির সঙ্গে যুক্ত নয়।',
    githubLink: 'GitHub-এ দেখুন',

    tagBegin: 'শুরু করতে একটি কুরিয়ার বেছে নিন',
    subEmpty: 'শুরু করতে নিচে আপনার কুরিয়ার বেছে নিন।',
    chipNone: 'কোনো কুরিয়ার নির্বাচিত নয়',
    btnNone: 'আগে একটি কুরিয়ার বেছে নিন',
    labelAwb: 'এয়ারওয়ে বিল (AWB) নম্বর', labelTracking: 'ট্র্যাকিং নম্বর', labelShipment: 'শিপমেন্ট নম্বর',
    subAwb: 'নিচে আপনার {name} AWB নম্বর দিন এবং অফিসিয়াল {name} ওয়েবসাইটে লাইভ শিপমেন্ট স্ট্যাটাস দেখুন।',
    subTracking: 'নিচে আপনার {name} ট্র্যাকিং নম্বর দিন এবং অফিসিয়াল {name} ওয়েবসাইটে লাইভ শিপমেন্ট স্ট্যাটাস দেখুন।',
    subShipment: 'নিচে আপনার {name} শিপমেন্ট নম্বর দিন এবং অফিসিয়াল {name} ওয়েবসাইটে লাইভ শিপমেন্ট স্ট্যাটাস দেখুন।',
    btnTrack: '{name} শিপমেন্ট ট্র্যাক করুন', btnTrackName: '{name} ট্র্যাক করুন',
    eg: 'যেমন {x}',
    bulkBtn: 'বাল্ক',
    bulkPlaceholder: 'একাধিক AWB নম্বর পেস্ট করুন, প্রতি লাইনে একটি\nযেমন\n1234567890\n0987654321',
    bulkOpen: 'সবগুলো নতুন ট্যাবে খুলুন',
    scanTitle: 'QR / বারকোড স্ক্যান করুন', pasteTitle: 'ক্লিপবোর্ড থেকে পেস্ট করুন',
    recentLabel: 'সম্প্রতি ট্র্যাক করা', clearAll: 'সব মুছুন',
    pinned: 'পিন করা', pinTip: 'উপরে পিন করুন', unpinTip: 'পিন সরান', renameTip: 'নাম বদলান', removeTip: 'সরান',
    errEmpty: 'এগিয়ে যেতে একটি ট্র্যাকিং নম্বর দিন।',
    errShare: 'আগে একটি ট্র্যাকিং নম্বর দিন।',
    kbdHint: 'ট্র্যাক করতে',
    shareBtn: 'ট্র্যাকিং লিংক শেয়ার করুন', shareCopied: '✓ লিংক কপি হয়েছে!',
    captchaNote: 'Xpressbees তাদের ওয়েবসাইটে ট্র্যাকিং ফলাফল দেখানোর আগে <strong>ক্যাপচা যাচাইকরণ</strong> চায়।',
    bluedartNote: 'সার্ভারের সমস্যার কারণে Blue Dart-এর ওয়েবসাইট মাঝে মাঝে পাওয়া নাও যেতে পারে। না খুললে, তার বদলে DHL-এর ওয়েবসাইটে আপনার AWB ট্র্যাক করে দেখুন।',
    step1: 'কুরিয়ার বেছে নিন', step2: 'নম্বর দিন', step3: 'লাইভ স্ট্যাটাস',
    qrTitle: 'AWB বারকোড স্ক্যান করুন',
    qrHint: 'প্যাকেজের AWB বারকোড বা QR কোডের দিকে ক্যামেরা ধরুন',
    qrDenied: 'ক্যামেরার অনুমতি পাওয়া যায়নি। অনুগ্রহ করে ক্যামেরার অনুমতি দিন।',
    labelModalTitle: 'এই শিপমেন্টের নাম দিন', labelPlaceholder: 'যেমন Myntra থেকে জুতো',
    cancel: 'বাতিল', saveLabel: 'নাম সেভ করুন',
  },
};

const LANG_KEY = 'oneparcel_lang';
let currentLang = 'en';
const langListeners = [];

function t(key, vars) {
  let s = (I18N[currentLang] && I18N[currentLang][key]);
  if (s === undefined) s = I18N.en[key];
  if (s === undefined) return key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

function onLangChange(fn) { langListeners.push(fn); }

// Saved choice first, then the browser's language, otherwise English
function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && I18N[saved]) return saved;
  } catch {}
  const prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
  for (const p of prefs) {
    const base = String(p).toLowerCase().split('-')[0];
    if (I18N[base]) return base;
  }
  return 'en';
}

// Keep every line of the main headline on one line, whatever language or font is in use.
// On the main page the changing courier name is handled separately (landing.js).
function fitHero() {
  const h1 = document.querySelector('.hero h1');
  if (!h1) return;
  const hero = h1.closest('.hero');
  const landing = hero.classList.contains('landing');
  h1.style.fontSize = '';
  const cs = getComputedStyle(hero);
  const avail = hero.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const lines = [...h1.children].filter(el => el.tagName === 'SPAN' && !(landing && el.id === 'heroAccent'));
  const widest = Math.max(0, ...lines.map(l => l.getBoundingClientRect().width));
  if (widest > avail) h1.style.fontSize = (parseFloat(getComputedStyle(h1).fontSize) * avail / widest * 0.97) + 'px';
}

function applyTranslations(silent) {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
    if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', el.title);
  });
  renderLangMenu();
  fitHero();
  if (!silent) {
    langListeners.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
    window.dispatchEvent(new Event('resize'));   // lets the header and headings re-fit
    // The Hindi and Bengali fonts may still be downloading: fit again once they arrive
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => window.dispatchEvent(new Event('resize')));
  }
}

function setLang(code) {
  if (!I18N[code] || code === currentLang) { closeLangMenu(); return; }
  currentLang = code;
  try { localStorage.setItem(LANG_KEY, code); } catch {}
  applyTranslations(false);
  closeLangMenu();
}

// ── Language menu (opens from the globe button in the header) ──
let langMenu = null;
let menuScrollY = 0;

function renderLangMenu() {
  if (!langMenu) return;
  langMenu.innerHTML = LANGS.map(l =>
    `<button type="button" class="lang-item${l.code === currentLang ? ' active' : ''}" data-lang="${l.code}" lang="${l.code}">
       <span>${l.label}</span><span class="lang-check">${l.code === currentLang ? '✓' : ''}</span>
     </button>`).join('');
}

function closeLangMenu() {
  if (!langMenu) return;
  langMenu.classList.remove('open');
  const btn = document.getElementById('langBtn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function initLangMenu() {
  const btn = document.getElementById('langBtn');
  if (!btn) return;
  langMenu = document.createElement('div');
  langMenu.className = 'lang-menu';
  langMenu.setAttribute('role', 'menu');
  document.body.appendChild(langMenu);

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = !langMenu.classList.contains('open');
    menuScrollY = window.scrollY;
    langMenu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  langMenu.addEventListener('click', e => {
    const item = e.target.closest('.lang-item');
    if (item) setLang(item.dataset.lang);
  });
  document.addEventListener('click', e => { if (!langMenu.contains(e.target)) closeLangMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangMenu(); });
  window.addEventListener('scroll', () => {
    if (langMenu.classList.contains('open') && Math.abs(window.scrollY - menuScrollY) > 12) closeLangMenu();
  }, { passive: true });
}

// Scripts sit at the end of the page, so the elements already exist and the
// text can be translated straight away (no flash of English).
currentLang = detectLang();
initLangMenu();
applyTranslations(true);
window.addEventListener('resize', fitHero);

// Show the page once everything is sized: after load, and once the fonts have arrived (or 0.8s at most)
function revealPage() {
  window.dispatchEvent(new Event('resize'));
  requestAnimationFrame(() => document.documentElement.classList.add('ready'));
}
window.addEventListener('load', () => {
  const fonts = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise(r => setTimeout(r, 800))]).then(revealPage);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);
if (document.fonts && document.fonts.addEventListener) {
  document.fonts.addEventListener('loadingdone', () => window.dispatchEvent(new Event('resize')));
}
