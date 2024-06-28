let pokemonList = [];
let currentIndex = 0;

async function fetchPokemonData() {
    const response = await fetch('GetDataPHP.php');
    const data = await response.json();
    return data;
}

function renderPokemonSelector(pokemon) {
    const pokemonSelector = document.getElementById('pokemon-selector');
    pokemonSelector.innerHTML = `
        <img src="${pokemon.sprite}" class="img-fluid" alt="${pokemon.name}" style="max-width: 150px;">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    `;
}

function renderPokemonDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemon-details');
    pokemonDetails.innerHTML = `
        <ul class="list-group list-group-flush mt-3">
            <li class="list-group-item"><strong>Altura:</strong> ${pokemon.height} dm</li>
            <li class="list-group-item"><strong>Peso:</strong> ${pokemon.weight} hg</li>
            <li class="list-group-item"><strong>Habilidades:</strong>
                <ul>
                    ${pokemon.abilities.map(ability => `<li>${ability.charAt(0).toUpperCase() + ability.slice(1)}</li>`).join('')}
                </ul>
            </li>
        </ul>
    `;
}

function showNextPokemon() {
    currentIndex = (currentIndex + 1) % pokemonList.length;
    renderPokemonSelector(pokemonList[currentIndex]);
    hidePokemonDetails();
}

function showPrevPokemon() {
    currentIndex = (currentIndex - 1 + pokemonList.length) % pokemonList.length;
    renderPokemonSelector(pokemonList[currentIndex]);
    hidePokemonDetails();
}

function hidePokemonDetails() {
    document.getElementById('pokemon-details').style.display = 'none';
}

function showLoadingMessage() {
    const pokemonDetails = document.getElementById('pokemon-details');
    pokemonDetails.style.display = 'block';
    pokemonDetails.innerHTML = '<p>Cargando detalles del Pokémon...</p>';
}

document.getElementById('next-pokemon').addEventListener('click', showNextPokemon);
document.getElementById('prev-pokemon').addEventListener('click', showPrevPokemon);
document.getElementById('show-details').addEventListener('click', () => {
    showLoadingMessage();
    setTimeout(() => {
        renderPokemonDetails(pokemonList[currentIndex]);
    }, 1000);  // Simulación de tiempo de carga
});

document.addEventListener('DOMContentLoaded', async () => {
    pokemonList = await fetchPokemonData();
    renderPokemonSelector(pokemonList[currentIndex]);
});
