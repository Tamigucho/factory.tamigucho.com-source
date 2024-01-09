import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import pokemonTypes from '../data/pokemonTypes.json';
import pokemonsData from '../data/pokemons.json'; // Import the Pokemon data

const PokemonDetails = () => {
  const navigate = useNavigate();
  const [prevPokemon, setPrevPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);

  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = () => {
      const foundPokemon = pokemonsData.find(p => p.name === name);
      setPokemon(foundPokemon);
  
      const sortedPokemons = [...pokemonsData].sort((a, b) => a.id - b.id);
      const currentIndex = sortedPokemons.findIndex(p => p.id === foundPokemon.id);
  
      const prevPokemon = sortedPokemons[currentIndex - 1] || null;
      setPrevPokemon(prevPokemon);
  
      const nextPokemon = sortedPokemons[currentIndex + 1] || null;
      setNextPokemon(nextPokemon);
  
      console.log("Previous Poké: ", prevPokemon);
      console.log("Next Poké: ", nextPokemon);
    };
  
    fetchPokemon();
  }, [name]);

  const getTypeEmoji = (type) => {
    const typeData = pokemonTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };

return (
  <div>
{prevPokemon && (
  <button className="prev-button" title={prevPokemon.name} onClick={() => navigate(`/${prevPokemon.name}`)}>
    ← Previous
    <img src={prevPokemon.photo} alt={prevPokemon.name} />
  </button>
)}
{nextPokemon && (
  <button className="next-button" title={nextPokemon.name} onClick={() => navigate(`/${nextPokemon.name}`)}>
    <img src={nextPokemon.photo} alt={nextPokemon.name} />
    Next →
  </button>
)}
<br/>
    {pokemon && ( // Add this line to conditionally render the content when pokemon is available
    <>
        <h2>{pokemon.name}</h2>
<div class="container">
  <div class="row">
    <div class="col-md">
      One of three columns
    </div>
    <div class="col-md">
      One of three columns
    </div>
  </div>
</div>
        <a href={pokemon.photo} target="_blank" rel="noopener noreferrer">
          <img height="400px" src={pokemon.photo} alt={pokemon.name} />
        </a>
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