//https://blooming-sierra-96067.herokuapp.com/
function get_pokemons(){
    $.ajax({
        url: `https://blooming-sierra-96067.herokuapp.com/getAllpokemons`,
        type: "GET",
        success: display_pokemons
    })
}

function display_pokemons(pokemons){
    //console.log(pokemons.results[0].url);
    //$("#pokemons_display").html(pokemons.results[0].name);
    console.log(pokemons);
    for(count=0; count<pokemons.length; count++){
        $("#pokemons_display").append(`<div class="pokemon"><img src=${pokemons[count].img}>
    <a href="profile.html" class="pokemon_info" id=${pokemons[count].name}>${pokemons[count].name.toUpperCase()}</a>`)
    }
}

// function render_each_pokemon(pokemon){
//     //console.log(pokemon.height);
//     //console.log(pokemon.sprites.other["official-artwork"]["front_default"]);
//     $("#pokemons_display").append(`<div class="pokemon"><img src=${pokemon.sprites.other["official-artwork"]["front_default"]}>
//     <a href="profile.html" class="pokemon_info" id=${pokemon.id}>${pokemon.name.toUpperCase()}</a>`)

// }

function save_to_storage(){
    localStorage.setItem("pokemonName", $(this).attr("id"));
}

function setup(){
    get_pokemons();
    $("body").on("click", ".pokemon_info", save_to_storage);
}

$(document).ready(setup);