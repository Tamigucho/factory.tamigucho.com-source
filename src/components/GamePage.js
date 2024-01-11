import React from 'react';
import { Link, useParams } from 'react-router-dom';
import gamesData from '../data/games.json';
import regionsData from '../data/regions.json';

const GamePage = () => {
  const { gameName } = useParams();
  const game = gamesData.find(game => game.name.replace(/&|\s/g, '') === gameName);
  const region = regionsData.find(region => region.games.includes(game.name));

  return (
    <div class="game-details">
        <center><h2>{game.name}</h2></center>
        <div class="container">
  <div class="row">
  <div class="col-md">
          <img draggable="false" class="cover" src={`${process.env.PUBLIC_URL}/${game.photo}`} alt={game.name} />
          <a title="Click to Zoom/open img on new tab" href={`${process.env.PUBLIC_URL}/${game.photo}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a>
    </div>
    <div class="col-md">
    <h3>Region: <Link to={`/regions/${region.name.replace(/&|\s/g, '')}`}>{region.name}</Link></h3>
    <p>{game.description}</p>
    </div>
  </div>
  </div>
    </div>
  );
};

export default GamePage;