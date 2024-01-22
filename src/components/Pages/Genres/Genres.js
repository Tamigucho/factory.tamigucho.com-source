import React from 'react';
import { Link } from 'react-router-dom';
import pokemonsData from '../../../data/pokemons.json';

const Genres = () => {
  const genres = [...new Set(pokemonsData.map(pokemon => pokemon['genre-species'][0]))];
  const pokemonsByGenre = pokemonsData.reduce((groups, pokemon) => {
    const genre = pokemon['genre-species'][0];
    if (!groups[genre]) {
      groups[genre] = [];
    }
    groups[genre].push(pokemon);
    return groups;
  }, {});

  return (
    <div className="genres-page">
      <h2>Pokémon Genres <span className="badge bg-secondary">{genres.length}</span></h2>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>
            <Link to={`/genres/${genre}`}>{genre}</Link> <span className="badge bg-secondary" title={`Creatures in this genre: ${pokemonsByGenre[genre].length}`}>{pokemonsByGenre[genre].length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;