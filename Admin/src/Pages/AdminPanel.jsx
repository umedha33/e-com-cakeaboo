import React, { useState } from 'react';
import './CSS/AdminPanel.css'
import SideBar from '../Components/SideBar/SideBar'
import Dashboard from '../Components/Dashboard/Dashboard'
import Products from '../Components/Products/Products';
import Orders from '../Components/Orders/Orders';
import Customers from '../Components/Customers/Customers';
import Coupons from '../Components/Coupons/Coupons';

const AdminPanel = () => {

    const [activeComponent, setActiveComponent] = useState('Dashboard');

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    }

    return (
        <div className='adminpanel-container'>
            <SideBar active={activeComponent} onComponentSelect={handleComponentChange} />
            {activeComponent === 'Dashboard' && <Dashboard />}
            {activeComponent === 'Products' && <Products />}
            {activeComponent === 'Orders' && <Orders />}
            {activeComponent === 'Customers' && <Customers />}
            {activeComponent === 'Coupons' && <Coupons />}
        </div>
    )
}

export default AdminPanel
