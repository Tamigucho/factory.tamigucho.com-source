import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PokemonItem from '../../PokemonItem';
import pokemonsData from '../../../data/pokemons.json';
import pokemonTypes from '../../../data/creatures/types.json';
//import TypeList from './TypeList'; // Import the TypeList component
import { Helmet } from 'react-helmet';

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
    <Helmet>
        <title>{typeName.toLowerCase()} Type - Tamigucho Factory</title>
        <meta property="og:title" content={`${typeName.toLowerCase()} Type - Tamigucho Factory`} />
    </Helmet>
      <h2>
        <span className={`type-header type-${typeName.toLowerCase()}`}>{pokemonTypes.find(type => type.type === typeName).emoji} {typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokémons</span>
        <span className="badge bg-secondary" title={`Total Pokémons in this type: ${pokemonsCount}`}>{pokemonsCount}</span>
      </h2>
      <div className="type-matchups">
        <h4>Weaknesses</h4>
        {typeData.weaknesses.map((weakness, index) => (
          <Link to={`/types/${weakness}`} key={index} className={`type-badge type-${weakness.toLowerCase()}`}>
            <span>{pokemonTypes.find(type => type.type === weakness).emoji}</span>
            <span> {weakness}</span>
          </Link>
        ))}

        <h4>Resistance</h4>
        {typeData.resistance.map((resistance, index) => (
          <Link to={`/types/${resistance}`} key={index} className={`type-badge type-${resistance.toLowerCase()}`}>
            <span>{pokemonTypes.find(type => type.type === resistance).emoji}</span>
            <span> {resistance}</span>
          </Link>
        ))}

<h4>Effectiveness</h4>
{Object.entries(typeData.effectiveness).map(([type, value]) => (
  <p key={type}>{value}X {type}</p>
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
  resistance: PropTypes.arrayOf(PropTypes.string)
};

export default TypePage;
