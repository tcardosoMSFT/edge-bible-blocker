# ✝ Bible Site Blocker – Edge/Chrome Extension

A browser extension that blocks distracting websites and displays inspirational Bible verses to encourage digital wellness through spiritual motivation.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green)
![Edge](https://img.shields.io/badge/Edge-Extension-blue)

## ✨ Features

- **Website Blocking** – Block distracting sites using Chrome's Declarative Net Request API
- **Bible Verses** – 32 curated verses across 5 categories (Wisdom, Temptation, Encouragement, Peace, Purpose)
- **Beautiful Block Page** – Purple gradient design with animated shield icon and verse cards
- **Popup Manager** – Add/remove sites from the toolbar popup with real-time updates
- **Cross-Device Sync** – Blocked sites sync across devices via Chrome Storage Sync
- **Zero Dependencies** – Pure vanilla JavaScript and CSS, no external libraries

## 🚀 Getting Started

### Install from Source

1. Clone this repository:
   ```bash
   git clone https://github.com/tcardosoMSFT/edge-bible-blocker.git
   ```
2. Open **Edge** → `edge://extensions` (or **Chrome** → `chrome://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked** and select the cloned folder

### Default Blocked Sites

The extension ships with these sites blocked by default:

- facebook.com
- twitter.com
- tiktok.com
- instagram.com
- reddit.com

You can add or remove sites at any time from the popup.

## 🛠 How It Works

1. **Click the extension icon** → manage your blocked sites list
2. **Visit a blocked site** → you're redirected to a beautiful block page with a random Bible verse
3. **Browse verses** → tap "New Verse" for encouragement or "Go Back" to return

### Architecture

| Component | File | Purpose |
|-----------|------|---------|
| Service Worker | `background.js` | Manages blocking rules via Declarative Net Request API |
| Popup UI | `popup.html/js/css` | Add/remove blocked sites |
| Block Page | `blocked.html/js/css` | Displayed when a blocked site is visited |
| Verses DB | `bible-verses.js` | 32 verses across 5 categories |

## 📖 Verse Categories

| Category | Count | Example |
|----------|-------|---------|
| Wisdom & Guidance | 7 | Proverbs 3:5-6 |
| Overcoming Temptation | 6 | 1 Corinthians 10:13 |
| Encouragement & Strength | 7 | Philippians 4:13 |
| Peace & Trust | 6 | John 14:27 |
| Purpose & Calling | 8 | Jeremiah 29:11 |

## 📄 License

MIT
