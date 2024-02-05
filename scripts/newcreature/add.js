const { exec } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const templatePath = path.join(__dirname, '../../src/data/creatures/template.json');
const pokemonsPath = path.join(__dirname, '../../src/data/pokemons.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const pokemons = JSON.parse(fs.readFileSync(pokemonsPath, 'utf8'));

const latestId = pokemons[pokemons.length - 1].id;
const latestBiyearlyId = pokemons[pokemons.length - 1].biyearly_id;

const questions = [
  `Enter id (latest id is ${latestId}): `,
  `Enter biyearly_id (latest biyearly_id is ${latestBiyearlyId}): `,
  'Enter name: ',
  'Enter types (comma separated): ',
  'Enter cartoon icon URL (leave empty if none): ',
  'Enter pixel icon URL (leave empty if none): ',
  'Enter photo URL: ',
  'Enter Instagram link (leave empty if none): ',
  'Enter description line 1: ',
  'Enter description line 2: ',
  'Enter region: ',
  'Enter biyearly gen: ',
  'Enter official gen: ',
  'Enter year: ',
  'Enter evolve to (leave empty if none): ',
  'Enter genre-species (comma separated): ',
  'Enter real life inspo name (leave empty if none): ',
  'Enter real life inspo link (leave empty if none): ',
  'Enter categories (comma separated, leave empty if none): '
];

function askQuestion(index = 0, answers = []) {
  if (index < questions.length) {
    rl.question(questions[index], (answer) => {
      answers.push(answer);
      askQuestion(index + 1, answers);
    });
  } else {
    rl.close();
    processAnswers(answers);
  }
}

function processAnswers(answers) {
  const [id, biyearly_id, name, types, cartoon, pixel, photo, instagram, description1, description2, region, biyearly_gen, official_gen, year, evolve, genreSpecies, realLifeName, realLifeLink, categories] = answers;
  const newCreature = { ...template, id: parseInt(id), biyearly_id: parseInt(biyearly_id), name, type: types.split(','), icon: [{ cartoon, pixel }], photo, instagram, description: [description1, description2], region, biyearly_gen: parseInt(biyearly_gen), official_gen: parseInt(official_gen), year: parseInt(year), evolve, 'genre-species': genreSpecies.split(','), reallife_inspo: [{ name: realLifeName, link: realLifeLink }], categories: categories.split(', ') };
  pokemons.push(newCreature);
  fs.writeFileSync(pokemonsPath, JSON.stringify(pokemons, null, 2));
  console.log('New creature added successfully!');
}

exec('simple-scan', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

askQuestion();
