import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './SingleProduct.css'
import dummyProducts from './../Assets/dummy-products';


const allColors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple',
    'pink', 'cyan', 'black', 'lime', 'beige', 'rgb(244, 244, 244)', 'brown'
];

const SingleProduct = () => {
    const location = useLocation()
    const { singleProduct } = location.state
    const product = dummyProducts.find(product => product.id === singleProduct);
    const [selectedColors, setSelectedColors] = useState([]);

    const toggleColor = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const [buttonText, setButtonText] = useState('Add to Cart');
    const [isClicked, setIsClicked] = useState(false);
    const [iconClass, setIconClass] = useState('fa-solid fa-cart-plus');

    const handleClick = () => {
        if (!isClicked) {
            setIsClicked(true);
            setButtonText('Product Added!');
            setIconClass('fa-solid fa-circle-check');
            setTimeout(() => {
                setButtonText('Add to Cart');
                setIconClass('fa-solid fa-cart-plus');
                setIsClicked(false);
            }, 5000);
        }
    };

    return (
        <div className='single-product-container'>
            {product && (
                <div className="left-side-cont">
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
                    <div className="description-sec">
                        <div className="desc-head">
                            <h2>Description</h2>
                        </div>
                        <div className="desc-body">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="right-side-cont">
                {product && (
                    <div key={product.id} className="product-dtl-viewer">
                        <h1 id='title'>{product.title}</h1>
                        <h2 id='categories'>{`Category › ${product.categories}`}</h2>
                        <h2 id='keywords'>{`Keywords: ${product.keywords}`}</h2>
                        <div className="default-sec">
                            <h1>Default Variations</h1>
                            <hr />
                            <h2 id='layers'>{`Layer Count: ${product.layerCount}`}</h2>
                            <h2 id='tiers'>{`Tier Count: ${product.tierCount}`}</h2>
                            <h2 id='flavors'>{`Flavor: ${product.flavor}`}</h2>
                            <div className="color-grid">
                                <h2>Color ›</h2>
                                {product.color.map((color, index) => (
                                    <div
                                        key={index}
                                        className='gcell'
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                        </div>
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
                                    <input type="text" name="writing" id="writing" placeholder='E.g. Happy Birthday!' />
                                </div>
                                <div className="third-rw">
                                    <label>Additional Comments: </label>
                                    <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                                </div>
                                <div className="fourth-rw">
                                    <h2 id='color-slct'>Change Color: </h2>
                                    <div className="select-colors">
                                        {allColors.map((color, index) => (
                                            <div
                                                key={index}
                                                className={`gcell ${selectedColors.includes(color) ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => toggleColor(color)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="fifth-rw">
                                    <h2 id='color-slct'>Change Flavor: </h2>
                                    <select id='flavor'>
                                        <option value="vanilla">Vanilla</option>
                                        <option value="chocolate">Chocolate</option>
                                        <option value="red-velvet">Red Velvet</option>
                                        <option value="lemon">Lemon</option>
                                        <option value="strawberry">Strawberry</option>
                                        <option value="coffee">Coffee</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="total-sec">
                            <div className='btns-cpl'>
                                <button
                                    id='addtocart'
                                    onClick={handleClick}
                                >{buttonText} <i className={iconClass}></i></button>
                                <button id='proceed'>Procees to Checkout ›</button>
                            </div>
                            <h2 id='sprice'>{`${(product.price).toFixed(2)} LKR`}</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleProduct
