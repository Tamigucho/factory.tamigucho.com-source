import React from 'react';
import { Link } from 'react-router-dom';
import regionsData from '../data/regions.json';

const GamesPage = () => {
  // Get all unique games from all regions
  const games = [...new Set(regionsData.flatMap(region => region.games))];

  return (
    <div>
      <h2>Games <span className="badge bg-secondary">{games.length}</span></h2>
      <div className="game-list">{games.map(game => (
          <Link to={`/games/${game.replace(/&|\s/g, '')}`}><div className="game-item">
                <div className="game-photo">
        <img draggable="false" src={`${process.env.PUBLIC_URL}/${game.photo}`} alt={game} />
    </div>
    <div className="game-info">
        <h3>{game}</h3>
        {/*<div className="pokemon-type">
          Type: {Array.isArray(type) ? (
            type.map((t, index) => (
              <Link to={`/types/${t}`} key={index} className={`type-badge type-${t.toLowerCase()}`}>
                {getTypeEmoji(t)} {t}
              </Link>
            ))
          ) : (
            <Link to={`/types/${type}`} className={`type-badge type-${type.toLowerCase()}`}>
              {getTypeEmoji(type)} {type}
            </Link>
          )}
          </div>*/}
      </div>
</div></Link>
        ))}
    </div></div>
  );
};

export default GamesPage;