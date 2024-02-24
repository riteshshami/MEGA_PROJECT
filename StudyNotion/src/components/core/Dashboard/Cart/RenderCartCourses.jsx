import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import {removeFromCart} from "../../../../slices/cartSlice";

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
      {
        cart.map((course, index) => (
            <div key={index}>
            <div className='flex flex-row'>
                <div className='flex flex-row gap-5 px-6'>
                    <img src={course?.thumbnail} className='lg:max-h-[148px] lg:max-w-[185px] rounded-lg' loading='lazy' />
                    <div className='flex flex-col gap-[9px]'>
                        <p className='text-lg text-richblack-5 font-medium'>{course?.courseName}</p>
                        <p className='text-md text-richblack-300'>{course?.category?.name}</p>
                        <div className='flex gap-1'>
                            {/* getaverage rating api */}
                            <span className='translate-y-1 text-yellow-50 '>4.8</span>
                            <ReactStars
                            count={5}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<GiNinjaStar />}
                            fullIcon={<GiNinjaStar />}
                            />
                            <span className='translate-y-1 text-richblack-400'>({course?.ratingAndReviews?.length})</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <button 
                    className='flex flex-row rounded-lg bg-richblack-700 text-pink-200 gap-2 p-3 border-[1px] border-solid border-richblack-700' 
                    onClick={() => dispatch(removeFromCart(course._id))}>
                        <RiDeleteBin6Line className='translate-y-1'/>
                        <span>Remove</span>
                    </button>
                    <p className='text-yellow-50 text-2xl font-semibold'>Rs {course?.price}</p>
                </div>
            
            </div>
            <div className='w-full h-[0.5px] bg-richblack-700 my-5'></div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
