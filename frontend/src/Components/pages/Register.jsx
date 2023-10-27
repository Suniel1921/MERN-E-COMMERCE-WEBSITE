import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const submitHandler = async (e)=>{
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:3000/register',{name, email, password})
    //         console.log(res)
    //     if(res.status === 200){
    //         toast.success(res.data.message)
    //         navigate('/login');
    //     }
       
    //     else{
    //         toast.error('hahaha')
    //         toast.error(res.data.error)
    //     }
            
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(`Something went Wrong ${error}`)            
    //     }
    // }



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:3000/register', { name, email, password });
      
          if (res.status === 201) {
            toast.success(res.data.message);
            navigate('/login');
          } else if (res.status === 409) {
            // Display the error message from the backend response
            toast.error(res.data.message);
          } else {
            toast.error('Something went wrong');
          }
        }  catch (error) {
            console.log(error);
            if (error.response) {
                // This error message comes from the backend response
                toast.error(error.response.data.message);
            } else {
                // If there's no specific error message, show a generic error
                toast.error(`Something went Wrong: ${error.message}`);
            }
        }
        
      }
      
    
    
    
    
    
    




  return (
    <>
        <section className='container'>
        <div>
           <form onSubmit={submitHandler} className='form'>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='UserName' />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' />
            <button className='btn' type="submit">Register</button>
           </form>
        </div>

        </section>
    </>
  )
}

export default Register