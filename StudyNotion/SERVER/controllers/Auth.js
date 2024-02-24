const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req body
    const { email } = req.body;

    // check if user exist already
    const checkUserPresent = await User.findOne({ email });

    // if user exist then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpPayload = { email, otp };

    // create an entry in db for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody", otpBody);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signup
exports.signUp = async (req, res) => {
    try{
          // data fetch from req body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
    } = req.body;

    // data validation
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required",
        })
    }

    // match the password and confirm password
    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and ConfirmPassword value does not match, please try again",
        })
    }  

    // finding user already exist or not
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:true,
            message:"User is already registered",
        })
    }

    // find more recent otp for the user
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(`Recent OTP is: ${recentOtp}`);

    // validate otp
    if (recentOtp.length == 0){
        // otp not found
        return res.status(400).json({
            success:false,
            message:"OTP not found",
        })
    } else if( otp !== recentOtp[0].otp){
        return res.status(400).json({
            success:false,
            message:"Invalid OTP"
        })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create entry in db
    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    });

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    // return res
    return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user,
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            success:"User cannot be registered, please try again"
        })
    }
};

// login
exports.login = async (req, res) => {
    try{
        // fetch the data
        const {email, password} = req.body;

        // validate the data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
            });
        }
        // finding user 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            })
        }

        // password matching
        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType:  user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            // cookie genration
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"Login failure, please try again",
        })
    }
}

// change Password
exports.changePassword = async (req, res) => {
    try{
        //get user data
        const userDetails = await User.findById(req.user.id);

        // fetch the data
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        // validate the data
        if(!oldPassword || !newPassword || !confirmNewPassword || !email){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
            });
        }

        // validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false, 
                message:"The password is incorrect"
            })
        }

        // update new Password
        if(newPassword === confirmNewPassword){

            // hashed password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await User.findOneAndUpdate(req.user.id,{
                password:hashedPassword,
            }, {new:true})
            // send mail
            try{
                const mailResponse = await mailSender(userDetails.email, "Password confirmation mail from StudyNotion");
                console.log("Email sent successfully", mailResponse);
            }catch(error){
                // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                console.error("Error occurred while sending email:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }
            // return res
            return res.status(200).json({
                success:true,
                message:"password is updated successfully",
                updatedUser,
            });
        }else{
            return res.status(400).json({
                sucess:false,
                message:"New Password is not matching with the value of confirm password",
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"Password not changed, please try again",
        })
    }
}