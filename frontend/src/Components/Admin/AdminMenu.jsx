import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'


const AdminMenu = () => {
    const [auth,setAuth] = useAuth();
  return (  
    <>
        <aside className='container'>
        <h2>Welcome to admin Panel</h2>
            <section className='admin'>
            
            <div className='adminLinks'>                
                <h3><NavLink className='underlinne'  to={'/dashboard/admin/create-category'}>Create Category</NavLink></h3>
                <h3><NavLink className='underlinne'  to={'/dashboard/admin/create-product'}>Create Product</NavLink></h3>
                <h3><NavLink className='underlinne'  to={'/dashboard/admin/users'}>All Users</NavLink></h3>
                <h3><NavLink className='underlinne'  to={'/dashboard/admin/products'}>All Products</NavLink></h3>
            </div>
            {/* <div className='adminContent'>
            <h3>{auth?.user.name}</h3>
            <h3>{auth?.user.email}</h3>

            </div> */}

            </section>
        </aside>
    </>
  )
}

export default AdminMenu