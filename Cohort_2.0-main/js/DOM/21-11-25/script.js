let body = document.querySelector("body");

let sounds = {
  KeyA: "./audio/a.mp3",
  KeyB: "./audio/b.mp3",
  KeyC: "./audio/c.mp3",
  KeyD: "./audio/d.mp3",
  KeyE: "./audio/e.mp3",
  KeyF: "./audio/f.mp3",
  KeyG: "./audio/g.mp3",
  KeyH: "./audio/h.mp3",
  KeyI: "./audio/i.mp3",
};

body.addEventListener("keydown", function (dets) {
  playSound(dets.code);
});

function playSound(key) {
  if (sounds[key]) {
    let audio = new Audio(sounds[key]);
    audio.play();
  }
  let keyDiv = document.querySelector(`.key[data-key="${key}"]`);
  keyDiv.classList.add("active");

  setTimeout(() => {
    keyDiv.classList.remove("active");
  }, 150);
}

document.querySelectorAll(".key").forEach(function (elem) {
   elem.addEventListener("click", function () {
    let key = elem.getAttribute("data-key");
    playSound(key);
  });
});
