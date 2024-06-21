import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'b6d01ef2006995827d8841449636a467';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getBackgroundClass = (weather) => {
    if (!weather || !weather.length) return '';
    const mainWeather = weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) return 'sunny';
    if (mainWeather.includes('clouds')) return 'cloudy';
    if (mainWeather.includes('rain')) return 'rainy';
    if (mainWeather.includes('snow')) return 'snowy';
    return '';
  };

  useEffect(() => {
    const backgroundClass = weatherData && weatherData.weather ? getBackgroundClass(weatherData.weather) : '';
    document.body.className = isDarkMode ? `app dark-mode ${backgroundClass}` : `app light-mode ${backgroundClass}`;
  }, [weatherData, isDarkMode]);

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Weather Forecast</h1>
      <button className="toggle-btn" onClick={toggleDarkMode}>
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <Search onSearch={fetchWeather} />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">Error: {error}</p>}
      <Weather data={weatherData} addFavorite={addFavorite} />
      <section id="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((city, index) => (
            <li key={index}>
              {city}
              <button onClick={() => removeFavorite(city)}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
