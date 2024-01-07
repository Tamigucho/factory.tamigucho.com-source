import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PokemonItem from './PokemonItem';
import pokemonsData from '../data/pokemons.json';
import pokemonTypes from '../data/pokemonTypes.json';

const TypePage = () => {
  const { typeName } = useParams();
  const typeData = pokemonTypes.find(pokemonType => pokemonType.type === typeName);
  const [pokemonsByType, setPokemonsByType] = useState([]);

  useEffect(() => {
    // Filter pokemons by type
    const filteredPokemons = pokemonsData.filter(pokemon => pokemon.type.toLowerCase() === typeName.toLowerCase());
    setPokemonsByType(filteredPokemons);
  }, [typeName]);

  return (
    <div className="type-page">
      <h2>{typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokémons</h2>
      <div className="type-matchups">
  <h3>Weaknesses</h3>
  {typeData.weaknesses.map((weakness, index) => (
    <Link key={index} to={`/type/${weakness}`}>{weakness}</Link>
  ))}

  <h3>Strengths</h3>
  {typeData.strengths.map((strength, index) => (
    <Link key={index} to={`/type/${strength}`}>{strength}</Link>
  ))}
</div>
      <div className="pokemon-list">
        {pokemonsByType.map((pokemon, index) => (
          <PokemonItem key={index} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

TypePage.propTypes = {
  typeName: PropTypes.string,
  weaknesses: PropTypes.arrayOf(PropTypes.string),
  strengths: PropTypes.arrayOf(PropTypes.string)
};

export default TypePage;
