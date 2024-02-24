const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// auth
exports.auth = async (req, res, next) => {
    try{
        // verifying json web token
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // if token is missing, then return response
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing",
            });
        }

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.User = decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.User.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for user only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}


// isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.User.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instructor only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}


// isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.User.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}
