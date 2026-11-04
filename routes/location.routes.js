const router = require("express").Router();
const Location = require("../models/Location");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const allLocations = await Location.find();
    res.status(200).json(allLocations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const createNewLocation = await Location.create(req.body);
    res.status(201).json(createNewLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;