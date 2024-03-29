import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import creatures from '../../../data/creatures.json';
import creaturesTypes from '../../../data/types.json';
import creaturesData from '../../../data/creatures.json'; // Import the Pokemon data

const CreatureDetails = ({ creatures }) => {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams();

  const navigate = useNavigate();
  const [prevPokemon, setPrevPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);

  const [loading, setLoading] = useState(true);

  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    if (creatures && creatures.length > 0) {
      const originalName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      //const foundPokemon = creatures.find(pokemon => creature.name.replace(/\.|\s|&/g, '') === name);
      const foundPokemon = creatures.find(pokemon => creature.name.replace(/\.|\s|-|&/g, '') === name);

      console.log('creatures:', creatures);
      console.log('name:', name);
      console.log('originalName:', originalName);
      if (foundPokemon) {
        setPokemon(foundPokemon);
        // Move these lines inside useEffect, after pokemon has been set
      // Find pre-evolutions
      const preEvolutions = creatures.filter(p => Array.isArray(p.evolve) ? p.evolve.includes(foundPokemon.name) : p.evolve === foundPokemon.name);

      // Find evolutions
      let evolutions = Array.isArray(foundPokemon.evolve) ? foundPokemon.evolve : [foundPokemon.evolve];

      // Find evolutions of evolutions
      evolutions = evolutions.map(evo => {
        const evoPokemon = creatures.find(p => p.name === evo);
        return evoPokemon && evoPokemon.evolve ? [...evolutions, evoPokemon.evolve] : evolutions;
      });

      // Combine pre-evolutions, current Pokemon, and evolutions
      const fullEvolutions = [...preEvolutions.map(p => p.name), foundPokemon.name, ...evolutions];

      setEvolutions(fullEvolutions);
        setLoading(false);
      }
  
      const fetchPokemon = () => {
        if (foundPokemon) {
          const sortedCreatures = [...creaturesData].sort((a, b) => a.id - b.id);
          const currentIndex = sortedCreatures.findIndex(p => p.id === foundPokemon.id);
  
      const prevPokemon = sortedCreatures[currentIndex - 1] || null;
      setPrevPokemon(prevPokemon);
  
      const nextPokemon = sortedCreatures[currentIndex + 1] || null;
      setNextPokemon(nextPokemon);
  
      console.log("Previous Poké: ", prevPokemon);
      console.log("Next Poké: ", nextPokemon);
    }
  };

    fetchPokemon();
  }
}, [name, creatures]);

if (loading) {
  return <div>Loading...</div>;
}

console.log('Pokemon name: ', creature.name);

  const getTypeEmoji = (type) => {
    const typeData = creaturesTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };

return (
  <div>
    <ul class="nav nav-pills nav-fill mb-3">
{prevPokemon && (
  <li class="nav-item prev-button" title={prevPokemon.name} onClick={() => navigate(`/creatures/${prevPokemon.name.replace(/\.|-|\s/g, '')}`)}>
    ← Previous <img draggable="false" src={`${process.env.PUBLIC_URL}/${prevPokemon.photo}`} alt={prevPokemon.name} /> <span><b>{prevPokemon.name}</b> (Nº {prevPokemon.id})</span>
  </li>
)}
{nextPokemon && (
  <li class="nav-item next-button" title={nextPokemon.name} onClick={() => navigate(`/creatures/${nextPokemon.name.replace(/\.|-|\s/g, '')}`)}>
     <span><b>{nextPokemon.name}</b> (Nº {nextPokemon.id})</span> <img draggable="false" src={`${process.env.PUBLIC_URL}/${nextPokemon.photo}`} alt={nextPokemon.name} /> Next →
  </li>
)}
</ul>
<br/>
    {pokemon && ( // Add this line to conditionally render the content when pokemon is available
    <>
        <center><h2>{creature.name} <small>(Nºs {creature.id} / {creature.biyearly_id})</small></h2></center>
        {/*<small>The {creature.biyearly_id}th Pokémon ever created.</small>*/}
<div class="container">
  <div class="row">
    <div class="col-md">
          <img draggable="false" height="400px" src={`${process.env.PUBLIC_URL}/${creature.photo}`} alt={creature.name} />
          <a title="Click to Zoom/open img on new tab" href={`${process.env.PUBLIC_URL}/${creature.photo}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a> <a title="Source photo at Instagram" href={creature.instagram} target="_blank" rel="noopener noreferrer"><i alt="Source" className="fab fa-instagram"></i></a>
    </div>
    <div class="col-md">
    <p>{creature.description.map((line, index) => <p key={index}>{line}</p>)}</p>
    <p>Genre: <Link to={`/genres/${pokemon['genre-species'][0]}`} className={`genre-badge genre-${pokemon['genre-species'][0].toLowerCase()}`}>
    {pokemon['genre-species'][0]}
  </Link> {pokemon['genre-species'][1]}
</p>
    <p>Type: {Array.isArray(creature.type) ? (
    creature.type.map((type, index) => (
      <Link to={`/types/${type}`} key={index} className={`type-badge type-${type.toLowerCase()}`}>
        {getTypeEmoji(type)} {type}
      </Link>
    ))
  ) : (
    <Link to={`/types/${creature.type}`} className={`type-badge type-${creature.type.toLowerCase()}`}>
      {getTypeEmoji(creature.type)} {creature.type}
    </Link>
  )}
</p>
<p>Region: <Link to={`/regions/${creature.region}`}>{creature.region}</Link></p>
<p>Official generation: {creature.official_gen}</p>
<p>Biyearly generation: {creature.biyearly_gen}</p>
<p>Created in: <Link to={`/years/${creature.year}`}>{creature.year}</Link></p>
<p>Real-life inspiration: <Link target="_blank" to={`${pokemon['reallife_inspo'][0]['link']}`}>{pokemon['reallife_inspo'][0]['name']}</Link></p>
    </div>
  </div>
</div>

<section className="pokedex-pokemon-evolution section">
  <div className="column-12 dog-ear-bl push-1">
    <h2>Evolutions</h2>
    <ul class="evolutions-graph">
    {evolutions.map((evolution, index) => {
  const evolutionName = typeof evolution === 'string' ? evolution : (evolution && evolution.name ? evolution.name : '');
  console.log('evolutionName:', evolutionName);
  if (evolutionName) {
    const evolutionData = creatures.find(pokemon => creature.name.replace(/\.|\s|-|&/g, '') === evolutionName.replace(/\.|\s|-|&/g, ''));
    console.log('evolutionData:', evolutionData);
    return (
        <li key={index} class="evolution-item">
    {evolution === creature.name ? 
          <mark>
            <img draggable="false" alt={evolution} src={`${process.env.PUBLIC_URL}/${evolutionData.photo}`} />
            <h3>{evolution}</h3>
          </mark> 
          : 
            <Link to={`/creatures/${evolution}`.replace(/\.|-|\s/g, '')}>
            <img draggable="false" alt={evolution} src={`${process.env.PUBLIC_URL}/${evolutionData.photo}`} />
            <h3>{evolution}</h3>
          </Link>
        }
        {index < evolutions.length - 1 && ' > '}
      </li>
    );
  }
})}
    </ul>
  </div>
</section>
    {/* Add more details about the specific Pokemon */}
    </>
    )}
  </div>
);
};

export default CreatureDetails;