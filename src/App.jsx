import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import tituloImg from './img/titulo.png'; // Importa la imagen de tu título
import footerImg from './img/pokedex.png'; // Importa la imagen de tu footer

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

  const getTypeColor = (type) => {
    switch (type) {
      case 'grass':
        return '#4CAF50'; // Verde
      case 'poison':
        return '#9C27B0'; // Morado
      case 'normal':
        return '#9E9E9E'; // Plomo
      case 'flying':
        return '#03A9F4'; // Celeste
      default:
        return '#9E9E9E'; // Plomo por defecto
    }
  };

  return (
    <div className='Principal'>
      <div className="titulo">
        <img src={tituloImg} alt="Título" className="titulo-img" />
      </div>
      <div className="App">
        <div className="pokemon-grid">
          {pokemonList.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <div className="pokemon-info">
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <p>
                  <strong>Height:</strong> {pokemon.height} | <strong>Weight:</strong> {pokemon.weight}
                </p>
                <div className="pokemon-types">
                  {pokemon.types.map((type, idx) => (
                    <button
                      key={idx}
                      style={{ backgroundColor: getTypeColor(type.type.name), color: '#fff', padding: '5px 10px', margin: '5px', borderRadius: '5px', border: 'none' }}
                    >
                      {type.type.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <a href="https://www.pokemon.com/el/pokedex" target="_blank" rel="noopener noreferrer">
          <img src={footerImg} alt="Footer" className="footer-img" />
        </a>
      </footer>
    </div>
  );
}

export default App;
