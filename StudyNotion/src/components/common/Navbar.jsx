import React, { useState, useEffect } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart} from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import {IoIosArrowDropdownCircle} from 'react-icons/io';

const Navbar = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async() => {
    try{
      const result = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API);
      setSubLinks(result?.data?.allCategories);
    }catch(error){
      console.log("Could not fetch the catalog list");
    }
  }

  useEffect( () => {fetchSubLinks()}, [])

  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
  }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] bg-richblack-800 border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
      {/* Image */}
        <Link to="/">
        <img alt='logo' src={logo} width={160} height={42} loading='lazy' className='md:shrink-0' />
        </Link>

        {/* nav links */}
        <nav className='lg:opacity-100 sm:opacity-0'>
          <ul className='flex gap-x-6 text-richblack-25 sm:max-md:hidden'>
            {NavbarLinks.map((link, index) => {
              return(
                <li key={index}>
                  {
                    link.title === "Catalog" ? (
                      <div className='flex gap-2 items-center group relative'>
                         <p>{link.title}</p>
                         <IoIosArrowDropdownCircle/>
                         <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 gap-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-50'>
                         <div className='absolute left-[50%] translate-y-[-45%] translate-x-[80%] top-0 h-6 w-6 rotate-45 rounded-sm bg-richblack-5'></div>
                         {
                          subLinks.length > 0 ? (
                            <div className='text-[14px]'>
                            {
                              subLinks.map((item, index) => {
                                return(
                                   <Link to={`/catalog/${item?.name.split(/[ \/]/).join("-").toLowerCase()}`} key={index}>
                                      <p>{item?.name}</p>
                                   </Link>
                                )
                              })
                            }
                            </div>
                          ) : (<div></div>)
                         }
                         </div>
                      </div>
                    ) : (<Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? 'text-yellow-25': 'text-richblack-25'}`}>{link.title}</p>
                        </Link>)
                  }
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className='flex gap-x-4 items-center'>
            {
              user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart/>
                    {
                      totalItems > 0 && (
                        <span className='absolute rounded-full bg-yellow-50 bottom-3 left-3 h-3 w-3 text-xs font-semibold text-center'>{totalItems}</span>
                      )
                    }
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/login">
                    <button className='border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Login</button>
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/signup">
                    <button className='border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Sign Up</button>
                </Link>
              )
            }
            {
              token !== null && <ProfileDropDown/>
            }
        </div>
      </div>
    </div>
  )
}

export default Navbar
