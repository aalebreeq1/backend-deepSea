const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Planned", "Active", "Completed", "Suspended"],
        required: true
    },
    submarine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submarine",
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    missionResearchers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    equipment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment"
        }
    ]
});
const mission = mongoose.model("Mission", missionSchema);
module.exports = mission;