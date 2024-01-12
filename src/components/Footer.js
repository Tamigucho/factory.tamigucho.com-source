import React, { useEffect, useState } from 'react';
import pokemons from '../data/pokemons.json';
//import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

const Footer = () => {
  const [lastUpdate, setLastUpdate] = useState('');
  const lastYear = Math.max(...pokemons.map(pokemon => pokemon.year));

  useEffect(() => {
    const date = new Date();
    setLastUpdate(date.toString());
  }, []);

  return (
    <footer className="footer">
      <center>Last update in {lastUpdate}.</center>
      <div className="social-icons">
        <a href="https://github.com/Tamigucho/factory.tamigucho.com/" target="blank">
          <img src={`${process.env.PUBLIC_URL}/img/social/github.svg`} width="40px" height="40px" title="See first the news and improve Phonemon's site &amp; others in GitHub" alt="GitHub" />
        </a>
      </div>
      <div className="social-buttons"></div>
      <copyright>
        <center>
          <a href="https://aragon.plasmmer.com/#/tamigucho/" target="_blank">
            <img width="350px"  src={`${process.env.PUBLIC_URL}/img/5d30129fbe8118efde2a8a25_Badge Dark.svg`} />
          </a>
          <br />
          (c) 2010-{lastYear} Phonemon by <a target="_blank" href="https://tamigucho.com/" style={{opacity: 'unset'}}>
            <img height="16px" alt="The Tamigucho DAO" src="https://tamigucho.com/logotype-old.png" title="The Tamigucho DAO" />
          </a> + <a target="_blank" href="https://gamlr.gg/" style={{opacity: 'unset'}}>
            <img alt="Gamlr DAO" src="https://gamlr.gg/press/press-kit/img/logotype-plain_white.svg" title="Gamlr DAO" height="18px" />
          </a> + <a target="_blank" href="https://plasmmer.com/" style={{opacity: 'unset'}}>
            <img height="16px" alt="Plasmmer DAO" src="https://plasmmer.com/press/press-kit/img/logotype-plain_white.svg" title="Plasmmer DAO" />
          </a>.
        </center>
      </copyright>
    </footer>
  );
};

export default Footer;
