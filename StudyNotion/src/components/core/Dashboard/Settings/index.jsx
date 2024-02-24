import React from 'react'
import ChangeProfilePicture from './changeProfilePicture'
import EditProfile from './editProfile'
import UpdatePassword from './updatePassword'
import DeleteAccount from './deleteAccount'
import Sidebar from '../Sidebar'

const Setting = () => {

  return (
    <div>
    

       <h1 className='text-richblack-5 text-[30px] font-semibold p-[24px]'>Edit Profile</h1>

      {/* SECTION 1 */}
      <ChangeProfilePicture/>
      {/* SECTION 2 */}
      <EditProfile/>
      {/* SECTION 3 */}
      <UpdatePassword/>
      {/* SECTION 4 */}
      <DeleteAccount/>


    </div>
  )
}

export default Setting
