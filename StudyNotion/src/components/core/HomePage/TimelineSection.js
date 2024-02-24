import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo: logo1,
        heading: "Leadership",
        description: "Fully committed to the sucess compnay"
    },
    {
        logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skill"
    },
    {
        logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to the solution"
    }
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-15 items-center'>
            <div className='w-[45%] flex flex-col gap-7'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div key={index} className='flex flex-row gap-6'>
                                <div className='w-[50px] h-[50px] bg-[#f9f9f9]flex items-center translate-y-2'>
                                <img src={element.logo} alt='logo'/>
                                </div>
                                <div>
                                    <h2 className='text-2xl font-semibold'>{element.heading}</h2>
                                    <p className='text-base'>{element.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='relative shadow-blue-200'>
            <img src={timelineImage} alt="timelineImage"
            className='shadow-white object-cover h-fit shadow-3xl' loading='lazy'></img>
             <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                </div>
             </div>
            </div>
      </div>
    </div>
  )
}

export default TimelineSection
