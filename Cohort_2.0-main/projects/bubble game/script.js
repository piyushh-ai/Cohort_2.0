let timer = 60;
let score = 0;
let hitNum = 0;


function increaseScore() {
  score += 10;
  document.querySelector("#scoreval").textContent = score;
}

function makeBubble() {
  let clutter = "";

  for (let i = 1; i < 251; i++) {
    let rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }

  document.querySelector(".pbtm").innerHTML = clutter;
}

function runTIme() {
  var inter = setInterval(function () {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(inter);
      document.querySelector(
        ".pbtm"
      ).innerHTML = `<h1>Game Over<br> Your Score : ${score} </h1> `;
    }
    document.querySelector("#time-up").textContent = timer;
  }, 1000);
}

function hit() {
  hitNum = Math.floor(Math.random() * 10);
  document.querySelector("#hitval").textContent = hitNum;
}

document.querySelector(".pbtm").addEventListener("click", function (dets) {
  if (hitNum === Number(dets.target.textContent)) {
    makeBubble();
    hit();
    increaseScore();
  } else {
    document.querySelector(
      ".pbtm"
    ).innerHTML = `<h1>Game Over<br> Your Score : ${score} </h1> `;
    timer = 0;
    setTimeout(function () {
      location.reload();
    }, 3000);
  }
});

hit();
runTIme();
makeBubble();





