import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './components/api';
import CurrentWeather from './components/current-weather';
import Forecast from './components/forecast';
import Search from './components/search';

import classNames from 'classnames';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [toggleDayNight, setToggleDayNight] = useState();
  const [clouds, setClouds] = useState(false);

  const bgClass = classNames({
    'clouds': clouds
  });

  const convertDate = (inputTimestamp, timezone) => {
    const date = new Date((inputTimestamp * 1e3 + (timezone * 1e3))).toISOString().substring(11, 16);
    return date;
  }

  const checkIfDayOrNight = (sunset, sunrise, dt) => {
    if (dt >= sunrise && sunset >= dt) {
      setToggleDayNight('day');
    } else {
      setToggleDayNight('night');
    }
  }

  const checkWeather = (description) => {
    const checkClouds = description.includes("clouds") ? true : false;
    setClouds(checkClouds);
  }

  const handleOnSearchChange = (searchData) => {
    const { lat, lon } = searchData;

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        const { sunset, sunrise } = weatherResponse?.sys;
        const description = weatherResponse.weather[0].description;

        const sunriseString = convertDate(weatherResponse.sys.sunrise, weatherResponse.timezone);
        const sunsetString = convertDate(weatherResponse.sys.sunset, weatherResponse.timezone);
        const localTime = convertDate(weatherResponse.dt, weatherResponse.timezone);

        checkIfDayOrNight(sunset, sunrise, weatherResponse.dt);
        checkWeather(description);

        setCurrentWeather({ city: searchData.label, localTime: localTime, sunrise: sunriseString, sunset: sunsetString, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }


  return (
    <div className={`container-wrapper ${toggleDayNight}`}>
      <div className={bgClass} />
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
