import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import pokemonsData from '../data/pokemons.json';
import PokemonList from './PokemonList';
import featuredPokemons from '../data/creatures/featured.json';
import PokemonItem from './PokemonItem';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
      setPokemons(pokemonsData); // Set pokemons to pokemonsData
      setFeatured(featuredPokemons.map(name => pokemonsData.find(pokemon => pokemon.name === name)));
    }, [pokemonsData, featuredPokemons]); // Empty dependency array means this effect runs once on mount.

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleSearch = (term) => {
        setSearchTerm(term);
      };

  const groupByYear = (data) => {
    return data.reduce((groups, pokemon) => {
      const year = pokemon.year;
      if (!groups[year]) {
        groups[year] = 0;
      }
      groups[year]++;
      return groups;
    }, {});
  };
  
  const pokemonsByYear = groupByYear(pokemonsData);
  const years = Object.keys(pokemonsByYear);
  const counts = Object.values(pokemonsByYear).map(count => count.toString());
  
  const lastYear = Math.max(...pokemons.map(pokemon => pokemon.year));

  const series = [{
    name: 'New creatures',
    data: counts
  }];
  
  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: years,
    },
    colors:['#ff5722'],
    markers: {
      colors: ['#ff5722']
   },
   fill: {
    colors: ['#121435']
  }
//   dataLabels: {
//    style: {
//      colors: ['#ff5722']
//    }
//  },
//  fill: {
//    colors: ['#ff5722']
//  }
  };

  return (
    <div>
    <div id="header-wrapper">
    <div id="adssection">
    <div class="adssection no-items section" id="adssection"></div>
    </div>
    <div class="section" id="header"><div class="widget Header" data-version="1" id="Header1">
    <div id="header-inner">
    <img draggable="false" alt="Phonemon" height="76px" src={`${process.env.PUBLIC_URL}/img/blogger2013/logotype.svg`} width="307px"/>
    </div>
    </div></div>
    <div id="andlogo"></div></div>
    <center>
    <br/><br/><h5>Digital animals created since 2010 to {lastYear} by <a href="https://danimesq.github.io/" target="_blank">Daniella Mesquita</a>.</h5></center>
    <hr/>
    <h1>Featured Phonemons/Tamiguchos</h1>
<p>Click them to see their details.</p>
<div className="featured-pokemons">
  <div className="pokemon-list">
  {featured.map(pokemon => (
    <PokemonItem key={pokemon.id} {...pokemon} />
  ))}
  </div>
</div>
<hr/>
    <h1>🗓️ Years <small>and their creatures</small></h1>
    <PokemonList pokemons={filteredPokemons} />
    <div class="chartyears">
      <p>new tami creatures:</p>
      <p>growth from 2010 to {lastYear}</p>
        <Chart options={options} series={series} type="line" height={350} />
        <ul class="nav nav-pills nav-fill mb-3">
          <li class="nav-item" title="2011-2013">
            <img draggable="false" alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2011/bulball.png`}/>
<img draggable="false" alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2011/logotype.png`}/>
          </li>
<li class="nav-item" title="2013-2015">
            <img draggable="false" alt="Phonemon" height="26px" src={`${process.env.PUBLIC_URL}/img/institutional/2013/logotype.svg`}/>
          </li>
          <li class="nav-item" title="2015-2018">
            <img draggable="false" alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2015/logotype.png`}/>
          </li>
          <li class="nav-item" title="2018-2023">
            <img draggable="false" alt="Phonemon" height="36px" src={`${process.env.PUBLIC_URL}/img/institutional/2018/logotype.png`}/>
          </li>
<li class="nav-item" title="2023-present">
            <img draggable="false" alt="Phonemon" height="36px" src="https://tamigucho.com/logotype.png"/>
          </li>
        </ul>  
        </div>
    </div>
  );
}

export default Home;