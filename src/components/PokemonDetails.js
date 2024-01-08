import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import pokemonTypes from '../data/pokemonTypes.json';
import pokemonsData from '../data/pokemons.json'; // Import the Pokemon data

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = () => {
      const foundPokemon = pokemonsData.find(p => p.name === name);
      setPokemon(foundPokemon);
    };

    fetchPokemon();
  }, [name]);

  const getTypeEmoji = (type) => {
    const typeData = pokemonTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };

return (
  <div>
    {pokemon && ( // Add this line to conditionally render the content when pokemon is available
    <>
        <a href={pokemon.photo} target="_blank" rel="noopener noreferrer">
          <img height="400px" src={pokemon.photo} alt={pokemon.name} />
        </a>
    <h2>{pokemon.name}</h2>
    <p>Type: {Array.isArray(pokemon.type) ? (
    pokemon.type.map((type, index) => (
      <Link to={`/types/${type}`} key={index} className={`type-badge type-${type.toLowerCase()}`}>
        {getTypeEmoji(type)} {type}
      </Link>
    ))
  ) : (
    <Link to={`/types/${pokemon.type}`} className={`type-badge type-${pokemon.type.toLowerCase()}`}>
      {getTypeEmoji(pokemon.type)} {pokemon.type}
    </Link>
  )}
</p>
    <p>Description: {pokemon.description.map((line, index) => <p key={index}>{line}</p>)}</p>
    <a href={pokemon.instagram} target="_blank" rel="noopener noreferrer">Instagram Source</a>
    {/* Add more details about the specific Pokemon */}
    </>
    )}
  </div>
);
};

export default PokemonDetails;