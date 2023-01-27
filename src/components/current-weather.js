import React from 'react'

import './current-weather.css';

const CurrentWeather = ({ data }) => {
  const { city, weather, main, wind } = data;
  const roundedTemp = Number((main.feels_like).toFixed(1));
  return (
    <div className='current-weather'>
      <div className="weather-main">
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
      <div className="weather-description">
        <p className="city">{city}</p>
        <p className="time">środa, 18:00</p>
        <p className="description">{weather[0].description}</p>
      </div>
    </div >
  )
}

export default CurrentWeather;