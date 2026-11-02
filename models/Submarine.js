const mongoose = require("mongoose");

const submarineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    maxDepth: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            "Operational",
            "Under Maintenance",
            "Retired"],
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Submarine", submarineSchema);