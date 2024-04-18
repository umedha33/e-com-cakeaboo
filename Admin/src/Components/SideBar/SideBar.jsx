import React from 'react'
import './SideBar.css'

const SideBar = ({ active, onComponentSelect }) => {
    return (
        <div className='siderbar-container'>
            <div>
                <h1 onClick={() => onComponentSelect('Dashboard')}
                    className={active === 'Dashboard' ? 'active' : ''}>
                    Dashboard
                </h1>
                <h1 onClick={() => onComponentSelect('Products')}
                    className={active === 'Products' ? 'active' : ''}>
                    Products
                </h1>
                <h1 onClick={() => onComponentSelect('Orders')}
                    className={active === 'Orders' ? 'active' : ''}>
                    Orders
                </h1>
                <h1 onClick={() => onComponentSelect('Coupons')}
                    className={active === 'Coupons' ? 'active' : ''}>
                    Coupons
                </h1>
                <h1 onClick={() => onComponentSelect('Customers')}
                    className={active === 'Customers' ? 'active' : ''}>
                    Customer Chats
                </h1>
            </div>
            <div className="bottom-sec">
                <button id='logoutBtn'>LOGOUT</button>
            </div>
        </div>
    )
}

export default SideBar
