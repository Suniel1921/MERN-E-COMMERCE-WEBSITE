import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Spinner = ({path='login'}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(()=>{
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);      
    }, 1000);
    // count === 0 && navigate('/login',{state: location.pathname});
    count === 0 && navigate(`/${path}`,{state: location.pathname});
    return ()=> clearInterval(interval);
  },[count, navigate, path])


  return (
    <>
        <section className='spinner'>
        <h3>Redirecting to You in {count} second</h3>
        <div className="custom-loader"></div>
        </section>
    </>
  )
}

export default Spinner