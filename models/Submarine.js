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
            "operational",
            "under_maintenance",
            "retired"],
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

const Submarine = mongoose.model("Submarine", submarineSchema);
module.exports = Submarine;