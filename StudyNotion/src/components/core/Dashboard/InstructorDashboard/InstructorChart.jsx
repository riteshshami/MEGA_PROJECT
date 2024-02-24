import React, { useState } from 'react';
import {Chart, registerables} from 'chart.js';
import {Pie} from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    // function to generate random color
    const getRandomColor = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColor(courses.length),

            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course)=>course.totalAmountGenerated),
                backgroundColor: getRandomColor(courses.length),
            }
        ]
    }

    // create options
    const options = {

    }

    return (
        <div className='px-6 py-4 rounded-lg bg-richblack-800 gap-10 w-[65%]'>
           <p className='text-lg font-semibold py-5'>Visualize</p>
           <div className="flex flex-row gap-3">
                <button
                onClick={() => setCurrChart("students")}
                className={`text-yellow-50 ${currChart === "students" ? "bg-richblack-600" : "bg-richblack-800"} px-4 py-2`}
                >
                    Student
                </button>
                <button
                onClick={() => setCurrChart("income")}
                className={`text-yellow-50 ${currChart === "income" ? "bg-richblack-600" : "bg-richblack-800"} px-4 py-2`}
                >
                    Income
                </button>
           </div> 
           <div>
                <Pie
                    data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                    options={options}
                />
           </div>
        </div>
    )
}

export default InstructorChart;