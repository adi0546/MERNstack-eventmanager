"use strict"
var mongoose = require('mongoose');

var eventsSchema= mongoose.Schema({
    title: String,
    desc: String,
    date: String,
    time: String,
    people:Number
});
var Events= mongoose.model('events', eventsSchema);
module.exports= Events;