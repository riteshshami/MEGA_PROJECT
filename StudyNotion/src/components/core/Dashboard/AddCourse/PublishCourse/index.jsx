import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form"; 
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operators/courseDetailsAPI";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
    }, []);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async() => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)
        || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);

        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }

        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

    return (
        <div>
            <div className="rounded-md border-[1px] bg-richblack-700 p-6 gap-7 border-richblack-600 text-richblack-5">
            <h1 className="text-2xl font-semibold">Publish Course</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <div>
                    <label htmlFor="public">
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="rounded h-4 w-4 bg-transparent border-[1px] border-richblack-400 translate-y-0.5"
                    />
                    <span className="ml-3 font-medium text-base text-richblack-400">Make this Course as Public</span>
                    </label>
                </div>
                <div className="flex justify-end gap-x-3 mt-5">
                  <button
                  disabled={loading}
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 rounded-md bg-richblack-600 px-6 py-4 text-richblack-5 font-medium"
                  >
                   <MdOutlineKeyboardArrowLeft/>
                    Back
                  </button>  
                  <IconBtn disabled={loading} type="submit" text="Save Changes" />
            </div>
            </form>
            </div>
            
        </div>
    )
}

export default PublishCourse