const express = require("express");
const {DoctorModel}=require('../Models/DoctorModel')


const doctorRouter=express.Router()

doctorRouter.get("/getparticulardoc/:id",async(req,res)=>{
    try {
        let id = req.params.id
        let data = await DoctorModel.findById({_id:id});
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})
doctorRouter.get("/getAllDoc",async(req,res)=>{
    try {
        let data = await DoctorModel.find()
        res.json({msg:"success",data:data});
    } catch (error) {
        console.log(error);
    }
})

doctorRouter.get("/getDocID/:name",async(req,res)=>{
    try { 
            let name=req.params.name;
            let user=await DoctorModel.findOne({"name":name})
            res.send({"ID":user._id})

    } catch (error) {
        console.log({"Error":error.message});
        res.send({"Error":error.message});
    }   
})

doctorRouter.post("/register",async(req,res)=>{
    try { 
            let user=new DoctorModel(req.body)
            await user.save();
            res.send({"mess":"Doctor Registered Successfull"})

    } catch (error) {
        console.log({"Error":error.message});
        res.send({"Error":error.message});
    }   
})


doctorRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let user=await DoctorModel.findByIdAndDelete({_id:id});
        res.send({"mess":"Doctor Deleted"})
    } catch (error) {
        res.send({"Error":error.message})
    }

})


module.exports={doctorRouter}