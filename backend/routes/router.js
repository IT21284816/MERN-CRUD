const express=require("express");
const router = express.Router();
const users=require("../models/userSchema");


//send data post method
router.post("/add", async (req, res) => {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email ) {
        return res.status(422).json("Please fill up all the fields");
    }

    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(422).json("This student already exists");
        }

        const newUser = new users({ firstname, lastname, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//get Data
router.get("/get", async(req,res)=>{
    try{
        const userdata= await users.find();
        res.status(201).json(userdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle Data
router.get("/get/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singleuser=await users.findById({_id:id});
       res.status(201).json(singleuser);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete Data
router.delete("/delete/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const delteuser=await users.findByIdAndDelete({_id:id});
       res.status(201).json(delteuser);
    }catch(err){
        res.status(422).json(err);
    }
})

// update data
router.patch("/update/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateuser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updateuser);

    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports=router;