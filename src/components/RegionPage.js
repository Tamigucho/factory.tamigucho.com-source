import React from 'react';
import { useParams } from 'react-router-dom';
import regionsData from '../data/regions.json';

const RegionPage = () => {
  const { regionName } = useParams();
  const region = regionsData.find(region => region.name === regionName);

  return (
    <div>
      <h2>{region.name}</h2>
      <h3>Games</h3>
      <ul>
        {region.games.map(game => <li key={game}>{game}</li>)}
      </ul>
    </div>
  );
};

export default RegionPage;