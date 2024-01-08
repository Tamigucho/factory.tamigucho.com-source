import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
//import PokemonItem from './PokemonItem';
import pokemonsData from '../data/pokemons.json';
import pokemonTypes from '../data/pokemonTypes.json';

pokemonTypes.forEach(type => {
  type.pokemonCount = pokemonsData.reduce((count, pokemon) => {
    return count + (pokemon.type.includes(type.type) ? 1 : 0);
  }, 0);
});

// Add this code inside the TypeList component, after line 8
const sortedPokemonTypes = pokemonTypes.sort((a, b) => b.pokemonCount - a.pokemonCount);
const top3Types = sortedPokemonTypes.slice(0, 3);
const bottom3Types = sortedPokemonTypes.slice(-3);

const pokemons = pokemonsData;

const TypeList = () => {
  const { typeName } = useParams();
  const typeData = pokemonTypes.find(pokemonType => pokemonType.type === typeName);
  const pokemonCountByType = pokemonTypes.reduce((count, type) => {
    count[type.type] = pokemons.filter(pokemon => pokemon.type.includes(type.type)).length;
    return count;
  }, {});
  return (
    <div className="type-list">
      <h2>Pokémon Types</h2>
      <ul>
        {pokemonTypes.map((type, index) => (
          <li key={index}>
            <Link to={`/types/${type.type}`} className={`type-badge type-${type.type.toLowerCase()}`}>
              {pokemonTypes.find(t => t.type === type.type).emoji} {type.type}
            </Link><span className="badge bg-secondary">({pokemonCountByType[type.type]})</span>
          </li>
        ))}
      </ul>
  {top3Types.map((type, index) => (
  <li key={index}>
    <span role="img" aria-label="medal">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
    <Link to={`/types/${type.type}`} className={`type-badge type-${type.type.toLowerCase()}`}>
      {type.emoji} {type.type} ({type.pokemonCount})
    </Link>
  </li>
))}
{bottom3Types.map((type, index) => (
  <li key={index}>
    <span role="img" aria-label="medal">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
    <Link to={`/types/${type.type}`} className={`type-badge type-${type.type.toLowerCase()}`}>
      {type.emoji} {type.type} ({type.pokemonCount})
    </Link>
  </li>
))}
    </div>
  );
};

export default TypeList;
