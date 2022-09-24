var express = require("express");
var router = express.Router();
var user_auth = require('../checkAuthorisation/user_authorisation')
var jwt = require('jsonwebtoken')
var config = require('../config/config.json')
router.post('/getData',user_auth,async(req,res) =>{
    try{
        var tokenData = jwt.decode(req.body.token,config.ADMIN_JWT_KEY)
        res.status(200).json({
            "status": {
                "success": true,
                "code": 200,
                "message": "Fetched data successfully"
            },
            "data": tokenData
        });
    }
    catch{
        res.status(500).json({
            "status": {
                "success": true,
                "code": 500,
                "message": "Failed"
            },
        });
    }
})

module.exports = router;