const express = require("express");
const router = express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} = require("../controllers/Profile");
const {auth, isAdmin} = require("../middleware/auth");

// setting routes

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getAllUserDetails", auth, isAdmin, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

module.exports = router