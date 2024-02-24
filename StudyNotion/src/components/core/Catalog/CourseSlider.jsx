import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, Pagination, Navigation} from 'swiper/modules'

import Course_Card from "./Course_card";


const CourseSlider = ({Courses}) => {
  return (
    <div>
      {
        Courses?.length ? (
          <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={200}
          pagination={true}
          navigation={true}
          modules={[Pagination, Autoplay, Navigation]}
          className='mySwiper'
          autoplay={{
            delay:2000,
            disableOnInteraction: false
          }}
          breakpoints={{1024:{slidesPerView:3,}}}
          >
              {
                Courses.map((course, index) => {
                  <SwiperSlide key={index}>
                     <Course_Card course={course} Height={"h-[250px]"} />
                  </SwiperSlide>
                }) 
              }
          </Swiper>
        ): (
          <p className=''>No Course Found</p>
        )
      }
    </div>
  )
}

export default CourseSlider;
