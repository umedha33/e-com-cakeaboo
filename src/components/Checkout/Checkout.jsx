import React from 'react'
import './Checkout.css'

const Checkout = () => {
    return (
        <div className='checkout-container'>
            <div className="checkout-form-container">
                <h1>Checkout</h1>

                <div className="delivery-sec">
                    <div className='name-number'>
                        <div>
                            <label htmlFor="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="fullName" placeholder="Nihal Kariyawasam" required />
                        </div>
                        <div>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input type="text" id="mobileNumber" name="mobileNumber" placeholder="071 234 5678" required />
                        </div>
                    </div>
                    <div className='email-city'>
                        <div>
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" id="email" name="email" placeholder="nihal@gmail.com" required />
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" placeholder="Kandy" required />
                        </div>
                    </div>
                    <div className='province-postal'>
                        <div>
                            <label htmlFor="province">Province:</label>
                            <input type="text" id="province" name="province" placeholder="Central" required />
                        </div>
                        <div>
                            <label htmlFor="postal">Postal Code:</label>
                            <input type="text" id="postal" name="postal" placeholder="Enter your ZIP code" required />
                        </div>
                    </div>
                    <div className='shippingad'>
                        <label htmlFor="address">Shipping Address:</label>
                        <input type="text" id="address" name="address" placeholder="170/B Heerassagala Kandy" required />
                    </div>
                </div>

                <div className="scheduledate-sec">
                    <div className='delivery-calendar'>
                        <label htmlFor="deliverydate">Get Delivered By:</label>
                        <input type="date" id="deliverydate" name="deliverydate" required />
                    </div>
                    <div className='order-notes'>
                        <label htmlFor="ordernotes">Additional Order Notes:</label>
                        <textarea name="ordernotes" id="ordernotes" placeholder='Provide additional order notes here...' cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className='place-order'>
                    <button type="submit" id='place-order-btn'>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
