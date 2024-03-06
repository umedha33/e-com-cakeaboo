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
                            {`${priceVals[0]} LKR`} - {`${priceVals[1]} LKR`}
                        </div>
                        <Slider className="price-slider"
                            onChange={setPriceVals}
                            value={priceVals}
                            min={PRICE_MIN}
                            max={PRICE_MAX} />
                    </div>
                </div>

                <div className="category-sec">
                    <div className="filt-sec-header">
                        <h1>CATEGORY</h1>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="category-sec-body">
                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2><input type="checkbox" />CAKES</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="secondary-itms">
                                <ul>
                                    <li><input type="checkbox" />Kids</li>
                                    <li><input type="checkbox" />Birthday</li>
                                    <li><input type="checkbox" />Party Sets</li>
                                    <li><input type="checkbox" />Love Themed</li>
                                    <li><input type="checkbox" />Engagement</li>
                                    <li><input type="checkbox" />Wedding</li>
                                </ul>
                            </div>
                        </div>
                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2><input type="checkbox" />CUP CAKES</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="secondary-itms">
                                <ul>
                                    <li><input type="checkbox" />Kids</li>
                                    <li><input type="checkbox" />Birthday</li>
                                    <li><input type="checkbox" />Party Sets</li>
                                    <li><input type="checkbox" />Love Themed</li>
                                    <li><input type="checkbox" />Engagement</li>
                                    <li><input type="checkbox" />Wedding</li>
                                </ul>
                            </div>
                        </div>
                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2><input type="checkbox" />SWEETS</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="secondary-itms">
                                <ul>
                                    <li><input type="checkbox" />Kids</li>
                                    <li><input type="checkbox" />Birthday</li>
                                    <li><input type="checkbox" />Party Sets</li>
                                    <li><input type="checkbox" />Love Themed</li>
                                    <li><input type="checkbox" />Engagement</li>
                                    <li><input type="checkbox" />Wedding</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}

export default FilterSide
