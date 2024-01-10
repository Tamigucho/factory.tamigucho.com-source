import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import pokemonTypes from '../data/pokemonTypes.json';
import pokemonsData from '../data/pokemons.json'; // Import the Pokemon data

const PokemonDetails = ({ pokemons }) => {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams();

  const navigate = useNavigate();
  const [prevPokemon, setPrevPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemons && pokemons.length > 0) {
      const originalName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      const foundPokemon = pokemons.find(pokemon => {
        const pokemonNameWithPeriods = pokemon.name.replace(/[\s.]/g, '-').toLowerCase();
        const pokemonNameWithoutPeriods = pokemon.name.replace(/[\s.]/g, '-').replace(/\./g, '').toLowerCase();
        return pokemonNameWithPeriods === originalName.toLowerCase() || pokemonNameWithoutPeriods === originalName.toLowerCase();
      });

      console.log('pokemons:', pokemons);
      console.log('name:', name);
      console.log('originalName:', originalName);
      if (foundPokemon) {
        setPokemon(foundPokemon);
        setLoading(false);
      }
  
      const fetchPokemon = () => {
        if (foundPokemon) {
          const sortedPokemons = [...pokemonsData].sort((a, b) => a.id - b.id);
          const currentIndex = sortedPokemons.findIndex(p => p.id === foundPokemon.id);
  
      const prevPokemon = sortedPokemons[currentIndex - 1] || null;
      setPrevPokemon(prevPokemon);
  
      const nextPokemon = sortedPokemons[currentIndex + 1] || null;
      setNextPokemon(nextPokemon);
  
      console.log("Previous Poké: ", prevPokemon);
      console.log("Next Poké: ", nextPokemon);
    }
  };

    fetchPokemon();
  }
}, [name, pokemons]);

if (loading) {
  return <div>Loading...</div>;
}

console.log('Pokemon name: ', pokemon.name);

  const getTypeEmoji = (type) => {
    const typeData = pokemonTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };

return (
  <div>
    <ul class="nav nav-pills nav-fill mb-3">
{prevPokemon && (
  <li class="nav-item prev-button" title={prevPokemon.name} onClick={() => navigate(`/creatures/${prevPokemon.name}`)}>
    ← Previous <img src={`${process.env.PUBLIC_URL}/${prevPokemon.photo}`} alt={prevPokemon.name} /> <span><b>{prevPokemon.name}</b> (Nº {prevPokemon.id})</span>
  </li>
)}
{nextPokemon && (
  <li class="nav-item next-button" title={nextPokemon.name} onClick={() => navigate(`/creatures/${nextPokemon.name}`)}>
     <span><b>{nextPokemon.name}</b> (Nº {nextPokemon.id})</span> <img src={`${process.env.PUBLIC_URL}/${nextPokemon.photo}`} alt={nextPokemon.name} /> Next →
  </li>
)}
</ul>
<br/>
    {pokemon && ( // Add this line to conditionally render the content when pokemon is available
    <>
        <center><h2>{pokemon.name} <small>(Nºs {pokemon.id} / {pokemon.biyearly_id})</small></h2></center>
        {/*<small>The {pokemon.biyearly_id}th Pokémon ever created.</small>*/}
<div class="container">
  <div class="row">
    <div class="col-md">
    <a href={`${process.env.PUBLIC_URL}/${pokemon.photo}`} target="_blank" rel="noopener noreferrer">
          <img height="400px" src={`${process.env.PUBLIC_URL}/${pokemon.photo}`} alt={pokemon.name} />
        </a> <a href={pokemon.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Source</a>
    </div>
    <div class="col-md">
    <p>{pokemon.description.map((line, index) => <p key={index}>{line}</p>)}</p>
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
<p>Region: {pokemon.region}</p>
<p>Official generation: {pokemon.official_gen}</p>
<p>Biyearly generation: {pokemon.biyearly_gen}</p>
<p>Created in: {pokemon.year}</p>
    </div>
  </div>
</div>
    {/* Add more details about the specific Pokemon */}
    </>
    )}
  </div>
);
};

export default PokemonDetails;