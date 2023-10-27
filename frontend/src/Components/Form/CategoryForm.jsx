import React, { useState } from 'react'


const CategoryForm = ({submitHandler, value, setValue}) => {
    
  return (
    <div className='categoryForm'>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>setValue(e.target.value)} value={value} type="text" placeholder='Enter New Category Name' />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default CategoryForm