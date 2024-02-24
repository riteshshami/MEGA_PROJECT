import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operators/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operators/courseDetailsAPI';
import GetAvgRating from "../utils/avgRating"
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import {formatDate} from "../services/formatDate";
import { IoInformationCircleOutline } from "react-icons/io5";
import { PiGlobeBold } from "react-icons/pi";
import Footer from '../components/common/Footer';
import {IoIosArrowUp} from "react-icons/io";
import { HiTv } from "react-icons/hi2";

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() =>{
        ;(async() => {
            try{
                const res = await fetchCourseDetails(courseId);
                setResponse(res);
            }catch(error){
                console.log("Could not fetch course details");
            }
        })()
    }, [courseId]);

    useEffect(() => {
        console.log("CourseDetails.jsx line:45 pages folder", response);
    })


    function GetAvgRating(ratingArr){
        console.log(ratingArr);
        if(ratingArr.length === 0) return 0
        const totalReviewCount = ratingArr?.reduce((acc, curr) => {
            acc += curr.rating
            return acc
        }, 0)
    
        const multiplier = Math.pow(10, 1)
        const avgReviewCount = Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
    
        return avgReviewCount;
    }


    const [isActive, setIsActive] = useState([]);
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e)=>e !== id)
        )
    }

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    })

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"You are not Logged In",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler: () => {navigate("/login")},
            btn2Handler: () => {setConfirmationModal(null)}
        })
    }

    const handleClick = (id) => {
        handleActive(id);
        setIsClicked(!isClicked);
    }
    
    const handleCollapseAll = () => {
        isActive.map((element) => {
            setIsClicked(!isClicked)
        })
        setIsActive([])
    }

    if (paymentLoading) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

    if(loading || !response) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!response.success){
        return(
            <div>
                <Error/>
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
        category,
    } = response.data?.courseDetails;

    return (
        <div className='text-white'>
            <div className="relative flex flex-col justify-start bg-richblack-800 gap-3 py-8 px-32">
                <p className='text-richblack-400 text-sm '>{'Home / Catalog / '}<span className='text-yellow-50'>{category?.name}</span></p>
                <p className='text-richblack-5 text-3xl font-medium'>{courseName}</p>
                <p className='text-richblack-200 text-sm'>{courseDescription}</p>
                <div className='flex gap-2'>
                    <span>{GetAvgRating(ratingAndReviews)}</span>
                    <RatingStars Review_Count={GetAvgRating(ratingAndReviews)} Star_Size={24}/>
                    <span className='text-base text-richblack-25' >{`(${ratingAndReviews.length} reviews)`}</span>
                    <span className='text-base text-richblack-25' >{`${studentsEnrolled.length} students enrolled`}</span>
                </div>
                <div>
                    <p className='text-base text-richblack-25' >Created By {`${instructor.firstName}`}</p>
                </div>
                <div className='flex gap-x-3'>
                    <div className='flex flex-row gap-x-2'>
                    <IoInformationCircleOutline className='translate-y-1' />
                    <p>Created At {formatDate(createdAt)}</p>
                    </div>
                    <div className='flex flex-row gap-x-2'>
                    <PiGlobeBold className='translate-y-1' />
                    <p>{" "}English</p>
                    </div>
                </div>

                <div className='absolute right-[100px]'>
                    <CourseDetailsCard 
                    course={response?.data?.courseDetails}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                     />
                </div>
            </div>

            <div className='rounded-[1px] gap-6 p-8 mx-32 mt-5 mb-10 border-solid border-richblack-700 border-[1px] lg:max-w-[792px]'>
                <p className='text-richblack-5 text-3xl font-medium'>What you'll learn</p>
                <div className='text-richblack-50'>{whatYouWillLearn}</div>
            </div>

            <div className='mx-32 lg:max-w-[792px]'>
                <div>
                   <div className='gap-2'>
                     <p className='text-2xl font-semibold'>Course Content</p>
                     <div className='flex gap-x-3 justify-between text-richblack-400 text-sm'>
                        <div>
                        <span>
                            {courseContent.length} sections
                        </span>
                        <span>{" • "}</span>
                        <span>
                            {totalNoOfLectures} lectures
                        </span>
                        <span>{" • "}</span>
                        <span>
                            {response?.data?.totalDuration} total length
                        </span>
                        </div>
                        <button
                        onClick={handleCollapseAll}
                        className='text-yellow-50 font-medium'
                        >
                            Collapse all Sections
                        </button>
                     </div>
                   </div>
                   
                   <div>
                    {
                        courseContent.map((section, index) => (
                            <div key={index}>
                                <div className='flex flex-row bg-richblack-600 text-richblack-5 px-8 py-4 border-b-[1px] border-solid border-richblack-600 gap-3 justify-between'>
                                    <div className="flex flex-row gap-3">
                                    <IoIosArrowUp className={`translate-y-1 ${isClicked ? 'rotate-180' : 'rotate-0' }`} onClick={() => handleClick(section?._id)} />
                                        {
                                        section?.sectionName
                                        }
                                    </div>
                                    <div className='text-yellow-50'>
                                        {section?.subSection?.length} lectures
                                    </div>
                                </div>
                                <div>
                                    {
                                        section?.subSection.map((subSection, i) => (
                                            <div className = {`gap-3 px-8 py-4 border-[1px] border-solid border-richblack-600 ${isClicked ? 'h-auto' : 'hidden'} `} key={i}>
                                                <p className='flex flex-row gap-2 '>
                                                    <HiTv className='h-[18px] w-[18px] translate-y-1'/>
                                                    {subSection?.title}
                                                </p>
                                                <p className='text-richblack-50 text-sm ml-7'>{subSection?.description}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                   </div>
                </div>
            </div>

            <div className='mx-32 my-5 gap-4 flex flex-col'>
                <p className='text-richblack-5 text-2xl font-semibold'>Author</p>
                <div className='flex flex-row gap-3'>
                    <img src={instructor?.image ? instructor?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`} alt={instructor?.firstName} className='h-[52px] w-[52px] rounded-full object-cover' loading="lazy" />
                    <p className='text-richblack-5 font-medium text-base translate-y-3'>{instructor?.firstName} {instructor?.lastName}</p>
                </div>
                <div className='text-sm text-richblack-50'>
                    {instructor?.additionalDetails?.about}
                </div>
            </div>
            
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
            
            <Footer/>
        </div>
    )
}

export default CourseDetails