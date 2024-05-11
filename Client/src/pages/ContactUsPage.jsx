import React, { useState } from 'react';
import './CSS/ContactUsPage.css';
import mapImage from '.././components/Assets/map-cakeaboo.jpg';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    if (!name || !email || !message) {
      window.alert("Fill required feilds!")
      return
    }

    e.preventDefault();

    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Message:', message);

    window.alert('Your inquiry has been sent');

    setName('');
    setEmail('');
    setMessage('');
  };

  const chatClick = () => {
    window.location.replace("/myaccount");
  };

  return (
    <div className='contactus-container'>
      <div className="contact-left">
        <div className="contact-form">
          <h1>Contact Us</h1>
          <hr />
          <h2>Reach out to us for any inquiry</h2>
          <form onSubmit={handleSubmit}>
            <div className='contactformline'>
              <label htmlFor="entername">Enter Name:</label>
              <input
                type="text"
                name="entername"
                id="entername"
                placeholder='Nihal Kariyawasam'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='contactformline'>
              <label htmlFor="enteremail">Enter Email:</label>
              <input
                type="email"
                name="enteremail"
                id="enteremail"
                placeholder='nika@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='contactformline'>
              <label htmlFor="entermessage">Message:</label>
              <textarea
                name="entermessage"
                id="enteremesage"
                placeholder='Type your message here...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button id='contact-btn' type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
      <div className="contact-right">
        <div className="map-section">
          <img src={mapImage} alt="map" />
        </div>
        <div className="gotochat">
          <h1>Want to chat live with us?</h1>
          <h2>Log In and start a chat</h2>
          <button id='chat-btn' onClick={() => chatClick()}>CHAT</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
