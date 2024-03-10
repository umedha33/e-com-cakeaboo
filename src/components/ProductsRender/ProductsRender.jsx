import React, { useState, useEffect } from 'react';
import './ProductsRender.css';

const ProductsRender = ({ products, sortingMethod }) => {

    const sortProducts = (products, sortingMethod) => {
        switch (sortingMethod) {
            case 'sort-by-latest':
                return products.sort((a, b) => b.date - a.date);
            case 'sort-by-price-low':
                return products.sort((a, b) => a.price - b.price);
            case 'sort-by-price-high':
                return products.sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };

    const sortedProducts = sortProducts(products, sortingMethod);

    return (
        <div className='product-render-container'>
            {sortedProducts.map(product => (
                <div key={product.id} className="ind-product">
                    <img src={product.image} alt={product.title} />
                    <button>ADD TO CART</button>
                    <div className="ind-product-details">
                        <h3>{product.title}</h3>
                        <p id='indprice'>{(product.price).toFixed(2)} LKR</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsRender;
