const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema({
    scientificName: {
        type: String,
        required: true
    },
    commonName: {
        type: String
    },
    classification: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Species", speciesSchema);