import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PokemonItem = ({ id, name, type, photo, instagram, description }) => {
  // Function to render the description paragraphs
  const renderDescription = () => {
    return description.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
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
            {/* Assuming there is a function or mapping to get emoji from type */}
            {type} {/* Placeholder for emoji */}
          </Link>
        </div>
        <div className="pokemon-description">
          {renderDescription()}
        </div>
        <div className="pokemon-instagram">
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram Source</a>
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
