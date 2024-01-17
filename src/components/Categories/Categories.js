import React from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../../data/creatures/categories.json';

const Categories = () => {
  return (
    <div className="categories-list">
      {categoriesData.map((category) => (
        <Link key={category.name} to={`/categories/${category.name.replace(/\.|-|\s/g, '')}`} className="category-item">
          <img src={`${process.env.PUBLIC_URL}/${category.photo}`} alt={category.name} />
          <div>{category.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;