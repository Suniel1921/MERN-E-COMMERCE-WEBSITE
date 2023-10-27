import React from 'react'
import UserMenu from './UserMenu'

const Order = () => {
  return (
    <div className='adminsec container'>
    <div className='admin-menu'>
        <UserMenu/>
    </div>
    <div className='content'>
        orders
    </div>
</div>
  )
}

export default Order