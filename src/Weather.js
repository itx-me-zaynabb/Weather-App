import axios from "axios";
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const HandleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    // basic validation
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setError(null);
    setLoading(true);
    setWeather(null);

    try {
      const apiKey = "f9af8cff645b7ef7b8675f03b27f0e4b";
      const url = https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city.trim()
      )}&appid=${apiKey}&units=metric;

      console.log("Requesting:", url);
      const response = await axios.get(url);

      setWeather(response.data);
    } catch (err) {
      console.error("Error fetching weather data", err);
      const apiMsg = err.response?.data?.message;
      setError(
        apiMsg ? API error: ${apiMsg} : "Error fetching weather data."
      );
    } finally {
      setLoading(false);
    }
  };

  const HandleClick = () => {
    fetchWeather();
  };

  return (
    <div className="Container">
      <h1>Weather App</h1>

      <input
        className="inputField"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={HandleChange}
      />

      <button className="btn" onClick={HandleClick} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: 16 }}>
          <h3>
            {weather.name}, {weather.sys?.country}
          </h3>
          <p>Temp: {Math.round(weather.main?.temp)} °C</p>
          <p>Feels like: {Math.round(weather.main?.feels_like)} °C</p>
          <p>Humidity: {weather.main?.humidity}%</p>
          <p>Wind: {weather.wind?.speed} m/s</p>
          <p>Description: {weather.weather?.[0]?.description}</p>
          <img
            alt={weather.weather?.[0]?.description}
            src={https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png}
          />
        </div>
      )}
    </div>
  );
};

export default Weather; 