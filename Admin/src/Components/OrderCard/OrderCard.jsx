import React from 'react'
import './OrderCard.css'

const OrderCard = ({ order }) => {
    return (
        <div className='ordercard-container'>
            <h2>Order Details</h2>
            <div className="order-info">
                <div className="maininf">
                    <p><strong>Order ID:</strong> {order.orderID}</p>
                    <p><strong>Order Title:</strong> {order.orderTitle}</p>
                    <p><strong>Customization:</strong> {order.isCustom ? "Custom" : "Default"}</p>
                    <div className='status-row'>
                        <p><strong>Status:</strong></p>
                        <select name="status" id="status" >
                            <option value="" disabled selected>{order.orderStatus}</option>
                            <option value="order-placed">Order Placed</option>
                            <option value="accepted">Accepted</option>
                            <option value="processing">Processing</option>
                            <option value="ready">Ready</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </div>

                <div className="card-body">
                    <div className="left-col">
                        <img src={order.imageUrl} alt="order-image" />
                    </div>
                    <div className="right-col">
                        <div className="all-info">
                            <p><strong>Order Date:</strong> {order.orderDate}</p>
                            <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <div className="variations">
                                <div className="layer-tier">
                                    <p><strong>Layer Count: </strong> {order.layerCount}</p>
                                    <p><strong>Tier Count: </strong> {order.tierCount}</p>
                                </div>
                                <div className="color-set">
                                    <p><strong>Color:</strong></p>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}>
                                        {Array.isArray(order.color) ? order.color.map((color, index) => (
                                            <div key={index} style={{
                                                backgroundColor: color,
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '4px',
                                            }}></div>
                                        )) : (
                                            <div style={{
                                                backgroundColor: order.color,
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '4px',
                                            }}></div>
                                        )}
                                    </div>
                                </div>
                                <p><strong>Flavor:</strong> {order.flavor}</p>
                                <p><strong>Writing:</strong> {order.writing || "No writings"}</p>
                                <p><strong>Comments:</strong> {order.comment || "No comments"}</p>

                            </div>
                            <p><strong>Customer Name:</strong> {order.custName}</p>
                            <p><strong>Customer Phone:</strong> {order.custPhone}</p>
                            <p><strong>Address:</strong> {order.custAddress}</p>
                            <p><strong>Phone:</strong> {order.custPhone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
