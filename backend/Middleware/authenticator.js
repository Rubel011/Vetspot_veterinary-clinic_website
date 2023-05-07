const jwt=require("jsonwebtoken");
const {client} = require("../config/redisDB");
const { BlockModel } = require("../Models/blockUser");
const { UserModel } = require("../Models/UserModel");
require("dotenv").config();
const authenticator= async(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token)
    // const token = req.cookies.token
    // const isBlacklist = await client.HGET("tokensObj" ,token)
    const isBlacklist= await BlockModel.findOne({token})

    // console.log(isBlacklist);
    if(!isBlacklist){
        const decoded=jwt.verify(token,process.env.secret,async(err,decoded)=>{
            if(err){
                res.status(400).json({"err":"Please Login first"})
            }else{
                const userData= await UserModel.findById({_id:decoded.userID})
                req.user=userData
                // console.log(req.user)
                req.body.userID=decoded.userID
                next()
            }
        })
        
    }else{
        res.status(400).json({"err":"Please Login first"})
    }
}  
module.exports={authenticator}