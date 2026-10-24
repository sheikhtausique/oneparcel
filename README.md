# OneParcel

Track parcels from many couriers on one page. Available in English, Hindi and Bengali.

**Version 1.4**

OneParcel is a small web tool for people who order online and track shipments often. You choose the courier, type or paste the tracking number, and it opens that courier's own tracking page in a new tab. It does not fetch or show tracking status itself. It saves you from finding the right courier site and the right input box each time.

**Live site:** [oneparcel.vercel.app](https://oneparcel.vercel.app)

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

## What's new in 1.4

- **Three languages:** English, Hindi and Bengali, with a language button in the header.
- **Clean URLs:** the tracking page is now `/track` instead of `/track.html`, for example `/track?courier=valmo`. The old `.html` links still work and redirect.
- **Recent list fixes:**
  - Tapping a saved shipment now only opens its tracking page. It no longer fills the entry form.
  - Names you give shipments are saved separately, so they survive reloads, stay visible when a shipment is pinned, and come back if you track the same number again.
  - Remove now works on pinned shipments, and the saved list shows as soon as the page opens.
- **Courier notices:** BlueDart shows a note that its website can be unavailable (with DHL as an alternative), and Xpressbees shows its captcha note.
- **Smoother home page:** the courier name and colours now change together, calmly, and the header no longer jumps or flashes when the page loads.
- **Branding:** a favicon (the OneParcel logo) and the tab title "OneParcel by CuriosityLabs".
- A GitHub link in the footer of both pages.

## Features

**Tracking**
- Pick a courier, enter the number and open the official tracking page. Pressing Enter also works.
- No courier is selected by default, so you always choose one.
- Linking to `/track?courier=valmo` opens the tracking page with that courier already selected.
- Scan the barcode on a package with your phone camera, or paste the number from your clipboard.
- Bulk mode: paste several numbers, one per line, and open all of them in new tabs.
- Share: copy a courier's tracking link to your clipboard.
- Short notices for couriers whose websites have known quirks (BlueDart and Xpressbees).

**Recent shipments**
- The last 5 shipments you tracked are saved and shown on the tracking page.
- Pin up to 5 shipments to keep them at the top.
- Rename a shipment, for example "Shoes". The name stays whether the shipment is pinned or not.
- Tap a saved shipment to open its tracking page again. The entry form is left alone.
- Remove a shipment to delete it and its name. "Clear all" removes everything, including pinned shipments.

**Languages**
- English, Hindi (हिन्दी) and Bengali (বাংলা).
- Change the language from the globe button in the header. The choice is remembered.
- On a first visit the site follows the browser's language, and falls back to English.
- Courier names and the tab title stay the same in every language.
- Corrections to the Hindi and Bengali wording are welcome.

**Interface**
- Light and dark theme, remembered between visits.
- Layout for both phones and desktop. The header stays on one row and scales down to fit small screens.
- On the main page, the headline name and colours move through the couriers, in order of colour, every few seconds. The page stays still if the device is set to reduce motion.

## Privacy

- There is no account, no sign-up and no server of your own.
- Your recent and pinned shipments, their names, and your theme and language choice are saved only in your browser's `localStorage`. They never leave your device.
- The site uses **Vercel Web Analytics** for basic page-view counts.
- When you open a tracking page, the courier receives the tracking number as part of the link. That is how the redirect works.

## Browser notes

- **Camera scanning** needs a secure page (https or localhost) and camera permission. Browsers with built-in barcode detection can read QR codes and common barcodes. Other browsers load a small QR-code library (`jsQR`) from a CDN, and that fallback reads QR codes only.
- **Paste button** needs clipboard permission. If the browser blocks it, paste into the box yourself.
- **Bulk mode** opens many tabs at once, so your browser may block some of them. Allow pop-ups for the site if that happens.
- **Xpressbees** may ask you to solve a captcha on its own website. OneParcel shows a short note about this when you select it.
- **BlueDart's website** can occasionally be unavailable. OneParcel shows a short note suggesting you try the DHL website instead.

## Built with

Plain HTML, CSS and JavaScript. There is no framework and no build step. Fonts (Syne, DM Sans, DM Mono, and Noto Sans for Hindi and Bengali) load from Google Fonts.

## Project structure

```
index.html            main page
track.html            tracking page (served at /track)
vercel.json           clean URLs for Vercel
favicon/              site icons (favicon.svg, favicon.ico, apple-touch-icon.png)
css/
  base.css            colours, theme variables, shared styles, Hindi and Bengali text rules
  nav.css             header, language menu and theme toggle
  hero.css            hero section and background glow
  landing.css         main page sections and headline animation
  tracker.css         tracking card and courier buttons
  recent.css          recent and pinned list
  modals.css          rename dialog, scanner, install banner
  features.css        feature cards and footer
js/
  couriers.js         courier list, tracking links and colours
  i18n.js             translations (English, Hindi, Bengali) and the language menu
  tracker.js          tracking page logic
  recent.js           recent and pinned shipments, and their names
  qr.js               barcode and QR scanner
  theme.js            light and dark theme
  landing.js          main page logic and headline animation
  pwa.js              install prompt code
```

## Run it locally

The pages link to each other without `.html` (for example `/track`), so use a local server that understands clean URLs. Python's `http.server` does not, and `/track` will give a 404 there.

```
npx serve
```

Then open the address it prints. `npx vercel dev` also works. The camera scanner needs https or localhost, which both of these give you.

## Deploy

OneParcel is a static site, so any static host works. It is hosted on Vercel and redeploys automatically when you push to this repository.

- If your files sit in a subfolder, set that folder as the **Root Directory** in the Vercel project settings, and keep `vercel.json` in that same folder.
- `vercel.json` turns on clean URLs (`/track` instead of `/track.html`) and removes trailing slashes.
- To use Vercel Web Analytics, enable it in the project's Analytics tab.

## Add a courier

1. Open `js/couriers.js` and copy an existing entry. Give it a new key and change its details:

```js
mycourier: {
  name: 'My Courier',
  i18n: { label: 'labelAwb', sub: 'subAwb', btn: 'btnTrack' },
  placeholder: 'e.g. 1234567890',
  url: (v) => `https://example.com/track/${encodeURIComponent(v)}`,
  hex: '#0066CC', hexDark: '#0052a3',
  glow: 'rgba(0,102,204,0.10)', tagBg: 'rgba(0,102,204,0.08)',
  tagBorder: 'rgba(0,102,204,0.25)', tagColor: '#6aabf0',
  btnActiveBorder: 'rgba(0,102,204,0.5)', btnActiveBg: 'rgba(0,102,204,0.06)',
  inputFocusBorder: 'rgba(0,102,204,0.5)', inputFocusShadow: '0 0 0 3px rgba(0,102,204,0.1)',
  cardBorder: 'rgba(0,102,204,0.4)',
},
```

The `i18n` line picks which wording the page uses. The text itself lives in `js/i18n.js`, so it is translated automatically:

| Part | Options |
| --- | --- |
| `label` (name of the number) | `labelAwb`, `labelTracking`, `labelShipment` |
| `sub` (sentence under the headline) | `subAwb`, `subTracking`, `subShipment` |
| `btn` (track button) | `btnTrack` ("Track {name} shipment"), `btnTrackName` ("Track {name}") |

Older entries also have `sub`, `label` and `btnLabel` fields. The page no longer reads them.

2. Add a button for it in `track.html`, next to the other courier buttons:

```html
<button class="courier-btn" id="btn-mycourier" onclick="selectCourierAnimated('mycourier')">
  <span class="courier-dot" style="background:#0066CC;"></span>My Courier
