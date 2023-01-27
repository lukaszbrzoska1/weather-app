import React, { useState } from 'react'
import ForecastDailyDetails from './forecast-daily-details';
import './forecast-daily.css';

const ForecastDaily = ({ data }) => {
  const [toggle, setToggle] = useState(false);

  const { dt_txt, weather, main, wind, clouds } = data;

  const mountedStyle = {
    animation: "inAnimation 400ms ease-in"
  };
  const unmountedStyle = {
    animation: "outAnimation 430ms ease-out",
    animationFillMode: "forwards"
  };

  const handleClick = () => {
    setToggle(prev => !prev);
  };

  const checkValue = (temp) => {
    const value = Math.round(temp);
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      className='daily-wrapper'
      onClick={handleClick}
    >
      <div className='daily-forecast' style={toggle ? unmountedStyle : mountedStyle}>
        <p className="daily-time">{dt_txt.substring(11, 16)}</p>
        <img
          src={require(`../assets/${weather[0].icon}.png`)}
          alt={weather[0].description}
          className="daily-img" />
        <p className='daily-desc'>{weather[0].description}</p>
        <div className="daily-temp">
          <p style={{ color: checkValue(main.temp_max) ? 'red' : 'blue' }} className="temp-max">{Math.round(main.temp_max)}&deg;</p>
          <p style={{ color: checkValue(main.temp_min) ? 'red' : 'blue' }} className="temp-min">{Math.round(main.temp_min)}&deg;</p>
        </div>
      </div>
      {toggle && <ForecastDailyDetails
        main={main}
        wind={wind}
        clouds={clouds}
      />}
    </div >
  )
}

export default ForecastDaily