import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';



const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();



    //get user data
    useEffect(()=>{
      const {name,email,password} = auth.user;
      setName(name);
      setEmail(email);
      setPassword(password)
    },[auth?.user])


    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(`http://localhost:3000/userProfile`, { name, email, password});
        if(res.data.error){
          toast.error(res.data.message)
        }
        else{
          setAuth({ ...auth, user:data.updatedUserProfile });
          let ls = localStorage.getItem('auth');
          ls = JSON.parse(ls);
          ls.user = data.updatedUserProfile;
          localStorage.setItem('auth',JSON.stringify(ls))
          toast.success('profile updated')


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
    <div className='adminsec container'>
        <div className='admin-menu'>
            <UserMenu/>
        </div>
        <div className='content'>
           <form onSubmit={submitHandler} className='form'>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='UserName' />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' readOnly />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' />
            <button className='btn' type="submit">Update</button>
           </form>
        </div>
        </div>
  )
}

export default Profile