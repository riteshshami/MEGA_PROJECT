import RenderSteps from "./RenderSteps";
import Sidebar from "../Sidebar";
import { AiFillThunderbolt } from "react-icons/ai";


export default function AddCourse() {
    return (
            <div className="flex w-full items-start gap-x-6">
                <div className="flex flex-col flex-1">
                    <h1 className='text-richblack-5 text-[30px] font-semibold p-[24px] -translate-x-4'>
                    Add Course
                    </h1>
                    <div className="flex-1">
                        <RenderSteps/>
                    </div>
                </div>
                <div className="sticky mt-10 mr-20 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block text-richblack-5">
                    <p className="text-lg mb-8 font-semibold">⚡ Code Upload Tips</p>
                    <ul className="text-xs ml-5 list-item list-disc space-y-4 mt-2">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a  course.</li>
                        <li>Add Topics in the Course Builder section to create  lessons, 
                            quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows  up on the 
                            course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
    )
}