import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operators/authAPI";
import { FaArrowLeftLong } from "react-icons/fa6";


const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
    setEmailSent(true);
  };    

  return (
    <div>
      {loading ? (
        <div className="relative mx-auto flex flex-col w-[508px] items-center text-white justify-between p-8 gap-9">Loading...</div>
      ) : (
        <div className="relative mx-auto flex flex-col w-[508px] items-left text-white justify-between mt-[7%] p-8 gap-6">
          <h1 className="text-3xl font-semibold">{!emailSent ? "Reset Your Password" : "Check Your Email"}</h1>
          <p className="text-lg font-normal text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col"> 
            {
             !emailSent && (
                <label className="gap-5">
                    <p className="text-[14px] text-richblack-5 text-left">Email Address<sup className="text-pink-200">*</sup></p>
                    <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="text-[#999DAA] text-[16px] bg-richblack-800 w-[100%] p-[12px] rounded-md shadow-vs"
                    />               
                </label>
             )
            }
            <button type="submit" className="bg-yellow-50 text-richblack-900 font-medium text-base my-5 p-3 gap-2 rounded-lg shadow-vs">
            {
                !emailSent ? "Reset Password" : "Resend Email"
            }
            </button>
          </form>
          <div>
            <Link to="/login">
                <div className="flex flex-row gap-2 p-3">
                <FaArrowLeftLong className="translate-y-1" />
                <p>Back to Login</p>
                </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
