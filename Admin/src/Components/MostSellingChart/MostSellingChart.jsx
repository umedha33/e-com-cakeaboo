import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './MostSellingChart.css';

const MostSellingChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                // Fetch orders
                const ordersRes = await axios.get('http://localhost:4000/allorders');
                const allOrders = ordersRes.data.allOrders;

                // Get the current month
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                // Filter orders for the current month
                const monthlyOrders = allOrders.filter(order => {
                    const orderDate = new Date(order.orderDate);
                    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                });

                // Count occurrences of each product ID
                const productCount = {};
                monthlyOrders.forEach(order => {
                    order.orderOBJ.items.forEach(item => {
                        if (productCount[item.id]) {
                            productCount[item.id]++;
                        } else {
                            productCount[item.id] = 1;
                        }
                    });
                });

                // Fetch products
                const productsRes = await axios.get('http://localhost:4000/allproducts');
                const allProducts = productsRes.data.allProducts;

                // Prepare data for the chart
                const labels = [];
                const data = [];
                for (let productId in productCount) {
                    const product = allProducts.find(p => p.id === parseInt(productId));
                    if (product) {
                        labels.push(product.title);
                        data.push(productCount[productId]);
                    }
                }

                // Set chart data
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

            } catch (error) {
                console.error("Error fetching orders and products:", error);
            }
        };

        fetchOrdersAndProducts();
    }, []);

    return (
        <div className='mostselling-container'>
            {chartData.labels ? <Pie data={chartData} /> : 'Loading...'}
        </div>
    );
};

export default MostSellingChart;
