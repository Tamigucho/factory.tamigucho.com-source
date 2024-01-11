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
  <div key={year} class="year-group">
  <h2>
    {year} <span className="badge bg-secondary" title="Number of creatures made in this year">{pokemons.length}</span>
  </h2>
  {pokemons.map((pokemon) => (
    <Link key={pokemon.id} to={`/creatures/${pokemon.name.replace(/\.|-|\s/g, '')}`}>
    {pokemon.name}</Link>
      ))}
</div>
))}
    </div>
  );
};

export default PokemonList;