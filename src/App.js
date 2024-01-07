import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import TypePage from './components/TypePage';
import pokemonsData from './data/pokemons.json';
import Footer from './components/Footer';
import './styles/theme.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Assuming pokemonsData is the default export from pokemons.json
    setPokemons(pokemonsData);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header pokemonCount={filteredPokemons.length} />
      <Search onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<PokemonList pokemons={filteredPokemons} />} />
        <Route path="/type/:typeName" element={<TypePage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
