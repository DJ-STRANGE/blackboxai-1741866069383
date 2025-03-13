// Weather icons mapping
const weatherIcons = {
    'Clear': 'fa-sun',
    'Clouds': 'fa-cloud',
    'Rain': 'fa-cloud-rain',
    'Drizzle': 'fa-cloud-rain',
    'Thunderstorm': 'fa-bolt',
    'Snow': 'fa-snowflake',
    'Mist': 'fa-smog',
    'Smoke': 'fa-smog',
    'Haze': 'fa-smog',
    'Dust': 'fa-smog',
    'Fog': 'fa-smog',
    'Sand': 'fa-smog',
    'Ash': 'fa-smog',
    'Squall': 'fa-wind',
    'Tornado': 'fa-wind'
};

// Mock weather data for demonstration
const mockWeatherData = {
    'London': {
        name: 'London',
        sys: { country: 'GB' },
        weather: [{ main: 'Clouds', description: 'scattered clouds' }],
        main: {
            temp: 18,
            feels_like: 17,
            humidity: 72,
            pressure: 1012
        },
        wind: { speed: 4.12 }
    },
    'Tokyo': {
        name: 'Tokyo',
        sys: { country: 'JP' },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        main: {
            temp: 23,
            feels_like: 24,
            humidity: 65,
            pressure: 1015
        },
        wind: { speed: 2.57 }
    },
    'New York': {
        name: 'New York',
        sys: { country: 'US' },
        weather: [{ main: 'Rain', description: 'light rain' }],
        main: {
            temp: 15,
            feels_like: 14,
            humidity: 78,
            pressure: 1008
        },
        wind: { speed: 5.14 }
    }
};

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Event Listeners
searchButton.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Clear input on focus
cityInput.addEventListener('focus', () => {
    cityInput.value = '';
});

// Initialize with a default city
window.addEventListener('load', () => {
    fetchWeatherData('London');
});

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        showError('Please enter a city name');
    }
}

function fetchWeatherData(city) {
    showLoading();
    hideError();
    
    // Simulate API delay
    setTimeout(() => {
        const cityData = mockWeatherData[city];
        if (cityData) {
            displayWeatherData(cityData);
            cityInput.blur(); // Remove focus from input after successful search
        } else {
            showError('City not found. Try London, Tokyo, or New York');
        }
        hideLoading();
    }, 500);
}

function displayWeatherData(data) {
    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';
    
    const icon = weatherIcons[data.weather[0].main] || 'fa-cloud';
    const timestamp = new Date().toLocaleTimeString();
    
    weatherCard.innerHTML = `
        <div class="text-right text-sm text-gray-500">Last updated: ${timestamp}</div>
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-800">${data.name}, ${data.sys.country}</h2>
            <i class="fas ${icon} weather-icon"></i>
        </div>
        <div class="mt-4">
            <div class="temperature">${Math.round(data.main.temp)}°C</div>
            <p class="text-lg text-gray-600 capitalize">${data.weather[0].description}</p>
        </div>
        <div class="weather-details">
            <div class="weather-detail-item">
                <i class="fas fa-temperature-high"></i>
                <span>Feels like: ${Math.round(data.main.feels_like)}°C</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-tint"></i>
                <span>Humidity: ${data.main.humidity}%</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-wind"></i>
                <span>Wind: ${Math.round(data.wind.speed * 3.6)} km/h</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-compress-arrows-alt"></i>
                <span>Pressure: ${data.main.pressure} hPa</span>
            </div>
        </div>
    `;
    
    weatherInfo.innerHTML = '';
    weatherInfo.appendChild(weatherCard);
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.textContent = '';
    error.classList.add('hidden');
}
