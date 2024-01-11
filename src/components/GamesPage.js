import React from 'react';
import { Link } from 'react-router-dom';
import regionsData from '../data/regions.json';

const GamesPage = () => {
  // Get all unique games from all regions
  const games = [...new Set(regionsData.flatMap(region => region.games))];

  return (
    <div>
      <h2>Games <span className="badge bg-secondary">{games.length}</span></h2>
      <ul>
        {games.map(game => (
          <li key={game}>
            <Link to={`/games/${game.replace(/&|\s/g, '')}`}>{game}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesPage;