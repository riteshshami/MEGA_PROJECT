import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCodes from "../../data/countrycode.json"

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);
    try {
      setLoading(true);
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API.data);
      const response = { status: "OK" };
      console.log("Contact Us Response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="border-md">
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-row gap-[20px]">
          {/* First name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-[14px] text-richblack-5 text-left">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstName"
              placeholder="Enter first name"
              className="text-[#999DAA] text-[16px] bg-richblack-800 p-[12px] rounded-md lg:w-[258px] shadow-vs"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-red-500 text-xs italic">
                First Name is required
              </span>
            )}
          </div>
          {/* Last name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-[14px] text-richblack-5 text-left">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastName"
              placeholder="Enter last name"
              className="text-[#999DAA] text-[16px] bg-richblack-800 p-[12px] rounded-md lg:w-[258px] shadow-vs"
              {...register("lastname", { required: false })}
            />
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[14px] text-richblack-5 text-left">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="text-[#999DAA] text-[16px] bg-richblack-800 p-[12px] rounded-md lg:w-[536px] shadow-vs"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs italic">
              Email is required
            </span>
          )}
        </div>
        {/* phone number */}
        <div className="flex flex-col gap-2">
        <label htmlFor="phoneNo" className="text-[14px] text-richblack-5 text-left">Phone Number</label>
        <div className="flex flex-row gap-5 "> 
        {/* dropdown */}
        <div>
          <select 
          name="dropdown"
          id="dropdown"
          {...register("countrycode", {required: true})}
          className="max-w-[81px] radius-[8px] text-left text-[#999DAA] text-[16px] bg-richblack-800 p-[12px] rounded-md lg:h-[48px] shadow-vs"
          >
            {
              countryCodes.map((country, index) => (
                <option key={index} value={country.code} className="text-richblack-700 bg-transparent">
                  {country.code}
                </option>
              ))
            }
          </select>
        </div>
        <div>
          <input
          type="number"
          name="phonenumber"
          id="phonenumber"
          placeholder="Enter phone number"
          className="text-[#999DAA] text-[16px] bg-richblack-800 p-[12px] rounded-md lg:w-[435px] shadow-vs"
          {...register("phonenumber", { required: true, maxLength: {value:10, message:"Invalid Phone Number"}, minLength: {value:8, message:"Invalid Phone Number"} })}
          ></input>
        </div>
        </div>
        {
          errors.phonenumber && (
            <span className="text-red-500 text-xs italic">
              Phone Number is required
            </span>
          )
        }
        </div>
        {/* message */}
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="message" className="text-[14px] text-richblack-5 text-left">Message</label>
          <textarea
            name="message"
            id="message"
            cols="50"
            rows="7"
            placeholder="Enter your message here"
            className="text-[#999DAA] text-[16px] bg-richblack-800 p-[12px] rounded-md w-[536px] shadow-vs"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-xs italic">
              Please enter your message
            </span>
          )}
        </div>
        <div>
          <button type="submit" className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black lg:w-[536px] lg:h-[48px] mb-10">
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactUs;
