import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operators/profileAPI";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      console.log("Response", enrolledCourses);
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <div className="text-white">
        <div className="text-richblack-5 text-3xl font-semibold p-[24px] -translate-x-4">
          Enrolled Courses
        </div>
        <div className="lg:w-[1162px]">
          {!enrolledCourses ? (
            <div>Loading...</div>
          ) : !enrolledCourses.length ? (
            <p>You are not enrolled in any course yet</p>
          ) : (
            <div className="border-[1px] border-solid border-richblack-700 rounded-lg gap-1">
              <div className="bg-richblack-700 flex flex-row justify-between p-4 rounded-t-lg">
                <p>Course Name</p>
                {/* <p>Durations</p> */}
                <p>Progress</p>
              </div>
              {/* Cards for course progress starts from here */}
              {enrolledCourses.map((course, index, arr) => (
                <div
                  key={index}
                  className={`flex flex-row gap-5 p-4 text-richblack-5 justify-between ${
                    index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                  }`}
                >
                  <div
                    className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                    onClick={() => {
                      navigate(
                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                      );
                    }}
                  >
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[52px] w-[52px] rounded-lg"
                      loading="lazy"
                    />
                    <div className="flex flex-col gap-[2px]">
                      <p className="text-md font-medium">
                        {course?.courseName}
                      </p>
                      <p className="text-richblack-300">
                        {course?.courseDescription}
                      </p>
                    </div>
                  </div>
                  {/* <div>
                                  {course?.totalDuration}
                              </div> */}
                  <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLableVisible={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
