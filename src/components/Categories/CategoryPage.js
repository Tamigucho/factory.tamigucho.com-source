import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pokemonsData from '../../data/pokemons.json';
import categoriesData from '../../data/creatures/categories.json';
import typesData from '../../data/types.json';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [category, setCategory] = useState(null);
  const [pokemons, setPokemons] = useState([]);

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
        <div>
          <h2>{category.name}</h2>
          <img src={`${process.env.PUBLIC_URL}/${category.photo}`} alt={category.name} />
          <p>{category.description}</p>
        </div>
      )}
<div className="pokemon-list">
  {pokemons.map((pokemon) => {
    const creaturePhoto = pokemon.photo.startsWith('http') ? pokemon.photo : `${process.env.PUBLIC_URL}/${pokemon.photo}`;
    return (
      <Link key={pokemon.id} to={`/creatures/${pokemon.name.replace(/\.|-|\s/g, '')}`}>
        <div className="pokemon-item">
          <img src={creaturePhoto} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <div className="pokemon-type">Type: 
            {pokemon.type.map((type, index) => {
              const typeData = typesData.find(t => t.type === type);
              return (
                <Link key={index} to={`/types/${type}`} className={`type-badge type-${type.toLowerCase()}`}>
                  {typeData.emoji} {type}
                </Link>
              );
            })}
          </div>
        </div>
      </Link>
    );
  })}
</div>
    </div>
  );
};

export default CategoryPage;