import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';


const PrivateRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);

    if(token !== null)
        return children
    else
        return <NavLink to="/login" />

  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute
