const router = require("express").Router();
const Equipment = require("../models/Equipment");
const verifyToken = require("../middleware/verifyToken");

router.get('/', async (req, res) => {
    try {
        const allEquipment = await Equipment.find();
        res.status(200).json(allEquipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const newEquipment = await Equipment.create(req.body)
        res.status(201).json(newEquipment)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const oneEquipment = await Equipment.findById(req.params.id);
        if (!oneEquipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json(oneEquipment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEquipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json(updatedEquipment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);

        if (!deletedEquipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        res.status(200).json({ message: "Equipment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
