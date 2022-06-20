var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("add an object");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      var $row = $(".row");

      var $card = $(
        '<div data-bs-toggle="modal" data-bs-target="#exampleModal" id="card" class="card" style="width:200px"></div>'
      );
      var $image = $(
        '<img class="card-img-top" alt="Card image" style="width:70%" />'
      );
      $image.attr("src", pokemon.imageUrlFront);
      var $cardBody = $('<div class="card-body"></div>');
      var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");

      $row.append($card);
      //Append the image to each card
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);

      $card.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }

  $(document).ready(function () {
    $("#searchBar").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(".card").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    });
  }

  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        //loop for each ofthe pokemon types.
        //Also changing the background color depend on each pokemon type.
        item.types = [];

        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        // item.types = [];
        // details.types.forEach(function (i) {
        //   item.types.push(i.type.name);
        // });
        if (item.types.includes("grass")) {
          $(".modal-content").css("background-color", "#9EB23B");
          $(".modal-content").css({ "border-color": "#4f591d" });
        } else if (item.types.includes("fire")) {
          $(".modal-content").css("background-color", "#F15412");
          $(".modal-content").css({ "border-color": "#7a2907" });
        } else if (item.types.includes("psychic")) {
          $(".modal-content").css("background-color", "#A760FF");
          $(".modal-content").css({ "border-color": "#4e00af" });
        } else if (item.types.includes("poison")) {
          $(".modal-content").css("background-color", "#7858A6");
          $(".modal-content").css({ "border-color": "#3c2c52" });
        } else if (item.types.includes("water")) {
          $(".modal-content").css("background-color", "#92B4EC");
          $(".modal-content").css({ "border-color": "#1c4fa2" });
        } else if (item.types.includes("bug")) {
          $(".modal-content").css("background-color", "#809A6F");
          $(".modal-content").css({ "border-color": "#3f4d36" });
        } else if (item.types.includes("rock")) {
          $(".modal-content").css("background-color", "#FFB72B");
          $(".modal-content").css({ "border-color": "#956200" });
        } else if (item.types.includes("flying")) {
          $(".modal-content").css("background-color", "#E8FFC2");
          $(".modal-content").css({ "border-color": "#869470" });
        } else if (item.types.includes("electric")) {
          $(".modal-content").css("background-color", "#F0A500");
          $(".modal-content").css({ "border-color": "#785200" });
        } else if (item.types.includes("ice")) {
          $(".modal-content").css("background-color", "#92B4EC");
          $(".modal-content").css({ "border-color": "#1c4fa2" });
        } else if (item.types.includes("ghost")) {
          $(".modal-content").css("background-color", "#B689C0");
          $(".modal-content").css({ "border-color": "#62396b" });
        } else if (item.types.includes("ground")) {
          $(".modal-content").css("background-color", "#E8C07D");
          $(".modal-content").css({ "border-color": "#97691a" });
        } else if (item.types.includes("fairy")) {
          $(".modal-content").css("background-color", "#FF6FB5");
          $(".modal-content").css({ "border-color": "#b70058" });
        } else if (item.types.includes("steel")) {
          $(".modal-content").css("background-color", "#708090");
          $(".modal-content").css({ "border-color": "#708090" });
        }
        //loop to get the abilities of a selected pokemon
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }

        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // show the modal content
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    // let $modalContainer = $("#modal-container");
    //clear existing content of the model
    // modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    // // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // //creating element for height in modal content
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");
    // //creating element for weight in modal content
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
    // //creating element for type in modal content
    let typesElement = $("<p>" + "Types : " + item.types + "</p>");
    // //creating element for abilities in modal content
    let abilitiesElement = $("<p>" + "Abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    // hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
