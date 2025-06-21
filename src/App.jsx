import { useState, useEffect } from 'react' // Se importan los hook desde react
import PokeCard from './PokeCard';
import Title from '../src/assets/A-simply-Pokedex.png'

function App() { // Se crea la funcion

  const [pokemonData, setPokemonData] = useState([]); // Se crea una constante que obtendra los datos del Pokemon con un useState en null

  const [isLoading, setIsLoading] = useState(true); // Establece un estado para evaluar si esta cargando

  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'; // Se crea la constante que guarda la url base de la API

  const MAX_POKEMON = 1025; // Pone un tope para evitar que hayan mas pokes que los que tiene la API

  // Se crea la funcion asincrona que hace el fetch de todos los pokes
  const fetchAllPokemons = async () => {

    // Crea una variable para validar cuantos pokes quiere ver el usuario
    let numPoke = prompt("Cuantos pokes quieres ver?");

    // Lo recibido lo convierte en un entero de base 10
    numPoke = parseInt(numPoke, 10);

    
    if (
      
      isNaN(numPoke) || // Evalua si numPoke es NaN
      numPoke < 1 || // O si numPoke es menor a 1
      numPoke > MAX_POKEMON // O si numPoke es mayor a MAX_POKEMON (1025)
    ) {
      alert(`Por favor, ingresa un número entre 1 y ${MAX_POKEMON}.`); // En caso de que sea mayor o menor, pide al usuario que ponga un numero valido
      setIsLoading(false); // Y quita el estado setIsLoading
      return;
    }

  try {
    const promises = []; // Si el valor de numPoke es valido, se crea un array que recibe promesas
    for (let i = 1; i <= numPoke; i++) { // Y crea un for que empieza desde 1 (let i = 1), y mientras que i sea menor o igual a numPoke, sigue el bucle
      promises.push(fetch(`${BASE_URL}${i}`).then(res => res.json())); // Luego, al array de promises = [], se le pushea cada extraccion del fetch (fetch(`${BASE_URL}${i}`)) y este convierte a un objeto de JS usando JSON
    }
    const results = await Promise.all(promises); // Guarda en una constante que espera todas las promesas a traves de Promise.all(promises)
    const sortedResults = results.sort((a, b) => a.id - b.id); // Luego, se ordena este array de objetos usando el valor de la propiedad id de cada objeto
    setPokemonData(sortedResults); // Y setPokemonData recibe los resultados organizados
  } catch (error) { // En caso de error, muestra un error en consola
    console.error("Error cargando Pokémon:", error);
  } finally { // Luego, al final de todo, quita el estado de carga
    setIsLoading(false);
  }
};

  useEffect(() => { // Carga directamente una sola vez al cargar la pagina
    fetchAllPokemons() // Llama a la funcion fetchAllPokemons()
  }, []) // Ya que no necesitamos parametros en el hook, el array queda vacio

  return (
    <main className='min-h-[100vh] min-w-full bg-amber-100'>
      <div className='flex justify-center'>
        <img className='h-40' src={Title} alt="" />
      </div>
      <h1 className='text-center font-black text-6xl hidden'>A simply Pokedex!</h1>
      <div className='p-10 flex flex-wrap justify-center'>

        {/* Valida el estado isLoading a traves de un operador ternario, en caso afirmativo (es true), entonces da una pantalla de carga */}
        {isLoading ? ( 
          <div className="min-h-[100vh] absolute bg-white inset-0 flex flex-col items-center justify-center">
            <img className="m-10" src="https://media.tenor.com/2lFt6lp1KaMAAAAj/run-pokemon.gif" alt="pikachu running"/>
            <p className="text-2xl font-semibold">Cargando, por favor espera...</p>
          </div>
        ) : (
          pokemonData.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemonData={pokemon}/>
          )) 
        )} {/* Valida el estado pokemonData (que es un array) y por cada poke, accede al id y lo agrega a la key (se necesita para el funcionamiento de map). Luego, le pasa los datos del pokemon a pokemonData (una prop de PokeCard) */}
      </div>
    </main>
  );
}

export default App