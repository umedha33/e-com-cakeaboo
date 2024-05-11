import React from 'react';
import './CSS/AboutUsPage.css';
import aboutusImage from '../components/Assets/aboutus.jpg'

const AboutUsPage = () => {
  return (
    <div className='aboutus-container'>
      <div className="insd-cntn">

        <div className='aboutus-content'>
          <div className='aboutus-header'>
            <h1>Welcome To CakeaBoo!</h1>
          </div>
          <div className='aboutus-sub-heading'>Who We Are?</div>
          <div className='aboutus-paragraph'>
            Since 2017, MS Archery LK has become the most well-known archery and recreational equipment store in Kandy. What started out as a hobby has now become our passion, and we are delighted to share it with you.
            <br /><br />
            We are proud to have serviced several happy customers and look forward to continuing our work for years to come. Our love for archery drives who we are and what we do every single day. We are proud to have expanded our product catalogue to offer you air pistols, air rifles, and accessories for your recreational needs.
            <br /><br />
            Great service begins with great people and industry experience, which is why our staff is the best and most qualified in the business. We are a team of dedicated personnel with a genuine desire to ensure that your experience with us is easy, convenient, and satisfying. Come visit us and get to know us better.
          </div>
          <a href='mailto:msarcherylk@gmail.com' className='aboutus-contact-btn'>Contact Us</a>
        </div>
        <div className='aboutus-image'>
          <div className="img-cnt-abts">
            <img id='abts-img' src={aboutusImage} alt='Developer Image' />
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutUsPage;
