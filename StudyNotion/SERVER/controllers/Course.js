const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// createCourse handler function
exports.createCourse = async (req, res) => {
    try{

        // fetch all the data
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions,} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        if(!status || status === undefined){
            status="Draft"
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {accountType: "Instructor",});
        console.log("Instructor Details:", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found",
            });
        }

        // check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName, 
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
                {_id: instructorDetails._id},
                {
                    $push:{
                        courses: newCourse._id,
                    }
                },
                {new :true},
        );

        // update  ka schema
        await Category.findByIdAndUpdate(
            {_id: category._id},
            {
                $push:{
                    course: newCourse._id,
                }
            },
            {new:true},
        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error: error.message
        })
    }
}


// getAllCourses handler function 
exports.showAllCourses = async(req, res) => {
    try{
        // TODO: change below statement incrementally
        const allCourses = await Course.find({},
            {
                courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
            }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data is fetched successfully",
            data:allCourses,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error: error.message,
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try{
        // get id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.findById({_id: courseId})
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            },
        }).populate("category")
        .populate("ratingAndreviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message: `Could not find the course with ${courseId}`,
        });
    }
    // return response
    return res.status(200).json({
        success:true,
        message:"Course Details fetched successfully",
        data:courseDetails,
    })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}