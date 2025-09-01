import React, { useEffect } from "react";
import "./Weather.css";

import  {clear, humidity, wind,search} from '../assets/index.js'; 

const Weather = () => {
    const search = async (city) => {
        try{
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OWM_KEY}&units=metric`;

            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
        }catch(err){
            console.error(err);
        }

    };

    useEffect(() => {
        search("london");
    }, []);

  return (
    <div className="weather">
      <div className="searchbar">
        <input type="text" placeholder="Search for a city..." />
        <img src={search} alt="search icon" />
      </div>
      <img src={clear} alt="sunny day" className="weather-icon" />
      <p className="temperature">16 deg c</p>
      <p className="location">london</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="humidity icon" />
        </div>
         <p>91%</p>
        <span>humidity</span>
        <div className="col">
            <img src={wind} alt="wind icon" />  
        </div>
        <p>91%</p>
        <span>wind</span>
      </div>    
    </div>
       
  
  );
};

export default Weather;
