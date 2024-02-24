import React from 'react'
import Footer from "../components/common/Footer";
import ContactUs from "../components/common/ContactUs";
import { HiChatBubbleLeftRight, HiGlobeEuropeAfrica, HiPhone } from "react-icons/hi2";


const ContactPage = () => {
  return (
    <div>
      {/* Hero Section + FORM */}
      <div className='flex lg:flex-row lg:gap-[52px] mt-6 mb-[120px] sm:flex-col md:flex-col'>
        <div className='flex flex-col gap-[24px] bg-[#161D29] lg:w-[450px] lg:h-[390px] items-center p-[24px] rounded-[12px] lg:mt-14 lg:translate-x-24'>
            <div className='flex flex-col text-left p-[12px] gap-[9px] lg:w-[402px] lg:h-[98px]'>
              <div className='flex flex-row gap-1'>
               <HiChatBubbleLeftRight className='text-richblack-100 translate-y-1'/>
               <h1 className='text-[18px] text-richblack-5'>Chat on us</h1>
              </div>
              <p className='text-[14px] text-richblack-200'>Our friendly team is here to help.</p>
              <p className='text-[14px] text-richblack-200'>@mail address</p>
            </div>
            <div className='flex flex-col text-left p-[12px] gap-[9px] lg:w-[402px] lg:h-[98px]'>
              <div className='flex flex-row gap-1'>
               <HiGlobeEuropeAfrica className='text-richblack-100 translate-y-1'/>
               <h1 className='text-[18px] text-richblack-5'>Visit us</h1>
              </div>
              <p className='text-[14px] text-richblack-200'>Come and say hello at our office HQ.</p>
              <p className='text-[14px] text-richblack-200'>Here is the location/address</p>
            </div>
            <div className='flex flex-col text-left p-[12px] gap-[9px] lg:w-[402px] lg:h-[98px]'>
              <div className='flex flex-row gap-1'>
               <HiPhone className='text-richblack-100 translate-y-1'/>
               <h1 className='text-[18px] text-richblack-5'>Call us</h1>
              </div>
              <p className='text-[14px] text-richblack-200'>Mon - Fri From 8am to 5pm</p>
              <p className='text-[14px] text-richblack-200'>+123 456 780</p>
            </div>
        </div>
        <div className='mx-auto text-center mt-14 w-[698px] p-[52px] gap-[32px] rounded-[12px] border-white border-[1px]'>
            <div className='mb-7 text-left translate-x-7'>
            <h1 className='text-richblack-5 text-[36px]'>
            Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className='text-richblack-300 text-[16px] '>
            Tell us more about yourself and what you’re got in mind.
            </p>
            </div>
            <div>
              <ContactUs/>
            </div>
            </div>
      </div>


      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default ContactPage
