import React from 'react'
import './Footer.css'
import cakeabooText from '../Assets/cakeaboo-text.png'

const Footer = () => {
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
                    <h2>set two</h2>
                </div>
                <div className="sec-three">
                    <h2>set three</h2>
                </div>
            </div>
        </div>
    )
}

export default Footer
