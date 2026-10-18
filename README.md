# OneParcel

Track parcels from many couriers on one page.

OneParcel is a small web tool for people who order online and track shipments often. You choose the courier, type or paste the tracking number, and it opens that courier's own tracking page in a new tab. It does not fetch or show tracking status itself. It saves you from finding the right courier site and the right input box each time.

**Live site:** oneprcel.vercel.app

| Courier | Number it asks for | Opens |
| --- | --- | --- |
| BlueDart | AWB number | bluedart.com |
| Delhivery | AWB number | delhivery.com |
| Ekart | AWB number | ekartlogistics.com |
| DHL | AWB number | dhl.com |
| Xpressbees | AWB number | xpressbees.com |
| Valmo | AWB number | valmo.in |
| FedEx | Tracking number | fedex.com |
| Aramex | Shipment number | aramex.com |
| UPS | Tracking number | ups.com |
| Amazon Shipping | Tracking number | track.amazon.in |

OneParcel puts your number into each courier's tracking link. If a courier changes its link format, that courier will need updating in `js/couriers.js`.

## Features

**Tracking**
- Pick a courier, enter the number and open the official tracking page. Pressing Enter also works.
- No courier is selected by default, so you always choose one.
- Linking to `track.html?courier=valmo` opens the tracking page with that courier already selected.
- Scan the barcode on a package with your phone camera, or paste the number from your clipboard.
- Bulk mode: paste several numbers, one per line, and open all of them in new tabs.
- Share: copy a courier's tracking link to your clipboard.

**Recent shipments**
- The last 5 shipments you tracked are saved and shown on the tracking page.
- Pin up to 5 shipments to keep them at the top.
- Rename a shipment, for example "Shoes", and remove ones you no longer need.
- Tap a saved shipment to open its tracking page again.

**Interface**
- Light and dark theme, remembered between visits.
- Layout for both phones and desktop.

## Privacy

- There is no account, no sign-up and no server of your own.
- Your recent and pinned shipments, and your theme choice, are saved only in your browser's `localStorage`. They never leave your device.
- The site uses **Vercel Web Analytics** for basic page-view counts.
- When you open a tracking page, the courier receives the tracking number as part of the link. That is how the redirect works.

## Browser notes

- **Camera scanning** needs a secure page (https or localhost) and camera permission. Browsers with built-in barcode detection can read QR codes and common barcodes. Other browsers load a small QR-code library (`jsQR`) from a CDN, and that fallback reads QR codes only.
- **Paste button** needs clipboard permission. If the browser blocks it, paste into the box yourself.
- **Bulk mode** opens many tabs at once, so your browser may block some of them. Allow pop-ups for the site if that happens.
- **Xpressbees** may ask you to solve a captcha on its own website. OneParcel shows a short note about this when you select it.

## Built with

Plain HTML, CSS and JavaScript. There is no framework and no build step. Fonts (Syne, DM Sans and DM Mono) load from Google Fonts.

## Project structure

```
index.html            main page
track.html            tracking page
css/
  base.css            colours, theme variables, shared styles
  nav.css             header and theme toggle
  hero.css            hero section
  landing.css         main page sections
  tracker.css         tracking card and courier buttons
  recent.css          recent and pinned list
  modals.css          rename dialog, scanner, install banner
  features.css        feature cards and footer
js/
  couriers.js         courier list, tracking links and colours
  tracker.js          tracking page logic
  recent.js           recent and pinned shipments
  qr.js               barcode and QR scanner
  theme.js            light and dark theme
  landing.js          main page logic
  pwa.js              install prompt
```

## Run it locally

Open `index.html` in a browser. To test the camera scanner, serve the folder over http instead:

```
python3 -m http.server
```

Then open http://localhost:8000.

## Deploy

OneParcel is a static site, so any static host works. It is hosted on Vercel and redeploys automatically when you push to this repository. If your files sit in a subfolder, set that folder as the **Root Directory** in the Vercel project settings. To use Vercel Web Analytics, enable it in the project's Analytics tab.

## Add a courier

1. Open `js/couriers.js` and copy an existing entry. Give it a new key and change its details:

```js
mycourier: {
  name: 'My Courier',
  sub: 'Enter your My Courier AWB number below and get redirected to live shipment status.',
  placeholder: 'e.g. 1234567890',
  label: 'Airway Bill (AWB) number',
  btnLabel: 'Track My Courier shipment',
  url: (v) => `https://example.com/track/${encodeURIComponent(v)}`,
  hex: '#0066CC', hexDark: '#0052a3',
  glow: 'rgba(0,102,204,0.10)', tagBg: 'rgba(0,102,204,0.08)',
  tagBorder: 'rgba(0,102,204,0.25)', tagColor: '#6aabf0',
  btnActiveBorder: 'rgba(0,102,204,0.5)', btnActiveBg: 'rgba(0,102,204,0.06)',
  inputFocusBorder: 'rgba(0,102,204,0.5)', inputFocusShadow: '0 0 0 3px rgba(0,102,204,0.1)',
  cardBorder: 'rgba(0,102,204,0.4)',
},
```

2. Add a button for it in `track.html`, next to the other courier buttons:

```html
<button class="courier-btn" id="btn-mycourier" onclick="selectCourierAnimated('mycourier')">
  <span class="courier-dot" style="background:#0066CC;"></span>My Courier
</button>
```

The courier list on the main page builds itself from `couriers.js`, so it needs no change.

## Limitations

- OneParcel only redirects. It cannot show a shipment's status, send notifications or track in the background.
- Some courier websites, such as Shadowfax, do not accept a number from another site, so they can't be supported this way.

## Disclaimer

OneParcel is an independent project. It is not affiliated with or endorsed by any courier, and it only links to their official tracking pages.

## Author

Built by [Tausique](https://github.com/sheikhtausique).
