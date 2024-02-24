import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-center text-[36px] font-semibold my-[120px] mx-[90px] text-richblack-100 max-w-maxContent'>
    <span className='text-richblack-600'>" </span>
      We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology, "}/>
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#FF512F]  to-[#F09819]">
        expertise
    </span>
       , and community to create an 
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#E65C00] to-[#F9D423]">
         {" "}unparalleled educational experience.
    </span>
    <span className='text-richblack-600'> "</span>
    </div>
  )
}

export default Quote
