var express = require("express");
var router = express.Router();
const bcrypt=require("bcrypt");
const otpGenerator = require('otp-generator');
const {Otp} = require('../models/otpModel');
const fast2sms = require('fast-two-sms');
const handleLogin = require("../handleLogin");
var config = require('../config/config.json')

router.post("/", async (req, res) => {
    try { 
        const no=req.body.phoneNumber;
        const user = await Otp.findOne({
            number:no
        });
        
        if (no.length==10){   
        var OTP = otpGenerator.generate(6,{
            digits:true, lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false
        });
        console.log(OTP)
        var options = {authorization : config.MESSAGE_KEY , message : `OTP for the mobile number ${no} is ${OTP}` ,  numbers : [no], sender_id: "Kakarla Dental", } 
        //fast2sms.sendMessage(options)
        const salt = await bcrypt.genSalt(10)
        OTP=await bcrypt.hash(OTP,salt)

        if(user){
            await Otp.updateOne({number:no},{$set:{otp:OTP}});
            res.status(200).json({
                "status": {
                "success": true,
                "code": 200,
                "message": "otp send successfully"
            },
        });        
        }
    
        else{
            const number= no;
            const otp = new Otp({number:number,otp:OTP});
            const result= await otp.save()
            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 200,
                    "message":"otp send successfully"}})
        }
        
}
    else{
        return res.status(200).send("Please enter the Correct 10-Digit Mobile Number")
    }
}
    catch (err) {
        res.status(500).json({
            "status": {
                "success": true,
                "code": 500,
                "message": "Failed"
            },
        });
    }
})


router.post("/verify", async (req, res) => {
    try { 
        const inotp = req.body.otp;
        const role = req.body.role;
        const no=req.body.phoneNumber;
        const otpHolder= await Otp.find({
            number:no
        });
    const rightOtpfind= otpHolder[0];
    const validUser = await bcrypt.compare(inotp,rightOtpfind.otp);
    if(rightOtpfind.number === no && validUser){
        const userLogin = await handleLogin(no,role)
    return res.status(200).send({
        "token" : userLogin.token,
        "isCorrect" : true,
        "status": {
            "success": true,
            "code": 200,
            "message":userLogin.message,
        }
    })
    }
    else{
        res.status(200).json({
            "isCorrect" : false,
            "status": {
                "success": true,
                "code": 200,
                "message":"Invalid otp Please enter correct otp"}})
    }
}
    catch (err) {
        res.status(500).json({
            "status": {
                "success": true,
                "code": 500,
                "message": "failed"
            },
        });
    }})

module.exports = router;