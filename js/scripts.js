let pokemonList = [
  {name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
  {name: 'Pikachu', height: 4, types: ['electric']},
  {name: 'Jigglypuff', height: 5, types: ['fairy', 'normal']},
  {name: 'Snorlax', height: 22, types: ['normal']}
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 5){
    document.write("<br>" + " " + pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ")" + " - is a big pokemon!");
  } else {
    document.write("<br>" + " " + pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ")");
  }
}
