# 🌦️ Smart City Weather Dashboard

Hello! Welcome to my final project: the **Smart City Weather Dashboard**. I built this web application to help users easily check the current weather and a 5-day forecast for any city around the world. It includes features like geolocation detection, interactive filtering, and sorting to make checking the weather fun and easy!

### 🌍 Live Demo
[Click here to view the live project](https://smart-city-weather-dashboard-eta.vercel.app)

---

## 📌 Project Overview
The main goal of this dashboard is to provide a clean and intuitive way to consume weather data. Instead of just displaying a plain list of temperatures, I added interactive elements that allow you to filter the forecast by conditions (like rainy or hot) and sort them based on temperature or day. The app also features a dynamic background that changes based on the current weather and a dark mode toggle for better accessibility!

---

## ✨ Features
Here represents the core functionality of the dashboard:
- **Search by City**: Type in any city name to get real-time weather data.
- **Current Weather**: Displays the temperature, humidity, wind speed, and weather condition.
- **5-Day Forecast**: Shows a daily summary of the upcoming weather.
- **Geolocation Detection**: Automatically detects your location and shows your local weather on load.
- **Forecast Filtering**: Easily filter the upcoming days by weather condition (Rainy, Cloudy, Hot, Cold).
- **Forecast Sorting**: Reorder the forecast cards (Default, Temp High-Low, Temp Low-High, Day A-Z).
- **Dark Mode Toggle**: Switch between light and dark themes seamlessly.
- **Responsive Design**: Looks great on both desktop and mobile screens.

---

## 🛠️ Technical Details

### Higher Order Functions Used
To process the array of forecast data efficiently, I used the following JavaScript array methods:
- **`map()`**: Used to transform the raw API data array into clean, structured objects, and then map those objects into HTML strings to render the forecast cards.
- **`filter()`**: Used to pick out one specific forecast time per day (12:00 PM) from the API's 3-hour interval data. It is also used in the interactive UI to filter the days based on conditions (e.g., finding only "rainy" days).
- **`sort()`**: Used to organize the forecast cards based on the user's selection from the dropdown (e.g., sorting temperatures from high to low).

### API & Tech Stack
- **API**: [OpenWeatherMap API](https://openweathermap.org/api) (Data logic for Current Weather & 5-Day Forecast)
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript (No build tools required!)

---

### 🚀 How to Run Locally

Since this is a static frontend application, you don't need any complex build tools to test it. 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Smart-City-Weather-Dashboard.git
   cd Smart-City-Weather-Dashboard
   ```

2. **Add your API Key:**
   - Go to [OpenWeatherMap](https://openweathermap.org/) and create a free account to get an API key.
   - Open the `config.js` file in your code editor.
   - Replace `"YOUR_API_KEY_HERE"` with your actual API key:
     ```javascript
     const API_KEY = "YOUR_VERIFIED_API_KEY";
     ```

3. **Run the App:**
   - Just double-click the `index.html` file to open it in your browser!
   - *(Optional)* You can also use an extension like VS Code Live Server or run `npm start` if you have Node.js installed.

---

## ☁️ Deploying to Vercel

To keep your API key secure and avoid committing it to GitHub, we've added a build step for Vercel:

1.  **Open Vercel Dashboard**: Go to your project settings on Vercel.
2.  **Environment Variables**: Add a new environment variable:
    - **Key**: `OPENWEATHER_API_KEY`
    - **Value**: Your actual API key from OpenWeatherMap.
3.  **Redeploy**: Trigger a new deployment. The build script will automatically inject your key into `config.js` during the deployment phase.

This way, your local `config.js` can stay with the placeholder (or your personal key) without exposing it publicly in the repository.

---

## 🧠 What I Learned
Building this app was a huge learning experience. Working with the OpenWeatherMap API taught me a lot about handling asynchronous data using `async/await` and working around different JSON payload structures. Most importantly, integrating array methods like `map()`, `filter()`, and `sort()` really showed me how powerful Vanilla JavaScript can be for manipulating DOM elements without needing heavy frameworks. I also learned a lot about organizing code to keep it maintainable.

---

## 🔮 Future Improvements
If I have time to expand this project further, I would like to:
- Add an hourly forecast timeline.
- Implement an autocomplete feature for the city search input.
- Add local storage so the application remembers your last searched city and theme preference.

---

## 👨‍💻 Author
**Student Developer**
Built with ❤️ for my final JavaScript project submission.
