import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import Sidebar from '../Sidebar';


export default function Cart() {

    const {total, totalItems} = useSelector((state) => state.cart);

    return(
        <div className='text-white gap-5'>
        <h1 className='text-richblack-5 text-[30px] font-semibold p-[24px] -translate-x-4'>Your Cart</h1>
            <p className='text-md font-semibold text-richblack-400 -translate-x-4 p-7'>{totalItems} Courses in Cart</p>
            <div className='w-full h-[0.5px] bg-richblack-700 mb-5'></div>
            {
                total > 0 ? (<div className='flex flex-row gap-[350px]'><RenderCartCourses/><RenderTotalAmount/></div>) : (<p>Your Cart is Empty</p>)
            }
        </div>
    )
}
