require("dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Location = require("../models/Location");

const photos = {
    "Challenger Deep": "ChallengerDeep.png",
    "Great Blue Hole": "GreateBlueHole.png",
    "Titanic Wreck Site": "TitanicWreckSite.png"
};

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        for (const [name, file] of Object.entries(photos)) {
            const image = `/images/locations/${file}`;

            const result = await Location.updateOne(
                { name },
                { $set: { image } }
            );

            console.log(
                name, result.matchedCount ? "updated" : "NOT FOUND (check database name)"
            );
        }
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

run();
