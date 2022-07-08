import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  let [temperature, setTemperature] = useState("");
  let [city, setCity] = useState("Kyiv");
  let [cityText, setCityText] = useState("Kyiv");
  let [tempText, setTempText] = useState("");

  function showTemperature(responce) {
    setTemperature(Math.round(responce.data.main.temp));
  }

  let apiKey = "3818ef8d96aa3cbe7d3ceb323fd21a5c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);

  function showText(event) {
    event.preventDefault();
    setCityText(`${city}`);
    setTempText(`${temperature}`);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let weatherData = {
    // city: "Kyiv",
    // temperature: 25,
    description: "Cloudy",
    imgUrl: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
    precipitation: 70,
    wind: 7,
  };

  let timeDate = {
    date: "23",
    month: "June",
    day: "Wednesday",
    hours: 17,
    minutes: 30,
  };

  return (
    <div className="container">
      <header>
        <a
          className="my-button border-0"
          title="Current Location"
          id="current-button"
          href="#"
        >
          <i className="fa-solid fa-location-dot"></i>
        </a>

        <form className="d-flex" id="form" role="search" onSubmit={showText}>
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
      </header>
      <main>
        <div className="top">
          <div className="city-name">
            <h1>{cityText}</h1>
            <h2 className="temperature">
              <strong>{tempText}</strong>
              <span className="degrees">
                <a href="/" id="celsius">
                  <small>°C</small>
                </a>{" "}
                |
                <a href="/" id="fahrenheit">
                  <small>°F</small>
                </a>
              </span>
            </h2>
          </div>
          <div className="pic">
            <img src={weatherData.imgUrl} alt={weatherData.description} />
          </div>
        </div>

        <div className="weather-info">
          <div className="info-main">
            <p>{weatherData.description}</p>
            <p>Precipitation: {weatherData.precipitation} %</p>
            <p>Wind: {weatherData.wind} km/h</p>
          </div>
          <div className="other-main">
            <p>
              {timeDate.month}, {timeDate.date}
            </p>
            <p>{timeDate.day}</p>
            <p>
              {timeDate.hours}:{timeDate.minutes}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
