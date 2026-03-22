// content.js — ye script har page pe inject hoti hai
// Ek hidden div inject karo jisse website detect kar sake ki extension installed hai

const marker = document.createElement("div");
marker.id = "collectra-ext-installed";
marker.setAttribute("data-version", chrome.runtime.getManifest().version);
marker.style.display = "none";
document.documentElement.appendChild(marker);