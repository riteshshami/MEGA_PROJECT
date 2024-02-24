import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard';
import {toast} from 'react-hot-toast';
import {ACCOUNT_TYPE} from "../../../utils/constants";
import { addToCart } from '../../../slices/cartSlice';


function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}) {


    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, you can't buy a course")
            return;
        }
        if(token){
            dispatch(addToCart(course))
            return;
        }
        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to add to cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }

    return(
        <div className='bg-richblack-700 flex flex-col rounded-lg'>
            <img src={ThumbnailImage} alt="Thumbnail Image" className='max-h-[201px] min-h-[180px] w-[384px] rounded-t-lg' loading='lazy' />
            <div className='gap-4 p-6'>
            <div className='text-richblack-5 text-3xl font-bold mb-4'>
                Rs. {CurrentPrice}
            </div>
            <div className='flex flex-col gap-y-3'>
                <button 
                className='bg-richblack-900 text-richblack-5 rounded-lg gap-2 px-6 py-3 shadow-vs'
                onClick={user && course?.studentsEnrolled.includes(user?._id) 
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
                }
                >
                {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                }
                </button>
                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart} className='bg-yellow-50 text-richblack-900 px-6 py-3 gap-2 rounded-lg'>
                            Add to Cart
                        </button>
                    )
                }
                <p className='text-richblack-25 text-sm text-center'>
                    30-Day Money-Back Gurantee
                </p>
            </div>
            <div className='gap-2 mt-3'>
                <p className='text-richblack-5 text-md'>
                    This Course Includes: 
                </p>
                <div className="flex flex-col gap-y-3">
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex-gap-2 text-caribbeangreen-100'>
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div>
                <button 
                className="mx-auto flex items-center gap-2 px-6 py-3 text-yellow-50"
                onClick={handleShare}>
                    Share
                </button>
            </div>
            </div>
        </div>
    );
}

export default CourseDetailsCard;