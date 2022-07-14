import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap";
import TimeDate from "./TimeDate";
import WeatherIcon from "./WeatherIcon";
import Footer from "./Footer";
import Degrees from "./Degrees";

export default function App() {
  const [city, setCity] = useState("Kyiv");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3818ef8d96aa3cbe7d3ceb323fd21a5c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="d-flex" id="form" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        id="input-city"
        type="search"
        placeholder="City"
        aria-label="Search"
        onChange={updateCity}
      />
      <button className="btn search-button my-button" type="submit">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div className="container">
        <header>
          <a
            className="my-button border-0"
            title="Current Location"
            id="current-button"
            href="/"
          >
            <i className="fa-solid fa-location-dot"></i>
          </a>

          {form}
        </header>
        <main>
          <div className="top">
            <div className="city-name">
              <h1>{city}</h1>
              <Degrees celsius={weather.temperature} />
            </div>
            <div className="pic">
              <WeatherIcon code={weather.icon} alt={weather.description} />
              {/* <img src={weather.icon} alt={weather.description} /> */}
            </div>
          </div>
          <div className="weather-info">
            <div className="info-main">
              <p class="text-capitalize">{weather.description}</p>
              <p>Humidity: {weather.humidity} %</p>
              <p>Wind: {weather.wind} km/h</p>
            </div>

            <div className="other-main">
              <TimeDate date={weather.date} />
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="container">
        <header>
          <a
            className="my-button border-0"
            title="Current Location"
            id="current-button"
            href="/"
          >
            <i className="fa-solid fa-location-dot"></i>
          </a>

          {form}
        </header>
        <main>
          <div className="top">
            <div className="city-name">
              <h1>Kyiv</h1>
              <Degrees celsius={weather.temperature} />
            </div>
            <div className="pic">
              <img src={weather.icon} alt={weather.description} />
            </div>
          </div>

          <div className="weather-info">
            <div className="info-main">
              <p class="text-capitalize">{weather.description}</p>
              <p>Humidity: 40 %</p>
              <p>Wind: 10 km/h</p>
            </div>
            {/* <TimeDate date={weather.date} /> */}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

// export default function App() {
//   let [temperature, setTemperature] = useState("");
//   let [city, setCity] = useState("Kyiv");
//   let [cityText, setCityText] = useState("Kyiv");
//   let [tempText, setTempText] = useState("");

//   function showTemperature(responce) {
//     setTemperature(Math.round(responce.data.main.temp));
//   }

//   let apiKey = "3818ef8d96aa3cbe7d3ceb323fd21a5c";
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   axios.get(url).then(showTemperature);

//   function showText(event) {
//     event.preventDefault();
//     setCityText(`${city}`);
//     setTempText(`${temperature}`);
//   }

//   function updateCity(event) {
//     setCity(event.target.value);
//   }

//   let weatherData = {
//     description: "Cloudy",
//     imgUrl: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
//     precipitation: 70,
//     wind: 7,
//   };

//   let timeDate = {
//     date: "23",
//     month: "June",
//     day: "Wednesday",
//     hours: 17,
//     minutes: 30,
//   };
