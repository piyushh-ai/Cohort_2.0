# Collectra Extension — Setup Guide

## Folder Structure
```
collectra-extension/
├── manifest.json       ✅ ready
├── popup.html          ✅ ready
├── popup.css           ✅ ready
├── popup.js            ✅ ready
├── background.js       ✅ ready
└── icons/
    ├── icon16.png      ✅ ready
    ├── icon48.png      ✅ ready
    └── icon128.png     ✅ ready
```

---

## Step 1 — Chrome mein load karo

1. Chrome mein jao: `chrome://extensions/`
2. Top-right corner mein **"Developer mode"** toggle ON karo
3. **"Load unpacked"** button click karo
4. `collectra-extension` folder select karo
5. Extension aa jayegi — **Extension ID copy kar lo** (e.g. `abcdefgh...`)

---

## Step 2 — Backend update karo

**`middlewares/user.middleware.js`** — `user.middleware.js` file se replace karo (Bearer token support)

**`server.js` / `app.js`** — CORS wali line `cors-patch.js` se replace karo

---

## Step 3 — Frontend update karo

**`.env.local`** mein add karo:
```
VITE_EXTENSION_ID=yahan_step1_ka_id_daalo
```

**`useAuth.js`** mein — `useAuth-patch.js` dekho, login function update karo

---

## Step 4 — Test karo

1. Backend start karo: `npm run dev`
2. Frontend start karo: `npm run dev`
3. Collectra app mein **login** karo
4. Koi bhi website pe jao (e.g. `https://github.com`)
5. Extension icon click karo
6. Collection choose karo (optional)
7. **"Save to Vault"** click karo
8. Collectra dashboard mein item check karo ✅

---

## Kya kaam karta hai

- ✅ Current page ka title + URL + favicon dikhata hai
- ✅ Collections dropdown load hoti hai
- ✅ 1 click se save
- ✅ Success/Error screen
- ✅ Login redirect agar logged out ho
- ✅ Logout button
