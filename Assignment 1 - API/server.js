const express = require('express')
const app = express()

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kimmm-c:comp1537a3@cluster0.gddfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

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

app.use(express.static("./public"))