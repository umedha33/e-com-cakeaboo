import React from 'react'
import './CSS/ContactUsPage.css'
import mapImage from '.././components/Assets/map-cakeaboo.jpg'

const ContactUsPage = () => {
  return (
    <div className='contactus-container'>
      <div className="contact-left">
        <div className="contact-form">
          <h1>Contact Us</h1>
          <hr />
          <h2>Reach out to us for any inquiry</h2>
          <div className='contactformline'>
            <label htmlFor="entername">Enter Name:</label>
            <input type="entername" name="entername" id="entername" placeholder='Nihal Kariyawasam' />
          </div>
          <div className='contactformline'>
            <label htmlFor="enteremail">Enter Email:</label>
            <input type="enteremail" name="enteremail" id="enteremail" placeholder='nika@gmail.com' />
          </div>
          <div className='contactformline'>
            <label htmlFor="enteremesage">Message:</label>
            <textarea name="enteremesage" id="enteremesage" placeholder='Type your message here...' cols="30" rows="10"></textarea>
          </div>
          <button id='contact-btn'>SUBMIT</button>
        </div>
      </div>
      <div className="contact-right">
        <div className="map-section">
          <img src={mapImage} alt="map" />
        </div>
        <div className="gotochat">
          <h1>Want to chat live with us?</h1>
          <h2>Log In and start a chat</h2>
          <button id='chat-btn'>CHAT</button>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
