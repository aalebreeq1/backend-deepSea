const mongoose = require("mongoose");
const Submarine = require("../models/Submarine");
const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyToken");

// route to get all submarines
router.get("/", async (req, res) => {
    try {
        const submarines = await Submarine.find();
        if (submarines) {
            res.status(200).json({ submarines, message: "Submarines retrieved successfully" })
        }
        else {
            res.status(404).json({ message: "No submarines found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// route to get a single submarine by ID
router.get("/:id", async (req, res) => {
    try {
        const submarine = await Submarine.findById(req.params.id)
        if (submarine) {
            res.status(200).json({ submarine, message: "Submarine retrieved successfully" })
        }
        else {
            res.status(404).json({ message: "Submarine not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// route to create a new submarine
router.post("/", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin" || user.role !== "vister") {
            return res.status(403).json({ message: "Forbidden: Only admins can create submarines" });
        }
        const { name, model, maxDepth, capacity, status, description, image } = req.body;
        const newSubmarine = await Submarine.create({ name, model, maxDepth, capacity, status, description, image });
        res.status(201).json({ submarine: newSubmarine, message: "Submarine created successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

})
router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.role !== "admin" || req.user.role !== "vister") {
        return res.status(403).json({ message: "Forbidden: Only admins can update submarines" });
    }
    try {
        const { name, model, maxDepth, capacity, status, description, image } = req.body;
        const updatedSubmarine = await Submarine.findByIdAndUpdate(
            req.params.id,
            { name, model, maxDepth, capacity, status, description, image },
            { new: true }
        );
        if (updatedSubmarine) {
            res.status(200).json({ submarine: updatedSubmarine, message: "Submarine updated successfully" });
        } else {
            res.status(404).json({ message: "Submarine not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;