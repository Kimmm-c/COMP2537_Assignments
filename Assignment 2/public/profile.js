console.log(localStorage.getItem("pokemonName"));

function get_pokemon(){
    $.ajax({
        url: `https://blooming-sierra-96067.herokuapp.com/get_pokemon_by_name?name=${localStorage.getItem("pokemonName")}`,
        type: "GET",
        success: display_pokemon
    })
    insert_timeline(localStorage.getItem("pokemonName"));
}

function insert_timeline(pokemon){
    now = new Date(Date.now());
    formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    //console.log(filter);
    $.ajax({
        url: `https://blooming-sierra-96067.herokuapp.com/add_timeline`,
        type: "post",
        data: {
            activity: `user viewed profile of pokemon ${pokemon}`,
            hits: 0,
            time: now
        }
    })
}

function display_pokemon(pokemon){
    $("img").attr("src", `${pokemon[0].img}`);
    $("#pokemon_name").text(`${pokemon[0].name}`);
    $("#pokemon_id").text(`${pokemon[0].id}`);
    $("#hp").css("width", `${pokemon[0].hp/2}%`);
    $("#attack").css("width", `${pokemon[0].attack/2}%`);
    $("#defense").css("width", `${pokemon[0].defense/2}%`);
    $("#special_attack").css("width", `${pokemon[0]["special-attack"]/2}%`);
    $("#special_defense").css("width", `${pokemon[0]["special-defense"]/2}%`);
    $("#speed").css("width", `${pokemon[0].speed/2}%`);
    $("#additional_info").html(`<p><h4 class="info">Type: </h4>${pokemon[0].type}</p>
    <p><h4 class="info">Weight: </h4>${pokemon[0].weight}</p>`)
    // console.log(pokemon);

}

function setup(){
    get_pokemon();
}

$(document).ready(setup);