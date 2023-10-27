import React from 'react';
import AdminMenu from './AdminMenu';

const Users = () => {
    return (
        <>
            <div className='adminsec container'>
                <div className='admin-menu'>
                    <AdminMenu />
                </div>
                <div className='content'>
                    Users
                </div>
            </div>
        </>
    );
}

export default Users;
