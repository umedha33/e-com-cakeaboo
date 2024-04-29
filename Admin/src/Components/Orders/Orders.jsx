import React, { useState, useEffect } from 'react'
import './Orders.css'
import dummyAdminOrders from '../Assets/dummyAdmin-orders'
import OrderCard from './../OrderCard/OrderCard';
import Calendar from '../Calendar/Calendar';

const Orders = () => {
    const [activeHeader, setActiveHeader] = useState('ORDER LIST');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [alldaOrders, setAllOrders] = useState([]);
    const [alldaProducts, setAllProducts] = useState([]);

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
        await fetch('http://localhost:4000/allorders')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.allOrders)) {
                    setAllOrders(data.allOrders);
                    // console.log(`Orders: `, alldaOrders);
                } else {
                    console.log("data.allOrders is not an array, it is a:", typeof data.allOrders);
                }
            });
    }

    useEffect(() => {
        fetchProducts();
        fetchInfo();
    }, [])


    const handleHeaderClick = (navItem) => {
        setActiveHeader(navItem);
        setShowPopup(false);
    }

    const handleRowClick = (order, item) => {
        const detailedOrder = {
            ...order,
            selectedItem: item
        };
        setSelectedOrder(detailedOrder);
        setShowPopup(true);
    };


    const isDefaultOrder = (customData) => {
        return Object.values(customData).some(value => {
            if (Array.isArray(value)) {
                return value.some(subValue => subValue !== "Default");
            }
            return value !== "Default";
        });
    }

    const prodTitle = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.title : '';
    }

    const findImage = (itemId) => {
        const product = alldaProducts.find(product => product.id === itemId);
        return product ? product.mainimage : '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    }

    const Popup = () => {
        setShowPopup(false);
        fetchProducts();
        fetchInfo();
    }

    return (
        <div className='orders-container'>
            <div className="orders-nav">
                <h1 onClick={() => handleHeaderClick('ORDER LIST')}
                    className={activeHeader === 'ORDER LIST' ? 'active-head' : ''}
                >ORDER LIST</h1>
                <h1 onClick={() => handleHeaderClick('CALENDAR')}
                    className={activeHeader === 'CALENDAR' ? 'active-head' : ''}
                >CALENDAR</h1>
            </div>

            {activeHeader === 'ORDER LIST' && (
                <div className="orderlist">
                    <table className='orders-body'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IMAGE</th>
                                <th>CUSTOMIZATION</th>
                                <th style={{ textAlign: 'left', paddingLeft: '20px' }}>TITLE</th>
                                <th>ORDER DATE</th>
                                <th>DELIVERY DATE</th>
                                <th>PAID AMOUNT</th>
                                <th>CUSTOMER NAME</th>
                                <th>ORDER STATUS</th>
                            </tr>
                        </thead>


                        <tbody>
                            {alldaOrders.length > 0 ? (
                                <>
                                    {alldaOrders.flatMap(order =>
                                        order.orderOBJ.map((item, index) => (
                                            <tr key={`${order._id}-${index}`} onClick={() => handleRowClick(order, item)}>
                                                <td style={{ width: '3%' }}>{order.orderID}</td>
                                                <td style={{ width: '7%' }}><img
                                                    src={findImage(item.itemId)}
                                                    alt="Product Image"
                                                    id='image'
                                                /></td>
                                                <td className={item.customData && !isDefaultOrder(item.customData) ? 'default-order' : 'custom-order'}>
                                                    {item.customData && !isDefaultOrder(item.customData) ? "DEFAULT" : "CUSTOM"}
                                                </td>
                                                <td style={{ textAlign: 'left', paddingLeft: '20px' }}>{prodTitle(item.itemId)}</td>
                                                <td>{formatDate(order.orderDate)}</td>
                                                <td id='delv-date' style={{ fontWeight: 'bold' }}>{formatDate(order.deliverDate)}</td>
                                                <td style={{ fontWeight: 'bold' }}>{order.checkoutAmount} LKR</td>
                                                <td id='custName' style={{ fontWeight: 'bold' }}>{order.custName}</td>
                                                <td>{order.orderStatus}</td>
                                            </tr>
                                        ))
                                    )}
                                </>
                            ) : (
                                <><h3>No Orders...</h3></>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {activeHeader === 'CALENDAR' && (
                <div className="calendar">
                    <Calendar />
                </div>
            )}
            {showPopup && selectedOrder && (
                <div className="popup">
                    <OrderCard selectedOrder={selectedOrder} />
                    <button onClick={() => Popup()}>Close</button>
                </div>
            )}
        </div>
    )
}

export default Orders
