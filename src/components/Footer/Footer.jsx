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
                    <h1>About Us</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit magni sunt officiis pariatur perferendis deleniti esse itaque beatae dolores iusto dolorem, saepe expedita commodi voluptas non! Obcaecati sunt officiis pariatur perferendis deleniti esse itaque beatae dolores iusto iste fuga quis!</p>
                    <h2>From our oven to your heart, with love.</h2>
                </div>
                <div className="sec-two">
                    <h1>Quick Links</h1>
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
                    <h1>Contact</h1>
                    <ul>
                        <li><i class="fa-regular fa-envelope"></i>  cakeaboocolombo@gmail.com</li>
                        <li><i class="fa-brands fa-instagram"></i> @cake_a_boo_colombo</li>
                        <li><i class="fa-solid fa-map-pin"></i> Cake A Boo - Colombo 06</li>
                        {/* <li><i class="fa-solid fa-phone"></i> 081 234 5678</li> */}
                    </ul>
                </div>
                <div className="sec-four">
                    <h1>Promo Alerts</h1>
                    <h2>Enter your email to get promotion alerts!</h2>
                    <div class="input-container">
                        <input type="email" name="email" id="promo-email" />
                        <button id='submit-btn'>Submit</button>
                    </div>
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
