import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import * as mdb from 'mdb-ui-kit'; // lib
window.mdb = mdb;
import Header from './components/Header';
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import Footer from './components/Footer';
import TypeList from './components/Pages/Types/TypeList';
import TypePage from './components/Pages/Types/TypePage';
import pokemonsData from './data/pokemons.json';
import Genres from './components/Genres';
import GenrePage from './components/GenrePage';
import YearsPage from './components/Pages/Years/YearsPage'; // Import the new component
import YearPage from './components/Pages/Years/YearPage'; // Import the new component
import CreaturesPage from './components/CreaturesPage'; // Import the new component
import RegionPage from './components/RegionPage'; // Import the new component
import PokemonDetails from './components/PokemonDetails'; // Import the new component
import RegionsList from './components/RegionsList'; // Import the new component
import GamesPage from './components/GamesPage';
import GamePage from './components/GamePage';
import Chart from 'react-apexcharts';
import './styles/theme.css';
import './styles/other/blogger2013.css'

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [creatureCount, setCreatureCount] = useState(0); // New state for creatureCount

  useEffect(() => {
    setPokemons(pokemonsData);

    // Fetch creatureCount from public/api.json
    fetch('/api.json')
      .then(response => response.json())
      .then(data => setCreatureCount(data.creatureCount));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="App">
      <Header creatureCount={creatureCount} /> {/* Use the fetched creatureCount */}
      <Search onSearch={handleSearch} />
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
      <Routes>
        <Route path="/" element={<PokemonList pokemons={filteredPokemons} />} />
        <Route path="/creatures" element={<CreaturesPage />} />
        <Route path="/types" element={<TypeList />} />
        <Route path="/types/:typeName" element={<TypePage />} />
        <Route path={`/creatures/:name`} element={<PokemonDetails pokemons={pokemons} />} />
        <Route path="/regions" element={<RegionsList />} />
        <Route path="/regions/:regionName" element={<RegionPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:gameName" element={<GamePage />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genre" element={<GenrePage />} />
        <Route path="/years" element={<YearsPage />} />
        <Route path="/years/:year" element={<YearPage />} />
        {/* Add more routes as needed */}
      </Routes>
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
            <img draggable="false" alt="Phonemon" height="26px" src={`${process.env.PUBLIC_URL}/img/blogger2013/logotype.svg`}/>
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
      <Footer />
    </div>
  );
}

export default App;
