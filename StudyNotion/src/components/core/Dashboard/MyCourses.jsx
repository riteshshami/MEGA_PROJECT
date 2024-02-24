import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import CoursesTable from './InstructorCourses/CoursesTable';
import { fetchInstructorCourses } from '../../../services/operators/courseDetailsAPI';
import {IoMdAddCircleOutline} from "react-icons/io"

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }   
        }
        fetchCourses();
    }, []);

  return (
      <div className="flex flex-col gap-4">
        <h1 className='text-richblack-5 text-3xl font-semibold p-[24px] -translate-x-4'>My Courses</h1>
        <div>
        <button 
        onClick={() => navigate("/dashboard/add-course")}
        className='flex flex-row gap-2 px-6 py-3 rounded-lg bg-yellow-50 text-richblack-900 shadow-vs cursor-pointer text-center font-medium'
        >
          Add Course
          <IoMdAddCircleOutline className='h-[18px] w-[18px] mt-[2px]'/>
        </button>
        </div>
        {
        courses.length > 0 && <CoursesTable courses={courses} setCourses={setCourses} />
        }
      </div>
  )
}

export default MyCourses
