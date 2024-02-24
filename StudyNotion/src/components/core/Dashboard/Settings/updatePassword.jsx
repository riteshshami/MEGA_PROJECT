import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../services/operators/settingsAPI'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useForm } from 'react-hook-form'

const UpdatePassword = () => {
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    
    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm()

    const submitPasswordForm = async (data) => {
        try{
            await changePassword(token, data)
        }catch(error){
            console.log("Error Message -", error.message)
            console.log("Password Not Change")
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
            <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-[48%]">
                <label className="text-[14px] text-richblack-5 text-left">
                    Current Password
                </label>
                <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    id="oldPassword"
                    placeholder='Enter Your Current Password'
                    className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                    {...register("oldPassword", {required:true})}
                />
                <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showOldPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>
                {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
                <label className="text-[14px] text-richblack-5 text-left">
                    New Password
                </label>
                <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    placeholder='Enter Your New Password'
                    className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                    {...register("newPassword", {required:true})}
                />
                <span onClick={() => setShowNewPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                  {showNewPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>
                {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
            </div>
            {/* Division */}
            <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-[48%]">
                <label className="text-[14px] text-richblack-5 text-left">
                    Confirm New Password
                </label>
                <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    placeholder='Confirm Your New Password'
                    className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                    {...register("confirmNewPassword", {required:true})}
                />
                <span onClick={() => setShowConfirmNewPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                  {showConfirmNewPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>
                {errors.confirmNewPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please confirm your New Password.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label className="text-[14px] text-richblack-5 text-left">Email</label>
              <input 
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Registered Email"
                className="text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md lg:w-[400px] border-[1px]"
                {...register("email", {required:true})}
              />
              {errors.confirmNewPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Email.
                </span>
              )}
            </div>
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

export default UpdatePassword
