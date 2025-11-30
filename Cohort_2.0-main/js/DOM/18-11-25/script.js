let btn = document.querySelector("button");
let main = document.querySelector("main");

btn.addEventListener("click", function () {
  var div = document.createElement("div");

  var x = Math.random() * 90;
  var y = Math.random() * 90;

  var c1 = Math.floor(Math.random() * 256);
  var c2 = Math.floor(Math.random() * 256);
  var c3 = Math.floor(Math.random() * 256);

  div.style.height = "100px";
  div.style.width = "100px";
  div.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
  div.style.position = "absolute";
  div.style.top = y + "%";
  div.style.left = x + "%";

  main.appendChild(div);
});
