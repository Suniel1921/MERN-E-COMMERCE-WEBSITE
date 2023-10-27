import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';


const AllCategory = () => {
    const categories = useCategory();
  return (
    <>
        <div className='container'>
            <h3>all categoryes</h3>
            <div>
                {
                    categories.map((c)=>(
                        <button key={c._id}>
                            <Link to={`/categories/${c._id}`}>{c.name}</Link>
                        </button> 
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default AllCategory