import React, { useEffect, useState } from 'react'
import './OrderCard.css'

const OrderCard = ({ selectedOrder }) => {
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

    useEffect(() => {
        fetchProducts();
        console.log(`Received: `, selectedOrder);
    }, [])

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

    const isDefaultOrder = (customData) => {
        return Object.values(customData).some(value => {
            if (Array.isArray(value)) {
                return value.some(subValue => subValue === "Default");
            }
            return value === "Default";
        });
    }

    const handleStatusChange = async (newStatus) => {
        const response = await fetch('http://localhost:4000/updateOrderStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderID: selectedOrder.orderID, newStatus })
        });

        const data = await response.json();
        if (data.success) {
            // window.location.reload();
        } else {
            console.error("Failed to update order status:", data.message);
        }
    };


    return (
        <div className='ordercard-container'>
            <h2>Order Details</h2>

            <div className="order-info">
                <div className="maininf">
                    <p><strong>Order ID:</strong> {selectedOrder.orderID}</p>
                    <p><strong>Order Title:</strong> {prodTitle(selectedOrder.selectedItem.itemId)}</p>
                    <p><strong>Customization:</strong>{selectedOrder.selectedItem.customData && !isDefaultOrder(selectedOrder.selectedItem.customData) ? " Custom" : " Default"}</p>
                    <div className='status-row'>
                        <p><strong>Status:</strong></p>
                        <select name="status" id="status" value={selectedOrder.orderStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                            <option style={{ color: 'red' }} disabled selected>{selectedOrder.orderStatus}</option>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Processing">Processing</option>
                            <option value="Ready">Ready</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>

                <div className="card-body">
                    <div className="crdb-left-col">
                        <img src={findImage(selectedOrder.selectedItem.itemId)} alt="Item Image" />
                    </div>
                    <div className="order-right-col">
                        <div className="all-info">
                            <p><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                            <p><strong>Delivery Date:</strong> {formatDate(selectedOrder.deliverDate)}</p>
                            <p><strong>Quantity:</strong> {selectedOrder.selectedItem.quantity}</p>
                            <div className="variations">
                                <div className="layer-tier">
                                    <p><strong>Layer Count: </strong> {selectedOrder.selectedItem.customData.customlayers}</p>
                                    |
                                    <p><strong>Tier Count: </strong> {selectedOrder.selectedItem.customData.customtiers}</p>
                                </div>
                                <div className="color-set">
                                    <p><strong>Color:</strong></p>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}>
                                        {selectedOrder.selectedItem.customData.customcolor[0] !== 'Default' ? (
                                            <>
                                                {Array.isArray(selectedOrder.selectedItem.customData.customcolor) ? selectedOrder.selectedItem.customData.customcolor.map((color, index) => (
                                                    <div key={index} style={{
                                                        backgroundColor: color,
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '4px',
                                                    }}></div>
                                                )) : (
                                                    <div style={{
                                                        backgroundColor: selectedOrder.selectedItem.customData.customcolor,
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '4px',
                                                    }}></div>
                                                )}
                                            </>
                                        ) : (
                                            <><p style={{ marginLeft: '-10px' }}>Default</p></>
                                        )}

                                    </div>
                                </div>
                                <p><strong>Flavor:</strong> {selectedOrder.selectedItem.customData.customflavor}</p>
                                <p><strong>Writing:</strong> {selectedOrder.selectedItem.customData.customwriting || "No writings"}</p>
                                <p><strong>Comments:</strong> {selectedOrder.selectedItem.customData.customcomment || "No comments"}</p>

                            </div>
                            <p style={{ textTransform: 'capitalize' }}><strong>Customer Name:</strong> {selectedOrder.custName}</p>
                            <p><strong>Email Address:</strong> {selectedOrder.custEmail}</p>
                            <p><strong>Customer Contact:</strong> {selectedOrder.custPhone}</p>
                            <p style={{ textTransform: 'capitalize' }}><strong>Deliver Address:</strong> {selectedOrder.custAddress}</p>
                            <div className='dlvr-locs'>
                                <p style={{ textTransform: 'capitalize' }}><strong>City: </strong> {selectedOrder.custCity}</p>
                                |
                                <p style={{ textTransform: 'capitalize' }}><strong>Province:</strong> {selectedOrder.custProvince}</p>
                                |
                                <p><strong>Postal Code:</strong> {selectedOrder.custPostal}</p>
                            </div>
                            <p><strong>Customer Note:</strong> {selectedOrder.custAddNotes || "None"}</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default OrderCard
