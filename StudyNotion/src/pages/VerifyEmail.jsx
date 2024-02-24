import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { signUp } from '../services/operators/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sendOtp } from '../services/operators/authAPI';
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";


const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector((state) => state.auth);

    useEffect( () => {
        if(!signupData) {
            navigate("/signup");        
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const  {
            accountType,
            firstName, 
            lastName,
            email,
            password,
            confirmPassword,
            otp, 
            navigate
        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

  return (
    <div className="relative mx-auto my-auto flex flex-col lg:w-[508px] p-[32px] gap-[24px] items-center text-white justify-between">
      {
        loading ? (<div>
            Loading...
        </div>) : (
            <div>
                <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Verify Email</h1>
                <p className='mt-4 mb-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>A verification code has been sent to you. Enter the code below</p>  
                <form onSubmit={handleOnSubmit}>
                    <OTPInput
                    value = {otp}
                    onChange = {setOtp}
                    numInputs={6}
                    renderInput={(props) => (<input {...props}                   
                    placeholder="-"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />)}
                    containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                    }}
                    />
                    <button type='submit' className='bg-yellow-50 text-[16px] font-semibold text-richblack-900 lg:w-[444px] lg:h-[48px] p-[12px] gap-[8px] rounded-[8px] mt-5'>Verify Email</button>
                </form> 
                <div className='flex flex-row justify-between '>
                <div className='flex flex-row gap-[8px] text-[16px] p-[12px] -translate-x-5'>
                    <Link to="/login" className='flex flex-row gap-[8px] text-[16px] p-[12px]'>
                        <FaArrowLeftLong className='translate-y-1' />
                        <p>Back to Login</p>
                    </Link>
                </div>
                <button onClick={() => dispatch(sendOtp(signupData.email))} className='flex flex-row text-blue-100 text-[16px] translate-y-5 gap-1'>
                    <GiBackwardTime className='translate-y-1' />
                    Resend it
                </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
