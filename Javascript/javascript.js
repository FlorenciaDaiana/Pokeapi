var pokeApi = "https://pokeapi.co/api/v2/pokemon"
var arrayDePokemones = []
let links = document.getElementById("links");

async function traerDatosDePokemon(url) {
  let response = await fetch(url, {
    method: "GET",
  })

  let data = await response.json();

  return data;
}

async function funcionNueva(url) {

  pokemonsList.innerHTML = "";

  arrayDePokemones = await traerDatosDePokemon(url);

  for (let i = 0; i < arrayDePokemones.results.length; i++) {
    let aux = await traerDatosDePokemon(arrayDePokemones.results[i].url);
    mostrarPokemon(aux)
  }
  
  links.innerHTML = (arrayDePokemones.previous) ? `<button onclick="funcionNueva('` + arrayDePokemones.previous + `')">Atrás</button>` : "";
  //Botón hacia adelante
  links.innerHTML += (arrayDePokemones.next) ? `<button onclick="funcionNueva('` + arrayDePokemones.next + `')">Siguiente</button>` : "";

}

funcionNueva(pokeApi)

function mostrarPokemon(pokemon) {
  pokemonsList.innerHTML += `<div class="card">
                                                  <p>${pokemon.id}</p>
                                                  <img src="${pokemon.sprites.front_default}" alt="">
                                                  <p>${pokemon.name}</p>
                                                  <p>Tipo: ${pokemon.types[0].type.name}</p>
                                                  ${pokemon.types[1] != undefined ? `<p>Tipo: ${pokemon.types[1].type.name}</p>` : ""}
                                                  </div>`;
}
  
async function filtrarPorPokemones() {
  var pokemonGuardado = (document.getElementById("BusquedaPokemon").value)
  var pokesNuevos = await traerDatosDePokemon('https://pokeapi.co/api/v2/pokemon?limit=1118')
  
  for (var i = 0; i < pokesNuevos.results.length; i++) {
    if (pokemonGuardado == pokesNuevos.results[i].name) {
      var pokemonEncontrado = await traerDatosDePokemon(pokesNuevos.results[i].url)
      pokemonsList.innerHTML = "";
      mostrarPokemon(pokemonEncontrado)
      return 
    }
  }

  alert("Sorry! We couldn't find any pokemon")
  funcionNueva(pokeApi)
  
}
