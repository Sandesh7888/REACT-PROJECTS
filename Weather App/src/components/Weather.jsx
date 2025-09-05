import React, { useEffect, useState } from "react";
import "./Weather.css";

import { clear, humidity, wind, s, cloud, drizzle, rain, snow } from "../assets/index.js";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  const allIcon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  return (
    <div className="weather">
      <div className="searchbar">
        <input type="text" placeholder="Search for a city..." />
        <img src={s} alt="search icon" />
      </div>

      {weather ? (
        <>
          <img src={weather.icon} alt="weather icon" className="weather-icon" />
          <p className="temperature">{weather.temperature}°C</p>
          <p className="location">{weather.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="humidity icon" />
              <p>{weather.humidity}%</p>
              <span>Humidity</span>
            </div>

            <div className="col">
              <img src={wind} alt="wind icon" />
              <p>{weather.wind} m/s</p>
              <span>Wind</span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
