function rightClickDiv() {
  let right = document.querySelector(".right-click");
  document.querySelector("body").addEventListener("contextmenu", (dets) => {
    event.preventDefault();
    console.log(dets.x);
    right.style.display = "block";
    right.style.top = dets.y + "px";
    right.style.left = dets.x + "px";
  });
  document.querySelector("body").addEventListener("click", (dets) => {
    event.preventDefault();
    right.style.display = "none";
  });
}
let windowDiv = document.querySelector(".window-div");
let icon = document.querySelector("#window");

let counter = 0;
icon.addEventListener("click", () => {
  if (counter % 2 === 0) {
    windowDiv.style.display = "block";
  } else {
    windowDiv.style.display = "none";
  }
  counter += 1;
});

rightClickDiv();
