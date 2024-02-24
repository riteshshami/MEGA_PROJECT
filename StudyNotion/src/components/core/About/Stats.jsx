import React from 'react'


const stats = [
    {
        count: "5K",
        label: "Active Students"
    },
    {
        count: "10+",
        label: "Mentors"
    },
    {
        count: "200+",
        label: "Courses"
    },
    {
        count: "50+",
        label: "Awards"
    },
]

const Stats = () => {
  return (
    <section>
      <div className='bg-richblack-700 lg:w-[100vw] lg:h-[254px] m-0'>
        <div className='flex flex-row text-center justify-between translate-y-20 '>
            {stats.map((stats, i) => (
            <div key={i} className='w-[250px] h-[74px] mx-20'>
                <h1 className='text-[30px] text-richblack-5'>{stats.count}</h1>
                <div className='text-[16px] text-richblack-500'>{stats.label}</div>
            </div>
        ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
