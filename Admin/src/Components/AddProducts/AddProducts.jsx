import React, { useState } from 'react'
import './AddProducts.css'

const colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple',
    'pink', 'cyan', 'black', 'lime', 'beige', 'rgb(244, 244, 244)', 'brown'
];

const AddProducts = () => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [productgallery, setGalleryFiles] = useState([]);
    const [mainimage, setMainFile] = useState(null);
    const [errors, setErrors] = useState({});


    const [productDetails, setProductDetails] = useState({
        title: "",
        description: "",
        category: "Cakes",
        subcategory: "Kids",
        flavor: "Vanila",
        layercount: "",
        tiercount: "",
        shape: "Round",
        color: [],
        mainimage: "",
        productgallery: [],
        price: "",
    })

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        let newErrors = {};
        // Logging the current state to debug
        console.log("Validating", productDetails, mainimage, productgallery);

        if (!productDetails.title) newErrors.title = 'Title is required';
        if (!productDetails.description) newErrors.description = 'Description is required';
        if (!productDetails.price) newErrors.price = 'Price is required';
        if (!productDetails.layercount) newErrors.layercount = 'Layer count is required';
        if (!productDetails.tiercount) newErrors.tiercount = 'Tier count is required';
        if (!mainimage) newErrors.mainimage = 'Main image is required';
        if (productDetails.color.length === 0) newErrors.color = 'At least one color must be selected';
        if (productgallery.length === 0) newErrors.productgallery = 'Product gallery must include at least one image';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const Add_Product = async () => {
        if (!validateForm()) {
            alert('Please fill all required fields');
            return;
        }

        let formData = new FormData();
        formData.append('mainImage', mainimage);

        productgallery.forEach(file => {
            formData.append('productgallery', file);
        });

        const response = await fetch('http://localhost:4000/uploadImages', {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();

        if (responseData.success) {
            const updatedProductDetails = {
                ...productDetails,
                mainimage: responseData.mainImageUrl,
                productgallery: responseData.galleryImageUrls
            };
            setProductDetails(updatedProductDetails);
            console.log(updatedProductDetails);

            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductDetails),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added!") : alert("Failed to add :(")
            })
        }
    };

    const mainFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewFile = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });
            setMainFile(previewFile);
        } else {
            setMainFile(null);
        }
        validateForm();
    };

    const mainRemoveFile = () => {
        if (mainimage) URL.revokeObjectURL(mainimage.preview);
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
        const newFiles = [...productgallery];
        if (newFiles[index] && newFiles[index].preview) {
            URL.revokeObjectURL(newFiles[index].preview);
        }
        newFiles.splice(index, 1);
        setGalleryFiles(newFiles);
    };

    const toggleColor = (color) => {
        let newSelectedColors;
        if (selectedColors.includes(color)) {
            newSelectedColors = selectedColors.filter(c => c !== color);
        } else {
            newSelectedColors = [...selectedColors, color];
        }
        setSelectedColors(newSelectedColors);

        setProductDetails(prevDetails => ({
            ...prevDetails,
            color: newSelectedColors
        }));
    };

    return (
        <div className="add-products">
            <div className="add-body">
                <div className="adp-left-col">
                    <div className='normal-inputs'>
                        <label htmlFor="title">TITLE</label>
                        <input value={productDetails.title} onChange={changeHandler} type="text" name="title" id="title" />
                    </div>
                    <div className='normal-inputs'>
                        <label htmlFor="description">DESCRIPTION</label>
                        <textarea value={productDetails.description} onChange={changeHandler} name="description" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className='normal-inputs'>
                        <label htmlFor="category">CATEGORY</label>
                        <select value={productDetails.category} onChange={changeHandler} name="category" id="category">
                            <option value="cakes">Cakes</option>
                            <option value="cupcakes">Cup Cakes</option>
                            <option value="sweets">Sweets</option>
                        </select>
                    </div>
                    <div className='normal-inputs'>
                        <label htmlFor="subcategory">SUB CATEGORY</label>
                        <select value={productDetails.subcategory} onChange={changeHandler} name="subcategory" id="subcategory">
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
                        <select value={productDetails.flavor} onChange={changeHandler} name="flavor" id="flavor">
                            <option value="vanilla">Vanila</option>
                            <option value="chocolate">Chocolate</option>
                            <option value="redvelvet">Red Velvet</option>
                            <option value="strawberry">Strawberry</option>
                            <option value="lemon">Lemon</option>
                            <option value="coffee">Coffee</option>
                        </select>
                    </div>
                    <div className='number-inputs'>
                        <div className='layers'>
                            <label htmlFor="layers">LAYER COUNT</label>
                            <i className="fa-solid fa-minus"></i>
                            <input value={productDetails.layercount} onChange={changeHandler} type="number" name="layercount" id="layers" />
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className='tiers'>
                            <label htmlFor="tiers">TIER COUNT</label>
                            <i className="fa-solid fa-minus"></i>
                            <input value={productDetails.tiercount} onChange={changeHandler} type="number" name="tiercount" id="tiers" />
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                    <div className='normal-inputs'>
                        <label htmlFor="shape">SHAPE</label>
                        <select value={productDetails.shape} onChange={changeHandler} name="shape" id="shape">
                            <option value="round">Round</option>
                            <option value="slice">Slice</option>
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
                                    value={productDetails.title}
                                    onChange={changeHandler}
                                    onClick={() => toggleColor(color)}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className='normal-inputs'>
                        <label htmlFor="price">PRICE</label>
                        <input value={productDetails.price} onChange={changeHandler} type="text" name="price" id="price" />
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
                        {mainimage && (
                            <div className="main-preview">
                                <div className="main-thumbnail">
                                    <i onClick={mainRemoveFile} className="fa-solid fa-delete-left"></i>
                                    <img src={mainimage.preview} alt='Main image' />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="image-section">
                        <label id='productgallery-lbl'>PRODUCT GALLERY</label>
                        <div className="file-input">
                            <label htmlFor="file-upload" className="file-upload">
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
                            {productgallery.map((files, index) => (
                                <div key={index} className="thumbnail">
                                    <i onClick={() => galleryRemoveFile(index)} className="fa-solid fa-delete-left"></i>
                                    <img src={files.preview} alt={`Thumbnail ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="submit-section">
                        <button onClick={() => { Add_Product() }}>PUBLISH PRODUCT</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProducts
