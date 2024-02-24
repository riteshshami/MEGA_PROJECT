import React from 'react'
import { FiEdit } from "react-icons/fi";

const IconBtn = ({text, onClick, children, disabled, outline=false, customClasses, type, icon=false}) => {
  return (
    <button disabled={disabled} onClick={onClick} type={type} icon={false} className='text-richblack-900 bg-yellow-50 px-[20px] py-[8px] rounded-[8px] gap-[8px] flex flex-row'>
      {
        icon ? (<FiEdit className='translate-y-1'/>) : (null)
      }
      {
        children ? (<><span>{text}</span> {children}</>) : (text)
      }
    </button>
  )
}

export default IconBtn
