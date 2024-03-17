import React from 'react'
import { useLocation } from 'react-router-dom'
import './SingleProduct.css'
import dummyProducts from './../Assets/dummy-products';

const SingleProduct = () => {
    const location = useLocation()
    const { singleProduct } = location.state

    const product = dummyProducts.find(product => product.id === singleProduct);

    return (
        <div className='single-product-container'>
            <div className="left-side-cont">
                {product && (
                    <div key={product.id} className="product-img-viewer">
                        <div className="thumb-container">
                            <img id='thumb-image' src={product.image} alt={product.title} />
                            <img id='thumb-image' src={product.image} alt={product.title} />
                            <img id='thumb-image' src={product.image} alt={product.title} />
                            <img id='thumb-image' src={product.image} alt={product.title} />
                        </div>
                        <div className="fullimg-container">
                            <img id='main-image' src={product.image} alt={product.title} />
                        </div>
                    </div>
                )}
            </div>
            <div className="right-side-cont">
                {product && (
                    <div key={product.id} className="product-dtl-viewer">
                        <h1 id='title'>{product.title}</h1>
                        <h2 id='categories'>{`Category › ${product.categories}`}</h2>
                        <div className="default-sec">
                            <label>Default Variations</label>
                            <h2 id='layers'>{`Layer Count: ${product.layerCount} | Tier Count: ${product.tierCount}`}</h2>
                            <div className="color-grid-itms">
                                {product.color.map((color, index) => (
                                    <div
                                        key={index}
                                        className='cell'
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <h2 id='keywords'>{`Keywords: ${product.keywords}`}</h2>
                        <div className="cust-lt-cont">
                            <h1>Customize the cake</h1>
                            <hr />
                            <div className="custom-sec">
                                <div className="first-rw">
                                    <h2 id='cust-layers'>Custom Layers: </h2>
                                    <input type="number" placeholder='0' />
                                    <h2 id='cust-layers'>Custom Tiers: </h2>
                                    <input type="number" placeholder='0' />
                                </div>
                                <div className="second-rw">
                                    <label>Writings: </label>
                                    <input type="text" name="writing" id="writing" placeholder='Ex: Happy Birthday!' />
                                </div>
                                <div className="third-rw">
                                    <label>Additional Comments: </label>
                                    <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </div>
                        <h2 id='price'>{`${(product.price).toFixed(2)} LKR`}</h2>
                        {/* <div className="desc-cont">
                            <h2 id='desc'>{product.description}</h2>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleProduct