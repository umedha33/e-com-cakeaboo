import React, { useState } from 'react'
import './CSS/CakesPage.css'
import FilterSide from '../components/FilterSide/FilterSide'
import ProductsRender from '../components/ProductsRender/ProductsRender'
import dummyProducts from '../components/Assets/dummy-products.js'

const CakesPage = () => {

  const [sortingMethod, setSortingMethod] = useState('default-sorting');
  const [priceRange, setPriceRange] = useState([450, 55000]);

  const handleSortChange = (selectedOption) => {
    setSortingMethod(selectedOption);
  };

  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  return (
    <div className='cakes-page-container'>

      <div className="main-cat-container">
        <h1 id='quck-selctin-lbl'>Qucik Selections ›</h1>
        <div className="lbl-main-tags">
          <h1 className='txt-main-lb'>Cakes Only</h1>
        </div>
        <div className="lbl-main-tags">
          <h1 className='txt-main-lb'> Just Cupcakes</h1>
        </div>
        <div className="lbl-main-tags">
          <h1 className='txt-main-lb'>Sweets Corner</h1>
        </div>
        <button><i className="fa-solid fa-xmark"></i></button>
      </div>

      <div className="products-container-with-side">
        <div className="prod-con-left">
          <FilterSide
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange} />
        </div>
        <div className="prod-con-right">
          <ProductsRender
            products={dummyProducts}
            sortingMethod={sortingMethod}
            priceRange={priceRange} />
        </div>
      </div>

    </div>
  )
}

export default CakesPage
