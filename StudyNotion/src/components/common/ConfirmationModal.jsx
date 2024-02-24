import React from 'react' 

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='z-10 fixed left-[40%] top-[35%] gap-5'>
      <div className='text-white bg-richblack-800 p-[32px] rounded-[8px] gap-5 mb-5'>
       <div className="gap-5">
       <p>
            {modalData.text1}
        </p>
        <p>
            {modalData.text2}
        </p>
       </div>
        <div className='flex flex-row gap-5 mt-3'>
            <button onClick={modalData?.btn1Handler} className='px-[24px] py-[12px] rounded-[8px] gap-[8px] bg-yellow-50 text-[16px] text-richblack-900'>{modalData?.btn1Text}</button>   
            <button onClick={modalData?.btn2Handler} className='px-[24px] py-[12px] rounded-[8px] gap-[8px] bg-richblack-800 text-[16px] text-richblack-5'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
