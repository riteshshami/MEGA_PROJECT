import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import GetAvgRating from '../../../utils/avgRating'

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
        console.log("count", avgReviewCount);
    }, [course, avgReviewCount])


  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div className='gap-5'>
          <div>
            <img
              src={course?.thumbnail}
              alt='Course ka thumbnail'
              className={`${Height} w-full rounded-lg object-cover`} 
              loading='lazy'
            />
          </div>
          <div className='gap-[9px]'>
            <p className='text-richblack-5'>{course?.courseName}</p>
            <p className='text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex gap-x-3'>
              <span className='text-yellow-50'>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className='text-richblack-400'>{course?.ratingAndReviews?.length} (Ratings Count)</span>
            </div>
            <p className='text-richblack-5 text-xl'>Rs. {course?.price}</p>
          </div>
        </div>
      </Link> 
    </div>
  )
}

export default Course_Card

