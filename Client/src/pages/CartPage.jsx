import React, { useEffect, useState } from 'react'
import './CSS/CartPage.css'
import cartDummy from './../components/Assets/cart-products-dummy'
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    const [allCartItems, setAllCartItems] = useState({});
    const [alldaProducts, setAllProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    // const [coupon, setCoupon] = useState([]);
    const [promoInp, setPromoInp] = useState('');
    const [promPrice, setPromPrice] = useState();
    // const [chckoutAmount, setChckoutAmount] = useState(0);

    const navigate = useNavigate();

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

    const getCheckoutData = () => {
        const checkoutItems = Object.entries(allCartItems).map(([key, item]) => {
            if (key !== "initialized") {
                const quantity = quantities[key] || 1;
                const price = findPrice(item.ItemID);
                return {
                    itemId: item.ItemID,
                    customData: item.CustomData,
                    quantity: quantity,
                    totalAmount: price * quantity,
                };
            }
            return null;
        }).filter(item => item !== null);
        // console.log(checkoutItems);
        return checkoutItems;
    };

    const fetchCoupon = async (code) => {
        // console.log(`yawana eka: `, code);
        const response = await fetch(`http://localhost:4000/onecoupon?couponCode=${code}`);
        const data = await response.json();
        // await setCoupon(data.oneCoupon);

        if (data.oneCoupon && data.oneCoupon.couponCode === code) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10);
            const startDate = formatDate(data.oneCoupon.couponStartDate);
            const endDate = formatDate(data.oneCoupon.couponEndDate);

            const currentDateString = new Date(formattedDate);
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);


            if (currentDateString < startDateObj || currentDateString > endDateObj) {
                window.alert("Promo is not valid.");
            } else {
                // console.log(`Coupon Price`, data.oneCoupon.couponPrice);
                setPromPrice(data.oneCoupon.couponPrice);
            }
        } else {
            window.alert("Invalid Promo Code!")
        }
    }

    const handleCheckout = () => {
        const checkoutData = getCheckoutData();
        navigate('/checkout', { state: { items: checkoutData } });
    };

    const keysArray = Object.keys(allCartItems);
    const count = keysArray.length;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const dateObj = new Date(dateString);
        return dateObj.toISOString().slice(0, 10);
    }

    const findProductImage = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.mainimage : '';
    };

    const findPrice = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.price : '';
    };

    const findTitle = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.title : '';
    };

    const findLayers = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.layercount : '';
    };

    const findTiers = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.tiercount : '';
    };

    const findColors = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.color : '';
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

    let totalamount = 0;
    const shipping = 500;

    const subtotal = (values) => {
        totalamount += values
    }

    const removeFromCart = (key) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: key,
                }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
            fetchInfo();

        } else {
            window.alert("Please Login!")
        }
    }

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
                                            // const price = findPrice(item.ItemID);
                                            const price = item.CustomData.customPrice > 0 ? item.CustomData.customPrice : findPrice(item.ItemID);
                                            const customPrice = item.CustomData.customPrice;
                                            const title = findTitle(item.ItemID);
                                            const layers = findLayers(item.ItemID);
                                            const tiers = findTiers(item.ItemID);
                                            const colors = findColors(item.ItemID);
                                            const totval = price * (quantities[key] || 1);
                                            const getTot = (val) => {
                                                subtotal(val);
                                                return val;
                                            }

                                            return (
                                                <tr key={key}>
                                                    <td><img src={imageUrl}
                                                        alt="Product-Image"
                                                        id='image' />
                                                    </td>
                                                    <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                                        <b>Product Title:</b> {title}<br />
                                                        {item.CustomData.customlayers === 'Default' ? (
                                                            <><b>Layers:</b> {layers}<br /></>
                                                        ) : (
                                                            <><b>Layers:</b> {item.CustomData.customlayers}<br /></>
                                                        )}
                                                        {item.CustomData.customtiers === 'Default' ? (
                                                            <><b>Tiers:</b> {tiers}<br /></>
                                                        ) : (
                                                            <><b>Tiers:</b> {item.CustomData.customtiers}<br /></>
                                                        )}
                                                        {item.CustomData.customcolor[0] === 'Default' ? (
                                                            <div style={
                                                                {
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                }
                                                            }>  <b>Colors:</b>
                                                                {Array.isArray(colors) ? colors.map((color, index) => (
                                                                    <div key={index} style={{
                                                                        backgroundColor: color,
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '4px',
                                                                    }}></div>
                                                                )) : (
                                                                    <div style={{
                                                                        backgroundColor: colors,
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '4px',
                                                                    }}></div>
                                                                )}<br />
                                                            </div>
                                                        ) : (
                                                            <div style={
                                                                {
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                }
                                                            }> <b>Colors:</b>
                                                                {Array.isArray(item.CustomData.customcolor) ? item.CustomData.customcolor.map((color, index) => (
                                                                    <div key={index} style={{
                                                                        backgroundColor: color,
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '4px',
                                                                    }}></div>
                                                                )) : (
                                                                    <div style={{
                                                                        backgroundColor: colors,
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '4px',
                                                                    }}></div>
                                                                )} <br />
                                                            </div>
                                                        )}
                                                        {item.CustomData.customflavor === 'Default' ? (
                                                            <></>
                                                        ) : (
                                                            <><b>Flavor:</b> {item.CustomData.customflavor}<br /></>
                                                        )}
                                                        <div className='cust notes' style={{ paddingTop: '10px' }}>
                                                            {item.CustomData.customwriting === 'Default' ? (
                                                                <></>
                                                            ) : (
                                                                <div style={{ width: '400px' }}>
                                                                    <b>Writings:</b> {item.CustomData.customwriting}<br /></div>
                                                            )}
                                                            {item.CustomData.customcomment === 'Default' ? (
                                                                <></>
                                                            ) : (
                                                                <div style={{ width: '400px' }}>
                                                                    <b>Comment:</b> {item.CustomData.customcomment}<br /></div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td><b>{price} LKR</b></td>
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
                                                    <td><b>
                                                        {getTot(totval)} LKR
                                                    </b></td>
                                                    <td style={{ paddingRight: '20px' }}>
                                                        <i id='dlt-mark'
                                                            className="fa-solid fa-circle-xmark"
                                                            onClick={() => { removeFromCart(key) }}>
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
                                    <h1 id='pricelbl'>{totalamount} LKR</h1>
                                </div>
                                <hr id='order-hr' />
                                <div className="promo-code">
                                    <h1 id='promolbl'>PROMO CODE</h1>
                                    <div className="promoinner">
                                        <input type="text" name="promo" id="promobox"
                                            value={promoInp}
                                            onChange={(e) => setPromoInp(e.target.value)} />
                                        <button id='applyBtn' onClick={() => { fetchCoupon(promoInp) }}>APPLY</button>
                                    </div>
                                </div>
                                {/* <hr id='order-hr' /> */}
                                <div className="shipping">
                                    <h1 id='shippinglbl'>SHIPPING</h1>
                                    <h1 id='shippingprice'>{shipping} LKR</h1>
                                </div>
                                <div className="shipping">
                                    <h1 id='shippinglbl'>PROMO</h1>
                                    {promPrice ? (
                                        <>
                                            <h1 id='shippingprice'>{- promPrice} LKR</h1>
                                        </>
                                    ) : (
                                        <>
                                            <h1 id='shippingprice'>0 LKR</h1>
                                        </>
                                    )}
                                </div>
                                <hr id='order-hr' />
                            </div>
                            <div className="right-bttom-bottomPane">
                                {/* <hr /> */}
                                <div className="total-price">
                                    <h1 id='totllbl'>TOTAL COST</h1>
                                    <h1 id='totlpricelbl'>{(totalamount + shipping - (promPrice || 0))} LKR</h1>
                                </div>
                                <Link to="/checkout" state={{ items: getCheckoutData(), checkoutAmount: (totalamount + shipping - (promPrice || 0)) }}>
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
