import React from 'react'
import './FilterSide.css'

const FilterSide = () => {
    return (
        <div className='filterside-container'>
            <h1>Filter</h1>

            <div className="filt-sec">

                <div className="sort-sec">
                    <div className="filt-sec-header">
                        <h1>SORT</h1>
                        <i class="fa-solid fa-angle-down"></i>
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
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="price-sec-body">
                        <div className="prc-fields">
                            <label>Min</label>
                            <input type="number" className='min-inp' value="2000" />
                        </div>
                        <div className='dash-line'>
                            <span>-</span>
                        </div>
                        <div className="prc-fields">
                            <label>Max</label>
                            <input type="number" className='min-inp' value="8000" />
                        </div>
                    </div>

                    <div className="slider-con">

                        <div className="price-slider">
                            <div className="progress-br"></div>
                        </div>
                        <div className="range-input">
                            <input type="range" className='range-min' min="0" max="10000"  />
                            <input type="range" className='range-max' min="0" max="10000" />
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default FilterSide
