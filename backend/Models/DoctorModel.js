const mongoose=require("mongoose")

const doctorSchema= mongoose.Schema({
    name:String,
    gender:String,
    img:String,  // added by Hariom
    age:Number,
    email:String,
    phone:Number,
    experience:Number,
    specialization:String,
    timesolot:Object
},{
    versionKey:false
})

  

const DoctorModel=mongoose.model("DoctorDetail",doctorSchema)

module.exports={DoctorModel};