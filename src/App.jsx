import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import tituloImg from './img/titulo.png'; // Importa la imagen de tu título
import footerImg from './img/pokedex.png'; // Importa la imagen de tu footer
import myAudio from './assets/myaudio.mp3'; // Importa el archivo MP3

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [audio] = useState(new Audio(myAudio)); // Inicializa el estado con el audio
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si el audio está reproduciéndose o no

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

  const getPokedexUrl = (pokemonName) => {
    return `https://www.pokemon.com/el/pokedex/${pokemonName}`;
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause(); // Pausa el audio si está reproduciéndose
    } else {
      audio.play(); // Reproduce el audio si no está reproduciéndose
    }
    setIsPlaying(!isPlaying); // Cambia el estado de isPlaying
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
              <a href={getPokedexUrl(pokemon.name)} target="_blank" rel="noopener noreferrer">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </a>
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
      <div className="audio-controls">
          <button className="control-button" onClick={toggleAudio}>
            {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
          </button>
      </div>
    </div>
  );
}

export default App;

//como se aplica 