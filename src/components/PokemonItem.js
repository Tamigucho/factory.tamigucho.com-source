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
    if (Array.isArray(type)) {
      return type.map(t => {
        const typeData = pokemonTypes.find(pokemonType => pokemonType.type === t);
        return typeData ? typeData.emoji : '';
      }).join(' ');
    } else {
      const typeData = pokemonTypes.find(pokemonType => pokemonType.type === type);
      return typeData ? typeData.emoji : '';
    }
  };

  return (
    <div className="pokemon-item">
      <div className="pokemon-photo">
        <img src={photo} alt={name} />
      </div>
      <div className="pokemon-info">
        <h3>{name}</h3>
        <div className="pokemon-type">
        <Link to={`/type/${type[0]}`} className={`type-badge type-${type[0].toLowerCase()}`}>
  {getTypeEmoji(type[0])} {type[0]}
</Link>
{type.length > 1 && (
  <Link to={`/type/${type[1]}`} className={`type-badge type-${type[1].toLowerCase()}`}>
    {getTypeEmoji(type[1])} {type[1]}
  </Link>
)}
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
