let pokemonRepository = (function() {
  let pokemonList = [{
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Pikachu',
      height: 0.4,
      types: ['electric']
    },
    {
      name: 'Jigglypuff',
      height: 0.5,
      types: ['fairy', 'normal']
    },
  ];

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event) {
      showDetails(pokemon)
    });
  };

  function showDetails(pokemon) {
    console.log(pokemon.name);
  };

  return {
    add: function(pokemon) {
      if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'height' in pokemon &&
        'types' in pokemon
      ) {
        pokemonList.push(pokemon)
      } else {
        console.log('pokemon is not correct');
      };
    },
    getAll: function() {
      return pokemonList;
    },
    addListItem: addListItem
  };
})();

pokemonRepository.add({
  name: 'Slowpoke',
  height: 1.2,
  types: ['psychic', 'water']
});
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
