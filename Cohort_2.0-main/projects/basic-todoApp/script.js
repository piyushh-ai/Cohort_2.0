let input = document.querySelector(".input-text input");
let button = document.querySelector(".input-text button");
let list = document.querySelector(".tasks ol");
let errmsg = document.querySelector(".error");

button.addEventListener("click", () => {
  let value = input.value.trim();
  if (value === "") {
    errmsg.style.display = "block";
  } else {
    let li = document.createElement("li");
    let dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    li.textContent = value;
    list.appendChild(li);
    li.appendChild(dltBtn);
    dltBtn.addEventListener("click", () => {
      li.remove();
    });

    errmsg.style.display = "none";
    input.value = "";
  }
});
