import React from 'react';
import { useParams } from 'react-router-dom';
import mintablesData from '../../../../data/creatures/mintables.json';
import { Helmet } from 'react-helmet';

const MintablesItem = () => {
  const { mintableName } = useParams();
  const mintable = mintablesData.find(m => m.name === mintableName);

  if (!mintable) {
    return <div>Mintable not found</div>;
  }

  return (
    <div class="mintable-details">
  <Helmet>
      <title>{mintable.name} - Tamigucho Factory</title>
      <meta property="og:title" content={`${mintable.name} - Tamigucho Factory`} />
      <meta property="og:description" content={mintable.description} />
      <meta property="og:image" content={mintable.image} />
  </Helmet>
      <div class="container">
  <div class="row">
    <div class="col-md">
      <img draggable="false" class="cover" src={`${process.env.PUBLIC_URL}/${mintable.image}`} alt={mintable.name} />
          <a title="Click to Zoom/open img on new tab" href={`${process.env.PUBLIC_URL}/${mintable.image}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a>
          <a title="Source post at Lens' Orb.ac" href={mintable.Orb} target="_blank" rel="noopener noreferrer"><i><img src="../../img/social/button/orb.svg" width="16px" height="16px"></img></i></a>
      </div>
      <div class="col-md mintable-details">
      <h1>{mintable.name}</h1>
      <div className="links">
        <a href={mintable.OpenSea} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary"><img src="../../img/social/button/opensea.svg" width="32px" height="32px"></img> OpenSea</button></a>
        <a href={mintable.BlockchainScan} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary"><img src="../../img/social/button/etherscan.svg" width="32px" height="32px"></img> BlockchainScan</button></a>
        <a href={mintable.Arweave} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary"><img src="../../img/social/button/arweave.svg" width="32px" height="32px"></img> Arweave</button></a>
        <a href={mintable.ipfs} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary"><img src="../../img/ui/ipfs-c.svg" width="32px" height="32px"></img> IPFS</button></a>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default MintablesItem;
