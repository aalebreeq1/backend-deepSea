const mongoose = require("mongoose");
const Submarine = require("../models/Submarine");
const router = require("express").Router();

// route to get all submarines
router.get("/", async (req,res) =>{
    try{
        const submarines =await Submarine.find();
        if (submarines){
            res.status(200).json({ submarines, message: "Submarines retrieved successfully" })
        }
        else {
            res.status(404).json({ message: "No submarines found" });
        }

    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;