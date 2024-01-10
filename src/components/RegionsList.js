import React from 'react';
import { Link } from 'react-router-dom';
import regionsData from '../data/regions.json';

const RegionsList = () => {
  return (
    <div>
      <h2>Regions</h2>
      <ul>
        {regionsData.map(region => (
          <li key={region.name}>
            <Link to={`/regions/${region.name}`}>{region.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionsList;