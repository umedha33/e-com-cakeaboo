import React from 'react'
import './ShortGallery.css'
import dummyProducts from '../Assets/dummy-products.js'

const ShortGallery = () => {

  const short_gallery = dummyProducts.slice(0, 8);

  return (
    <div className='products-gallery'>
      <h1>Our Products</h1>

      <div className="product-container">
        {short_gallery.map(product => (

          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />

            <div className="product-details">
              <h3>{product.title}</h3>
              <p id='category'>Category: {product.category}</p>
              <p id='price'>{(product.price).toFixed(2)} LKR</p>
            </div>

          </div>
        ))}
      </div>
      <button id='view-more-btn'>View More ›</button>
    </div>
  )
}

export default ShortGallery
