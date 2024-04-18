import React, { useState } from 'react'
import './Products.css'
import dummyProductList from '../Assets/dummy-product-list'

const colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple',
    'pink', 'cyan', 'black', 'lime', 'beige', 'rgb(244, 244, 244)', 'brown'
];

const Products = () => {
    const [activeHeader, setActiveHeader] = useState('PRODUCT LIST');
    const [selectedColors, setSelectedColors] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [mainFile, setMainFile] = useState(null);

    const mainFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewFile = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });
            setMainFile(previewFile);
        }
    };

    const mainRemoveFile = () => {
        if (mainFile) URL.revokeObjectURL(mainFile.preview);
        setMainFile(null);
    };

    const galleryFileChange = (event) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const fileArray = Array.from(fileList).map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            );
            setGalleryFiles(prevFiles => [...prevFiles, ...fileArray]);
        }
    };

    const galleryRemoveFile = (index) => {
        const newFiles = [...galleryFiles];
        if (newFiles[index] && newFiles[index].preview) {
            URL.revokeObjectURL(newFiles[index].preview);
        }
        newFiles.splice(index, 1);
        setGalleryFiles(newFiles);
    };

    const handleHeaderClick = (navItem) => {
        setActiveHeader(navItem);
    }

    const toggleColor = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

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
                            </tr>
                        </thead>
                        <tbody>
                            {dummyProductList.map((product, index) => (
                                <tr key={index}>
                                    <td style={{ width: '3%' }}>{product.id}</td>
                                    <td style={{ width: '5%' }}><img
                                        src={product.image}
                                        alt="Product Image"
                                        id='image' /></td>
                                    <td style={{ width: '10%' }}>{product.title}</td>
                                    <td style={{ width: '25%', textAlign: 'justify' }}>{product.description}</td>
                                    <td style={{ width: '10%', textTransform: 'uppercase' }}>
                                        {product.categories.length > 1
                                            ? `${product.categories[0]}, ${product.categories.slice(1).join(' ')}`
                                            : product.categories[0]}
                                    </td>
                                    <td style={{ width: '10%' }}>{product.flavor}</td>
                                    <td style={{ width: '5%' }}>{product.layerCount}</td>
                                    <td style={{ width: '5%' }}>{product.tierCount}</td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeHeader === 'ADD PRODUCTS' && (
                <div className="add-products">
                    <div className="add-body">
                        <div className="adp-left-col">
                            <div className='normal-inputs'>
                                <label htmlFor="title">TITLE</label>
                                <input type="text" name="title" id="title" />
                            </div>
                            <div className='normal-inputs'>
                                <label htmlFor="description">DESCRIPTION</label>
                                <textarea name="description" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className='normal-inputs'>
                                <label htmlFor="category">CATEGORY</label>
                                <select name="category" id="category">
                                    <option value="cakes">Cakes</option>
                                    <option value="cupcakes">Cup Cakes</option>
                                    <option value="sweets">Sweets</option>
                                </select>
                            </div>
                            <div className='normal-inputs'>
                                <label htmlFor="subcategory">SUB CATEGORY</label>
                                <select name="subcategory" id="subcategory">
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
                            <div className='normal-inputs'>
                                <label htmlFor="flavor">FLAVOR</label>
                                <select name="flavor" id="flavor">
                                    <option value="vanilla">Vanila</option>
                                    <option value="chocolate">Chocolate</option>
                                    <option value="redvelvet">Red Velvet</option>
                                    <option value="Lemon">Strawberry</option>
                                    <option value="coffee">Coffee</option>
                                </select>
                            </div>
                            <div className='number-inputs'>
                                <div className='layers'>
                                    <label htmlFor="layers">LAYER COUNT</label>
                                    <i class="fa-solid fa-minus"></i>
                                    <input type="number" name="layers" id="layers" />
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                <div className='tiers'>
                                    <label htmlFor="tiers">TIER COUNT</label>
                                    <i class="fa-solid fa-minus"></i>
                                    <input type="number" name="tiers" id="tiers" />
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            </div>
                            <div className='normal-inputs'>
                                <label htmlFor="shape">SHAPE</label>
                                <select name="shape" id="shape">
                                    <option value="slice">Slice</option>
                                    <option value="round">Round</option>
                                    <option value="topforward">Top Forward</option>
                                    <option value="square">Square</option>
                                    <option value="rectangular">Rectangular</option>
                                    <option value="heartshaped">Heart Shaped</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div className="color">
                                <label>COLOR</label>
                            </div>
                            <div className="color-selection">
                                <div className="color-pallet">
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
                            <div className='normal-inputs'>
                                <label htmlFor="price">PRICE</label>
                                <input type="text" name="price" id="price" />
                            </div>
                        </div>

                        <div className="right-colm">
                            <div className="image-section">
                                <label htmlFor='main-image-upload' id='mainimage-lbl'>MAIN IMAGE</label>
                                <div className="file-input">
                                    <label htmlFor="main-image-upload" className="main-image-upload">
                                        Upload Main Image<i className="fa-solid fa-folder"></i>
                                    </label>
                                    <input id="main-image-upload"
                                        type="file"
                                        name="attachment-images"
                                        accept="image/png, image/jpeg"
                                        onChange={mainFileChange}
                                    />
                                </div>
                                {mainFile && (
                                    <div className="main-preview">
                                        <div className="main-thumbnail">
                                            <i onClick={mainRemoveFile} className="fa-solid fa-delete-left"></i>
                                            <img src={mainFile.preview} alt='Main image' />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="image-section">
                                <label id='productgallery-lbl'>PRODUCT GALLERY</label>
                                <div className="file-input">
                                    <label for="file-upload" className="file-upload">
                                        Upload Other Images<i className="fa-solid fa-folder"></i>
                                    </label>
                                    <input id="file-upload"
                                        type="file"
                                        name="attachment-images"
                                        accept="image/png, image/jpeg"
                                        onChange={galleryFileChange}
                                        multiple />
                                </div>
                                <div className="image-preview">
                                    {galleryFiles.map((files, index) => (
                                        <div key={index} className="thumbnail">
                                            <i onClick={() => galleryRemoveFile(index)} className="fa-solid fa-delete-left"></i>
                                            <img src={files.preview} alt={`Thumbnail ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="submit-section">
                                <button>PUBLISH PRODUCT</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Products
