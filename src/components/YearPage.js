import React from 'react';
import { useParams } from 'react-router-dom';
import pokemonsData from '../data/pokemons.json';
import PokemonItem from './PokemonItem';

const YearPage = () => {
    const { year } = useParams();
    const pokemons = pokemonsData.filter(pokemon => pokemon.year === parseInt(year));
  
    return (
      <div className="year-page">
        <h2>{year} <span className="badge bg-secondary" title="Creatures made in this year">{pokemons.length}</span></h2>
        <div className="pokemon-list">
          {pokemons.map((pokemon, index) => (
            <PokemonItem key={index} {...pokemon} />
          ))}
        </div>
      </div>
    );
  };

export default YearPage;