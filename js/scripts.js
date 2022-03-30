let pokemonList = [
  {name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
  {name: 'Pikachu', height: 4, types: ['electric']},
  {name: 'Jigglypuff', height: 5, types: ['fairy', 'normal']},
];

pokemonList.forEach(function(pokemon) {
  document.write("<br>" + " " + pokemon.name + " " + "(height:" + " " + pokemon.height + ")")
});
