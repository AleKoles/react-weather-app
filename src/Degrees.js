import React, { useState } from "react";

export default function Degrees(props) {
  const [unit, setUnit] = useState("celsius");
  function convertToFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <h2 className="temperature">
        <strong>{Math.round(props.celsius)}</strong>
        <span className="degrees">
          <small>°C</small> |
          <a href="/" id="fahrenheit" onClick={convertToFahrenheit}>
            <small>°F</small>
          </a>
        </span>
      </h2>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <h2 className="temperature">
        <strong>{Math.round(fahrenheit)}</strong>
        <span className="degrees">
          <a href="/" id="celsius" onClick={convertToCelsius}>
            <small>°C</small>
          </a>{" "}
          |<small>°F</small>
        </span>
      </h2>
    );
  }
}
