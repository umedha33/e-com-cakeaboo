import React, { useState, useEffect } from 'react'
import './UserDashboard.css'
import dummyOrders from '../Assets/dummy-orders'
import UserChat from '../UserChat/UserChat';

const UserDashboard = () => {
    const [activeHeader, setActiveHeader] = useState('MY ORDERS');
    const [orderList, setOrderList] = useState([]);
    const [alldaProducts, setAllProducts] = useState([]);
    const token = localStorage.getItem('auth-token');

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

    const fetchCartInfo = async () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                const response = await fetch('http://localhost:4000/getorderscust', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch the order data');
                }

                const result = await response.json();
                if (response.status === 200) {
                    setOrderList(result.userOrders);
                    console.log(`All orders:`, orderList);
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
        fetchCartInfo();
    }, [])


    const handleHeaderClick = (navItem) => {
        setActiveHeader(navItem);
    }

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

    const findFlavors = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.flavor : '';
    };

    const findImage = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.mainimage : '';
    };

    const findColors = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.color : [];
    };


    return (
        <div className='user-dashboard-container'>
            <div className='userdashboard-container'>
                <div className="userdash-header">
                    <div className="myorder-lbl">
                        <h1 onClick={() => handleHeaderClick('MY ORDERS')}
                            className={activeHeader === 'MY ORDERS' ? 'active' : ''}
                        >My Orders</h1>
                        <h1 onClick={() => handleHeaderClick('CHAT')}
                            className={activeHeader === 'CHAT' ? 'active' : ''}
                        >CHAT</h1>
                    </div>
                    <button onClick={() => {
                        localStorage.removeItem('auth-token');
                        window.location.replace('/userlogin');
                    }}
                        id='logoutBtn'>LOGOUT</button>
                </div>

                {activeHeader === 'MY ORDERS' && (
                    <div className="user-orders-container">
                        <table className='orders-body'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th id='clr-change' style={{ width: '35%', textAlign: 'left', paddingLeft: '20px', color: 'white' }}>Item Details</th>
                                    <th>Payed Amount</th>
                                    <th>Order Date</th>
                                    <th>Delivery Date</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.length > 0 ? orderList.map((order, index) => (
                                    <tr id='det-rows' key={index}>
                                        <td style={{ width: '5%' }}> <b>{order.orderID}</b></td>
                                        <td id='clr-change' style={{ width: '35%', textAlign: 'left', paddingLeft: '20px' }}>
                                            {order.orderOBJ.map((item, idx) => (
                                                <div className='item-details' key={idx}>
                                                    <div className="custom-details">
                                                        <div className="lft-img">
                                                            <img id='prodimges' src={findImage(item.itemId)} alt="product-image" />
                                                        </div>
                                                        <div className="detls-right">
                                                            {/* <br /> */}
                                                            <h3><b>Product Title:</b> {findTitle(item.itemId)}</h3>
                                                            {item.customData.customlayers === "Default" ? (
                                                                <>
                                                                    <h3><b>Layers:</b> {findLayers(item.itemId)}</h3>
                                                                </>
                                                            ) : (
                                                                <><h3>
                                                                    <b>Layers:</b> {item.customData.customlayers}
                                                                </h3></>
                                                            )}
                                                            {item.customData.customtiers === "Default" ? (
                                                                <>
                                                                    <h3><b>Tiers:</b> {findTiers(item.itemId)}</h3>
                                                                </>
                                                            ) : (
                                                                <><h3>
                                                                    <b>Tiers:</b> {item.customData.customtiers}
                                                                </h3></>
                                                            )}
                                                            {item.customData.customwriting === "Default" ? (
                                                                <></>
                                                            ) : (
                                                                <><h3>
                                                                    <b>Writing:</b> {item.customData.customwriting}
                                                                </h3></>
                                                            )}
                                                            {item.customData.customcomment === "Default" ? (
                                                                <></>
                                                            ) : (
                                                                <><h3>
                                                                    <b>Comment:</b> {item.customData.customcomment}
                                                                </h3></>
                                                            )}
                                                            {item.customData.customcolor[0] === "Default" ? (
                                                                <div className='color-s'><h3><b>Color:</b> </h3>
                                                                    {findColors.length > 0 ? (
                                                                        <>
                                                                            {findColors(item.itemId).map((color, index) => (
                                                                                <div key={index} style={{
                                                                                    backgroundColor: color,
                                                                                    width: '20px',
                                                                                    height: '20px',
                                                                                    borderRadius: '4px',
                                                                                }}></div>
                                                                            ))}
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className='color-s'><h3><b>Color:</b> </h3>
                                                                    {item.customData.customcolor.map((color, index) => (
                                                                        <div key={index} style={{
                                                                            backgroundColor: color,
                                                                            width: '20px',
                                                                            height: '20px',
                                                                            borderRadius: '4px',
                                                                        }}></div>
                                                                    ))}</div>
                                                            )
                                                            }
                                                            {item.customData.customflavor === "Default" ? (
                                                                <>
                                                                    <h3><b>Flavor:</b> {findFlavors(item.itemId)}</h3>
                                                                </>
                                                            ) : (
                                                                <><h3>
                                                                    <b>Flavor:</b> {item.customData.customflavor}
                                                                </h3></>
                                                            )}
                                                            <h3><b>Quantity:</b> {item.quantity}</h3>
                                                            <h3><b>Total Amount:</b> {item.customData.customPrice ? item.customData.customPrice : item.totalAmount} LKR</h3>
                                                            {/* <br /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                        <td style={{ width: '10%' }}>
                                            <b> {order.checkoutAmount} LKR</b>
                                        </td>
                                        <td style={{ width: '10%' }}><b>{new Date(order.orderDate).toLocaleDateString()}</b></td>
                                        <td style={{ width: '10%' }}><b>{new Date(order.deliverDate).toLocaleDateString()}</b></td>
                                        <td style={{ width: '10%' }}><b>{order.orderStatus}</b></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5">No Orders Found...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeHeader === 'CHAT' && (
                    <UserChat />
                )}
            </div>
        </div>
    )
}

export default UserDashboard
