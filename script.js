document.getElementById('pokemonForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    let pokemonName = document.getElementById('pokemonName').value.toLowerCase();

    // Llama a la API de PokéAPI -> esto es basicamente una promesa, es con fetch
    //Le paso el link hacia la api, con el nombre del pokemon, si encuentra el directorio entonces funcionará
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            //Aquí me retorna el json con la información del pokemon (json es como la BD (no relacional))
            return response.json();
        })
        //Aqui se ocupa el json retornado
        .then(pokemon => {
            // Voy a insertar todas estas etiquetas en el contenedor especificado
            document.getElementById('pokemonResult').innerHTML = `
                <h2>${pokemon.name}</h2> 
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Altura: ${pokemon.height / 10} m</p>
                <p>Peso: ${pokemon.weight / 10} kg</p>
                <p>Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            `;
        })
        .catch(error => {
            document.getElementById('pokemonResult').innerHTML = `<p>${error.message}</p>`;
        });
});
