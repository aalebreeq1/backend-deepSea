const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ocean: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    depth: {
        type: Number
    }
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;