const express = require("express");
const { UserModel } = require('../Models/UserModel')
const jwt = require("jsonwebtoken");
const { client } = require("../config/redisDB");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { BlockModel } = require("../Models/blockUser");
const { authenticator } = require("../Middleware/authenticator");
const { checkRole } = require("../Middleware/authorization");

const userRouter = express.Router()

userRouter.get("/all",authenticator,checkRole(["admin","superadmin"]),async(req,res)=>{
    try {
        let data= await UserModel.find();
        res.status(200).json({data})
    } catch (error) {
        res.status(400).json({err:error.message})
        
    }
})
userRouter.delete("/delete/:id",authenticator,checkRole(["admin","superadmin"]),async(req,res)=>{
    try {
        let id=req.params.id
       let data= await UserModel.findByIdAndDelete({_id:id})
        res.status(200).json({msg:data})
    } catch (error) {
        res.status(400).json({err:error.message})
        
    }
})
userRouter.patch("/update/:id", authenticator,checkRole(["admin","superadmin"]),async (req, res) => {
    try {
        let newdata = req.body;
        let id = req.params.id
        let user = await UserModel.findByIdAndUpdate({ _id: id }, newdata);
        res.send({ "mess": "User Details Updated" })
    } catch (error) {
        res.send({ "Error": error.message })
    }
})


userRouter.post("/register", async (req, res) => {
    let { password, email, name } = req.body;


    let user= await UserModel.find({email});
    if(user.length>0)return res.status(400).send({err:"user present"})
    try {
        bcrypt.hash(password, 4, async (err, hashedPassword) => {
            req.body.password = hashedPassword
            let user = new UserModel(req.body)
            await user.save();
            res.send({ "mess": "User Registered Successfull" })

            let vetspotEmail = process.env.vetspotEmail
            let vetspotPassword = process.env.vetspotPassword
            const msg = {
                to: email,
                from: "saifulrahaman980@gmail.com",
                subject: "Successfully Registered",
                text: `Thanks ${name} for creating an account with VetSpot.`
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: vetspotEmail,
                    pass: vetspotPassword
                }
            })
            transporter.sendMail(msg, (err) => {
                if (err) {
                    console.log("Error", err)
                }
                else {
                    console.log('Email sent')
                }
            })
        })
    } catch (error) {
        console.log({ "Error": error.message });
        res.send({ "Error": error.message });
    }
})
userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await UserModel.find({ email });
    if (user.length > 0) {

        bcrypt.compare(password, user[0].password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ userID: user[0]._id }, process.env.secret,{ expiresIn: "30m"});
                const reftoken = jwt.sign({ userID: user[0]._id }, process.env.refsecret,{ expiresIn: "1d"});
                // client.HSET("tokensObj", email, token)
                // await client.HSET("tokensObj", token,"exist","EX",6)
                // await client.expire("tokensObj",60)

                res.cookie("token",token)
                res.cookie("reftoken",reftoken)
                res.send({ "message": "Login Successful", "Token": token,"reftoken":reftoken, "User": user[0] })
            } else {
                res.status(400).json({err:"Wrong credentials"})
            }
        });
    } else {
        res.status(400).json({err:"Wrong credentials"})
    }
})




userRouter.get("/logout", async (req, res) => {
    try {
        let token=req.cookies.token
        // console.log(token);
        // await client.HDEL("tokensObj", token)
        let block=new BlockModel({token})
        await block.save()
        res.send({ "mess": "Logout Successful" })
    } catch (error) {
        res.send({ "Error": error.message })
    }
})


module.exports = { userRouter }