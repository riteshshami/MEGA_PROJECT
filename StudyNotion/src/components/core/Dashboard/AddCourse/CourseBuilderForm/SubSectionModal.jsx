import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operators/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../Upload';
import {toast} from 'react-hot-toast';

const SubSectionModal = ({
    modalData, 
    setModalData,
    add = false,
    view = false,
    edit = false
}) => {

    console.log("ModalData", modalData);

    const  {register, 
            handleSubmit, 
            setValue, 
            formState:{errors},
            getValues,
        } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    });

    const onSubmit = async (data) => {
    
        if(view)
            return;
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the form")
            }else{
                handleEditSubSection();
            }
            return;
        }

        // ADD


        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        // API CALL
        const result = await createSubSection(formData, token);

        if(result){
            const updatedCourseContent = course.courseContent.map((section) => 
            section._id === modalData ? result : section
            );
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
           currentValues.lectureDesc !== modalData.description ||
           currentValues.lectureVideo !== modalData.videoUrl
        ){
            return true;
        }else{
            return false;
        }
    }

    const handleEditSubSection = async (data) => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description", currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);

        const result = await updateSubSection(formData, token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => 
            section._id === modalData.sectionId ? result : section
            );
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }
    

  return (
      <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='bg-richblack-800 rounded-lg gap-6 w-11/12 max-w-[700px]'>
            <div className="flex flex-row bg-richblack-600 rounded-lg gap-3 py-4 px-6 rounded-b-none justify-between">
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={() => (!loading ? setModalData(null) : {})}>
                    <RxCross1/>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='bg-richblack-800 rounded-lg p-6 gap-6'>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl:null}
                    editData={edit ? modalData.videoUrl:null}
                />
                <div className='flex flex-col space-y-2 mt-5'>
                    <label htmlFor='lectureTitle' className='text-sm text-richblack-5'>Lecture Title<sup className='text-pink-200'>*</sup></label>
                    <input
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required:true})}
                        className='w-full text-white rounded-lg p-3 gap-3 bg-richblack-700 shadow-vs'
                    />
                    {
                        errors.lectureTitle && (<span>Lecture Title is required</span>)
                    }
                </div>
                <div className='flex flex-col space-y-2 mt-5'>
                    <label htmlFor='lectureDesc' className='text-sm text-richblack-5'>Lecture Description<sup className='text-pink-200'>*</sup></label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})}
                        className="text-white bg-richblack-700 rounded-lg p-3 gap-3 shadow-vs min-h-[130px] w-full"
                    />
                    {
                        errors.lectureDesc && (<span>Lecture Description is required</span>)
                    }
                </div>
                {
                    !view && (
                        <div>
                            <button className='bg-yellow-50 text-richblack-900 rounded-lg px-4 py-2 gap-2 mt-5'>
                                {loading ? ("Loading...") : edit ? "Save Changes" : "Save" }
                            </button>
                        </div>
                    )
                }
            </form>
        </div>

    </div>
  )
}

export default SubSectionModal
