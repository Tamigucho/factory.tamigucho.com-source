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

  const [evolutions, setEvolutions] = useState([]);

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
        // Move these lines inside useEffect, after pokemon has been set
      // Find pre-evolutions
      const preEvolutions = pokemons.filter(p => Array.isArray(p.evolve) ? p.evolve.includes(foundPokemon.name) : p.evolve === foundPokemon.name);

      // Find evolutions
      let evolutions = Array.isArray(foundPokemon.evolve) ? foundPokemon.evolve : [foundPokemon.evolve];

      // Find evolutions of evolutions
      evolutions = evolutions.map(evo => {
        const evoPokemon = pokemons.find(p => p.name === evo);
        return evoPokemon && evoPokemon.evolve ? [...evolutions, evoPokemon.evolve] : evolutions;
      });

      // Combine pre-evolutions, current Pokemon, and evolutions
      const fullEvolutions = [...preEvolutions.map(p => p.name), foundPokemon.name, ...evolutions];

      setEvolutions(fullEvolutions);
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
    ← Previous <img draggable="false" src={`${process.env.PUBLIC_URL}/${prevPokemon.photo}`} alt={prevPokemon.name} /> <span><b>{prevPokemon.name}</b> (Nº {prevPokemon.id})</span>
  </li>
)}
{nextPokemon && (
  <li class="nav-item next-button" title={nextPokemon.name} onClick={() => navigate(`/creatures/${nextPokemon.name}`)}>
     <span><b>{nextPokemon.name}</b> (Nº {nextPokemon.id})</span> <img draggable="false" src={`${process.env.PUBLIC_URL}/${nextPokemon.photo}`} alt={nextPokemon.name} /> Next →
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
          <img draggable="false" height="400px" src={`${process.env.PUBLIC_URL}/${pokemon.photo}`} alt={pokemon.name} />
          <a title="Click to Zoom/open img on new tab" href={`${process.env.PUBLIC_URL}/${pokemon.photo}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a> <a title="Source photo at Instagram" href={pokemon.instagram} target="_blank" rel="noopener noreferrer"><i alt="Source" className="fab fa-instagram"></i></a>
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
<p>Region: <Link to={`/regions/${pokemon.region}`}>{pokemon.region}</Link></p>
<p>Official generation: {pokemon.official_gen}</p>
<p>Biyearly generation: {pokemon.biyearly_gen}</p>
<p>Created in: {pokemon.year}</p>
    </div>
  </div>
</div>

<section className="pokedex-pokemon-evolution section">
  <div className="column-12 dog-ear-bl push-1">
    <h2>Evolutions</h2>
    <ul>
      {evolutions.map((evolution, index) => (
        <li key={index}>
          {evolution === pokemon.name ? <mark>{evolution}</mark> : <Link to={`/creatures/${evolution}`}>{evolution}</Link>}
          {index < evolutions.length - 1 && ' > '}
        </li>
      ))}
    </ul>
  </div>
</section>
        {/*<section className="pokedex-pokemon-evolution section">
      <div className="column-12 dog-ear-bl push-1"><ul className="evolution-five evolution-profile match-height-tablet">
          {evolutions.map((evolution, index) => (
            <li key={index} className={index === 0 ? 'first' : index === evolutions.length - 1 ? 'last' : 'middle'}>
              <Link to={`/creatures/${evolution}`}>
                <img alt={evolution} src={`./img/${pokemon.year}/${pokemon.id}.svg`} />
                <h3>{evolution}</h3>
              </Link>
            </li>
          ))}
          </ul>
      </div>
    </section>*/}
    {/* Add more details about the specific Pokemon */}
    </>
    )}
  </div>
);
};

export default PokemonDetails;