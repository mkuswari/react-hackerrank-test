import React, { useState } from "react";
import { Weather, weatherData } from "../../data/weatherData";
import WeatherCard from "../WeatherCard";
import "./index.css";

const WeatherList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleUnitChange = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const handleAddFavorite = (cityId: number) => {
    if (!favorites.includes(cityId)) {
      setFavorites([...favorites, cityId]);
    }
  };

  const handleRemoveFavorite = (cityId: number) => {
    setFavorites(favorites.filter((id) => id !== cityId));
  };

  const filteredWeatherData = weatherData.filter((weather) =>
    weather.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertTemperature = (temp: number, unit: "C" | "F") => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <div
      className="layout-column align-items-center justify-content-start weather-list"
      data-testid="weather-list"
    >
      <h3>Dashboard</h3>
      <p className="city-details">
        Search for Current Temperature in cities like: New York, London, Paris
        etc.
      </p>

      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            value={searchQuery}
            onChange={handleSearch}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>

        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWeatherData.length > 0 ? (
              filteredWeatherData.map((weather) => (
                <WeatherCard
                  key={weather.id}
                  weather={{
                    ...weather,
                    temperature: convertTemperature(weather.temperature, unit),
                  }}
                  unit={unit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={favorites.includes(weather.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} data-testid="no-results">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button
            onClick={handleUnitChange}
            data-testid="unit-change-button"
            className="outlined"
          >
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </section>
      </div>

      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.length > 0 ? (
              weatherData
                .filter((weather) => favorites.includes(weather.id))
                .map((weather) => (
                  <WeatherCard
                    key={weather.id}
                    weather={{
                      ...weather,
                      temperature: convertTemperature(
                        weather.temperature,
                        unit
                      ),
                    }}
                    unit={unit}
                    onAddFavorite={handleAddFavorite}
                    onRemoveFavorite={handleRemoveFavorite}
                    isFavorite={true}
                  />
                ))
            ) : (
              <tr>
                <td colSpan={4} data-testid="no-favorites">
                  No favorite cities
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
