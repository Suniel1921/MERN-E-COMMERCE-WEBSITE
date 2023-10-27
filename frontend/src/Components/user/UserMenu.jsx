import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
        <aside className='container'>
        <h2>Welcome to user Dashboard</h2>
            <section className='admin'>
            
            <div className='adminLinks'>                
                <h3><NavLink className='underlinne'  to={'/dashboard/user/profile'}>Your Profile</NavLink></h3>
                <h3><NavLink className='underlinne'  to={'/dashboard/user/order'}>Your Order</NavLink></h3>
            </div>
            

            </section>
        </aside>
    </>
  )
}

export default UserMenu