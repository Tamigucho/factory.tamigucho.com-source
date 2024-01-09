import React from 'react';
import { Link } from 'react-router-dom';
import pokemonsData from '../data/pokemons.json';

const YearsPage = () => {
  const years = [...new Set(pokemonsData.map(pokemon => pokemon.year))];

  return (
    <div className="years-page">
      <h2>Years</h2>
      <ul>
        {years.map((year, index) => (
          <li key={index}>
            <Link to={`/years/${year}`}>{year}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YearsPage;