let pokemonRepository = (function () {
let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  {name: 'Pikachu', height: 0.4, types: ['electric']},
  {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']},
];

return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();

pokemonRepository.add({ name: 'Slowpoke', height: 1.2, types: ['psychic', 'water'] };
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<br>" + " " + pokemon.name + " " + "(height:" + " " + pokemon.height + ")")
});
