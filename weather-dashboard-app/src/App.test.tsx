import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { weatherData } from './data/weatherData';
import WeatherList from './components/WeatherList';

describe('Weather Dashboard', () => {
  beforeEach(() => {
    render(<WeatherList/>);
  });

  afterEach(() => {
    cleanup();
  });

  test('search input is cleared when clear button is clicked', () => {
    const searchInput = screen.getByTestId('search-input');
    const clearButton = screen.getByTestId('clear-search-button');
    fireEvent.change(searchInput, { target: { value: 'New York' } });
    fireEvent.click(clearButton);
    expect(searchInput).toHaveValue('');
  });

  test('default temperature unit is "Celsius"', () => {
    const unitChangeButton = screen.getByTestId('unit-change-button');
    expect(unitChangeButton).toHaveTextContent('Switch to Fahrenheit');
  });

  test('toggles temperature unit between Fahrenheit and Celsius', () => {
    const unitChangeButton = screen.getByTestId('unit-change-button');
    fireEvent.click(unitChangeButton);
    expect(unitChangeButton).toHaveTextContent('Switch to Celsius');
    fireEvent.click(unitChangeButton);
    expect(unitChangeButton).toHaveTextContent('Switch to Fahrenheit');
  });

  test('updates temperature values with 1 decimal place in search-results when Fahrenheit is selected', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });
  
    const unitChangeButton = screen.getByTestId('unit-change-button');
    fireEvent.click(unitChangeButton); // Switch to Fahrenheit
  
    const londonWeather = weatherData.find(w => w.city === 'London');
    const temperatureInFahrenheit = ((londonWeather?.temperature ?? 0) * 9) / 5 + 32;
    const tempCell = screen.getByText(`${temperatureInFahrenheit.toFixed(1)}°F`, { selector: '.search-results .weather-card td' });
    expect(tempCell).toBeInTheDocument();
  });

  test('updates temperature values with 1 decimal place in search-results when Celsius is selected', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });
  
    const unitChangeButton = screen.getByTestId('unit-change-button');
    fireEvent.click(unitChangeButton); // Switch to Fahrenheit
    fireEvent.click(unitChangeButton); // Switch back to Celsius
  
    const londonWeather = weatherData.find(w => w.city === 'London');
    const tempCell = screen.getByText(`${londonWeather?.temperature.toFixed(1)}°C`, { selector: '.search-results .weather-card td' });
    expect(tempCell).toBeInTheDocument();
  });

  test('updates temperature values with 1 decimal place in favorites when Fahrenheit is selected', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });
  
    const addToFavoritesButton = screen.getByText('Add to favorites');
    fireEvent.click(addToFavoritesButton);
  
    const unitChangeButton = screen.getByTestId('unit-change-button');
    fireEvent.click(unitChangeButton); // Switch to Fahrenheit
  
    const londonWeather = weatherData.find(w => w.city === 'London');
    const temperatureInFahrenheit = ((londonWeather?.temperature ?? 0) * 9) / 5 + 32;
    const tempCell = screen.getByText(`${temperatureInFahrenheit.toFixed(1)}°F`, { selector: '.favorites .weather-card td' });
    expect(tempCell).toBeInTheDocument();
  });

  test('updates temperature values with 1 decimal place in favorites when Celsius is selected', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });
  
    const addToFavoritesButton = screen.getByText('Add to favorites');
    fireEvent.click(addToFavoritesButton);
  
    const unitChangeButton = screen.getByTestId('unit-change-button');
    fireEvent.click(unitChangeButton); // Switch to Fahrenheit
    fireEvent.click(unitChangeButton); // Switch back to Celsius
  
    const londonWeather = weatherData.find(w => w.city === 'London');
    const tempCell = screen.getByText(`${londonWeather?.temperature.toFixed(1)}°C`, { selector: '.favorites .weather-card td' });
    expect(tempCell).toBeInTheDocument();
  });
  

  test('displays city weather information when searched', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const cityCell = screen.getByText('London', { selector: '.search-results .weather-card td' });
    expect(cityCell).toBeInTheDocument();
  });

  test('adds city to favorite when "Add to favorites" is clicked', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const addToFavoritesButton = screen.getByText('Add to favorites');
    fireEvent.click(addToFavoritesButton);

    const favoriteCity = screen.queryByText('London', { selector: '.favorites .weather-card td' });
    expect(favoriteCity).toBeInTheDocument();
  });

  test('removes city from favorite when "Remove from favorites" is clicked from favorites table', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const addToFavoritesButton = screen.getByText('Add to favorites');
    fireEvent.click(addToFavoritesButton);

    const removeFromFavoritesButton = screen.getAllByText('Remove from favorites').find(button => button.closest('.favorites'));
    fireEvent.click(removeFromFavoritesButton!);

    const favoriteCity = screen.queryByText('London', { selector: '.favorites .weather-card td' });
    expect(favoriteCity).not.toBeInTheDocument();
  });

  test('removes city from favorite when "Remove from favorites" is clicked from search table', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const addToFavoritesButton = screen.getByText('Add to favorites');
    fireEvent.click(addToFavoritesButton);

    const removeFromFavoritesButton = screen.getAllByText('Remove from favorites').find(button => button.closest('.search-results'));
    fireEvent.click(removeFromFavoritesButton!);

    const favoriteCity = screen.queryByText('London', { selector: '.favorites .weather-card td' });
    expect(favoriteCity).not.toBeInTheDocument();
  });

  test('changes temperature unit when unit change button is clicked', () => {
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const unitChangeButton = screen.getByTestId('unit-change-button');
    fireEvent.click(unitChangeButton);

    const losAngelesWeather = weatherData.find(w => w.city === 'London');
    const temperatureInFahrenheit = ((losAngelesWeather?.temperature ?? 0) * 9) / 5 + 32;
    const tempCell = screen.getByText(`${temperatureInFahrenheit.toFixed(1)}°F`);
    expect(tempCell).toBeInTheDocument();
  });

});
