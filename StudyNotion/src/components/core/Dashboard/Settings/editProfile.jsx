import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from '../../../../services/operators/settingsAPI'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const submitProfileForm = async (data) => {
      try {
        dispatch(updateProfile(token, data))
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          {/* <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="firstName" className="text-[14px] text-richblack-5 text-left">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstName"
              placeholder="Enter first name"
              className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-red-500 text-xs italic">
                First Name is required
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-[48%]">
            <label htmlFor="lastName" className="text-[14px] text-richblack-5 text-left">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastName"
              placeholder="Enter last name"
              className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
              {...register("lastname", { required: false })}
            />
          </div>
          </div> */}

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-[14px] text-richblack-5 text-left">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-[14px] text-richblack-5 text-left">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-[14px] text-richblack-5 text-left">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-[14px] text-richblack-5 text-left">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row-reverse gap-2'>
                <button
                type='submit'
                className='px-[24px] py-[12px] rounded-[8px] gap-[8px] bg-yellow-50 text-[16px] text-richblack-900'
                >
                Update
                </button>
                <button
                onClick={() => {
                    navigate("dashboard/my-profile")
                }}
                className='px-[24px] py-[12px] rounded-[8px] gap-[8px] bg-richblack-800 text-[16px] text-richblack-5'
                >
                Cancel
                </button>
            </div>  
      </form>

    </div>
  )
}

export default EditProfile
