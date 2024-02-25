import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operators/courseDetailsAPI';
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import IconBtn from "../../../../common/IconBtn";

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);


  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }
    // update value
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    // loading false
    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
  
    if (editSectionName === sectionId) {
      console.log("Cancelling edit...");
      cancelEdit();
      return;
    }
  
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };
  


  return (
    <div className='text-white'>
      <p className='font-semibold text-lg mb-5'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-richblack-800 rounded-lg p-6 gap-6'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='sectionName' className='text-sm text-richblack-5'>Section name<sup className='text-pink-200'>*</sup></label>
          <input
            id='sectionName'
            disabled={loading}
            placeholder='Add Section Name'
            {...register("sectionName", {required:true})}
            className='w-full text-white rounded-lg p-3 gap-3 bg-richblack-700 shadow-vs'
          />
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
        </div>
        <div className='mt-10 flex w-full font-semibold'>
        <IconBtn
        type="submit"
        onClick={(e) => e.stopPropagation()}
        disabled={loading}
        text={editSectionName ? "Edit Section Name" : "Create Section"}
        outline={true}
        >
          <IoAddCircleOutline size={20} className="text-yellow-50" />
        </IconBtn>
        {
          editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline ml-1'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }

      <div className='text-sm flex justify-end gap-2 mt-5'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center bg-richblack-800 shadow-vs px-6 py-3 text-richblack-5'>
        <MdKeyboardArrowLeft/>
        Back
        </button>
        <button onClick={goToNext} className='rounded-md cursor-pointer flex items-center bg-yellow-50 px-6 py-3 text-richblack-900'>
        Next
        <MdKeyboardArrowRight/>
        </button>
      </div>

    </div>
  )
}

export default CourseBuilderForm
