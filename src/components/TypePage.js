import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PokemonItem from './PokemonItem';
import pokemonsData from '../data/pokemons.json';

const TypePage = () => {
  const { typeName } = useParams();
  const [pokemonsByType, setPokemonsByType] = useState([]);

  useEffect(() => {
    // Filter pokemons by type
    const filteredPokemons = pokemonsData.filter(pokemon => pokemon.type.toLowerCase() === typeName.toLowerCase());
    setPokemonsByType(filteredPokemons);
  }, [typeName]);

  return (
    <div className="type-page">
      <h2>{typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokémons</h2>
      <div className="pokemon-list">
        {pokemonsByType.map((pokemon, index) => (
          <PokemonItem key={index} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

TypePage.propTypes = {
  typeName: PropTypes.string
};

export default TypePage;
