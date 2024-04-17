// import React from 'react'
import React, { useEffect, useState } from 'react'
import './Hero.css'
import im1 from '../Assets/im11.jpg';
import im2 from '../Assets/im2.jpg';
import im3 from '../Assets/im3.jpg';
import im5 from '../Assets/im5.jpg';
import im6 from '../Assets/im6.jpg';

const Hero = () => {

    const images = [im1, im2, im3, im5, im6];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
  
      return () => clearInterval(intervalId);
    }, []);

  return (
    <div className='home-section'>
      <div className="left-section">
        <h1>Indulge in Sweet Delights</h1>
        <h2>" with Cake a Boo "</h2>
        <p>We create custom cakes for all occasions </p>
      </div>
      <div className="right-section">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            style={{ opacity: index === currentImageIndex ? 1 : 0, position: 'absolute' }}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
