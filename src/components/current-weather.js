import React from 'react'
import sunriseImg from '../assets/sunrise.png';
import sunsetImg from '../assets/sunset.png';

import './current-weather.css';

const CurrentWeather = ({ data }) => {
  const { city, weather, main, wind, sunrise, sunset, localTime } = data;
  const roundedTemp = Number((main.feels_like).toFixed(1));
  return (
    <div className='current-weather'>
      <div className="weather-top">
        <div className="weather-left">
          <img className='weather-icon' src={require(`../assets/${weather[0].icon}.png`)} alt="sunny weather" />
          <div className="weather-temperature">
            <p className="temperature">{roundedTemp}</p>
            <p className="degrees">&deg;C</p>
          </div>
          <div className="weather-details">
            <p className="pressure">Pressure: {main.pressure} hPa</p>
            <p className="humidity">Humidity: {main.humidity} %</p>
            <p className="wind">Wind: {wind.speed} m/s</p>
          </div>
        </div>
        <div className="weather-right">
          <p className="city">{city}</p>
          <p className="time">{localTime}</p>
          <p className="description">{weather[0].description}</p>
        </div>
      </div>
      <div className="weather-bottom">
        <div className='sunrise-sunset'>
          <img src={sunriseImg} alt="sunrise" className="weather-icon-small" />
          <p>{sunrise}</p>
        </div>
        <div className='sunrise-sunset'>
          <p>{sunset}</p>
          <img src={sunsetImg} alt="sunset" className="weather-icon-small" />
        </div>
      </div>
    </div >
  )
}

export default CurrentWeather;