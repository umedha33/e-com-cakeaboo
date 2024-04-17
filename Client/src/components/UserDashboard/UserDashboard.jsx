import React, { useState } from 'react'
import './UserDashboard.css'
import dummyOrders from '../Assets/dummy-orders'

const UserDashboard = () => {
    const [activeHeader, setActiveHeader] = useState('MY ORDERS');

    const handleHeaderClick = (navItem) => {
        setActiveHeader(navItem);
    }

    return (
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
                <button id='logoutBtn'>LOGOUT</button>
            </div>

            {activeHeader === 'MY ORDERS' && (
                <div className="user-orders-container">
                    <table className='orders-body'>
                        <tbody>
                            {dummyOrders.map((order, index) => (
                                <tr key={index}>
                                    <td style={{ width: '10%' }}><img
                                        src={order.imageUrl}
                                        alt="Product Image"
                                        id='image' /></td>
                                    <td style={{ width: '35%', textAlign: 'left', paddingLeft: '20px' }}>{order.details}</td>
                                    <td style={{ width: '15%' }}>Quantity: <br /> <span>{order.quantity}</span></td>
                                    <td style={{ width: '15%' }}>Paid Amount: <br /> <span>{(order.price).toFixed(2)}LKR</span></td>
                                    <td style={{ width: '15%' }}>Delivery Date: <br /> <span>{order.deliveryDate}</span></td>
                                    <td style={{ width: '15%' }}>Order Status: <br /> <span>{order.orderStatus}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeHeader === 'CHAT' && (
                <div className="user-chat-container">
                    <div className="chat-instructions">
                        <h1>Chat instructions and policies</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sapiente cupiditate aliquid veniam vero perspiciatis, libero possimus laudantium impedit explicabo dignissimos, minus obcaecati earum beatae, in quia error cumque! Quas.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sapiente cupiditate aliquid veniam vero perspiciatis, libero possimus laudantium impedit explicabo dignissimos, minus obcaecati earum beatae, in quia error cumque! Quas.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sapiente cupiditate aliquid veniam vero perspiciatis, libero possimus laudantium impedit explicabo dignissimos, minus obcaecati earum beatae, in quia error cumque! Quas.</p>
                    </div>
                    <div className="cht-body">
                        <h1>Chat with Cake A Boo</h1>
                        <div className="msg-body">
                            <div className="chat-threads">
                                <div className="sender-side">
                                    <p id='sender-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
                                </div>
                                <div className="user-side">
                                    <p id='user-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
                                    <p id='user-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error corrupti.</p>
                                </div>
                                <div className="sender-side">
                                    <p id='sender-msg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta adipisicing elit. Perferendis officia ad dicta error</p>
                                </div>
                                <div className="user-side">
                                    <p id='user-msg'>Perferendis officia ad dicta error corrupti.</p>
                                </div>
                                <div className="sender-side">
                                    <p id='sender-msg'>consectetur adipisicing elit. Perferendis officia ad dicta error corrupti dolor sit amet, consectetur adipisicing elit. Perferendis officia ad dicta error</p>
                                </div>
                            </div>
                            <div className="text-sender">
                                <input type="text" name="message-txt" id="message-txt" placeholder='Enter message' />
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="file-input" className="file-label">
                                    <i className="fa-solid fa-file"></i>
                                </label>
                                <i class="fa-solid fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserDashboard
