import React from 'react'
import { FiEdit } from "react-icons/fi";

const IconBtn = ({text, onClick, children, disabled, outline=false, customClasses, type, icon=null}) => {
  return (
    <button 
    disabled={disabled} 
    onClick={onClick} 
    type={type} 
    icon={null}
    className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
    >
      {
        icon ? (<FiEdit className='translate-y-1'/>) : (null)
      }
      {
        children ? (<><span className={`${outline && "text-yellow-50"}`}>{text}</span> {children}</>) : (text)
      }
    </button>
  )
}

export default IconBtn
