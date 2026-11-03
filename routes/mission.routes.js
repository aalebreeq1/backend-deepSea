const Mission = require('../models/mission.model');
const router = require('express').Router();

// route for reteriving all missions

router.get("/", async (req, res) => {
    try {
        const allMissions = await Mission.find();
        if (allMissions.length === 0) {
            return res.status(404).json({ message: "No missions found" });
        }
        res.status(200).json({ missions: allMissions });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// route for creating a new mission
router.post("/", async (req, res) => {
    try {
        const { title, objective, startDate, endDate, submarine, location, missionResearchers, equipment } = req.body;
        const newMission = await Mission.create({ title, objective, startDate, status: 'planned', endDate, submarine, location, missionResearchers, equipment });
        res.status(201).json({ mission: newMission });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// route for retrieving a single mission by ID
router.get("/:id", async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);
        if (!mission) {
            return res.status(404).json({ message: "Mission not found" });
        }
        res.status(200).json({ mission });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// route for updating a mission by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, objective, startDate, endDate, submarine, location, missionResearchers, equipment } = req.body;
        const updatedMission = await Mission.findByIdAndUpdate(
            req.params.id,
            { title, objective, startDate, endDate, submarine, location, missionResearchers, equipment },
            { new: true }
        );
        if (!updatedMission) {
            return res.status(404).json({ message: "Mission not found" });
        }
        res.status(200).json({ mission: updatedMission });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// route for deleting a mission by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedMission = await Mission.findByIdAndDelete(req.params.id);
        if (!deletedMission) {
            return res.status(404).json({ message: "Mission not found" });
        }
        res.status(200).json({ message: "Mission deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
