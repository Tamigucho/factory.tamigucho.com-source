import React from 'react';
import { Link } from 'react-router-dom';
//import regionsData from '../data/regions.json';
import gamesData from '../../../data/games.json';

const GamesPage = () => {
  // Get all unique games from all regions
  const games = gamesData;

  return (
    <div>
      <h2>Games <span className="badge bg-secondary">{games.length}</span></h2>
      <div className="game-list">{games.map(game => (
    <Link to={`/games/${game.name.replace(/&|\s/g, '')}`}><div className="game-item">
        <div className="game-photo">
            <img draggable="false" src={`${process.env.PUBLIC_URL}/${game.photo}`} alt={game.name} />
        </div>
        <div className="game-info">
            <h3>{game.name}</h3>
        </div>
    </div></Link>
))}
    </div></div>
  );
};

export default GamesPage;