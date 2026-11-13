const mongoose = require("mongoose");
const Submarine = require("../models/Submarine");
const router = require("express").Router();
const verifyToken  = require("../middleware/verifyToken");

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
        if (user.role !== "admin" && user.role !== "visitor") {
            return res.status(403).json({ message: "Forbidden: Only admins and visitors can create submarines" });
        }
        const { name, model, maxDepth, capacity, description, image } = req.body;
        const newSubmarine = await Submarine.create({ name, model, maxDepth, capacity, status: "operational", description, image });
        res.status(201).json({ submarine: newSubmarine, message: "Submarine created successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

})
// route to update a submarine by ID
router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "researcher") {
        return res.status(403).json({ message: "Forbidden: Only admins and researchers can update submarines" });
    }
    try {
        const { name, model, maxDepth, capacity, description, image } = req.body;
        const updatedSubmarine = await Submarine.findByIdAndUpdate(
            req.params.id,
            { name, model, maxDepth, capacity, description, image },
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

// route to delete a submarine by ID
router.delete("/:id", verifyToken, async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "visitor") {
        return res.status(403).json({ message: "Forbidden: Only admins and visitors can delete submarines" });
    }
    try {
        const deletedSubmarine = await Submarine.findByIdAndDelete(req.params.id);
        if (deletedSubmarine) {
            res.status(200).json({ message: "Submarine deleted successfully" });
        } else {
            res.status(404).json({ message: "Submarine not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// update a submarine status by ID
router.patch("/:id/status/", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin" && user.role !== "researcher") {
            return res.status(403).json({ message: "Forbidden: Only admins and researchers can update submarine status" });
        }
        const {id} = req.params;
        const { status } = req.body;
        const updatedSubmarine = await Submarine.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (updatedSubmarine) {
            res.status(200).json({ submarine: updatedSubmarine, message: "Submarine status updated successfully" });
        } else {
            res.status(404).json({ message: "Submarine not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
