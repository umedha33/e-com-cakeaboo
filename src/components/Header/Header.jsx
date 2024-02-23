import React, { useState } from 'react'
import './Header.css'
import logo from '../Assets/cakeaboo-logo-t.png'

const Header = () => {

    const [activeItem, setActiveItem] = useState('HOME');

    const clickedItem = (item) => {
        setActiveItem(item);
    };

    return (
        <div className='header-section'>
            <div className="header-logo">
                <img src={logo} alt="header-logo" />
            </div>
            <ul className="navigation-menu">
                <li className={activeItem === 'HOME' ? 'active' : ''} onClick={() => clickedItem('HOME')}>HOME</li>
                <li className={activeItem === 'CAKES' ? 'active' : ''} onClick={() => clickedItem('CAKES')}>CAKES</li>
                <li className={activeItem === 'GENERATE DESIGNS' ? 'active' : ''} onClick={() => clickedItem('GENERATE DESIGNS')}>GENERATE DESIGNS</li>
                <li className={activeItem === 'FAQs' ? 'active' : ''} onClick={() => clickedItem('FAQs')}>FAQs</li>
                <li className={activeItem === 'ABOUT US' ? 'active' : ''} onClick={() => clickedItem('ABOUT US')}>ABOUT US</li>
                <li className={activeItem === 'CONTACT US' ? 'active' : ''} onClick={() => clickedItem('CONTACT US')}>CONTACT US</li>
            </ul>
            <div className="log-cart">
                <p className={activeItem === 'MY ACCOUNT' ? 'active' : ''} onClick={() => clickedItem('MY ACCOUNT')}>MY ACCOUNT</p>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </div>
    )
}

export default Header
