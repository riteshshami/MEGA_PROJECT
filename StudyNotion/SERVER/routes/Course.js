const express = require("express");
const router = express.Router();

const {createCourse, showAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse,} = require("../controllers/Course");
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category");
const {createRating, getAllRating, getAverageRating} = require("../controllers/RatingAndReview");
const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");
const {updateCourseProgress} = require("../controllers/CourseProgress");
const {auth, isAdmin, isInstructor, isStudent} = require("../middleware/auth");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/categoryPageDetails", categoryPageDetails);
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAllRating", getAllRating);
router.get("/getAverageRating", getAverageRating);
router.post("/createSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", deleteCourse);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;