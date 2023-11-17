const button = document.getElementById('get-pokemon')
const infoPokemon = document.getElementById('info-pokemon')
const pokemonSelect = document.getElementById('pokemon-select')

//nombre, imagen, tipo, altura y peso.
button.addEventListener(('click'), () => {
    const pokemon = pokemonSelect.value;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    actualizarPokemon(url);
})
const actualizarPokemon = (url) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud ha fallado')
            } return response.json()
        })
        .then(data => {
            infoPokemon.innerHTML = "";
            const name = data.name;
            const types = data.types.map(type => type.type.name).join(', ');
            const height = data.height;
            const weight = data.weight;
            const image = data.sprites.front_default;
            infoPokemon.innerHTML += `
            <img src="${image}" alt="${name}"/>
            <div class="valores">
            <p><span>Name: </span>${name}</p>
            <p><span>Types: </span>${types}</p>
            <p><span>Height: </span>${height}dm</p>
            <p><span>Weight: </span>${weight}hgms</p>
            </div>
            `

        })
        .catch(error => infoPokemon.innerHTML = `No se pudieron obtener los datos, ${error}`)
}

