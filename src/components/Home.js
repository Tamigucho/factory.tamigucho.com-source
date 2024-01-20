import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import pokemonsData from '../data/pokemons.json';
import PokemonList from './PokemonList';
import featuredPokemons from '../data/creatures/featured.json';
import PokemonItem from './PokemonItem';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
      setPokemons(pokemonsData); // Set pokemons to pokemonsData
      setFeatured(featuredPokemons.map(name => pokemonsData.find(pokemon => pokemon.name === name)));
    }, [pokemonsData, featuredPokemons]); // Empty dependency array means this effect runs once on mount.

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleSearch = (term) => {
        setSearchTerm(term);
      };

  const groupByYear = (data) => {
    return data.reduce((groups, pokemon) => {
      const year = pokemon.year;
      if (!groups[year]) {
        groups[year] = 0;
      }
      groups[year]++;
      return groups;
    }, {});
  };
  
  const pokemonsByYear = groupByYear(pokemonsData);
  const years = Object.keys(pokemonsByYear);
  const counts = Object.values(pokemonsByYear).map(count => count.toString());
  
  const lastYear = Math.max(...pokemons.map(pokemon => pokemon.year));

  const series = [{
    name: 'New creatures',
    data: counts
  }];
  
  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: years,
    },
    colors:['#ff5722'],
    markers: {
      colors: ['#ff5722']
   },
   fill: {
    colors: ['#121435']
  }
//   dataLabels: {
//    style: {
//      colors: ['#ff5722']
//    }
//  },
//  fill: {
//    colors: ['#ff5722']
//  }
  };

  return (
    <div>
    <div id="header-wrapper">
    <div id="adssection">
    <div class="adssection no-items section" id="adssection"></div>
    </div>
    <div class="section" id="header"><div class="widget Header" data-version="1" id="Header1">
    <div id="header-inner">
    <img draggable="false" alt="Phonemon" height="76px" src={`${process.env.PUBLIC_URL}/img/blogger2013/logotype.svg`} width="307px"/>
    </div>
    </div></div>
    <div id="andlogo"></div></div>
    <center>
    <br/><br/><h5>Digital animals created since 2010 to {lastYear} by <a href="https://danimesq.github.io/" target="_blank">Daniella Mesquita</a>.</h5></center>
    <hr/>
    <h1>Featured Phonemons/Tamiguchos</h1>
<p>Click them to see their details.</p>
<div className="featured-pokemons">
  <div className="pokemon-list">
  {featured.map(pokemon => (
    <PokemonItem key={pokemon.id} {...pokemon} />
  ))}
  </div>
</div>
<hr/>
<h1 id="mainnav">Navigation</h1><ul><li>Soon.</li></ul>
<p>Since 2010, me, <a href="https://danimesq.github.io/" target="_blank">Daniella Mesquita</a>, hasn't stopped even a single year creating these mons. I was able to see new mons even in the form of a cloud or a water dropplet that could inspire me to create something new. They were originally intended to be Pokémons, but who know if they won't someday? All I can do now is to open the multiverse to free the mon-catching universe off Nintendo's walled garden. My original dream was that The Pokémon Company could listen to its fans, but I wasn't so wrong as DeFi's community-ownership is here to stay and: if the community can't be heard, they build that themselves. That's what the Tamigucho Universe should be about.</p>
<p>If you think "Pokémon is a legalized roosterfight", please read my <a href="https://twitter.com/DaniMesqBR/status/1538582659722625025" target="_blank">thread (in Portuguese) at Twitter</a> (I'll never call it "X").</p>
<div class="chartyears">
      <p>new tami creatures:</p>
      <p>growth from 2010 to {lastYear}</p>
        <Chart options={options} series={series} type="line" height={350} />
        <ul class="nav nav-pills nav-fill mb-3">
          <li class="nav-item" title="2011-2013">
            <img draggable="false" alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2011/bulball.png`}/>
<img draggable="false" alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2011/logotype.png`}/>
          </li>
<li class="nav-item" title="2013-2015">
            <img draggable="false" alt="Phonemon" height="26px" src={`${process.env.PUBLIC_URL}/img/institutional/2013/logotype.svg`}/>
          </li>
          <li class="nav-item" title="2015-2018">
            <img draggable="false" alt="Phonemon" height="16px" src={`${process.env.PUBLIC_URL}/img/institutional/2015/logotype.png`}/>
          </li>
          <li class="nav-item" title="2018-2023">
            <img draggable="false" alt="Phonemon" height="36px" src={`${process.env.PUBLIC_URL}/img/institutional/2018/logotype.png`}/>
          </li>
<li class="nav-item" title="2023-present">
            <img draggable="false" alt="Phonemon" height="36px" src="https://tamigucho.com/logotype.png"/>
          </li>
        </ul>  
    </div>

    <p><b>Trivia:</b></p>
    <ul>
    <li>At the time, 2014 was in the 2nd place as the year with less mons created, losing only to 2010. 2020 that changed (you know why, the world changed in a way didn't had anymore to hide myself drawing another universe bc I could now see hope of change and build my personal life), as 2020 surpassed 2014 as 2nd and 2021 surpassed 2010 as the year with less mons created.</li>
    <li>2013 and 2022 were Phonemon/Tamigucho's ATHs (All Time Highs), the years with most mons created since 2010.</li>
    <li>From 2014 to 2018, new mons creation was growing through 4 years non-stopping. Even with the hell we suffered in 2018, things got worse when the unnameable started governing here. And yes, 2014 was a horrid year and I was trying to keep my mental sanity in 2015 (which didn't worked at the time).</li>
    <li>A depression started in December 2021 through 2022 is what led me to forget my personal life and begin drawing the most mons I ever did before.</li>
    {/* CTRL+K: "Please fix the style syntax for JSX.": */}
    <li>After reaching its ATH in <a href="#2022">2022<span class="badge" style={{display: 'unset'}}>39</span></a>, new tami creations had a cooling in <a href="#2023">2023<span class="badge" style={{display: 'unset'}}>13</span></a>, being at front of <a href="#2017">2017<span class="badge" style={{display: 'unset'}}>12</span></a> levels by just 1 tamigucho.</li>
    </ul>

    <p><b>Gens with the most tamis created</b>:</p>
<ol>
<li>👑🥇 2022</li>
<li>👑🥈 2013</li>
<li>👑🥉 2018</li>
</ol>
<p><b>Gens with the fewest tamis created</b>:</p>
<ol>
<li>👑🥇 2021</li>
<li>👑🥈 2010+2020 [DRAW]</li>
<li>👑🥉 2014</li>
</ol>
<p><small>These statistics aren't exact, because there were lost Tamiguchos drawn in 2010 and 2013.</small></p>

    <h1>🗓️ Years <small>and their creatures</small></h1>
    <PokemonList pokemons={filteredPokemons} />
    
    </div>
  );
}

export default Home;