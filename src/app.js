function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayWeatherInfo(response) {
  let temperatureElement = Math.round(response.data.temperature.current);
  let humidityElement = response.data.temperature.humidity;
  let windElement = Math.round(response.data.wind.speed);
  let descriptionElement = response.data.condition.description;
  let dateElement = formatDate(response.data.time * 1000);

  document.querySelector("#current-temperature").innerHTML = temperatureElement;
  document.querySelector("#humidity-value").innerHTML = humidityElement + "%";
  document.querySelector("#wind-value").innerHTML = windElement + "km/h";
  document.querySelector("#current-weather-description").innerHTML =
    descriptionElement;
  document.querySelector("#last-updated").innerHTML = dateElement;
}

let weatherApiKey = "8teb9f1fao00b420ac25b3a87666cdf6";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Brisbane&key=${weatherApiKey}`;

axios.get(apiUrl).then(displayWeatherInfo);

let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=Brisbane&key=${weatherApiKey}`;

console.log(apiUrlForecast);
console.log(apiUrl);
