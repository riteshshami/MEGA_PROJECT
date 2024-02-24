const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration");

// createCourse handler function
exports.createCourse = async (req, res) => {
    try{

        // fetch all the data
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions,} = req.body;

        // get thumbnail
        const thumbnail = req?.files?.thumbnail;

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
        const userId = req.User.id;
        const instructorDetails = await User.findById(userId, {accountType: "Instructor",});

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
                {_id: userId},
                {
                    $push:{
                        courses: newCourse._id,
                    }
                },
                {new :true},
        );

        // update  ka schema
        await Category.findByIdAndUpdate(
            {_id: category},
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
// exports.getCourseDetails = async (req, res) => {
//     try{
//         // get id
//         const {courseId} = req.body;
//         // find course details
//         const courseDetails = await Course.findById({_id: courseId})
//         .populate({
//             path:"instructor",
//             populate:{
//                 path:"additionalDetails",
//             },
//         }).populate("category")
//         .populate("ratingAndreviews")
//         .populate({
//             path:"courseContent",
//             populate:{
//                 path:"subSection",
//             },
//         }).exec();
//     if(!courseDetails){
//         return res.status(400).json({
//             success:false,
//             message: `Could not find the course with this ${courseId}`,
//         });
//     }
//     // return response
//     return res.status(200).json({
//         success:true,
//         message:"Course Details fetched successfully",
//         data:courseDetails,
//     })

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
// }

exports.editCourse = async (req, res) => {
    try{
        const {courseId} = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({error: "Course not found"})
        }

        // Thumbnail
        if(req.files){
            const thumbnail = req.files.thumbnail
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
              if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(updates[key])
              } else {
                course[key] = updates[key]
              }
            }
          }
      
          await course.save()

          const updatedCourse = await Course.findOne({
            _id: courseId,
          }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
          })
          .exec()

        res.json({
            success:true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
          })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try{
        const instructorId = req.User.id
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({createdAt: -1})

        res.status(200).json({
            success:true,
            data: instructorCourses,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

// DELETE THE COURSE
exports.deleteCourse = async (req, res) => {
    try{
        const {courseId} = req.body;

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message: "Course not found"})
        }


        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull: { course: courseId },
            })
        }

        // Delete sections and subsections
        const courseSections = course.courseContent
        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSections
                for(const subSectionId of subSections){
                    await subSections.findByIdAndUpdate(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success:true,
            message: "Course added successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message,
        })
    }
}

exports.getCourseDetails = async(req, res) => {
    try{

        const {courseId} = req.body
        const courseDetails = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
                select: "-videoUrl",
            },
        })
        .exec()
       
        if (!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
            },
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve course details",
            error: error.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try{
        const {courseId} = req.body
        const userId = req.User.id
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()

        const courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        console.log("courseProgressCount", courseProgressCount)

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [], 
            },
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}