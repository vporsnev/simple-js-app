let pokemonList = [
  {name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
  {name: 'Pikachu', height: 4, types: ['electric']},
  {name: 'Jigglypuff', height: 5, types: ['fairy', 'normal']},
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 5){
    document.write("<br>" + " " + pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ")" + " - Wow, that’s big!");
  } else {
    document.write("<br>" + " " + pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ")");
  }
}
