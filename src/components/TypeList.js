import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
//import PokemonItem from './PokemonItem';
import pokemonsData from '../data/pokemons.json';
import pokemonTypes from '../data/pokemonTypes.json';

// Add this code inside the TypeList component, after line 8
const pokemons = pokemonsData;

const TypeList = () => {
  const { typeName } = useParams();
  const typeData = pokemonTypes.find(pokemonType => pokemonType.type === typeName);
// Add this code inside the TypeList component, after line 8
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
    </div>
  );
};

export default TypeList;