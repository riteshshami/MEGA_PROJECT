import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operators/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operators/profileAPI";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      // pending
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      console.log(instructorApiData);

      if (instructorApiData.length) setInstructorData(instructorApiData);

      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
      <div className="text-white">
        <div className="px-6 py-3">
          <h1 className="text-richblack-5 text-[30px] font-semibold">
            Hi {user?.firstName} 👋
          </h1>
          <p className="text-richblack-200 text-sm">
            Let's start something new
          </p>
        </div>

        {loading ? (
          <div>Spinner</div>
        ) : courses.length > 0 ? (
          <div>
            <div>
              <div className="flex flex-row gap-5">
                <InstructorChart courses={instructorData} />
                <div className="px-6 py-4 rounded-lg bg-richblack-800 gap-10 w-[45%]">
                  <p className="text-lg font-semibold py-5">Statistics</p>
                  <div className="gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-richblack-400">
                        Total Courses
                      </p>
                      <p className="text-3xl font-semibold text-richblack-400">
                        {courses.length}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-richblack-400">
                        Total Students
                      </p>
                      <p className="text-3xl font-semibold text-richblack-400">
                        {totalStudents}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-richblack-400">
                        Total Income
                      </p>
                      <p className="text-3xl font-semibold text-richblack-400">
                        {totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Render 3 Courses */}
            <div className="flex flex-col bg-richblack-800 rounded-lg mt-4 mb-2 px-6 py-4">
              <div className="flex flex-row justify-between p-y-3">
                <p>Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-yellow-50">View All</p>
                </Link>
              </div>
              <div className="flex flex-row justify-between gap-5">
                {courses.slice(0, 3).map((course) => (
                  <div className="flex flex-col gap-1">
                    <img
                      src={course.thumbnail}
                      className="lg:w-[320px] lg:h-[200px] rounded-lg"
                      loading="lazy"
                    />
                    <div>
                      <p>{course.courseName}</p>
                      <div className="flex gap-2 text-richblack-500">
                        <p>{course.studentsEnrolled.length}</p>
                        <div className="w-[1px] h-full border-l-richblack-500 border-solid bg-richblack-500"></div>
                        <p>Rs {course.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>You have not created any courses yet</p>
            <Link to={"/dashboard/addCourse"}>Create a Course</Link>
          </div>
        )}
      </div>
  );
};

export default Instructor;
