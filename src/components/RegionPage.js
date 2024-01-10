import React from 'react';
import { useParams } from 'react-router-dom';
import regionsData from '../data/regions.json';

const RegionPage = () => {
    const { regionName } = useParams();
    const region = regionsData.find(region => region.name === regionName);
  
    // Ensure region.games is always an array
    const games = Array.isArray(region.games) ? region.games : [region.games];
  
    return (
      <div>
        <h2>{region.name}</h2>
        <h3>Games <span className="badge bg-secondary" title={`Set in the ${region.name} region: ${games.length} games`}>{games.length}</span></h3>
        <ul>
          {games.map(game => <li key={game}>{game}</li>)}
        </ul>
      </div>
    );
  };

export default RegionPage;