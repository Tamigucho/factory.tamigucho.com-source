import React from 'react';
import { Link } from 'react-router-dom';
import mintablesData from '../../../../data/creatures/mintables.json';

const MintablesPage = () => {
  return (
    <div className="mintables-page">
      <h1>Mintables</h1>
      <div className="mintables-list">
        {mintablesData.map((mintable, index) => (
          <div key={index} className="card">
            <img className="card-img-top" src={`../${mintable.image}`} alt={mintable.name} />
            <div className="card-body">
              <h5 className="card-title">{mintable.name}</h5>
              <Link to={`/extra/mintables/${mintable.name}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MintablesPage;
