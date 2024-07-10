import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import tituloImg from './img/titulo.png'; // Importa la imagen de tu título

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const results = response.data.results;
        const specificPokemonNames = ['pidgey', 'pidgeotto', 'pidgeot', 'bulbasaur', 'ivysaur', 'venusaur'];
        const filteredPokemon = results.filter(pokemon => specificPokemonNames.includes(pokemon.name));

        const pokemonData = await Promise.all(
          filteredPokemon.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );
        setPokemonList(pokemonData.slice(0, 6)); // Mostrar solo los primeros 6 pokémon
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <div className="app-header">
        <img src={tituloImg} alt="Título" className="titulo-img" />
      </div>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="pokemon-info">
              <h3>{pokemon.name}</h3>
              <p>
                <strong>Height:</strong> {pokemon.height} | <strong>Weight:</strong> {pokemon.weight}
              </p>
              <a href={pokemon.species.url}>More Info</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
