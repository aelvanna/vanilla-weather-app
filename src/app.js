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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-info");
  let forecastHTML = `<span class="row" id="forecast-spacing">`;

  forecast.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      `
      <div class="forecast-container col-1">
        <h6 id="forecast-day">${formatDay(forecastDay.time)}</h6>
        <img
          src= ${forecastDay.condition.icon_url}
          id="forecast-icon"
          alt=""
          width="50"
        />
        <div class="forecast-temp-info">
          <span class="d-flex forecast-temp">
            <h6 id="temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</h6>
            <h6 id="temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</h6>
          </span>
        </div>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</span>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${weatherApiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherInfo(response) {
  let temperatureElement = Math.round(response.data.temperature.current);
  let humidityElement = response.data.temperature.humidity;
  let windElement = Math.round(response.data.wind.speed);
  let descriptionElement = response.data.condition.description;
  let dateElement = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#current-temperature").innerHTML = temperatureElement;
  document.querySelector("#humidity-value").innerHTML = `${humidityElement}%`;
  document.querySelector("#wind-value").innerHTML = `${windElement} km/h`;
  document.querySelector("#current-weather-description").innerHTML =
    descriptionElement;
  document.querySelector("#last-updated").innerHTML = dateElement;
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}

let weatherApiKey = "8teb9f1fao00b420ac25b3a87666cdf6";

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${weatherApiKey}`;
  axios.get(apiUrl).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

function searchCurrentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${weatherApiKey}`;
  axios.get(url).then(displayWeatherInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Brisbane City");
