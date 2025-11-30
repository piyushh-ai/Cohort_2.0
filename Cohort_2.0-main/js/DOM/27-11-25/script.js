let p = document.querySelector("h1");
let text = p.innerText;

let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let iteration = 0;

p.addEventListener("mouseover", () => {
  function animateText() {
    let str = text
      .split("")
      .map((char, idx) => {
        if (idx < iteration) {
          return char;
        }
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");
    p.innerText = str;

    iteration += 1 / 3;
  }

  setInterval(animateText, 30);
});
