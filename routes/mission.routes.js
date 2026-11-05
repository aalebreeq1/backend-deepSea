const Mission = require('../models/Mission');
const router = require('express').Router();
const verifyToken = require("../middleware/verifyToken");

// route for reteriving all missions

router.get("/", async (req, res) => {
    try {
        const allMissions = await Mission.find()
            .populate('submarine')
            .populate('location')
            .populate('missionResearchers')
            .populate('equipment');
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
router.post("/", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "visitor") {
            return res.status(403).json({ message: "Forbidden: Only admins and visitors can create missions" });
        }
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
        const mission = await Mission.findById(req.params.id)
            .populate('submarine')
            .populate('location')
            .populate('missionResearchers')
            .populate('equipment');
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
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "visitor") {
            return res.status(403).json({ message: "Forbidden: Only admins and visitors can update missions" });
        }
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
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "visitor") {
            return res.status(403).json({ message: "Forbidden: Only admins and visitors can delete missions" });
        }
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
router.patch("/:id/status/", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "visitor") {
            return res.status(403).json({ message: "Forbidden: Only admins and visitors can update mission status" });
        }
        const { id } = req.params;
        const { status } = req.body;
        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (updatedMission) {
            res.status(200).json({ mission: updatedMission, message: "Mission status updated successfully" });
        } else {
            res.status(404).json({ message: "Mission not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
