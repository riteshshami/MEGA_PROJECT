import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import {getFullDetailsOfCourse} from "../services/operators/courseDetailsAPI";
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import Footer from "../components/common/Footer";

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {setCourseSectionData, setCompletedLectures, setEntireCourseData, setTotalNoOfLectures} = useSelector((state)=>state.viewCourse)
    const dispatch = useDispatch();
    
    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideoes));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=> {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    }, []);

  return (
    <div className='flex flex-col'>
    <div className='flex flex-row gap-2'>
      <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div>
            <Outlet/>
        </div>
    </div>
    <div>
      <Footer/>
    </div>
    {
        reviewModal && <CourseReviewModal setReviewModal={setReviewModal} /> 
    }
    </div>
  )
}

export default ViewCourse
