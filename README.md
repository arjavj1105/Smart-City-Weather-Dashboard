# 🌦️ Smart City Weather Dashboard

A weather web app that goes beyond just showing the temperature — it tells you **what to wear**, whether to **carry an umbrella**, and what the next 5 days look like. Built with plain HTML, CSS, and JavaScript.

---

## 🔗 Live Demo

👉 [Click here to view the app](https://arjavj1105.github.io/Smart-City-Weather-Dashboard)

---

## 💡 About the Project

I built this to practice working with real-world APIs and improve my JavaScript skills. The goal wasn't just to display weather data — I wanted the app to actually be *useful*. So I added outfit suggestions, rain alerts, and a background that visually reacts to how hot or cold it is outside.

---

## ✨ Features

- 📍 **Auto-detects your location** on load using the browser's Geolocation API
- 👕 **"What to Wear" advice** — suggestions based on current temperature
- ☂️ **Rain alert** — notifies you if rain probability crosses 20%
- 📅 **5-day forecast** — a quick look at the week ahead
- 🎨 **Dynamic background** — shifts from blue (cold) to orange (hot) based on temp
- 🌩️ **Weather icons** — update automatically based on live conditions
- 🔍 **City search** — look up weather anywhere in the world

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- [OpenWeatherMap API](https://openweathermap.org/api)
- Browser Geolocation API

---

## 🌐 API Reference

This project uses the **OpenWeatherMap API** (free tier).

**Base URL:**
```
https://api.openweathermap.org/data/2.5/
```

### Endpoints Used

| Endpoint | What it does |
|----------|--------------|
| `GET /weather?q={city}&appid={key}` | Fetch current weather by city name |
| `GET /forecast?q={city}&appid={key}` | Fetch 5-day / 3-hour forecast by city |
| `GET /weather?lat={lat}&lon={lon}&appid={key}` | Fetch weather by coordinates (used for geolocation) |

### Example Request

```javascript
const API_KEY = "your_api_key_here";
const city = "Mumbai";

const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await res.json();
```

### Example Response (Simplified)

```json
{
  "name": "Mumbai",
  "main": {
    "temp": 31.5,
    "humidity": 78
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "wind": {
    "speed": 4.2
  }
}
```

### Weather Icons

OpenWeatherMap provides icons via:
```
https://openweathermap.org/img/wn/{icon}@2x.png
```

Example:
```html
<img src="https://openweathermap.org/img/wn/04d@2x.png" alt="Cloudy" />
```

> 🔑 Get your free API key at [openweathermap.org/api](https://openweathermap.org/api) — the free tier supports up to **60 calls/minute**, which is more than enough for this project.

---

## ⚙️ Getting Started

```bash
git clone https://github.com/arjavj1105/Smart-City-Weather-Dashboard.git
cd Smart-City-Weather-Dashboard
```

Open `index.html` directly in your browser — no installs needed.

> Add your OpenWeatherMap API key in `config.js` before running:
> ```javascript
> const API_KEY = "your_api_key_here";
> ```

---

## 📁 Project Structure

```
Smart-City-Weather-Dashboard/
│
├── index.html       # App structure
├── style.css        # Styling & dynamic theme
├── app.js           # API calls, geolocation, DOM logic
├── config.js        # API key (add yours here)
└── assets/
    └── icons/       # Weather icons
```

---

## 📚 What I Learned

- How to fetch and handle data from a public REST API
- Using `async/await` and proper error handling with `try/catch`
- Working with the browser Geolocation API
- Dynamically updating styles and content based on API response

---

## 🚧 Planned Improvements

- [ ] Dark mode toggle
- [ ] Switch between °C and °F
- [ ] Hourly forecast view
- [ ] Save last searched city using `localStorage`

---

## ✅ Conclusion

This project was a great way for me to move past tutorials and actually build something from scratch. Connecting a live API, handling real data, and making the UI react dynamically taught me more than any course exercise. It's not perfect, but it works — and I'm proud of it.

If you have any feedback or suggestions, feel free to open an issue or reach out!

---

*Made by [Arjav](https://github.com/arjavj1105) · Still learning, building as I go 🙂*