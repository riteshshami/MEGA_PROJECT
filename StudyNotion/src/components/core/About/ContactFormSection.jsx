import React from 'react'
import ContactUs from '../../common/ContactUs'

const ContactFormSection = () => {
  return (
    <div className='mx-auto text-center mt-14'>
      <div className='mb-7'>
      <h1 className='text-richblack-5 text-[36px]'>
        Get in Touch
      </h1>
      <p className='text-richblack-300 text-[16px]'>
      We’d love to here for you, Please fill out this form.
      </p>
      </div>
      <div>
        <ContactUs/>
      </div>
    </div>
  )
}

export default ContactFormSection
