import React from 'react';
import { Link, useParams } from 'react-router-dom';
import gamesData from '../../../data/games.json';
import regionsData from '../../../data/regions.json';

const GamePage = () => {
  const { gameName } = useParams();
  const game = gamesData.find(game => game.name.replace(/&|\s/g, '') === gameName);
  const region = regionsData.find(region => region.games.includes(game.name));

  return (
    <div class="game-details">
    <Helmet>
        <title>{game.name} - Tamigucho Factory</title>
        <meta property="og:title" content={`${game.name} - Tamigucho Factory`} />
        <meta property="og:description" content={game.description} />
        <meta property="og:image" content={game.photo} />
    </Helmet>
        <center><h2>{game.name}</h2></center>
        <div class="container">
  <div class="row">
  <div class="col-md">
          <img draggable="false" class="cover" src={`${process.env.PUBLIC_URL}/${game.photo}`} alt={game.name} />
          <a title="Click to Zoom/open img on new tab" href={`${process.env.PUBLIC_URL}/${game.photo}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a>
    </div>
    <div class="col-md">
    <h3>Region: <Link to={`/regions/${region.name.replace(/&|\s/g, '')}`}>{region.name}</Link></h3>
    <h3>Launched in: <Link to={`/years/${game.launch_year}`}>{game.launch_year}</Link></h3>
    <Link target="_blank" to={`${game.site}`}><button type="button" class="btn btn-primary" data-mdb-ripple-init><img src={`https://www.google.com/s2/favicons?domain=${game.site}&sz=32`} /> Site</button></Link>
    <p>{game.description}</p>
    </div>
  </div>
  </div>
    </div>
  );
};

export default GamePage;