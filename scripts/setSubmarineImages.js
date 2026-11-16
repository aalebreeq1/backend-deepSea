require("dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Submarine = require("../models/Submarine"); // adjust if your model file is named differently

const photos = {
    "Jiaolong": ["Jiaolong-1.png", "Jiaolong-2.png", "Jiaolong-3.png"],
    "Nautile": ["Nautile-1.png", "Nautile-2.png", "Nautile-3.png"],
    "Shinkai": ["Shinkai-1.png", "Shinkai-2.png", "Shinkai-3.png"],
    "Trieste": ["Trieste-1.png", "Trieste-2.png", "Trieste-3.png"],
    "Alvin": ["alvin-1.jpg", "alvin-2.webp", "alvin-3.jpg"]
};

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const [name, files] of Object.entries(photos)) {
        const images = files.map((file) => `/images/Submarines/${file}`);
        const result = await Submarine.updateOne(
            { name },
            { $set: { image: images[0], images } }
        );
        console.log(name, result.matchedCount ? "updated" : "NOT FOUND (check the name)");
    }

    await mongoose.disconnect();
}

run();