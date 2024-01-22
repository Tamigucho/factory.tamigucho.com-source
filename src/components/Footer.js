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
      <div class="footer-shadow"></div>
      <center>Last update in {lastUpdate}.{/* <a href="http://status.gamlr.tld/" target="_blank">Status</a>.*/}</center>
      <a href="https://framework.js.org/" target="blank"><img src="https://img.shields.io/badge/built%20with-Framework.js%20(r3alpha)-00A185.svg"/></a>{/*<a href="https://plasnerd.github.io/PEHTML/" target="blank"><img src="https://plasnerd.github.io/PEHTML/img/seal-2.png" width="167px" height="94px" style="-webkit-user-drag:element"></a>*/}
      <div className="social-icons">
{/*<a href="https://play.google.com/store/apps/dev?id=5338162510346666546" target="blank"><img src="../../img/social/google-play.svg" width="40px" height="40px" title="Install our games and apps" alt="Play Store"></a>
<a href="https://instagram.com/GamlrGames" target="blank"><img src="../../img/social/instagram.svg" width="40px" height="40px" title="Follow us at Instagram" alt="Instagram"></a>
<a href="https://tiktok.com/@gamlrgames" target="blank"><img src="../../img/social/tiktok.svg" width="40px" height="40px" title="Watch our videos with news/gameplays/tutorials/competitions" alt="Tiktok" class="round"></a>
<a href="https://twitter.com/GamlrDAO/" target="blank"><img src="../../img/social/twitter.svg" width="40px" height="40px" title="Follow us and receive latest news feed about Gamlr's updates/new games" alt="Twitter"></a>
<a href=" https://www.youtube.com/@GamlrGames" target="blank"><img src="../../img/social/youtube.svg" width="40px" height="40px" title="Watch our videos with news/gameplays/tutorials/competitions" alt="Youtube" class="round"></a>
<a href="https://discord.gg/jZnq7hKwzF" target="blank"><img src="../../img/social/discord.svg" width="40px" height="40px" title="Chat and brainstorm with us on Discord!" alt="Discord" class="round"></a>
<a href="https://www.reddit.com/r/floflis/" target="blank"><img src="../../img/social/reddit.svg" width="40px" height="40px" title="Yes, we have a base in the Reddit planet" alt="Reddit" class="round"></a>
<a rel="me" href="https://mastodon.social/@floflis" target="blank"><img src="../../img/social/mastodon.svg" width="40px" height="40px" title="Follow us on Mastodon and receive latest news feed about Floflis and other useful projects" alt="Mastodon" class="round"></a>
<a href="https://riot.im/app/#/+floflis:matrix.org" target="blank"><img src="../../img/social/riot.svg" width="40px" height="40px" title="Chat with us or get support" alt="Riot.im" class="round"></a>
<a href="https://matrix.to/#/#openplanetnews:matrix.org" target="blank"><img src="../../img/social/riot.svg" width="40px" height="40px" title="Enable notifications for our updates" alt="Riot.im" class="round"></a>*/}
        <a href="https://github.com/Tamigucho/factory.tamigucho.com-source/" target="blank">
          <img src={`${process.env.PUBLIC_URL}/img/social/github.svg`} width="40px" height="40px" title="See first the news and improve Phonemon's site &amp; others in GitHub" alt="GitHub" />
        </a>
{/*<a href="https://gitlab.com/floflis" target="blank"><img src="../../img/social/gitlab.svg" title="See first the news and improve Floflis in GitLab" alt="GitLab" class="round" width="40px" height="40px"></a>--><!-- <a href="https://facebook.com/" target="blank"><img src="../../img/social/facebook.svg" width="40px" height="40px" title="Like us and receive latest news feed about FrameworkJS progress and other development tools" alt="Facebook"></a><a href="https://opencollective.com/floflis" target="blank"><img src="../../img/social/opencollective.svg" width="40px" height="40px" title="Contribute to Floflis in Open Collective" alt="Twitter"></a>--><!--<a href="https://.deviantart.com" target="blank"><img src="../../img/social/deviantart.svg" width="40px" height="40px" title="Follow us and receive latest backgrounds, designs and apps" alt="Deviantart"></a>*/}
      </div>
      <div className="social-buttons"></div>
{/*<div style="margin-top:55px;float:right;"><a href="./privacy.html">Privacy Policy</a></div>*/}
      <copyright>
        <center>
          <a href="https://aragon.plasmmer.com/#/tamigucho/" target="_blank">
            <img width="350px"  src={`${process.env.PUBLIC_URL}/img/institutional/DAO/5d30129fbe8118efde2a8a25_Badge Dark.svg`} />
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
