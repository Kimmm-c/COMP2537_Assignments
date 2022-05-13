const express = require('express')
const app = express()

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.log(err);
    }
})

// connect to mongodb db
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kimmm-c:comp1537a3@cluster0.gddfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//create schema for object in collection characters
const pokemonSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    img: String,
    habitat: String,
    type: String,
    pokedex: Number
});
const Pokemon = mongoose.model("pokemons", pokemonSchema);

const timelineSchema = new mongoose.Schema({
    activity: String,
    hits: Number,
    time: String
});
const Timeline = mongoose.model("timelines", timelineSchema);


//decode the request
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.post('/add_pokemon', (req, res, next)=>{
    Pokemon.create(req.body).then((pokemon)=>{
        res.send(pokemon);
    }).catch(next);
    //console.log(req.body);
})

app.post('/add_timeline', (req, res, next)=>{
    Timeline.create(req.body)
    //console.log(req.body);
})

app.get('/get_all_timeline', (req, res) => {
    //console.log(req.query.name);
    Timeline.find({}, (err, timeline) => {
        if (err) {
            console.log(err);
        } else {
            res.send(timeline);
        }
    })
})

app.delete('/delete_timeline/:id', (req, res) => {
    //console.log(req.params.id);
    Timeline.findByIdAndRemove({_id: req.params.id}).then((timeline)=>{
        res.send(timeline);
    })
})

app.put('/update_likes/:id', (req, res) => {
    console.log(req.params.id);
    Timeline.findByIdAndUpdate({_id: req.params.id}, {$inc: {'hits': 1}}).then((timeline)=>{
        res.send(timeline);
    })
})

app.get('/getAllpokemons', (req, res) => {
    //console.log(req.query.name);
    Pokemon.find({}, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pokemon);
        }
    })
})

app.get('/get_pokemon_by_name', (req, res) => {
    //console.log(req.query.name);
    Pokemon.find({ name: req.query.name }, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pokemon);
        }
    })
})

app.get('/get_pokemon_by_habitat', (req, res) => {
    //console.log(req.query.name);
    Pokemon.find({ habitat: req.query.habitat }, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pokemon);
        }
    })
})

app.get('/get_pokemon_by_habitat', (req, res) => {
    //console.log(req.query.name);
    Pokemon.find({ habitat: req.query.habitat }, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pokemon);
        }
    })
})

app.get('/get_pokemon_by_type', (req, res) => {
    //console.log(req.query.name);
    Pokemon.find({ type: req.query.type }, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pokemon);
        }
    })
})

app.get('/get_pokemons_by_dex', (req, res) => {
    //console.log(req.query.name);
    Pokemon.find({ pokedex: req.query.pokedex }, (err, pokemon) => {
        if (err) {
            console.log(err);
        } else {
            res.send(pokemon);
        }
    })
})

app.use(express.static("./public"))