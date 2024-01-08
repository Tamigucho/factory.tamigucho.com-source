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
  const [pokemonCount, setPokemonCount] = useState(0); // New state for pokemonCount

  useEffect(() => {
    setPokemons(pokemonsData);

    // Fetch pokemonCount from public/api.json
    fetch('/api.json')
      .then(response => response.json())
      .then(data => setPokemonCount(data.pokemonCount));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const series = [{
    name: 'New creatures',
    data: [2, 8, 7, 23, 6, 9, 10, 12, 12, 18, 2, 1, 39, 13, 10]
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
      categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
  };

  return (
    <div className="App">
      <Header pokemonCount={pokemonCount} /> {/* Use the fetched pokemonCount */}
      <Search onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<PokemonList pokemons={filteredPokemons} />} />
        <Route path="/type" element={<TypeList />} />
        <Route path="/type/:typeName" element={<TypePage />} />
        <Route path="/:name" element={<PokemonDetails pokemons={pokemons} />} />
        {/* Add more routes as needed */}
      </Routes>
      <Chart options={options} series={series} type="line" height={350} />
      <Footer />
    </div>
  );
}

export default App;
