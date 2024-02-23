import React from 'react'
import './Footer.css'
import cakeabooText from '../Assets/cakeaboo-text.png'

const Footer = () => {

    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <div className='footer-section'>
            <img id='cake-a-boo' src={cakeabooText} alt="cake-a-boo" />
            <div className="foot-elements">
                <div className="sec-one">
                    <h1>About Us:</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit magni sunt officiis pariatur perferendis deleniti esse itaque beatae dolores iusto dolorem, saepe expedita commodi voluptas non! Obcaecati sunt officiis pariatur perferendis deleniti esse itaque beatae dolores iusto iste fuga quis!</p>
                    <h2>From our oven to your heart, with love.</h2>
                </div>
                <div className="sec-two">
                    <h1>Quick Links:</h1>
                    <ul>
                        <li>Cakes</li>
                        <li>Generate Designs</li>
                        <li>FAQs</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>My Account</li>
                        <li>Shipping</li>
                    </ul>
                </div>
                <div className="sec-three">
                    <h2>set three</h2>
                </div>
                <div className="sec-four">
                    <h2>set four</h2>
                </div>
            </div>
            <div className="bottm-segmnt">
                <h1>© {currentYear} CAKE A BOO COLOMBO - All rights reserved.</h1>
                <h1>Privacy Policy</h1>
            </div>
        </div>
    )
}

export default Footer
