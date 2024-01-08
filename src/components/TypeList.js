import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import pokemonTypes from '../data/pokemonTypes.json';

const TypeList = () => {
  const { typeName } = useParams();
  const typeData = pokemonTypes.find(pokemonType => pokemonType.type === typeName);
  return (
    <div className="type-list">
      <h2>Pokémon Types</h2>
      <ul>
        {pokemonTypes.map((type, index) => (
        <li key={index}>
        <Link to={`/types/${type.type}`} className={`type-badge type-${type.type.toLowerCase()}`}>
          {pokemonTypes.find(t => t.type === type.type).emoji} {type.type}
        </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeList;