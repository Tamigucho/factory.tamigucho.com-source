import React from 'react';
import { Link } from 'react-router-dom';
import mintablesData from '../../../../data/creatures/mintables.json';
import { Helmet } from 'react-helmet';

const MintablesPage = () => {
  return (
    <div>
    <Helmet>
        <title>Mintables - Tamigucho Factory</title>
        <meta property="og:title" content="Creature Categories - Tamigucho Factory" />
    </Helmet>
    <div className="mintables-page">
      <h2>Mintables <span className="badge bg-secondary">{mintablesData.length}</span></h2>
      <div className="mintables-list">
      <div className="mintables-item">
        {mintablesData.map((mintable, index) => (
          <div key={index} className="card">
            <img draggable="false" className="card-img-top" src={`${process.env.PUBLIC_URL}/${mintable.image}`} alt={mintable.name} />
            <div className="card-body">
              <h5 className="card-title">{mintable.name}</h5>
              <Link to={`/extra/mintables/${mintable.name}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div></div>
    </div>
    </div>
  );
};

export default MintablesPage;
