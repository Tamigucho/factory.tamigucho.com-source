import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Search for Pokémons..."
        onChange={handleInputChange}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Search;
