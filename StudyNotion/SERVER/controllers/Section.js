const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

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
        console.log("New Section", newSection)
        // update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
            ).populate({
                path:"courseContent",
                populate:{
                    path: "subSection",
                }
            })
            .exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Section not created successfully',
            updatedCourseDetails,
        })
    }
}

// update section
exports.updateSection = async (req, res) => {
    try{
        // data input
        const {sectionName, sectionId, courseId} = req.body;
        console.log("Request data", req.body)
        // data validation
        if (!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            });
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true}); 

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();

        // return response
        return res.status(200).json({
            success:true,
            message: section,
            data:course,
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
    console.log("Request", req.body);
    try{
        const {courseId, sectionId} = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })
        const section = await Section.findById(sectionId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found",
            })
        }
        // delete sub section
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        // find the update course and return
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: course
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update Section, please try again',
            error:error.message, 
        })
    }
}