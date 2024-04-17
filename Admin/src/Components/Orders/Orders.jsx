import React, { useState } from 'react'
import './Orders.css'
import dummyAdminOrders from '../Assets/dummyAdmin-orders'
import OrderCard from './../OrderCard/OrderCard';

const Orders = () => {
    const [activeHeader, setActiveHeader] = useState('ORDER LIST');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleHeaderClick = (navItem) => {
        setActiveHeader(navItem);
        setShowPopup(false); // Close popup if open when switching tabs
    }

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        setShowPopup(true); // Show popup when a row is clicked
    };

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
                                <th>CUSTOMER NAME</th>
                                <th>ORDER STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyAdminOrders.map((order, index) => (
                                <tr key={index} onClick={() => handleRowClick(order)}>
                                    <td style={{ width: '3%' }}>{order.orderID}</td>
                                    <td style={{ width: '7%' }}><img
                                        src={order.imageUrl}
                                        alt="Product Image"
                                        id='image' /></td>
                                    <td className={order.isCustom ? 'custom-order' : 'default-order'}>
                                        {order.isCustom ? "CUSTOM" : "DEFAULT"}
                                    </td>
                                    <td style={{ textAlign: 'left', paddingLeft: '20px' }}>{order.orderTitle}</td>
                                    <td>{order.orderDate}</td>
                                    <td id='delv-date' style={{ fontWeight: 'bold' }}>{order.deliveryDate}</td>
                                    <td id='custName' style={{ fontWeight: 'bold' }}>{order.custName}</td>
                                    <td>{order.orderStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeHeader === 'CALENDAR' && (
                <div className="calendar">
                    <h1>hello calendar</h1>
                </div>
            )}
            {showPopup && selectedOrder && (
                <div className="popup">
                    <OrderCard order={selectedOrder} />
                    <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
            )}
        </div>
    )
}

export default Orders
