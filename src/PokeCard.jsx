import { useState } from "react";

// Se crea la funcion para cada card de Pokemon. Esta recibe la pokemonData creada en App.jsx
export default function PokeCard({pokemonData}){ 

    const [iShiny, setiShiny] = useState (false) // Crea un estado que es iShiny de valor false

    return(
        <div className="bg-white w-60 p-5 m-5 rounded-xl flex flex-auto  flex-col items-center">
            <img className="size-40" src={ iShiny ? pokemonData.sprites.front_shiny :  pokemonData.sprites.front_default} alt="Pokemon image"/>
            {/* A traves de un operador ternario, valida si iShiny es true, en caso afirmativo, muestra el sprite del shiny. En caso, falso, muestra el normal */}
            <div className="w-full px-3 mb-3">
                <h3 className="capitalize font-bold w-full">
                    {pokemonData.name} {/* En el h3 muestra el nombre del poke */}
                </h3>
                <p className="inline-block">ID: {pokemonData.id}</p> {/* Y en el p, muestra el id del poke */}
            </div>
            <button className="bg-amber-300 p-2 rounded-xl" onClick={ () => setiShiny(!iShiny)}> {/* En un boton, muestra el estado contrario de setiShiny (si es true, lo pone false y al contrario) */}
                Is shiny?
            </button>
        </div>
    )
}