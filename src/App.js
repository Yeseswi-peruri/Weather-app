import React, { useState } from 'react';
import Weather from './Weather';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(city);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Weather Checker</h1>
      <form onSubmit={handleSubmit} className="flex items-center mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="px-4 py-2 border rounded-l-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Check Weather
        </button>
      </form>
      <Weather city={searchCity} />
    </div>
  );
}

export default App;
