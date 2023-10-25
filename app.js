const API_KEY = '8ee10547e25804fc1a743e6061ff1c84';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const highElement = document.getElementById('high');
const lowElement = document.getElementById('low');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;
    getWeatherData(city);
});

function getWeatherData(city) {
    fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.innerHTML = `${convertKelvinToFahrenheit(data.main.temp)}°F <i class="wi ${iconMap[data.weather[0].icon]}"></i>`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            highElement.textContent = convertKelvinToFahrenheit(data.main.temp_max);
            lowElement.textContent = convertKelvinToFahrenheit(data.main.temp_min);
        })
        .catch(error => {
            console.error(error);
        });
}

function convertKelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

const iconMap = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-cloudy',
  '03d': 'wi-cloud',
  '04d': 'wi-cloudy',
  '09d': 'wi-showers',
  '10d': 'wi-day-rain',
  '11d': 'wi-day-thunderstorm',
  '13d': 'wi-day-snow',
  '50d': 'wi-fog',
  '01n': 'wi-night-clear',
  '02n': 'wi-night-alt-cloudy',
  '03n': 'wi-cloud',
  '04n': 'wi-cloudy',
  '09n': 'wi-showers',
  '10n': 'wi-night-alt-rain',
  '11n': 'wi-night-alt-thunderstorm',
  '13n': 'wi-night-alt-snow',
  '50n': 'wi-night-fog',
};

