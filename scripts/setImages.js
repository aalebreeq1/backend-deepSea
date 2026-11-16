// scripts/setImages.js
require("dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Equipment = require("../models/equipment"); // adjust if your model file is named differently

const images = {
    "Deep-Sea HD Camera": "/images/Equipment/Underwater%20HD%20Camera.jpg",
    "Underwater LED Lighting": "/images/Equipment/Underwater%20LED%20Lighting.png",
    "Doppler Velocity Log": "/images/Equipment/dopplerVelocityLog.jpg",
    "Plankton Net": "/images/Equipment/PlanktonNet.png",
    "Robotic Arm": "/images/Equipment/roboticArm.jpg",
    "Deep-Sea Pressure Sensor": "/images/Equipment/deep-SeaPressureSensor.webp",
    "Underwater Acoustic Modem": "/images/Equipment/underwaterAcousticModem.jpg",
};

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const [name, image] of Object.entries(images)) {
        const result = await Equipment.updateOne({ name }, { $set: { image } });
        console.log(name, result.matchedCount ? "updated" : "NOT FOUND (check the name)");
    }

    await mongoose.disconnect();
}

run();