import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'

const Category = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Checking if the user is logged in
    if (!auth.user) {
      toast.error('Please log in first.');
      navigate('/login');
    }
  }, [auth.user, navigate]);

 


  return (
    <>
        <section className='container'>
        <div>
            <h3>category</h3>
           
        </div>

        </section>
        


    </>
  )
}

export default Category






