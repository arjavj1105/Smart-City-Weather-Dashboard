# Smart City Weather Dashboard

## Overview
Hi, I’m Arjav Jain.  
This project is a Smart City Weather Dashboard that provides real-time weather updates along with simple suggestions like what to wear or carry based on current weather conditions. The aim of this project is to make weather data more useful and practical for everyday decision-making.

---

## Features

- Search weather by city name  
- 5-day weather forecast  
- Dynamic weather icons based on conditions  
- Smart suggestions (e.g., carry umbrella if rain > 20%)  
- Background color changes based on temperature (blue for cold, orange for hot)  
- Automatic weather detection using browser Geolocation API  

---

## Tech Stack

- HTML  
- CSS  
- JavaScript  
- OpenWeatherMap API  

---

## API Used

This project uses the OpenWeatherMap API:  
https://openweathermap.org/api  

---

## How It Works

1. User enters a city name or allows location access  
2. Weather data is fetched from OpenWeatherMap API  
3. The application displays:
   - Temperature  
   - Weather condition  
   - 5-day forecast  
4. Based on conditions, simple suggestions are generated  
5. UI updates dynamically (icons and background colors)  

---

## Setup Instructions

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
Open the project folder
cd weather-dashboard
Get your API key from OpenWeatherMap
Add your API key in script.js
const API_KEY = "your_api_key_here";
Open index.html in your browser
Project Structure
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
Future Improvements
Add hourly forecast
Improve UI animations
Add dark/light mode
Store recent searches
Conclusion
This project demonstrates how real-time API data, JavaScript, and responsive UI design can be combined to build a practical and user-friendly application. It highlights the use of external APIs, browser features like Geolocation, and dynamic UI updates to enhance user experience.