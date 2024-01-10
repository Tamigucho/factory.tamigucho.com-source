import React, { useState, useEffect } from 'react';
//import $ from 'jquery';
//import { Link } from 'react-router-dom';
import pokemonsData from '../data/pokemons.json';
import PokemonItem from './PokemonItem';
//import { Dropdown } from 'bootstrap-material-design';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CreaturesPage = () => {

    //useEffect(() => {
    //    new Dropdown(document.querySelector('.dropdown-toggle'));
    //  }, []);

//    useEffect(() => {
//        $('.dropdown-toggle').dropdown();
//      }, []);

//useEffect(() => {
//    const element = document.querySelector('.dropdown-toggle');
//    const instance = new $.fn.dropdown.Constructor(element);
//  }, []);

//useEffect(() => {
//    $('.dropdown-toggle').dropdown();
//  }, []);

      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = pokemonsData.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(pokemonsData.length / itemsPerPage);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
      <div className="creatures-page">
        <h2>Creatures Dex <span className="badge bg-secondary">{pokemonsData.length}</span></h2>
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
<Dropdown isOpen={dropdownOpen} toggle={toggle}>
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

export default CreaturesPage;