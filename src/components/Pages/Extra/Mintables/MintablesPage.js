import React from 'react';
import { Link } from 'react-router-dom';
import mintablesData from '../../../../data/creatures/mintables.json';
import { Helmet } from 'react-helmet';

const MintablesPage = () => {
  return (
    <div className="mintables-page">
    <Helmet>
        <title>Mintables - Tamigucho Factory</title>
        <meta property="og:title" content="Creature Categories - Tamigucho Factory" />
    </Helmet>
      <h2>Mintables <span className="badge bg-secondary">{mintablesData.length}</span></h2>
      <h4><a href="https://danimesq.com/" target="_blank">Daniella</a> Mesquita's hand-drawn original Tamiguchos are now mintable.</h4>
      <h6>These <a href="https://www.lens.xyz/" target="_blank">Lens</a> collectables will be later convertible into cards (or somewhat else nice) which will enable some perks. For example, owning a "[Super] Treearth" hand-drawn card would make the owner elligible for in-game items such as a Treearthium gem, the Sync Gem and an exclusive <a href="https://tamigucho.com/tamipedia/sprouterra/" target="_blank">Sprouterra</a> to use the later items once it morphs into Poterra -&gt; <a href="https://tamigucho.com/tamipedia/treearth/" target="_blank">Treearth</a>.</h6>
      <div className="mintables-list">
        {mintablesData.map((mintable, index) => (
          <div className="mintables-item" key={index}>
            <img draggable="false" src={`${process.env.PUBLIC_URL}/${mintable.image}`} alt={mintable.name} />
{mintable.name}
              <br/><Link to={`/extra/mintables/${mintable.id}`} className="btn btn-primary">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MintablesPage;
