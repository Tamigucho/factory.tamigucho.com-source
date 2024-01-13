{/* CTRL+K:"Please add two badges to the regions links: one counting how many Pokemons in /data/pokemons.json are using that region, and how many games are in that region (as in /data/regions.json)": */}
{/* CTRL+K:"
Uncaught runtime errors:
ERROR
pokemon.regions is undefined
./src/components/RegionsList.js/RegionsList/</<@http://localhost:3000/main.f09cf88c650161f950a5.hot-update.js:36:7": */}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import regionsData from '../data/regions.json';
import pokemonsData from '../data/pokemons.json';

const RegionsList = () => {
  const [regionCounts, setRegionCounts] = useState({});

  useEffect(() => {
    const counts = {};
    pokemonsData.forEach(pokemon => {
      let region = pokemon.region;
      if (!counts[region]) {
        counts[region] = { pokemonCount: 0, gameCount: 0 };
      }
      counts[region].pokemonCount++;
    });
    let pokemons = require('../data/pokemons.json');
    let regions = require('../data/regions.json');
    regions.forEach(region => {
      let pokemonCount = pokemons.filter(pokemon => pokemon.region === region.name).length;
      
      // Ensure region.games is always an array
      let games = Array.isArray(region.games) ? region.games : [region.games];
      let gameCount = games.length;
      
      // Ensure counts[region.name] object exists before setting gameCount
      if (!counts[region.name]) {
        counts[region.name] = { pokemonCount: 0, gameCount: 0 };
      }
      counts[region.name].gameCount = gameCount;
    });
    setRegionCounts(counts);
  }, []);

  return (
    <div>
      <h2>Regions <span className="badge bg-secondary">{regionsData.length}</span></h2>
      <div className="region-list">
      {regionsData.map(region => (
  <Link to={`/regions/${region.name}`}><div className="region-item">

<div className="region-photo">
            <img draggable="false" src={`${process.env.PUBLIC_URL}/${region.photo}`} alt={region.name} />
        </div>
        <div className="region-info">
            <h3>{region.name}</h3>
            <span className="badge bg-secondary" title="Number of creatures set in this region">🐾 {regionCounts[region.name]?.pokemonCount || 0}</span>
    <span className="badge bg-secondary" title="Number of games set in this region">🎮 {regionCounts[region.name]?.gameCount || 0}</span>
        </div>
  </div></Link>
))}
      </div>
    </div>
  );
};

export default RegionsList;