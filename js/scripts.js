let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonKeys = ['name', 'detailsUrl', 'imageUrl', 'height', 'types'];
  let itemList = document.querySelector('.pokemon-list');
  let loadingMessage = document.querySelector('.loading-message');
  let modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if ((typeof item === 'object') && (Object.keys(item).every((element, i) => element === pokemonKeys[i]))) {
      pokemonList.push(item);
    }
  }

  function findPokemon(name) {
    let givenPokemon = pokemonList.filter(element => element.name === name);
    if (givenPokemon.length === 1) {
      return givenPokemon[0];
    } else if (givenPokemon.length > 1) {
      return givenPokemon;
    }
  }

  function addListItem(pokemon) {
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');

    listpokemon.appendChild(button);
    itemList.appendChild(listpokemon);

    button.addEventListener('click', function(event) {
      showDetails(pokemon)
    });
  }

  function loadingMessageHidden(hide) {
    if (hide) {
      loadingMessage.classList.add('hidden');
    } else {
      loadingMessage.classList.remove('hidden');
    }
  }

  function loadList() {
    loadingMessageHidden(false);
    return fetch(apiUrl).then(function(response) {
      loadingMessageHidden(true);
      return response.json();
    }).then(function(json) {
      loadingMessageHidden(true);
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      loadingMessageHidden(true);
      console.error(e);
    })
  }

  function loadDetails(item) {
    loadingMessageHidden(false);
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      loadingMessageHidden(true);
      return response.json();
    }).then(function(details) {
      loadingMessageHidden(true);
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      loadingMessageHidden(true);
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h2');
    titleElement.classList.add('pokemon-name');
    titleElement.innerText = pokemon.name;

    let typesString = '';
    pokemon.types.forEach(function(type, i) {
      if (i < pokemon.types.length - 1) {
        typesString += `${type.type.name}, `
      } else {
        typesString += `${type.type.name}`
      }
    });


    let contentElement = document.createElement('p');
    contentElement.classList.add('content-element');
    contentElement.innerHTML = `Height: ${pokemon.height}<br>Types: ${typesString}`;

    let imgElement = document.createElement('img');
    imgElement.classList.add('modal-img')
    imgElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    getAll,
    add,
    findPokemon,
    addListItem,
    loadList,
    loadDetails
  }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
});
