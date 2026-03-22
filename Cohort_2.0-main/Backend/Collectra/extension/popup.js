const API_BASE = "http://localhost:3000/api";
const APP_URL = "http://localhost:5173";

// ── DOM refs ──────────────────────────────────────────
const screenLogin = document.getElementById("screen-login");
const screenSave = document.getElementById("screen-save");
const screenSuccess = document.getElementById("screen-success");
const openLoginBtn = document.getElementById("open-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const saveBtn = document.getElementById("save-btn");
const viewVaultBtn = document.getElementById("view-vault-btn");
const pageTitle = document.getElementById("page-title");
const pageUrl = document.getElementById("page-url");
const pageFavicon = document.getElementById("page-favicon");
const collSelect = document.getElementById("collection-select");
const errorMsg = document.getElementById("error-msg");
const errorText = document.getElementById("error-text");
const successColName = document.getElementById("success-collection-name");

// ── Init ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  // Har baar fresh sync karo main app se
  const token = await syncFromLocalStorage();

  if (!token) {
    showScreen("login");
    return;
  }

  const valid = await verifyToken(token);
  if (!valid) {
    await clearToken();
    showScreen("login");
    return;
  }

  showScreen("save");
  await Promise.all([loadTab(), loadCollections(token)]);
});

// ── Try to grab token from open Collectra tab ─────────
async function tryGetTokenFromApp() {
  try {
    // Find any open Collectra tab
    const tabs = await chrome.tabs.query({ url: `${APP_URL}/*` });
    if (tabs.length === 0) return null;

    // Ask the tab for the token via content script message
    // The app stores token in localStorage as "collectra_token"
    const result = await chrome.scripting
      .executeScript({
        target: { tabId: tabs[0].id },
        func: () => localStorage.getItem("collectra_token"),
      })
      .catch(() => null);

    const token = result?.[0]?.result;
    if (token) {
      // Save it for future use
      await saveToken(token);
      return token;
    }
    return null;
  } catch {
    return null;
  }
}

// Har baar popup khule — localStorage se fresh token lo
// Agar nahi mila toh chrome.storage bhi clear karo
async function syncFromLocalStorage() {
  try {
    const tabs = await chrome.tabs.query({ url: `${APP_URL}/*` });
    if (tabs.length === 0) return null;

    const result = await chrome.scripting
      .executeScript({
        target: { tabId: tabs[0].id },
        func: () => localStorage.getItem("collectra_token"),
      })
      .catch(() => null);

    const token = result?.[0]?.result;

    if (token) {
      await saveToken(token);
      return token;
    } else {
      // localStorage mein nahi — matlab logout ho gaya
      await clearToken();
      return null;
    }
  } catch {
    return null;
  }
}

// ── Verify token with API ─────────────────────────────
async function verifyToken(token) {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Screen manager ────────────────────────────────────
function showScreen(name) {
  screenLogin.classList.add("hidden");
  screenSave.classList.add("hidden");
  screenSuccess.classList.add("hidden");
  if (name === "login") screenLogin.classList.remove("hidden");
  if (name === "save") screenSave.classList.remove("hidden");
  if (name === "success") screenSuccess.classList.remove("hidden");
}

// ── Token helpers ─────────────────────────────────────
function getStoredToken() {
  return new Promise((res) =>
    chrome.storage.local.get("collectra_token", (d) =>
      res(d.collectra_token || null),
    ),
  );
}
function saveToken(token) {
  return new Promise((res) =>
    chrome.storage.local.set({ collectra_token: token }, res),
  );
}
function clearToken() {
  return new Promise((res) =>
    chrome.storage.local.remove("collectra_token", res),
  );
}

// ── Load current tab ──────────────────────────────────
async function loadTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;
  pageTitle.textContent = tab.title || "Untitled";
  pageUrl.textContent = new URL(tab.url).hostname || tab.url;

  if (tab.favIconUrl) {
    const img = document.createElement("img");
    img.src = tab.favIconUrl;
    img.onerror = () => {};
    pageFavicon.innerHTML = "";
    pageFavicon.appendChild(img);
  }
}

// ── Load collections ──────────────────────────────────
async function loadCollections(token) {
  try {
    const res = await fetch(`${API_BASE}/collections`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (res.status === 401) {
        await clearToken();
        showScreen("login");
      }
      return;
    }
    const data = await res.json();
    (data.data || []).forEach((col) => {
      const opt = document.createElement("option");
      opt.value = col._id;
      opt.textContent = col.name;
      collSelect.appendChild(opt);
    });
  } catch {
    // silently fail — no collections shown
  }
}

// ── Save ──────────────────────────────────────────────
saveBtn.addEventListener("click", async () => {
  const token = await getStoredToken();
  if (!token) {
    showScreen("login");
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;

  if (
    tab.url.startsWith("chrome://") ||
    tab.url.startsWith("chrome-extension://") ||
    tab.url.startsWith("about:")
  ) {
    showError("Cannot save browser pages. Navigate to a website first.");
    return;
  }

  hideError();
  setSaving(true);

  try {
    const body = new FormData();
    body.append("url", tab.url);
    if (collSelect.value) body.append("collectionId", collSelect.value);

    const res = await fetch(`${API_BASE}/items`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        await clearToken();
        showScreen("login");
        return;
      }
      throw new Error(data.message || "Failed to save item.");
    }

    const colLabel = collSelect.options[collSelect.selectedIndex]?.text;
    successColName.textContent = collSelect.value
      ? `Added to "${colLabel}"`
      : "Added to Uncategorized";
    showScreen("success");
  } catch (err) {
    showError(err.message || "Something went wrong. Please try again.");
  } finally {
    setSaving(false);
  }
});

// ── Buttons ───────────────────────────────────────────
logoutBtn.addEventListener("click", async () => {
  await clearToken();
  showScreen("login");
});
openLoginBtn.addEventListener("click", () =>
  chrome.tabs.create({ url: APP_URL }),
);
viewVaultBtn.addEventListener("click", () =>
  chrome.tabs.create({ url: APP_URL }),
);

// ── Helpers ───────────────────────────────────────────
function setSaving(on) {
  saveBtn.disabled = on;
  saveBtn.innerHTML = on
    ? `<span class="spinner"></span> Saving...`
    : `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
         <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
       </svg> Save to Vault`;
}
function showError(msg) {
  errorText.textContent = msg;
  errorMsg.classList.remove("hidden");
}
function hideError() {
  errorMsg.classList.add("hidden");
}
