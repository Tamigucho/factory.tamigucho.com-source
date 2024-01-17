import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pokemonsData from '../../data/pokemons.json';
import PokemonItem from '../PokemonItem';
import categoriesData from '../../data/creatures/categories.json';
import typesData from '../../data/types.json';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [category, setCategory] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

// Add this function
const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// Add these calculations
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  useEffect(() => {
    const foundCategory = categoriesData.find(category => category.name.replace(/\.|-|\s/g, '') === categoryName);
    if (foundCategory) {
      setCategory(foundCategory);
      const categoryPokemons = pokemonsData.filter(pokemon => pokemon.categories && pokemon.categories.includes(foundCategory.name));
      setPokemons(categoryPokemons);
    }
  }, [categoryName]);

  return (
    <div>
      {category && (
        <div class="category-details">
        <center><h2>{category.name} <span className="badge bg-secondary" title={`Total Pokémons in this category: ${pokemons.length}`}>{pokemons.length}</span></h2></center>
<div class="container">
  <div class="row">
  <div class="col-md">
  <img src={`${process.env.PUBLIC_URL}/${category.photo}`} alt={category.name} />
    </div>
    <div class="col-md">
    <p><b>Description</b>:</p><p>{category.description}</p>
    </div>
  </div>
  </div>
        </div>
      )}
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

export default CategoryPage;