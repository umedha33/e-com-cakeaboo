import React from 'react'
import './Header.css'
import logo from '../Assets/cakeaboo-logo-t.png'

const Header = () => {
    return (
        <div className='header-section'>
            <div className="header-logo">
                <img src={logo} alt="header-logo" />
            </div>
            <ul className="navigation-menu">
                <li>HOME</li>
                <li>CAKES</li>
                <li>GENERATE DESIGNS</li>
                <li>FAQs</li>
                <li>ABOUT US</li>
                <li>CONTACT US</li>
            </ul>
            <div className="log-cart">
                <p>MY ACCOUNT</p>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </div>
    )
}

export default Header
