import React, { useEffect, useState } from "react";
import "./Weather.css";

import { clear, humidity, wind, search as searchIcon } from "../assets/index.js";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_OWM_KEY
      }&units=metric`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather("London");
  }, []);

  return (
    <div className="weather">
      <div className="searchbar">
        <input type="text" placeholder="Search for a city..." />
        <img src={searchIcon} alt="search icon" />
      </div>

      <img src={clear} alt="sunny day" className="weather-icon" />

      <p className="temperature">
        {weatherData ? `${Math.round(weatherData.main.temp)}°C` : "Loading..."}
      </p>
      <p className="location">{weatherData ? weatherData.name : "..."}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="humidity icon" />
          <p>{weatherData ? `${weatherData.main.humidity}%` : "--"}</p>
          <span>Humidity</span>
        </div>

        <div className="col">
          <img src={wind} alt="wind icon" />
          <p>{weatherData ? `${weatherData.wind.speed} m/s` : "--"}</p>
          <span>Wind</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
