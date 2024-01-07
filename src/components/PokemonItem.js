import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pokemonTypes from '../data/pokemonTypes.json'; // Import the Pokemon types data

const PokemonItem = ({ id, name, type, photo, instagram, description }) => {
  // Function to render the description paragraphs
  const renderDescription = () => {
    return description.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  // Function to get the emoji from the Pokemon type
  const getTypeEmoji = (type) => {
    const typeData = pokemonTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };


  return (
    <div className="pokemon-item">
      <div className="pokemon-photo">
        <img src={photo} alt={name} />
      </div>
      <div className="pokemon-info">
        <h3>{name}</h3>
        <div className="pokemon-type">
          <Link to={`/type/${type}`} className={`type-badge type-${type.toLowerCase()}`}>
            {getTypeEmoji(type)} {type}
          </Link>
        </div>
        <div className="pokemon-description">
          {renderDescription()}
        </div>
        <div className="pokemon-instagram">
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram Source</a>
        </div>
        <div className="more-details-link">
          <Link to={`/${name}`}>More details</Link>
        </div>
      </div>
    </div>
  );
};

PokemonItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonItem;
