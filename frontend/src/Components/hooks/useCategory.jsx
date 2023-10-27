import axios from "axios";
import { useState, useEffect } from "react";

export default function useCategory (){
    const [categories, setCategories] = useState([]);
    
    //get categories
    const getCategories  = async ()=>{
        try {
            const res = await axios.get('http://localhost:3000/allCategory');
            setCategories(res?.data?.allCategory)
            
        } catch (error) {
            console.log(error)
            
        }

    }

    useEffect(()=>{
        getCategories();
    },[])

    return categories;



}