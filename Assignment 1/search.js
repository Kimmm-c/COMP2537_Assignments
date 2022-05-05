pokemon_list = null;

function get_pokemons(){
    keyword = $("#search_keyword").val();
    console.log(keyword);
    select = document.getElementById("filter");
    filter = select.options[select.selectedIndex].value;
    console.log(filter);
    if(filter == "name"){
        //console.log("wrong input");
        if(keyword.toUpperCase() == keyword.toLowerCase()){
            $("#pokemons_display").text("Invalid input. Must be letters only.")
        }else{
            get_pokemon_by_name(keyword);
        }
    }else if(filter == "type"){

    }

}

function get_pokemon_by_name(keyword){
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${keyword}`,
        type: "GET",
        success: process_pokemon
    })
}

function display_options(){
    select = document.getElementById("filter");
    filter = select.options[select.selectedIndex].value;
    console.log(filter);
    if(filter == "habitat"){
        $("#types").css("display", "none");
        $("#habitats").css("display", "");
    }else if(filter == "type"){
        $("#habitats").css("display", "none");
        $("#types").css("display", "");
    }else{
        $("#types").css("display", "none");
        $("#habitats").css("display", "none");
    }
}

function get_pokemons_habitat() {
    $("#pokemons_display").empty();
    select = document.getElementById("habitat")
    habitat = select.options[select.selectedIndex].value;
    //console.log(habitat);
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`,
        type: "GET",
        success: get_pokemon
    })
}

function get_pokemon(pokemons) {
    //console.log(pokemons["pokemon_species"].length);
    for (count = 0; count < pokemons["pokemon_species"].length; count++) {
        //console.log(pokemons["pokemon_species"][count].name);
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemons["pokemon_species"][count].name}`,
            type: "GET",
            success: process_pokemon
        })
    }
}

function process_pokemon(pokemon){
    //console.log(pokemon.name);
    $("#pokemons_display").empty();
    $("#pokemons_display").append(`<div class="pokemon"><h4>${pokemon.id}</h4>
    <img src=${pokemon.sprites.other["official-artwork"]["front_default"]}>
    <a href="profile.html" id=${pokemon.id} class="pokemon_name">${pokemon.name.toUpperCase()}</a>`)
}

function save_to_storage(){
    localStorage.setItem("pokemonID", $(this).attr("id"));
}

function setup() {
    //get_pokemons_habitat();
    $("button").click(get_pokemons);
    $("#filter").on("change", display_options);
    // $('#habitat').on('change', get_pokemons_habitat);
    $("body").on("click", ".pokemon_name", save_to_storage);
}

$(document).ready(setup);