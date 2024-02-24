import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Thead, Tr, Th, Td } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operators/courseDetailsAPI';
import { HiMiniPencil } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { HiMiniClock } from "react-icons/hi2";
import { formatDate } from '../../../../services/formatDate';

export default function CoursesTable({courses, setCourses}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async(courseId) => {
      setLoading(true);

      await deleteCourse({courseId:courseId}, token);
      const result = await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
    }

  return (
    <div className='text-richblack-400'>
      <Table className="border-[1px]">
        <Thead className="border-b-[1px]">
          <Tr className="flex flex-row justify-between p-8">
             <Th className="lg:w-[767px] p-[16px] text-left">
              COURSES
             </Th> 
             <Th className="lg:w-[102px] p-[16px] text-center">
              DURATION
             </Th> 
             <Th className="lg:w-[102px] p-[16px] text-center">
              PRICE
             </Th>
             <Th className="lg:w-[102px] p-[16px] text-center">
              ACTIONS
             </Th> 
          </Tr>
        </Thead>
        <Tbody>
          {
            courses.length === 0 ? (
              <Tr>
                <Td className="text-white">
                  No Courses Found
                </Td>
              </Tr>
            ):(
              courses.map((course) => {
                return(
                 <Tr 
                key={course._id} 
                className="flex flex-row justify-between border-richblack-800 p-8"
                >
                  <Td className=" flex gap-6 lg:w-[767px] p-4 text-left">
                    <img src={course?.thumbnail} alt='Thumbnail'
                    className='h-[150px] w-[220px] rounded-lg object-cover'
                    loading='lazy'
                     />
                     <div className='flex flex-col gap-3 text-richblack-400 lg:max-w-[490px]'>
                      <p className='text-richblack-5 text-lg font-semibold'>{course?.courseName}</p>
                      <p className='text-sm font-normal'>
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                      </p>
                      <p className='text-sm font-normal'>Created: { formatDate(course.createdAt)}</p>
                      <p className='font-medium text-sm bg-richblack-700 rounded-[200px] px-1 py-2 w-[95px]'>
                      {
                        course.status === COURSE_STATUS.DRAFT ? (
                              <div className='text-pink-100 flex gap-[6px] mx-auto my-auto'>
                              <HiMiniClock className='my-auto'/>
                              <span>Drafted</span>
                              </div>
                        ):(
                              <div className='text-yellow-100 flex gap-[6px] mx-auto my-auto'>
                              <FaCheckCircle className='my-auto'/>
                              <span>Published</span>
                              </div>
                        )
                      }
                      </p>
                     </div>
                  </Td>
                  <Td className="p-4 gap-[10px] max-w-[20%] my-auto">
                    2hr 30min
                  </Td>
                  <Td className="p-4 gap-[10px] max-w-[20%] my-auto">
                   ₹{course?.price}
                  </Td>
                  <Td className="p-4 gap-[10px] max-w-[20%] my-auto">
                    <button
                    disabled={loading}
                    onClick={() => {navigate(`/dashboard/edit-course/${course._id}`)}}
                    >
                      <HiMiniPencil/>
                    </button>
                    <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1:"Do you want to delete this course?",
                        text2:"All the data related to course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text:"Cancel",
                        btn1Handler: !loading ? ()=>handleCourseDelete(course._id) : ()=>{},
                        btn2Handler: !loading ? ()=>setConfirmationModal(null):()=>{}
                      })
                    }}
                    >
                    <FiTrash2/>
                    </button>
                  </Td>
                </Tr>
                )
              })
            )
          }
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

