import React from 'react'
import './CSS/CartPage.css'
import cartDummy from './../components/Assets/cart-products-dummy'

const CartPage = () => {
    return (
        <div className='cart-page-container'>

            <div className="cart-left-panel">
                <div className="left-top">
                    <h1 id='mycart-txt'>My Cart</h1>
                    <h1 id='items-count'>{4} Items</h1>
                </div>
                <hr />
                <div className="left-bottom">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th style={{ textAlign: 'left', paddingLeft: '20px' }}>Product Details</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDummy.map((cartDum, index) => (
                                <tr key={index}>
                                    <td style={{ width: '10%' }}><img
                                        src={cartDum.imageUrl}
                                        alt="Product Image"
                                        id='image' /></td>
                                    <td style={{ width: '45%', textAlign: 'left', paddingLeft: '20px' }}>{cartDum.details}</td>
                                    <td style={{ width: '15%' }}>
                                        <div className="qty-input">
                                            <i class="fa-solid fa-minus pm-icons"></i>
                                            <input type="number" id='qty' value={cartDum.quantity} />
                                            <i class="fa-solid fa-plus pm-icons"></i>
                                        </div>
                                    </td>
                                    <td style={{ width: '15%' }}>{(cartDum.price).toFixed(2)} LKR</td>
                                    <td style={{ width: '15%' }}>{cartDum.totalPrice} LKR</td>
                                </tr>
                            ))}
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
                            <h1 id='itemslbl'>ITEMS {4}</h1>
                            <h1 id='pricelbl'>{15400} LKR</h1>
                        </div>
                        <hr id='order-hr' />
                        <div className="promo-code">
                            <h1 id='promolbl'>PROMO CODE</h1>
                            <div className="promoinner">
                                <input type="text" name="promo" id="promobox" />
                                <button id='applyBtn'>APPLY</button>
                            </div>
                        </div>
                        {/* <hr id='order-hr' /> */}
                        <div className="shipping">
                            <h1 id='shippinglbl'>SHIPPING</h1>
                            <h1 id='shippingprice'>{500} LKR</h1>
                        </div>
                        <hr id='order-hr' />
                    </div>
                    <div className="right-bttom-bottomPane">
                        {/* <hr /> */}
                        <div className="total-price">
                            <h1 id='totllbl'>TOTAL COST</h1>
                            <h1 id='totlpricelbl'>{15890} LKR</h1>
                        </div>
                        <button id='checkoutBtn'>CHECKOUT</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartPage
