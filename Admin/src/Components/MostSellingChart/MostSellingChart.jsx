import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './MostSellingChart.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MostSellingChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                const ordersRes = await axios.get('http://localhost:4000/allorders');
                const allOrdersResponse = ordersRes.data;

                // console.log('Full orders response:', allOrdersResponse);

                let allOrders = [];
                if (Array.isArray(allOrdersResponse)) {
                    allOrders = allOrdersResponse;
                } else if (Array.isArray(allOrdersResponse.allOrders)) {
                    allOrders = allOrdersResponse.allOrders;
                } else {
                    throw new TypeError('Expected orders to be an array');
                }

                // console.log('Orders:', allOrders);

                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                const monthlyOrders = allOrders.filter(order => {
                    const orderDate = new Date(order.orderDate);
                    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                });

                const productCount = {};
                monthlyOrders.forEach(order => {
                    if (order.orderOBJ && Array.isArray(order.orderOBJ)) {
                        order.orderOBJ.forEach(item => {
                            if (productCount[item.itemId]) {
                                productCount[item.itemId]++;
                            } else {
                                productCount[item.itemId] = 1;
                            }
                        });
                    }
                });

                const productsRes = await axios.get('http://localhost:4000/allproducts');
                const allProductsResponse = productsRes.data;

                console.log('Full products response:', allProductsResponse);

                let allProducts = [];
                if (Array.isArray(allProductsResponse)) {
                    allProducts = allProductsResponse;
                } else if (Array.isArray(allProductsResponse.allProducts)) {
                    allProducts = allProductsResponse.allProducts;
                } else {
                    throw new TypeError('Expected products to be an array');
                }

                console.log('Products:', allProducts);

                const labels = [];
                const data = [];
                for (let productId in productCount) {
                    const product = allProducts.find(p => p.id === parseInt(productId));
                    if (product) {
                        labels.push(product.title);
                        data.push(productCount[productId]);
                    }
                }

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Most Sold Items',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }],
                });
                setLoading(false);

            } catch (error) {
                console.error("Error fetching orders and products:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrdersAndProducts();
    }, []);

    if (loading) {
        return <div className='mostselling-container'>Loading...</div>;
    }

    if (error) {
        return <div className='mostselling-container'>Error: {error}</div>;
    }

    return (
        <div className='mostselling-container'>
            <Pie data={chartData} />
        </div>
    );
};

export default MostSellingChart;
