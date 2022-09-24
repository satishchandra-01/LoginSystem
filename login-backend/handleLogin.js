var User = require("./models/user");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config/config.json")
async function handleLogin(phoneNumber,role){
    const user = await User.findOne({ phone_number: phoneNumber, isActive: true });
    if(!user && role=='user'){
        try{
            var newUser = new User({_id: new mongoose.Types.ObjectId(),phone_number : phoneNumber,role:role})
            await newUser.save()
            const token = jwt.sign(
                {
                    phone_number: newUser.phone_number,
                    role: newUser.role,
                    uid : newUser._id
                },
                config.ADMIN_JWT_KEY,
            )
            return {token:token,message:"New Patient Record created and Logged In successfully"}
        }
        catch{
            return {token:null,message:"Failed to fetch user data. Please try again"}
        }
    }
    else if(!user && role=='admin'){
        return {token:null,message:" Invalid Admin Login"}
    }
    else if(user && role!=user.role){
        return {token:null,message:`User should login as ${user.role}`}
    }
    else {
        const token = jwt.sign(
            {
                phone_number: user.phone_number,
                role: user.role,
                uid: user._id
            },
            config.ADMIN_JWT_KEY,
        )
        return {token:token,message:"Logged In Successfully"}
    }
}

module.exports = handleLogin;