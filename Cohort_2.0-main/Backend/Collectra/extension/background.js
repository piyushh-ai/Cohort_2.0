// Collectra — Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log("Collectra extension installed!");
});

// Frontend app se token receive karo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_TOKEN") {
    chrome.storage.local.set({ collectra_token: message.token }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.type === "CLEAR_TOKEN") {
    chrome.storage.local.remove("collectra_token", () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
