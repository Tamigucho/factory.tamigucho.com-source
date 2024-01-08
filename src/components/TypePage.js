import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PokemonItem from './PokemonItem';
import pokemonsData from '../data/pokemons.json';
import pokemonTypes from '../data/pokemonTypes.json';
//import TypeList from './TypeList'; // Import the TypeList component

const TypePage = () => {
  const { typeName } = useParams();
  //const typeData = pokemonTypes.find(pokemonType => pokemonType.type === typeName);
  const typeData = pokemonTypes.find(pokemonType => pokemonType.type === typeName);
  const [pokemonsByType, setPokemonsByType] = useState([]);

  useEffect(() => {
    // Filter pokemons by type
const filteredPokemons = pokemonsData.filter(pokemon => {
  const types = Array.isArray(pokemon.type) ? pokemon.type : [pokemon.type];
  return types.some(t => t.toLowerCase() === typeName.toLowerCase());
});
setPokemonsByType(filteredPokemons);
  }, [typeName, pokemonsData]);

  const pokemonsCount = pokemonsByType.length;

  return (
    <div className="type-page">
      <h2>{typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokémons</h2>
      <div><p>Total Pokémons in this type: {pokemonsCount}</p></div>
      <div className="type-matchups">
        <h4>Weaknesses</h4>
        {typeData.weaknesses.map((weakness, index) => (
          <Link to={`/types/${weakness}`} key={index} className={`type-badge type-${weakness.toLowerCase()}`}>
            <span>{pokemonTypes.find(type => type.type === weakness).emoji}</span>
            <span> {weakness}</span>
          </Link>
        ))}

        <h4>Strengths</h4>
        {typeData.strengths.map((strength, index) => (
          <Link to={`/types/${strength}`} key={index} className={`type-badge type-${strength.toLowerCase()}`}>
            <span>{pokemonTypes.find(type => type.type === strength).emoji}</span>
            <span> {strength}</span>
          </Link>
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
