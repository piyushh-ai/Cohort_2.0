function allFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElems = document.querySelectorAll(".fullElems");
  let allBackBtn = document.querySelectorAll(".back");
  allElems.forEach(function (elems) {
    elems.addEventListener("click", function () {
      allFullElems[elems.id].style.display = "block";
    });
  });

  allBackBtn.forEach(function (elem) {
    elem.addEventListener("click", () => {
      allFullElems[elem.id].style.display = "none";
    });
  });
}
allFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask #taskInput");
  let taskDetailInput = document.querySelector(".addTask form textarea");
  let allTasksDiv = document.querySelector(".alltasks");
  let checkbox = document.querySelector(".addTask #check");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
    renderTask();
  }

  function renderTask() {
    let sum = "";
    currentTask.forEach(function (e, idx) {
      sum += `<div class="currtask" ">
              <h3>${e.task} <span id="important" class="${e.imp}">Imp</span></h3>
              <button id=${idx}>Mark as Completed!</button>
            </div>
            <div class="taskDetails">
              <h1>${e.detail}</h1>
            </div>`;
    });
    allTasksDiv.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      detail: taskDetailInput.value,
      imp: checkbox.checked,
    });

    taskInput.value = "";
    taskDetailInput.value = "";
    checkbox.checked = false;
    renderTask();
  });
  allTasksDiv.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let index = e.target.id;
      currentTask.splice(index, 1);
      renderTask();
      return;
    }
    console.log(e);

    let currTaskDiv = e.target.closest(".currtask");

    if (!currTaskDiv) return;

    let detailDiv = currTaskDiv.nextElementSibling;

    if (detailDiv && detailDiv.classList.contains("taskDetails")) {
      detailDiv.classList.toggle("show");
    }
  });
}
todoList();

function dailyPlanner() {
  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  dayPlanedData = JSON.parse(localStorage.getItem("dayPlanedData")) || {};

  let daySum = "";
  hours.forEach(function (elem, idx) {
    daySum += `<div class="day-plan">
            <p>${elem}</p>
            <input type="text" id=${idx} placeholder="..." value=${
      dayPlanedData[idx] || ""
    }>
          </div>`;
  });

  document.querySelector(".plan").innerHTML = daySum;

  let planInput = document.querySelectorAll(".plan input");

  planInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      console.log(elem.id);
      dayPlanedData[elem.id] = elem.value;
      localStorage.setItem("dayPlanedData", JSON.stringify(dayPlanedData));
    });
  });
}
dailyPlanner();
async function motivationQuote() {
  let response = await fetch("https://api.quotable.io/random");
  let data = await response.json();

  document.querySelector(".quote").textContent = data.content;
  document.querySelector(".author").textContent = "— " + data.author;
}

motivationQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".timer h2");
  let start = document.querySelector(".start");
  let pause = document.querySelector(".pause");
  let reset = document.querySelector(".reset");
  let session = document.querySelector(".session");

  let totalSeconds = 1500;
  let timerInterval = null;
  let isWorkSession = true;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.textContent = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  updateTimer();

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerInterval);
          isWorkSession = false;
          timer.textContent = "05:00";
          session.textContent = "Take a Break";
          session.style.backgroundColor = "rgba(9, 94, 116, 0.2)";
          session.style.color = "var(--soft-blue)";
          session.style.border = "1px solid rgba(9, 94, 116, 0.6)";
          session.style.backdropFilter = "blur(6px)";
          session.style.webkitBackdropFilter = "blur(6px)";

          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerInterval);
          isWorkSession = true;
          timer.textContent = "25:00";
          session.textContent = "Work Session";
          session.style.backgroundColor = "rgba(15, 119, 62, 0.2)";
          session.style.color = "var(--soft-green)";
          session.style.border = "1px solid rgba(15, 119, 62, 0.6)";
          session.style.backdropFilter = "blur(6px)";
          session.style.webkitBackdropFilter = "blur(6px)";

          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }

  start.addEventListener("click", startTimer);
  pause.addEventListener("click", pauseTimer);
  reset.addEventListener("click", resetTimer);
}
pomodoroTimer();

