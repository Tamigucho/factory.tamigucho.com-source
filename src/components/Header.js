import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ pokemonCount }) => {
  const currentYear = new Date().getFullYear();
  const yearsPassed = currentYear - 2010;
  const tooltip = `There are ~${pokemonCount} Pokémons in existence from 2010 to ${currentYear} (${yearsPassed} years)`;
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Pokémons <span className="badge bg-secondary" title={tooltip}>{pokemonCount}</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {/* Add more navigation items as needed */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  pokemonCount: PropTypes.number.isRequired
};

export default Header;
