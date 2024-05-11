import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SingleProduct.css'
import dummyProducts from './../Assets/dummy-products';
import CartPage from '../../pages/CartPage';

const allColors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple',
    'pink', 'cyan', 'black', 'lime', 'beige', 'rgb(244, 244, 244)', 'brown'
];

const SingleProduct = () => {
    const location = useLocation()
    const { singleProduct } = location.state
    const [selectedColors, setSelectedColors] = useState([]);
    const [oneProduct, setOneProduct] = useState({});
    const [currentImage, setCurrentImage] = useState('mainimage');
    const [customizedData, setCustomizedData] = useState({
        customlayers: "Default",
        customtiers: "Default",
        customwriting: "Default",
        customcomment: "Default",
        customcolor: ["Default"],
        customflavor: "Default",
        customPrice: 0,
    })

    useEffect(() => {
        console.log(`new price: `, customizedData.customPrice)
    }, [customizedData.customPrice])

    // Function to calculate custom price
    const calculateCustomPrice = (data) => {
        let additionalPrice = 0;
        additionalPrice += data.customlayers !== "Default" ? parseInt(data.customlayers) * 400 : 0;
        additionalPrice += data.customtiers !== "Default" ? parseInt(data.customtiers) * 900 : 0;
        additionalPrice += data.customcolor[0] !== "Default" ? data.customcolor.length * 200 : 0;
        additionalPrice += data.customflavor !== 'Default' ? 300 : 0;
        if (data.customcomment.toLowerCase().includes('add')) {
            additionalPrice += 500;
        }
        return oneProduct.price + additionalPrice;
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...customizedData, [name]: value };
        const newPrice = calculateCustomPrice(updatedData);
        setCustomizedData({ ...updatedData, customPrice: newPrice });
    }

    const fetchProduct = async (id) => {
        const response = await fetch(`http://localhost:4000/oneproduct?id=${id}`);
        const data = await response.json();
        setOneProduct(data.oneProduct)
        // console.log(`Product eka: `, oneProduct)
    }

    useEffect(() => {
        const productID = singleProduct;
        fetchProduct(productID);
    }, [])

    const handleThumbnailClick = (imageSrc) => {
        setCurrentImage(imageSrc);
        console.log(`clicked: `, imageSrc);
    };

    // const toggleColor = (color) => {
    //     let newSelectedColors;
    //     if (selectedColors.includes(color)) {
    //         newSelectedColors = selectedColors.filter(c => c !== color);
    //     } else {
    //         newSelectedColors = [...selectedColors, color];
    //     }
    //     setSelectedColors(newSelectedColors);
    //     setCustomizedData({ ...customizedData, customcolor: newSelectedColors });
    // };

    const toggleColor = (color) => {
        let newSelectedColors;
        if (selectedColors.includes(color)) {
            newSelectedColors = selectedColors.filter(c => c !== color);
        } else {
            newSelectedColors = [...selectedColors, color];
        }
        setSelectedColors(newSelectedColors);
        const updatedData = { ...customizedData, customcolor: newSelectedColors };
        const newPrice = calculateCustomPrice(updatedData);
        setCustomizedData({ ...updatedData, customPrice: newPrice });
    };

    const [buttonText, setButtonText] = useState('Add to Cart');
    const [isClicked, setIsClicked] = useState(false);
    const [iconClass, setIconClass] = useState('fa-solid fa-cart-plus');

    const handleAddToCart = (itemID, customD) => {
        if (!isClicked) {
            setIsClicked(true);
            setButtonText('Product Added!');
            setIconClass('fa-solid fa-circle-check');

            console.log(`This is the ID`, itemID);
            console.log(`This is the custom data`, customizedData);

            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/addtocart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ItemID: itemID,
                        CustomData: customD
                    }),
                }).then((response) => response.json())
                    .then((data) => console.log(data))
            } else {
                window.alert("Please Login!")
            }

            setTimeout(() => {
                setButtonText('Add to Cart');
                setIconClass('fa-solid fa-cart-plus');
                setIsClicked(false);
            }, 5000);
        }
    };

    return (
        <div className='single-product-container'>
            {oneProduct !== null ? (
                <>
                    <div className="left-side-cont">
                        <div className="product-img-viewer">
                            <div className="thumb-container">
                                {oneProduct.productgallery && oneProduct.productgallery.map((image, index) => (
                                    <div key={index}>
                                        <img id='thumb-image'
                                            src={image}
                                            alt={`Gallery image ${index + 1}`}
                                            onClick={() => { handleThumbnailClick(image) }} />
                                    </div>
                                ))}
                            </div>
                            <div className="fullimg-container">
                                {currentImage === 'mainimage' ? (
                                    <img id='main-image'
                                        src={oneProduct.mainimage}
                                        alt={oneProduct.title} />
                                ) : (
                                    <>
                                        <img id='main-image'
                                            src={currentImage}
                                            alt={oneProduct.title} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="description-sec">
                            <div className="desc-head">
                                <h2>Description</h2>
                            </div>
                            <div className="desc-body">
                                <p>{oneProduct.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="product-dtl-viewer">
                        <h1 id='title'>{oneProduct.title}</h1>
                        <h2 id='categories'>{`Category › ${oneProduct.category} | ${oneProduct.subcategory} `}</h2>
                        <h2 id='keywords'>{`Keywords: Item_${oneProduct.id}`}</h2>
                        <div className="default-sec">
                            <h1>Default Variations</h1>
                            <hr />
                            <h2 id='layers'>{`Layer Count: ${oneProduct.layercount}`}</h2>
                            <h2 id='tiers'>{`Tier Count: ${oneProduct.tiercount}`}</h2>
                            <h2 id='flavors'>{`Flavor: ${oneProduct.flavor}`}</h2>
                            <div className="color-grid">
                                <h2>Color ›</h2>
                                {oneProduct.color && oneProduct.color.map((color, index) => (
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
                                    <input type="number"
                                        name='customlayers'
                                        value={customizedData.customlayers}
                                        onChange={changeHandler}
                                        placeholder='0'
                                        min="0"
                                        max="8" />

                                    <h2 id='cust-layers'>Custom Tiers: </h2>
                                    <input type="number"
                                        name='customtiers'
                                        value={customizedData.customtiers}
                                        onChange={changeHandler}
                                        placeholder='0'
                                        min="0"
                                        max="4" />
                                </div>
                                <div className="second-rw">
                                    <label>Writings: </label>
                                    <input type="text"
                                        name="customwriting"
                                        value={customizedData.customwriting}
                                        onChange={changeHandler}
                                        id="writing"
                                        placeholder='E.g. Happy Birthday!' />
                                </div>
                                <div className="third-rw">
                                    <label>Additional Comments: </label>
                                    <textarea name="customcomment"
                                        value={customizedData.customcomment}
                                        onChange={changeHandler}
                                        id="comment"
                                        cols="30"
                                        rows="10"></textarea>
                                </div>
                                <div className="fourth-rw">
                                    <h2 id='color-slct'>Change Color: </h2>
                                    <div className="select-colors">
                                        {allColors.map((color, index) => (
                                            <div
                                                key={index}
                                                className={`gcell ${selectedColors.includes(color) ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                value={customizedData.customcolor}
                                                onChange={changeHandler}
                                                onClick={() => toggleColor(color)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="fifth-rw">
                                    <h2 id='color-slct'>Change Flavor: </h2>
                                    <select value={customizedData.customflavor}
                                        onChange={changeHandler}
                                        name='customflavor'
                                        id='flavor' >
                                        <option value="Vanila">Vanila</option>
                                        <option value="Chocolate">Chocolate</option>
                                        <option value="Red Velvet">Red Velvet</option>
                                        <option value="Lemon">Lemon</option>
                                        <option value="Strawberry">Strawberry</option>
                                        <option value="Coffee">Coffee</option>
                                        <option value="Funfetti">Funfetti</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="total-sec">
                            <div className='btns-cpl'>
                                <button
                                    id='addtocart'
                                    onClick={() => { handleAddToCart(oneProduct.id, customizedData) }}
                                >{buttonText} <i className={iconClass}></i></button>
                                <Link to="/cart" style={{ textDecoration: 'none' }}>
                                    <button id='proceed'
                                    >Proceed to Checkout ›</button>
                                </Link>
                            </div>
                            <div className="price-cont">
                                {customizedData.customPrice > 0 ? (
                                    <h2 id='sprice'>{`LKR${customizedData.customPrice}/=`}</h2>
                                ) : (
                                    <h2 id='sprice'>{`LKR${oneProduct.price}/=`}</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default SingleProduct
