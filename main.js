document.addEventListener("DOMContentLoaded", function() {
  const pokemonInfoDiv = document.getElementById("pokemonInfo");

  // Función para obtener un número aleatorio entre 1 y 898 (el número total de Pokémon disponibles)
  function getRandomPokemonId() {
      return Math.floor(Math.random() * 898) + 1;
  }

  // Array para almacenar los Pokémon aleatorios
  const randomPokemonIds = [];

  // Genera 10 Pokémon aleatorios y almacénalos en el array
  for (let i = 0; i < 10; i++) {
      randomPokemonIds.push(getRandomPokemonId());
  }

  // Realiza solicitudes a la API para obtener datos de los Pokémon aleatorios
  const promises = randomPokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()));

  // Procesa las promesas cuando todas estén resueltas
  Promise.all(promises)
      .then(pokemonDataArray => {
          // Muestra la información de los Pokémon en la página
          pokemonDataArray.forEach(data => {
              const nombre = data.name;
              const peso = data.weight / 10; // Convertir a kg
              const altura = data.height / 10; // Convertir a metros
              const imagenUrl = data.sprites.front_default;

              const pokemonElement = document.createElement("div");
              pokemonElement.innerHTML = `
                  <h2>${nombre}</h2>
                  <p>Peso: ${peso} kg</p>
                  <p>Altura: ${altura} m</p>
                  <img src="${imagenUrl}" alt="Imagen de ${nombre}">
              `;
              pokemonInfoDiv.appendChild(pokemonElement);
          });
      })
      .catch(error => {
          pokemonInfoDiv.innerHTML = `Error al cargar información de Pokémon: ${error.message}`;
      });
});