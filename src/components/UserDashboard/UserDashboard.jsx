import React from 'react'
import './UserDashboard.css'
import dummyOrders from '../Assets/dummy-orders'

const UserDashboard = () => {
    return (
        <div className='userdashboard-container'>
            <div className="userdash-header">
                <h1 id='myorder-lbl'>My Orders ›</h1>
                <button id='logoutBtn'>LOGOUT</button>
            </div>
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
        </div>
    )
}

export default UserDashboard
