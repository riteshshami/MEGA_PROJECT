const express = require("express");
const router = express.Router();

// import controller
const {resetPassword, resetPasswordToken} = require("../controllers/ResetPassword");
const {sendOTP, login, signUp, changePassword} = require("../controllers/Auth");
const {auth} = require("../middleware/auth");

// setting routes


router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password", resetPassword);
router.post("/reset-password-token", resetPasswordToken);



module.exports = router