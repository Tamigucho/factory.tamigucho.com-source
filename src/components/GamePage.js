import React from 'react';
import { Link, useParams } from 'react-router-dom';
import gamesData from '../data/games.json';
import regionsData from '../data/regions.json';

const GamePage = () => {
  const { gameName } = useParams();
  const game = gamesData.find(game => game.name.replace(/&|\s/g, '') === gameName);
  const region = regionsData.find(region => region.games.includes(game.name));

  return (
    <div>
      <h2>{game.name}</h2>
      <img src={`/img/games/${gameName}/boxes.png`} alt={game.name} />
      <h3>Region: <Link to={`/regions/${region.name.replace(/&|\s/g, '')}`}>{region.name}</Link></h3>
      <p>{game.description}</p>
    </div>
  );
};

export default GamePage;