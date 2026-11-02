const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Imaging",
            "Navigation",
            "Sampling",
            "Communication",
            "Robotics",
            "Scientific Sensors"
        ],
        required: true
    },
    description: {
        type: String
    },
    condition: {
        type: String,
        enum: [
            "operational",
            "needs_maintenance",
            "out_of_service"
        ],
        required: true
    },
    image: {
        type: String
    }
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;