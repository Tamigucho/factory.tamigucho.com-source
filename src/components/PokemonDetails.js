// src/components/PokemonDetails.js

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import pokemonTypes from '../data/pokemonTypes.json';

const PokemonDetails = ({ pokemons }) => {
  const { name } = useParams();
  const pokemon = pokemons.find(p => p.name === name);

  const getTypeEmoji = (type) => {
    const typeData = pokemonTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };

return (
  <div>
    <img src={pokemon.photo} alt={pokemon.name} />
    <h2>{pokemon.name}</h2>
    <p>Type: <Link to={`/type/${pokemon.type}`} className={`type-badge type-${pokemon.type.toLowerCase()}`}>
          {getTypeEmoji(pokemon.type)} {pokemon.type}
        </Link>
    </p>
    <p>Description: {pokemon.description.map((line, index) => <p key={index}>{line}</p>)}</p>
    <a href={pokemon.instagram} target="_blank" rel="noopener noreferrer">Instagram Source</a>
    {/* Add more details about the specific Pokemon */}
  </div>
);
};

export default PokemonDetails;