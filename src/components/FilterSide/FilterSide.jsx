import React, { useState } from 'react'
import './FilterSide.css'
import Slider from 'react-slider'

const FilterSide = () => {

    const PRICE_MIN = 450;
    const PRICE_MAX = 55000;

    const [priceVals, setPriceVals] = useState([3000, 15000])

    return (
        <div className='filterside-container'>
            <h1>Filter</h1>

            <div className="filt-sec">

                <div className="sort-sec">
                    <div className="filt-sec-header">
                        <h1>SORT</h1>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="sort-sec-body">
                        <select id='sort'>
                            <option value="default-sorting">Default Sorting</option>
                            <option value="sort-by-latest">Sort by Latest</option>
                            <option value="sort-by-price-low">Sort by Price: Low to High</option>
                            <option value="sort-by-price-high">Sort by Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="price-sec">
                    <div className="filt-sec-header">
                        <h1>PRICE</h1>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="price-sec-body">
                        <div className="price-val">
                            {`${priceVals[0]}LKR`} - {`${priceVals[1]}LKR`}
                        </div>
                        <Slider className="price-slider"
                            onChange={setPriceVals}
                            value={priceVals}
                            min={PRICE_MIN}
                            max={PRICE_MAX} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default FilterSide
