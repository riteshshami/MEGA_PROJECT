const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// reset password token
exports.resetPasswordToken = async (req, res) => {
    try{
        // get email from request body
        const email = req.body.email;
        // validation of email, check in database
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
            success: false,
            message: "Your email is not registered with us",
            });
        }
        // create a token
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                        { email: email },
                                        { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
                                        { new: true }
        );
        console.log("DETAILS:", updatedDetails);
        // generate the link
        const url = `https://localhost:3000/update-password/${token}`;
        // send email containing email
        await mailSender(email, `Password Reset Link", "Password Reset Link: ${url}`);
        // return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check email and change password",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something, went wrong while sending reset password mail",
        })
    }
};

// reset password
exports.resetPassword = async (req, res) => {
    try{
        // data fetch
        const {password, confirmPassword, token} = req.body;
        // validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password is not matching with the confirm password in reset password",
            });
        }
        // get user details from db using token
        const userDetails = await User.findOne({token: token});
        // if no entry - invalid token
        if(!userDetails){
            return res.json({
                successs:false,
                message:"Invalid Token",
            });
        }
        // token time check
        if(userDetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate your token",
            });
        }
        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        // password update 
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
            )
        // return res
        return res.status(200).json({
            success:true,
            message:"Password reset successful"
        })
    }catch(error){
        return res.status().json({
            success:false,
            message:"Error occuring in reseting password"
        })
    }
}
