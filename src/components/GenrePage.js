import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pokemonsData from '../data/pokemons.json';
import PokemonItem from './PokemonItem';

const GenrePage = () => {
  const { genre } = useParams();
  const [pokemonsByGenre, setPokemonsByGenre] = useState([]);

  useEffect(() => {
    const filteredPokemons = pokemonsData.filter(pokemon => pokemon['genre-species'][0] === genre);
    setPokemonsByGenre(filteredPokemons);
  }, [genre]);

  return (
    <div className="genre-page">
      <h2>{genre} <span className="badge bg-secondary" title={`Total Pokémons in this genre: ${pokemonsByGenre.length}`}>{pokemonsByGenre.length}</span></h2>
      <div className="pokemon-list">
        {pokemonsByGenre.map((pokemon, index) => (
          <PokemonItem key={index} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;