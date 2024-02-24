const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        // data fetch
        const {sectionName, courseId} = req.body;
        // data validation
        if (!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
            );
            // populate section and subsection
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    }catch(error){
        return res.status(500).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
        })
    }
}

// update section
exports.updateSection = async (req, res) => {
    try{
        // data input
        const {sectionName, sectionId} = req.body;
        // data validation
        if (!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            });
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true}); 

        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            section,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update Section, please try again',
            error:error.message, 
        })
    }
}

// delete section
exports.deleteSection = async (req, res) => {
    try{
        // get Id - assuming that we are sending Id in params
        const {sectionId} = req.params
        // delete by using function findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // do we need to delete the entry from the courseSchema check in testing
        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update Section, please try again',
            error:error.message, 
        })
    }
}