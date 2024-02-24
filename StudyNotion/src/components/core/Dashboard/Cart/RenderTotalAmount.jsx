import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operators/studentFeaturesAPI';


const RenderTotalAmount = () => {
  // "cart" is need to be add in the dictionary
    const {total, cart} = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handlerBuyCourses = () => {
      const courses = cart.map((course) => course._id);
      buyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div className='bg-richblack-700 border-[1px] border-solid border-richblack-700 rounded-lg p-6 gap-4'>
      <p className='text-richblack-200 text-sm font-semibold '>Total</p>
      <p className='text-yellow-50 text-2xl font-semibold'>Rs {total}</p>

      <button onClick={handlerBuyCourses} className='rounded-lg px-6 py-3 gap-2 shadow-vs text-richblack-900 text-center bg-yellow-50 lg:max-w-[210px]'>
        Buy Now
      </button>
    </div>
  )
}

export default RenderTotalAmount
