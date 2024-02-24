import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import ProgressBar from '@ramonak/react-progress-bar';

const RenderCartCourses = () => {

    const {cart, removeFromCart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
      {
        cart.map((course, index) => (
            <div>
                <div>
                    <img src={course?.thumbnail}  />
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            {/* getaverage rating api */}
                            <span>4.8</span>
                            <ReactStars
                            count={5}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<GiNinjaStar />}
                            fullIcon={<GiNinjaStar />}
                            />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button>
                        <RiDeleteBin6Line 
                            onClick={() => {
                                dispatch(removeFromCart(course._id))
                            }}
                        />
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p>Rs {course?.price}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
