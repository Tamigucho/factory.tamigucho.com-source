import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import * as mdb from 'mdb-ui-kit'; // lib
window.mdb = mdb;
import Home from './components/Home'; // Import the Home component
import Header from './components/Header';
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import Footer from './components/Footer';
import TypeList from './components/Pages/Types/TypeList';
import TypePage from './components/Pages/Types/TypePage';
import pokemonsData from './data/pokemons.json';
import Genres from './components/Pages/Genres/Genres';
import GenrePage from './components/Pages/Genres/GenrePage';
import YearsPage from './components/Pages/Years/YearsPage'; // Import the new component
import YearPage from './components/Pages/Years/YearPage'; // Import the new component
import CreaturesPage from './components/CreaturesPage'; // Import the new component
import RegionPage from './components/Pages/Regions/RegionPage'; // Import the new component
import PokemonDetails from './components/PokemonDetails'; // Import the new component
import RegionsList from './components/Pages/Regions/RegionsList'; // Import the new component
import GamesPage from './components/Pages/Games/GamesPage';
import GamePage from './components/Pages/Games/GamePage';
import './styles/theme.css';
import './styles/other/blogger2013.css'

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setPokemons(pokemonsData); // Set pokemons to pokemonsData
  }, []); // Empty dependency array means this effect runs once on mount.

  const creatureCount = pokemons.length;

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <Header creatureCount={creatureCount} /> {/* Use the fetched creatureCount */}
      <Search onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
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
      <Footer />
    </div>
  );
}

export default App;
