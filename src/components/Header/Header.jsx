import React, { useState } from 'react';
import './Header.css';
import logo from '../Assets/cakeaboo-logo-t.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [activeItem, setActiveItem] = useState('HOME');

    const clickedItem = (item) => {
        setActiveItem(item);
    };

    return (
        <div className='header-section'>
            <div className="header-logo">
                <Link to="/" className="nav-link">
                    <img src={logo} alt="header-logo" onClick={() => clickedItem('HOME')} />
                </Link>
            </div>
            <ul className="navigation-menu">
                <li className={activeItem === 'HOME' ? 'active' : ''} onClick={() => clickedItem('HOME')}>
                    <Link to="/" className="nav-link">HOME</Link>
                </li>
                <li className={activeItem === 'CAKES' ? 'active' : ''} onClick={() => clickedItem('CAKES')}>
                    <Link to="/cakes" className="nav-link">CAKES</Link>
                </li>
                <li className={activeItem === 'GENERATE DESIGNS' ? 'active' : ''} onClick={() => clickedItem('GENERATE DESIGNS')}>
                    <Link to="/generatecake" className="nav-link">GENERATE DESIGNS</Link>
                </li>
                <li className={activeItem === 'FAQs' ? 'active' : ''} onClick={() => clickedItem('FAQs')}>
                    <Link to="/faqs" className="nav-link">FAQs</Link>
                </li>
                <li className={activeItem === 'ABOUT US' ? 'active' : ''} onClick={() => clickedItem('ABOUT US')}>
                    <Link to="/aboutus" className="nav-link">ABOUT US</Link>
                </li>
                <li className={activeItem === 'CONTACT US' ? 'active' : ''} onClick={() => clickedItem('CONTACT US')}>
                    <Link to="/contactus" className="nav-link">CONTACT US</Link>
                </li>
            </ul>
            <div className="log-cart">
                <p className={activeItem === 'MY ACCOUNT' ? 'active' : ''} onClick={() => clickedItem('MY ACCOUNT')}>
                    <Link to="/myaccount" className="nav-link">MY ACCOUNT</Link>
                </p>
                <Link to="/cart" className="nav-link" onClick={() => clickedItem('CART')}>
                    <i className={`fa-solid fa-cart-shopping ${activeItem === 'CART' ? 'active' : ''}`}></i>
                </Link>
            </div>
        </div>
    );
};

export default Header;
