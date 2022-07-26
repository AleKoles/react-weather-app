import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap";
import TimeDate from "./TimeDate";
import WeatherIcon from "./WeatherIcon";
import Footer from "./Footer";
import Degrees from "./Degrees";
import Forecast from "./Forecast";

export default function App() {
  const [city, setCity] = useState("Kyiv");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [cityText, setCityText] = useState("Kyiv");

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      ready: true,
      coordinates: response.data.coord,
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
    search();
    typeCity();
  }

  function search() {
    let apiKey = "3818ef8d96aa3cbe7d3ceb323fd21a5c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function typeCity() {
    setCityText(city);
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
        <header>{form}</header>
        <main>
          <div className="top">
            <div className="city-name text-capitalize">
              <h1>{cityText}</h1>
              <Degrees celsius={weather.temperature} />
            </div>
            <div className="pic">
              <WeatherIcon code={weather.icon} alt={weather.description} />
              {/* <img src={weather.icon} alt={weather.description} /> */}
            </div>
          </div>
          <div className="weather-info">
            <div className="info-main">
              <p className="text-capitalize">{weather.description}</p>
              <p>Humidity: {weather.humidity} %</p>
              <p>Wind: {weather.wind} km/h</p>
            </div>

            <div className="other-main">
              <TimeDate date={weather.date} />
            </div>
          </div>
        </main>
        <Forecast coordinates={weather.coordinates} />
        <Footer />
      </div>
    );
  } else {
    search();
    return <h3>Loading...</h3>;
  }
}
