import React, { useState, useEffect } from 'react';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        // Fetch geolocation data for the city
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          setError('City not found');
          setWeatherData(null);
          return;
        }

        const { latitude, longitude } = geoData.results[0];

        // Fetch weather data using latitude and longitude
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();
        setWeatherData(weatherData.current_weather);
        setError(null);
      } catch (error) {
        setError('Error fetching weather data');
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  if (!city) return null;

  return (
    <div className="mt-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : weatherData ? (
        <div className="text-center bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-2">Weather in {city}</h2>
          <p className="text-lg">Temperature: {weatherData.temperature}°C</p>
          <p className="text-lg">Wind Speed: {weatherData.windspeed} km/h</p>
          <p className="text-lg">Weather Code: {weatherData.weathercode}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
