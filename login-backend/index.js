const express=require('express');
const app=express();
const mongoose = require('mongoose');
const config = require("./config/config.json");
const bodyParser = require('body-parser');
const cors = require("cors");
const User = require('./models/user');
const port = process.env.PORT||4000;
app.listen(port, function() {
    console.log('Port is running in '+ port);
});
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//MongoDb Connection :
mongoose.connect(config.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true},function(err, conn){
    if(err){
        console.log("mongodb connection error", err);
    }
    if(!err && conn){
        console.log("mongodb connection stablished");
    }
});

const signinRoute = require("./routes/signin");
const tokenDataRoute = require("./routes/tokenData");
//Use API routes in the App
app.use('/signin',signinRoute)
app.use('/tokenData',tokenDataRoute)
//var newUser = new User({_id: new mongoose.Types.ObjectId(),phone_number : '9030656522',role:'admin'})
//newUser.save()