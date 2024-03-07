import React, { useState } from 'react'
import './FilterSide.css'
import Slider from 'react-slider'

const colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple',
    'pink', 'cyan', 'magenta', 'lime', 'teal', 'brown'
];

const FilterSide = () => {

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isVariationOpen, setIsVariationOpen] = useState(false);

    const toggleSortSection = () => {
        setIsSortOpen(!isSortOpen);
    };

    const togglePriceSection = () => {
        setIsPriceOpen(!isPriceOpen);
    };

    const toggleCategorySection = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const toggleVariationSection = () => {
        setIsVariationOpen(!isVariationOpen);
    };


    const PRICE_MIN = 450;
    const PRICE_MAX = 55000;

    const [priceVals, setPriceVals] = useState([3000, 15000])
    const [selectedColors, setSelectedColors] = useState([]);

    const toggleColor = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    return (
        <div className='filterside-container'>
            <h1>Filter</h1>

            <div className="filt-sec">

                <div className="sort-sec">
                    <div className="filt-sec-header">
                        <h1>SORT</h1>
                        <i className={`fa-solid ${isSortOpen ? "fa-angle-up" : "fa-angle-down"}`}
                            onClick={toggleSortSection}
                        ></i>
                    </div>
                    <div className={`sort-sec-body ${isSortOpen ? 'open' : 'closed'}`}>
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
                        <i className={`fa-solid ${isPriceOpen ? "fa-angle-up" : "fa-angle-down"}`}
                            onClick={togglePriceSection}
                        ></i>
                    </div>
                    <div className={`price-sec-body ${isPriceOpen ? 'open' : 'closed'}`}>
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
                        <i className={`fa-solid ${isCategoryOpen ? "fa-angle-up" : "fa-angle-down"}`}
                            onClick={toggleCategorySection}
                        ></i>                    </div>
                    <div className={`category-sec-body ${isCategoryOpen ? 'open' : 'closed'}`}>
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
                                    <li><input type="checkbox" />Butter Cream</li>
                                    <li><input type="checkbox" />Frosted</li>
                                    <li><input type="checkbox" />Ganache</li>
                                    <li><input type="checkbox" />Fondant</li>
                                    <li><input type="checkbox" />Whipped Cream</li>
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
                                    <li><input type="checkbox" />Cakesicles</li>
                                    <li><input type="checkbox" />Cake Pops</li>
                                    <li><input type="checkbox" />Sugar Cookies</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="variation-sec">
                    <div className="filt-sec-header">
                        <h1>Variation</h1>
                        <i className={`fa-solid ${isVariationOpen ? "fa-angle-up" : "fa-angle-down"}`}
                            onClick={toggleVariationSection}
                        ></i>                    </div>
                    <div className={`category-sec-body ${isVariationOpen ? 'open' : 'closed'}`}>

                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2><input type="checkbox" />COLORS</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="color-grid-itms">
                                {colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`cell ${selectedColors.includes(color) ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => toggleColor(color)}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2><input type="checkbox" />FLAVOR</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="secondary-itms">
                                <ul>
                                    <li><input type="checkbox" />Vanilla</li>
                                    <li><input type="checkbox" />Chocolate</li>
                                    <li><input type="checkbox" />Red Velvet</li>
                                    <li><input type="checkbox" />Lemon</li>
                                    <li><input type="checkbox" />Strawberry</li>
                                    <li><input type="checkbox" />Coffee</li>
                                </ul>
                            </div>
                        </div>

                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2>LAYERS & TIERS</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="secondary-itms">
                                <div className="num-input-l-t">
                                    <label>Layers</label>
                                    <i class="fa-solid fa-minus pm-icons"></i>
                                    <input type="number" value={1} />
                                    <i class="fa-solid fa-plus pm-icons"></i>

                                </div>
                                <div className="num-input-l-t">
                                    <label>Tiers:</label>
                                    <i class="fa-solid fa-minus pm-icons"></i>
                                    <input type="number" value={1} />
                                    <i class="fa-solid fa-plus pm-icons"></i>

                                </div>
                            </div>
                        </div>

                        <div className="cake-cat">
                            <div className="mainitem-cat-drop">
                                <h2><input type="checkbox" />SHAPE</h2>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="secondary-itms">
                                <ul>
                                    <li><input type="checkbox" />Slice </li>
                                    <li><input type="checkbox" />Round </li>
                                    <li><input type="checkbox" />Square </li>
                                    <li><input type="checkbox" />Rectangular </li>
                                    <li><input type="checkbox" />Heart Shaped</li>
                                    <li><input type="checkbox" />Custom</li>
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
