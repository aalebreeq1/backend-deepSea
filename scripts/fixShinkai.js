// scripts/fixShinkai.js
require("dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Submarine = require("../models/Submarine");

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await Submarine.updateOne(
        { name: /shinkai/i },
        {
            $set: {
                image: "/images/Submarines/Shinkai-1.png",
                images: [
                    "/images/Submarines/Shinkai-1.png",
                    "/images/Submarines/Shinkai-2.png",
                    "/images/Submarines/Shinkai-3.png"
                ]
            }
        }
    );

    console.log("matched:", result.matchedCount, "modified:", result.modifiedCount);

    await mongoose.disconnect();
}

run();