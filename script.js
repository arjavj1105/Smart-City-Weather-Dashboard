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

// Setup Modal Elements
const setupModal = document.getElementById('setup-modal');
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn = document.getElementById('save-key-btn');

// State Variables
let forecastDays = [];
let currentFilter = "all";
let currentSort = "default";
let userApiKey = localStorage.getItem('openweather_key') || "";

// Initialize App
window.onload = () => {
    checkSetup();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                if (!getEffectiveKey()) return;
                try {
                    showLoading(true);
                    const res = await fetch(`${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${getEffectiveKey()}&units=metric`);
                    if (res.ok) {
                        const data = await res.json();
                        getWeatherData(data.name);
                        cityInput.value = data.name;
                    }
                } catch (err) { console.log(err); } finally { showLoading(false); }
            }
        );
    }
};

function checkSetup() {
    // If no hardcoded key AND no local key, show setup
    if ((!API_KEY || API_KEY === "YOUR_API_KEY_HERE") && !userApiKey) {
        setupModal.classList.remove('hidden');
    } else {
        setupModal.classList.add('hidden');
    }
}

function getEffectiveKey() {
    return (API_KEY && API_KEY !== "YOUR_API_KEY_HERE") ? API_KEY : userApiKey;
}

saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key.length > 20) {
        localStorage.setItem('openweather_key', key);
        userApiKey = key;
        setupModal.classList.add('fade-out');
        setTimeout(() => {
            setupModal.classList.add('hidden');
            location.reload(); // Refresh to start fresh with new key
        }, 500);
    } else {
        alert("Please enter a valid API key.");
    }
});

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

// Added: Reset Key Functionality
function resetApiKey() {
    localStorage.removeItem('openweather_key');
    location.reload();
}

// Attach reset to a hidden double-click or just add a link in README.
// Actually, let's keep it simple for now.

// Main Function to Fetch All Weather Data
async function getWeatherData(city) {
    const activeKey = getEffectiveKey();
    if (!activeKey) {
        checkSetup();
        return;
    }

    try {
        showLoading(true);
        clearError();

        const currentRes = await fetch(`${BASE_URL}weather?q=${city}&appid=${activeKey}&units=metric`);
        if (currentRes.status === 401) throw new Error("Key Invalid. Please update your API key.");
        if (!currentRes.ok) throw new Error("City not found.");
        const currentData = await currentRes.json();

        const forecastRes = await fetch(`${BASE_URL}forecast?q=${city}&appid=${activeKey}&units=metric`);
        const forecastData = await forecastRes.json();

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

// Function to Update 5-Day Forecast Data and trigger render
function updateForecastUI(data) {
    // API provides data every 3 hours. 
    // We want to pick one point per day (e.g., around 12:00 PM) using filter.
    const dailyForecastRaw = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Map into clean structure
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

// Render Function for Forecast Cards
function renderForecastCards() {
    let processedData = [...forecastDays];

    // Apply filter
    if (currentFilter !== 'all') {
        processedData = processedData.filter(day => {
            if (currentFilter === 'rainy') return day.description.includes('rain');
            if (currentFilter === 'cloudy') return day.description.includes('cloud');
            if (currentFilter === 'hot') return day.temp >= 30;
            if (currentFilter === 'cold') return day.temp < 20;
            return true;
        });
    }

    // Apply sort
    processedData.sort((a, b) => {
        if (currentSort === 'temp-high') return b.temp - a.temp;
        if (currentSort === 'temp-low') return a.temp - b.temp;
        if (currentSort === 'day-az') return a.dayName.localeCompare(b.dayName);
        // Default: Sort by date
        return new Date(a.fullDate) - new Date(b.fullDate);
    });

    // Render using map and innerHTML
    if (processedData.length === 0) {
        forecastContainer.innerHTML = '<p class="no-data">No forecast matches selected filter.</p>';
        return;
    }

    const htmlCards = processedData.map(day => `
        <div class="forecast-card">
            <span class="date">${day.dayName}</span>
            <img class="icon" src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
            <span class="temp">${day.temp}°C</span>
        </div>
    `).join('');

    forecastContainer.innerHTML = htmlCards;
}

// Initialize app and request geolocation
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Basic API key check for geolocation too
                if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") return;

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
