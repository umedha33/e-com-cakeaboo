import React, { useEffect, useState } from 'react'
import './Products.css'
import AddProducts from '../AddProducts/AddProducts';


const Products = () => {
    const [activeHeader, setActiveHeader] = useState('PRODUCT LIST');

    const [alldaProducts, setAllProducts] = useState([]);
    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.allProducts)) {
                    // console.log("data.allProducts is an array");
                    setAllProducts(data.allProducts);
                } else {
                    console.log("data.allProducts is not an array, it is a:", typeof data.allProducts);
                }
            });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    // useEffect(() => {
    //     if (alldaProducts.length > 0) {
    //         console.log(`meka thma state eka after update`, alldaProducts);
    //     }
    // }, [alldaProducts]);

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }


    const handleHeaderClick = (navItem) => {
        setActiveHeader(navItem);
        if (navItem === 'PRODUCT LIST') {
            fetchInfo();
        }
    }

    return (
        <div className='products-container'>
            <div className="products-nav">
                <h1 onClick={() => handleHeaderClick('PRODUCT LIST')}
                    className={activeHeader === 'PRODUCT LIST' ? 'active' : ''}
                >PRODUCT LIST</h1>
                <h1 onClick={() => handleHeaderClick('ADD PRODUCTS')}
                    className={activeHeader === 'ADD PRODUCTS' ? 'active' : ''}
                >ADD PRODUCTS</h1>
            </div>

            {activeHeader === 'PRODUCT LIST' && (
                <div className="product-list">
                    <table className='productlist-body'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IMAGE</th>
                                <th>TITLE</th>
                                <th style={{ textAlign: 'left', paddingLeft: '20px' }}>DESCRIPTION</th>
                                <th>CATEGORIES</th>
                                <th>FLAVOR</th>
                                <th>LAYERS</th>
                                <th>TIERS</th>
                                <th>SHAPE</th>
                                <th style={{ backgroundColor: "rgb(206, 183, 246)" }}>COLOR</th>
                                <th>PRICE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {alldaProducts.length > 0 ? (
                                alldaProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '3%' }}>{product.id}</td>
                                        <td style={{ width: '5%' }}><img
                                            src={product.mainimage}
                                            alt="Product Image"
                                            id='image' /></td>
                                        <td style={{ width: '10%' }}>{product.title}</td>
                                        <td style={{ width: '25%', textAlign: 'justify' }}>{product.description}</td>
                                        <td style={{ width: '10%', textTransform: 'uppercase' }}>
                                            {product.category} | {product.subcategory}
                                        </td>
                                        <td style={{ width: '10%' }}>{product.flavor}</td>
                                        <td style={{ width: '5%' }}>{product.layercount}</td>
                                        <td style={{ width: '5%' }}>{product.tiercount}</td>
                                        <td style={{ width: '7%', textTransform: 'capitalize' }}>{product.shape}</td>
                                        <td id='colorColumn' style={{ width: '6%' }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}>
                                                {Array.isArray(product.color) ? product.color.map((color, index) => (
                                                    <div key={index} style={{
                                                        backgroundColor: color,
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '4px',
                                                    }}></div>
                                                )) : (
                                                    <div style={{
                                                        backgroundColor: product.color,
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '4px',
                                                    }}></div>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ width: '10%', fontWeight: 'bold' }}>{product.price} LKR</td>
                                        <td style={{ width: '5%' }}>
                                            <i onClick={() => { remove_product(product.id) }}
                                                id='dlt-mark'
                                                className="fa-solid fa-circle-xmark">
                                            </i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12">No products...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {activeHeader === 'ADD PRODUCTS' && (
                <AddProducts />
            )}

        </div>
    )
}

export default Products
