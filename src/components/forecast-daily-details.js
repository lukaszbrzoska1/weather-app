import React from 'react'
import './forecast-daily-details.css';

const ForecastDailyDetails = ({ main, clouds, wind }) => {
  const { humidity, pressure, feels_like } = main;
  const { all } = clouds;
  const { speed } = wind;

  return (
    <div
      className="daily-details-wrapper"
    >
      <div className='daily-details'>
        <p className='details-text'>Cloud Cover</p>
        <p className='details-value'>{all}%</p>
      </div>
      <div className='daily-details'>
        <p className='details-text'>Wind Gusts</p>
        <p className='details-value'>{speed} km/h</p>
      </div>
      <div className='daily-details'>
        <p className='details-text'>RealFeel</p>
        <p className='details-value'>{Math.round(feels_like)}&deg;C</p>
      </div>
      <div className='daily-details'>
        <p className='details-text'>Humidity</p>
        <p className='details-value'>{humidity}%</p>
      </div>
      <div className='daily-details'>
        <p className='details-text'>Pressure</p>
        <p className='details-value'>{pressure}hPa</p>
      </div>
    </div>
  )
}

export default ForecastDailyDetails