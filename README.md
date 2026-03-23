Smart City Weather Dashboard
Overview
The Smart City Weather Dashboard is a web application that provides real-time weather updates along with intelligent lifestyle suggestions. Instead of only displaying temperature, the application also gives "What to Wear" advice based on weather conditions, helping users make better daily decisions.
Features
City Search
Users can search weather details for any city.
5-Day Weather Forecast
Displays upcoming weather conditions for better planning.
Dynamic Weather Icons
Icons automatically change based on weather conditions (e.g., sunny, rainy, cloudy).
Smart Suggestions
Provides recommendations like:
Carry an umbrella if rain probability is high
Wear warm clothes if temperature is low
Responsive UI
Background colors dynamically change based on temperature:
Blue for cold weather
Orange for hot weather
Geolocation Support
Automatically fetches and displays weather data for the user’s current location using the browser’s Geolocation API.
Tech Stack
HTML
CSS
JavaScript
OpenWeatherMap API
API Used
This project uses the OpenWeatherMap API to fetch real-time weather data.
API Link: https://openweathermap.org/api
How It Works
User enters a city name or allows location access.
The application fetches weather data from the API.
Data is processed and displayed with:
Temperature
Weather conditions
Forecast
Based on conditions, suggestions are generated.
UI updates dynamically (icons and background colors).
Setup Instructions
Clone the repository
git clone <your-repo-link>
Navigate to the project folder
cd weather-dashboard
Get your API key from OpenWeatherMap
Add your API key in the JavaScript file
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
Add multiple theme modes
Store recent searches
Conclusion
This project demonstrates how real-time APIs, dynamic UI, and browser features like Geolocation can be combined to create a practical and user-friendly weather application.