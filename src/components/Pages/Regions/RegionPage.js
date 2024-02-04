import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import regionsData from '../../../data/regions.json';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import pokemonsData from '../../../data/pokemons.json';
import PokemonItem from '../../PokemonItem';
import gamesData from '../../../data/games.json';
import { Helmet } from 'react-helmet';

//const PokemonItem = ({ id, name, type, photo }) => (
//    <div>
//    <img src={photo} alt={name} />
//    <h2>{name}</h2>
//    <p>{type}</p>
//  </div>
//);

const RegionPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pokemonsByRegion, setPokemonsByRegion] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pokemonsByRegion.slice(indexOfFirstItem, indexOfLastItem);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const { regionName } = useParams();
    const region = regionsData.find(region => region.name === regionName);
  
    {currentItems.map((pokemon, index) => (
        <PokemonItem key={index} {...pokemon} />
      ))}

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const totalPages = Math.ceil(pokemonsByRegion.length / itemsPerPage);

useEffect(() => {
    const filteredPokemons = pokemonsData.filter(pokemon => pokemon.region === region.name);
    setPokemonsByRegion(filteredPokemons);
  }, [region]);

    // Ensure region.games is always an array
    const games = Array.isArray(region.games) ? region.games : [region.games];
  
    return (
      <div>
      <Helmet>
          <title>{region.name} - Tamigucho Factory</title>
          <meta property="og:title" content={`${region.name} - Tamigucho Factory`} />
          <meta property="og:image" content={region.photo} />
      </Helmet>
        <center><h2>{region.name}</h2><img height="250px" src={`${process.env.PUBLIC_URL}/${region.photo}`}/>
         <a title="Click to Zoom/open img on new tab" href={`${process.env.PUBLIC_URL}/${region.photo}`} target="_blank" rel="noopener noreferrer"><i class="fas fa-magnifying-glass-plus"></i></a>
        </center>
        <h3>Games <span className="badge bg-secondary" title={`Set in the ${region.name} region: ${games.length} games`}>{games.length}</span></h3>
        <div className="game-list">{games.map(game =>
        <Link to={`/games/${game.replace(/&|\s/g, '')}`}><div className="game-item">
          <div className="game-photo">
            <img draggable="false" src={`${process.env.PUBLIC_URL}/${game.photo}`} alt={game.name} />
        </div>
        <div className="game-info">
            <h3>{game.name} {game}</h3>
        </div>
          </div></Link>
        )}</div>
        <h3>Pokémons <span className="badge bg-secondary" title={`Total Pokémons in this genre: ${pokemonsByRegion.length}`}>{pokemonsByRegion.length}</span></h3>
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

export default RegionPage;