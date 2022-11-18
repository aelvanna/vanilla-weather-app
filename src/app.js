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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast-info");

  let forecastHTML = `<span class="row" id="forecast-spacing">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-1">
        <h6 id="forecast-day">${day}</h6>
        <img
          src="http://openweathermap.org/img/wn/10d@2x.png"
          id="forecast-icon"
          alt=""
          width="80"
        />
        <div class="forecast-temp-info">
          <span class="d-flex forecast-temp">
            <h6 id="temperature-min">22°</h6>
            <h6 id="temperature-max">26°</h6>
          </span>
        </div>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</span>`;

  forecastElement.innerHTML = forecastHTML;
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
  document.querySelector("#humidity-value").innerHTML = humidityElement + "%";
  document.querySelector("#wind-value").innerHTML = windElement + "km/h";
  document.querySelector("#current-weather-description").innerHTML =
    descriptionElement;
  document.querySelector("#last-updated").innerHTML = dateElement;
  iconElement.setAttribute("src", response.data.condition.icon_url);
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

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

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
displayForecast();
