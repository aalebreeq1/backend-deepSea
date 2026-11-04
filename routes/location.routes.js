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

router.get("/:id", async (req, res) => {
  try {
    const oneLocation = await Location.findById(req.params.id);

    if (!oneLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(oneLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;