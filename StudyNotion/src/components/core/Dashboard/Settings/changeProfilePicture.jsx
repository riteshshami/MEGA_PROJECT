import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from 'react-icons/fi'
import {updateDisplayPicture} from '../../../../services/operators/settingsAPI'

const ChangeProfilePicture = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try{
            console.log("Uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append('file', imageFile)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
        }catch(error){
            console.log("ERROR MESSAGE", error.message);
        }
    }

    useEffect(() => {
        if (imageFile){
            previewFile(imageFile)
        }
    }, [imageFile])

  return (
    <div className='lg:h-[126px] bg-richblack-800 rounded-[8px] text-richblack-5 flex flex-row p-[24px] mb-[20px] gap-6'>
    {/* Image display */}
      <div>
        <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover" loading='lazy' />
      </div>
    {/* Change Image */}
      <div className='flex flex-col gap-3'>
        <p className='text-[16px] font-inter text-richblue-25'>Change Profile Picture</p>
        <div className='flex flex-row gap-3'>
           <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
            accept='image/png, image/gif, image/jpeg'
           />
           <button
           onClick={handleClick}
           disabled={loading}
           className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-black" 
           >
            Change
           </button>

           <button onClick={handleFileUpload} className='cursor-pointer rounded-md bg-richblack-500 py-2 px-5 font-semibold text-richblack-5 mx-auto'>
           {!loading && (
                <FiUpload className='text-lg text-richblack-900 mx-auto b'/>
            )}
           </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
