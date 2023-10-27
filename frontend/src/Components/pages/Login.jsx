import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();


    const loginHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/login',{email, password});
            if(res && res.data.success){
                setAuth({...auth, 
                user : res.data.userExit,
                token : res.data.token,
            })
            //saving user token in localstorage
            localStorage.setItem('token',JSON.stringify(res.data))

                navigate(location.state || '/');
                toast.success(res && res.data.message);
            }
            else{
                toast.error(res && res.data.message)
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
            <form onSubmit={loginHandler} className='form'>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' />
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' />
                <button  className='btn' type="submit">Login</button>
            </form>
        </div>

        </section>
    </>
  )
}

export default Login