function weather() {
  const api = "80312a7237044921994160302252012";
  let city = "";
  let temp = document.querySelector(".header2 h2");
  let condition = document.querySelector(".header2 h4");
  let precipitation = document.querySelector(".header2 .precipitation");
  let humidity = document.querySelector(".header2 .humidity");
  let wind = document.querySelector(".header2 .wind");
  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var headerCity = document.querySelector(".header1 h4");
  var cityForm = document.querySelector(".city form");
  var cityinput = document.querySelector(".city form input");

  cityForm.addEventListener("submit", function (e) {
    e.preventDefault();
    city = cityinput.value;
    weatherFetch();
  });

  if (localStorage.getItem("city")) {
    city = localStorage.getItem("city");
    weatherFetch();
  }

  async function weatherFetch() {
    let raw = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`
    );
    let weather = await raw.json();
    console.log(weather);
    if (weather.error) {
      if (weather.error.code === 1006) {
        headerCity.textContent = "Please enter correct City name";
        headerCity.style.color = "red";
      } else if (weather.error.code === 1003) {
        headerCity.textContent = "Plese enter your City name to get Weathe";
        headerCity.style.color = "red";
      }
      cityinput.value = "";
    } else {
      temp.textContent = weather.current.temp_c + "°C";
      condition.textContent = weather.current.condition.text;
      precipitation.textContent =
        "Precipitation: " + weather.current.heatindex_c + "%";
      humidity.textContent = "Humidity: " + weather.current.humidity + "%";
      wind.textContent = "Wind: " + weather.current.wind_kph + "km/h";
      headerCity.textContent =
        weather.location.name + ` (${weather.location.region})`;
      headerCity.style.color = "white";

      localStorage.setItem("city", city);
    }
  }

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;

    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}
weather();

function dailyGoals() {
  let form = document.querySelector(".daily-goals-fullpage .addTask form");
  let taskInput = document.querySelector(
    ".daily-goals-fullpage .addTask #taskInput"
  );
  let taskDetailInput = document.querySelector(
    ".daily-goals-fullpage .addTask form textarea"
  );
  let allTasksDiv = document.querySelector(".daily-goals-fullpage .alltasks");
  let checkbox = document.querySelector(
    ".daily-goals-fullpage .addTask #check"
  );

  let currentGoal = [];

  if (localStorage.getItem("currentGoal")) {
    currentGoal = JSON.parse(localStorage.getItem("currentGoal"));
    renderTask();
  }

  function renderTask() {
    let sum = "";
    currentGoal.forEach(function (e, idx) {
      sum += `<div class="currtask" ">
              <h3>${e.task} <span id="important" class="${e.imp}">Imp</span></h3>
              <button id=${idx}>Goal Completed</button>
            </div>
            <div class="taskDetails">
              <h1>${e.detail}</h1>
            </div>`;
    });
    allTasksDiv.innerHTML = sum;
    localStorage.setItem("currentGoal", JSON.stringify(currentGoal));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentGoal.push({
      task: taskInput.value,
      detail: taskDetailInput.value,
      imp: checkbox.checked,
    });

    taskInput.value = "";
    taskDetailInput.value = "";
    checkbox.checked = false;
    renderTask();
  });
  allTasksDiv.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let index = e.target.id;
      currentGoal.splice(index, 1);
      renderTask();
      return;
    }
    console.log(e);

    let currTaskDiv = e.target.closest(".currtask");

    if (!currTaskDiv) return;

    let detailDiv = currTaskDiv.nextElementSibling;

    if (detailDiv && detailDiv.classList.contains("taskDetails")) {
      detailDiv.classList.toggle("show");
    }
  });
}

dailyGoals();
