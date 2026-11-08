const express = require("express");
const router= express.Router()
const Discovery= require ("../models/Discovery");
const verifyToken = require('../middleware/verifyToken')





router.post("/",verifyToken,async(req,res)=>{
    try{

        const user=req.user;
        if(user.role !=="admin"&&user.role!== "researcher"){
            return res.status(403).json({
                message:"Only admins and researchers can create discoveries"
            })
        }

        const discovery=new Discovery(req.body);
          await discovery.save();
          res.status(201).json(discovery);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
});

router.get("/",async(req,res)=>{
    try{
    const discoveries=await Discovery.find()
       .populate("mission")
       .populate("species");

     res.status(200).json(discoveries);
    
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
    const discovery= await Discovery.findById(
       req.params.id)
       
       .populate("mission")
       .populate("species");


       if(!discovery){
        return res.status(404).json({message:"Discovery not found"})

       }

     res.status(200).json(discovery);
    
    } catch(error){
        res.status(500).json({message:error.message});
    }      
    
});


router.put('/:id',verifyToken ,async (req, res) => {
    try{
        
        const user=req.user;
        if(user.role !=="admin"&&user.role!== "researcher"){
            return res.status(403).json({
                message:"Only admins and researchers can update discoveries"
            })
        }
   const discovery= await Discovery.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new :true,runValidators:true}
   );
    
    if(!discovery){
       return res.status(404).json({message:"Discovery not found"})

    }

    res.status(200).json(discovery);
     } catch(error){
        res.status(400).json({message:error.message});
    }
});


router.delete("/:id",verifyToken,async(req,res)=>{
    try{
    const user=req.user;
        if(user.role !=="admin"){
            return res.status(403).json({
                message:"Only admins can delete discoveries"
            })
        }
    const  discovery =await Discovery.findByIdAndDelete(req.params.id);


     if(!discovery){
      return res.status(404).json({message:"Discovery not found"});

    }

    res.status(200).json({message:"Discovery deleted successfully"});
     } catch(error){
        res.status(500).json({message:error.message});
    }
});

    
module.exports = router;
