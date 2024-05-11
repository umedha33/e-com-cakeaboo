import React from 'react'
import './Header.css'
import adminDP from '../Assets/admin-dp.jpg'
import logo from '../Assets/cakeaboo-logo-t.png';

const Header = () => {
    return (
        <>
            {localStorage.getItem('auth-token') ? (
                <div className='header-container'>
                    <h1>ADMIN PANEL</h1>
                    <div className="noti-acc-set">
                        {/* <i className="fa-solid fa-bell"></i> */}
                        {/* <img src={adminDP} id='admin-dp' alt="admin-dp" /> */}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Header
