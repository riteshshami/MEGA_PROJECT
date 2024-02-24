import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { formattedDate } from '../../../utils/dateFormatter' 

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
  return (
    <div>
      
    <h1 className='text-richblack-5 text-[30px] font-semibold p-[24px]'>My Profile</h1>

    {/* Section 1 */}
    <div className='lg:w-[792px] lg:h-[126px] bg-richblack-700 rounded-[8px] border-[1px] text-richblack-5 flex flex-row justify-between p-[24px] mb-[20px]'>
        <div className='flex flex-row gap-5'>
            <img src= {user?.image} alt={`profile-${user?.firstName}`} 
                className='aspect-square w-[78px] rounded-full object-cover'
            />
            <div className='flex flex-col gap-1'>
                <p className='text-[18px]'>{user?.firstName + " " + user?.lastName}</p>
                <p className='text-[14px] text-richblack-300'>{user?.email}</p>
            </div>
        </div>
        {/* add icon after text */}
        <div>
        <IconBtn text={"Edit"} icon={true} onClick={() => navigate('/dashboard/settings')} />
        </div>
    </div>

    {/* Section 2 */}
    <div className='lg:w-[792px] lg:h-[126px] bg-richblack-700 rounded-[8px] border-[1px] text-richblack-5 flex flex-col justify-between p-[24px] mb-[20px]'>
        <div className='flex flex-row justify-between'>
        <div className='text-[18px]'>About</div>
        {/* add icon after text */}
        <div>
        <IconBtn text={"Edit"} icon={true} onClick={() => navigate('/dashboard/settings')} />
        </div>
        </div>
        <p>{user?.additionalDetails?.about ?? "Write Something about yourself"}</p>
    </div>

    {/* Section 3 */}
    <div className='lg:w-[792px] lg:h-[225px] bg-richblack-700 rounded-[8px] border-[1px] text-richblack-5 flex flex-col justify-between gap-5 p-[24px] mb-[20px]'>
        <div className='flex flex-row justify-between'>
            <p className='text-[18px]'>Personal Details</p>
            {/* add icon after text */}
            <div>
            <IconBtn text={"Edit"} icon={true} onClick={() => navigate('/dashboard/settings')} />
            </div>
        </div>
        <div className='grid sm:grid-col-1 lg:grid-cols-2 gap-[1px]'>
            <div className='gap-[4px]'>
                <p className='text-[14px] text-richblack-600'>First Name</p>
                <p>{user?.firstName}</p>
            </div>
            <div className='gap-[4px]'>
                <p className='text-[14px] text-richblack-600'>Email</p>
                <p>{user?.email}</p>
            </div>
            <div className='gap-[4px]'>
                <p className='text-[14px] text-richblack-600'>Gender</p>
                <p>{user?.additionalDetails?.gender}</p>
            </div>
            <div className='gap-[4px]'>
                <p className='text-[14px] text-richblack-600'>Last Name</p>
                <p>{user?.lastName}</p>
            </div>
            <div className='gap-[4px]'>
                <p className='text-[14px] text-richblack-600'>Phone Number</p>
                <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div className='gap-[4px]'>
                <p className='text-[14px] text-richblack-600'>Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
            </div>
        </div>
    </div>


    </div>
  )
}

export default MyProfile
