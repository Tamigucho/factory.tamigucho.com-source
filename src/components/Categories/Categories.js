import React from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../../data/creatures/categories.json';

const Categories = () => {
  return (
    <div>
    <h2>Categories <span className="badge bg-secondary">{categoriesData.length}</span></h2>
    <div className="categories-list">
      {categoriesData.map((category) => (
        <Link key={category.name} to={`/categories/${category.name.replace(/\.|-|\s/g, '')}`}>
          <div className="category-item">
          <img src={`${process.env.PUBLIC_URL}/${category.photo}`} alt={category.name} />
          <h3>{category.name}</h3>
          </div></Link>
      ))}
    </div>
    </div>
  );
};

export default Categories;