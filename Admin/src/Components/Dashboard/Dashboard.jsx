import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Dashboard.css';
import MostSellingChart from '../MostSellingChart/MostSellingChart';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [productChartData, setProductChartData] = useState({});
    const [orderChartData, setOrderChartData] = useState({});
    const [userRegistrationChartData, setUserRegistrationChartData] = useState({});

    useEffect(() => {
        fetchProductData();
        fetchOrderData();
        fetchUserRegistrationData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/allproducts');
            const products = response.data.allProducts;

            const productCounts = getProductCountsByMonth(products);
            const lastFourMonths = getLastFourMonths(productCounts);

            const labels = Object.keys(lastFourMonths);
            const data = {
                labels,
                datasets: [
                    {
                        label: 'Total Products Added',
                        data: Object.values(lastFourMonths),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            };
            setProductChartData(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const fetchOrderData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/allorders');
            const orders = response.data.allOrders;

            const orderCounts = getOrderCountsByMonth(orders);
            const lastFourMonths = getLastFourMonths(orderCounts);

            const labels = Object.keys(lastFourMonths);
            const data = {
                labels,
                datasets: [
                    {
                        label: 'Total Orders Received',
                        data: Object.values(lastFourMonths),
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            };
            setOrderChartData(data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    const fetchUserRegistrationData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getAllUsers');
            const users = response.data.users;

            const userCounts = getUserCountsByMonth(users);
            const lastThreeMonths = getLastThreeMonths(userCounts);

            const labels = Object.keys(lastThreeMonths);
            const data = {
                labels,
                datasets: [
                    {
                        label: 'User Registrations',
                        data: Object.values(lastThreeMonths),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            };
            setUserRegistrationChartData(data);
        } catch (error) {
            console.error('Error fetching user registration data:', error);
        }
    };

    const getProductCountsByMonth = (items) => {
        const counts = {};
        items.forEach(item => {
            const month = new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
            counts[month] = (counts[month] || 0) + 1;
        });
        return counts;
    };

    const getOrderCountsByMonth = (items) => {
        const counts = {};
        items.forEach(item => {
            const month = new Date(item.orderDate).toLocaleString('default', { month: 'short', year: 'numeric' });
            counts[month] = (counts[month] || 0) + 1;
        });
        return counts;
    };

    const getUserCountsByMonth = (users) => {
        const counts = {};
        users.forEach(user => {
            const month = new Date(user.date).toLocaleString('default', { month: 'short', year: 'numeric' });
            counts[month] = (counts[month] || 0) + 1;
        });
        return counts;
    };

    const getLastFourMonths = (counts) => {
        const currentMonth = new Date();
        const lastFourMonths = {};
        for (let i = 0; i < 4; i++) {
            const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - i);
            const monthLabel = month.toLocaleString('default', { month: 'short', year: 'numeric' });
            lastFourMonths[monthLabel] = counts[monthLabel] || 0;
        }
        return lastFourMonths;
    };

    const getLastThreeMonths = (counts) => {
        const currentMonth = new Date();
        const lastThreeMonths = {};
        for (let i = 0; i < 3; i++) {
            const month = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - i);
            const monthLabel = month.toLocaleString('default', { month: 'short', year: 'numeric' });
            lastThreeMonths[monthLabel] = counts[monthLabel] || 0;
        }
        return lastThreeMonths;
    };

    return (
        <div className='dashboard-container'>
            <div className="chart-container totalproducts-chart">
                {productChartData && productChartData.labels && (
                    <Bar
                        data={productChartData}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                )}
            </div>
            <div className="chart-container totalorders-chart">
                {orderChartData && orderChartData.labels && (
                    <Bar
                        data={orderChartData}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                )}
            </div>
            <div className="chart-container countofuserregisterations-chart">
                {userRegistrationChartData && userRegistrationChartData.labels && (
                    <Bar
                        data={userRegistrationChartData}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                )}
            </div>
            <div className="chart-container countofuserregisterations-chart">
                <MostSellingChart />
            </div>
        </div>
    );
};

export default Dashboard;
