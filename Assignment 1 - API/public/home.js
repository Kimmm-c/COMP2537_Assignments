function get_pokemons(){
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50`,
        type: "GET",
        success: display_pokemons
    })
}

function display_pokemons(pokemons){
    //console.log(pokemons.results[0].url);
    //$("#pokemons_display").html(pokemons.results[0].name);
    for(count=0;count<9; count++){
        $.ajax({
            url: `${pokemons.results[Math.floor(Math.random()*50)].url}`,
            type: "GET",
            success: render_each_pokemon
        })
    }
}

function render_each_pokemon(pokemon){
    //console.log(pokemon.height);
    //console.log(pokemon.sprites.other["official-artwork"]["front_default"]);
    $("#pokemons_display").append(`<div class="pokemon"><img src=${pokemon.sprites.other["official-artwork"]["front_default"]}>
    <a href="profile.html" class="pokemon_info" id=${pokemon.id}>${pokemon.name.toUpperCase()}</a>`)

}

function save_to_storage(){
    localStorage.setItem("pokemonID", $(this).attr("id"));
}

function setup(){
    get_pokemons();
    $("body").on("click", ".pokemon_info", save_to_storage);
}

$(document).ready(setup);