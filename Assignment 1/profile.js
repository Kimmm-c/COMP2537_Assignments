console.log(localStorage.getItem("pokemonID"));

function get_pokemon(){
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem("pokemonID")}`,
        type: "GET",
        success: display_pokemon
    })
}

function display_pokemon(pokemon){
    $("img").attr("src", `${pokemon.sprites.other["official-artwork"]["front_default"]}`);
    $("#pokemon_name").text(`${pokemon.name.toUpperCase()}`);
    $("#pokemon_id").text(`${pokemon.id}`);
    $("#hp").css("width", `${pokemon.stats[0]["base_stat"]}%`);
    $("#attack").css("width", `${pokemon.stats[1]["base_stat"]}%`);
    $("#defense").css("width", `${pokemon.stats[2]["base_stat"]}%`);
    $("#special_attack").css("width", `${pokemon.stats[3]["base_stat"]}%`);
    $("#special_defense").css("width", `${pokemon.stats[4]["base_stat"]}%`);
    $("#speed").css("width", `${pokemon.stats[5]["base_stat"]}%`);
    $("#additional_info").html(`<p><h4 class="info">Type: </h4>${pokemon.types[0].type.name}</p>
    <p><h4 class="info">Weight: </h4>${pokemon.weight}</p>
    <p><h4 class="info">Height: </h4>${pokemon.height}</p>
    <p><h4 class="info">Ability: </h4>${pokemon.abilities[0].ability.name}</p>`)

}

function setup(){
    get_pokemon();
}

$(document).ready(setup);