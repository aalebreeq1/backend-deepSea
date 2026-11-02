const mongoose = require("mongoose");

const discoverySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discoveryType: {
        type: String,
        enum: [
            "New Species",
            "Geological Formation",
            "Shipwreck",
            "Ecosystem"
        ],
        required: true
    },
    discoveryDate: {
        type: Date,
        required: true
    },
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mission",
        required: true
    },
    species: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Species"
        }
    ],
    image: {
        type: String
    }
});

module.exports = mongoose.model("Discovery", discoverySchema);