import React, { useState } from "react";
import "./index.css";

function MovieList() {
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovie = () => {
    setHasSearched(true);
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        const results = data.data;
        setMovies(results);
      });
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="number"
          className="large"
          placeholder="Enter Year eg 2015"
          data-testid="app-input"
          onChange={(e) => setYear(e.target.value)}
        />
        <button className="" data-testid="submit-button" onClick={searchMovie}>
          Search
        </button>
      </section>

      <ul className="mt-50 styled" data-testid="movieList">
        {movies.map((item, index) => (
          <li key={index} className="slide-up-fade-in py-10">
            {item.Title}
          </li>
        ))}
      </ul>

      {hasSearched && movies.length === 0 && (
        <div className="mt-50 slide-up-fade-in" data-testid="no-result">
          No Results Found
        </div>
      )}
    </div>
  );
}

export default MovieList;
