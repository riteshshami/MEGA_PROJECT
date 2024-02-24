import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {IoChevronBackSharp, IoChevronDownSharp} from 'react-icons/io5';
import { IoIosTv } from "react-icons/io";

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
       courseSectionData,
       courseEntireData,
       totalNoOfLectures,
       completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(() => {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideobarActive(activeSubSectionId);
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className='text-white bg-richblack-800 gap-3 gap-x-8 lg:w-[15%] lg:h-[100vh]'>
      {/* For Buttons And Headings */}
        <div>
            {/* for buttons */}
            <div>
                <div
                onClick={() => {navigate("/dashboard/enrolled-courses")}}
                className='cursor-pointer flex flex-row gap-1 pl-7 p-5'
                >
                <IoChevronBackSharp className='translate-y-1'/>
                    Back
                </div>
                <div>
                <button
                onClick={()=>{setReviewModal(true)}}
                className='flex items-center px-6 py-3 bg-yellow-50 rounded-lg gap-2 text-black shadow-vs border border-yellow-100 mx-auto'
                >
                    Add Review
                </button>
                </div>
                <div className='h-[1.5px] w-full bg-richblack-700 my-5 px-2'></div>
            </div>
            {/* for heading */}
            <div className= 'border-b-richblack-600 border-b-[1px] px-6 py-4'>
                <p className='text-md font-medium'>{courseEntireData?.courseName}</p>
                <p className='text-sm font-bold text-richblack-200'>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>
        </div>

        {/* for sections and subsection */}
        <div>
            {
                courseSectionData.map((section, index)=>(
                    <div
                    onClick={() => setActiveStatus(section?._id)}
                    key={index}
                    >
                        {/* section */}
                        <div className='flex flex-row justify-between bg-richblack-600 border-b-richblack-600 border-b border-solid px-6 py-4'>
                            <div className='text-sm font-medium'>
                                {section?.sectionName}
                            </div>
                            <IoChevronDownSharp className='translate-y-1' />
                        </div>
                        {/* subsections */}
                        <div>
                            {
                              activeStatus === section?._id  && (
                                <div>
                                    {
                                        section.subSection.map((topic, index)=>(
                                            <div
                                            className={`flex justify-between p-5 ${videobarActive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-700 text-richblack-5"} `}
                                            key={index}
                                            onClick={()=> {
                                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                                )
                                                setVideobarActive(topic?._id)
                                            }}
                                            >
                                                <div className='flex flex-row gap-3'>
                                                <input
                                                    type='checkbox'
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => {}}
                                                />
                                                <span>{topic.title}</span>
                                                </div>
                                                <IoIosTv className='translate-y-1'/>
                                            </div>
                                        ))
                                    }
                                </div>
                              )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </>
  )
}

export default VideoDetailsSidebar
