// ─── Background Service Worker ────────────────────────────

// PING handler — website se extension detect karne ke liye
// Collectra website chrome.runtime.sendMessage(EXTENSION_ID, {type:"PING"}) bhejti hai
// Agar extension installed hai to yahan response milega
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message?.type === "PING") {
    sendResponse({ installed: true, version: chrome.runtime.getManifest().version });
  }
  return true; // async response ke liye
});

// Internal messages bhi handle karo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "PING") {
    sendResponse({ installed: true });
  }
  return true;
});