import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import {apiConnector} from "../../services/apiconnector";
import {ratingsEndpoints} from "../../services/apis";
import { FaStar } from "react-icons/fa";


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)

            if(data?.success){
                setReviews(data?.data);
            }

            console.log("Printing Reviews", reviews);
        }
        fetchAllReviews();
    });

  return (
    <div className="text-white m-10">
      <div className="h-[190px] max-w-maxContent">
        <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay= {{
           delay: 2500, 
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full"
        >
        {
            reviews.map((review, index) => (
                <SwiperSlide key={index}>
                    <div className="bg-richblack-800 px-6 py-4 gap-3 rounded-lg lg:w-[20%]">
                    <div className="flex flex-row gap-4">
                    <img src={
                        review?.user?.image 
                        ? review?.user?.image 
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        } 
                        alt = "Profile Pic"
                        className="h-10 w-10 object-cover rounded-full"
                        loading="lazy"
                    />
                    <div className="flex flex-col">
                    <p className="">{review?.user?.firstName} {review?.user?.lastName}</p>
                    <p className="translate-y-1 text-richblack-600 text-sm">{review?.user?.email}</p>
                    </div>
                    </div>
                    <p className="text-sm text-richblack-400 font-light">{review?.course?.courseName}</p>
                    <p className="text-sm text-richblack-400 font-light">{review?.review}</p>
                    <p className="text-sm text-yellow-50 font-light">{review?.rating.toFixed(1)}</p>
                    <ReactStars
                        count={5}
                        value={review?.rating.toFixed(1)}
                        size={20}
                        edit={false}
                        color2 = "ffd700"
                        emptyIcon={<FaStar/>}
                        fullIcon={<FaStar/>}
                    />
                    </div>
                </SwiperSlide>
            ))
        }
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
