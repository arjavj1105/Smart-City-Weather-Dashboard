# 🌦️ Smart City Weather Dashboard

A weather app that shows current conditions, a 5-day forecast, and tells you what to wear based on the temperature.

---

## 🔗 Live Demo

👉 [View Here](https://arjavj1105.github.io/Smart-City-Weather-Dashboard)

---

## 💡 About

I built this to get hands-on experience with APIs and JavaScript. The idea was to make a weather app that's actually useful — one that gives outfit suggestions and warns you about rain, not just shows numbers.

---

## ✨ Features

- Auto-detects your location and loads local weather
- Shows temperature, humidity, wind speed, and condition
- "What to Wear" tip based on current temperature
- Rain alert if precipitation chance is above 20%
- 5-day forecast
- Background color changes with temperature (blue = cold, orange = hot)

---

## 🛠️ Built With

- HTML
- CSS
- JavaScript
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🌐 API Used

**OpenWeatherMap** — free weather API

```
Base URL: https://api.openweathermap.org/data/2.5/
```

Endpoints used:

- `/weather?q={city}` — current weather by city
- `/forecast?q={city}` — 5-day forecast
- `/weather?lat={lat}&lon={lon}` — weather by coordinates (for geolocation)

Example:

```javascript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await response.json();
```

Get a free API key at [openweathermap.org](https://openweathermap.org/api).

---

## ⚙️ How to Run

```bash
git clone https://github.com/arjavj1105/Smart-City-Weather-Dashboard.git
cd Smart-City-Weather-Dashboard
```

Open `index.html` in your browser. Add your API key in `config.js` first:

```javascript
const API_KEY = "your_key_here";
```

---

## 📚 What I Learned

- How to use `fetch()` to call an API
- Reading and using JSON data
- Browser Geolocation API
- Updating the DOM dynamically with JavaScript

---

## 🚧 Planned Improvements

- [ ] °C / °F toggle
- [ ] Better mobile layout
- [ ] Hourly forecast view

---

## ✅ Conclusion

This project helped me understand how real APIs work and how to build something useful around them. There was a lot of trial and error, but that's where the actual learning happened.

---

*Made by [Arjav](https://github.com/arjavj1105)*