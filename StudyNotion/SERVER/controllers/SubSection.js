const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create SubSection

exports.createSubSection = async (req, res) => {
    try{
        // fetch data from ReportBody
        const {sectionId, title, timeDuration , description} = req.body;
        // extract file/video
        const video = req.files.videoFile;
        // validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:true,
                message:'All fields are required',
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        // create subsection
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section with this subSection ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
            {$push:{
                subSection: SubSectionDetails._id,

            }},
            {new:true},
            // HW: log updated section here, after adding populate query
            ).populate("updatedSection").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"Sub Section updated successfully",
            updatedSection,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:error.message, 
        })
    }
}

// update subsection
exports.updateSubSection = async (req, res) => {
    try{
        // fetch data from ReportBody
        const {subSectionId, title, timeDuration , description} = req.body;
        // extract file/video
        const video = req.files.videoFile;
        // validation
        if(!subSectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:true,
                message:'All fields are required',
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // update data
        const subSection = await SubSection.findByIdAndUpdate(subSectionId,
            {
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadDetails.secure_url,
            },
            {new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            subSection,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update Sub-Section, please try again',
            error:error.message, 
        })
    }
} 

// delete subsection
exports.deleteSubSection = async (req, res) => {
    try{
        // get Id- assuming that we are sending Id in params
        const {subSectionId, sectionId} = req.body;
        await Section.findByIdAndUpdate({_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                },
            })
        // delete the user by using id
        await SubSection.findByIdAndDelete({_id: subSectionId});     
        if (!subSectionId) {
            return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
        // return response
        return res.status(200).json({
            success:true,
            message:'Sub-Section deleted successfully'
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete Sub-Section, please try again',
            error:error.message, 
        })
    }
}