</button>
```

3. Optional: add a link to the courier's website in the footer of `index.html` and `track.html`.
4. Optional: new couriers join the end of the main page's colour cycle automatically. To place one by colour, add its key to the `ORDER` list in `js/landing.js`.

The courier list on the main page builds itself from `couriers.js`, so it needs no change.

## Add a courier notice

1. In `track.html`, copy the `bluedartWarning` block, give it a new id, and set a new `data-i18n` key.
2. In `js/i18n.js`, add that key with the text in English, Hindi and Bengali.
3. In `js/tracker.js`, add the courier and the block's id to the `notices` list.

## Add a language

1. In `js/i18n.js`, add the language to the `LANGS` list, for example `{ code: 'ta', label: 'தமிழ்' }`.
2. Copy the whole `en` block inside `I18N`, rename it to the new code, and translate each value. Keep the `{name}` and `{x}` markers and the `<span>` and `<strong>` tags as they are.
3. If the language uses a script that the page fonts don't cover, add a matching Noto Sans font to the Google Fonts link in `index.html` and `track.html` and to the font variables in `css/base.css`. If its letters join together like Hindi and Bengali, add its code to the `html:lang(...)` rules at the bottom of `css/base.css`.

## Adjust the home page animation

- **How long each courier stays:** `HOLD` in `js/landing.js`, in milliseconds. It is `5000`.
- **How long colours take to change:** `--glide` at the top of `css/landing.css`. It is `1s`.
- **Turn it off:** set `CYCLE` to `false` in `js/landing.js` and the headline stays still.

## Limitations

- OneParcel only redirects. It cannot show a shipment's status, send notifications or track in the background.
- Some courier websites, such as Shadowfax, do not accept a number from another site, so they can't be supported this way.
- `pwa.js` contains install-prompt code, but browsers only offer to install a site that has a web app manifest, and this project doesn't include one yet.

## Disclaimer

OneParcel is an independent project. It is not affiliated with or endorsed by any courier, and it only links to their official tracking pages.

## Author

Built by [Tausique](https:/tr.ee/profiles). Powered by Curiosity.
