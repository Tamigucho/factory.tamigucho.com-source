import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pokemonsData from '../../../data/pokemons.json';
import PokemonItem from '../../PokemonItem';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const GenrePage = () => {
    const { genre } = useParams();
    const [pokemonsByGenre, setPokemonsByGenre] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggle = () => setDropdownOpen(prevState => !prevState);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = pokemonsByGenre.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(pokemonsByGenre.length / itemsPerPage);

  useEffect(() => {
    const filteredPokemons = pokemonsData.filter(pokemon => pokemon['genre-species'][0] === genre);
    setPokemonsByGenre(filteredPokemons);
  }, [genre]);

  return (
    <div className="genre-page">
    <Helmet>
        <title>{genre} Scientific Genre - Tamigucho Factory</title>
        <meta property="og:title" content={`${genre} Scientific Genre - Tamigucho Factory`} />
    </Helmet>
      <h2><small>Pokémon Scientific Genre: </small>{genre} <span className="badge bg-secondary" title={`Total Pokémons in this genre: ${pokemonsByGenre.length}`}>{pokemonsByGenre.length}</span></h2>
      <div className="pokemon-list">
      {currentItems.map((pokemon, index) => (
  <PokemonItem key={index} {...pokemon} />
))}
      </div>
      <nav aria-label="Page navigation">
  <ul className="pagination">
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
    </li>
    {[...Array(totalPages)].map((e, i) => (
      <li className={`page-item ${i + 1 === currentPage ? 'active' : ''}`} key={i}>
        <a className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</a>
      </li>
    ))}
    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
      <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
    </li>
  </ul>
</nav> <Dropdown isOpen={dropdownOpen} toggle={toggle}>
  <DropdownToggle caret>
    Items per page
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem onClick={() => setItemsPerPage(10)}>10</DropdownItem>
    <DropdownItem onClick={() => setItemsPerPage(20)}>20</DropdownItem>
    <DropdownItem onClick={() => setItemsPerPage(50)}>50</DropdownItem>
    <DropdownItem onClick={() => setItemsPerPage(100)}>100</DropdownItem>
  </DropdownMenu>
</Dropdown>
    </div>
  );
};

export default GenrePage;