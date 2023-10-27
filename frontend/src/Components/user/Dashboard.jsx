import React from 'react'
import UserMenu from './UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
         {/* <section className='container'>
         <UserMenu/>

         <h3>{auth?.user.name}</h3>
      </section> */}

      <div className='adminsec container'>
        <div className='admin-menu'>
            <UserMenu/>
        </div>
        <div className='content'>
           <h2> {auth?.user.name}</h2>
           <h2> {auth?.user.email}</h2>
        </div>
    </div>
    </>
  )
}

export default Dashboard