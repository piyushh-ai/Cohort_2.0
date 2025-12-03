let h1 = document.querySelector(".text h1");
let text = h1.innerText;

let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let iteration = 0;
h1.addEventListener("mouseenter", () => {
  function animateText() {
    let str = text
      .split("")
      .map((char, idx) => {
        if (idx < iteration) {
          return char;
        }
        return character.split("")[Math.floor(Math.random() * 52)];
      })
      .join("");

    h1.innerHTML = str;
    iteration += 0.25;
  }
  setInterval(animateText, 50);
});
