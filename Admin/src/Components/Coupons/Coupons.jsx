import React, { useState, useEffect } from 'react';
import './Coupons.css'
import dummyCoupons from '../Assets/dummyCoupons'

const Coupons = () => {

    const [selectedCoupon, setSelectedCoupon] = useState({
        couponTitle: '',
        couponCategory: 'cakes',
        couponPrice: '',
        couponCode: '',
        startDate: '',
        endDate: ''
    });


    const [alldaCoupons, setAllCoupons] = useState([]);
    const fetchCoupons = async () => {
        await fetch('http://localhost:4000/allcoupons')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.allCoupons)) {
                    // console.log("data.allProducts is an array");
                    setAllCoupons(data.allCoupons);
                    console.log(`Coupons: `, alldaCoupons);
                } else {
                    console.log("data.allProducts is not an array, it is a:", typeof data.allProducts);
                }
            });
    }

    useEffect(() => {
        fetchCoupons();
    }, [])


    const publishCoupon = () => {
        fetch('http://localhost:4000/addcoupon', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: selectedCoupon.couponTitle,
                category: selectedCoupon.couponCategory,
                startdate: selectedCoupon.startDate,
                enddate: selectedCoupon.endDate,
                price: selectedCoupon.couponPrice,
                code: selectedCoupon.couponCode,
            }),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) { // Assuming your backend sends back a success property when the operation is successful
                    fetchCoupons(); // Refresh the coupons list after successfully adding a new coupon
                } else {
                    console.error('Failed to add coupon:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error publishing coupon:', error);
            });
    }

    const handleRowClick = (coupon) => {

        setSelectedCoupon({
            couponTitle: coupon.couponTitle,
            couponCategory: coupon.couponCategory,
            couponPrice: coupon.couponPrice,
            couponCode: coupon.couponCode,
            startDate: formDate(coupon.couponStartDate),
            endDate: formDate(coupon.couponEndDate)
        });
        // console.log(selectedCoupon);
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    }

    const formDate = (dateString) => {
        if (!dateString) return "";
        const dateObj = new Date(dateString);
        return dateObj.toISOString().split('T')[0];
    }

    const remove_coupon = async (id) => {
        console.log(id);
        await fetch('http://localhost:4000/removecoupon', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        await fetchCoupons();
    }


    return (
        <div className='coupons-container'>
            <div className="coupons-nav">
                <h1>COUPON LIST</h1>
                <h1>ADD COUPONS</h1>
            </div>
            <div className="coup-creat">
                <div className="coup-left-sec">
                    <table className='couponlist-body'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>CODE</th>
                                <th>VALID TILL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {alldaCoupons.length > 0 ? (
                                <>
                                    {alldaCoupons.map((coupon, index) => (
                                        <tr key={index} onClick={() => handleRowClick(coupon)}>
                                            <td style={{ width: '3%' }}>{coupon.couponID}</td>
                                            <td id='coup-title' style={{ width: '15%' }}>{coupon.couponTitle}</td>
                                            <td style={{ width: '5%' }}>{coupon.couponCategory}</td>
                                            <td style={{ width: '8%' }}>{coupon.couponPrice} LKR</td>
                                            <td id='coup-code' style={{ width: '5%' }}>{coupon.couponCode}</td>
                                            <td style={{ width: '20%' }}>{formatDate(coupon.couponStartDate)} - <span>{formatDate(coupon.couponEndDate)}</span></td>
                                            <td style={{ width: '5%' }}>
                                                <i id='dlt-mark-tp' onClick={() => { remove_coupon(coupon.couponID) }}
                                                    className="fa-solid fa-circle-xmark">
                                                </i>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <><h4>No Coupons...</h4></>
                            )}

                        </tbody>
                    </table>
                </div>
                <div className="coup-right-sec">
                    <div className="coupon-form">
                        <div className='normal-inputs'>
                            <label htmlFor="title">TITLE</label>
                            <input type="text" name="title" id="title" value={selectedCoupon.couponTitle} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponTitle: e.target.value })} />
                        </div>
                        <div className='normal-inputs'>
                            <label htmlFor="category">CATEGORY</label>
                            <select name="category" id="category" value={selectedCoupon.couponCategory} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponCategory: e.target.value })}>
                                <option value="cakes">CAKES</option>
                                <option value="cupcakes">CUP CAKES</option>
                                <option value="sweets">SWEETS</option>
                                <option value="kids">Kids</option>
                                <option value="birthday">Birthday</option>
                                <option value="partysets">Party Sets</option>
                                <option value="lovethemed">Love Themed</option>
                                <option value="engagement">Engagement</option>
                                <option value="wedding">Wedding</option>
                                <option value="buttercream">Butter Cream</option>
                                <option value="frosted">Frosted</option>
                                <option value="ganache">Ganache</option>
                                <option value="fondant">Fondant</option>
                                <option value="whippedcream">Whipped Cream</option>
                            </select>
                        </div>
                        <div className="date-sel-set">
                            <div className='normal-inputs'>
                                <label htmlFor="startdate">START DATE</label>
                                <input type="date" name="startdate" id="startdate" value={selectedCoupon.startDate} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponStartDate: e.target.value })} />
                            </div>
                            <div className='normal-inputs'>
                                <label htmlFor="enddate">END DATE</label>
                                <input type="date" name="enddate" id="enddate" value={selectedCoupon.endDate} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponEndDate: e.target.value })} />
                            </div>
                        </div>
                        <div className='normal-inputs'>
                            <label htmlFor="price">PRICE</label>
                            <input type="text" name="price" id="price" value={selectedCoupon.couponPrice} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponPrice: e.target.value })} />
                        </div>
                        <div className='normal-inputs'>
                            <label htmlFor="code">CODE</label>
                            <input type="text" name="code" id="code" value={selectedCoupon.couponCode} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponCode: e.target.value })} />
                        </div>
                        <div className="publish-coup">
                            <button onClick={() => { publishCoupon() }}>PUBLISH COUPON</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coupons
