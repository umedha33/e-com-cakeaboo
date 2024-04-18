import React, { useState } from 'react';
import './Coupons.css'
import dummyCoupons from '../Assets/dummyCoupons'

const Coupons = () => {

    const [selectedCoupon, setSelectedCoupon] = useState({
        couponTitle: '',
        couponCategory: '',
        couponPrice: '',
        couponCode: '',
        startDate: '',
        endDate: ''
    });

    const handleRowClick = (coupon) => {
        const formattedStartDate = new Date(coupon.startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(coupon.endDate).toISOString().split('T')[0];

        setSelectedCoupon({
            couponTitle: coupon.couponTitle,
            couponCategory: coupon.couponCategory[0],
            couponPrice: coupon.couponPrice,
            couponCode: coupon.couponCode,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        });
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
                            </tr>
                        </thead>
                        <tbody>
                            {dummyCoupons.map((coupon, index) => (
                                <tr key={index} onClick={() => handleRowClick(coupon)}>
                                    <td style={{ width: '3%' }}>{coupon.couponID}</td>
                                    <td id='coup-title' style={{ width: '15%' }}>{coupon.couponTitle}</td>
                                    <td style={{ width: '5%' }}>{coupon.couponCategory}</td>
                                    <td style={{ width: '8%' }}>{coupon.couponPrice} LKR</td>
                                    <td id='coup-code' style={{ width: '5%' }}>{coupon.couponCode}</td>
                                    <td style={{ width: '20%' }}>{coupon.startDate} - <span>{coupon.endDate}</span></td>
                                </tr>
                            ))}
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
                            <select name="category" id="category">
                                <option value={selectedCoupon.couponCategory} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, couponCategory: e.target.value })} disabled>{selectedCoupon.couponCategory}</option>
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
                                <input type="date" name="startdate" id="startdate" value={selectedCoupon.startDate} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, startDate: e.target.value })} />
                            </div>
                            <div className='normal-inputs'>
                                <label htmlFor="enddate">END DATE</label>
                                <input type="date" name="enddate" id="enddate" value={selectedCoupon.endDate} onChange={(e) => setSelectedCoupon({ ...selectedCoupon, endDate: e.target.value })} />
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
                            <button>PUBLISH COUPON</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coupons
