import React from 'react'
import './ProductsRender.css'
import dummyProducts from '../Assets/dummy-products.js'

const ProductsRender = () => {
    return (
        <div className='product-render-container'>
            {dummyProducts.map(product => (
                <div key={product.id} className="ind-product">
                    <img src={product.image} alt={product.title} />
                    <button>ADD TO CART</button>
                    <div className="ind-product-details">
                        <h3>{product.title}</h3>
                        {/* <p id='indcategory'>Category: {product.category}</p> */}
                        <p id='indprice'>{(product.price).toFixed(2)} LKR</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ProductsRender
