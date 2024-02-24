import React, { useEffect, useState } from 'react'

const RequirementsField = ({name, label, register, errors, setValue}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className='flex flex-col gap-[6px]'>
      <label htmlFor={name} className='font-inter font-normal text-sm text-richblack-5'>{label}<sup className='text-pink-200 text-xs font-normal'>*</sup></label>
      <div>
        <input
            type='text'
            id={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='w-full text-white rounded-lg p-3 gap-3 bg-richblack-700 shadow-vs'
        />
        <button
        type='button'
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50 mt-3'
        >
            Add
        </button>
      </div>
      {
        requirementList.length > 0 && (
            <ul>
                {
                    requirementList.map((requirement, index) => (
                        <li key={index} className='flex items-center text-richblack-5'>
                            <span>{requirement}</span>
                            <button
                            type='button'
                            onClick={() => handleRemoveRequirement(index)}
                            className='text-xs text-pure-greys-300'
                            >
                                Clear
                            </button>
                        </li>
                    ))
                }
            </ul>
        )
      }
      {
        errors[name] && (
            <span>
                {label} is required
            </span>
        )
      }
    </div>
  )
}

export default RequirementsField