var jwt = require("jsonwebtoken")
var config = require("../config/config.json")
var constants_function = require("../constants/constants");
var constants = constants_function("appointment");
module.exports = async(req,res,next) => {
    try{
        var token = req.headers.authorization;
        var tokenData = jwt.decode(token,config.ADMIN_JWT_KEY);
        if(tokenData){
            if(tokenData.role == 'user' || tokenData.role== 'admin'){
                next();
            }
            else{
                res.status(401).json({
                    "status": {
                        "success": false,
                        "code": 401,
                        "message": constants.NOT_AUTHORIZED
                    }
                });
                console.log(err);
            }
        }
        else{
            res.status(401).json({
                "status": {
                    "success": false,
                    "code": 401,
                    "message": constants.NOT_AUTHORIZED
                }
            });
            console.log(err);
        }
        
    }
    catch(err){
        res.status(401).json({
            "status": {
                "success": false,
                "code": 401,
                "message": constants.NOT_AUTHORIZED
            }
        });
        console.log(err);
    }
    
}
