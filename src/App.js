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
  
//console.log(counts);

  const series = [{
    name: 'New creatures',
    data: counts
  }];

  //console.log(series);
  
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
//      tickAmount: 6,
//      decimalsInFloat: 0,
//      labels: {
        //formatter: (value) => Math.floor(value),
        //formatter: function(val) {
          //return val.toFixed(0) // from this kitty https://github.com/apexcharts/apexcharts.js/issues/779#issuecomment-513794658
        //  return Math.floor(val) //from this kitty https://github.com/apexcharts/apexcharts.js/issues/798#issuecomment-576376743
        //}
//      }
    },
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
      <Chart options={options} series={series} type="line" height={350} />
      <Footer />
    </div>
  );
}

export default App;
