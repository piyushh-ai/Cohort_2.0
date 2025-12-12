let input = document.querySelector(".search input");
let button = document.querySelector(".search button");
let temprature = document.querySelector("#temp");
let errDIv = document.querySelector(".err");
let text = document.querySelector(".text h1");


async function getWeather(city) {
  try {
    let apiKey = `b92e57938eaebc6ded1fcf3a2f5b4bc3`;
    let rawData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    let data = await rawData.json();
    console.log(data);
    temprature.innerHTML = data.main.temp + "°C";
    errDIv.innerHTML = "";

    if(data.main.temp < 10){
        text.innerHTML = "Too Cold out there..."
    } else if(data.main.temp > 35){
        text.innerHTML = "Too hot out there..."
    } else{
        text.innerHTML = "Normal temprature"

    }
  } catch (error) {
    if (temprature.innerHTML === "") {
      errDIv.innerHTML = "Please enter city name";
    } else {
      errDIv.innerHTML = "Please enter correct city name";
    }
  }
}

button.addEventListener("click", () => {
  let city = input.value;

  getWeather(city);
  input.value = "";
});
