const fs = require('fs');

// Read the pokemons.json file
const pokemonsData = JSON.parse(fs.readFileSync('src/data/pokemons.json'));

// Get the total count of pokemons
const totalPokemonCount = pokemonsData.length;

// Create the object to be written to api.json
const apiData = {
  pokemonCount: totalPokemonCount
};

// Write the data to api.json
fs.writeFileSync('public/api.json', JSON.stringify(apiData, null, 2));
