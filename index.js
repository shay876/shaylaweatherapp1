function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayindex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[dayindex]} ${hours}:${minutes}`;
}

let currentTime = new Date();
let h6 = document.querySelector("h6");
h6.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let city = document.querySelector("#usercityInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", search);

//
function fahrenheitChange(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#tempMain");
  let fahrenheitTemperature = Math.round(temperature.innerHTML * 1.8 + 32);
  temperature.innerHTML = `${fahrenheitTemperature}`;
}

let fahrenheit = document.querySelector("#fahrenheitTemp");
fahrenheit.addEventListener("click", fahrenheitChange);

function celsiusChange(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#tempMain");
  let celsiusTemperature = Math.round((temperature.innerHTML - 32) / 1.8);
  temperature.innerHTML = `${celsiusTemperature}`;
}

let celsius = document.querySelector("#celsiusTemp");
celsius.addEventListener("click", celsiusChange);

//current temp in city search

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  let city = response.data.name;
  // let message = `It is ${temperature} degrees in ${city}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let h2 = document.querySelector("h2");
  h2.innerHTML = temperature;
  console.log(response);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";
let city = document.querySelector("#city-search-input");

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);

//current location
function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentLocation);
