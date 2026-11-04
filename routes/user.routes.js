const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.id);
        if (!oneUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
