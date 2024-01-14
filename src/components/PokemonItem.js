import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import pokemons from '../data/pokemons.json';
import pokemonTypes from '../data/types.json'; // Import the Pokemon types data

const PokemonDetails = ({ pokemons }) => {
  const { name } = useParams();
  const pokemon = pokemons.find(p => p.name === name);
};

const PokemonItem = ({ id, name, type, photo, instagram, description }) => {
  // Function to get the emoji from the Pokemon type
  const getTypeEmoji = (type) => {
    const typeData = pokemonTypes.find((pokemonType) => pokemonType.type === type);
    return typeData ? typeData.emoji : '';
  };

  // Function to render the description paragraphs
  const renderDescription = () => {
    return description.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  return (
    <Link to={`/creatures/${name.replace(/\.|-|\s/g, '')}`}><div className="pokemon-item">
    <div className="pokemon-photo">
        <img draggable="false" src={`${process.env.PUBLIC_URL}/${photo}`} alt={name} />
    </div>
      <div className="pokemon-info">
        <h3>{name}</h3>
        <div className="pokemon-type">
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
        </div>
      </div>
    </div></Link>
  );
};

PokemonItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  photo: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonItem;
