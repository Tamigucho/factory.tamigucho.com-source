import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import TypeList from './components/TypeList';
import TypePage from './components/TypePage';
import pokemonsData from './data/pokemons.json';
import Footer from './components/Footer';
import PokemonDetails from './components/PokemonDetails'; // Import the new component
import Chart from 'react-apexcharts';
import './styles/theme.css';

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
      <Routes>
        <Route path="/" element={<PokemonList pokemons={filteredPokemons} />} />
        <Route path="/types" element={<TypeList />} />
        <Route path="/types/:typeName" element={<TypePage />} />
        <Route path="/:name" element={<PokemonDetails pokemons={pokemons} />} />
        {/* Add more routes as needed */}
      </Routes>
      <div class="chartyears">
      <p>new tami creatures:</p>
      <p>growth from 2010 to {lastYear}</p>
        <Chart options={options} series={series} type="line" height={350} />
        <ul class="nav nav-pills nav-fill mb-3">
          <li class="nav-item" role="presentation">
            <img alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2011/bulball.png`}/>
<img alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2011/logotype.png`}/>
          </li>
<li class="nav-item" role="presentation">
            <img alt="Phonemon" height="26px" src={`${process.env.PUBLIC_URL}/img/blogger2013/logotype.svg`}/>
          </li>
          <li class="nav-item" role="presentation">
            <img alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2015/logotype.png`}/>
          </li>
          <li class="nav-item" role="presentation">
            <img alt="Phonemon" height="36px" src={`${process.env.PUBLIC_URL}/img/institutional/2018/logotype.png`}/>
          </li>
<li class="nav-item" role="presentation">
            <img alt="Phonemon" height="36px" src="https://tamigucho.com/logotype.png"/>
          </li>
        </ul>  
        </div>
      <Footer />
    </div>
  );
}

export default App;
