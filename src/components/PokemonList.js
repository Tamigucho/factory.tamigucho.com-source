import React from 'react';
import { Link } from 'react-router-dom';
import pokemons from '../data/pokemons.json';

const PokemonList = () => {
  // Group pokemons by year
  const pokemonsByYear = pokemons.reduce((groups, pokemon) => {
    const year = pokemon.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(pokemon);
    return groups;
  }, {});

  return (
    <div className="pokemon-list">
 {Object.entries(pokemonsByYear).map(([year, pokemons]) => (
  <div key={year}>
    <h2>
      {year} <span className="badge bg-secondary">{pokemons.length}</span>
    </h2>
    {pokemons.map((pokemon) => (
      <Link key={pokemon.id} to={`/${pokemon.name}`}>
        {pokemon.name} </Link>
    ))}
  </div>
))}
    </div>
  );
};

export default PokemonList;