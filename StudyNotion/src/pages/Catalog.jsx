import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../components/common/Footer";
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import Course_Card from '../components/core/Catalog/Course_card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import getCatalogPageData from '../services/operators/pageAndComponentData';


const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    // fetch all categories
    useEffect(() => {
        const getCategory = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            const category_id = res?.data?.allCategories.filter((ct) => ct.name.split(/[ \/]/).join("-").toLowerCase() === catalogName)[0]._id; 
            setCategoryId(category_id);
        }
        getCategory();
    }, [catalogName]);

    useEffect(() => {
      const getCategoryDetails = async() => {
        try{
            const res = await getCatalogPageData(categoryId);
            setCatalogPageData(res);
            console.log("Page data", catalogPageData)
            console.log("id", categoryId);
        }catch(error){
            console.log(error)
        }
      } 
      if(categoryId){
        getCategoryDetails();
      }
    }, [categoryId]);

  return (
    <div>
        <div className='gap-6 py-8 px-32 bg-richblack-800'>
            <p className='text-richblack-400 text-sm '>{'Home / Catalog / '}<span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
            <p className='text-richblack-5 text-3xl font-medium'>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p className='text-richblack-200 text-sm'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

       <div className='gap-11 mx-32 my-10'>
       {/* section1 */}
        <div>
            <div className='text-richblack-5 text-3xl font-semibold'>Courses to get you started</div>
            <div className='flex gap-x-3 text-richblack-600 px-3 py-2'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            <div>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course} />
            </div>
        </div>

        {/* section2 */}
        <div>
            <p className='text-richblack-5 text-3xl font-semibold'>Top Courses in <span>{catalogPageData?.data?.selectedCategory?.name}</span></p>
            <div>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course} />
            </div>
        </div>

        {/* section3 */}
        <div>
            <p className='text-richblack-5 text-3xl font-semibold'>Frequently Bought</p>
            <div className='py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                    catalogPageData?.data?.mostSellingCourses?.slice(0, 4)
                    .map((course, index) => {
                        return(
                            <Course_Card course={course} key={index} Height={"h-[400px]"} />
                        )
                    })
                }
                </div>
            </div>
        </div>
       </div>
      <Footer/>
    </div>
  )
}

export default Catalog
