const express = require("express");
const router= express.Router()
const Species=require("../models/Species");
const verifyToken = require('../middleware/verifyToken')


router.post("/",verifyToken,async(req,res)=>{
    try{
         const user=req.user;
        if(user.role !=="admin"&&user.role!== "researcher"){
            return res.status(403).json({
                message:"Only admins and researchers can create species"
            })
        }

        const species=new Species(req.body);
          await species.save();
          res.status(201).json(species);
    }
    catch(error){
        res.status(400).json({message:error.message});

    }

});


router.get("/",async(req,res)=>{
    try{
    const species=await Species.find()
       

     res.status(200).json(species);
    
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
    const species= await Species.findById(req.params.id)
       
       if(!species){
        return res.status(404).json({message:"Species not found"})

       }

     res.status(200).json(species);
    
    } catch(error){
        res.status(500).json({message:error.message});
    }      
    
});

router.put('/:id',verifyToken, async (req, res) => {
    try{
         const user=req.user;
        if(user.role !=="admin"&&user.role!== "researcher"){
            return res.status(403).json({
                message:"Only admins and researchers can update species"
            })
        }
   const species= await Species.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new :true,runValidators:true}
   );
    
    if(!species){
       return res.status(404).json({message:"Species not found"})

    }

    res.status(200).json(species);
     } catch(error){
        res.status(400).json({message:error.message});
    }
});

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
         const user=req.user;
        if(user.role !=="admin"){
            return res.status(403).json({
                message:"Only admins can delete species"
            })
        }
    const species =await Species.findByIdAndDelete(req.params.id);


     if(!species){
      return res.status(404).json({message:"species not found"});

    }

    res.status(200).json({message:"species deleted successfully"});
     } catch(error){
        res.status(500).json({message:error.message});
    }
});

    
module.exports = router;