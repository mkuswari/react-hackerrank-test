import React from 'react';
import './App.css';
import 'h8k-components';
import WeatherList from './components/WeatherList';

const title = "Weather Dashboard";

function App() {
  return (
    <div className="App">
      <h8k-navbar header={title} data-testId="navbar"></h8k-navbar>
      <WeatherList />
    </div>
  );
}

export default App;
