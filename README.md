# React Material Pokémon Site

This project is a basic ReactJS template site that utilizes a theme similar to Daemonite's Material, but built with React components. It features a list of Pokémon that can be searched and filtered, with each Pokémon type having its own dedicated page.

## Features

- Material design theme similar to Daemonite's Material using Bootstrap.
- Pokémon list with search functionality.
- Each Pokémon has a photo, an Instagram source link, name, type, and a multi-line description.
- Types are color-coded and have assigned emojis, and each type has its own page.
- Real-time count of Pokémon displayed in the site's header badge.
- Publicly accessible JSON file containing a subset of the site's data.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/react-material-pokemon-site.git
cd react-material-pokemon-site
npm install
```

## Usage

To run the project locally, execute:

```bash
npm start
```

This will start the development server and open the project in your default web browser.

## Structure

The project is structured as follows:

- `package.json`: Project dependencies and scripts.
- `public/index.html`: The HTML template file.
- `src/index.js`: The entry point for the React application.
- `src/App.js`: The main React component that sets up routing and state management.
- `src/components/`: Directory containing all the React components.
  - `Header.js`: The site header with a Pokémon count badge.
  - `Search.js`: The search component for filtering Pokémon.
  - `PokemonList.js`: Component for rendering the list of Pokémon.
  - `PokemonItem.js`: Component for rendering an individual Pokémon entry.
  - `TypePage.js`: Component for rendering the page for a specific Pokémon type.
- `src/data/`: Directory containing JSON data.
  - `pokemonTypes.json`: JSON file with Pokémon type data.
  - `pokemons.json`: JSON file with Pokémon data used in the app.
- `public/pokemons.json`: Publicly accessible JSON file with Pokémon data.
- `src/styles/theme.css`: Custom theme styles for the site.
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `README.md`: Documentation for the project.

## Contributing

If you would like to contribute to this project, please feel free to make a pull request or open an issue on the [GitHub repository](https://github.com/your-username/react-material-pokemon-site).

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

Your Name

## Acknowledgments

- This project was inspired by Daemonite's Material design and the world of Pokémon.
- All Pokémon data and imagery are properties of their respective owners.
