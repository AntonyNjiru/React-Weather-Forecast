import React from 'react';
import './Weather.css';

const Weather = ({ data, addFavorite }) => {
  if (!data) return null;

  const { name, main, weather, wind, visibility, sys } = data;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className="weather-container">
      <h2>{name}</h2>
      <div className="weather-info">
        <img src={weatherIconUrl} alt={weather[0].description} className="weather-icon" />
        <div>
          <p>Temperature: {main.temp} °C</p>
          <p>Condition: {weather[0].description}</p>
          <p>Humidity: {main.humidity}%</p>
          <p>Pressure: {main.pressure} hPa</p>
          <p>Wind Speed: {wind.speed} m/s</p>
          <p>Visibility: {visibility / 1000} km</p>
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
          <button onClick={() => addFavorite(name)}>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default Weather;
