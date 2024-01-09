import React from 'react';
import { Link } from 'react-router-dom';
import pokemonsData from '../data/pokemons.json';
import PokemonItem from './PokemonItem';

const CreaturesPage = () => {
    return (
      <div className="creatures-page">
        <div className="pokemon-list">
          {pokemonsData.map((pokemon, index) => (
            <PokemonItem key={index} {...pokemon} />
          ))}
        </div>
      </div>
    );
  };

export default CreaturesPage;