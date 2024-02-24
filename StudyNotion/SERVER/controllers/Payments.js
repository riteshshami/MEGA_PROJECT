const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

// initiate the razorpay order
exports.capturePayment = async(req, res) => {
    const {courses} = req.body;

    const userId = req.User.id;

    if(courses.length === 0){
        return res.json({success:false, message:"Please provide course id"})
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success:false, message:"Could not find the course"})
            }

            const uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({success:false, message:"Student is already enrolled"})
            }

            totalAmount += course.price;

        }
        catch(error){
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not initiate order"
        });
    }

}

// payment verification
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.User.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){
        // enroll karwao
        await enrollStudents(courses, userId, res);
        // return res
        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(200).json({success:false, message:"Payment Failed"})

}

// students enrolled
const enrollStudents = async(courses, userId, res) => {

    if (!courses || !userId){
        return res.status(400).json({
            success:false, 
            message:"Please provide data for courses or userId"
        });
    }

    for(const courseId of courses) {
        // find the course and enroll students
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true},
             )
             if(!enrolledCourse){
                return res.status(500).json({success:false, message:"Course not Found"});
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideo: [],
            })
    
            // find the students and find there list of enrolledCourse
            const enrolledStudent = await User.findByIdAndUpdate(userId, {
                $push:{
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }
            },{new:true})
    
            // send mail
            const emailResponse = await mailSender(
                enrollStudents.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )
            console.log("Email Sent Successfuly", emailResponse.response);
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.User.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"})
    }

    try{
        // find the students
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )
    }catch(error){
        console.log("Error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}

// // captures the payment and initiate the razorpay payment
// exports.capturePayment = async (req, res) => {
//     // get courseId and UserId
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     // validation
//     // valid courseId
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     // valid CourseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.jaon({
//                 success:false,
//                 message:'Could not find the course',
//             })
//         }

//         // user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.StudentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message: 'Student is already enrolled',
//             });
//         }
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }

//     // order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };


//     try{
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         // return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })

//     }catch(error){
//         console.log(error);
//         res.json({
//             success:false,
//             message:'Could not initiate order',
//         })
//     }
// };

// // verify signature
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";
    
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             // fulfill the action
//             // find the course and enroll the student init
//             const enrolledCourse = await Course.findOneAndUpdate({_id: courseId},
//                 {$push:{studentsEnrolled: userId}},
//                 {new:true},);

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//             }

//             console.log(enrolledCourse);

//             // find the student and add the enrolled course
//             const enrolledStudent = await User.findOneAndUpdate({_id: userId},
//                 {$push:{courses:courseId}},
//                 {new:true},);

//             console.log(enrolledCourse);

//             // confirmation mail sending
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation from Codehelp",
//                 "Congratulation, you are onboarded into new Codehelp Course",
//             ); 
            
//              console.log(emailResponse);
//              return res.status(200).json({
//                 success:true,
//                 message:'Signature Verified and Course Added',
//              });   

//         }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:'Invalid Request',
//         })
//     }

// };