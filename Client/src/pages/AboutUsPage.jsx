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
            Since its inception in 2016, Cake A Boo has proudly stood as Colombo's premier destination for exquisite bespoke cakes. What began as a humble venture has flourished into a beacon of culinary artistry, where every creation is a testament to passion and creativity. Our commitment to excellence resonates in every slice, as we craft each cake with precision and care, tailored to your unique preferences and occasions. From elegant wedding cakes to whimsical birthday treats, we infuse every creation with a touch of magic, making every celebration truly unforgettable. Step into our world of confectionery delights and let us transform your sweetest dreams into reality.
          </div>

          <button className='aboutus-contact-btn'>Contact Us</button>
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
