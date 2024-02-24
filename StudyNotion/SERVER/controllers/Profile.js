const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");

exports.updateProfile = async (req, res) => {
    try{
        // get data
        const {dateOfBirth='', about='', contactNumber, gender} = req.body;
        // get user id
        const id = req.User.id;
        // validate
        if(!contactNumber || !gender || !id){
            return res.status.json({
                success:false,
                message:'All fields are required',
            });
        }

        // find profile 
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        console.log(profileId);
        const profileDetails = await Profile.findById(profileId);
        if(profileDetails === null){
          console.log("Details not found");
        }

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error: error.message,
        });
    }
};

// delete account

exports.deleteAccount = async (req, res) => {
    try{
        // get id
        const id  = req.User.id;
        // validation
        const userDetails = await User.findById(id);
        console.log(userDetails.additionalDetails)
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'user not found',
            })
        }
        // delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        console.log("Userdetails deleted")

        // delete user
        await User.findByIdAndDelete(id);
        console.log("User deleted")

        // TODO:HW
        // unenroll user from all enrolled courses
        await Course.findByIdAndDelete(id, studentsEnrolled);

        // return response
        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
        });
    }catch(error){
        return res.status(500).json({
            success:true,
            message:"User cannot be deleted successfully",
        });
    }
};

// userDetails
exports.getAllUserDetails = async (req, res) => {
    try{
        // get id
        const id = req.User.id;

        // get userDetails
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // validation
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'user not found',
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:'User data fetched successfully',
        });

    }catch(error){
        return res.status(500).json({
            success:true,
            message:"User data cannot be fetched successfully",
        });
    }
}

// update profile picture
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req?.files?.file
      const userId = req.User.id
      const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000)
      console.log(image.secure_url)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.User.id
      const userDetails = await User.findOne({
        _id: userId,
      }).populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      }).exec();

      // userDetails = userDetails.toObject()
      // var SubsectionLength = 0
      // for (var i = 0; i < userDetails.courses.length; i++) {
      // let totalDurationInSeconds = 0
      // SubsectionLength = 0
      // for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
      //   totalDurationInSeconds += userDetails.courses[i].courseContent[
      //   j
      //   ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
      //   userDetails.courses[i].totalDuration = convertSecondsToDuration(
      //   totalDurationInSeconds
      //   )
      //   SubsectionLength +=
      //   userDetails.courses[i].courseContent[j].subSection.length
      // }
      // let courseProgressCount = await CourseProgress.findOne({
      //   courseID: userDetails.courses[i]._id,
      //   userId: userId,
      // })
      // courseProgressCount = courseProgressCount?.completedVideos.length
      // if (SubsectionLength === 0) {
      //   userDetails.courses[i].progressPercentage = 100
      // } else {
      //   // To make it up to 2 decimal point
      //   const multiplier = Math.pow(10, 2)
      //   userDetails.courses[i].progressPercentage =
      //   Math.round(
      //     (courseProgressCount / SubsectionLength) * 100 * multiplier
      //   ) / multiplier
      // }
      // }
      
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails._id}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDashboard = async(req, res) => {
  try{
    const courseDetails = await Course.find({instructor:req.User.id})

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // create new object with the additional fields
      courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({course: courseData});


  }catch(error){
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
}