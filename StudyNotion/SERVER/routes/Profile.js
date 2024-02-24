const express = require("express");
const router = express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard} = require("../controllers/Profile");
const {auth, isAdmin, isInstructor} = require("../middleware/auth");

// setting routes

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getAllUserDetails", auth, isAdmin, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router