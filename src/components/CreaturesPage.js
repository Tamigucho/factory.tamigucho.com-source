import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pokemonsData from '../data/pokemons.json';
import PokemonItem from './PokemonItem';

const CreaturesPage = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = pokemonsData.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(pokemonsData.length / itemsPerPage);
    return (
      <div className="creatures-page">
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
</nav>
<select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="50">50</option>
  <option value="100">100</option>
</select>
      </div>
    );
  };

export default CreaturesPage;