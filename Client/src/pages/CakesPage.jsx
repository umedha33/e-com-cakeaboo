import React, { useEffect, useState } from 'react'
import './CSS/CakesPage.css'
import dummyProducts from '../components/Assets/dummy-products.js'
import Slider from 'react-slider'
import { Link } from 'react-router-dom';

const colors = [
  'red', 'blue', 'green', 'yellow', 'orange', 'purple',
  'pink', 'cyan', 'black', 'lime', 'beige', 'rgb(244, 244, 244)', 'brown'
];

const categories = {
  'Cakes': ['Kids', 'Birthday', 'Party Sets', 'Love Themed', 'Engagement', 'Wedding'],
  'Cup Cakes': ['Butter Cream', 'Frosted', 'Ganache', 'Fondant', 'Whipped Cream'],
  'Sweets': ['Cakesicles', 'Cake Pops', 'Sugar Cookies', 'Trees']
};

const flavors = [
  'Vanila', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry', 'Coffee', 'Funfetti'
]

const shapes = [
  'Round', 'Slice', 'Top Forward', 'Square', 'Rectangular', 'Heart Shaped', 'Custom'
]

const CakesPage = () => {
  const [alldaProducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.allProducts)) {
          const updatedProducts = data.allProducts.map(product => ({
            ...product,
            categories: [product.category, product.subcategory]
          }));

          setAllProducts(updatedProducts);
          console.log(`meka thama`, alldaProducts);

        } else {
          console.log("data.allProducts is not an array, it is a:", typeof data.allProducts);
        }
      });
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const PRICE_MIN = 450;
  const PRICE_MAX = 55000;

  const [selectedColors, setSelectedColors] = useState([]);
  const [priceVals, setPriceVals] = useState([450, 55000])
  const [sortOption, setSortOption] = useState('default-sorting');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [layerCount, setLayerCount] = useState(1);
  const [tierCount, setTierCount] = useState(1);

  const sortProducts = (option, minPrice, maxPrice) => {
    let sortedProducts = alldaProducts.slice();
    switch (option) {
      case 'sort-by-latest':
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'sort-by-oldest':
        sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'sort-by-price-low':
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'sort-by-price-high':
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      sortedProducts = sortedProducts.filter(product =>
        product.categories.some(category =>
          selectedCategories.includes(category)
        )
      );
    }

    // Filter by price range
    sortedProducts = sortedProducts.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // Filter by selected colors
    if (selectedColors.length > 0) {
      sortedProducts = sortedProducts.filter(product =>
        product.color.some(color =>
          selectedColors.includes(color)
        )
      );
    }

    // Filter by selected flavors
    if (selectedFlavors.length > 0) {
      sortedProducts = sortedProducts.filter(product =>
        selectedFlavors.includes(product.flavor)
      );
    }

    // Filter by selected shapes
    if (selectedShapes.length > 0) {
      sortedProducts = sortedProducts.filter(product =>
        selectedShapes.includes(product.shape)
      );
    }

    // Filter by selected layer & tier counts
    sortedProducts = sortedProducts.filter(product =>
      product.layercount >= layerCount && product.tiercount >= tierCount
    );

    return sortedProducts;
  };

  const handleLayerChange = (event) => {
    const newLayerCount = parseInt(event.target.value) || 1;
    setLayerCount(newLayerCount);
  };

  const handleTierChange = (event) => {
    const newTierCount = parseInt(event.target.value) || 1;
    setTierCount(newTierCount);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const toggleFlavor = (flavor) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter(c => c !== flavor));
    } else {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const toggleShape = (shape) => {
    if (selectedShapes.includes(shape)) {
      setSelectedShapes(selectedShapes.filter(c => c !== shape));
    } else {
      setSelectedShapes([...selectedShapes, shape]);
    }
  };


  // toggling up down sections -------------------------------------
  // ---------------------------------------------------------------
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
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

  // ---------------------------------------------------------------
  // toggling up down sections -------------------------------------

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
          {/* FILTER SIDE COMPONENT */}
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
                  <select id='sort' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="default-sorting">Default Sorting</option>
                    <option value="sort-by-latest">Sort by Latest</option>
                    <option value="sort-by-oldest">Sort by Oldest</option>
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
                  ></i>
                </div>
                <div className={`category-sec-body ${isCategoryOpen ? 'open' : 'closed'}`}>
                  {Object.entries(categories).map(([mainCategory, subCategories]) => (
                    <div key={mainCategory} className="cake-cat">
                      <div className="mainitem-cat-drop">
                        <h2>
                          <input
                            type="checkbox"
                            onChange={() => toggleCategory(mainCategory)}
                            checked={selectedCategories.includes(mainCategory)}
                          />
                          {mainCategory}
                        </h2>
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                      <div className="secondary-itms">
                        <ul>
                          {subCategories.map((subCategory, idx) => (
                            <li key={idx}>
                              <input
                                type="checkbox"
                                onChange={() => toggleCategory(subCategory)}
                                checked={selectedCategories.includes(subCategory)}
                              />
                              {subCategory}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="variation-sec">
                <div className="filt-sec-header">
                  <h1>Variation</h1>
                  <i className={`fa-solid ${isVariationOpen ? "fa-angle-up" : "fa-angle-down"}`}
                    onClick={toggleVariationSection}
                  ></i>
                </div>
                <div className={`category-sec-body ${isVariationOpen ? 'open' : 'closed'}`}>

                  <div className="cake-cat">
                    <div className="mainitem-cat-drop">
                      <h2>COLORS</h2>
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
                      <h2>FLAVOR</h2>
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="secondary-itms">
                      <ul>
                        {flavors.map((flavor, idx) => (
                          <li key={idx}>
                            <input
                              type="checkbox"
                              onChange={() => toggleFlavor(flavor)}
                              checked={selectedFlavors.includes(flavor)}
                            />
                            {flavor}
                          </li>
                        ))}
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
                        <i className="fa-solid fa-minus pm-icons" onClick={() => setLayerCount(Math.max(1, layerCount - 1))}></i>
                        <input type="number" value={layerCount} onChange={handleLayerChange} />
                        <i className="fa-solid fa-plus pm-icons" onClick={() => setLayerCount(layerCount + 1)}></i>
                      </div>
                      <div className="num-input-l-t">
                        <label>Tiers:</label>
                        <i className="fa-solid fa-minus pm-icons" onClick={() => setTierCount(Math.max(1, tierCount - 1))}></i>
                        <input type="number" value={tierCount} onChange={handleTierChange} />
                        <i className="fa-solid fa-plus pm-icons" onClick={() => setTierCount(tierCount + 1)}></i>
                      </div>
                    </div>
                  </div>

                  <div className="cake-cat">
                    <div className="mainitem-cat-drop">
                      <h2>SHAPE</h2>
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="secondary-itms">
                      <ul>
                        {shapes.map((shape, idx) => (
                          <li key={idx}>
                            <input
                              type="checkbox"
                              onChange={() => toggleShape(shape)}
                              checked={selectedShapes.includes(shape)}
                            />
                            {shape}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="prod-con-right">
          {/* PRODUCT RENDER COMPONENT */}
          {sortProducts(sortOption, priceVals[0], priceVals[1]).length > 0 ?
            <div className='product-render-container'>
              {sortProducts(sortOption, priceVals[0], priceVals[1]).map(product => (
                <div key={product.id} className="ind-product">
                  <Link
                    to={`/product/${product.id}`}
                    state={{ singleProduct: product.id }}
                    className="product-link"
                  >
                    <img src={product.mainimage} alt={product.title} />
                  </Link>
                  <button>ADD TO CART</button>
                  <div className="ind-product-details">
                    <h3>{product.title}</h3>
                    <p id='indprice'>{(product.price).toFixed(2)} LKR</p>
                  </div>
                </div>
              ))}
            </div>
            :
            <div className="no-products">
              <h1>Oops... <br /> No products found on the given filter</h1>
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default CakesPage
