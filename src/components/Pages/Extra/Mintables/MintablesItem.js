import React from 'react';
import { useParams } from 'react-router-dom';
import mintablesData from '../../../../data/creatures/mintables.json';

const MintablesItem = () => {
  const { mintableName } = useParams();
  const mintable = mintablesData.find(m => m.name === mintableName);

  if (!mintable) {
    return <div>Mintable not found</div>;
  }

  return (
    <div className="mintable-details">
      <h1>{mintable.name}</h1>
      <img src={`../../${mintable.image}`} alt={mintable.name} />
      <div className="links">
        <a href={mintable.OpenSea} target="_blank" rel="noopener noreferrer">OpenSea</a>
        <a href={mintable.BlockchainScan} target="_blank" rel="noopener noreferrer">BlockchainScan</a>
        <a href={mintable.Arweave} target="_blank" rel="noopener noreferrer">Arweave</a>
      </div>
    </div>
  );
};

export default MintablesItem;
