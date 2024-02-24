const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.User.id;
    
    try{
        // check if subSection is valid
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(400).json({error: "Invalid SubSection"});
        }

        // check for oid entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        })
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist."
            });
        }else{
            // check for re-completing video
            if(courseProgress.completedVideo.includes(subSectionId)){
                return res.status(400).json({
                    error: "Subsection already completed",
                });
            }

            courseProgress.completedVideo.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message: "Course Progress Updated Successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({error: "Internal Server Error"});
    }
}