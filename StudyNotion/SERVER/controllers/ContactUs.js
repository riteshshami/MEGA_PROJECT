const Contact = require("../models/ContactUs");

exports.contactUs = async(req, res) => {
    try{
        const {email, firstname, lastname, message, phoneNo} = req.body;

        if(!email || !firstname || !lastname || !message || !phoneNo){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            });
        }

        const contactDetails = await Contact.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            phone: phoneNo,
            message: message
        });

        return res.status(200).json({
            success:true,
            message:"Query send successfully",
            data:contactDetails
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};