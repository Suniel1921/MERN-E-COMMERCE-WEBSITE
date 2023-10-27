import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:3000/searchProduct/${values.keyword}`)
            setValues({...values, results: res.data})
            navigate('/search')
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <>
        <div>
       <form onSubmit={submitHandler}>
        <input onChange={(e)=> setValues({...values, keyword: e.target.value})} value={values.keyword} type="search" placeholder='Search Here ...' />
        <button type="submit">Search</button>
       </form>
        </div>
    </>
  )
}

export default SearchInput