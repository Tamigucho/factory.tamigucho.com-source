import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import pokemons from '../data/pokemons.json';
import pokemonTypes from '../data/creatures/types.json';
import pokemonsData from '../data/pokemons.json'; // Import the Pokemon data
import categoriesData from '../data/creatures/categories.json';
import { Helmet } from 'react-helmet';

const PokemonDetails = ({ pokemons }) => {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams();

  const navigate = useNavigate();
  const [prevPokemon, setPrevPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);

  // Extract the cartoon and pixel icons from the pokemon object
  const cartoonIcon = pokemon ? (pokemon.icon[0].cartoon || "https://assets.tamigucho.com/assets/cms2/img/tamipedia/icon/cartoon/Unknown.png") : "https://assets.tamigucho.com/assets/cms2/img/tamipedia/icon/cartoon/Unknown.png";
  const pixelIcon = pokemon ? (pokemon.icon[0].pixel || "https://www.pokencyclopedia.info/sprites/menu-icons/ico_old/ico_old_000_1.png") : "https://www.pokencyclopedia.info/sprites/menu-icons/ico_old/ico_old_000_1.png";
  let creaturePhoto = pokemon && pokemon.photo ? (pokemon.photo.startsWith('http') ? pokemon.photo : `${process.env.PUBLIC_URL}/${pokemon.photo}`) : "default_image_url";
  let prevCreaturePhoto = prevPokemon && prevPokemon.photo ? (prevPokemon.photo.startsWith('http') ? prevPokemon.photo : `${process.env.PUBLIC_URL}/${prevPokemon.photo}`) : "default_image_url";
  let nextCreaturePhoto = nextPokemon && nextPokemon.photo ? (nextPokemon.photo.startsWith('http') ? nextPokemon.photo : `${process.env.PUBLIC_URL}/${nextPokemon.photo}`) : "default_image_url";

  // Define handleGenderSwitch function here
// src/components/PokemonDetails.js
const handleGenderSwitch = (newGender) => {
  console.log('handleGenderSwitch called with newGender:', newGender);
  if (newGender === 'female' && !femaleData.name) {
    fetch('/data/pokemons-female.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Log the processed names for comparison
        console.log('Processed names from pokemons-female.json:', data.map(entry => entry.name.toLowerCase().replace(/[^a-z0-9]/gi, '')));
        console.log('Processed name from pokemon:', pokemon.name.toLowerCase().replace(/[^a-z0-9]/gi, ''));

        const femaleEntry = data.find(entry => entry.name.toLowerCase().replace(/[^a-z0-9]/gi, '') === pokemon.name.toLowerCase().replace(/[^a-z0-9]/gi, ''));
        setFemaleData(femaleEntry || {});
        console.log('femaleData after fetch:', femaleData); // Add this line to check the state
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  setGender(newGender);
};

  const [loading, setLoading] = useState(true);

  const [evolutions, setEvolutions] = useState([]);

  // Add new state for gender and female data
  const [femaleData, setFemaleData] = useState({});
  const [gender, setGender] = useState('male');

  // Define activeData here, after all state hooks
  const activeData = gender === 'female' && femaleData.name ? { ...pokemon, ...femaleData } : pokemon;

  useEffect(() => {
    handleGenderSwitch('male'); // Assuming 'male' is the default gender
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    console.log('femaleData updated:', femaleData);
  }, [femaleData]); // Log when femaleData changes

  useEffect(() => {
    if (pokemons && pokemons.length > 0) {
      const originalName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      //const foundPokemon = pokemons.find(pokemon => pokemon.name.replace(/\.|\s|&/g, '') === name);
      const foundPokemon = pokemons.find(pokemon => pokemon.name.replace(/\.|\s|-|&/g, '') === name);

      console.log('pokemons:', pokemons);
      console.log('name:', name);
      console.log('originalName:', originalName);
      if (foundPokemon) {
        setPokemon(foundPokemon);

        // Load female data on component mount
        if (pokemon && gender === 'female') {
          fetch('/data/pokemons-female.json')
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const femaleEntry = data.find(entry => entry.name.toLowerCase().replace(/[^a-z0-9]/gi, '') === pokemon.name.toLowerCase().replace(/[^a-z0-9]/gi, ''));
              setFemaleData(femaleEntry || {});
              console.log('femaleData after fetch:', femaleData); // Add this line to check the state
            })
            .catch(error => {
              console.error('There has been a problem with your fetch operation:', error);
            });
        }

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
}, [name, pokemons, pokemon, gender]);

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
    <Helmet>
        <title>{pokemon.name}</title>
        <meta property="og:title" content={pokemon.name} />
        <meta property="og:description" content={pokemon.description} />
        <meta property="og:image" content={imageUrl} />
      </Helmet>
    <ul class="nav nav-pills nav-fill mb-3">
{prevPokemon && (
  <li class="nav-item prev-button" title={prevPokemon.name} onClick={() => navigate(`/creatures/${prevPokemon.name.replace(/\.|-|\s/g, '')}`)}>
    ← Previous <img draggable="false" src={`${prevCreaturePhoto}`} alt={prevPokemon.name} /> <span><b>{prevPokemon.name}</b> (Nº {prevPokemon.id})</span>
  </li>
)}
{nextPokemon && (
  <li class="nav-item next-button" title={nextPokemon.name} onClick={() => navigate(`/creatures/${nextPokemon.name.replace(/\.|-|\s/g, '')}`)}>
     <span><b>{nextPokemon.name}</b> (Nº {nextPokemon.id})</span> <img draggable="false" src={`${nextCreaturePhoto}`} alt={nextPokemon.name} /> Next →
  </li>
)}
</ul>
<br/>
    {pokemon && (
    <>
        <center><h2><div className="tamicons">
            <div className="cartoon">
              <img title="icon cartoon" alt="icon cartoon" src={cartoonIcon} />
            </div>
            <div className="pixel">
              <img title="icon pixel" alt="icon pixel" src={pixelIcon} />
            </div>
          </div>
          {activeData.name} <small>(Nºs {activeData.id} / {activeData.biyearly_id})</small>
          </h2><div className="gender-switch"><button class={`default active`}>♂️</button><button className={`female`}>♀️</button></div></center>
<div class="container">
  <div class="row">
    <div class="col-md">
          <img draggable="false" height="400px" src={`${creaturePhoto}`} alt={activeData.name} />
          <a title="Click to Zoom/open img on new tab" href={`${creaturePhoto}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a> <a title="Source photo at Instagram" href={activeData.instagram} target="_blank" rel="noopener noreferrer"><i alt="Source" className="fab fa-instagram"></i></a>
    </div>
    <div class="col-md pokemon-details">
    <div class="pedia-switch">
      <button class="red active"></button>
      <button class="blue"></button>
    </div>
    {activeData.description.map((line, index) => <p key={index}>{line}</p>)}
    <p>Genre: <Link to={`/genres/${activeData['genre-species'][0]}`} className={`genre-badge genre-${activeData['genre-species'][0].toLowerCase()}`}>
    {activeData['genre-species'][0]}
  </Link>{activeData['genre-species'][1]}
</p>
    <p>Type: {Array.isArray(activeData.type) ? (
    activeData.type.map((type, index) => (
      <Link to={`/types/${type}`} key={index} className={`type-badge type-${type.toLowerCase()}`}>
        {getTypeEmoji(type)} {type}
      </Link>
    ))
  ) : (
    <Link to={`/types/${activeData.type}`} className={`type-badge type-${activeData.type.toLowerCase()}`}>
      {getTypeEmoji(activeData.type)} {activeData.type}
    </Link>
  )}
</p>
<p>Region: <Link to={`/regions/${activeData.region}`}>{activeData.region}</Link></p>
<p>Official generation: {activeData.official_gen}</p>
<p>Biyearly generation: {activeData.biyearly_gen}</p>
<p>Created in: <Link to={`/years/${activeData.year}`}>{activeData.year}</Link></p>
<p>Real-life inspiration: <Link target="_blank" to={`${activeData['reallife_inspo'][0]['link']}`}>{activeData['reallife_inspo'][0]['name']}</Link></p>
{activeData.categories && (
  <p>Categories: {activeData.categories.map((category, index) => (
    <Link key={index} to={`/categories/${category.replace(/\.|-|\s/g, '')}`} className="category-badge">
      {category}
    </Link>
  ))}</p>
)}
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
    const evolutionData = pokemons.find(pokemon => pokemon.name.replace(/\.|\s|-|&/g, '') === evolutionName.replace(/\.|\s|-|&/g, ''));
    console.log('evolutionData:', evolutionData);
    return (
        <li key={index} class="evolution-item">
    {evolution === activeData.name ? 
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
    </>
    )}
  </div>
);
};

export default PokemonDetails;