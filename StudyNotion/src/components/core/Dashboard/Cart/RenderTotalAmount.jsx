import React from 'react'
import { useSelector } from 'react-redux'


// const handlerBuyCourses = () => {
//     const courses = cart.map((course) => course._id);
//     console.log("Bought these courses", courses);
// ;}

const RenderTotalAmount = () => {
  // "cart" is need to be add in the dictionary
    const {total} = useSelector((state) => state.cart);
  return (
    <div>
      <p>Total</p>
      <p>Rs {total}</p>

      {/* <button onClick={handlerBuyCourses}>
        Buy Now
      </button> */}
    </div>
  )
}

export default RenderTotalAmount
