import React, { useEffect, useState } from 'react'
import './CSS/CartPage.css'
import cartDummy from './../components/Assets/cart-products-dummy'
import { Link } from "react-router-dom";

const CartPage = () => {
    const [allCartItems, setAllCartItems] = useState({});
    const [alldaProducts, setAllProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const fetchProducts = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.allProducts)) {
                    const updatedProducts = data.allProducts.map(product => ({
                        ...product,
                        categories: [product.category, product.subcategory]
                    }));

                    setAllProducts(updatedProducts);

                } else {
                    console.log("data.allProducts is not an array, it is a:", typeof data.allProducts);
                }
            });
    }

    const fetchInfo = async () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                const response = await fetch('http://localhost:4000/getfromcart', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch the cart data');
                }

                const result = await response.json();
                if (response.status === 200) {
                    setAllCartItems(result.cartData);
                    console.log(`All items:`, allCartItems);
                } else {
                    throw new Error(result.message);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            window.alert("Please Login!");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchInfo();
    }, [])

    const keysArray = Object.keys(allCartItems);
    const count = keysArray.length;

    const findProductImage = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.mainimage : '';
    };

    const findPrice = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.price : '';
    };

    const incrementQty = (key) => {
        setQuantities(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    };

    const decrementQty = (key) => {
        setQuantities(prev => {
            if (prev[key] > 1) {
                return { ...prev, [key]: prev[key] - 1 };
            }
            return prev;
        });
    };

    return (
        <div className='cart-page-container'>
            {allCartItems && Object.keys(allCartItems).length > 0 ? (
                <>
                    <div className="cart-left-panel">
                        <div className="left-top">
                            <h1 id='mycart-txt'>My Cart</h1>
                            <h1 id='items-count'>{count - (allCartItems.initialized ? 1 : 0)}</h1>
                        </div>
                        <hr />
                        <div className="left-bottom">
                            <table className='cart-body'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th style={{ textAlign: 'left', paddingLeft: '20px' }}>Product Details</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(allCartItems).map(([key, item]) => {
                                        if (key !== "initialized") {
                                            const imageUrl = findProductImage(item.ItemID);
                                            const price = findPrice(item.ItemID);
                                            return (
                                                <tr key={key}>
                                                    <td><img src={imageUrl}
                                                        alt="Product-Image"
                                                        id='image' />
                                                    </td>
                                                    <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                                        Layers: {item.CustomData.customlayers}<br />
                                                        Tiers: {item.CustomData.customtiers}<br />
                                                        Writing: {item.CustomData.customwriting || "None"}<br />
                                                        Comment: {item.CustomData.customcomment || "None"}<br />
                                                        Color: {item.CustomData.customcolor.length > 0 ? item.CustomData.customcolor.join(", ") : "None"}<br />
                                                        Flavor: {item.CustomData.customflavor || "None"}
                                                    </td>
                                                    <td>{price} LKR</td>
                                                    <td>
                                                        <div className="qty-input">
                                                            <i onClick={() => decrementQty(key)} className="fa-solid fa-minus pm-icons"></i>
                                                            <input type="number"
                                                                value={quantities[key] || 1}
                                                                readOnly
                                                                id='qty'
                                                            />
                                                            <i onClick={() => incrementQty(key)} className="fa-solid fa-plus pm-icons"></i>
                                                        </div>
                                                    </td>
                                                    <td>{price * (quantities[key] || 1)} LKR</td>
                                                    <td>
                                                        <i id='dlt-mark'
                                                            className="fa-solid fa-circle-xmark">
                                                        </i>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="cart-right-panel">
                        <div className="right-top">
                            <h1 id='ordersumry-txt'>Order Summary</h1>
                        </div>
                        <hr />
                        <div className="right-bottom">
                            <div className="right-bttom-topPane">
                                <div className="items-n-total">
                                    <h1 id='itemslbl'>ITEMS {count - (allCartItems.initialized ? 1 : 0)}</h1>
                                    <h1 id='pricelbl'>{15400} LKR</h1>
                                </div>
                                <hr id='order-hr' />
                                <div className="promo-code">
                                    <h1 id='promolbl'>PROMO CODE</h1>
                                    <div className="promoinner">
                                        <input type="text" name="promo" id="promobox" />
                                        <button id='applyBtn'>APPLY</button>
                                    </div>
                                </div>
                                {/* <hr id='order-hr' /> */}
                                <div className="shipping">
                                    <h1 id='shippinglbl'>SHIPPING</h1>
                                    <h1 id='shippingprice'>{500} LKR</h1>
                                </div>
                                <hr id='order-hr' />
                            </div>
                            <div className="right-bttom-bottomPane">
                                {/* <hr /> */}
                                <div className="total-price">
                                    <h1 id='totllbl'>TOTAL COST</h1>
                                    <h1 id='totlpricelbl'>{15890} LKR</h1>
                                </div>
                                <Link to="/checkout">
                                    <button id='checkoutBtn'>CHECKOUT</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <div className='no-cartitems'>
                    <h1>No items in cart...</h1>
                </div>
            )}
        </div>
    );
}

export default CartPage
