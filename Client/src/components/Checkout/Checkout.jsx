import React, { useState } from 'react'
import './Checkout.css'
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { items } = location.state;
    const { checkoutAmount } = location.state;
    const passAmount = checkoutAmount;
    // const orderOBJ = items;
    // console.log(`Items received:`, items);
    // console.log(`Amount:`, checkoutAmount);

    // Initial state for userData
    const [userData, setUserData] = useState({
        custName: '',
        custPhone: '',
        custEmail: '',
        custCity: '',
        custProvince: '',
        custPostal: '',
        custAddress: '',
        deliverDate: '',
        custAddNotes: ''
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const dataPass = () => {
        const orderOBJ = items;
        const deliverDate = userData.deliverDate;
        const custName = userData.custName;
        const custPhone = userData.custPhone;
        const custEmail = userData.custEmail;
        const custCity = userData.custCity;
        const custProvince = userData.custProvince;
        const custPostal = userData.custPostal;
        const custAddress = userData.custAddress;
        const custAddNotes = userData.custAddNotes;
        const checkoutAmount = passAmount;

        addOrder(orderOBJ, deliverDate, custName, custPhone, custEmail, custCity, custProvince, custPostal, custAddress, custAddNotes, checkoutAmount);
    }

    const addOrder = (orderOBJ, deliverDate, custName, custPhone, custEmail, custCity, custProvince, custPostal, custAddress, custAddNotes, checkoutAmount) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addorder', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderOBJ: orderOBJ,
                    deliverDate: deliverDate,
                    custName: custName,
                    custPhone: custPhone,
                    custEmail: custEmail,
                    custCity: custCity,
                    custProvince: custProvince,
                    custPostal: custPostal,
                    custAddress: custAddress,
                    custAddNotes: custAddNotes,
                    checkoutAmount: checkoutAmount,
                }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })

        } else {
            window.alert("Please Login!")
        }
    }

    return (
        <div className='checkout-container'>
            <div className="checkout-form-container">
                <h1>Checkout</h1>

                <div className="delivery-sec">
                    <div className='name-number'>
                        <div>
                            <label htmlFor="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="custName" placeholder="Nihal Kariyawasam"
                                required value={userData.custName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input type="text" id="mobileNumber" name="custPhone" placeholder="071 234 5678"
                                required value={userData.custPhone} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='email-city'>
                        <div>
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" id="email" name="custEmail" placeholder="nihal@gmail.com"
                                required value={userData.custEmail} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="custCity" placeholder="Kandy"
                                required value={userData.custCity} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='province-postal'>
                        <div>
                            <label htmlFor="province">Province:</label>
                            <input type="text" id="province" name="custProvince" placeholder="Central"
                                required value={userData.custProvince} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="postal">Postal Code:</label>
                            <input type="text" id="postal" name="custPostal" placeholder="Enter your ZIP code"
                                required value={userData.custPostal} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='shippingad'>
                        <label htmlFor="address">Shipping Address:</label>
                        <input type="text" id="address" name="custAddress" placeholder="170/B Heerassagala Kandy"
                            required value={userData.custAddress} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="scheduledate-sec">
                    <div className='delivery-calendar'>
                        <label htmlFor="deliverydate">Get Delivered By:</label>
                        <input type="date" id="deliverydate" name="deliverDate"
                            required value={userData.deliverDate} onChange={handleInputChange} />
                    </div>
                    <div className='order-notes'>
                        <label htmlFor="ordernotes">Additional Order Notes:</label>
                        <textarea name="custAddNotes"
                            id="ordernotes" placeholder='Provide additional order notes here...' cols="30" rows="10"
                            value={userData.custAddNotes} onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                <div className='place-order'>
                    <button type="submit"
                        id='place-order-btn'
                        onClick={() => { dataPass() }}
                    >Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
