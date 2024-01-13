import React from 'react';
import { Link } from 'react-router-dom';
import creatures from '../../../data/creatures.json';

const CreaturesList = () => {
  // Group creatures by year
  const creaturesByYear = creatures.reduce((groups, creatures) => {
    const year = creature.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(creatures);
    return groups;
  }, {});

  return (
    <div className="pokemon-list">
 {Object.entries(creaturesByYear).map(([year, creatures]) => (
  <div key={year} class="year-group">
  <h2>
    {year} <span className="badge bg-secondary" title={`Number of creatures made in this year: ${creatures.length}`}>{creatures.length}</span>
  </h2>
  {creatures.map((creatures) => (
    <Link key={creature.id} to={`/creatures/${creature.name.replace(/\.|-|\s/g, '')}`}>
    {creature.name}</Link>
      ))}
</div>
))}
    </div>
  );
};

export default CreaturesList;