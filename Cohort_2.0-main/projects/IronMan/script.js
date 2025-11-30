let muted = false;
document.querySelector(".mute").addEventListener("click", () => {
  document.querySelector("video").muted = muted;
  muted = !muted;

  document.querySelector(".mute").innerHTML = `${
    muted
      ? '<i class="ri-volume-up-line"></i>'
      : '<i class="ri-volume-mute-line"></i>'
  }`;
});

document.addEventListener("mousemove", (e) => {
  let body = document.querySelector("body");
  body.style.setProperty("--x", e.clientX + "px");
  body.style.setProperty("--y", e.clientY + "px");
});

let h1 = document.querySelector("h1");
let p = h1.innerText;
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let iteration = 0;
function randomChar() {
  let str = p
    .split("")
    .map((char, idx) => {
      if (idx < iteration) {
        return char;
      }
      return characters.split("")[
        Math.floor(Math.random() * characters.length)
      ];
    })
    .join("");

  h1.innerText = str;
  iteration += 1 / 3;
}

h1.addEventListener("mouseenter", () => {
  setInterval(randomChar, 30);
});
