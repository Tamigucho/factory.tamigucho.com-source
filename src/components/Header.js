import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import pokemons from '../data/pokemons.json';

const Header = ({ creatureCount }) => {
  const location = useLocation();
  const currentYear = Math.max(...pokemons.map(pokemon => pokemon.year));
  const yearsPassed = currentYear - 2010;
  const tooltip = `There are ~${creatureCount} Pokémons in existence from 2010 to ${currentYear} (${yearsPassed} years)`;
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <logo alt="Phonemon" title="Phonemon">
          <span className="badge bg-secondary" title={tooltip}>{creatureCount}</span></logo>
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
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">
                Home</Link>
              </li>
              <li className="nav-item">
              <Link className={`nav-link ${location.pathname.startsWith('/creatures') ? 'active' : ''}`} to="/creatures">
                Creatures Dex</Link></li>
              <li className="nav-item">
              <Link className={`nav-link ${location.pathname.startsWith('/types') ? 'active' : ''}`} to="/types">
                Types</Link></li>
                <li className="nav-item">
  <Link className={`nav-link ${location.pathname.startsWith('/genres') ? 'active' : ''}`} to="/genres">
    Genres
  </Link></li>
  <li className="nav-item">
                <Link className={`nav-link ${location.pathname.startsWith('/years') ? 'active' : ''}`} to="/years">
                  Years</Link></li>
                <li className="nav-item"><Link className={`nav-link ${location.pathname.startsWith('/regions') ? 'active' : ''}`}  to="/regions">Regions</Link></li>
  <li className="nav-item"><Link className={`nav-link ${location.pathname.startsWith('/games') ? 'active' : ''}`} to="/games">
    Games
  </Link>
</li>
<li className="nav-item">
  <Link className={`nav-link ${location.pathname.startsWith('/categories') ? 'active' : ''}`} to="/categories">
    Categories
  </Link>
</li>
<li className="nav-item"><Link target="_blank" className="nav-link" to="/classic/">Classic Site</Link></li>
              {/* Add more navigation items as needed */}
            </ul>
          </div>
        </div>
      </nav>
            {/*CTRL+K:"Whats wrong here?":*/}
            {/*CTRL+K:"Whats wrong here?":*/}
            <a 
        title="Login with your Plasmmer account" 
        href="https://accounts.plasmmer.com/login?redirectto=phonemons.github.io" 
        className="btn btn-light btn-sm" 
        style={{
        float: 'right',
        top: '-50px',
        zIndex: 1
      }}
      >
        <div 
          style={{
            background: 'url(https://web.archive.org/web/20230405192028/https://orgut.co/PF.Site/flavors/bootstrap/assets/logos/logo_default.png) no-repeat no-repeat 0px 0px',
            width: '32px',
            height: '32px',
            backgroundSize: '168px',
            padding: '0 0px 0px 0px',
            verticalAlign: 'middle',
            display: 'inline-block'
          }}
        >
        </div> Sign-in
      </a>
    </header>
  );
};

Header.propTypes = {
  creatureCount: PropTypes.number.isRequired
};

export default Header;
