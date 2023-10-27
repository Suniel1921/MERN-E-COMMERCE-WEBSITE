import React from 'react'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'

const Admindashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className='adminsec container'>
        <div className='admin-menu'>
            <AdminMenu/>
        </div>
        <div className='content'>
           <h2> {auth?.user.name}</h2>
           <h2> {auth?.user.email}</h2>
        </div>
    </div>
    </>
  )
}

export default Admindashboard