import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operators/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'; 
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import {AiFillPlayCircle} from "react-icons/ai";
import { getFullDetailsOfCourse } from '../../../services/operators/courseDetailsAPI';
import { setCourseSectionData, setCompletedLectures, setEntireCourseData, setTotalNoOfLectures } from '../../../slices/viewCourseSlice';
import CourseReviewModal from './CourseReviewModal';

const VideoDetails = () => {

    const {courseId, sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const location = useLocation();
    const {token} = useSelector((state) => state.auth);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    
    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=> {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    }, []);

    useEffect(() => {
      const setVideoSpecificDetails = async() => {
        if(!courseSectionData.length)
          return;
        if(!courseId && !sectionId && !subSectionId) {
          navigate("/dashboard/enrolled-courses");
        }else{
          const filteredData = courseSectionData.filter(
            (course) => course._id === sectionId
          )

          const filteredDataVideo = filteredData?.[0]?.subSection.filter(
            (data) => data._id === subSectionId
          )

          setVideoData(filteredDataVideo[0]);
          setVideoEnded(false);
        }
      }
      setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }else{
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1  && currentSubSectionIndex === noOfSubSection-1){
      return true;
    }else{
      return false;
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSection - 1){
        // same section ki video
        const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }else{
      // different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== 0){
      // same section previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }else{
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id 
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id  
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }

  }

  const handleLectureCompletion = async() => {
    // dummy code later we will replace 
    setLoading(true);

    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    // state update
    if(res){
      dispatch(updateCompletedLectures({courseSectionData, subSectionId}));
    }
    setLoading(false);
  }

  return (
    <div className='relative flex flex-col'>
      <div className='text-white lg:w-[1220px] mx-auto'>
        {
          !videoData ? (<div>No Data Found</div>) : (
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInLine
              onEnded={() => setVideoEnded(true)}
              src= {videoData?.videoUrl}
            >

            <AiFillPlayCircle  />

            {
              videoEnded && (
                <div>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <button
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      >
                      {
                        !loading ? "Mark As Completed" : "Loading"
                      }
                      </button>
                    )
                  }
                  <button
                  disabled={loading}
                  onClick={() => {
                    if(playerRef?.current) {
                      playerRef.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  >
                  Rewatch
                  </button>
                  <div>
                    {
                      !isFirstVideo() && (
                        <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        >
                        Prev
                        </button>
                      )
                    }
                    {
                      !isLastVideo() && (
                        <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        >
                        Next
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }
            </Player>
          )
        }
        <div className='mt-5'>
        <h1 className='text-2xl font-semibold'>
          {videoData?.title}
        </h1>
        <p className='text-sm font-medium text-richblack-50'>
          {
            videoData?.description
          }
        </p>
        </div>
      </div>
      {
        reviewModal && <CourseReviewModal setReviewModal={setReviewModal} /> 
      }
    </div>
  )
}

export default VideoDetails
