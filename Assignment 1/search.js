function get_pokemons() {
    keyword = $("#search_keyword").val();

    if (keyword.toUpperCase() == keyword.toLowerCase()) {
        $("#pokemons_display").text("Invalid input. Must be letters only.")
    } else {
        $("#pokemons_display").empty();
        get_pokemon_by_name(keyword);
        $("#display_history").append(`<div><button class="retrieve_history" key="name" val=${keyword}>name ${keyword}</button>
        <button class="remove_history_tag">x</button></div>`)
    }
    $("#search_keyword").val("");
}

function get_pokemon_by_name(keyword) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${keyword}`,
        type: "GET",
        success: process_pokemon
    })
}

function display_options() {
    select = document.getElementById("filter");
    filter = select.options[select.selectedIndex].value;
    console.log(filter);
    if (filter == "habitat") {
        $("#types").css("display", "none");
        $("#habitats").css("display", "");
    } else if (filter == "type") {
        $("#habitats").css("display", "none");
        $("#types").css("display", "");
    } else {
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
    $("#display_history").append(`<div><button class="retrieve_history" key="habitat" val=${habitat}>habitat ${habitat}</button>
    <button class="remove_history_tag">x</button></div>`)
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


function get_pokemons_type() {
    $("#pokemons_display").empty();
    select = document.getElementById("type");
    type = select.options[select.selectedIndex].value;
    $.ajax({
        url: `https://pokeapi.co/api/v2/type/${type}`,
        type: "GET",
        success: get_pokemon_one_type
    })
    $("#display_history").append(`<div><button class="retrieve_history" key="type" val=${type}>type ${type}</button>
    <button class="remove_history_tag">x</button></div>`)
}

function get_pokemon_one_type(pokemons){
    //console.log(pokemons["pokemon"].length);
    for (count = 0; count < pokemons["pokemon"].length; count++) {
        //console.log(pokemons["pokemon_species"][count].name);
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemons.pokemon[count].pokemon.name}`,
            type: "GET",
            success: process_pokemon
        })
    }
}

function process_pokemon(pokemon) {
    //console.log(pokemon.name);
    $("#pokemons_display").append(`<div class="pokemon"><h4>${pokemon.id}</h4>
    <img src=${pokemon.sprites.other["official-artwork"]["front_default"]}>
    <a href="profile.html" id=${pokemon.id} class="pokemon_name">${pokemon.name.toUpperCase()}</a>`)
}

function save_to_storage() {
    localStorage.setItem("pokemonID", $(this).attr("id"));
}

function retrieve_history(){
    key = $(this).attr("key");
    val = $(this).attr("val");
    $("#pokemons_display").empty();
    if(key == "name"){
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${val}`,
            type: "GET",
            success: process_pokemon
        })
    }else if(key == "habitat"){
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-habitat/${val}`,
            type: "GET",
            success: get_pokemon
        })
    }else if(key == "type"){
        $.ajax({
            url: `https://pokeapi.co/api/v2/type/${val}`,
            type: "GET",
            success: get_pokemon_one_type
        })
    }
}

function remove_history_tag(){
    $(this).parent().remove();
}

function setup() {
    //get_pokemons_habitat();
    $("button").click(get_pokemons);
    $("#filter").on("change", display_options);
    $('#habitat').on('change', get_pokemons_habitat);
    $('#type').on('change', get_pokemons_type);
    $("body").on("click", ".pokemon_name", save_to_storage);
    $("body").on("click", ".retrieve_history", retrieve_history);   
    $("body").on("click", ".remove_history_tag", remove_history_tag);
}

$(document).ready(setup);