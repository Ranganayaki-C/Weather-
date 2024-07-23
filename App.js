import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('Unable to fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
