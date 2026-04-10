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
const darkModeToggle = document.getElementById('dark-mode-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortDropdown = document.getElementById('sort-dropdown');

// State Variables
let forecastDays = [];
let currentFilter = "all";
let currentSort = "default";

// Global Initialization
window.onload = () => {
    // Attempt to get user's location on load
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                if (!API_KEY) return;
                try {
                    showLoading(true);
                    const res = await fetch(`${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
                    if (res.ok) {
                        const data = await res.json();
                        getWeatherData(data.name);
                        cityInput.value = data.name;
                    }
                } catch (err) { console.log("Location Error:", err); } 
                finally { showLoading(false); }
            },
            () => console.log("User denied geolocation access.")
        );
    }
};

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getWeatherData(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeatherData(city);
    }
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '☀️ Light' : '🌙 Dark';
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderForecastCards();
    });
});

sortDropdown.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderForecastCards();
});

// Main Function to Fetch All Weather Data
async function getWeatherData(city) {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
        showError("API Configuration missing.");
        return;
    }

    try {
        showLoading(true);
        clearError();

        // 1. Current Weather
        const currentRes = await fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (currentRes.status === 401) throw new Error("Invalid API Key. Please check config.js");
        if (!currentRes.ok) throw new Error("City not found. Please try again.");
        const currentData = await currentRes.json();

        // 2. 5-Day Forecast
        const forecastRes = await fetch(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`);
        if (!forecastRes.ok) throw new Error("Could not fetch forecast.");
        const forecastData = await forecastRes.json();

        // Update UI
        updateCurrentWeatherUI(currentData);
        updateForecastUI(forecastData);
        
        weatherDashboard.classList.remove('hidden');
        initialState.classList.add('hidden');
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// UI UPDATE FUNCTIONS
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
    
    updateBodyBackground(data.main.temp);
}

function updateForecastUI(data) {
    // Filter for one data point per day (Noon)
    const dailyForecastRaw = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    forecastDays = dailyForecastRaw.map(day => {
        const dateObj = new Date(day.dt_txt);
        return {
            dayName: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
            fullDate: day.dt_txt,
            temp: Math.round(day.main.temp),
            icon: day.weather[0].icon,
            description: day.weather[0].description.toLowerCase()
        };
    });

    renderForecastCards();
}

function renderForecastCards() {
    let processedData = [...forecastDays];

    if (currentFilter !== 'all') {
        processedData = processedData.filter(day => {
            if (currentFilter === 'rainy') return day.description.includes('rain');
            if (currentFilter === 'cloudy') return day.description.includes('cloud');
            if (currentFilter === 'hot') return day.temp >= 30;
            if (currentFilter === 'cold') return day.temp < 20;
            return true;
        });
    }

    processedData.sort((a, b) => {
        if (currentSort === 'temp-high') return b.temp - a.temp;
        if (currentSort === 'temp-low') return a.temp - b.temp;
        if (currentSort === 'day-az') return a.dayName.localeCompare(b.dayName);
        return new Date(a.fullDate) - new Date(b.fullDate);
    });

    if (processedData.length === 0) {
        forecastContainer.innerHTML = '<p class="no-data">No forecast matches selected filter.</p>';
        return;
    }

    forecastContainer.innerHTML = processedData.map(day => `
        <div class="forecast-card">
            <span class="date">${day.dayName}</span>
            <img class="icon" src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
            <span class="temp">${day.temp}°C</span>
        </div>
    `).join('');
}

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
        document.body.style.background = "radial-gradient(circle at top right, #1e293b, #0f172a)";
        document.documentElement.style.setProperty('--primary', 'hsl(200, 100%, 65%)');
    } else if (temp > 28) {
        document.body.style.background = "radial-gradient(circle at top right, #450a0a, #0f172a)";
        document.documentElement.style.setProperty('--primary', 'hsl(10, 100%, 65%)');
    } else {
        document.body.style.background = "radial-gradient(circle at top right, #1e293b, #0f172a)";
        document.documentElement.style.setProperty('--primary', 'hsl(226, 100%, 65%)');
    }
}
