import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/operators/courseDetailsAPI';
import ReactStars from "react-rating-stars-component";
import { RxCross2 } from "react-icons/rx";

const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);

    const {
        register, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(()=> {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience
            },
            token
        );
        setReviewModal(false);
    }

  return (
    <div className='absolute top-10 right-80'>
        <div className='text-white rounded-lg lg:w-[665px] lg:h-[487px]'>
            {/* Modal Header */}
            <div className='py-4 px-6 gap-3 border-b-richblack-25 border-b-[1px] border-b-solid flex flex-row justify-between bg-richblack-700'>
                <p className='text-lg font-semibold'>Add Review</p>
                <button onClick={() => {setReviewModal(false)}}>
                    <RxCross2 className='translate-y-1'/>
                </button>
            </div>
            {/* Modal Body */}
            <div className='p-8 gap-6 flex flex-col bg-richblack-800'>

                <div className='gap-6 flex flex-row mx-auto'>
                    <img
                        src={user?.image}
                        alt={user?.firstName}
                        className='aspect-square w-[50px] rounded-full object-cover'
                        loading='lazy'
                    />
                    <div className='flex flex-col gap-[2px]'>
                        <p className='text-md font-semibold'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-sm'>Posting Publicly</p>
                    </div>
                </div>

                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center gap-6'
                >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <div>
                        <label htmlFor='courseExperience' className='text-[14px] text-richblack-5 text-left'>
                            Add Your Experience <sup className='text-pink-50'>*</sup>
                        </label>
                        <textarea
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='min-h-[130px] w-full text-[#999DAA] text-[16px] bg-richblack-600 p-[12px] rounded-md shadow-vs'
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>

                    <div className='translate-y-5 translate-x-20'>
                        {/* Cancel and Save Button */}
                        <div className='flex flex-row gap-3 text-right'>
                        <button
                        onClick={() => setReviewModal(false)}
                        className='flex items-center px-6 py-3 bg-richblack-700 rounded-lg gap-2 text-white shadow-vs border border-richblack-800 mx-auto'
                        >
                        Cancel
                        </button>
                        <button
                        className='flex items-center px-6 py-3 bg-yellow-50 rounded-lg gap-2 text-black shadow-vs border border-yellow-100 mx-auto'
                        >
                            Save
                        </button>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal
