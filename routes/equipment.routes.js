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

module.exports = router;
