/* 
  Smart City Weather Dashboard - Script.js
  Purpose: Fetches data from OpenWeatherMap API and updates the UI dynamically.
*/

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDashboard = document.getElementById('weather-dashboard');
const initialState = document.getElementById('initial-state');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-msg');
const forecastContainer = document.getElementById('forecast-container');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Main Function to Fetch All Weather Data
async function getWeatherData(city) {
    // Basic API key check
    if (!API_KEY || API_KEY === "PLEASE_ADD_YOUR_API_KEY_HERE") {
        showError("Invalid API Key. Please add your OpenWeatherMap key to config.js");
        return;
    }

    try {
        // Show loading state, hide previous dashboard or initial state
        showLoading(true);
        clearError();

        // 1. Fetch Current Weather
        const currentRes = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (currentRes.status === 401) {
            throw new Error("Invalid API Key. Please verify your email or wait for activation.");
        }
        if (!currentRes.ok) throw new Error("City not found. Please try again.");
        const currentData = await currentRes.json();

        // 2. Fetch 5-Day Forecast
        const forecastRes = await fetch(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`);
        if (!forecastRes.ok) throw new Error("Could not fetch forecast.");
        const forecastData = await forecastRes.json();

        // 3. Update UI
        updateCurrentWeatherUI(currentData);
        updateForecastUI(forecastData);
        
        // Finalize visibility
        weatherDashboard.classList.remove('hidden');
        initialState.classList.add('hidden');
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Function to Update Current Weather Information
function updateCurrentWeatherUI(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Aesthetic bonus: Change background based on temperature
    updateBodyBackground(data.main.temp);
}

// Function to Update 5-Day Forecast
function updateForecastUI(data) {
    forecastContainer.innerHTML = ''; // Clear previous cards

    // Filter forecast data - API provides data every 3 hours. 
    // We want to pick one point per day (e.g., around 12:00 PM).
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecast.sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));

    dailyForecast.forEach(day => {
        const dateObj = new Date(day.dt_txt);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;

        const card = `
            <div class="forecast-card">
                <span class="date">${dayName}</span>
                <img class="icon" src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${day.weather[0].description}">
                <span class="temp">${temp}°C</span>
            </div>
        `;
        forecastContainer.innerHTML += card;
    });
}

// Geolocation Integration (Task 9)
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Basic API key check for geolocation too
                if (!API_KEY || API_KEY === "PLEASE_ADD_YOUR_API_KEY_HERE") return;

                try {
                    showLoading(true);
                    const res = await fetch(`${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
                    if (res.ok) {
                        const data = await res.json();
                        getWeatherData(data.name); // Fetch full data for this city
                        cityInput.value = data.name;
                    }
                } catch (err) {
                    console.log("Error fetching location weather:", err);
                } finally {
                    showLoading(false);
                }
            },
            () => console.log("User denied geolocation access.")
        );
    }
};

// HELPER FUNCTIONS
function showLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    weatherDashboard.classList.add('hidden');
    initialState.classList.remove('hidden');
}

function clearError() {
    errorMessage.textContent = '';
}

function updateBodyBackground(temp) {
    if (temp <= 15) {
        document.body.style.background = "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)";
    } else if (temp > 28) {
        document.body.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    } else {
        document.body.style.background = "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)";
    }
}
